const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { resolveFile } = require('./run-proofs.cjs');
test('proof server resolves build identities and rejects encoded traversal without a local listener', () => {
  const root = path.resolve('dist');
  assert.equal(resolveFile(root, '/version.json'), path.join(root, 'version.json'));
  assert.throws(() => resolveFile(root, '/%2e%2e%2fsecret'), /outside build/);
  assert.throws(() => resolveFile(root, '/%zz'));
});
test('only explicitly CI-safe proofs run, with strict canonical assertions unchanged', () => {
  const proofs = require('./proofs.json');
  assert.deepEqual(proofs.filter(p => p.ciSafe === true).map(p => p.id), ['paused-world']);
  const proof = fs.readFileSync('tools/smoke/paused-world.cjs', 'utf8');
  assert.match(proof, /assert.equal\(evidence.changed, 0,/);
  assert.match(proof, /await measure\(browser, candidate, candidateSha, true\)/);
  assert.match(proof, /await measure\(browser, base, baseSha, false\)/);
});
