import { ICore } from "../../core/abstract/core.model.ts";
import { Types } from "mongoose";

export interface IRepo extends ICore {
  name: string;
  description?: string;
  url?: string;
  active: boolean;
}
