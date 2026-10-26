// Same seed, same island (rules/seedDigest.ts): every stage of the generator hashed; built twice here it gives the same hashes, and
// the engine's Math on fixed inputs is reported. tools/seed/compare.mjs compares these with headless Chromium's.
import { describe, expect, it } from "vitest";
import { digestIslands, mathDigest, seedDigest } from "./seedDigest";

describe("same seed, same island", () => {
  it("builds the same islands twice over, every stage", () => {
    const a = seedDigest(), b = seedDigest();
    expect(Object.keys(a)).toEqual(expect.arrayContaining(["archipelago", "outline:home", "outline:phase1", "outline:phase5", "outline:lakes", "cells:home", "partition:phase1", "terrain:home", "zoo"]));
    expect(b).toEqual(a);
    console.log("seed digest (node)", JSON.stringify({ islands: digestIslands(), stages: a, math: mathDigest() }));
  }, 300000);
});
