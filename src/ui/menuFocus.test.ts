import { afterEach, expect, it, vi } from "vitest";
import { adjustMenuValue, MenuFocus, menuFocusStep } from "./menuFocus";

afterEach(() => vi.unstubAllGlobals());

it("pad navigation reaches every existing pause control, wraps and leaves an empty panel safely", () => {
  let focus = 0;
  const reached = new Set([focus]);
  for (let i = 0; i < 7; i++) { focus = menuFocusStep(focus, 7, "down"); reached.add(focus); }
  expect([...reached]).toEqual([0, 1, 2, 3, 4, 5, 6]);
  expect(focus).toBe(0);
  expect(menuFocusStep(0, 7, "up")).toBe(6);
  expect(menuFocusStep(99, 2, "down")).toBe(0);
  expect(menuFocusStep(0, 0, "down")).toBe(-1);
});

it("native slider changes notify both live-input and persisted-change listeners", () => {
  const values: string[] = [];
  const slider = { tagName: "INPUT", type: "range", value: 0.5, stepUp() { this.value = Math.min(1, this.value + 0.1); }, stepDown() { this.value = Math.max(0, this.value - 0.1); }, dispatchEvent(e: Event) { values.push(`${e.type}:${this.value}`); } };
  expect(adjustMenuValue(slider as unknown as HTMLElement, 1)).toBe(true);
  expect(values).toEqual(["input:0.6", "change:0.6"]);
  expect(adjustMenuValue({ tagName: "BUTTON" } as HTMLElement, 1)).toBe(false);
});

it("opening a panel with choose held does not click through; hidden and disabled controls are skipped, Back stays in that panel", () => {
  vi.stubGlobal("document", { createElement: () => ({}), head: { append() {} } });
  const control = (visible = true, disabled = false) => ({ tagName: "BUTTON", classList: { add: vi.fn(), remove: vi.fn() }, matches: () => disabled, getClientRects: () => visible ? [{}] : [], click: vi.fn(), focus: vi.fn(), scrollIntoView: vi.fn() });
  const first = control(), hidden = control(false), disabled = control(true, true), last = control();
  const root = { querySelectorAll: () => [first, hidden, disabled, last] } as unknown as HTMLElement;
  const pad = (button: number) => ({ buttons: Array.from({ length: 17 }, (_, i) => ({ pressed: i === button })), axes: [0, 0] }) as unknown as Gamepad;
  const nav = new MenuFocus(), back = vi.fn();
  nav.update([root], pad(0), 0, back);
  nav.update([root], pad(0), 1, back);
  expect(first.click).not.toHaveBeenCalled();
  nav.update([root], pad(13), 2, back);
  expect(first.focus).toHaveBeenCalled();
  nav.update([root], pad(13), 2.5, back);
  expect(last.focus).toHaveBeenCalled();
  nav.update([root], pad(0), 3, back);
  expect(last.click).toHaveBeenCalledOnce();
  nav.update([root], pad(1), 4, back);
  expect(back).toHaveBeenCalledOnce();
  const textPanel = { querySelectorAll: () => [first], scrollHeight: 1000, clientHeight: 200, scrollTop: 0 } as unknown as HTMLElement;
  nav.update([textPanel], pad(-1), 5, back);
  nav.update([textPanel], pad(13), 6, back);
  nav.update([textPanel], pad(13), 6.5, back);
  expect(textPanel.scrollTop).toBe(200);
});

it("a press made after the pause began but before its first frame still counts; the opening press itself does not", () => {
  // (the pause-on-top B flake, 2026-10-30: a slow frame came 3 s after Esc, B already down, and the page took it for its opening press)
  vi.stubGlobal("document", { createElement: () => ({}), head: { append() {} } });
  const root = { querySelectorAll: () => [] } as unknown as HTMLElement;
  const pad = (button: number) => ({ buttons: Array.from({ length: 17 }, (_, i) => ({ pressed: i === button })), axes: [0, 0] }) as unknown as Gamepad;
  const none = Array.from({ length: 17 }, () => false), withB = none.map((_, i) => i === 1);
  const late = vi.fn(); new MenuFocus().update([root], pad(1), 0, late, none); // (Esc with nothing held; B down by the first frame)
  expect(late).toHaveBeenCalledOnce();
  const opening = vi.fn(), held = new MenuFocus(); held.update([root], pad(1), 0, opening, withB); held.update([root], pad(1), 1, opening); // (B held as it opened)
  expect(opening).not.toHaveBeenCalled();
  const unknown = vi.fn(); new MenuFocus().update([root], pad(1), 0, unknown); // (no record of the opening: primed with what's held, as before)
  expect(unknown).not.toHaveBeenCalled();
});

it("a fresh pause snapshot resets old Back history even if no frame saw the menu close", () => {
  vi.stubGlobal("document", { createElement: () => ({}), head: { append() {} } });
  const root = { querySelectorAll: () => [] } as unknown as HTMLElement;
  const pad = (button: number) => ({ buttons: Array.from({ length: 17 }, (_, i) => ({ pressed: i === button })), axes: [0, 0] }) as unknown as Gamepad;
  const none = Array<boolean>(17).fill(false), withB = none.map((_, i) => i === 1);
  const nav = new MenuFocus(), back = vi.fn();
  nav.update([root], pad(-1), 0, back, none);
  nav.update([root], pad(1), 1, back);
  expect(back).toHaveBeenCalledTimes(1);
  // Resume, release B and reopen with Esc between menu frames. By the next frame B is down again.
  nav.update([root], pad(1), 10, back, none);
  expect(back).toHaveBeenCalledTimes(2);
  // A B already held at a subsequent opening is still suppressed, however late the frame.
  nav.update([root], pad(1), 20, back, withB);
  nav.update([root], pad(1), 30, back);
  expect(back).toHaveBeenCalledTimes(2);
  nav.update([root], pad(-1), 31, back);
  nav.update([root], pad(1), 32, back);
  expect(back).toHaveBeenCalledTimes(3);
});
