// client/src/components/developers/DeveloperCard.tsx

// client/src/components/developers/DeveloperCard.tsx

import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  FolderKanban,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

import type { Developer } from "../../types/developer";

import Badge from "../ui/Badge";

interface DeveloperCardProps {
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

/**
 * Creates a stable, unique key even when backend IDs are
 * missing or duplicated.
 */
function getListKey(
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

function DeveloperCard({ developer }: DeveloperCardProps) {
  const skills = Array.isArray(developer.skills)
    ? developer.skills.filter(Boolean)
    : [];

  const technologies = Array.isArray(developer.technologies)
    ? developer.technologies.filter(Boolean)
    : [];

  const projects = Array.isArray(developer.projects)
    ? developer.projects.filter(Boolean)
    : [];

  const developerId =
    typeof developer.id === "string"
      ? developer.id.trim()
      : String(developer.id ?? "").trim();

  const developerUrl = developerId
    ? `/developers/${encodeURIComponent(developerId)}`
    : "/developers";

  return (
    <article
      className="
        group relative flex h-full flex-col overflow-hidden
        rounded-3xl
        border border-slate-200/80
        bg-white
        shadow-sm shadow-slate-950/[0.04]
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
      {/* Decorative background glow */}
      <div
        className="
          pointer-events-none absolute
          -right-20
          -top-20
          h-40
          w-40
          rounded-full
          bg-indigo-500/[0.07]
          blur-3xl
          transition-all duration-500
          group-hover:bg-indigo-500/[0.13]
        "
      />

      <div
        className="
          pointer-events-none absolute
          -bottom-24
          -left-24
          h-48
          w-48
          rounded-full
          bg-violet-500/[0.04]
          blur-3xl
          transition-all duration-500
          group-hover:bg-violet-500/[0.08]
        "
      />

      <div className="relative flex flex-1 flex-col p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3.5">
            {/* Avatar */}
            {developer.avatar ? (
              <img
                src={developer.avatar}
                alt={`${developer.name} avatar`}
                loading="lazy"
                className="
                  h-14
                  w-14
                  shrink-0
                  rounded-2xl
                  object-cover
                  ring-1
                  ring-slate-200
                  shadow-sm
                  dark:ring-slate-700
                "
              />
            ) : (
              <div
                className="
                  flex
                  h-14
                  w-14
                  shrink-0
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  from-indigo-500
                  via-violet-500
                  to-purple-600
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                  shadow-indigo-500/20
                "
              >
                {getInitials(developer.name)}
              </div>
            )}

            {/* Identity */}
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
                title={developer.name}
              >
                {developer.name}
              </h3>

              <p
                className="
                  mt-1
                  truncate
                  text-xs
                  font-medium
                  text-slate-500
                  dark:text-slate-400
                "
                title={developer.title || "Software Developer"}
              >
                {developer.title || "Software Developer"}
              </p>
            </div>
          </div>

          {/* Profile shortcut */}
          <Link
            to={developerUrl}
            aria-label={`View ${developer.name} profile`}
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-xl
              border
              border-slate-200
              bg-white
              text-slate-500
              shadow-sm
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
                group-hover:-translate-y-0.5
                group-hover:translate-x-0.5
              "
            />
          </Link>
        </div>

        {/* Location */}
        {developer.location && (
          <div
            className="
              mt-5
              flex
              min-w-0
              items-center
              gap-1.5
              text-xs
              text-slate-500
              dark:text-slate-400
            "
          >
            <MapPin
              size={14}
              className="shrink-0 text-slate-400"
            />

            <span
              className="truncate"
              title={developer.location}
            >
              {developer.location}
            </span>
          </div>
        )}

        {/* Bio */}
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
          {developer.bio ||
            "Experienced developer contributing to modern software projects and technology ecosystems."}
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
          {/* Skills */}
          <div className="px-2 py-3 text-center sm:px-3">
            <Code2
              size={14}
              className="
                mx-auto
                text-indigo-500
                dark:text-indigo-400
              "
            />

            <p
              className="
                mt-1
                text-sm
                font-bold
                text-slate-900
                dark:text-white
              "
            >
              {skills.length}
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
              Skills
            </p>
          </div>

          {/* Technologies */}
          <div className="px-2 py-3 text-center sm:px-3">
            <BriefcaseBusiness
              size={14}
              className="
                mx-auto
                text-violet-500
                dark:text-violet-400
              "
            />

            <p
              className="
                mt-1
                text-sm
                font-bold
                text-slate-900
                dark:text-white
              "
            >
              {technologies.length}
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
              Tech
            </p>
          </div>

          {/* Projects */}
          <div className="px-2 py-3 text-center sm:px-3">
            <FolderKanban
              size={14}
              className="
                mx-auto
                text-emerald-500
                dark:text-emerald-400
              "
            />

            <p
              className="
                mt-1
                text-sm
                font-bold
                text-slate-900
                dark:text-white
              "
            >
              {projects.length}
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
              Projects
            </p>
          </div>
        </div>

        {/* Technologies */}
        {technologies.length > 0 && (
          <div className="mt-5">
            <div className="flex flex-wrap gap-1.5">
              {technologies.slice(0, 4).map((technology, index) => (
                <Badge
                  key={getListKey(
                    technology.id,
                    technology.name,
                    index,
                    "technology",
                  )}
                  tone="blue"
                >
                  {technology.name}
                </Badge>
              ))}

              {technologies.length > 4 && (
                <Badge>
                  +{technologies.length - 4}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Skills preview */}
        {skills.length > 0 && (
          <div className="mt-2">
            <div className="flex flex-wrap gap-1.5">
              {skills.slice(0, 3).map((skill, index) => (
                <Badge
                  key={getListKey(
                    skill.id,
                    skill.name,
                    index,
                    "skill",
                  )}
                  tone="default"
                >
                  {skill.name}
                </Badge>
              ))}

              {skills.length > 3 && (
                <Badge>
                  +{skills.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* CTA */}
        <Link
          to={developerUrl}
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
          <span>View developer profile</span>

          <ArrowUpRight
            size={14}
            className="
              transition-transform
              duration-200
              group-hover:translate-x-0.5
              group-hover:-translate-y-0.5
            "
          />
        </Link>
      </div>
    </article>
  );
}

export default DeveloperCard;