import "responser";

import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import morgan from "morgan";

import { mongoService } from "./core/utils/mongo.ts";

import dinosaurRoutes from "./modules/dinosaur/dinosaur.routes.ts";
import authRoutes from "./modules/auth/auth.routes.ts";

import errorMiddleware from "./core/middlewares/error.middleware.ts";

const app = express();

app.use(express.json());

/**
 * LOGS
 */

app.use(morgan("dev"));

/**
 * SWAGGER
 */

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "FlowSync Engine API",
      version: "1.0.0",
      description:
        "Branch Governance & Synchronization Platform API Documentation",
    },
    servers: [
      {
        url: "http://localhost:8000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  apis: ["./src/modules/**/*.ts"],
};

const specs = swaggerJsdoc(swaggerOptions);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

/**
 * HEALTH CHECK
 */

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check route
 *     responses:
 *       200:
 *         description: API running successfully
 */

app.get("/", (_request, response) => {
  return response.send_ok("FlowSync Engine API running successfully.", {
    status: "online",
  });
});

/**
 * MONGO CHECK
 */

/**
 * @swagger
 * /mongo:
 *   get:
 *     summary: MongoDB connection status
 *     responses:
 *       200:
 *         description: Mongo connected
 */

app.get("/mongo", async (_request, response, next) => {
  try {
    const db = mongoService.getDb();

    const collections = await db?.listCollections().toArray();

    return response.send_ok("MongoDB conectado com sucesso!", {
      database: db?.databaseName,
      collections,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * ROUTES
 */

app.use("/auth", authRoutes);

app.use("/dinosaurs", dinosaurRoutes);

/**
 * ERROR MIDDLEWARE
 */

app.use(errorMiddleware);

/**
 * DATABASE
 */

await mongoService.connect();

/**
 * SERVER
 */

const PORT = 8000;

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════╗
║                                                ║
║   FlowSync Engine API running successfully     ║
║                                                ║
║   Local: http://localhost:${PORT}              ║
║   Docs:  http://localhost:${PORT}/docs         ║
║                                                ║
╚════════════════════════════════════════════════╝
`);
});

export default app;
