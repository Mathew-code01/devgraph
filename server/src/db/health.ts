// server/src/db/health.ts

/**
 * DevGraph — Database Health
 *
 * Responsibility:
 * - Check whether CognoDB is reachable.
 * - Return a safe health status for the API.
 */

import { createSession } from "./driver.js";

export interface DatabaseHealth {
  status: "healthy" | "unhealthy";
  latencyMs?: number;
  message?: string;
}

export async function getDatabaseHealth(): Promise<DatabaseHealth> {
  const startedAt = Date.now();
  const session = createSession();

  try {
    await session.run("RETURN 1 AS health");

    return {
      status: "healthy",
      latencyMs: Date.now() - startedAt,
    };
  } catch (error) {
    console.error("CognoDB health check failed:", error);

    return {
      status: "unhealthy",
      latencyMs: Date.now() - startedAt,
      message: "Database is unreachable",
    };
  } finally {
    await session.close();
  }
}