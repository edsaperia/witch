// The Settings page's Controls tab (ui/settingsMenu.ts; Ed's picks from the mock, 2026-10-28: two keys an action, a clash asks Swap /
// Use both / Cancel): an action's binding as two slots on one device (the keyboard and mouse, or the pad), a slot set to a new input,
// what else in its context has that input already, and the swap. No drawing and no events here; the bindings are
// platform/bindings.ts's (Juliet's), which save them.
import { DEFAULTS, PAD_BUTTONS, PAD_SIGNS, PAD_STICKS, keyName, type ActionId, type Binding, type Bindings, type Context } from "../platform/bindings";

export type Device = "keys" | "pad";
/** The slots an action shows on a device (each "key:KeyE", "mouse:left" or "pad:cross"). */
export const SLOTS = 2;

/** An action's inputs on a device, in order: its mouse buttons then its keys; or its pad inputs. */
export function inputsOf(b: Binding, device: Device): string[] {
  return device === "pad" ? b.pad.map(p => `pad:${p}`) : [...b.mouse.map(m => `mouse:${m}`), ...b.keys.map(k => `key:${k}`)];
}

/** The binding with slot `slot` on `device` set to `input` (null: emptied); the device's inputs past the shown slots are kept, and an
 *  input already in its other slot changes places with this one's. */
export function withSlot(b: Binding, device: Device, slot: number, input: string | null): Partial<Binding> {
  const next = inputsOf(b, device), j = input ? next.indexOf(input) : -1;
  if (input === null) { if (slot < next.length) next.splice(slot, 1); }
  else if (j >= 0) { if (slot < next.length && j !== slot) [next[j], next[slot]] = [next[slot], next[j]]; }
  else if (slot < next.length) next[slot] = input;
  else next.push(input);
  if (device === "pad") return { pad: next.map(i => i.slice(4)) };
  return { keys: next.filter(i => i.startsWith("key:")).map(i => i.slice(4)), mouse: next.filter(i => i.startsWith("mouse:")).map(i => i.slice(6)) };
}

const meets = (a: Context, b: Context) => a === b || a === "global" || b === "global";
const CONTEXT = new Map(DEFAULTS.map(a => [a.id, a.context]));

/** Choose and Back keep an input on each device, so remapping cannot strand the player outside Settings. */
const losesMenuInput = (id: ActionId, device: Device, b: Binding): boolean => (id === "menu.choose" || id === "menu.back") && !inputsOf(b, device).length;

/** A refused clear is a no-op; other actions may still be left unbound. */
export function clearSlot(B: Bindings, id: ActionId, device: Device, slot: number): boolean {
  const next = withSlot(B.get(id), device, slot, null);
  if (losesMenuInput(id, device, { ...B.get(id), ...next })) return false;
  B.set(id, next);
  return true;
}

/** The other actions that already have `input` where `id` works (its context; global counts in both). */
export function clashes(B: Bindings, id: ActionId, input: string): ActionId[] {
  const ctx = CONTEXT.get(id)!;
  return DEFAULTS.filter(a => a.id !== id && meets(a.context, ctx) && inputsOf(B.get(a.id), input.startsWith("pad:") ? "pad" : "keys").includes(input)).map(a => a.id);
}

/** What a clash's choice does. Swap: the slot takes `input` and each other action takes the slot's old input in its place (or loses
 *  it, the slot having been empty). Use both: the slot takes it and the others keep it too. */
export function assign(B: Bindings, id: ActionId, device: Device, slot: number, input: string, how: "swap" | "both"): ActionId | null {
  const old = inputsOf(B.get(id), device)[slot] ?? null;
  const changes = new Map<ActionId, Partial<Binding>>();
  if (how === "swap") for (const o of clashes(B, id, input)) {
    const at = inputsOf(B.get(o), device).indexOf(input);
    changes.set(o, withSlot(B.get(o), device, at, old && !inputsOf(B.get(o), device).includes(old) ? old : null));
  }
  changes.set(id, withSlot(B.get(id), device, slot, input));
  // Validate the whole swap before saving any part of it.
  for (const [action, change] of changes) if (losesMenuInput(action, device, { ...B.get(action), ...change })) return action;
  for (const [action, change] of changes) B.set(action, change);
  return null;
}

/** The pad input pressed now that wasn't last frame: a button, or a stick pushed past `PUSH` one way. */
const PUSH = 0.6;
export function padPress(buttons: readonly boolean[], axes: readonly number[], prev: readonly boolean[], prevAxes: readonly number[]): string | null {
  for (const [name, i] of Object.entries(PAD_BUTTONS)) if (buttons[i] && !prev[i]) return `pad:${name}`;
  for (const [name, [ax, sign]] of Object.entries(PAD_STICKS)) if (sign * (axes[ax] ?? 0) > PUSH && !(sign * (prevAxes[ax] ?? 0) > PUSH)) return `pad:${name}`;
  return null;
}
/** Whether nothing on the pad is held (a stick near its middle): listening starts only then, so the press that began it isn't taken. */
export const padIdle = (buttons: readonly boolean[], axes: readonly number[]): boolean => !buttons.some(b => b) && axes.every(a => Math.abs(a) < 0.3);

/** Xbox's names for the pad's inputs (the Settings page's Pad buttons). */
const XBOX: Record<string, string> = { cross: "A", circle: "B", square: "X", triangle: "Y", L1: "LB", R1: "RB", L2: "LT", R2: "RT", L3: "LS", R3: "RS", share: "View", options: "Menu", home: "Xbox" };
const MOUSE: Record<string, string> = { left: "Left click", right: "Right click", middle: "Middle click", wheelUp: "Wheel up", wheelDown: "Wheel down" };
const STICK: Record<string, string> = { lsUp: "L stick ↑", lsDown: "L stick ↓", lsLeft: "L stick ←", lsRight: "L stick →", rsUp: "R stick ↑", rsDown: "R stick ↓", rsLeft: "R stick ←", rsRight: "R stick →" };
const DPAD: Record<string, string> = { up: "D-pad ↑", down: "D-pad ↓", left: "D-pad ←", right: "D-pad →" };
/** An input's name on a slot: a key's, a mouse button's, a pad input's (PlayStation's or Xbox's). */
export function inputName(input: string, xbox = false): string {
  const [kind, name] = [input.slice(0, input.indexOf(":")), input.slice(input.indexOf(":") + 1)];
  if (kind === "key") return keyName(name);
  if (kind === "mouse") return MOUSE[name] ?? name;
  return STICK[name] ?? DPAD[name] ?? (xbox ? XBOX[name] : undefined) ?? PAD_SIGNS[name] ?? name;
}
