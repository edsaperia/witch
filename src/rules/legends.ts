// Legends, redesigned (Ed, 2026-10-05; issue #87; config/legends.json). A legend sleeps, dreaming
// (its quest: bring the creature it dreams of while it sleeps, soundsystem on or not (Ed, 2026-10-06), and you get its
// buff; it sleeps on). With none of its kind left in its area it grows restless (a nightmare), and
// after angryAfter seconds of that it's angry: it attacks the witch and her posse from afar. A
// relic put down in its clearing while it sleeps makes it happy: you get its buff and it defends,
// shooting the enraged from afar. Relics lie half buried about the map; she picks one up (a relic
// sigil in her stack) and puts it down in the clearing of the legend she chooses (Ed, 2026-10-06). Buffs once earned are kept.
// The legends' long, slow lobs and beams are combat's (stepLegendAttack). No drawing here.
import raw from "../../config/legends.json";
import type { Creature } from "./creatures";
import { inLegendClearing, type ForestMap } from "./map";
import { isInside } from "./mapShape";
import { crownReach, type Plant } from "./forest";
import { cellKey } from "./party";
import { hash2 } from "./random";

export interface LegendsData {
  angryAfter: number; check: number; placeRadius: number;
  /** Going back to sleep away from where it lay (Ed, 2026-10-06): it walks home at homeSpeed m/s first. */
  homeSpeed: number;
  relics: { kinds: string[]; minRemoteness: number; minGap: number; spread: number; homeInset: number; clearOfTreehouse: number; candidates: number; sigilOffset: number };
  attack: { range: number; interval: number; windup: number; damage: number; targets: number; wornReach: number; /** seconds before a legend with nothing in reach looks again */ recheck: number; lobFlight: number; lobRadius: number; beamWidth: number; beamTime: number; beam: string[]; };
  healTime: number;
  charge: { species: string[]; windup: number; laneShown: number; speed: number; accel: number; turn: number; brake: number; arc: number; laneWidth: number; damage: number; knockback: number; returnSpeed: number; rest: number };
  closeMoves: boolean;
}
export const LEGENDS = raw as unknown as LegendsData;

/** A relic: a giant half-buried party object (its kind: the art's party relic id), lying at (x, z)
 *  until she picks it up; then carried (in her leash's relics), then put down by a legend. */
export interface Relic { id: number; kind: string; x: number; z: number; cell: [number, number]; state: "lying" | "carried" | "used"; legend?: number;
  /** Its relic sigil on the ground, sigilOffset metres south of it (Ed, 2026-10-06): she picks the relic up by standing on this, like any sigil. */
  sx: number; sz: number }

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

/** The map's relics, from the seed (Ed, 2026-10-06: "each one should appear on the map once. One
 *  appears near an edge of the home area, the rest are scattered across the map, none can be within
 *  150m of another"): one of each kind. One, of a seeded kind, lies just inside the home area's edge
 *  (out past home's circle, off the dancefloor and the treehouse), where a new player comes across
 *  it; the rest in areas far enough from home, scattered (the first of a few seeded areas at least
 *  spread metres from those already placed, else the farthest), none within minGap metres of another. Each lies in
 *  the woods of its area, under a small gap for every other one, else under closed canopy, never in
 *  a cleared place (a legend's clearing, a set piece's, a soundsystem's: map.hardClear). A map that
 *  can't fit one minGap from the rest has it at the farthest spot found, and says so. */
export function placeRelics(map: ForestMap, forest: { treesNear(x: number, z: number, r: number): Plant[] }, data: LegendsData = LEGENDS): Relic[] {
  const R = data.relics, b = map.bounds, inside = (x: number, z: number) => isInside(b, x, z, 60);
  const woods = (px: number, pz: number) => forest.treesNear(px, pz, 14).filter(t => Math.hypot(t.x - px, t.z - pz) < 14).length >= 3;
  const out: Relic[] = [];
  const gapTo = (x: number, z: number) => out.reduce((m, r) => Math.min(m, Math.hypot(r.x - x, r.z - z)), Infinity);
  // The kinds in a seeded order: the first for home's, the rest for the map.
  const kinds = [...R.kinds].sort((a, k) => hash2(a.length, a.charCodeAt(0) + a.charCodeAt(a.length - 1) * 7, map.seed + 7731) - hash2(k.length, k.charCodeAt(0) + k.charCodeAt(k.length - 1) * 7, map.seed + 7731));
  const put = (kind: string, x: number, z: number) => { const c = map.cellSafe(x, z).cell; out.push({ id: out.length, kind, x, z, cell: [c[0], c[1]], state: "lying", sx: x, sz: Math.min(b.maxZ - 1, z + R.sigilOffset) }); };

  // Home's: round from a seeded bearing, out along each ray to where the home area ends, then back
  // in a little: the first such spot that's clear, in bounds and past home's circle (else out past the edge).
  {
    const C = map.centreCell, home = map.siteOf(C[0], C[1]), a0 = hash2(C[0], C[1], map.seed + 7741) * Math.PI * 2, rays = 24;
    const inHome = (x: number, z: number) => { const c = map.cellSafe(x, z).cell; return c[0] === C[0] && c[1] === C[1]; };
    let spot: { x: number; z: number } | null = null;
    for (const side of [-1, 1]) { // (just inside first; failing that, just outside)
      for (let k = 0; k < rays && !spot; k++) {
        const a = a0 + (k / rays) * Math.PI * 2, dx = Math.cos(a), dz = Math.sin(a);
        let edge = -1;
        for (let r = map.homeRadius; r < 600; r += 4) if (!inHome(home.x + dx * r, home.z + dz * r)) { edge = r; break; }
        if (edge < 0) continue;
        const r = edge + side * R.homeInset, x = home.x + dx * r, z = home.z + dz * r;
        if (r > map.homeRadius + 5 && Math.hypot(x - map.treehouse.x, z - map.treehouse.z) >= R.clearOfTreehouse && inside(x, z) && !map.hardClear(x, z) && inHome(x, z) === (side < 0)) spot = { x, z };
      }
      if (spot) break;
    }
    const s = spot ?? { x: home.x + Math.cos(a0) * (map.homeRadius + R.homeInset), z: home.z + Math.sin(a0) * (map.homeRadius + R.homeInset) };
    put(kinds[0], s.x, s.z);
  }

  // A spot in the woods round an area's middle, still in the area (under a small gap for every other relic).
  const spotIn = (cell: [number, number], gap: boolean): { x: number; z: number } | null => {
    const site = map.siteOf(cell[0], cell[1]), a0 = hash2(cell[0], cell[1], map.seed + 7723) * Math.PI * 2;
    let best: { x: number; z: number } | null = null, found = 0;
    for (const r of [55, 70, 45, 85, 40, 30, 20]) {
      for (let k = 0; k < 12 && found < 2; k++) {
        const a = a0 + (k / 12) * Math.PI * 2, px = site.x + Math.cos(a) * r, pz = site.z + Math.sin(a) * r, kc = map.cellSafe(px, pz).cell;
        if (kc[0] !== cell[0] || kc[1] !== cell[1] || !inside(px, pz) || map.hardClear(px, pz)) continue;
        const inWoods = woods(px, pz), want = inWoods && canopyOver(forest, map, px, pz) !== gap;
        if (want || (inWoods && found < 1) || !best) { best = { x: px, z: pz }; found = want ? 2 : inWoods ? 1 : 0; }
      }
      if (found === 2) break;
    }
    return best;
  };

  // The rest: best-candidate over the areas far enough from home, seeded.
  const cells: [number, number][] = [];
  for (const [cx, cy] of map.cells) { const s = map.siteOf(cx, cy); if (map.remoteness(cx, cy) >= R.minRemoteness && !(cx === map.centreCell[0] && cy === map.centreCell[1]) && inside(s.x, s.z)) cells.push([cx, cy]); }
  cells.sort((a, c) => hash2(a[0], a[1], map.seed + 7717) - hash2(c[0], c[1], map.seed + 7717));
  const used = new Set<string>([cellKey(out[0].cell)]);
  for (let i = 1; i < kinds.length; i++) {
    let pick: { x: number; z: number; d: number; key: string } | null = null, tried = 0;
    const consider = (cell: [number, number]) => {
      const key = cellKey(cell);
      if (used.has(key)) return;
      const s = spotIn(cell, i % 2 === 1);
      if (!s) return;
      tried++;
      // (Any as far as spread from the rest will do: the first such, in seeded order, else the farthest,
      // so they scatter over the map rather than being pushed out to its corners.)
      const d = gapTo(s.x, s.z), cur = pick as { d: number } | null;
      if (!cur || (Math.min(d, R.spread) > Math.min(cur.d, R.spread))) pick = { ...s, d, key };
    };
    // A few seeded areas (best of them), then, if none of those is minGap clear, every area.
    for (let k = 0; k < cells.length && tried < R.candidates && !(pick && (pick as { d: number }).d >= R.spread); k++) consider(cells[(k + i * 7) % cells.length]);
    if (!pick || (pick as { d: number }).d < R.minGap) for (const c of cells) consider(c);
    if (!pick) continue;
    const p = pick as { x: number; z: number; d: number; key: string };
    if (p.d < R.minGap) console.warn(`relics: seed ${map.seed}: ${kinds[i]} only ${p.d.toFixed(0)} m from another (minGap ${R.minGap})`);
    used.add(p.key);
    put(kinds[i], p.x, p.z);
  }
  return out;
}

/** A sleeping legend's restlessness 0..1 (the music builder's nightmare reads c.restlessness), and
 *  whether its dream quest is still open (c.questOpen: it can still be done, so its dream shows). */
export interface LegendWorld {
  /** Seconds restless before angry, if not legends.json angryAfter (with the stomp on: tuning legends.stomp.angryAfter). */
  angryAfter?: number; creatures: Creature[]; map: ForestMap; time: number; dt: number; partified: (key: string) => boolean; /** where a creature is bound to now (a leashed one at a sigil: there; else its own area) */ areaOf: (c: Creature) => string }

/** One step of every legend's state. */
export function stepLegendStates(w: LegendWorld, ids: number[], data: LegendsData = LEGENDS): void {
  for (const id of ids) {
    const c = w.creatures[id];
    if (c.gone || c.leashed) continue;
    const key = cellKey(c.cell), q = c.quest;
    // Going back to sleep away from where it lay (Ed, 2026-10-06: "they should go back to their
    // circle first and sleep in the spot where they spawned initially"): it walks home, then lies down.
    if (c.homing) { walkHome(c, w.time, w.dt, data); continue; }
    c.questOpen = !!q && q.done === undefined && (c.legendState === "asleep" || c.legendState === "restless"); // (open while it sleeps, its soundsystem on or not: Ed, 2026-10-06)
    if (q?.done !== undefined) c.buffed = true; // (its quest done: its buff, for good)
    // Every check seconds, each legend on its own beat (Ed, 2026-10-06: "the legends could check
    // for own species in area once every five seconds without issue"; staggered by its id, so they
    // don't all look on one frame): is one of its kind in its area?
    const phase = ((c.id * 0.6180339887) % 1) * data.check;
    if (Math.floor((w.time + phase) / data.check) !== Math.floor((w.time - w.dt + phase) / data.check)) {
      const kin = hasKin(w, c, key);
      if (c.legendState === "angry" && kin) lull(c, w.time); // (Ed, 2026-10-06: "Angry legends should go back to sleep once one of their own species is back in their area"; its buff, if earned, kept)
      else if (c.legendState === "asleep" || c.legendState === "restless") {
        if (kin) { c.legendState = "asleep"; c.restlessness = 0; }
        else if (c.legendState === "asleep") { c.legendState = "restless"; c.stateAt = w.time; c.restlessness = c.restlessness ?? 0; }
      }
    }
    if (c.legendState === "restless") {
      c.restlessness = Math.min(1, (c.restlessness ?? 0) + w.dt / Math.max(1e-6, w.angryAfter ?? data.angryAfter));
      if (c.restlessness >= 1) anger(c, w.time);
    }
  }
}

/** Whether one of a legend's kind is in its area (any state: wild, happy, leashed and parked there, babies). */
function hasKin(w: LegendWorld, c: Creature, key: string): boolean {
  // (A creature besieging another area's soundsystem doesn't count at home: art builder 1, #254, Ed: "After a siege, the angry adults move onto the next area, which will waken the legend".)
  for (const o of w.creatures) if (o !== c && o.species === c.species && !o.gone && !o.fleeUntil && !o.boss && !(o.siege && o.siege !== key) && w.areaOf(o) === key) return true;
  return false;
}

/** A step of a legend walking home to where it lay (c.lairX, lairZ: its spawn spot), then lying down there. */
function walkHome(c: Creature, time: number, dt: number, data: LegendsData): void {
  const hx = c.lairX ?? c.x, hz = c.lairZ ?? c.z, dx = hx - c.x, dz = hz - c.z, d = Math.hypot(dx, dz), step = data.homeSpeed * dt;
  if (d <= step) { c.x = hx; c.z = hz; c.homing = undefined; c.moving = false; c.stateAt = time; return; } // (home: it settles and lies down)
  c.x += (dx / d) * step; c.z += (dz / d) * step; c.moving = true;
  if (Math.abs(dx) > 1e-6) c.facing = dx < 0 ? -1 : 1;
  c.away = dz < 0; // (walking north, up the screen: its back to us)
}

/** Restlessness run its course: angry (hostile; its health whole). */
export function anger(c: Creature, time: number): void {
  Object.assign(c, { legendState: "angry", stateAt: time, enraged: true, state: "enraged", hp: undefined, fight: undefined, siege: undefined, restlessness: 1, questOpen: false });
}

/** Made happy (a relic beside it): it defends, and gives its buff for good. */
export function cheer(c: Creature, time: number): void {
  Object.assign(c, { legendState: "happy", stateAt: time, enraged: false, state: undefined, hp: undefined, fight: undefined, siege: undefined, restlessness: 0, questOpen: false, buffed: true, charge: undefined, legend: undefined });
}

/** Back to sleep (worn down, or calmed by one of its kind back in its area), its buff (if earned)
 *  kept; away from where it lay, it walks home first (homing; Ed, 2026-10-06). */
export function lull(c: Creature, time: number): void {
  const away = c.lairX !== undefined && c.lairZ !== undefined && Math.hypot(c.x - c.lairX, c.z - c.lairZ) > 0.5;
  Object.assign(c, { legendState: "asleep", stateAt: time, enraged: false, state: undefined, hp: undefined, fight: undefined, siege: undefined, restlessness: 0, charge: undefined, run: undefined, legend: undefined, slowUntil: undefined, stunUntil: undefined, kx: 0, kz: 0, homing: away || undefined, questOpen: false });
}

/** Whether a legend gives its buff: its quest done, or made happy by a relic (for good either way). */
export const buffing = (c: Creature): boolean => !!c.buffed || c.legendState === "happy";

/** The sigil button on the ground at (x, z): pick up a lying relic within pickRadius (returns it),
 *  else, carrying relics, put the newest down by a sleeping (or restless) legend she stands in the
 *  clearing of (Ed, 2026-10-06: relics "need to be placed in the circle to have their effect"; where
 *  an area has no clearing, within placeRadius of its legend), and return the legend made happy;
 *  standing near one, but outside its circle, return it as outside (a gentle cue: the circle flashes),
 *  putting nothing down. Null if none of these (the sigil button does as ever). */
export function relicButton(relics: Relic[], carried: number[], creatures: Creature[], legendIds: number[], x: number, z: number, time: number, pickRadius: number, map: ForestMap, data: LegendsData = LEGENDS): { picked: Relic } | { placed: Relic; legend: Creature } | { outside: Creature } | null {
  // Standing on a relic's sigil (as on any placed sigil: within the leash's pickRadius of it) picks the relic up.
  let pick: Relic | null = null, pd = pickRadius;
  for (const r of relics) if (r.state === "lying") { const d = Math.hypot(r.sx - x, r.sz - z); if (d <= pd) { pd = d; pick = r; } }
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
