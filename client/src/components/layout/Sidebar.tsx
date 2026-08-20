// client/src/components/layout/Sidebar.tsx

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
import { NavLink } from "react-router-dom";

const navigation = [
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

function SidebarContent() {
  return (
    <>
      <div className="brand">
        <div className="brand-mark">
          <GitBranch size={21} />
        </div>

        <div>
          <div className="brand-name">DevGraph</div>
          <div className="brand-subtitle">CognoDB Explorer</div>
        </div>
      </div>

      <div className="sidebar-body">
        {navigation.map((section) => (
          <div className="nav-section" key={section.label}>
            <div className="nav-section-label">{section.label}</div>

            <nav>
              {section.items.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `nav-item ${isActive ? "active" : ""}`
                    }
                  >
                    <Icon size={18} strokeWidth={1.8} />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="powered-card">
          <Sparkles size={16} />

          <div>
            <strong>Graph powered</strong>
            <span>by CognoDB</span>
          </div>
        </div>
      </div>
    </>
  );
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <SidebarContent />
    </aside>
  );
}

export default Sidebar;