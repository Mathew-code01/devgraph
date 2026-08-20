import type { GraphNode as GraphNodeType } from "../../types/graph";

interface GraphNodeProps {
  node: GraphNodeType;
  x: number;
  y: number;
  selected: boolean;
  onClick: () => void;
}

function getNodeColor(type: string) {
  const normalized = type.toLowerCase();

  if (normalized.includes("developer")) {
    return {
      fill: "#4f46e5",
      stroke: "#818cf8",
      glow: "rgba(99,102,241,0.35)",
    };
  }

  if (normalized.includes("technology")) {
    return {
      fill: "#2563eb",
      stroke: "#60a5fa",
      glow: "rgba(37,99,235,0.30)",
    };
  }

  if (normalized.includes("project")) {
    return {
      fill: "#7c3aed",
      stroke: "#a78bfa",
      glow: "rgba(124,58,237,0.30)",
    };
  }

  if (normalized.includes("company")) {
    return {
      fill: "#059669",
      stroke: "#34d399",
      glow: "rgba(5,150,105,0.30)",
    };
  }

  if (normalized.includes("skill") || normalized.includes("language")) {
    return {
      fill: "#0891b2",
      stroke: "#67e8f9",
      glow: "rgba(8,145,178,0.28)",
    };
  }

  return {
    fill: "#475569",
    stroke: "#94a3b8",
    glow: "rgba(71,85,105,0.25)",
  };
}

function truncateLabel(label: string, max = 22) {
  if (label.length <= max) {
    return label;
  }

  return `${label.slice(0, max - 1)}…`;
}

function GraphNode({ node, x, y, selected, onClick }: GraphNodeProps) {
  const colors = getNodeColor(node.type);

  const isDeveloper = node.type.toLowerCase().includes("developer");

  const radius = isDeveloper ? 30 : 23;

  return (
    <g
      transform={`translate(${x}, ${y})`}
      onClick={onClick}
      className="cursor-pointer"
      role="button"
      tabIndex={0}
      aria-label={`View ${node.label}`}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onClick();
        }
      }}
    >
      {/* Glow */}
      <circle r={radius + 10} fill={colors.glow} opacity={selected ? 1 : 0.6} />

      {/* Selection */}
      {selected && (
        <circle
          r={radius + 8}
          fill="none"
          stroke="#818cf8"
          strokeWidth="2"
          strokeDasharray="5 5"
        />
      )}

      {/* Main node */}
      <circle
        r={radius}
        fill={colors.fill}
        stroke={colors.stroke}
        strokeWidth={selected ? 3 : 2}
      />

      {/* Highlight */}
      <circle
        cy={-radius * 0.32}
        r={radius * 0.27}
        fill="white"
        opacity="0.14"
      />

      {/* Label */}
      <text
        y={radius + 20}
        textAnchor="middle"
        className="pointer-events-none fill-slate-800 text-[11px] font-bold dark:fill-slate-100"
      >
        {truncateLabel(node.label)}
      </text>

      {/* Type */}
      <text
        y={radius + 35}
        textAnchor="middle"
        className="pointer-events-none fill-slate-400 text-[8px] font-semibold uppercase tracking-[0.12em] dark:fill-slate-500"
      >
        {node.type}
      </text>
    </g>
  );
}

export default GraphNode;
