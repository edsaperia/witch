import { expect, it, vi } from "vitest";
import { soloDiagnostic } from "./soloDiagnostic";
it("preserves solo results and exceptions but never runs a diagnostic in a live/returning borrowed night", () => {
  const world = { ticks: 0 }, save = vi.fn(), action = vi.fn(() => { world.ticks++; save(); return 42; });
  for (const [online, borrowed] of [[true, false], [true, true], [false, true]]) expect(() => soloDiagnostic(online, borrowed, action)).toThrow("unavailable during a call");
  expect(world.ticks).toBe(0); expect(save).not.toHaveBeenCalled(); expect(action).not.toHaveBeenCalled();
  expect(soloDiagnostic(false, false, action)).toBe(42); expect(world.ticks).toBe(1); expect(save).toHaveBeenCalledTimes(1);
  expect(() => soloDiagnostic(false, false, () => { throw new Error("original failure"); })).toThrow("original failure");
});
