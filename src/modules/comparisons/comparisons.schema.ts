import { BaseRules } from "../../core/abstract/core.controller.ts";

class ComparisonsRules extends BaseRules {
  compare(data: any) {
    this.validate(
      {
        field: "repositoryId",
        value: data.repositoryId,
        rules: ["required"],
      },
      {
        field: "sourceBranchId",
        value: data.sourceBranchId,
        rules: ["required"],
      },
      {
        field: "targetBranchId",
        value: data.targetBranchId,
        rules: ["required"],
      },
    );
  }
}

export default new ComparisonsRules();
