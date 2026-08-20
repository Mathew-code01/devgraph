// client/src/components/layout/AppShell.tsx

import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar.js";
import Header from "./Header.js";
import MobileNav from "./MobileNav.js";

function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar />

      <div className="app-main">
        <Header onMenuClick={() => setMobileOpen(true)} />

        <main className="app-content">
          <Outlet />
        </main>
      </div>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </div>
  );
}

export default AppShell;