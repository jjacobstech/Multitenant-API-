import app from "./app.js";
import { env } from "./config/env.config.js";
import { dbInit } from "./lib/index.js";

const PORT = env.PORT;
const database = env.APP_NAME;
app
  .listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);
      await dbInit();
  })
  .on("error", (err) => {
    console.log("Error starting server", err);
  });
