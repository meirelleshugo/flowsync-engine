import CoreModel from "../../core/abstract/core.model.ts";

export interface IAuth {
  email: string;
  password: string;
}

export default class AuthModel extends CoreModel<IAuth> {
  private _email!: string;
  private _password!: string;

  constructor(data?: Partial<IAuth>) {
    super();

    if (data?.email) this._email = data.email;
    if (data?.password) this._password = data.password;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get object(): IAuth {
    return {
      email: this._email,
      password: this._password,
    };
  }
}
