import { expect, it, vi } from "vitest";
import { chartDeparture } from "./chartDeparture";
it("ends the host call before normal settlement and leaves solo departure synchronous", () => {
  let role: "host" | null = "host"; const order: string[] = [], returnOwn = vi.fn(async () => {});
  const boundary = chartDeparture({ role: () => role, borrowed: () => false, endCall: () => { order.push("hang up"); role = null; }, returnOwn });
  expect(boundary.before()).toBeNull(); order.push("settle own", "sail own");
  expect(order).toEqual(["hang up", "settle own", "sail own"]); expect(returnOwn).not.toHaveBeenCalled();
  expect(boundary.before()).toBeNull(); expect(order).toHaveLength(3);
});
it("serializes flight preparation and handoff behind restored saves and own settings", async () => {
  let role: "guest" | null = "guest", borrowed = true, settings = "host";
  const order: string[] = []; let restored!: () => void;
  const saves = new Promise<void>(resolve => { restored = resolve; });
  const returnOwn = vi.fn(async () => { order.push("restore saves"); await saves; borrowed = false; settings = "own"; order.push("fresh own night"); });
  const boundary = chartDeparture({ role: () => role, borrowed: () => borrowed, endCall: () => { order.push("hang up"); role = null; }, returnOwn });
  const preparation = boundary.before()!, handoff = boundary.before(); expect(handoff).toBe(preparation);
  const travel = preparation.then(() => { order.push(`settle ${settings}`, `sail ${settings}`); });
  await Promise.resolve(); expect(order).toEqual(["hang up", "restore saves"]);
  restored(); await travel;
  expect(order).toEqual(["hang up", "restore saves", "fresh own night", "settle own", "sail own"]);
  expect(returnOwn).toHaveBeenCalledTimes(1); expect(boundary.before()).toBeNull();
});
it("refuses early settlement/reload if return fails or still leaves a borrowed night", async () => {
  const settle = vi.fn(), reload = vi.fn(); let broken = true;
  const boundary = chartDeparture({ role: () => null, borrowed: () => true, endCall: vi.fn(), returnOwn: async () => { if (broken) throw new Error("save restore failed"); } });
  await expect(boundary.before()!.then(settle).then(reload)).rejects.toThrow("save restore failed");
  broken = false;
  await expect(boundary.before()!.then(settle).then(reload)).rejects.toThrow("Return to your own night before sailing.");
  expect(settle).not.toHaveBeenCalled(); expect(reload).not.toHaveBeenCalled();
});
