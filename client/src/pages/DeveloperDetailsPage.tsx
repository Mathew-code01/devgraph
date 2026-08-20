import { ArrowLeft, RefreshCw } from "lucide-react";

import { Link, useParams } from "react-router-dom";

import DeveloperProfile from "../components/developers/DeveloperProfile";

import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import EmptyState from "../components/common/EmptyState";

import { useDeveloper } from "../hooks/useDevelopers";

function DeveloperDetailsPage() {
  const { id } = useParams<{
    id: string;
  }>();

  const { data, isLoading, isError, error, refetch, isFetching } =
    useDeveloper(id);

  const developer = data?.data;

  return (
    <section
      className="
        min-h-full
        bg-slate-50
        px-4 py-6
        dark:bg-slate-950
        sm:px-6
        lg:px-8
      "
    >
      <div className="mx-auto max-w-7xl">
        {/* TOP NAV */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <Link
            to="/developers"
            className="
              inline-flex items-center gap-2
              rounded-xl
              border border-slate-200
              bg-white
              px-3.5 py-2.5
              text-xs font-semibold
              text-slate-600
              shadow-sm
              transition-all
              hover:-translate-y-0.5
              hover:border-slate-300
              hover:text-slate-900
              dark:border-slate-800
              dark:bg-slate-950
              dark:text-slate-300
              dark:hover:border-slate-700
              dark:hover:text-white
            "
          >
            <ArrowLeft size={15} />
            Developers
          </Link>

          {developer && (
            <button
              type="button"
              onClick={() => refetch()}
              disabled={isFetching}
              className="
                inline-flex items-center gap-2
                rounded-xl
                border border-slate-200
                bg-white
                px-3.5 py-2.5
                text-xs font-semibold
                text-slate-600
                shadow-sm
                transition-all
                hover:border-slate-300
                hover:bg-slate-50
                disabled:cursor-not-allowed
                disabled:opacity-50
                dark:border-slate-800
                dark:bg-slate-950
                dark:text-slate-300
                dark:hover:bg-slate-900
              "
            >
              <RefreshCw
                size={14}
                className={isFetching ? "animate-spin" : ""}
              />

              <span className="hidden sm:inline">
                {isFetching ? "Refreshing..." : "Refresh"}
              </span>
            </button>
          )}
        </div>

        {/* LOADING */}
        {isLoading && <LoadingState message="Loading developer profile..." />}

        {/* ERROR */}
        {!isLoading && isError && (
          <ErrorState
            title="Unable to load developer"
            message={
              error instanceof Error
                ? error.message
                : "The developer profile could not be loaded."
            }
            onRetry={() => refetch()}
          />
        )}

        {/* NOT FOUND */}
        {!isLoading && !isError && !developer && (
          <EmptyState
            title="Developer not found"
            message="The developer you're looking for does not exist or is no longer available."
          />
        )}

        {/* PROFILE */}
        {!isLoading && !isError && developer && (
          <DeveloperProfile developer={developer} />
        )}
      </div>
    </section>
  );
}

export default DeveloperDetailsPage;
