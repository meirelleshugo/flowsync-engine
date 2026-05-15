import commitsService from "./commits.service.ts";
import commitsRules from "./commits.schema.ts";
import { Request, Response } from "express";

class CommitsController {
  async create(req: Request, res: Response) {
    commitsRules.create(req.body);

    const result = await commitsService.create(req.body);

    return res.status(201).json(result);
  }

  async findAll(_req: Request, res: Response) {
    const result = await commitsService.findAll();

    return res.status(200).json(result);
  }

  async findById(req: Request, res: Response) {
    const result = await commitsService.findById(req.params.id);

    return res.status(200).json(result);
  }

  async update(req: Request, res: Response) {
    commitsRules.update(req.body);

    const result = await commitsService.update(req.params.id, req.body);

    return res.status(200).json(result);
  }

  async delete(req: Request, res: Response) {
    const result = await commitsService.delete(req.params.id);

    return res.status(200).json(result);
  }
}

export default new CommitsController();
