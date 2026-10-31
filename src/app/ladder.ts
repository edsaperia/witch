// The quality ladder in the running game (rules/ladder.ts has the rungs and the controller): a window a second of the GPU's time
// a frame (EXT_disjoint_timer_query_webgl2, platform/frameStats.ts) or, where the browser can't time the GPU, the frame time; the
// rung that comes of it applied to the night's tuning; and the rung remembered for this device (its GPU's name) so the next load
// starts there. ?ladder=off: full quality, never stepping; ?ladder=<n>: pinned at rung n; ?ladder=auto: stepping even under
// automation (headless tools get it off by default, so they measure the game as built). The pause page shows where it is and
// can pin it (ui/decide.ts quality).
import { clampRung, inEffect, loadEffects, newLadder, pending, RUNGS, setMode, stepLadder, type LadderState } from "../rules/ladder";
import type { Tuning } from "../rules/tuning";
import { FX_QUALITY } from "../render/fx/system";

/** A frame's budget (ms): 60 fps; at the steady-30 rung, 30. */
const BUDGET = 1000 / 60, BUDGET30 = 1000 / 30;
/** How hard the squeeze rung squeezes the tallest trees (treeCap.keep; #1223 left it at 1). */
export const SQUEEZE_KEEP = 0.35;
const KEY = "witch.ladder";

/** What the rungs change in the tuning, from the values the night had (its own, or the pause page's since). */
interface Base { keep: number; wind: boolean; trunks: string; edge: boolean; hard: boolean }

export class QualityLadder {
  mutate: (label: string, action: () => void) => void = (_label, action) => action();
  state: LadderState;
  /** The last window's cost (ms a frame) and whether it was the GPU's time. */
  ms = NaN;
  private timed = false;
  private readonly key: string;
  private readonly bases = new WeakMap<object, Base>();
  private applied = "";
  private win = { t0: NaN, frames: [] as number[], skip: false };

  /** `gpu` names the device (its renderer string: the rung is remembered per device). */
  constructor(gpu: string, params: URLSearchParams) {
    this.key = `${KEY}:${gpu.slice(0, 120)}`;
    this.state = startState(params, readRung(this.key));
    this.sync();
  }

  /** The steady-30 rung in effect: the main loop draws every other frame at 60 Hz. */
  get cap30(): boolean { return inEffect(this.state, RUNGS.findIndex(r => r.id === "cap30")); }

  /** Each frame: `now` (ms), the frame's time since the last (ms), whether this frame says nothing of the cost (paused, loading,
   *  a hidden tab, the telescope...), the night's tuning, and the GPU times so far (ms, oldest first; empty where untimed). */
  frame(now: number, frameMs: number, skip: boolean, tuning: Tuning, gpu: readonly number[]): void {
    const W = this.win;
    if (Number.isNaN(W.t0)) W.t0 = now;
    if (skip || frameMs > 250) W.skip = true; else if (frameMs > 0) W.frames.push(frameMs);
    if (now - W.t0 >= 1000) {
      const secs = (now - W.t0) / 1000, n = W.frames.length;
      // (this window's frames' GPU times: the last n of those come back so far; their median)
      const g = gpu.length ? median(gpu.slice(-Math.max(1, Math.min(n, gpu.length)))) : NaN;
      this.timed = Number.isFinite(g);
      this.ms = this.timed ? g : median(W.frames);
      const before = this.state.rung;
      this.state = stepLadder(this.state, this.ms, this.cap30 ? BUDGET30 : BUDGET, secs, W.skip || n < 5, undefined, this.timed);
      if (this.state.rung !== before && this.state.mode === "auto") this.save();
      this.sync();
      W.t0 = now; W.frames = []; W.skip = false;
    }
    this.apply(tuning);
  }

  /** The rungs in effect, set on the night's tuning; only when they change, so the pause page's own changes stand till then. */
  apply(t: Tuning): void {
    let b = this.bases.get(t);
    if (!b) { const L = LOADED.get(t); if (L !== undefined) this.state = { ...this.state, loaded: L }; b = { keep: t.treeCap.keep, wind: t.wind.on, trunks: t.shadows.trunks?.mode ?? "off", edge: !!t.scenery.edgeDither, hard: !!t.canopyCutout.hard }; this.bases.set(t, b); this.applied = ""; }
    const on = (id: string) => inEffect(this.state, RUNGS.findIndex(r => r.id === id));
    const sig = RUNGS.map((_, i) => (inEffect(this.state, i) ? 1 : 0)).join("");
    if (sig === this.applied) return;
    this.applied = sig;
    this.mutate("automatic quality tuning", () => {
    FX_QUALITY.distortion = !on("fxDistort");
    FX_QUALITY.imprints = !on("fxImprints");
    FX_QUALITY.secondary = !on("fxSecondary");
    FX_QUALITY.lightCap = on("fxLights") ? 2 : 6;
    FX_QUALITY.particles = on("fxParticles") ? 0.5 : 1;
    flag(t.scenery, "edgeDither", on("farDither") || b.edge);
    flag(t.canopyCutout, "hard", on("hardCut") || b.hard);
    t.treeCap.keep = on("squeeze") ? Math.min(b.keep, SQUEEZE_KEEP) : b.keep;
    t.wind.on = on("still") ? false : b.wind;
    if (t.shadows.trunks) t.shadows.trunks.mode = on("still") ? "off" : b.trunks;
    });
  }

  /** The pause page's lines: where it is, why, and what waits for the next load. */
  lines(): string[] {
    const s = this.state, R = RUNGS[s.rung], last = RUNGS.length - 1;
    const mode = s.mode === "off" ? "off (full quality)" : s.mode === "pinned" ? `pinned at ${s.rung}` : s.locked ? "auto, holding (it kept flipping)" : "auto";
    const out = [`${mode}: rung ${s.rung} of ${last}, ${R.label}`];
    if (Number.isFinite(this.ms)) out.push(`${this.timed ? "GPU" : "frame"} ${this.ms.toFixed(1)} ms a frame, budget ${(this.cap30 ? BUDGET30 : BUDGET).toFixed(1)}`);
    const on = RUNGS.filter((_, i) => inEffect(s, i)).map(r => r.label);
    if (on.length) out.push(`in effect: ${on.join("; ")}`);
    const p = pending(s);
    if (p.adds.length) out.push(`from the next load: ${p.adds.map(i => RUNGS[i].label).join("; ")}`);
    if (p.drops.length) out.push(`back from the next load: ${p.drops.map(i => RUNGS[i].label).join("; ")}`);
    return out;
  }
  options(): { value: string; label: string }[] {
    return [{ value: "auto", label: "Auto" }, { value: "off", label: "Off (full quality)" }, ...RUNGS.slice(1).map((r, i) => ({ value: String(i + 1), label: `${i + 1}: ${r.label}${r.built ? "" : " (not built yet)"}` }))];
  }
  current(): string { return this.state.mode === "auto" ? "auto" : this.state.mode === "off" ? "off" : String(this.state.rung); }
  choose(v: string): void {
    this.state = v === "auto" ? setMode(this.state, "auto") : v === "off" ? setMode(this.state, "off") : setMode(this.state, "pinned", Number(v));
    if (v === "auto") this.save();
    this.sync();
  }

  /** The next night's load rungs are made at the rung it's on now (applyLoadRungs). */
  private sync(): void { live = this.state.mode === "off" ? 0 : this.state.rung; }
  private save(): void {
    try { localStorage.setItem(this.key, JSON.stringify({ rung: this.state.rung, at: Date.now() })); } catch { /* (private window, storage off: not remembered) */ }
  }
}

/** The ladder at load: off under ?ladder=off, and under automation unless asked for (?ladder=auto: the tools measure the game as
 *  built); pinned at ?ladder=<n>; else where this device's ladder was last. */
function startState(params: URLSearchParams, saved: number): LadderState {
  const p = params.get("ladder"), n = p !== null && p !== "" && Number.isFinite(Number(p));
  const robot = typeof navigator !== "undefined" && navigator.webdriver === true;
  if (p === "off" || (robot && p !== "auto" && !n)) return setMode(newLadder(0), "off");
  if (n) return setMode(newLadder(clampRung(Number(p))), "pinned");
  return newLadder(saved);
}
function readRung(key: string): number {
  try { const v = JSON.parse(localStorage.getItem(key) ?? "null"); return clampRung(Number(v?.rung ?? 0)); } catch { return 0; }
}

// The load rungs (the forest's density, the area blend, the art pixel): put on a night's tuning as it's made, after this browser's
// saved settings, by everything that makes a night's tuning (app/night.ts, and app/mapPrep.ts's, so a map made ahead in the worker
// is still this night's), at the rung the ladder's on: the live ladder's once there is one, else where this device's will start (the
// boot's night is made before the view: a throwaway WebGL context names the GPU). The art pixel is the page's, as the art is drawn
// for it at the boot: decided once, at the first night's, and kept for every night after on this page.
let live: number | null = null;
let pagePx: number | null | undefined;
/** The rung each night's tuning had its load rungs made at (the ladder's `loaded`, for the pause page's "from the next load"). */
const LOADED = new WeakMap<object, number>();

/** The load rungs in effect put on a night's tuning; not those the link sets itself (`skip`: ?set='s knobs; ?px=). */
export function applyLoadRungs(t: Tuning, skip: ReadonlySet<string> = new Set()): void {
  if (live === null) live = (() => { const s = startState(linkParams(), readRung(`${KEY}:${probeGpu().slice(0, 120)}`)); return s.mode === "off" ? 0 : s.rung; })();
  const e = loadEffects(live);
  if (pagePx === undefined) pagePx = linkParams().has("px") ? null : e.px;
  if (e.density !== 1 && !skip.has("treeDensity")) t.treeDensity *= e.density;
  if (e.blend !== null && !skip.has("areaEdgeBlend.width")) t.areaEdgeBlend.width = Math.min(t.areaEdgeBlend.width, e.blend);
  if (pagePx) t.pixelSize = pagePx;
  LOADED.set(t, live);
}
const linkParams = (): URLSearchParams => new URLSearchParams(typeof location !== "undefined" ? location.search : "");
function probeGpu(): string {
  try {
    const gl = document.createElement("canvas").getContext("webgl2");
    if (!gl) return "unknown";
    const n = gpuName(gl);
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return n;
  } catch { return "unknown"; }
}

/** The device's GPU by name, to remember its rung by (its renderer string; the browser's generic one where that's hidden). */
export function gpuName(gl: WebGLRenderingContext | WebGL2RenderingContext): string {
  try { const d = gl.getExtension("WEBGL_debug_renderer_info"); return String(d ? gl.getParameter(d.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER)); } catch { return "unknown"; }
}

/** A switch the rungs add to the tuning, left out while off (as the night was built), so a night off the ladder reads the same in
 *  the bench's knobs as before the rung was built. */
function flag<T extends object>(o: T, k: keyof T, v: boolean): void {
  if (v) (o as Record<keyof T, unknown>)[k] = true; else delete o[k];
}

function median(a: readonly number[]): number {
  if (!a.length) return NaN;
  const s = [...a].sort((x, y) => x - y);
  return s[Math.floor(s.length / 2)];
}
