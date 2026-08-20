// client/src/components/common/EmptyState.tsx

import { SearchX } from "lucide-react";

interface EmptyStateProps {
  title: string;
  message: string;
}

function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <div className="state-card">
      <div className="state-icon">
        <SearchX size={20} />
      </div>

      <div className="state-content">
        <strong>{title}</strong>
        <span>{message}</span>
      </div>
    </div>
  );
}

export default EmptyState;