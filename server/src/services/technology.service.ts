// server/src/services/technology.service.ts

/**
 * DevGraph — Technology Service
 *
 * Responsibility:
 * - Execute technology-related Cypher queries.
 * - Transform Neo4j records into API-safe objects.
 * - Prevent Neo4j Integer objects from reaching the frontend.
 * - Keep database logic out of controllers.
 */

import type { Record as Neo4jRecord } from "neo4j-driver";

import { createSession } from "../db/driver.js";

import {
  GET_TECHNOLOGIES,
  GET_TECHNOLOGY_BY_ID,
} from "../queries/technologies.cypher.js";

import {
  serializeNeo4jValue,
} from "../utils/neo4j.js";

/**
 * Retrieves all technologies.
 *
 * Every returned Neo4j value is recursively serialized
 * so Neo4j Integer values such as:
 *
 * {
 *   low: 10,
 *   high: 0
 * }
 *
 * become normal JavaScript numbers:
 *
 * 10
 */
export async function getTechnologies() {
  const session = createSession();

  try {
    const result = await session.run(
      GET_TECHNOLOGIES,
    );

    return result.records.map(
      (record: Neo4jRecord) =>
        serializeNeo4jValue(
          record.get("technology"),
        ),
    );
  } finally {
    await session.close();
  }
}

/**
 * Retrieves a single technology by ID.
 */
export async function getTechnologyById(
  id: string,
) {
  const session = createSession();

  try {
    const result = await session.run(
      GET_TECHNOLOGY_BY_ID,
      { id },
    );

    const record =
      result.records[0];

    /**
     * No matching technology.
     */
    if (!record) {
      return null;
    }

    /**
     * Serialize the complete technology
     * object before returning it.
     *
     * This prevents Neo4j Integer objects
     * from reaching React.
     */
    return serializeNeo4jValue(
      record.get("technology"),
    );
  } finally {
    await session.close();
  }
}