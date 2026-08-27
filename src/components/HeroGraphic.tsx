"use client";

import { useMemo, useRef, useState } from "react";
import { generateTopRightField } from "@/lib/nodeField";

const ACCENT = {
  signal: "#E3963E",
  teal: "#49B3A6",
};

const VIEW = 500;
const GLOW_RADIUS = 85;

export function HeroGraphic({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);

  const { nodes, edges } = useMemo(
    () =>
      generateTopRightField({
        seed: 2024,
        count: 95,
        width: VIEW,
        height: VIEW,
        xBiasPower: 0.55,
        yBiasPower: 1.7,
        minDist: 27,
        neighborDist: 78,
        maxNeighbors: 3,
      }),
    []
  );

  function handleMove(e: React.PointerEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const x = ((e.clientX - rect.left) / rect.width) * VIEW;
    const y = ((e.clientY - rect.top) / rect.height) * VIEW;
    setPointer({ x, y });
  }

  function intensityAt(x: number, y: number) {
    if (!pointer) return 0;
    const dist = Math.hypot(x - pointer.x, y - pointer.y);
    return Math.max(0, 1 - dist / GLOW_RADIUS);
  }

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VIEW} ${VIEW}`}
      preserveAspectRatio="none"
      fill="none"
      role="presentation"
      aria-hidden="true"
      className={className}
      onPointerMove={handleMove}
      onPointerLeave={() => setPointer(null)}
    >
      {/* base mesh (always faintly visible) */}
      <g strokeWidth="1" className="stroke-line-strong">
        {edges.map((edge, i) => {
          const a = nodes[edge.from];
          const b = nodes[edge.to];
          return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />;
        })}
      </g>
      <g className="fill-ink-faint">
        {nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={n.r} opacity={0.55} />
        ))}
      </g>

      {/* two edges carry a constant, slow signal pulse for ambient motion */}
      <g strokeWidth="1.3" strokeLinecap="round" opacity="0.8">
        {[edges[5], edges[24]].filter(Boolean).map((edge, i) => {
          const a = nodes[edge.from];
          const b = nodes[edge.to];
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              className={i === 0 ? "stroke-teal animate-trace-flow" : "stroke-signal animate-trace-flow"}
              strokeDasharray="4 10"
              style={i === 1 ? { animationDelay: "-1.1s" } : undefined}
            />
          );
        })}
      </g>

      {/* a couple of nodes idle-pulse so the graphic feels alive at rest */}
      <g>
        {[3, 18, 40, 62].map((idx) => {
          const n = nodes[idx];
          if (!n) return null;
          return (
            <circle
              key={idx}
              cx={n.x}
              cy={n.y}
              r={n.r + 0.6}
              className="fill-signal animate-pulse-glow"
              style={{ animationDelay: `${idx * 0.12}s` }}
            />
          );
        })}
      </g>

      {/* glow overlay: brightens edges and nodes near the pointer */}
      <g strokeWidth="1.5" strokeLinecap="round">
        {edges.map((edge, i) => {
          const a = nodes[edge.from];
          const b = nodes[edge.to];
          const t = Math.max(
            intensityAt(a.x, a.y),
            intensityAt(b.x, b.y),
            intensityAt((a.x + b.x) / 2, (a.y + b.y) / 2)
          );
          if (t < 0.04) return null;
          const color = ACCENT[a.accent];
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={color}
              strokeOpacity={t}
              style={{ filter: `drop-shadow(0 0 ${3 + t * 6}px ${color})` }}
            />
          );
        })}
      </g>
      <g>
        {nodes.map((n, i) => {
          const t = intensityAt(n.x, n.y);
          if (t < 0.04) return null;
          const color = ACCENT[n.accent];
          return (
            <circle
              key={i}
              cx={n.x}
              cy={n.y}
              r={n.r + t * 4}
              fill={color}
              opacity={0.5 + t * 0.5}
              style={{ filter: `drop-shadow(0 0 ${3 + t * 8}px ${color})` }}
            />
          );
        })}
      </g>
    </svg>
  );
}
