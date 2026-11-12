// Creatures drawn as meshes (art/mesh; Ed, 2026-11-12: "I'm happy with these models, let's do the real build"): every plan builds,
// the software rasteriser's frames are the shape the game's sprites need, and nothing changes unless the style asks for them.
import { describe, expect, it } from "vitest";
import { MESH_FRAMES, MESH_HEIGHTS, hasMesh, meshGait } from "../../art/mesh/index.js";
import { MESH_PLANS } from "../../art/mesh/plans.js";
import { pose, shape } from "../../art/mesh/shape.js";
import { bakeMesh } from "../../art/mesh/raster.js";
import { GENOME_BY_ID } from "../../art/genome/index.js";

interface Frame { albedo: Uint8ClampedArray; normal: Uint8ClampedArray; flipped: Uint8ClampedArray; eyes?: Uint8Array; head?: [number, number] }

describe("mesh creatures", () => {
  it("are only drawn when the style asks", () => {
    expect(hasMesh("fox", {})).toBe(false);
    expect(hasMesh("fox", { meshCreatures: 1 })).toBe(true);
    expect(hasMesh("wolf", { meshCreatures: 1 })).toBe(false); // (no mesh yet)
    expect(hasMesh("bee", { meshCreatures: 1 })).toBe(false); // (a plan, but not in the game's roster yet)
  });

  it("have a size at every level only for species the game has", () => {
    for (const [species, heights] of Object.entries(MESH_HEIGHTS)) {
      expect((GENOME_BY_ID as Record<string, unknown>)[species], species).toBeTruthy();
      expect(heights, species).toHaveLength(4);
      expect((MESH_PLANS as Record<string, unknown[]>)[species], species).toHaveLength(4);
    }
  });

  it("every plan builds: bones after their parents, whole triangles, a walk that moves and comes back round", () => {
    for (const [species, levels] of Object.entries(MESH_PLANS as Record<string, (() => unknown)[]>)) levels.forEach((make, level) => {
      const sh = shape(make()), name = `${species} ${level}`;
      expect(sh.lit.pos.length % 9, name).toBe(0);
      expect(sh.lit.pos.length / 3, name).toBe(sh.lit.bone.length);
      expect(sh.lit.pos.every(Number.isFinite) && sh.glow.pos.every(Number.isFinite), name).toBe(true);
      sh.bones.forEach((b: { parent: number }, i: number) => expect(b.parent, name).toBeLessThan(i));
      const a = pose(sh, 0), b = pose(sh, 0.5), c = pose(sh, 1);
      expect(Array.from(a.T).some((v, i) => Math.abs(v - b.T[i]) > 1e-4), name).toBe(true);
      expect(Array.from(a.T).every((v, i) => Math.abs(v - c.T[i]) < 1e-6), name).toBe(true);
    });
  });

  it("draws a walk as sprites: one size, its height as asked, feet on the bottom row, the same every time", () => {
    const sh = shape((MESH_PLANS as Record<string, (() => unknown)[]>).fox[1]()), o = { height: 81, frames: 4, colours: 12 };
    const b = bakeMesh(sh, o) as { w: number; h: number; step: number; towards: Frame[]; away: Frame[] };
    expect(b.towards).toHaveLength(4); expect(b.away).toHaveLength(4);
    const rows = (f: Frame) => { let top = b.h, bottom = -1; for (let y = 0; y < b.h; y++) for (let x = 0; x < b.w; x++) if (f.albedo[(y * b.w + x) * 4 + 3]) { top = Math.min(top, y); bottom = Math.max(bottom, y); } return [top, bottom]; };
    const [top, bottom] = rows(b.towards[0]);
    expect(Math.abs(bottom - top + 1 - 81)).toBeLessThanOrEqual(2);
    expect(Math.max(...[...b.towards, ...b.away].map(f => rows(f)[1]))).toBe(b.h - 1); // (the walk's lowest foot stands on the bottom row)
    for (const f of [...b.towards, ...b.away]) {
      expect(f.albedo).toHaveLength(b.w * b.h * 4); expect(f.normal).toHaveLength(b.w * b.h * 4); expect(f.flipped).toHaveLength(b.w * b.h * 4);
      for (let i = 3; i < f.albedo.length; i += 4) expect([0, 254, 255]).toContain(f.albedo[i]); // (empty, glowing, solid: as a hand-drawn frame marks them)
      expect(f.head![0]).toBeGreaterThan(0); expect(f.head![0]).toBeLessThan(b.w);
    }
    expect(b.towards[0].eyes?.some(v => v === 1)).toBe(true); // (its eyes show, towards us: the find-in-the-dark shine needs them)
    expect(b.step).toBeGreaterThan(0.005); expect(b.step).toBeLessThan(0.3);
    const again = bakeMesh(sh, o) as typeof b;
    expect(again.towards[2].albedo).toEqual(b.towards[2].albedo);
  });

  it("gives the view its walk without drawing it", () => {
    const g = meshGait("fox") as { frames: number; step: number };
    expect(g.frames).toBe(MESH_FRAMES);
    expect(g.step).toBeGreaterThan(0.005); expect(g.step).toBeLessThan(0.3);
    expect(meshGait("fox")).toBe(g);
  });
});
