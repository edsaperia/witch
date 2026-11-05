// CPU oracle for the proposed compact-source correction; this does not validate GLSL or GPU cost.
import { expect, it } from 'vitest';
import { lightPatternSample, type LightPattern, type LightPoint } from './lightPatterns';

type Source = { origin: LightPoint; rgb: number[]; reach: number; pattern?: LightPattern };
const kinds = ['spokes', 'stripes', 'bands', 'flicker', 'rings', 'colour-spokes'] as const;
function contribution(source: Source, point: LightPoint): number[] {
  const distance = Math.hypot(point.x - source.origin.x, point.y - source.origin.y, point.z - source.origin.z);
  const fall = Math.max(0, 1 - distance / source.reach);
  return source.rgb.map(channel => channel * fall * fall);
}
function compare(sources: Source[], point: LightPoint): void {
  const inline = [0, 0, 0], ordinary = [0, 0, 0], correction = [0, 0, 0];
  for (const source of sources) {
    const base = contribution(source, point);
    const pattern = source.pattern ? lightPatternSample(point, source.origin, source.pattern) : [1, 1, 1];
    for (let channel = 0; channel < 3; channel++) {
      inline[channel] += base[channel] * pattern[channel];
      ordinary[channel] += base[channel];
      if (source.pattern) correction[channel] += base[channel] * (pattern[channel] - 1);
    }
  }
  for (let channel = 0; channel < 3; channel++) {
    expect(Math.abs(inline[channel] - (ordinary[channel] + correction[channel]))).toBeLessThan(1e-12);
  }
}

it('retains incident RGB when only the selected three sources supply corrections', () => {
  for (const kind of kinds) for (const phase of [-100, 0, .133, 30]) {
    const sources: Source[] = Array.from({ length: 24 }, (_, index) => ({
      origin: { x: index - 12, y: index % 3, z: index % 5 },
      rgb: [.1 + index / 24, .7, .3], reach: 20,
      pattern: index % 8 === 0 ? { kind, scale: 6, contrast: .9, angle: 0, phase } : undefined,
    }));
    for (const x of [-30, -12, -.00001, 0, .00001, 8, 30]) {
      for (const y of [0, 3, 15]) compare(sources, { x, y, z: 0 });
    }
  }
});

it('keeps identity for unpatterned and comfort-disabled sources, including reach boundaries', () => {
  for (const contrast of [0, .75]) for (const kind of ['none', 'rings'] as const) {
    const source: Source = { origin: { x: 0, y: 0, z: 0 }, rgb: [1, .4, .2], reach: 3,
      pattern: { kind, scale: 3, contrast, angle: 0, phase: .3 } };
    for (const x of [0, 2.999999, 3, 3.000001]) compare([source], { x, y: 0, z: 0 });
  }
});
