import { describe, expect, it } from "vitest";
import { newGame } from "../../rules/game";
import { TUNING } from "../../rules/tuning";
import type { Sfx } from "./sfx";
import { SfxCues } from "./sfxCues";

describe("a refused sigil's nope (Ed, 2026-10-07)", () => {
  it("plays once on the leash's fizzled event, and not on a placed one", () => {
    const g = newGame(123, TUNING), calls: string[] = [];
    const sfx = new Proxy({}, { get: (_, k) => (k === "nope" || k === "land") ? () => calls.push(k) : () => {} }) as unknown as Sfx;
    const cues = new SfxCues(sfx), w = g.witch;
    g.leashEvents.push({ kind: "fizzled", id: 1, x: w.x, z: w.z, at: 1 });
    cues.update(g, 1);
    expect(calls).toEqual(["nope"]);
    g.leashEvents.length = 0; calls.length = 0;
    g.leashEvents.push({ kind: "placed", id: 1, x: w.x, z: w.z, at: 2 });
    cues.update(g, 2);
    expect(calls).not.toContain("nope");
  });
});
