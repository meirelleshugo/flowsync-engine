import type { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.ts";
import throwlhos from "throwlhos";

export default function authMiddleware(
  request: Request,
  _: Response,
  next: NextFunction,
) {
  try {
    const bearer = request.headers.authorization;

    if (!bearer) {
      throw throwlhos.default.err_unauthorized("Token not provided.");
    }

    const token = bearer.split(" ")[1];

    const decoded = verifyToken(token);

    request.user = decoded;

    next();
  } catch {
    next(throwlhos.default.err_unauthorized("Invalid token."));
  }
}
