// server/src/db/driver.ts

/**
 * DevGraph — CognoDB / Neo4j Driver
 *
 * Responsibility:
 * - Create the official Neo4j JavaScript driver.
 * - Provide database sessions.
 * - Verify connectivity.
 * - Close the driver during application shutdown.
 *
 * Architecture:
 *
 * Express
 *    ↓
 * Service
 *    ↓
 * Neo4j Driver
 *    ↓
 * CognoDB
 */

import neo4j, {
  Driver,
  Session,
  SessionConfig,
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
  const databaseDriver = getDriver();

  await databaseDriver.verifyConnectivity();
}

export async function closeDatabaseConnection(): Promise<void> {
  if (!driver) {
    return;
  }

  await driver.close();
  driver = null;
}