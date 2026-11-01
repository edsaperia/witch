const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { resolveFile } = require('./run-proofs.cjs');
const { assertRepaint } = require('../smoke/paused-pixels.cjs');
const { worldSettled } = require('../smoke/paused-settle.cjs');
test('settled fixture requires idle builds and three distinct unchanged rendered samples', () => {
  const forest = Object.fromEntries(['trees', 'bushes', 'lights', 'decor', 'relics'].map(key => [key, new Map()]));
  const grass = { cells: new Map(), held: new Map(), top: 0, geo: { instanceCount: 0 }, stats: { tufts: 0, buildMs: 1 } };
  for (const key of ['tuft', 'uvA', 'pxA', 'open']) grass[key] = { version: 1, updateRanges: [] };
  global.window = { witch: { game: { forest }, view: { grass, assets: { version: 31, sets: () => ({ pending: 0, queued: 0 }) }, ground: { pendingFloors: [] }, stats: { pendingGround: 0, forestMissing: 0 }, heightsReady: true } }, pauseProbe: { draws: 1 } };
  try {
    assert.equal(worldSettled(), false); // Pending grass work must not be accepted.
    grass.stats.buildMs = 0;
    assert.equal(worldSettled(), false);
    assert.equal(worldSettled(), false); // Polling the same render does not advance stability.
    window.pauseProbe.draws++;
    assert.equal(worldSettled(), false);
    grass.tuft.version++; window.pauseProbe.draws++;
    assert.equal(worldSettled(), false); // New instance work resets the sequence.
    window.pauseProbe.draws++; assert.equal(worldSettled(), false);
    window.pauseProbe.draws++; assert.equal(worldSettled().artVersion, 31);
    window.witch.view.stats.pendingGround = 1;
    assert.equal(worldSettled(), false);
    window.witch.view.stats.pendingGround = 0; grass.tuft.updateRanges.push({ start: 0, count: 4 });
    assert.equal(worldSettled(), false);
  } finally { delete global.window; }
});
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
