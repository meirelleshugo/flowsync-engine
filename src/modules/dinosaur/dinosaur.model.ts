import CoreModel from "../../core/abstract/core.model.ts";

export interface IDinosaur {
  _id?: string;
  name: string;
  type: string;
  createdAt?: Date;
}

export default class DinosaurModel extends CoreModel<IDinosaur> {
  private _id?: string;
  private _name!: string;
  private _type!: string;
  private _createdAt?: Date;

  constructor(data?: Partial<IDinosaur>) {
    super();

    if (data?._id) this._id = data._id;
    if (data?.name) this._name = data.name;
    if (data?.type) this._type = data.type;
    if (data?.createdAt) this._createdAt = data.createdAt;
  }

  get id(): string | undefined {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get type(): string {
    return this._type;
  }

  set type(value: string) {
    this._type = value;
  }

  get object(): IDinosaur {
    return {
      _id: this._id,
      name: this._name,
      type: this._type,
      createdAt: this._createdAt,
    };
  }
}
