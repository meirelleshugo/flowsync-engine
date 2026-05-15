import { ICore } from "../../core/abstract/core.model.ts";

export interface IRefreshToken extends ICore {
  revoked: boolean;
  expiresAt: Date;
  userId: string;
  token: string;
}
