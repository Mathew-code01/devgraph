// server/src/queries/projects.cypher.ts

/**
 * DevGraph — Project Cypher Queries
 *
 * Responsibility:
 * - Retrieve projects and their graph relationships.
 */

export const GET_PROJECTS = `
  MATCH (p:Project)

  OPTIONAL MATCH (p)-[:USES]->(t:Technology)
  OPTIONAL MATCH (d:Developer)-[:WORKED_ON]->(p)
  OPTIONAL MATCH (p)-[:BELONGS_TO]->(domain:Domain)
  OPTIONAL MATCH (p)-[:BUILT_FOR]->(company:Company)

  RETURN {
    id: p.id,
    name: p.name,
    description: p.description,
    url: p.url,
    status: p.status,

    technologies: collect(DISTINCT CASE
      WHEN t IS NULL THEN NULL
      ELSE {
        id: t.id,
        name: t.name
      }
    END),

    developers: collect(DISTINCT CASE
      WHEN d IS NULL THEN NULL
      ELSE {
        id: d.id,
        name: d.name
      }
    END),

    domains: collect(DISTINCT CASE
      WHEN domain IS NULL THEN NULL
      ELSE {
        id: domain.id,
        name: domain.name
      }
    END),

    companies: collect(DISTINCT CASE
      WHEN company IS NULL THEN NULL
      ELSE {
        id: company.id,
        name: company.name
      }
    END)
  } AS project

  ORDER BY p.name
  SKIP $skip
  LIMIT $limit
`;

export const COUNT_PROJECTS = `
  MATCH (p:Project)
  RETURN count(p) AS count
`;

export const GET_PROJECT_BY_ID = `
  MATCH (p:Project {id: $id})

  OPTIONAL MATCH (d:Developer)-[:WORKED_ON]->(p)
  OPTIONAL MATCH (p)-[:USES]->(t:Technology)
  OPTIONAL MATCH (p)-[:BELONGS_TO]->(domain:Domain)
  OPTIONAL MATCH (p)-[:BUILT_FOR]->(company:Company)

  RETURN {
    id: p.id,
    name: p.name,
    description: p.description,
    url: p.url,
    status: p.status,

    developers: collect(DISTINCT CASE
      WHEN d IS NULL THEN NULL
      ELSE {
        id: d.id,
        name: d.name,
        title: d.title
      }
    END),

    technologies: collect(DISTINCT CASE
      WHEN t IS NULL THEN NULL
      ELSE {
        id: t.id,
        name: t.name
      }
    END),

    domains: collect(DISTINCT CASE
      WHEN domain IS NULL THEN NULL
      ELSE {
        id: domain.id,
        name: domain.name
      }
    END),

    companies: collect(DISTINCT CASE
      WHEN company IS NULL THEN NULL
      ELSE {
        id: company.id,
        name: company.name
      }
    END)
  } AS project
`;