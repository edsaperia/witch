import { expect, it } from "vitest";
import { inputLease } from "./inputLease";

it("holds for 250ms, then neutralizes without waiting, and drops at 5s", () => {
  const lease = inputLease(() => ({ x: 0 }));
  expect(lease.sample(0)).toEqual({ input: { x: 0 }, dropped: true });
  expect(lease.accept({ x: 1 }, 0, 100)).toBe(true);
  expect(lease.sample(349).input.x).toBe(1);
  expect(lease.sample(350)).toEqual({ input: { x: 0 }, dropped: false });
  expect(lease.sample(5099).dropped).toBe(false);
  expect(lease.sample(5100).dropped).toBe(true);
});

it("rejects stale input without renewing its lease and isolates caller mutations", () => {
  const lease = inputLease(() => ({ x: 0 }), 10, 20), input = { x: 1 };
  lease.accept(input, 2, 0); input.x = 99;
  expect(lease.accept({ x: 2 }, 1, 9)).toBe(false);
  const sampled = lease.sample(9); expect(sampled.input.x).toBe(1); sampled.input.x = 99;
  expect(lease.sample(9).input.x).toBe(1);
  expect(lease.sample(10).input.x).toBe(0);
  expect(() => lease.sample(-1)).toThrow();
  expect(() => inputLease(() => 0, 20, 10)).toThrow();
});
