// server/src/seed/technologies.ts


/**
 * DevGraph Seed Data
 * ------------------
 * Contains technology nodes and technology-to-technology
 * relationships.
 *
 * Graph node:
 * (:Technology)
 *
 * Graph relationship:
 * (:Technology)-[:RELATED_TO]->(:Technology)
 */

export interface TechnologySeed {
  id: string;
  name: string;
  slug: string;
  category: string;
  type: "language" | "framework" | "database" | "cloud" | "tool" | "runtime";
  description: string;
}

export interface TechnologyRelationshipSeed {
  from: string;
  to: string;
  reason: string;
}

export const technologies: TechnologySeed[] = [
  {
    id: "tech-typescript",
    name: "TypeScript",
    slug: "typescript",
    category: "Programming Language",
    type: "language",
    description:
      "A statically typed programming language built on JavaScript.",
  },
  {
    id: "tech-javascript",
    name: "JavaScript",
    slug: "javascript",
    category: "Programming Language",
    type: "language",
    description:
      "A programming language widely used for web and application development.",
  },
  {
    id: "tech-react",
    name: "React",
    slug: "react",
    category: "Frontend",
    type: "framework",
    description:
      "A component-based library for building web interfaces.",
  },
  {
    id: "tech-nodejs",
    name: "Node.js",
    slug: "nodejs",
    category: "Backend",
    type: "runtime",
    description:
      "A JavaScript runtime used for server-side applications.",
  },
  {
    id: "tech-express",
    name: "Express",
    slug: "express",
    category: "Backend",
    type: "framework",
    description:
      "A lightweight Node.js framework for HTTP APIs and web servers.",
  },
  {
    id: "tech-nextjs",
    name: "Next.js",
    slug: "nextjs",
    category: "Frontend",
    type: "framework",
    description:
      "A React framework supporting full-stack web applications.",
  },
  {
    id: "tech-python",
    name: "Python",
    slug: "python",
    category: "Programming Language",
    type: "language",
    description:
      "A general-purpose programming language widely used for web, data and AI systems.",
  },
  {
    id: "tech-fastapi",
    name: "FastAPI",
    slug: "fastapi",
    category: "Backend",
    type: "framework",
    description:
      "A modern Python framework for building APIs.",
  },
  {
    id: "tech-postgresql",
    name: "PostgreSQL",
    slug: "postgresql",
    category: "Database",
    type: "database",
    description:
      "A powerful open-source relational database system.",
  },
  {
    id: "tech-mongodb",
    name: "MongoDB",
    slug: "mongodb",
    category: "Database",
    type: "database",
    description:
      "A document-oriented NoSQL database.",
  },
  {
    id: "tech-neo4j",
    name: "Neo4j",
    slug: "neo4j",
    category: "Database",
    type: "database",
    description:
      "A graph database using nodes, relationships and properties.",
  },
  {
    id: "tech-redis",
    name: "Redis",
    slug: "redis",
    category: "Infrastructure",
    type: "database",
    description:
      "An in-memory data store commonly used for caching and fast data access.",
  },
  {
    id: "tech-aws",
    name: "AWS",
    slug: "aws",
    category: "Cloud",
    type: "cloud",
    description:
      "A comprehensive cloud computing platform.",
  },
  {
    id: "tech-docker",
    name: "Docker",
    slug: "docker",
    category: "Infrastructure",
    type: "tool",
    description:
      "A containerization platform for packaging and running applications.",
  },
  {
    id: "tech-kubernetes",
    name: "Kubernetes",
    slug: "kubernetes",
    category: "Infrastructure",
    type: "tool",
    description:
      "A platform for orchestrating containerized workloads.",
  },
  {
    id: "tech-tailwind",
    name: "Tailwind CSS",
    slug: "tailwind-css",
    category: "Frontend",
    type: "framework",
    description:
      "A utility-first CSS framework for building user interfaces.",
  },
  {
    id: "tech-pytorch",
    name: "PyTorch",
    slug: "pytorch",
    category: "AI",
    type: "framework",
    description:
      "A machine learning framework commonly used for deep learning.",
  },
  {
    id: "tech-openai",
    name: "OpenAI API",
    slug: "openai-api",
    category: "AI",
    type: "tool",
    description:
      "An API for integrating AI models into applications.",
  },
  {
    id: "tech-github-actions",
    name: "GitHub Actions",
    slug: "github-actions",
    category: "DevOps",
    type: "tool",
    description:
      "A CI/CD automation platform integrated with GitHub.",
  },
  {
    id: "tech-terraform",
    name: "Terraform",
    slug: "terraform",
    category: "Infrastructure",
    type: "tool",
    description:
      "Infrastructure-as-code tooling for provisioning cloud resources.",
  },
];

export const technologyRelationships: TechnologyRelationshipSeed[] = [
  {
    from: "tech-typescript",
    to: "tech-javascript",
    reason: "TypeScript extends the JavaScript language ecosystem.",
  },
  {
    from: "tech-react",
    to: "tech-typescript",
    reason: "React applications are commonly written using TypeScript.",
  },
  {
    from: "tech-nextjs",
    to: "tech-react",
    reason: "Next.js applications are built on React.",
  },
  {
    from: "tech-nodejs",
    to: "tech-javascript",
    reason: "Node.js executes JavaScript on the server.",
  },
  {
    from: "tech-express",
    to: "tech-nodejs",
    reason: "Express is a Node.js web framework.",
  },
  {
    from: "tech-fastapi",
    to: "tech-python",
    reason: "FastAPI is a Python web framework.",
  },
  {
    from: "tech-docker",
    to: "tech-kubernetes",
    reason: "Kubernetes commonly orchestrates containerized workloads.",
  },
  {
    from: "tech-terraform",
    to: "tech-aws",
    reason: "Terraform can provision AWS infrastructure.",
  },
  {
    from: "tech-pytorch",
    to: "tech-python",
    reason: "PyTorch has strong Python ecosystem support.",
  },
  {
    from: "tech-openai",
    to: "tech-python",
    reason: "Python is commonly used for AI API integrations.",
  },
  {
    from: "tech-openai",
    to: "tech-typescript",
    reason: "TypeScript applications can integrate with AI APIs.",
  },
  {
    from: "tech-neo4j",
    to: "tech-nodejs",
    reason: "Neo4j provides an official JavaScript/Node.js driver.",
  },
  {
    from: "tech-redis",
    to: "tech-nodejs",
    reason: "Redis is frequently integrated into Node.js backends.",
  },
  {
    from: "tech-tailwind",
    to: "tech-react",
    reason: "Tailwind CSS is commonly used to style React applications.",
  },
];