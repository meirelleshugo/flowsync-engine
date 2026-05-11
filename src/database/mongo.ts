import type { ConnectOptions as MongooseConnectOptions } from "mongoose";
import { environment } from "../config/env.ts";
import mongoose from "mongoose";

const { mongoUri, mongoDbName, mongoUsername, mongoPassword } = environment;

export interface ConnectOptions extends MongooseConnectOptions {
  sanitizeFilter?: boolean;
  bufferCommands?: boolean;
  autoCreate?: boolean;
  autoIndex?: boolean;
  dbName?: string;
  user?: string;
  pass?: string;
}

try {
  const options: ConnectOptions = {
    autoSelectFamilyAttemptTimeout: undefined,
    allowPartialTrustChain: undefined,
    serverSelectionTimeoutMS: 5000,
    checkServerIdentity: undefined,
    rejectUnauthorized: undefined,
    autoSelectFamily: undefined,
    secureProtocol: undefined,
    ALPNProtocols: undefined,
    secureContext: undefined,
    localAddress: undefined,
    servername: undefined,
    sanitizeFilter: false,
    passphrase: undefined,
    bufferCommands: true,
    ecdhCurve: undefined,
    localPort: undefined,
    minDHSize: undefined,
    authSource: "admin",
    dbName: mongoDbName,
    user: mongoUsername,
    pass: mongoPassword,
    session: undefined,
    ciphers: undefined,
    lookup: undefined,
    family: undefined,
    hints: undefined,
    autoCreate: true,
    autoIndex: true,
    cert: undefined,
    crl: undefined,
    key: undefined,
    pfx: undefined,
    ca: undefined,
  };

  await mongoose.connect(mongoUri, options);

  console.log(`Connected to MongoDB Cluster via Mongoose: ${mongoDbName}`);
} catch (err) {
  throw err;
}
