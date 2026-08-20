// client/src/components/ui/Card.tsx

import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

function Card({ children, className = "" }: CardProps) {
  return (
    <section
      className={`
        overflow-hidden
        rounded-3xl
        border
        border-slate-200/80
        bg-white
        shadow-sm
        shadow-slate-950/[0.03]
        dark:border-slate-800
        dark:bg-slate-950
        ${className}
      `}
    >
      {children}
    </section>
  );
}

export default Card;