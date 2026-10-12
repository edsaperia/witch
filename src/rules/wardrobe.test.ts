// Back in her room mid-night from the treehouse deck (Ed, 2026-10-11, answer 4; rules/hatSpells.ts changeLoadout): the new hat and
// broom take at once, and a hat swapped while hers lies on the ground somewhere comes home on her head, its old spell's ring,
// pointer and whirlwind gone with it; the same hat again leaves it where it lies.
import { describe, expect, it } from "vitest";
import { TUNING } from "./tuning";
import { newGame } from "./game";
import { changeLoadout } from "./hatSpells";
import { wearing } from "./hat";

describe("changing her hat and broom mid-night", () => {
  it("takes at once; a hat swapped while hers is down comes home; the same hat stays where it lies", () => {
    const g = newGame(123, { ...TUNING, spells: { ...TUNING.spells, hat: "cyclone", broom: "none" } }), W = g.witches[0];
    W.hat.down = { x: 10, z: 10, at: 0 };
    W.spells.cyc = { at: 0, x: 10, z: 10, held: [] };
    changeLoadout(W, "cyclone", "speed");
    expect(W.spells.broom).toBe("speed");
    expect(W.hat.down).not.toBeNull(); // (the same hat: still lying there)
    changeLoadout(W, "healing", "speed");
    expect(W.spells.hat).toBe("healing");
    expect(wearing(W.hat)).toBe(true); // (home on her head)
    expect(W.spells.cyc).toBeUndefined();
  });
});
