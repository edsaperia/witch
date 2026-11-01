import { expect, it, vi } from "vitest";
import type { Game } from "../../rules/game";
import type { View } from "../../render/view";
import type { WitchLookLease } from "../../render/witchLookLease";
import { WITCH_GENOME } from "../../../art/witchGenome.js";
import { remoteAppearance } from "./remoteAppearance";
const game = () => ({ witches: [{ id: 0 }, { id: 1 }] }) as Game;
it("binds approved remote art once, then removes drawing before freeing its lease", async () => {
  const events: string[] = [], lease = { release: vi.fn(() => events.push("release")) } as unknown as WitchLookLease;
  const bake = vi.fn(async () => lease), remove = vi.fn(() => events.push("remove")); let drawn!: ReadonlyMap<number, WitchLookLease>;
  const art = remoteAppearance({ assets: { leaseWitchLook: bake } } as unknown as Pick<View, "assets">, (_g, player, looks) => { expect(player).toBe(1); drawn = looks; return remove; });
  await art.look(0, WITCH_GENOME); const source = game(); await art.start(source, 1); await art.start(source, 1);
  expect(bake).toHaveBeenCalledTimes(1); expect(drawn.get(0)).toBe(lease); expect(drawn.has(1)).toBe(false);
  art.clear(); art.clear(); expect(remove).toHaveBeenCalledTimes(1); expect(lease.release).toHaveBeenCalledTimes(1); expect(events).toEqual(["remove", "release"]);
});
it("disposes a late lease after departure without installing it in the next call", async () => {
  let finish!: (lease: WitchLookLease) => void; const release = vi.fn();
  const bake = vi.fn(() => new Promise<WitchLookLease>(r => { finish = r; })), maps: ReadonlyMap<number, WitchLookLease>[] = [];
  const art = remoteAppearance({ assets: { leaseWitchLook: bake } } as unknown as Pick<View, "assets">, (_g, _p, looks) => { maps.push(looks); return () => {}; });
  await art.look(0, WITCH_GENOME); const pending = art.start(game(), 1); art.clear(); finish({ release } as unknown as WitchLookLease); await pending;
  expect(release).toHaveBeenCalledTimes(1); expect(maps[0].size).toBe(0); expect(art.has(0)).toBe(false);
  await expect(art.look(0, { inventory: "spoof" })).rejects.toThrow("Invalid remote witch appearance"); expect(bake).toHaveBeenCalledTimes(1);
});
