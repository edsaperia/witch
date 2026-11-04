// A refused take-off's chains rattling (Ed, 2026-11-03: "When you try and take off but you're weighed down by creatures, the chains
// rattle"; "only the adult and legend chains rattle"): on the "grounded" leash event the rattle plays once, for exactly the chains
// holding her (rules/chains.ts weighingChains), beside the landing's thud.
import { describe, expect, it } from "vitest";
import { newGame as fullGame } from "../../rules/game";
import { smallWorld } from "../../test/worlds";
const newGame = smallWorld(fullGame, "Injected leash events test sound routing, independent of world size.");
import { TUNING } from "../../rules/tuning";
import type { Sfx } from "./sfx";
import { SfxCues } from "./sfxCues";
import type { Creature } from "../../rules/creatures";

describe("the chains' rattle", () => {
  it("plays once on a refused take-off, for the adults' and legends' chains only", () => {
    const g = newGame(123, TUNING), calls: [string, number][] = [];
    const sfx = new Proxy({}, { get: (_, k) => (k === "rattle" ? (_p: number, n: number) => calls.push(["rattle", n]) : () => {}) }) as unknown as Sfx;
    const cues = new SfxCues(sfx), W = g.witches[0], w = g.witch;
    const pick = (level: number) => { const c = g.creatures.find(k => !k.boss && !k.leashed && !k.gone)!; c.level = level as Creature["level"]; c.leashed = true; W.leash.stack.push(c.id); return c; };
    pick(1); pick(1); pick(2); pick(0);
    g.leashEvents.push({ kind: "grounded", id: W.id, x: w.x, z: w.z, at: 1 });
    cues.update(g, 1);
    expect(calls).toEqual([["rattle", 1]]);
    g.leashEvents.length = 0; calls.length = 0;
    cues.update(g, 2);
    expect(calls).toEqual([]); // (once: no event, no rattle)
  });
});
