// server/src/seed/domains.ts

/**
 * DevGraph Seed Data
 * ------------------
 * Contains domain/category nodes.
 *
 * Responsibility:
 * - Define the areas in which projects operate.
 * - Provide deterministic domain IDs.
 *
 * Graph node:
 * (:Domain)
 */

export interface DomainSeed {
  id: string;
  name: string;
  slug: string;
  description: string;
}

export const domains: DomainSeed[] = [
  {
    id: "domain-fintech",
    name: "Fintech",
    slug: "fintech",
    description:
      "Technology products and platforms focused on financial services.",
  },
  {
    id: "domain-healthtech",
    name: "Healthtech",
    slug: "healthtech",
    description:
      "Technology products designed for healthcare and clinical workflows.",
  },
  {
    id: "domain-ecommerce",
    name: "E-commerce",
    slug: "ecommerce",
    description:
      "Digital commerce, retail and marketplace applications.",
  },
  {
    id: "domain-ai",
    name: "Artificial Intelligence",
    slug: "artificial-intelligence",
    description:
      "Applications involving machine learning, generative AI and intelligent automation.",
  },
  {
    id: "domain-developer-tools",
    name: "Developer Tools",
    slug: "developer-tools",
    description:
      "Tools and infrastructure designed to improve software development workflows.",
  },
  {
    id: "domain-cloud",
    name: "Cloud Infrastructure",
    slug: "cloud-infrastructure",
    description:
      "Cloud platforms, deployment infrastructure and distributed systems.",
  },
  {
    id: "domain-mobility",
    name: "Mobility",
    slug: "mobility",
    description:
      "Transportation, logistics and mobility technology.",
  },
  {
    id: "domain-energy",
    name: "Clean Energy",
    slug: "clean-energy",
    description:
      "Technology supporting renewable energy generation and management.",
  },
];