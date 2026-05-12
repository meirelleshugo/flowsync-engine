import type { NextFunction, Request, Response } from "express";

import "responser";
import throwlhos from "throwlhos";

import CoreController from "../../core/abstract/core.controller.ts";

import AuthModel from "./auth.model.ts";

import { AuthServiceImp } from "./index.ts";

export default class AuthController extends CoreController {
  login = async (request: Request, response: Response, next: NextFunction) => {
    const email = request.body.email;
    const password = request.body.password;

    try {
      const invalids = this.rules.invalid({ email }, { password });

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
