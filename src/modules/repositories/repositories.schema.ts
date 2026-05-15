import { BaseRules } from "../../core/abstract/core.controller.ts";

class RepositoriesRules extends BaseRules {
  create(data: any) {
    this.validate(
      {
        field: "name",
        value: data.name,
        rules: ["required", "string"],
      },
      {
        field: "description",
        value: data.description,
        rules: ["string"],
      },
      {
        field: "url",
        value: data.url,
        rules: ["string"],
      },
    );
  }

  update(data: any) {
    this.validate(
      {
        field: "name",
        value: data.name,
        rules: ["string"],
      },
      {
        field: "description",
        value: data.description,
        rules: ["string"],
      },
      {
        field: "url",
        value: data.url,
        rules: ["string"],
      },
    );
  }
}

export default new RepositoriesRules();
