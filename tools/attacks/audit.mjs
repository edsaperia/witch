// One bounded audit job; current rules only, no renderer/browser or balance edits.
import { build } from 'esbuild';
import { execFileSync, spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';
import { randomUUID, createHash } from 'node:crypto';

const start = Date.now(), root = process.cwd(), at = process.argv.indexOf('--out');
const out = resolve(at >= 0 ? process.argv[at + 1] : 'docs/notes/attack-audit/stage1');
if (existsSync(join(out, 'manifest.json'))) throw Error('Existing audit retained; choose a new --out directory');
mkdirSync(out, { recursive: true });
const head = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
const files = execFileSync('git', ['ls-files', 'src/rules', 'config', 'tools/attacks/audit.mjs', 'tools/attacks/audit-screen.mjs', 'package-lock.json'], { encoding: 'utf8' }).trim().split('\n').filter(Boolean).sort();
const hash = createHash('sha256');
for (const f of files) { const b = readFileSync(f); hash.update(`${Buffer.byteLength(f)}:${f}${b.length}:`); hash.update(b); }
const manifest = { schema: 1, sourceHead: head, sourceSha256: hash.digest('hex'), sourceFiles: files.length, node: process.version, platform: process.platform, startedAt: new Date(start).toISOString(), wholeJobCapMs: 120000, ruleChanges: false, oneWorker: true, finished: false };
const save = () => writeFileSync(join(out, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
save();
const runtime = resolve(`.attack-audit-runtime-${randomUUID()}.mjs`);
try {
  await build({ entryPoints: ['tools/attacks/audit-screen.mjs'], bundle: true, platform: 'node', format: 'esm', outfile: runtime, logLevel: 'error' });
  const remaining = Math.max(1, 120000 - (Date.now() - start));
  const result = spawnSync(process.execPath, [runtime, out, ...(process.argv.includes('--witch-only') ? ['--witch-only'] : [])], { cwd: root, stdio: 'inherit', timeout: remaining });
  Object.assign(manifest, { exitCode: result.status, error: result.error?.message ?? null, elapsedMs: Date.now() - start, finished: result.status === 0 });
  if (result.status !== 0) process.exitCode = result.status ?? 124;
} catch (error) { manifest.error = String(error); process.exitCode = 1; }
finally { manifest.elapsedMs = Date.now() - start; save(); try { unlinkSync(runtime); } catch {} }
