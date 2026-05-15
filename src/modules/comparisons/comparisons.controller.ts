import { Request, Response } from "express";

import comparisonsService from "./comparisons.service.ts";
import comparisonsRules from "./comparisons.schema.ts";

class ComparisonsController {
  async compare(req: Request, res: Response) {
    comparisonsRules.compare(req.body);

    const result = await comparisonsService.compare(req.body);

    return res.status(201).json(result);
  }

  async findAll(_req: Request, res: Response) {
    const result = await comparisonsService.findAll();

    return res.status(200).json(result);
  }

  async findById(req: Request, res: Response) {
    const result = await comparisonsService.findById(req.params.id);

    return res.status(200).json(result);
  }
}

export default new ComparisonsController();
