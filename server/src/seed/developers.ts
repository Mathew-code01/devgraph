// server/src/seed/developers.ts


/**
 * DevGraph Seed Data
 * ------------------
 * Contains developer nodes and their graph relationships.
 *
 * Graph nodes:
 * (:Developer)
 *
 * Relationships are loaded by seed.ts:
 *
 * Developer -> WORKS_AT -> Company
 * Developer -> HAS_SKILL -> Skill
 * Developer -> KNOWS -> Technology
 * Developer -> WORKED_ON -> Project
 */

export interface DeveloperSeed {
  id: string;
  name: string;
  username: string;
  email: string;
  title: string;
  location: string;
  experienceYears: number;
  bio: string;
  availability: "available" | "open" | "unavailable";
  skills: string[];
  technologies: string[];
  companyId: string;
  projectIds: string[];
}

export const developers: DeveloperSeed[] = [
  {
    id: "developer-amara-okafor",
    name: "Amara Okafor",
    username: "amara-okafor",
    email: "amara.okafor@example.dev",
    title: "Senior Full Stack Engineer",
    location: "Lagos, Nigeria",
    experienceYears: 7,
    bio:
      "Full stack engineer specializing in TypeScript, React, Node.js and scalable APIs.",
    availability: "open",
    companyId: "company-atlas-fintech",
    skills: [
      "skill-api-design",
      "skill-system-design",
      "skill-frontend-engineering",
      "skill-database-design",
      "skill-testing",
    ],
    technologies: [
      "tech-typescript",
      "tech-react",
      "tech-nodejs",
      "tech-express",
      "tech-postgresql",
      "tech-redis",
      "tech-docker",
    ],
    projectIds: [
      "project-atlas-payments",
      "project-developer-network",
    ],
  },
  {
    id: "developer-daniel-wright",
    name: "Daniel Wright",
    username: "daniel-wright",
    email: "daniel.wright@example.dev",
    title: "Backend Engineer",
    location: "London, United Kingdom",
    experienceYears: 8,
    bio:
      "Backend engineer focused on distributed systems, APIs and cloud infrastructure.",
    availability: "available",
    companyId: "company-northstar-labs",
    skills: [
      "skill-api-design",
      "skill-system-design",
      "skill-distributed-systems",
      "skill-cloud-architecture",
      "skill-devops",
    ],
    technologies: [
      "tech-typescript",
      "tech-nodejs",
      "tech-express",
      "tech-postgresql",
      "tech-redis",
      "tech-docker",
      "tech-kubernetes",
      "tech-aws",
      "tech-terraform",
    ],
    projectIds: [
      "project-cloud-observatory",
      "project-developer-network",
    ],
  },
  {
    id: "developer-sofia-muller",
    name: "Sofia Müller",
    username: "sofia-muller",
    email: "sofia.muller@example.dev",
    title: "Frontend Engineer",
    location: "Berlin, Germany",
    experienceYears: 6,
    bio:
      "Frontend engineer building accessible, performant interfaces with React and TypeScript.",
    availability: "open",
    companyId: "company-cloudpeak",
    skills: [
      "skill-frontend-engineering",
      "skill-performance-optimization",
      "skill-testing",
      "skill-system-design",
    ],
    technologies: [
      "tech-typescript",
      "tech-react",
      "tech-nextjs",
      "tech-tailwind",
      "tech-javascript",
    ],
    projectIds: [
      "project-cloud-observatory",
      "project-commerce-platform",
    ],
  },
  {
    id: "developer-liam-chen",
    name: "Liam Chen",
    username: "liam-chen",
    email: "liam.chen@example.dev",
    title: "Machine Learning Engineer",
    location: "Toronto, Canada",
    experienceYears: 5,
    bio:
      "Machine learning engineer working on intelligent healthcare and data products.",
    availability: "available",
    companyId: "company-pulse-health",
    skills: [
      "skill-machine-learning",
      "skill-data-engineering",
      
      "skill-system-design",
    ].filter(Boolean),
    technologies: [
      "tech-python",
      "tech-fastapi",
      "tech-pytorch",
      "tech-postgresql",
      "tech-docker",
      "tech-openai",
    ],
    projectIds: [
      "project-pulse-assistant",
      "project-health-insights",
    ],
  },
  {
    id: "developer-emma-johnson",
    name: "Emma Johnson",
    username: "emma-johnson",
    email: "emma.johnson@example.dev",
    title: "Product Engineer",
    location: "Amsterdam, Netherlands",
    experienceYears: 5,
    bio:
      "Product engineer focused on customer-facing commerce experiences and reliable platforms.",
    availability: "open",
    companyId: "company-vertex-commerce",
    skills: [
      "skill-frontend-engineering",
      "skill-api-design",
      "skill-performance-optimization",
      "skill-testing",
    ],
    technologies: [
      "tech-typescript",
      "tech-react",
      "tech-nextjs",
      "tech-nodejs",
      "tech-postgresql",
      "tech-redis",
      "tech-tailwind",
    ],
    projectIds: [
      "project-commerce-platform",
      "project-recommendation-engine",
    ],
  },
  {
    id: "developer-noah-williams",
    name: "Noah Williams",
    username: "noah-williams",
    email: "noah.williams@example.dev",
    title: "AI Platform Engineer",
    location: "San Francisco, United States",
    experienceYears: 9,
    bio:
      "AI platform engineer building developer-facing AI infrastructure and intelligent workflows.",
    availability: "open",
    companyId: "company-orbit-ai",
    skills: [
      "skill-machine-learning",
      "skill-system-design",
      "skill-distributed-systems",
      "skill-api-design",
      "skill-cloud-architecture",
    ],
    technologies: [
      "tech-python",
      "tech-pytorch",
      "tech-openai",
      "tech-fastapi",
      "tech-docker",
      "tech-kubernetes",
      "tech-aws",
    ],
    projectIds: [
      "project-ai-coding-assistant",
      "project-recommendation-engine",
    ],
  },
  {
    id: "developer-aisha-mohamed",
    name: "Aisha Mohamed",
    username: "aisha-mohamed",
    email: "aisha.mohamed@example.dev",
    title: "Backend Developer",
    location: "Nairobi, Kenya",
    experienceYears: 6,
    bio:
      "Backend developer specializing in transaction systems, APIs and mobility platforms.",
    availability: "available",
    companyId: "company-summit-mobility",
    skills: [
      "skill-api-design",
      "skill-database-design",
      "skill-distributed-systems",
      "skill-testing",
      "skill-security",
    ],
    technologies: [
      "tech-typescript",
      "tech-nodejs",
      "tech-express",
      "tech-postgresql",
      "tech-redis",
      "tech-docker",
    ],
    projectIds: [
      "project-mobility-platform",
      "project-atlas-payments",
    ],
  },
  {
    id: "developer-ethan-brown",
    name: "Ethan Brown",
    username: "ethan-brown",
    email: "ethan.brown@example.dev",
    title: "Cloud Engineer",
    location: "Copenhagen, Denmark",
    experienceYears: 8,
    bio:
      "Cloud engineer focused on infrastructure automation, observability and distributed platforms.",
    availability: "open",
    companyId: "company-greenfield-energy",
    skills: [
      "skill-cloud-architecture",
      "skill-devops",
      "skill-distributed-systems",
      "skill-performance-optimization",
    ],
    technologies: [
      "tech-python",
      "tech-nodejs",
      "tech-docker",
      "tech-kubernetes",
      "tech-aws",
      "tech-terraform",
      "tech-redis",
    ],
    projectIds: [
      "project-energy-monitoring",
      "project-cloud-observatory",
    ],
  },
  {
    id: "developer-grace-adeyemi",
    name: "Grace Adeyemi",
    username: "grace-adeyemi",
    email: "grace.adeyemi@example.dev",
    title: "Full Stack Developer",
    location: "Lagos, Nigeria",
    experienceYears: 4,
    bio:
      "Full stack developer building modern web products with TypeScript and React.",
    availability: "available",
    companyId: "company-atlas-fintech",
    skills: [
      "skill-frontend-engineering",
      "skill-api-design",
      "skill-testing",
      "skill-performance-optimization",
    ],
    technologies: [
      "tech-typescript",
      "tech-react",
      "tech-nextjs",
      "tech-nodejs",
      "tech-express",
      "tech-postgresql",
      "tech-tailwind",
    ],
    projectIds: [
      "project-atlas-payments",
      "project-developer-network",
    ],
  },
  {
    id: "developer-oliver-smith",
    name: "Oliver Smith",
    username: "oliver-smith",
    email: "oliver.smith@example.dev",
    title: "Data Engineer",
    location: "London, United Kingdom",
    experienceYears: 7,
    bio:
      "Data engineer building reliable data pipelines and analytical infrastructure.",
    availability: "unavailable",
    companyId: "company-northstar-labs",
    skills: [
      "skill-data-engineering",
      "skill-database-design",
      "skill-distributed-systems",
      "skill-cloud-architecture",
    ],
    technologies: [
      "tech-python",
      "tech-postgresql",
      "tech-redis",
      "tech-docker",
      "tech-aws",
    ],
    projectIds: [
      "project-developer-network",
      "project-health-insights",
    ],
  },
  {
    id: "developer-maya-patel",
    name: "Maya Patel",
    username: "maya-patel",
    email: "maya.patel@example.dev",
    title: "Senior Software Engineer",
    location: "Toronto, Canada",
    experienceYears: 9,
    bio:
      "Senior engineer working across healthcare applications, APIs and data systems.",
    availability: "open",
    companyId: "company-pulse-health",
    skills: [
      "skill-system-design",
      "skill-api-design",
      "skill-database-design",
      "skill-security",
      "skill-testing",
    ],
    technologies: [
      "tech-typescript",
      "tech-nodejs",
      "tech-express",
      "tech-postgresql",
      "tech-react",
      "tech-docker",
    ],
    projectIds: [
      "project-health-insights",
      "project-pulse-assistant",
    ],
  },
];