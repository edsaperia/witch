import { expect, it, vi } from "vitest";
import type { View } from "../../render/view";
import type { Game } from "../../rules/game";
import { otherWitches } from "./otherWitches";
it("releases only remote batch buffers on departure/redial and restores the exact local updater", () => {
  const original = vi.fn(), releaseA = vi.fn(), releaseB = vi.fn(), dispose = vi.fn(() => { throw Error("Shared atlas must not be disposed"); });
  const a = { meshes: [{ id: "remote-a" }], release: releaseA, dispose }, b = { meshes: [{ id: "remote-b" }], release: releaseB, dispose };
  const remove = vi.fn(), view = { witchBatch: { set: original }, makeWitchBatch: vi.fn().mockReturnValueOnce(a).mockReturnValueOnce(b), scene: { remove } } as unknown as View;
  const first = otherWitches(view, {} as Game, 0); expect(view.witchBatch.set).not.toBe(original);
  const second = otherWitches(view, {} as Game, 0); expect(releaseA).toHaveBeenCalledTimes(1); first(); expect(releaseA).toHaveBeenCalledTimes(1);
  second(); second(); expect(releaseB).toHaveBeenCalledTimes(1); expect(view.witchBatch.set).toBe(original);
  expect(remove.mock.calls).toEqual([[...a.meshes], [...b.meshes]]); expect(dispose).not.toHaveBeenCalled();
});
