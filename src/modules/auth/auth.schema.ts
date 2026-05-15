import { BaseRules } from "../../core/abstract/core.controller.ts";

class AuthRules extends BaseRules {
  login(data: any) {
    this.validate(
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
  refresh(data: any) {
    this.validate({
      field: "refreshToken",
      value: data.refreshToken,
      rules: ["required", "string"],
    });
  }
}

export default new AuthRules();
