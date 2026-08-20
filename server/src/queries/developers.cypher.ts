// server/src/queries/developers.cypher.ts

/**
 * DevGraph — Developer Cypher Queries
 *
 * Responsibility:
 * - Store parameterized Cypher queries related to developers.
 * - Never concatenate user input into Cypher.
 */

export const GET_DEVELOPERS = `
  MATCH (d:Developer)
  OPTIONAL MATCH (d)-[:HAS_SKILL]->(s:Skill)
  OPTIONAL MATCH (d)-[:KNOWS]->(t:Technology)
  OPTIONAL MATCH (d)-[:WORKED_ON]->(p:Project)

  WITH
    d,
    collect(DISTINCT s.name) AS skills,
    collect(DISTINCT t.name) AS technologies,
    collect(DISTINCT {
      id: p.id,
      name: p.name
    }) AS projects

  RETURN {
    id: d.id,
    name: d.name,
    title: d.title,
    location: d.location,
    avatar: d.avatar,
    bio: d.bio,
    skills: [skill IN skills WHERE skill IS NOT NULL],
    technologies: [technology IN technologies WHERE technology IS NOT NULL],
    projects: [project IN projects WHERE project.id IS NOT NULL]
  } AS developer

  ORDER BY d.name
  SKIP $skip
  LIMIT $limit
`;

export const COUNT_DEVELOPERS = `
  MATCH (d:Developer)
  RETURN count(d) AS count
`;

export const GET_DEVELOPER_BY_ID = `
  MATCH (d:Developer {id: $id})

  OPTIONAL MATCH (d)-[:HAS_SKILL]->(s:Skill)
  WITH
    d,
    collect(DISTINCT CASE
      WHEN s IS NULL THEN NULL
      ELSE {
        id: s.id,
        name: s.name
      }
    END) AS skills

  OPTIONAL MATCH (d)-[:KNOWS]->(t:Technology)
  WITH
    d,
    skills,
    collect(DISTINCT CASE
      WHEN t IS NULL THEN NULL
      ELSE {
        id: t.id,
        name: t.name
      }
    END) AS technologies

  OPTIONAL MATCH (d)-[:WORKED_ON]->(p:Project)
  WITH
    d,
    skills,
    technologies,
    collect(DISTINCT CASE
      WHEN p IS NULL THEN NULL
      ELSE {
        id: p.id,
        name: p.name,
        description: p.description
      }
    END) AS projects

  OPTIONAL MATCH (d)-[:WORKS_AT]->(c:Company)
  WITH
    d,
    skills,
    technologies,
    projects,
    collect(DISTINCT CASE
      WHEN c IS NULL THEN NULL
      ELSE {
        id: c.id,
        name: c.name
      }
    END) AS companies

  RETURN {
    id: d.id,
    name: d.name,
    title: d.title,
    location: d.location,
    avatar: d.avatar,
    bio: d.bio,

    skills: [skill IN skills WHERE skill IS NOT NULL],

    technologies: [
      technology IN technologies
      WHERE technology IS NOT NULL
    ],

    projects: [
      project IN projects
      WHERE project IS NOT NULL
    ],

    companies: [
      company IN companies
      WHERE company IS NOT NULL
    ]
  } AS developer
`;

export const SEARCH_DEVELOPERS = `
  MATCH (d:Developer)

  WHERE
    toLower(d.name) CONTAINS toLower($search)
    OR toLower(coalesce(d.title, '')) CONTAINS toLower($search)
    OR toLower(coalesce(d.location, '')) CONTAINS toLower($search)

  RETURN {
    id: d.id,
    name: d.name,
    title: d.title,
    location: d.location,
    avatar: d.avatar,
    bio: d.bio
  } AS developer

  ORDER BY d.name
  SKIP $skip
  LIMIT $limit
`;