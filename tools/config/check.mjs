// Read-only config/docs freshness gate, run before CI's shared build; every failure keeps its exact fix command.
//   node tools/config/check.mjs
import { spawnSync } from 'node:child_process';

const checks = [
  ['tools/config/format.mjs', '--check'],
  ['tools/config/schema.mjs', '--check'],
  ['tools/config/typegen.mjs', '--check'],
  ['tools/config/linkSwitches.mjs', '--check'],
  ['tools/docs/glossary.mjs', '--check'],
  ['tools/docs/tables.mjs', '--check'],
  ['tools/inventory.mjs', '--check'],
  ['tools/config/generated.mjs', '--check'],
];
for (const args of checks) {
  const result = spawnSync(process.execPath, args, { stdio: 'inherit' });
  if (result.error) console.error(result.error);
  if (result.status !== 0) { process.exitCode = result.status ?? 1; break; }
}
