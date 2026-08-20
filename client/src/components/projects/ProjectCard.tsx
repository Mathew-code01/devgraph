import {
  ArrowUpRight,
  Building2,
  Code2,
  ExternalLink,
  FolderKanban,
  Globe2,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";

import type { Project } from "../../types/project";

import Badge from "../ui/Badge";

interface ProjectCardProps {
  project: Project;
}

function getProjectInitials(name?: string) {
  if (!name?.trim()) {
    return "P";
  }

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function normalizeStatus(status?: string | null) {
  if (!status?.trim()) {
    return "Active";
  }

  return status
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

function getStatusTone(
  status?: string | null,
): "default" | "success" | "warning" | "danger" | "blue" {
  const normalized = status?.trim().toLowerCase();

  if (
    normalized === "active" ||
    normalized === "completed" ||
    normalized === "complete" ||
    normalized === "production" ||
    normalized === "live"
  ) {
    return "success";
  }

  if (
    normalized === "paused" ||
    normalized === "pending" ||
    normalized === "in progress" ||
    normalized === "development"
  ) {
    return "warning";
  }

  if (
    normalized === "archived" ||
    normalized === "cancelled" ||
    normalized === "canceled"
  ) {
    return "danger";
  }

  return "blue";
}

function ProjectCard({ project }: ProjectCardProps) {
  const technologies = Array.isArray(project.technologies)
    ? project.technologies.filter((item) => item && typeof item === "object")
    : [];

  const developers = Array.isArray(project.developers)
    ? project.developers.filter((item) => item && typeof item === "object")
    : [];

  const domains = Array.isArray(project.domains)
    ? project.domains.filter((item) => item && typeof item === "object")
    : [];

  const companies = Array.isArray(project.companies)
    ? project.companies.filter((item) => item && typeof item === "object")
    : [];

  const status = normalizeStatus(project.status);

  /*
   * Project.id can be:
   * string | null | undefined
   *
   * Normalize it once so everything below receives
   * either a valid string or undefined.
   */
  const projectId =
    typeof project.id === "string" && project.id.trim()
      ? project.id.trim()
      : undefined;

  const projectName = project.name?.trim() || "Unnamed project";

  const projectUrl = projectId
    ? `/projects/${encodeURIComponent(projectId)}`
    : null;

  return (
    <article
      className="
        group relative flex h-full flex-col
        overflow-hidden
        rounded-3xl
        border border-slate-200/80
        bg-white
        shadow-sm
        shadow-slate-950/[0.04]
        transition-all duration-300
        hover:-translate-y-1
        hover:border-indigo-200
        hover:shadow-xl
        hover:shadow-indigo-950/[0.08]
        dark:border-slate-800
        dark:bg-slate-950
        dark:hover:border-indigo-500/30
        dark:hover:shadow-indigo-950/20
      "
    >
      {/* Background glow */}
      <div
        className="
          pointer-events-none absolute
          -right-24
          -top-24
          h-48
          w-48
          rounded-full
          bg-indigo-500/[0.07]
          blur-3xl
          transition-all
          duration-500
          group-hover:bg-indigo-500/[0.13]
        "
      />

      <div
        className="
          pointer-events-none absolute
          -bottom-24
          -left-24
          h-40
          w-40
          rounded-full
          bg-violet-500/[0.04]
          blur-3xl
          transition-all
          duration-500
          group-hover:bg-violet-500/[0.09]
        "
      />

      <div
        className="
          relative flex flex-1
          flex-col p-5 sm:p-6
        "
      >
        {/* Header */}
        <div
          className="
            flex items-start
            justify-between gap-4
          "
        >
          <div
            className="
              flex min-w-0
              items-center gap-3.5
            "
          >
            {/* Project icon */}
            <div
              className="
                flex h-14 w-14
                shrink-0
                items-center
                justify-center
                rounded-2xl
                border
                border-indigo-100
                bg-gradient-to-br
                from-indigo-50
                to-violet-100
                text-sm
                font-bold
                text-indigo-600
                shadow-sm
                shadow-indigo-500/10
                dark:border-indigo-500/20
                dark:from-indigo-500/10
                dark:to-violet-500/10
                dark:text-indigo-400
              "
            >
              {getProjectInitials(project.name)}
            </div>

            {/* Name */}
            <div className="min-w-0">
              <h3
                className="
                  truncate
                  text-base
                  font-bold
                  tracking-tight
                  text-slate-950
                  dark:text-white
                "
                title={projectName}
              >
                {projectName}
              </h3>

              <div
                className="
                  mt-1 flex
                  items-center gap-1.5
                "
              >
                <FolderKanban
                  size={12}
                  className="
                    shrink-0
                    text-slate-400
                  "
                />

                <span
                  className="
                    truncate
                    text-xs
                    font-medium
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Project
                </span>
              </div>
            </div>
          </div>

          {/* Details shortcut */}
          {projectUrl && (
            <Link
              to={projectUrl}
              aria-label={`View ${projectName}`}
              className="
                flex h-9 w-9
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-slate-200
                bg-white
                text-slate-500
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-indigo-200
                hover:bg-indigo-50
                hover:text-indigo-600
                dark:border-slate-800
                dark:bg-slate-900
                dark:text-slate-400
                dark:hover:border-indigo-500/30
                dark:hover:bg-indigo-500/10
                dark:hover:text-indigo-400
              "
            >
              <ArrowUpRight
                size={16}
                className="
                  transition-transform
                  duration-200
                  group-hover:translate-x-0.5
                  group-hover:-translate-y-0.5
                "
              />
            </Link>
          )}
        </div>

        {/* Status */}
        <div className="mt-5">
          <Badge tone={getStatusTone(project.status)}>
            <span
              className="
                mr-1.5
                h-1.5
                w-1.5
                rounded-full
                bg-current
              "
            />

            {status}
          </Badge>
        </div>

        {/* Description */}
        <p
          className="
            mt-4
            line-clamp-3
            min-h-[4.5rem]
            text-sm
            leading-6
            text-slate-600
            dark:text-slate-400
          "
        >
          {project.description ||
            "A project connected to developers, technologies, companies, and domains within the DevGraph ecosystem."}
        </p>

        {/* Statistics */}
        <div
          className="
            mt-5
            grid
            grid-cols-3
            divide-x
            divide-slate-200
            overflow-hidden
            rounded-2xl
            border
            border-slate-200
            bg-slate-50/70
            dark:divide-slate-800
            dark:border-slate-800
            dark:bg-slate-900/60
          "
        >
          <ProjectStat
            icon={<Code2 size={14} />}
            value={technologies.length}
            label="Tech"
          />

          <ProjectStat
            icon={<Users size={14} />}
            value={developers.length}
            label="Devs"
          />

          <ProjectStat
            icon={<Building2 size={14} />}
            value={companies.length}
            label="Companies"
          />
        </div>

        {/* Technologies */}
        {technologies.length > 0 && (
          <div className="mt-5">
            <div className="flex flex-wrap gap-1.5">
              {technologies.slice(0, 4).map((technology, index) => (
                <Badge key={technology.id || `technology-${index}`} tone="blue">
                  {technology.name}
                </Badge>
              ))}

              {technologies.length > 4 && (
                <Badge>+{technologies.length - 4}</Badge>
              )}
            </div>
          </div>
        )}

        {/* Domains */}
        {domains.length > 0 && (
          <div
            className="
              mt-4
              flex items-center
              gap-1.5
            "
          >
            <Globe2
              size={13}
              className="
                shrink-0
                text-slate-400
              "
            />

            <span
              className="
                truncate
                text-xs
                font-medium
                text-slate-500
                dark:text-slate-400
              "
            >
              {domains
                .slice(0, 2)
                .map((domain) => domain.name)
                .join(" • ")}

              {domains.length > 2 && ` +${domains.length - 2}`}
            </span>
          </div>
        )}

        {/* External project URL */}
        {project.url?.trim() && (
          <a
            href={project.url.trim()}
            target="_blank"
            rel="noreferrer"
            className="
              mt-4
              flex items-center
              gap-1.5
              truncate
              text-xs
              font-semibold
              text-indigo-600
              hover:text-indigo-700
              dark:text-indigo-400
              dark:hover:text-indigo-300
            "
          >
            <ExternalLink size={13} />

            <span className="truncate">Visit project</span>
          </a>
        )}

        {/* CTA */}
        {projectUrl ? (
          <Link
            to={projectUrl}
            className="
              mt-6
              flex
              items-center
              justify-between
              border-t
              border-slate-200
              pt-4
              text-xs
              font-bold
              text-slate-600
              transition-colors
              hover:text-indigo-600
              dark:border-slate-800
              dark:text-slate-400
              dark:hover:text-indigo-400
            "
          >
            <span>View project details</span>

            <ArrowUpRight size={14} />
          </Link>
        ) : (
          <div
            className="
              mt-6
              flex
              items-center
              justify-between
              border-t
              border-slate-200
              pt-4
              text-xs
              font-bold
              text-slate-400
              dark:border-slate-800
            "
          >
            <span>Project details unavailable</span>
          </div>
        )}
      </div>
    </article>
  );
}

function ProjectStat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: number;
  label: string;
}) {
  return (
    <div className="px-3 py-3 text-center">
      <div
        className="
          flex justify-center
          text-indigo-500
          dark:text-indigo-400
        "
      >
        {icon}
      </div>

      <p
        className="
          mt-1
          text-sm
          font-bold
          text-slate-900
          dark:text-white
        "
      >
        {value}
      </p>

      <p
        className="
          text-[10px]
          font-medium
          uppercase
          tracking-wider
          text-slate-400
        "
      >
        {label}
      </p>
    </div>
  );
}

export default ProjectCard;
