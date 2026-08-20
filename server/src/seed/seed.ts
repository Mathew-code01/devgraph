// server/src/seed/seed.ts



/**
 * DevGraph Database Seeder
 * ========================
 *
 * Responsibility:
 * - Connect to CognoDB through the official Neo4j driver.
 * - Create constraints/indexes.
 * - Insert deterministic seed data.
 * - Create graph relationships.
 * - Verify the resulting graph.
 * - Close the database connection cleanly.
 *
 * IMPORTANT:
 * This file is intended to be executed as a standalone seed process.
 *
 * Data flow:
 *
 * seed.ts
 *   ↓
 * Neo4j Driver
 *   ↓
 * CognoDB
 *
 * The seed process is intentionally separate from the Express
 * HTTP server so production API startup does not automatically
 * modify database contents.
 */

import "dotenv/config";

import neo4j, {
  type Driver,
  type Session,
} from "neo4j-driver";

import { companies } from "./companies.js";
import { developers } from "./developers.js";
import { domains } from "./domains.js";
import { projects } from "./projects.js";
import {
  technologies,
  technologyRelationships,
} from "./technologies.js";
import { skills } from "./skills.js";

const COGNODB_URI = process.env.COGNODB_URI;
const COGNODB_USERNAME =
  process.env.COGNODB_USERNAME ?? "cognodb";
const COGNODB_PASSWORD = process.env.COGNODB_PASSWORD;
const COGNODB_DATABASE = process.env.COGNODB_DATABASE;
const COGNODB_ENCRYPTION =
  process.env.COGNODB_ENCRYPTION ?? "encrypted";

/**
 * Creates the official Neo4j driver used to communicate
 * with CognoDB.
 */
function createDriver(): Driver {
  if (!COGNODB_URI) {
    throw new Error("Missing COGNODB_URI environment variable.");
  }

  if (!COGNODB_PASSWORD) {
    throw new Error("Missing COGNODB_PASSWORD environment variable.");
  }

  return neo4j.driver(
    COGNODB_URI,
    neo4j.auth.basic(COGNODB_USERNAME, COGNODB_PASSWORD),
    {
      maxConnectionPoolSize: 20,
      connectionAcquisitionTimeout: 10_000,
      connectionTimeout: 10_000,
      maxTransactionRetryTime: 15_000,
    },
  );
}

/**
 * Executes a write transaction.
 */
async function write(
  session: Session,
  query: string,
  parameters: Record<string, unknown> = {},
): Promise<void> {
  await session.executeWrite(async (transaction) => {
    await transaction.run(query, parameters);
  });
}

/**
 * Creates indexes/constraints used by the application.
 *
 * Deterministic IDs are used by the seed process so MERGE
 * operations remain idempotent.
 */
async function createConstraints(
  session: Session,
): Promise<void> {
  const constraints = [
    `
    CREATE CONSTRAINT developer_id_unique IF NOT EXISTS
    FOR (n:Developer)
    REQUIRE n.id IS UNIQUE
    `,

    `
    CREATE CONSTRAINT project_id_unique IF NOT EXISTS
    FOR (n:Project)
    REQUIRE n.id IS UNIQUE
    `,

    `
    CREATE CONSTRAINT technology_id_unique IF NOT EXISTS
    FOR (n:Technology)
    REQUIRE n.id IS UNIQUE
    `,

    `
    CREATE CONSTRAINT skill_id_unique IF NOT EXISTS
    FOR (n:Skill)
    REQUIRE n.id IS UNIQUE
    `,

    `
    CREATE CONSTRAINT company_id_unique IF NOT EXISTS
    FOR (n:Company)
    REQUIRE n.id IS UNIQUE
    `,

    `
    CREATE CONSTRAINT domain_id_unique IF NOT EXISTS
    FOR (n:Domain)
    REQUIRE n.id IS UNIQUE
    `,
  ];

  for (const query of constraints) {
    await write(session, query);
  }
}

/**
 * Seeds Company nodes.
 */
async function seedCompanies(
  session: Session,
): Promise<void> {
  await write(
    session,
    `
    UNWIND $companies AS company

    MERGE (c:Company {id: company.id})

    SET
      c.name = company.name,
      c.slug = company.slug,
      c.industry = company.industry,
      c.size = company.size,
      c.location = company.location,
      c.website = company.website,
      c.description = company.description
    `,
    { companies },
  );
}

/**
 * Seeds Domain nodes.
 */
async function seedDomains(
  session: Session,
): Promise<void> {
  await write(
    session,
    `
    UNWIND $domains AS domain

    MERGE (d:Domain {id: domain.id})

    SET
      d.name = domain.name,
      d.slug = domain.slug,
      d.description = domain.description
    `,
    { domains },
  );
}

/**
 * Seeds Skill nodes.
 */
async function seedSkills(
  session: Session,
): Promise<void> {
  await write(
    session,
    `
    UNWIND $skills AS skill

    MERGE (s:Skill {id: skill.id})

    SET
      s.name = skill.name,
      s.slug = skill.slug,
      s.category = skill.category,
      s.description = skill.description
    `,
    { skills },
  );
}

/**
 * Seeds Technology nodes.
 */
async function seedTechnologies(
  session: Session,
): Promise<void> {
  await write(
    session,
    `
    UNWIND $technologies AS technology

    MERGE (t:Technology {id: technology.id})

    SET
      t.name = technology.name,
      t.slug = technology.slug,
      t.category = technology.category,
      t.type = technology.type,
      t.description = technology.description
    `,
    { technologies },
  );
}

/**
 * Creates technology-to-technology relationships.
 */
async function seedTechnologyRelationships(
  session: Session,
): Promise<void> {
  await write(
    session,
    `
    UNWIND $relationships AS relationship

    MATCH (source:Technology {id: relationship.from})
    MATCH (target:Technology {id: relationship.to})

    MERGE (source)-[r:RELATED_TO]->(target)

    SET r.reason = relationship.reason
    `,
    {
      relationships: technologyRelationships,
    },
  );
}

/**
 * Seeds Project nodes.
 */
async function seedProjects(
  session: Session,
): Promise<void> {
  await write(
    session,
    `
    UNWIND $projects AS project

    MERGE (p:Project {id: project.id})

    SET
      p.name = project.name,
      p.slug = project.slug,
      p.description = project.description,
      p.status = project.status,
      p.startedYear = project.startedYear,
      p.repository = project.repository
    `,
    { projects },
  );
}

/**
 * Connects projects to companies and domains.
 */
async function seedProjectRelationships(
  session: Session,
): Promise<void> {
  await write(
    session,
    `
    UNWIND $projects AS project

    MATCH (p:Project {id: project.id})
    MATCH (company:Company {id: project.companyId})
    MATCH (domain:Domain {id: project.domainId})

    MERGE (p)-[:BUILT_FOR]->(company)
    MERGE (p)-[:BELONGS_TO]->(domain)
    `,
    { projects },
  );
}

/**
 * Connects projects to technologies.
 */
async function seedProjectTechnologies(
  session: Session,
): Promise<void> {
  await write(
    session,
    `
    UNWIND $projects AS project

    MATCH (p:Project {id: project.id})

    UNWIND project.technologyIds AS technologyId

    MATCH (technology:Technology {id: technologyId})

    MERGE (p)-[:USES]->(technology)
    `,
    { projects },
  );
}

/**
 * Seeds Developer nodes.
 */
async function seedDevelopers(
  session: Session,
): Promise<void> {
  await write(
    session,
    `
    UNWIND $developers AS developer

    MERGE (d:Developer {id: developer.id})

    SET
      d.name = developer.name,
      d.username = developer.username,
      d.email = developer.email,
      d.title = developer.title,
      d.location = developer.location,
      d.experienceYears = developer.experienceYears,
      d.bio = developer.bio,
      d.availability = developer.availability
    `,
    {
      developers: developers.map(
        ({
          skills: _skills,
          technologies: _technologies,
          companyId: _companyId,
          projectIds: _projectIds,
          ...developer
        }) => developer,
      ),
    },
  );
}

/**
 * Connects developers to their companies.
 */
async function seedDeveloperCompanies(
  session: Session,
): Promise<void> {
  await write(
    session,
    `
    UNWIND $developers AS developer

    MATCH (d:Developer {id: developer.id})
    MATCH (company:Company {id: developer.companyId})

    MERGE (d)-[:WORKS_AT]->(company)
    `,
    { developers },
  );
}

/**
 * Connects developers to skills.
 */
async function seedDeveloperSkills(
  session: Session,
): Promise<void> {
  await write(
    session,
    `
    UNWIND $developers AS developer

    MATCH (d:Developer {id: developer.id})

    UNWIND developer.skills AS skillId

    MATCH (skill:Skill {id: skillId})

    MERGE (d)-[:HAS_SKILL]->(skill)
    `,
    { developers },
  );
}

/**
 * Connects developers to technologies.
 */
async function seedDeveloperTechnologies(
  session: Session,
): Promise<void> {
  await write(
    session,
    `
    UNWIND $developers AS developer

    MATCH (d:Developer {id: developer.id})

    UNWIND developer.technologies AS technologyId

    MATCH (technology:Technology {id: technologyId})

    MERGE (d)-[:KNOWS]->(technology)
    `,
    { developers },
  );
}

/**
 * Connects developers to projects they worked on.
 */
async function seedDeveloperProjects(
  session: Session,
): Promise<void> {
  await write(
    session,
    `
    UNWIND $developers AS developer

    MATCH (d:Developer {id: developer.id})

    UNWIND developer.projectIds AS projectId

    MATCH (project:Project {id: projectId})

    MERGE (d)-[:WORKED_ON]->(project)
    `,
    { developers },
  );
}

/**
 * Verifies that the graph contains the expected node types
 * and relationship types.
 */
async function verifySeed(
  session: Session,
): Promise<void> {
  const nodeResult = await session.executeRead(
    async (transaction) => {
      return transaction.run(`
        MATCH (n)
        RETURN labels(n)[0] AS label, count(n) AS count
        ORDER BY label
      `);
    },
  );

  console.log("\nGraph node counts:");

  for (const record of nodeResult.records) {
    console.log(
      `  ${record.get("label")}: ${record
        .get("count")
        .toString()}`,
    );
  }

  const relationshipResult =
    await session.executeRead(
      async (transaction) => {
        return transaction.run(`
          MATCH ()-[r]->()
          RETURN type(r) AS relationship, count(r) AS count
          ORDER BY relationship
        `);
      },
    );

  console.log("\nGraph relationship counts:");

  for (const record of relationshipResult.records) {
    console.log(
      `  ${record.get("relationship")}: ${record
        .get("count")
        .toString()}`,
    );
  }

  const connectivityResult =
    await session.executeRead(
      async (transaction) => {
        return transaction.run(`
          MATCH (d:Developer)-[:WORKED_ON]->(p:Project)-[:USES]->(t:Technology)
          RETURN count(*) AS paths
        `);
      },
    );

  const paths =
    connectivityResult.records[0]?.get("paths");

  console.log(
    `\nDeveloper → Project → Technology paths: ${
      paths?.toString() ?? "0"
    }`,
  );
}

/**
 * Main seed process.
 */
async function seed(): Promise<void> {
  const driver = createDriver();

  const session = driver.session(
    COGNODB_DATABASE
      ? { database: COGNODB_DATABASE }
      : undefined,
  );

  const startedAt = Date.now();

  console.log("======================================");
  console.log("DevGraph CognoDB Seed");
  console.log("======================================");
  console.log("Connecting to CognoDB...");

  try {
    await driver.verifyConnectivity();

    console.log(
      "Database connection established.",
    );

    console.log("\nCreating constraints...");
    await createConstraints(session);

    console.log("Seeding companies...");
    await seedCompanies(session);

    console.log("Seeding domains...");
    await seedDomains(session);

    console.log("Seeding skills...");
    await seedSkills(session);

    console.log("Seeding technologies...");
    await seedTechnologies(session);

    console.log(
      "Creating technology relationships...",
    );
    await seedTechnologyRelationships(session);

    console.log("Seeding projects...");
    await seedProjects(session);

    console.log(
      "Creating project relationships...",
    );
    await seedProjectRelationships(session);

    console.log(
      "Connecting projects to technologies...",
    );
    await seedProjectTechnologies(session);

    console.log("Seeding developers...");
    await seedDevelopers(session);

    console.log(
      "Connecting developers to companies...",
    );
    await seedDeveloperCompanies(session);

    console.log(
      "Connecting developers to skills...",
    );
    await seedDeveloperSkills(session);

    console.log(
      "Connecting developers to technologies...",
    );
    await seedDeveloperTechnologies(session);

    console.log(
      "Connecting developers to projects...",
    );
    await seedDeveloperProjects(session);

    await verifySeed(session);

    const elapsed = Date.now() - startedAt;

    console.log("\n======================================");
    console.log("Seed completed successfully.");
    console.log(`Execution time: ${elapsed}ms`);
    console.log("======================================");
  } catch (error) {
    console.error("\n======================================");
    console.error("Seed failed.");
    console.error("======================================");

    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }

    process.exitCode = 1;
  } finally {
    await session.close();
    await driver.close();
  }
}

void seed();
