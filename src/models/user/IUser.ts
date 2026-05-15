import { ICore } from "../../core/abstract/core.model.ts";

export interface IUser extends ICore {
  name: string;
  email: string;
  password: string;
  active: boolean;
}
