// Creatures drawn as meshes (art/mesh; Ed, 2026-11-12: "I'm happy with these models, let's do the real build"): every plan builds,
// the software rasteriser's frames are the shape the game's sprites need, and nothing changes unless the style asks for them.
import { describe, expect, it } from "vitest";
import { MESH_FRAMES, MESH_HEIGHTS, hasMesh, meshGait, meshNap, meshSleep, meshWalk } from "../../art/mesh/index.js";
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
    expect(hasMesh("bee", { meshCreatures: 1 })).toBe(true); // (a kind since 2026-11-12, in the marten's place on home)
    expect(hasMesh("turtle", { meshCreatures: 1 })).toBe(true); // (a kind since 2026-11-12, in the newt's place in the Fen)
    expect(hasMesh("fox", { meshCreatures: 0 })).toBe(false); // (the link's meshCreatures=0: the generated ones, to compare)
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

  it("wears party gear: a lit collar in the leash's colour, a hat, glasses and shoes change the picture", () => {
    const bare = meshWalk("fox", 0) as unknown as { w: number; h: number; towards: Frame[] }, collar = [60, 255, 200];
    const dressed = meshWalk("fox", 0, { collar, hat: 1, glasses: "bar", shoes: "sneakers" } as unknown as null) as unknown as typeof bare;
    const lit = (b: typeof bare) => { let n = 0; const a = b.towards[0].albedo; for (let i = 0; i < a.length; i += 4) if (a[i + 3] === 254 && a[i + 1] > 200 && a[i] < 120) n++; return n; };
    expect(lit(bare)).toBe(0);
    expect(lit(dressed)).toBeGreaterThan(3); // (the collar: lit, in its colour)
    expect((dressed as unknown as { ppu: number }).ppu).toBeCloseTo((bare as unknown as { ppu: number }).ppu, 6); // (dressed, it is the same size: a hat doesn't shrink it)
    expect(dressed.h).toBeGreaterThanOrEqual(bare.h);
  });

  it("lies down to sleep at the size it walks at, and a sleeping legend is stone: nothing lit, and lower than the nap it is made from", () => {
    const walk = meshWalk("fox", 1) as unknown as { w: number; h: number; towards: Frame[] }, nap = meshNap("fox", 1) as unknown as typeof walk;
    expect(nap.towards).toHaveLength(2);
    expect(nap.h).toBeLessThan(walk.h); // (lying down)
    expect(nap.w).toBeGreaterThan(walk.w * 0.6); // (and not shrunk)
    const legend = meshNap("snail", 3) as unknown as typeof walk, asleep = meshSleep("snail") as unknown as typeof walk;
    expect(asleep.h).toBeLessThan(legend.h); // (part sunk)
    for (const f of asleep.towards) { expect(f.albedo).toHaveLength(asleep.w * asleep.h * 4); for (let i = 3; i < f.albedo.length; i += 4) expect(f.albedo[i] === 0 || f.albedo[i] === 255).toBe(true); }
  });

  it("gives the view its walk without drawing it", () => {
    const g = meshGait("fox") as { frames: number; step: number };
    expect(g.frames).toBe(MESH_FRAMES);
    expect(g.step).toBeGreaterThan(0.005); expect(g.step).toBeLessThan(0.3);
    expect(meshGait("fox")).toBe(g);
  });
});
