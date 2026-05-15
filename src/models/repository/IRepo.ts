import { ICore } from "../../core/abstract/core.model.ts";

export interface IRepo extends ICore {
  name: string;
  description?: string;
  url?: string;
  active: boolean;
}
