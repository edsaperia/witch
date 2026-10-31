import { afterEach, expect, it, vi } from 'vitest';
import * as THREE from 'three';
import { readFileSync } from 'node:fs';
import { setLights, updateSources } from './view/lights';
import { LIGHT_GLSL, LIGHT_UNIFORMS, MAX_LIGHTS } from './lighting';
import { beginLightPatterns, LIGHT_PATTERN_UNIFORMS, PATTERN_SLOT_CAPACITY, patternedLightCount } from './lightPatternUniforms';
import { comfort } from './comfort';
import { sourcePattern } from './lightPatternState';
import type { View, ForestLight } from './view';
import { MagicFx } from './fx/system';
vi.mock('./lightPatternState', async importOriginal => ({ ...await importOriginal<typeof import('./lightPatternState')>(), PATTERN_LOOK: 'auto' }));
afterEach(() => { beginLightPatterns(); comfort.reduceFlashing = false; LIGHT_UNIFORMS.uLightCount.value = 0; });
const view = (budget = 20) => ({ game: { tuning: { lightBudget: budget, lights: { knee: .9, ceiling: 1.1 } } }, stats: { lights: 0 } }) as unknown as View;
const light = (x: number, kind: 1 | 2 | 4 = 1): ForestLight => ({ x, y: 3, z: 0, reach: 20, rgb: new THREE.Vector3(.4, .7, 1), strength: 1, pattern: [kind, 6, .3, .2] });
it('uses an ordinary lit campfire for the gentle preview without requiring disabled magic stones', () => {
  const src = { x: 0, z: 0, kind: 'campfire', size: 1 }, fire = new THREE.Vector3(1, .5, .2);
  const v = { assets: { props: { frames: [] } }, sources: [src], forestLights: [], fireSparks: [], worldFires: [], sourceCell: new Map([[src, '0,0']]),
    game: { party: { areas: new Map([['0,0', { at: 0 }]]) }, tuning: { party: { transition: 1 }, lights: { campfire: { reach: 25, strength: 1 }, find: {} } } },
    over: { front: 0 }, fire, partyObjects: { ready: true }, beachView: { on: false }, propBatch: { set: () => {} } } as unknown as View;
  updateSources(v, 20);
  expect(v.forestLights).toHaveLength(1); expect(v.worldFires).toHaveLength(1);
  const original = { ...v.forestLights[0] };
  expect(original.pattern?.[0]).toBe(4); expect(original.pattern?.[2]).toBe(.16);
  expect(original.rgb).toBe(fire); expect(original.reach).toBe(25);
  comfort.reduceFlashing = true; updateSources(v, 20);
  expect(v.forestLights[0].pattern?.[2]).toBe(0);
  expect({ ...v.forestLights[0], pattern: undefined }).toEqual({ ...original, pattern: undefined });
});
it('adds metadata only to one existing selected speaker and gentle slot, preserving budget and RGB', () => {
  const v = view(4), lights = [light(0), light(1, 2), light(2, 4), light(3, 4), light(4)];
  setLights(v, lights, 0, 0, 'auto');
  expect(v.stats.lights).toBe(4); expect(LIGHT_UNIFORMS.uLightCount.value).toBe(4);
  expect(patternedLightCount()).toBe(2);
  expect(LIGHT_PATTERN_UNIFORMS.uLightPattern.value.slice(0, 4).map(v => v.x)).toEqual([1, 0, 4, 0]);
  expect(LIGHT_UNIFORMS.uLightCol.value[0].toArray().slice(0, 3)).toEqual([.4, .7, 1]);
  expect(lights.every(l => l.strength === 1 && l.reach === 20)).toBe(true);
  setLights(v, [{ ...lights[0], pattern: undefined }], 0, 0, 'auto');
  expect(patternedLightCount()).toBe(0); expect(LIGHT_UNIFORMS.uLightCount.value).toBe(1);
});
it('comfort removes all modulation even if a caller supplies packed metadata', () => {
  comfort.reduceFlashing = true;
  setLights(view(), [light(0), light(2, 4)], 0, 0, 'auto');
  expect(patternedLightCount()).toBe(0); expect(LIGHT_UNIFORMS.uLightCount.value).toBe(2);
  expect(sourcePattern('rings', 1, comfort.reduceFlashing)).toEqual([0, 1, 0, 0]);
});
it('defaults to the original unpatterned preview and preserves incident light data when explicitly off', () => {
  const v = view();
  setLights(v, [light(0), light(2, 4)], 0, 0, 'off');
  expect(patternedLightCount()).toBe(0);
  expect(LIGHT_UNIFORMS.uLightCount.value).toBe(2);
  expect(LIGHT_UNIFORMS.uLightCol.value[0].toArray()).toEqual([.4, .7, 1, 1]);
});
it('keeps the same shared shading function for ground, grass and sprite receivers without new texture inputs', () => {
  expect(PATTERN_SLOT_CAPACITY).toBe(MAX_LIGHTS);
  expect(LIGHT_GLSL).toContain('lightPattern(P - uLightPos[i].xyz, uLightPattern[i]');
  for (const file of ['ground', 'sprites', 'grass']) expect(readFileSync(`src/render/${file}.ts`, 'utf8')).toContain('${LIGHT_GLSL}');
  expect(Object.keys(LIGHT_PATTERN_UNIFORMS)).toEqual(['uLightPattern']);
});
it('reuses a real moonlight aura slot, respects world reservation and clears the next ordinary spell', () => {
  const fx = new MagicFx(new THREE.Scene(), 'auto'), owner = {};
  fx.begin(0, 0, 0, owner); fx.begin(.2, 0, 0, owner);
  setLights(view(), [light(0), light(2, 4)], 0, 0, 'auto');
  fx.draw('moonlight', 'aura', 0, 2, 0, 1, 1, 1, 0, 14);
  fx.finish(3);
  expect(LIGHT_UNIFORMS.uLightCount.value).toBe(3);
  expect(patternedLightCount()).toBe(3);
  expect(LIGHT_PATTERN_UNIFORMS.uLightPattern.value[2].x).toBe(5);
  fx.begin(2, 0, 0, owner);
  setLights(view(), [light(0), light(2, 4)], 0, 0, 'auto');
  fx.draw('fire', 'burst', 0, 2, 0, 1, 1, 1, 0, 15);
  fx.finish(3);
  expect(LIGHT_UNIFORMS.uLightCount.value).toBe(3);
  expect(patternedLightCount()).toBe(2);
  expect(LIGHT_PATTERN_UNIFORMS.uLightPattern.value[2].lengthSq()).toBe(0);
});
