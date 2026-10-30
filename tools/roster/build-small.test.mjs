// Cloud-only CPU sprite construction regression; no local render batch.
import assert from "node:assert/strict";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { createRosterVariants } from "../../art/roster/presets.js";
const sha = process.argv[2];
assert.match(sha || "", /^[0-9a-f]{40}$/);
const root = resolve("previews", `roster-model-${sha}`, "art");
const G = await import(pathToFileURL(resolve(root, "generator.js")));
const C = await import(pathToFileURL(resolve(root, "creatures.js")));
const B = await import(pathToFileURL(resolve(root, "creatures3d.js")));
const pack = createRosterVariants(G.GENOMES), context = id => ({ creatureModels: `${id}:roster`, creatureVariants: pack });
const st = { ...G.defaultStyle(), artStyle: "bold", pixel: 3 };
let count = 0;
for (let level = 0; level < 4; level++) {
  const s = G.speciesOf(G.GENOME_BY_ID.meerkat, context("meerkat"), level);
  const q = { ...s.q, ...s.levelQ?.[level] };
  assert.ok(Number.isFinite(q.eyePatchPx) && q.eyePatchPx >= 0, `meerkat level ${level} patch`);
  for (const pose of ["walk", "idle"]) for (const facing of ["towards", "away"]) for (const frame of [0, 1]) {
    const sprite = B.withTexture({ S: s, level, st }, () => pose === "idle" ? C.IDLE_BUILDERS[s.idle](s, level, frame, st, facing) : C.buildCreature(s, level, frame, st, facing));
    assert.ok(sprite.w > 0 && sprite.h > 0 && sprite.m.some(Boolean)); count++;
  }
}
for (let level = 0; level < 3; level++) {
  const s = G.speciesOf(G.GENOME_BY_ID.mole, context("mole"), level);
  assert.ok(Object.values(s.look.mole).every(v => Number.isFinite(v) && v > 0 && v !== 1));
  const build = S => B.withTexture({ S, level, st }, () => C.buildCreature(S, level, 0, st, "towards"));
  const a = build(G.speciesOf(G.GENOME_BY_ID.mole, {}, level)), b = build(s);
  assert.ok(a.w !== b.w || a.h !== b.h || a.m.some((v, i) => v !== b.m[i]) || a.n.some((v, i) => v !== b.n[i]), `mole level ${level} construction changes`);
  console.log(`mole L${level}: Current ${a.w}x${a.h}, candidate ${b.w}x${b.h}, construction differs`);
}
for (const level of [2, 3]) {
  const s = G.speciesOf(G.GENOME_BY_ID.flyingsquirrel, context("flyingsquirrel"), level);
  assert.ok(s.levelFeatures[level].find(f => f.kind === "patagium").groundSkirt > 0);
  const without = structuredClone(s);
  without.levelFeatures[level].find(f => f.kind === "patagium").groundSkirt = 0;
  const build = S => B.withTexture({ S, level, st }, () => C.buildCreature(S, level, 0, st, "towards"));
  const a = build(without), b = build(s);
  const differs = a.w !== b.w || a.h !== b.h || a.m.some((v, i) => v !== b.m[i]) || a.n.some((v, i) => v !== b.n[i]);
  console.log(`groundSkirt isolation L${level}: ${differs ? "construction changes; visual visibility still requires review" : "IDENTICAL construction, shared control defect"}`);
}
console.log(`PASS: ${count} meerkat level/pose/frame/facing builds; mole controls and groundSkirt resolved`);
