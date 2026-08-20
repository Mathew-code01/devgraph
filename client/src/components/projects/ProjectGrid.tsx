// client/src/components/projects/ProjectGrid.tsx

import type { Project } from "../../types/project";

import ProjectCard from "./ProjectCard";

interface ProjectGridProps {
  projects: Project[];
}

function ProjectGrid({ projects }: ProjectGridProps) {
  const safeProjects = Array.isArray(projects) ? projects.filter(Boolean) : [];

  if (safeProjects.length === 0) {
    return null;
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-5
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {safeProjects.map((project, index) => (
        <ProjectCard key={project.id || `project-${index}`} project={project} />
      ))}
    </div>
  );
}

export default ProjectGrid;
