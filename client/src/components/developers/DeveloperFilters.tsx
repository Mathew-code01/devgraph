import {
  ArrowDownAZ,
  ArrowUpAZ,
  Filter,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

interface DeveloperFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  sort: "name-asc" | "name-desc";
  onSortChange: (value: "name-asc" | "name-desc") => void;
  total?: number;
}

function DeveloperFilters({
  search,
  onSearchChange,
  sort,
  onSortChange,
  total = 0,
}: DeveloperFiltersProps) {
  const clearSearch = () => {
    onSearchChange("");
  };

  return (
    <div
      className="
        rounded-3xl border border-slate-200/80
        bg-white p-3
        shadow-sm shadow-slate-950/[0.03]
        dark:border-slate-800
        dark:bg-slate-950
      "
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* Search */}
        <div className="relative min-w-0 flex-1">
          <Search
            size={17}
            className="
              pointer-events-none
              absolute left-4 top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search developers, roles, or locations..."
            className="
              h-12 w-full rounded-2xl
              border border-slate-200
              bg-slate-50
              pl-11 pr-11
              text-sm font-medium
              text-slate-900
              outline-none
              placeholder:text-slate-400
              transition-all
              focus:border-indigo-400
              focus:bg-white
              focus:ring-4
              focus:ring-indigo-500/10
              dark:border-slate-800
              dark:bg-slate-900
              dark:text-white
              dark:placeholder:text-slate-500
              dark:focus:border-indigo-500/50
              dark:focus:bg-slate-900
            "
          />

          {search && (
            <button
              type="button"
              onClick={clearSearch}
              aria-label="Clear search"
              className="
                absolute right-3 top-1/2
                flex h-7 w-7
                -translate-y-1/2
                items-center justify-center
                rounded-lg
                text-slate-400
                transition-colors
                hover:bg-slate-200
                hover:text-slate-700
                dark:hover:bg-slate-800
                dark:hover:text-slate-200
              "
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Filter indicator */}
        <div
          className="
            hidden items-center gap-2
            rounded-2xl border
            border-slate-200
            bg-slate-50
            px-4 py-3
            text-xs font-semibold
            text-slate-500
            dark:border-slate-800
            dark:bg-slate-900
            dark:text-slate-400
            sm:flex
          "
        >
          <Filter size={15} />

          <span>{total.toLocaleString()} developers</span>
        </div>

        {/* Sort */}
        <div className="relative">
          <SlidersHorizontal
            size={15}
            className="
              pointer-events-none
              absolute left-3.5 top-1/2
              -translate-y-1/2
              text-slate-400
            "
          />

          <select
            value={sort}
            onChange={(event) =>
              onSortChange(event.target.value as "name-asc" | "name-desc")
            }
            className="
              h-12 w-full min-w-[180px]
              appearance-none
              rounded-2xl
              border border-slate-200
              bg-slate-50
              pl-10 pr-9
              text-sm font-semibold
              text-slate-700
              outline-none
              transition-all
              focus:border-indigo-400
              focus:ring-4
              focus:ring-indigo-500/10
              dark:border-slate-800
              dark:bg-slate-900
              dark:text-slate-200
              dark:focus:border-indigo-500/50
            "
          >
            <option value="name-asc">Name A–Z</option>

            <option value="name-desc">Name Z–A</option>
          </select>

          {sort === "name-asc" ? (
            <ArrowDownAZ
              size={14}
              className="
                pointer-events-none
                absolute right-3.5 top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />
          ) : (
            <ArrowUpAZ
              size={14}
              className="
                pointer-events-none
                absolute right-3.5 top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default DeveloperFilters;
