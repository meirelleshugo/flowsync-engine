import requestCheck from "request-check";

const rc = requestCheck.default();

export default abstract class BaseRules {
  protected rc = rc;
}
