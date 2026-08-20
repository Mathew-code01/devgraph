import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const INITIAL_PROGRESS = 15;
const MAX_PROGRESS = 88;
const PROGRESS_INTERVAL = 120;
const MINIMUM_DISPLAY_TIME = 350;
const FADE_OUT_DURATION = 180;

function PageLoader() {
  const location = useLocation();

  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(INITIAL_PROGRESS);

  useEffect(() => {
    /*
     * Start the simulated progress asynchronously.
     *
     * This avoids synchronous setState calls directly inside the
     * effect body and keeps the implementation compatible with
     * react-hooks/set-state-in-effect.
     */
    const startTimer = window.setTimeout(() => {
      setVisible(true);
      setProgress(INITIAL_PROGRESS);
    }, 0);

    /*
     * Simulated progress.
     *
     * The progress intentionally stops at 88% so the loader does
     * not appear to finish before the route transition settles.
     */
    const progressTimer = window.setInterval(() => {
      setProgress((current) => {
        if (current >= MAX_PROGRESS) {
          return current;
        }

        const remaining = MAX_PROGRESS - current;
        const increment = Math.max(1, Math.round(remaining * 0.12));

        return Math.min(MAX_PROGRESS, current + increment);
      });
    }, PROGRESS_INTERVAL);

    /*
     * Keep the loader visible briefly so very fast navigation
     * does not create an unpleasant flash.
     */
    const hideTimer = window.setTimeout(() => {
      setProgress(100);

      window.setTimeout(() => {
        setVisible(false);
      }, FADE_OUT_DURATION);
    }, MINIMUM_DISPLAY_TIME);

    return () => {
      window.clearTimeout(startTimer);
      window.clearInterval(progressTimer);
      window.clearTimeout(hideTimer);
    };
  }, [location.pathname, location.search, location.hash]);

  if (!visible) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        fixed
        inset-x-0
        top-0
        z-[9999]
      "
    >
      <div
        className="
          h-[3px]
          w-full
          overflow-hidden
          bg-transparent
          max-[480px]:h-[2px]
        "
      >
        <div
          className="
            relative
            h-full
            rounded-r-full
            bg-gradient-to-r
            from-indigo-500
            via-violet-500
            to-indigo-400
            shadow-[0_0_12px_rgba(99,102,241,0.55)]
            transition-[width]
            duration-150
            ease-out
          "
          style={{
            width: `${progress}%`,
          }}
        >
          <span
            className="
              absolute
              right-0
              top-0
              h-full
              w-16
              animate-pulse
              bg-white/50
              blur-[3px]
            "
          />
        </div>
      </div>
    </div>
  );
}

export default PageLoader;
