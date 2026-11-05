// The loading screen's end (src/ui/loadingFade.js, src/ui/loadingScreen.js; Ed, 2026-11-03: "can we fade from the loading screen to
// the bedroom over a few seconds"): the screen, white after its supernova, fades out over the tuning's loading.fadeOut seconds
// rather than vanishing; the game's ready before it does; and her wake-up starts behind the white as the fade begins.
import { readFileSync } from "node:fs";
import { afterEach, describe, expect, it, vi } from "vitest";
import tuning from "../../config/tuning.json";
import { decisions } from "../../config/decisions/1752-loading-fade.json";
import { EASE_OUT, REDUCED_FADE, fadeSeconds, revealGame } from "./loadingFade.js";
import { startLoadingScreen } from "./loadingScreen.js";

type El = { style: Record<string, string>; dataset: Record<string, string>; removed: boolean; offsetWidth: number; width: number; height: number; append(...a: El[]): void; remove(): void; getContext(): unknown };

/** A page's worth of DOM for the screen in node: elements that keep their style, a 2D context that draws nothing, the frames and
 *  the clock by hand (`step`), the timers vitest's. */
function page(reduced = false) {
  const els: El[] = [], frames: FrameRequestCallback[] = [];
  let clock = 1000;
  const grad = { addColorStop() {} }, pixels = (w: number, h: number) => ({ data: new Uint8ClampedArray(w * h * 4) });
  const ctx = new Proxy({ createLinearGradient: () => grad, createRadialGradient: () => grad, getImageData: (_x: number, _y: number, w: number, h: number) => pixels(w, h), createImageData: pixels } as Record<string, unknown>, { get: (t, k: string) => (k in t ? t[k] : () => {}), set: () => true });
  const el = (): El => { const e: El = { style: {}, dataset: {}, removed: false, offsetWidth: 0, width: 0, height: 0, append() {}, remove() { e.removed = true; }, getContext: () => ctx }; els.push(e); return e; };
  vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout", "setInterval", "clearInterval"] });
  vi.stubGlobal("window", globalThis);
  vi.stubGlobal("document", { createElement: el, body: { append() {} }, fonts: { load: () => Promise.resolve([]) }, hidden: false });
  vi.stubGlobal("Path2D", class { addPath() {} moveTo() {} lineTo() {} closePath() {} rect() {} }); // (the knot's paths: src/ui/loadingSeal.js)
  vi.stubGlobal("innerWidth", 960); vi.stubGlobal("innerHeight", 540);
  vi.stubGlobal("addEventListener", () => {}); vi.stubGlobal("removeEventListener", () => {});
  vi.stubGlobal("matchMedia", (q: string) => ({ matches: reduced && q.includes("reduced-motion") }));
  vi.stubGlobal("requestAnimationFrame", (f: FrameRequestCallback) => { frames.push(f); return frames.length; });
  vi.spyOn(performance, "now").mockImplementation(() => clock);
  /** `ms` on, a frame drawn (the screen's and anything waiting on one), the timers due run. */
  const step = (ms = 50) => { clock += ms; vi.advanceTimersByTime(ms); for (const f of frames.splice(0)) f(clock); };
  return { els, step, now: () => clock };
}

afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

describe("the loading screen's fade onto the bedroom", () => {
  it("is the tuning's loading.fadeOut, 2.5 s as built, its pause-page slider defaulting to it; short under reduced motion", () => {
    expect(tuning.loading.fadeOut).toBe(2.5);
    expect(decisions.map(d => d.apply.knob)).toEqual(["loading.fadeOut"]);
    expect(decisions[0].default).toBe(tuning.loading.fadeOut);
    expect(fadeSeconds(2.5, false)).toBe(2.5);
    expect(fadeSeconds(4, false)).toBe(4);
    expect(fadeSeconds(2.5, true)).toBe(REDUCED_FADE);
    expect(fadeSeconds(0.3, true)).toBe(0.3);
    expect(fadeSeconds(undefined, false)).toBe(2.5);
  });

  it("starts the game behind the white, then fades out over the knob's seconds two frames on, gone only once it's clear", () => {
    const frames: (() => void)[] = [], timers: { f: () => void; ms: number }[] = [];
    const root = { style: {} as Record<string, string>, dataset: {} as Record<string, string>, offsetWidth: 0, removed: false, remove() { this.removed = true; } };
    const order: string[] = [];
    revealGame(root, 2.5, { wake: () => order.push(`wake while ${root.dataset.phase}, opacity ${root.style.opacity ?? "1"}`), gone: () => order.push("gone"), frame: f => frames.push(f), later: (f, ms) => timers.push({ f, ms }) });
    expect(order).toEqual(["wake while covered, opacity 1"]); // (the wake-up first, under the full white)
    frames.shift()!();
    expect(root.style.transition).toBeUndefined(); // (a frame on: the game drawing her waking; not fading yet)
    frames.shift()!();
    expect(root.dataset.phase).toBe("fading");
    expect(root.style.transition).toBe(`opacity 2.5s ${EASE_OUT}`); // (eased out over the knob's seconds, not a cut)
    expect(root.style.opacity).toBe("0");
    expect(root.removed).toBe(false);
    expect(timers).toHaveLength(1);
    expect(timers[0].ms).toBeGreaterThanOrEqual(2500); // (removed only once the fade's over)
    timers[0].f();
    expect(root.removed).toBe(true);
    expect(order).toEqual(["wake while covered, opacity 1", "gone"]);
  });

  it("fades even if the wake-up throws (never stuck under the white)", () => {
    const frames: (() => void)[] = [];
    const root = { style: {} as Record<string, string>, dataset: {} as Record<string, string>, remove() {} };
    expect(() => revealGame(root, 1, { wake: () => { throw new Error("boom"); }, frame: f => frames.push(f), later: () => {} })).toThrow("boom");
    frames.shift()!(); frames.shift()!();
    expect(root.style.opacity).toBe("0");
  });

  it("on the real screen: no wake-up till its supernova's white is full, then the fade over loading.fadeOut", async () => {
    const { els, step } = page();
    const api = startLoadingScreen("serif", { ...tuning.loading, fadeOut: 3 });
    const [root, , , , white] = els; // (the screen, its sky, its knot, its supernova, its white)
    await Promise.resolve(); await Promise.resolve(); // (the font's promise: the seal's stars made)
    for (let i = 0; i < 20; i++) step(110); // (loading: the sky drawing)
    let woke = -1, frame = 0;
    const whiteAtWake: string[] = [];
    api.finish(() => { woke = frame; whiteAtWake.push(white.style.opacity, root.dataset.phase); });
    // the game's ready: the last stars light, the supernova; the wake-up waits for its white
    for (; frame < 400 && woke < 0; frame++) { expect(root.style.transition, `frame ${frame}`).toBeUndefined(); step(50); }
    expect(woke).toBeGreaterThan(tuning.loading.nova * 1000 / 50 - 1); // (at least the supernova's seconds after finish)
    expect(whiteAtWake).toEqual(["1", "covered"]);
    expect(root.style.opacity).toBeUndefined();
    step(); step(); // (the game's frames behind the white)
    expect(root.dataset.phase).toBe("fading");
    expect(root.style.transition).toBe(`opacity 3s ${EASE_OUT}`);
    expect(root.style.opacity).toBe("0");
    step(2900);
    expect(root.removed).toBe(false); // (fading, not vanished)
    step(200);
    expect(root.removed).toBe(true);
  });

  it("keeps a short fade under prefers-reduced-motion", async () => {
    const { els, step } = page(true);
    const api = startLoadingScreen("serif", tuning.loading);
    const [root] = els;
    await Promise.resolve(); await Promise.resolve();
    api.finish(() => {});
    for (let i = 0; i < 400 && root.dataset.phase !== "fading"; i++) step(50);
    expect(root.style.transition).toBe(`opacity ${REDUCED_FADE}s ${EASE_OUT}`);
  });

  it("wakes and fades anyway should its frames stall short of the white (a fault)", () => {
    const { els, step } = page();
    const api = startLoadingScreen("serif", tuning.loading);
    const [root] = els;
    let woke = false;
    api.finish(() => { woke = true; });
    vi.advanceTimersByTime((tuning.loading.nova + 15) * 1000); // (no frames at all)
    expect(woke).toBe(true);
    step(); step();
    expect(root.style.opacity).toBe("0");
  });
});

describe("main.ts's side of it", () => {
  const main = readFileSync(new URL("../main.ts", import.meta.url), "utf8");
  it("hands the screen the game ready: the view prepared and the night ready before finish, the wake-up given to finish", () => {
    const boot = main.slice(main.indexOf("await view.prepare();"), main.indexOf("night.arrival?.begin(night.game);"));
    const at = (s: string) => { const i = boot.indexOf(s); expect(i, s).toBeGreaterThanOrEqual(0); return i; };
    expect(at("await view.prepare();")).toBeLessThan(at("night.flags.ready = true;"));
    expect(at("night.flags.ready = true;")).toBeLessThan(at("loading.finish(wakeFirst)"));
    expect(boot).toMatch(/if \(loading\) loading\.finish\(wakeFirst\); else wakeFirst\(\);/); // (no wake-up of its own while the screen's up)
  });
  it("lets no key start the night while she's asleep under the screen", () => {
    const start = main.slice(main.indexOf("function start(): boolean {"), main.indexOf("function startDirect("));
    expect(start).toMatch(/if \(bootAsleep\) return false;/);
    expect(main).toMatch(/function wakeFirstNow\(\): void \{\n  const n = N\(\);\n  bootAsleep = false;/);
  });
});
