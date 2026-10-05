// Fingerprints of every tree and bush the flora draws (art/check.mjs and the data-wrap's proof): each species' tree over a few seeds,
// two sizes and the area options that change its shape, and the bushes; a hash of each sprite's materials, normals, crown line and the
// pixels its life below the crown put there. node art/flora/fingerprint.mjs [out.json] writes them; check.mjs compares with flora/baseline.json.
import { writeFileSync } from "node:fs";
import { rng } from "../core.js";
import { TREE_SPECIES, bush } from "../trees.js";
import { defaultStyle } from "../generator.js";

const fnv = (h, v) => Math.imul(h ^ v, 16777619) >>> 0;
export function spriteHash(t) {
  const sp = t.sp || t; let h = 2166136261;
  h = fnv(h, sp.w); h = fnv(h, sp.h); h = fnv(h, Math.round((t.crownY ?? -1) * 100));
  for (let i = 0; i < sp.m.length; i++) h = fnv(h, sp.m[i]);
  for (let i = 0; i < sp.n.length; i++) h = fnv(h, Math.round(sp.n[i] * 1000) & 0xffff);
  if (sp.low) for (let i = 0; i < sp.low.length; i++) h = fnv(h, sp.low[i]);
  return h.toString(16);
}
export const AREA_OPTIONS = [{}, { treeTrunks: 3 }, { treeBare: 1 }, { treeHollow: 1, treeWebs: 1 }, { treeLean: .3, treeThick: 1.4 }, { treeThin: 1 }];
export function fingerprints(trees = TREE_SPECIES, bushFn = bush) {
  const st = defaultStyle(), K = 2 / (st.pixel || 2), out = {};
  for (const [id, S] of Object.entries(trees)) for (const [o, opt] of AREA_OPTIONS.entries()) for (const seed of [1, 2, 3]) for (const size of [1, .45]) {
    const t = S.fn(rng(seed * 7919 + o * 31), { ...st, ...opt }, st.treeSize * K * size);
    out[`${id}/${o}/${seed}/${size}`] = spriteHash(t);
  }
  for (let seed = 0; seed < 16; seed++) out[`bush/${seed}`] = spriteHash(bushFn(rng(seed * 104729), { ...st, bushSize: st.bushSize * K }).sp);
  return out;
}
if (import.meta.url === `file://${process.argv[1]}`) {
  const f = fingerprints(); writeFileSync(process.argv[2] || "art/flora/baseline.json", JSON.stringify(f, null, 0).replace(/,"/g, ',\n"'));
  console.log(Object.keys(f).length, "fingerprints");
}
