import { BaseRules } from "../../core/abstract/core.controller.ts";

class CommitsRules extends BaseRules {
  create(data: any) {
    this.validate(
      {
        field: "message",
        value: data.message,
        rules: ["required", "string"],
      },
      {
        field: "hash",
        value: data.hash,
        rules: ["required", "string"],
      },
      {
        field: "repositoryId",
        value: data.repositoryId,
        rules: ["required"],
      },
      {
        field: "branchId",
        value: data.branchId,
        rules: ["required"],
      },
      {
        field: "author",
        value: data.author,
        rules: ["string"],
      },
    );
  }

  update(data: any) {
    this.validate(
      {
        field: "message",
        value: data.message,
        rules: ["string"],
      },
      {
        field: "author",
        value: data.author,
        rules: ["string"],
      },
    );
  }
}

export default new CommitsRules();
