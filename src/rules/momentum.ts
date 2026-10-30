// Creature momentum chasing the witch (Ed, 2026-10-27: "most animals don't have enough momentum and can turn too sharply, or
// alternatively track the witch too quickly and accurately ... less worth dodging"; "each creature can have different amounts of
// each"): a turn limit falling with speed, a reaction delay (it steers for where she was a moment ago) and lead kept mostly for
// telegraphed attacks. Each species' numbers are its class's (heavy, normal, light) under its own (its folder's movement.momentum),
// then the tuning's global sliders (creatureMomentum). Pure; the trail of her places lives in the combat state.
import type { Tuning } from "./tuning";
import type { CombatState } from "./combat/data";
import { profileOf } from "./movement";
import { traitsOf } from "./combat/data";

export interface Momentum {
  /** Degrees a second its heading may swing standing still... */ turn: number;
  /** ...falling as turn / (1 + speed / k) with its speed (m/s). */ k: number;
  /** Seconds behind her it steers for (where she was). */ delay: number;
  /** Seconds of her velocity it leads her by, just chasing (0: none). */ chaseLead?: number;
  /** Times the lead its telegraphed attacks take (1: as they were). */ strikeLead?: number;
}
/** A species' momentum now (turn in radians a second, the sliders applied), or null when off. */
export interface Resolved { turn: number; k: number; delay: number; chaseLead: number; strikeLead: number }

export type MomentumClass = "heavy" | "normal" | "light";
export const classOf = (species: string, t: Tuning): MomentumClass =>
  t.dodge?.a.heavy.species.includes(species) ? "heavy" : traitsOf(species).some(x => x === "nimble" || x === "swarm") ? "light" : "normal";

/** By the classes table (a tuning of its own), then species and the sliders. */
const caches = new WeakMap<object, Map<string, Resolved>>();
/** Its momentum chasing her (null with creatureMomentum off). */
export function momentumOf(species: string, t: Tuning): Resolved | null {
  const M = t.creatureMomentum;
  if (!M?.on) return null;
  let cache = caches.get(M.classes);
  if (!cache) caches.set(M.classes, (cache = new Map()));
  const cls = classOf(species, t);
  const key = `${species}|${cls}|${M.turn}|${M.delay}|${M.chaseLead}|${M.strikeLead}`;
  let r = cache.get(key);
  if (!r) {
    const own = profileOf(species)?.momentum ?? {}, base = { ...M.classes[cls], ...own };
    r = { turn: ((base.turn * Math.PI) / 180) * M.turn, k: base.k, delay: Math.max(0, base.delay * M.delay), chaseLead: (base.chaseLead ?? 0) + M.chaseLead, strikeLead: (base.strikeLead ?? 1) * M.strikeLead };
    if (cache.size > 512) cache.clear();
    cache.set(key, r);
  }
  return r;
}

/** The longest delay kept (seconds of her trail). */
const KEEP = 1.5;
/** Note where every witch is this step (her trail, for the delay). */
export function noteWitches(s: CombatState, witches: readonly { x: number; z: number }[], time: number): void {
  const T = (s.herTrail ??= new Map());
  witches.forEach((v, i) => {
    let l = T.get(i);
    if (!l) T.set(i, (l = []));
    if (l.length && time < l[l.length - 1].t) l.length = 0; // (a new night's clock)
    l.push({ t: time, x: v.x, z: v.z });
    let cut = 0;
    while (cut < l.length - 1 && l[cut + 1].t < time - KEEP) cut++;
    if (cut) l.splice(0, cut);
  });
}
/** Where witch i was at time `at` (between the trail's places; its oldest if earlier; null with no trail). */
export function witchWas(s: CombatState, i: number, at: number): { x: number; z: number } | null {
  const l = s.herTrail?.get(i);
  if (!l?.length) return null;
  if (at <= l[0].t) return l[0];
  for (let j = l.length - 1; j > 0; j--) {
    const b = l[j], a = l[j - 1];
    if (at >= a.t) { if (at >= b.t) return b; const u = (at - a.t) / (b.t - a.t || 1); return { x: a.x + (b.x - a.x) * u, z: a.z + (b.z - a.z) * u }; }
  }
  return l[0];
}

/** Turn limit: the velocity it may aim for this step, from its velocity (vx, vz) and the one it wants (tx, tz): its heading turned
 *  at most turn / (1 + speed / k) × dt (over `heavy`, fight.momentum), and its speed eased off by how far it still has to turn (cos
 *  of what's left, at least 0.3), so a fast creature swings wide and slows to come round. */
export function limitTurn(vx: number, vz: number, tx: number, tz: number, m: Resolved, dt: number, heavy = 1): [number, number] {
  const sp = Math.hypot(vx, vz), want = Math.hypot(tx, tz);
  if (sp < 0.5 || want < 1e-3) return [tx, tz];
  const cur = Math.atan2(vz, vx), aim = Math.atan2(tz, tx);
  let diff = aim - cur;
  diff = Math.atan2(Math.sin(diff), Math.cos(diff));
  const max = ((m.turn / (1 + sp / Math.max(0.1, m.k))) * dt) / heavy;
  if (Math.abs(diff) <= max) return [tx, tz];
  const a = cur + Math.sign(diff) * max, left = Math.min(Math.PI / 2, Math.abs(diff) - max), mag = want * Math.max(0.3, Math.cos(left));
  return [Math.cos(a) * mag, Math.sin(a) * mag];
}

/** Where a creature just chasing witch i makes for: where she was m.delay seconds ago, led by m.chaseLead seconds of how she was
 *  going then (null with no trail). */
export function chaseAt(s: CombatState, i: number, time: number, m: Resolved): { x: number; z: number } | null {
  const at = time - m.delay, q = witchWas(s, i, at);
  if (!q || m.chaseLead <= 0) return q;
  const b = witchWas(s, i, at - 0.1)!;
  return { x: q.x + ((q.x - b.x) / 0.1) * m.chaseLead, z: q.z + ((q.z - b.z) / 0.1) * m.chaseLead };
}
