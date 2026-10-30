// Replay Git blobs only: no historical module, art generator or game is executed.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { loadAnalyzer } from './load.mjs';

const output = process.argv[2];
if (!output) throw Error('Usage: node tools/art-cache/history.mjs <output.json> [--first-parent]');
const base = '909f00aeed24a72654b1a48c04faad4ac558e865';
const since = '2026-10-23T12:00:00Z', until = '2026-10-30T12:00:00Z';
const firstOnly = process.argv.includes('--first-parent'), at = performance.now();
const git = (args, input) => execFileSync('git', args, { input, windowsHide: true, maxBuffer: 512 * 1024 * 1024 });
const text = args => git(args).toString('utf8').trim();
const sha = data => createHash('sha256').update(data).digest('hex');
const source = f => !f.split('/').some(p => p.startsWith('.') || p === 'out' || p === 'dist') &&
  ((/^(art|src|config)\//.test(f) && /\.(?:[cm]?[jt]sx?|json)$/.test(f)) || /^art\/overrides\/[^/]+\/[^/]+\.png$/.test(f) || /^(?:vite\.config\.ts|package(?:-lock)?\.json|tools\/art[^/]*\.[cm]?[jt]s|tools\/overrides\/[^/]+\.[cm]?[jt]s)$/.test(f));
const extras = ['src/render/artBuild.ts', 'src/render/homeArt.ts', 'src/rules/map.ts', 'src/rules/random.ts', 'config/area-types.json'];
const producers = ['tools/artHash.ts', 'tools/overrides/png.ts', 'src/render/artCache.ts', 'vite.config.ts'];
const selected = new Set(text(['rev-list', ...(firstOnly ? ['--first-parent'] : []), `--since=${since}`, `--until=${until}`, base]).split('\n').filter(Boolean));
const firstParent = new Set(text(['rev-list', '--first-parent', `--since=${since}`, `--until=${until}`, base]).split('\n').filter(Boolean));
const ancestry = text(['rev-list', '--parents', `--since=${since}`, base]).split('\n').filter(Boolean).map(line => { const [id, ...parents] = line.split(' '); return { id, parents }; });
const nodes = new Map(ancestry.map(n => [n.id, n]));
const edges = ancestry.flatMap(n => n.parents.map(parent => ({ child: n.id, parent, changes: [] })));
const marker = 'ART_CACHE_EDGE_8b8429e7';
// --stdin's two-commit form is <commit> <parent>, unlike the CLI's old/new form.
const diff = git(['diff-tree', '--stdin', '--raw', '-r', '-z', '--no-renames', '--no-commit-id'], edges.map(e => `${marker} ${e.child} ${e.parent}\n${e.child} ${e.parent}\n`).join('') + marker + ' END\n').toString('utf8');
const pattern = new RegExp(`(?<![^\u0000\n])${marker} ([0-9a-f]{40}) ([0-9a-f]{40})\n`, 'g');
const boundaries = [...diff.matchAll(pattern)];
if (boundaries.length !== edges.length) {
  writeFileSync('.art-hash-edge-debug.txt', diff);
  throw Error('Git edge framing mismatch ' + JSON.stringify({ expected: edges.length, actual: boundaries.length, head: diff.slice(0, 220), tail: diff.slice(-220) }));
}
for (let i = 0; i < edges.length; i++) {
  const match = boundaries[i], edge = edges[i];
  if (match[1] !== edge.child || match[2] !== edge.parent) throw Error('Git edge order mismatch');
  const end = i + 1 < boundaries.length ? boundaries[i + 1].index : diff.lastIndexOf(marker + ' END');
  const tokens = diff.slice(match.index + match[0].length, end).split('\0').filter(Boolean);
  for (let k = 0; k < tokens.length; k += 2) {
    const header = tokens[k].trim(), file = tokens[k + 1];
    const m = header.match(/^:([0-7]+) ([0-7]+) ([0-9a-f]{40}) ([0-9a-f]{40}) ([A-Z])/);
    if (!m || file === undefined) throw Error('Git raw diff framing mismatch');
    if (source(file)) edge.changes.push({ file, old: m[3], next: m[4], oldMode: m[1], nextMode: m[2] });
  }
}
const listTree = commit => new Map(git(['ls-tree', '-r', '-z', commit]).toString('utf8').split('\0').filter(Boolean).flatMap(line => {
  const [header, file] = line.split('\t'), [, type, id] = header.split(' ');
  return type === 'blob' && source(file) ? [[file, id]] : [];
}));
const states = new Map([[base, listTree(base)]]), byChild = new Map();
for (const edge of edges) (byChild.get(edge.child) ?? byChild.set(edge.child, []).get(edge.child)).push(edge);
const zero = '0'.repeat(40), queue = [base];
for (let q = 0; q < queue.length; q++) {
  const child = queue[q], tree = states.get(child);
  for (const edge of byChild.get(child) ?? []) {
    const parent = new Map(tree);
    for (const c of edge.changes) {
      if ((tree.get(c.file) ?? zero) !== c.next) throw Error(`Child blob mismatch ${child}:${c.file}`);
      if (c.old === zero) parent.delete(c.file); else parent.set(c.file, c.old);
    }
    if (states.has(edge.parent)) {
      const existing = states.get(edge.parent);
      if (existing.size !== parent.size || [...parent].some(([f, id]) => existing.get(f) !== id)) throw Error(`DAG reconstruction mismatch ${edge.parent}`);
    } else { states.set(edge.parent, parent); queue.push(edge.parent); }
  }
}
for (const id of selected) if (!states.has(id)) throw Error(`Missing selected state ${id}`);
const ordered = ancestry.filter(n => selected.has(n.id));
const verifiedTrees = [...new Set([base, ordered[Math.floor(ordered.length / 2)]?.id, ordered.at(-1)?.id].filter(Boolean))];
for (const id of verifiedTrees) {
  const actual = listTree(id), reconstructed = states.get(id);
  if (actual.size !== reconstructed.size || [...actual].some(([f, blob]) => reconstructed.get(f) !== blob)) throw Error(`Independent ls-tree mismatch ${id}`);
}
const ids = new Set(); for (const tree of states.values()) for (const id of tree.values()) ids.add(id);
const batch = git(['cat-file', '--batch'], [...ids].join('\n') + '\n'), blobs = new Map();
let offset = 0;
for (const expected of ids) {
  const nl = batch.indexOf(10, offset), [id, type, sizeText] = batch.subarray(offset, nl).toString('ascii').split(' '), size = Number(sizeText);
  if (id !== expected || type !== 'blob' || !Number.isSafeInteger(size) || size < 0) throw Error('Git blob header mismatch');
  const data = batch.subarray(nl + 1, nl + 1 + size);
  if (batch[nl + 1 + size] !== 10 || createHash('sha1').update(`blob ${size}\0`).update(data).digest('hex') !== id) throw Error(`Git blob integrity mismatch ${id}`);
  blobs.set(id, data); offset = nl + size + 2;
}
if (offset !== batch.length) throw Error('Unexpected trailing blob bytes');
console.log(JSON.stringify({ stage: 'inputs-verified', selected: selected.size, firstParent: firstParent.size, states: states.size, blobs: blobs.size, blobBytes: batch.length, verifiedTrees }));
if (process.argv.includes('--inputs-only')) process.exit(0);
const engineHash = sha(Buffer.concat([...['tools/artDependencies.ts', 'tools/artJobFingerprints.ts', 'tools/artHash.ts', 'tools/art-cache/history.mjs', 'tools/art-cache/load.mjs', 'package-lock.json'].map(f => readFileSync(f)), Buffer.from(process.version)]));
const cacheFile = output + '.cache.json';
const oldCache = existsSync(cacheFile) ? JSON.parse(readFileSync(cacheFile, 'utf8')) : null;
const exact = new Map(oldCache?.engineHash === engineHash ? Object.entries(oldCache.entries).map(([key, value]) => [key, value.error ? value : { ...value, scopeSources: oldCache.scopes[value.scopeId] }]) : []), scoped = new Map();
const treeKey = tree => sha([...tree].sort(([a], [b]) => a.localeCompare(b)).map(([f, id]) => f + '\0' + id).join('\n'));
const scopeKey = (tree, scope) => sha([...tree.keys()].sort().join('\0') + '\n' + scope.map(f => f + '\0' + (tree.get(f) ?? 'missing')).join('\n'));
const { api, close } = await loadAnalyzer();
let lastScope = null, analyses = 0, reused = 0;
const analyze = commit => {
  const tree = states.get(commit); if (!tree) return { error: 'missing parent source state' };
  const key = treeKey(tree), cached = exact.get(key);
  if (cached) { reused++; if (!cached.error) { lastScope = cached.scopeSources; scoped.set(scopeKey(tree, lastScope), cached); } return cached; }
  const candidate = lastScope && scoped.get(scopeKey(tree, lastScope));
  if (candidate) { reused++; exact.set(key, candidate); return candidate; }
  const sourceTree = { exists: f => tree.has(f), read: f => { const bytes = blobs.get(tree.get(f)); if (!bytes) throw Error(`Unavailable blob ${commit}:${f}`); return bytes; } };
  let result;
  try {
    const map = api.artJobFingerprints(sourceTree, { virtual: { 'virtual:art-overrides': [...tree.keys()].filter(f => /^art\/overrides\/[^/]+\/[^/]+\.png$/.test(f)).sort() }, buildInputs: producers.filter(f => tree.has(f)) });
    result = { fingerprints: map.fingerprints, sharedHash: map.sharedHash, scopeSources: map.scopeSources };
    lastScope = result.scopeSources; scoped.set(scopeKey(tree, lastScope), result); analyses++;
  } catch (error) { result = { error: String(error.message ?? error) }; }
  exact.set(key, result); return result;
};
const legacy = tree => {
  const art = [...tree.keys()].filter(f => /^art\/.+\.(js|json)$/.test(f) && !/^art\/(out|overrides)\//.test(f)).sort();
  const png = [...tree.keys()].filter(f => /^art\/overrides\/[^/]+\/[^/]+\.png$/.test(f)).sort();
  const read = f => { const bytes = blobs.get(tree.get(f)); if (!bytes) throw Error('legacy input missing: ' + f); return bytes; };
  return createHash('sha1').update([...art, ...extras].map(f => f + '\n' + read(f).toString('utf8')).join('\n')).update(png.join('\n')).update(Buffer.concat(png.map(read))).digest('hex').slice(0, 12);
};
const rows = [];
const sourceHead = text(['rev-parse', 'HEAD']);
const summary = subset => {
  const complete = subset.filter(r => !r.error), house = complete.filter(r => r.houseComparable), creature = complete.filter(r => r.creatureComparable), all = complete.filter(r => r.sameKinds);
  const allInvalidations = all.filter(r => r.affected.length === r.kindCount), touches = {};
  for (const row of allInvalidations) for (const file of row.changedSourceFiles ?? []) touches[file] = (touches[file] ?? 0) + 1;
  return { rows: subset.length, complete: complete.length, unsupported: subset.length - complete.length, fixedGlobalBaselineComparable: subset.filter(r => typeof r.legacyChanged === 'boolean').length, fixedGlobalBaselineInvalidations: subset.filter(r => r.legacyChanged === true).length, houseComparable: house.length, houseInvalidations: house.filter(r => r.houseChanged).length, creatureComparable: creature.length, allCreatureWalkingInvalidations: creature.filter(r => r.creatureChanged).length, oneSpeciesFoxInvalidations: creature.filter(r => r.creatureChanged).length, sameKindSetComparable: all.length, allKindInvalidations: allInvalidations.length, sharedComponentChanges: complete.filter(r => r.sharedChanged).length, allInvalidatingTouches: Object.entries(touches).sort((a, b) => b[1] - a[1]).slice(0, 20), styleInputChanges: subset.filter(r => r.styleInputsChanged).length };
};
const artifact = () => ({ schema: 1, base, since, until, mode: firstOnly ? 'first-parent' : 'reachable', engineHash, sourceHead, node: process.version, platform: process.platform, verifiedTrees, verifiedBlobs: blobs.size, blobBytes: batch.length, elapsedMs: performance.now() - at, analyses, reused, method: 'New algorithm on each historical source tree versus its first parent, without executing historical code. Fixed legacy global baseline uses pinned-909 input rules, not historical hash implementations. Fingerprint comparisons exclude runtime style/id/seed salts; style-input changes are listed separately as potential additional invalidations. All-creature walking and fox share the creature-kind source prefix; no per-species pruning. First-parent transitions are not deployments.', summary: summary(rows), firstParentSummary: summary(rows.filter(r => r.firstParent)), rows });
const save = () => { writeFileSync(output, JSON.stringify({ ...artifact(), expectedRows: selected.size, finished: rows.length === ordered.length }, null, 2) + '\n'); };
const saveCache = () => {
  const scopes = {}, entries = {};
  for (const [key, value] of exact) {
    if (value.error) { entries[key] = value; continue; }
    const scopeId = sha(value.scopeSources.join('\0')); scopes[scopeId] = value.scopeSources;
    const { scopeSources, ...rest } = value; entries[key] = { ...rest, scopeId };
  }
  writeFileSync(cacheFile, JSON.stringify({ engineHash, scopes, entries }) + '\n');
};
try {
  for (const { id, parents } of ordered) {
    const parent = parents[0], row = { commit: id, parent, firstParent: firstParent.has(id) };
    row.changedSourceFiles = (byChild.get(id) ?? []).find(e => e.parent === parent)?.changes.map(c => c.file) ?? [];
    if (!parent || !states.has(parent)) row.error = 'no reconstructable first parent';
    else {
      const before = analyze(parent), after = analyze(id), a = states.get(parent), b = states.get(id);
      try { row.legacyChanged = legacy(a) !== legacy(b); } catch (error) { row.legacyError = String(error.message ?? error); }
      row.styleInputsChanged = ['config/style.json', 'src/render/style.ts'].some(f => a.get(f) !== b.get(f));
      if (before.error || after.error) row.error = [before.error, after.error].filter(Boolean).join(' | ');
      else {
        const oldKinds = Object.keys(before.fingerprints).sort(), kinds = Object.keys(after.fingerprints).sort();
        row.sameKinds = JSON.stringify(oldKinds) === JSON.stringify(kinds); row.kindCount = kinds.length;
        row.addedKinds = kinds.filter(k => !(k in before.fingerprints)); row.removedKinds = oldKinds.filter(k => !(k in after.fingerprints));
        row.affected = [...new Set([...oldKinds, ...kinds])].sort().filter(k => before.fingerprints[k] !== after.fingerprints[k]);
        row.houseComparable = !!before.fingerprints.housePiece && !!after.fingerprints.housePiece;
        row.houseChanged = row.houseComparable && before.fingerprints.housePiece !== after.fingerprints.housePiece;
        row.creatureComparable = !!before.fingerprints.creature && !!after.fingerprints.creature;
        row.creatureChanged = row.creatureComparable && before.fingerprints.creature !== after.fingerprints.creature;
        row.sharedChanged = before.sharedHash !== after.sharedHash;
      }
    }
    rows.push(row);
    if (rows.length % 10 === 0) { save(); console.log(JSON.stringify({ stage: 'replay', rows: rows.length, total: ordered.length, analyses, reused, elapsedMs: performance.now() - at })); }
  }
  save(); console.log(JSON.stringify({ stage: 'complete', ...artifact().summary, analyses, reused, elapsedMs: performance.now() - at }));
} finally { try { saveCache(); } finally { close(); } }
