// server/src/queries/projects.cypher.ts

/**
 * DevGraph — Project Cypher Queries
 *
 * Responsibility:
 * - Retrieve projects and their graph relationships.
 * - Explicitly expose project URLs to the API.
 */

export const GET_PROJECTS = `
  MATCH (p:Project)

  WITH p
  ORDER BY p.name

  SKIP $skip
  LIMIT $limit

  CALL {
    WITH p

    MATCH (p)-[:USES]->(t:Technology)

    RETURN collect(
      DISTINCT {
        id: t.id,
        name: t.name
      }
    ) AS technologies
  }

  CALL {
    WITH p

    MATCH (d:Developer)-[:WORKED_ON]->(p)

    RETURN collect(
      DISTINCT {
        id: d.id,
        name: d.name
      }
    ) AS developers
  }

  CALL {
    WITH p

    MATCH (p)-[:BELONGS_TO]->(domain:Domain)

    RETURN collect(
      DISTINCT {
        id: domain.id,
        name: domain.name
      }
    ) AS domains
  }

  CALL {
    WITH p

    MATCH (p)-[:BUILT_FOR]->(company:Company)

    RETURN collect(
      DISTINCT {
        id: company.id,
        name: company.name
      }
    ) AS companies
  }

  RETURN {
    id: toString(p.id),
    name: toString(p.name),
    description: CASE
      WHEN p.description IS NULL THEN null
      ELSE toString(p.description)
    END,

    url: CASE
      WHEN p.url IS NULL THEN null
      ELSE toString(p.url)
    END,

    status: CASE
      WHEN p.status IS NULL THEN null
      ELSE toString(p.status)
    END,

    technologies: technologies,
    developers: developers,
    domains: domains,
    companies: companies
  } AS project
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
    id: toString(p.id),
    name: toString(p.name),

    description: CASE
      WHEN p.description IS NULL THEN null
      ELSE toString(p.description)
    END,

    url: CASE
      WHEN p.url IS NULL THEN null
      ELSE toString(p.url)
    END,

    status: CASE
      WHEN p.status IS NULL THEN null
      ELSE toString(p.status)
    END,

    developers: collect(
      DISTINCT CASE
        WHEN d IS NULL THEN NULL
        ELSE {
          id: toString(d.id),
          name: toString(d.name),
          title: CASE
            WHEN d.title IS NULL THEN null
            ELSE toString(d.title)
          END
        }
      END
    ),

    technologies: collect(
      DISTINCT CASE
        WHEN t IS NULL THEN NULL
        ELSE {
          id: toString(t.id),
          name: toString(t.name)
        }
      END
    ),

    domains: collect(
      DISTINCT CASE
        WHEN domain IS NULL THEN NULL
        ELSE {
          id: toString(domain.id),
          name: toString(domain.name)
        }
      END
    ),

    companies: collect(
      DISTINCT CASE
        WHEN company IS NULL THEN NULL
        ELSE {
          id: toString(company.id),
          name: toString(company.name)
        }
      END
    )
  } AS project
`;