import { expect, it, vi } from "vitest";
import { fillTrunk, FIND_KINDS } from "../rules/finds";
import { fillNightTrunk } from "./nightFindBoundary";
const fixture = () => ({ trunk: { kind: "wearable", item: null, found: false, x: 1, z: 2, cell: [0, 0] }, map: { seed: 123 } }) as Parameters<typeof fillTrunk>[0];
it("keeps solo find selection identical and checkpoints host selection once without reading a guest collection", () => {
  const solo = fixture(), expected = fixture(), host = fixture(), guest = fixture(), found = vi.fn(() => ({})), changed = vi.fn();
  fillTrunk(expected, {}); expect(fillNightTrunk(solo, "solo", found, changed)).toBe(true); expect(solo).toEqual(expected); expect(changed).not.toHaveBeenCalled();
  expect(fillNightTrunk(host, "host", found, changed)).toBe(true); expect(host).toEqual(expected); expect(changed).toHaveBeenCalledTimes(1);
  expect(fillNightTrunk(host, "host", found, changed)).toBe(false); expect(changed).toHaveBeenCalledTimes(1);
  found.mockClear(); const before = structuredClone(guest);
  expect(fillNightTrunk(guest, "guest", found, changed)).toBe(false); expect(guest).toEqual(before); expect(found).not.toHaveBeenCalled();
});
it("publishes removal when the host already owns every possible find", () => {
  const game = fixture(), changed = vi.fn(), all = Object.fromEntries(FIND_KINDS.map(kind => [kind.id, new Set(kind.items)]));
  expect(fillNightTrunk(game, "host", () => all, changed)).toBe(true); expect(game.trunk).toBeNull(); expect(changed).toHaveBeenCalledTimes(1);
});
