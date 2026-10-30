import { expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { GROUND_EXTRAS, groundDefines } from '../../src/render/groundFamily';

const fragment = (source: string) => { const m = source.match(/const FRAG =[^`]*`([\s\S]*?)`;\r?\n/); if (!m) throw Error('ground fragment marker changed'); return m[1]; };
const current = fragment(readFileSync('src/render/ground.ts', 'utf8'));
const baseline = fragment(execFileSync('git', ['show', '5e51a00c470d84deec3b8f2ca05d04e45ef771b7:src/render/ground.ts'], { encoding: 'utf8' }));
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
    expect(active(current, groundDefines(family, beach, GROUND_EXTRAS))).toBe(active(baseline, groundDefines(family, beach)));
  }
});

it('all256 extra combinations keep balanced scope; the empty set removes the costly feature bodies', () => {
  for (let mask = 0; mask < 256; mask++) {
    const selected = GROUND_EXTRAS.filter((_, i) => mask & (1 << i)), text = active(current, groundDefines('full-lakes', true, selected));
    let depth = 0, low = 0; for (const c of text) { if (c === '{') depth++; if (c === '}') depth--; low = Math.min(low, depth); } expect(low).toBe(0); expect(depth).toBe(0);
  }
  const empty = active(current, groundDefines('full-lakes', false, []));
  expect(empty).not.toContain('uKoi[i]'); expect(empty).not.toContain('uLegendRings[i]'); expect(empty).not.toContain('texture2D(uDiscoBase');
});
