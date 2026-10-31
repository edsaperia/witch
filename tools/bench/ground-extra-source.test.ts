import { expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { GROUND_EXTRAS, groundDefines } from '../../src/render/groundFamily';

const fragment = (source: string) => { const m = source.match(/const FRAG =[^`]*`([\s\S]*?)`;\r?\n/); if (!m) throw Error('ground fragment marker changed'); return m[1]; };
const current = fragment(readFileSync('src/render/ground.ts', 'utf8'));
// Frozen active-token SHA256s from 5e51a00c470d84deec3b8f2ca05d04e45ef771b7.
// Keep the baseline independent of Git history: CI uses shallow checkouts.
const baselineHashes = [
  ['9203efff6ac0fb8fbd9945812ef81ebcaab5f9f3a4e7dca0237a2d74d3a69eca', '5853cbf7da00f1d923a95cfcf700306273ad756ee3b82172b212d1cd0f770b8b'],
  ['2f88640f29b473265e7d3fedae15a653a1867d9d749ceb3bc3e55ef59eb6a16f', '847afc9fa8d596ba36b9d701b6f92cb831b496ac1ee7cff28deb8e2cfdbb9d7c'],
  ['e478b3d8cf3806063227b56f02d53d5d130385d112bbcc7d16e989fdd6d785a3', 'f9a9376508ae3c36778a3d279772ca1473da213a226e0ffaa3cf8a161d39a87f'],
  ['cd941e22a9cfaaae3688bac788382ba72c4e90d8fbd6901945fe34db88d66da2', '53fbb4ab018c5ee010811e58d279b25af4bf993c923e6027768a9aa8e2040b4f'],
];
function active(source: string, defines: Record<string, string>): string {
  const stack: { parent: boolean; condition: boolean }[] = []; let enabled = true; const output: string[] = [];
  for (const line of source.split(/\r?\n/)) {
    const m = line.trim().match(/^#(if|ifdef|ifndef|else|endif)\b\s*(.*)/);
    if (!m) { if (enabled) output.push(line); continue; }
    const [, op, expression] = m;
    if (op === 'endif') { const f = stack.pop(); if (!f) throw Error('unmatched endif'); enabled = f.parent; }
    else if (op === 'else') { const f = stack.at(-1)!; enabled = f.parent && !f.condition; }
    else {
      const value = op === 'ifdef' ? expression in defines : op === 'ifndef' ? !(expression in defines) : (() => {
        const expr = expression.replace(/defined\((\w+)\)/g, (_, key) => key in defines ? '1' : '0');
        if (!/^[\s01!|&()]+$/.test(expr)) throw Error(`unsupported condition: ${expr}`);
        return !!Function(`"use strict";return (${expr})`)();
      })();
      stack.push({ parent: enabled, condition: value }); enabled &&= value;
    }
  }
  if (stack.length) throw Error('unclosed guard');
  return output.join('\n').replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '').replace(/\s+/g, '');
}

it('retains exact active fragment tokens when all extras are present, plain/beach and every lake kind', () => {
  for (const family of ['no-lakes', 'full-lakes', 'lakes:water', 'lakes:ice', 'lakes:lava', 'lakes:oasis', 'lakes:sinkhole', 'lakes:tarn', 'lakes:tar', 'lakes:rust', 'lakes:lily'] as const) for (const beach of [false, true]) {
    const row = family === 'no-lakes' ? 0 : family === 'full-lakes' ? 1 : family === 'lakes:water' ? 2 : 3;
    expect(createHash('sha256').update(active(current, groundDefines(family, beach, GROUND_EXTRAS))).digest('hex')).toBe(baselineHashes[row][Number(beach)]);
  }
});

it('all256 extra combinations keep balanced scope; the empty set removes the costly feature bodies', () => {
  for (let mask = 0; mask < 256; mask++) for (const potion of [false, true]) for (const thermal of [false, true]) {
    const selected = GROUND_EXTRAS.filter((_, i) => mask & (1 << i)), defines = groundDefines('full-lakes', true, selected);
    if (potion) defines.POTION_SKY = '';
    if (thermal) defines.THERMAL_VISION = '';
    const text = active(current, defines);
    let depth = 0, low = 0; for (const c of text) { if (c === '{') depth++; if (c === '}') depth--; low = Math.min(low, depth); } expect(low).toBe(0); expect(depth).toBe(0);
    expect(text.match(/voidmain\(\)/g)).toHaveLength(1);
    expect(text.includes('uniformfloatuPotionSky;')).toBe(potion);
    expect(text.includes('voidfloorMain()')).toBe(potion || thermal);
    expect(text.includes('thermalCold(gl_FragColor.rgb)')).toBe(thermal);
  }
  const empty = active(current, groundDefines('full-lakes', false, []));
  expect(empty).not.toContain('uKoi[i]'); expect(empty).not.toContain('uLegendRings[i]'); expect(empty).not.toContain('texture2D(uDiscoBase');
});
