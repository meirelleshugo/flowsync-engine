import requestCheck from "request-check";

export default abstract class CoreController {
  protected rules = requestCheck;
}
