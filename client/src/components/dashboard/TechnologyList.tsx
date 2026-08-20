import { ArrowUpRight, Code2, Layers3 } from "lucide-react";
import { Link } from "react-router-dom";

import { useDashboardTechnologies } from "../../hooks/useDashboard";

import LoadingState from "../common/LoadingState";
import ErrorState from "../common/ErrorState";
import EmptyState from "../common/EmptyState";

import type { Technology } from "../../types/graph";

function TechnologyList() {
  const {
    data: technologies,
    isLoading,
    isError,
    refetch,
  } = useDashboardTechnologies(8);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400">
            Technology intelligence
          </span>

          <h3 className="mt-1 text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
            Most connected technologies
          </h3>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            Technologies with the strongest developer and project connections.
          </p>
        </div>

        <Link
          to="/technologies"
          aria-label="View all technologies"
          className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-500 transition-colors hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-indigo-400"
        >
          View all
          <ArrowUpRight size={13} />
        </Link>
      </div>

      {isLoading ? (
        <LoadingState compact message="Loading technologies..." />
      ) : isError ? (
        <ErrorState
          title="Technology data unavailable"
          message="We couldn't load the technology index."
          onRetry={() => refetch()}
        />
      ) : !technologies?.length ? (
        <EmptyState
          title="No technologies yet"
          message="Technology relationships will appear here once your graph has indexed them."
        />
      ) : (
        <div className="space-y-1">
          {technologies.map((technology: Technology, index: number) => {
            const developerCount = technology.developerCount ?? 0;

            const projectCount = technology.projectCount ?? 0;

            const totalConnections = developerCount + projectCount;

            const connectionWidth = Math.min(100, totalConnections * 4);

            return (
              <Link
                to={`/technologies/${technology.id}`}
                key={technology.id}
                className="group grid grid-cols-[28px_40px_minmax(0,1fr)_auto_16px] items-center gap-3 rounded-xl border border-transparent px-2 py-3 transition-all duration-200 hover:border-indigo-100 hover:bg-indigo-50/60 dark:hover:border-indigo-500/20 dark:hover:bg-indigo-500/10"
              >
                <span className="text-center text-[10px] font-bold tabular-nums text-slate-400 dark:text-slate-600">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-colors group-hover:border-indigo-200 group-hover:bg-indigo-100 group-hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:group-hover:border-indigo-500/30 dark:group-hover:bg-indigo-500/10 dark:group-hover:text-indigo-400">
                  <Code2 size={16} strokeWidth={1.8} />
                </span>

                <span className="min-w-0">
                  <strong className="block truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {technology.name}
                  </strong>

                  <span className="mt-0.5 block truncate text-xs text-slate-500 dark:text-slate-400">
                    {technology.category || "Technology"}
                  </span>

                  <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <span
                      className="block h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500"
                      style={{
                        width: `${connectionWidth}%`,
                      }}
                    />
                  </span>
                </span>

                <span className="hidden items-center gap-3 text-[11px] font-medium text-slate-400 sm:flex dark:text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <Layers3 size={11} />
                    {projectCount}
                  </span>

                  <span>
                    {developerCount} dev
                    {developerCount === 1 ? "" : "s"}
                  </span>
                </span>

                <ArrowUpRight
                  size={14}
                  className="text-slate-400 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-indigo-600 dark:text-slate-600 dark:group-hover:text-indigo-400"
                />
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default TechnologyList;
