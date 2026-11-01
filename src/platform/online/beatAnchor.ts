import type { BeatClock } from "../../rules/beat";
/** The host's audio-stall anchor, not an input supplied by a guest. Copy only finite clock fields. */
export function beatAnchor(value: unknown): BeatClock | null {
  if (!value || typeof value !== "object") return null;
  const c = value as BeatClock;
  if (!["base", "segs", "wave"].every(key => Object.hasOwn(c, key)) || !Number.isFinite(c.base) || c.base <= 0 || !Number.isSafeInteger(c.wave) || c.wave < 0 || !Array.isArray(c.segs) || !c.segs.length || c.segs.length > 10000) return null;
  if (c.segs.some((s, i) => !s || ![s.time, s.beat, s.bpm, s.bpmTo, s.dur].every(Number.isFinite) || s.bpm <= 0 || s.bpmTo <= 0 || s.dur < 0 || i > 0 && s.time < c.segs[i - 1].time)) return null;
  const values: Record<string, unknown> = { base: c.base, segs: c.segs.map(s => ({ time: s.time, beat: s.beat, bpm: s.bpm, bpmTo: s.bpmTo, dur: s.dur })), wave: c.wave };
  for (const key of ["bonus", "bonusAt", "shift"] as const) if (c[key] !== undefined) {
    if (!Number.isFinite(c[key])) return null; values[key] = c[key];
  }
  // NightSnapshot's graph retains object-key order. Keep the host's known-field order as well as its values.
  return Object.fromEntries(Object.keys(c).filter(key => Object.hasOwn(values, key)).map(key => [key, values[key]])) as unknown as BeatClock;
}
