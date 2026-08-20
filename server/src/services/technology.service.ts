// server/src/services/technology.service.ts

/**
 * DevGraph — Technology Service
 *
 * Responsibility:
 * - Execute technology-related Cypher queries.
 * - Transform Neo4j records into API-safe objects.
 * - Keep database logic out of controllers.
 */

import { createSession } from "../db/driver.js";

import {
  GET_TECHNOLOGIES,
  GET_TECHNOLOGY_BY_ID,
} from "../queries/technologies.cypher.js";

export async function getTechnologies() {
  const session = createSession();

  try {
    const result = await session.run(
      GET_TECHNOLOGIES,
    );

    return result.records.map((record) =>
      record.get("technology"),
    );
  } finally {
    await session.close();
  }
}

export async function getTechnologyById(
  id: string,
) {
  const session = createSession();

  try {
    const result = await session.run(
      GET_TECHNOLOGY_BY_ID,
      { id },
    );

    const record = result.records[0];

    /**
     * TypeScript does not guarantee that
     * records[0] exists, even after checking
     * the array length.
     */
    if (!record) {
      return null;
    }

    return record.get("technology");
  } finally {
    await session.close();
  }
}