// server/src/services/graph.service.ts

/**
 * DevGraph — Graph Service
 *
 * Responsibility:
 * - Perform graph-specific operations.
 * - Normalize graph data for the frontend.
 * - Keep Neo4j/CognoDB access isolated from controllers.
 */

import type { Record as Neo4jRecord } from "neo4j-driver";

import {
  EXPLORE_DEVELOPER_GRAPH,
  EXPLORE_PROJECT_GRAPH,
  FIND_DEVELOPERS_BY_TECHNOLOGY,
  FIND_RELATED_TECHNOLOGIES,
  GET_GRAPH_OVERVIEW,
  GET_GRAPH_RELATIONSHIP_OVERVIEW,
} from "../queries/graph.cypher.js";

import { createSession } from "../db/driver.js";

import { serializeNeo4jValue, toNumber } from "../utils/neo4j.js";

/**
 * Explore the graph around a developer.
 */
export async function exploreDeveloperGraph(developerId: string, depth = 2) {
  const safeDepth = Math.min(Math.max(Math.trunc(depth), 1), 4);

  const session = createSession();

  try {
    const result = await session.run(EXPLORE_DEVELOPER_GRAPH(safeDepth), {
      developerId,
    });

    const record = result.records[0];

    if (!record) {
      return {
        nodes: [],
        relationships: [],
      };
    }

    return {
      nodes: serializeNeo4jValue(record.get("nodes")),

      relationships: serializeNeo4jValue(record.get("relationships")),
    };
  } finally {
    await session.close();
  }
}

/**
 * Explore the graph around a project.
 *
 * The project is used as the root node and the traversal
 * returns connected developers, technologies, domains,
 * companies and other graph entities.
 */
export async function exploreProjectGraph(projectId: string, depth = 2) {
  const safeDepth = Math.min(Math.max(Math.trunc(depth), 1), 4);

  /**
   * IMPORTANT:
   *
   * Do not use `driver.session()` here.
   *
   * This service does not own a `driver` variable.
   * All graph operations use the shared session factory.
   */
  const session = createSession();

  try {
    const result = await session.run(EXPLORE_PROJECT_GRAPH(safeDepth), {
      projectId,
    });

    const record = result.records[0];

    if (!record) {
      return {
        nodes: [],
        relationships: [],
      };
    }

    return {
      nodes: serializeNeo4jValue(record.get("nodes") ?? []),

      relationships: serializeNeo4jValue(record.get("relationships") ?? []),
    };
  } finally {
    await session.close();
  }
}

/**
 * Find developers who know a technology.
 */
export async function findDevelopersByTechnology(technologyId: string) {
  const session = createSession();

  try {
    const result = await session.run(FIND_DEVELOPERS_BY_TECHNOLOGY, {
      technologyId,
    });

    return result.records.map((record: Neo4jRecord) =>
      serializeNeo4jValue(record.get("developer")),
    );
  } finally {
    await session.close();
  }
}

/**
 * Find technologies related to another technology.
 */
export async function findRelatedTechnologies(technologyId: string) {
  const session = createSession();

  try {
    const result = await session.run(FIND_RELATED_TECHNOLOGIES, {
      technologyId,
    });

    return result.records.map((record: Neo4jRecord) => ({
      id: serializeNeo4jValue(record.get("id")),

      name: String(record.get("name") ?? ""),

      sharedProjects: toNumber(record.get("sharedProjects")),
    }));
  } finally {
    await session.close();
  }
}

/**
 * Returns high-level graph statistics.
 *
 * IMPORTANT:
 * Neo4j sessions cannot execute multiple
 * queries concurrently.
 *
 * Each concurrent query therefore receives
 * its own session.
 */
export async function getGraphOverview() {
  const nodeSession = createSession();

  const relationshipSession = createSession();

  try {
    const [nodesResult, relationshipsResult] = await Promise.all([
      nodeSession.run(GET_GRAPH_OVERVIEW),

      relationshipSession.run(GET_GRAPH_RELATIONSHIP_OVERVIEW),
    ]);

    return {
      nodes: nodesResult.records.map((record: Neo4jRecord) => ({
        type: String(record.get("label") ?? "Unknown"),

        count: toNumber(record.get("count")),
      })),

      relationships: relationshipsResult.records.map((record: Neo4jRecord) => ({
        type: String(record.get("relationship") ?? "Unknown"),

        count: toNumber(record.get("count")),
      })),
    };
  } finally {
    await Promise.all([nodeSession.close(), relationshipSession.close()]);
  }
}
