const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { resolveFile } = require('./run-proofs.cjs');
const { assertRepaint } = require('../smoke/paused-pixels.cjs');
test('approved repaint rule accepts two small changes and rejects count or channel excess', () => {
  const bbox = { left: 204, top: 87, right: 217, bottom: 91 };
  assert.doesNotThrow(() => assertRepaint({ changed: 2, maxChannelChange: [5, 9, 5], bbox }));
  assert.doesNotThrow(() => assertRepaint({ changed: 8, maxChannelChange: [32, 32, 32], bbox }));
  assert.throws(() => assertRepaint({ changed: 9, maxChannelChange: [1, 1, 1], bbox }), /changedPixels.*9.*bbox.*maxChannelChangeRGB/);
  assert.throws(() => assertRepaint({ changed: 1, maxChannelChange: [0, 40, 0], bbox }), /maxChannelChangeRGB.*40/);
});
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
