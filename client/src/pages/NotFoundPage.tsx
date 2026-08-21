import { ArrowLeft, Compass, Home, Search, Network } from "lucide-react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <section className="flex min-h-[85vh] w-full items-center justify-center bg-slate-50 px-4 py-12 dark:bg-slate-950 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-lg text-center">
        {/* Subtle Background Glow Accent */}
        <div 
          className="pointer-events-none absolute -top-12 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-gradient-to-tr from-indigo-500/20 to-violet-500/20 blur-3xl dark:from-indigo-500/10 dark:to-violet-500/10" 
          aria-hidden="true"
        />

        {/* Floating Icon Header */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-100 bg-indigo-50/80 text-indigo-600 shadow-sm backdrop-blur-sm dark:border-indigo-500/20 dark:bg-indigo-500/10 dark:text-indigo-400">
          <Compass className="h-8 w-8 animate-pulse" />
        </div>

        {/* 404 Large Badge */}
        <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-widest text-slate-500 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          Error 404
        </div>

        {/* Main Heading & Description */}
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white sm:text-4xl">
          Page lost in the graph
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">
          The node or path you are looking for doesn't exist, has been removed, or has moved to another coordinate in the ecosystem.
        </p>

        {/* Primary Navigation Actions */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/dashboard"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-indigo-600 hover:shadow-lg hover:shadow-indigo-500/20 dark:bg-slate-900 dark:text-white dark:hover:bg-indigo-500 sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to dashboard
          </Link>

          <Link
            to="/graph"
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition-colors hover:border-slate-300 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 sm:w-auto"
          >
            <Network className="h-4 w-4 text-indigo-500" />
            Explore graph
          </Link>
        </div>

        {/* Quick Route Suggestions */}
        <div className="mt-10 border-t border-slate-200/80 pt-6 dark:border-slate-800/80">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Or try one of these standard routes
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <Link
              to="/developers"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 transition-colors hover:border-indigo-200 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/30 dark:hover:text-indigo-400"
            >
              <Search className="h-3 w-3" />
              Developers
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 transition-colors hover:border-indigo-200 hover:text-indigo-600 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/30 dark:hover:text-indigo-400"
            >
              <Home className="h-3 w-3" />
              Projects
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NotFoundPage;