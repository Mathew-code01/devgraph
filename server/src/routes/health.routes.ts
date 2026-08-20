// server/src/routes/health.routes.ts

/**
 * DevGraph — Health Routes
 */

import { Router } from "express";

import { getDatabaseHealth } from "../db/health.js";

const router = Router();

router.get("/", async (_req, res) => {
  const database =
    await getDatabaseHealth();

  const healthy =
    database.status === "healthy";

  res.status(healthy ? 200 : 503).json({
    success: healthy,
    status: healthy
      ? "healthy"
      : "degraded",

    service: "devgraph-api",

    database,

    timestamp:
      new Date().toISOString(),
  });
});

export default router;