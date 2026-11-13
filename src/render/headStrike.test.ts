// The view's part of the hydra's heads taking turns (render/headStrike.ts): through a real cast of its attack, the frame shown
// goes first head drawn back, first struck, second drawn back, second struck, third drawn back, third struck, then none.
import { expect, it } from "vitest";
import { cast, newSpells, stepSpells, type Hittable, type SpellWorld } from "../rules/attacks/engine";
import { SPECIES_ATTACKS } from "../rules/attacks/species";
import { headStrike } from "./headStrike";
import { walkGait } from "./creatureArt";
import { defaultStyle } from "../../art/generator.js";

it("shows each head drawn back, then struck, in turn", () => {
  const her: Hittable = { kind: "witch", id: "her", x: 18, z: 0, r: 0.3, side: "party" }, caster = { kind: "creature" as const, id: 1, x: 0, z: 0, r: 0.5, side: "wild", species: "hydra" };
  const W: SpellWorld = { seed: 7, near: () => [], hostile: (side, t) => t.side !== side, harm: () => {}, where: (kind, id) => (kind === "creature" && id === 1 ? caster : kind === "witch" ? her : null) };
  const S = newSpells(), K = { heads: 3, each: 3 }, seen: string[] = [];
  expect(headStrike(S, 1, 0, K)).toBe(-1);
  cast(S, W, SPECIES_ATTACKS.hydra, "hydra", { id: 1, x: 0, z: 0, side: "wild", species: "hydra" }, her, 0, 1);
  for (let t = 1 / 60; t <= 3; t += 1 / 60) { stepSpells(S, W, {}, t, 1 / 60); const f = headStrike(S, 1, t, K), name = f < 0 ? "none" : `${Math.floor(f / 3)}${f % 3 === 2 ? " struck" : " back"}`; if (seen[seen.length - 1] !== name) seen.push(name); }
  expect(seen).toEqual(["0 back", "0 struck", "1 back", "1 struck", "2 back", "2 struck", "none"]);
  expect(headStrike(S, 2, 1, K)).toBe(-1); // (another creature: nothing)
});

it("has its strike frames after its walk's, three a head", () => {
  const G = walkGait("hydra", { ...defaultStyle(), meshCreatures: 1 } as never);
  expect(G.strike).toEqual({ from: 9, heads: 3, each: 3 }); expect(G.frames).toBe(18);
});
