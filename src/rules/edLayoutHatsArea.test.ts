// Ed, 2026-11-02: "we should remove the old cloakroom hats area." In his arrangement (the default house: app/houseLayout.ts) the
// Cloakroom's hats' floor is gone, drawn and used nowhere; her hats lie on the numbered spawn points, each taken with E, the prompt
// there answering to "hats" (the guidance pin keeps clear of it: render/view/guidance.ts). The classic house keeps its hats' floor.
import { afterEach, describe, expect, it } from "vitest";
import proposal from "../../config/house/layouts/ed-current.json";
import { newGame as fullGame } from "./game";
import { TUNING } from "./tuning";
import { smallWorld } from "../test/worlds";
import { HAT_FLOOR, HOUSE_ROOMS, addFloorHat, fromPlan, hatPromptAt, hatSlots, hatToTake, installEdLayout, objectAt, toPlan, useHats } from "./houseRooms";
import { deckOf } from "./treehouse";
import { stationAuthority } from "../platform/online/stationAuthority";

const newGame = smallWorld(fullGame, "The treehouse's hats need one real house, not distant islands.");

describe("the old Cloakroom hats' area", () => {
  afterEach(() => installEdLayout(false));

  it("is not in Ed's arrangement: no hats object or zone in the Cloakroom, in the layout or the house", () => {
    expect(proposal.objects.some(p => p.id === "hats" || ("kind" in p && p.kind === "hat-spawn-zone"))).toBe(false);
    expect(proposal.removedObjects).toEqual(["hats"]);
    installEdLayout(true);
    expect(HOUSE_ROOMS.objects.some(o => o.id === "hats" || o.use.kind === "hats")).toBe(false);
    expect(HOUSE_ROOMS.objects.some(o => o.room === "cloakroom" && (o.use.kind === "hats" || o.label === "Hats"))).toBe(false);
    expect(HOUSE_ROOMS.layout!.hatPoints).toHaveLength(15);
  });

  it("leaves the hats on the spawn points to take with E, the prompt there the hats' own", () => {
    installEdLayout(true);
    const g = newGame(123, TUNING), W = g.witches[0], at = deckOf(g.map, g.tuning)!, id = HAT_FLOOR[0];
    W.spells.hat = "none"; W.spells.hats = [id]; W.hat = { has: true, down: null, left: [] };
    W.house = { hats: HAT_FLOOR.map(() => ""), hatFloorVersion: 2 };
    addFloorHat(W, id);
    const slots = hatSlots(at), i = W.house.hats!.indexOf(id), p = slots[i];
    expect(i).toBeGreaterThanOrEqual(0);
    // (where the old area lay, nothing to use)
    const was = HOUSE_ROOMS.layout!.baseline.objects.find(o => o.id === "hats")!;
    const old = fromPlan(at, was.x, was.z, HOUSE_ROOMS.turn ?? 0); expect(objectAt(at, old.x, old.z)?.use.kind).not.toBe("hats");
    const by = hatToTake(W, at, p.x, p.z, g.tuning.leash.runeRadius)!;
    expect(by.slot).toBe(i);
    const plan = toPlan(at, by.x, by.z), prompt = hatPromptAt(plan.x, plan.z);
    expect(prompt).toMatchObject({ id: "hats", label: "Hats", use: { kind: "hats" }, x: plan.x, z: plan.z, h: 0 });
    expect(prompt.room).not.toBe("cloakroom");
    expect(useHats(W, at, p.x, p.z, 1, g.tuning.leash.runeRadius)?.kind).toBe("hatPicked");
    expect(W.spells.hat).toBe(id);
  });

  it("lets an online guest choose a hat by the spawn points, not by where the old area lay", () => {
    installEdLayout(true);
    const tuning = structuredClone(TUNING); tuning.map!.island = "home"; tuning.map!.islandAreas = 4;
    const game = newGame(123, tuning, 2), guest = game.witches[1], deck = deckOf(game.map, tuning)!, p = hatSlots(deck)[0];
    const authority = stationAuthority(() => ({ bags: new Set(), parts: new Set(), hats: new Set([HAT_FLOOR[0]]) }));
    Object.assign(guest.body, { x: p.x, z: p.z, perch: true, mode: "ground", seated: false });
    expect(authority(game, 1, { kind: "hat", id: HAT_FLOOR[0] })).toBe(true);
    const was = HOUSE_ROOMS.layout!.baseline.objects.find(o => o.id === "hats")!;
    Object.assign(guest.body, fromPlan(deck, was.x, was.z, HOUSE_ROOMS.turn ?? 0));
    expect(authority(game, 1, { kind: "hat", id: HAT_FLOOR[0] })).toBe(false);
  });

  it("stays in the classic house, its prompt the hats' floor's own", () => {
    installEdLayout(false);
    const area = HOUSE_ROOMS.objects.find(o => o.use.kind === "hats")!;
    expect(area).toMatchObject({ id: "hats", room: "cloakroom" });
    expect(hatPromptAt(1, 2)).toEqual({ ...area, x: 1, z: 2 });
  });
});
