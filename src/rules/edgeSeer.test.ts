// The Edge-seer hat (Ed, 2026-10-15: "shows the area edges (the glowing dotted borders, off by default since #889) while it's in
// play"; rules/hatSpells.ts edgesSeen, drawn by render/borders.ts): in play worn, lying where she put it or dropped it, or left
// behind in the world; not while she's knocked out, nor with any other hat.
import { describe, expect, it } from "vitest";
import { TUNING, type Tuning } from "./tuning";
import { hitWitch, newGame, stepGame, type Controls, type Game } from "./game";
import { edgesSeen } from "./hatSpells";
import { HAT_SPELLS, hatOf } from "./spells";
import { wearing } from "./hat";

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

describe("the Edge-seer hat", () => {
  it("is a built hat spell the picker offers, and the tuning's borders stay off by default", () => {
    expect(hatOf("edgeseer")).toBe("edgeseer");
    expect(HAT_SPELLS.find(s => s.id === "edgeseer")?.built).toBe(true);
    expect(TUNING.borders.on).toBe(false);
  });

  it("shows the edges while it's worn, while it lies where she put it, and not with another hat", () => {
    const g = game(wearingHat("edgeseer"));
    expect(edgesSeen(g)).toBe(true);
    putDown(g);
    expect(edgesSeen(g)).toBe(true);
    const h = game(wearingHat("harvest"));
    expect(edgesSeen(h)).toBe(false);
    putDown(h);
    expect(edgesSeen(h)).toBe(false);
    expect(edgesSeen(game(TUNING))).toBe(false);
  });

  it("keeps showing them when it's left behind for another hat, and not while she's knocked out wearing it", () => {
    const g = game(wearingHat("edgeseer")), W = g.witches[0];
    putDown(g);
    W.hat.left.push({ ...W.hat.down!, spell: "edgeseer" }); W.hat.down = null; // (she took a new hat in her room: rules/hatSpells.ts changeLoadout)
    W.spells.hat = "harvest";
    expect(edgesSeen(g)).toBe(true);
    W.hat.left.length = 0;
    expect(edgesSeen(g)).toBe(false);
    // Knocked out wearing it: no edges till she's back (her hat drops where she fell, and shows them again from there).
    const k = game({ ...wearingHat("edgeseer"), knockout: { ...TUNING.knockout, dropHat: false } }), K = k.witches[0];
    for (let i = 0; i < 50 && !K.ko; i++) hitWitch(k, 0, k.clock.time + i * (TUNING.witchHealth.grace + 0.05));
    expect(K.ko).not.toBeNull();
    expect(edgesSeen(k)).toBe(false);
  });

  it("a witch with no hat at all (the creator's none) sees none", () => {
    const g = game(wearingHat("edgeseer"));
    g.witches[0].hat.has = false;
    expect(edgesSeen(g)).toBe(false);
  });
});
