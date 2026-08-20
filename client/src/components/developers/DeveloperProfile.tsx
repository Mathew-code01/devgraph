import type { ReactNode } from "react";

import {
  ArrowUpRight,
  BriefcaseBusiness,
  Building2,
  Code2,
  ExternalLink,
  FolderKanban,
  GitBranch,
  MapPin,
  Sparkles,
  UserRound,
} from "lucide-react";

import { Link } from "react-router-dom";

import type { Developer } from "../../types/developer";

import Badge from "../ui/Badge";
import Card from "../ui/Card";

interface DeveloperProfileProps {
  developer: Developer;
}

function getInitials(name?: string) {
  if (!name?.trim()) {
    return "?";
  }

  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function DeveloperProfile({ developer }: DeveloperProfileProps) {
  const skills = Array.isArray(developer.skills) ? developer.skills : [];

  const technologies = Array.isArray(developer.technologies)
    ? developer.technologies
    : [];

  const projects = Array.isArray(developer.projects) ? developer.projects : [];

  const companies = Array.isArray(developer.companies)
    ? developer.companies
    : [];

  const graphUrl = `/graph?developer=${encodeURIComponent(developer.id)}`;

  return (
    <div className="space-y-5">
      {/* =========================================================
          PROFILE HERO
      ========================================================== */}
      <Card className="relative overflow-hidden">
        {/* Background decoration */}
        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.13),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(139,92,246,0.08),transparent_35%)]
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-64
            w-64
            rounded-full
            bg-indigo-500/[0.05]
            blur-3xl
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            -bottom-32
            -left-20
            h-72
            w-72
            rounded-full
            bg-violet-500/[0.04]
            blur-3xl
          "
        />

        <div className="relative p-5 sm:p-7 lg:p-8">
          <div
            className="
              flex
              flex-col
              gap-6
              lg:flex-row
              lg:items-start
              lg:justify-between
            "
          >
            {/* Identity */}
            <div
              className="
                flex
                min-w-0
                flex-col
                gap-5
                sm:flex-row
              "
            >
              {/* Avatar */}
              <div className="shrink-0">
                {developer.avatar ? (
                  <img
                    src={developer.avatar}
                    alt={`${developer.name} avatar`}
                    className="
                      h-24
                      w-24
                      rounded-3xl
                      object-cover
                      ring-4
                      ring-white
                      shadow-xl
                      shadow-slate-950/10
                      dark:ring-slate-950
                    "
                  />
                ) : (
                  <div
                    className="
                      flex
                      h-24
                      w-24
                      items-center
                      justify-center
                      rounded-3xl
                      bg-gradient-to-br
                      from-indigo-500
                      via-violet-500
                      to-purple-600
                      text-2xl
                      font-bold
                      text-white
                      shadow-xl
                      shadow-indigo-500/20
                    "
                  >
                    {getInitials(developer.name)}
                  </div>
                )}
              </div>

              {/* Developer identity */}
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="success" size="md">
                    <span
                      className="
                        mr-1.5
                        h-1.5
                        w-1.5
                        rounded-full
                        bg-emerald-500
                      "
                    />
                    Developer
                  </Badge>

                  {developer.location && (
                    <Badge tone="default">
                      <MapPin size={11} className="mr-1 shrink-0" />

                      <span className="truncate">{developer.location}</span>
                    </Badge>
                  )}
                </div>

                <h1
                  className="
                    mt-4
                    break-words
                    text-2xl
                    font-bold
                    tracking-tight
                    text-slate-950
                    dark:text-white
                    sm:text-3xl
                    lg:text-4xl
                  "
                >
                  {developer.name}
                </h1>

                <p
                  className="
                    mt-2
                    text-sm
                    font-semibold
                    text-indigo-600
                    dark:text-indigo-400
                    sm:text-base
                  "
                >
                  {developer.title || "Software Developer"}
                </p>

                {developer.bio && (
                  <p
                    className="
                      mt-4
                      max-w-2xl
                      text-sm
                      leading-7
                      text-slate-600
                      dark:text-slate-400
                    "
                  >
                    {developer.bio}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <Link
                to={graphUrl}
                className="
                  inline-flex
                  h-11
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-slate-950
                  px-4
                  text-sm
                  font-semibold
                  text-white
                  shadow-sm
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:bg-indigo-600
                  hover:shadow-lg
                  focus:outline-none
                  focus:ring-2
                  focus:ring-indigo-500/30
                  dark:bg-white
                  dark:text-slate-950
                  dark:hover:bg-indigo-400
                "
              >
                <GitBranch size={15} />
                Explore graph
              </Link>
            </div>
          </div>

          {/* Metrics */}
          <div
            className="
              mt-7
              grid
              grid-cols-2
              gap-3
              border-t
              border-slate-200
              pt-6
              dark:border-slate-800
              sm:grid-cols-4
            "
          >
            <Metric
              icon={<Code2 size={15} />}
              label="Skills"
              value={skills.length}
            />

            <Metric
              icon={<Sparkles size={15} />}
              label="Technologies"
              value={technologies.length}
            />

            <Metric
              icon={<FolderKanban size={15} />}
              label="Projects"
              value={projects.length}
            />

            <Metric
              icon={<Building2 size={15} />}
              label="Companies"
              value={companies.length}
            />
          </div>
        </div>
      </Card>

      {/* =========================================================
          MAIN CONTENT
      ========================================================== */}
      <div
        className="
          grid
          grid-cols-1
          gap-5
          lg:grid-cols-3
        "
      >
        {/* =======================================================
            LEFT COLUMN
        ======================================================== */}
        <div
          className="
            space-y-5
            lg:col-span-2
          "
        >
          {/* Skills */}
          <Card>
            <SectionHeader
              icon={<Code2 size={16} />}
              title="Skills"
              description="Core capabilities associated with this developer."
            />

            <div
              className="
                p-5
                pt-0
                sm:p-6
                sm:pt-0
              "
            >
              {skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill.id} tone="blue" size="md">
                      {skill.name}
                    </Badge>
                  ))}
                </div>
              ) : (
                <InlineEmpty message="No skills have been recorded yet." />
              )}
            </div>
          </Card>

          {/* Technologies */}
          <Card>
            <SectionHeader
              icon={<Sparkles size={16} />}
              title="Technologies"
              description="Technologies connected to this developer."
            />

            <div
              className="
                p-5
                pt-0
                sm:p-6
                sm:pt-0
              "
            >
              {technologies.length > 0 ? (
                <div
                  className="
                    grid
                    grid-cols-1
                    gap-2
                    sm:grid-cols-2
                  "
                >
                  {technologies.map((technology) => (
                    <div
                      key={technology.id}
                      className="
                          flex
                          min-w-0
                          items-center
                          gap-3
                          rounded-2xl
                          border
                          border-slate-200
                          bg-slate-50/70
                          px-4
                          py-3
                          transition-colors
                          hover:border-indigo-200
                          hover:bg-indigo-50/40
                          dark:border-slate-800
                          dark:bg-slate-900/60
                          dark:hover:border-indigo-500/30
                          dark:hover:bg-indigo-500/[0.04]
                        "
                    >
                      <div
                        className="
                            flex
                            h-8
                            w-8
                            shrink-0
                            items-center
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
                            truncate
                            text-sm
                            font-semibold
                            text-slate-700
                            dark:text-slate-200
                          "
                        title={technology.name}
                      >
                        {technology.name}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <InlineEmpty message="No technologies have been recorded yet." />
              )}
            </div>
          </Card>

          {/* Projects */}
          <Card>
            <SectionHeader
              icon={<FolderKanban size={16} />}
              title="Projects"
              description="Projects associated with this developer."
            />

            <div
              className="
                p-5
                pt-0
                sm:p-6
                sm:pt-0
              "
            >
              {projects.length > 0 ? (
                <div className="space-y-3">
                  {projects.map((project) => (
                    <div
                      key={project.id}
                      className="
                          group
                          rounded-2xl
                          border
                          border-slate-200
                          bg-slate-50/60
                          p-4
                          transition-all
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
                            flex
                            items-start
                            justify-between
                            gap-4
                          "
                      >
                        <div className="min-w-0">
                          <h3
                            className="
                                break-words
                                text-sm
                                font-bold
                                text-slate-900
                                dark:text-white
                              "
                          >
                            {project.name || "Unnamed project"}
                          </h3>

                          {project.description && (
                            <p
                              className="
                                  mt-1.5
                                  text-sm
                                  leading-6
                                  text-slate-500
                                  dark:text-slate-400
                                "
                            >
                              {project.description}
                            </p>
                          )}
                        </div>

                        <div
                          className="
                              flex
                              h-8
                              w-8
                              shrink-0
                              items-center
                              justify-center
                              rounded-lg
                              text-slate-400
                              transition-colors
                              group-hover:text-indigo-500
                            "
                        >
                          <ExternalLink size={15} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <InlineEmpty message="No projects have been recorded yet." />
              )}
            </div>
          </Card>
        </div>

        {/* =======================================================
            RIGHT COLUMN
        ======================================================== */}
        <div className="space-y-5">
          {/* Profile information */}
          <Card>
            <SectionHeader
              icon={<UserRound size={16} />}
              title="Profile"
              description="Developer overview."
            />

            <div
              className="
                space-y-4
                p-5
                pt-0
                sm:p-6
                sm:pt-0
              "
            >
              <InfoRow
                icon={<UserRound size={15} />}
                label="Name"
                value={developer.name}
              />

              <InfoRow
                icon={<BriefcaseBusiness size={15} />}
                label="Role"
                value={developer.title || "Software Developer"}
              />

              <InfoRow
                icon={<MapPin size={15} />}
                label="Location"
                value={developer.location || "Not specified"}
              />
            </div>
          </Card>

          {/* Companies */}
          <Card>
            <SectionHeader
              icon={<Building2 size={16} />}
              title="Companies"
              description="Organizations associated with this developer."
            />

            <div
              className="
                p-5
                pt-0
                sm:p-6
                sm:pt-0
              "
            >
              {companies.length > 0 ? (
                <div className="space-y-2">
                  {companies.map((company) => (
                    <div
                      key={company.id}
                      className="
                          flex
                          min-w-0
                          items-center
                          gap-3
                          rounded-2xl
                          border
                          border-slate-200
                          bg-slate-50/60
                          p-3
                          dark:border-slate-800
                          dark:bg-slate-900/60
                        "
                    >
                      <div
                        className="
                            flex
                            h-9
                            w-9
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
                            truncate
                            text-sm
                            font-semibold
                            text-slate-700
                            dark:text-slate-200
                          "
                        title={company.name}
                      >
                        {company.name}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <InlineEmpty message="No company information has been recorded." />
              )}
            </div>
          </Card>

          {/* Graph CTA */}
          <div
            className="
              relative
              overflow-hidden
              rounded-3xl
              border
              border-indigo-200/70
              bg-gradient-to-br
              from-indigo-50
              via-white
              to-violet-50
              p-5
              dark:border-indigo-500/20
              dark:from-indigo-950/40
              dark:via-slate-950
              dark:to-violet-950/30
              sm:p-6
            "
          >
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

            <div className="relative">
              <div
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-xl
                  bg-indigo-600
                  text-white
                  shadow-lg
                  shadow-indigo-600/20
                "
              >
                <GitBranch size={18} />
              </div>

              <h3
                className="
                  mt-4
                  text-base
                  font-bold
                  text-slate-950
                  dark:text-white
                "
              >
                Explore the network
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
                See how this developer connects to technologies, projects,
                companies, and other entities.
              </p>

              <Link
                to={graphUrl}
                className="
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  text-sm
                  font-bold
                  text-indigo-600
                  transition-colors
                  hover:text-indigo-700
                  dark:text-indigo-400
                  dark:hover:text-indigo-300
                "
              >
                Open graph explorer
                <ArrowUpRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ===============================================================
   METRIC
================================================================ */

function Metric({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="
          flex
          h-9
          w-9
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-slate-100
          text-slate-500
          dark:bg-slate-900
          dark:text-slate-400
        "
      >
        {icon}
      </div>

      <div className="min-w-0">
        <p
          className="
            text-lg
            font-bold
            text-slate-950
            dark:text-white
          "
        >
          {value}
        </p>

        <p
          className="
            text-[10px]
            font-bold
            uppercase
            tracking-[0.12em]
            text-slate-400
          "
        >
          {label}
        </p>
      </div>
    </div>
  );
}

/* ===============================================================
   SECTION HEADER
================================================================ */

function SectionHeader({
  icon,
  title,
  description,
}: {
  icon: ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <div
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
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
              text-sm
              font-bold
              text-slate-950
              dark:text-white
            "
          >
            {title}
          </h2>

          <p
            className="
              mt-1
              text-xs
              leading-5
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

/* ===============================================================
   INFO ROW
================================================================ */

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 shrink-0 text-slate-400">{icon}</div>

      <div className="min-w-0">
        <p
          className="
            text-[10px]
            font-bold
            uppercase
            tracking-[0.12em]
            text-slate-400
          "
        >
          {label}
        </p>

        <p
          className="
            mt-1
            break-words
            text-sm
            font-semibold
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

/* ===============================================================
   INLINE EMPTY
================================================================ */

function InlineEmpty({ message }: { message: string }) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-dashed
        border-slate-200
        bg-slate-50/60
        px-4
        py-6
        text-center
        text-xs
        text-slate-400
        dark:border-slate-800
        dark:bg-slate-900/50
      "
    >
      {message}
    </div>
  );
}

export default DeveloperProfile;
