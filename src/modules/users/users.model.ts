import CoreModel, { ICore } from "../../core/abstract/core.model.ts";

export interface IUser extends ICore {
  email: string;
  password: string;
}

export default class UsersModel extends CoreModel<IUser> {
  private _email!: string;
  private _password!: string;

  constructor(data?: Partial<IUser>) {
    super(data);

    if (data?.email) this._email = data.email;
    if (data?.password) this._password = data.password;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get object(): IUser {
    return {
      _id: this._id,
      email: this._email,
      password: this._password,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
