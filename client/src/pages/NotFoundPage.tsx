import { ArrowLeft, Compass } from "lucide-react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="not-found">
      <div className="not-found-icon">
        <Compass size={28} />
      </div>

      <span>404</span>

      <h2>Page not found</h2>

      <p>
        The page you're looking for doesn't exist or has moved somewhere else.
      </p>

      <Link to="/dashboard" className="button primary">
        <ArrowLeft size={16} />
        Back to dashboard
      </Link>
    </div>
  );
}

export default NotFoundPage;
