// A digest of every frame a mesh kind is drawn as, to prove a change left the pictures alone (docs/plans/creature-mesh-rollout.md,
// step 0: "No change in what is drawn (prove it: every frame of the eleven identical before and after)"; a batch uses it to show
// it changed no other batch's kinds). For each kind: its walk at each level, towards and away (every frame's colour, normals,
// mirrored normals, eyes and head point, with the sprite's size and step), its naps at each level, its sleeping legend, its
// baby in party gear, and its gait as the view gets it; one SHA-256 for each of those.
//   node tools/creature-mesh/frames.mjs --out before.json [kind...]        every kind with a mesh, or those named
//   node tools/creature-mesh/frames.mjs --compare before.json [kind...]    fails, naming each picture that differs
//     --tree <dir>   read art/mesh from another checkout (a worktree of the commit before), not this one
//     --levels 0,1,2 leave the legends out (they are most of the time: a minute or two each)
import { createHash } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const args = process.argv.slice(2), flag = name => { const i = args.indexOf(name); if (i < 0) return undefined; const v = args[i + 1]; args.splice(i, 2); return v; };
const out = flag("--out"), compare = flag("--compare"), tree = path.resolve(flag("--tree") ?? path.join(path.dirname(fileURLToPath(import.meta.url)), "../..")), levels = (flag("--levels") ?? "0,1,2,3").split(",").map(Number);
const M = await import(pathToFileURL(path.join(tree, "art/mesh/index.js")).href), kinds = args.length ? args : Object.keys(M.MESH_HEIGHTS).sort();

/** One digest of a drawn set: bakeMesh's { w, h, step, towards, away }. */
function digest(b) {
  const h = createHash("sha256"); h.update(JSON.stringify([b.w, b.h, b.step ?? null, b.ppu ?? null]));
  for (const facing of ["towards", "away"]) for (const f of b[facing] ?? []) { h.update(facing); h.update(f.albedo); h.update(f.normal); h.update(f.flipped); h.update(f.eyes ?? new Uint8Array(0)); h.update(JSON.stringify(f.head ?? null)); }
  return h.digest("hex").slice(0, 24);
}
const got = {};
for (const kind of kinds) {
  const t0 = Date.now(), k = (got[kind] = {});
  for (const l of levels) { k[`walk ${l}`] = digest(M.meshWalk(kind, l)); k[`nap ${l}`] = digest(M.meshNap(kind, l)); }
  if (levels.includes(3)) k.sleep = digest(M.meshSleep(kind));
  k["party baby"] = digest(M.meshWalk(kind, 0, { collar: [60, 255, 200], hat: 1, glasses: "bar", shoes: "sneakers" }));
  k.gait = createHash("sha256").update(JSON.stringify(M.meshGait(kind))).digest("hex").slice(0, 24);
  k.heights = M.MESH_HEIGHTS[kind].join(",");
  console.error(`${kind}: ${Object.keys(k).length} digests (${((Date.now() - t0) / 1000).toFixed(0)} s)`);
}
if (out) { fs.mkdirSync(path.dirname(path.resolve(out)), { recursive: true }); fs.writeFileSync(out, JSON.stringify(got, null, 1) + "\n"); console.log(`${out}: ${kinds.length} kinds`); }
if (compare) {
  const was = JSON.parse(fs.readFileSync(compare, "utf8")), bad = [];
  for (const kind of kinds) for (const key of new Set([...Object.keys(was[kind] ?? {}), ...Object.keys(got[kind])])) { if (!levels.includes(3) && (/ 3$/.test(key) || key === "sleep")) continue; if (was[kind]?.[key] !== got[kind][key]) bad.push(`${kind}: ${key}`); }
  if (bad.length) { console.error(`differ from ${compare}:\n  ${bad.join("\n  ")}`); process.exit(1); }
  console.log(`identical to ${compare}: ${kinds.length} kinds, ${kinds.reduce((n, kind) => n + Object.keys(got[kind]).length, 0)} digests`);
}
if (!out && !compare) console.log(JSON.stringify(got, null, 1));
