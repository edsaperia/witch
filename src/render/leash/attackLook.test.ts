// The creatures' spells dialled up (Ed, 2026-11-03: "Let's dial up current creature spell effects a lot so they're easier to see.
// Larger, extra Bloom. Don't bring back the flash and rings yet") and the danger frame red everywhere (Ed, 2026-11-02: "the
// telegraph should be red").
import { describe, expect, it } from "vitest";
import * as THREE from "three";
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { AttackLook, DANGER, OLD_VISIBILITY, RAINBOW, zoneEvery, type Dress, type Visibility } from "./attackLook";
import { TUNING } from "../../rules/tuning";
import { ATTACK_LOOK, magicNamed, rgbOf } from "../../rules/attackLook";
import { SPECIES_ATTACKS } from "../../rules/attacks/species";
import { elements as FX } from "../fx/model";
import { attackLookAtlas } from "../../../art/attackLook.js";
import type { Game } from "../../rules/game";

type Call = { form: string; size: number; alpha: number; glow: number; tint: readonly number[] | null; width?: number };
/** An attack look whose magic layers record what they were asked to draw. */
function recorder(vis: Visibility) {
  const look = new AttackLook(new THREE.Scene(), { tuning: TUNING } as unknown as Game), calls: Call[] = [];
  const m = look.magic as unknown as Record<string, unknown>;
  m.draw = (_el: string, form: string, _x: number, _y: number, _z: number, _lv: number, size = 1, alpha = 1, _ph = 0, _seed = 0, tint: readonly number[] | null = null, _i?: number, glow = 1) => { calls.push({ form, size, alpha, glow, tint }); };
  m.beam = (_el: string, _x0: number, _z0: number, _x1: number, _z1: number, _y: number, width: number, _lv: number, alpha: number, _seed: number, tint: readonly number[] | null = null, _i?: number, glow = 1) => { calls.push({ form: "beam", size: width, width, alpha, glow, tint }); };
  m.ribbon = (_el: string, _x: number, _y: number, _z: number, _vx: number, _vy: number, _vz: number, _lv: number, _seed: number, tint: readonly number[] | null, _i: number | undefined, L: { width: number; alpha: number; life: number; glow: number }) => { calls.push({ form: "trail", size: L.width, alpha: L.alpha, glow: L.glow, tint }); };
  look.begin(vis);
  return { look, calls };
}
const wild: Dress = { el: "fire", level: 2 };
const NEW = TUNING.attackFx.visibility;

describe("the creatures' spells, dialled up (attackFx.visibility)", () => {
  it("defaults to Ed's 3 November dial-up: bigger, more solid, more glow, longer, denser zones, stronger ground marks", () => {
    expect(NEW).toEqual({ size: 1.75, opacity: 0.9, bloom: 2, duration: 1.5, zoneDensity: 0.5, groundMark: 0.45 });
    expect(NEW.size).toBeGreaterThan(OLD_VISIBILITY.size); expect(NEW.bloom).toBeGreaterThan(OLD_VISIBILITY.bloom);
    expect(NEW.groundMark).toBeGreaterThan(OLD_VISIBILITY.groundMark); expect(zoneEvery(NEW.zoneDensity)).toBeLessThan(zoneEvery(OLD_VISIBILITY.zoneDensity));
  });
  it("draws the old look exactly at the old values", () => {
    const { look, calls } = recorder(OLD_VISIBILITY);
    look.core({ ...wild, look: "acorn" }, 0, 1, 0, 8, 0, 0, 0, 1);
    expect(calls[0]).toMatchObject({ form: "projectile", size: 1, alpha: 0.45, glow: 1 });
    expect(calls[1]).toMatchObject({ form: "trail", size: 1, alpha: 0.6, glow: 1 });
    calls.length = 0; look.mark(wild, 0, 0, 0);
    expect(calls[0]).toMatchObject({ form: "zone", size: 1, alpha: 0.12 });
    calls.length = 0; look.beam(wild, 0, 0, 10, 0, 0.7, 1.4, 0, 1);
    expect(calls[0]).toMatchObject({ form: "beam", width: 1.4, alpha: 0.65, glow: 1 });
    expect(zoneEvery(OLD_VISIBILITY.zoneDensity)).toBe(4);
  });
  it("scales every part by the knobs", () => {
    const vis: Visibility = { size: 2, opacity: 1, bloom: 3, duration: 2, zoneDensity: 1, groundMark: 0.5 }, { look, calls } = recorder(vis);
    look.core({ ...wild, look: "acorn" }, 0, 1, 0, 8, 0, 0, 0, 1);
    expect(calls[0]).toMatchObject({ form: "projectile", size: 2, alpha: 1, glow: 3 });
    expect(calls[1]).toMatchObject({ form: "trail", size: 2, alpha: 1, glow: 3 });
    calls.length = 0; look.impact(wild, 0, 1, 0, 0.5, 1, 1.2);
    expect(calls[0].size).toBeCloseTo(2.4); expect(calls[0].glow).toBe(3);
    calls.length = 0; look.mark(wild, 0, 0, 0, 1);
    expect(calls[0]).toMatchObject({ form: "zone", size: 2, alpha: 0.5 });
    calls.length = 0; look.beam(wild, 0, 0, 10, 0, 0.7, 1.4, 0, 1);
    expect(calls[0].width).toBeCloseTo(2.8); expect(calls[0].alpha).toBe(1);
    // a zone: every tile at density 1, every fourth at the old 0.25
    const count = (density: number) => { const r = recorder({ ...vis, zoneDensity: density }); r.look.zone(wild, 0, 0, 4, 0.5, 9, () => true, 0); return r.calls.filter(c => c.form === "trap").length; };
    expect(count(1)).toBeGreaterThan(count(0.5)); expect(count(0.5)).toBeGreaterThan(count(0.25));
    expect(count(1)).toBeGreaterThanOrEqual(count(0.25) * 3.5);
  });
  it("keeps a hit and its mark on screen duration times as long", () => {
    const seen = (duration: number, t: number) => { const r = recorder({ ...OLD_VISIBILITY, duration }); r.look.hit(wild, 0, 1, 0, 0, 5); r.look.drawFx(t); return r.calls.map(c => c.form); };
    expect(seen(1, 1)).not.toContain("burst"); expect(seen(1.5, 1)).toContain("burst");
    expect(seen(1, 3)).not.toContain("zone"); expect(seen(1.5, 3)).toContain("zone");
  });
  it("adds extra bloom round bolts and hits only once bloom is over 1", () => {
    const glows = (bloom: number) => { const r = recorder({ ...OLD_VISIBILITY, bloom }); r.look.core(wild, 0, 1, 0, 8, 0, 0, 0, 1); r.look.impact(wild, 0, 1, 0, 0.2, 1); r.look.end(); return (r.look.glow.mesh.geometry as THREE.InstancedBufferGeometry).instanceCount; };
    expect(glows(1)).toBe(0); expect(glows(2)).toBeGreaterThan(0);
  });
  it("never brings the old flash, shock rings or bits back (Ed: \"Don't bring back the flash and rings yet\")", () => {
    const r = recorder(NEW); r.look.impact({ el: "moonlight", level: 3 }, 0, 1, 0, 0.1, 1); r.look.end();
    // (only the new layers' burst and one smooth bloom light: no ring of pixels on the ground, no flash star, no bits)
    expect((r.look.glowFlat.mesh.geometry as THREE.InstancedBufferGeometry).instanceCount).toBe(0);
    expect((r.look.glow.mesh.geometry as THREE.InstancedBufferGeometry).instanceCount).toBe(1);
    expect((r.look.paint.mesh.geometry as THREE.InstancedBufferGeometry).instanceCount).toBe(0);
  });
  it("draws status icons size times bigger", () => {
    const size = (s: number) => { const r = recorder({ ...OLD_VISIBILITY, size: s }); const L = r.look.paint as unknown as { size: Float32Array }; r.look.motif("slow", wild, 0, 1.4, 0, 0, 0); return L.size[0]; };
    expect(size(1.75) / size(1)).toBeCloseTo(1.75);
  });
});

describe("the unicorn's rainbow and the sphinx's gold", () => {
  it("dress their beams in their own magic, not bloom's and sand's", () => {
    expect(SPECIES_ATTACKS.unicorn.body?.element).toBe("rainbow"); expect(SPECIES_ATTACKS.sphinx.body?.element).toBe("gold");
    expect(magicNamed("rainbow")).toBe("rainbow"); expect(magicNamed("gold")).toBe("gold"); expect(magicNamed("fire")).toBeUndefined();
    expect(FX).toHaveProperty("rainbow"); expect(FX).toHaveProperty("gold");
  });
  it("draws a rainbow as six bands, red to violet", () => {
    const r = recorder(NEW); r.look.beam({ el: "bloom", fx: "rainbow", level: 2 }, 0, 0, 12, 0, 0.7, 1.4, 0, 1);
    const tints = r.calls.filter(c => c.form === "beam").map(c => c.tint);
    expect(tints).toHaveLength(6); for (const c of RAINBOW) expect(tints).toContainEqual(c);
  });
  it("draws gold golden: warm, saturated and brighter than sand", () => {
    const [r, g, b] = rgbOf(FX.gold.ramp[2]), sand = rgbOf(FX.sand.ramp[2]);
    expect(r).toBeGreaterThan(0.9); expect(g).toBeGreaterThan(0.7); expect(b).toBeLessThan(0.35);
    expect(r - b).toBeGreaterThan(sand[0] - sand[2]);
  });
});

describe("the danger frame is red everywhere (Ed, 2026-11-02: \"the telegraph should be red\")", () => {
  const red = DANGER.map(v => Math.round(v * 255));
  it("in the config, the renderer and the atlas alike", () => {
    expect(rgbOf(ATTACK_LOOK.danger.warn).map(v => Math.round(v * 255))).toEqual(red);
    const A = attackLookAtlas(ATTACK_LOOK);
    for (const name of ["warn", "pip", "tick", "chev", "bracket0", "flash2"]) {
      const [x, y, w, h] = A.cells[name], seen = new Set<string>();
      for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const k = ((y + j) * A.size + x + i) * 4; if (A.rgba[k + 3] === 255 && A.rgba[k] > 100) seen.add(`${A.rgba[k]},${A.rgba[k + 1]},${A.rgba[k + 2]}`); }
      expect([...seen], name).toEqual([red.join(",")]);
    }
  });
  it("and no note still says it's white or never red", () => {
    const root = join(__dirname, "../../.."), bad: string[] = [];
    const walk = (dir: string): void => {
      for (const f of readdirSync(dir)) {
        const p = join(dir, f);
        if (/node_modules|changelog|\.git$|dist|previews|making-of|performance-data/.test(p)) continue;
        if (statSync(p).isDirectory()) walk(p);
        else if (/\.(md|json|ts|js|mjs)$/.test(f) && !p.endsWith("attackLook.test.ts")) { const s = readFileSync(p, "utf8"); if (/\bnever red\b|white = warning|white warning dashes|white marching dashes/i.test(s)) bad.push(p.slice(root.length + 1)); }
      }
    };
    for (const d of ["docs", "config", "src", "art"]) walk(join(root, d));
    expect(bad).toEqual([]);
  });
});
