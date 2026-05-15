import CoreModel from "../../core/abstract/core.model.ts";

import { IComparison } from "./IComparison.ts";

export default class Comparison extends CoreModel<IComparison> {
  private _repositoryId: any;

  private _sourceBranchId: any;
  private _targetBranchId: any;

  private _sourceCommits: any[];
  private _targetCommits: any[];

  private _missingInTarget: string[];
  private _missingInSource: string[];

  private _totalSourceCommits: number;
  private _totalTargetCommits: number;

  private _comparedAt: Date;

  private _active: boolean;

  constructor(data: IComparison) {
    super(data);

    this._repositoryId = data.repositoryId;

    this._sourceBranchId = data.sourceBranchId;
    this._targetBranchId = data.targetBranchId;

    this._sourceCommits = data.sourceCommits;
    this._targetCommits = data.targetCommits;

    this._missingInTarget = data.missingInTarget;
    this._missingInSource = data.missingInSource;

    this._totalSourceCommits = data.totalSourceCommits;
    this._totalTargetCommits = data.totalTargetCommits;

    this._comparedAt = data.comparedAt;

    this._active = data.active ?? true;
  }

  get object(): IComparison {
    return {
      _id: this.id,

      createdAt: this.createdAt,
      updatedAt: this.updatedAt,

      repositoryId: this._repositoryId,

      sourceBranchId: this._sourceBranchId,
      targetBranchId: this._targetBranchId,

      sourceCommits: this._sourceCommits,
      targetCommits: this._targetCommits,

      missingInTarget: this._missingInTarget,
      missingInSource: this._missingInSource,

      totalSourceCommits: this._totalSourceCommits,
      totalTargetCommits: this._totalTargetCommits,

      comparedAt: this._comparedAt,

      active: this._active,
    };
  }
}
