import { expect, it, vi } from "vitest";
import type { View } from "../../render/view";
import type { Game } from "../../rules/game";
import { otherWitches } from "./otherWitches";
import { Layers } from "three";
import { HOUSE_LAYER } from "../../render/post";
import { newGame, newWitchPlayer } from "../../rules/game";
import { TUNING } from "../../rules/tuning";
vi.mock("../../render/height", async importOriginal => ({ ...await importOriginal<typeof import("../../render/height")>(), groundHeight: () => 0 }));

it.each([0, 1])("player %s submits the other witch on the enclosed-house camera layer", player => {
  const tuning = structuredClone(TUNING); tuning.map!.island = "home"; tuning.map!.islandAreas = 4;
  const game = newGame(123, tuning); game.witches.push(newWitchPlayer(1, 1, 0, tuning));
  const frame = { w: 10, h: 20 }, atlas = { frames: Array(100).fill(frame) };
  const mesh = { layers: new Layers(), material: { depthTest: true, transparent: false }, renderOrder: 0 };
  let instances: unknown[] = [];
  const batch = { atlas, mesh, meshes: [mesh], set: (items: unknown[]) => { instances = items; }, release: vi.fn() };
  const view = { witchBatch: { set: vi.fn() }, makeWitchBatch: () => batch,
    assets: { witch: atlas, witchFoot: { idle: { towards: [0], away: [1], fps: 4 } }, treehouse: { atlas: { frames: [frame] }, ent: null } },
    mpp: 1, scene: { remove: vi.fn() } } as unknown as View;
  const release = otherWitches(view, game, player);
  view.witchBatch.set([]);
  expect(instances).toHaveLength(1);
  expect(instances[0]).toMatchObject({ x: game.witches[1 - player].body.x, z: game.witches[1 - player].body.z });
  const camera = new Layers(); camera.set(HOUSE_LAYER);
  expect(mesh.layers.test(camera)).toBe(true);
  release();
});
it("releases only remote batch buffers on departure/redial and restores the exact local updater", () => {
  const original = vi.fn(), releaseA = vi.fn(), releaseB = vi.fn(), dispose = vi.fn(() => { throw Error("Shared atlas must not be disposed"); });
  const a = { meshes: [{ id: "remote-a", layers: new Layers() }], release: releaseA, dispose }, b = { meshes: [{ id: "remote-b", layers: new Layers() }], release: releaseB, dispose };
  const remove = vi.fn(), view = { witchBatch: { set: original }, makeWitchBatch: vi.fn().mockReturnValueOnce(a).mockReturnValueOnce(b), scene: { remove } } as unknown as View;
  const first = otherWitches(view, {} as Game, 0); expect(view.witchBatch.set).not.toBe(original);
  const second = otherWitches(view, {} as Game, 0); expect(releaseA).toHaveBeenCalledTimes(1); first(); expect(releaseA).toHaveBeenCalledTimes(1);
  second(); second(); expect(releaseB).toHaveBeenCalledTimes(1); expect(view.witchBatch.set).toBe(original);
  expect(remove.mock.calls).toEqual([[...a.meshes], [...b.meshes]]); expect(dispose).not.toHaveBeenCalled();
});
