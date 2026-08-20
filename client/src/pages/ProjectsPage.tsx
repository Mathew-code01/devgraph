// client/src/pages/ProjectsPage.tsx

import { ArrowUpRight, FolderKanban } from "lucide-react";
import { Link } from "react-router-dom";

import { useProjects } from "../hooks/useProjects";

import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import EmptyState from "../components/common/EmptyState";

function ProjectsPage() {
  const query = useProjects();

  return (
    <div className="page">
      <section className="page-hero">
        <div>
          <div className="page-kicker">
            <FolderKanban size={15} />
            Project ecosystem
          </div>

          <h2>Explore projects</h2>

          <p>
            See which developers, technologies, companies and domains connect
            through each project.
          </p>
        </div>
      </section>

      {query.isLoading && <LoadingState message="Loading projects..." />}

      {query.isError && (
        <ErrorState
          message={
            query.error instanceof Error
              ? query.error.message
              : "Could not load projects."
          }
          onRetry={() => query.refetch()}
        />
      )}

      {query.isSuccess && query.data.data.length === 0 && (
        <EmptyState
          title="No projects found"
          message="There are currently no projects in the graph."
        />
      )}

      {query.isSuccess && query.data.data.length > 0 && (
        <div className="project-grid">
          {query.data.data.map((project) => (
            <Link to={`/projects/${project.id}`} key={project.id}>
              <Card className="project-card">
                <div className="project-card-header">
                  <div className="project-icon">
                    <FolderKanban size={19} />
                  </div>

                  <ArrowUpRight size={17} />
                </div>

                <h3>{project.name}</h3>

                <p>
                  {project.description || "No project description available."}
                </p>

                <div className="project-tags">
                  {project.technologies.slice(0, 4).map((technology) => (
                    <Badge key={technology.id}>{technology.name}</Badge>
                  ))}
                </div>

                <div className="project-footer">
                  <span>{project.developers.length} developers</span>

                  <span>{project.technologies.length} technologies</span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectsPage;