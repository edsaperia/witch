// Static proposal only: expands the existing frozen survey. Never opens a rules runtime or runs a case.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { shards, cells, digest, cloudJob } from '../balance/survey.mjs';

const manifestPath = 'tools/balance/surveys/wave1/census.json';
const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
const parts = shards(manifest), cases = cells(manifest), keys = new Set(cases.map(c => c.key));
if (parts.length !== 5 || cases.length !== 2560 || keys.size !== cases.length ||
  digest(parts.flatMap(s => s.cases.map(c => c.key)).sort()) !== digest([...keys].sort())) throw Error('Frozen census matrix changed; review proposal before regenerating');
const dir = resolve('docs/notes/attack-audit/census-proposal');
mkdirSync(dir, { recursive: true });
const save = (path, value) => writeFileSync(resolve(dir, path), JSON.stringify(value, null, 2) + '\n');
for (const part of parts) save(`${part.id}.cases.json`, { proposalOnly: true, manifestPath, manifestHash: digest(manifest), ...part });
save('index.json', { schema: 1, status: 'PROPOSAL_ONLY_NOT_DISPATCHED',
  executionGate: 'Canonical opens balancing after Ed playtest and explicitly routes these cloud shards; existing source/model/adapter/protected-pair gates must also pass. Never rebind an old trained lock.',
  manifestPath, manifestHash: digest(manifest), cases: cases.length, shards: parts.length,
  youngAdultInvitationCases: cases.filter(c => [1, 2].includes(c.level) && c.fixture === 'invitation-stun-protected').length,
  species: manifest.species, bags: manifest.bags, bpms: manifest.bpms, levels: manifest.levels,
  groups: parts.map(s => ({ id: s.id, file: `${s.id}.cases.json`, cases: s.cases.length, seedPairs: s.seedPairs, keysHash: digest(s.cases.map(c => c.key).sort()) })) });
writeFileSync(resolve(dir, 'cloud-commands.txt'), '# PROPOSAL ONLY. No execution authorized. Reuse frozen #1475 cases and any existing valid results; do not duplicate dispatched work.\n' +
  parts.map(s => cloudJob(manifest, s, manifestPath).command).join('\n') + '\n');
console.log(`Proposal only: ${cases.length} exact cases in ${parts.length} files; no runtime loaded, no case executed`);
