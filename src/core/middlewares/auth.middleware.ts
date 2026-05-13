import type { NextFunction, Request, Response } from "express";

import throwlhos from "throwlhos";

import { verifyToken } from "../utils/jwt.ts";

export default function authMiddleware(
  request: Request,
  _: Response,
  next: NextFunction,
) {
  try {
    const bearer = request.headers.authorization;

    if (!bearer) {
      throw throwlhos.default.err_unauthorized("Token não informado.");
    }

    const token = bearer.split(" ")[1];

    const decoded = verifyToken(token);

    request.user = decoded;

    next();
  } catch {
    next(throwlhos.default.err_unauthorized("Token inválido."));
  }
}
