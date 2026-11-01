/** Ordinary overlays never vote to pause an online night. Solo captures/restores its original pause state. */
export function overlayPause(clock: { paused: boolean }, opening: boolean, solo: boolean, previous: boolean): boolean {
  if (!solo) return previous;
  if (opening) { const before = clock.paused; clock.paused = true; return before; }
  clock.paused = previous; return previous;
}
