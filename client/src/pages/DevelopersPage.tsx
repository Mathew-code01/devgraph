// client/src/pages/DevelopersPage.tsx

import { useEffect, useState } from "react";
import { Search, Users } from "lucide-react";

import { useDevelopers } from "../hooks/useDevelopers";

import DeveloperGrid from "../components/developers/DeveloperGrid";
import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import EmptyState from "../components/common/EmptyState";

function DevelopersPage() {
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");

  const developersQuery = useDevelopers(1, 20, query);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setQuery(search.trim());
    }, 350);

    return () => window.clearTimeout(timeout);
  }, [search]);

  return (
    <div className="page">
      <section className="page-hero">
        <div>
          <div className="page-kicker">
            <Users size={15} />
            Developer ecosystem
          </div>

          <h2>Explore developers</h2>

          <p>
            Discover developers through their skills, technologies, companies
            and projects.
          </p>
        </div>

        <div className="search-wrapper">
          <Search size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search developers..."
            aria-label="Search developers"
          />
        </div>
      </section>

      {developersQuery.isLoading && (
        <LoadingState message="Loading developers..." />
      )}

      {developersQuery.isError && (
        <ErrorState
          message={
            developersQuery.error instanceof Error
              ? developersQuery.error.message
              : "Could not load developers."
          }
          onRetry={() => developersQuery.refetch()}
        />
      )}

      {developersQuery.isSuccess && developersQuery.data.data.length === 0 && (
        <EmptyState
          title="No developers found"
          message={
            query
              ? `No developers matched "${query}".`
              : "There are currently no developers available."
          }
        />
      )}

      {developersQuery.isSuccess && developersQuery.data.data.length > 0 && (
        <>
          <div className="results-bar">
            <span>
              Showing <strong>{developersQuery.data.data.length}</strong>{" "}
              developers
            </span>
          </div>

          <DeveloperGrid developers={developersQuery.data.data} />
        </>
      )}
    </div>
  );
}

export default DevelopersPage;