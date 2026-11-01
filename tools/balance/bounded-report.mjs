// One restartable report worker with a <=30-minute allocation, exact-source identity and interruption receipt.
// node tools/balance/bounded-report.mjs allocation.json
// Requires a canonical CPU slot and the external laptop input/preflight guard; this CLI grants neither.
import { readFileSync, readdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { supervise } from './bounded-report-core.mjs';

const root = fileURLToPath(new URL('../..', import.meta.url));
const spec = JSON.parse(readFileSync(process.argv[2], 'utf8'));
if (!Number.isFinite(spec.wallSeconds) || spec.wallSeconds < 10 || spec.wallSeconds > 1800) throw Error('Allocation cap must be 10..1800 seconds, including teardown reserve');
if (!spec.allocation || !/^[a-f0-9]{40}$/.test(spec.sourceSha) || !spec.stopFile) throw Error('Named allocation, full sourceSha and externally guarded stopFile required');
if (typeof spec.output !== 'string' || !spec.output.endsWith('.jsonl')) throw Error('An explicit .jsonl output path is required');
if (!Array.isArray(spec.reportArgs) || spec.reportArgs.length % 2 || spec.reportArgs.some(x => typeof x !== 'string')) throw Error('reportArgs must be explicit flag/value pairs');
const allowed = new Set(['--seeds', '--skip', '--time', '--bpms', '--bags', '--bots', '--islands', '--build']);
const flags = new Set();
for (let i = 0; i < spec.reportArgs.length; i += 2) {
  const flag = spec.reportArgs[i];
  if (!allowed.has(flag) || flags.has(flag) || spec.reportArgs[i + 1].startsWith('--')) throw Error('Unknown/repeated flag or ambiguous value'); flags.add(flag);
}
const botsAt = spec.reportArgs.indexOf('--bots');
if (botsAt < 0 || spec.reportArgs[botsAt + 1].split(',').some(b => !['sloppy', 'crude', 'skilled'].includes(b))) throw Error('Only explicitly named legacy sloppy/crude/skilled policies; expert and census gates are separate');
const git = args => execFileSync('git', args, { cwd: root, encoding: 'utf8' }).trim();
if (git(['rev-parse', 'HEAD']) !== spec.sourceSha || git(['status', '--porcelain', '--untracked-files=no'])) throw Error('Exact clean source commit required');
const fingerprint = createHash('sha256');
function addTree(dir) {
  for (const e of readdirSync(resolve(root, dir), { withFileTypes: true }).sort((a, b) => a.name < b.name ? -1 : a.name > b.name ? 1 : 0)) {
    const p = resolve(root, dir, e.name);
    if (e.isDirectory()) addTree(relative(root, p));
    else if (/\.(ts|mjs|js|json)$/.test(e.name)) { fingerprint.update(relative(root, p).replaceAll('\\', '/')); fingerprint.update(readFileSync(p, 'utf8').replace(/\r\n/g, '\n')); }
  }
}
for (const dir of ['src/rules', 'src/bots', 'src/app', 'config', 'art', 'tools/balance']) addTree(dir);
const controller = new AbortController();
const stop = () => controller.abort();
process.on('SIGINT', stop); process.on('SIGTERM', stop);
if (existsSync(spec.stopFile)) throw Error('External stop file already exists; no launch');
const poll = setInterval(() => { if (existsSync(spec.stopFile)) stop(); }, 100);
try {
  const result = await supervise({ command: process.execPath, args: ['tools/balance/report.mjs', 'runs', ...spec.reportArgs, '--out', resolve(spec.output)],
    cwd: root, output: resolve(spec.output), wallSeconds: spec.wallSeconds, allocation: spec.allocation, signal: controller.signal,
    identity: { sourceSha: spec.sourceSha, fingerprint: fingerprint.digest('hex'), node: process.version,
      packageLockSha256: createHash('sha256').update(readFileSync(resolve(root, 'package-lock.json'))).digest('hex') } });
  console.log(JSON.stringify({ allocation: spec.allocation, ...result }, null, 2));
  process.exitCode = ['complete', 'already-complete'].includes(result.reason) ? 0 : 1;
} finally { clearInterval(poll); process.off('SIGINT', stop); process.off('SIGTERM', stop); }
