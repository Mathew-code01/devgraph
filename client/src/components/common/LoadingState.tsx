// client/src/components/common/LoadingState.tsx

import { LoaderCircle } from "lucide-react";

interface LoadingStateProps {
  message?: string;
  compact?: boolean;
}

function LoadingState({
  message = "Loading graph data...",
  compact = false,
}: LoadingStateProps) {
  if (compact) {
    return (
      <div
        className="
          flex w-full items-center justify-center
          gap-3 px-4 py-8
          text-sm text-slate-500
          dark:text-slate-400
        "
        role="status"
        aria-live="polite"
      >
        <LoaderCircle size={18} className="animate-spin text-indigo-500" />

        <span>{message}</span>
      </div>
    );
  }

  return (
    <div
      className="
        flex min-h-56 w-full flex-col
        items-center justify-center
        rounded-2xl border border-slate-200/80
        bg-white/80 px-6 py-10 text-center
        shadow-sm shadow-slate-950/[0.03]
        backdrop-blur-sm
        dark:border-slate-800
        dark:bg-slate-900/70
      "
      role="status"
      aria-live="polite"
    >
      <div
        className="
          mb-4 flex h-11 w-11 items-center justify-center
          rounded-xl border border-indigo-100
          bg-indigo-50 text-indigo-600
          dark:border-indigo-900/60
          dark:bg-indigo-950/40
          dark:text-indigo-400
        "
      >
        <LoaderCircle size={21} className="animate-spin" />
      </div>

      <div>
        <h4
          className="
            text-sm font-semibold
            text-slate-900
            dark:text-white
          "
        >
          {message}
        </h4>

        <p
          className="
            mt-1.5 text-sm
            text-slate-500
            dark:text-slate-400
          "
        >
          Please wait while the latest data is loaded.
        </p>
      </div>
    </div>
  );
}

export default LoadingState;