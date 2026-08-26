"use client";

import { useRef, useState } from "react";

type Node = { id: string; x: number; y: number; accent: "signal" | "teal"; chip?: boolean };
type Edge = { from: string; to: string };

const ACCENT = {
  signal: "#E3963E",
  teal: "#49B3A6",
};

// A small, asymmetric circuit-board layout: pads connected by traces around a
// central chip. Positions are hand-placed, not a grid, so it reads as a board
// rather than a repeating pattern.
const NODES: Node[] = [
  { id: "n1", x: 46, y: 62, accent: "signal" },
  { id: "n2", x: 142, y: 40, accent: "teal" },
  { id: "n3", x: 252, y: 66, accent: "signal" },
  { id: "n4", x: 352, y: 48, accent: "teal" },
  { id: "n5", x: 84, y: 148, accent: "teal" },
  { id: "n6", x: 296, y: 156, accent: "signal" },
  { id: "n7", x: 366, y: 132, accent: "teal" },
  { id: "n8", x: 54, y: 244, accent: "signal" },
  { id: "n9", x: 150, y: 296, accent: "teal" },
  { id: "n10", x: 268, y: 300, accent: "signal" },
  { id: "n11", x: 360, y: 232, accent: "teal" },
  { id: "n12", x: 108, y: 352, accent: "signal" },
  { id: "n13", x: 232, y: 366, accent: "teal" },
  { id: "n14", x: 330, y: 340, accent: "signal" },
  { id: "chip", x: 206, y: 206, accent: "signal", chip: true },
];

const EDGES: Edge[] = [
  { from: "n1", to: "n2" },
  { from: "n2", to: "n3" },
  { from: "n3", to: "n4" },
  { from: "n1", to: "n5" },
  { from: "n5", to: "n2" },
  { from: "n3", to: "n6" },
  { from: "n4", to: "n7" },
  { from: "n6", to: "n7" },
  { from: "n5", to: "n8" },
  { from: "n8", to: "n9" },
  { from: "n9", to: "n10" },
  { from: "n10", to: "n6" },
  { from: "n10", to: "n11" },
  { from: "n11", to: "n7" },
  { from: "n8", to: "n12" },
  { from: "n9", to: "n12" },
  { from: "n9", to: "n13" },
  { from: "n13", to: "n10" },
  { from: "n13", to: "n14" },
  { from: "n14", to: "n11" },
  { from: "n5", to: "chip" },
  { from: "n6", to: "chip" },
  { from: "n9", to: "chip" },
  { from: "n10", to: "chip" },
];

const byId = Object.fromEntries(NODES.map((n) => [n.id, n]));
const GLOW_RADIUS = 130;

export function HeroGraphic({ className }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);

  function handleMove(e: React.PointerEvent<SVGSVGElement>) {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const x = ((e.clientX - rect.left) / rect.width) * 400;
    const y = ((e.clientY - rect.top) / rect.height) * 400;
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
      viewBox="0 0 400 400"
      fill="none"
      role="presentation"
      aria-hidden="true"
      className={className}
      onPointerMove={handleMove}
      onPointerLeave={() => setPointer(null)}
    >
      <defs>
        <pattern id="hero-graphic-grid" width="26" height="26" patternUnits="userSpaceOnUse">
          <path d="M26 0H0V26" stroke="currentColor" strokeWidth="1" className="text-ink-faint" />
        </pattern>
        <radialGradient id="hero-graphic-fade" cx="50%" cy="50%" r="52%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#fff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="hero-graphic-mask">
          <rect width="400" height="400" fill="url(#hero-graphic-fade)" />
        </mask>
      </defs>

      <rect
        width="400"
        height="400"
        fill="url(#hero-graphic-grid)"
        mask="url(#hero-graphic-mask)"
        opacity="0.4"
      />

      {/* base traces (always faintly visible) */}
      <g strokeWidth="1" className="stroke-line-strong">
        {EDGES.map((edge, i) => {
          const a = byId[edge.from];
          const b = byId[edge.to];
          return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} />;
        })}
      </g>

      {/* two traces carry a constant, slow signal pulse for ambient motion */}
      <g strokeWidth="1.4" strokeLinecap="round" opacity="0.8">
        <line
          x1={byId.n8.x}
          y1={byId.n8.y}
          x2={byId.n9.x}
          y2={byId.n9.y}
          className="stroke-teal animate-trace-flow"
          strokeDasharray="4 10"
        />
        <line
          x1={byId.n3.x}
          y1={byId.n3.y}
          x2={byId.n6.x}
          y2={byId.n6.y}
          className="stroke-signal animate-trace-flow"
          strokeDasharray="4 10"
          style={{ animationDelay: "-0.9s" }}
        />
      </g>

      {/* trace glow that brightens near the pointer */}
      <g strokeWidth="1.6" strokeLinecap="round">
        {EDGES.map((edge, i) => {
          const a = byId[edge.from];
          const b = byId[edge.to];
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
              style={{ filter: `drop-shadow(0 0 ${4 + t * 8}px ${color})` }}
            />
          );
        })}
      </g>

      {/* pads and the chip */}
      {NODES.map((node) => {
        const t = intensityAt(node.x, node.y);
        const color = ACCENT[node.accent];

        if (node.chip) {
          const size = 26 + t * 4;
          return (
            <g key={node.id}>
              <rect
                x={node.x - size / 2}
                y={node.y - size / 2}
                width={size}
                height={size}
                rx={3}
                className="fill-base-panel stroke-ink-faint animate-pulse-glow"
                strokeWidth="1.2"
              />
              <rect
                x={node.x - 5}
                y={node.y - 5}
                width={10}
                height={10}
                className="fill-signal"
                opacity={0.85 + t * 0.15}
                style={t > 0.05 ? { filter: `drop-shadow(0 0 ${6 + t * 10}px ${color})` } : undefined}
              />
            </g>
          );
        }

        return (
          <g key={node.id}>
            <circle cx={node.x} cy={node.y} r={2.6} className="fill-ink-faint" opacity={0.7} />
            {t > 0.04 && (
              <circle
                cx={node.x}
                cy={node.y}
                r={3.5 + t * 5}
                fill={color}
                opacity={t}
                style={{ filter: `drop-shadow(0 0 ${4 + t * 10}px ${color})` }}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
}
