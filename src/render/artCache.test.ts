import { describe, expect, it } from "vitest";
import { artCacheKey } from "./artCache";
import type { ArtJob } from "./artBuild";

describe("per-kind art cache keys", () => {
  const job = { kind: "type", id: 0, seed: 42, K: 1, biome: "home", style: {} } as ArtJob;
  it("uses only that kind's fingerprint and preserves existing runtime salts", () => {
    const hashes = { type: "trees", creature: "animals" };
    const before = artCacheKey(job, "style", hashes);
    expect(before).toBe("art-kind-v1|trees|style|type:0|42|1|home");
    expect(artCacheKey(job, "style", { ...hashes, creature: "new-animals" })).toBe(before);
    expect(artCacheKey(job, "style", { ...hashes, type: "new-trees" })).not.toBe(before);
    expect(artCacheKey(job, "new-style", hashes)).not.toBe(before);
    for (const changed of [{ seed: 43 }, { K: 2 }, { biome: "fen" }]) expect(artCacheKey({ ...job, ...changed } as ArtJob, "style", hashes)).not.toBe(before);
  });
  it("preserves edge scale, invalid party misses and safe unknown-kind misses", () => {
    expect(artCacheKey({ kind: "beachEdge", id: "all", K: 2, style: {} } as ArtJob, "s", { beachEdge: "e" })).toBe("art-kind-v1|e|s|beachEdge:all|2");
    expect(artCacheKey({ kind: "party" } as ArtJob, "s", { party: "p" })).toBeNull();
    expect(artCacheKey(job, "s", {})).toBeNull();
    expect(artCacheKey({ kind: "constructor", id: 0 } as unknown as ArtJob, "s", {})).toBeNull();
  });
});
