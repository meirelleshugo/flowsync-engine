import { ICore } from "../../core/abstract/core.model.ts";
import { Types } from "mongoose";

export interface IBranch extends ICore {
  repositoryId: Types.ObjectId;
  active: boolean;
  name: string;
}
