// The ley lines (Ed, 2026-10-04; 2026-10-05: "they essentially make a 2d game into a 1d game; you
// just follow them from objective to objective"): a line from the last runestone reached on to the
// next objectives, the next areas in the order the waves wake them, and back through the stones
// reached before it (Ed, 2026-10-05: "six sections long, showing the next three and the past three
// runestones": leyLines.ahead and behind).
// A stone is reached when its area's wave arrives or its quest is done (onAreaDone), whichever
// comes first, and the line moves on to the next one not yet reached. The order is the party's
// own (party.ts): the next and after-next waves are already planned there, and the waves after
// them are what the same seeded picker will choose once those have woken, so the line shows what
// will happen, not a guess. Drawing them is render/leylines.ts.
import type { ForestMap } from "./map";
import { speakerRadius } from "./speakers";
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

/** The chain (Ed, 2026-10-05: "six sections long, showing the next three and the past three
 *  runestones"): the stones in wave order, `behind` of those reached before the last one reached,
 *  that last one (home before anything else), and `ahead` of the next ones not yet reached; fewer
 *  where the run or the map runs out. `current` is the last reached one's place in `stones`: the
 *  sections before it are behind her, the ones after it ahead. */
export function leyChain(p: PartyState, map: ForestMap, ahead: number, behind = 0): { stones: LeyStone[]; current: number } {
  const done = p.leyDone ?? new Map<string, number>();
  const reached = (k: string) => p.areas.has(k) || done.has(k);
  // The stones reached, in the order they were: woken (by its wave) or done (by its quest), the
  // earlier of the two; home first.
  const home = cellKey(map.centreCell), past = new Map<string, { s: LeyStone; at: number }>([[home, { s: stoneOf(map, map.centreCell, 0), at: -Infinity }]]);
  for (const a of p.areas.values()) { const k = cellKey(a.cell); if (k !== home) past.set(k, { s: stoneOf(map, a.cell, a.wave), at: a.at }); }
  for (const [k, t] of done) {
    const was = past.get(k);
    if (!was || t < was.at) { const [x, y] = k.split(",").map(Number); past.set(k, { s: stoneOf(map, [x, y], was?.s.wave ?? p.wave + 1), at: t }); }
  }
  const order = [...past.values()].sort((u, v) => u.at - v.at || u.s.wave - v.s.wave).map(u => u.s);
  const back = order.slice(Math.max(0, order.length - 1 - Math.max(0, behind))), last = back[back.length - 1];
  const out: LeyStone[] = [], seen = new Set([cellKey(last.cell)]);
  // The waves to come: next and after-next as planned, then the picker run on from there.
  let v: PartyState = p, wave = p.wave;
  const wake = (set: Cell[]): PartyState => {
    const areas = new Map<string, Partified>(v.areas);
    for (const c of set) areas.set(cellKey(c), { cell: c, wave: wave + 1, at: 0, from: null, soundsystem: null });
    return { ...v, areas, wave: wave + 1, last: set[set.length - 1] };
  };
  for (let k = 0; out.length < ahead && k < ahead + 8; k++) {
    const set = k === 0 ? p.next : k === 1 && p.afterNext.length ? p.afterNext : pickSet(v, map, p.areasPerWave);
    if (!set.length) break;
    for (const c of set) {
      const key = cellKey(c);
      if (!reached(key) && !seen.has(key)) { seen.add(key); out.push(stoneOf(map, c, wave + 1)); }
    }
    v = wake(set); wave++;
  }
  return { stones: [...back, ...out.slice(0, Math.max(0, ahead))], current: back.length - 1 };
}

/** A key that changes whenever the chain would (a wave, the plan, a quest done): to know when to redraw it. */
export function leyKey(p: PartyState): string {
  return `${p.wave}|${p.next.map(cellKey).join(";")}|${p.afterNext.map(cellKey).join(";")}|${p.areasPerWave}|${p.ruined?.size ?? 0}|${[...(p.leyDone?.keys() ?? [])].join(";")}`;
}

/** The first line's way out from home (Ed, 2026-10-05: "The treehouse should be 5m due north of the
 *  dance floor ... The ley line leads from it south across the dancefloor and then towards the first
 *  speaker"): from the treehouse's front due south, straight across the dancefloor and through its
 *  ring of speakers, on `past` metres beyond the ring (`avoid` metres outside it), then a smooth
 *  curve to the first objective's soundsystem, that stretch kept outside the ring. Points every
 *  `step` metres, from the front to `to`. */
export function departureRoute(map: ForestMap, to: { x: number; z: number }, past: number, avoid: number, step: number): [number, number][] {
  const d = map.dancefloor, R = departureClear(map, avoid), f = map.treehouseFront;
  // The straight run south: across the floor to past metres beyond the far side of the ring.
  const dx = f.x - d.x, far = Math.abs(dx) < R ? d.z + Math.sqrt(R * R - dx * dx) : f.z, len = Math.max(step, far + past - f.z);
  const pts: [number, number][] = [];
  for (let s = 0; s < len; s += step) pts.push([f.x, f.z + s]);
  pts.push([f.x, f.z + len]);
  const [px, pz] = pts[pts.length - 1], L = Math.hypot(to.x - px, to.z - pz);
  // Then a curve leaving south, bending toward the objective's side, to the objective.
  const side = Math.sign(to.x - px) || 1, m = Math.min(45, L * 0.5);
  const c1: [number, number] = [px + side * m * 0.35, pz + m * 0.8];
  const ux = to.x - c1[0], uz = to.z - c1[1], ul = Math.hypot(ux, uz) || 1, m2 = Math.min(40, ul * 0.4);
  const c2: [number, number] = [to.x - (ux / ul) * m2, to.z - (uz / ul) * m2];
  const n = Math.max(4, Math.ceil((L + m) / step)), curve: [number, number][] = [];
  for (let i = 1; i <= n; i++) {
    const t = i / n, a = (1 - t) ** 3, b = 3 * (1 - t) ** 2 * t, c = 3 * (1 - t) * t * t, e = t ** 3;
    curve.push([a * px + b * c1[0] + c * c2[0] + e * to.x, a * pz + b * c1[1] + c * c2[1] + e * to.z]);
  }
  // Off the ring after the crossing: anything inside pushed out round it, then smoothed (the ends held), and again.
  const push = (p: [number, number]) => { const ex = p[0] - d.x, ez = p[1] - d.z, l = Math.hypot(ex, ez) || 1; if (l < R) { p[0] = d.x + (ex / l) * R; p[1] = d.z + (ez / l) * R; } };
  for (let pass = 0; pass < 6; pass++) {
    curve.forEach(push);
    for (let i = 0; i < curve.length - 1; i++) { const a = i ? curve[i - 1] : [px, pz], b = curve[i + 1]; curve[i] = [(a[0] + 2 * curve[i][0] + b[0]) / 4, (a[1] + 2 * curve[i][1] + b[1]) / 4]; }
  }
  curve.forEach(push);
  return [...pts, ...curve];
}

/** How far the first line keeps from the dancefloor's middle: out past its ring of speakers by `avoid` metres. */
export const departureClear = (map: ForestMap, avoid: number) => speakerRadius(map.tuning) + map.tuning.dancefloor.speakers.footprint + avoid;
