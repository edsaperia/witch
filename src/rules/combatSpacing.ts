// Ed, 2026-11-01: bigger bodies keep their distance by moving through more of the arena.
// Drawing calibration is committed data, never dependent on art-worker readiness or a browser.
import raw from "../../config/packs.json";
import tuningRaw from "../../config/tuning.json";
import type { Creature } from "./creatures";
import type { Tuning } from "./tuning";
import { hash2 } from "./random";
import { bodyRadius } from "./spacing";
import { profileOf } from "./movement";
export interface MotionProfile {
  radius: number; period: number; phaseSpread: number; radialWave: number; lobes: number; stretch: number;
  headingFollow: number; bearing: number; sweep: number; laneSpread: number; trailGap: number; sideGap: number;
  speed: number; cadence: number; duty: number; restSpeed: number; turn: number; lift: number; stride: number; returnLead: number;
  rangeBias: number; centerShift: number; near: number;
  /** Maximum lunge correction in degrees per second; zero keeps the release heading. */
  strikeTurn: number;
  pathWeight?: number;
}
export interface WaitingGroup { seed: number; index: number; count: number; gap: number; until: number; minimum?: number }
export interface WaitingContext { dashReach: number; inviteReach: number; areaRadius: number; speed: number; parameters?: Tuning["combatWaiting"] }

export interface SpacingData {
  on: boolean;
  body: { pixelSize: number; source: string; radii: Record<string, number[]> };
  clearance: number; search: number; predict: number; avoid: number; headingWindow: number; slotPasses: number; epsilon: number; fallbackAccel: number;
  charger: { out: number; carrot: number };
  circler: { out: number; wave: number; period: number; carrot: number };
  flanker: { out: number; sweep: number; period: number };
  hopper: { out: number; length: number; time: number; height: number; pause: number };
  steady: { out: number; carrot: number };
  motion: { default: MotionProfile; species: Record<string, Partial<MotionProfile>> };
  team: { roundTime: number; attackWindow: number; active: number };
  preferences: { default: import("./combat/teams").RolePreferences; species: Record<string, Partial<import("./combat/teams").RolePreferences>> };
}
export const SPACING = raw.spacing as SpacingData;
export const spacingOn = (t: Tuning): boolean => t.combatSpacing ?? SPACING.on;
type Body = Pick<Creature, "species" | "level"> & Partial<Pick<Creature, "boss" | "leashed">>;
export type Point = { x: number; z: number };
export interface WaitingHazard extends Point { radius: number; endX?: number; endZ?: number }

/** One geometry response for body boundaries, telegraphed discs and telegraphed lanes. */
export function hazardAvoidance(c: Creature, hazards: readonly WaitingHazard[], t: Tuning, data: SpacingData = SPACING): Point {
  let x = 0, z = 0;
  const body = drawnRadius(c, t, data);
  for (const h of hazards) {
    const dx = (h.endX ?? h.x) - h.x, dz = (h.endZ ?? h.z) - h.z, length2 = dx * dx + dz * dz;
    const u = length2 > data.epsilon ? Math.max(0, Math.min(1, ((c.x - h.x) * dx + (c.z - h.z) * dz) / length2)) : 0;
    const ox = c.x - h.x - dx * u, oz = c.z - h.z - dz * u, distance = Math.hypot(ox, oz), safe = h.radius + body + data.clearance;
    if (distance >= safe) continue;
    const a = hash2(c.id, 23, 1620) * Math.PI * 2, strength = data.avoid * (1 - distance / safe);
    x += (distance > data.epsilon ? ox / distance : Math.cos(a)) * strength;
    z += (distance > data.epsilon ? oz / distance : Math.sin(a)) * strength;
  }
  return { x, z };
}
export function pathClearsHazard(c: Creature, end: Point, h: WaitingHazard, t: Tuning, data: SpacingData = SPACING): boolean {
  const distance = (p: Point, a: Point, b: Point) => {
    const dx = b.x - a.x, dz = b.z - a.z, length2 = dx * dx + dz * dz;
    const u = length2 > data.epsilon ? Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.z - a.z) * dz) / length2)) : 0;
    return Math.hypot(a.x + dx * u - p.x, a.z + dz * u - p.z);
  };
  const tail = { x: h.endX ?? h.x, z: h.endZ ?? h.z };
  const cross = (a: Point, b: Point, p: Point) => (b.x - a.x) * (p.z - a.z) - (b.z - a.z) * (p.x - a.x);
  const intersects = cross(c, end, h) * cross(c, end, tail) < 0 && cross(h, tail, c) * cross(h, tail, end) < 0;
  const gap = intersects ? 0 : Math.min(distance(h, c, end), distance(tail, c, end), distance(c, h, tail), distance(end, h, tail));
  return gap >= drawnRadius(c, t, data) + h.radius + data.clearance;
}

/** The calibrated radii by species as a Map (the data's own object is a dictionary of some seventy keys: looked up by name a pair at
 *  a time, it was most of a crowded fight's spacing cost; the challenge's 128-animal pack, 2026-11-03), the last data's kept. */
let radiiData: SpacingData | null = null, radiiMap = new Map<string, readonly number[]>();
const radiiOf = (data: SpacingData): Map<string, readonly number[]> => {
  if (radiiData !== data) { radiiData = data; radiiMap = new Map(Object.entries(data.body.radii)); }
  return radiiMap;
};
/** Conservative anatomical X/Z disc at the actual fitted drawing scale. Does not change damage/hit reach. */
export function drawnRadius(c: Body, t: Tuning, data: SpacingData = SPACING): number {
  const pixels = radiiOf(data).get(c.species)?.[c.level] as number; // (undefined: an uncalibrated species, below)
  // Synthetic/extension creatures have no anatomical art to calibrate. They
  // retain the existing body contract; real species still require calibration.
  if (pixels === undefined && !profileOf(c.species)) return bodyRadius(c);
  if (!(pixels > 0) || !Number.isFinite(pixels)) throw Error(`Missing calibrated combat body: ${c.species}@${c.level}`);
  // Drawing m/px = pixelSize/(2*artPixelsPerMetre); fitted pixel support changes inversely with pixelSize.
  return pixels * data.body.pixelSize / (2 * t.artPixelsPerMetre) * (c.boss && !c.leashed ? t.wildLegends.scale : 1);
}
/** One shared body-aware centre distance for separation, slots, landing places and lull places. */
export const bodyGap = (a: Body, b: Body, t: Tuning, data: SpacingData = SPACING): number => drawnRadius(a, t, data) + drawnRadius(b, t, data) + data.clearance;

const profileCache = new WeakMap<object, Map<string, MotionProfile>>();
export function waitingProfile(c: Pick<Creature, "species">, data: SpacingData = SPACING): MotionProfile {
  let cache = profileCache.get(data.motion);
  if (!cache) profileCache.set(data.motion, (cache = new Map()));
  let profile = cache.get(c.species);
  if (!profile) { profile = { ...data.motion.default, ...data.motion.species[c.species] }; cache.set(c.species, profile); }
  return profile;
}
/** Common cadence: continuous travel or a configured movement/rest cycle; no species/type branch. */
export function waitingDrive(c: Creature, time: number, data: SpacingData = SPACING): { speed: number; turn: number; airborne: boolean } {
  const m = waitingProfile(c, data), phase = m.cadence > 0 ? (time / m.cadence + hash2(c.id, 13, 1620)) % 1 : 0;
  // Lifted strides already schedule their rest on landing. A second wall-clock
  // gate can add an unscheduled stop after that rest and desynchronise the gait.
  const moving = m.lift > 0 ? !!c.hop || time >= (c.hopNext ?? -Infinity) : m.cadence <= 0 || phase < m.duty;
  return { speed: m.speed * (moving ? 1 : m.restSpeed), turn: m.turn, airborne: moving && m.lift > 0 };
}
/** Shared continuous pack path, local formation offsets and return envelope. Shape comes entirely from numeric parameters. */
export function waitingSlot(c: Creature, p: Point, want: number, time: number, scale: number, data: SpacingData = SPACING, heading?: Point | null, group?: WaitingGroup, context?: WaitingContext): Point {
  const m = waitingProfile(c, data), seed = group?.seed ?? hash2(c.id, 11, 1620), index = group?.index ?? 0, count = Math.max(1, group?.count ?? 1);
  const dir = seed < 0.5 ? 1 : -1, phase = time * Math.PI * 2 / m.period * dir + seed * Math.PI * 2;
  const slotPhase = phase + index / count * Math.PI * 2 * m.phaseSpread;
  const side = Math.sin((index + 0.5) * Math.PI), front = heading ? Math.atan2(heading.z, heading.x) : seed * Math.PI * 2;
  const a = slotPhase * (1 - m.headingFollow) + (front + side * (m.bearing + m.sweep * Math.sin(phase)) * Math.PI / 180) * m.headingFollow;
  const gap = group?.gap ?? data.clearance;
  const r = Math.max(want * m.rangeBias + m.radius * scale, gap * count / (2 * Math.PI)) * (1 + m.radialWave * Math.cos(m.lobes * slotPhase));
  const rank = index - (count - 1) / 2;
  let x = p.x + Math.cos(a) * (r + rank * m.sideGap * gap) + Math.sin(a) * index * m.trailGap * gap + Math.cos(seed * Math.PI * 2) * r * m.centerShift;
  let z = p.z + Math.sin(a) * (r * m.stretch + rank * m.sideGap * gap) - Math.cos(a) * index * m.trailGap * gap + side * m.laneSpread * scale + Math.sin(seed * Math.PI * 2) * r * m.centerShift;
  // A soft outward preference, periodically relaxed for a deliberate close pass. Only the goal moves.
  const settings = context?.parameters ?? tuningRaw.combatWaiting;
  const reference = context ? (context.dashReach + context.inviteReach) * settings.reachScale : 0;
  const room = reference + settings.areaGrowth * Math.max(0, (context?.areaRadius ?? 0) - reference);
  const pass = Math.pow((1 + Math.cos(slotPhase)) / 2, settings.passPower) * settings.passDepth;
  const ox = x - p.x, oz = z - p.z, length = Math.hypot(ox, oz, data.epsilon), outward = room * (1 - pass);
  x += ox / length * outward; z += oz / length * outward;
  const travel = context ? Math.max(0, Math.hypot(c.x - p.x, c.z - p.z) - want) / Math.max(1, context.speed) : 0;
  const left = group ? group.until - time : Infinity, blend = Math.max(0, Math.min(1, left / (m.returnLead + travel))), ease = blend * blend * (3 - 2 * blend);
  const bearing = Math.atan2(c.z - p.z, c.x - p.x), sx = p.x + Math.cos(bearing) * want, sz = p.z + Math.sin(bearing) * want;
  const result = { x: sx + (x - sx) * ease, z: sz + (z - sz) * ease }, dx = result.x - p.x, dz = result.z - p.z, distance = Math.hypot(dx, dz), minimum = Math.max(m.near * scale, group?.minimum ?? 0);
  if (ease > 0 && distance < minimum) { const angle = distance > data.epsilon ? Math.atan2(dz, dx) : bearing; result.x = p.x + Math.cos(angle) * minimum; result.z = p.z + Math.sin(angle) * minimum; }
  return result;
}

/** Project a waiting goal clear of neighbours' predicted anatomical discs. It moves only the goal, never any body. */
export function clearWaitingSlot(c: Creature, goal: Point, neighbours: readonly Creature[], t: Tuning, data: SpacingData = SPACING): Point {
  const out = { ...goal }, rc = drawnRadius(c, t, data); // (its own radius once: bodyGap's sum, the same order)
  for (let pass = 0; pass < data.slotPasses; pass++) {
    let changed = false;
    for (const o of neighbours) {
      if (o === c || o.gone || o.burrow || o.leap || o.swoop?.up) continue;
      const px = o.x + (o.vx ?? 0) * data.predict, pz = o.z + (o.vz ?? 0) * data.predict;
      const dx = out.x - px, dz = out.z - pz, gap = rc + drawnRadius(o, t, data) + data.clearance;
      if (dx * dx + dz * dz >= gap * gap) continue; // (clear of it: hypot, slow, only for the near)
      const d = Math.hypot(dx, dz);
      if (d >= gap) continue;
      const angle = hash2(c.id, o.id, 1620) * Math.PI * 2;
      out.x += (d > data.epsilon ? dx / d : Math.cos(angle)) * (gap - d + data.epsilon);
      out.z += (d > data.epsilon ? dz / d : Math.sin(angle)) * (gap - d + data.epsilon);
      changed = true;
    }
    if (!changed) break;
  }
  return out;
}

/** Predictive relief force for the waiting animal; normal steering applies acceleration/turn limits afterwards. */
export function waitingAvoidance(c: Creature, neighbours: Iterable<Creature>, t: Tuning, data: SpacingData = SPACING): Point {
  let x = 0, z = 0;
  const rc = drawnRadius(c, t, data);
  for (const o of neighbours) {
    if (o === c || o.gone || o.burrow || o.leap || o.swoop?.up) continue;
    const dx = c.x - o.x, dz = c.z - o.z, vx = (c.vx ?? 0) - (o.vx ?? 0), vz = (c.vz ?? 0) - (o.vz ?? 0);
    const speed2 = vx * vx + vz * vz;
    const at = speed2 > data.epsilon ? Math.max(0, Math.min(data.predict, -(dx * vx + dz * vz) / speed2)) : 0;
    const nx = dx + vx * at, nz = dz + vz * at, gap = rc + drawnRadius(o, t, data) + data.clearance;
    if (nx * nx + nz * nz >= gap * gap) continue;
    const d = Math.hypot(nx, nz);
    if (d >= gap) continue;
    // Use the present side when paths cross, so a head-on pair doesn't switch sides every step.
    const current = Math.hypot(dx, dz), angle = hash2(Math.min(c.id, o.id), Math.max(c.id, o.id), 1620) * Math.PI * 2, sign = c.id < o.id ? 1 : -1;
    const ux = current > data.epsilon ? dx / current : Math.cos(angle) * sign, uz = current > data.epsilon ? dz / current : Math.sin(angle) * sign;
    const strength = data.avoid * (1 - d / gap);
    x += ux * strength; z += uz * strength;
  }
  return { x, z };
}
