const fs = require('node:fs'), path = require('node:path'), crypto = require('node:crypto');
const TARGET = { version: 'v7461 · f5b9ba7', sha: 'f5b9ba7db946f33b8276dbe6a124cd0691462c11', run: 41923303645, artifact: 13367159619,
  artifactSha256: 'b50b7bccc13bc045f2363663f59d1461a6c4921ca454e515c27efd7a42d1d29e' };
const WATCHDOG = {
  'owned-run-watchdog.cjs': 'ab76356ec3314f1917f363c34da35370ad5b0c71309090fb50486690cba0bfb7',
  'owned-process-identities.cjs': '90b9271bae392c9a4e9ef992086542d350bd982a5a6269df5b581958129bc6ec',
  'owned-process-handshake.cjs': '34f5ba595b74a765f349ed64073213272a80d2f6b2bc00baf62e8238a3c3e70b',
  'owned-job-controller.ps1': 'ab0129ef88a58a426ef3e03f3a4cd366f983584ccdadb7a1bd1f440e40079abf',
};
const hash = file => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
function assert(condition, message) { if (!condition) throw Error(message); }
function version(file) { assert(JSON.parse(fs.readFileSync(file, 'utf8')).version === TARGET.version, 'Wrong served build; no live substitution'); }
function classifyGround(source) {
  if (!/uniform\s+sampler2D\s+uLand\b/.test(source)) return null;
  const defines = [...source.matchAll(/^\s*#define\s+(GROUND_\w+)\b/gm)].map(m => m[1]).sort();
  return { family: defines.includes('GROUND_LAKES') ? 'lakes' : 'no-lakes', beach: defines.includes('GROUND_BEACH'), defines };
}
function allocation(a, head, now = Date.now()) {
  assert(a?.pr === 1855 && a.prepHead === head && a.targetSha === TARGET.sha && a.targetVersion === TARGET.version, 'Allocation must name exact PR/head/target');
  assert(typeof a.slot === 'string' && a.slot.length > 0 && /^https:\/\/github.com\/edsaperia\/witch\//.test(a.priorFree ?? ''), 'Fresh serialized slot and preceding FREE required');
  const at = Date.parse(a.allocatedAt), quietAt = Date.parse(a.quiet?.at), expires = Date.parse(a.expiresAt);
  assert(now >= at && now - at <= 60000 && expires >= now + 270000 && expires <= at + 900000, 'Stale/short/unbounded allocation');
  assert(a.quiet?.edInUse === false && a.quiet?.idleMs >= 60000 && now >= quietAt && now - quietAt <= 15000, 'Fresh quiet evidence required');
}
function inputs(local, ready) {
  for (const [name, sha] of Object.entries(WATCHDOG)) assert(hash(path.join(local.watchdogDir, name)) === sha, 'Changed reviewed supervisor '+name);
  assert(hash(local.artifactZip) === TARGET.artifactSha256, 'Wrong target artifact ZIP');
  assert(hash(local.artifactFiles) === ready.artifactFilesSha256, 'Changed artifact file manifest');
  const files = JSON.parse(fs.readFileSync(local.artifactFiles, 'utf8'));
  assert(files.length === 1033, 'Unexpected target artifact file count');
  for (const f of files) {
    const file = path.resolve(local.artifactDir, f.path);
    assert(file.startsWith(path.resolve(local.artifactDir)+path.sep), 'Escaping artifact path');
    assert(fs.statSync(file).size === f.bytes && hash(file) === f.sha256, 'Changed artifact file '+f.path);
  }
  version(path.join(local.artifactDir, 'version.json'));
  for (const [key, field] of [['browserPath', 'browserSha256'], ['playwrightPackage', 'playwrightPackageSha256']]) assert(hash(local[key]) === ready[field], 'Changed runtime '+key);
  assert(path.dirname(local.playwrightPackage) === path.resolve(local.playwrightModule), 'Unexpected Playwright package');
  assert(process.execPath === local.nodePath && hash(local.nodePath) === ready.nodeSha256, 'Changed Node runtime');
  assert(hash(local.runtimeFiles) === ready.runtimeFilesSha256, 'Changed runtime file manifest');
  for (const f of JSON.parse(fs.readFileSync(local.runtimeFiles, 'utf8'))) assert(hash(f.path) === f.sha256, 'Changed browser/Playwright runtime file');
  for (const f of ready.driverFiles) assert(hash(path.join(__dirname, f.path)) === f.sha256, 'Changed prepared driver '+f.path);
}
module.exports = { TARGET, WATCHDOG, hash, assert, version, classifyGround, allocation, inputs };
