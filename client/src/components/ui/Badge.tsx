// client/src/components/ui/Badge.tsx

import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  tone?: "default" | "success" | "warning" | "danger" | "blue";
  size?: "sm" | "md";
  className?: string;
}

const toneStyles = {
  default: `
    border-slate-200
    bg-slate-50
    text-slate-600
    dark:border-slate-700
    dark:bg-slate-800
    dark:text-slate-300
  `,

  success: `
    border-emerald-200
    bg-emerald-50
    text-emerald-700
    dark:border-emerald-900/60
    dark:bg-emerald-950/40
    dark:text-emerald-300
  `,

  warning: `
    border-amber-200
    bg-amber-50
    text-amber-700
    dark:border-amber-900/60
    dark:bg-amber-950/40
    dark:text-amber-300
  `,

  danger: `
    border-red-200
    bg-red-50
    text-red-700
    dark:border-red-900/60
    dark:bg-red-950/40
    dark:text-red-300
  `,

  blue: `
    border-indigo-200
    bg-indigo-50
    text-indigo-700
    dark:border-indigo-900/60
    dark:bg-indigo-950/40
    dark:text-indigo-300
  `,
};

function Badge({
  children,
  tone = "default",
  size = "sm",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex
        max-w-full
        min-w-0
        items-center
        overflow-hidden
        rounded-full
        border
        font-semibold
        leading-none
        transition-colors

        ${size === "sm" ? "px-2.5 py-1 text-[10px]" : "px-3 py-1.5 text-xs"}

        ${toneStyles[tone]}

        ${className}
      `}
    >
      <span className="min-w-0 truncate">{children}</span>
    </span>
  );
}

export default Badge;