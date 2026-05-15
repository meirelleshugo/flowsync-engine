import mongoose from "mongoose";
import bcrypt from "bcrypt";

import CoreRepository from "../../core/abstract/core.repository.ts";
import { BaseSchema, $def } from "../../core/abstract/core.schema.ts";

import { IUser } from "./IUser.ts";

class UserSchema extends BaseSchema {
  constructor() {
    super({
      name: {
        type: String,
        required: $def.required(),
        trim: true,
      },

      email: {
        type: String,
        required: $def.required(),
        unique: true,
        lowercase: true,
        trim: true,
      },

      password: {
        type: String,
        required: $def.required(),
        minlength: 6,
      },

      active: {
        type: Boolean,
        default: true,
      },
    });

    this.schema.pre("save", async function (next) {
      if (!this.isModified("password")) {
        return next();
      }

      this.password = await bcrypt.hash(this.password, 10);

      next();
    });

    this.schema.set("toJSON", {
      transform: (_doc, ret) => {
        delete ret.password;

        return ret;
      },
    });
  }
}

const schema = new UserSchema().schema;

const UserModel = mongoose.model<IUser>("users", schema);

export default class UserRepository extends CoreRepository<IUser> {
  constructor() {
    super(UserModel);
  }
}
