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
test('the initial CI-safe registry names an existing canonical proof', () => {
  const proofs = require('./proofs.json');
  assert.deepEqual(proofs.filter(p => p.ciSafe === true).map(p => p.id), ['paused-world']);
  for (const proof of proofs) assert.equal(fs.statSync(proof.script).isFile(), true);
});
