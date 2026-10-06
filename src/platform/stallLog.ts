// The stall log (Ed, 2026-10-06: "smooth most of the time, with occasional freezes of about 0.5
// seconds"): every frame that took 100 ms or more, from one to the next or in its own work, with
// what it spent the time on (the rules' step and the view's biggest parts), and the browser's
// own account of long frames where it gives one (the Long Animation Frames API: the scripts that
// ran, including work outside our frame, like the art workers' results arriving; else long
// tasks, with no detail). The debug overlay shows the count and the last; the playtest log (L)
// keeps the last STALLS_KEPT, so a playtest tells us what froze. Browser-side, outside the rules.

export interface Stall {
  /** Game time (s) and the time on the page (s). */
  t: number;
  at: number;
  /** From the last frame to this one, and this frame's own work (ms). */
  gap: number;
  work: number;
  /** The rules' step (ms) and the view's biggest parts (ms, biggest first). */
  step: number;
  parts: [string, number][];
  /** The browser's long frames or tasks that ended since the last frame: their length and, where it says, the scripts that took the most. */
  browser: { ms: number; scripts?: string[] }[];
  /** Where she was and doing what. */
  mode: string;
  x: number;
  z: number;
  wave: number;
  creatures: number;
}

export const STALL_MS = 100;
const STALLS_KEPT = 50;

interface LoafScript { duration: number; invoker?: string; sourceFunctionName?: string; sourceURL?: string; sourceCharPosition?: number }
interface LoafEntry extends PerformanceEntry { scripts?: LoafScript[] }

export class StallLog {
  readonly stalls: Stall[] = [];
  count = 0;
  private pending: { ms: number; scripts?: string[] }[] = [];

  constructor() {
    // The browser's long frames (Chrome 123+), else its long tasks; neither is there everywhere.
    const watch = (type: string, take: (e: PerformanceEntry) => void): boolean => {
      try {
        if (!PerformanceObserver.supportedEntryTypes?.includes(type)) return false;
        new PerformanceObserver(list => { for (const e of list.getEntries()) if (e.duration >= STALL_MS) take(e); }).observe({ type, buffered: false });
        return true;
      } catch { return false; }
    };
    const loaf = watch("long-animation-frame", e => {
      const scripts = ((e as LoafEntry).scripts ?? []).slice().sort((a, b) => b.duration - a.duration).slice(0, 3)
        .map(s => `${Math.round(s.duration)} ms ${s.invoker ?? ""} ${s.sourceFunctionName || "?"} ${(s.sourceURL ?? "").split("/").pop()}:${s.sourceCharPosition ?? ""}`.trim());
      this.pending.push({ ms: Math.round(e.duration), scripts });
    });
    if (!loaf) watch("longtask", e => this.pending.push({ ms: Math.round(e.duration) }));
  }

  /** Call once a frame, after its work: notes it if it stalled. `parts`: the view's parts (ms). */
  frame(s: Omit<Stall, "parts" | "browser" | "at"> & { parts: Record<string, number> }): void {
    const browser = this.pending;
    this.pending = [];
    if (s.gap < STALL_MS && s.work < STALL_MS && !browser.length) return;
    const parts = Object.entries(s.parts).filter(([, v]) => v >= 1).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([k, v]) => [k, Math.round(v)] as [string, number]);
    this.count++;
    this.stalls.push({ ...s, gap: Math.round(s.gap), work: Math.round(s.work), step: Math.round(s.step * 10) / 10, t: Math.round(s.t * 10) / 10, at: Math.round(performance.now() / 100) / 10, x: Math.round(s.x), z: Math.round(s.z), parts, browser });
    if (this.stalls.length > STALLS_KEPT) this.stalls.shift();
    console.warn(`stall: ${Math.round(s.gap)} ms (work ${Math.round(s.work)}, step ${s.step.toFixed(1)}; ${parts.map(([k, v]) => `${k} ${v}`).join(", ")})`, browser);
  }

  /** The overlay's line. */
  line(): string {
    const l = this.stalls[this.stalls.length - 1];
    if (!l) return `stalls none over ${STALL_MS} ms`;
    const why = [`step ${l.step}`, ...l.parts.slice(0, 3).map(([k, v]) => `${k} ${v}`)].join(", ");
    const b = l.browser[0]?.scripts?.[0];
    return `stalls ${this.count} over ${STALL_MS} ms; last ${l.gap} ms at ${l.t} s (${why}${b ? `; ${b}` : ""})`;
  }
}
