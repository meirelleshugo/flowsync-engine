import throwlhos from "throwlhos";

import AuthModel from "./auth.model.ts";

import { generateToken } from "../../core/utils/jwt.ts";

export default class AuthService {
  async login(auth: AuthModel): Promise<string> {
    const isValidUser =
      auth.email === "admin@flowsync.com" && auth.password === "123456";

    if (!isValidUser) {
      throw throwlhos.default.err_unauthorized("Credenciais inválidas.");
    }

    return generateToken({
      email: auth.email,
    });
  }
}
