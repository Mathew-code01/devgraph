// client/src/components/layout/Header.tsx

import { Menu, Search } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface HeaderProps {
  onMenuClick: () => void;
}

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/developers": "Developers",
  "/projects": "Projects",
  "/technologies": "Technologies",
  "/skills": "Skills",
  "/graph": "Graph Explorer",
};

function Header({ onMenuClick }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const title =
    titles[location.pathname] ??
    (location.pathname.startsWith("/developers/")
      ? "Developer"
      : location.pathname.startsWith("/projects/")
        ? "Project"
        : "DevGraph");

  return (
    <header className="app-header">
      <div className="header-left">
        <button
          type="button"
          className="mobile-menu-button"
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          <Menu size={20} />
        </button>

        <div>
          <div className="header-eyebrow">Workspace</div>
          <h1>{title}</h1>
        </div>
      </div>

      <div className="header-actions">
        <button
          type="button"
          className="header-search"
          onClick={() => navigate("/developers")}
        >
          <Search size={17} />
          <span>Search developers</span>
          <kbd>⌘ K</kbd>
        </button>

        <div className="connection-status">
          <span className="connection-dot" />
          <span>Connected</span>
        </div>
      </div>
    </header>
  );
}

export default Header;