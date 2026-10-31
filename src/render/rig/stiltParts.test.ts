import { describe, expect, it } from 'vitest';
import { stiltRigCapture, rigParts } from '../../../art/genome/parts.js';
import { SPECIES_BY_ID } from '../../../art/creatures.js';
import { defaultStyle } from '../../../art/generator.js';
import { rigGearKey } from './rigBuild';

const style = defaultStyle();
const counts: Record<string, number> = { armadillo: 4, bat: 2, beetle: 6, crab: 8, dragonfly: 6, frosttroll: 2, hedgehog: 4, heron: 2, mole: 4, moth: 6, owl: 2, penguin: 2, raven: 2, scorpion: 8, spider: 8, toad: 4, woodlouse: 14 };
const legless = new Set(['featheredserpent', 'hydra', 'rattlesnake', 'snail', 'snake']);
const bakeStiltParts = rigParts as unknown as (id: string, level: number, style: unknown, gear: { stilt: true }) => {
  template: string; joints: { legs: { mat: number }[] }; pieces: { torso: unknown[] | null; head: unknown[] | null }; discs: Record<number, Record<number, unknown>>;
} | null;

describe('optional all-legged Stiltwalkers extraction', () => {
  it('covers every current legged species at all four levels with finite independent joints', () => {
    for (const species of Object.values(SPECIES_BY_ID) as { id: string; q?: unknown }[]) for (let level = 0; level < 4; level++) {
      const { m, s } = stiltRigCapture(species.id, level, style);
      const legs = m.rig?.legs ?? [];
      if (legless.has(species.id)) { expect(legs, `${species.id}/${level}`).toHaveLength(0); continue; }
      const expected = species.q ? 4 : counts[species.id];
      expect(expected, `new legged species needs coverage: ${species.id}`).toBeDefined();
      expect(legs, `${species.id}/${level}`).toHaveLength(expected);
      expect(new Set(legs.map((leg: { name: string }) => leg.name)).size).toBe(expected);
      expect(Number.isFinite(s) && s > 0).toBe(true);
      for (const leg of legs) {
        for (const point of [leg.hip, leg.knee, leg.foot]) expect(point.every(Number.isFinite)).toBe(true);
        expect(leg.r.every((radius: number) => Number.isFinite(radius) && radius > 0)).toBe(true);
        expect(Math.hypot(...leg.hip.map((v: number, i: number) => v - leg.foot[i]))).toBeGreaterThan(0);
      }
      expect(m.parts.some((q: { part: string }) => q.part === 'body')).toBe(true);
      expect(m.parts.some((q: { part: string }) => q.part === 'head')).toBe(true);
    }
  });
  it('leaves the ordinary non-quadruped rig population and cache keys unchanged', () => {
    for (const id of Object.keys(counts)) expect(rigParts(id, 0, style)).toBeNull();
    expect(rigGearKey({})).toBe('-|-|-|-');
    expect(rigGearKey({ woken: true })).toBe('woken');
    expect(rigGearKey({ stilt: true })).not.toBe(rigGearKey({}));
    expect(rigGearKey({ woken: true, stilt: true })).toBe('woken|stilt');
  });
  it('keeps real wing surfaces with the normal body and excludes baked ground shadows', () => {
    for (const id of ['bat', 'moth', 'dragonfly']) {
      const { m } = stiltRigCapture(id, 2, style);
      expect(m.flats.some((q: { part: string }) => q.part === 'body')).toBe(true);
      expect(m.parts.filter((q: { group: number }) => q.group === 0).every((q: { part: string }) => q.part === 'ground-shadow')).toBe(true);
    }
  });
  it('bakes usable independent body/head headings and material discs for every new legged plan', () => {
    for (const [id, count] of Object.entries(counts)) {
      const parts = bakeStiltParts(id, 0, style, { stilt: true });
      if (!parts) throw new Error(`${id} did not produce its optional stilt rig`);
      expect(parts?.template, id).toBe('quadruped');
      expect(parts?.joints.legs, id).toHaveLength(count);
      expect(parts?.pieces.torso?.filter(Boolean), `${id} torso`).toHaveLength(5);
      expect(parts?.pieces.head?.filter(Boolean), `${id} head`).toHaveLength(5);
      for (const leg of parts.joints.legs) expect(Object.keys(parts.discs[leg.mat]).length, `${id} material ${leg.mat}`).toBeGreaterThan(0);
    }
  });
});
