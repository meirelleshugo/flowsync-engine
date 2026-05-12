import type { NextFunction, Request, Response } from "express";

import "responser";

const errorMiddleware = (
  error: any,
  _request: Request,
  response: Response,
  _next: NextFunction,
) => {
  console.error(error);

  if (error?.statusCode) {
    return response.status(error.statusCode).json({
      success: false,
      code: error.statusCode,
      message: error.message,
      data: error.data || null,
    });
  }

  return response.send_internalServerError(
    error?.message || "Internal server error.",
  );
};

export default errorMiddleware;
