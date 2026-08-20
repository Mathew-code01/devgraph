import {
  BarChart3,
  BrainCircuit,
  Code2,
  FolderKanban,
  GitBranch,
  Layers3,
  Network,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router-dom";

interface NavigationItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

interface NavigationSection {
  label: string;
  items: NavigationItem[];
}

interface SidebarContentProps {
  onNavigate?: () => void;
}

const navigation: NavigationSection[] = [
  {
    label: "Overview",
    items: [
      {
        label: "Dashboard",
        path: "/dashboard",
        icon: BarChart3,
      },
      {
        label: "Graph Explorer",
        path: "/graph",
        icon: Network,
      },
    ],
  },
  {
    label: "Explore",
    items: [
      {
        label: "Developers",
        path: "/developers",
        icon: Code2,
      },
      {
        label: "Projects",
        path: "/projects",
        icon: FolderKanban,
      },
      {
        label: "Technologies",
        path: "/technologies",
        icon: Layers3,
      },
      {
        label: "Skills",
        path: "/skills",
        icon: BrainCircuit,
      },
    ],
  },
];

export function SidebarContent({ onNavigate }: SidebarContentProps) {
  return (
    <div className="flex min-h-full flex-col">
      {/* ============================================================
          BRAND
      ============================================================ */}

      <div
        className="
          shrink-0
          border-b
          border-slate-200/80
          px-5
          py-5

          dark:border-slate-800/80

          max-[480px]:px-4
          max-[480px]:py-4
        "
      >
        <NavLink
          to="/dashboard"
          onClick={onNavigate}
          aria-label="DevGraph dashboard"
          className="
            group
            flex
            min-w-0
            items-center
            gap-3
            rounded-2xl
            outline-none

            focus-visible:ring-4
            focus-visible:ring-indigo-500/10
          "
        >
          {/* Logo */}
          <div
            className="
              relative
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-xl
              bg-gradient-to-br
              from-indigo-600
              via-indigo-600
              to-violet-600
              text-white
              shadow-lg
              shadow-indigo-600/20
              transition-transform
              duration-300
              group-hover:scale-105

              max-[480px]:h-9
              max-[480px]:w-9
            "
          >
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -right-3
                -top-3
                h-8
                w-8
                rounded-full
                bg-white/20
                blur-lg
              "
            />

            <GitBranch
              size={21}
              strokeWidth={2.2}
              className="
                relative
                z-10

                max-[480px]:h-[19px]
                max-[480px]:w-[19px]
              "
            />
          </div>

          {/* Brand text */}
          <div className="min-w-0">
            <div
              className="
                truncate
                text-[15px]
                font-extrabold
                tracking-tight
                text-slate-950

                dark:text-white

                max-[480px]:text-sm
              "
            >
              DevGraph
            </div>

            <div
              className="
                mt-0.5
                truncate
                text-[10px]
                font-bold
                uppercase
                tracking-[0.12em]
                text-slate-400

                max-[480px]:text-[9px]
              "
            >
              CognoDB Explorer
            </div>
          </div>
        </NavLink>
      </div>

      {/* ============================================================
          NAVIGATION
      ============================================================ */}

      <div
        className="
          flex-1
          px-3
          py-5

          max-[480px]:px-2.5
          max-[480px]:py-4
        "
      >
        <div
          className="
            space-y-6

            max-[480px]:space-y-5
          "
        >
          {navigation.map((section) => (
            <section key={section.label}>
              <div
                className="
                  mb-2
                  px-3
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.14em]
                  text-slate-400

                  dark:text-slate-500

                  max-[480px]:mb-1.5
                  max-[480px]:px-2.5
                  max-[480px]:text-[9px]
                "
              >
                {section.label}
              </div>

              <nav
                aria-label={`${section.label} navigation`}
                className="space-y-1"
              >
                {section.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={onNavigate}
                      className={({ isActive }) => `
                        group
                        relative
                        flex
                        min-h-11
                        items-center
                        gap-3
                        rounded-xl
                        px-3
                        text-sm
                        font-semibold
                        outline-none
                        transition-all
                        duration-200

                        focus-visible:ring-4
                        focus-visible:ring-indigo-500/10

                        max-[480px]:min-h-10
                        max-[480px]:gap-2.5
                        max-[480px]:rounded-lg
                        max-[480px]:px-2.5
                        max-[480px]:text-[13px]

                        ${
                          isActive
                            ? `
                              bg-indigo-50
                              text-indigo-700
                              shadow-sm
                              dark:bg-indigo-500/10
                              dark:text-indigo-300
                            `
                            : `
                              text-slate-500
                              hover:bg-slate-100
                              hover:text-slate-900
                              dark:text-slate-400
                              dark:hover:bg-slate-900
                              dark:hover:text-slate-100
                            `
                        }
                      `}
                    >
                      {({ isActive }) => (
                        <>
                          {isActive && (
                            <span
                              aria-hidden="true"
                              className="
                                absolute
                                left-0
                                top-1/2
                                h-6
                                w-0.5
                                -translate-y-1/2
                                rounded-full
                                bg-indigo-600
                                dark:bg-indigo-400

                                max-[480px]:h-5
                              "
                            />
                          )}

                          <span
                            className={`
                              flex
                              h-8
                              w-8
                              shrink-0
                              items-center
                              justify-center
                              rounded-lg
                              transition-all
                              duration-200

                              max-[480px]:h-7
                              max-[480px]:w-7

                              ${
                                isActive
                                  ? `
                                    bg-white
                                    text-indigo-600
                                    shadow-sm
                                    dark:bg-indigo-500/10
                                    dark:text-indigo-400
                                  `
                                  : `
                                    text-slate-400
                                    group-hover:text-slate-700
                                    dark:text-slate-500
                                    dark:group-hover:text-slate-200
                                  `
                              }
                            `}
                          >
                            <Icon
                              size={17}
                              strokeWidth={isActive ? 2.1 : 1.8}
                              className="
                                max-[480px]:h-4
                                max-[480px]:w-4
                              "
                            />
                          </span>

                          <span className="min-w-0 flex-1 truncate">
                            {item.label}
                          </span>

                          {isActive && (
                            <span
                              aria-hidden="true"
                              className="
                                h-1.5
                                w-1.5
                                shrink-0
                                rounded-full
                                bg-indigo-500
                                dark:bg-indigo-400

                                max-[480px]:hidden
                              "
                            />
                          )}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </nav>
            </section>
          ))}
        </div>
      </div>

      {/* ============================================================
          FOOTER
      ============================================================ */}

      <div
        className="
          shrink-0
          border-t
          border-slate-200/80
          p-4

          dark:border-slate-800/80

          max-[480px]:p-3
        "
      >
        <div
          className="
            relative
            overflow-hidden
            rounded-2xl
            border
            border-indigo-100
            bg-gradient-to-br
            from-indigo-50
            via-white
            to-violet-50
            p-3.5

            dark:border-indigo-500/15
            dark:from-indigo-500/10
            dark:via-slate-900
            dark:to-violet-500/10

            max-[480px]:rounded-xl
            max-[480px]:p-3
          "
        >
          <div
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -right-8
              -top-8
              h-20
              w-20
              rounded-full
              bg-indigo-500/10
              blur-2xl
            "
          />

          <div
            className="
              relative
              flex
              items-start
              gap-3

              max-[480px]:gap-2.5
            "
          >
            <div
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-white
                text-indigo-600
                shadow-sm

                dark:bg-slate-800
                dark:text-indigo-400

                max-[480px]:h-7
                max-[480px]:w-7
              "
            >
              <Sparkles
                size={15}
                strokeWidth={2}
                className="
                  max-[480px]:h-3.5
                  max-[480px]:w-3.5
                "
              />
            </div>

            <div className="min-w-0">
              <strong
                className="
                  block
                  text-xs
                  font-bold
                  text-slate-900

                  dark:text-white

                  max-[480px]:text-[11px]
                "
              >
                Graph powered
              </strong>

              <span
                className="
                  mt-0.5
                  block
                  text-[10px]
                  font-medium
                  leading-4
                  text-slate-500

                  dark:text-slate-400

                  max-[480px]:text-[9px]
                "
              >
                by CognoDB
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Desktop sidebar.
 *
 * Fixed to the viewport.
 * The internal navigation can scroll independently if necessary.
 */
function Sidebar() {
  return (
    <aside
      aria-label="Primary navigation"
      className="
        fixed
        inset-y-0
        left-0
        z-40
        hidden
        w-[260px]
        flex-col
        overflow-hidden
        border-r
        border-slate-200/80
        bg-white

        lg:flex

        dark:border-slate-800/80
        dark:bg-slate-950
      "
    >
      <div
        className="
          min-h-0
          flex-1
          overflow-y-auto
          overscroll-contain
          [scrollbar-width:thin]
          [scrollbar-color:rgb(203_213_225)_transparent]
          dark:[scrollbar-color:rgb(51_65_85)_transparent]
        "
      >
        <SidebarContent />
      </div>
    </aside>
  );
}

export default Sidebar;
