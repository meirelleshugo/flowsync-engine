import { Request, Response } from "express";

import usersService from "./users.service.ts";
import usersRules from "./users.schema.ts";

class UsersController {
  async create(req: Request, res: Response) {
    usersRules.create(req.body);

    const result = await usersService.create(req.body);

    return res.status(201).json(result);
  }

  async findAll(_req: Request, res: Response) {
    const result = await usersService.findAll();

    return res.status(200).json(result);
  }

  async findById(req: Request, res: Response) {
    const result = await usersService.findById(req.params.id);

    return res.status(200).json(result);
  }

  async update(req: Request, res: Response) {
    usersRules.update(req.body);

    const result = await usersService.update(req.params.id, req.body);

    return res.status(200).json(result);
  }

  async delete(req: Request, res: Response) {
    const result = await usersService.delete(req.params.id);

    return res.status(200).json(result);
  }
}

export default new UsersController();
