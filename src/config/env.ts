import { load } from "@std/dotenv";

const env = await load({
  envPath: ".env",
  export: true,
});

class EnvService {
  private readonly variables = env;

  public get mongoUri(): string {
    const value = this.variables.MONGO_URI;

    if (!value) {
      throw new Error("MONGO_URI is not defined");
    }

    return value;
  }

  public get mongoDbName(): string {
    const value = this.variables.MONGO_DB_NAME;

    if (!value) {
      throw new Error("MONGO_DB_NAME is not defined");
    }

    return value;
  }

  public get mongoPort(): number {
    const value = this.variables.MONGO_PORT;

    if (!value) {
      throw new Error("MONGO_PORT is not defined");
    }

    return Number(value);
  }

  public get mongoUsername(): string {
    const value = this.variables.MONGO_USERNAME;

    if (!value) {
      throw new Error("MONGO_USERNAME is not defined");
    }

    return value;
  }

  public get mongoPassword(): string {
    const value = this.variables.MONGO_PASSWORD;

    if (!value) {
      throw new Error("MONGO_PASSWORD is not defined");
    }

    return value;
  }

  public get port(): number {
    return Number(this.variables.PORT || 8000);
  }
}

export const environment = new EnvService();
