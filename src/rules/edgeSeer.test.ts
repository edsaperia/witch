// The seer hats (Ed, 2026-10-15: the Edge-seer "shows the area edges (the glowing dotted borders, off by default since #889)",
// the Route-seer "a 'see the entire route' hat power as well"; "only the player wearing the hat sees the things"; rules/hatSpells.ts
// seerWorn, drawn by render/borders.ts, render/view.ts and render/view/home.ts): worn only; nothing from a hat lying where she
// put it, left behind, or while she's knocked out; nothing with any other hat.
import { describe, expect, it } from "vitest";
import { TUNING, type Tuning } from "./tuning";
import { hitWitch, newGame as fullGame, stepGame, type Controls, type Game } from "./game";
import { smallWorld } from "../test/worlds";
import { edgesSeen, routeSeen } from "./hatSpells";
import { HAT_SPELLS, hatOf } from "./spells";
import { wearing } from "./hat";

const newGame = smallWorld(fullGame, "Seer visibility depends on each player's hat state and local drop/pickup, independent of map extent.");
const C: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
const wearingHat = (hat: string): Tuning => ({ ...TUNING, spells: { ...TUNING.spells, hat } });
function game(t: Tuning): Game {
  const g = newGame(123, t);
  g.clock.paused = false; g.party.paused = true;
  g.party.spellAt = undefined;
  g.witch = { ...g.witch, x: g.map.dancefloor.x + 40, z: g.map.dancefloor.z + 30, seated: false, mode: "ground", lift: 0, vx: 0, vz: 0, perch: undefined };
  return g;
}
const step = (g: Game, secs: number, c = C) => { for (let i = 0; i < Math.round(secs * 60); i++) stepGame(g, c, 1 / 60); };
/** Hold the sigil button with nothing to pick up: her hat goes down at her feet. */
function putDown(g: Game): void {
  stepGame(g, { ...C, place: true, sigilHeld: true }, 1 / 60);
  step(g, (TUNING.leash.hatHold ?? 0.5) + 0.1, { ...C, sigilHeld: true });
  stepGame(g, C, 1 / 60);
  expect(wearing(g.witches[0].hat)).toBe(false);
}
const pickUp = (g: Game) => { const d = g.witches[0].hat.down!; g.witch = { ...g.witch, x: d.x, z: d.z }; stepGame(g, { ...C, place: true }, 1 / 60); stepGame(g, C, 1 / 60); expect(wearing(g.witches[0].hat)).toBe(true); };

describe("the seer hats", () => {
  it("are built, worn hat spells the picker offers, and the tuning's borders stay off by default", () => {
    for (const id of ["edgeseer", "routeseer"] as const) {
      expect(hatOf(id)).toBe(id);
      expect(HAT_SPELLS.find(s => s.id === id)).toMatchObject({ built: true, how: "worn" });
    }
    expect(TUNING.borders.on).toBe(false);
  });

  it.each([["edgeseer", edgesSeen], ["routeseer", routeSeen]] as const)("%s: shows while worn, not while it lies where she put it, and again once it's back on", (id, seen) => {
    const g = game(wearingHat(id));
    expect(seen(g)).toBe(true);
    putDown(g);
    expect(seen(g)).toBe(false);
    pickUp(g);
    expect(seen(g)).toBe(true);
  });

  it("neither shows with another hat, with no hat at all, or when left behind for another hat", () => {
    const h = game(wearingHat("harvest"));
    expect(edgesSeen(h)).toBe(false); expect(routeSeen(h)).toBe(false);
    expect(edgesSeen(game(TUNING))).toBe(false);
    const g = game(wearingHat("edgeseer")), W = g.witches[0];
    putDown(g);
    W.hat.left.push({ ...W.hat.down!, spell: "edgeseer" }); W.hat.down = null; W.spells.hat = "routeseer"; // (she took a Route-seer in her room: rules/hatSpells.ts changeLoadout)
    expect(edgesSeen(g)).toBe(false);
    expect(routeSeen(g)).toBe(true);
    const n = game(wearingHat("routeseer"));
    n.witches[0].hat.has = false; // (the creator's none)
    expect(routeSeen(n)).toBe(false);
  });

  it("the Edge-seer and the Route-seer are each their own: one shows only its own thing", () => {
    const e = game(wearingHat("edgeseer")), r = game(wearingHat("routeseer"));
    expect([edgesSeen(e), routeSeen(e)]).toEqual([true, false]);
    expect([edgesSeen(r), routeSeen(r)]).toEqual([false, true]);
  });

  it("nothing while she's knocked out wearing one", () => {
    const k = game({ ...wearingHat("routeseer"), knockout: { ...TUNING.knockout, dropHat: false } }), K = k.witches[0];
    for (let i = 0; i < 50 && !K.ko; i++) hitWitch(k, 0, k.clock.time + i * (TUNING.witchHealth.grace + 0.05));
    expect(K.ko).not.toBeNull();
    expect(routeSeen(k)).toBe(false);
  });

  it("only the wearer's own view: player 1's hat shows nothing to player 0", () => {
    const g = newGame(123, wearingHat("edgeseer"), 2);
    g.witches[0].spells.hat = "none";
    expect(edgesSeen(g, 0)).toBe(false);
    expect(edgesSeen(g, 1)).toBe(true);
  });
});
