// client/src/components/dashboard/QuickActions.tsx

import { ArrowRight, Code2, FolderKanban, Network, Users } from "lucide-react";
import { Link } from "react-router-dom";

const actions = [
  {
    label: "Explore developers",
    description: "Find people and inspect their graph connections.",
    href: "/developers",
    icon: Users,
  },
  {
    label: "Browse projects",
    description: "Explore projects and their technology relationships.",
    href: "/projects",
    icon: FolderKanban,
  },
  {
    label: "Explore technologies",
    description: "Discover technologies and connected developers.",
    href: "/technologies",
    icon: Code2,
  },
  {
    label: "Open graph explorer",
    description: "Visualize relationships across your graph.",
    href: "/graph",
    icon: Network,
  },
];

function QuickActions() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/50 transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:shadow-none">
      <div className="mb-5">
        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-indigo-600 dark:text-indigo-400">
          Workspace
        </span>

        <h3 className="mt-1 text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
          Quick actions
        </h3>

        <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
          Jump directly into the areas you use most.
        </p>
      </div>

      <div className="space-y-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              to={action.href}
              key={action.href}
              className="group flex items-center gap-3 rounded-xl border border-transparent p-3 transition-all duration-200 hover:border-indigo-100 hover:bg-indigo-50/70 dark:hover:border-indigo-500/20 dark:hover:bg-indigo-500/10"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 transition-colors group-hover:border-indigo-200 group-hover:bg-indigo-100 group-hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:group-hover:border-indigo-500/30 dark:group-hover:bg-indigo-500/10 dark:group-hover:text-indigo-400">
                <Icon size={16} strokeWidth={1.8} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {action.label}
                </span>

                <span className="mt-0.5 block text-xs leading-5 text-slate-500 dark:text-slate-400">
                  {action.description}
                </span>
              </span>

              <ArrowRight
                size={15}
                className="shrink-0 text-slate-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-indigo-600 dark:text-slate-600 dark:group-hover:text-indigo-400"
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default QuickActions;