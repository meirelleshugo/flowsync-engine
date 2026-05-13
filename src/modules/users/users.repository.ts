import CoreRepository from "../../core/abstract/core.repository.ts";
import UsersModel from "./users.model.ts";
import { IUser } from "./users.model.ts";
import mongoose from "mongoose";

export default class UsersRepository extends CoreRepository<IUser> {
  private toModel(document: IUser): UsersModel {
    return new UsersModel({
      updatedAt: document.updatedAt,
      createdAt: document.createdAt,
      password: document.password,
      email: document.email,
      _id: document._id,
    });
  }

  async create(data: Partial<IUser>): Promise<UsersModel | null> {
    const document = await this.mongoDB.create(data);

    if (!document) return null;

    return this.toModel(document);
  }

  async findAll(): Promise<UsersModel[]> {
    const documents = await this.mongoDB.find();

    return documents.map((document) => this.toModel(document));
  }

  async findById(id: string): Promise<UsersModel | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }

    const document = await this.mongoDB.findById(id);

    if (!document) return null;

    return this.toModel(document);
  }

  async findByEmail(email: string): Promise<UsersModel | null> {
    const document = await this.mongoDB.findOne({ email });

    if (!document) return null;

    return this.toModel(document);
  }

  async update(id: string, data: Partial<IUser>): Promise<UsersModel | null> {
    const document = await this.mongoDB.findByIdAndUpdate(id, data, {
      new: true,
    });

    if (!document) return null;

    return this.toModel(document);
  }

  async delete(id: string): Promise<boolean> {
    const document = await this.mongoDB.findByIdAndDelete(id);

    return !!document;
  }
}
