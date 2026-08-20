import {
  ArrowLeft,
  Code2,
  ExternalLink,
  FolderKanban,
  Users,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { useProject } from "../hooks/useProjects";

import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";
import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import EmptyState from "../components/common/EmptyState";

function ProjectDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const query = useProject(id);

  if (query.isLoading) {
    return (
      <div className="page">
        <LoadingState message="Loading project..." />
      </div>
    );
  }

  if (query.isError) {
    return (
      <div className="page">
        <ErrorState
          title="Project unavailable"
          message={
            query.error instanceof Error
              ? query.error.message
              : "Could not load this project."
          }
          onRetry={() => query.refetch()}
        />
      </div>
    );
  }

  const project = query.data?.data;

  if (!project) {
    return (
      <div className="page">
        <EmptyState
          title="Project not found"
          message="This project does not exist in the graph."
        />
      </div>
    );
  }

  return (
    <div className="page">
      <Link to="/projects" className="back-link">
        <ArrowLeft size={16} />
        Back to projects
      </Link>

      <section className="project-detail-hero">
        <div className="project-detail-icon">
          <FolderKanban size={25} />
        </div>

        <div>
          <div className="page-kicker">Project</div>

          <h2>{project.name}</h2>

          <p>{project.description || "No project description available."}</p>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="button secondary"
            >
              <ExternalLink size={16} />
              Visit project
            </a>
          )}
        </div>
      </section>

      <div className="details-grid">
        <Card>
          <div className="panel-header">
            <div>
              <span className="panel-eyebrow">Technology stack</span>
              <h3>Technologies</h3>
            </div>

            <Code2 size={18} />
          </div>

          <div className="badge-list">
            {project.technologies.map((technology) => (
              <Badge key={technology.id} tone="blue">
                {technology.name}
              </Badge>
            ))}
          </div>
        </Card>

        <Card>
          <div className="panel-header">
            <div>
              <span className="panel-eyebrow">Contributors</span>
              <h3>Developers</h3>
            </div>

            <Users size={18} />
          </div>

          <div className="people-list">
            {project.developers.map((developer) => (
              <Link
                key={developer.id}
                to={`/developers/${developer.id}`}
                className="person-row"
              >
                <span className="mini-avatar">
                  {developer.name
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </span>

                <strong>{developer.name}</strong>
              </Link>
            ))}
          </div>
        </Card>

        <Card className="full-width">
          <div className="panel-header">
            <div>
              <span className="panel-eyebrow">Context</span>
              <h3>Domains & companies</h3>
            </div>
          </div>

          <div className="context-columns">
            <div>
              <span className="context-label">Domains</span>

              <div className="badge-list">
                {project.domains.map((domain) => (
                  <Badge key={domain.id}>{domain.name}</Badge>
                ))}
              </div>
            </div>

            <div>
              <span className="context-label">Companies</span>

              <div className="badge-list">
                {project.companies.map((company) => (
                  <Badge key={company.id}>{company.name}</Badge>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ProjectDetailsPage;
