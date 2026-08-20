// client/src/components/ui/Badge.tsx

interface BadgeProps {
  children: React.ReactNode;
  tone?: "default" | "success" | "warning" | "danger" | "blue";
}

function Badge({ children, tone = "default" }: BadgeProps) {
  return <span className={`badge badge-${tone}`}>{children}</span>;
}

export default Badge;