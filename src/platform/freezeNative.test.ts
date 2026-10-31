import { afterEach, expect, it, vi } from "vitest";
import type { Game } from "../rules/game";

afterEach(() => { vi.unstubAllGlobals(); vi.resetModules(); });

async function page() {
  const listeners: Record<string, ((e: KeyboardEvent) => void)[]> = {};
  let focused: Element | null = null;
  class Control {
    style = {}; id = ""; textContent = "";
    constructor(readonly root = "", readonly tagName = "BUTTON") {}
    closest(selectors: string) { return this.root && selectors.split(",").map(s => s.trim()).includes(this.root) ? this : null; }
    addEventListener() {} append() {}
    blur() { if (focused === this as unknown as Element) focused = null; }
  }
  vi.stubGlobal("HTMLElement", Control);
  vi.stubGlobal("navigator", {});
  vi.stubGlobal("window", { addEventListener(type: string, f: (e: KeyboardEvent) => void) { (listeners[type] ??= []).push(f); } });
  vi.stubGlobal("document", {
    get activeElement() { return focused; }, hidden: false, addEventListener() {}, querySelector: () => null,
    createElement: () => new Control(), head: { append() {} }, body: { append() {}, classList: { toggle() {} } },
  });
  const { Freeze } = await import("./freeze");
  const freeze = new Freeze({ clock: { paused: false } } as Game, 123, "test");
  const key = (target: Control, code: string, type: "keydown" | "keyup") => {
    const e = new Event(type, { cancelable: true });
    Object.defineProperties(e, { code: { value: code }, target: { value: target }, repeat: { value: false } });
    for (const f of listeners[type] ?? []) f(e as KeyboardEvent);
    return e;
  };
  return { freeze, key, control: (root = "", tag = "BUTTON") => new Control(root, tag), focus: (c: Control) => { focused = c as unknown as Element; }, active: () => focused };
}

it("cancels rejected outside button defaults on both keydown and keyup, including Enter and Space", async () => {
  const p = await page(), outside = p.control("#finds-panel"); p.freeze.toggle();
  for (const code of ["Enter", "Space"]) for (const phase of ["keydown", "keyup"] as const) {
    expect(p.key(outside, code, phase).defaultPrevented, `${code} ${phase}`).toBe(true);
  }
});

it("preserves native button and slider defaults inside pause, Settings and the potion lab", async () => {
  const p = await page(); p.freeze.toggle();
  for (const root of ["#pause-btns", "#pause-sliders", "#settings-page", "#potion-lab"]) {
    const inside = p.control(root);
    for (const code of ["Enter", "Space", "ArrowRight"]) for (const phase of ["keydown", "keyup"] as const) {
      expect(p.key(inside, code, phase).defaultPrevented, `${root} ${code} ${phase}`).toBe(false);
    }
  }
});

it("removes underlying focus when pause opens without blurring a pause control or restoring old focus", async () => {
  const p = await page(), outside = p.control("#finds-panel"); p.focus(outside);
  p.freeze.toggle(); expect(p.active() === null).toBe(true);
  p.freeze.toggle(); expect(p.active()).toBeNull();
  const inside = p.control("#pause-btns"); p.focus(inside);
  p.freeze.toggle(); expect(p.active()).toBe(inside);
});
