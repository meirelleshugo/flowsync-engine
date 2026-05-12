import type { NextFunction, Request, Response } from "express";

import throwlhos from "throwlhos";

import { verifyToken } from "../utils/jwt.ts";

const authMiddleware = async (
  request: Request,
  _response: Response,
  next: NextFunction,
) => {
  try {
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw throwlhos.default.err_unauthorized("Token not provided.");
    }

    const [, token] = authorization.split(" ");

    if (!token) {
      throw throwlhos.default.err_unauthorized("Invalid token.");
    }

    const decoded = verifyToken(token);

    request.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
