// server/src/db/driver.ts

/**
 * DevGraph — CognoDB / Neo4j Driver
 *
 * Responsibility:
 * - Create and manage the Neo4j driver.
 * - Provide isolated database sessions.
 * - Verify database connectivity.
 * - Close the driver during application shutdown.
 */

import neo4j, {
  type Driver,
  type Session,
  type SessionConfig,
} from "neo4j-driver";

import { env } from "../config/env.js";

let driver: Driver | null = null;

export function getDriver(): Driver {
  if (!driver) {
    driver = neo4j.driver(
      env.COGNODB_URI,
      neo4j.auth.basic(
        env.COGNODB_USERNAME,
        env.COGNODB_PASSWORD,
      ),
      {
        maxConnectionPoolSize: 20,
        connectionAcquisitionTimeout: 10_000,
        connectionTimeout: 10_000,
        maxTransactionRetryTime: 15_000,
      },
    );
  }

  return driver;
}

export function createSession(
  config?: SessionConfig,
): Session {
  return getDriver().session(config);
}

export async function verifyDatabaseConnection(): Promise<void> {
  await getDriver().verifyConnectivity();
}

export async function closeDatabaseConnection(): Promise<void> {
  if (!driver) {
    return;
  }

  await driver.close();
  driver = null;
}