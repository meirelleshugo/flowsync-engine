import CoreModel from "../../core/abstract/core.model.ts";
import { ICommit } from "./ICommit.ts";

export default class Commit extends CoreModel<ICommit> {
  private _message: string;
  private _hash: string;

  private _repositoryId: any;
  private _branchId: any;

  private _author?: string;

  private _active: boolean;

  constructor(data: ICommit) {
    super(data);

    this._message = data.message;
    this._hash = data.hash;

    this._repositoryId = data.repositoryId;
    this._branchId = data.branchId;

    this._author = data.author;

    this._active = data.active ?? true;
  }

  get object(): ICommit {
    return {
      _id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,

      message: this._message,
      hash: this._hash,

      repositoryId: this._repositoryId,
      branchId: this._branchId,

      author: this._author,

      active: this._active,
    };
  }
}
