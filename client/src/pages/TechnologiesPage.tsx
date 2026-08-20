// client/src/pages/TechnologiesPage.tsx

import { ArrowUpRight, Code2 } from "lucide-react";
import { Link } from "react-router-dom";

import { useTechnologies } from "../hooks/useTechnologies";

// import Card from "../components/ui/Card";
import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import EmptyState from "../components/common/EmptyState";

function TechnologiesPage() {
  const query = useTechnologies();

  return (
    <div className="page">
      <section className="page-hero">
        <div>
          <div className="page-kicker">
            <Code2 size={15} />
            Technology graph
          </div>

          <h2>Explore technologies</h2>

          <p>
            Discover the technologies used across developers and projects in the
            graph.
          </p>
        </div>
      </section>

      {query.isLoading && <LoadingState message="Loading technologies..." />}

      {query.isError && (
        <ErrorState
          message={
            query.error instanceof Error
              ? query.error.message
              : "Could not load technologies."
          }
          onRetry={() => query.refetch()}
        />
      )}

      {query.isSuccess && query.data.data.length === 0 && (
        <EmptyState
          title="No technologies found"
          message="The graph currently contains no technologies."
        />
      )}

      {query.isSuccess && query.data.data.length > 0 && (
        <div className="technology-grid">
          {query.data.data.map((technology) => (
            <Link
              key={technology.id}
              to={`/technologies/${technology.id}`}
              className="technology-card"
            >
              <div className="technology-icon">
                <Code2 size={19} />
              </div>

              <div className="technology-content">
                <h3>{technology.name}</h3>

                {technology.category && <span>{technology.category}</span>}

                <div className="technology-stats">
                  <span>{technology.developerCount ?? 0} developers</span>

                  <span>{technology.projectCount ?? 0} projects</span>
                </div>
              </div>

              <ArrowUpRight size={17} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default TechnologiesPage;