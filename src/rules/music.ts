// Music by proximity (Ed, 2026-10-04): one shared track, louder and clearer the nearer the witch
// is to a playing soundsystem, quiet and muffled in the deep forest, and distorted by damage
// nearby (a damaged soundsystem wobbles, crackles and drops out, scaled by its damage and how
// close she is). The home ring of speakers plays as one source at the dancefloor's centre, as
// loud as its share of speakers powered on, damaged as its speakers are. The numbers only: the
// platform plays them.
import type { Game } from "./game";
import type { Tuning } from "./tuning";
import { speakersOn } from "./party";

export interface MusicMix {
  /** 0-1, before the master volume. */
  volume: number;
  /** The low-pass filter's cutoff (Hz): high near, muffled far. */
  cutoff: number;
  /** 0-1: how much damage is heard (wobble, crackle, drop-outs). */
  distort: number;
  /** Metres to the nearest playing source. */
  distance: number;
}

/** The music heard now at `at` (a listener: each witch hears her own mix, Ed's co-op). */
/** How far the party's over (Ed, 2026-10-06: "when the soundsystems and speakers are all destroyed, the dance music stops
 *  ... all the animals go to sleep ... and you can walk the map safely"), 0 to 1, read as the look reads it
 *  (render/partyOver.ts): g.partyOver's own `ease` (or a number), or with only its start `at`, eased in over `secs`; else the
 *  debug start (?partyover=<s>); 0 in a game without it. */
export function partyOverEase(g: { clock: { time: number } }, debugAt: number | null = null, secs = 12): number {
  const p = (g as { partyOver?: number | { ease?: number; at?: number } | null }).partyOver;
  const e = typeof p === "number" ? p : typeof p?.ease === "number" ? p.ease : null;
  if (e !== null) return Number.isFinite(e) ? Math.max(0, Math.min(1, e)) : 0;
  const at = typeof p === "object" && typeof p?.at === "number" ? p.at : debugAt;
  return at === null ? 0 : Math.max(0, Math.min(1, (g.clock.time - at) / secs));
}

export function musicMix(g: Game, at: { x: number; z: number }): MusicMix {
  const M = g.tuning.music, w = at, time = g.clock.time, d = g.map.dancefloor;
  const sources: { x: number; z: number; loud: number; damage: number }[] = [];
  // The home ring: its share of speakers on, its damage from the speakers' states.
  const n = d.speakers.length, on = speakersOn(g.party, g.map, time, n);
  if (on > 0) {
    let dmg = 0, live = 0;
    for (const s of g.speakers) { dmg += s === "damaged" ? 0.5 : s === "destroyed" ? 1 : 0; live += s === "destroyed" ? 0 : 1; }
    if (live > 0) sources.push({ x: d.x, z: d.z, loud: (on / n) * (live / n), damage: dmg / n });
  }
  // Every partified area's soundsystem, once it has risen.
  // Their damage is a siege's (rules/combat.ts): the crunch grows as their health goes.
  for (const [key, a] of g.party.areas) if (a.soundsystem && time >= a.at + g.tuning.party.transition) {
    const h = g.combat?.sounds.get(key);
    sources.push({ x: a.soundsystem.x, z: a.soundsystem.z, loud: 1, damage: h ? 1 - h.hp / h.max : 0 });
  }
  let best = { level: 0, damage: 0, distance: Infinity };
  for (const s of sources) {
    const dist = Math.hypot(s.x - w.x, s.z - w.z), near = nearness(M, dist);
    const level = near * s.loud;
    if (level > best.level || (best.level === 0 && dist < best.distance)) best = { level, damage: s.damage * near, distance: dist };
  }
  return mixAt(M, best.level, best.damage, best.distance);
}

/** The mix `distance` metres from a source heard at `level` (1 right by it, 0 beyond farDist),
 *  with `damage` (0-1, scaled by nearness) heard from it. */
export function mixAt(M: Tuning["music"], level: number, damage: number, distance: number): MusicMix {
  const k = level;
  return {
    volume: M.floor + (1 - M.floor) * k,
    cutoff: M.muffle * Math.pow(M.clear / M.muffle, k), // log between muffled and clear
    distort: Math.min(1, damage * M.distort),
    distance,
  };
}

/** How near `distance` metres is, 1 within nearDist to 0 at farDist. */
export const nearness = (M: Tuning["music"], distance: number) => 1 - Math.min(1, Math.max(0, (distance - M.nearDist) / Math.max(1, M.farDist - M.nearDist)));

/** The mix muffled in a sleeping legend's clearing (Ed, 2026-10-06: "the current music becomes
 *  very muffled"), by `amount` (0 none to 1 fully in, eased by the platform): its low-pass closed
 *  down to `circle.muffle` Hz and its volume down to `circle.quiet` of itself. */
export function muffled(M: Tuning["music"], mix: MusicMix, amount: number): MusicMix {
  const k = Math.max(0, Math.min(1, amount));
  if (k <= 0) return mix;
  const to = Math.min(mix.cutoff, M.circle.muffle);
  return { ...mix, cutoff: mix.cutoff * Math.pow(to / mix.cutoff, k), volume: mix.volume * (1 - (1 - M.circle.quiet) * k) };
}
