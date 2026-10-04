// The rolling ground: what the CPU reads (heightAt) agrees with what the shaders read (the stored,
// half-float samples, filtered bilinearly); the plateaus are level; paths are level across.
import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { generateMap } from "../rules/map";
import { Forest } from "../rules/forest";
import { TUNING } from "../rules/tuning";
import { floorClearing } from "../rules/speakers";
import { HeightField, hillsAt, N, RES } from "./height";

const map = generateMap(123, TUNING), forest = new Forest(map);
const H = { on: true, amplitude: 2, scale: 48, octaves: 3 };
const field = new HeightField(map, forest, H);
const df = map.dancefloor;
field.follow(df.x + 60, df.z + 40);

/** What the GPU's linear filter reads at (x, z), from the texture's own half floats. */
function shaderRead(x: number, z: number): number {
  const d = field.texture.image.data as Uint16Array, at = (i: number, j: number) => THREE.DataUtils.fromHalfFloat(d[((j % N) + N) % N * N + ((i % N) + N) % N]);
  const fx = x / RES, fz = z / RES, i = Math.floor(fx), j = Math.floor(fz), tx = fx - i, tz = fz - j;
  const top = at(i, j) * (1 - tx) + at(i + 1, j) * tx, bot = at(i, j + 1) * (1 - tx) + at(i + 1, j + 1) * tx;
  return top * (1 - tz) + bot * tz;
}

describe("rolling ground", () => {
  it("the hills' noise stays within its amplitude and is seeded", () => {
    for (let i = 0; i < 500; i++) { const v = hillsAt(i * 7.3, i * 3.1, 9, H); expect(Math.abs(v)).toBeLessThanOrEqual(H.amplitude + 1e-9); }
    expect(hillsAt(12, 34, 9, H)).toBe(hillsAt(12, 34, 9, H));
  });
  it("heightAt agrees with the samples the shaders read, between and on samples", () => {
    let sum = 0;
    for (let k = 0; k < 400; k++) {
      const x = df.x + 60 + Math.sin(k * 1.7) * 150, z = df.z + 40 + Math.cos(k * 2.3) * 150;
      expect(Math.abs(field.heightAt(x, z) - shaderRead(x, z))).toBeLessThan(1e-4);
      // And close to h itself (the samples are 2 m apart; sharpest at a path's or plateau's edge).
      const e = Math.abs(field.heightAt(x, z) - field.sourceAt(x, z));
      expect(e).toBeLessThan(0.2);
      sum += e;
    }
    expect(sum / 400).toBeLessThan(0.02);
  });
  it("is level over the dancefloor's clearing and speakers", () => {
    const r = floorClearing(TUNING), h0 = field.heightAt(df.x, df.z);
    for (let a = 0; a < 12; a++) for (const f of [0.3, 0.7, 1]) expect(Math.abs(field.heightAt(df.x + Math.cos(a) * r * f, df.z + Math.sin(a) * r * f) - h0)).toBeLessThan(0.05);
  });
  it("paths are level across (but where two lines meet)", () => {
    let checked = 0, tilted = 0;
    for (const l of map.paths.lines) for (let s = 0; s < l.pts.length - 1; s += 5) {
      const [a, b] = [l.pts[s], l.pts[s + 1]], ex = b[0] - a[0], ez = b[1] - a[1], len = Math.hypot(ex, ez) || 1, nx = -ez / len, nz = ex / len;
      if (Math.hypot(a[0] - df.x - 60, a[1] - df.z - 40) > 300) continue;
      const left = field.sourceAt(a[0] + nx * l.half * 0.9, a[1] + nz * l.half * 0.9), right = field.sourceAt(a[0] - nx * l.half * 0.9, a[1] - nz * l.half * 0.9);
      if (Math.abs(left - right) > 0.1) tilted++;
      checked++;
    }
    expect(checked).toBeGreaterThan(20);
    expect(tilted / checked).toBeLessThan(0.05);
  });
  it("moving the window keeps the heights where they were", () => {
    const x = df.x + 100, z = df.z + 90, before = field.heightAt(x, z);
    field.follow(df.x + 60 + 40, df.z + 40 + 24);
    expect(Math.abs(field.heightAt(x, z) - before)).toBeLessThan(1e-6);
  });
  it("is flat with the hills off", () => {
    const flat = new HeightField(map, forest, { ...H, on: false });
    flat.follow(df.x, df.z);
    expect(flat.heightAt(df.x + 50, df.z + 50)).toBe(0);
  });
});
