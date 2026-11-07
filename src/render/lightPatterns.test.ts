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
    sampled.forEach((value, channel) => expect(value).toBeCloseTo((.5 + .5 * Math.sin(angle + channel * Math.PI * 2 / 3)) / .9, 12));
    colours.push(sampled);
    const gap = angle + Math.PI / 4;
    lightPatternSample({ x: Math.cos(gap), y: 0, z: Math.sin(gap) }, zero, pattern).forEach(value => expect(value).toBeCloseTo(0, 12));
  }
  expect(new Set(colours.map(c => c.map(n => n.toFixed(6)).join(','))).size).toBe(4);
});
it('preserves original strength1 and brightens only lit colour-spoke bands above it',()=>{
  const zero={x:0,y:0,z:0},angle=Math.PI/8;
  const sample=(strength:number,a=angle)=>lightPatternSample({x:Math.cos(a),y:0,z:Math.sin(a)},zero,
    {kind:'colour-spokes',scale:1,contrast:.9*strength,angle:0,phase:0});
  const original=sample(1),strong=sample(3);
  original.forEach((value,c)=>{
    const palette=.5+.5*Math.sin(angle+c*Math.PI*2/3);
    expect(value).toBeCloseTo(.1+.9*palette,12);
    expect(strong[c]).toBeCloseTo(3*palette,12);
  });
  expect(Math.max(...strong)).toBeGreaterThan(2);
  sample(3,angle+Math.PI/4).forEach(x=>expect(x).toBeCloseTo(0,12));
  expect(lightPatternSample(zero,zero,{kind:'colour-spokes',scale:1,contrast:2.7,angle:0,phase:0})).toEqual([1,1,1]);
  expect(sample(0)).toEqual([1,1,1]);
  for(let i=0;i<100;i++)for(const x of sample(4,i/10)){expect(x).toBeGreaterThanOrEqual(0);expect(x).toBeLessThanOrEqual(4);}
});
it('rotates coloured spokes with absolute musical phase through tempo changes', () => {
  const clock = newBeatClock(120); rampTo(clock, 8, 140, 16);
  const zero = { x: 0, y: 0, z: 0 }, angle = .3;
  const before = lightPatternPhase(clock, timeAt(clock, 7)), after = lightPatternPhase(clock, timeAt(clock, 21)); // (14 beats: not a whole number of turns)
  const sample = (a: number, phase: number) => lightPatternSample({ x: Math.cos(a), y: 0, z: Math.sin(a) }, zero,
    { kind: 'colour-spokes', scale: 1, contrast: .9, angle: 0, phase });
  const a = sample(angle, before), b = sample(angle + (after - before), after);
  a.forEach((value, channel) => expect(b[channel]).toBeCloseTo(value, 12));
  expect(sample(angle, after)).not.toEqual(a);
  expect(sample(angle, before)).toEqual(a);
});
it('uses absolute musical beats through tempo ramps rather than frame count or wall time', () => {
  const clock = newBeatClock(120); rampTo(clock, 8, 140, 16);
  for (const beat of [0, 7, 8, 12, 23, 24, 48]) {
    const time = timeAt(clock, beat);
    expect(beatAt(clock, time)).toBeCloseTo(beat, 10);
    expect(lightPatternPhase(clock, time)).toBeCloseTo((beat % 8) * Math.PI * 2 / 8, 10);
    expect(lightPatternPhase(clock, time, 16)).toBeCloseTo((beat % 16) * Math.PI * 2 / 16, 10);
    expect(lightPatternPhase(clock, time)).toBe(lightPatternPhase(clock, time)); // pause/repeated draw
  }
});
it('turns the colour-spokes wheel once every beatsPerTurn beats, faster at a higher bpm', () => {
  const zero = { x: 0, y: 0, z: 0 }, at = (a: number) => ({ x: Math.cos(a), y: 0, z: Math.sin(a) });
  const look = (phase: number, a = .3) => lightPatternSample(at(a), zero, { kind: 'colour-spokes', scale: 1, contrast: .9, angle: 0, phase });
  for (const bpm of [100, 120, 130]) {
    const clock = newBeatClock(bpm), start = lightPatternPhase(clock, 0), turn = lightPatternPhase(clock, 8 * 60 / bpm);
    look(turn).forEach((v, c) => expect(v).toBeCloseTo(look(start)[c], 6)); // (a whole turn: the same light)
    const half = lightPatternPhase(clock, 4 * 60 / bpm); // (half a turn later the wheel has moved half way round)
    look(half, .3 + Math.PI).forEach((v, c) => expect(v).toBeCloseTo(look(start)[c], 6));
  }
  expect(lightPatternPhase(newBeatClock(120), 2)).toBeCloseTo(Math.PI, 10); // 4 beats at 120 bpm: half a turn
  expect(lightPatternPhase(newBeatClock(120), 2, 0)).toBe(lightPatternPhase(newBeatClock(120), 2)); // (a bad knob: the default)
});
