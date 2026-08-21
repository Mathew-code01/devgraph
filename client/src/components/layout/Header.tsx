import { Menu, Search, Wifi } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface HeaderProps {
  onMenuClick: () => void;
}

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/developers": "Developers",
  "/projects": "Projects",
  "/technologies": "Technologies",
 
  "/graph": "Graph Explorer",
};

function getPageTitle(pathname: string): string {
  const exactTitle = titles[pathname];

  if (exactTitle) {
    return exactTitle;
  }

  if (pathname.startsWith("/developers/")) {
    return "Developer";
  }

  if (pathname.startsWith("/projects/")) {
    return "Project";
  }

  if (pathname.startsWith("/technologies/")) {
    return "Technology";
  }

  

  return "DevGraph";
}

function Header({ onMenuClick }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const title = getPageTitle(location.pathname);

  return (
    <header
      className="
        fixed
        inset-x-0
        top-0
        z-50
        flex
        h-[72px]
        items-center
        justify-between
        border-b
        border-slate-200/80
        bg-white/95
        px-4
        shadow-[0_1px_0_rgba(15,23,42,0.02)]
        backdrop-blur-xl

        supports-[backdrop-filter]:bg-white/80

        sm:px-6

        lg:left-[260px]
        lg:px-8

        dark:border-slate-800/80
        dark:bg-slate-950/95
        dark:supports-[backdrop-filter]:bg-slate-950/80

        max-[480px]:h-16
        max-[480px]:px-3
      "
    >
      {/* ============================================================
          LEFT SIDE
      ============================================================ */}

      <div
        className="
          flex
          min-w-0
          items-center
          gap-3

          max-[480px]:gap-2.5
        "
      >
        {/* ==========================================================
            MOBILE MENU
        ========================================================== */}

        <button
          type="button"
          onClick={onMenuClick}
          aria-label="Open navigation"
          aria-controls="mobile-navigation"
          className="
            inline-flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
            text-slate-600
            shadow-sm
            transition-all
            duration-200

            hover:border-indigo-200
            hover:bg-indigo-50
            hover:text-indigo-600

            focus:outline-none
            focus-visible:ring-4
            focus-visible:ring-indigo-500/10

            active:scale-95

            lg:hidden

            dark:border-slate-800
            dark:bg-slate-900
            dark:text-slate-300

            dark:hover:border-indigo-500/30
            dark:hover:bg-indigo-500/10
            dark:hover:text-indigo-400

            max-[480px]:h-9
            max-[480px]:w-9
            max-[480px]:rounded-lg
          "
        >
          <Menu
            size={19}
            strokeWidth={2}
            className="
              max-[480px]:h-[18px]
              max-[480px]:w-[18px]
            "
          />
        </button>

        {/* ==========================================================
            PAGE TITLE
        ========================================================== */}

        <div className="min-w-0">
          <div
            className="
              hidden
              text-[10px]
              font-bold
              uppercase
              tracking-[0.16em]
              text-indigo-600

              sm:block

              dark:text-indigo-400
            "
          >
            Workspace
          </div>

          <h1
            className="
              truncate
              text-base
              font-bold
              tracking-tight
              text-slate-950

              sm:text-lg

              dark:text-white

              max-[480px]:text-[15px]
            "
          >
            {title}
          </h1>
        </div>
      </div>

      {/* ============================================================
          RIGHT SIDE
      ============================================================ */}

      <div
        className="
          flex
          shrink-0
          items-center
          gap-2

          sm:gap-3

          max-[480px]:gap-1.5
        "
      >
        {/* ==========================================================
            SEARCH
        ========================================================== */}

        <button
          type="button"
          onClick={() => navigate("/developers")}
          aria-label="Search developers"
          className="
            group
            inline-flex
            h-10
            items-center
            gap-2
            rounded-xl
            border
            border-slate-200
            bg-slate-50
            px-3
            text-slate-500
            shadow-sm
            transition-all
            duration-200

            hover:border-indigo-200
            hover:bg-white
            hover:text-indigo-600
            hover:shadow-md

            focus:outline-none
            focus-visible:ring-4
            focus-visible:ring-indigo-500/10

            active:scale-[0.98]

            dark:border-slate-800
            dark:bg-slate-900
            dark:text-slate-400

            dark:hover:border-indigo-500/30
            dark:hover:bg-slate-900
            dark:hover:text-indigo-400

            max-[480px]:h-9
            max-[480px]:w-9
            max-[480px]:justify-center
            max-[480px]:rounded-lg
            max-[480px]:px-0
          "
        >
          <Search
            size={16}
            strokeWidth={2}
            className="
              shrink-0
              transition-transform
              duration-200
              group-hover:scale-105

              max-[480px]:h-[15px]
              max-[480px]:w-[15px]
            "
          />

          <span
            className="
              hidden
              text-xs
              font-semibold

              sm:inline
            "
          >
            Search developers
          </span>

          <kbd
            className="
              hidden
              rounded-md
              border
              border-slate-200
              bg-white
              px-1.5
              py-0.5
              font-mono
              text-[10px]
              font-semibold
              text-slate-400

              sm:inline

              dark:border-slate-700
              dark:bg-slate-800
              dark:text-slate-500
            "
          >
            ⌘ K
          </kbd>
        </button>

        {/* ==========================================================
            CONNECTION STATUS
        ========================================================== */}

        <div
          className="
            hidden
            h-10
            items-center
            gap-2
            rounded-xl
            border
            border-emerald-200/80
            bg-emerald-50/80
            px-3
            text-xs
            font-semibold
            text-emerald-700

            sm:flex

            dark:border-emerald-500/20
            dark:bg-emerald-500/10
            dark:text-emerald-400
          "
          title="Application connected"
        >
          <span className="relative flex h-2 w-2 shrink-0">
            <span
              aria-hidden="true"
              className="
                absolute
                inline-flex
                h-full
                w-full
                animate-ping
                rounded-full
                bg-emerald-400
                opacity-50
              "
            />

            <span
              aria-hidden="true"
              className="
                relative
                inline-flex
                h-2
                w-2
                rounded-full
                bg-emerald-500
              "
            />
          </span>

          <Wifi size={13} strokeWidth={2} className="shrink-0" />

          <span>Connected</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
