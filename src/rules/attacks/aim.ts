// Creatures' ranged attacks aim where she's going (Ed, 2026-11-12, on the home island's youths: "the preparation time seems long,
// projectile speed is low, if you're moving at all they basically never hit you"; measured first, then he chose option C with its
// sub-rules, the three fixes in the same build, and the treetops left untouchable; "when the changes are decided, apply them to all
// creatures, not just home ones"). One rule for every ranged attack at her, the tuning's `ranged`:
//   - the aim follows her through the wind-up, at where she'll be when the shot arrives (lead x `lead`), and locks at least `commit`
//     s before the release and at least `lock` s (by level) before the shot can reach her; an area put down where she stands (or a
//     mine laid there) locks `areaLock` s ahead at every level; a wall of rollers leads `rollerLead` as far; a burst's or spray's
//     later shots keep the first's locked aim; the caster holds still from the lock to the release (rules/combat.ts);
//   - straight bolts and rollers at her fly at least `speedFloor` times her ground speed; wind-ups as they were, lifted only where a
//     lock couldn't otherwise hold (the old pack bolts' 0.35 s);
//   - left out of both: homing, spirals, boomerangs and orbits, beams, melee, a pulse round itself, pack interplay that goes by way of
//     packmates (relay, tether, triangulate), and any aim other than at her;
//   - fans and walls laid across the aim always keep one body on it (an adult's even fan, a wall with a hole in its middle).
// `ranged.on` false (?ranged=old) is the old behaviour throughout. Pure: no Three.js, no game state. Read by the engine
// (rules/attacks/engine.ts), the fight (rules/combat.ts, rules/combat/legend.ts) and tools/balance/rangedhit-core.mjs.
import type { AttackSpec } from "./types";

/** The tuning's `ranged` (config/tuning.json; words in config/knobs/creatures.json). */
export interface RangedTuning {
  on: boolean;
  lead: number;
  commit: number;
  lock: { young: number; adult: number; legend: number };
  speedFloor: number;
  areaLock: number;
  rollerLead: number;
}

/** The rule's defaults (as the tuning file has them), for a tuning without the section (an old save's experiment, a test). */
export const RANGED_DEFAULT: RangedTuning = { on: true, lead: 1, commit: 0.2, lock: { young: 0.75, adult: 0.6, legend: 0.6 }, speedFloor: 2, areaLock: 0.7, rollerLead: 0.5 };

/** The rule as a tuning has it: its section, else the defaults. */
export const rangedOf = (t: { ranged?: RangedTuning }): RangedTuning => t.ranged ?? RANGED_DEFAULT;

/** A cast's aim, followed till it locks (the engine's Pending.track; rules/combat.ts keeps the old pack bolt's on its fight). */
export interface AimTrack {
  /** times the way to where she'll be when it arrives (1: all of it; 0: where she is) */
  lead: number;
  /** it locks at least this long before its release (s) */
  commit: number;
  /** and at least this long before it can reach her (s) */
  ahead: number;
  /** locked, and when */
  locked?: boolean;
  at?: number;
}

/** How the rule takes an attack. */
export type AimClass = "shot" | "wall" | "lob" | "area";

/** How the rule takes this attack at her, or null when it's left out (see the header). */
export function aimClass(a: AttackSpec): AimClass | null {
  const kind = a.body?.kind ?? "bolt", aim = a.emit?.aim ?? "target";
  if (aim !== "target" && aim !== "lead") return null;
  if (a.pack?.relay || a.pack?.tether || a.pack?.triangulate) return null;
  if ((a.path ?? []).some(t => "home" in t || "spiral" in t || "boomerang" in t || "orbit" in t)) return null;
  if (kind === "bolt" || kind === "runner") return a.emit?.pattern === "wall" && kind === "runner" ? "wall" : "shot";
  if (kind === "lob") return "lob";
  if (kind === "mine" || kind === "seed") return "area";
  if ((kind === "area" || kind === "zone") && a.area?.at === "target") return "area";
  return null;
}

/** How long before it can reach her a caster of this level locks its aim (1 young, 2 adult, 3 legend). */
export const lockOf = (R: RangedTuning, level: number): number => (level >= 3 ? R.lock.legend : level === 2 ? R.lock.adult : R.lock.young);

/** The engine's tracking for a cast at her by a caster of `level`, or undefined (the rule off, or this attack left out). `strikeLead`:
 *  the caster's momentum lead (tuning creatureMomentum, 1 by default), which scales every telegraphed attack's lead. */
export function trackFor(a: AttackSpec, level: number, R: RangedTuning, strikeLead = 1): AimTrack | undefined {
  const cls = R.on ? aimClass(a) : null;
  if (!cls) return undefined;
  return { lead: R.lead * (cls === "wall" ? R.rollerLead : 1) * strikeLead, commit: R.commit, ahead: cls === "area" ? R.areaLock : lockOf(R, level) };
}

/** The old pack bolt's tracking (rules/combat.ts: a close kind's shot or lob in a shooter's role, not in the grammar), or undefined. */
export function packTrack(delivery: string, level: number, R: RangedTuning, strikeLead = 1): AimTrack | undefined {
  if (!R.on || (delivery !== "shot" && delivery !== "lob")) return undefined;
  return { lead: R.lead * strikeLead, commit: R.commit, ahead: lockOf(R, level) };
}

/** Its speed at her: a straight bolt's or roller's at least `speedFloor` times her ground speed, its speed profile scaled with it
 *  (an accelerating log starts at the floor); anything else, or the rule off, as it is. */
export function withSpeedFloor(a: AttackSpec, R: RangedTuning, groundSpeed: number): AttackSpec {
  const cls = R.on ? aimClass(a) : null;
  if (cls !== "shot" && cls !== "wall") return a;
  const floor = R.speedFloor * groundSpeed, v0 = a.speed?.v ?? (a.speed?.profile === "slow" ? 6 : 28);
  if (!(v0 < floor)) return a;
  const k = floor / Math.max(1e-6, v0);
  return { ...a, speed: { ...a.speed, v: floor, ...(a.speed?.to !== undefined ? { to: a.speed.to * k } : {}) } };
}

/** A wind-up long enough for its lock to hold: at least `commit`, and at least `ahead` less its flight (`flight`: s from its release
 *  to reaching her, 0 for an area). Unchanged wherever that holds already (Ed's option C: wind-ups as they were). */
export const liftedWindup = (windup: number, flight: number, T: AimTrack): number => Math.max(windup, T.commit, T.ahead - flight);

/** Whether a cast's aim locks now: `toRelease` s before its release, its flight `flight` s after it. */
export const locksNow = (T: AimTrack, toRelease: number, flight: number): boolean => toRelease <= T.commit + 1e-9 || toRelease + flight <= T.ahead + 1e-9;

/** Where to aim to meet her (at, moving at her velocity) after `toRelease` s and the flight: her place then, `lead` of the way;
 *  `flight(qx, qz)` is the time a shot takes from where it's released to (qx, qz). A fixed point, a few rounds: one that can't
 *  catch her settles on its last guess. */
export function intercept(at: { x: number; z: number; vx?: number; vz?: number }, toRelease: number, lead: number, flight: (qx: number, qz: number) => number): { x: number; z: number; flight: number } {
  const vx = (at.vx ?? 0) * lead, vz = (at.vz ?? 0) * lead;
  let qx = at.x, qz = at.z, fl = flight(qx, qz);
  for (let k = 0; k < 8; k++) {
    const tt = toRelease + fl, nx = at.x + vx * tt, nz = at.z + vz * tt;
    if (Math.hypot(nx - qx, nz - qz) < 0.01) { qx = nx; qz = nz; break; }
    qx = nx; qz = nz; fl = flight(qx, qz);
  }
  return { x: qx, z: qz, flight: fl };
}

/** A fan's offsets from its aim (radians): `n` spread over `angle`; with `centre`, an even count shifted half a step (to `side`, +1 or
 *  -1) so one flies on the aim and the extra goes to that side, not a hole in the middle (an adult's one more: tiger 3 to 4). */
export function fanOffsets(n: number, angle: number, centre: boolean, side = 1): number[] {
  const out: number[] = [];
  const step = n > 1 ? angle / (n - 1) : 0, shift = centre && n > 1 && n % 2 === 0 ? 0.5 * step * (side < 0 ? -1 : 1) : 0;
  for (let k = 0; k < n; k++) out.push((n > 1 ? (k / (n - 1) - 0.5) * angle : 0) + shift);
  return out;
}

/** A wall's offsets across its aim (m): `n` `spacing` apart, its `holes` left out; with `centre`, slid along so the body nearest the
 *  middle is on the aim (the gap to slip through beside her, not where she stands: the young rhino's two logs straddled her). */
export function wallOffsets(n: number, spacing: number, holes: readonly number[], centre: boolean): number[] {
  const out: number[] = [];
  for (let k = 0; k < n; k++) if (!holes.includes(k)) out.push((k - (n - 1) / 2) * spacing);
  if (!centre || !out.length || out.some(o => Math.abs(o) < 1e-6)) return out;
  let near = out[0];
  for (const o of out) if (Math.abs(o) < Math.abs(near) - 1e-9) near = o;
  return out.map(o => o - near);
}
