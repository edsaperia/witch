// Legends, redesigned (Ed, 2026-10-05; issue #87; config/legends.json). A legend sleeps, dreaming
// (its quest: bring the creature it dreams of while its area's soundsystem is off, and you get its
// buff; it sleeps on). With none of its kind left in its area it grows restless (a nightmare), and
// after angryAfter seconds of that it's angry: it attacks the witch and her posse from afar. A
// relic put down next to it while it sleeps makes it happy: you get its buff and it defends,
// shooting the enraged from afar. Relics lie half buried about the map; she picks one up (a relic
// sigil in her stack) and puts it down by the legend she chooses. Buffs once earned are kept.
// The legends' long, slow lobs and beams are combat's (stepLegendAttack). No drawing here.
import raw from "../../config/legends.json";
import type { Creature } from "./creatures";
import type { ForestMap } from "./map";
import { cellKey } from "./party";
import { hash2 } from "./random";

export interface LegendsData {
  angryAfter: number; check: number; placeRadius: number;
  relics: { count: number; kinds: string[]; minRemoteness: number; spacing: number; pickRadius: number };
  attack: { range: number; interval: number; windup: number; damage: number; lobFlight: number; lobRadius: number; beamWidth: number; beamTime: number; beam: string[] };
}
export const LEGENDS = raw as unknown as LegendsData;

/** A relic: a giant half-buried party object (its kind: the art's party relic id), lying at (x, z)
 *  until she picks it up; then carried (in her leash's relics), then put down by a legend. */
export interface Relic { id: number; kind: string; x: number; z: number; cell: [number, number]; state: "lying" | "carried" | "used"; legend?: number }

/** The map's relics, from the seed: count of them, in areas far enough from home and apart. */
export function placeRelics(map: ForestMap, data: LegendsData = LEGENDS): Relic[] {
  const R = data.relics, cells: [number, number][] = [];
  const b = map.bounds, inside = (x: number, z: number) => x > b.minX + 60 && x < b.maxX - 60 && z > b.minZ + 60 && z < b.maxZ - 60;
  for (let cy = 0; cy < map.n; cy++) for (let cx = 0; cx < map.n; cx++) { const s = map.siteOf(cx, cy); if (map.remoteness(cx, cy) >= R.minRemoteness && !(cx === map.centreCell[0] && cy === map.centreCell[1]) && inside(s.x, s.z)) cells.push([cx, cy]); }
  cells.sort((a, b) => hash2(a[0], a[1], map.seed + 7717) - hash2(b[0], b[1], map.seed + 7717));
  const out: Relic[] = [];
  for (const cell of cells) {
    if (out.length >= R.count) break;
    if (out.some(r => Math.max(Math.abs(r.cell[0] - cell[0]), Math.abs(r.cell[1] - cell[1])) < R.spacing)) continue;
    // Off to one side of the area's middle (clear of its soundsystem), still in the area.
    const site = map.siteOf(cell[0], cell[1]), a = hash2(cell[0], cell[1], map.seed + 7723) * Math.PI * 2;
    let x = site.x, z = site.z;
    for (const r of [40, 30, 20, 12]) { const px = site.x + Math.cos(a) * r, pz = site.z + Math.sin(a) * r, k = map.cellSafe(px, pz).cell; if (k[0] === cell[0] && k[1] === cell[1] && inside(px, pz)) { x = px; z = pz; break; } }
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
    if (c.legendState === "slept" || c.legendState === "waking" || c.legendState === "awake") c.legendState = "asleep"; // (the old states)
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
  Object.assign(c, { legendState: "asleep", stateAt: time, enraged: false, state: undefined, hp: undefined, fight: undefined, siege: undefined, restlessness: 0, charge: undefined, legend: undefined, slowUntil: undefined, stunUntil: undefined, kx: 0, kz: 0 });
}

/** Whether a legend gives its buff: its quest done, or made happy by a relic (for good either way). */
export const buffing = (c: Creature): boolean => !!c.buffed || c.legendState === "happy";

/** The sigil button on the ground at (x, z): pick up a lying relic within pickRadius (returns it),
 *  else, carrying relics, put the newest down by a sleeping (or restless) legend within placeRadius
 *  (returns the legend made happy). Null if neither (the sigil button does as ever). */
export function relicButton(relics: Relic[], carried: number[], creatures: Creature[], legendIds: number[], x: number, z: number, time: number, data: LegendsData = LEGENDS): { picked: Relic } | { placed: Relic; legend: Creature } | null {
  let pick: Relic | null = null, pd = data.relics.pickRadius;
  for (const r of relics) if (r.state === "lying") { const d = Math.hypot(r.x - x, r.z - z); if (d <= pd) { pd = d; pick = r; } }
  if (pick) { pick.state = "carried"; carried.push(pick.id); return { picked: pick }; }
  if (!carried.length) return null;
  let best: Creature | null = null, bd = data.placeRadius;
  for (const id of legendIds) { const c = creatures[id], d = Math.hypot(c.x - x, c.z - z); if (!c.gone && !c.leashed && (c.legendState === "asleep" || c.legendState === "restless") && d <= bd) { bd = d; best = c; } }
  if (!best) return null;
  const r = relics[carried.pop()!];
  Object.assign(r, { state: "used", legend: best.id, x: best.x + 4, z: best.z + 2 });
  cheer(best, time);
  return { placed: r, legend: best };
}
