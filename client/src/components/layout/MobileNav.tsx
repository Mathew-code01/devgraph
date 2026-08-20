import { useEffect, useRef } from "react";
import { X } from "lucide-react";

import { SidebarContent } from "./Sidebar";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

function MobileNav({ open, onClose }: MobileNavProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      id="mobile-navigation"
      className="
        fixed
        inset-0
        z-[100]
        lg:hidden
      "
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      {/* ============================================================
          BACKDROP
      ============================================================ */}

      <button
        type="button"
        onClick={onClose}
        aria-label="Close navigation"
        className="
          absolute
          inset-0
          h-full
          w-full
          cursor-default
          bg-slate-950/50
          backdrop-blur-[2px]
          focus:outline-none
        "
      />

      {/* ============================================================
          DRAWER
      ============================================================ */}

      <aside
        className="
          relative
          flex
          h-full
          w-[min(86vw,300px)]
          flex-col
          overflow-hidden
          border-r
          border-slate-200/80
          bg-white
          shadow-2xl
          shadow-slate-950/20

          dark:border-slate-800
          dark:bg-slate-950

          max-[480px]:w-[min(88vw,280px)]
        "
      >
        {/* ========================================================
            DRAWER HEADER
        ======================================================== */}

        <div
          className="
            flex
            h-[72px]
            shrink-0
            items-center
            justify-between
            border-b
            border-slate-200/80
            px-4

            dark:border-slate-800/80

            max-[480px]:h-16
            max-[480px]:px-3
          "
        >
          <div className="min-w-0">
            <div
              className="
                text-[10px]
                font-bold
                uppercase
                tracking-[0.16em]
                text-indigo-600

                dark:text-indigo-400

                max-[480px]:text-[9px]
              "
            >
              DevGraph
            </div>

            <div
              className="
                mt-0.5
                text-xs
                font-medium
                text-slate-500

                dark:text-slate-400

                max-[480px]:text-[11px]
              "
            >
              Navigation
            </div>
          </div>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="
              inline-flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              text-slate-500
              shadow-sm
              transition-all
              duration-200

              hover:border-slate-300
              hover:bg-slate-50
              hover:text-slate-900

              focus:outline-none
              focus-visible:ring-4
              focus-visible:ring-indigo-500/10

              active:scale-95

              dark:border-slate-800
              dark:bg-slate-900
              dark:text-slate-400

              dark:hover:border-slate-700
              dark:hover:bg-slate-800
              dark:hover:text-white

              max-[480px]:h-8
              max-[480px]:w-8
              max-[480px]:rounded-lg
            "
          >
            <X
              size={18}
              strokeWidth={2}
              className="
                max-[480px]:h-4
                max-[480px]:w-4
              "
            />
          </button>
        </div>

        {/* ========================================================
            SCROLLABLE NAVIGATION
        ======================================================== */}

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
          <SidebarContent onNavigate={onClose} />
        </div>
      </aside>
    </div>
  );
}

export default MobileNav;
