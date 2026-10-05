// Compares every creature sprite (species x level x frame x facing, plain, in gear and woken) drawn by
// the old generator (the worktree) and the new: materials, normals and groups, pixel for pixel.
// node tools/genome/compare.mjs <dir of a checkout of the old art> : every creature sprite the old art and this draw, compared.
const BEFORE = process.argv[2]; if (!BEFORE) { console.log("usage: node tools/genome/compare.mjs <old checkout dir>"); process.exit(2); }
const [O, N] = await Promise.all([import(BEFORE.replace(/\/$/, "") + "/art/generator.js"), import(new URL("../../art/generator.js", import.meta.url))]);
const st = N.defaultStyle();
let n = 0, bad = 0;
const gears = [null, { collar: [255, 0, 200], hat: 1, glasses: "star", shoes: "glitter" }, { woken: true }];
for (const s of O.SPECIES) for (let level = 0; level < 4; level++) for (const frame of [0, 1]) for (const facing of ["towards", "away"]) for (const gear of gears) {
  const a = O.critter(s.id, level, frame, st, facing, gear), b = N.critter(s.id, level, frame, st, facing, gear);
  n++;
  const same = a.w === b.w && a.h === b.h && a.m.every((v, i) => v === b.m[i]) && a.n.every((v, i) => v === b.n[i]) && a.g.every((v, i) => v === b.g[i]);
  if (!same) { bad++; let d = 0; if (a.w === b.w && a.h === b.h) for (let i = 0; i < a.m.length; i++) if (a.m[i] !== b.m[i]) d++; console.log("DIFF", s.id, level, frame, facing, gear ? Object.keys(gear).join("+") : "", `${a.w}x${a.h} vs ${b.w}x${b.h}`, d, "px"); }
  const ca = O.speciesColours(s.id, st, gear), cb = N.speciesColours(s.id, st, gear);
  if (JSON.stringify(ca) !== JSON.stringify(cb)) { bad++; console.log("COLOURS", s.id); }
}
for (const id of O.LEGEND_IDS) for (const frame of [0, 1]) for (const facing of ["towards", "away"]) {
  const a = O.legendForm(id, st, { frame, facing }).sp, b = N.legendForm(id, st, { frame, facing }).sp; n++;
  if (!(a.w === b.w && a.h === b.h && a.m.every((v, i) => v === b.m[i]) && a.n.every((v, i) => v === b.n[i]))) { bad++; console.log("DIFF legend", id, frame, facing); }
}
console.log(`${n} sprites compared, ${bad} differ`);
process.exit(bad ? 1 : 0);
