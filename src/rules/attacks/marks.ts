// Shot marks (Ed, 2026-11-13: "Enemy projectiles seem to have no effect where they land, is that correct?"; told most leave nothing,
// he chose "Mark the ground"): where a creature's shot at her side ends without leaving anything of its own (a bolt or a roller
// that misses and runs out, a lob landing), a small brief mark on the ground in its element. A mark is a zone of the engine's
// (rules/attacks/engine.ts: drawn as every zone is, in its element, fading out), with its own tick (engine.ts stepZone): whoever of
// the shot's foes stands in a hurting one for `stand` s takes `damage` of the shot's damage, once a mark (her: one hit, as from any
// zone, so only standing in it costs it, never walking through); a slowing one slows whoever's in it while they are. Other animals as
// every zone without hit.allies: untouched. The numbers: tuning shotMarks (config/tuning.json); ?shotmarks=0 turns them off.
import { elementOf } from "../attackLook";
import { CAPS, type SpellState, type Zone } from "./engine";
import type { AttackSpec, Effect } from "./types";

/** What a mark does: hurt (a scorch, a char, a poison splash), slow (frost, a puddle, a dark pool) or rough (broken ground, a
 *  milder slow). */
export type MarkKind = "hurt" | "slow" | "rough" | "none";

export interface ShotMarksTuning {
  on: boolean;
  /** how long a mark lasts (s) and its radius (m) */
  time: number; radius: number;
  /** a hurting mark: seconds stood in it before it bites, and its share of the shot's damage (once a mark each) */
  stand: number; damage: number;
  /** her speed in a slowing mark and on rough ground (times her own) */
  slow: number; rough: number;
  /** at most this many at once (more are skipped), and a shot ending within `merge` m of a mark of its side renews that one instead */
  max: number; merge: number;
  /** what each element's mark does (the look's twelve elements, config/attack-look.json) */
  kinds: Record<string, MarkKind>;
}

/** How often a mark looks at who's in it (s). */
export const MARK_TICK = 0.25;

/** A shot's end, as a mark needs it. */
export interface ShotEnd { x: number; z: number; species: string; side: string; source: number; /** its element tag (body.element), if it has one */ element?: string; /** what a hit of it would have done */ damage: number; effect?: Effect; cast?: number }

/** What a shot's mark does: as its own hit does where that slows or burns (the turtle's water slows, so its splash does), else its
 *  element's kind (the tag's element, else its species' own, as the look layer dresses it). */
export function markKind(M: ShotMarksTuning, species: string, element: string | undefined, effect: Effect | undefined): MarkKind {
  if (effect?.burn) return "hurt";
  if (effect?.slow || effect?.root) return "slow";
  return M.kinds[elementOf(species, undefined, undefined, element)] ?? "rough";
}

/** A shot ended at (x, z): its mark laid (or the mark it fell on renewed); null when marks are off, its kind leaves none, or there
 *  are `max` already. */
export function leaveMark(S: SpellState, M: ShotMarksTuning | undefined, e: ShotEnd, time: number): Zone | null {
  if (!M?.on || M.time <= 0 || M.radius <= 0) return null;
  const kind = markKind(M, e.species, e.element, e.effect);
  if (kind === "none") return null;
  let n = 0, free = -1;
  for (let i = 0; i < S.zones.length; i++) {
    const z = S.zones[i];
    if (!z.alive) { if (free < 0) free = i; continue; }
    if (!z.mark) continue;
    n++;
    // (falling on a mark of its own side: that one lasts on, nobody hurt twice by it)
    if (z.side === e.side && Math.hypot(z.x - e.x, z.z - e.z) <= M.merge) { z.until = Math.max(z.until, time + M.time); return z; }
  }
  if (n >= M.max) return null;
  if (free < 0) free = S.zones.length < CAPS.zones ? S.zones.length : -1;
  if (free < 0) { S.capped++; return null; }
  const effect: Effect | undefined = kind === "hurt" ? undefined : { slow: { mult: kind === "slow" ? M.slow : M.rough, time: MARK_TICK + 0.15 } };
  const attack: AttackSpec = { body: { kind: "zone", element: e.element }, ...(effect ? { hit: { effect } } : {}) };
  const zone: Zone = {
    id: S.next++, alive: true, attack, name: "mark", shape: "disc", x: e.x, z: e.z, r: M.radius, inner: 0, to: 0, shrink: 0, width: 0, angle: 0, heading: 0,
    from: time, until: time + M.time, tick: MARK_TICK, nextTick: time + MARK_TICK, grow: 0,
    damage: kind === "hurt" ? e.damage * M.damage : 0, effect, side: e.side, source: e.source, species: e.species, depth: 1, cast: e.cast ?? 0,
    once: false, hit: [], element: e.element ?? "", look: "", mark: { kind, stand: M.stand, ticks: 0, dwell: new Map() },
  };
  S.zones[free] = zone; S.stats.zones[1]++;
  S.events.push({ kind: "zone", at: time, x: zone.x, z: zone.z, attack: zone.name, source: zone.source, zone: zone.id, element: zone.element });
  return zone;
}
