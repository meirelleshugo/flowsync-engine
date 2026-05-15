import { Request, Response } from "express";

import authService from "./auth.service.ts";
import authRules from "./auth.schema.ts";

class AuthController {
  async login(req: Request, res: Response) {
    authRules.login(req.body);

    const result = await authService.login(req.body);

    return res.status(200).json(result);
  }
}

export default new AuthController();
