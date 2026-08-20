// client/src/components/layout/MobileNav.tsx

import { X } from "lucide-react";

import Sidebar from "./Sidebar";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
}

function MobileNav({ open, onClose }: MobileNavProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="mobile-nav-layer">
      <button
        type="button"
        className="mobile-nav-backdrop"
        onClick={onClose}
        aria-label="Close navigation"
      />

      <aside className="mobile-nav">
        <div className="mobile-nav-top">
          <span>Navigation</span>

          <button type="button" onClick={onClose} aria-label="Close navigation">
            <X size={20} />
          </button>
        </div>

        <Sidebar />
      </aside>
    </div>
  );
}

export default MobileNav;