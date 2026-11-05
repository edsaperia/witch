// CPU-only broom source/geometry regression: compare every ordered model command with the pre-split implementation.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { test } from 'vitest';
import ts from 'typescript';
import * as brooms from '../../art/brooms.js';

const hash = (text: string) => createHash('sha256').update(text).digest('hex');
const baseline = JSON.parse(readFileSync(new URL('./fixtures/brooms-before-split.json', import.meta.url), 'utf8'));
const encode = (value: unknown) => JSON.stringify(value, (_key, v) => typeof v === 'function' ? v.toString().replaceAll('\r\n', '\n') : typeof v === 'number' && !Number.isFinite(v) ? String(v) : v);
const sources: Record<string, Record<string, string>> = {};
for (const group of ['tips', 'chassis', 'exhausts']) {
  const text = readFileSync(new URL(`../../art/brooms/${group}.js`, import.meta.url), 'utf8').replaceAll('\r\n', '\n');
  const ast = ts.createSourceFile(group, text, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
  function visit(n: ts.Node): void {
    if (ts.isMethodDeclaration(n) && ts.isPropertyAssignment(n.parent.parent)) {
      const kind = n.parent.parent.name.getText(ast);
      (sources[kind] ??= {})[n.name.getText(ast)] = hash(n.getText(ast));
    }
    ts.forEachChild(n, visit);
  }
  visit(ast);
}
const commonText = readFileSync(new URL('../../art/brooms/common.js', import.meta.url), 'utf8').replaceAll('\r\n', '\n');
const common = ts.createSourceFile('common.js', commonText, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);
const stick = common.statements.find(n => ts.isFunctionDeclaration(n) && n.name?.text === 'broomStick')!;
for (const kind of ['oar', 'mop', 'pitchfork']) (sources[kind] ??= {}).body = hash(stick.getText(common).replace(/^export /, ''));

function fingerprints(module: { BROOM_KINDS: Record<string, Record<string, unknown>> }) {
  const outputs: Record<string, Record<string, unknown>> = {};
  for (const [kind, methods] of Object.entries(module.BROOM_KINDS)) {
    outputs[kind] = {};
    for (const [part, draw] of Object.entries(methods)) {
      if (typeof draw !== 'function') { outputs[kind][part] = { value: draw }; continue; }
      const digest = createHash('sha256');
      for (let frame = 0; frame < 12; frame++) for (const knobs of [{}, { broomLength: .5, broomBend: -.4, bristles: .4 }, { broomLength: 1.8, broomBend: .7, bristles: 2 }, { broomLength: 1, broomBend: 0, bristles: 0 }]) {
        for (const [a, b, c, r, o] of [
          [[0, 0, 0], [.6, .2, 0], [-.3, 0, 0], [.2, .08, .06], { dir: [1, 0, 0] }],
          [[.1, -.2, .1], [-.5, .4, .1], [.2, -.3, .1], [.13, .05, .03], { dir: [-.6, .8, 0] }],
          [[-.2, .3, -.1], [.15, .8, .2], [-.2, -.1, .2], [.3, .1, .09], { dir: [.5, .6, .2] }],
        ]) {
          const commands: [string, unknown[]][] = [];
          const m = Object.fromEntries(['seg', 'ell', 'box', 'chain'].map(name => [name, (...args: unknown[]) => { commands.push([name, args]); }]));
          const L = { ...knobs, frame };
          if (part === 'body') draw(m, L, a, b, .025, .018); else draw(m, L, c, r, o);
          digest.update(encode(commands) + '\n');
        }
      }
      // Read literal source: Vite reformats runtime functions and export enumeration.
      outputs[kind][part] = { source: sources[kind][part], commands: digest.digest('hex') };
    }
  }
  return outputs;
}

test('broom entry exports, kind/member order and metadata match the original', () => {
  assert.deepEqual(Object.keys(brooms).sort(), baseline.exports);
  assert.deepEqual(brooms.NEW_BROOMS, baseline.newBrooms);
  assert.deepEqual([...brooms.SIT_IN], baseline.sitIn);
  assert.deepEqual(brooms.PARKED, baseline.parked);
  assert.deepEqual(Object.entries(brooms.BROOM_KINDS).map(([k, v]) => [k, Object.keys(v)]), baseline.members);
  assert.equal(brooms.BROOM_KINDS.oar.body, brooms.BROOM_KINDS.mop.body);
  assert.equal(brooms.BROOM_KINDS.mop.body, brooms.BROOM_KINDS.pitchfork.body);
});

test('every original drawing function and ordered geometry transcript is unchanged', () => {
  assert.deepEqual(common.statements.filter(n => !ts.isImportDeclaration(n)).map(n => hash(n.getText(common).replace(/^export /, ''))), baseline.helpers);
  assert.deepEqual(fingerprints(brooms), baseline.fingerprints);
});
