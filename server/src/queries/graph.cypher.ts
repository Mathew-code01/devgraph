// server/src/queries/graph.cypher.ts

/**
 * DevGraph — Graph Traversal Cypher
 *
 * These queries are specifically designed to demonstrate
 * why a graph database is valuable.
 */

export const EXPLORE_DEVELOPER_GRAPH = (depth: number) => `
  MATCH (start:Developer {id: $developerId})

  MATCH path = (start)-[*1..${depth}]-(connected)

  WITH
    path,
    connected

  RETURN
    collect(DISTINCT {
      id: startNode(path).id,
      label: coalesce(
        startNode(path).name,
        startNode(path).title,
        startNode(path).id
      ),
      type: head(labels(startNode(path))),
      properties: properties(startNode(path))
    }) +
    collect(DISTINCT {
      id: connected.id,
      label: coalesce(
        connected.name,
        connected.title,
        connected.id
      ),
      type: head(labels(connected)),
      properties: properties(connected)
    }) AS nodes,

    collect(DISTINCT {
      source: startNode(path).id,
      target: endNode(path).id,
      type: type(last(relationships(path)))
    }) AS relationships
`;

export const FIND_DEVELOPERS_BY_TECHNOLOGY = `
  MATCH (d:Developer)-[:WORKED_ON]->(p:Project)-[:USES]->(t:Technology)
  WHERE t.id = $technologyId

  RETURN DISTINCT {
    id: d.id,
    name: d.name,
    title: d.title
  } AS developer

  ORDER BY developer.name
`;

export const FIND_RELATED_TECHNOLOGIES = `
  MATCH (t:Technology {id: $technologyId})

  MATCH (t)<-[:USES]-(p:Project)-[:USES]->(related:Technology)

  WHERE related.id <> t.id

  RETURN
    related.id AS id,
    related.name AS name,
    count(DISTINCT p) AS sharedProjects

  ORDER BY sharedProjects DESC, related.name
`;

export const GET_GRAPH_OVERVIEW = `
  MATCH (n)

  WITH
    labels(n) AS labels,
    count(n) AS count

  UNWIND labels AS label

  RETURN label, sum(count) AS count
  ORDER BY count DESC
`;

export const GET_GRAPH_RELATIONSHIP_OVERVIEW = `
  MATCH ()-[r]->()

  RETURN
    type(r) AS relationship,
    count(r) AS count

  ORDER BY count DESC
`;