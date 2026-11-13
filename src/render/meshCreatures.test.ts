// Creatures drawn as meshes (art/mesh; Ed, 2026-11-12: "I'm happy with these models, let's do the real build"): every plan builds,
// the software rasteriser's frames are the shape the game's sprites need, and nothing changes unless the style asks for them.
import { describe, expect, it } from "vitest";
import { MESH_CYCLE, MESH_FRAMES, MESH_HEIGHTS, MESH_RATE, MESH_STAND, hasMesh, meshFacts, meshGait, meshNap, meshSleep, meshWalk } from "../../art/mesh/index.js";
import { MESH_PLANS } from "../../art/mesh/plans.js";
import { GAIT_TYPES, pose, shape } from "../../art/mesh/shape.js";
import { napping } from "../../art/mesh/gear.js";
import { newStride, stepStride } from "../../art/mesh/stride.js";
import { bakeMesh } from "../../art/mesh/raster.js";
import { GENOME_BY_ID } from "../../art/genome/index.js";
import { MESH_SPECIES } from "../../art/mesh/species/index.js";
import { indexText, meshIds } from "../../tools/creature-mesh/index.mjs";
import { readFileSync } from "node:fs";

interface Frame { albedo: Uint8ClampedArray; normal: Uint8ClampedArray; flipped: Uint8ClampedArray; eyes?: Uint8Array; head?: [number, number] }

describe("mesh creatures", () => {
  it("are only drawn when the style asks", () => {
    expect(hasMesh("fox", {})).toBe(false);
    expect(hasMesh("fox", { meshCreatures: 1 })).toBe(true);
    expect(hasMesh("hydra", { meshCreatures: 1 })).toBe(false); // (no mesh yet: the last batch's)
    expect(hasMesh("wolf", { meshCreatures: 1 })).toBe(true); // (batch A, 2026-11-13)
    expect(hasMesh("snake", { meshCreatures: 1 })).toBe(true); // (batch E, 2026-11-13: a legless one)
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

  it("a kind's mesh is its own file, and the list of them is made from the folder (tools/creature-mesh/index.mjs)", () => {
    expect(readFileSync("art/mesh/species/index.js", "utf8"), "run node tools/creature-mesh/index.mjs").toBe(indexText());
    expect(Object.keys(MESH_SPECIES)).toEqual(meshIds());
    for (const [id, m] of Object.entries(MESH_SPECIES as Record<string, { id: string; heights: number[]; plans: Record<string, unknown> }>)) {
      expect(m.id, id).toBe(id);
      expect(m.heights, id).toEqual((MESH_HEIGHTS as Record<string, number[]>)[id]);
      expect(Object.keys(m.plans), id).toEqual(["baby", "young", "adult", "legend"]);
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
    expect(dressed.h).toBeGreaterThanOrEqual(bare.h - 1); // (its sprite's height is its run's leap now, not its hat's: within a row, shod)
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

  it("gives the view its walk without drawing it: its cycle, the frame it stands still in, a step for each level", () => {
    const g = meshGait("fox") as { frames: number; cycle: number; stand: number; rate: number; type: string; step: number; steps: number[] };
    expect(g.frames).toBe(MESH_FRAMES + MESH_CYCLE); expect(g.cycle).toBe(MESH_CYCLE); // (a legged kind: its slow cycle, standing, its fast cycle)
    expect((meshGait("snail") as { frames: number; run?: unknown }).frames).toBe(MESH_FRAMES); expect((meshGait("snail") as { run?: unknown }).run).toBeUndefined(); // (a legless one goes the one way)
    const fast = (g as unknown as { run: { from: number; steps: number[] }; rests: number[] }); expect(fast.run.from).toBe(MESH_FRAMES); expect(fast.run.steps).toHaveLength(4);
    fast.run.steps.forEach((s, l) => expect(s, `fox ${l}: its run's step is the longer`).toBeGreaterThan(g.steps[l] * 1.5));
    expect(fast.rests.length, "its walk has frames with every foot down, to stop on").toBeGreaterThan(0); expect(g.stand).toBe(MESH_STAND); expect(g.rate).toBe(MESH_RATE);
    expect(MESH_FRAMES).toBe(MESH_CYCLE + 1); // (the walk's cycle, then standing still)
    expect(g.steps).toHaveLength(4); expect(g.step).toBe(g.steps[2]);
    for (const step of g.steps) { expect(step).toBeGreaterThan(0.005); expect(step).toBeLessThan(0.3); }
    expect(meshGait("fox")).toBe(g);
    const walk = meshWalk("fox", 0) as unknown as { towards: Frame[]; away: Frame[] };
    expect(walk.towards).toHaveLength(MESH_FRAMES + MESH_CYCLE); expect(walk.away).toHaveLength(MESH_FRAMES + MESH_CYCLE);
  });

  // Ed's playtest of the meshes in the running game, 2026-11-12: "1/ animals appear to float above the ground (I guess bottom point
  // not set correctly)"; "2/ their moving animations don't seem to animate their legs and are very short; they appear to vibrate
  // along instead of walk."; "many small creatures bound rather than trot".
  type Plan = { gait: { type?: string; sleep?: string; legs?: unknown[] }; hover?: number };
  type Shape = { bones: { at: number[] }[]; lit: { pos: number[]; bone: number[] }; glow: { pos: number[]; bone: number[] }; motion: { lift?: (u: number) => number } };
  const PLANS = MESH_PLANS as unknown as Record<string, (() => Plan)[]>;
  /** The lowest point of all of a shape at `u` of its clip (null: standing still), metres above the ground. */
  const lowest = (sh: Shape, u: number | null): number => { const { R, T } = pose(sh, u) as { R: Float64Array; T: Float64Array }; let lo = Infinity;
    for (const part of [sh.lit, sh.glow]) for (let v = 0; v < part.bone.length; v++) { const b = part.bone[v], a = sh.bones[b].at, y = R[b * 9 + 3] * (part.pos[v * 3] - a[0]) + R[b * 9 + 4] * (part.pos[v * 3 + 1] - a[1]) + R[b * 9 + 5] * (part.pos[v * 3 + 2] - a[2]) + T[b * 3 + 1]; if (y < lo) lo = y; }
    return lo; };
  /** How many empty rows lie under a frame's lowest drawn pixel. */
  const gap = (f: Frame, w: number, h: number): number => { for (let y = h - 1; y >= 0; y--) for (let x = 0; x < w; x++) if (f.albedo[(y * w + x) * 4 + 3]) return h - 1 - y; return h; };
  /** How each kind gets about (Ed, 2026-11-12: "many small creatures bound rather than trot"). A new kind's goes here with its mesh. */
  const GAITS: Record<string, string> = { fox: "trot", stoat: "bound", marten: "bound", hare: "bound", squirrel: "bound", dormouse: "bound", badger: "trot", mole: "trot", hedgehog: "trot", turtle: "walk", snail: "glide", bee: "fly", stag: "trot", elk: "trot", roe: "bound", ram: "trot", ibex: "bound", boar: "trot" };
  Object.assign(GAITS, { wolf: "trot", arcticfox: "trot", raccoon: "trot", redpanda: "trot", fennec: "bound", otter: "bound", meerkat: "bound" }); // (batch A, 2026-11-13)
  Object.assign(GAITS, { cat: "bound", lynx: "bound", cheetah: "bound", snowleopard: "bound", lion: "trot", tiger: "trot", jaguar: "trot" }); // (batch B, the cats: kit/feline.js)
  Object.assign(GAITS, { bear: "trot", polarbear: "trot", rhino: "trot", elephant: "walk", beaver: "trot", flyingsquirrel: "bound" }); // (batch D, the heavy and the gnawing)
  Object.assign(GAITS, { salamander: "trot", komodo: "trot", crocodile: "trot", armadillo: "trot", toad: "bound", snake: "glide", rattlesnake: "glide" }); // (batch E, the cold-blooded: kit/sprawl.js, kit/serpent.js)

  it("every kind says how it goes, and its stride is long enough to read as one (not a shuffle on the spot)", () => {
    for (const [species, levels] of Object.entries(PLANS)) levels.forEach((make, level) => {
      const p = make(), F = meshFacts(species, level) as { type: string; stride: number; body: number; step: number }, name = `${species} ${level}`;
      expect(GAIT_TYPES, name).toContain(p.gait.type);
      expect(F.type, name).toBe(GAITS[species]);
      expect(F.body, name).toBeGreaterThan(0.2);
      // (how far it goes in one cycle of its legs, in its own body's lengths: the first meshes went a twentieth to a third)
      const least = { bound: 0.5, trot: 0.2, walk: 0.15 }[F.type];
      if (least) expect(F.stride / F.body, name).toBeGreaterThan(least);
      if (F.type === "bound") expect([0, 1, 2, 3, 4, 5, 6, 7].some(i => shape(make(), "run").motion.lift(i / MESH_CYCLE) > 0.005), name).toBe(true); // (a moment in the air)
      expect(F.step, name).toBeGreaterThan(0.005); // (its slow pace's: short steps, most feet down)
    });
  });

  it("stands on the ground in every pose, at every level: walking, standing still and asleep, its lowest point is on it", () => {
    for (const [species, levels] of Object.entries(PLANS)) levels.forEach((make, level) => {
      const p = make(), name = `${species} ${level}`;
      const nap = shape(napping(p, p.gait.sleep ?? (level === 3 ? "curl" : "sphinx"))) as unknown as Shape;
      for (const u of [0, 0.25, 0.5, 0.75]) expect(Math.abs(lowest(nap, u)), `${name} asleep`).toBeLessThan(1e-4); // (a flyer too: it lands to sleep)
      if (p.hover) return; // (a flyer hangs in the air awake: its sprite keeps the air under it, below)
      const sh = shape(p) as unknown as Shape, body = (meshFacts(species, level) as { body: number }).body;
      expect(Math.abs(lowest(sh, null)), `${name} standing`).toBeLessThan(1e-4);
      // (walking: its feet on the ground, or as high as its bound has it then; what hangs lower than its feet, a skirt of spines,
      // a belly, may brush a little under or over as it rocks)
      for (let i = 0; i < 16; i++) expect(Math.abs(lowest(sh, i / 16) - (sh.motion.lift?.(i / 16) ?? 0)) / body, `${name} walking, ${i}/16`).toBeLessThan(0.05);
    });
  });

  // Ed, 2026-11-12, of the walk clip: "the feet don't plant, and the bodies seem rigid"; its legs "still slide or skate, mostly
  // short-legged animals at speed". tools/creature-mesh/slip.mjs measures the same at every level, in art pixels.
  type Strider = Shape & { stride: number; feet: { paw: number; phase: number; duty: number }[] };
  it("plants its feet: a paw that is down stays where it is on the ground for its whole stance, at both paces", () => {
    for (const [species, levels] of Object.entries(PLANS)) for (const level of [0, 2]) for (const pace of ["walk", "run"]) {
      const p = levels[level](); if (!p.gait.legs?.length) continue;
      const sh = shape(p, pace) as unknown as Strider, name = `${species} ${level} ${pace}`;
      expect(sh.feet.length, name).toBe(4); expect(sh.stride, name).toBeGreaterThan(0);
      for (const f of sh.feet) { let x0 = 0, y0 = 0, z0 = 0;
        for (let i = 0; i <= 24; i++) { const c = f.duty * 0.999 * i / 24, T = (pose(sh, (((c - f.phase) % 1) + 1) % 1) as { T: Float64Array }).T, x = T[f.paw * 3], y = T[f.paw * 3 + 1], z = T[f.paw * 3 + 2] + sh.stride * c; // (the body has gone that far since it came down)
          if (!i) { x0 = x; y0 = y; z0 = z; continue; }
          expect(Math.hypot(x - x0, y - y0, z - z0) / sh.stride, `${name}: paw ${f.paw} at ${i}/24 of its stance`).toBeLessThan(0.005); } }
    }
  });

  it("is stepped by the view in whole steps: a planted foot never slides, at a crawl or a sprint, and it stops on a frame with every foot down", () => {
    const G = { cycle: 8, step: 0.4, rests: [0, 2, 4, 6], run: { step: 1.6 } };
    for (const speed of [0.3, 2, 9, 40]) { // (the game's metres a second)
      const o = newStride(); let x = 0, ran = false, was: { run: boolean; frame: number; at: number } | null = null;
      for (let i = 0; i < 600; i++) { x += speed / 60; const r = stepStride(o, G, speed / 60, 1 / 60), step = r.run ? G.run.step : G.step, at = x + r.shift; ran ||= r.run;
        // (where it is drawn moves only as its frame does, a step a frame: so a foot the frames have planted stays on its ground;
        // going to its other clip it stays where it was drawn)
        if (was) expect(at - was.at, `at ${speed}, picture ${i}`).toBeCloseTo(was.run === r.run ? ((r.frame - was.frame + 8) % 8) * step : 0, 6);
        was = { run: r.run, frame: r.frame, at }; expect(r.shift).toBeLessThanOrEqual(1e-9); expect(r.shift).toBeGreaterThan(-step - 1e-9); }
      expect(ran, `at ${speed}`).toBe(speed > 4); // (its fast clip past a cycle and a half a second of its slow one)
      if (ran) continue;
      let last = stepStride(o, G, 0, 1 / 60); for (let i = 0; i < 60; i++) last = stepStride(o, G, 0, 1 / 60);
      expect(G.rests, `stopped from ${speed}`).toContain(last.frame); expect(last.stand).toBe(false); expect(last.shift).toBeLessThanOrEqual(G.step + 1e-9);
    }
    const o = newStride(); for (let i = 0; i < 120; i++) stepStride(o, G, 40 / 60, 1 / 60);
    let r = stepStride(o, G, 0, 1 / 60), landed = 0; for (let i = 0; i < 30; i++) { r = stepStride(o, G, 0, 1 / 60); if (r.settled) landed++; }
    expect(r.stand).toBe(true); expect(landed).toBe(1); // (from a run: its standing frame, once)
  });

  it("moves its body with its gait: it bobs, its head is steadier than its chest, and its tail follows late", () => {
    const at = (sh: Shape, bone: string, u: number): number[] => { const i = (sh.bones as unknown as { name: string }[]).findIndex(b => b.name === bone), T = (pose(sh, u) as { T: Float64Array }).T; return [T[i * 3], T[i * 3 + 1], T[i * 3 + 2]]; };
    const turn = (sh: Shape, bone: string, u: number): number => { const i = (sh.bones as unknown as { name: string }[]).findIndex(b => b.name === bone), R = (pose(sh, u) as { R: Float64Array }).R; return Math.asin(-R[i * 9 + 5]); }; // (its pitch)
    const range = (f: (u: number) => number): number => { let lo = Infinity, hi = -Infinity; for (let i = 0; i < 48; i++) { const v = f(i / 48); lo = Math.min(lo, v); hi = Math.max(hi, v); } return hi - lo; };
    for (const [species, pace, bobs] of [["fox", "run", 2], ["badger", "walk", 2], ["hare", "run", 1], ["stoat", "run", 1]] as const) {
      const sh = shape(PLANS[species][2](), pace) as unknown as Shape, hips = (u: number): number => at(sh, "pelvis", u)[1], rise = range(hips), name = `${species} ${pace}`;
      expect(rise, `${name} bobs`).toBeGreaterThan(0.004);
      let ups = 0; for (let i = 0; i < 96; i++) { const a = hips((i - 1) / 96), b = hips(i / 96), c = hips((i + 1) / 96); if (b > a + 1e-9 && b >= c) ups++; }
      if (bobs === 2) expect(ups, `${name}: rises twice a cycle`).toBe(2);
      else expect(rise, `${name}: a bound's big rise and fall`).toBeGreaterThan(0.03); // (off its hind feet, and a lower one off its fore)
      expect(range(u => turn(sh, "head", u)), `${name}: its head pitches less than its chest`).toBeLessThan(range(u => turn(sh, "chest", u)) * 0.6);
    }
    // (a bound's back gathers and stretches: its hips and its chest come nearer and go further apart)
    const hare = shape(PLANS.hare[2](), "run") as unknown as Shape;
    expect(range(u => turn(hare, "chest", u) - turn(hare, "pelvis", u)), "the hare's back flexes").toBeGreaterThan(0.3);
  });

  it("is drawn with its feet on its sprite's bottom row, towards and away (each heading stood on its own ground)", () => {
    // (babies: the smallest sprites, so every kind can be drawn here; the crop is the same code at every level)
    for (const species of Object.keys(PLANS)) {
      const walk = meshWalk(species, 0) as unknown as { w: number; h: number; towards: Frame[]; away: Frame[] }, nap = meshNap(species, 0) as unknown as typeof walk, flies = !!PLANS[species][0]().hover;
      for (const facing of ["towards", "away"] as const) {
        const gaps = walk[facing].map(f => gap(f, walk.w, walk.h)), name = `${species} ${facing}: ${gaps.join(",")}`;
        expect(Math.min(...nap[facing].map(f => gap(f, nap.w, nap.h))), `${species} asleep ${facing}`).toBe(0);
        if (flies) continue; // (awake it hangs in the air, over the ground its sprite keeps under it: art/mesh/raster.js, sh.hover)
        expect(Math.min(...gaps.filter((_, i) => i !== MESH_STAND)), name).toBe(0); // (its lowest foot of all, at either pace, is on the bottom row)
        expect(Math.min(...gaps.slice(0, MESH_CYCLE)), name).toBeLessThanOrEqual(Math.max(2, Math.ceil(walk.h * 0.05))); // (and its slow walk's within a row or two: its run reaches a near foot further towards us)
        expect(gaps[MESH_STAND], name).toBeLessThanOrEqual(Math.max(2, Math.ceil(walk.h * 0.05))); // (standing: a nearer foot reaches a row or two lower mid-stride)
        expect(Math.max(...gaps), name).toBeLessThanOrEqual(Math.ceil(walk.h * 0.15)); // (a lifted near foot, or a bound's moment in the air)
      }
      expect(Math.max(...nap.towards.map(f => gap(f, nap.w, nap.h))), `${species} asleep`).toBeLessThanOrEqual(1); // (lying on the ground, breathing)
    }
  }, 120000);
});
