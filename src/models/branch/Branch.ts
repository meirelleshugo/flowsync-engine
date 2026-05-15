import CoreModel from "../../core/abstract/core.model.ts";
import { IBranch } from "./IBranch.ts";

export default class Branch extends CoreModel<IBranch> {
  private _name: string;
  private _repositoryId: any;
  private _active: boolean;

  constructor(data: IBranch) {
    super(data);

    this._name = data.name;
    this._repositoryId = data.repositoryId;
    this._active = data.active ?? true;
  }

  get object(): IBranch {
    return {
      _id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,

      name: this._name,
      repositoryId: this._repositoryId,
      active: this._active,
    };
  }
}
