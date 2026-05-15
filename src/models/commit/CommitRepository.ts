import { BaseSchema, $def } from "../../core/abstract/core.schema.ts";
import CoreRepository from "../../core/abstract/core.repository.ts";
import { ICommit } from "./ICommit.ts";
import mongoose from "mongoose";

class CommitSchema extends BaseSchema {
  constructor() {
    super({
      message: {
        type: String,
        required: $def.required(),
        trim: true,
      },

      hash: {
        type: String,
        required: $def.required(),
        unique: true,
        trim: true,
      },

      repositoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "repositories",
        required: $def.required(),
        validate: $def.validate.objectId("repositoryId"),
      },

      branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "branches",
        required: $def.required(),
        validate: $def.validate.objectId("branchId"),
      },

      author: {
        type: String,
      },

      active: {
        type: Boolean,
        default: true,
      },
    });
  }
}

const schema = new CommitSchema().schema;

schema.index({
  branchId: 1,
  createdAt: -1,
});

const CommitModel = mongoose.model<ICommit>("commits", schema);

export default class CommitRepository extends CoreRepository<ICommit> {
  constructor() {
    super(CommitModel, [
      {
        ref: "repositoryId",
        select: ["name"],
      },
      {
        ref: "branchId",
        select: ["name"],
      },
    ]);
  }
}
