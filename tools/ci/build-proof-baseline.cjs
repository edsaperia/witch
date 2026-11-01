// Only the separate, frozen prototype checkout is built. Candidate always comes from game-dist.
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const sha = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: 'proof-baseline', encoding: 'utf8' }).trim();
if (sha !== process.env.PROOF_BASE_SHA) throw Error('Baseline checkout moved');
if (!fs.existsSync('proof-baseline/dist/version.json')) {
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
  execFileSync(npm, ['ci'], { cwd: 'proof-baseline', stdio: 'inherit' });
  execFileSync(npm, ['run', 'build'], { cwd: 'proof-baseline', stdio: 'inherit', env: { ...process.env, WITCH_VERSION: 'proof-baseline', WITCH_SHA: sha } });
}
const version = JSON.parse(fs.readFileSync('proof-baseline/dist/version.json', 'utf8')).version;
if (!version.endsWith(sha.slice(0, 7))) throw Error('Cached baseline has wrong served SHA');
fs.mkdirSync('proof-cache', { recursive: true });
