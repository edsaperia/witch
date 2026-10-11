// The sea chart's islands' real outlines (hotel, rules/islandShape.ts islandOutline: the shape each island grows to), made off the
// page's thread: each is exact and slow (about 0.1 s for a phase 1 island to 2 s or more for a phase 5 one), about a minute for all
// 65, so the chart shows each island's round coast first and swaps in its outline as it arrives. The page sends the world, the
// kinds she's found (home's size) and the islands in the order wanted; `{ first }` moves one to the front (the one just chosen).
import { islandOutline } from "../rules/islandShape";
import { homeIsland, islandOf, knownKinds } from "../rules/rosters";
import { TUNING } from "../rules/tuning";

/** The page's asks: the islands' outlines to make (`ids` in order), or one to make next. */
export type OutlineAsk = { world: number; found: string[]; ids: string[]; step: number } | { first: string };
/** Each island's outline as it's made: its loops (x, z in metres from its home's middle; `sea` a coast, else a lake's shore). */
export interface OutlineDone { id: string; world: number; loops: { pts: Float32Array; sea: boolean }[]; box: { minX: number; maxX: number; minZ: number; maxZ: number }; far: number }

let queue: string[] = [], job: { world: number; found: string[]; step: number } | null = null, busy = false;
const post = (m: OutlineDone, t: Transferable[]) => (self as unknown as { postMessage(m: unknown, t: Transferable[]): void }).postMessage(m, t);

function next(): void {
  const id = queue.shift();
  if (!id || !job) { busy = false; return; }
  const { world, found, step } = job;
  const island = id === "home" ? homeIsland(world, knownKinds(found)) : islandOf(id, world);
  if (island) {
    const o = islandOutline(island, TUNING, step), loops = o.loops.map(l => ({ pts: l.pts.slice(), sea: l.sea }));
    post({ id, world, loops, box: o.box, far: o.far }, loops.map(l => l.pts.buffer));
  }
  setTimeout(next, 0); // (between islands, so a `first` can come in)
}

self.onmessage = (e: MessageEvent<OutlineAsk>) => {
  const m = e.data;
  if ("first" in m) { const i = queue.indexOf(m.first); if (i > 0) { queue.splice(i, 1); queue.unshift(m.first); } return; }
  job = { world: m.world, found: m.found, step: m.step }; queue = [...m.ids];
  if (!busy) { busy = true; setTimeout(next, 0); }
};
