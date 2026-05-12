import jwt from "jsonwebtoken";

import { JwtConfig } from "../../config/jwt.ts";

export function generateToken(payload: object): string {
  return jwt.sign(payload, JwtConfig.secret, {
    expiresIn: JwtConfig.expiresIn,
  });
}

export function verifyToken(token: string) {
  return jwt.verify(token, JwtConfig.secret);
}
