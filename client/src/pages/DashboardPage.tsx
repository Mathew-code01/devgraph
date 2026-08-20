// client/src/pages/DashboardPage.tsx

import {
  ArrowRight,
  Code2,
  FolderKanban,
  GitBranch,
  Layers3,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

import { useGraphOverview } from "../hooks/useGraph";

import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import Card from "../components/ui/Card";

function DashboardPage() {
  const overviewQuery = useGraphOverview();

  const nodeCounts = overviewQuery.data?.data.nodes ?? [];

  const getCount = (type: string) =>
    nodeCounts.find((item) => item.type.toLowerCase() === type.toLowerCase())
      ?.count ?? 0;

  const relationshipCount =
    overviewQuery.data?.data.relationships.reduce(
      (total, item) => total + item.count,
      0,
    ) ?? 0;

  return (
    <div className="page">
      <section className="dashboard-hero">
        <div>
          <div className="page-kicker">
            <GitBranch size={15} />
            Graph intelligence
          </div>

          <h2>Understand your developer ecosystem.</h2>

          <p>
            Explore the people, projects, technologies and skills connected
            inside your CognoDB graph.
          </p>
        </div>

        <Link to="/graph" className="button primary">
          Open Graph Explorer
          <ArrowRight size={16} />
        </Link>
      </section>

      {overviewQuery.isLoading && (
        <LoadingState message="Loading graph overview..." />
      )}

      {overviewQuery.isError && (
        <ErrorState
          message={
            overviewQuery.error instanceof Error
              ? overviewQuery.error.message
              : "Could not load graph statistics."
          }
          onRetry={() => overviewQuery.refetch()}
        />
      )}

      {overviewQuery.isSuccess && (
        <>
          <div className="stats-grid">
            <Stat
              label="Developers"
              value={getCount("Developer")}
              icon={<Users size={20} />}
            />

            <Stat
              label="Projects"
              value={getCount("Project")}
              icon={<FolderKanban size={20} />}
            />

            <Stat
              label="Technologies"
              value={getCount("Technology")}
              icon={<Code2 size={20} />}
            />

            <Stat
              label="Skills"
              value={getCount("Skill")}
              icon={<Layers3 size={20} />}
            />

            <Stat
              label="Relationships"
              value={relationshipCount}
              icon={<GitBranch size={20} />}
            />
          </div>

          <div className="dashboard-grid">
            <Card className="dashboard-panel">
              <div className="panel-header">
                <div>
                  <span className="panel-eyebrow">Graph structure</span>

                  <h3>Relationship overview</h3>
                </div>
              </div>

              <div className="relationship-list">
                {overviewQuery.data.data.relationships.map((relationship) => (
                  <div className="relationship-row" key={relationship.type}>
                    <span>{relationship.type}</span>
                    <strong>{relationship.count}</strong>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="dashboard-panel">
              <div className="panel-header">
                <div>
                  <span className="panel-eyebrow">Explore</span>

                  <h3>Start discovering</h3>
                </div>
              </div>

              <div className="quick-links">
                <QuickLink
                  to="/developers"
                  icon={<Users size={18} />}
                  title="Developers"
                  description="Explore people and their graph connections."
                />

                <QuickLink
                  to="/projects"
                  icon={<FolderKanban size={18} />}
                  title="Projects"
                  description="Discover projects and their technologies."
                />

                <QuickLink
                  to="/technologies"
                  icon={<Code2 size={18} />}
                  title="Technologies"
                  description="Find technology relationships."
                />
              </div>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}

function Stat({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <Card className="stat-card">
      <div className="stat-icon">{icon}</div>

      <div>
        <span>{label}</span>
        <strong>{value.toLocaleString()}</strong>
      </div>
    </Card>
  );
}

function QuickLink({
  to,
  icon,
  title,
  description,
}: {
  to: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Link to={to} className="quick-link">
      <div className="quick-link-icon">{icon}</div>

      <div>
        <strong>{title}</strong>
        <span>{description}</span>
      </div>

      <ArrowRight size={17} />
    </Link>
  );
}

export default DashboardPage;