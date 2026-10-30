import { expect, it } from "vitest";
import { sessionDeparture } from "./departure";
it("cleans up once before full navigation even when close callbacks repeat", () => {
  const calls: string[] = [], leave = sessionDeparture(() => calls.push("cleanup"), () => calls.push("replace"));
  leave(); leave(); expect(calls).toEqual(["cleanup", "replace"]);
});
it("still navigates if cleanup reports an error", () => {
  let navigated = false;
  const leave = sessionDeparture(() => { throw new Error("dispose failed"); }, () => { navigated = true; });
  expect(leave).toThrow("dispose failed"); expect(navigated).toBe(true);
});
