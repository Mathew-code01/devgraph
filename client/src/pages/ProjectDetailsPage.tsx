import { ArrowLeft, FolderKanban } from "lucide-react";

import { Link, useParams } from "react-router-dom";

import { useProject } from "../hooks/useProjects";

import ProjectDetails from "../components/projects/ProjectDetails";

import LoadingState from "../components/common/LoadingState";
import ErrorState from "../components/common/ErrorState";
import EmptyState from "../components/common/EmptyState";

function ProjectDetailsPage() {
  const { id } = useParams<{
    id: string;
  }>();

  const { data, isLoading, isError, error, refetch } = useProject(id);

  const project = data?.data;

  return (
    <div className="space-y-5">
      {/* BACK NAVIGATION */}
      <div>
        <Link
          to="/projects"
          className="
            inline-flex items-center
            gap-2 rounded-xl
            px-2 py-1.5
            text-sm font-semibold
            text-slate-500
            transition-colors
            hover:text-indigo-600
            dark:text-slate-400
            dark:hover:text-indigo-400
          "
        >
          <ArrowLeft size={16} />
          Back to projects
        </Link>
      </div>

      {isLoading ? (
        <LoadingState message="Loading project..." />
      ) : isError ? (
        <ErrorState
          title="Unable to load project"
          message={error?.message || "The project could not be loaded."}
          onRetry={() => {
            void refetch();
          }}
        />
      ) : !project ? (
        <EmptyState
          title="Project not found"
          message="The project you are looking for does not exist or is no longer available."
        />
      ) : (
        <>
          {/* Small page context */}
          <div className="flex items-center gap-2 px-1">
            <div
              className="
                flex h-8 w-8
                items-center justify-center
                rounded-lg
                bg-indigo-50
                text-indigo-600
                dark:bg-indigo-500/10
                dark:text-indigo-400
              "
            >
              <FolderKanban size={15} />
            </div>

            <span
              className="
                text-xs font-bold
                uppercase tracking-[0.14em]
                text-slate-400
              "
            >
              Project details
            </span>
          </div>

          <ProjectDetails project={project} />
        </>
      )}
    </div>
  );
}

export default ProjectDetailsPage;
