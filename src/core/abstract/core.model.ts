import { Types } from "mongoose";

export interface ICore {
  _id?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

export default abstract class CoreModel<T> {
  protected _id?: Types.ObjectId;
  protected _createdAt?: Date;
  protected _updatedAt?: Date;

  constructor(data?: ICore) {
    if (data?._id) this._id = data._id;
    if (data?.createdAt) this._createdAt = data.createdAt;
    if (data?.updatedAt) this._updatedAt = data.updatedAt;
  }

  abstract get object(): T;

  get id(): Types.ObjectId | undefined {
    return this._id;
  }

  get createdAt(): Date | undefined {
    return this._createdAt;
  }

  get updatedAt(): Date | undefined {
    return this._updatedAt;
  }
}
