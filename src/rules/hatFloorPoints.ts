/** Ordered spawn occupancy, independent of spell IDs. Empty points are filled in numeric order.
 * Overflow is retained as a queue, never silently discarded; a freed point is filled on refresh.
 * Legacy arrays already describe physical floor occupants, so retain their indices and empty gaps. */
export interface HatFloorPointsState { hats?: string[]; hatFloorVersion?: 2; hatOverflow?: string[]; hatReserved?: number[] }
export function reconcileHatPoints(state: HatFloorPointsState, count: number, excluded: ReadonlySet<string> = new Set()): string[] {
  if (!Number.isInteger(count) || count < 1) throw Error("Hat spawn points must have positive capacity");
  const seen = new Set(excluded), values = state.hats ?? [], floor = Array<string>(count).fill(""), queue: string[] = [];
  values.forEach((id, i) => {
    if (!id || seen.has(id)) return;
    seen.add(id); if (i < count) floor[i] = id; else queue.push(id);
  });
  for (const id of state.hatOverflow ?? []) if (id && !seen.has(id)) { seen.add(id); queue.push(id); }
  const free = () => floor.findIndex((id, i) => !id && !state.hatReserved?.includes(i));
  while (queue.length && free() >= 0) floor[free()] = queue.shift()!;
  // Keep the array identity: callers may hold it while a new find arrives.
  if (state.hats) state.hats.splice(0, state.hats.length, ...floor); else state.hats = floor;
  state.hatFloorVersion = 2; state.hatOverflow = queue;
  return state.hats;
}
export function spawnAtLowestEmpty(state: HatFloorPointsState, id: string, count: number, excluded: ReadonlySet<string> = new Set()): number | null {
  const floor = reconcileHatPoints(state, count, excluded);
  if (!id || excluded.has(id)) return null;
  const existing = floor.indexOf(id); if (existing >= 0) return existing;
  if (state.hatOverflow!.includes(id)) return null;
  const slot = floor.findIndex((value, i) => !value && !state.hatReserved?.includes(i));
  if (slot < 0) { state.hatOverflow!.push(id); return null; }
  floor[slot] = id; return slot;
}
