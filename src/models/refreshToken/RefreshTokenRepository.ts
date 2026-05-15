import { BaseSchema, $def } from "../../core/abstract/core.schema.ts";
import CoreRepository from "../../core/abstract/core.repository.ts";
import { IRefreshToken } from "./IRefreshToken.ts";
import mongoose from "mongoose";

class RefreshTokenSchema extends BaseSchema {
  constructor() {
    super({
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: $def.required(),
      },

      token: {
        type: String,
        required: $def.required(),
        unique: true,
      },

      expiresAt: {
        type: Date,
        required: $def.required(),
      },

      revoked: {
        type: Boolean,
        default: false,
      },
    });

    this.schema.index(
      {
        expiresAt: 1,
      },
      {
        expireAfterSeconds: 0,
      },
    );
  }
}

const schema = new RefreshTokenSchema().schema;

const RefreshTokenModel = mongoose.model<IRefreshToken>(
  "refresh_tokens",
  schema,
);

export default class RefreshTokenRepository extends CoreRepository<IRefreshToken> {
  constructor() {
    super(RefreshTokenModel);
  }
}
