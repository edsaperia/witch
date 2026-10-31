// The builders' quick shot (app/shot.ts): each scene puts her where it says, and says why when it can't.
import { describe, expect, it } from "vitest";
import { TUNING } from "../rules/tuning";
import { newGame as fullGame } from "../rules/game";
import { smallWorld } from "../test/worlds";
import { AREA_TYPES } from "../rules/map";
import { deckOf, onFloor } from "../rules/treehouse";
import { stationOf } from "../rules/stations";
import { applyShot, shotParams } from "./shot";

const newGame = smallWorld(fullGame, "Shot placement needs local rooms, a present area and injected specimens/finds, independent of world extent.");
const game = () => newGame(123, TUNING);

describe("?shot=", () => {
  it("object: puts her on foot in the house at that station", () => {
    const g = game(), r = applyShot(g, "object:dressingTable");
    expect(r.ok, r.say).toBe(true);
    expect(g.witch.mode).toBe("ground");
    expect(onFloor(deckOf(g.map, g.tuning)!, g.witch.x, g.witch.z)).toBe(true);
    expect(stationOf(g, null)?.id).toBe("dressingTable");
  });
  it("room: puts her on the room's floor", () => {
    const g = game(), r = applyShot(g, "room:bedroom");
    expect(r.ok, r.say).toBe(true);
    expect(onFloor(deckOf(g.map, g.tuning)!, g.witch.x, g.witch.z)).toBe(true);
  });
  it("area: in the nearest area of that type", () => {
    const g = game(), t = g.map.typeOf(g.map.cells[1][0], g.map.cells[1][1]), r = applyShot(g, `area:${AREA_TYPES[t].id}`);
    expect(r.ok, r.say).toBe(true);
    expect(g.map.areaAt(g.witch.x, g.witch.z).type).toBe(t);
  });
  it("creature: one of that species and level beside her, friendly", () => {
    const g = game(), r = applyShot(g, "creature:fox@1");
    expect(r.ok, r.say).toBe(true);
    const c = g.creatures.find(k => !k.gone && k.species === "fox" && k.level === 1 && Math.hypot(k.x - g.witch.x, k.z - g.witch.z) < 8);
    expect(c?.friendly).toBe(true);
  });
  it("find: that find on clear ground in front of her", () => {
    const g = game(), r = applyShot(g, "find:part:nozzles");
    expect(r.ok, r.say).toBe(true);
    expect(g.trunk).toMatchObject({ kind: "part", item: "nozzles", found: false });
    expect(Math.hypot(g.trunk!.x - g.witch.x, g.trunk!.z - g.witch.z)).toBeLessThan(13);
  });
  it("says why it can't: an unknown id or scene", () => {
    for (const s of ["object:nope", "room:nope", "area:nope", "find:part:nope", "nope:1"]) expect(applyShot(game(), s).ok, s).toBe(false);
  });
  it("its link: quick art, no start card, the spell cast, the waves held; the link's own kept", () => {
    const p = new URLSearchParams("shot=room:bedroom&creator=1");
    shotParams(p);
    expect(Object.fromEntries(p)).toMatchObject({ quick: "1", creator: "1", spell: "auto", pulse: "off" });
  });
});
