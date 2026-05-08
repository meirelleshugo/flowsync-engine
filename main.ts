import { type Request, type Response } from "express";
import data from "./data.json" with { type: "json" };
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import express from "express";

const app = express();

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
  },
  apis: ["./main.ts"],
};

const specs = swaggerJsdoc(swaggerOptions);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Welcome route
 *     responses:
 *       200:
 *         description: Returns welcome message
 */
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Dinosaur API!");
});

/**
 * @swagger
 * /api:
 *   get:
 *     summary: Get all dinosaurs
 *     responses:
 *       200:
 *         description: Returns all dinosaurs
 */
app.get("/api", (req: Request, res: Response) => {
  res.send(data);
});

/**
 * @swagger
 * /api/{dinosaur}:
 *   get:
 *     summary: Get a dinosaur by name
 *     parameters:
 *       - in: path
 *         name: dinosaur
 *         required: true
 *         schema:
 *           type: string
 *         description: Dinosaur name
 *     responses:
 *       200:
 *         description: Dinosaur found
 *       404:
 *         description: Dinosaur not found
 */
app.get("/api/:dinosaur", (req: Request, res: Response) => {
  if (req?.params?.dinosaur) {
    const found = data.find(
      (item) => item.name.toLowerCase() === req.params.dinosaur.toLowerCase(),
    );

    if (found) {
      res.send(found);
    } else {
      res.status(404).send("No dinosaurs found.");
    }
  }
});

app.listen(8000);

console.log(`
  ╔════════════════════════════════════════════════╗
  ║  Server running at http://localhost:8000       ║
  ║  Docs available at http://localhost:8000/docs  ║
  ╚════════════════════════════════════════════════╝
`);
