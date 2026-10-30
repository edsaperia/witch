// The Settings page's navigation (ui/settingsMenu.ts), the same for the pad, the keyboard and the mouse (Ed's picks from the mock,
// 2026-10-28): its tabs, each a list of rows, one focused; up and down move the focus, left and right change the row's value, choose
// acts on it (a toggle flips, a choice steps on, a button presses), back closes, the tab keys step the tab, reset puts the row back to
// its default. No drawing and no events here: an input in, the new focus and what to do out.

import { bindings, type ActionId } from "../platform/bindings";

export type RowKind = "slider" | "toggle" | "choice" | "button" | "bind";
export interface NavRow { id: string; kind: RowKind; /** a choice's options */ options?: readonly string[]; /** hidden: skipped by the focus */ hidden?: boolean }
export interface NavState { tab: number; row: number }
export type NavInput = "up" | "down" | "left" | "right" | "choose" | "back" | "tabPrev" | "tabNext" | "reset";
export type NavAction =
  | { kind: "none" }
  | { kind: "step"; id: string; dir: -1 | 1 } // a slider or choice moved a notch, a toggle flipped; a binding's other slot
  | { kind: "press"; id: string } // a button; a binding's slot listened for
  | { kind: "reset"; id: string }
  | { kind: "close" };

const shown = (rows: readonly NavRow[]) => rows.map((r, i) => (r.hidden ? -1 : i)).filter(i => i >= 0);

/** The first row the focus can be on in a tab (-1: none). */
export function firstRow(rows: readonly NavRow[]): number { return shown(rows)[0] ?? -1; }

/** One input: the new state and what it does. The focus skips hidden rows and wraps round the tab's ends; the tabs wrap too. */
export function navigate(s: NavState, tabs: readonly (readonly NavRow[])[], input: NavInput): { state: NavState; action: NavAction } {
  const rows = tabs[s.tab] ?? [], vis = shown(rows), at = Math.max(0, vis.indexOf(s.row)), row = rows[vis[at]];
  const none = { kind: "none" } as const;
  switch (input) {
    case "up": case "down": {
      if (!vis.length) return { state: s, action: none };
      const n = (at + (input === "down" ? 1 : -1) + vis.length) % vis.length;
      return { state: { ...s, row: vis[n] }, action: none };
    }
    case "tabPrev": case "tabNext": {
      const t = (s.tab + (input === "tabNext" ? 1 : -1) + tabs.length) % tabs.length;
      return { state: { tab: t, row: firstRow(tabs[t]) }, action: none };
    }
    case "back": return { state: s, action: { kind: "close" } };
    case "reset": return { state: s, action: row && row.kind !== "button" ? { kind: "reset", id: row.id } : none };
    case "left": case "right": {
      if (!row || row.kind === "button") return { state: s, action: none };
      return { state: s, action: { kind: "step", id: row.id, dir: input === "right" ? 1 : -1 } };
    }
    case "choose": {
      if (!row) return { state: s, action: none };
      if (row.kind === "button" || row.kind === "bind") return { state: s, action: { kind: "press", id: row.id } };
      return { state: s, action: { kind: "step", id: row.id, dir: 1 } };
    }
  }
}

/** A choice's next option, a notch to either side (wrapping); a slider's value a notch on (0 to 1 in twentieths). */
export const stepChoice = <T>(options: readonly T[], v: T, dir: -1 | 1): T => options[(options.indexOf(v) + dir + options.length) % options.length] ?? options[0];
export const stepSlider = (v: number, dir: -1 | 1, notch = 0.05): number => Math.min(1, Math.max(0, Math.round((v + dir * notch) / notch) * notch));

/** The keyboard's keys (KeyboardEvent.code) for the page's inputs: the arrows and WASD, Enter or Space to choose, Esc or Backspace
 *  back, Q and E the tabs (Tab and Shift+Tab too), Delete reset. */
export function keyInput(code: string, shift = false): NavInput | null {
  switch (code) {
    case "ArrowUp": case "KeyW": return "up";
    case "ArrowDown": case "KeyS": return "down";
    case "ArrowLeft": case "KeyA": return "left";
    case "ArrowRight": case "KeyD": return "right";
    case "Enter": case "Space": case "NumpadEnter": return "choose";
    case "Escape": case "Backspace": return "back";
    case "KeyQ": case "PageUp": return "tabPrev";
    case "KeyE": case "PageDown": return "tabNext";
    case "Tab": return shift ? "tabPrev" : "tabNext";
    case "Delete": return "reset";
    default: return null;
  }
}

/** The pad (the standard mapping): the d-pad or the left stick moves (held, it repeats), ✕ (0) chooses, ○ (1) goes back, L1 (4) and
 *  R1 (5) step the tabs, △ (3) resets. `prev` the inputs held last frame; a fresh press counts at once, a held direction again after
 *  `delay` seconds and then every `every`. */
export class PadNav {
  private held = new Map<NavInput, number>();
  constructor(private delay = 0.4, private every = 0.12) {}
  /** The pad's inputs this frame, as presses; `buttons` pressed, `x`/`y` the left stick, `now` seconds. */
  read(buttons: readonly boolean[], x: number, y: number, now: number): NavInput[] {
    const dz = 0.5, want = new Set<NavInput>();
    if (buttons[12] || y < -dz) want.add("up");
    if (buttons[13] || y > dz) want.add("down");
    if (buttons[14] || x < -dz) want.add("left");
    if (buttons[15] || x > dz) want.add("right");
    if (buttons[0]) want.add("choose");
    if (buttons[1]) want.add("back");
    if (buttons[4]) want.add("tabPrev");
    if (buttons[5]) want.add("tabNext");
    if (buttons[3]) want.add("reset");
    return this.presses(want, now);
  }

  /** Ordinary menus follow remaps; only Settings uses read()'s fixed recovery layout. */
  readBound(buttons: readonly boolean[], axes: readonly number[], now: number): NavInput[] {
    const want = new Set<NavInput>();
    for (const input of ["up", "down", "left", "right", "choose", "back", "tabPrev", "tabNext"] as const) {
      if (bindings.padHeld(`menu.${input}` as ActionId, buttons, axes)) want.add(input);
    }
    return this.presses(want, now);
  }

  private presses(want: Set<NavInput>, now: number): NavInput[] {
    const out: NavInput[] = [];
    for (const k of [...this.held.keys()]) if (!want.has(k)) this.held.delete(k);
    for (const k of want) {
      const since = this.held.get(k);
      if (since === undefined) { this.held.set(k, now); out.push(k); continue; }
      const repeats = k === "up" || k === "down" || k === "left" || k === "right";
      if (repeats && now - since >= this.delay) { out.push(k); this.held.set(k, now - this.delay + this.every); }
    }
    return out;
  }
}
