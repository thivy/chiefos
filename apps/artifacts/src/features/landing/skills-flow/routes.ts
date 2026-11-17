import type { EdgeId } from "./reducer";
import { ENTRY_IDS, HELPER_IDS } from "./skills";

interface Size {
  w: number;
  h: number;
}

interface Route {
  edge: EdgeId;
  // The line stops where the arrowhead starts.
  line: string;
  head: string;
  // Where the edge label sits. Narrow screens have no room for one.
  label: { x: number; y: number } | null;
}

// The node cells have 6px of padding, so lines start and end on the node borders.
const PAD = 6;
const RADIUS = 8;
const HEAD_LENGTH = 8;
const HEAD_HALF_WIDTH = 4.5;
const LANES = { wide: [0.1, 0.6], narrow: [0.15, 0.85] } as const;
const LABEL_AT = 0.8;

const round = (value: number) => Math.round(value * 10) / 10;

interface Ends {
  edge: EdgeId;
  from: number;
  to: number;
}

// Counts the places where a lane crosses another caller's line. The lane at index i belongs to
// order[i], and a higher index is farther along the main axis.
function crossings(order: Ends[]) {
  const reach = new Map<number, number>();
  order.forEach(({ from }, i) => reach.set(from, Math.max(reach.get(from) ?? -1, i)));

  let count = 0;
  order.forEach(({ from, to }, i) => {
    const lo = Math.min(from, to);
    const hi = Math.max(from, to);
    for (const [x, deepest] of reach) if (x > lo && x < hi && deepest > i) count++;
    order.forEach((other, j) => {
      if (j < i && other.to > lo && other.to < hi) count++;
    });
  });
  return count;
}

function* permutations<T>(items: T[]): Generator<T[]> {
  if (items.length <= 1) {
    yield items;
    return;
  }
  for (const [i, item] of items.entries()) {
    for (const rest of permutations(items.filter((_, j) => j !== i))) yield [item, ...rest];
  }
}

// With the farthest helper in the first lane, one caller never crosses itself. Several callers
// can cross, so this tries every lane order and keeps the one with the fewest crossings.
function laneOrder(bent: Ends[]) {
  const farthest = [...bent].sort((a, b) => Math.abs(b.to - b.from) - Math.abs(a.to - a.from));
  if (bent.length > 6) return farthest;

  let best = farthest;
  let bestCost = Infinity;
  for (const order of permutations(farthest)) {
    const drift = order.reduce((sum, end, i) => sum + Math.abs(farthest.indexOf(end) - i), 0);
    const cost = crossings(order) * 100 + drift;
    if (cost < bestCost) {
      best = order;
      bestCost = cost;
    }
  }
  return best;
}

// Routes are drawn along a main axis (from a starting point to a helper) and a cross axis
// (across the cards). Wide screens run down and narrow screens run right. Every edge drops
// from its caller, turns into its own lane, then drops into its helper.
function routeEdges(edges: EdgeId[], { w, h }: Size, wide: boolean): Route[] {
  const main = wide ? h : w;
  const cross = wide ? w : h;
  const point = (u: number, v: number) =>
    wide ? `${round(v)} ${round(u)}` : `${round(u)} ${round(v)}`;

  const ends = edges.map((edge) => {
    const [from, to] = edge.split(">") as [(typeof ENTRY_IDS)[number], (typeof HELPER_IDS)[number]];
    return {
      edge,
      from: ((ENTRY_IDS.indexOf(from) + 0.5) / ENTRY_IDS.length) * cross,
      to: ((HELPER_IDS.indexOf(to) + 0.5) / HELPER_IDS.length) * cross,
    };
  });

  const bent = laneOrder(ends.filter(({ from, to }) => Math.abs(to - from) > 1));
  const [near, far] = LANES[wide ? "wide" : "narrow"];
  const lane = new Map(
    bent.map(({ edge }, index) => [
      edge,
      main * (near + ((far - near) * (index + 1)) / (bent.length + 1)),
    ]),
  );

  const start = -PAD;
  const end = main + PAD;
  const base = end - HEAD_LENGTH;

  return ends.map(({ edge, from, to }) => {
    const turn = lane.get(edge);
    let line = `M${point(start, from)}L${point(base, to)}`;

    if (turn !== undefined) {
      const dir = Math.sign(to - from);
      const r = Math.min(RADIUS, Math.abs(to - from) / 2, turn - start, base - turn);
      line =
        `M${point(start, from)}L${point(turn - r, from)}` +
        `Q${point(turn, from)} ${point(turn, from + dir * r)}` +
        `L${point(turn, to - dir * r)}` +
        `Q${point(turn, to)} ${point(turn + r, to)}` +
        `L${point(base, to)}`;
    }

    const head =
      `M${point(end, to)}L${point(base, to - HEAD_HALF_WIDTH)}` +
      `L${point(base, to + HEAD_HALF_WIDTH)}Z`;

    return { edge, line, head, label: wide ? { x: round(to), y: round(main * LABEL_AT) } : null };
  });
}

export { routeEdges };
export type { Route, Size };
