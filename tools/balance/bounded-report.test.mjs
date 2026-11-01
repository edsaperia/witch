// Tiny fake-worker checks only: no Vite, game, art, training or measurement.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, readFileSync, existsSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { supervise, checkpoint } from './bounded-report-core.mjs';

const manifest = { mode: 'runs', seeds: [1000, 8919], bpms: [120], bags: ['satchel'], islands: ['home'], bots: ['sloppy'] };
const row = seed => ({ seed, bpm: 120, bag: 'satchel', island: 'home', bot: 'sloppy', outcome: 'won', end: 1 });
function fixture(t, mode = 'complete') {
  const dir = mkdtempSync(join(tmpdir(), 'witch-bounded-fake-'));
  t.after(() => rmSync(dir, { recursive: true, force: true }));
  const output = join(dir, 'rows.jsonl'), worker = join(dir, 'fake.cjs');
  writeFileSync(worker, `const fs=require('fs');const out=process.argv[2],mode=process.argv[3];
    const m=${JSON.stringify(manifest)}, row=seed=>(${row.toString()})(seed);
    if(!fs.existsSync(out)) fs.appendFileSync(out,JSON.stringify({manifest:m})+'\\n');
    const done=fs.readFileSync(out,'utf8').trim().split('\\n').slice(1).map(s=>JSON.parse(s).seed);
    for(const seed of m.seeds) { if(done.includes(seed))continue;fs.appendFileSync(out,JSON.stringify(row(seed))+'\\n');
      if(mode==='fail')process.exit(7);if(mode==='slow'&&!fs.existsSync(out+'.release')){setInterval(()=>{},1000);break;} }
  `);
  return { output, options: { command: process.execPath, args: [worker, output, mode], cwd: dir, output, identity: { source: 'fake-v1' }, wallSeconds: 3 } };
}

test('complete worker and exact resume preserve rows without another launch', async t => {
  const f = fixture(t), first = await supervise(f.options);
  assert.equal(first.reason, 'complete'); assert.equal(first.after.completed, 2); assert.equal(first.ownedExitConfirmed, true);
  const bytes = readFileSync(f.output);
  assert.equal((await supervise(f.options)).reason, 'already-complete');
  assert.deepEqual(readFileSync(f.output), bytes);
  assert.equal(readFileSync(f.output + '.attempts.jsonl', 'utf8').trim().split('\n').length, 1);
});

test('changed identity refuses before child and leaves checkpoint byte-identical', async t => {
  const f = fixture(t); await supervise(f.options); const bytes = readFileSync(f.output);
  await assert.rejects(supervise({ ...f.options, identity: { source: 'fake-v2' } }), /identity differs/);
  assert.deepEqual(readFileSync(f.output), bytes); assert.equal(existsSync(f.output + '.supervisor.lock'), false);
});

test('nonzero worker exit records failure and completed/missing keys separately', async t => {
  const f = fixture(t, 'fail'), r = await supervise(f.options);
  assert.equal(r.reason, 'worker-failed'); assert.equal(r.exit.code, 7);
  assert.equal(r.after.completed, 1); assert.equal(r.after.missingKeys.length, 1);
});

test('wall cap kills owned worker and exact resume skips completed case', async t => {
  const f = fixture(t, 'slow'), r = await supervise(f.options);
  assert.equal(r.reason, 'wall-cap'); assert.equal(r.ownedExitConfirmed, true);
  assert.equal(r.after.completed, 1); assert.equal(r.after.missingKeys.length, 1);
  assert.ok(r.wallSeconds < 3, JSON.stringify(r));
  const prefix = readFileSync(f.output); writeFileSync(f.output + '.release', 'release');
  const resumed = await supervise(f.options);
  assert.equal(resumed.reason, 'complete'); assert.equal(resumed.after.completed, 2);
  assert.deepEqual(readFileSync(f.output).subarray(0, prefix.length), prefix);
});

test('abort stops a fake worker and reports interruption without a fabricated outcome', async t => {
  const f = fixture(t, 'slow'), c = new AbortController();
  const timer = setTimeout(() => c.abort(), 700);
  try {
    const r = await supervise({ ...f.options, signal: c.signal });
    assert.equal(r.reason, 'interrupted'); assert.equal(r.ownedExitConfirmed, true);
    assert.equal(r.after.completed, 1); assert.equal(r.after.missingKeys.length, 1);
  } finally { clearTimeout(timer); }
});

test('partial tail, unowned output and simultaneous owner are rejected without repair', async t => {
  const f = fixture(t); await supervise(f.options);
  writeFileSync(f.output, JSON.stringify({ manifest }) + '\n' + '{"seed":');
  assert.equal(checkpoint(f.output).partialTail, true);
  await assert.rejects(supervise(f.options), /Partial checkpoint tail/);
  const raw = readFileSync(f.output); writeFileSync(f.output + '.supervisor.lock', 'another owner');
  await assert.rejects(supervise(f.options), /EEXIST/); assert.deepEqual(readFileSync(f.output), raw);
  const other = fixture(t); writeFileSync(other.output, JSON.stringify({ manifest }) + '\n');
  await assert.rejects(supervise(other.options), /lack supervisor identity/);
});

test('caps above thirty minutes fail before any files or processes', async t => {
  const f = fixture(t); await assert.rejects(supervise({ ...f.options, wallSeconds: 1801 }), /<=1800/);
  assert.equal(existsSync(f.output + '.supervisor.json'), false);
});

test('completed-row edits between allocations refuse exact resume', async t => {
  const f = fixture(t, 'fail'); await supervise(f.options);
  writeFileSync(f.output, readFileSync(f.output, 'utf8').replace('"end":1', '"end":2'));
  await assert.rejects(supervise(f.options), /changed since last attempt/);
});

test('spawn failure produces an explicit receipt without fictional cases', async t => {
  const f = fixture(t), r = await supervise({ ...f.options, command: join(f.options.cwd, 'missing-executable') });
  assert.equal(r.reason, 'spawn-error'); assert.equal(r.after.completed, 0); assert.equal(existsSync(f.output), false);
});

test('CLI rejects an unpinned source and expert policy before report launch', t => {
  const f = fixture(t), specFile = join(f.options.cwd, 'allocation.json');
  const spec = { allocation: 'FAKE-NOT-A-GRANT', sourceSha: '0'.repeat(40), stopFile: f.output + '.stop', output: f.output, wallSeconds: 10, reportArgs: ['--bots', 'sloppy'] };
  const cli = fileURLToPath(new URL('./bounded-report.mjs', import.meta.url));
  writeFileSync(specFile, JSON.stringify(spec));
  const source = spawnSync(process.execPath, [cli, specFile], { encoding: 'utf8', windowsHide: true });
  assert.notEqual(source.status, 0); assert.match(source.stderr, /Exact clean source commit required/);
  spec.reportArgs = ['--bots', 'expert']; writeFileSync(specFile, JSON.stringify(spec));
  const expert = spawnSync(process.execPath, [cli, specFile], { encoding: 'utf8', windowsHide: true });
  assert.notEqual(expert.status, 0); assert.match(expert.stderr, /expert and census gates are separate/);
  assert.equal(existsSync(f.output + '.supervisor.json'), false);
});
