import { afterEach, expect, it, vi } from "vitest";
import type { Game } from "../rules/game";
afterEach(() => { vi.unstubAllGlobals(); vi.resetModules(); });
it("typing a period in the paused comment does not advance the simulation, while the existing canvas shortcut still does", async () => {
  let keydown: (e: KeyboardEvent) => void = () => {};
  vi.stubGlobal("window", { addEventListener(type: string, handler: (e: KeyboardEvent) => void) { if (type === "keydown") keydown = handler; } });
  vi.stubGlobal("navigator", {});
  vi.stubGlobal("document", { addEventListener() {}, createElement: () => ({ style: {}, addEventListener() {} }), head: { append() {} }, body: { append() {}, classList: { toggle() {} } } });
  const { Freeze } = await import("./freeze");
  const freeze = new Freeze({ clock: { paused: true } } as Game, 1, "test"); freeze.toggle();
  const step = vi.spyOn(freeze, "step").mockImplementation(() => {});
  const event = (tagName: string) => ({ type: "keydown", code: "Period", target: { tagName, closest: () => true }, preventDefault: vi.fn(), stopImmediatePropagation: vi.fn() }) as unknown as KeyboardEvent;
  const typing = event("TEXTAREA"); keydown(typing);
  expect(step).not.toHaveBeenCalled(); expect(typing.preventDefault).not.toHaveBeenCalled();
  keydown(event("CANVAS")); expect(step).toHaveBeenCalledWith(1);
});
