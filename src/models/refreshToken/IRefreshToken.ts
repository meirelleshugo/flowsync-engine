import { ICore } from "../../core/abstract/core.model.ts";

export interface IRefreshToken extends ICore {
  userId: string;

  token: string;

  expiresAt: Date;

  revoked: boolean;
}
