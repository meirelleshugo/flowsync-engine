import { Request, Response } from "express";

import repositoriesService from "./repositories.service.ts";
import repositoriesRules from "./repositories.schema.ts";

class RepositoriesController {
  async create(req: Request, res: Response) {
    repositoriesRules.create(req.body);

    const result = await repositoriesService.create(req.body);

    return res.status(201).json(result);
  }

  async findAll(_req: Request, res: Response) {
    const result = await repositoriesService.findAll();

    return res.status(200).json(result);
  }

  async findById(req: Request, res: Response) {
    const result = await repositoriesService.findById(req.params.id);

    return res.status(200).json(result);
  }

  async update(req: Request, res: Response) {
    repositoriesRules.update(req.body);

    const result = await repositoriesService.update(req.params.id, req.body);

    return res.status(200).json(result);
  }

  async delete(req: Request, res: Response) {
    const result = await repositoriesService.delete(req.params.id);

    return res.status(200).json(result);
  }
}

export default new RepositoriesController();
