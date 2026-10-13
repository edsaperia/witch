// The audio output's buffer (Ed's playtest, v3167: "music is still cutting out"; his overlay: "device under-ran 474× (4922 ms)",
// lat 10+33 ms, the valve already at its last step). Every under-run was one 10 ms buffer the device asked for and didn't get in
// time: on his laptop, busy drawing at 34 fps, a 10 ms buffer is too thin. The tuning's "balanced" latency category gives Chrome the
// same 10 ms as "interactive" (measured: tools/music-lab/latency.cjs), so the context now asks for a buffer in seconds
// (`music.buffer`), and a browser that under-runs anyway remembers to ask for twice as much next load (`witch.audioBuffer`,
// up to MAX_BUFFER). The music is scheduled early by the context's own latency (musicEngine.ts `lead`), so it stays on the beat
// the game shows; only the sound effects come that much later.

/** The most it will ask for (s). */
export const MAX_BUFFER = 0.24;
/** Under-runs in one load that make the next ask for twice the buffer. */
export const BUMP_AT = 20;
const KEY = "witch.audioBuffer";

/** The latencyHint to make the context with: `?latency=` (a category, or seconds) for one load; else the buffer this browser
 *  learnt it needs, if bigger than the tuning's; else the tuning's buffer (seconds, 0: none) or its category. */
export function bufferHint(buffer: number | undefined, category: AudioContextLatencyCategory | undefined, query: string | null, learnt: number | null): AudioContextLatencyCategory | number {
  if (query === "interactive" || query === "balanced" || query === "playback") return query;
  if (query !== null && query !== "" && Number.isFinite(+query) && +query > 0) return Math.min(MAX_BUFFER, +query);
  const want = Math.max(buffer ?? 0, learnt ?? 0);
  return want > 0 ? Math.min(MAX_BUFFER, want) : category ?? "interactive";
}

/** After `underruns` in this load with the context's buffer `base` (s, its baseLatency): the buffer to ask for next load, or null
 *  (no change). Twice what it has, at least 60 ms, at most MAX_BUFFER. */
export function nextBuffer(underruns: number | null, base: number, learnt: number | null): number | null {
  if (underruns === null || underruns < BUMP_AT) return null;
  const next = Math.min(MAX_BUFFER, Math.max(0.06, base * 2));
  return next > (learnt ?? 0) + 0.005 ? next : null;
}

/** The buffer this browser learnt it needs (s), or null. */
export function learntBuffer(): number | null {
  try { const v = Number(localStorage.getItem(KEY)); return Number.isFinite(v) && v > 0 ? v : null; } catch { return null; }
}
/** Remember it for the next load. */
export function learnBuffer(s: number): void { try { localStorage.setItem(KEY, String(Math.round(s * 1000) / 1000)); } catch { /* no storage */ } }
