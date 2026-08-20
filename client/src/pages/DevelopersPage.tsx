// client/src/pages/DevelopersPage.tsx

import {
  ChevronLeft,
  ChevronRight,
  Code2,
  Users,
  UserRoundPlus,
} from "lucide-react";

import { useEffect, useMemo, useState } from "react";

import DeveloperFilters from "../components/developers/DeveloperFilters";
import DeveloperGrid from "../components/developers/DeveloperGrid";

import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import EmptyState from "../components/common/EmptyState";

import { useDevelopers } from "../hooks/useDevelopers";

function DevelopersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"name-asc" | "name-desc">("name-asc");

  const limit = 12;

  /*
   * Small debounce so the API is not called
   * on every single keystroke.
   */
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedSearch(search.trim());
      setPage(1);
    }, 350);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [search]);

  const { data, isLoading, isFetching, isError, error, refetch } =
    useDevelopers(page, limit, debouncedSearch);

  const developers = data?.data ?? [];

  const total = data?.pagination?.total ?? 0;

  const totalPages = data?.pagination?.totalPages ?? 1;

  const sortedDevelopers = useMemo(() => {
    const result = [...developers];

    result.sort((a, b) => {
      const nameA = a.name?.toLowerCase() ?? "";
      const nameB = b.name?.toLowerCase() ?? "";

      if (sort === "name-desc") {
        return nameB.localeCompare(nameA);
      }

      return nameA.localeCompare(nameB);
    });

    return result;
  }, [developers, sort]);

  const firstItem = total === 0 ? 0 : (page - 1) * limit + 1;

  const lastItem = Math.min(page * limit, total);

  const handlePrevious = () => {
    setPage((current) => Math.max(1, current - 1));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNext = () => {
    setPage((current) => Math.min(totalPages, current + 1));

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
      <div className="mx-auto max-w-7xl space-y-5">
        {/* HERO */}
        <header
          className="
            relative overflow-hidden
            rounded-3xl
            border border-slate-200/80
            bg-white
            shadow-sm
            shadow-slate-950/[0.03]
            dark:border-slate-800
            dark:bg-slate-950
          "
        >
          <div
            className="
              pointer-events-none absolute inset-0
              bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.14),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.08),transparent_32%)]
            "
          />

          <div
            className="
              relative flex flex-col
              gap-7 p-5
              sm:p-7
              lg:p-8
            "
          >
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="
                      inline-flex items-center gap-2
                      rounded-full
                      border border-indigo-100
                      bg-indigo-50
                      px-3 py-1.5
                      text-[10px] font-bold
                      uppercase tracking-[0.16em]
                      text-indigo-700
                      dark:border-indigo-500/20
                      dark:bg-indigo-500/10
                      dark:text-indigo-300
                    "
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    Developer directory
                  </span>
                </div>

                <h1
                  className="
                    mt-4
                    text-2xl font-bold
                    tracking-tight
                    text-slate-950
                    dark:text-white
                    sm:text-3xl
                    lg:text-4xl
                  "
                >
                  Discover developers
                </h1>

                <p
                  className="
                    mt-3 max-w-2xl
                    text-sm leading-6
                    text-slate-500
                    dark:text-slate-400
                    sm:text-base
                  "
                >
                  Explore developers, their skills, technologies, projects, and
                  connections across your engineering knowledge graph.
                </p>
              </div>

              {/* Directory stats */}
              <div
                className="
                  flex shrink-0
                  items-center gap-3
                  rounded-2xl
                  border border-slate-200
                  bg-slate-50/80
                  px-4 py-3
                  dark:border-slate-800
                  dark:bg-slate-900/70
                "
              >
                <div
                  className="
                    flex h-10 w-10
                    items-center justify-center
                    rounded-xl
                    bg-indigo-100
                    text-indigo-600
                    dark:bg-indigo-500/10
                    dark:text-indigo-400
                  "
                >
                  <Users size={18} />
                </div>

                <div>
                  <p className="text-lg font-bold text-slate-950 dark:text-white">
                    {total.toLocaleString()}
                  </p>

                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                    Developers
                  </p>
                </div>
              </div>
            </div>

            {/* Mini feature row */}
            <div
              className="
                grid grid-cols-1 gap-3
                sm:grid-cols-3
              "
            >
              <HeroFeature
                icon={<Users size={15} />}
                title="Developer profiles"
                description="Rich profiles and expertise."
              />

              <HeroFeature
                icon={<Code2 size={15} />}
                title="Technology mapping"
                description="Skills and technologies."
              />

              <HeroFeature
                icon={<UserRoundPlus size={15} />}
                title="Connected ecosystem"
                description="Projects and relationships."
              />
            </div>
          </div>
        </header>

        {/* FILTERS */}
        <DeveloperFilters
          search={search}
          onSearchChange={setSearch}
          sort={sort}
          onSortChange={setSort}
          total={total}
        />

        {/* LOADING */}
        {isLoading && <LoadingState message="Loading developers..." />}

        {/* ERROR */}
        {!isLoading && isError && (
          <ErrorState
            title="Unable to load developers"
            message={
              error instanceof Error
                ? error.message
                : "The developer directory could not be loaded."
            }
            onRetry={() => refetch()}
          />
        )}

        {/* EMPTY */}
        {!isLoading && !isError && developers.length === 0 && (
          <EmptyState
            title={
              debouncedSearch
                ? "No developers found"
                : "No developers available"
            }
            message={
              debouncedSearch
                ? `No developers matched "${debouncedSearch}". Try a different name, role, or location.`
                : "There are currently no developers available in the directory."
            }
          />
        )}

        {/* GRID */}
        {!isLoading && !isError && developers.length > 0 && (
          <>
            <div className="relative">
              {isFetching && (
                <div
                  className="
                      absolute right-0 -top-8
                      flex items-center gap-2
                      text-[11px] font-medium
                      text-slate-400
                    "
                >
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-indigo-500" />
                  Updating results...
                </div>
              )}

              <DeveloperGrid developers={sortedDevelopers} />
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
              <div
                className="
                    flex flex-col gap-4
                    rounded-3xl
                    border border-slate-200/80
                    bg-white
                    p-4
                    shadow-sm
                    dark:border-slate-800
                    dark:bg-slate-950
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                  "
              >
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  Showing{" "}
                  <span className="font-bold text-slate-700 dark:text-slate-200">
                    {firstItem}
                  </span>{" "}
                  –{" "}
                  <span className="font-bold text-slate-700 dark:text-slate-200">
                    {lastItem}
                  </span>{" "}
                  of{" "}
                  <span className="font-bold text-slate-700 dark:text-slate-200">
                    {total}
                  </span>
                </p>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={page <= 1}
                    onClick={handlePrevious}
                    className="
                        inline-flex h-10
                        items-center gap-2
                        rounded-xl
                        border border-slate-200
                        bg-white
                        px-3.5
                        text-xs font-semibold
                        text-slate-700
                        transition-all
                        hover:border-slate-300
                        hover:bg-slate-50
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                        dark:border-slate-800
                        dark:bg-slate-900
                        dark:text-slate-200
                        dark:hover:bg-slate-800
                      "
                  >
                    <ChevronLeft size={15} />
                    <span className="hidden sm:inline">Previous</span>
                  </button>

                  <div
                    className="
                        flex h-10 min-w-10
                        items-center justify-center
                        rounded-xl
                        bg-slate-950
                        px-3
                        text-xs font-bold
                        text-white
                        dark:bg-white
                        dark:text-slate-950
                      "
                  >
                    {page}
                  </div>

                  <button
                    type="button"
                    disabled={page >= totalPages}
                    onClick={handleNext}
                    className="
                        inline-flex h-10
                        items-center gap-2
                        rounded-xl
                        border border-slate-200
                        bg-white
                        px-3.5
                        text-xs font-semibold
                        text-slate-700
                        transition-all
                        hover:border-slate-300
                        hover:bg-slate-50
                        disabled:cursor-not-allowed
                        disabled:opacity-40
                        dark:border-slate-800
                        dark:bg-slate-900
                        dark:text-slate-200
                        dark:hover:bg-slate-800
                      "
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function HeroFeature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div
      className="
        flex items-center gap-3
        rounded-2xl
        border border-slate-200/80
        bg-slate-50/70
        px-4 py-3
        dark:border-slate-800
        dark:bg-slate-900/60
      "
    >
      <div
        className="
          flex h-8 w-8 shrink-0
          items-center justify-center
          rounded-xl
          bg-white
          text-indigo-500
          shadow-sm
          dark:bg-slate-800
        "
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p className="truncate text-xs font-bold text-slate-800 dark:text-slate-200">
          {title}
        </p>

        <p className="mt-0.5 truncate text-[10px] text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}

export default DevelopersPage;