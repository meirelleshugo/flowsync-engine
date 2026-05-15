import mongoose from "mongoose";
import CoreRepository from "../../core/abstract/core.repository.ts";
import { BaseSchema, $def } from "../../core/abstract/core.schema.ts";
import { IRepo } from "./IRepo.ts";

class RepoSchema extends BaseSchema {
  constructor() {
    super({
      name: {
        type: String,
        required: $def.required(),
        unique: true,
        trim: true,
      },

      description: {
        type: String,
      },

      url: {
        type: String,
      },

      active: {
        type: Boolean,
        default: true,
      },
    });
  }
}

const schema = new RepoSchema().schema;

const RepoModel = mongoose.model<IRepo>("repositories", schema);

export default class RepoRepository extends CoreRepository<IRepo> {
  constructor() {
    super(RepoModel);
  }
}
