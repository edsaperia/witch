import type { Controls } from "../../rules/game";
import { ONLINE_TIMING } from "./inputLease";

const edges = ["toggleMode", "sigil", "place", "hat", "cycle", "cycleBack", "spell", "castParty", "dash"] as const;
const held = ["fire", "sigilHeld", "hatHold", "held", "autoTalk", "talkHeld", "pausePage"] as const;
const axes = ["moveX", "moveZ", "aimX", "aimZ"] as const;
const neutral = (): Controls => ({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false });

/** Copy an explicit wire allowlist: no debug commands, callbacks, world state or player ID. */
export function wireControls(input: unknown): Controls | null {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const value = input as Record<string, unknown>, result = neutral();
  for (const key of axes) if (value[key] !== undefined) {
    if (typeof value[key] !== "number" || !Number.isFinite(value[key]) || Math.abs(value[key]) > 1) return null;
    result[key] = value[key];
  }
  for (const key of [...edges, ...held]) if (value[key] !== undefined) {
    if (typeof value[key] !== "boolean") return null;
    result[key] = value[key];
  }
  return result;
}

/** Host samples once per frame; stepGame retains edges until its next fixed step. */
export function guestInput(heldInputMs: number = ONLINE_TIMING.heldInputMs) {
  if (!Number.isFinite(heldInputMs) || heldInputMs < 0) throw new Error("Invalid input expiry");
  let current = neutral(), receivedAt = -Infinity, sequence = -1;
  const pending: Partial<Controls> = {};
  return {
    accept(payload: unknown, now: number): boolean {
      if (!payload || typeof payload !== "object" || !Number.isFinite(now) || now < receivedAt) return false;
      const p = payload as Record<string, unknown>;
      if (!Number.isSafeInteger(p.sequence) || (p.sequence as number) < 0 || (p.sequence as number) <= sequence) return false;
      const controls = wireControls(p.controls); if (!controls) return false;
      for (const key of edges) if (controls[key]) pending[key] = true;
      current = controls; receivedAt = now; sequence = p.sequence as number;
      return true;
    },
    sample(now: number): Controls {
      if (!Number.isFinite(now) || now < receivedAt) throw new Error("Invalid host clock");
      const live = now - receivedAt < heldInputMs, result = live ? { ...current } : neutral();
      for (const key of edges) { result[key] = live && !!pending[key]; delete pending[key]; }
      return result;
    },
    clear(): void { current = neutral(); receivedAt = -Infinity; sequence = -1; for (const key of edges) delete pending[key]; },
  };
}
