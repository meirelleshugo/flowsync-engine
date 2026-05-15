import CoreModel from "../../core/abstract/core.model.ts";
import { IRepo } from "./IRepo.ts";

export default class Repo extends CoreModel<IRepo> {
  private _name: string;
  private _description?: string;
  private _url?: string;
  private _active: boolean;

  constructor(data: IRepo) {
    super(data);

    this._name = data.name;
    this._description = data.description;
    this._url = data.url;
    this._active = data.active ?? true;
  }

  get object(): IRepo {
    return {
      _id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,

      name: this._name,
      description: this._description,
      url: this._url,
      active: this._active,
    };
  }
}
