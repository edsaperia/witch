// A4-only completeness gate before the shared comparator: require both rules and every quick scene at the exact source SHAs.
const fs = require('node:fs'), path = require('node:path');

function completeBenchmark(directory, expectedSha) {
  if (!/^[a-f0-9]{40}$/.test(expectedSha)) throw Error('Full expected source SHA required');
  const read = name => JSON.parse(fs.readFileSync(path.join(directory, name), 'utf8'));
  const rules = read('rules.json'), frames = read('frames.json');
  for (const [name, result] of [['rules', rules], ['frames', frames]]) {
    const build = result.key?.build;
    const tokens = typeof build === 'string' ? build.match(/\b[a-f0-9]{7,40}\b/g) ?? [] : [];
    if (!tokens.some(token => expectedSha.startsWith(token))) throw Error(`${name}: missing or wrong source identity`);
  }
  if (rules.wave !== 10 || rules.steps !== 900 || rules.every !== 300 ||
      JSON.stringify((rules.seeds ?? []).map(s => s.seed).sort((a,b) => a-b)) !== '[123,165272]') throw Error('Full default quick rules workload required');
  if (!Array.isArray(rules.seeds) || !rules.seeds.length || rules.seeds.some(seed =>
    !Array.isArray(seed.prints) || JSON.stringify(seed.prints.map(p => p.step)) !== '[300,600,900]' || seed.prints.some(p => !p.print || !Object.keys(p.print).length))) throw Error('Incomplete rules fingerprints');
  if (frames.quick !== true || !Array.isArray(frames.errors) || frames.errors.length) throw Error('Quick frames missing or contain page errors');
  const scenes = ['bedroom', 'boot', 'wave-fight'];
  if (JSON.stringify(Object.keys(frames.scenes ?? {}).sort()) !== JSON.stringify(scenes)) throw Error('All three quick scenes required');
  const png = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  for (const scene of scenes) if (!fs.readFileSync(path.join(directory, `${scene}.png`)).subarray(0, 8).equals(png)) throw Error(`${scene}: PNG evidence missing/invalid`);
  return { expectedSha, seeds: rules.seeds.length, scenes };
}

if (require.main === module) {
  try {
    const cp = require('node:child_process');
    const head = cp.execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
    const source = JSON.parse(fs.readFileSync('docs/plans/a4-dry-run-manifest.json', 'utf8')).sourceCommit;
    completeBenchmark('.a4-baseline/bench-out', source);
    completeBenchmark('bench-out', head);
    console.log('A4 benchmark completeness: both exact sources, rules and all three scenes present');
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
module.exports = { completeBenchmark };
