// client/src/types/developer.ts

/**
 * DevGraph — Developer Domain Types
 */

export interface DeveloperReference {
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

  projects: Array<{
    id: string;
    name: string;
    description?: string;
  }>;

  companies?: Array<{
    id: string;
    name: string;
  }>;
}