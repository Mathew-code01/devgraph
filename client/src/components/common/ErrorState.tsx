// client/src/components/common/ErrorState.tsx

import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

function ErrorState({
  title = "Unable to load data",
  message = "The server could not complete this request.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="state-card error-state" role="alert">
      <div className="state-icon error">
        <AlertTriangle size={20} />
      </div>

      <div className="state-content">
        <strong>{title}</strong>
        <span>{message}</span>

        {onRetry && (
          <button
            type="button"
            className="button secondary small"
            onClick={onRetry}
          >
            <RefreshCw size={15} />
            Try again
          </button>
        )}
      </div>
    </div>
  );
}

export default ErrorState;