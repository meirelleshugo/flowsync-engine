import { Types } from "mongoose";
import { ICore } from "../../core/abstract/core.model.ts";

export interface IBranch extends ICore {
  name: string;
  repositoryId: Types.ObjectId;
  active: boolean;
}
