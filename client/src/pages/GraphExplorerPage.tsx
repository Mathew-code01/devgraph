import {
  Activity,
  BrainCircuit,
  CircleDot,
  GitBranch,
  Layers3,
  RefreshCw,
  Users,
} from "lucide-react";

import { Link, useNavigate, useSearchParams } from "react-router-dom";

import { useEffect, useMemo, useState } from "react";

import { useDeveloperGraph } from "../hooks/useGraph";

import { useDevelopers, useProjectGraph } from "../hooks/useDevelopers";

import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";

import GraphExplorer from "../components/graph/GraphExplorer";
import GraphControls from "../components/graph/GraphControls";

function GraphExplorerPage() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  /**
   * Supported URLs:
   *
   * /graph
   *
   * /graph?developer=developer-id
   *
   * /graph?project=project-id
   *
   * Legacy parameter names are also supported.
   */

 function normalizeQueryId(value: string | null): string | undefined {
   if (!value) {
     return undefined;
   }

   const normalized = value.trim();

   if (
     normalized.length === 0 ||
     normalized.toLowerCase() === "null" ||
     normalized.toLowerCase() === "undefined"
   ) {
     return undefined;
   }

   return normalized;
 }

 const projectId = normalizeQueryId(
   searchParams.get("project") ?? searchParams.get("projectId"),
 );

 const developerId = normalizeQueryId(
   searchParams.get("developer") ??
     searchParams.get("developerId") ??
     searchParams.get("id"),
 );

  const [depth, setDepth] = useState(3);

  const [zoom, setZoom] = useState(1);

  /**
   * -------------------------------------------------------
   * Developer discovery
   * -------------------------------------------------------
   *
   * Only used when the page is opened without
   * either a developer or project.
   */

  const {
    data: developersData,
    isLoading: isLoadingDevelopers,
    isError: isDevelopersError,
    error: developersError,
  } = useDevelopers(1, 1, "");

  /**
   * If /graph is opened without a target,
   * automatically select the first developer.
   */
  useEffect(() => {
    if (projectId || developerId) {
      return;
    }

    if (isLoadingDevelopers || isDevelopersError) {
      return;
    }

    const firstDeveloper = developersData?.data?.[0];

    if (!firstDeveloper) {
      return;
    }

    navigate(`/graph?developer=${encodeURIComponent(firstDeveloper.id)}`, {
      replace: true,
    });
  }, [
    projectId,
    developerId,
    developersData,
    isLoadingDevelopers,
    isDevelopersError,
    navigate,
  ]);

  /**
   * -------------------------------------------------------
   * Developer graph
   * -------------------------------------------------------
   */

  const {
    data: developerGraphResponse,
    isLoading: isLoadingDeveloperGraph,
    isError: isDeveloperGraphError,
    error: developerGraphError,
    refetch: refetchDeveloperGraph,
    isFetching: isFetchingDeveloperGraph,
  } = useDeveloperGraph(developerId, depth);

  /**
   * -------------------------------------------------------
   * Project graph
   * -------------------------------------------------------
   */

  const {
    data: projectGraphResponse,
    isLoading: isLoadingProjectGraph,
    isError: isProjectGraphError,
    error: projectGraphError,
    refetch: refetchProjectGraph,
    isFetching: isFetchingProjectGraph,
  } = useProjectGraph(projectId, depth);

  /**
   * Select the active graph.
   *
   * Project always takes priority when
   * ?project=... exists.
   */

  const graphResponse = projectId
    ? projectGraphResponse
    : developerGraphResponse;

  const graph = graphResponse?.data;

  const isLoading = projectId ? isLoadingProjectGraph : isLoadingDeveloperGraph;

  const isError = projectId ? isProjectGraphError : isDeveloperGraphError;

  const error = projectId ? projectGraphError : developerGraphError;

  const isFetching = projectId
    ? isFetchingProjectGraph
    : isFetchingDeveloperGraph;

  const refetch = projectId ? refetchProjectGraph : refetchDeveloperGraph;

  /**
   * -------------------------------------------------------
   * Graph statistics
   * -------------------------------------------------------
   */

  const nodeCount = graph?.nodes.length ?? 0;

  const relationshipCount = graph?.relationships.length ?? 0;

  const nodeTypes = useMemo(() => {
    if (!graph) {
      return [];
    }

    return Array.from(
      new Set(graph.nodes.map((node) => node.type.toLowerCase())),
    );
  }, [graph]);

  const developerNodes =
    graph?.nodes.filter((node) => {
      const type = node.type.toLowerCase();

      return type === "developer" || type === "developers";
    }).length ?? 0;

  const technologyNodes =
    graph?.nodes.filter((node) => {
      const type = node.type.toLowerCase();

      return type === "technology" || type === "technologies";
    }).length ?? 0;

  const projectNodes =
    graph?.nodes.filter((node) => {
      const type = node.type.toLowerCase();

      return type === "project" || type === "projects";
    }).length ?? 0;

  /**
   * -------------------------------------------------------
   * Zoom
   * -------------------------------------------------------
   */

  const handleZoomIn = () => {
    setZoom((current) => Math.min(Number((current + 0.15).toFixed(2)), 2));
  };

  const handleZoomOut = () => {
    setZoom((current) => Math.max(Number((current - 0.15).toFixed(2)), 0.5));
  };

  const handleReset = () => {
    setZoom(1);
  };

  /**
   * -------------------------------------------------------
   * No target selected
   * -------------------------------------------------------
   */

  if (!developerId && !projectId) {
    if (isDevelopersError) {
      return (
        <section className="min-h-full bg-slate-50 px-4 py-6 dark:bg-slate-950 sm:px-6 lg:px-8">
          <div className="mx-auto flex min-h-[65vh] max-w-7xl items-center justify-center">
            <ErrorState
              title="Unable to load developers"
              message={
                developersError instanceof Error
                  ? developersError.message
                  : "We couldn't find a developer to initialize the graph."
              }
              onRetry={() => window.location.reload()}
            />
          </div>
        </section>
      );
    }

    return (
      <section className="min-h-full bg-slate-50 px-4 py-6 dark:bg-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[65vh] max-w-7xl items-center justify-center">
          <LoadingState message="Initializing developer graph..." />
        </div>
      </section>
    );
  }

  /**
   * -------------------------------------------------------
   * Loading
   * -------------------------------------------------------
   */

  if (isLoading) {
    return (
      <section className="min-h-full bg-slate-50 px-4 py-6 dark:bg-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[65vh] max-w-7xl items-center justify-center">
          <LoadingState
            message={
              projectId
                ? "Building project graph..."
                : "Building developer graph..."
            }
          />
        </div>
      </section>
    );
  }

  /**
   * -------------------------------------------------------
   * Error
   * -------------------------------------------------------
   */

  if (isError || !graph) {
    return (
      <section className="min-h-full bg-slate-50 px-4 py-6 dark:bg-slate-950 sm:px-6 lg:px-8">
        <div className="mx-auto flex min-h-[65vh] max-w-7xl items-center justify-center">
          <ErrorState
            title={
              projectId
                ? "Project graph unavailable"
                : "Developer graph unavailable"
            }
            message={
              error instanceof Error
                ? error.message
                : "We couldn't load the graph."
            }
            onRetry={() => refetch()}
          />
        </div>
      </section>
    );
  }

  /**
   * -------------------------------------------------------
   * Render
   * -------------------------------------------------------
   */

  return (
    <section className="min-h-full bg-slate-50 px-4 py-6 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-5">
        {/* HEADER */}

        <header className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.12),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.08),transparent_35%)]" />

          <div className="relative flex flex-col gap-6 p-5 sm:p-7 lg:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-indigo-700 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />

                    {projectId ? "Project graph" : "Developer graph"}
                  </span>

                  <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
                    Depth {depth}
                  </span>
                </div>

                <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
                  {projectId ? "Project graph" : "Developer graph"}
                </h1>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {projectId
                    ? "Visualize how this project connects to developers, technologies, companies, domains and other engineering entities."
                    : "Visualize the connected ecosystem around this developer and explore relationships across your engineering data."}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Link
                  to={projectId ? "/projects" : "/developers"}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition-all hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  {projectId ? (
                    <>
                      <GitBranch size={15} />
                      Projects
                    </>
                  ) : (
                    <>
                      <Users size={15} />
                      Developers
                    </>
                  )}
                </Link>

                <button
                  type="button"
                  onClick={() => refetch()}
                  disabled={isFetching}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-slate-950 px-4 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-600 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-950 dark:hover:bg-indigo-400"
                >
                  <RefreshCw
                    size={14}
                    className={isFetching ? "animate-spin" : ""}
                  />

                  <span className="hidden sm:inline">
                    {isFetching ? "Refreshing..." : "Refresh"}
                  </span>
                </button>
              </div>
            </div>

            {/* STATS */}

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              <StatCard
                label="Nodes"
                value={nodeCount}
                icon={<Layers3 size={15} className="text-indigo-500" />}
              />

              <StatCard
                label="Connections"
                value={relationshipCount}
                icon={<GitBranch size={15} className="text-violet-500" />}
              />

              <StatCard
                label="Technologies"
                value={technologyNodes}
                icon={<BrainCircuit size={15} className="text-blue-500" />}
              />

              <StatCard
                label={projectId ? "Developers" : "Entities"}
                value={
                  projectId
                    ? developerNodes
                    : developerNodes + projectNodes + technologyNodes
                }
                icon={
                  projectId ? (
                    <Users size={15} className="text-emerald-500" />
                  ) : (
                    <Activity size={15} className="text-emerald-500" />
                  )
                }
              />
            </div>
          </div>
        </header>

        {/* CONTROLS */}

        <GraphControls
          depth={depth}
          setDepth={setDepth}
          zoom={zoom}
          onZoomIn={handleZoomIn}
          onZoomOut={handleZoomOut}
          onReset={handleReset}
          nodeTypes={nodeTypes}
        />

        {/* GRAPH */}

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
          <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800 sm:px-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <CircleDot size={15} className="text-indigo-500" />

                  <h2 className="text-sm font-bold text-slate-950 dark:text-white">
                    Relationship map
                  </h2>
                </div>

                <p className="mt-1 text-xs text-slate-400">
                  Click a node to inspect its properties.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                {nodeCount} nodes rendered
              </div>
            </div>
          </div>

          <GraphExplorer data={graph} zoom={zoom} />
        </div>
      </div>
    </section>
  );
}

/**
 * Small statistics card
 */
function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/60">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
          {label}
        </span>

        {icon}
      </div>

      <p className="mt-2 text-xl font-bold text-slate-950 dark:text-white">
        {value.toLocaleString()}
      </p>
    </div>
  );
}

export default GraphExplorerPage;
