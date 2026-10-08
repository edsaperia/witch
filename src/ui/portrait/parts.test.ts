import { describe, expect, it } from "vitest";
import * as Gen from "../../../art/witchGenome.js";
import { drawPortrait } from "./draw";
import { OTHER_HATS } from "./hats";
import { GESTURES, sample } from "./poses";
import { Raster } from "./raster";
import { H, NEUTRAL, W, lookOf, type Params } from "./rig";
import { OTHER_TOPS } from "./tops";

// art builder 1's parts on art3's frame: the other hats, the patterned tops, the extra gestures. (No familiar: Ed, 2026-10-08,
// "confusing since the game is about animals".)
const G = Gen.WITCH_GENOME as { hat: object };
const r = new Raster(W, H);
const draw = (g: unknown, p: Partial<Params> = {}, t = 0) => { drawPortrait(r, lookOf(g as never), { ...NEUTRAL, ...p }, t); return r.px.slice(); };
const differ = (a: Uint8Array, b: Uint8Array) => a.reduce((n, v, i) => n + (v !== b[i] ? 1 : 0), 0);

describe("the portrait's parts (art builder 1)", () => {
  it("draws every other hat as its own, all different from each other", () => {
    const hats = Object.keys(OTHER_HATS).map(h => draw({ ...G, hat: { ...G.hat, shape: h } }));
    for (let i = 0; i < hats.length; i++) for (let j = i + 1; j < hats.length; j++) expect(differ(hats[i], hats[j]), `${Object.keys(OTHER_HATS)[i]} ${Object.keys(OTHER_HATS)[j]}`).toBeGreaterThan(40);
  });
  it("patterns each top differently from the plain jacket", () => {
    const plain = draw({ ...G, top: "jacket" });
    for (const top of Object.keys(OTHER_TOPS)) expect(differ(draw({ ...G, top }), plain), top).toBeGreaterThan(60);
  });
  it("plays the new gestures and ends each back at rest", () => {
    for (const name of ["point", "pointWay", "peace", "shrug", "facepalm", "think", "handToMouth"]) {
      const s = GESTURES[name]; expect(s, name).toBeDefined();
      const end = sample(s, s.dur);
      expect(end.handL ?? null, name).toSatisfy((h: { y: number } | null) => !h || h.y >= 26);
      expect(end.handR ?? null, name).toSatisfy((h: { y: number } | null) => !h || h.y >= 26);
      expect(differ(draw(G, sample(s, s.dur / 2)), draw(G)), name).toBeGreaterThan(30);
    }
  });
});
