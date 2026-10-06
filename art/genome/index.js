// Witch creature genomes (#79): the species records (species.js) and their templates
// (templates.js), turned into what the builders draw from (speciesOf), checked (genomeProblems),
// and hashed for the bake cache (genomeHash).
import { M } from "../core.js";
import { GENOMES } from "./species.js";
import { TEMPLATES, TEMPLATE_IDS } from "./templates.js";
import { faceProblems } from "./expressions.js";
import { textureProblems } from "./texture.js";
export { GENOMES, TEMPLATES, TEMPLATE_IDS };
export const GENOME_BY_ID = Object.fromEntries(GENOMES.map(g => [g.id, g]));

// The builder's species object, as art/creatures.js always had it: id, name, plan, hue, sat, val,
// belly, legend, sizes (its template's size curves, any of the species' own over them), and for
// the four-legged q (their proportions and parts in one bag).
export function speciesOf(g) {
  const S = { id: g.id, name: g.name, plan: g.builder, hue: g.palette.hue, sat: g.palette.sat, val: g.palette.val, legend: g.legend || [] };
  if (g.palette.belly) S.belly = g.palette.belly;
  if (g.palette.flower) S.flower = g.palette.flower; // its flowers' and berries' colour (the evolution kit's moss and brambles)
  if (g.template === "quadruped") {
    const q = { ...g.body, ...g.head, ...g.coat }, p = g.parts || {};
    if (q.legMat) q.legMat = M[q.legMat];
    if (p.ears) { q.ear = p.ears.kind; if (p.ears.size !== undefined) q.earS = p.ears.size; }
    for (const [k, to] of [["tail", "tail"], ["feet", "paw"], ["horns", "horns"], ["antlers", "antlers"], ["tusks", "tusks"]]) if (p[k] !== undefined) q[to] = p[k];
    S.q = q;
  }
  S.sizes = { ...TEMPLATES[g.template].sizes, ...g.sizes };
  S.face = { ...TEMPLATES[g.template].face, ...g.face }; // its expressions' shapes (expressions.js)
  S.texture = { ...TEMPLATES[g.template].texture, ...g.texture }; // its surface: fur, feathers, scales... (texture.js)
  // its evolution (the evolution kit): each level's own proportions, parts and features, over its own
  // levels: { 0..3: { body, head, coat, parts, features } } (or an array of four, any null) — what changes at a level beyond its
  // size curves (docs/art-guide/EVOLUTIONS.md, #121's convention): merged over the species' own for that level only (S.levelQ),
  // and its own parts (S.levelFeatures: evolve3d's manes, wisps...).
  if (g.levels) {
    const L = Object.entries(g.levels).filter(([, l]) => l);
    S.levelQ = Object.fromEntries(L.map(([lv, l]) => [lv, levelQ(l)]));
    S.levelFeatures = Object.fromEntries(L.map(([lv, l]) => [lv, (l.features || []).filter(f => typeof f === "object")]));
  }
  return S;
}

// The evolution kit's features (creatures3d.js evolve3d).
export const GENOME_FEATURE_KINDS = ["mane", "wisps", "eyeglint", "stones", "claws", "moss", "tails", "ruff", "brambles"];
// A level's overrides, in the builders' bag (as speciesOf makes q).
function levelQ(l) {
  const q = { ...l.body, ...l.head, ...l.coat }, p = l.parts || {};
  if (typeof q.legMat === "string") q.legMat = M[q.legMat];
  if (p.ears) { q.ear = p.ears.kind; if (p.ears.size !== undefined) q.earS = p.ears.size; }
  for (const [k, to] of [["tail", "tail"], ["feet", "paw"], ["horns", "horns"], ["antlers", "antlers"], ["tusks", "tusks"]]) if (p[k] !== undefined) q[to] = p[k];
  return q;
}

// The tags a record's parts carry ("ear.point", "tail.brush", "foot.hoof", "antler.palm"...).
export function genomeTags(g) {
  const p = g.parts || {}, t = [];
  if (p.ears) t.push("ear." + p.ears.kind);
  if (p.tail) t.push("tail." + p.tail);
  if (p.feet) t.push("foot." + p.feet);
  if (p.horns) t.push("horn." + p.horns);
  if (p.antlers) t.push("antler." + p.antlers);
  if (p.tusks) t.push("tusk");
  return t;
}
const genomeTagMatch = (pat, tag) => pat.endsWith(".*") ? tag.startsWith(pat.slice(0, -1)) : pat === tag;

// What's wrong with a record, if anything: an unknown template or builder, a part its template's
// sockets don't allow, two parts that exclude each other, a palette out of range.
export function genomeProblems(g) {
  const out = [], T = TEMPLATES[g.template];
  if (!T) return [`${g.id}: no template ${g.template}`];
  if (!T.builders.includes(g.builder)) out.push(`${g.id}: ${g.template} has no builder ${g.builder}`);
  const allowed = Object.values(T.sockets).flat(), tags = genomeTags(g);
  out.push(...faceProblems(g.id, { ...T.face, ...g.face }), ...textureProblems(g.id, { ...T.texture, ...g.texture }));
  if (g.levels) { if (Object.keys(g.levels).some(k => !["0", "1", "2", "3"].includes(k))) out.push(`${g.id}: levels are 0 to 3 (baby, young, adult, legend)`); for (const l of Object.values(g.levels)) for (const f of l?.features || []) if (typeof f === "object" && !GENOME_FEATURE_KINDS.includes(f.kind)) out.push(`${g.id}: no evolution feature ${f.kind}`); }
  for (const t of tags) if (!allowed.includes(t)) out.push(`${g.id}: ${t} isn't one of ${g.template}'s parts`);
  for (const [lv, l] of Object.entries(g.levels || {})) for (const t of l?.parts ? genomeTags({ parts: l.parts }) : []) if (!allowed.includes(t)) out.push(`${g.id}: level ${lv}'s ${t} isn't one of ${g.template}'s parts`);
  for (const [a, b] of T.exclude) if (tags.some(t => genomeTagMatch(a, t)) && tags.some(t => genomeTagMatch(b, t))) out.push(`${g.id}: ${a} and ${b} together`);
  for (const k of ["hue", "sat", "val"]) if (!(g.palette[k] >= 0 && g.palette[k] <= 1)) out.push(`${g.id}: palette ${k} ${g.palette[k]}`);
  return out;
}

// A record's hash (FNV-1a over its canonical JSON, keys sorted): the bake cache's key (#79 stage 4),
// with the style's own version beside it.
const genomeCanon = v => Array.isArray(v) ? "[" + v.map(genomeCanon).join(",") + "]" : v && typeof v === "object" ? "{" + Object.keys(v).sort().filter(k => v[k] !== undefined).map(k => JSON.stringify(k) + ":" + genomeCanon(v[k])).join(",") + "}" : JSON.stringify(v);
export function genomeHash(g) {
  let h = 0x811c9dc5;
  const s = genomeCanon(g);
  for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 0x01000193); }
  return (h >>> 0).toString(16).padStart(8, "0");
}
