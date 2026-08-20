// client/src/types/project.ts

/**
 * DevGraph — Project Domain Types
 */

export interface ProjectReference {
  id: string;
  name: string;
}

export interface ProjectDeveloperReference {
  id: string;
  name: string;
  title?: string | null;
}

export interface Project {
  id: string;
  name: string;

  description?: string | null;

  url?: string | null;

  status?: string | null;

  technologies: ProjectReference[];

  developers: ProjectDeveloperReference[];

  domains: ProjectReference[];

  companies: ProjectReference[];
}