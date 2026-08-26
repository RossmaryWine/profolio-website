// Deterministic node/edge generator for the site's constellation-mesh
// graphics. Uses a seeded PRNG (not Math.random()) so server and client
// renders produce identical output and never trigger a hydration mismatch.

export interface FieldNode {
  x: number;
  y: number;
  r: number;
  accent: "signal" | "teal";
}

export interface FieldEdge {
  from: number;
  to: number;
}

export interface NodeField {
  nodes: FieldNode[];
  edges: FieldEdge[];
}

function mulberry32(seed: number) {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateNodeField({
  seed,
  count,
  originX,
  originY,
  angleStartDeg,
  angleEndDeg,
  maxRadius,
  radiusPower = 1.6,
  neighborDist = 100,
  maxNeighbors = 3,
}: {
  seed: number;
  count: number;
  originX: number;
  originY: number;
  angleStartDeg: number;
  angleEndDeg: number;
  maxRadius: number;
  radiusPower?: number;
  neighborDist?: number;
  maxNeighbors?: number;
}): NodeField {
  const rand = mulberry32(seed);
  const angleStart = (angleStartDeg * Math.PI) / 180;
  const angleSpan = ((angleEndDeg - angleStartDeg) * Math.PI) / 180;

  const nodes: FieldNode[] = [];
  for (let i = 0; i < count; i++) {
    const angle = angleStart + rand() * angleSpan;
    const radius = maxRadius * Math.pow(rand(), radiusPower);
    nodes.push({
      x: originX + radius * Math.cos(angle),
      y: originY + radius * Math.sin(angle),
      r: 1.3 + rand() * 1.5,
      accent: rand() > 0.5 ? "signal" : "teal",
    });
  }

  const edges: FieldEdge[] = [];
  const seen = new Set<string>();
  for (let i = 0; i < nodes.length; i++) {
    const candidates: { j: number; d: number }[] = [];
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;
      const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
      if (d <= neighborDist) candidates.push({ j, d });
    }
    candidates.sort((a, b) => a.d - b.d);
    for (const { j } of candidates.slice(0, maxNeighbors)) {
      const key = i < j ? `${i}-${j}` : `${j}-${i}`;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push({ from: i, to: j });
      }
    }
  }

  return { nodes, edges };
}
