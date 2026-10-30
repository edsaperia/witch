// Ordinary play advances one scenery slice per frame, even when the camera has moved again.
// Explicit preparation can finish the old list and build the new one before anything is shown.
export type SceneryJob = Generator<void, void, void>;

export function advanceScenery(current: SceneryJob | undefined, make: () => SceneryJob | null, force = false): SceneryJob | null {
  if (force) {
    if (current) while (!current.next().done);
    const next = make();
    if (next) while (!next.next().done);
    return null;
  }
  const next = current ?? make();
  return next && !next.next().done ? next : null;
}
