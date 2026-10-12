// Making the sea chart ahead (Ed, 2026-10-12: "Generating the map on the map screen is slow; can we do it earlier, before we need
// to show it? I believe it doesn't change through the entire campaign except for the home island"): once a night has started
// and its forest is grown, a worker of its own makes every island the chart will show, one at a time and off the page's thread,
// and keeps each (app/chartCache.ts); the map table, and chart.html in this browser, then open on them at once. What's kept is
// kept across visits, so later nights only check it (home again when what she's found grows: its size).
import { KIND_NAMES } from "../rules/rosters";
import { islandAt } from "./chartLayout";
import type { OutlineAsk, WarmNote } from "./chartOutlines.worker";

/** The outlines' land sampled every so many metres: the chart's pixels are far coarser. */
export const OUTLINE_STEP = 32;

/** Every island the chart shows, home and the nearest first. */
export function chartIslandIds(world: number): string[] {
  const d = (id: string) => { const a = islandAt(id, world); return a ? Math.hypot(a.x, a.y) : 9; };
  return ["home", ...[...KIND_NAMES].sort((a, b) => d(a) - d(b))];
}

let running: Worker | null = null;

/** Make and keep the chart's islands for `world` and what she's `found`, in the background; `done` with how many were made and
 *  how many were already kept; `progress` as each is kept. Once at a time (a second call while one runs does nothing). */
export function warmChart(world: number, found: string[], done?: (made: number, kept: number) => void, progress?: (id: string, made: boolean) => void): void {
  if (running) return;
  let w: Worker;
  try { w = new Worker(new URL("./chartOutlines.worker.ts", import.meta.url), { type: "module" }); } catch { return; }
  running = w;
  w.onmessage = (e: MessageEvent<WarmNote>) => {
    if (!("warmDone" in e.data)) { progress?.(e.data.warmed, e.data.made); return; }
    w.terminate(); running = null;
    done?.(e.data.made, e.data.kept);
  };
  w.onerror = () => { w.terminate(); running = null; };
  w.postMessage({ world, found, ids: chartIslandIds(world), step: OUTLINE_STEP, warm: true } satisfies OutlineAsk);
}

/** Stop making them (the chart has opened and makes its own). */
export function stopWarmChart(): void { running?.terminate(); running = null; }
