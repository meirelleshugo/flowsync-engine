import type { NextFunction, Request, Response } from "express";
import BaseRules from "../../core/abstract/core.controller.ts";
import UsersService from "./users.service.ts";
import throwlhos from "throwlhos";
import "responser";

const service = new UsersService();

export default class UsersController extends BaseRules {
  create = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { email, password } = request.body;

      const invalids = this.rc.check({ email }, { password });

      if (invalids) {
        throw throwlhos.default.err_unprocessableEntity(
          "Campos inválidos.",
          invalids,
        );
      }

      const user = await service.create(email.toString(), password.toString());

      return response.send_created("Usuário criado com sucesso!", user);
    } catch (error) {
      next(error);
    }
  };

  findAll = async (_: Request, response: Response, next: NextFunction) => {
    try {
      const users = await service.findAll();

      return response.send_ok("Usuários encontrados.", users);
    } catch (error) {
      next(error);
    }
  };

  findById = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const user = await service.findById(request.params.id);

      return response.send_ok("Usuário encontrado.", user);
    } catch (error) {
      next(error);
    }
  };

  update = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const user = await service.update(request.params.id, request.body);

      return response.send_ok("Usuário atualizado.", user);
    } catch (error) {
      next(error);
    }
  };

  delete = async (request: Request, response: Response, next: NextFunction) => {
    try {
      await service.delete(request.params.id);

      return response.send_ok("Usuário removido.");
    } catch (error) {
      next(error);
    }
  };
}

export const usersController = new UsersController();
