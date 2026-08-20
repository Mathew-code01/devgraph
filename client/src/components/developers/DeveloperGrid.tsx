// client/src/components/developers/DeveloperGrid.tsx

import type { Developer } from "../../types/developer";

import DeveloperCard from "./DeveloperCard";

interface DeveloperGridProps {
  developers: Developer[];
}

function DeveloperGrid({ developers }: DeveloperGridProps) {
  const safeDevelopers = Array.isArray(developers)
    ? developers.filter(Boolean)
    : [];

  if (safeDevelopers.length === 0) {
    return null;
  }

  return (
    <div
      className="
        grid
        grid-cols-1
        gap-5
        md:grid-cols-2
        xl:grid-cols-3
      "
    >
      {safeDevelopers.map((developer, index) => (
        <DeveloperCard
          key={developer.id || `developer-${index}`}
          developer={developer}
        />
      ))}
    </div>
  );
}

export default DeveloperGrid;