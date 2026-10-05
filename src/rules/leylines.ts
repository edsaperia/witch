// The ley lines (Ed, 2026-10-04; 2026-10-05: "they essentially make a 2d game into a 1d game; you
// just follow them from objective to objective"): a line from the last runestone reached to the
// next objective, the next area in the order the waves wake them (and, if asked for, a few after).
// A stone is reached when its area's wave arrives or its quest is done (onAreaDone), whichever
// comes first, and the line moves on to the next one not yet reached. The order is the party's
// own (party.ts): the next and after-next waves are already planned there, and the waves after
// them are what the same seeded picker will choose once those have woken, so the line shows what
// will happen, not a guess. Drawing them is render/leylines.ts.
import type { ForestMap } from "./map";
import type { Cell } from "./partition";
import { cellKey, pickSet, type PartyState, type Partified } from "./party";

export interface LeyStone { cell: Cell; x: number; z: number; /** The wave that wakes (or woke) it: 0 home. */ wave: number; /** Home's start (Ed, 2026-10-05): the line leaves from the treehouse's front, setting off due south. */ depart?: boolean }

/** Where a stone stands: an area's soundsystem spot; home's, the treehouse's front (Ed, 2026-10-05:
 *  "The start of the first leyline should go from the front of the treehouse"), the line leaving it
 *  due south (departureRoute). */
function stoneOf(map: ForestMap, cell: Cell, wave: number): LeyStone {
  if (cell[0] === map.centreCell[0] && cell[1] === map.centreCell[1]) return { cell, x: map.treehouseFront.x, z: map.treehouseFront.z, wave, depart: true };
  const s = map.soundsystemSpot(cell[0], cell[1]);
  return { cell, x: s.x, z: s.z, wave };
}

/** An area's quest is done (the hook for rules/quest.ts): its stone is reached, so the line moves
 *  on from it to the next objective, without waiting for its wave. */
export function onAreaDone(p: PartyState, cell: Cell, time: number): void {
  const k = cellKey(cell);
  if (p.areas.has(k)) return; // its wave came first
  (p.leyDone ??= new Map()).set(k, time);
}

/** The stones in wave order, `count` of them (count - 1 links): the last one reached (home before
 *  anything else), then the next ones not yet reached. Fewer if the map runs out. */
export function leyChain(p: PartyState, map: ForestMap, count: number): LeyStone[] {
  const done = p.leyDone ?? new Map<string, number>();
  const reached = (k: string) => p.areas.has(k) || done.has(k);
  // The last reached: the latest woken (by its wave) or done (by its quest).
  let last: LeyStone = stoneOf(map, map.centreCell, 0), at = -Infinity;
  for (const a of p.areas.values()) if (a.at > at || (a.at === at && a.wave > last.wave)) { at = a.at; last = stoneOf(map, a.cell, a.wave); }
  for (const [k, t] of done) if (t > at) { at = t; const [x, y] = k.split(",").map(Number); last = stoneOf(map, [x, y], p.wave + 1); }
  const out: LeyStone[] = [last], seen = new Set([cellKey(last.cell)]);
  // The waves to come: next and after-next as planned, then the picker run on from there.
  let v: PartyState = p, wave = p.wave;
  const wake = (set: Cell[]): PartyState => {
    const areas = new Map<string, Partified>(v.areas);
    for (const c of set) areas.set(cellKey(c), { cell: c, wave: wave + 1, at: 0, from: null, soundsystem: null });
    return { ...v, areas, wave: wave + 1, last: set[set.length - 1] };
  };
  for (let k = 0; out.length < count && k < count + 8; k++) {
    const set = k === 0 ? p.next : k === 1 && p.afterNext.length ? p.afterNext : pickSet(v, map, p.areasPerWave);
    if (!set.length) break;
    for (const c of set) {
      const key = cellKey(c);
      if (!reached(key) && !seen.has(key)) { seen.add(key); out.push(stoneOf(map, c, wave + 1)); }
    }
    v = wake(set); wave++;
  }
  return out.slice(0, count);
}

/** A key that changes whenever the chain would (a wave, the plan, a quest done): to know when to redraw it. */
export function leyKey(p: PartyState): string {
  return `${p.wave}|${p.next.map(cellKey).join(";")}|${p.afterNext.map(cellKey).join(";")}|${p.areasPerWave}|${p.ruined?.size ?? 0}|${[...(p.leyDone?.keys() ?? [])].join(";")}`;
}

/** The first line's way out from home (Ed, 2026-10-05): from the treehouse's front due south, toward
 *  the camera, for `run` metres (short of the dancefloor: never within `avoid` metres of its floor),
 *  then a smooth curve round to the first objective, kept off the floor all the way. Points every
 *  `step` metres, from the front to `to`. */
export function departureRoute(map: ForestMap, to: { x: number; z: number }, run: number, avoid: number, step: number): [number, number][] {
  const d = map.dancefloor, R = d.radius + avoid, f = map.treehouseFront;
  const off = (x: number, z: number) => Math.hypot(x - d.x, z - d.z) >= R;
  // The straight run south, as far as it keeps off the floor.
  let len = 0;
  while (len + step <= run && off(f.x, f.z + len + step)) len += step;
  const pts: [number, number][] = [];
  for (let s = 0; s <= len + 1e-6; s += step) pts.push([f.x, f.z + s]);
  if (pts.length < 2) pts.push([f.x, f.z + Math.min(step, run)]);
  const [px, pz] = pts[pts.length - 1], L = Math.hypot(to.x - px, to.z - pz);
  // Then a curve leaving south (bending away from the floor's side) to the objective.
  const side = Math.sign(px - d.x) || 1, m = Math.min(45, L * 0.5);
  const c1: [number, number] = [px + side * m * 0.35, pz + m * 0.8];
  const ux = to.x - c1[0], uz = to.z - c1[1], ul = Math.hypot(ux, uz) || 1, m2 = Math.min(40, ul * 0.4);
  const c2: [number, number] = [to.x - (ux / ul) * m2, to.z - (uz / ul) * m2];
  const n = Math.max(4, Math.ceil((L + m) / step)), curve: [number, number][] = [];
  for (let i = 1; i <= n; i++) {
    const t = i / n, a = (1 - t) ** 3, b = 3 * (1 - t) ** 2 * t, c = 3 * (1 - t) * t * t, e = t ** 3;
    curve.push([a * px + b * c1[0] + c * c2[0] + e * to.x, a * pz + b * c1[1] + c * c2[1] + e * to.z]);
  }
  // Off the floor: anything inside pushed out round it, then smoothed (the ends held), and again.
  const push = (p: [number, number]) => { const dx = p[0] - d.x, dz = p[1] - d.z, l = Math.hypot(dx, dz) || 1; if (l < R) { p[0] = d.x + (dx / l) * R; p[1] = d.z + (dz / l) * R; } };
  for (let pass = 0; pass < 6; pass++) {
    curve.forEach(push);
    for (let i = 0; i < curve.length - 1; i++) { const a = i ? curve[i - 1] : [px, pz], b = curve[i + 1]; curve[i] = [(a[0] + 2 * curve[i][0] + b[0]) / 4, (a[1] + 2 * curve[i][1] + b[1]) / 4]; }
  }
  curve.forEach(push);
  return [...pts, ...curve];
}
