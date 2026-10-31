import { afterEach, expect, it, vi } from "vitest";
import type { Game } from "../rules/game";

afterEach(() => { vi.unstubAllGlobals(); vi.resetModules(); });

async function page() {
  const listeners: Record<string, ((e: KeyboardEvent) => void)[]> = {};
  let focused: Element | null = null;
  class Control {
    style = {}; id = ""; textContent = ""; tabIndex = 0;
    constructor(readonly root = "", readonly tagName = "BUTTON") {}
    closest(selectors: string) { return this.root && selectors.split(",").map(s => s.trim()).includes(this.root) ? this : null; }
    matches(selector: string) { return selector === "#pause-btns" && this.root === selector && this.tagName === "DIV"; }
    addEventListener() {} append() {}
    focus() { focused = this as unknown as Element; }
    getClientRects() { return [{}]; }
    blur() { if (focused === this as unknown as Element) focused = null; }
  }
  vi.stubGlobal("HTMLElement", Control);
  vi.stubGlobal("navigator", {});
  vi.stubGlobal("window", { addEventListener(type: string, f: (e: KeyboardEvent) => void) { (listeners[type] ??= []).push(f); } });
  const firstPause = new Control("#pause-btns", "DIV"); let controlsReady = false;
  vi.stubGlobal("document", {
    get activeElement() { return focused; }, hidden: false, addEventListener() {},
    querySelector: (selector: string) => controlsReady && selector === "#pause-btns" ? firstPause : null,
    createElement: () => new Control(), head: { append() {} }, body: { append() {}, classList: { toggle() {} } },
  });
  const { Freeze } = await import("./freeze");
  const freeze = new Freeze({ clock: { paused: false } } as Game, 123, "test");
  freeze.onToggle = on => { controlsReady = on; };
  const key = (target: Control, code: string, type: "keydown" | "keyup", shiftKey = false) => {
    const e = new Event(type, { cancelable: true });
    Object.defineProperties(e, { code: { value: code }, target: { value: target }, repeat: { value: false }, shiftKey: { value: shiftKey } });
    for (const f of listeners[type] ?? []) f(e as KeyboardEvent);
    return e;
  };
  return { freeze, key, firstPause, control: (root = "", tag = "BUTTON") => new Control(root, tag), focus: (c: Control) => { focused = c as unknown as Element; }, active: () => focused };
}

it("cancels rejected outside button defaults on both keydown and keyup, including Enter and Space", async () => {
  const p = await page(), outside = p.control("#finds-panel"); p.freeze.toggle();
  for (const code of ["Enter", "NumpadEnter", "Space"]) for (const phase of ["keydown", "keyup"] as const) {
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

it("focuses the non-tab-stop pause container after mounting, without restoring old focus", async () => {
  const p = await page(), outside = p.control("#finds-panel"); p.focus(outside);
  p.freeze.toggle(); expect(p.active() === p.firstPause as unknown as Element).toBe(true);
  expect(p.firstPause.tabIndex).toBe(-1);
  p.freeze.toggle(); expect(p.active()).toBeNull();
  const inside = p.control("#pause-btns"); p.focus(inside);
  p.freeze.toggle(); expect(p.active() === p.firstPause as unknown as Element).toBe(true);
});

it("cancels immediate Enter/Space on the pause container on both edges", async () => {
  const p = await page(); p.freeze.toggle();
  for (const code of ["Enter", "NumpadEnter", "Space"]) for (const phase of ["keydown", "keyup"] as const) {
    expect(p.key(p.firstPause, code, phase).defaultPrevented).toBe(true);
  }
});

it("leaves the first Tab native from the pause container and activation native after reaching a button", async () => {
  const p = await page(); p.freeze.toggle();
  expect(p.key(p.firstPause, "Tab", "keydown").defaultPrevented).toBe(false);
  expect(p.key(p.firstPause, "Tab", "keyup").defaultPrevented).toBe(false);
  const controls = p.control("#pause-btns"); p.focus(controls);
  for (const code of ["Enter", "Space"]) for (const phase of ["keydown", "keyup"] as const) {
    expect(p.key(controls, code, phase).defaultPrevented).toBe(false);
  }
});

it("leaves Tab, Shift+Tab and arrows native even when pause receives them from BODY", async () => {
  const p = await page(), body = p.control("", "BODY"); p.freeze.toggle();
  for (const shift of [false, true]) for (const phase of ["keydown", "keyup"] as const) {
    expect(p.key(body, "Tab", phase, shift).defaultPrevented).toBe(false);
  }
  for (const code of ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"]) for (const phase of ["keydown", "keyup"] as const) {
    expect(p.key(body, code, phase).defaultPrevented).toBe(false);
  }
});
