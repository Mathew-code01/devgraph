// client/src/components/common/EmptyState.tsx

import { SearchX } from "lucide-react";

interface EmptyStateProps {
  title: string;
  message: string;
}

function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <div
      className="
        flex min-h-48 w-full flex-col items-center justify-center
        rounded-2xl border border-slate-200/80
        bg-white/80 px-6 py-10 text-center
        shadow-sm shadow-slate-950/[0.03]
        backdrop-blur-sm
        dark:border-slate-800
        dark:bg-slate-900/70
      "
    >
      <div
        className="
          mb-4 flex h-11 w-11 items-center justify-center
          rounded-xl border border-slate-200
          bg-slate-50 text-slate-500
          dark:border-slate-700
          dark:bg-slate-800
          dark:text-slate-400
        "
      >
        <SearchX size={20} strokeWidth={1.8} />
      </div>

      <div className="max-w-md">
        <h4
          className="
            text-sm font-semibold tracking-tight
            text-slate-900
            dark:text-white
          "
        >
          {title}
        </h4>

        <p
          className="
            mt-1.5 text-sm leading-6
            text-slate-500
            dark:text-slate-400
          "
        >
          {message}
        </p>
      </div>
    </div>
  );
}

export default EmptyState;