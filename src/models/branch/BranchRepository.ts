import { $def, BaseSchema } from "../../core/abstract/core.schema.ts";
import CoreRepository from "../../core/abstract/core.repository.ts";
import { IBranch } from "./IBranch.ts";
import mongoose from "mongoose";

class BranchSchema extends BaseSchema {
  constructor() {
    super({
      name: {
        type: String,
        required: $def.required(),
        trim: true,
      },

      repositoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "repositories",
        required: $def.required(),
        validate: $def.validate.objectId("repositoryId"),
      },

      active: {
        type: Boolean,
        default: true,
      },
    });
  }
}

const schema = new BranchSchema().schema;

schema.index(
  {
    repositoryId: 1,
    name: 1,
  },
  {
    unique: true,
  },
);

const BranchModel = mongoose.model<IBranch>("branches", schema);

export default class BranchRepository extends CoreRepository<IBranch> {
  constructor() {
    super(BranchModel, [
      {
        ref: "repositoryId",
        select: ["name", "url"],
      },
    ]);
  }
}
