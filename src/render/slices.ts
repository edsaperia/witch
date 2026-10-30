// A long build split into short steps (the View's island build: Ed's laptop, 2026-10-20, a 10 s main-thread freeze arriving at home
// after a sail, with the bedroom's alarm, its music and every animation stopped partway through). A build is a generator: each
// `yield` is a point where it may give the page a frame, and a yielded string names the stage that starts there (a ?timing=1 mark,
// `witch:build-<name>`, app/timing.ts). runSync runs it straight through, as the build always ran; runSliced runs it a frame's
// budget at a time, giving the page its frames between, so the same steps happen in the same order (three.js breaks draw-order
// ties by creation order: nothing is made in another order, only later).

import { logCaughtError } from "../platform/caughtError";

/** A build's steps; `T` what it makes. */
export type Steps<T = void> = Generator<string | void | Wait<unknown> | Later<unknown>, T, void>;

/** A step that can wait for work done elsewhere (an art worker): sliced, the page has its frames till it's back; run straight
 *  through, it's done in place (`here`), as it always was. */
export interface Wait<T> { wait: () => Promise<T>; here: () => T; value?: T }
/** That step: what `wait` brings (or, if it fails, `here` makes), or `here`'s at once when run straight through. */
export function* awaitOr<T>(wait: () => Promise<T>, here: () => T): Steps<T> {
  const w: Wait<T> = { wait, here };
  yield w as Wait<unknown>;
  return w.value as T;
}
const isWait = (v: unknown): v is Wait<unknown> => typeof v === "object" && v !== null && "here" in v && !("later" in v);

/** Work started elsewhere now and taken later (settle): the build goes on meanwhile. Run straight through, it's done in place now. */
export interface Later<T> { later: true; wait: () => Promise<T>; here: () => T; promise?: Promise<T>; value?: T; got: boolean }
export function* later<T>(wait: () => Promise<T>, here: () => T): Steps<Later<T>> {
  const l: Later<T> = { later: true, wait, here, got: false };
  yield l as Later<unknown>;
  return l;
}
/** What it brought: at once if it's in, else the page has its frames till it is. */
export function* settle<T>(l: Later<T>): Steps<T> {
  if (!l.got) l.value = yield* awaitOr(() => l.promise!, l.here);
  l.got = true;
  return l.value as T;
}
const isLater = (v: unknown): v is Later<unknown> => typeof v === "object" && v !== null && "later" in v;

/** Run it straight through (as before: one task). */
export function runSync<T>(steps: Steps<T>): T {
  for (;;) {
    const r = steps.next();
    if (r.done) return r.value;
    if (isLater(r.value)) { r.value.value = r.value.here(); r.value.got = true; }
    else if (isWait(r.value)) r.value.value = r.value.here();
    else if (r.value) mark(r.value);
  }
}

/** What a sliced build took: its longest single step (ms) and the stage it was in, its slices and its whole time. */
export interface SliceStats { longest: number; longestAt: string; slices: number; ms: number; /** its slowest steps (ms, the stage), slowest first */ slow: [number, string][] }
/** The last sliced builds' stats, newest last (the build-budget check reads them: tools/view/build-budget.cjs). */
export const sliceLog: (SliceStats & { what: string })[] = [];

/** Run it a slice at a time: steps until `budgetMs` has gone (at least one), then the page's next frame, then on. `clock`, its
 *  milliseconds (the page's own; a test's, so its slicing doesn't hang on how loaded the machine is). */
export async function runSliced<T>(steps: Steps<T>, what: string, budgetMs = 8, clock: () => number = now): Promise<T> {
  const stats: SliceStats = { longest: 0, longestAt: "", slices: 0, ms: 0, slow: [] };
  await nextFrame(); // (a turn of its own: not run on at the end of whatever asked for it)
  let stage = "";
  const start = clock();
  for (;;) {
    const s0 = clock();
    stats.slices++;
    for (;;) {
      const a = clock(), r = steps.next(), d = clock() - a;
      if (d > stats.longest) { stats.longest = d; stats.longestAt = stage; }
      if (d > 4 && (stats.slow.length < 10 || d > stats.slow[9][0])) { stats.slow.push([Math.round(d), stage]); stats.slow.sort((x, y) => y[0] - x[0]); stats.slow.length = Math.min(10, stats.slow.length); }
      if (r.done) { stats.ms = clock() - start; sliceLog.push({ ...stats, what }); if (sliceLog.length > 8) sliceLog.shift(); return r.value; }
      if (isLater(r.value)) { const l = r.value; l.promise = waitOrHere(l).then(v => { l.value = v; l.got = true; return v; }); continue; } // (started: on with the build)
      if (isWait(r.value)) { const w = r.value; w.value = await waitOrHere(w); break; } // (waited: the page had its frames)
      if (r.value) { stage = r.value; mark(r.value); }
      if (clock() - s0 >= budgetMs) break;
    }
    await nextFrame();
  }
}

/** How long a step waits for work done elsewhere before it does it here (a worker that never answers mustn't hold the build). */
const WAIT_MS = 20000;
async function waitOrHere<T>(w: { wait: () => Promise<T>; here: () => T }): Promise<T> {
  let late: ReturnType<typeof setTimeout> | undefined;
  const timeUp = new Promise<"late">(res => { late = setTimeout(() => res("late"), WAIT_MS); });
  try { const r = await Promise.race([w.wait(), timeUp]); return r === "late" ? w.here() : r as T; }
  catch (e) { logCaughtError(e, "sliced build worker fallback"); return w.here(); }
  finally { clearTimeout(late); }
}

const now = (): number => performance.now();
const mark = (stage: string): void => { try { performance.mark(`witch:build-${stage}`); } catch { /* no timeline */ } };

/** The page's next frame (it paints between), or a task's turn when there are no frames (a hidden tab, a worker, a test). */
export function nextFrame(): Promise<void> {
  return new Promise(res => {
    if (typeof requestAnimationFrame === "undefined" || typeof document === "undefined" || document.hidden) { setTimeout(res, 0); return; }
    let done = false;
    const go = () => { if (!done) { done = true; res(); } };
    requestAnimationFrame(() => setTimeout(go, 0)); // (after the frame's own work: the build's slice comes after it, not before)
    setTimeout(go, 100); // (a frame that never comes: a tab hidden meanwhile)
  });
}
