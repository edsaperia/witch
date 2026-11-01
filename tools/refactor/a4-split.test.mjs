// A4 callback regression: private View reads stay behind the live bridge across sliced background work.
import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import test from 'node:test';
import ts from 'typescript';

const filename = 'src/render/view/readiness.ts';
const source = readFileSync(filename, 'utf8');
const ast = ts.createSourceFile(filename, source, ts.ScriptTarget.Latest, true);
const callbacks = [];
function scan(n) {
  if (ts.isFunctionExpression(n) && n.asteriskToken && n.parameters.some(p => p.type?.getText(ast) === 'View')) callbacks.push(n);
  ts.forEachChild(n, scan);
}
scan(ast);
assert.equal(callbacks.length, 1, 'one typed View background generator');
const callback = callbacks[0];
const guards = [];
function findGuard(n) {
  if (ts.isIfStatement(n) && n.expression.getText(ast).includes('shaderEpoch')) guards.push(n.expression);
  ts.forEachChild(n, findGuard);
}
findGuard(callback.body);
assert.equal(guards.length, 1, 'one cancellation guard');

function privateDiagnostics(expression) {
  const file = 'private-access-fixture.ts';
  const text = `class View { private shaderEpoch = 1; epoch() { return this.shaderEpoch; } }
const view = new View(); const a4PrivateHost = { shaderEpoch: 1 }; const epoch = 1;
const guard = ${expression};`;
  const options = { noLib: true, noResolve: true, noEmit: true, strict: true };
  const host = ts.createCompilerHost(options);
  host.getSourceFile = f => f === file ? ts.createSourceFile(file, text, ts.ScriptTarget.Latest, true) : undefined;
  return ts.createProgram([file], options, host).getSemanticDiagnostics();
}

test('actual extracted cancellation guard respects the private boundary', () => {
  assert.deepEqual(privateDiagnostics('epoch !== view.shaderEpoch').map(d => d.code), [2341], 'fixture detects the original illegal access');
  assert.deepEqual(privateDiagnostics(guards[0].getText(ast)), [], 'actual generated guard has no semantic errors in the isolated fixture');
});

test('actual background generator stops between program slices after an epoch change', () => {
  let uniforms = 0;
  const programs = Array.from({ length: 2 }, () => ({ isReady: () => true, getUniforms: () => { uniforms++; } }));
  const bridge = { shaderEpoch: 1 };
  const lowered = ts.transpileModule(`const callback = ${callback.getText(ast)};`, { compilerOptions: { target: ts.ScriptTarget.ES2022 } }).outputText;
  const make = new Function('a4PrivateHost', 'programs', 'epoch', lowered + '\nreturn callback;');
  const steps = make(bridge, programs, 1)({});
  assert.equal(steps.next().done, false);
  assert.equal(uniforms, 1);
  bridge.shaderEpoch = 2;
  assert.equal(steps.next().done, true);
  assert.equal(uniforms, 1, 'second program is not prepared after cancellation');
});
