import { environment } from "./env.ts";

const { jwtExpiresIn, jwtSecret } = environment;

export const JwtConfig = {
  expiresIn: jwtExpiresIn,
  secret: jwtSecret,
};
