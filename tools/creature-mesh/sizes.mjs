// Today's drawn height of a kind at each level, with meshes off: what its mesh is to stand (Ed, 2026-11-12: "keep the sizes";
// docs/plans/creature-mesh-rollout.md, step 0). The generated creature (art/creatures.js `critter`, first walk frame, turned
// towards us) is drawn at each level, baby to legend, and its drawn rows counted: its topmost pixel to its lowest, in art pixels
// (its sprite is a few rows taller: empty rows above it). Pure Node, no browser.
//   node tools/creature-mesh/sizes.mjs wolf lynx      one line a kind, and the `heights` line for its art/mesh/species/<id>.js
//   node tools/creature-mesh/sizes.mjs --all          every kind in the roster
//   node tools/creature-mesh/sizes.mjs --json wolf    as JSON: { wolf: { drawn: [..4], sprite: [[w, h] x 4] } }
import { fileURLToPath } from "node:url";
import { critter, defaultStyle } from "../../art/generator.js";
import { GENOME_BY_ID } from "../../art/genome/index.js";

/** How many rows of a generated sprite are drawn on: its topmost pixel to its lowest. */
export function drawnHeight(sp) {
  let top = sp.h, bottom = -1;
  for (let i = 0; i < sp.m.length; i++) if (sp.m[i]) { const y = Math.floor(i / sp.w); if (y < top) top = y; if (y > bottom) bottom = y; }
  return bottom < 0 ? 0 : bottom - top + 1;
}

/** A kind's generated creature measured at each level: { drawn: [baby, young, adult, legend], sprite: [[w, h], ...] }. */
export function todaysSizes(kind, st = { ...defaultStyle(), meshCreatures: 0 }) {
  const sprites = [0, 1, 2, 3].map(level => critter(kind, level, 0, st, "towards"));
  return { drawn: sprites.map(drawnHeight), sprite: sprites.map(sp => [sp.w, sp.h]) };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2), json = args.includes("--json"), kinds = args.includes("--all") ? Object.keys(GENOME_BY_ID).sort() : args.filter(a => !a.startsWith("--"));
  if (!kinds.length) { console.error("usage: node tools/creature-mesh/sizes.mjs <kind>... | --all [--json]"); process.exit(2); }
  const unknown = kinds.filter(k => !GENOME_BY_ID[k]); if (unknown.length) { console.error(`no such kind: ${unknown.join(", ")}`); process.exit(2); }
  const got = Object.fromEntries(kinds.map(k => [k, todaysSizes(k)]));
  if (json) console.log(JSON.stringify(got, null, 1));
  else for (const [k, s] of Object.entries(got)) console.log(`${k.padEnd(16)} baby ${s.drawn[0]}, young ${s.drawn[1]}, adult ${s.drawn[2]}, legend ${s.drawn[3]}   ->   heights: [${s.drawn.join(", ")}]`);
}
