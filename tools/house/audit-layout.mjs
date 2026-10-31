// Offline authoring audit only. Converts the recorded v1 by camera appearance, retains new defaults, never enables adoption.
// node tools/house/audit-layout.mjs [input JSON] [output folder]
import { build } from 'esbuild';
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
const [input = 'docs/evidence/treehouse-layout-ed-2026-10-31.v1.json', output = 'previews/layout-audit'] = process.argv.slice(2);
mkdirSync(output, { recursive: true });
const modulePath = resolve(output, 'audit.cjs');
await build({ stdin: { contents: 'export * from "./src/editor/houseLayout.ts"; export { auditLayout } from "./src/editor/houseLayoutAudit.ts"; export { HOUSE_ROOMS } from "./src/rules/houseRooms.ts";', resolveDir: process.cwd() }, bundle: true, platform: 'node', format: 'cjs', outfile: modulePath });
const { layoutItems, floorplanKey, defaultLayout, parseLayout, exportLayout, auditLayout, HOUSE_ROOMS } = createRequire(import.meta.url)(modulePath);
const items = layoutItems(), layout = parseLayout(JSON.parse(readFileSync(input, 'utf8')), items, floorplanKey(HOUSE_ROOMS, items)), audit = auditLayout(layout, items);
const baseline = auditLayout(defaultLayout(items, layout.floorplan), items);
audit.corridorComparison = { baseline: baseline.corridors, added: audit.corridors.flatMap(c => c.footprintCrossings.filter(id => !baseline.corridors.some(b => b.corridor === c.corridor && b.footprintCrossings.includes(id))).map(id => ({ corridor: c.corridor, id }))) };
for (const [name, value] of [['converted-layout.json', exportLayout(layout, items)], ['audit.json', audit]]) {
  const file = resolve(output, name); if (file === resolve(input)) throw Error('Refusing to overwrite the supplied layout');
  writeFileSync(file, JSON.stringify(value, null, 2) + '\n');
}
console.log(JSON.stringify({ objectCount: audit.objectCount, clutterCount: audit.clutterCount, movedRooms: audit.objects.filter(o => o.crossesRooms).map(o => ({ id: o.id, from: o.sourceRoom, to: o.physicalRoom })), interactiveWarnings: audit.objects.filter(o => o.interactive && (o.anchorOutside > -.3 || !o.floorReachable || o.approachOverlaps.length)), overlaps: audit.overlaps, corridors: audit.corridors, held: audit.migration?.held }, null, 2));
