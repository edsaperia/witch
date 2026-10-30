// Coordinator6520516411: only a detached, actually observed carried stack.
import type { Observation } from "./observe";
export function newQuestOffering() {
  let pending: string | null = null;
  function choose(wants: string, carried: Observation["carried"]): "place" | "cycle" | "wait" {
    const signature = JSON.stringify(carried.map(c => [c.id, c.species]));
    if (carried.at(-1)?.species === wants) { pending = null; return "place"; }
    // One cycle pulse, then wait for a changed delayed observation. Repeated
    // inputs against the old stack can rotate past the wanted bottom again.
    if (pending === signature) return "wait";
    pending = null;
    if (carried.length > 1 && carried.some(c => c.species === wants)) { pending = signature; return "cycle"; }
    return "wait";
  }
  return { choose, snapshot: () => ({ pending }) };
}
