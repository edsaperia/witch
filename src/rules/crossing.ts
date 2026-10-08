// Whether lines on the ground cross (Ed, 2026-10-06: "Is it possible for the leylines to never have
// to cross? even if it means the route they describe is much longer"): the ley line's route
// (rules/party.ts picks the waves so it never does) and its drawn links (render/leylines.ts).
// Plain 2D geometry on (x, z); no drawing here.

export type P2 = readonly [number, number];

const orient = (a: P2, b: P2, c: P2) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
const sign = (v: number, eps: number) => (v > eps ? 1 : v < -eps ? -1 : 0);
const within = (a: P2, b: P2, c: P2) => Math.min(a[0], b[0]) - 1e-9 <= c[0] && c[0] <= Math.max(a[0], b[0]) + 1e-9 && Math.min(a[1], b[1]) - 1e-9 <= c[1] && c[1] <= Math.max(a[1], b[1]) + 1e-9;
const same = (a: P2, b: P2) => Math.abs(a[0] - b[0]) < 1e-9 && Math.abs(a[1] - b[1]) < 1e-9;

/** Segments ab and cd meet: crossing, one touching the other, or overlapping along a line. With
 *  `joined` (b is c: two links meeting at their stone), sharing just that end doesn't count;
 *  doubling back along each other does. */
export function segmentsMeet(a: P2, b: P2, c: P2, d: P2, joined = false): boolean {
  const eps = 1e-9 * Math.max(1, Math.abs(a[0]), Math.abs(a[1]), Math.abs(c[0]), Math.abs(c[1])) ** 2;
  const o1 = sign(orient(a, b, c), eps), o2 = sign(orient(a, b, d), eps), o3 = sign(orient(c, d, a), eps), o4 = sign(orient(c, d, b), eps);
  if (o1 * o2 < 0 && o3 * o4 < 0) return true; // a proper crossing
  if (o1 === 0 && o2 === 0) { // on one line: overlapping by more than a shared end?
    const ax = Math.abs(b[0] - a[0]) >= Math.abs(b[1] - a[1]) ? 0 : 1;
    const lo = Math.max(Math.min(a[ax], b[ax]), Math.min(c[ax], d[ax])), hi = Math.min(Math.max(a[ax], b[ax]), Math.max(c[ax], d[ax]));
    return hi - lo > 1e-6;
  }
  // One end resting on the other segment; joined, only their far ends count (they share b).
  if (joined && same(b, c)) return (o2 === 0 && within(a, b, d)) || (o3 === 0 && within(c, d, a));
  return (o1 === 0 && within(a, b, c)) || (o2 === 0 && within(a, b, d)) || (o3 === 0 && within(c, d, a)) || (o4 === 0 && within(c, d, b));
}

/** A polyline's bounds (minX, minZ, maxX, maxZ), kept per polyline (but for a single segment's). */
const BOXES = new WeakMap<readonly P2[], [number, number, number, number]>();
function boxOf(p: readonly P2[]): [number, number, number, number] {
  if (p.length === 2) return [Math.min(p[0][0], p[1][0]), Math.min(p[0][1], p[1][1]), Math.max(p[0][0], p[1][0]), Math.max(p[0][1], p[1][1])];
  let b = BOXES.get(p);
  if (!b) {
    b = [Infinity, Infinity, -Infinity, -Infinity];
    for (const [x, z] of p) { if (x < b[0]) b[0] = x; if (z < b[1]) b[1] = z; if (x > b[2]) b[2] = x; if (z > b[3]) b[3] = z; }
    BOXES.set(p, b);
  }
  return b;
}

/** Polylines p and q meet anywhere (where p's end is q's start, that stone aside: two links in a row). */
export function polylinesMeet(p: readonly P2[], q: readonly P2[]): boolean {
  const bp = boxOf(p), bq = boxOf(q);
  if (bp[2] < bq[0] - 1e-6 || bq[2] < bp[0] - 1e-6 || bp[3] < bq[1] - 1e-6 || bq[3] < bp[1] - 1e-6) return false;
  const joined = p.length > 0 && q.length > 0 && same(p[p.length - 1], q[0]);
  for (let i = 0; i + 1 < p.length; i++) {
    const a = p[i], b = p[i + 1];
    const x0 = Math.min(a[0], b[0]), x1 = Math.max(a[0], b[0]), z0 = Math.min(a[1], b[1]), z1 = Math.max(a[1], b[1]);
    for (let j = 0; j + 1 < q.length; j++) {
      const c = q[j], d = q[j + 1];
      if (Math.max(c[0], d[0]) < x0 || Math.min(c[0], d[0]) > x1 || Math.max(c[1], d[1]) < z0 || Math.min(c[1], d[1]) > z1) continue;
      if (segmentsMeet(a, b, c, d, joined && i + 2 === p.length && j === 0)) return true;
    }
  }
  return false;
}

/** How many pairs of a route's links meet: links[k] runs from stone k to stone k + 1. `within`:
 *  only pairs at most that many links apart (the ones ever shown together). */
export function crossings(links: readonly (readonly P2[])[], within = Infinity): number {
  let n = 0;
  for (let i = 0; i < links.length; i++) for (let j = i + 1; j < links.length && j - i <= within; j++) if (polylinesMeet(links[i], links[j])) n++;
  return n;
}
