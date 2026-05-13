import AuthRepository from "./auth.repository.ts";
import UsersModel from "../users/users.model.ts";
import throwlhos from "throwlhos";
import bcrypt from "bcryptjs";

import { generateToken } from "../../core/utils/jwt.ts";

const repository = new AuthRepository();

export default class AuthService {
  async login(auth: UsersModel): Promise<string> {
    const user = await repository.findByEmail(auth);

    if (!user) {
      throw throwlhos.default.err_unauthorized("Usuário não encontrado.");
    }

    const isValidPassword = await bcrypt.compare(auth.password, user.password);

    if (!isValidPassword) {
      throw throwlhos.default.err_unauthorized("Senha inválida.");
    }

    return generateToken({
      id: user.id,
      email: user.email,
    });
  }
}
