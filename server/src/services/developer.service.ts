// server/src/services/developer.service.ts

/**
 * DevGraph — Developer Service
 *
 * Responsibility:
 * - Execute developer-related Cypher.
 * - Transform Neo4j records into API-safe objects.
 * - Keep database logic out of controllers.
 */

import neo4j from "neo4j-driver";
import type { Record as Neo4jRecord } from "neo4j-driver";

import { createSession } from "../db/driver.js";

import {
  COUNT_DEVELOPERS,
  GET_DEVELOPER_BY_ID,
  GET_DEVELOPERS,
  SEARCH_DEVELOPERS,
} from "../queries/developers.cypher.js";

/**
 * Safely converts a Neo4j value into a number.
 *
 * Neo4j integer values are normally represented by
 * neo4j.Integer, but this also handles normal numbers
 * and numeric strings defensively.
 */
function toNumber(value: unknown): number {
  if (neo4j.isInt(value)) {
    return value.toNumber();
  }

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value === "string") {
    const parsed = Number(value);

    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
}

/**
 * Retrieves a paginated list of developers.
 */
export async function getDevelopers(
  page = 1,
  limit = 20,
  search?: string,
) {
  const session = createSession();

  try {
    const safePage = Math.max(
      1,
      Math.trunc(page),
    );

    const safeLimit = Math.min(
      Math.max(1, Math.trunc(limit)),
      100,
    );

    const skip =
      (safePage - 1) * safeLimit;

    const normalizedSearch =
      search?.trim() ?? "";

    const query = normalizedSearch
      ? SEARCH_DEVELOPERS
      : GET_DEVELOPERS;

    const result = await session.run(
      query,
      {
        search: normalizedSearch,
        skip: neo4j.int(skip),
        limit: neo4j.int(safeLimit),
      },
    );

    const countResult =
      await session.run(
        COUNT_DEVELOPERS,
      );

    const countRecord =
      countResult.records[0];

    const total = countRecord
      ? toNumber(
          countRecord.get("count"),
        )
      : 0;

    return {
      data: result.records.map(
        (record: Neo4jRecord) =>
          record.get("developer"),
      ),

      pagination: {
        page: safePage,
        limit: safeLimit,
        total,
        totalPages:
          total > 0
            ? Math.ceil(
                total / safeLimit,
              )
            : 0,
      },
    };
  } finally {
    await session.close();
  }
}

/**
 * Retrieves a single developer by ID.
 */
export async function getDeveloperById(
  id: string,
) {
  const session = createSession();

  try {
    const result = await session.run(
      GET_DEVELOPER_BY_ID,
      { id },
    );

    const record =
      result.records[0];

    if (!record) {
      return null;
    }

    return record.get("developer");
  } finally {
    await session.close();
  }
}