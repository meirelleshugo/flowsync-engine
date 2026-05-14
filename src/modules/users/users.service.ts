import CoreRepository from "../../core/abstract/core.repository.ts";
import UsersModel, { IUser } from "./users.model.ts";
import mongoose from "mongoose";

export default class UsersRepository extends CoreRepository<IUser> {
  constructor() {
    super(UsersModel);
  }

  private toModel(document: IUser): UsersModel {
    return new UsersModel({
      updatedAt: document.updatedAt,
      createdAt: document.createdAt,
      password: document.password,
      email: document.email,
      _id: document._id,
    });
  }

  async createUser(data: IUser): Promise<UsersModel | null> {
    const document = await this.createOne(data);

    if (!document) return null;

    return this.toModel(document);
  }

  async findAllUsers(): Promise<UsersModel[]> {
    const documents = await this.findMany({});

    return documents.map((document) => this.toModel(document));
  }

  async findUserById(id: string): Promise<UsersModel | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }

    const document = await super.findById(id);

    if (!document) return null;

    return this.toModel(document);
  }

  async findUserByEmail(email: string): Promise<UsersModel | null> {
    const document = await this.findOne({ email });

    if (!document) return null;

    return this.toModel(document);
  }

  async updateUser(
    id: string,
    data: Partial<IUser>,
  ): Promise<UsersModel | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }

    const document = await this.updateById(id, data);

    if (!document) return null;

    return this.toModel(document);
  }

  async deleteUser(id: string): Promise<boolean> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return false;
    }

    const document = await this.deleteById(id);

    return !!document;
  }
}
