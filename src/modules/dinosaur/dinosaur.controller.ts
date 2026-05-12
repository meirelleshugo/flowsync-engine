import type { NextFunction, Request, Response } from "express";

import "responser";
import throwlhos from "throwlhos";

import CoreController from "../../core/abstract/core.controller.ts";

import DinosaurModel from "./dinosaur.model.ts";

import { DinosaurServiceImp } from "./index.ts";

export default class DinosaurController extends CoreController {
  create = async (request: Request, response: Response, next: NextFunction) => {
    const name = request.body.name;
    const type = request.body.type;

    try {
      const invalids = this.rules.invalid({ name }, { type });

      if (invalids) {
        throw throwlhos.default.err_unprocessableEntity(
          "Campos inválidos.",
          invalids,
        );
      }

      const dinosaur = new DinosaurModel({
        name: name.toString(),
        type: type.toString(),
        createdAt: new Date(),
      });

      const createdDinosaur = await DinosaurServiceImp.create(dinosaur);

      return response.send_created("Dinossauro criado com sucesso!", {
        createdDinosaur,
      });
    } catch (error) {
      next(error);
    }
  };

  findAll = async (
    _request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const dinosaurs = await DinosaurServiceImp.findAll();

      return response.send_ok("Dinossauros encontrados com sucesso!", {
        dinosaurs,
      });
    } catch (error) {
      next(error);
    }
  };

  findById = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    const dinosaurId = request.params.dinosaurId;

    try {
      const invalids = this.rules.invalid({ dinosaurId });

      if (invalids) {
        throw throwlhos.default.err_unprocessableEntity(
          "ID inválido.",
          invalids,
        );
      }

      const dinosaur = await DinosaurServiceImp.findById(dinosaurId);

      return response.send_ok("Dinossauro encontrado com sucesso!", {
        dinosaur,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (request: Request, response: Response, next: NextFunction) => {
    const dinosaurId = request.params.dinosaurId;

    const name = request.body.name;
    const type = request.body.type;

    try {
      const invalids = this.rules.invalid({
        dinosaurId,
      });

      if (invalids) {
        throw throwlhos.default.err_unprocessableEntity(
          "Campos inválidos.",
          invalids,
        );
      }

      const dinosaur = new DinosaurModel();

      if (name) {
        dinosaur.name = name.toString();
      }

      if (type) {
        dinosaur.type = type.toString();
      }

      const updatedDinosaur = await DinosaurServiceImp.update(
        dinosaurId,
        dinosaur,
      );

      return response.send_ok("Dinossauro atualizado com sucesso!", {
        updatedDinosaur,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (request: Request, response: Response, next: NextFunction) => {
    const dinosaurId = request.params.dinosaurId;

    try {
      const invalids = this.rules.invalid({ dinosaurId });

      if (invalids) {
        throw throwlhos.default.err_unprocessableEntity(
          "ID inválido.",
          invalids,
        );
      }

      await DinosaurServiceImp.delete(dinosaurId);

      return response.send_ok("Dinossauro deletado com sucesso!", {
        dinosaurId,
      });
    } catch (error) {
      next(error);
    }
  };

  createWithTransaction = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    const name = request.body.name;
    const type = request.body.type;

    try {
      const invalids = this.rules.default.invalid({ name }, { type });

      if (invalids) {
        throw throwlhos.default.err_unprocessableEntity(
          "Campos inválidos.",
          invalids,
        );
      }

      const dinosaur = new DinosaurModel({
        name: name.toString(),
        type: type.toString(),
        createdAt: new Date(),
      });

      const createdDinosaur =
        await DinosaurServiceImp.createWithTransaction(dinosaur);

      return response.send_created(
        "Dinossauro criado com transação com sucesso!",
        { createdDinosaur },
      );
    } catch (error) {
      next(error);
    }
  };
}

export const dinosaurController = new DinosaurController();
