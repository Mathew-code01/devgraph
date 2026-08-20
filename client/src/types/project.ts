// client/src/types/project.ts

/**
 * DevGraph — Project Domain Types
 */

export interface ProjectReference {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  url?: string;
  status?: string;

  technologies: ProjectReference[];

  developers: Array<{
    id: string;
    name: string;
  }>;

  domains: Array<{
    id: string;
    name: string;
  }>;

  companies: Array<{
    id: string;
    name: string;
  }>;
}