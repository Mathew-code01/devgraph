// server/src/seed/skills.ts


/**
 * DevGraph Seed Data
 * ------------------
 * Contains professional software engineering skills.
 *
 * Responsibility:
 * - Define Skill nodes.
 * - Provide deterministic identifiers.
 *
 * Graph node:
 * (:Skill)
 */

export interface SkillSeed {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
}

export const skills: SkillSeed[] = [
  {
    id: "skill-api-design",
    name: "API Design",
    slug: "api-design",
    category: "Backend",
    description: "Designing maintainable and scalable application APIs.",
  },
  {
    id: "skill-system-design",
    name: "System Design",
    slug: "system-design",
    category: "Architecture",
    description:
      "Designing reliable, scalable and maintainable software systems.",
  },
  {
    id: "skill-database-design",
    name: "Database Design",
    slug: "database-design",
    category: "Data",
    description:
      "Designing data models, indexes, relationships and storage strategies.",
  },
  {
    id: "skill-distributed-systems",
    name: "Distributed Systems",
    slug: "distributed-systems",
    category: "Backend",
    description:
      "Building systems that operate reliably across multiple processes or machines.",
  },
  {
    id: "skill-frontend-engineering",
    name: "Frontend Engineering",
    slug: "frontend-engineering",
    category: "Frontend",
    description:
      "Building responsive, accessible and maintainable web interfaces.",
  },
  {
    id: "skill-performance-optimization",
    name: "Performance Optimization",
    slug: "performance-optimization",
    category: "Engineering",
    description:
      "Improving application runtime, rendering, network and database performance.",
  },
  {
    id: "skill-cloud-architecture",
    name: "Cloud Architecture",
    slug: "cloud-architecture",
    category: "Infrastructure",
    description:
      "Designing cloud-native systems and infrastructure.",
  },
  {
    id: "skill-machine-learning",
    name: "Machine Learning",
    slug: "machine-learning",
    category: "AI",
    description:
      "Building and deploying machine learning systems.",
  },
  {
    id: "skill-data-engineering",
    name: "Data Engineering",
    slug: "data-engineering",
    category: "Data",
    description:
      "Building reliable pipelines and systems for processing data.",
  },
  {
    id: "skill-security",
    name: "Application Security",
    slug: "application-security",
    category: "Security",
    description:
      "Protecting applications, APIs and infrastructure from security threats.",
  },
  {
    id: "skill-testing",
    name: "Automated Testing",
    slug: "automated-testing",
    category: "Quality",
    description:
      "Building automated unit, integration and end-to-end test suites.",
  },
  {
    id: "skill-devops",
    name: "DevOps",
    slug: "devops",
    category: "Infrastructure",
    description:
      "Automating software delivery, infrastructure and operational workflows.",
  },
];