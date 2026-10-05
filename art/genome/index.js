// Witch creature genomes (#79): the species records (species.js) and their templates
// (templates.js), turned into what the builders draw from (speciesOf), checked (genomeProblems),
// and hashed for the bake cache (genomeHash).
import { M } from "../core.js";
import { GENOMES } from "./species.js";
import { TEMPLATES, TEMPLATE_IDS } from "./templates.js";
export { GENOMES, TEMPLATES, TEMPLATE_IDS };
export const GENOME_BY_ID = Object.fromEntries(GENOMES.map(g => [g.id, g]));

// The builder's species object, as art/creatures.js always had it: id, name, plan, hue, sat, val,
// belly, legend, sizes (its template's size curves, any of the species' own over them), and for
// the four-legged q (their proportions and parts in one bag).
export function speciesOf(g) {
  const S = { id: g.id, name: g.name, plan: g.builder, hue: g.palette.hue, sat: g.palette.sat, val: g.palette.val, legend: g.legend || [] };
  if (g.palette.belly) S.belly = g.palette.belly;
  if (g.palette.over) S.over = g.palette.over; // a material's own colour (an art set's), over the ramp
  if (g.form) S.form = g.form;
  if (g.sleep) S.sleep = g.sleep; // its sleeping legend's pose and colours, over its own (art/legends.js; an art set's) // the builder's own shape numbers (art/creatures3d.js, formOf)
  if (g.template === "quadruped") {
    const q = { ...g.body, ...g.head, ...g.coat }, p = g.parts || {};
    if (q.legMat) q.legMat = M[q.legMat];
    if (p.ears) { q.ear = p.ears.kind; if (p.ears.size !== undefined) q.earS = p.ears.size; }
    for (const [k, to] of [["tail", "tail"], ["feet", "paw"], ["horns", "horns"], ["antlers", "antlers"], ["tusks", "tusks"]]) if (p[k] !== undefined) q[to] = p[k];
    S.q = q;
  }
  S.sizes = { ...TEMPLATES[g.template].sizes, ...g.sizes };
  return S;
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
  for (const t of tags) if (!allowed.includes(t)) out.push(`${g.id}: ${t} isn't one of ${g.template}'s parts`);
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
