import mongoose from "mongoose";

import CoreRepository from "../../core/abstract/core.repository.ts";

import DinosaurModel from "./dinosaur.model.ts";

import { DinosaurMongoDB } from "./dinosaur.mongodb.ts";

export default class DinosaurRepository extends CoreRepository<DinosaurModel> {
  constructor() {
    super(DinosaurMongoDB);
  }

  async create(
    dinosaur: DinosaurModel,
    session?: mongoose.ClientSession,
  ): Promise<DinosaurModel | null> {
    const document = await this.mongoDB.create([dinosaur.object], {
      session,
    });

    if (!document?.[0]) {
      return null;
    }

    return new DinosaurModel({
      ...document[0].toObject(),
      _id: document[0]._id.toString(),
    });
  }

  async findAll(): Promise<DinosaurModel[]> {
    const documents = await this.mongoDB.find();

    return documents.map(
      (document) =>
        new DinosaurModel({
          ...document.toObject(),
          _id: document._id.toString(),
        }),
    );
  }

  async findById(dinosaurId: string): Promise<DinosaurModel | null> {
    const document = await this.mongoDB.findById(dinosaurId);

    if (!document) {
      return null;
    }

    return new DinosaurModel({
      ...document.toObject(),
      _id: document._id.toString(),
    });
  }

  async existsByName(dinosaur: DinosaurModel): Promise<boolean> {
    const document = await this.mongoDB.findOne({
      name: {
        $regex: new RegExp(`^${dinosaur.name}$`, "i"),
      },
    });

    return !!document;
  }

  async update(
    dinosaurId: string,
    dinosaur: DinosaurModel,
  ): Promise<DinosaurModel | null> {
    const updateData = {
      ...(dinosaur.name && {
        name: dinosaur.name,
      }),

      ...(dinosaur.type && {
        type: dinosaur.type,
      }),
    };

    const document = await this.mongoDB.findByIdAndUpdate(
      dinosaurId,
      {
        $set: updateData,
      },
      {
        new: true,
      },
    );

    if (!document) {
      return null;
    }

    return new DinosaurModel({
      ...document.toObject(),
      _id: document._id.toString(),
    });
  }

  async delete(dinosaurId: string): Promise<boolean> {
    const result = await this.mongoDB.findByIdAndDelete(dinosaurId);

    return !!result;
  }
}
