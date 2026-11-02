import type { Controls } from "../../rules/game";
import { ONLINE_TIMING } from "./inputLease";

const edges = ["toggleMode", "sigil", "place", "hat", "cycle", "cycleBack", "spell", "castParty", "dash"] as const;
export const INPUT_EDGES = edges;
const held = ["fire", "sigilHeld", "hatHold", "held", "autoTalk", "talkHeld", "pausePage"] as const;
const axes = ["moveX", "moveZ"] as const;
const neutral = (): Controls => ({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false });

/** Copy an explicit wire allowlist: no debug commands, callbacks, world state or player ID. */
export function wireControls(input: unknown): Controls | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const value = input as Record<string, unknown>, result = neutral();
  for (const key of axes) if (value[key] !== undefined) {
    if (typeof value[key] !== "number" || !Number.isFinite(value[key]) || Math.abs(value[key]) > 1) return null;
    result[key] = value[key];
  }
  // Cursor aim is a world-space displacement (View.aimAt), unlike movement's unit axes.
  const aim = [value.aimX ?? 0, value.aimZ ?? 0];
  if (aim.some(n => typeof n !== "number" || !Number.isFinite(n))) return null;
  const [x, z] = aim as number[], scale = Math.max(1, Math.abs(x), Math.abs(z));
  const length = Math.max(1, Math.hypot(x / scale, z / scale));
  result.aimX = x / scale / length; result.aimZ = z / scale / length;
  for (const key of [...edges, ...held]) if (value[key] !== undefined) {
    if (typeof value[key] !== "boolean") return null;
    result[key] = value[key];
  }
  return result;
}

/** Latest controls serve host-owned actions; ordered locomotion quanta are consumed separately per fixed step. */
export function guestInput(heldInputMs: number = ONLINE_TIMING.heldInputMs, jitterTicks = 3) {
  if (!Number.isFinite(heldInputMs) || heldInputMs < 0) throw new Error("Invalid input expiry");
  if (!Number.isSafeInteger(jitterTicks) || jitterTicks < 0 || jitterTicks > 3) throw new Error("Invalid guest jitter depth");
  let current = neutral(), receivedAt = -Infinity, sequence = -1;
  let applied = -1, started = false, warmTicks = 0, underruns = 0, discarded = 0;
  let holdSince: number | null = null, longestHoldMs = 0, lastConsumeAt = 0;
  const measureHold = (now: number, motion: boolean) => {
    if (!Number.isFinite(now)) return;
    lastConsumeAt = Math.max(lastConsumeAt, now);
    if (holdSince !== null) longestHoldMs = Math.max(longestHoldMs, lastConsumeAt - holdSince);
    if (motion) holdSince = null; else holdSince ??= lastConsumeAt;
  };
  const ticks: { sequence: number; controls: Controls; at: number }[] = [];
  const pending: Partial<Controls> = {};
  return {
    get sequence() { return applied; },
    get receivedSequence() { return sequence; },
    get stats() { return { applied, received: sequence, queued: ticks.length, underruns, discarded, longestHoldMs, currentHoldMs: holdSince === null ? 0 : lastConsumeAt - holdSince }; },
    accept(payload: unknown, now: number): boolean {
      if (!payload || typeof payload !== "object" || !Number.isFinite(now) || now < receivedAt) return false;
      const p = payload as Record<string, unknown>;
      if (!Number.isSafeInteger(p.sequence) || (p.sequence as number) < 0 || (p.sequence as number) <= sequence) return false;
      const controls = wireControls(p.controls); if (!controls) return false;
      if (ticks.length >= 120) { ticks.shift(); discarded++; }
      ticks.push({ sequence: p.sequence as number, controls, at: now });
      for (const key of edges) if (controls[key]) pending[key] = true;
      current = controls; receivedAt = now; sequence = p.sequence as number;
      return true;
    },
    sample(now: number): Controls {
      // rAF can precede a packet received earlier in the same frame. Never throw in a frame.
      const age = Number.isFinite(now) ? Math.max(0, now - receivedAt) : Infinity;
      const live = age < heldInputMs, result = live ? { ...current } : neutral();
      for (const key of edges) { result[key] = live && !!pending[key]; delete pending[key]; }
      return result;
    },
    /** Called once per actual physics quantum, not once per render frame. */
    consume(now: number): { sequence: number; controls: Controls; motion: boolean } {
      if (!started && ticks.length) warmTicks++;
      if (!started && (ticks.length >= Math.max(1, jitterTicks) || warmTicks > jitterTicks || ticks[0] && now - ticks[0].at >= jitterTicks * 1000 / 60)) started = true;
      if (!started) { measureHold(now, false); return { sequence: applied, controls: neutral(), motion: false }; }
      const tick = ticks.shift();
      if (tick) { measureHold(now, true); applied = tick.sequence; return { sequence: applied, controls: { ...tick.controls }, motion: true }; }
      underruns++;
      measureHold(now, false);
      return { sequence: applied, controls: neutral(), motion: false };
    },
    suspend(): void { discarded += ticks.length; ticks.length = 0; started = false; warmTicks = 0; holdSince = null; },
    clear(): void { current = neutral(); receivedAt = -Infinity; sequence = applied = -1; ticks.length = 0; started = false; warmTicks = 0; underruns = discarded = 0; holdSince = null; longestHoldMs = lastConsumeAt = 0; for (const key of edges) delete pending[key]; },
  };
}
