import { environment } from "../../config/env.ts";
import mongoose from "mongoose";

class MongoService {
  private static instance: MongoService;

  private connectionPromise: Promise<typeof mongoose> | null = null;

  private constructor() {}

  public static getInstance(): MongoService {
    if (!MongoService.instance) {
      MongoService.instance = new MongoService();
    }
    return MongoService.instance;
  }

  public async connect(): Promise<typeof mongoose> {
    if (this.connectionPromise) {
      return this.connectionPromise;
    }

    this.connectionPromise = mongoose.connect(environment.mongoUri, {
      dbName: environment.mongoDbName,
      user: environment.mongoUsername,
      pass: environment.mongoPassword,
      serverSelectionTimeoutMS: 5000,
    });

    await this.connectionPromise;

    console.log(`Connected to MongoDB: ${environment.mongoDbName}`);

    return mongoose;
  }

  public getDb() {
    if (!mongoose.connection.db) {
      throw new Error("MongoDB is not connected yet");
    }

    return mongoose.connection.db;
  }
}

export const mongoService = MongoService.getInstance();
