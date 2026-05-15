import { BaseRules } from "../../core/abstract/core.controller.ts";

class BranchesRules extends BaseRules {
  create(data: any) {
    this.validate(
      {
        field: "name",
        value: data.name,
        rules: ["required", "string"],
      },
      {
        field: "repositoryId",
        value: data.repositoryId,
        rules: ["required"],
      },
    );
  }

  update(data: any) {
    this.validate({
      field: "name",
      value: data.name,
      rules: ["string"],
    });
  }
}

export default new BranchesRules();
