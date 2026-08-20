/**
 * DevGraph — Neo4j Serialization Utilities
 *
 * Neo4j represents integer values using its own Integer
 * object, which looks like:
 *
 * {
 *   low: number,
 *   high: number
 * }
 *
 * Those objects must never be sent directly to React.
 *
 * This utility recursively converts Neo4j values into
 * frontend-safe JavaScript values.
 */

import neo4j from "neo4j-driver";

export function toNumber(value: unknown): number {
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
 * Recursively converts Neo4j values into JSON-safe values.
 */
export function serializeNeo4jValue<T>(value: T): T {
  if (value === null || value === undefined) {
    return value;
  }

  /**
   * Neo4j Integer
   *
   * { low, high } -> normal JavaScript number
   */
  if (neo4j.isInt(value)) {
    return value.toNumber() as T;
  }

  /**
   * Arrays
   */
  if (Array.isArray(value)) {
    return value.map((item) => serializeNeo4jValue(item)) as T;
  }

  /**
   * Objects
   */
  if (typeof value === "object") {
    const object = value as Record<string, unknown>;

    const serialized: Record<string, unknown> = {};

    for (const [key, item] of Object.entries(object)) {
      serialized[key] = serializeNeo4jValue(item);
    }

    return serialized as T;
  }

  return value;
}

/**
 * Serializes a Neo4j record value.
 */
export function serializeRecordValue<T>(value: T): T {
  return serializeNeo4jValue(value);
}
