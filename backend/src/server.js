import { app } from "./app.js";
import { config } from "./config/env.js";
import { connectDatabase } from "./config/database.js";

await connectDatabase(config.mongoUri);
app.listen(config.port, () => console.log(`Forma AI API listening on http://localhost:${config.port}`));
