// Canonical cloud-only diagnostic: one fixed 120-player-second opening, 180s wall, 512MiB worker RSS ceiling.
// node tools/balance/expert-opening-trace.mjs --out docs/notes/expert-results/opening-diagnostic
import { fork, execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { openingSummary, linuxMemory } from './expert-opening-summary.mjs';

const LIMIT = 120, WALL_MS = 180000, MEMORY = 512 * 1024 * 1024;
const CASE = { worldSeed: 0, seed: 1000, bpm: 100, island: 'home', condition: 'matched', bag: 'satchel', hat: 'none', wearsHat: false, parts: [], bot: 'expert' };
if (process.platform !== 'linux') throw Error('Cloud Linux runner only; no laptop execution');
if (!process.argv.includes('--worker')) {
  const args = process.argv.slice(2);
  if (args.length !== 2 || args[0] !== '--out' || !args[1]) throw Error('Exactly --out <new directory> required');
  const out = resolve(args[1]);
  if (existsSync(out)) throw Error('Output exists; no resume/restart or overwrite');
  mkdirSync(out, { recursive: true });
  const started = Date.now(), commit = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
  const child = fork(fileURLToPath(import.meta.url), ['--worker'], { stdio: ['ignore', 'inherit', 'inherit', 'ipc'], execArgv: ['--max-old-space-size=384'] });
  let peakRss = 0, result = null, failure = null;
  const stop = reason => { if (!failure) { failure = reason; child.kill('SIGKILL'); } };
  const deadline = setTimeout(() => stop('wall-cap'), Math.max(0, WALL_MS - (Date.now() - started)));
  const sample = () => {
    try {
      const m = linuxMemory(readFileSync(`/proc/${child.pid}/status`, 'utf8'));
      peakRss = Math.max(peakRss, m.rss, m.peakRss);
      if (peakRss > MEMORY) stop('memory-cap');
    } catch (e) { if (e.code !== 'ENOENT' && e.code !== 'ESRCH') stop(`memory-monitor-error: ${e.message}`); }
  };
  sample(); const monitor = setInterval(sample, 25);
  child.on('message', m => { if (m?.kind === 'result') result = m.value; });
  let exitCode, signal;
  try { [exitCode, signal] = await new Promise((done, reject) => { child.once('error', reject); child.once('exit', (c, s) => done([c, s])); }); }
  catch (e) { failure = `worker-error: ${e.message}`; }
  finally { clearInterval(monitor); clearTimeout(deadline); }
  if (result) peakRss = Math.max(peakRss, result.workerPeakRssBytes);
  if (peakRss > MEMORY) failure ??= 'memory-cap';
  const complete = !failure && exitCode === 0 && result !== null;
  const report = { schema: 1, commit, case: CASE, playerLimit: LIMIT, wallLimitSeconds: WALL_MS / 1000,
    memoryLimitBytes: MEMORY, complete, failure: failure ?? (complete ? null : 'worker-incomplete'), exitCode, signal,
    wallSeconds: (Date.now() - started) / 1000, workerPeakRssBytes: peakRss, rssScope: 'Worker process only; Linux VmHWM/25ms watchdog plus resourceUsage peak, not total machine memory. Ceiling termination may overshoot between samples.',
    completedCasesPerWallMinute: complete ? 60 / ((Date.now() - started) / 1000) : null,
    throughputScope: 'One 120-player-second home opening, never a full-night or other-island throughput estimate.', result };
  writeFileSync(resolve(out, 'summary.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(JSON.stringify({ out, complete, failure: report.failure, wallSeconds: report.wallSeconds, workerPeakRssBytes: peakRss }));
  process.exitCode = complete ? 0 : 2;
} else {
  if (!process.send) throw Error('Worker requires the monitored parent IPC channel');
  // Lazy-load the game only inside the monitored child.
  const { openRules } = await import('./lib.mjs');
  const { sourceFingerprint } = await import('./expert-contract.mjs');
  const fingerprint = sourceFingerprint(), { load, close } = await openRules();
  try {
    const { TUNING, withTuning } = await load('/src/rules/tuning.ts');
    const { newGame, stepGame, STEP } = await load('/src/rules/game.ts');
    const { newExpert } = await load('/src/bots/expert.ts');
    const { recordTempo } = await load('/src/rules/beat.ts');
    const { fillTrunk } = await load('/src/rules/finds.ts');
    const { phaseOf } = await import('./report-core.mjs');
    const excluded = JSON.parse(readFileSync('docs/notes/expert-held-out-pairs.json', 'utf8'));
    if (excluded.some(p => p.worldSeed === CASE.worldSeed && p.nightSeed === CASE.seed)) throw Error('Protected case');
    const g = newGame(CASE.seed, withTuning({ map: { ...TUNING.map, island: CASE.island, world: CASE.worldSeed }, spells: { ...TUNING.spells, bag: CASE.bag, hat: CASE.hat, parts: CASE.parts } }));
    g.witches[0].hat.has = false; g.clock.paused = false; g.witches[0].body = { ...g.witches[0].body, seated: false };
    recordTempo(g.beat, g.tuning, CASE.bpm, 0); fillTrunk(g, {});
    const summary = openingSummary(), brain = newExpert({}, CASE.seed ^ 0x1477, undefined, e => summary.consume(e));
    const phaseSeconds = {};
    for (let i = 0; i < Math.ceil(LIMIT / STEP); i++) {
      const dt = Math.min(STEP, LIMIT - i * STEP), phase = phaseOf(g);
      stepGame(g, brain.decide(g), dt); phaseSeconds[phase] = (phaseSeconds[phase] ?? 0) + dt;
      if (g.partyOver || g.win?.wonAt !== undefined) break;
    }
    const result = { fingerprint, sourceRuntime: { node: process.version, platform: process.platform, arch: process.arch },
      playerEnd: g.herTime, worldEnd: g.clock.time, outcome: g.win?.wonAt !== undefined ? 'won' : g.partyOver ? 'lost' : 'censored', phaseSeconds,
      ...summary.finish(g.herTime), workerPeakRssBytes: process.resourceUsage().maxRSS * 1024,
      limits: 'Opening-only diagnostic, no comparison/strength/persistence/causal loss claim; raw game outcomes never enter the bot observations.' };
    if (process.send) await new Promise((done, reject) => process.send({ kind: 'result', value: result }, e => e ? reject(e) : done()));
  } finally { await close(); }
}
