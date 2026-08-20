// client/src/components/projects/ProjectDetails.tsx

import {
  ArrowUpRight,
  Building2,
  Code2,
  ExternalLink,
  FolderKanban,
  Globe2,
  GitBranch,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";

import type { Project } from "../../types/project";

import Badge from "../ui/Badge";
import Card from "../ui/Card";

interface ProjectDetailsProps {
  project: Project;
}

function normalizeStatus(status?: string | null) {
  if (!status) {
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
  const normalized = status?.toLowerCase();

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

function getInitials(name?: string) {
  if (!name?.trim()) {
    return "P";
  }

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function getItemKey(
  id: unknown,
  name: unknown,
  index: number,
  prefix: string,
) {
  const normalizedId =
    typeof id === "string" || typeof id === "number"
      ? String(id).trim()
      : "";

  const normalizedName =
    typeof name === "string"
      ? name.trim().toLowerCase().replace(/\s+/g, "-")
      : "";

  return (
    normalizedId ||
    `${prefix}-${normalizedName || "item"}-${index}`
  );
}

function ProjectDetails({ project }: ProjectDetailsProps) {
  const technologies = Array.isArray(project.technologies)
    ? project.technologies.filter(Boolean)
    : [];

  const developers = Array.isArray(project.developers)
    ? project.developers.filter(Boolean)
    : [];

  const domains = Array.isArray(project.domains)
    ? project.domains.filter(Boolean)
    : [];

  const companies = Array.isArray(project.companies)
    ? project.companies.filter(Boolean)
    : [];

  const status = normalizeStatus(project.status);

  /*
   * Normalize the project ID at runtime.
   *
   * The TypeScript type says `id` is a string, but API data can
   * still contain null, undefined or an empty value.
   */
  const projectId = String(project.id ?? "").trim();

  /*
   * Always provide a graph route.
   *
   * If we have an ID, open the project-specific graph.
   * If the ID is unavailable, open the general graph explorer
   * instead of hiding the CTA completely.
   */
  const graphUrl = projectId
    ? `/graph?project=${encodeURIComponent(projectId)}`
    : "/graph";

  return (
    <div className="space-y-5">
      {/* ============================================================
          HERO
      ============================================================ */}

      <Card className="relative overflow-hidden">
        <div
          className="
            pointer-events-none absolute inset-0
            bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.14),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.08),transparent_35%)]
          "
        />

        <div className="relative p-5 sm:p-7 lg:p-8">
          <div className="flex flex-col gap-7">
            <div
              className="
                flex flex-col gap-6
                sm:flex-row
                sm:items-start
                sm:justify-between
              "
            >
              <div className="flex min-w-0 gap-4 sm:gap-5">
                <div
                  className="
                    flex h-20 w-20
                    shrink-0 items-center
                    justify-center
                    rounded-3xl
                    border border-indigo-100
                    bg-gradient-to-br
                    from-indigo-50
                    to-violet-100
                    text-xl font-bold
                    text-indigo-600
                    shadow-lg
                    shadow-indigo-500/10
                    dark:border-indigo-500/20
                    dark:from-indigo-500/10
                    dark:to-violet-500/10
                    dark:text-indigo-400
                  "
                >
                  {getInitials(project.name)}
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge
                      tone={getStatusTone(project.status)}
                      size="md"
                    >
                      <span
                        className="
                          mr-1.5 h-1.5 w-1.5
                          rounded-full bg-current
                        "
                      />

                      {status}
                    </Badge>

                    <Badge tone="default" size="md">
                      <FolderKanban
                        size={12}
                        className="mr-1.5"
                      />
                      Project
                    </Badge>
                  </div>

                  <h1
                    className="
                      mt-4 break-words
                      text-2xl font-bold
                      tracking-tight
                      text-slate-950
                      dark:text-white
                      sm:text-3xl
                      lg:text-4xl
                    "
                  >
                    {project.name}
                  </h1>

                  <p
                    className="
                      mt-3 max-w-3xl
                      text-sm leading-7
                      text-slate-600
                      dark:text-slate-400
                    "
                  >
                    {project.description ||
                      "A project represented within the DevGraph knowledge graph."}
                  </p>
                </div>
              </div>

              {/* Hero actions */}
              <div
                className="
                  flex shrink-0
                  flex-wrap gap-2
                "
              >
                {project.url?.trim() && (
                  <a
                    href={project.url.trim()}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      inline-flex h-11
                      items-center justify-center
                      gap-2 rounded-xl
                      border border-slate-200
                      bg-white px-4
                      text-sm font-semibold
                      text-slate-700
                      shadow-sm
                      transition-all duration-200
                      hover:-translate-y-0.5
                      hover:border-indigo-200
                      hover:text-indigo-600
                      hover:shadow-md
                      dark:border-slate-700
                      dark:bg-slate-900
                      dark:text-slate-200
                      dark:hover:border-indigo-500/30
                      dark:hover:text-indigo-400
                    "
                  >
                    <ExternalLink size={15} />
                    Open project
                  </a>
                )}

                {/* GRAPH BUTTON */}
                <Link
                  to={graphUrl}
                  className="
                    inline-flex h-11
                    items-center justify-center
                    gap-2 rounded-xl
                    bg-slate-950 px-4
                    text-sm font-semibold
                    text-white
                    shadow-sm
                    transition-all duration-200
                    hover:-translate-y-0.5
                    hover:bg-indigo-600
                    hover:shadow-lg
                    hover:shadow-indigo-600/20
                    dark:bg-white
                    dark:text-slate-950
                    dark:hover:bg-indigo-400
                  "
                >
                  <GitBranch size={15} />
                  Open graph explorer
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            </div>

            {/* Metrics */}
            <div
              className="
                grid grid-cols-2
                gap-3
                border-t border-slate-200
                pt-6
                dark:border-slate-800
                sm:grid-cols-4
              "
            >
              <Metric
                icon={<Code2 size={15} />}
                label="Technologies"
                value={technologies.length}
              />

              <Metric
                icon={<Users size={15} />}
                label="Developers"
                value={developers.length}
              />

              <Metric
                icon={<Globe2 size={15} />}
                label="Domains"
                value={domains.length}
              />

              <Metric
                icon={<Building2 size={15} />}
                label="Companies"
                value={companies.length}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* ============================================================
          CONTENT + SIDEBAR
      ============================================================ */}

      <div
        className="
          grid
          grid-cols-1
          gap-5
          lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]
          lg:items-start
        "
      >
        {/* ========================================================
            LEFT
        ======================================================== */}

        <div className="min-w-0 space-y-5">
          {/* Technologies */}
          <Card>
            <SectionHeader
              icon={<Code2 size={16} />}
              title="Technologies"
              description="Technologies used by this project."
            />

            <div className="p-5 pt-0 sm:p-6 sm:pt-0">
              {technologies.length > 0 ? (
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {technologies.map((technology, index) => (
                    <Link
                      key={getItemKey(
                        technology.id,
                        technology.name,
                        index,
                        "technology",
                      )}
                      to={`/technologies/${encodeURIComponent(
                        String(technology.id),
                      )}`}
                      className="
                        group flex items-center
                        gap-3 rounded-2xl
                        border border-slate-200
                        bg-slate-50/70
                        px-4 py-3
                        transition-all duration-200
                        hover:-translate-y-0.5
                        hover:border-indigo-200
                        hover:bg-indigo-50/40
                        dark:border-slate-800
                        dark:bg-slate-900/60
                        dark:hover:border-indigo-500/30
                        dark:hover:bg-indigo-500/[0.05]
                      "
                    >
                      <div
                        className="
                          flex h-9 w-9
                          shrink-0 items-center
                          justify-center
                          rounded-xl
                          bg-indigo-50
                          text-indigo-600
                          dark:bg-indigo-500/10
                          dark:text-indigo-400
                        "
                      >
                        <Code2 size={15} />
                      </div>

                      <span
                        className="
                          min-w-0 flex-1 truncate
                          text-sm font-semibold
                          text-slate-700
                          dark:text-slate-200
                        "
                      >
                        {technology.name}
                      </span>

                      <ArrowUpRight
                        size={14}
                        className="
                          shrink-0
                          text-slate-300
                          transition-colors
                          group-hover:text-indigo-500
                        "
                      />
                    </Link>
                  ))}
                </div>
              ) : (
                <InlineEmpty message="No technologies have been recorded for this project." />
              )}
            </div>
          </Card>

          {/* Developers */}
          <Card>
            <SectionHeader
              icon={<Users size={16} />}
              title="Developers"
              description="Developers connected to this project."
            />

            <div className="p-5 pt-0 sm:p-6 sm:pt-0">
              {developers.length > 0 ? (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {developers.map((developer, index) => (
                    <Link
                      key={getItemKey(
                        developer.id,
                        developer.name,
                        index,
                        "developer",
                      )}
                      to={`/developers/${encodeURIComponent(
                        String(developer.id),
                      )}`}
                      className="
                        group flex items-center
                        gap-3 rounded-2xl
                        border border-slate-200
                        bg-slate-50/60
                        p-3.5
                        transition-all duration-200
                        hover:-translate-y-0.5
                        hover:border-indigo-200
                        hover:bg-indigo-50/30
                        dark:border-slate-800
                        dark:bg-slate-900/60
                        dark:hover:border-indigo-500/30
                        dark:hover:bg-indigo-500/[0.04]
                      "
                    >
                      <div
                        className="
                          flex h-10 w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-gradient-to-br
                          from-indigo-500
                          to-violet-600
                          text-xs font-bold
                          text-white
                        "
                      >
                        {getInitials(developer.name)}
                      </div>

                      <div className="min-w-0 flex-1">
                        <p
                          className="
                            truncate text-sm
                            font-bold
                            text-slate-800
                            dark:text-slate-100
                          "
                        >
                          {developer.name}
                        </p>

                        <p
                          className="
                            mt-0.5 truncate
                            text-xs
                            text-slate-400
                          "
                        >
                          {developer.title ||
                            "Software Developer"}
                        </p>
                      </div>

                      <ArrowUpRight
                        size={14}
                        className="
                          shrink-0 text-slate-300
                          transition-colors
                          group-hover:text-indigo-500
                        "
                      />
                    </Link>
                  ))}
                </div>
              ) : (
                <InlineEmpty message="No developers have been associated with this project." />
              )}
            </div>
          </Card>

          {/* Domains */}
          <Card>
            <SectionHeader
              icon={<Globe2 size={16} />}
              title="Domains"
              description="Business or technical domains associated with this project."
            />

            <div className="p-5 pt-0 sm:p-6 sm:pt-0">
              {domains.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {domains.map((domain, index) => (
                    <Badge
                      key={getItemKey(
                        domain.id,
                        domain.name,
                        index,
                        "domain",
                      )}
                      tone="blue"
                      size="md"
                    >
                      <Globe2
                        size={12}
                        className="mr-1.5"
                      />
                      {domain.name}
                    </Badge>
                  ))}
                </div>
              ) : (
                <InlineEmpty message="No domains have been recorded for this project." />
              )}
            </div>
          </Card>
        </div>

        {/* ========================================================
            RIGHT SIDEBAR
        ======================================================== */}

        <aside className="min-w-0 space-y-5 lg:sticky lg:top-6">
          {/* Project information */}
          <Card>
            <SectionHeader
              icon={<FolderKanban size={16} />}
              title="Project information"
              description="Core project metadata."
            />

            <div className="space-y-5 p-5 pt-0 sm:p-6 sm:pt-0">
              <InfoRow
                icon={<FolderKanban size={15} />}
                label="Project"
                value={project.name}
              />

              <InfoRow
                icon={<GitBranch size={15} />}
                label="Status"
                value={status}
              />

              <InfoRow
                icon={<Code2 size={15} />}
                label="Technologies"
                value={`${technologies.length} connected`}
              />

              <InfoRow
                icon={<Users size={15} />}
                label="Developers"
                value={`${developers.length} connected`}
              />

              {project.url?.trim() && (
                <div>
                  <p
                    className="
                      text-[10px] font-bold
                      uppercase tracking-[0.12em]
                      text-slate-400
                    "
                  >
                    Project URL
                  </p>

                  <a
                    href={project.url.trim()}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      mt-2 flex items-center
                      gap-2 text-sm font-semibold
                      text-indigo-600
                      hover:text-indigo-700
                      dark:text-indigo-400
                    "
                  >
                    <ExternalLink size={14} />

                    <span className="min-w-0 truncate">
                      {project.url}
                    </span>
                  </a>
                </div>
              )}
            </div>
          </Card>

          {/* Companies */}
          <Card>
            <SectionHeader
              icon={<Building2 size={16} />}
              title="Companies"
              description="Organizations connected to this project."
            />

            <div className="p-5 pt-0 sm:p-6 sm:pt-0">
              {companies.length > 0 ? (
                <div className="space-y-2">
                  {companies.map((company, index) => (
                    <Link
                      key={getItemKey(
                        company.id,
                        company.name,
                        index,
                        "company",
                      )}
                      to={`/companies/${encodeURIComponent(
                        String(company.id),
                      )}`}
                      className="
                        group flex items-center
                        gap-3 rounded-2xl
                        border border-slate-200
                        bg-slate-50/60
                        p-3
                        transition-all duration-200
                        hover:border-indigo-200
                        hover:bg-indigo-50/30
                        dark:border-slate-800
                        dark:bg-slate-900/60
                        dark:hover:border-indigo-500/30
                        dark:hover:bg-indigo-500/[0.04]
                      "
                    >
                      <div
                        className="
                          flex h-9 w-9
                          shrink-0
                          items-center
                          justify-center
                          rounded-xl
                          bg-white
                          text-slate-500
                          shadow-sm
                          dark:bg-slate-800
                          dark:text-slate-400
                        "
                      >
                        <Building2 size={15} />
                      </div>

                      <span
                        className="
                          min-w-0 flex-1 truncate
                          text-sm font-semibold
                          text-slate-700
                          dark:text-slate-200
                        "
                      >
                        {company.name}
                      </span>

                      <ArrowUpRight
                        size={14}
                        className="
                          shrink-0
                          text-slate-300
                          group-hover:text-indigo-500
                        "
                      />
                    </Link>
                  ))}
                </div>
              ) : (
                <InlineEmpty message="No companies have been associated with this project." />
              )}
            </div>
          </Card>

          {/* ======================================================
              GRAPH CTA
          ====================================================== */}

          <div
            className="
              group relative
              overflow-hidden
              rounded-3xl
              border border-indigo-200/70
              bg-gradient-to-br
              from-indigo-50
              via-white
              to-violet-50
              shadow-sm
              shadow-indigo-950/[0.04]
              dark:border-indigo-500/20
              dark:from-indigo-950/40
              dark:via-slate-950
              dark:to-violet-950/30
            "
          >
            {/* Glow */}
            <div
              className="
                pointer-events-none
                absolute
                -right-12
                -top-12
                h-32
                w-32
                rounded-full
                bg-indigo-400/20
                blur-3xl
              "
            />

            <div
              className="
                pointer-events-none
                absolute
                -bottom-16
                -left-12
                h-28
                w-28
                rounded-full
                bg-violet-400/10
                blur-3xl
              "
            />

            <div className="relative p-5 sm:p-6">
              {/* Icon */}
              <div
                className="
                  flex h-11 w-11
                  items-center justify-center
                  rounded-2xl
                  bg-indigo-600
                  text-white
                  shadow-lg
                  shadow-indigo-600/20
                  transition-transform
                  duration-300
                  group-hover:scale-105
                "
              >
                <GitBranch size={19} />
              </div>

              <div className="mt-4">
                <p
                  className="
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-[0.14em]
                    text-indigo-600
                    dark:text-indigo-400
                  "
                >
                  Knowledge graph
                </p>

                <h3
                  className="
                    mt-2
                    text-base
                    font-bold
                    text-slate-950
                    dark:text-white
                  "
                >
                  Explore project connections
                </h3>

                <p
                  className="
                    mt-2
                    text-sm
                    leading-6
                    text-slate-600
                    dark:text-slate-400
                  "
                >
                  Visualize how this project connects to
                  developers, technologies, companies and
                  domains.
                </p>
              </div>

              {/* Graph button */}
              <Link
                to={graphUrl}
                className="
                  mt-5
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-slate-950
                  px-4
                  py-3
                  text-sm
                  font-bold
                  text-white
                  shadow-sm
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-indigo-600
                  hover:shadow-lg
                  hover:shadow-indigo-600/20
                  dark:bg-white
                  dark:text-slate-950
                  dark:hover:bg-indigo-400
                "
              >
                <GitBranch size={15} />
                Open graph explorer
                <ArrowUpRight
                  size={15}
                  className="
                    transition-transform
                    duration-200
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                />
              </Link>

              {projectId && (
                <p
                  className="
                    mt-3
                    text-center
                    text-[10px]
                    text-slate-400
                  "
                >
                  Showing connections for this project
                </p>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

/* ================================================================
   METRIC
================================================================ */

function Metric({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="
          flex h-9 w-9 shrink-0
          items-center justify-center
          rounded-xl
          bg-slate-100
          text-slate-500
          dark:bg-slate-900
          dark:text-slate-400
        "
      >
        {icon}
      </div>

      <div>
        <p
          className="
            text-lg font-bold
            text-slate-950
            dark:text-white
          "
        >
          {value}
        </p>

        <p
          className="
            text-[10px] font-bold
            uppercase tracking-[0.12em]
            text-slate-400
          "
        >
          {label}
        </p>
      </div>
    </div>
  );
}

/* ================================================================
   SECTION HEADER
================================================================ */

function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <div
          className="
            flex h-9 w-9 shrink-0
            items-center justify-center
            rounded-xl
            bg-indigo-50
            text-indigo-600
            dark:bg-indigo-500/10
            dark:text-indigo-400
          "
        >
          {icon}
        </div>

        <div className="min-w-0">
          <h2
            className="
              text-sm font-bold
              text-slate-950
              dark:text-white
            "
          >
            {title}
          </h2>

          <p
            className="
              mt-1 text-xs leading-5
              text-slate-400
            "
          >
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   INFO ROW
================================================================ */

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-slate-400">
        {icon}
      </div>

      <div className="min-w-0">
        <p
          className="
            text-[10px] font-bold
            uppercase tracking-[0.12em]
            text-slate-400
          "
        >
          {label}
        </p>

        <p
          className="
            mt-1 break-words
            text-sm font-semibold
            text-slate-700
            dark:text-slate-200
          "
        >
          {value}
        </p>
      </div>
    </div>
  );
}

/* ================================================================
   EMPTY
================================================================ */

function InlineEmpty({ message }: { message: string }) {
  return (
    <div
      className="
        rounded-2xl
        border border-dashed
        border-slate-200
        bg-slate-50/60
        px-4 py-6
        text-center text-xs
        text-slate-400
        dark:border-slate-800
        dark:bg-slate-900/50
      "
    >
      {message}
    </div>
  );
}

export default ProjectDetails;