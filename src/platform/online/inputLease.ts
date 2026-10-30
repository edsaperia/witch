export const ONLINE_TIMING = { heldInputMs: 250, dropMs: 5000 } as const;

/** Held controls only, never one-shot edges. Host samples on its clock; arrival never steps the game.
 * Connection liveness is tracked separately by the relay, including heartbeats. */
export function inputLease<T>(neutral: () => T, heldInputMs: number = ONLINE_TIMING.heldInputMs, dropMs: number = ONLINE_TIMING.dropMs) {
  if (!(Number.isFinite(heldInputMs) && Number.isFinite(dropMs) && heldInputMs >= 0 && dropMs > heldInputMs)) throw new Error("Invalid online timing");
  let last: T, at = -Infinity, sequence = -1;
  return {
    accept(input: T, nextSequence: number, receivedAt: number): boolean {
      if (!Number.isSafeInteger(nextSequence) || nextSequence < 0 || nextSequence <= sequence || !Number.isFinite(receivedAt) || receivedAt < at) return false;
      last = structuredClone(input); at = receivedAt; sequence = nextSequence;
      return true;
    },
    sample(now: number): { input: T; dropped: boolean } {
      if (!Number.isFinite(now) || now < at) throw new Error("Online clock must be monotonic");
      return { input: now - at < heldInputMs ? structuredClone(last) : neutral(), dropped: now - at >= dropMs };
    },
  };
}
