import type { NextFunction, Request, Response } from "express";
import BaseRules from "../../core/abstract/core.controller.ts";
import { AuthServiceImp } from "./index.ts";
import AuthModel from "./auth.model.ts";
import throwlhos from "throwlhos";
import "responser";

export default class AuthController extends BaseRules {
  login = async (request: Request, response: Response, next: NextFunction) => {
    const { email, password } = request.body;

    try {
      const invalids = this.rc.check({ email }, { password });

      if (invalids) {
        throw throwlhos.default.err_unprocessableEntity(
          "Campos inválidos.",
          invalids,
        );
      }

      const auth = new AuthModel({
        email: email.toString(),
        password: password.toString(),
      });

      const token = await AuthServiceImp.login(auth);

      return response.send_ok("Login realizado com sucesso!", {
        token,
      });
    } catch (error) {
      next(error);
    }
  };
}

export const authController = new AuthController();
