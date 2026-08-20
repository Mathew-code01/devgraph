// client/src/components/developers/DeveloperGrid.tsx

import type { Developer } from "../../types/developer";

import DeveloperCard from "./DeveloperCard";

interface DeveloperGridProps {
  developers: Developer[];
}

function DeveloperGrid({ developers }: DeveloperGridProps) {
  return (
    <div className="developer-grid">
      {developers.map((developer) => (
        <DeveloperCard key={developer.id} developer={developer} />
      ))}
    </div>
  );
}

export default DeveloperGrid;