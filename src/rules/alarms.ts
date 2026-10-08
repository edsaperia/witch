// The soundsystem alarm (Ed, 2026-10-06: "We should have an indicator for when a soundsystem or speaker is being attacked
// offscreen. It can look like the 🎶 indicator, but with 🔇"): which soundsystems are under attack now, read from the
// frame's combat events (rules/combat.ts soundHit, soundDestroyed; "home" is the dancefloor's ring of speakers). Each one
// hit becomes an alarm, its health followed, until `linger` seconds pass without a blow; one that falls is kept `fall`
// seconds more (the view flashes it and fades it). The view (render/alarm.ts) draws the newest `most` that are off screen.
// No drawing here; the view keeps the state and steps it each frame.
import type { CombatEvent, SoundHealth } from "./combat";

export interface AlarmTuning { /** Seconds an alarm stays after the last blow. */ linger: number; /** Seconds a fallen one stays, flashing and fading. */ fall: number; /** How many show at once (the most recently hit). */ most: number }
export const ALARM_DEFAULTS: AlarmTuning = { linger: 4, fall: 1.2, most: 3 };

export interface Alarm {
  /** The soundsystem's key (its area's; "home" the dancefloor). */
  key: string; x: number; z: number; hp: number; max: number;
  /** When this attack began, when it was last hit, and how many blows so far. */
  startedAt: number; hitAt: number; hits: number;
  /** When it fell (null while it stands). */
  fellAt: number | null;
}
export interface Alarms { byKey: Map<string, Alarm>; /** The events array last read (each frame's is a new one), so a frame drawn twice counts its blows once. */ read: readonly CombatEvent[] | null }
export const newAlarms = (): Alarms => ({ byKey: new Map(), read: null });

/** Reads a frame's blows on soundsystems into the alarms and drops the ones gone quiet. Returns the keys whose attack began
 *  this frame (for a cue). */
export function stepAlarms(A: Alarms, sounds: ReadonlyMap<string, SoundHealth>, events: readonly CombatEvent[], time: number, T: AlarmTuning = ALARM_DEFAULTS): string[] {
  const started: string[] = [];
  if (events !== A.read) {
    A.read = events;
    for (const e of events) {
      if (e.kind !== "soundHit" && e.kind !== "soundDestroyed") continue;
      const h = sounds.get(e.key);
      let a = A.byKey.get(e.key);
      if (!a || (a.fellAt !== null && e.kind === "soundHit")) {
        a = { key: e.key, x: h?.x ?? e.x, z: h?.z ?? e.z, hp: h?.hp ?? 0, max: h?.max ?? 1, startedAt: e.at, hitAt: e.at, hits: 0, fellAt: null };
        A.byKey.set(e.key, a); started.push(e.key);
      }
      if (e.kind === "soundHit") { a.hits++; a.hitAt = Math.max(a.hitAt, e.at); }
      else a.fellAt = e.at;
    }
  }
  for (const [key, a] of A.byKey) {
    const h = sounds.get(key);
    if (h) { a.hp = Math.max(0, h.hp); a.max = Math.max(1, h.max); a.x = h.x; a.z = h.z; if (h.hp <= 0 && a.fellAt === null) a.fellAt = time; }
    if (a.fellAt !== null ? time - a.fellAt > T.fall : time - a.hitAt > T.linger) A.byKey.delete(key);
  }
  return started;
}

/** The alarms to show: the most recently hit first, at most T.most. */
export function shownAlarms(A: Alarms, T: AlarmTuning = ALARM_DEFAULTS): Alarm[] {
  return [...A.byKey.values()].sort((p, q) => q.hitAt - p.hitAt || (p.key < q.key ? -1 : 1)).slice(0, T.most);
}

/** Debug (?debug=attack): blows on up to `n` standing soundsystems, the farthest from (x, z) first, `frac` of each one's
 *  health, never taking one below `floor` of it (there it's mended to full, so the debug goes on), each as a soundHit event (so the alarm, the sparks and the meters see it
 *  as a real one). Returns the keys hit. */
export function debugBlows(sounds: Map<string, SoundHealth>, events: CombatEvent[], x: number, z: number, time: number, n = 2, frac = 0.04, floor = 0.15): string[] {
  const list = [...sounds.entries()].filter(([, h]) => h.hp > 0).sort(([, p], [, q]) => Math.hypot(q.x - x, q.z - z) - Math.hypot(p.x - x, p.z - z)).slice(0, n);
  for (const [key, h] of list) { h.hp = h.hp - h.max * frac < h.max * floor ? h.max : h.hp - h.max * frac; events.push({ kind: "soundHit", x: h.x, z: h.z, at: time, key }); }
  return list.map(([k]) => k);
}
