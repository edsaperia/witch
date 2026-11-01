// Making the sea chart ahead (Ed, 2026-10-12: "Generating the map on the map screen is slow; can we do it earlier, before we need
// to show it? I believe it doesn't change through the entire campaign except for the home island"): once a night has started
// and its forest is grown, a worker of its own makes reachable islands while she's in the treehouse, one at a time off the page's thread,
// and keeps each (app/chartCache.ts); the map table, and chart.html in this browser, then open on them at once. What's kept is
// kept across visits, so later nights only check it (home again when what she's found grows: its size).
import { islandOf, isPlaceholder, KIND_NAMES } from "../rules/rosters";
import { emptySave, unlocked } from './chartSave';
import { islandAt } from "./chartLayout";
import type { OutlineAsk, WarmNote } from "./chartOutlines.worker";
import { postTracedJob } from "./workerJobTrace";

/** The outlines' land sampled every so many metres: the chart's pixels are far coarser. */
export const OUTLINE_STEP = 32;

/** An island's phase on the chart: home 0, a kind's island its own (rules/rosters.ts). */
export const islandPhase = (id: string, world: number): number => (id === "home" ? 0 : islandOf(id, world)?.phase ?? 1);

/** The order the outlines are made in (Ed, 2026-10-19: "it should be in phase order (earlier phases first)"): by phase, and within a
 *  phase the nearest to `from` first. */
export function outlineOrder<T extends { id: string; x: number; y: number; phase: number }>(islands: readonly T[], from: { x: number; y: number }): string[] {
  const d = (i: T) => Math.hypot(i.x - from.x, i.y - from.y);
  return [...islands].sort((a, b) => a.phase - b.phase || d(a) - d(b)).map(i => i.id);
}

/** The order the open chart wants its islands in (the chart meshes job, 2026-10-19: what she needs first): home and the islands
 *  she can sail to, the nearest the chosen first; then the rest in phase order (outlineOrder). */
export function chartOrder<T extends { id: string; x: number; y: number; phase: number; sail: boolean }>(islands: readonly T[], from: { x: number; y: number }): string[] {
  const d = (i: T) => Math.hypot(i.x - from.x, i.y - from.y);
  const mine = islands.filter(i => i.id === "home" || i.sail).sort((a, b) => (a.id === "home" ? -1 : b.id === "home" ? 1 : d(a) - d(b)));
  return [...mine.map(i => i.id), ...outlineOrder(islands.filter(i => !mine.includes(i)), from)];
}

/** Every island the chart shows, in phase order (home first), the nearest first within a phase. */
export function chartIslandIds(world: number): string[] {
  const all = ["home", ...KIND_NAMES].map(id => { const a = islandAt(id, world); return { id, x: a?.x ?? 9, y: a?.y ?? 0, phase: islandPhase(id, world) }; });
  return outlineOrder(all, { x: 0, y: 0 });
}

let running: Worker | null = null;

/** Only speculative work is restricted: chartIslandIds/chartOrder still include every demand island. */
export function reachableChartIslandIds(world: number, found: string[]): string[] {
  const reachable = new Set(unlocked({ ...emptySave(world), found }));
  return chartIslandIds(world).filter(id => reachable.has(id) && (id === 'home' || !isPlaceholder(id)));
}

/** Make and keep the chart's islands for `world` and what she's `found`, in the background; `done` with how many were made and
 *  how many were already kept; `progress` as each is kept. Once at a time (a second call while one runs does nothing). */
export function warmChart(world: number, found: string[], done?: (made: number, kept: number) => void, progress?: (id: string, made: boolean) => void, ids = reachableChartIslandIds(world, found), failed?: () => void): void {
  if (running) return;
  let w: Worker;
  try { w = new Worker(new URL("./chartOutlines.worker.ts", import.meta.url), { type: "module" }); } catch { failed?.(); return; }
  running = w;
  w.onmessage = (e: MessageEvent<WarmNote>) => {
    if (running !== w) return;
    if (!("warmDone" in e.data)) { progress?.(e.data.warmed, e.data.made); return; }
    w.terminate(); running = null;
    done?.(e.data.made, e.data.kept);
  };
  w.onerror = () => { if (running !== w) return; w.terminate(); running = null; failed?.(); };
  postTracedJob(w, { world, found, ids, step: OUTLINE_STEP, warm: true } satisfies OutlineAsk, 'chart:request', 'warm', ids.length);
}

/** Stop making them (the chart has opened and makes its own). */
export function stopWarmChart(): void { const worker = running; running = null; worker?.terminate(); }
