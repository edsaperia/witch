// Bounded single-child supervision and read-only report checkpoints; no game imports.
import { spawn, execFile } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, existsSync, writeFileSync, openSync, closeSync, unlinkSync, appendFileSync } from 'node:fs';
import { performance } from 'node:perf_hooks';
import { caseKey } from './report-core.mjs';

const hash = b => createHash('sha256').update(b).digest('hex');
export function checkpoint(file) {
  if (!existsSync(file)) return { completed: 0, keys: [], bytes: 0, sha256: hash(''), partialTail: false };
  const bytes = readFileSync(file), text = bytes.toString('utf8'), partialTail = !text.endsWith('\n');
  const lines = text.split('\n'); lines.pop();
  const records = lines.filter(Boolean).map(JSON.parse);
  const manifest = records.shift()?.manifest;
  if (!manifest) throw Error('Checkpoint has no complete manifest');
  const keys = records.map(caseKey);
  if (new Set(keys).size !== keys.length) throw Error('Duplicate completed checkpoint case');
  const requested = [];
  if (manifest.mode !== 'runs') throw Error('Only report runs checkpoints are supported; census is separately gated');
  for (const seed of manifest.seeds) for (const bpm of manifest.bpms) for (const bag of manifest.bags)
    for (const island of manifest.islands) for (const bot of manifest.bots) requested.push(caseKey({ seed, bpm, bag, island, bot }));
  const wanted = new Set(requested);
  if (wanted.size !== requested.length || keys.some(k => !wanted.has(k))) throw Error('Unexpected or duplicate requested case');
  const done = new Set(keys);
  return { manifest, completed: keys.length, keys, missingKeys: requested.filter(k => !done.has(k)), bytes: bytes.length, sha256: hash(bytes), partialTail };
}

// Kill only the still-owned child tree. Windows taskkill /T includes Vite/esbuild children;
// POSIX children have their own process group. Never target a name or a discovered global PID.
export function killOwned(child) {
  if (!child.pid || child.exitCode !== null || child.signalCode !== null) return Promise.resolve({ alreadyExited: true });
  if (process.platform === 'win32') return new Promise(resolve => {
    execFile('taskkill.exe', ['/PID', String(child.pid), '/T', '/F'], { windowsHide: true, timeout: 3000 }, (error, stdout, stderr) =>
      resolve({ ok: !error, error: error?.message, stdout, stderr }));
  });
  try { process.kill(-child.pid, 'SIGKILL'); return Promise.resolve({ ok: true }); }
  catch (error) { return Promise.resolve({ ok: false, error: error.message }); }
}

export async function supervise({ command, args, cwd, output, identity, wallSeconds, allocation, signal, cleanup = killOwned }) {
  if (!(wallSeconds > 0 && wallSeconds <= 1800) || !Number.isFinite(wallSeconds)) throw Error('Wall cap must be >0 and <=1800 seconds');
  const identityPath = output + '.supervisor.json', lockPath = output + '.supervisor.lock', attemptsPath = output + '.attempts.jsonl';
  const lock = openSync(lockPath, 'wx');
  let child, timer, abort, stopping, stopReason, cleanupResult, retainLock = false;
  const started = new Date().toISOString(), start = performance.now();
  try {
    const exact = { schema: 1, command, args, cwd, identity };
    if (existsSync(identityPath)) {
      if (JSON.stringify(JSON.parse(readFileSync(identityPath, 'utf8'))) !== JSON.stringify(exact)) throw Error('Resume identity differs; existing results preserved');
    } else {
      if (existsSync(output)) throw Error('Existing results lack supervisor identity; explicit provenance reconciliation required');
      writeFileSync(identityPath, JSON.stringify(exact, null, 2) + '\n', { flag: 'wx' });
    }
    const before = checkpoint(output);
    if (before.partialTail) throw Error('Partial checkpoint tail; preserve file and reconcile explicitly before resuming');
    if (existsSync(attemptsPath)) {
      const attempts = readFileSync(attemptsPath, 'utf8').trim().split('\n').filter(Boolean).map(JSON.parse);
      const last = attempts.at(-1);
      if (last?.after && (last.after.sha256 !== before.sha256 || last.after.bytes !== before.bytes)) throw Error('Checkpoint changed since last attempt; explicit reconciliation required');
    }
    if (before.manifest && identity.sourceSha && (before.manifest.commit !== identity.sourceSha || before.manifest.fingerprint !== identity.fingerprint)) throw Error('Checkpoint manifest differs from pinned source');
    if (before.manifest && before.missingKeys.length === 0) return { reason: 'already-complete', before };
    if (signal?.aborted) throw Error('Aborted before worker launch');
    const prefix = existsSync(output) ? readFileSync(output) : Buffer.alloc(0);
    const stdout = openSync(output + '.stdout.log', 'a'), stderr = openSync(output + '.stderr.log', 'a');
    try { child = spawn(command, args, { cwd, stdio: ['ignore', stdout, stderr], windowsHide: true, detached: process.platform !== 'win32' }); }
    finally { closeSync(stdout); closeSync(stderr); }
    let stopped;
    const stopDone = new Promise(resolve => { stopped = resolve; });
    const stop = reason => {
      if (stopping) return stopping;
      stopReason = reason;
      stopping = Promise.race([cleanup(child), new Promise(resolve => {
        const t = setTimeout(() => resolve({ ok: false, error: 'Cleanup exceeded 3 seconds' }), 3000); t.unref();
      })]).then(result => { cleanupResult = result; stopped(); });
      return stopping;
    };
    // Reserve teardown time inside the allocation; hard-kill synchronous workers rather
    // than trusting a JS signal callback while the game is inside a long case.
    const reserveMs = Math.min(5000, wallSeconds * 1000 / 2);
    timer = setTimeout(() => { void stop('wall-cap'); }, Math.max(1, wallSeconds * 1000 - reserveMs - (performance.now() - start)));
    abort = () => { void stop('interrupted'); };
    signal?.addEventListener('abort', abort, { once: true });
    if (signal?.aborted) abort();
    let observedExit;
    const exited = new Promise(resolve => {
      child.once('error', error => resolve({ error: error.message, code: null, signal: null }));
      child.once('exit', (code, exitSignal) => resolve({ code, signal: exitSignal }));
    }).then(result => { observedExit = result; return result; });
    await Promise.race([exited, stopDone]);
    if (stopping && !observedExit) await Promise.race([exited, new Promise(resolve => setTimeout(resolve, 250))]);
    const exit = observedExit ?? { code: null, signal: null, error: 'Owned child exit not confirmed; manual cleanup required' };
    if (!observedExit) { retainLock = true; child.unref(); }
    clearTimeout(timer);
    if (stopping) await stopping;
    let after, checkpointError;
    try {
      const current = existsSync(output) ? readFileSync(output) : Buffer.alloc(0);
      if (!current.subarray(0, prefix.length).equals(prefix)) throw Error('Worker changed an existing checkpoint prefix');
      after = checkpoint(output);
    } catch (error) { checkpointError = error.message; }
    const reason = stopReason ?? (exit.error ? 'spawn-error' : exit.code !== 0 ? 'worker-failed' : checkpointError || !after?.manifest || after.partialTail || after.missingKeys.length ? 'incomplete' : 'complete');
    const receipt = { schema: 1, allocation, started, ended: new Date().toISOString(), wallSeconds: (performance.now() - start) / 1000, capSeconds: wallSeconds, ownedExitConfirmed: !!observedExit,
      reason, pid: child.pid, exit, cleanup: cleanupResult, identitySha256: hash(JSON.stringify(exact)), before, after, checkpointError,
      interruptedCase: stopReason ? 'No row invented; any uncompleted case remains infrastructure missingness' : undefined };
    appendFileSync(attemptsPath, JSON.stringify(receipt) + '\n');
    return receipt;
  } finally {
    clearTimeout(timer); signal?.removeEventListener('abort', abort);
    if (child?.pid && child.exitCode === null && child.signalCode === null && !retainLock) {
      await cleanup(child); retainLock = true; // Conservative: retain the lock on an exceptional path.
    }
    closeSync(lock); if (!retainLock) unlinkSync(lockPath);
  }
}
