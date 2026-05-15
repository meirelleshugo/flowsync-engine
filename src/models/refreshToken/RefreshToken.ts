import CoreModel from "../../core/abstract/core.model.ts";

import { IRefreshToken } from "./IRefreshToken.ts";

export default class RefreshToken extends CoreModel<IRefreshToken> {
  private userId: string;
  private expiresAt: Date;
  private revoked: boolean;

  constructor(data: IRefreshToken) {
    super(data);
    this.userId = data.userId;
    this.token = data.token;
    this.expiresAt = data.expiresAt;
    this.revoked = data.revoked ?? false;
  }

  get object(): IRefreshToken {
    return {
      _id: this.id,
      createdAt: this.createdAt,
      expiresAt: this.expiresAt,
      updatedAt: this.updatedAt,
      revoked: this.revoked,
      userId: this.userId,
      token: this.token,
    };
  }
}
