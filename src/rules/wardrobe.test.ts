// Back in her room mid-night from the treehouse deck (Ed, 2026-10-11, answer 4; rules/hatSpells.ts changeLoadout): the new hat and
// broom take at once. A hat of hers lying in the world stays where it lies when she takes a new one, still working its spell, and
// any number can lie about; she can't pick one up while she's wearing one, and bare-headed she puts it on, its spell hers (Ed,
// 2026-10-12: "if her hat is placed in the world, she can go back to her room to pick up a new one and the previous one(s) stay in
// the world. if she tries to pick up a hat while she's wearing one, she cannot").
import { describe, expect, it } from "vitest";
import { TUNING, type Tuning } from "./tuning";
import { newGame, stepGame, type Controls, type Game } from "./game";
import { changeLoadout, hatsDown } from "./hatSpells";
import { hatMarkers, wearing } from "./hat";

const C: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
function game(t: Tuning): Game {
  // Keep this spatial fixture: a left-behind hat must still act while its witch stands 200 m away.
  const g = newGame(123, t);
  g.clock.paused = false; g.party.paused = true;
  g.party.spellAt = undefined;
  g.witch = { ...g.witch, seated: false, mode: "ground", lift: 0, vx: 0, vz: 0 };
  return g;
}
const at = (g: Game, x: number, z: number) => { g.witch = { ...g.witch, x, z, vx: 0, vz: 0, seated: false, mode: "ground", lift: 0 }; };
const press = (g: Game) => { stepGame(g, { ...C, place: true }, 1 / 60); stepGame(g, C, 1 / 60); };
const spot = (g: Game) => ({ x: g.map.dancefloor.x + 40, z: g.map.dancefloor.z + 40 });

describe("changing her hat mid-night", () => {
  it("takes at once; a hat lying in the world stays there with its spell, and she wears the new one", () => {
    const g = newGame(123, { ...TUNING, spells: { ...TUNING.spells, hat: "cyclone" } }), W = g.witches[0];
    W.hat.down = { x: 10, z: 10, at: 0 };
    changeLoadout(W, "cyclone");
    expect(W.hat.down).not.toBeNull(); // (the same hat: still lying there, and she's still bare-headed)
    changeLoadout(W, "healing");
    expect(W.spells.hat).toBe("healing");
    expect(wearing(W.hat)).toBe(true); // (a new one on her head)
    expect(W.hat.left).toEqual([{ x: 10, z: 10, at: 0, spell: "cyclone" }]); // (the old one where it lay)
    expect(hatsDown(W)).toEqual([{ x: 10, z: 10, at: 0, spell: "cyclone" }]);
  });

  it("several can lie about at once", () => {
    const g = newGame(123, { ...TUNING, spells: { ...TUNING.spells, hat: "sentry" } }), W = g.witches[0];
    W.hat.down = { x: 10, z: 10, at: 0 };
    changeLoadout(W, "healing");
    expect(wearing(W.hat)).toBe(true);
    W.hat.down = { x: 50, z: 10, at: 1 };
    changeLoadout(W, "bramble");
    expect(W.hat.left.map(q => q.spell)).toEqual(["sentry", "healing"]);
    expect(hatsDown(W).length).toBe(2);
    // a pointer to each (Ed, 2026-10-12: "If there are multiple hats on the ground, they each get a pointer")
    W.hat.down = { x: 90, z: 10, at: 2 };
    expect(hatMarkers(W.hat)).toEqual([{ x: 90, z: 10, at: 2 }, { x: 10, z: 10, at: 0 }, { x: 50, z: 10, at: 1 }]);
  });
});

describe("her hats left in the world", () => {
  it("keep working: a Bramble hat left lying still slows the wild round it", () => {
    const g = game({ ...TUNING, spells: { ...TUNING.spells, hat: "bramble" } }), W = g.witches[0], p = spot(g);
    W.hat.down = { x: p.x, z: p.z, at: g.clock.time };
    changeLoadout(W, "healing");
    const c = g.creatures.find(k => !k.gone && !k.leashed && !k.boss && !k.enraged && !k.circle && k.level < 3)!;
    Object.assign(c, { x: p.x + 5, z: p.z, tx: p.x + 5, tz: p.z, rest: 99 });
    at(g, p.x + 200, p.z);
    stepGame(g, C, 1 / 60);
    expect(c.slowUntil ?? 0).toBeGreaterThan(g.clock.time);
  });

  it("she can't pick one up wearing a hat; bare-headed she puts it on, its spell hers, and her own stays where it lay", () => {
    const g = game({ ...TUNING, spells: { ...TUNING.spells, hat: "cyclone" } }), W = g.witches[0], p = spot(g);
    W.hat.down = { x: p.x, z: p.z, at: g.clock.time };
    changeLoadout(W, "healing"); // (the Cyclone hat left at p; a Healing one on her head)
    at(g, p.x, p.z);
    press(g);
    expect(W.spells.hat).toBe("healing"); // (wearing one: she can't)
    expect(W.hat.left.length).toBe(1);
    // her Healing hat down elsewhere, she's bare-headed: now she can
    W.hat.down = { x: p.x + 30, z: p.z, at: g.clock.time };
    press(g);
    expect(wearing(W.hat)).toBe(true);
    expect(W.spells.hat).toBe("cyclone");
    expect(W.hat.left).toEqual([expect.objectContaining({ x: p.x + 30, z: p.z, spell: "healing" })]);
  });
});
