import { expect, it } from 'vitest';
import { beatAt, newBeatClock, rampTo, timeAt } from '../rules/beat';
import { lightLocal, lightPatternPhase, lightPatternSample, patternContrast, type LightPattern } from './lightPatterns';
const origin = { x: 32, y: 3, z: -11 }, point = { x: 35, y: 1, z: -9 };
const config: LightPattern = { kind: 'spokes', scale: 6, contrast: .3, angle: .4, phase: .2 };

it('anchors in world/light space independent of receiver kind or camera', () => {
  const ground = lightPatternSample(point, origin, config);
  expect(lightPatternSample({ ...point }, origin, config)).toEqual(ground); // same contact on trunk/creature
  const shift = { x: 3000, y: 17, z: -2400 };
  const translate = (p: typeof point) => ({ x: p.x + shift.x, y: p.y + shift.y, z: p.z + shift.z });
  expect(lightPatternSample(translate(point), translate(origin), config)).toEqual(ground);
  expect(lightLocal(point, origin, 0)).toEqual({ x: 3, y: -2, z: 2 });
  expect(lightPatternSample({ ...point, x: point.x + 2 }, origin, config)).not.toEqual(ground);
});
it('leaves ordinary/off/comfort light exactly unchanged', () => {
  expect(lightPatternSample(point, origin, { ...config, kind: 'none' })).toEqual([1, 1, 1]);
  expect(lightPatternSample(point, origin, { ...config, contrast: 0 })).toEqual([1, 1, 1]);
  expect(patternContrast(.3, false, false)).toBe(0);
  expect(patternContrast(.3, true, true)).toBe(0);
});
it('keeps every look finite and bounded without increasing incident light', () => {
  for (const kind of ['spokes', 'stripes', 'bands', 'flicker', 'rings', 'colour-spokes'] as const) for (let i = 0; i < 80; i++) {
    for (const value of lightPatternSample({ x: i * .3, y: i % 9, z: -i * .1 }, origin, { ...config, kind, phase: i * .17, contrast: .9 })) {
      expect(Number.isFinite(value)).toBe(true); expect(value).toBeGreaterThanOrEqual(.1 - 1e-12); expect(value).toBeLessThanOrEqual(1);
    }
    expect(lightPatternSample(origin, origin, { ...config, kind }).every(Number.isFinite)).toBe(true);
  }
});
it('assigns the bands palette around coloured spokes and fades the source centre to identity', () => {
  const pattern: LightPattern = { kind: 'colour-spokes', scale: 1, contrast: 1, angle: 0, phase: 0 };
  const zero = { x: 0, y: 0, z: 0 };
  expect(lightPatternSample(zero, zero, pattern)).toEqual([1, 1, 1]);
  const colours: number[][] = [];
  for (let spoke = 0; spoke < 4; spoke++) {
    const angle = (Math.PI / 2 + spoke * Math.PI * 2) / 4;
    const sampled = lightPatternSample({ x: Math.cos(angle), y: 0, z: Math.sin(angle) }, zero, pattern);
    sampled.forEach((value, channel) => expect(value).toBeCloseTo(.5 + .5 * Math.sin(angle + channel * Math.PI * 2 / 3), 12));
    colours.push(sampled);
    const gap = angle + Math.PI / 4;
    lightPatternSample({ x: Math.cos(gap), y: 0, z: Math.sin(gap) }, zero, pattern).forEach(value => expect(value).toBeCloseTo(0, 12));
  }
  expect(new Set(colours.map(c => c.map(n => n.toFixed(6)).join(','))).size).toBe(4);
});
it('rotates coloured spokes with absolute musical phase through tempo changes', () => {
  const clock = newBeatClock(120); rampTo(clock, 8, 140, 16);
  const zero = { x: 0, y: 0, z: 0 }, angle = .3;
  const before = lightPatternPhase(clock, timeAt(clock, 7)), after = lightPatternPhase(clock, timeAt(clock, 23));
  const sample = (a: number, phase: number) => lightPatternSample({ x: Math.cos(a), y: 0, z: Math.sin(a) }, zero,
    { kind: 'colour-spokes', scale: 1, contrast: .9, angle: 0, phase });
  const a = sample(angle, before), b = sample(angle + (after - before) / 4, after);
  a.forEach((value, channel) => expect(b[channel]).toBeCloseTo(value, 12));
  expect(sample(angle, after)).not.toEqual(a);
  expect(sample(angle, before)).toEqual(a);
});
it('uses absolute musical beats through tempo ramps rather than frame count or wall time', () => {
  const clock = newBeatClock(120); rampTo(clock, 8, 140, 16);
  for (const beat of [0, 7, 8, 12, 23, 24, 48]) {
    const time = timeAt(clock, beat);
    expect(beatAt(clock, time)).toBeCloseTo(beat, 10);
    expect(lightPatternPhase(clock, time)).toBeCloseTo(beat * Math.PI * 2 / 32, 10);
    expect(lightPatternPhase(clock, time)).toBe(lightPatternPhase(clock, time)); // pause/repeated draw
  }
});
