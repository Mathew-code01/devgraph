import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: number;
  description: string;
  icon: LucideIcon;
  tone?: "indigo" | "blue" | "violet" | "emerald" | "slate";
}

const toneStyles = {
  indigo: {
    icon: "border-indigo-100 bg-indigo-50 text-indigo-600 dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400",
    glow: "group-hover:border-indigo-200 dark:group-hover:border-indigo-500/30",
  },

  blue: {
    icon: "border-blue-100 bg-blue-50 text-blue-600 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400",
    glow: "group-hover:border-blue-200 dark:group-hover:border-blue-500/30",
  },

  violet: {
    icon: "border-violet-100 bg-violet-50 text-violet-600 dark:border-violet-500/20 dark:bg-violet-500/10 dark:text-violet-400",
    glow: "group-hover:border-violet-200 dark:group-hover:border-violet-500/30",
  },

  emerald: {
    icon: "border-emerald-100 bg-emerald-50 text-emerald-600 dark:border-emerald-500/20 dark:bg-emerald-500/10 dark:text-emerald-400",
    glow: "group-hover:border-emerald-200 dark:group-hover:border-emerald-500/30",
  },

  slate: {
    icon: "border-slate-200 bg-slate-100 text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300",
    glow: "group-hover:border-slate-300 dark:group-hover:border-slate-700",
  },
} as const;

function StatCard({
  label,
  value,
  description,
  icon: Icon,
  tone = "indigo",
}: StatCardProps) {
  const styles = toneStyles[tone];

  return (
    <article
      className={`group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/40 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-950 dark:shadow-none ${styles.glow}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-xl border ${styles.icon}`}
        >
          <Icon size={18} strokeWidth={1.8} />
        </span>
      </div>

      <div className="mt-5">
        <span className="block text-xs font-semibold uppercase tracking-[0.12em] text-slate-400 dark:text-slate-500">
          {label}
        </span>

        <strong className="mt-1 block text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">
          {value.toLocaleString()}
        </strong>

        <span className="mt-2 block text-xs leading-5 text-slate-500 dark:text-slate-400">
          {description}
        </span>
      </div>
    </article>
  );
}

export default StatCard;
