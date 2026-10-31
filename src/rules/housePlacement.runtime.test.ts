import { afterEach, expect, it, vi } from "vitest";
import { smallWorld } from "../test/worlds";
afterEach(() => { vi.unstubAllGlobals(); vi.resetModules(); });

it("reserves one nearest point, picks the underfoot hat, refills released points and trims old origins", async () => {
  vi.resetModules();
  const rules = await import("./houseRooms"); rules.installEdLayout(true);
  const { newGame } = await import("./game"), { TUNING } = await import("./tuning"), { deckOf } = await import("./treehouse");
  const g = smallWorld(newGame, "Hat point regressions need one real house.")(123, TUNING), W = g.witches[0], deck = deckOf(g.map, g.tuning)!;
  const slots = rules.hatSlots(deck);
  W.spells.hat = "none"; W.hat = { has: true, down: { ...slots[0], at: 0 }, left: [] };
  W.house = { hats: slots.map(() => ""), hatFloorVersion: 2 };
  rules.reserveHatPoints(W, deck);
  expect(W.house.hatReserved).toEqual([0]);
  expect(W.house.hatPointOrigin).toEqual({ x: deck.x, z: deck.z });
  rules.addFloorHat(W, "mine"); expect(W.house.hats![1]).toBe("mine");
  expect(rules.hatToTake(W, deck, slots[1].x, slots[1].z, 2)?.slot).toBe(1);
  rules.useHats(W, deck, slots[1].x, slots[1].z, 1, 2);
  expect(W.spells.hat).toBe("mine"); expect(W.hat.left).toHaveLength(1);
  // A left hat underfoot wins over her own dropped hat farther away.
  W.hat.down = { x: slots[0].x + 1, z: slots[0].z, at: 2 };
  expect(rules.hatToTake(W, deck, slots[0].x, slots[0].z, 2)).toEqual(slots[0]);
  rules.useHats(W, deck, slots[0].x, slots[0].z, 3, 2);
  expect(W.spells.hat).toBe("none");
  // A full floor queues a find; lifting its only blocking hat fills that point immediately.
  W.hat = { has: true, down: { ...slots[0], at: 4 }, left: [] }; W.spells.hat = "none";
  W.house = { hats: slots.map((_, i) => i ? `occupied-${i}` : ""), hatFloorVersion: 2, hatOverflow: ["routeseer"] };
  rules.reserveHatPoints(W, deck); expect(W.house.hatOverflow).toEqual(["routeseer"]);
  rules.useHats(W, deck, slots[0].x, slots[0].z, 5, 2);
  expect(W.house.hats![0]).toBe("routeseer"); expect(W.house.hatOverflow).toEqual([]);
  // Old saves may contain a full deck object. Reading it retains coordinates only.
  W.house.hatPointOrigin = { ...deck };
  const { snapshotGame, restoreGame } = await import("./nightSnapshot");
  const restored = restoreGame(snapshotGame(g)).witches[0];
  rules.floorHats(restored);
  expect(restored.house!.hatPointOrigin).toEqual({ x: deck.x, z: deck.z });
  expect(Object.keys(restored.house!.hatPointOrigin!)).toEqual(["x", "z"]);
});

it("runs ordered spawn/pick/drop and legacy save loading through the actual opt-in house consumers", async () => {
  vi.stubGlobal("location", { search: "?layout=ed", href: "https://unit.invalid/?layout=ed" }); vi.resetModules();
  const rules = await import("./houseRooms"); rules.installEdLayout(true);
  const { newGame: fullGame, stepGame, STEP } = await import("./game"), { TUNING } = await import("./tuning");
  const { deckOf } = await import("./treehouse");
  const g = smallWorld(fullGame, "Opt-in hat placement lifecycle needs one real house, not distant island generation.")(123, TUNING), W = g.witches[0], d = deckOf(g.map, g.tuning)!;
  expect(rules.HOUSE_ROOMS.layout?.hatPoints.length).toBeGreaterThan(4);
  W.hat = { has: true, down: null, left: [] }; W.spells.hat = "none";
  W.house = { hats: rules.HAT_FLOOR.map(() => ""), hatFloorVersion: 2 };
  rules.addFloorHat(W, "lullaby"); rules.addFloorHat(W, "mine");
  expect(rules.floorHats(W).slice(0, 2)).toEqual(["lullaby", "mine"]);
  const slots = rules.hatSlots(d);
  expect(rules.hatToTake(W, d, slots[0].x, slots[0].z, 1)?.slot).toBe(0);
  expect(rules.useHats(W, d, slots[0].x, slots[0].z, 1, 1)?.kind).toBe("hatPicked");
  expect(W.spells.hat).toBe("lullaby"); expect(rules.floorHats(W)[0]).toBe("");
  rules.addFloorHat(W, "healing"); expect(rules.floorHats(W)[0]).toBe("healing");
  const saved = JSON.stringify(W.house); W.house = JSON.parse(saved);
  expect(rules.floorHats(W).slice(0, 2)).toEqual(["healing", "mine"]);
  const { snapshotGame, restoreGame } = await import("./nightSnapshot");
  const restored = restoreGame(snapshotGame(g));
  expect(rules.floorHats(restored.witches[0]).slice(0, 2)).toEqual(["healing", "mine"]);
  W.house = { hats: ["", "mine", "", "healing"] };
  W.house = restoreGame(snapshotGame(g)).witches[0].house;
  expect(rules.floorHats(W).slice(0, 4)).toEqual(["", "mine", "", "healing"]);
  rules.addFloorHat(W, "dowsing"); expect(rules.floorHats(W)[0]).toBe("dowsing");
  // A normal hat-button press on the opt-in house floor drops this actual hat, not a station action.
  g.wake = undefined; g.clock.paused = false; g.party.paused = true;
  W.body = { ...W.body, x: slots[2].x, z: slots[2].z, perch: true, seated: false, mode: "ground", vx: 0, vz: 0 };
  const idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
  stepGame(g, { ...idle, hat: true }, STEP);
  expect(W.hat.down).not.toBeNull(); expect(W.house!.hatReserved).toContain(2);
  stepGame(g, idle, STEP); stepGame(g, { ...idle, hat: true }, STEP);
  expect(W.hat.down).toBeNull(); expect(W.spells.hat).toBe("lullaby");
});

it("restores an opt-in save to default spell slots without losing occupants when the opt-in is removed", async () => {
  vi.resetModules(); const rules = await import("./houseRooms"), { newGame: fullGame } = await import("./game"), { TUNING } = await import("./tuning");
  const W = smallWorld(fullGame, "Save-mode compatibility needs only the current house.")(123, TUNING).witches[0];
  W.spells.hat = "none"; W.house = { hats: ["mine", "", "lullaby"], hatFloorVersion: 2, hatOverflow: ["healing"] };
  const values = rules.floorHats(W);
  for (const id of ["mine", "lullaby", "healing"]) expect(values[rules.HAT_FLOOR.indexOf(id)]).toBe(id);
  expect(values.filter(Boolean).sort()).toEqual(["healing", "lullaby", "mine"]); expect(W.house.hatFloorVersion).toBeUndefined();
});
