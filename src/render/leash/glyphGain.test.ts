// The sigils' glow (Ed's pick B, 2026-10-12: "it's their glow that makes them hard to see, not the pixellation"): every glyph from the
// leash atlas is drawn at the tuning's leash.sigilGlyph times its colour, under the bloom's threshold; the soft dots and the solid
// square (halos, sparks, health bars) are left as given.
import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { Instances, isGlyph, SLOT, SLOTS, SQ } from "./glyphs";
import { TUNING } from "../../rules/tuning";

const uv = (slot: number) => { const N = SLOT * SLOTS, x = (slot % SLOTS) * SLOT, y = Math.floor(slot / SLOTS) * SLOT; return [x / N, 1 - y / N, (x + SLOT) / N, 1 - (y + SLOT) / N]; };

describe("the sigils' glyph strength", () => {
  it("tells a glyph from the soft dot and the solid square", () => {
    expect(isGlyph(uv(0))).toBe(false);
    expect(isGlyph(uv(SQ))).toBe(false);
    for (const s of [1, 17, 160, 200]) expect(isGlyph(uv(s))).toBe(true);
  });

  it("dims glyphs by glyphGain and leaves the dots and squares be", () => {
    const I = new Instances(new THREE.ShaderMaterial());
    I.glyphGain = 0.5;
    I.begin();
    I.add(0, 0, 0, 3, uv(5), 1, 0.8, 0.6, 1);
    I.add(0, 0, 0, 3, uv(0), 1, 0.8, 0.6, 1);
    I.add(0, 0, 0, 3, uv(SQ), 1, 0.8, 0.6, 1);
    const col = (I as unknown as { col: Float32Array }).col;
    expect([...col.slice(0, 3)].map(v => +v.toFixed(3))).toEqual([0.5, 0.4, 0.3]);
    expect([...col.slice(4, 7)].map(v => +v.toFixed(3))).toEqual([1, 0.8, 0.6]);
    expect([...col.slice(8, 11)].map(v => +v.toFixed(3))).toEqual([1, 0.8, 0.6]);
  });

  it("ships under the bloom's threshold with no halos (Ed's pick B)", () => {
    expect(TUNING.leash.sigilGlyph).toBeLessThan(1);
    expect(TUNING.leash.sigilHalo).toBe(0);
  });
});
