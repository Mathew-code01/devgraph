// client/src/App.tsx

/**
 * DevGraph — Application Router
 */

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import AppShell from "./components/layout/AppShell.js";

import DashboardPage from "./pages/DashboardPage.js";
import DevelopersPage from "./pages/DevelopersPage.js";
import DeveloperDetailsPage from "./pages/DeveloperDetailsPage.js";
import ProjectsPage from "./pages/ProjectsPage.js";
import ProjectDetailsPage from "./pages/ProjectDetailsPage.js";
import TechnologiesPage from "./pages/TechnologiesPage.js";
import SkillsPage from "./pages/SkillsPage.js";
import GraphExplorerPage from "./pages/GraphExplorerPage.js";
import NotFoundPage from "./pages/NotFoundPage.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Navigate to="/dashboard" replace />} />

          <Route path="/dashboard" element={<DashboardPage />} />

          <Route path="/developers" element={<DevelopersPage />} />

          <Route
            path="/developers/:id"
            element={<DeveloperDetailsPage />}
          />

          <Route path="/projects" element={<ProjectsPage />} />

          <Route
            path="/projects/:id"
            element={<ProjectDetailsPage />}
          />

          <Route
            path="/technologies"
            element={<TechnologiesPage />}
          />

          <Route path="/skills" element={<SkillsPage />} />

          <Route path="/graph" element={<GraphExplorerPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;