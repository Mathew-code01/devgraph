// server/src/queries/technologies.cypher.ts

/**
 * DevGraph — Technology Cypher Queries
 */

export const GET_TECHNOLOGIES = `
  MATCH (t:Technology)

  OPTIONAL MATCH (d:Developer)-[:KNOWS]->(t)
  OPTIONAL MATCH (p:Project)-[:USES]->(t)

  RETURN {
    id: t.id,
    name: t.name,
    category: t.category,

    developerCount: count(DISTINCT d),
    projectCount: count(DISTINCT p)
  } AS technology

  ORDER BY technology.name
`;

export const GET_TECHNOLOGY_BY_ID = `
  MATCH (t:Technology {id: $id})

  OPTIONAL MATCH (d:Developer)-[:KNOWS]->(t)
  OPTIONAL MATCH (p:Project)-[:USES]->(t)

  RETURN {
    id: t.id,
    name: t.name,
    category: t.category,

    developers: collect(DISTINCT CASE
      WHEN d IS NULL THEN NULL
      ELSE {
        id: d.id,
        name: d.name,
        title: d.title
      }
    END),

    projects: collect(DISTINCT CASE
      WHEN p IS NULL THEN NULL
      ELSE {
        id: p.id,
        name: p.name
      }
    END)
  } AS technology
`;