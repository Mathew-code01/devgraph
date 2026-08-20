// server/src/server.ts

/**
 * DevGraph — HTTP Server Entry Point
 */

import { app } from "./app.js";
import { env } from "./config/env.js";
import {
  closeDatabaseConnection,
  verifyDatabaseConnection,
} from "./db/driver.js";

async function startServer() {
  try {
    console.log("Connecting to CognoDB...");

    await verifyDatabaseConnection();

    console.log("CognoDB connection established.");

    const server = app.listen(
      env.PORT,
      () => {
        console.log(
          `DevGraph API running on http://localhost:${env.PORT}`,
        );
      },
    );

    const shutdown = async (
      signal: string,
    ) => {
      console.log(
        `${signal} received. Shutting down...`,
      );

      server.close(async () => {
        await closeDatabaseConnection();

        console.log(
          "DevGraph server stopped cleanly.",
        );

        process.exit(0);
      });
    };

    process.on(
      "SIGINT",
      () => void shutdown("SIGINT"),
    );

    process.on(
      "SIGTERM",
      () => void shutdown("SIGTERM"),
    );
  } catch (error) {
    console.error(
      "Unable to start DevGraph:",
      error,
    );

    await closeDatabaseConnection();

    process.exit(1);
  }
}

void startServer();