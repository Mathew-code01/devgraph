// client/src/pages/ProjectsPage.tsx

// client/src/pages/ProjectsPage.tsx

import { useState } from "react";
import {
  FolderKanban,
  Layers3,
  Sparkles,
} from "lucide-react";

import { useProjects } from "../hooks/useProjects";

import ProjectGrid from "../components/projects/ProjectGrid";

import Card from "../components/ui/Card";
import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import EmptyState from "../components/common/EmptyState";

function ProjectsPage() {
  const [page, setPage] = useState(1);

  const limit = 20;

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useProjects(page, limit);

  /**
   * The current PaginatedResponse type does not expose `total`.
   *
   * Therefore we use the number of records returned by the API
   * to determine whether another page is likely available.
   */
  const projects = Array.isArray(data?.data)
    ? data.data
    : [];

  const hasPreviousPage = page > 1;

  /**
   * If the API returns a full page, there may be another page.
   *
   * This means:
   * - 20 records -> Next is enabled
   * - fewer than 20 -> this is the final page
   */
  const hasNextPage = projects.length === limit;

  return (
    <div className="space-y-6">
      {/* ============================================================
          PAGE HEADER
      ============================================================ */}

      <div
        className="
          relative overflow-hidden
          rounded-3xl
          border border-slate-200/80
          bg-white
          shadow-sm shadow-slate-950/[0.03]
          dark:border-slate-800
          dark:bg-slate-950
        "
      >
        {/* Decorative background glow */}
        <div
          className="
            pointer-events-none absolute
            -right-20 -top-28
            h-64 w-64
            rounded-full
            bg-indigo-500/[0.08]
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none absolute
            -bottom-28 -left-20
            h-64 w-64
            rounded-full
            bg-violet-500/[0.06]
            blur-3xl
          "
        />

        <div
          className="
            relative flex flex-col
            gap-6
            p-6
            sm:p-8
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          {/* Header content */}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <div
                className="
                  flex h-9 w-9
                  shrink-0
                  items-center justify-center
                  rounded-xl
                  bg-indigo-50
                  text-indigo-600
                  dark:bg-indigo-500/10
                  dark:text-indigo-400
                "
              >
                <FolderKanban
                  size={17}
                  strokeWidth={1.9}
                />
              </div>

              <span
                className="
                  text-xs
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-indigo-600
                  dark:text-indigo-400
                "
              >
                Project explorer
              </span>
            </div>

            <h1
              className="
                mt-4
                text-3xl
                font-bold
                tracking-tight
                text-slate-950
                dark:text-white
                sm:text-4xl
              "
            >
              Projects
            </h1>

            <p
              className="
                mt-3
                max-w-2xl
                text-sm
                leading-7
                text-slate-600
                dark:text-slate-400
              "
            >
              Explore projects and discover the developers,
              technologies, companies, and domains connected
              to them.
            </p>
          </div>

          {/* Header metrics */}
          <div
            className="
              grid
              grid-cols-2
              gap-3
              sm:flex
            "
          >
            <HeaderMetric
              icon={<Layers3 size={15} />}
              label="Showing"
              value={projects.length}
            />

            <HeaderMetric
              icon={<Sparkles size={15} />}
              label="Page"
              value={page}
            />
          </div>
        </div>
      </div>

      {/* ============================================================
          TOOLBAR
      ============================================================ */}

      <Card>
        <div
          className="
            flex flex-col
            gap-4
            p-4
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:p-5
          "
        >
          {/* Search / future filter area */}
          <div className="min-w-0 flex-1 sm:max-w-md">
            <div
              className="
                flex
                items-center
                gap-3
                rounded-xl
                border
                border-slate-200
                bg-slate-50
                px-4
                py-2.5
                text-sm
                text-slate-500
                dark:border-slate-800
                dark:bg-slate-900
                dark:text-slate-400
              "
            >
              <FolderKanban
                size={16}
                className="shrink-0 text-slate-400"
              />

              <span>
                Browse projects
              </span>
            </div>
          </div>

          {/* Result indicator */}
          <div
            className="
              flex
              items-center
              gap-2
              text-xs
              text-slate-400
            "
          >
            {isFetching && !isLoading && (
              <span
                className="
                  h-1.5
                  w-1.5
                  animate-pulse
                  rounded-full
                  bg-indigo-500
                "
              />
            )}

            <span>
              {projects.length > 0
                ? `${projects.length} project${
                    projects.length === 1
                      ? ""
                      : "s"
                  } on this page`
                : "No projects found"}
            </span>
          </div>
        </div>
      </Card>

      {/* ============================================================
          CONTENT
      ============================================================ */}

      {isLoading ? (
        <LoadingState
          message="Loading projects..."
        />
      ) : isError ? (
        <ErrorState
          title="Unable to load projects"
          message={
            error?.message ||
            "The project service could not complete this request."
          }
          onRetry={() => {
            void refetch();
          }}
        />
      ) : projects.length === 0 ? (
        <EmptyState
          title={
            page > 1
              ? "No more projects"
              : "No projects found"
          }
          message={
            page > 1
              ? "There are no additional projects available on this page."
              : "There are currently no projects available in the graph."
          }
        />
      ) : (
        <>
          {/* Project collection */}
          <ProjectGrid projects={projects} />

          {/* ========================================================
              PAGINATION
          ======================================================== */}

          {(hasPreviousPage || hasNextPage) && (
            <div
              className="
                flex
                flex-col
                items-center
                justify-between
                gap-4
                rounded-2xl
                border
                border-slate-200
                bg-white
                p-4
                shadow-sm
                shadow-slate-950/[0.02]
                sm:flex-row
                dark:border-slate-800
                dark:bg-slate-950
              "
            >
              {/* Page information */}
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-9
                    w-9
                    items-center
                    justify-center
                    rounded-xl
                    bg-indigo-50
                    text-indigo-600
                    dark:bg-indigo-500/10
                    dark:text-indigo-400
                  "
                >
                  <Layers3 size={15} />
                </div>

                <div>
                  <p
                    className="
                      text-xs
                      font-bold
                      text-slate-900
                      dark:text-white
                    "
                  >
                    Page {page}
                  </p>

                  <p
                    className="
                      mt-0.5
                      text-[11px]
                      text-slate-400
                    "
                  >
                    {projects.length} projects displayed
                  </p>
                </div>
              </div>

              {/* Pagination controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={
                    !hasPreviousPage ||
                    isFetching
                  }
                  onClick={() =>
                    setPage((current) =>
                      Math.max(
                        1,
                        current - 1,
                      ),
                    )
                  }
                  className="
                    inline-flex
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-slate-200
                    bg-white
                    px-4
                    py-2.5
                    text-xs
                    font-semibold
                    text-slate-700
                    shadow-sm
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:border-slate-300
                    hover:bg-slate-50
                    hover:shadow-md
                    focus:outline-none
                    focus:ring-2
                    focus:ring-indigo-500/20
                    disabled:pointer-events-none
                    disabled:opacity-40
                    dark:border-slate-700
                    dark:bg-slate-900
                    dark:text-slate-200
                    dark:hover:border-slate-600
                    dark:hover:bg-slate-800
                  "
                >
                  Previous
                </button>

                <div
                  className="
                    hidden
                    min-w-10
                    items-center
                    justify-center
                    rounded-xl
                    bg-slate-100
                    px-3
                    py-2.5
                    text-xs
                    font-bold
                    text-slate-700
                    sm:flex
                    dark:bg-slate-800
                    dark:text-slate-200
                  "
                >
                  {page}
                </div>

                <button
                  type="button"
                  disabled={
                    !hasNextPage ||
                    isFetching
                  }
                  onClick={() =>
                    setPage(
                      (current) =>
                        current + 1,
                    )
                  }
                  className="
                    inline-flex
                    items-center
                    justify-center
                    rounded-xl
                    bg-slate-950
                    px-4
                    py-2.5
                    text-xs
                    font-semibold
                    text-white
                    shadow-sm
                    transition-all
                    duration-200
                    hover:-translate-y-0.5
                    hover:bg-indigo-600
                    hover:shadow-lg
                    hover:shadow-indigo-600/20
                    focus:outline-none
                    focus:ring-2
                    focus:ring-indigo-500/30
                    disabled:pointer-events-none
                    disabled:opacity-40
                    dark:bg-white
                    dark:text-slate-950
                    dark:hover:bg-indigo-400
                  "
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* ================================================================
   HEADER METRIC
================================================================ */

function HeaderMetric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div
      className="
        flex
        min-w-28
        items-center
        gap-3
        rounded-2xl
        border
        border-slate-200
        bg-slate-50/70
        px-4
        py-3
        dark:border-slate-800
        dark:bg-slate-900/60
      "
    >
      <div
        className="
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-white
          text-indigo-500
          shadow-sm
          dark:bg-slate-800
        "
      >
        {icon}
      </div>

      <div>
        <p
          className="
            text-base
            font-bold
            text-slate-900
            dark:text-white
          "
        >
          {value}
        </p>

        <p
          className="
            text-[10px]
            font-bold
            uppercase
            tracking-wider
            text-slate-400
          "
        >
          {label}
        </p>
      </div>
    </div>
  );
}

export default ProjectsPage;