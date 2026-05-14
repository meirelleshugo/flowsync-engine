import CoreRepository from "../../core/abstract/core.repository.ts";
import User, { IUser } from "./users.model.ts";
import mongoose from "mongoose";

export default class UsersRepository extends CoreRepository<IUser> {
  constructor() {
    super(User);
  }

  async createUser(data: Partial<IUser>) {
    return await this.createOne(data);
  }

  async findAllUsers() {
    return await this.findMany({});
  }

  async findUserById(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }

    return await this.findById(id);
  }

  async findUserByEmail(email: string) {
    return await this.findOne({ email });
  }

  async updateUser(id: string, data: Partial<IUser>) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }

    return await this.updateById(id, data);
  }

  async deleteUser(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return false;
    }

    const document = await this.deleteById(id);

    return !!document;
  }
}
