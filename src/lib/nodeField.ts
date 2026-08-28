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

export function buildProximityEdges(
  nodes: { x: number; y: number }[],
  neighborDist: number,
  maxNeighbors: number
): FieldEdge[] {
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
  return edges;
}

// Radial distribution: points scattered within an angular wedge from a
// single origin, density falling off with radius. Produces a soft, roughly
// circular cluster — good for a centered ambient watermark, but reads as a
// single "bloom" if used for a corner-anchored graphic.
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

  return { nodes, edges: buildProximityEdges(nodes, neighborDist, maxNeighbors) };
}

export interface FieldPoint {
  x: number;
  y: number;
}

// Independent-axis distribution: x is skewed toward one edge, y toward
// another, sampled independently of each other (not by distance from a
// single point). That avoids a circular "bloom" — density fades smoothly
// across the width and height instead of radiating out from one spot, so
// the field reads as points spreading across and away from a corner rather
// than a growth sprouting from it.
//
// Plain independent random sampling still looks clumpy (some spots with
// overlapping points, others with visible gaps) because that's what random
// distributions actually look like. Each candidate point is rejected and
// resampled if it lands too close to an already-placed point, which spaces
// the field out evenly while keeping the density gradient toward the corner.
export function generateCornerPoints({
  seed,
  count,
  width = 500,
  height = 500,
  corner = "bottom-right",
  xBiasPower = 1.7,
  yBiasPower = 1.4,
  minDist = 26,
  maxAttempts = 40,
}: {
  seed: number;
  count: number;
  width?: number;
  height?: number;
  corner?: "top-right" | "bottom-right" | "top-left" | "bottom-left";
  // Both powers use the same convention regardless of which corner is
  // picked: >1 concentrates points more tightly toward that corner, <1
  // spreads them out further away from it.
  xBiasPower?: number;
  yBiasPower?: number;
  minDist?: number;
  maxAttempts?: number;
}): FieldPoint[] {
  const rand = mulberry32(seed);
  const fromRight = corner === "top-right" || corner === "bottom-right";
  const fromBottom = corner === "bottom-right" || corner === "bottom-left";
  const points: FieldPoint[] = [];

  for (let i = 0; i < count; i++) {
    let placed: FieldPoint | null = null;
    let fallback: FieldPoint | null = null;
    let fallbackNearest = -1;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      // Concentrated near 0 when the power is >1; flipped to concentrate
      // near the biased edge instead of always near 0.
      const xNear0 = Math.pow(rand(), xBiasPower);
      const yNear0 = Math.pow(rand(), yBiasPower);
      const x = width * (fromRight ? 1 - xNear0 : xNear0);
      const y = height * (fromBottom ? 1 - yNear0 : yNear0);

      let nearest = Infinity;
      for (const p of points) {
        const d = Math.hypot(p.x - x, p.y - y);
        if (d < nearest) nearest = d;
      }

      if (points.length === 0 || nearest >= minDist) {
        placed = { x, y };
        break;
      }
      if (nearest > fallbackNearest) {
        fallbackNearest = nearest;
        fallback = { x, y };
      }
    }

    points.push(placed ?? fallback ?? { x: width * rand(), y: height * rand() });
  }

  return points;
}
