import { useMemo, useState } from "react";

import { Info, MousePointer2, Move, X } from "lucide-react";

import type { GraphData, GraphNode as GraphNodeType } from "../../types/graph";

import GraphNode from "./GraphNode";

interface GraphExplorerProps {
  data: GraphData;
  zoom: number;
}

interface PositionedNode extends GraphNodeType {
  x: number;
  y: number;
}

const WIDTH = 1400;
const HEIGHT = 820;

function getNodePriority(node: GraphNodeType) {
  const type = node.type.toLowerCase();

  if (type.includes("developer")) return 0;
  if (type.includes("project")) return 1;
  if (type.includes("technology")) return 2;
  if (type.includes("company")) return 3;

  return 4;
}

function GraphExplorer({ data, zoom }: GraphExplorerProps) {
  const [selectedNode, setSelectedNode] = useState<GraphNodeType | null>(null);

  const positionedNodes = useMemo<PositionedNode[]>(() => {
    const nodes = [...data.nodes];

    if (!nodes.length) {
      return [];
    }

    nodes.sort((a, b) => getNodePriority(a) - getNodePriority(b));

    const centerX = WIDTH / 2;
    const centerY = HEIGHT / 2;

    const centerNode =
      nodes.find((node) => node.type.toLowerCase().includes("developer")) ??
      nodes[0];

    const remaining = nodes.filter((node) => node.id !== centerNode.id);

    const groups = new Map<string, GraphNodeType[]>();

    remaining.forEach((node) => {
      const type = node.type.toLowerCase();

      if (!groups.has(type)) {
        groups.set(type, []);
      }

      groups.get(type)!.push(node);
    });

    const result: PositionedNode[] = [
      {
        ...centerNode,
        x: centerX,
        y: centerY,
      },
    ];

    const groupEntries = Array.from(groups.entries());

    groupEntries.forEach(([, group], groupIndex) => {
      const ringIndex = groupIndex;

      const radius = 175 + ringIndex * 115;

      group.forEach((node, index) => {
        const angle =
          (index / Math.max(group.length, 1)) * Math.PI * 2 -
          Math.PI / 2 +
          groupIndex * 0.25;

        result.push({
          ...node,
          x: centerX + Math.cos(angle) * radius,
          y: centerY + Math.sin(angle) * radius * 0.65,
        });
      });
    });

    return result;
  }, [data.nodes]);

  const nodeMap = useMemo(() => {
    return new Map(positionedNodes.map((node) => [node.id, node]));
  }, [positionedNodes]);

  const selectedPosition = selectedNode
    ? nodeMap.get(selectedNode.id)
    : undefined;

  return (
    <div className="relative min-h-[560px] overflow-hidden bg-slate-50/70 dark:bg-slate-950 sm:min-h-[650px] lg:min-h-[760px]">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.06] blur-3xl dark:bg-indigo-500/[0.08]" />

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(248,250,252,0.7)_90%)] dark:bg-[radial-gradient(circle_at_center,transparent_20%,rgba(2,6,23,0.35)_90%)]" />
      </div>

      {/* Graph canvas */}
      <div className="relative h-[560px] w-full overflow-auto sm:h-[650px] lg:h-[760px]">
        <div
          className="relative mx-auto h-full min-w-[900px] transition-transform duration-300"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "center center",
          }}
        >
          <svg
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            className="h-full w-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <pattern
                id="graph-grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.6"
                  className="text-slate-200 dark:text-slate-800"
                  opacity="0.8"
                />
              </pattern>

              <marker
                id="graph-arrow"
                markerWidth="8"
                markerHeight="8"
                refX="7"
                refY="4"
                orient="auto"
                markerUnits="strokeWidth"
              >
                <path
                  d="M0,0 L8,4 L0,8 Z"
                  className="fill-slate-400 dark:fill-slate-600"
                />
              </marker>

              <filter
                id="node-shadow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feDropShadow
                  dx="0"
                  dy="5"
                  stdDeviation="7"
                  floodOpacity="0.15"
                />
              </filter>
            </defs>

            {/* Grid */}
            <rect width={WIDTH} height={HEIGHT} fill="url(#graph-grid)" />

            {/* Center guide */}
            <circle
              cx={WIDTH / 2}
              cy={HEIGHT / 2}
              r="135"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 8"
              className="text-indigo-200 dark:text-indigo-950"
            />

            {/* Relationships */}
            <g>
              {data.relationships.map((relationship, index) => {
                const source = nodeMap.get(relationship.source);

                const target = nodeMap.get(relationship.target);

                if (!source || !target) {
                  return null;
                }

                const dx = target.x - source.x;

                const dy = target.y - source.y;

                const distance = Math.sqrt(dx * dx + dy * dy);

                const offset = distance > 0 ? 26 : 0;

                const offsetX = distance > 0 ? (dx / distance) * offset : 0;

                const offsetY = distance > 0 ? (dy / distance) * offset : 0;

                return (
                  <g
                    key={`${relationship.source}-${relationship.target}-${relationship.type}-${index}`}
                  >
                    <line
                      x1={source.x + offsetX}
                      y1={source.y + offsetY}
                      x2={target.x - offsetX}
                      y2={target.y - offsetY}
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeOpacity="0.4"
                      markerEnd="url(#graph-arrow)"
                      className="text-slate-400 dark:text-slate-700"
                    />

                    <text
                      x={(source.x + target.x) / 2}
                      y={(source.y + target.y) / 2 - 5}
                      textAnchor="middle"
                      className="pointer-events-none fill-slate-400 text-[8px] font-medium uppercase tracking-[0.08em] dark:fill-slate-600"
                    >
                      {relationship.type}
                    </text>
                  </g>
                );
              })}
            </g>

            {/* Nodes */}
            <g filter="url(#node-shadow)">
              {positionedNodes.map((node) => (
                <GraphNode
                  key={node.id}
                  node={node}
                  x={node.x}
                  y={node.y}
                  selected={selectedNode?.id === node.id}
                  onClick={() => setSelectedNode(node)}
                />
              ))}
            </g>

            {!positionedNodes.length && (
              <text
                x={WIDTH / 2}
                y={HEIGHT / 2}
                textAnchor="middle"
                className="fill-slate-400 text-sm"
              >
                No graph nodes available
              </text>
            )}
          </svg>
        </div>
      </div>

      {/* Bottom help */}
      <div className="pointer-events-none absolute bottom-4 left-4 hidden rounded-xl border border-slate-200/80 bg-white/90 px-3 py-2 shadow-sm backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/90 sm:flex sm:items-center sm:gap-2">
        <MousePointer2 size={13} className="text-indigo-500" />

        <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
          Select a node to inspect
        </span>

        <span className="mx-1 h-3 w-px bg-slate-200 dark:bg-slate-700" />

        <Move size={13} className="text-slate-400" />

        <span className="text-[10px] font-medium text-slate-400">
          Scroll to explore
        </span>
      </div>

      {/* Selected node */}
      {selectedNode && selectedPosition && (
        <aside className="absolute bottom-4 right-4 left-4 max-h-[300px] overflow-auto rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl shadow-slate-950/10 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95 sm:left-auto sm:w-[330px]">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-50 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                <Info size={10} />
                {selectedNode.type}
              </span>

              <h3 className="mt-2 truncate text-sm font-bold text-slate-950 dark:text-white">
                {selectedNode.label}
              </h3>

              <p className="mt-1 truncate font-mono text-[10px] text-slate-400">
                {selectedNode.id}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedNode(null)}
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-white"
              aria-label="Close node details"
            >
              <X size={14} />
            </button>
          </div>

          {Object.keys(selectedNode.properties ?? {}).length > 0 && (
            <div className="mt-4 space-y-2">
              {Object.entries(selectedNode.properties ?? {})
                .slice(0, 8)
                .map(([key, value]) => (
                  <div
                    key={key}
                    className="flex items-start justify-between gap-4 border-t border-slate-100 pt-2 first:border-t-0 dark:border-slate-800"
                  >
                    <span className="shrink-0 text-[10px] font-semibold text-slate-400">
                      {key}
                    </span>

                    <span className="max-w-[190px] truncate text-right text-[10px] font-semibold text-slate-700 dark:text-slate-200">
                      {typeof value === "object"
                        ? JSON.stringify(value)
                        : String(value ?? "—")}
                    </span>
                  </div>
                ))}
            </div>
          )}
        </aside>
      )}
    </div>
  );
}

export default GraphExplorer;
