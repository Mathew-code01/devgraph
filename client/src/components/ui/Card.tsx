// client/src/components/ui/Card.tsx

import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

function Card({ children, className = "" }: CardProps) {
  return <section className={`card ${className}`}>{children}</section>;
}

export default Card;