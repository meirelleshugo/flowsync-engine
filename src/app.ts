import errorMiddleware from "./core/middlewares/error.middleware.ts";
import repositoriesModule from "./modules/repositories/index.ts";
import comparisonsModule from "./modules/comparisons/index.ts";
import branchesModule from "./modules/branches/index.ts";
import { swaggerUi, specs } from "./config/swagger.ts";
import commitsModule from "./modules/commits/index.ts";
import usersModule from "./modules/users/index.ts";
import authModule from "./modules/auth/index.ts";
import responser from "responser";
import express from "express";
import morgan from "morgan";

const app = express();

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use(express.static("public"));
app.use(responser.default);
app.use(express.json());
app.use(morgan("dev"));

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

// Routes
app.use("/repositories", repositoriesModule);
app.use("/comparisons", comparisonsModule);
app.use("/branches", branchesModule);
app.use("/commits", commitsModule);
app.use("/users", usersModule);
app.use("/auth", authModule);

// Error Middleware
app.use(errorMiddleware);

export default app;
