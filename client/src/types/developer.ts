// client/src/types/developer.ts

/**
 * DevGraph — Developer Domain Types
 */

export interface DeveloperReference {
  id: string;
  name: string;
}

export interface DeveloperProject {
  id: string;
  name: string;
  description?: string;
}

export interface DeveloperCompany {
  id: string;
  name: string;
}

export interface Developer {
  id: string;
  name: string;

  title?: string;
  location?: string;
  avatar?: string;
  bio?: string;

  skills: DeveloperReference[];

  technologies: DeveloperReference[];

  projects: DeveloperProject[];

  companies?: DeveloperCompany[];
}