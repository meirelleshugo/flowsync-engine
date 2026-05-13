import UsersModel from "../users/users.model.ts";

import { UsersRepositoryImp } from "../users/index.ts";

export default class AuthRepository {
  async findByEmail(user: UsersModel): Promise<UsersModel | null> {
    return await UsersRepositoryImp.findByEmail(user.email);
  }
}
