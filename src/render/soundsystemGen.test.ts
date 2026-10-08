import { describe, expect, it } from "vitest";
import * as Art from "../../art/generator.js";
import { newGame } from "../rules/game";
import { TUNING } from "../rules/tuning";
import { SOUNDSYSTEM_GEN_DEFAULT, soundsystemSpecs } from "./soundsystemGen";

type G = { seed: number; profile: string; crystal: string; stone: string; projector: string; tiers: { kind: string; n: number }[] };
const diff = Art.soundsystemDiff as unknown as (a: G, b: G) => number;

describe("the generated soundsystems (Ed, 2026-10-08)", () => {
  for (const seed of [123, 7, 2026]) it(`never deals two alike on a map (seed ${seed}): every pair differs in at least two visible traits`, () => {
    const g = newGame(seed, TUNING), specs = [...soundsystemSpecs(g.map, SOUNDSYSTEM_GEN_DEFAULT).values()], gs = specs.map(s => s.genome as G);
    expect(specs.length).toBeGreaterThan(10);
    for (let i = 0; i < gs.length; i++) for (let j = i + 1; j < gs.length; j++) expect(diff(gs[i], gs[j]), `${specs[i].key} vs ${specs[j].key}`).toBeGreaterThanOrEqual(2);
    expect(new Set(specs.map(s => s.id)).size).toBe(specs.length);
  });
  it("turns each towards the dancefloor (never more than maxYaw from facing us) and makes the further ones bigger", () => {
    const g = newGame(123, TUNING), specs = [...soundsystemSpecs(g.map, SOUNDSYSTEM_GEN_DEFAULT).values()];
    for (const s of specs) expect(Math.abs(s.yaw)).toBeLessThanOrEqual(SOUNDSYSTEM_GEN_DEFAULT.maxYaw);
    const near = specs.filter(s => s.far < 0.2), far = specs.filter(s => s.far > 0.8);
    expect(near.length && far.length).toBeTruthy();
    expect(Math.max(...near.map(s => s.size))).toBeLessThan(Math.min(...far.map(s => s.size)));
    const tiers = (l: typeof specs) => l.reduce((n, s) => n + (s.genome as G).tiers.length, 0) / l.length;
    expect(tiers(far)).toBeGreaterThan(tiers(near));
  });
  it("faces the dancefloor along the line to it: from the far (north) side facing it, from the near side facing away", () => {
    const yaw = Art.soundsystemYaw as unknown as (dx: number, dz: number, mode?: string) => number;
    expect(yaw(0, -100)).toBeCloseTo(0, 6); // north of it: facing it, towards us
    expect(Math.abs(yaw(0, 100))).toBeCloseTo(0, 6); // south of it: facing away from it, towards us (its front still shown)
    expect(Math.abs(yaw(0, 100, "toward"))).toBeCloseTo(180, 6); // (always towards it: its back to us)
    expect(Math.sign(yaw(100, -1))).not.toBe(Math.sign(yaw(-100, -1))); // east and west turn opposite ways
  });
  it("is deterministic: the same map deals the same set", () => {
    const a = [...soundsystemSpecs(newGame(5, TUNING).map, SOUNDSYSTEM_GEN_DEFAULT).values()].map(s => s.id), b = [...soundsystemSpecs(newGame(5, TUNING).map, SOUNDSYSTEM_GEN_DEFAULT).values()].map(s => s.id);
    expect(a).toEqual(b);
  });
});
