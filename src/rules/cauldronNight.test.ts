import { describe, expect, it } from "vitest";
import { hitWitch, newGame, stepGame, STEP, type Controls, type Game } from "./game";
import { enableCauldron, kitchenBasketPoints } from "./cauldronNight";
import { fromPlan, HOUSE_ROOMS } from "./houseRooms";
import { restoreGame, snapshotGame } from "./nightSnapshot";
import { TUNING } from "./tuning";

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
function fresh(players = 1): Game {
  const tuning = structuredClone(TUNING);
  tuning.map!.island = "home"; tuning.map!.islandAreas = 4;
  const g = newGame(123, tuning, players);
  g.clock.paused = false; g.party.spellAt = -100;
  for (const W of g.witches) W.body = { ...W.body, seated: false, perch: false, mode: "ground", lift: 0 };
  return g;
}
function kitchen(g: Game, id: number) {
  const r = HOUSE_ROOMS.rooms.find(r => r.id === "kitchen")!;
  const p = fromPlan(g.map.treehouse, r.x, r.z + 3, HOUSE_ROOMS.turn ?? 0);
  g.witches[id].body = { ...g.witches[id].body, ...p, perch: true, mode: "ground", lift: 0, vx: 0, vz: 0 };
}

describe("gated cauldron game hooks", () => {
  it("leaves ordinary nights disabled", () => {
    const g = fresh();
    stepGame(g, idle, STEP);
    expect(g.cauldron).toBeNull();
    expect(g.witches[0].mushrooms).toBeUndefined();
  });

  it("auto-collects once into her hidden bag after the party and keeps it through a knockout", () => {
    const g = fresh(), W = g.witches[0];
    W.body = { ...W.body, x: g.map.dancefloor.x + 15, z: g.map.dancefloor.z + 15 };
    enableCauldron(g, [{ id: 0, kind: "B", x: W.body.x, z: W.body.z, collected: false }]);
    g.partyOver = { at: 0, ease: 1 };
    stepGame(g, idle, STEP); stepGame(g, idle, STEP);
    expect(W.mushrooms!.bag.B).toBe(1);
    expect(W.leash.stack).toEqual([]);
    g.partyOver = null;
    W.health.hp = 1; W.health.hurtAt = -Infinity;
    hitWitch(g, 0, g.clock.time);
    expect(W.ko).not.toBeNull();
    for (let i = 0; i < 3600 && W.ko; i++) stepGame(g, idle, STEP);
    expect(W.ko).toBeNull();
    expect(W.mushrooms!.bag.B).toBe(1);
    expect(g.cauldron!.pickups[0].collected).toBe(true);
  }, 30000);

  it("deposits both visitors, retains partial ingredients and snapshots all occupants on BBB", () => {
    const g = fresh(2);
    enableCauldron(g, []);
    g.witches[0].mushrooms!.bag.B = 1;
    g.witches[1].mushrooms!.bag.B = 2;
    kitchen(g, 0); kitchen(g, 1);
    const p = kitchenBasketPoints(g)[1];
    g.witches[0].body = { ...g.witches[0].body, ...p };
    stepGame(g, [{ ...idle, place: true }, idle], STEP);
    expect(g.cauldron!.stock.baskets.B).toBe(2);
    expect(g.cauldron!.stock.ingredients).toEqual(["B"]);
    stepGame(g, [idle, idle], STEP);
    stepGame(g, [{ ...idle, place: true }, idle], STEP);
    stepGame(g, [idle, idle], STEP);
    stepGame(g, [{ ...idle, place: true }, idle], STEP);
    expect(g.cauldron!.kitchen.brew).toMatchObject({ recipe: ["B", "B", "B"], recipients: [0, 1], elapsed: 0 });
    expect(g.leashEvents.some(e => e.kind === "house")).toBe(false);
    for (let i = 0; i < 60; i++) stepGame(g, [idle, idle], STEP);
    expect(g.cauldron!.events).toContainEqual({ kind: "exit", recipe: ["B", "B", "B"], recipients: [0, 1] });
    expect(g.witches.map(W => W.body.perch)).toEqual([false, false]);
    expect(g.witches.map(W => W.cauldronTrip?.kind)).toEqual(["mirrorFloor", "mirrorFloor"]);
    expect(g.witches[0].cauldronTrip).not.toBe(g.witches[1].cauldronTrip);
    expect(g.witches.map(W => W.cauldronTrip?.elapsed)).toEqual([0, 0]);
  });

  it("preserves shared basket and pot references across save/restore", () => {
    const g = fresh(2);
    enableCauldron(g, []);
    g.cauldron!.stock.ingredients.push("B");
    const h = restoreGame(JSON.parse(JSON.stringify(snapshotGame(g))));
    expect(h.witches[0].mushrooms!.baskets).toBe(h.cauldron!.stock.baskets);
    expect(h.witches[1].mushrooms!.ingredients).toBe(h.cauldron!.stock.ingredients);
    expect(h.cauldron!.stock.ingredients).toEqual(["B"]);
  });
});
