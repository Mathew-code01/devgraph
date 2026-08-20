// server/src/seed/companies.ts


/**
 * DevGraph Seed Data
 * ------------------
 * Contains the companies used to populate the Company nodes
 * in the CognoDB graph.
 *
 * Responsibility:
 * - Define realistic company seed records.
 * - Provide deterministic IDs.
 * - Contain no database logic.
 *
 * Graph node:
 * (:Company)
 */

export interface CompanySeed {
  id: string;
  name: string;
  slug: string;
  industry: string;
  size: "startup" | "small" | "medium" | "large" | "enterprise";
  location: string;
  website: string;
  description: string;
}

export const companies: CompanySeed[] = [
  {
    id: "company-northstar-labs",
    name: "Northstar Labs",
    slug: "northstar-labs",
    industry: "Developer Infrastructure",
    size: "medium",
    location: "London, United Kingdom",
    website: "https://northstarlabs.example",
    description:
      "Developer infrastructure company building tools for modern engineering teams.",
  },
  {
    id: "company-atlas-fintech",
    name: "Atlas Fintech",
    slug: "atlas-fintech",
    industry: "Financial Technology",
    size: "large",
    location: "Lagos, Nigeria",
    website: "https://atlasfintech.example",
    description:
      "Financial technology company providing digital payment and financial infrastructure.",
  },
  {
    id: "company-cloudpeak",
    name: "CloudPeak Systems",
    slug: "cloudpeak-systems",
    industry: "Cloud Computing",
    size: "medium",
    location: "Berlin, Germany",
    website: "https://cloudpeak.example",
    description:
      "Cloud platform company focused on deployment, observability and distributed systems.",
  },
  {
    id: "company-pulse-health",
    name: "Pulse Health",
    slug: "pulse-health",
    industry: "Healthcare Technology",
    size: "small",
    location: "Toronto, Canada",
    website: "https://pulsehealth.example",
    description:
      "Digital healthcare platform connecting patients, clinicians and health services.",
  },
  {
    id: "company-vertex-commerce",
    name: "Vertex Commerce",
    slug: "vertex-commerce",
    industry: "E-commerce",
    size: "large",
    location: "Amsterdam, Netherlands",
    website: "https://vertexcommerce.example",
    description:
      "Commerce technology company building scalable online retail infrastructure.",
  },
  {
    id: "company-orbit-ai",
    name: "Orbit AI",
    slug: "orbit-ai",
    industry: "Artificial Intelligence",
    size: "startup",
    location: "San Francisco, United States",
    website: "https://orbitai.example",
    description:
      "AI company building intelligent workflow and developer productivity products.",
  },
  {
    id: "company-summit-mobility",
    name: "Summit Mobility",
    slug: "summit-mobility",
    industry: "Transportation Technology",
    size: "medium",
    location: "Nairobi, Kenya",
    website: "https://summitmobility.example",
    description:
      "Mobility platform connecting transportation providers with customers.",
  },
  {
    id: "company-greenfield-energy",
    name: "Greenfield Energy",
    slug: "greenfield-energy",
    industry: "Clean Energy",
    size: "medium",
    location: "Copenhagen, Denmark",
    website: "https://greenfieldenergy.example",
    description:
      "Technology-driven renewable energy company building monitoring and optimization systems.",
  },
];