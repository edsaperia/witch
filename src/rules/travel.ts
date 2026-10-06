// Travelling and posse (Ed, 2026-10-05; config/travel.json). A party animal near the witch on the
// ground, or at its placed sigil, is in her posse: it fights as ever. Anywhere else it travels:
// quiet both ways (combat.ts's fighting() leaves it out, so nothing notices it and it engages
// nothing), no berries, and it walks a route planned along area borders rather than through
// area middles, a little faster than its leash pace. The route is kept on the creature for the
// view, which draws the leash along it. No drawing here.
import raw from "../../config/travel.json";
import type { Creature } from "./creatures";
import type { ForestMap } from "./map";
import { FIGHT } from "./movement";
import { gaitRate, leashSpeed } from "./leash";
import type { Tuning } from "./tuning";

export interface TravelData { posse: number; leave: number; engaged: number; speed: number; clear: number; step: number; replan: number }
export const TRAVEL = raw as unknown as TravelData;

/** A traveller's way: the planned route (its first point is behind it, its last its target), how
 *  far along it is, and the target it was planned to. */
export interface Route { points: { x: number; z: number }[]; next: number; tx: number; tz: number }

/** Where an animal is bound: following her (on her stack), or to a sigil on the ground. */
export interface Anchor { x: number; z: number; /** a placed sigil (else her) */ sigil: boolean; /** she's on the ground (the posse round her) */ ground: boolean }

/** Travellers' steps (their modes set by updateModes): those on her stack head for her, those at a
 *  placed sigil for it. Travellers not busy (evolving) walk their routes; the posse is left to the
 *  leash and combat as ever. */
export function stepTravel(stack: number[], placed: { id: number; x: number; z: number }[], creatures: Creature[], witch: { x: number; z: number }, map: ForestMap, dt: number, t: Tuning, busy: (id: number) => boolean, pace = 1, data: TravelData = TRAVEL): void {
  for (const id of stack) { const c = creatures[id]; if (c.travelling && !busy(id) && !c.partyLegend) stepTraveller(c, witch.x, witch.z, map, dt, t, pace, data); }
  for (const p of placed) { const c = creatures[p.id]; if (c.travelling && !busy(p.id)) stepTraveller(c, p.x, p.z, map, dt, t, 1, data); }
}

/** Every party animal's mode for this step (before the fights, so a traveller is quiet from its first step). */
export function updateModes(stack: number[], placed: { id: number; x: number; z: number }[], creatures: Creature[], witch: { x: number; z: number }, ground: boolean, map: ForestMap, time: number, data: TravelData = TRAVEL): void {
  for (const id of stack) { const c = creatures[id]; if (c.partyLegend) { c.travelling = false; continue; } updateMode(c, { x: witch.x, z: witch.z, sigil: false, ground }, map, time, data); } // (a party legend stays put: rules/partyLegend.ts)
  for (const p of placed) updateMode(creatures[p.id], { x: p.x, z: p.z, sigil: true, ground }, map, time, data);
}

/** Whether a party animal is in her posse now (with hysteresis and the engaged latch), given where
 *  it's bound. Updates c.travelling, c.engagedUntil. */
export function updateMode(c: Creature, a: Anchor, map: ForestMap, time: number, data: TravelData = TRAVEL): boolean {
  const R = data.posse * FIGHT.scale, out = R * data.leave, d = Math.hypot(c.x - a.x, c.z - a.z);
  if (c.fight?.target || (c.hurtAt !== undefined && time - c.hurtAt < data.engaged)) c.engagedUntil = time + data.engaged;
  const engaged = (c.engagedUntil ?? -Infinity) > time;
  const inArea = a.sigil && sameArea(map, c.x, c.z, a.x, a.z);
  const can = a.sigil || a.ground; // (following her in the treetops: always travelling)
  let posse: boolean;
  if (!c.travelling) posse = engaged || (can && (inArea || d <= out)); // in the posse: it stays till well out
  else posse = can && (inArea || d <= R); // travelling: it joins inside the radius
  if (posse === !!c.travelling) {
    c.travelling = !posse;
    if (posse) c.route = undefined;
  }
  return posse;
}

const sameArea = (map: ForestMap, x1: number, z1: number, x2: number, z2: number) => { const a = map.cellSafe(x1, z1).cell, b = map.cellSafe(x2, z2).cell; return a[0] === b[0] && a[1] === b[1]; };

/** The area centres round (x, z), its own area's and its neighbours', nearest first. */
function sitesNear(map: ForestMap, x: number, z: number): { x: number; z: number }[] {
  const [cx, cy] = map.cellSafe(x, z).cell, out: { x: number; z: number; d: number }[] = [];
  for (let i = -1; i <= 1; i++) for (let j = -1; j <= 1; j++) { const s = map.siteOf(cx + i, cy + j); out.push({ ...s, d: Math.hypot(s.x - x, s.z - z) }); }
  return out.sort((a, b) => a.d - b.d);
}

/** A route from (sx, sz) to (tx, tz) along area borders: the straight line, its points pushed out to
 *  at least `clear` metres from every area's centre (save near its two ends), smoothed, resampled
 *  every `step` metres. Deterministic. */
export function planRoute(map: ForestMap, sx: number, sz: number, tx: number, tz: number, data: TravelData = TRAVEL): { x: number; z: number }[] {
  const clear = data.clear * FIGHT.scale, step = data.step * FIGHT.scale;
  const L = Math.hypot(tx - sx, tz - sz), n = Math.max(1, Math.ceil(L / step));
  let pts = Array.from({ length: n + 1 }, (_, i) => ({ x: sx + ((tx - sx) * i) / n, z: sz + ((tz - sz) * i) / n }));
  // (near its start or its target, a point may be in an area's middle: that's where it is, or goes)
  const free = (p: { x: number; z: number }) => Math.hypot(p.x - sx, p.z - sz) < clear || Math.hypot(p.x - tx, p.z - tz) < clear;
  const push = () => {
    for (let i = 1; i < pts.length - 1; i++) {
      const p = pts[i];
      if (free(p)) continue;
      // Out of every centre's clear ring it's in, nearest first, twice over (two centres close
      // together: as far from both as it can get).
      for (let pass = 0; pass < 2; pass++) for (const c of sitesNear(map, p.x, p.z)) {
        const dx = p.x - c.x, dz = p.z - c.z, d = Math.hypot(dx, dz);
        if (d >= clear) continue;
        // Out to the clear ring, away from the centre (dead on it: to the line's left).
        const ux = d > 1e-3 ? dx / d : -(tz - sz) / (L || 1), uz = d > 1e-3 ? dz / d : (tx - sx) / (L || 1);
        p.x = c.x + ux * clear; p.z = c.z + uz * clear;
      }
    }
  };
  const smooth = () => { pts = pts.map((p, i) => (i === 0 || i === pts.length - 1 ? p : { x: p.x * 0.5 + (pts[i - 1].x + pts[i + 1].x) * 0.25, z: p.z * 0.5 + (pts[i - 1].z + pts[i + 1].z) * 0.25 })); };
  const resample = () => {
    const out = [pts[0]];
    let carry = 0;
    for (let i = 1; i < pts.length; i++) {
      const a = pts[i - 1], b = pts[i], seg = Math.hypot(b.x - a.x, b.z - a.z);
      let along = step - carry;
      while (along < seg) { const k = along / seg; out.push({ x: a.x + (b.x - a.x) * k, z: a.z + (b.z - a.z) * k }); along += step; }
      carry = seg - (along - step);
    }
    const last = pts[pts.length - 1], tail = out[out.length - 1];
    if (Math.hypot(last.x - tail.x, last.z - tail.z) < step * 0.3 && out.length > 1) out[out.length - 1] = last; else out.push(last);
    pts = out;
  };
  for (let k = 0; k < 6; k++) { push(); smooth(); push(); resample(); }
  push();
  return pts;
}

/** A traveller's step: (re)plan its route to (tx, tz) when it has none or its target has moved,
 *  then walk along it at its leash pace times travel speed. */
export function stepTraveller(c: Creature, tx: number, tz: number, map: ForestMap, dt: number, t: Tuning, pace = 1, data: TravelData = TRAVEL): void {
  const r = c.route;
  if (!r || Math.hypot(r.tx - tx, r.tz - tz) > data.replan * FIGHT.scale) c.route = { points: planRoute(map, c.x, c.z, tx, tz, data), next: 1, tx, tz };
  const R = c.route!, speed = leashSpeed(c, t) * data.speed * pace;
  if (R.next >= R.points.length) { c.moving = false; c.vx = 0; c.vz = 0; return; } // (there: it waits for its target to move on)
  let left = speed * dt;
  while (left > 1e-6 && R.next < R.points.length) {
    const p = R.next === R.points.length - 1 ? { x: tx, z: tz } : R.points[R.next], dx = p.x - c.x, dz = p.z - c.z, d = Math.hypot(dx, dz);
    if (d <= left) { c.x = p.x; c.z = p.z; left -= d; R.next++; continue; }
    c.x += (dx / d) * left; c.z += (dz / d) * left;
    if (Math.abs(dx) > 0.02) c.facing = dx > 0 ? 1 : -1;
    c.away = dz < -Math.abs(dx) * 0.5;
    left = 0;
  }
  c.tx = c.x; c.tz = c.z; c.rest = 0; c.vx = 0; c.vz = 0;
  c.moving = true; c.walk += dt * gaitRate(speed);
}
