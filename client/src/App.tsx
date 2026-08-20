/**
 * DevGraph — Application Router
 */

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import AppShell from "./components/layout/AppShell";

import DashboardPage from "./pages/DashboardPage";
import DevelopersPage from "./pages/DevelopersPage";
import DeveloperDetailsPage from "./pages/DeveloperDetailsPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";
import TechnologiesPage from "./pages/TechnologiesPage";
import GraphExplorerPage from "./pages/GraphExplorerPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          {/* ========================================================
              DEFAULT ROUTE
          ======================================================== */}

          <Route index element={<Navigate to="/dashboard" replace />} />

          {/* ========================================================
              DASHBOARD
          ======================================================== */}

          <Route path="/dashboard" element={<DashboardPage />} />

          {/* ========================================================
              DEVELOPERS
          ======================================================== */}

          <Route path="/developers" element={<DevelopersPage />} />

          <Route path="/developers/:id" element={<DeveloperDetailsPage />} />

          {/* ========================================================
              PROJECTS
          ======================================================== */}

          <Route path="/projects" element={<ProjectsPage />} />

          <Route path="/projects/:id" element={<ProjectDetailsPage />} />

          {/* ========================================================
              TECHNOLOGIES
          ======================================================== */}

          <Route path="/technologies" element={<TechnologiesPage />} />

          {/* ========================================================
              GRAPH
          ======================================================== */}

          <Route path="/graph" element={<GraphExplorerPage />} />

          {/* ========================================================
              404
          ======================================================== */}

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
