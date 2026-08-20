// client/src/components/common/LoadingState.tsx

import { LoaderCircle } from "lucide-react";

interface LoadingStateProps {
  message?: string;
  compact?: boolean;
}

function LoadingState({
  message = "Loading graph data...",
  compact = false,
}: LoadingStateProps) {
  return (
    <div
      className={`state-card ${compact ? "compact" : ""}`}
      role="status"
      aria-live="polite"
    >
      <LoaderCircle className="loading-spinner" size={24} />

      <div>
        <strong>{message}</strong>
        {!compact && <span>Please wait while the latest data is loaded.</span>}
      </div>
    </div>
  );
}

export default LoadingState;