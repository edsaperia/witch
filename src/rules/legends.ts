// Legends, redesigned (Ed, 2026-10-05; issue #87; config/legends.json). A legend sleeps, dreaming
// (its quest: bring the creature it dreams of while its area's soundsystem is off, and you get its
// buff; it sleeps on). With none of its kind left in its area it grows restless (a nightmare), and
// after angryAfter seconds of that it's angry: it attacks the witch and her posse from afar. A
// relic put down in its clearing while it sleeps makes it happy: you get its buff and it defends,
// shooting the enraged from afar. Relics lie half buried about the map; she picks one up (a relic
// sigil in her stack) and puts it down in the clearing of the legend she chooses (Ed, 2026-10-06). Buffs once earned are kept.
// The legends' long, slow lobs and beams are combat's (stepLegendAttack). No drawing here.
import raw from "../../config/legends.json";
import type { Creature } from "./creatures";
import { inLegendClearing, type ForestMap } from "./map";
import { crownReach, type Plant } from "./forest";
import { cellKey } from "./party";
import { hash2 } from "./random";

export interface LegendsData {
  angryAfter: number; check: number; placeRadius: number;
  relics: { count: number; kinds: string[]; minRemoteness: number; spacing: number; pickRadius: number };
  attack: { range: number; interval: number; windup: number; damage: number; targets: number; wornReach: number; /** seconds before a legend with nothing in reach looks again */ recheck: number; lobFlight: number; lobRadius: number; beamWidth: number; beamTime: number; beam: string[] };
  healTime: number;
  charge: { species: string[]; windup: number; laneShown: number; speed: number; accel: number; turn: number; brake: number; arc: number; laneWidth: number; damage: number; knockback: number; returnSpeed: number; rest: number };
  closeMoves: boolean;
}
export const LEGENDS = raw as unknown as LegendsData;

/** A relic: a giant half-buried party object (its kind: the art's party relic id), lying at (x, z)
 *  until she picks it up; then carried (in her leash's relics), then put down by a legend. */
export interface Relic { id: number; kind: string; x: number; z: number; cell: [number, number]; state: "lying" | "carried" | "used"; legend?: number }

/** Whether a tree's crown hangs over ground point (x, z), seen from the treetops (a crown is drawn
 *  crownReach metres north of its trunk, crownHalfWidth either side). */
export function canopyOver(forest: { treesNear(x: number, z: number, r: number): Plant[] }, map: ForestMap, x: number, z: number): boolean {
  const lift = crownReach(map), half = map.tuning.crownHalfWidth;
  for (const t of forest.treesNear(x, z + lift, half + 2)) if (Math.abs(t.x - x) < half * 0.85 && Math.abs(t.z - lift - z) < half * 0.7) return true;
  return false;
}

/** Whether a lying relic's glint shows (Ed, 2026-10-05: "bottle glint should only show through
 *  gaps - it's meant to be a rare find"): on the ground, always (near enough to see); from the
 *  treetops, only through a gap in the canopy over it. Never over the canopy. */
export const relicGlints = (forest: { treesNear(x: number, z: number, r: number): Plant[] }, map: ForestMap, r: Relic, treetop: boolean): boolean => !treetop || !canopyOver(forest, map, r.x, r.z);

/** The map's relics, from the seed: count of them, in areas far enough from home and apart, out
 *  in the woods (not in a clearing): every other one under a small gap in the canopy (lucky to
 *  spot from above), the rest under closed canopy (found only on the ground). */
export function placeRelics(map: ForestMap, forest: { treesNear(x: number, z: number, r: number): Plant[] }, data: LegendsData = LEGENDS): Relic[] {
  const R = data.relics, cells: [number, number][] = [];
  const b = map.bounds, inside = (x: number, z: number) => x > b.minX + 60 && x < b.maxX - 60 && z > b.minZ + 60 && z < b.maxZ - 60;
  for (let cy = 0; cy < map.n; cy++) for (let cx = 0; cx < map.n; cx++) { const s = map.siteOf(cx, cy); if (map.remoteness(cx, cy) >= R.minRemoteness && !(cx === map.centreCell[0] && cy === map.centreCell[1]) && inside(s.x, s.z)) cells.push([cx, cy]); }
  cells.sort((a, b) => hash2(a[0], a[1], map.seed + 7717) - hash2(b[0], b[1], map.seed + 7717));
  const out: Relic[] = [];
  for (const cell of cells) {
    if (out.length >= R.count) break;
    if (out.some(r => Math.max(Math.abs(r.cell[0] - cell[0]), Math.abs(r.cell[1] - cell[1])) < R.spacing)) continue;
    // Out in the woods round the area's middle, still in the area: a spot under a small gap (trees
    // close round it, none over it) for every other relic, else under closed canopy; failing
    // both, the first spot in the woods, or off the middle as before.
    const site = map.siteOf(cell[0], cell[1]), a0 = hash2(cell[0], cell[1], map.seed + 7723) * Math.PI * 2, gap = out.length % 2 === 0;
    let x = site.x, z = site.z, found = 0;
    const woods = (px: number, pz: number) => forest.treesNear(px, pz, 14).filter(t => Math.hypot(t.x - px, t.z - pz) < 14).length >= 3;
    for (const r of [55, 70, 45, 85, 40]) {
      for (let k = 0; k < 12 && found < 2; k++) {
        const a = a0 + (k / 12) * Math.PI * 2, px = site.x + Math.cos(a) * r, pz = site.z + Math.sin(a) * r, kc = map.cellSafe(px, pz).cell;
        if (kc[0] !== cell[0] || kc[1] !== cell[1] || !inside(px, pz) || map.hardClear(px, pz) || !woods(px, pz)) continue;
        const want = canopyOver(forest, map, px, pz) !== gap;
        if (want || !found) { x = px; z = pz; found = want ? 2 : 1; }
      }
      if (found === 2) break;
    }
    if (!found) for (const r of [40, 30, 20, 12]) { const px = site.x + Math.cos(a0) * r, pz = site.z + Math.sin(a0) * r, k = map.cellSafe(px, pz).cell; if (k[0] === cell[0] && k[1] === cell[1] && inside(px, pz)) { x = px; z = pz; break; } }
    out.push({ id: out.length, kind: R.kinds[Math.floor(hash2(cell[0], cell[1], map.seed + 7727) * R.kinds.length)], x, z, cell, state: "lying" });
  }
  return out;
}

/** A sleeping legend's restlessness 0..1 (the music builder's nightmare reads c.restlessness), and
 *  whether its dream quest is still open (c.questOpen: it can still be done, so its dream shows). */
export interface LegendWorld { creatures: Creature[]; map: ForestMap; time: number; dt: number; partified: (key: string) => boolean; /** where a creature is bound to now (a leashed one at a sigil: there; else its own area) */ areaOf: (c: Creature) => string }

/** One step of every legend's state. */
export function stepLegendStates(w: LegendWorld, ids: number[], data: LegendsData = LEGENDS): void {
  // Every check seconds: which of the legends' areas have one of the legend's kind in them.
  const tick = Math.floor(w.time / data.check) !== Math.floor((w.time - w.dt) / data.check);
  let kin: Set<string> | null = null;
  if (tick) {
    const want = new Map<string, string>(); // area key -> the legend's species
    for (const id of ids) { const c = w.creatures[id]; if (!c.gone) want.set(cellKey(c.cell), c.species); }
    kin = new Set();
    for (const o of w.creatures) {
      if (o.gone || o.fleeUntil || o.boss) continue;
      const k = w.areaOf(o), sp = want.get(k);
      if (sp === o.species) kin.add(k);
    }
  }
  for (const id of ids) {
    const c = w.creatures[id];
    if (c.gone || c.leashed) continue;
    const key = cellKey(c.cell), q = c.quest;
    c.questOpen = !!q && q.done === undefined && !w.partified(key) && (c.legendState === "asleep" || c.legendState === "restless");
    if (q?.done !== undefined) c.buffed = true; // (its quest done: its buff, for good)
    if (c.legendState !== "asleep" && c.legendState !== "restless") continue;
    if (kin) {
      if (kin.has(key)) { c.legendState = "asleep"; c.restlessness = 0; }
      else if (c.legendState === "asleep") { c.legendState = "restless"; c.stateAt = w.time; c.restlessness = c.restlessness ?? 0; }
    }
    if (c.legendState === "restless") {
      c.restlessness = Math.min(1, (c.restlessness ?? 0) + w.dt / Math.max(1e-6, data.angryAfter));
      if (c.restlessness >= 1) anger(c, w.time);
    }
  }
}

/** Restlessness run its course: angry (hostile; its health whole). */
export function anger(c: Creature, time: number): void {
  Object.assign(c, { legendState: "angry", stateAt: time, enraged: true, state: "enraged", hp: undefined, fight: undefined, siege: undefined, restlessness: 1, questOpen: false });
}

/** Made happy (a relic beside it): it defends, and gives its buff for good. */
export function cheer(c: Creature, time: number): void {
  Object.assign(c, { legendState: "happy", stateAt: time, enraged: false, state: undefined, hp: undefined, fight: undefined, siege: undefined, restlessness: 0, questOpen: false, buffed: true, charge: undefined, legend: undefined });
}

/** Worn down (its health gone): back to sleep, its buff (if earned) kept. */
export function lull(c: Creature, time: number): void {
  Object.assign(c, { legendState: "asleep", stateAt: time, enraged: false, state: undefined, hp: undefined, fight: undefined, siege: undefined, restlessness: 0, charge: undefined, run: undefined, legend: undefined, slowUntil: undefined, stunUntil: undefined, kx: 0, kz: 0 });
}

/** Whether a legend gives its buff: its quest done, or made happy by a relic (for good either way). */
export const buffing = (c: Creature): boolean => !!c.buffed || c.legendState === "happy";

/** The sigil button on the ground at (x, z): pick up a lying relic within pickRadius (returns it),
 *  else, carrying relics, put the newest down by a sleeping (or restless) legend she stands in the
 *  clearing of (Ed, 2026-10-06: relics "need to be placed in the circle to have their effect"; where
 *  an area has no clearing, within placeRadius of its legend), and return the legend made happy;
 *  standing near one, but outside its circle, return it as outside (a gentle cue: the circle flashes),
 *  putting nothing down. Null if none of these (the sigil button does as ever). */
export function relicButton(relics: Relic[], carried: number[], creatures: Creature[], legendIds: number[], x: number, z: number, time: number, map: ForestMap, data: LegendsData = LEGENDS): { picked: Relic } | { placed: Relic; legend: Creature } | { outside: Creature } | null {
  let pick: Relic | null = null, pd = data.relics.pickRadius;
  for (const r of relics) if (r.state === "lying") { const d = Math.hypot(r.x - x, r.z - z); if (d <= pd) { pd = d; pick = r; } }
  if (pick) { pick.state = "carried"; carried.push(pick.id); return { picked: pick }; }
  if (!carried.length) return null;
  let best: Creature | null = null, near: Creature | null = null, nd = Infinity;
  for (const id of legendIds) {
    const c = creatures[id];
    if (c.gone || c.leashed || (c.legendState !== "asleep" && c.legendState !== "restless")) continue;
    if (inLegendClearing(map, c.cell, x, z, c, data.placeRadius)) { best = c; break; }
    // (near enough to have meant it: within its circle's reach and as far again, or twice placeRadius)
    const lc = map.legendClearing(c.cell[0], c.cell[1]), d = lc ? Math.hypot(x - lc.x, z - lc.z) - lc.r : Math.hypot(x - c.x, z - c.z) - data.placeRadius;
    if (d < Math.max(data.placeRadius, lc?.r ?? 0) && d < nd) { nd = d; near = c; }
  }
  if (!best) return near ? { outside: near } : null;
  const r = relics[carried.pop()!];
  Object.assign(r, { state: "used", legend: best.id, x: best.x + 4, z: best.z + 2 });
  cheer(best, time);
  return { placed: r, legend: best };
}
