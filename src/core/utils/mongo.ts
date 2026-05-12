import { environment } from "../../config/env.ts";
import mongoose from "mongoose";

const { mongoUsername, mongoPassword, mongoDbName, mongoUri } = environment;

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

    const options: mongoose.ConnectOptions = {
      serverSelectionTimeoutMS: 5000,
      dbName: mongoDbName,
      user: mongoUsername,
      pass: mongoPassword,
    };

    this.connectionPromise = mongoose.connect(mongoUri, options);

    await this.connectionPromise;

    console.log(`\nConnected to MongoDB: ${mongoDbName}`);

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
