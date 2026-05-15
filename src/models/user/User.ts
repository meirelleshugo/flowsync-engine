import CoreModel from "../../core/abstract/core.model.ts";

import { IUser } from "./IUser.ts";

export default class User extends CoreModel<IUser> {
  private _name: string;
  private _email: string;
  private _password: string;
  private _active: boolean;

  constructor(data: IUser) {
    super(data);
    this._name = data.name;
    this._email = data.email;
    this._password = data.password;
    this._active = data.active ?? true;
  }

  get object(): IUser {
    return {
      _id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      password: this._password,
      active: this._active,
      email: this._email,
      name: this._name,
    };
  }
}
