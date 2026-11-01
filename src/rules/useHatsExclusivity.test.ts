import { afterEach, expect, it } from "vitest";
import type { Witch } from "./game";
import { floorHats, HAT_FLOOR, hatSlots, hatToTake, installEdLayout, useHats } from "./houseRooms";
import { newHat } from "./hat";
import { newSpells, setLoadout } from "./spells";
import { TUNING } from "./tuning";
import { beforeUseHats } from "./useHats.before.fixture";
afterEach(() => installEdLayout(false));
const at = { x: 0, z: 0 };
function witch(id = 0) {
  const W = { id, spells: newSpells(TUNING), hat: newHat(), house: { hats: HAT_FLOOR.map(id => id === "lullaby" ? id : "") } } as unknown as Witch;
  setLoadout(W.spells, "mine"); return W;
}
it("matches the captured solo behavior byte-for-byte with no hook or an always-free hook", () => {
  for (const ed of [false, true]) for (const kind of ["slot", "bare-slot", "own", "distant", "left"]) {
    installEdLayout(ed); const W = witch();
    const slot = hatSlots(at)[floorHats(W).indexOf("lullaby")]; let p = slot;
    if (kind === "bare-slot") W.hat.down = { x: 2000, z: 2000, at: 0 };
    if (kind === "own" || kind === "left") { W.hat.down = { x: 2000, z: 2000, at: 0 }; p = { x: 2000, z: 2000 }; }
    if (kind === "left") { W.hat.left = [{ x: 3000, z: 3000, at: 0, spell: "lullaby" }]; p = { x: 3000, z: 3000 }; }
    if (kind === "distant") p = { x: 10000, z: 10000 };
    const a = structuredClone(W), b = structuredClone(W), c = structuredClone(W);
    const expected = beforeUseHats(a, at, p.x, p.z, 2, 1);
    expect(useHats(b, at, p.x, p.z, 2, 1)).toEqual(expected);
    expect(useHats(c, at, p.x, p.z, 2, 1, .9, () => false)).toEqual(expected);
    expect(JSON.stringify(b)).toBe(JSON.stringify(a)); expect(JSON.stringify(c)).toBe(JSON.stringify(a));
  }
});
it("refuses a floor hat already worn by another witch and permits it once released", () => {
  for (const ed of [false, true]) {
    installEdLayout(ed); const host = witch(0), guest = witch(1); setLoadout(host.spells, "lullaby");
    const p = hatSlots(at)[floorHats(guest).indexOf("lullaby")], hostBefore = JSON.stringify(host);
    expect(useHats(guest, at, p.x, p.z, 2, 1, .9, id => host.spells.hat === id)).toBeNull();
    expect(guest.spells.hat).toBe("mine"); expect(floorHats(guest)).toContain("lullaby"); expect(JSON.stringify(host)).toBe(hostBefore);
    setLoadout(host.spells, "none"); expect(useHats(guest, at, p.x, p.z, 3, 1, .9, id => host.spells.hat === id)?.kind).toBe("hatPicked"); expect(guest.spells.hat).toBe("lullaby");
  }
});
it("refuses taken dropped and left hats before changing them", () => {
  installEdLayout(true);
  for (const left of [false, true]) {
    const W = witch(); W.hat.down = { x: 2000, z: 2000, at: 0 }; if (left) W.hat.left.push({ x: 3000, z: 3000, at: 0, spell: "lullaby" });
    const p = left ? { x: 3000, z: 3000 } : { x: 2000, z: 2000 }; hatToTake(W, at, p.x, p.z, 1); const before = JSON.stringify(W);
    expect(useHats(W, at, p.x, p.z, 2, 1, .9, () => true)).toBeNull(); expect(JSON.stringify(W)).toBe(before);
  }
});
