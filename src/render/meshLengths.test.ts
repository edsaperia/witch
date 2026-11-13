// The mesh creatures' drawn lengths (config/mesh-lengths.json, tools/creature-mesh/lengths.mjs), and her line of followers
// spaced by them (Ed, 2026-11-13: "update the conga line spacing for the new creature mesh sizes so they don't collide";
// rules/babies.ts): the table is what the meshes come to today, and two creatures in line at the line's spacing share no drawn
// pixel, as the game's camera sees them walk across the screen, with the margin's clear pixels between them.
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { meshGait, meshWalk } from "../../art/mesh/index.js";
import { MESH_PLANS } from "../../art/mesh/plans.js";
import { babiesOf, queueDistances } from "../rules/babies";
import type { Level } from "../rules/creatures";
import { TUNING } from "../rules/tuning";
import { metresPerArtPixel } from "./sprites";
import { LENGTHS_FILE, lengthsText } from "../../tools/creature-mesh/lengths.mjs";

interface Walk { w: number; h: number; towards: { albedo: Uint8ClampedArray }[]; away: { albedo: Uint8ClampedArray }[] }
const KINDS = Object.keys(MESH_PLANS as Record<string, unknown>).sort(), TABLE = (JSON.parse(readFileSync(LENGTHS_FILE, "utf8")) as { lengths: Record<string, number[]> }).lengths;

/** A kind's sprite as drawn, every frame of its walk, standing and its fast pace, both headings (not a hydra's striking heads,
 *  which are in its sprite after those: no one strikes in her line): how far its drawn pixels reach to each side of its sprite's
 *  middle (where it stands), art pixels. */
const reaches = new Map<string, { back: number; front: number; long: number }>();
function reach(species: string, level: number) {
  const key = `${species} ${level}`; let r = reaches.get(key);
  if (!r) { const walk = meshWalk(species, level) as unknown as Walk, mid = walk.w / 2, n = (meshGait(species) as { strike?: { from: number } }).strike?.from ?? walk.towards.length; let lo = walk.w, hi = -1;
    for (const f of [...walk.towards.slice(0, n), ...walk.away.slice(0, n)]) for (let i = 0; i < walk.w * walk.h; i++) if (f.albedo[i * 4 + 3]) { const x = i % walk.w; if (x < lo) lo = x; if (x > hi) hi = x; }
    reaches.set(key, (r = { back: mid - lo, front: hi + 1 - mid, long: 2 * Math.max(mid - lo, hi + 1 - mid) })); }
  return r;
}
/** Clear art pixels between two in line, `front` ahead of `behind`, at the line's spacing, walking across the screen (either way:
 *  the game mirrors a sprite, so each one's longer side is taken). */
function clear(front: [string, number], behind: [string, number]): number {
  const back = queueDistances([{ species: front[0], level: front[1] as Level }, { species: behind[0], level: behind[1] as Level }], TUNING), a = reach(...front), b = reach(...behind);
  return (back[1] - back[0]) / metresPerArtPixel(TUNING) - Math.max(a.back, a.front) - Math.max(b.back, b.front);
}

describe("the mesh creatures' drawn lengths", () => {
  it("are written from the meshes (run node tools/creature-mesh/lengths.mjs after adding or resizing a kind)", () => {
    expect(readFileSync(LENGTHS_FILE, "utf8"), "run node tools/creature-mesh/lengths.mjs").toBe(lengthsText());
    expect(Object.keys(TABLE)).toEqual(KINDS);
  });

  it("are each one's drawn length, twice its walk's reach from its sprite's middle: never under it by more than a pixel's rounding, nor over it by more than a thin tail tip's few", () => {
    const near = (species: string, level: number) => { const d = TABLE[species][level] - reach(species, level).long; expect(d, `${species} ${level}`).toBeGreaterThanOrEqual(-3); expect(d, `${species} ${level}`).toBeLessThanOrEqual(8); }; // (twice a reach: twice a pixel's rounding)
    for (const species of KINDS) near(species, 0);
    for (const species of ["snake", "crocodile", "heron", "hydra"]) for (const level of [1, 2]) near(species, level);
  }, 240000);

  it("two in her line share no drawn pixel: every kind's babies, and its neighbours of other kinds, clear by the margin", () => {
    const margin = babiesOf(TUNING).margin! / metresPerArtPixel(TUNING) - 2; // (a pixel's rounding each)
    KINDS.forEach((species, i) => {
      expect(clear([species, 0], [species, 0]), species).toBeGreaterThanOrEqual(margin);
      for (const other of [KINDS[(i * 7 + 3) % KINDS.length], "snake", "crocodile", "frostwyrm", "hydra", "heron"]) {
        expect(clear([species, 0], [other, 0]), `${species} then ${other}`).toBeGreaterThanOrEqual(margin);
        expect(clear([other, 0], [species, 0]), `${other} then ${species}`).toBeGreaterThanOrEqual(margin);
      }
    });
  }, 240000);

  it("nor at the other levels (the line's spacing is by kind and level): long kinds and tall thin ones, young and grown", () => {
    const margin = babiesOf(TUNING).margin! / metresPerArtPixel(TUNING) - 2, some = ["snake", "crocodile", "komodo", "elephant", "frostwyrm", "hydra", "heron", "owl"].filter(k => KINDS.includes(k));
    for (const species of some) for (const level of [1, 2]) {
      expect(clear([species, level], [species, level]), `${species} ${level}`).toBeGreaterThanOrEqual(margin);
      expect(clear([species, level], ["fox", 0]), `${species} ${level} then a baby fox`).toBeGreaterThanOrEqual(margin);
    }
    // (every kind and level by the table, which the test above holds to the meshes: its length and the margin between two of it)
    for (const species of KINDS) for (let level = 0; level < 4; level++) {
      const back = queueDistances([{ species, level: level as Level }, { species, level: level as Level }], TUNING);
      expect((back[1] - back[0]) / metresPerArtPixel(TUNING), `${species} ${level}`).toBeGreaterThanOrEqual(TABLE[species][level] + margin);
    }
  }, 240000);
});
