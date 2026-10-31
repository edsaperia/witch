import { afterEach, expect, it } from 'vitest';
import { miniatureTilt } from './potionEffects';
import { tiltRadius } from './overlayTilt';
import { resetPotionSettings, setPotionSetting } from '../rules/potionSettings';
const base = {on:true,strength:.75,band:.4,centre:.5,treetop:{strength:1.5,band:.3},stackSharp:true};
afterEach(()=>resetPotionSettings());
it('shares stronger narrow focus between ground and treetop views without changing tuning',()=>{
  const t=miniatureTilt(base,1);
  expect(t.strength).toBe(7); expect(t.treetop.strength).toBe(7); expect(t.band).toBe(.12);
  expect(tiltRadius(t,0,t.centre)).toBe(0); expect(tiltRadius(t,1,0)).toBeGreaterThan(tiltRadius(base,1,0));
  expect(t.stackSharp).toBe(true); expect(base.strength).toBe(.75);
  expect(miniatureTilt(base,0)).toBe(base);
});
it('fades back to disabled blur and respects lab values and house suppression',()=>{
  const off={...base,on:false}; setPotionSetting('miniature','blur',10);
  expect(miniatureTilt(off,.5).strength).toBe(5);
  expect(miniatureTilt(off,0)).toBe(off);
  expect(tiltRadius(miniatureTilt(off,1),0,0,0)).toBe(0);
});
