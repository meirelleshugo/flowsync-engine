import { Types } from "mongoose";
import { ICore } from "../../core/abstract/core.model.ts";

export interface ICommit extends ICore {
  message: string;
  hash: string;

  repositoryId: Types.ObjectId;
  branchId: Types.ObjectId;

  author?: string;

  active: boolean;
}
