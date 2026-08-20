// client/src/components/common/ErrorState.tsx

import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

function ErrorState({
  title = "Unable to load data",
  message = "The server could not complete this request.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      className="
        flex w-full flex-col items-center justify-center
        rounded-2xl border border-red-200/80
        bg-red-50/70 px-6 py-10 text-center
        shadow-sm shadow-red-950/[0.03]
        backdrop-blur-sm
        dark:border-red-950/70
        dark:bg-red-950/20
      "
      role="alert"
    >
      <div
        className="
          mb-4 flex h-11 w-11 items-center justify-center
          rounded-xl border border-red-200
          bg-white text-red-500
          shadow-sm
          dark:border-red-900
          dark:bg-red-950/40
          dark:text-red-400
        "
      >
        <AlertTriangle size={20} strokeWidth={1.8} />
      </div>

      <div className="max-w-lg">
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
            text-slate-600
            dark:text-slate-400
          "
        >
          {message}
        </p>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="
              mt-5 inline-flex items-center justify-center gap-2
              rounded-xl border border-slate-200
              bg-white px-4 py-2.5
              text-sm font-medium text-slate-700
              shadow-sm
              transition-all duration-200
              hover:-translate-y-0.5
              hover:border-slate-300
              hover:bg-slate-50
              hover:shadow-md
              focus:outline-none
              focus:ring-2
              focus:ring-indigo-500/30
              disabled:pointer-events-none
              disabled:opacity-50
              dark:border-slate-700
              dark:bg-slate-900
              dark:text-slate-200
              dark:hover:border-slate-600
              dark:hover:bg-slate-800
            "
          >
            <RefreshCw size={15} />
            Try again
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorState;