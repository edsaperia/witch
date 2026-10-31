// The beach witches' campfires (Ed, 2026-10-12: "Campfires are spawned next to where beach witches are spawned"): one by each
// spot, to one side of its witches (never in front of them: the camera looks north), on the sand clear of the woods and the sea.
import { describe, expect, it } from "vitest";
import { generateMap } from "../rules/map";
import { beachOf } from "../rules/mapShape";
import { newBeachWitches } from "../rules/beach";
import { TUNING as gameTuning } from "../rules/tuning";
import { largestWorldTuning } from "../test/worlds";
// Largest shipped world: campfires must remain on sand and clear of witches around its full coastline.
const TUNING = largestWorldTuning(gameTuning);
import type { Game } from "../rules/game";
import { beachFires } from "./beach";

describe("the beach witches' campfires", () => {
  for (const seed of [1, 123, 4242, 9001]) it(`one beside every spot, on clear sand, never in front of her (seed ${seed})`, () => {
    const map = generateMap(seed, TUNING), beach = newBeachWitches(seed, map.bounds, TUNING)!, b = beachOf(map.bounds, TUNING)!;
    const g = { map, tuning: TUNING, beach } as unknown as Game, fires = beachFires(g);
    expect(fires.length).toBe(beach.length);
    expect(beachFires(g)).toBe(fires); // (worked out once)
    fires.forEach((f, i) => {
      const s = beach[i];
      expect(b.intoSand(f.x, f.z)).toBeGreaterThanOrEqual(6);
      expect(b.intoSea(f.x, f.z)).toBeLessThanOrEqual(-6);
      expect(f.z - s.z).toBeLessThan(2); // (not in front)
      for (const w of s.list) {
        expect(Math.hypot(f.x - w.x, f.z - w.z)).toBeGreaterThan(2); // (clear of her)
        expect(Math.hypot(f.x - w.x, f.z - w.z)).toBeLessThan(8); // (but beside her)
      }
    });
  });
});
