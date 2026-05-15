import mongoose from "mongoose";

import CoreRepository from "../../core/abstract/core.repository.ts";
import { BaseSchema, $def } from "../../core/abstract/core.schema.ts";

import { IComparison } from "./IComparison.ts";

class ComparisonSchema extends BaseSchema {
  constructor() {
    super({
      repositoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "repositories",
        required: $def.required(),
        validate: $def.validate.objectId("repositoryId"),
      },

      sourceBranchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "branches",
        required: $def.required(),
        validate: $def.validate.objectId("sourceBranchId"),
      },

      targetBranchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "branches",
        required: $def.required(),
        validate: $def.validate.objectId("targetBranchId"),
      },

      sourceCommits: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "commits",
        },
      ],

      targetCommits: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "commits",
        },
      ],

      missingInTarget: [
        {
          type: String,
        },
      ],

      missingInSource: [
        {
          type: String,
        },
      ],

      totalSourceCommits: {
        type: Number,
        required: $def.required(),
      },

      totalTargetCommits: {
        type: Number,
        required: $def.required(),
      },

      comparedAt: {
        type: Date,
        required: $def.required(),
      },

      active: {
        type: Boolean,
        default: true,
      },
    });
  }
}

const schema = new ComparisonSchema().schema;

schema.index({
  repositoryId: 1,
  sourceBranchId: 1,
  targetBranchId: 1,
  comparedAt: -1,
});

const ComparisonModel = mongoose.model<IComparison>("comparisons", schema);

export default class ComparisonRepository extends CoreRepository<IComparison> {
  constructor() {
    super(ComparisonModel, [
      {
        ref: "repositoryId",
        select: ["name"],
      },
      {
        ref: "sourceBranchId",
        select: ["name"],
      },
      {
        ref: "targetBranchId",
        select: ["name"],
      },
    ]);
  }
}
