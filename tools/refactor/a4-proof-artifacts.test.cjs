// Small filesystem fixtures for A4's missing-evidence rejection; no game, generator, browser or process supervision.
const fs = require('node:fs'), os = require('node:os'), path = require('node:path');
const test = require('node:test'), assert = require('node:assert/strict');
const { completeBenchmark } = require('./a4-proof-artifacts.cjs');

test('requires rules, exact identities and all quick scene PNGs before comparison', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'a4-artifact-test-'));
  const sha = 'a'.repeat(40);
  const write = (file, value) => fs.writeFileSync(path.join(root, file), JSON.stringify(value));
  const frames = { key: { build: 'dev · ' + sha.slice(0, 9) }, quick: true, errors: [], scenes: { boot: {}, 'wave-fight': {}, bedroom: {} } };
  try {
    const rules = { key: { build: sha.slice(0, 9) }, wave: 10, steps: 900, every: 300,
      seeds: [123,165272].map(seed => ({ seed, prints: [300,600,900].map(step => ({ step, print: { all: 'fixture' } })) })) };
    write('rules.json', rules);
    assert.throws(() => completeBenchmark(root, sha), /frames.json/);
    write('frames.json', frames);
    for (const scene of Object.keys(frames.scenes)) fs.writeFileSync(path.join(root, scene + '.png'), Buffer.from([137,80,78,71,13,10,26,10]));
    assert.equal(completeBenchmark(root, sha).scenes.length, 3);
    assert.throws(() => completeBenchmark(root, 'b'.repeat(40)), /source identity/);
    rules.seeds[0].prints.pop(); write('rules.json', rules);
    assert.throws(() => completeBenchmark(root, sha), /Incomplete rules/);
    rules.seeds[0].prints.push({ step: 900, print: { all: 'fixture' } }); write('rules.json', rules);
    fs.unlinkSync(path.join(root, 'bedroom.png'));
    assert.throws(() => completeBenchmark(root, sha), /bedroom.png/);
    frames.errors.push('page failure'); write('frames.json', frames);
    assert.throws(() => completeBenchmark(root, sha), /page errors/);
  } finally {
    const resolved = fs.realpathSync(root);
    assert.ok(resolved.startsWith(path.resolve(os.tmpdir()) + path.sep) && path.basename(resolved).startsWith('a4-artifact-test-'));
    fs.rmSync(resolved, { recursive: true });
  }
});
