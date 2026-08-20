// server/src/app.ts

/**
 * DevGraph — Express Application
 *
 * This file configures the API but does not start the server.
 */

import express from "express";
import cors from "cors";
import helmet from "helmet";

import { env } from "./config/env.js";
import developerRoutes from "./routes/developer.routes.js";
import projectRoutes from "./routes/project.routes.js";
import technologyRoutes from "./routes/technology.routes.js";
import graphRoutes from "./routes/graph.routes.js";
import healthRoutes from "./routes/health.routes.js";

import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

export const app = express();

app.disable("x-powered-by");

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  }),
);

app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: false,
  }),
);

app.use(
  express.json({
    limit: "1mb",
  }),
);

app.get("/api", (_req, res) => {
  res.json({
    success: true,
    name: "DevGraph API",
    version: "1.0.0",
  });
});

app.use(
  "/api/health",
  healthRoutes,
);

app.use(
  "/api/developers",
  developerRoutes,
);

app.use(
  "/api/projects",
  projectRoutes,
);

app.use(
  "/api/technologies",
  technologyRoutes,
);

app.use(
  "/api/graph",
  graphRoutes,
);

app.use(notFound);
app.use(errorHandler);