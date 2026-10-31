import { expect, it, vi } from "vitest";
import { buildProgress } from "./buildProgress";

it("renews only after actual named or unnamed build work and preserves wait objects", () => {
  const advance = vi.fn(), wait = { wait: async () => 2, here: () => 2 };
  function* work() { yield "tufts"; yield; yield wait; return 42; }
  const steps = buildProgress(work(), advance);
  expect(advance).not.toHaveBeenCalled();
  expect(steps.next().value).toBe("tufts"); expect(advance).toHaveBeenCalledTimes(1);
  expect(steps.next().value).toBeUndefined(); expect(advance).toHaveBeenCalledTimes(2);
  expect(steps.next().value).toBe(wait); expect(advance).toHaveBeenCalledTimes(3);
  expect(steps.next()).toEqual({ done: true, value: 42 }); expect(advance).toHaveBeenCalledTimes(4);
});
