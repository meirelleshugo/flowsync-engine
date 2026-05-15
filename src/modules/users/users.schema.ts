import { BaseRules } from "../../core/abstract/core.controller.ts";

class UsersRules extends BaseRules {
  create(data: any) {
    this.validate(
      {
        field: "name",
        value: data.name,
        rules: ["required", "string"],
      },
      {
        field: "email",
        value: data.email,
        rules: ["required", "email"],
      },
      {
        field: "password",
        value: data.password,
        rules: ["required", "string"],
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
        field: "email",
        value: data.email,
        rules: ["email"],
      },
    );
  }
}

export default new UsersRules();
