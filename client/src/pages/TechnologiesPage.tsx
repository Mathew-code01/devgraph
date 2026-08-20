// client/src/pages/TechnologiesPage.tsx

import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  Code2,
  FolderKanban,
  Layers3,
  Search,
  Users,
  X,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useTechnologies } from "../hooks/useTechnologies";

import type { Technology } from "../types/graph";

import Card from "../components/ui/Card";
import Badge from "../components/ui/Badge";

import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import EmptyState from "../components/common/EmptyState";

function TechnologiesPage() {
  const query = useTechnologies();

  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const technologies = useMemo<Technology[]>(() => {
    if (!Array.isArray(query.data?.data)) {
      return [];
    }

    return query.data.data.filter(Boolean);
  }, [query.data]);

  /**
   * Build a unique category list from the API response.
   *
   * Technologies without a category are grouped under
   * "Other" in the UI.
   */
  const categories = useMemo(() => {
    const values = technologies
      .map((technology) => technology.category?.trim())
      .filter((category): category is string => Boolean(category));

    return Array.from(new Set(values)).sort((a, b) => a.localeCompare(b));
  }, [technologies]);

  /**
   * Filter technologies by search and category.
   */
  const filteredTechnologies = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return technologies.filter((technology) => {
      const name = technology.name?.toLowerCase() ?? "";

      const category = technology.category?.toLowerCase() ?? "";

      const matchesSearch =
        !normalizedSearch ||
        name.includes(normalizedSearch) ||
        category.includes(normalizedSearch);

      const technologyCategory = technology.category?.trim() || "Other";

      const matchesCategory =
        selectedCategory === "all" || technologyCategory === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [technologies, search, selectedCategory]);

  /**
   * Summary statistics.
   */
  const totalDevelopers = useMemo(() => {
    return technologies.reduce(
      (total, technology) => total + normalizeCount(technology.developerCount),
      0,
    );
  }, [technologies]);

  const totalProjects = useMemo(() => {
    return technologies.reduce(
      (total, technology) => total + normalizeCount(technology.projectCount),
      0,
    );
  }, [technologies]);

  const hasActiveFilters =
    search.trim().length > 0 || selectedCategory !== "all";

  function clearFilters() {
    setSearch("");
    setSelectedCategory("all");
  }

  if (query.isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader total={0} categories={0} developers={0} projects={0} />

        <LoadingState message="Loading technologies..." />
      </div>
    );
  }

  if (query.isError) {
    return (
      <div className="space-y-6">
        <PageHeader total={0} categories={0} developers={0} projects={0} />

        <ErrorState
          title="Unable to load technologies"
          message={
            query.error?.message ||
            "The technology service could not complete this request."
          }
          onRetry={() => {
            void query.refetch();
          }}
        />
      </div>
    );
  }

  if (technologies.length === 0) {
    return (
      <div className="space-y-6">
        <PageHeader total={0} categories={0} developers={0} projects={0} />

        <EmptyState
          title="No technologies found"
          message="There are currently no technologies available in the DevGraph."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ============================================================
          PAGE HEADER
      ============================================================ */}

      <PageHeader
        total={technologies.length}
        categories={categories.length}
        developers={totalDevelopers}
        projects={totalProjects}
      />

      {/* ============================================================
          FILTER TOOLBAR
      ============================================================ */}

      <Card>
        <div className="p-4 sm:p-5">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div className="relative min-w-0 flex-1">
                <Search
                  size={17}
                  className="
                    pointer-events-none
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-slate-400
                  "
                />

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search technologies..."
                  aria-label="Search technologies"
                  className="
                    h-11
                    w-full
                    rounded-xl
                    border
                    border-slate-200
                    bg-slate-50
                    pl-11
                    pr-10
                    text-sm
                    font-medium
                    text-slate-800
                    outline-none
                    transition-all
                    placeholder:text-slate-400
                    focus:border-indigo-400
                    focus:bg-white
                    focus:ring-4
                    focus:ring-indigo-500/10
                    dark:border-slate-800
                    dark:bg-slate-900
                    dark:text-slate-100
                    dark:placeholder:text-slate-500
                    dark:focus:border-indigo-500/50
                    dark:focus:bg-slate-900
                  "
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    aria-label="Clear search"
                    className="
                      absolute
                      right-3
                      top-1/2
                      flex
                      h-7
                      w-7
                      -translate-y-1/2
                      items-center
                      justify-center
                      rounded-lg
                      text-slate-400
                      transition-colors
                      hover:bg-slate-200
                      hover:text-slate-600
                      dark:hover:bg-slate-800
                      dark:hover:text-slate-200
                    "
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Result count */}
              <div
                className="
                  flex
                  shrink-0
                  items-center
                  gap-2
                  text-xs
                  font-medium
                  text-slate-400
                "
              >
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-indigo-500
                  "
                />

                <span>
                  {filteredTechnologies.length}{" "}
                  {filteredTechnologies.length === 1
                    ? "technology"
                    : "technologies"}
                </span>
              </div>
            </div>

            {/* Categories */}
            {categories.length > 0 && (
              <div
                className="
                  flex
                  min-w-0
                  flex-wrap
                  items-center
                  gap-2
                  border-t
                  border-slate-200
                  pt-4
                  dark:border-slate-800
                "
              >
                <span
                  className="
                    mr-1
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.12em]
                    text-slate-400
                  "
                >
                  Category
                </span>

                <CategoryButton
                  active={selectedCategory === "all"}
                  onClick={() => setSelectedCategory("all")}
                >
                  All
                </CategoryButton>

                {categories.map((category) => (
                  <CategoryButton
                    key={category}
                    active={selectedCategory === category}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </CategoryButton>
                ))}

                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="
                      ml-auto
                      inline-flex
                      items-center
                      gap-1.5
                      rounded-lg
                      px-2.5
                      py-1.5
                      text-xs
                      font-semibold
                      text-slate-500
                      transition-colors
                      hover:bg-slate-100
                      hover:text-indigo-600
                      dark:text-slate-400
                      dark:hover:bg-slate-800
                      dark:hover:text-indigo-400
                    "
                  >
                    <X size={13} />
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* ============================================================
          EMPTY FILTER RESULT
      ============================================================ */}

      {filteredTechnologies.length === 0 ? (
        <Card>
          <div
            className="
              flex
              flex-col
              items-center
              justify-center
              px-5
              py-16
              text-center
              sm:px-8
            "
          >
            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-indigo-50
                text-indigo-500
                dark:bg-indigo-500/10
                dark:text-indigo-400
              "
            >
              <Search size={22} />
            </div>

            <h3
              className="
                mt-5
                text-base
                font-bold
                text-slate-900
                dark:text-white
              "
            >
              No matching technologies
            </h3>

            <p
              className="
                mt-2
                max-w-md
                text-sm
                leading-6
                text-slate-500
                dark:text-slate-400
              "
            >
              Try a different search term or remove the category filter to see
              more technologies.
            </p>

            <button
              type="button"
              onClick={clearFilters}
              className="
                mt-5
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-slate-950
                px-4
                py-2.5
                text-xs
                font-bold
                text-white
                shadow-sm
                transition-all
                hover:-translate-y-0.5
                hover:bg-indigo-600
                hover:shadow-lg
                dark:bg-white
                dark:text-slate-950
                dark:hover:bg-indigo-400
              "
            >
              <X size={14} />
              Clear filters
            </button>
          </div>
        </Card>
      ) : (
        <>
          {/* ========================================================
              TECHNOLOGY GRID
          ======================================================== */}

          <div
            className="
              grid
              grid-cols-1
              gap-5
              sm:grid-cols-2
              xl:grid-cols-3
            "
          >
            {filteredTechnologies.map((technology, index) => (
              <TechnologyCard
                key={technology.id || `${technology.name}-${index}`}
                technology={technology}
              />
            ))}
          </div>

          {/* ========================================================
              RESULT FOOTER
          ======================================================== */}

          <div
            className="
              flex
              flex-col
              items-center
              justify-between
              gap-3
              rounded-2xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              text-xs
              text-slate-400
              shadow-sm
              shadow-slate-950/[0.02]
              sm:flex-row
              dark:border-slate-800
              dark:bg-slate-950
            "
          >
            <span>
              Showing{" "}
              <strong className="font-bold text-slate-700 dark:text-slate-200">
                {filteredTechnologies.length}
              </strong>{" "}
              of{" "}
              <strong className="font-bold text-slate-700 dark:text-slate-200">
                {technologies.length}
              </strong>{" "}
              technologies
            </span>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  font-semibold
                  text-indigo-600
                  transition-colors
                  hover:text-indigo-700
                  dark:text-indigo-400
                  dark:hover:text-indigo-300
                "
              >
                <X size={13} />
                Reset filters
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

/* ================================================================
   PAGE HEADER
================================================================ */

function PageHeader({
  total,
  categories,
  developers,
  projects,
}: {
  total: number;
  categories: number;
  developers: number;
  projects: number;
}) {
  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-3xl
        border
        border-slate-200/80
        bg-white
        shadow-sm
        shadow-slate-950/[0.03]
        dark:border-slate-800
        dark:bg-slate-950
      "
    >
      {/* Background glow */}
      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-32
          h-72
          w-72
          rounded-full
          bg-indigo-500/[0.09]
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-32
          -left-20
          h-64
          w-64
          rounded-full
          bg-violet-500/[0.07]
          blur-3xl
        "
      />

      <div
        className="
          relative
          flex
          flex-col
          gap-7
          p-6
          sm:p-8
          lg:flex-row
          lg:items-end
          lg:justify-between
        "
      >
        {/* Intro */}
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <div
              className="
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-indigo-50
                text-indigo-600
                dark:bg-indigo-500/10
                dark:text-indigo-400
              "
            >
              <Code2 size={17} strokeWidth={1.9} />
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
              Technology explorer
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
            Technologies
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
            Explore the technologies represented in the developer graph and
            discover the people and projects connected to each one.
          </p>
        </div>

        {/* Metrics */}
        <div
          className="
            grid
            grid-cols-2
            gap-3
            sm:grid-cols-4
            lg:shrink-0
          "
        >
          <HeaderMetric
            icon={<Code2 size={15} />}
            label="Technologies"
            value={total}
          />

          <HeaderMetric
            icon={<Layers3 size={15} />}
            label="Categories"
            value={categories}
          />

          <HeaderMetric
            icon={<Users size={15} />}
            label="Developers"
            value={developers}
          />

          <HeaderMetric
            icon={<FolderKanban size={15} />}
            label="Projects"
            value={projects}
          />
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   TECHNOLOGY CARD
================================================================ */

function TechnologyCard({ technology }: { technology: Technology }) {
  const developerCount = normalizeCount(technology.developerCount);

  const projectCount = normalizeCount(technology.projectCount);

  const category = technology.category?.trim() || "Other";

  const technologyUrl = `/technologies/${encodeURIComponent(technology.id)}`;

  return (
    <Link
      to={technologyUrl}
      className="
        group
        relative
        flex
        min-h-[245px]
        flex-col
        overflow-hidden
        rounded-3xl
        border
        border-slate-200/80
        bg-white
        p-5
        shadow-sm
        shadow-slate-950/[0.03]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-indigo-200
        hover:shadow-xl
        hover:shadow-indigo-950/[0.08]
        dark:border-slate-800
        dark:bg-slate-950
        dark:hover:border-indigo-500/30
        dark:hover:shadow-indigo-950/20
        sm:p-6
      "
    >
      {/* Decorative glow */}
      <div
        className="
          pointer-events-none
          absolute
          -right-16
          -top-16
          h-32
          w-32
          rounded-full
          bg-indigo-500/[0.07]
          blur-3xl
          transition-all
          duration-500
          group-hover:bg-indigo-500/[0.14]
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-20
          -left-20
          h-40
          w-40
          rounded-full
          bg-violet-500/[0.04]
          blur-3xl
          transition-all
          duration-500
          group-hover:bg-violet-500/[0.08]
        "
      />

      <div className="relative flex flex-1 flex-col">
        {/* Top */}
        <div className="flex items-start justify-between gap-4">
          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-indigo-50
              to-violet-100
              text-indigo-600
              shadow-sm
              ring-1
              ring-indigo-100/80
              transition-transform
              duration-300
              group-hover:scale-105
              dark:from-indigo-500/10
              dark:to-violet-500/10
              dark:text-indigo-400
              dark:ring-indigo-500/10
            "
          >
            <Code2 size={21} />
          </div>

          <div
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              text-slate-400
              shadow-sm
              transition-all
              duration-200
              group-hover:-translate-y-0.5
              group-hover:border-indigo-200
              group-hover:bg-indigo-50
              group-hover:text-indigo-600
              dark:border-slate-800
              dark:bg-slate-900
              dark:text-slate-500
              dark:group-hover:border-indigo-500/30
              dark:group-hover:bg-indigo-500/10
              dark:group-hover:text-indigo-400
            "
          >
            <ArrowUpRight
              size={16}
              className="
                transition-transform
                duration-200
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </div>
        </div>

        {/* Name / category */}
        <div className="mt-5">
          <Badge tone="blue">{category}</Badge>

          <h2
            className="
              mt-3
              truncate
              text-lg
              font-bold
              tracking-tight
              text-slate-950
              dark:text-white
            "
            title={technology.name}
          >
            {technology.name}
          </h2>

          <p
            className="
              mt-1
              text-xs
              leading-5
              text-slate-400
            "
          >
            Technology in the DevGraph ecosystem
          </p>
        </div>

        {/* Metrics */}
        <div
          className="
            mt-auto
            grid
            grid-cols-2
            gap-2
            border-t
            border-slate-200
            pt-5
            dark:border-slate-800
          "
        >
          <div className="flex min-w-0 items-center gap-2">
            <div
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-slate-100
                text-slate-500
                dark:bg-slate-900
                dark:text-slate-400
              "
            >
              <Users size={14} />
            </div>

            <div className="min-w-0">
              <p
                className="
                  truncate
                  text-sm
                  font-bold
                  text-slate-900
                  dark:text-white
                "
              >
                {developerCount}
              </p>

              <p
                className="
                  truncate
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-slate-400
                "
              >
                Developers
              </p>
            </div>
          </div>

          <div className="flex min-w-0 items-center gap-2">
            <div
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-slate-100
                text-slate-500
                dark:bg-slate-900
                dark:text-slate-400
              "
            >
              <FolderKanban size={14} />
            </div>

            <div className="min-w-0">
              <p
                className="
                  truncate
                  text-sm
                  font-bold
                  text-slate-900
                  dark:text-white
                "
              >
                {projectCount}
              </p>

              <p
                className="
                  truncate
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-slate-400
                "
              >
                Projects
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="
            mt-4
            flex
            items-center
            justify-between
            text-xs
            font-bold
            text-slate-500
            transition-colors
            group-hover:text-indigo-600
            dark:text-slate-400
            dark:group-hover:text-indigo-400
          "
        >
          <span>Explore technology</span>

          <ArrowUpRight
            size={14}
            className="
              transition-transform
              duration-200
              group-hover:translate-x-0.5
              group-hover:-translate-y-0.5
            "
          />
        </div>
      </div>
    </Link>
  );
}

/* ================================================================
   CATEGORY BUTTON
================================================================ */

function CategoryButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        inline-flex
        items-center
        justify-center
        rounded-xl
        border
        px-3
        py-1.5
        text-xs
        font-semibold
        transition-all
        duration-200
        ${
          active
            ? `
              border-indigo-200
              bg-indigo-50
              text-indigo-700
              shadow-sm
              dark:border-indigo-500/30
              dark:bg-indigo-500/10
              dark:text-indigo-300
            `
            : `
              border-slate-200
              bg-white
              text-slate-500
              hover:border-slate-300
              hover:bg-slate-50
              hover:text-slate-700
              dark:border-slate-800
              dark:bg-slate-900
              dark:text-slate-400
              dark:hover:border-slate-700
              dark:hover:bg-slate-800
              dark:hover:text-slate-200
            `
        }
      `}
    >
      {children}
    </button>
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
        min-w-0
        items-center
        gap-2.5
        rounded-2xl
        border
        border-slate-200
        bg-slate-50/70
        px-3
        py-2.5
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
          dark:text-indigo-400
        "
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p
          className="
            truncate
            text-sm
            font-bold
            text-slate-900
            dark:text-white
          "
        >
          {value}
        </p>

        <p
          className="
            truncate
            text-[9px]
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

/* ================================================================
   HELPERS
================================================================ */

function normalizeCount(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);

    return Number.isFinite(parsed) ? parsed : 0;
  }

  if (typeof value === "object" && value !== null && "low" in value) {
    const low = Number((value as { low?: unknown }).low);

    return Number.isFinite(low) ? low : 0;
  }

  return 0;
}

export default TechnologiesPage;