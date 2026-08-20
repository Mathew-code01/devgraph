import { ArrowLeft, Code2, FolderKanban, MapPin, Network } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import { useDeveloper } from "../hooks/useDevelopers";

import Badge from "../components/ui/Badge";
import Card from "../components/ui/Card";
import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import EmptyState from "../components/common/EmptyState";

function DeveloperDetailsPage() {
  const { id } = useParams<{ id: string }>();

  const query = useDeveloper(id);

  if (query.isLoading) {
    return (
      <div className="page">
        <LoadingState message="Loading developer profile..." />
      </div>
    );
  }

  if (query.isError) {
    return (
      <div className="page">
        <ErrorState
          title="Developer unavailable"
          message={
            query.error instanceof Error
              ? query.error.message
              : "Could not load this developer."
          }
          onRetry={() => query.refetch()}
        />
      </div>
    );
  }

  const developer = query.data?.data;

  if (!developer) {
    return (
      <div className="page">
        <EmptyState
          title="Developer not found"
          message="This developer does not exist in the current graph."
        />
      </div>
    );
  }

  return (
    <div className="page">
      <Link to="/developers" className="back-link">
        <ArrowLeft size={16} />
        Back to developers
      </Link>

      <section className="profile-hero">
        <div className="profile-avatar">
          {developer.name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </div>

        <div className="profile-main">
          <div className="page-kicker">
            <Code2 size={15} />
            Developer profile
          </div>

          <h2>{developer.name}</h2>

          {developer.title && (
            <p className="profile-title">{developer.title}</p>
          )}

          {developer.location && (
            <div className="meta-row">
              <MapPin size={15} />
              {developer.location}
            </div>
          )}

          {developer.bio && <p className="profile-bio">{developer.bio}</p>}

          <Link
            to={`/graph?developer=${developer.id}`}
            className="button primary"
          >
            <Network size={16} />
            Explore graph
          </Link>
        </div>
      </section>

      <div className="details-grid">
        <Card>
          <div className="panel-header">
            <div>
              <span className="panel-eyebrow">Expertise</span>
              <h3>Technologies</h3>
            </div>
          </div>

          <div className="badge-list">
            {developer.technologies.length > 0 ? (
              developer.technologies.map((technology) => (
                <Badge key={technology.id} tone="blue">
                  {technology.name}
                </Badge>
              ))
            ) : (
              <span className="muted">No technologies recorded.</span>
            )}
          </div>
        </Card>

        <Card>
          <div className="panel-header">
            <div>
              <span className="panel-eyebrow">Capabilities</span>
              <h3>Skills</h3>
            </div>
          </div>

          <div className="badge-list">
            {developer.skills.length > 0 ? (
              developer.skills.map((skill) => (
                <Badge key={skill.id}>{skill.name}</Badge>
              ))
            ) : (
              <span className="muted">No skills recorded.</span>
            )}
          </div>
        </Card>

        <Card className="full-width">
          <div className="panel-header">
            <div>
              <span className="panel-eyebrow">Contributions</span>
              <h3>Projects</h3>
            </div>

            <FolderKanban size={18} />
          </div>

          <div className="project-list">
            {developer.projects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="project-list-item"
              >
                <div>
                  <strong>{project.name}</strong>
                  <span>
                    {project.description || "No description available."}
                  </span>
                </div>

                <ArrowLeft size={16} className="rotate-arrow" />
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export default DeveloperDetailsPage;
