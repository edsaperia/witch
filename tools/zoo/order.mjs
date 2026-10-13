// The zoo's order (rules/zoo.ts, config/zoo.json; Ed, 2026-10-13): each row left to right by the swarm class (the tuning's
// population.swarm.classes: light, medium, strong) and within a class by the adult's drawn size (the square root of its sprite's
// width times height, in art pixels). Prints every row as it should be and where config/zoo.json differs; --write puts it right.
//   node tools/zoo/order.mjs [--write]
import fs from "node:fs";
import { openBrowser, ROOT } from "../../art/headless.mjs";

const CFG = `${ROOT}/config/zoo.json`, zoo = JSON.parse(fs.readFileSync(CFG, "utf8"));
const classes = JSON.parse(fs.readFileSync(`${ROOT}/config/tuning.json`, "utf8")).population.swarm.classes;
const rank = sp => (classes.light.species.includes(sp) ? 0 : classes.strong.species.includes(sp) ? 2 : 1);
const b = await openBrowser();
await b.page.goto(b.base + "/art/headless-blank.html");
const sizes = await b.page.evaluate(async () => {
  const G = await import("/art/generator.js"), st = G.defaultStyle(), out = {};
  for (const A of G.AREAS) { const s = G.critter(A.creature, 2, 0, st); out[A.id] = { creature: A.creature, size: Math.round(Math.sqrt(s.w * s.h)) }; }
  return out;
});
let differs = 0;
for (const row of zoo.rows) {
  const want = [...row.areas].sort((p, q) => rank(sizes[p].creature) - rank(sizes[q].creature) || sizes[p].size - sizes[q].size);
  const same = want.every((a, i) => a === row.areas[i]);
  if (!same) differs++;
  console.log(`${same ? "  " : "≠ "}${row.name.padEnd(24)} ${want.map(a => `${sizes[a].creature} (${"LMS"[rank(sizes[a].creature)]} ${sizes[a].size})`).join(", ")}`);
  if (process.argv.includes("--write")) row.areas = want;
}
const unlisted = Object.keys(sizes).filter(a => !zoo.rows.some(r => r.areas.includes(a)));
if (unlisted.length) console.log(`not in any row: ${unlisted.join(", ")} (add each to its biome's row in config/zoo.json)`);
if (process.argv.includes("--write") && differs) {
  const json = JSON.stringify(zoo, null, 1).replace(/\[\s+("[^\]]*?")\s+\]/g, (m, inner) => `[${inner.replace(/\s+/g, " ")}]`).replace(/\{\s+"babies"[^}]*\}/g, m => m.replace(/\s+/g, " "));
  fs.writeFileSync(CFG, json + "\n");
  console.log(`config/zoo.json: ${differs} row(s) put in order`);
}
process.exit(0);
