import { mongoService } from "./core/utils/mongo.ts";
import app from "./app.ts";

const PORT = 8000;

await mongoService.connect();

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════╗
║                                                ║
║   FlowSync Engine API running successfully     ║
║                                                ║
║   Local: http://localhost:${PORT}                 ║
║   Docs:  http://localhost:${PORT}/docs            ║
║                                                ║
╚════════════════════════════════════════════════╝
`);
});
