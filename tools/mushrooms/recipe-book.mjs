// Generate the developer-facing book from the explicit, stable recipe assignments.
import { readFileSync, writeFileSync } from 'node:fs';
const recipes = JSON.parse(readFileSync('config/potion-recipes.json', 'utf8'));
// IDs are persisted, never derived from sorting or reassigned to existing recipes.
if (process.argv.includes('--assign-ids')) {
  let next = Math.max(0, ...recipes.map(r => r.id ?? 0));
  for (const recipe of recipes) if (!recipe.id) recipe.id = ++next;
  writeFileSync('config/potion-recipes.json', JSON.stringify(recipes, null, 2) + '\n');
}
const clean = text => text.replaceAll('|', '\\|').replaceAll('\n', ' ');
const rows = recipes.map(r => `| ${r.id} | ${r.recipe.join(' + ')} | ${clean(r.name)} | ${r.comingSoon ? 'Coming soon' : 'Implemented'} | ${clean(r.description)} |`);
writeFileSync('docs/backlog/potion-recipes.md', '# Potion recipe book\n\nDeveloper reference, not an in-game discovery UI. All 165 unordered three-mushroom combinations (repeats allowed) have explicit, stable entries in `config/potion-recipes.json`. Names and descriptions drawn from the existing trip catalogue remain design proposals wherever marked **Coming soon**. Unassigned recipes have no invented effect. New effects fill these existing entries rather than reshuffling recipes.\n\nAll potions last ten minutes of game time, start at full strength on waking, and fade during the final two minutes. A new potion replaces the previous one. The historical tutorial A/B recipes have not been assigned to particular colours.\n\n| ID | Mushrooms | Effect | Status | Description |\n| --- | --- | --- | --- | --- |\n' + rows.join('\n') + '\n');
console.log(`${recipes.length} recipes written to docs/backlog/potion-recipes.md`);
