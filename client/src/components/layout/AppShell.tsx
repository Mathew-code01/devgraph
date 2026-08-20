import { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import MobileNav from "./MobileNav";
import Sidebar from "./Sidebar";
import PageLoader from "../common/PageLoader";

function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const openMobileNavigation = useCallback(() => {
    setMobileOpen(true);
  }, []);

  const closeMobileNavigation = useCallback(() => {
    setMobileOpen(false);
  }, []);

  return (
    <div
      className="
        min-h-screen
        overflow-x-hidden
        bg-slate-50
        text-slate-950
        antialiased

        dark:bg-slate-950
        dark:text-white
      "
    >
      {/* ============================================================
          PAGE LOADER

          Appears automatically whenever React Router changes route.

          It is fixed to the viewport and sits above the entire
          application because of its high z-index.
      ============================================================ */}

      <PageLoader />

      {/* ============================================================
          DESKTOP SIDEBAR

          Fixed to the viewport.
          It never participates in page scrolling.
      ============================================================ */}

      <Sidebar />

      {/* ============================================================
          APPLICATION AREA

          The left margin reserves the fixed sidebar width.
      ============================================================ */}

      <div
        className="
          min-h-screen
          min-w-0

          lg:ml-[260px]
        "
      >
        {/* ==========================================================
            HEADER
        ========================================================== */}

        <Header onMenuClick={openMobileNavigation} />

        {/* ==========================================================
            SCROLLING CONTENT
        ========================================================== */}

        <main
          className="
            min-w-0
            px-4
            pb-6
            pt-[92px]

            sm:px-6
            sm:pb-8
            sm:pt-[96px]

            md:px-7

            lg:px-8
            lg:pb-10
            lg:pt-[104px]

            max-[480px]:px-3
            max-[480px]:pb-5
            max-[480px]:pt-[84px]
          "
        >
          <div
            className="
              mx-auto
              w-full
              max-w-[1600px]
            "
          >
            <Outlet />
          </div>
        </main>
      </div>

      {/* ============================================================
          MOBILE NAVIGATION
      ============================================================ */}

      <MobileNav open={mobileOpen} onClose={closeMobileNavigation} />
    </div>
  );
}

export default AppShell;
