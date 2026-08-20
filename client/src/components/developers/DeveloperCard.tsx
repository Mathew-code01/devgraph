// client/src/components/developers/DeveloperCard.tsx

import { ArrowUpRight, Code2, FolderKanban, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

import type { Developer } from "../../types/developer";

interface DeveloperCardProps {
  developer: Developer;
}

function DeveloperCard({ developer }: DeveloperCardProps) {
  const initials = developer.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link to={`/developers/${developer.id}`} className="developer-card">
      <div className="developer-card-top">
        {developer.avatar ? (
          <img
            src={developer.avatar}
            alt={developer.name}
            className="developer-avatar"
          />
        ) : (
          <div className="developer-avatar fallback">{initials}</div>
        )}

        <span className="card-arrow">
          <ArrowUpRight size={17} />
        </span>
      </div>

      <div className="developer-info">
        <h3>{developer.name}</h3>

        {developer.title && (
          <p className="developer-title">{developer.title}</p>
        )}

        {developer.location && (
          <div className="meta-row">
            <MapPin size={14} />
            {developer.location}
          </div>
        )}
      </div>

      <div className="developer-stats">
        <span>
          <Code2 size={14} />
          {developer.technologies?.length ?? 0} technologies
        </span>

        <span>
          <FolderKanban size={14} />
          {developer.projects?.length ?? 0} projects
        </span>
      </div>
    </Link>
  );
}

export default DeveloperCard;