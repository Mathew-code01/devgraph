// server/src/services/graph.service.ts

/**
 * DevGraph — Graph Service
 *
 * Responsibility:
 * - Perform graph-specific operations.
 * - Normalize graph data for React Flow.
 */

import neo4j from "neo4j-driver";
import type { Record as Neo4jRecord } from "neo4j-driver";

import {
  EXPLORE_DEVELOPER_GRAPH,
  FIND_DEVELOPERS_BY_TECHNOLOGY,
  FIND_RELATED_TECHNOLOGIES,
  GET_GRAPH_OVERVIEW,
  GET_GRAPH_RELATIONSHIP_OVERVIEW,
} from "../queries/graph.cypher.js";

import { createSession } from "../db/driver.js";

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
 * Explore the graph around a developer.
 */
export async function exploreDeveloperGraph(
  developerId: string,
  depth = 2,
) {
  const safeDepth = Math.min(
    Math.max(
      Math.trunc(depth),
      1,
    ),
    4,
  );

  const session = createSession();

  try {
    const result =
      await session.run(
        EXPLORE_DEVELOPER_GRAPH(
          safeDepth,
        ),
        {
          developerId,
        },
      );

    const record =
      result.records[0];

    if (!record) {
      return {
        nodes: [],
        relationships: [],
      };
    }

    return {
      nodes: record.get("nodes"),
      relationships:
        record.get(
          "relationships",
        ),
    };
  } finally {
    await session.close();
  }
}

/**
 * Find developers who know a technology.
 */
export async function findDevelopersByTechnology(
  technologyId: string,
) {
  const session = createSession();

  try {
    const result =
      await session.run(
        FIND_DEVELOPERS_BY_TECHNOLOGY,
        {
          technologyId,
        },
      );

    return result.records.map(
      (record: Neo4jRecord) =>
        record.get("developer"),
    );
  } finally {
    await session.close();
  }
}

/**
 * Find technologies related to another technology.
 */
export async function findRelatedTechnologies(
  technologyId: string,
) {
  const session = createSession();

  try {
    const result =
      await session.run(
        FIND_RELATED_TECHNOLOGIES,
        {
          technologyId,
        },
      );

    return result.records.map(
      (record: Neo4jRecord) => ({
        id: record.get("id"),
        name: record.get("name"),
        sharedProjects:
          toNumber(
            record.get(
              "sharedProjects",
            ),
          ),
      }),
    );
  } finally {
    await session.close();
  }
}

/**
 * Returns high-level graph statistics.
 */
export async function getGraphOverview() {
  const session = createSession();

  try {
    const [
      nodes,
      relationships,
    ] = await Promise.all([
      session.run(
        GET_GRAPH_OVERVIEW,
      ),
      session.run(
        GET_GRAPH_RELATIONSHIP_OVERVIEW,
      ),
    ]);

    return {
      nodes: nodes.records.map(
        (record: Neo4jRecord) => ({
          type: record.get(
            "label",
          ),
          count: toNumber(
            record.get("count"),
          ),
        }),
      ),

      relationships:
        relationships.records.map(
          (
            record: Neo4jRecord,
          ) => ({
            type: record.get(
              "relationship",
            ),
            count: toNumber(
              record.get("count"),
            ),
          }),
        ),
    };
  } finally {
    await session.close();
  }
}