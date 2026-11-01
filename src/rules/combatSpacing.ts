// Ed, 2026-11-01: bigger bodies keep their distance by moving through more of the arena.
// Opt-in only. Drawing calibration is committed data, never dependent on art-worker readiness or a browser.
import raw from "../../config/packs.json";
import type { Creature } from "./creatures";
import type { Tuning } from "./tuning";
import { hash2 } from "./random";
import type { Style, StylesData } from "./combat/packs";

export interface SpacingData {
  on: boolean;
  body: { pixelSize: number; source: string; radii: Record<string, number[]> };
  clearance: number; search: number; predict: number; avoid: number; headingWindow: number; slotPasses: number; epsilon: number; fallbackAccel: number;
  charger: { out: number; carrot: number };
  circler: { out: number; wave: number; period: number; carrot: number };
  flanker: { out: number; sweep: number; period: number };
  hopper: { out: number; length: number; time: number; height: number; pause: number };
  steady: { out: number; carrot: number };
}
export const SPACING = raw.spacing as SpacingData;
export const spacingOn = (t: Tuning): boolean => t.combatSpacing ?? SPACING.on;
type Body = Pick<Creature, "species" | "level"> & Partial<Pick<Creature, "boss" | "leashed">>;
export type Point = { x: number; z: number };

/** Conservative anatomical X/Z disc at the actual fitted drawing scale. Does not change damage/hit reach. */
export function drawnRadius(c: Body, t: Tuning, data: SpacingData = SPACING): number {
  const pixels = data.body.radii[c.species]?.[c.level];
  if (!(pixels > 0) || !Number.isFinite(pixels)) throw Error(`Missing calibrated combat body: ${c.species}@${c.level}`);
  // Drawing m/px = pixelSize/(2*artPixelsPerMetre); fitted pixel support changes inversely with pixelSize.
  return pixels * data.body.pixelSize / (2 * t.artPixelsPerMetre) * (c.boss && !c.leashed ? t.wildLegends.scale : 1);
}
/** One shared body-aware centre distance for separation, slots, landing places and lull places. */
export const bodyGap = (a: Body, b: Body, t: Tuning, data: SpacingData = SPACING): number => drawnRadius(a, t, data) + drawnRadius(b, t, data) + data.clearance;

/** Smooth species-specific moving goal. No random consumption, time buckets, position writes or attacker correction. */
export function waitingSlot(c: Creature, p: Point, style: Style, want: number, time: number, scale: number, styles: StylesData, data: SpacingData = SPACING, heading?: Point | null): Point {
  const phase = hash2(c.id, 11, 1620) * Math.PI * 2, dir = hash2(c.id, 5, 7) < 0.5 ? 1 : -1;
  const bearing = Math.atan2(c.z - p.z, c.x - p.x);
  let a = bearing, r = want;
  switch (style) {
    case "charger": r += styles.circler.orbit * scale * data.charger.out; a += dir * data.charger.carrot; break;
    case "circler": r += styles.circler.orbit * scale * data.circler.out * (1 + data.circler.wave * Math.sin(time * Math.PI * 2 / data.circler.period + phase)); a += dir * data.circler.carrot; break;
    case "flanker": r *= data.flanker.out; a = (heading ? Math.atan2(heading.z, heading.x) : phase) + dir * ((styles.flanker.from + styles.flanker.to) / 2 + data.flanker.sweep * Math.sin(time * Math.PI * 2 / data.flanker.period + phase)) * Math.PI / 180; break;
    case "hopper": r += styles.hopper.ring * scale * data.hopper.out; a += dir * styles.circler.carrot; break;
    default: r *= data.steady.out; a += dir * data.steady.carrot;
  }
  return { x: p.x + Math.cos(a) * r, z: p.z + Math.sin(a) * r };
}

/** Project a waiting goal clear of neighbours' predicted anatomical discs. It moves only the goal, never any body. */
export function clearWaitingSlot(c: Creature, goal: Point, neighbours: readonly Creature[], t: Tuning, data: SpacingData = SPACING): Point {
  const out = { ...goal };
  for (let pass = 0; pass < data.slotPasses; pass++) {
    let changed = false;
    for (const o of neighbours) {
      if (o === c || o.gone || o.burrow || o.leap || o.swoop?.up) continue;
      const px = o.x + (o.vx ?? 0) * data.predict, pz = o.z + (o.vz ?? 0) * data.predict;
      const dx = out.x - px, dz = out.z - pz, d = Math.hypot(dx, dz), gap = bodyGap(c, o, t, data);
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
  for (const o of neighbours) {
    if (o === c || o.gone || o.burrow || o.leap || o.swoop?.up) continue;
    const dx = c.x - o.x, dz = c.z - o.z, vx = (c.vx ?? 0) - (o.vx ?? 0), vz = (c.vz ?? 0) - (o.vz ?? 0);
    const speed2 = vx * vx + vz * vz;
    const at = speed2 > data.epsilon ? Math.max(0, Math.min(data.predict, -(dx * vx + dz * vz) / speed2)) : 0;
    const nx = dx + vx * at, nz = dz + vz * at, d = Math.hypot(nx, nz), gap = bodyGap(c, o, t, data);
    if (d >= gap) continue;
    // Use the present side when paths cross, so a head-on pair doesn't switch sides every step.
    const current = Math.hypot(dx, dz), angle = hash2(Math.min(c.id, o.id), Math.max(c.id, o.id), 1620) * Math.PI * 2, sign = c.id < o.id ? 1 : -1;
    const ux = current > data.epsilon ? dx / current : Math.cos(angle) * sign, uz = current > data.epsilon ? dz / current : Math.sin(angle) * sign;
    const strength = data.avoid * (1 - d / gap);
    x += ux * strength; z += uz * strength;
  }
  return { x, z };
}
