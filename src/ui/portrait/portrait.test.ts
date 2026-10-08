import { describe, expect, it } from "vitest";
import * as Gen from "../../../art/witchGenome.js";
import { HATS, HAIRS, MOUTHS, TOPS, drawPortrait } from "./draw";
import { EXPRESSIONS } from "./expressions";
import { PALETTE_SIZE, portraitPalette } from "./palette";
import { GESTURES, POSES, sample } from "./poses";
import { Raster } from "./raster";
import { H, NEUTRAL, W, lookOf, type Params } from "./rig";
import { PortraitState } from "./state";

const AXES = Gen.WITCH_AXES as unknown as Record<string, string[]>;
const r = new Raster(W, H);
const draw = (g: unknown, p: Partial<Params> = {}, t = 0) => { drawPortrait(r, lookOf(g as never), { ...NEUTRAL, ...p }, t); return r.px.slice(); };
const filled = (px: Uint8Array) => px.reduce((n, v) => n + (v ? 1 : 0), 0);
const differ = (a: Uint8Array, b: Uint8Array) => a.reduce((n, v, i) => n + (v !== b[i] ? 1 : 0), 0);
const finite = (p: Params) => Object.entries(p).every(([, v]) => (typeof v === "number" ? Number.isFinite(v) : v && typeof v === "object" ? Object.values(v).every(u => typeof u !== "number" || Number.isFinite(u)) : true));

describe("the witch's portrait (Ed, 2026-10-08)", () => {
  it("draws her, a good share of the frame, every palette index real", () => {
    const px = draw(Gen.WITCH_GENOME);
    expect(filled(px)).toBeGreaterThan(W * H * 0.35);
    expect(Math.max(...px)).toBeLessThan(PALETTE_SIZE);
  });
  it("draws every hat with every hair, and every top with every cloak, from the creator's names", () => {
    for (const hat of AXES.hatShape) for (const hair of AXES.hair) {
      const px = draw({ ...Gen.WITCH_GENOME, hat: { ...(Gen.WITCH_GENOME as { hat: object }).hat, shape: hat }, hair });
      expect(filled(px), `${hat} ${hair}`).toBeGreaterThan(W * H * 0.3);
    }
    for (const top of AXES.top) for (const cloak of AXES.cloak) expect(filled(draw({ ...Gen.WITCH_GENOME, top, cloak })), `${top} ${cloak}`).toBeGreaterThan(W * H * 0.3);
    for (const hat of AXES.hatShape) expect(hat in HATS, hat).toBe(true);
    for (const hair of AXES.hair) expect(hair in HAIRS, hair).toBe(true);
    for (const top of AXES.top) expect(top in TOPS, top).toBe(true);
  });
  it("palette-swaps for any generated witch: four tones a colour, all opaque", () => {
    for (let s = 0; s < 30; s++) {
      const g = Gen.witchGenome(s) as { palette: Record<string, number[]> | null }, pal = portraitPalette(g.palette);
      for (let i = 1; i < pal.length; i++) expect(pal[i] >>> 24, `seed ${s} entry ${i}`).toBe(255);
      expect(filled(draw(g))).toBeGreaterThan(W * H * 0.3);
    }
  });
  it("shows every expression as its own face, and every mouth shape as its own", () => {
    const base = draw(Gen.WITCH_GENOME);
    for (const [name, e] of Object.entries(EXPRESSIONS)) if (name !== "neutral") expect(differ(draw(Gen.WITCH_GENOME, e.face), base), name).toBeGreaterThan(6);
    const mouths = Object.keys(MOUTHS).map(m => draw(Gen.WITCH_GENOME, { mouth: m as Params["mouth"] }));
    for (let i = 0; i < mouths.length; i++) for (let j = i + 1; j < mouths.length; j++) expect(differ(mouths[i], mouths[j]), `${Object.keys(MOUTHS)[i]} ${Object.keys(MOUTHS)[j]}`).toBeGreaterThan(0);
  });
  it("plays every pose and gesture through, its numbers finite, her drawn the whole way", () => {
    for (const [name, s] of [...Object.entries(POSES), ...Object.entries(GESTURES)]) for (let k = 0; k <= 10; k++) {
      const t = (s.dur * k) / 10, p = { ...NEUTRAL, ...sample(s, t) };
      expect(finite(p), `${name} at ${t}`).toBe(true);
      expect(filled(draw(Gen.WITCH_GENOME, p, t)), `${name} at ${t}`).toBeGreaterThan(W * H * 0.25);
    }
  });
  it("loses her hat (it flies off, she's messy) and gets it back with a tip of the brim", () => {
    const st = new PortraitState();
    st.play("hatLost", 0); st.params(0.5); expect(st.params(1.2).hatOn).toBe(0); expect(st.lostHat).toBe(true);
    expect(st.params(3).messy).toBeGreaterThan(0.5);
    st.play("hatBack", 4); expect(st.lostHat).toBe(false); expect(st.params(4 + 0.8).hatOn).toBe(1); expect(st.params(4 + 0.8).handR).not.toBeNull();
    st.setPose("knockedDown", 10); st.params(11.5); expect(st.lostHat).toBe(true);
  });
  it("talks: the line types on and her mouth moves through its shapes, closing when it's said", () => {
    const st = new PortraitState(), line = "Aww, a baby owl!";
    st.say(line, 0, 30);
    const mouths = new Set<string>(); for (let t = 0; t < line.length / 30; t += 1 / 60) mouths.add(st.params(t).mouth);
    expect(mouths.size).toBeGreaterThanOrEqual(3);
    expect(st.typed(0.2).n).toBe(6); expect(st.typed(10).done).toBe(true);
    expect(st.params(10).mouth).toBe(NEUTRAL.mouth);
  });
  it("blinks now and then", () => {
    const st = new PortraitState(); let shut = 0;
    for (let t = 0; t < 12; t += 1 / 60) if (st.params(t).eyeOpen < 0.3) shut++;
    expect(shut).toBeGreaterThan(3);
  });
  it("is cheap: a frame draws in well under a millisecond's budget share", () => {
    const g = Gen.WITCH_GENOME, t0 = performance.now(); for (let i = 0; i < 100; i++) draw(g, { bobAmp: 1, bobHz: 1 }, i / 24);
    expect((performance.now() - t0) / 100).toBeLessThan(8); // (generous for CI; about 1 ms locally)
  });
});
