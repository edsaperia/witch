// The dive's own light (Ed's dive plan, 6 Nov, its step 7; render/view/frameUniforms.ts diveLight): what nothing lights darker and
// the haze nearer while a sail's dive flies, by arrive.mood.strength (0: the night's own light, as before), and back as it lands.
import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { diveLight } from "./frameUniforms";
import { LIGHT_UNIFORMS } from "../lighting";
import { TUNING } from "../../rules/tuning";

const view = (strength: number, mood: number | null) => ({ game: { tuning: { ...TUNING, arrive: { ...TUNING.arrive!, mood: { ...TUNING.arrive!.mood!, strength } } } }, fly: mood === null ? null : { tx: 0, ty: 0, tz: 0, angle: 30, distance: 220, fov: 20, mood }, diveHaze: null as THREE.Vector2 | null });
const night = () => { LIGHT_UNIFORMS.uHazeRange.value.set(60, 200); LIGHT_UNIFORMS.uUnlitDim.value = 0.8; };

describe("the dive's own light", () => {
  it("at strength 0 leaves the night's light exactly as it was", () => {
    night(); const v = view(0, 1); diveLight(v as never);
    expect(LIGHT_UNIFORMS.uUnlitDim.value).toBe(0.8); expect(LIGHT_UNIFORMS.uHazeRange.value.toArray()).toEqual([60, 200]);
  });
  it("in the dive, darker where nothing lights and the haze nearer; landed, the night's own again", () => {
    const K = TUNING.arrive!.mood!;
    expect(K.strength).toBeGreaterThan(0); expect(K.dark).toBeLessThan(1); expect(K.hazeFar).toBeLessThan(200);
    night(); const v = view(1, 1); diveLight(v as never);
    expect(LIGHT_UNIFORMS.uUnlitDim.value).toBeCloseTo(0.8 * K.dark, 9);
    expect(LIGHT_UNIFORMS.uHazeRange.value.toArray()).toEqual([K.hazeNear, K.hazeFar]);
    night(); LIGHT_UNIFORMS.uHazeRange.value.set(K.hazeNear, K.hazeFar); v.fly = null; diveLight(v as never); // (landed: the night's haze back)
    expect(LIGHT_UNIFORMS.uHazeRange.value.toArray()).toEqual([60, 200]); expect(LIGHT_UNIFORMS.uUnlitDim.value).toBe(0.8);
  });
  it("half the strength, half the way", () => {
    const K = TUNING.arrive!.mood!;
    night(); diveLight(view(0.5, 1) as never);
    expect(LIGHT_UNIFORMS.uHazeRange.value.y).toBeCloseTo(200 + (K.hazeFar - 200) * 0.5, 9);
  });
});
