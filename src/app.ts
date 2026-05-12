import errorMiddleware from "./core/middlewares/error.middleware.ts";
import dinosaurRoutes from "./modules/dinosaur/dinosaur.routes.ts";
import authRoutes from "./modules/auth/auth.routes.ts";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import responser from "responser";
import express from "express";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(responser.default);
app.use(express.static("public"));

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

    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: ["./src/modules/**/*.ts", "./src/app.ts"],
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
 * ROUTES
 */

app.use("/auth", authRoutes);

app.use("/dinosaurs", dinosaurRoutes);

/**
 * ERROR MIDDLEWARE
 */

app.use(errorMiddleware);

export default app;
