import {
  Maximize2,
  Minus,
  Plus,
  RotateCcw,
  SlidersHorizontal,
} from "lucide-react";

interface GraphControlsProps {
  depth: number;
  setDepth: (depth: number) => void;
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onReset: () => void;
  nodeTypes: string[];
}

function formatNodeType(type: string) {
  return type
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getTypeColor(type: string) {
  const normalized = type.toLowerCase();

  if (normalized.includes("developer")) {
    return "bg-indigo-500";
  }

  if (normalized.includes("technology")) {
    return "bg-blue-500";
  }

  if (normalized.includes("project")) {
    return "bg-violet-500";
  }

  if (normalized.includes("company")) {
    return "bg-emerald-500";
  }

  return "bg-slate-400";
}

function GraphControls({
  depth,
  setDepth,
  zoom,
  onZoomIn,
  onZoomOut,
  onReset,
  nodeTypes,
}: GraphControlsProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
      <div className="flex flex-col gap-5 p-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Traversal */}
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">
              <SlidersHorizontal size={15} />
            </div>

            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                Traversal depth
              </p>

              <p className="text-[10px] text-slate-400">
                Expand connected entities
              </p>
            </div>
          </div>

          <div className="flex w-fit items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-900">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setDepth(value)}
                className={[
                  "h-8 min-w-8 rounded-lg px-2.5 text-xs font-bold transition-all",
                  depth === value
                    ? "bg-slate-950 text-white shadow-sm dark:bg-white dark:text-slate-950"
                    : "text-slate-500 hover:bg-white hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white",
                ].join(" ")}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        {/* Entity legend */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 lg:justify-center">
            {nodeTypes.map((type) => (
              <span
                key={type}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-[10px] font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${getTypeColor(type)}`}
                />

                {formatNodeType(type)}
              </span>
            ))}
          </div>
        </div>

        {/* Zoom */}
        <div className="flex items-center justify-between gap-3 lg:justify-end">
          <span className="min-w-[42px] text-center text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
            {Math.round(zoom * 100)}%
          </span>

          <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1 dark:border-slate-800 dark:bg-slate-900">
            <button
              type="button"
              onClick={onZoomOut}
              disabled={zoom <= 0.5}
              aria-label="Zoom out"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-all hover:bg-white hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-30 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <Minus size={15} />
            </button>

            <button
              type="button"
              onClick={onReset}
              aria-label="Reset zoom"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-all hover:bg-white hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <RotateCcw size={14} />
            </button>

            <button
              type="button"
              onClick={onZoomIn}
              disabled={zoom >= 2}
              aria-label="Zoom in"
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-all hover:bg-white hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-30 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <Plus size={15} />
            </button>

            <button
              type="button"
              onClick={onReset}
              aria-label="Fit graph"
              className="hidden h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition-all hover:bg-white hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white sm:flex"
            >
              <Maximize2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GraphControls;
