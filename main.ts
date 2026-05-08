import { type Request, type Response } from "express";
import data from "./data.json" with { type: "json" };
import express from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Dinosaur API!");
});

app.get("/api", (req: Request, res: Response) => {
  res.send(data);
});

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
