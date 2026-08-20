// server/src/seed/projects.ts

/**
 * DevGraph Seed Data
 * ------------------
 * Contains project nodes and their graph relationships.
 *
 * Graph node:
 * (:Project)
 *
 * Relationships:
 *
 * Project -> USES -> Technology
 * Project -> BELONGS_TO -> Domain
 * Project -> BUILT_FOR -> Company
 * Developer -> WORKED_ON -> Project
 */

export interface ProjectSeed {
  id: string;
  name: string;
  slug: string;
  description: string;
  status: "active" | "completed" | "maintenance" | "beta";
  startedYear: number;
  repository: string;
  companyId: string;
  domainId: string;
  technologyIds: string[];
}

export const projects: ProjectSeed[] = [
  {
    id: "project-atlas-payments",
    name: "Atlas Payments",
    slug: "atlas-payments",
    description:
      "A scalable payment processing platform supporting transaction workflows and merchant integrations.",
    status: "active",
    startedYear: 2024,
    repository: "https://github.com/example/atlas-payments",
    companyId: "company-atlas-fintech",
    domainId: "domain-fintech",
    technologyIds: [
      "tech-typescript",
      "tech-react",
      "tech-nodejs",
      "tech-express",
      "tech-postgresql",
      "tech-redis",
      "tech-docker",
    ],
  },
  {
    id: "project-cloud-observatory",
    name: "Cloud Observatory",
    slug: "cloud-observatory",
    description:
      "A cloud monitoring and observability platform for distributed applications.",
    status: "active",
    startedYear: 2023,
    repository: "https://github.com/example/cloud-observatory",
    companyId: "company-cloudpeak",
    domainId: "domain-cloud",
    technologyIds: [
      "tech-typescript",
      "tech-react",
      "tech-nextjs",
      "tech-nodejs",
      "tech-postgresql",
      "tech-redis",
      "tech-docker",
      "tech-kubernetes",
      "tech-aws",
    ],
  },
  {
    id: "project-commerce-platform",
    name: "Vertex Commerce Platform",
    slug: "vertex-commerce-platform",
    description:
      "A high-performance commerce platform serving catalog, checkout and customer experiences.",
    status: "active",
    startedYear: 2022,
    repository: "https://github.com/example/vertex-commerce",
    companyId: "company-vertex-commerce",
    domainId: "domain-ecommerce",
    technologyIds: [
      "tech-typescript",
      "tech-react",
      "tech-nextjs",
      "tech-nodejs",
      "tech-postgresql",
      "tech-redis",
      "tech-tailwind",
    ],
  },
  {
    id: "project-pulse-assistant",
    name: "Pulse Care Assistant",
    slug: "pulse-care-assistant",
    description:
      "An AI-assisted healthcare application that helps patients navigate common care workflows.",
    status: "beta",
    startedYear: 2025,
    repository: "https://github.com/example/pulse-assistant",
    companyId: "company-pulse-health",
    domainId: "domain-healthtech",
    technologyIds: [
      "tech-python",
      "tech-fastapi",
      "tech-pytorch",
      "tech-openai",
      "tech-postgresql",
      "tech-docker",
      "tech-react",
    ],
  },
  {
    id: "project-health-insights",
    name: "Health Insights",
    slug: "health-insights",
    description:
      "A data platform for turning healthcare data into actionable operational insights.",
    status: "active",
    startedYear: 2024,
    repository: "https://github.com/example/health-insights",
    companyId: "company-pulse-health",
    domainId: "domain-healthtech",
    technologyIds: [
      "tech-python",
      "tech-fastapi",
      "tech-postgresql",
      "tech-docker",
      "tech-react",
    ],
  },
  {
    id: "project-ai-coding-assistant",
    name: "Orbit Coding Assistant",
    slug: "orbit-coding-assistant",
    description:
      "An AI developer assistant providing coding support and intelligent workflow automation.",
    status: "active",
    startedYear: 2025,
    repository: "https://github.com/example/orbit-coding-assistant",
    companyId: "company-orbit-ai",
    domainId: "domain-ai",
    technologyIds: [
      "tech-python",
      "tech-pytorch",
      "tech-openai",
      "tech-fastapi",
      "tech-docker",
      "tech-kubernetes",
      "tech-aws",
    ],
  },
  {
    id: "project-recommendation-engine",
    name: "Intelligent Recommendation Engine",
    slug: "recommendation-engine",
    description:
      "A recommendation service that uses behavioral signals to personalize product experiences.",
    status: "active",
    startedYear: 2024,
    repository: "https://github.com/example/recommendation-engine",
    companyId: "company-vertex-commerce",
    domainId: "domain-ai",
    technologyIds: [
      "tech-python",
      "tech-pytorch",
      "tech-fastapi",
      "tech-postgresql",
      "tech-redis",
      "tech-docker",
    ],
  },
  {
    id: "project-mobility-platform",
    name: "Summit Mobility Platform",
    slug: "summit-mobility-platform",
    description:
      "A mobility platform for managing trips, drivers, riders and real-time transportation workflows.",
    status: "active",
    startedYear: 2023,
    repository: "https://github.com/example/summit-mobility",
    companyId: "company-summit-mobility",
    domainId: "domain-mobility",
    technologyIds: [
      "tech-typescript",
      "tech-nodejs",
      "tech-express",
      "tech-postgresql",
      "tech-redis",
      "tech-docker",
    ],
  },
  {
    id: "project-energy-monitoring",
    name: "Greenfield Energy Monitor",
    slug: "energy-monitoring",
    description:
      "An infrastructure monitoring platform for renewable energy generation assets.",
    status: "maintenance",
    startedYear: 2022,
    repository: "https://github.com/example/energy-monitoring",
    companyId: "company-greenfield-energy",
    domainId: "domain-energy",
    technologyIds: [
      "tech-python",
      "tech-nodejs",
      "tech-postgresql",
      "tech-redis",
      "tech-docker",
      "tech-kubernetes",
      "tech-aws",
    ],
  },
  {
    id: "project-developer-network",
    name: "Developer Network",
    slug: "developer-network",
    description:
      "An internal platform connecting developers, projects, technologies and engineering capabilities.",
    status: "active",
    startedYear: 2025,
    repository: "https://github.com/example/developer-network",
    companyId: "company-northstar-labs",
    domainId: "domain-developer-tools",
    technologyIds: [
      "tech-typescript",
      "tech-react",
      "tech-nodejs",
      "tech-express",
      "tech-neo4j",
      "tech-postgresql",
      "tech-docker",
    ],
  },
];