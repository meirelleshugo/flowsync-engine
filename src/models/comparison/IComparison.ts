import { ICore } from "../../core/abstract/core.model.ts";
import { Types } from "mongoose";

export interface IComparison extends ICore {
  repositoryId: Types.ObjectId;

  sourceBranchId: Types.ObjectId;
  targetBranchId: Types.ObjectId;

  sourceCommits: Types.ObjectId[];
  targetCommits: Types.ObjectId[];

  missingInTarget: string[];
  missingInSource: string[];

  totalSourceCommits: number;
  totalTargetCommits: number;

  comparedAt: Date;

  active: boolean;
}
