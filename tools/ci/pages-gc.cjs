// Delete main's stale build output from the gh-pages checkout before a deploy copies the new dist over it (the coordinator,
// 2026-11-10: `cp -a` never removed anything, so every release's hashed files piled up, 292 copies of the game's main script,
// and the published snapshot reached 989 MB of Pages' 1 GB). A file may go only if it sits in a folder the build writes (a
// folder of the new dist, never making-of/, pr-*/ or the root itself), is not in the new dist, and is not part of the previous
// build: everything the old entry pages (every .html outside pr-*/) reference, followed through the text files they reach
// (html, js, css, json, workers...), by file name. So a page left open on the previous build still loads its lazy chunks,
// and version.json and .nojekyll are never touched. If the scan finds nothing (no old index.html, an unexpected layout) it
// deletes nothing. CI's deploy step runs it for main only (DEST "."); a preview replaces its own folder instead.
//   node tools/ci/pages-gc.cjs <new dist> <gh-pages checkout> [--dry-run] [--list]
'use strict';
const fs = require('node:fs'), path = require('node:path');

const OFF_LIMITS = /^(?:pr-[^/]*|making-of|\.git)(?:\/|$)/; // (never deleted from; pr-* and .git never read either)
const NEVER_DELETE = new Set(['.nojekyll', 'version.json']);
const TEXT = /\.(?:html?|[cm]?js|css|json|svg|webmanifest|txt|xml|map)$/i;
const NAME_SPLIT = /[^A-Za-z0-9_.\-]+/; // (every published file name is made of these: Vite's hashes, the samples, the batches)

/** Every regular file under `root`, as a posix path relative to it, skipping the folders `skip` matches. */
function files(root, skip = () => false) {
  const out = [];
  const walk = rel => {
    for (const e of fs.readdirSync(path.join(root, rel), { withFileTypes: true })) {
      const r = rel ? `${rel}/${e.name}` : e.name;
      if (skip(r)) continue;
      if (e.isDirectory()) walk(r);
      else if (e.isFile()) out.push(r);
    }
  };
  walk('');
  return out;
}
const dirOf = f => (f.includes('/') ? f.slice(0, f.lastIndexOf('/')) : '');
const baseOf = f => f.slice(f.lastIndexOf('/') + 1);

/** What to delete from `site` before `dist` is copied over it, and why the rest stays. Reads only; deletes nothing. */
function plan(dist, site) {
  const fresh = new Set(files(dist));
  const buildDirs = new Set([...fresh].map(dirOf).filter(d => d && !OFF_LIMITS.test(d)));
  const old = files(site, r => /^(?:pr-[^/]*|\.git)$/.test(r));
  const none = reason => ({ reason, delete: [], previous: [], deleteBytes: 0, buildDirs: [...buildDirs].sort() });
  if (!fresh.has('index.html')) return none('the new dist has no index.html');
  if (!old.includes('index.html')) return none('gh-pages has no index.html at its root: no previous build to work from');

  // The previous build: the old entry pages and everything they reach by file name.
  const byName = new Map();
  for (const f of old) { const b = baseOf(f); if (!byName.has(b)) byName.set(b, []); byName.get(b).push(f); }
  const entries = old.filter(f => /\.html?$/i.test(f)), isEntry = new Set(entries);
  const reached = new Set(entries), queue = [...entries];
  while (queue.length) {
    const f = queue.pop();
    if (!TEXT.test(f)) continue;
    for (const token of new Set(fs.readFileSync(path.join(site, f), 'utf8').split(NAME_SPLIT)))
      for (const hit of byName.get(token) ?? []) if (!reached.has(hit)) { reached.add(hit); queue.push(hit); }
  }
  const candidates = old.filter(f => buildDirs.has(dirOf(f)) && !OFF_LIMITS.test(f) && !fresh.has(f) && !NEVER_DELETE.has(baseOf(f)));
  const previous = old.filter(f => buildDirs.has(dirOf(f)) && !OFF_LIMITS.test(f) && reached.has(f) && !isEntry.has(f));
  // (the safety: the old game page must be seen to load something from a build folder, or the scan didn't understand the layout)
  const gamePage = new Set(fs.readFileSync(path.join(site, 'index.html'), 'utf8').split(NAME_SPLIT));
  if (!previous.some(f => gamePage.has(baseOf(f)))) return none('the old index.html references nothing in the build folders: the scan understood nothing, so nothing is deleted');
  const doomed = candidates.filter(f => !reached.has(f)).sort();
  const deleteBytes = doomed.reduce((n, f) => n + fs.statSync(path.join(site, f)).size, 0);
  return { reason: null, delete: doomed, previous: previous.sort(), deleteBytes, buildDirs: [...buildDirs].sort() };
}

/** Delete what `plan` chose (each path checked again to be inside a build folder). */
function apply(p, site) {
  const dirs = new Set(p.buildDirs);
  for (const f of p.delete) {
    if (!dirs.has(dirOf(f)) || OFF_LIMITS.test(f) || NEVER_DELETE.has(baseOf(f)) || f.split('/').includes('..')) throw Error(`refusing to delete ${f}`);
    fs.unlinkSync(path.join(site, f));
  }
}

const mb = n => (n / 1048576).toFixed(1);
function report(p, site, { dryRun = false } = {}) {
  const lines = [];
  if (p.reason) return [`pages-gc: nothing deleted (${p.reason})`];
  const byDir = new Map();
  for (const f of p.delete) { const d = dirOf(f), s = byDir.get(d) ?? { n: 0, bytes: 0 }; s.n++; s.bytes += fs.statSync(path.join(site, f)).size; byDir.set(d, s); }
  lines.push(`pages-gc: ${dryRun ? 'would delete' : 'deleting'} ${p.delete.length} stale build files, ${mb(p.deleteBytes)} MB; keeping the previous build's ${p.previous.length} files in the build folders`);
  for (const [d, s] of [...byDir].sort()) lines.push(`  ${d}/: ${s.n} files, ${mb(s.bytes)} MB`);
  return lines;
}

if (require.main === module) {
  const args = process.argv.slice(2), dryRun = args.includes('--dry-run'), [dist, site] = args.filter(a => !a.startsWith('--'));
  if (!dist || !site) { console.error('usage: node tools/ci/pages-gc.cjs <new dist> <gh-pages checkout> [--dry-run] [--list]'); process.exit(2); }
  const p = plan(dist, site);
  const gha = process.env.GITHUB_ACTIONS === 'true';
  const [head, ...rest] = report(p, site, { dryRun });
  console.log(head);
  for (const l of rest) console.log(l);
  if (p.delete.length && (gha || args.includes('--list'))) {
    if (gha) console.log('::group::pages-gc: every deleted file');
    for (const f of p.delete) console.log(`  - ${f}`);
    if (gha) console.log('::endgroup::');
  }
  if (!dryRun) apply(p, site);
}

module.exports = { plan, apply, report, files };
