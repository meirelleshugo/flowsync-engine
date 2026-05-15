import { Request, Response } from "express";

import branchesService from "./branches.service.ts";
import branchesRules from "./branches.schema.ts";

class BranchesController {
  async create(req: Request, res: Response) {
    branchesRules.create(req.body);

    const result = await branchesService.create(req.body);

    return res.status(201).json(result);
  }

  async findAll(_req: Request, res: Response) {
    const result = await branchesService.findAll();

    return res.status(200).json(result);
  }

  async findById(req: Request, res: Response) {
    const result = await branchesService.findById(req.params.id);

    return res.status(200).json(result);
  }

  async update(req: Request, res: Response) {
    branchesRules.update(req.body);

    const result = await branchesService.update(req.params.id, req.body);

    return res.status(200).json(result);
  }

  async delete(req: Request, res: Response) {
    const result = await branchesService.delete(req.params.id);

    return res.status(200).json(result);
  }
}

export default new BranchesController();
