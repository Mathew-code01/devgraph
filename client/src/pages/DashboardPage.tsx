// client/src/pages/DashboardPage.tsx

import {
  ArrowUpRight,
  BrainCircuit,
  Code2,
  FolderKanban,
  GitBranch,
  Layers3,
  Network,
  RefreshCw,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useGraphOverview } from "../hooks/useGraph";

import ErrorState from "../components/common/ErrorState";
import LoadingState from "../components/common/LoadingState";

import StatCard from "../components/dashboard/StatCard";
import TechnologyList from "../components/dashboard/TechnologyList";
import RecentProjects from "../components/dashboard/RecentProjects";
import RelationshipOverview from "../components/dashboard/RelationshipOverview";
import QuickActions from "../components/dashboard/QuickActions";

function DashboardPage() {
  const { data, isLoading, isError, error, refetch, isFetching } =
    useGraphOverview();

  if (isLoading) {
    return (
      <section className="min-h-full bg-slate-50 px-4 py-6 dark:bg-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center">
          <LoadingState message="Loading DevGraph overview..." />
        </div>
      </section>
    );
  }

  if (isError || !data?.data) {
    return (
      <section className="min-h-full bg-slate-50 px-4 py-6 dark:bg-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[60vh] max-w-7xl items-center justify-center">
          <ErrorState
            title="Dashboard data unavailable"
            message={
              error instanceof Error
                ? error.message
                : "We couldn't retrieve the latest graph overview."
            }
            onRetry={() => refetch()}
          />
        </div>
      </section>
    );
  }

  const overview = data.data;

  const nodeCount = overview.nodes.reduce(
    (total, item) => total + item.count,
    0,
  );

  const relationshipCount = overview.relationships.reduce(
    (total, item) => total + item.count,
    0,
  );

  const developerCount =
    overview.nodes.find((item) => {
      const type = item.type.toLowerCase();

      return type === "developer" || type === "developers";
    })?.count ?? 0;

  const projectCount =
    overview.nodes.find((item) => {
      const type = item.type.toLowerCase();

      return type === "project" || type === "projects";
    })?.count ?? 0;

  const technologyCount =
    overview.nodes.find((item) => {
      const type = item.type.toLowerCase();

      return type === "technology" || type === "technologies";
    })?.count ?? 0;

  return (
    <section className="min-h-full bg-slate-50 px-4 py-6 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* HERO */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-transparent to-violet-50 dark:from-indigo-500/10 dark:via-transparent dark:to-violet-500/10" />

          <div className="relative px-5 py-8 sm:px-8 sm:py-10 lg:px-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-700 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_3px_rgba(16,185,129,0.12)]" />
                Developer intelligence
              </div>

              <h1 className="mt-5 max-w-2xl text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl dark:text-white">
                Understand your developer graph.
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base dark:text-slate-400">
                Explore developers, projects, technologies, and the
                relationships connecting them across your engineering ecosystem.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/graph"
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/20 dark:bg-slate-900 dark:text-white dark:hover:bg-indigo-500"
                >
                  <Network size={15} />
                  Explore graph
                  <ArrowUpRight size={14} />
                </Link>

                <button
                  type="button"
                  onClick={() => refetch()}
                  disabled={isFetching}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  <RefreshCw
                    size={14}
                    className={isFetching ? "animate-spin" : ""}
                  />
                  {isFetching ? "Refreshing..." : "Refresh data"}
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-slate-200/80 pt-5 text-xs sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
              <div className="inline-flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Graph online
              </div>

              <span className="text-slate-500 dark:text-slate-500">
                {relationshipCount.toLocaleString()} relationships indexed
              </span>
            </div>
          </div>
        </div>

        {/* STATISTICS */}
        <div>
          <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400">
                Overview
              </span>

              <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-950 dark:text-white">
                Graph at a glance
              </h2>
            </div>

            <span className="text-xs font-medium text-slate-400 dark:text-slate-500">
              {nodeCount.toLocaleString()} total nodes
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
            <StatCard
              label="Developers"
              value={developerCount}
              icon={Users}
              description="People represented in the graph"
              tone="indigo"
            />

            <StatCard
              label="Projects"
              value={projectCount}
              icon={FolderKanban}
              description="Projects connected to your ecosystem"
              tone="blue"
            />

            <StatCard
              label="Technologies"
              value={technologyCount}
              icon={Code2}
              description="Technology nodes currently indexed"
              tone="violet"
            />

            <StatCard
              label="Relationships"
              value={relationshipCount}
              icon={GitBranch}
              description="Connections across the graph"
              tone="emerald"
            />

            <StatCard
              label="Graph nodes"
              value={nodeCount}
              icon={Layers3}
              description="Total entities currently indexed"
              tone="slate"
            />
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(340px,0.9fr)]">
          <div className="space-y-5">
            <TechnologyList />

            <RelationshipOverview relationships={overview.relationships} />
          </div>

          <div className="space-y-5">
            <RecentProjects />

            <QuickActions />
          </div>
        </div>

        {/* ENTITY DISTRIBUTION */}
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950 dark:shadow-none sm:p-6">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400">
                Graph composition
              </span>

              <h2 className="mt-1 text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
                Entity distribution
              </h2>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                A breakdown of the entities currently represented in DevGraph.
              </p>
            </div>

            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">
              <BrainCircuit size={18} />
            </span>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {overview.nodes.map((node) => {
              const percentage =
                nodeCount > 0 ? Math.round((node.count / nodeCount) * 100) : 0;

              return (
                <div
                  key={node.type}
                  className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-900/40"
                >
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <span className="block truncate text-sm font-semibold text-slate-800 dark:text-slate-200">
                        {node.type}
                      </span>

                      <span className="mt-0.5 block text-xs text-slate-400 dark:text-slate-500">
                        {node.count.toLocaleString()} entities
                      </span>
                    </div>

                    <strong className="shrink-0 text-sm font-bold text-slate-950 dark:text-white">
                      {percentage}%
                    </strong>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                    <span
                      className="block h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-700"
                      style={{
                        width: `${percentage}%`,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </section>
  );
}

export default DashboardPage;