// Music by proximity (Ed, 2026-10-04): one shared track, louder and clearer the nearer the witch
// is to a playing soundsystem, quiet and muffled in the deep forest, and distorted by damage
// nearby (a damaged soundsystem wobbles, crackles and drops out, scaled by its damage and how
// close she is). The home ring of speakers plays as one source at the dancefloor's centre, as
// loud as its share of speakers powered on, damaged as its speakers are. The numbers only: the
// platform plays them.
import type { Game } from "./game";
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

/** The music the witch hears now. */
export function musicMix(g: Game): MusicMix {
  const M = g.tuning.music, w = g.witch, time = g.clock.time, d = g.map.dancefloor;
  const sources: { x: number; z: number; loud: number; damage: number }[] = [];
  // The home ring: its share of speakers on, its damage from the speakers' states.
  const n = d.speakers.length, on = speakersOn(g.party, g.map, time, n);
  if (on > 0) {
    let dmg = 0, live = 0;
    for (const s of g.speakers) { dmg += s === "damaged" ? 0.5 : s === "destroyed" ? 1 : 0; live += s === "destroyed" ? 0 : 1; }
    if (live > 0) sources.push({ x: d.x, z: d.z, loud: (on / n) * (live / n), damage: dmg / n });
  }
  // Every partified area's soundsystem, once it has risen.
  for (const a of g.party.areas.values()) if (a.soundsystem && time >= a.at + g.tuning.party.transition) sources.push({ x: a.soundsystem.x, z: a.soundsystem.z, loud: 1, damage: 0 });
  let best = { level: 0, damage: 0, distance: Infinity };
  for (const s of sources) {
    const dist = Math.hypot(s.x - w.x, s.z - w.z), near = 1 - Math.min(1, Math.max(0, (dist - M.nearDist) / Math.max(1, M.farDist - M.nearDist)));
    const level = near * s.loud;
    if (level > best.level || (best.level === 0 && dist < best.distance)) best = { level, damage: s.damage * near, distance: dist };
  }
  const k = best.level; // 1 right by a source, 0 beyond farDist
  return {
    volume: M.floor + (1 - M.floor) * k,
    cutoff: M.muffle * Math.pow(M.clear / M.muffle, k), // log between muffled and clear
    distort: Math.min(1, best.damage * M.distort),
    distance: best.distance,
  };
}
