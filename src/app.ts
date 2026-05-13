import errorMiddleware from "./core/middlewares/error.middleware.ts";
import usersRoutes from "./modules/users/users.routes.ts";
import authRoutes from "./modules/auth/auth.routes.ts";
import { swaggerUi, specs } from "./config/swagger.ts";
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

app.use("/users", usersRoutes);

/**
 * ERROR MIDDLEWARE
 */

app.use(errorMiddleware);

export default app;
