// Node-only checks of the capture hold: production updates are bypassed, Post still runs, and every exit restores the hook.
const { test } = require('node:test'), assert = require('node:assert/strict');
const { installCaptureHold, restoreCaptureHold, probeRenderDrift } = require('./capture-hold.cjs');
function fixture(own = false) {
  let updates = 0, draws = 0, restores = 0;
  const proto = { render() { updates++; } }, v = Object.create(proto);
  Object.assign(v, { scene: {}, camera: { matrixWorld: { toArray: () => [1, 0, 0, 1] } }, post: { render() { draws++; } }, magic: { hideBackdrop() {}, restoreBackdrop() { restores++; } } });
  if (own) Object.defineProperty(v, 'render', { value: proto.render, writable: true, configurable: true, enumerable: false });
  return { root: { witch: { view: v, game: { clock: { time: 2 } } } }, v, counts: () => ({ updates, draws, restores }) };
}
test('holds update state while allowing repeated Post draws and restores inherited render', () => {
  const f = fixture(); installCaptureHold(f.root);
  f.v.render(2); f.v.render(2); f.v.render(2, false);
  assert.deepEqual(f.counts(), { updates: 0, draws: 2, restores: 2 });
  assert.throws(() => f.v.render(3), /advance time/);
  assert.throws(() => installCaptureHold(f.root), /already installed/);
  restoreCaptureHold(f.root); assert.equal(Object.hasOwn(f.v, 'render'), false);
  f.v.render(2); assert.equal(f.counts().updates, 1);
});
test('restores an existing runner wrapper descriptor and backdrop even when Post throws', () => {
  const f = fixture(true), descriptor = Object.getOwnPropertyDescriptor(f.v, 'render');
  installCaptureHold(f.root); f.v.post.render = () => { throw Error('GPU failure'); };
  const mesh = { visible: false }; f.root.__refractionCaptureHold.maskVisibility = [[mesh, true]];
  assert.throws(() => f.v.render(2), /GPU failure/); assert.equal(f.counts().restores, 1);
  restoreCaptureHold(f.root); assert.deepEqual(Object.getOwnPropertyDescriptor(f.v, 'render'), descriptor);
  assert.equal(mesh.visible, true);
  restoreCaptureHold(f.root); assert.equal(f.root.__refractionCaptureHold, undefined);
});
test('diagnostic names actual changed camera state and interleaved/instance buffers at one clock', () => {
  const f = fixture(), a = new Float32Array([1]), m = new Float32Array([2]);
  f.v.camLift = 0;
  f.v.scene.traverse = visit => visit({ visible: true, id: 7, name: 'actor', geometry: { attributes: { iPos: { data: { array: a } } } }, instanceMatrix: { array: m } });
  f.v.render = () => { f.v.camLift = 0.35; a[0] = 3; m[0] = 4; };
  const result = probeRenderDrift(f.root);
  assert.equal(result.time, 2); assert.equal(f.root.witch.game.clock.time, 2);
  assert.deepEqual(result.changes.map(c => c.key), ['camLift', 'actor:7/attribute/iPos', 'actor:7/instanceMatrix']);
});
