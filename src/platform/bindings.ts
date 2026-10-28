// Every control's bindings, remappable (Ed, 2026-10-28: "make it easy to manage and remap keys. We'll have a game settings menu where
// the player can do this"): the defaults are config/bindings.json, one table of actions (each its context, a plain name, what it does,
// and its keys, mouse buttons and pad inputs); a player's own are kept over them (localStorage `witch.bindings`, only what differs).
// Everything that reads a control reads it here (platform/input.ts, the station panels, the sea chart, the telescope, the Studio, the
// pause), and so do the prompts that show one (ui/keyHint.ts glyphOf), so a remap shows everywhere. The settings menu's API is
// `bindings`: list, get, set, reset, resetAll, conflicts, onChange (docs/notes/run.md **Controls**).
import table from "../../config/bindings.json";

/** Where an action works: in play, in a menu (a station's panel, the sea chart, the telescope, the Studio), or both. Two actions in
 *  one context can't share an input; a game action and a menu action can (cross is both use and choose). */
export type Context = "game" | "menu" | "global";
export interface Binding { keys: string[]; mouse: string[]; pad: string[] }
export interface Action extends Binding { id: ActionId; context: Context; name: string; about: string; dev?: boolean }
export type ActionId = keyof typeof table.actions;

/** The standard pad's buttons (the Gamepad API's standard mapping), by their PlayStation names. */
export const PAD_BUTTONS: Readonly<Record<string, number>> = { cross: 0, circle: 1, square: 2, triangle: 3, L1: 4, R1: 5, L2: 6, R2: 7, share: 8, options: 9, L3: 10, R3: 11, up: 12, down: 13, left: 14, right: 15, home: 16 };
/** The sticks' directions: [axis, sign]. */
export const PAD_STICKS: Readonly<Record<string, readonly [number, number]>> = { lsUp: [1, -1], lsDown: [1, 1], lsLeft: [0, -1], lsRight: [0, 1], rsUp: [3, -1], rsDown: [3, 1], rsLeft: [2, -1], rsRight: [2, 1] };
export const MOUSE_INPUTS = ["left", "right", "middle", "wheelUp", "wheelDown"] as const;
/** A stick's dead zone (its middle, read as still), and how far over to count as a press. */
const DEAD = 0.18, PRESS = 0.5;

/** The defaults, as config/bindings.json has them. */
export const DEFAULTS: readonly Action[] = Object.entries(table.actions).map(([id, a]) => ({ ...(a as Omit<Action, "id">), id: id as ActionId, context: a.context as Context }));
const BY_ID = new Map(DEFAULTS.map(a => [a.id, a]));

/** Two or more actions in one context on one input: `input` as "key:KeyE", "mouse:left" or "pad:cross". */
export interface Conflict { context: Context; input: string; actions: ActionId[] }

const STORE = "witch.bindings";
const clean = (b: Partial<Binding>): Partial<Binding> => {
  const out: Partial<Binding> = {};
  if (Array.isArray(b.keys)) out.keys = b.keys.filter(k => typeof k === "string" && k.length > 0);
  if (Array.isArray(b.mouse)) out.mouse = b.mouse.filter(m => (MOUSE_INPUTS as readonly string[]).includes(m));
  if (Array.isArray(b.pad)) out.pad = b.pad.filter(p => p in PAD_BUTTONS || p in PAD_STICKS);
  return out;
};

export class Bindings {
  private own: Partial<Record<ActionId, Partial<Binding>>> = {};
  private live = new Map<ActionId, Binding>();
  private listeners = new Set<() => void>();
  /** Bumped at each change, for readers that cache what they built from the bindings. */
  version = 0;

  constructor(private storage: Pick<Storage, "getItem" | "setItem" | "removeItem"> | null = null) {
    try {
      const saved = JSON.parse(storage?.getItem(STORE) ?? "{}") as Record<string, Partial<Binding>>;
      for (const [id, b] of Object.entries(saved ?? {})) if (BY_ID.has(id as ActionId) && b && typeof b === "object") this.own[id as ActionId] = clean(b);
    } catch { /* (storage blocked or spoilt: the defaults) */ }
    this.build();
  }

  /** Every action, its binding now and whether it's the default's: what the settings menu lists (dev ones too: it may leave them off). */
  list(): (Action & { isDefault: boolean })[] { return DEFAULTS.map(a => ({ ...a, ...this.get(a.id), isDefault: !this.own[a.id] })); }
  /** An action's binding now (the player's over the default). */
  get(id: ActionId): Binding { const b = this.live.get(id); if (!b) throw new Error(`no action ${id}`); return b; }
  /** An action's binding set (any of keys, mouse, pad; the rest kept), saved; returns the conflicts it leaves (all of them, not only
   *  this action's), which don't stop it: the menu shows them. Unknown mouse or pad names are an error. */
  set(id: ActionId, b: Partial<Binding>): Conflict[] {
    const def = BY_ID.get(id); if (!def) throw new Error(`no action ${id}`);
    const bad = [...(b.mouse ?? []).filter(m => !(MOUSE_INPUTS as readonly string[]).includes(m)), ...(b.pad ?? []).filter(p => !(p in PAD_BUTTONS) && !(p in PAD_STICKS))];
    if (bad.length) throw new Error(`not a mouse or pad input: ${bad.join(", ")}`);
    const next = { ...this.get(id), ...clean(b) };
    const same = (k: keyof Binding) => JSON.stringify(next[k]) === JSON.stringify(def[k]);
    const own: Partial<Binding> = {};
    for (const k of ["keys", "mouse", "pad"] as const) if (!same(k)) own[k] = next[k];
    if (Object.keys(own).length) this.own[id] = own; else delete this.own[id];
    this.changed();
    return this.conflicts();
  }
  /** An action back to its default. */
  reset(id: ActionId): void { delete this.own[id]; this.changed(); }
  /** Every action back to its default. */
  resetAll(): void { this.own = {}; this.changed(); }
  /** Every input two or more actions share in one context (global counting as both). */
  conflicts(): Conflict[] {
    const by = new Map<string, ActionId[]>();
    for (const a of DEFAULTS) {
      const b = this.get(a.id), inputs = [...b.keys.map(k => `key:${k}`), ...b.mouse.map(m => `mouse:${m}`), ...b.pad.map(p => `pad:${p}`)];
      for (const ctx of a.context === "global" ? ["game", "menu"] : [a.context]) for (const i of new Set(inputs)) { const k = `${ctx}|${i}`; by.set(k, [...(by.get(k) ?? []), a.id]); }
    }
    const out: Conflict[] = [];
    for (const [k, ids] of by) if (ids.length > 1) { const [context, input] = [k.slice(0, k.indexOf("|")), k.slice(k.indexOf("|") + 1)]; out.push({ context: context as Context, input, actions: ids }); }
    return out;
  }
  /** Told after every change; returns what stops telling. */
  onChange(fn: () => void): () => void { this.listeners.add(fn); return () => this.listeners.delete(fn); }

  // ---- for the readers ----
  keys(id: ActionId): readonly string[] { return this.get(id).keys; }
  mouse(id: ActionId): readonly string[] { return this.get(id).mouse; }
  pad(id: ActionId): readonly string[] { return this.get(id).pad; }
  /** How far the pad holds `id` down now, 0 to 1 (a stick's direction past its dead zone, scaled; a button 0 or 1). */
  padValue(id: ActionId, buttons: readonly boolean[], axes: readonly number[]): number {
    let v = 0;
    for (const p of this.get(id).pad) v = Math.max(v, inputValue(p, buttons, axes));
    return v;
  }
  /** Whether the pad pressed `id` this frame (down now, not last frame: a stick's direction past halfway). */
  padPressed(id: ActionId, buttons: readonly boolean[], axes: readonly number[], prev: readonly boolean[], prevAxes: readonly number[] = []): boolean {
    return this.get(id).pad.some(p => inputValue(p, buttons, axes) >= PRESS && inputValue(p, prev, prevAxes) < PRESS);
  }
  /** Whether the pad holds `id` down (past halfway). */
  padHeld(id: ActionId, buttons: readonly boolean[], axes: readonly number[]): boolean { return this.padValue(id, buttons, axes) >= PRESS; }
  /** The pad's buttons (their numbers) bound to `id`, sticks left out. */
  padButtons(id: ActionId): number[] { return this.get(id).pad.filter(p => p in PAD_BUTTONS).map(p => PAD_BUTTONS[p]); }

  private build(): void {
    this.live.clear();
    for (const a of DEFAULTS) { const o = this.own[a.id] ?? {}; this.live.set(a.id, { keys: [...(o.keys ?? a.keys)], mouse: [...(o.mouse ?? a.mouse)], pad: [...(o.pad ?? a.pad)] }); }
  }
  private changed(): void {
    this.build(); this.version++;
    try { if (Object.keys(this.own).length) this.storage?.setItem(STORE, JSON.stringify(this.own)); else this.storage?.removeItem(STORE); } catch { /* (storage blocked: this page's only) */ }
    for (const f of this.listeners) f();
  }
}

/** One pad input's value now: a button 0 or 1, a stick direction its share past the dead zone (the stick's whole length, not an axis
 *  alone, so a diagonal isn't dead along one axis). */
export function inputValue(p: string, buttons: readonly boolean[], axes: readonly number[]): number {
  if (p in PAD_BUTTONS) return buttons[PAD_BUTTONS[p]] ? 1 : 0;
  const s = PAD_STICKS[p]; if (!s) return 0;
  const [ax, sign] = s, base = ax < 2 ? 0 : 2, x = axes[base] ?? 0, y = axes[base + 1] ?? 0, mag = Math.hypot(x, y);
  if (mag < DEAD) return 0;
  const k = (Math.min(1, mag) - DEAD) / (1 - DEAD) / mag;
  return Math.max(0, sign * (axes[ax] ?? 0) * k);
}

/** A pad input's sign for words (a hint line, the controls list): ✕ ○ □ △ for the face buttons, else its name. */
export const PAD_SIGNS: Readonly<Record<string, string>> = { cross: "✕", circle: "○", square: "□", triangle: "△", up: "d-pad up", down: "d-pad down", left: "d-pad left", right: "d-pad right", lsUp: "left stick", lsDown: "left stick", lsLeft: "left stick", lsRight: "left stick", rsUp: "right stick", rsDown: "right stick", rsLeft: "right stick", rsRight: "right stick", options: "Options", share: "Share", home: "PS" };
/** An action's pad inputs now, in words ("R2 or L2"; "none"). */
export function padName(id: ActionId, B: Bindings = bindings): string {
  const names = [...new Set(B.pad(id).map(p => PAD_SIGNS[p] ?? p))];
  return names.length ? names.join(" or ") : "none";
}
/** A key's name for words (KeyE: E, Space, Shift, the arrows). */
export function keyName(code: string): string {
  const m = /^(?:Key([A-Z])|Digit(\d))$/.exec(code);
  if (m) return m[1] ?? m[2];
  return ({ Space: "Space", ArrowUp: "↑", ArrowDown: "↓", ArrowLeft: "←", ArrowRight: "→", ShiftLeft: "Shift", ShiftRight: "Shift", Escape: "Esc", Backquote: "~", Equal: "+", Minus: "−", NumpadAdd: "+", NumpadSubtract: "−", Enter: "Enter", NumpadEnter: "Enter" } as Record<string, string>)[code] ?? code;
}
/** An action's keys and mouse buttons now, in words ("Space"; "left click or 1"; "none"). */
export function keysName(id: ActionId, B: Bindings = bindings): string {
  const mouse: Record<string, string> = { left: "left click", right: "right click", middle: "middle click", wheelUp: "wheel up", wheelDown: "wheel down" };
  const names = [...new Set([...B.mouse(id).map(m => mouse[m] ?? m), ...B.keys(id).map(keyName)])];
  return names.length ? names.join(" or ") : "none";
}

const store = (() => { try { return typeof localStorage !== "undefined" ? localStorage : null; } catch { return null; } })();
/** The game's bindings: the defaults, the player's over them. */
export const bindings = new Bindings(store);
