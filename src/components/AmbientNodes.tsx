import { generateNodeField } from "@/lib/nodeField";

const VIEW = 500;

const { nodes, edges } = generateNodeField({
  seed: 4242,
  count: 26,
  originX: VIEW / 2,
  originY: VIEW / 2,
  angleStartDeg: 0,
  angleEndDeg: 360,
  maxRadius: 230,
  radiusPower: 1.3,
  neighborDist: 100,
  maxNeighbors: 2,
});

const PULSE_INDICES = [4, 14, 21];

// A faint, static constellation mesh used as ambient background texture on
// pages that don't have their own hero graphic. Purely decorative and
// non-interactive.
export function AmbientNodes({ className }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${VIEW} ${VIEW}`}
      fill="none"
      role="presentation"
      aria-hidden="true"
      className={className}
    >
      <g strokeWidth="1" className="stroke-ink-faint">
        {edges.map((edge, i) => {
          const a = nodes[edge.from];
          const b = nodes[edge.to];
          return <line key={i} x1={a.x} y1={a.y} x2={b.x} y2={b.y} opacity={0.5} />;
        })}
      </g>
      <g className="fill-ink-faint">
        {nodes.map((n, i) => (
          <circle key={i} cx={n.x} cy={n.y} r={n.r} opacity={0.6} />
        ))}
      </g>
      <g className="fill-signal">
        {PULSE_INDICES.map((idx) => {
          const n = nodes[idx];
          if (!n) return null;
          return (
            <circle
              key={idx}
              cx={n.x}
              cy={n.y}
              r={n.r + 0.5}
              className="animate-pulse-glow"
              style={{ animationDelay: `${idx * 0.4}s` }}
            />
          );
        })}
      </g>
    </svg>
  );
}
