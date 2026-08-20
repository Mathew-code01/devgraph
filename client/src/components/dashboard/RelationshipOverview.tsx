// client/src/components/dashboard/RelationshipOverview.tsx

import { GitBranch, Network } from "lucide-react";

interface RelationshipOverviewProps {
  relationships: Array<{
    type: string;
    count: number;
  }>;
}

function RelationshipOverview({ relationships }: RelationshipOverviewProps) {
  const total = relationships.reduce((sum, item) => sum + item.count, 0);

  const sorted = [...relationships]
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50 dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400">
            Graph connectivity
          </span>

          <h3 className="mt-1 text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
            Relationship overview
          </h3>

          <p className="mt-1 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400">
            How entities are connected across the developer graph.
          </p>
        </div>

        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">
          <Network size={17} />
        </span>
      </div>

      {!sorted.length ? (
        <div className="flex min-h-32 flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-slate-200 bg-slate-50/70 text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-400">
          <GitBranch size={20} />
          <span>No relationships indexed yet.</span>
        </div>
      ) : (
        <div className="space-y-5">
          {sorted.map((relationship) => {
            const percentage =
              total > 0 ? Math.round((relationship.count / total) * 100) : 0;

            return (
              <div key={relationship.type} className="group">
                <div className="mb-2 flex items-center justify-between gap-4">
                  <span className="truncate text-sm font-medium text-slate-700 dark:text-slate-300">
                    {relationship.type}
                  </span>

                  <strong className="shrink-0 text-sm font-semibold text-slate-950 dark:text-white">
                    {relationship.count.toLocaleString()}
                  </strong>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                  <span
                    className="block h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-700"
                    style={{
                      width: `${percentage}%`,
                    }}
                  />
                </div>

                <p className="mt-1.5 text-[11px] font-medium text-slate-400 dark:text-slate-500">
                  {percentage}% of all relationships
                </p>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default RelationshipOverview;