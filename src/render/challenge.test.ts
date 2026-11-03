// The challenge circle's look (render/challenge.ts; Ed, 2026-11-03: "the glowing sigil of the island carved into it"; cleared, "the
// sigil and columns light on the beat"): its floor's carving glows while it waits, pulses on the beat once cleared, and is dark once
// closed; no beam of light over it in any state (Ed, 2026-11-03: "remove the beam").
import { describe, expect, it } from "vitest";
import { newGame, stepGame, type Controls, type Game } from "../rules/game";
import { TUNING, type Tuning } from "../rules/tuning";
import { befriend } from "../rules/creatureStates";
import { islandSigilOf } from "../rules/dancefloor";
import { startPartyOver } from "../rules/partyOver";
import { challengeRing } from "./challenge";
import { readFileSync } from "node:fs";

const still: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const T: Tuning = { ...TUNING, map: { ...TUNING.map!, island: "fox", islandAreas: 10 } };

function game(): Game {
  const g = newGame(2, T);
  g.clock.paused = false; g.party.spellAt = undefined; g.party.paused = true;
  g.witches[0].health.hp = 1e6;
  return g;
}

describe("the challenge circle's light", () => {
  it("glows while it waits, lights on the beat once cleared, goes dark once closed", () => {
    const g = game(), ch = g.challenge!;
    const at = () => challengeRing(g, ch.x, ch.z)!;
    expect(at().species).toBe(islandSigilOf(g.map));
    expect(at().r).toBe(T.challenge!.radius);
    expect(at().glint).toBeGreaterThan(0);
    // cleared: the spell cast on it
    for (const id of ch.pack) befriend(g.creatures[id], g.clock.time);
    for (const c of g.creatures) if (!ch.pack.includes(c.id) && Math.hypot(c.x - ch.x, c.z - ch.z) < 250) c.gone = true;
    g.witch = { ...g.witch, x: ch.x, z: ch.z, mode: "ground", lift: 0, seated: false, perch: undefined };
    for (let i = 0; i < 60 * (T.cast!.time + 0.5) && ch.clearedAt === null; i++) stepGame(g, { ...still, sigilHeld: true }, 1 / 60);
    expect(ch.clearedAt).not.toBeNull();
    const glints: number[] = [];
    for (let i = 0; i < 60; i++) { stepGame(g, still, 1 / 60); glints.push(at().glint); }
    expect(Math.max(...glints) - Math.min(...glints)).toBeGreaterThan(2); // (on the beat)
    expect(Math.min(...glints)).toBeGreaterThan(2);
  }, 60000);

  it("puts no beam of light over it, waiting, cleared or closed (Ed: \"remove the beam\")", () => {
    // (its only light is its own floor's, columns' and little dancefloor's: nothing of it among the markers' beacons and lasers)
    const src = readFileSync("src/render/challenge.ts", "utf8"), home = readFileSync("src/render/view/home.ts", "utf8");
    expect(src).not.toMatch(/beacons\.push|lasers\.push|Beacon\b/);
    expect(home).not.toMatch(/challenge/i);
  });

  it("is dark once closed", () => {
    const g = game(), ch = g.challenge!;
    startPartyOver(g, g.clock.time); // (the night lost: Ed, on #1725, only then or once it's won)
    stepGame(g, still, 1 / 60);
    expect(ch.closedAt).not.toBeNull();
    expect(challengeRing(g, ch.x, ch.z)!.glint).toBe(0);
  }, 60000);
});
