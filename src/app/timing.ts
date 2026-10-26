// The transition's timings in the playtest log (Ed, 2026-10-19, the transition review: "?timing=1, so one run on Ed's laptop
// gives real numbers"): each step of treehouse → sea chart → sail → new island → her decks is a performance mark (witch:*, and
// these: chart:open, chart:mounted, chart:island1, chart:islands, chart:sail, chart:flown, chart:go, game:frame1, game:arrived; the
// new opening's beats, opening:*, app/opening.ts; and each stage of the View's island build, witch:build-<stage>: render/slices.ts);
// with ?timing=1 (kept for the tab, so it follows the sail's new page), the marks and the main thread's long tasks are carried
// across the page's reload and written into the new page's run of the L log (`timing`), in wall-clock milliseconds from the
// first mark, with each step's own time.
import { sliceLog } from "../render/slices";

const KEY = "witch.timing", ON = "witch.timing.on";

const store = (): Storage | null => { try { return sessionStorage; } catch { return null; } };

/** Whether this tab times its transitions (?timing=1 once, then kept for the tab; ?timing=0 stops it). */
export function timingOn(params: URLSearchParams): boolean {
  const s = store();
  if (params.get("timing") === "1") s?.setItem(ON, "1");
  if (params.get("timing") === "0") { s?.removeItem(ON); s?.removeItem(KEY); }
  return s?.getItem(ON) === "1";
}

/** A step: a performance mark (named as above), always (they cost nothing). */
export function mark(name: string): void { try { performance.mark(name); } catch { /* no performance timeline */ } }

export interface TimingLine { name: string; at: number; page: number; ms?: number }
export interface Timing { steps: TimingLine[]; longTasks: { at: number; ms: number }[]; /** The sliced builds on this page (render/slices.ts): each one's slices, its longest step and the stage it was in (witch:build-<stage>). */ builds?: { what: string; ms: number; slices: number; longest: number; longestAt: string }[] }

const longTasks: { at: number; ms: number }[] = [];
let observing = false;
/** Watch the main thread's long tasks (over 50 ms) from here on (with ?timing=1). */
export function watchLongTasks(): void {
  if (observing || typeof PerformanceObserver === "undefined") return;
  observing = true;
  try { new PerformanceObserver(l => { for (const e of l.getEntries()) longTasks.push({ at: Math.round(performance.timeOrigin + e.startTime), ms: Math.round(e.duration) }); }).observe({ type: "longtask", buffered: true }); } catch { /* not in this browser */ }
}

/** This page's marks and long tasks, in wall-clock ms. */
function thisPage(page: number): Timing {
  const steps = performance.getEntriesByType("mark").filter(m => /^(witch|chart|game|opening):/.test(m.name)).map(m => ({ name: m.name, at: Math.round(performance.timeOrigin + m.startTime), page }));
  return { steps, longTasks: longTasks.slice() };
}

/** The page is leaving for the next island (the chart's sail): its marks kept for the next page. */
export function carryTiming(): void {
  const s = store();
  if (!s || s.getItem(ON) !== "1") return;
  try { s.setItem(KEY, JSON.stringify(thisPage(0))); } catch { /* full */ }
}

/** The whole transition so far: the last page's marks (if it sailed here) and this one's, from the first mark, each step with
 *  the time since the one before. */
export function transitionTiming(): Timing {
  let before: Timing = { steps: [], longTasks: [] };
  try { const t = store()?.getItem(KEY); if (t) before = JSON.parse(t) as Timing; } catch { /* none */ }
  const now = thisPage(1), steps = [...before.steps, ...now.steps].sort((a, b) => a.at - b.at), t0 = steps[0]?.at ?? 0;
  const out = steps.map((s, i) => ({ ...s, at: s.at - t0, ms: i ? s.at - steps[i - 1].at : 0 }));
  const longs = [...before.longTasks, ...now.longTasks].map(l => ({ at: l.at - t0, ms: l.ms })).filter(l => l.at >= 0);
  return { steps: out, longTasks: longs, builds: sliceLog.map(b => ({ what: b.what, ms: Math.round(b.ms), slices: b.slices, longest: Math.round(b.longest), longestAt: b.longestAt })) };
}

/** Done with what's carried (written into the log). */
export function clearCarried(): void { store()?.removeItem(KEY); }

/** The transition from the last sail on this page on (chart:sail), its times from there: on a page that's sailed many times, the
 *  last voyage's steps alone (every playtest log keeps the sail's, ?timing=1 or not: Ed's playtest of v4821, "sailing transition
 *  loading was slow", and his log couldn't say where it went). None sailed: as it is. */
export function sinceSail(t: Timing): Timing {
  const i = t.steps.map(s => s.name).lastIndexOf("chart:sail");
  if (i <= 0) return t;
  const t0 = t.steps[i].at;
  return { ...t, steps: t.steps.slice(i).map((s, j) => ({ ...s, at: s.at - t0, ms: j ? s.ms : 0 })), longTasks: t.longTasks.filter(l => l.at >= t0).map(l => ({ ...l, at: l.at - t0 })) };
}
