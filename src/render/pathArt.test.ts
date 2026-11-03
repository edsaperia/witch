// The footpaths' looks (Ed, 2026-11-03: "generate several more variations of each kind of footpath so they look less repetitive";
// "Can you give them bump maps to make them less flat?"): every footpath kind has at least four named variants, each bakes (strip,
// end, Y and T), repeats seamlessly along its length (colour and relief), differs from the kind's others, and has a bump map; the
// render stacks a kind's looks in one texture.
import { describe, expect, it } from 'vitest';
import * as Art from '../../art/generator.js';
import { pathLooks } from './paths';

type Surface = (u: number, v: number, core: boolean, variant: number) => 0 | [number, number, number?];
type Kind = { width: number; period: number; variants?: string[]; glow?: boolean; surface: Surface };
type Sp = { w: number; h: number; m: Uint8Array; hgt?: Float32Array };
const KINDS = Art.PATH_KINDS as unknown as Record<string, Kind>;
const FOOTPATHS = ['dirt', 'animal', 'flagstones', 'cobbles', 'stepping', 'boardwalk', 'roots', 'magic'];
const EMISSIVE = Art.EMISSIVE as Set<number>;
const drawn = (sp: Sp) => sp.m.reduce((n, v) => n + (v ? 1 : 0), 0);

describe('footpath variants', () => {
  for (const id of FOOTPATHS) {
    const K = KINDS[id];
    it(`${id}: at least four named looks, each baking, tiling along its length and its own`, () => {
      expect(K.variants?.length ?? 0).toBeGreaterThanOrEqual(4);
      expect(new Set(K.variants).size).toBe(K.variants!.length);
      const strips: Sp[] = [];
      K.variants!.forEach((name, variant) => {
        const T = Art.pathTextures(id, { variant }) as { strip: Sp; end: Sp; y: Sp; t: Sp }, S = Art.pathStrip(id, { variant }) as Sp;
        for (const sp of [T.strip, T.end, T.y, T.t]) expect(drawn(sp), `${id}/${name} drawn`).toBeGreaterThan(20);
        expect(Array.from(S.m)).toEqual(Array.from(T.strip.m)); // (the game's strip is the art's)
        expect([S.w, S.h]).toEqual([Math.round(K.width * 16), Math.round(K.period * 16)]);
        // seamless: the surface (material, tilt, height) one period on is the same, across its width and all along
        let seam = 0;
        for (let i = 0; i < 400; i++) { const u = (i % 20) / 10 - .95, v = Math.floor(i / 20) * K.period / 20 + .013; if (JSON.stringify(K.surface(u, v, false, variant)) !== JSON.stringify(K.surface(u, v + K.period, false, variant))) seam++; }
        expect(seam, `${id}/${name} seam`).toBe(0);
        // only the magic trail glows, and each of its looks does
        expect(Array.from(S.m).some(m => EMISSIVE.has(m)), `${id}/${name} glow`).toBe(!!K.glow);
        // a bump map: some relief, every drawn pixel's normal pointing up
        const N = Art.pathNormals(S, { wrap: true }) as Uint8ClampedArray;
        let tilted = 0;
        for (let i = 0; i < S.w * S.h; i++) if (S.m[i]) { expect(N[i * 4 + 2]).toBeGreaterThan(128); if (N[i * 4] !== 128 || N[i * 4 + 1] !== 128) tilted++; }
        expect(tilted, `${id}/${name} relief`).toBeGreaterThan(drawn(S) * .03);
        strips.push(S);
      });
      // each look its own: at least a fifth of the strip's pixels differ from every other look's
      for (let a = 0; a < strips.length; a++) for (let b = a + 1; b < strips.length; b++) {
        let diff = 0; for (let i = 0; i < strips[a].m.length; i++) if (strips[a].m[i] !== strips[b].m[i]) diff++;
        expect(diff / strips[a].m.length, `${id} ${K.variants![a]} vs ${K.variants![b]}`).toBeGreaterThan(.2);
      }
    });
  }

  it('the bump map wraps along the strip: its first and last rows see each other', () => {
    const S = Art.pathStrip('flagstones', { variant: 0 }) as Sp, N = Art.pathNormals(S, { wrap: true }) as Uint8ClampedArray, F = Art.pathNormals(S) as Uint8ClampedArray;
    expect(Array.from(N.subarray(S.w * 4 * 2, S.w * 4 * (S.h - 2)))).toEqual(Array.from(F.subarray(S.w * 4 * 2, S.w * 4 * (S.h - 2)))); // (the middle alike)
    // flat everywhere with no heights
    const flat = Art.pathNormals({ ...S, hgt: new Float32Array(S.w * S.h) }) as Uint8ClampedArray;
    for (let i = 0; i < S.w * S.h; i++) if (S.m[i]) expect([flat[i * 4], flat[i * 4 + 1], flat[i * 4 + 2]]).toEqual([128, 128, 255]);
  });

  it("the render groups a map's quads into one strip texture a kind, its looks in order", () => {
    const looks = pathLooks(['dirt:3', 'animal:0', 'dirt:0', 'stream:0', 'dirt:3', 'railway:2']);
    expect([...looks]).toEqual([['dirt', [0, 3]], ['animal', [0]], ['railway', [2]]]);
  });
});
