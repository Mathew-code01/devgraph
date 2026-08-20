// server/src/queries/graph.cypher.ts

/**
 * DevGraph — Graph Traversal Cypher
 *
 * Graph traversal queries used by the graph explorer.
 */

function normalizeDepth(
  depth: number,
): number {
  if (!Number.isFinite(depth)) {
    return 2;
  }

  return Math.min(
    Math.max(Math.floor(depth), 1),
    5,
  );
}

/**
 * Explore the graph around a developer.
 */
export const EXPLORE_DEVELOPER_GRAPH = (
  depth: number,
) => {
  const safeDepth =
    normalizeDepth(depth);

  return `
    MATCH (start:Developer {id: $developerId})

    MATCH path =
      (start)-[*1..${safeDepth}]-(connected)

    WITH collect(DISTINCT path) AS paths

    UNWIND paths AS path

    UNWIND nodes(path) AS node

    WITH
      collect(
        DISTINCT {
          id: node.id,
          label: coalesce(
            node.name,
            node.title,
            node.id
          ),
          type: head(labels(node)),
          properties: properties(node)
        }
      ) AS nodes,
      paths

    UNWIND paths AS relationshipPath

    UNWIND relationships(
      relationshipPath
    ) AS relationship

    WITH
      nodes,
      collect(
        DISTINCT {
          source: startNode(
            relationship
          ).id,

          target: endNode(
            relationship
          ).id,

          type: type(
            relationship
          )
        }
      ) AS relationships

    RETURN
      nodes,
      relationships
  `;
};

/**
 * Explore the graph around a project.
 */
export const EXPLORE_PROJECT_GRAPH = (
  depth: number,
) => {
  const safeDepth =
    normalizeDepth(depth);

  return `
    MATCH (start:Project {id: $projectId})

    MATCH path =
      (start)-[*1..${safeDepth}]-(connected)

    WITH collect(DISTINCT path) AS paths

    UNWIND paths AS path

    UNWIND nodes(path) AS node

    WITH
      collect(
        DISTINCT {
          id: node.id,
          label: coalesce(
            node.name,
            node.title,
            node.id
          ),
          type: head(labels(node)),
          properties: properties(node)
        }
      ) AS nodes,
      paths

    UNWIND paths AS relationshipPath

    UNWIND relationships(
      relationshipPath
    ) AS relationship

    WITH
      nodes,
      collect(
        DISTINCT {
          source: startNode(
            relationship
          ).id,

          target: endNode(
            relationship
          ).id,

          type: type(
            relationship
          )
        }
      ) AS relationships

    RETURN
      nodes,
      relationships
  `;
};

/**
 * Find developers connected to a technology.
 */
export const FIND_DEVELOPERS_BY_TECHNOLOGY = `
  MATCH
    (d:Developer)
    -[:WORKED_ON]->
    (p:Project)
    -[:USES]->
    (t:Technology)

  WHERE t.id = $technologyId

  RETURN DISTINCT {
    id: d.id,
    name: d.name,
    title: d.title
  } AS developer

  ORDER BY developer.name
`;

/**
 * Find technologies sharing projects.
 */
export const FIND_RELATED_TECHNOLOGIES = `
  MATCH
    (t:Technology {
      id: $technologyId
    })

  MATCH
    (t)<-[:USES]-
    (p:Project)
    -[:USES]->
    (related:Technology)

  WHERE related.id <> t.id

  RETURN
    related.id AS id,
    related.name AS name,
    count(DISTINCT p) AS sharedProjects

  ORDER BY
    sharedProjects DESC,
    related.name
`;

/**
 * Graph node overview.
 */
export const GET_GRAPH_OVERVIEW = `
  MATCH (n)

  WITH
    labels(n) AS labels,
    count(n) AS count

  UNWIND labels AS label

  RETURN
    label,
    sum(count) AS count

  ORDER BY count DESC
`;

/**
 * Graph relationship overview.
 */
export const GET_GRAPH_RELATIONSHIP_OVERVIEW = `
  MATCH ()-[r]->()

  RETURN
    type(r) AS relationship,
    count(r) AS count

  ORDER BY count DESC
`;