// server/src/services/project.service.ts

/**
 * DevGraph — Project Service
 *
 * Responsibility:
 * - Execute project-related Cypher.
 * - Transform Neo4j records into API-safe objects.
 * - Keep database logic out of controllers.
 */

import neo4j from "neo4j-driver";
import type { Record as Neo4jRecord } from "neo4j-driver";

import { createSession } from "../db/driver.js";

import {
  COUNT_PROJECTS,
  GET_PROJECTS,
  GET_PROJECT_BY_ID,
} from "../queries/projects.cypher.js";

/**
 * Safely converts Neo4j values into numbers.
 */
function toNumber(value: unknown): number {
  if (neo4j.isInt(value)) {
    return value.toNumber();
  }

  if (typeof value === "number") {
    return Number.isFinite(value)
      ? value
      : 0;
  }

  if (typeof value === "string") {
    const parsed = Number(value);

    return Number.isFinite(parsed)
      ? parsed
      : 0;
  }

  return 0;
}

/**
 * Retrieves a paginated list of projects.
 */
export async function getProjects(
  page = 1,
  limit = 20,
) {
  const session = createSession();

  try {
    const safePage = Math.max(
      1,
      Math.trunc(page),
    );

    const safeLimit = Math.min(
      Math.max(
        1,
        Math.trunc(limit),
      ),
      100,
    );

    const skip =
      (safePage - 1) *
      safeLimit;

    const result =
      await session.run(
        GET_PROJECTS,
        {
          skip: neo4j.int(skip),
          limit: neo4j.int(
            safeLimit,
          ),
        },
      );

    const countResult =
      await session.run(
        COUNT_PROJECTS,
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
          record.get("project"),
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
 * Retrieves a single project by ID.
 */
export async function getProjectById(
  id: string,
) {
  const session = createSession();

  try {
    const result =
      await session.run(
        GET_PROJECT_BY_ID,
        { id },
      );

    const record =
      result.records[0];

    if (!record) {
      return null;
    }

    return record.get(
      "project",
    );
  } finally {
    await session.close();
  }
}