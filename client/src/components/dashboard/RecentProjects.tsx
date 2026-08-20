import { ArrowUpRight, FolderKanban, GitBranch } from "lucide-react";
import { Link } from "react-router-dom";

import { useDashboardProjects } from "../../hooks/useDashboard";

import LoadingState from "../common/LoadingState";
import ErrorState from "../common/ErrorState";
import EmptyState from "../common/EmptyState";

import type { Project } from "../../types/project";

function getString(value: unknown, fallback: string): string {
  return typeof value === "string" && value.trim() ? value : fallback;
}

function getNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function RecentProjects() {
  const {
    data: projects,
    isLoading,
    isError,
    refetch,
  } = useDashboardProjects(5);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50 transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400">
            Project intelligence
          </span>

          <h3 className="mt-1 text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
            Recent projects
          </h3>

          <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
            The latest projects currently available in the graph.
          </p>
        </div>

        <Link
          to="/projects"
          aria-label="View all projects"
          className="inline-flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold text-slate-500 transition-colors hover:bg-slate-100 hover:text-indigo-600 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-indigo-400"
        >
          View all
          <ArrowUpRight size={13} />
        </Link>
      </div>

      {isLoading ? (
        <LoadingState compact message="Loading projects..." />
      ) : isError ? (
        <ErrorState
          title="Project data unavailable"
          message="We couldn't load the latest projects."
          onRetry={() => refetch()}
        />
      ) : !projects?.length ? (
        <EmptyState
          title="No projects yet"
          message="Projects will appear here once they have been added to the graph."
        />
      ) : (
        <div className="space-y-2">
          {projects.map((project: Project) => {
            const item = project as unknown as Record<string, unknown>;

            const name = getString(item.name ?? item.title, "Untitled project");

            const description = getString(
              item.description,
              "No project description available.",
            );

            const status = getString(item.status, "");

            const technologyCount = getNumber(
              item.technologyCount ?? item.technologiesCount,
            );

            return (
              <Link
                to={`/projects/${project.id}`}
                key={project.id}
                className="group flex items-center gap-3 rounded-xl border border-transparent p-3 transition-all duration-200 hover:border-indigo-100 hover:bg-indigo-50/60 dark:hover:border-indigo-500/20 dark:hover:bg-indigo-500/10"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 transition-colors group-hover:border-indigo-200 group-hover:bg-indigo-100 group-hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:group-hover:border-indigo-500/30 dark:group-hover:bg-indigo-500/10 dark:group-hover:text-indigo-400">
                  <FolderKanban size={17} strokeWidth={1.8} />
                </span>

                <span className="min-w-0 flex-1">
                  <span className="flex min-w-0 items-center gap-2">
                    <strong className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {name}
                    </strong>

                    {status && (
                      <span className="shrink-0 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold capitalize text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                        {status}
                      </span>
                    )}
                  </span>

                  <span className="mt-1 block truncate text-xs leading-5 text-slate-500 dark:text-slate-400">
                    {description}
                  </span>

                  <span className="mt-2 flex items-center gap-3 text-[11px] font-medium text-slate-400 dark:text-slate-500">
                    {technologyCount !== null && (
                      <span className="inline-flex items-center gap-1">
                        <GitBranch size={11} />
                        {technologyCount} technolog
                        {technologyCount === 1 ? "y" : "ies"}
                      </span>
                    )}

                    <span>Project</span>
                  </span>
                </span>

                <ArrowUpRight
                  size={15}
                  className="shrink-0 text-slate-400 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-indigo-600 dark:text-slate-600 dark:group-hover:text-indigo-400"
                />
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default RecentProjects;
