import { describe, expect, it } from 'vitest';
import { creatureHeat, THERMAL_UNIFORMS } from './thermalVision';
import * as THREE from 'three';
import { SpriteBatch } from './sprites';
import type { Atlas, Frame } from './atlas';

describe('semantic Heat Vision', () => {
  const wild = { leashed: false, friendly: false, enraged: false, asleep: false };
  it('keeps every creature warmer than scenery and distinguishes escalating danger', () => {
    const sleeping = creatureHeat({ ...wild, asleep: true });
    const friend = creatureHeat({ ...wild, leashed: true });
    const idle = creatureHeat(wild), angry = creatureHeat({ ...wild, enraged: true }), attack = creatureHeat(wild, true);
    expect(sleeping).toBeGreaterThan(0);
    expect(sleeping).toBeLessThan(friend); expect(friend).toBeLessThan(idle);
    expect(idle).toBeLessThan(angry); expect(angry).toBeLessThan(attack);
    expect(attack).toBeLessThanOrEqual(1);
  });
  it('does not confuse a friendly creature attacking an enemy with danger to the witch', () => {
    expect(creatureHeat({ ...wild, leashed: true }, true)).toBe(creatureHeat({ ...wild, leashed: true }));
    expect(creatureHeat({ ...wild, friendly: true, enraged: true }, true)).toBe(creatureHeat({ ...wild, friendly: true }));
  });
  it('starts off, so ordinary pixels use the unchanged drawing path', () => {
    expect(THERMAL_UNIFORMS.uThermalStrength.value).toBe(0);
  });
  it('uploads heat beside leaf jitter without changing it, and clears heat when an instance is reused for scenery', () => {
    const texture = () => new THREE.DataTexture(new Uint8Array([255,255,255,255]),1,1);
    const frame = { w: 1, h: 1, uv: [0,0,1,1] } as Frame;
    const atlas: Atlas = { albedo: texture(), normal: texture(), albedoPal: texture(), normalPal: texture(), indexed: new THREE.Vector2(), frames: [frame] };
    const batch = new SpriteBatch(atlas, 1);
    const item = { x:0,y:0,z:0,frame,flip:false,jitter:[.25,-.5] as [number,number],heat:.75 };
    batch.set([item]);
    const data = batch.mesh.geometry.getAttribute('iJitter');
    expect(data.itemSize).toBe(3); expect([data.getX(0),data.getY(0),data.getZ(0)]).toEqual([.25,-.5,.75]);
    batch.set([{x:0,y:0,z:0,frame,flip:false}]);
    expect([data.getX(0),data.getY(0),data.getZ(0)]).toEqual([0,0,0]);
    batch.dispose();
  });
});
