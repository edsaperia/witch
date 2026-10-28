// The tuning file's notes into data (Ed, 2026-10-28: "Let's do all the docs work. Reformat prose into data where you can"). Until
// then config/tuning.json carried its own reference as `_` notes: 136 strings, about 196 KB of its 235, each mixing what knobs do,
// Ed's decisions with their dates and quotes, and history. This reads a tuning file with notes and writes:
//   config/knobs/<section>.json   per knob path: what (the prose, its decisions lifted out), decisions [{ by, date, quote, rest }],
//                                 also (other knobs a clause names with it), links (files it names); the section's own note as about
//   config/knobs/index.json       the file's own notes (readme, sections) and the sections in order
//   config/tuning.json            the values only, every note gone, the values and their order untouched
// and checks nothing was lost: every date, every quoted string and every word of the old notes is somewhere in the new data.
//   node tools/config/knob-docs.mjs [--from <tuning.json with notes>] [--dry]
// Re-runnable on a fresher tuning file (another builder's notes): it rebuilds config/knobs from scratch, so run it on a file that
// still has its notes (git show origin/claude/prototype:config/tuning.json > /tmp/t.json; --from /tmp/t.json). Then
// `node tools/config/schema.mjs --add --docs` for the schema's descriptions and config/KNOBS.md.
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from "node:fs";

const arg = k => { const i = process.argv.indexOf(k); return i >= 0 ? process.argv[i + 1] : null; };
const FROM = arg("--from") ?? "config/tuning.json", DRY = process.argv.includes("--dry");
const OUT = "config/knobs", TUNING = "config/tuning.json";
const raw = readFileSync(FROM, "utf8");
const T = JSON.parse(raw);
if (!Object.keys(T).some(k => k.startsWith("_"))) { console.error(`${FROM} has no notes: nothing to convert (run it on a tuning file that still has them, --from)`); process.exit(1); }

// ---- the knobs: every path in the file (arrays' items aren't paths)
const isObj = v => v && typeof v === "object" && !Array.isArray(v);
const paths = new Set();
(function walk(o, p) { for (const [k, v] of Object.entries(o)) { if (k.startsWith("_")) continue; const q = p ? `${p}.${k}` : k; paths.add(q); if (isObj(v)) walk(v, q); } })(T, "");
const childrenOf = p => [...paths].filter(q => q.startsWith(p + ".") && !q.slice(p.length + 1).includes("."));

// ---- the notes: in file order, each with the section it's in and the knobs it's about (its home)
const keys = Object.keys(T);
const notes = []; // { key, text, section, home: [top-level keys], target: path the note's opening is about }
let section = null;
const sections = [];
const sectionAbout = {};
const fileNotes = {};
for (let i = 0; i < keys.length; i++) {
  const k = keys[i];
  if (k.startsWith("__")) { section = k.slice(2); sections.push(section); sectionAbout[section] = T[k]; continue; }
  if (!k.startsWith("_")) continue;
  if (k === "_readme" || k === "_sections") { fileNotes[k.slice(1)] = T[k]; continue; }
  const name = k.slice(1);
  // its home: the key it names; else the knobs after it up to the next note, passing over notes straight after it (a run of
  // notes before one knob: _witchLight, _knock, witch)
  let home = [];
  if (name in T) home = [name];
  else {
    let j = i + 1;
    while (j < keys.length && keys[j].startsWith("_") && !keys[j].startsWith("__") && !(keys[j].slice(1) in T)) j++;
    if (j < keys.length && keys[j].startsWith("_") && !keys[j].startsWith("__")) j++; // (a note that names its own knob: that knob)
    for (; j < keys.length && !keys[j].startsWith("_"); j++) if (!(`_${keys[j]}` in T)) home.push(keys[j]); else if (!home.length) home.push(keys[j]);
  }
  notes.push({ key: k, text: T[k], section, home, target: targetOf(name, home) });
}
// (a nested note: chart._sailHold, wisps._)
(function walk(o, p) {
  for (const [k, v] of Object.entries(o)) {
    if (!p) { if (isObj(v) && !k.startsWith("_")) walk(v, k); continue; }
    if (k.startsWith("_") && typeof v === "string") notes.push({ key: `${p}.${k}`, text: v, section: sectionOf(p.split(".")[0]), home: [p.split(".")[0]], target: k === "_" ? p : (paths.has(`${p}.${k.slice(1)}`) ? `${p}.${k.slice(1)}` : p) });
    else if (isObj(v)) walk(v, `${p}.${k}`);
  }
})(T, "");
function sectionOf(top) { let s = null; for (const k of keys) { if (k.startsWith("__")) s = k.slice(2); if (k === top) return s; } return s; }

/** The path a note's opening is about: its own knob; else a path under its home the note's name says (knock: witch.knock; hills:
 *  ground.hills; mapShape: map.shape); else its home's first knob. */
function targetOf(name, home) {
  if (paths.has(name)) return name;
  const dotted = name.replace(/([a-z0-9])([A-Z])/g, "$1.$2").replace(/\.([A-Z])/g, (_, c) => "." + c.toLowerCase());
  if (paths.has(dotted)) return dotted;
  for (const h of home) { const p = `${h}.${name}`; if (paths.has(p)) return p; }
  const ends = [...paths].filter(p => p.endsWith(`.${name}`));
  if (ends.length === 1) return ends[0];
  return home[0] ?? null;
}

// ---- prose helpers: balanced brackets and quotes
/** Spans of top-level parentheses in `s` (ignoring any inside double quotes): [start, end] with s[start] "(" and s[end] ")". */
function parens(s) {
  const out = []; let depth = 0, start = -1, q = false;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === '"') q = !q;
    if (q) continue;
    if (c === "(") { if (depth++ === 0) start = i; }
    else if (c === ")" && depth > 0) { if (--depth === 0) out.push([start, i]); }
  }
  return out;
}
const DATE = /\b\d{4}-\d{2}-\d{2}\b/g;
const DQUOTE = /"([^"]*)"/g;
// single-quoted quotes ('...' after a colon or a comma, ending at punctuation): the odd note quotes that way
const SQUOTE = /(?<=[:,]\s)'([^']{2,}?)'(?=[,;.)\s]|$)/g;
const quotesIn = s => [...s.matchAll(DQUOTE)].map(m => m[1]).concat([...s.matchAll(SQUOTE)].map(m => m[1]));
/** A parenthesis that's a decision: a date in it, or a quote with someone's name. */
const isDecision = c => /\b\d{4}-\d{2}-\d{2}\b/.test(c) || ((/"/.test(c) || SQUOTE.test(c)) && /^(Ed|the coordinator|[A-Z][a-z]+'s|[A-Z][a-z]+,)/.test(c.trim()));
const BY = /(?<![\w'])((?:Ed|the coordinator|Alpha|Bravo|Charlie|Delta|Echo|Foxtrot|Golf|Hotel|India|Juliet)(?:'s (?:[a-z]+ ){0,2}?(?:[a-z]+|[A-Z0-9][\w]*))?)(?:,? (?=\d{4}-\d{2}-\d{2})|,\s*|(?=:)|$)/;
const PROSE = /(?<![\w'(])(Ed(?:'s (?:[a-z]+ ){0,2}?[a-z]+)?|the coordinator),? (\d{4}-\d{2}-\d{2})(?:, ([^:".;()]{1,60}))?: ?/g;
const FILE = /(?<![\w/])((?:[\w.-]+\/)+[\w.-]+\.(?:ts|js|json|md|mjs|cjs|glsl|html))\b/g;

/** One decision's parts from a parenthesis's content: split at semicolons outside quotes into one per date (a part without
 *  a date or a quote rides with the one before). */
function decisionsOf(c) {
  const parts = []; let q = false, last = 0;
  for (let i = 0; i < c.length; i++) { if (c[i] === '"') q = !q; else if (!q && c[i] === ";" ) { parts.push(c.slice(last, i)); last = i + 1; } }
  parts.push(c.slice(last));
  const out = [];
  let lead = null; // (words before the first dated part: they go with it)
  for (const part of parts.map(p => p.trim()).filter(Boolean)) {
    const hasDate = /\b\d{4}-\d{2}-\d{2}\b/.test(part), quotes = quotesIn(part);
    if (!hasDate && !quotes.length) { if (out.length) out[out.length - 1].rest = [out[out.length - 1].rest, part].filter(Boolean).join("; "); else lead = lead ? `${lead}; ${part}` : part; continue; }
    const date = (part.match(DATE) ?? [])[0] ?? null;
    let rest = part;
    for (const qt of quotes) rest = rest.replace(`"${qt}"`, "\u0000").replace(`'${qt}'`, "\u0000");
    // who: an attribution (Ed, Ed's playtest, Ed's pick B, the coordinator, a builder's review) just before the date or a comma;
    // whatever else the parenthesis says stays in rest, word for word
    let by = null;
    const who = rest.match(BY);
    if (who) { by = who[1]; rest = rest.slice(0, who.index) + rest.slice(who.index + who[0].length); }
    if (date) rest = rest.replace(new RegExp(`\\s*,?\\s*${date}\\s*(:\\s*)?`), (_, colon) => (colon ? ": " : " "));
    rest = tidy(rest.replace(/\u0000/g, " ")).replace(/^[\s,:;]+|[\s,:;]+$/g, "");
    const d = { by, date };
    if (quotes.length === 1) d.quote = quotes[0]; else if (quotes.length) d.quote = quotes;
    if (lead) { rest = rest ? `${lead}; ${rest}` : lead; lead = null; }
    if (rest) d.rest = rest;
    out.push(d);
  }
  return out;
}
/** Spaces and stray punctuation left where a decision came out, mended outside quotes only (a quote is kept exactly). */
const tidy = s => s.split(/("[^"]*")/).map((part, i) => i % 2 ? part : part.replace(/\s{2,}/g, " ").replace(/\s+([,.;:)])(?=[\s,.;:)]|$)/g, "$1").replace(/\(\s+/g, "(").replace(/[,;]\s*([.;)])/g, "$1").replace(/\(\)/g, "").replace(/\s{2,}/g, " ")).join("").trim();

/** A clause cut from a run of them ends as a sentence: its trailing ";" or "," a full stop. */
const sentence = t => t.replace(/[;,]\s*$/, ".");

// ---- splitting a note into its knobs: a clause (the note's start, or after ". " or "; ") that opens with a knob's name and then
// " (" or ":" (or a gloss of up to three words and then "(": "weight, sigil weight (") is that knob's (a list of them, "sigilGlyph and sigilHalo (", the first's, the others its also)
/** The path a name at a clause's start means, nearest first: under the knob just written about (and up), under the note's home,
 *  a top-level knob, a path that's unique by its last name. Null if none or it's ambiguous. */
function resolve(name, recent, home) {
  const tries = [];
  for (let p = recent; p; p = p.includes(".") ? p.slice(0, p.lastIndexOf(".")) : null) tries.push(`${p}.${name}`);
  for (const h of home) tries.push(`${h}.${name}`);
  tries.push(name);
  for (const t of tries) if (paths.has(t)) return t;
  if (name.includes(".")) return null;
  const ends = [...paths].filter(p => p.endsWith(`.${name}`) && home.some(h => p.startsWith(h + ".")));
  return ends.length === 1 ? ends[0] : null;
}
const NAME = /^([a-z][A-Za-z0-9]*(?:\.[a-z][A-Za-z0-9]*)*)((?:(?:,| and| or) [a-z][A-Za-z0-9]*(?:\.[a-z][A-Za-z0-9]*)*)*)(?= \(|:|, (?:[a-z]+ ){1,3}\()/;

function split(note) {
  const s = note.text, segs = [];
  // clause starts outside parentheses and quotes
  const inside = new Uint8Array(s.length);
  for (const [a, b] of parens(s)) inside.fill(1, a, b + 1);
  { let q = false; for (let i = 0; i < s.length; i++) { if (s[i] === '"') q = !q; if (q) inside[i] = 1; } }
  let recent = note.target;
  const starts = [{ at: 0, path: note.target, also: [], len: 0 }];
  for (let i = 0; i < s.length; i++) {
    if (inside[i]) continue;
    if (!(i === 0 || /[.;] $/.test(s.slice(i - 2, i)))) continue;
    const m = s.slice(i).match(NAME);
    if (!m) continue;
    const path = resolve(m[1], recent, note.home);
    if (!path) continue;
    const also = (m[2] || "").split(/,| and| or/).map(x => x.trim()).filter(Boolean).map(n => resolve(n, path, note.home)).filter(Boolean);
    if (i === 0) starts[0] = { at: 0, path, also, len: m[0].length };
    else starts.push({ at: i, path, also, len: m[0].length });
    recent = path;
  }
  for (let j = 0; j < starts.length; j++) {
    const st = starts[j], end = j + 1 < starts.length ? starts[j + 1].at : s.length;
    segs.push({ path: st.path, also: st.also, text: s.slice(st.at, end).trim(), name: st.len ? s.slice(st.at, st.at + st.len) : "" });
  }
  // (the coordinator, on #1341: a general sentence goes to the note's own entry, not the knob before it: after a knob's clause,
  // a sentence that opens with a capital and names another of the note's knobs (aggro, witchLose: the note talking about its
  // knobs at large) is the note's, as its opening is, and so is every sentence after it in that clause; one that names none of
  // them goes on about the knob before it: "The cell nearest her decides ...")
  if (!note.target) return segs;
  let own = segs.find(g => g.path === note.target);
  if (!own) { own = { path: note.target, also: [], text: "", name: "" }; segs.unshift(own); }
  for (const g of segs) {
    if (g === own) continue;
    const mine = new Set([g.path, ...g.also].flatMap(p => [p.split(".").pop(), ...childrenOf(p).map(c => c.split(".").pop())]));
    const others = new Set(note.home.flatMap(h => [h, ...childrenOf(h)]).map(p => p.split(".").pop()).filter(n => !mine.has(n)));
    const [first, ...rest] = sentencesOf(g.text);
    const keep = [first], move = [];
    for (const x of rest) {
      const words = [...x.matchAll(/[A-Za-z][A-Za-z0-9]*/g)].map(w => w[0]);
      (move.length || (/^["A-Z]/.test(x) && words.some(w => others.has(w)) && !words.some(w => mine.has(w))) ? move : keep).push(x);
    }
    if (!move.length) continue;
    g.text = keep.join(" ");
    own.text = [own.text, ...move].filter(Boolean).join(" ");
  }
  return segs.filter(g => g.text);
}
/** A run of prose's sentences: split after ". " where a capital or a quote follows, outside brackets and quotes. */
function sentencesOf(s) {
  const out = []; let depth = 0, q = false, last = 0;
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === '"') q = !q;
    else if (!q && c === "(") depth++;
    else if (!q && c === ")") depth = Math.max(0, depth - 1);
    else if (!q && !depth && c === "." && s[i + 1] === " " && /["A-Z]/.test(s[i + 2] ?? "")) { out.push(s.slice(last, i + 1).trim()); last = i + 2; }
  }
  out.push(s.slice(last).trim());
  return out.filter(Boolean);
}

/** A segment's entry: its decisions lifted out of the prose, its leading name dropped (the key says it), the files it names. */
function entryOf(seg) {
  let t = seg.text;
  const decisions = [];
  // where decisions were said: bracketed ones ("(Ed, 2026-10-06: ...)") and, outside brackets, said in prose ("Ed, 2026-10-10:
  // free in the treetops ...", to the end of its clause), in the order they come
  const spans = parens(t).filter(([a, b]) => isDecision(t.slice(a + 1, b))).map(([a, b]) => ({ a, b: b + 1, ds: decisionsOf(t.slice(a + 1, b)) }));
  const inside = new Uint8Array(t.length);
  for (const [a, b] of parens(t)) inside.fill(1, a, b + 1);
  { let q = false; for (let i = 0; i < t.length; i++) { if (t[i] === '"') q = !q; if (q) inside[i] = 1; } }
  for (const m of t.matchAll(PROSE)) {
    if (inside[m.index]) continue;
    let end = m.index + m[0].length, depth = 0, q = false;
    for (; end < t.length; end++) {
      const c = t[end];
      if (c === '"') q = !q;
      else if (!q && c === "(") depth++;
      else if (!q && c === ")") { if (!depth) break; depth--; }
      else if (!q && !depth && (c === ";" || (c === "." && (end + 1 >= t.length || (t[end + 1] === " " && /["A-Z]/.test(t[end + 2] ?? "")))))) break;
    }
    const said = t.slice(m.index + m[0].length, end), quotes = quotesIn(said);
    let rest = said;
    for (const qt of quotes) rest = rest.replace(`"${qt}"`, " ");
    rest = tidy([m[3], rest].filter(Boolean).join(": ")).replace(/^[\s,:;]+|[\s,:;]+$/g, "");
    const d = { by: m[1], date: m[2] };
    if (quotes.length === 1) d.quote = quotes[0]; else if (quotes.length) d.quote = quotes;
    if (rest) d.rest = rest;
    spans.push({ a: m.index, b: end, ds: [d] });
  }
  spans.sort((x, y) => x.a - y.a);
  let out = "", last = 0;
  for (const { a, b, ds } of spans) {
    if (a < last) continue;
    const before = t.slice(last, a), marks = ds.map((_, i) => `[${decisions.length + i + 1}]`).join(""); // (where it was said: decisions[n - 1])
    // (a decision said as a sentence of its own marks the sentence before it: "strength) [2]. Less free", not "strength). [2].")
    out += /\.\s+$/.test(before) && t[b] === "." ? `${before.replace(/\.\s+$/, "")} ${marks}` : before + marks;
    last = b;
    decisions.push(...ds);
  }
  t = tidy(out + t.slice(last));
  if (seg.name && t.startsWith(seg.name)) { t = t.slice(seg.name.length).replace(/^\s*[:,]\s*/, ""); NAMED.push(seg.name); } // (the key says it; kept for the check)
  t = t.replace(/^\s*(?:\[\d+\])+\s*[:,]?\s*/, "").trim(); // (a decision straight after the name is the knob's own: no marker)
  const e = {};
  if (t) e.what = sentence(t);
  if (seg.also.length) e.also = seg.also;
  if (decisions.length) e.decisions = decisions;
  const links = [...new Set([...seg.text.matchAll(FILE)].map(m => m[1]))];
  if (links.length) e.links = links;
  return e;
}

// ---- build the data
const NAMED = []; // (the knob names dropped from the start of their clauses: the check counts them as kept)
const bySection = {};
for (const note of notes) {
  for (const seg of split(note)) {
    const path = seg.path ?? `_${note.key.replace(/^_/, "")}`;
    const knobs = (bySection[sectionOf(path.split(".")[0]) ?? note.section ?? "map"] ??= {}); // (a knob's words in its own section, whichever note said them)
    const e = entryOf(seg);
    const had = knobs[path];
    if (!had) { knobs[path] = { ...e, from: [note.key] }; continue; }
    // (a knob two notes or two clauses write about: the words joined, the decisions and links added)
    const shift = had.decisions?.length ?? 0; // (the second's markers after the first's)
    if (e.what) {
      const w = shift ? e.what.replace(/\[(\d+)\]/g, (_, n) => `[${Number(n) + shift}]`) : e.what;
      const same = (x, y) => x.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim() === y.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
      // (the coordinator, on #1341: two notes defining one knob read twice. The same words once; another note's own short
      // definition of it, said again, goes to notes; a clause of the same note, or longer words, join the what)
      if (had.what && same(had.what, w)) { /* said once */ }
      else if (had.what && !had.from.includes(note.key) && w.length < 240 && had.what.length < 240 && !/\[\d+\]/.test(w)) had.notes = had.notes ? `${had.notes} ${sentence(w)}` : sentence(w);
      else had.what = had.what ? `${sentence(had.what)} ${w}` : w;
    }
    if (!had.from.includes(note.key)) had.from.push(note.key);
    for (const k of ["also", "decisions", "links"]) if (e[k]) had[k] = [...new Set([...(had[k] ?? []), ...e[k]].map(x => JSON.stringify(x)))].map(x => JSON.parse(x));
  }
}
// every top-level knob has an entry (one no note wrote about of its own says which note's group it's in)
for (const k of keys) {
  if (k.startsWith("_")) continue;
  const sec = sectionOf(k) ?? "map";
  const knobs = (bySection[sec] ??= {});
  if (!knobs[k]) {
    const n = notes.find(n => n.home.includes(k) && !n.key.includes("."));
    const to = n ? n.target ?? n.home[0] : null;
    knobs[k] = to && to !== k ? { see: to } : {};
  }
}
// the entries in the file's order, the `from` (which old note) kept as the last field
const order = [...paths];
for (const knobs of Object.values(bySection)) for (const e of Object.values(knobs)) delete e.from; // (which old note: only for merging)
const files = {};
for (const sec of sections) {
  const knobs = bySection[sec] ?? {};
  const sorted = Object.keys(knobs).sort((a, b) => (order.indexOf(a) - order.indexOf(b)) || a.localeCompare(b));
  files[sec] = { section: sec, about: sectionAbout[sec], knobs: Object.fromEntries(sorted.map(p => [p, knobs[p]])) };
}

// ---- nothing lost: every date, every quote, every word of the old notes in the new data
const oldText = notes.map(n => n.text).concat(Object.values(sectionAbout), Object.values(fileNotes));
const newText = [];
(function walk(o) { if (typeof o === "string") newText.push(o); else if (Array.isArray(o)) o.forEach(walk); else if (o && typeof o === "object") Object.entries(o).forEach(([k, v]) => { if (k !== "from" && k !== "see" && k !== "also") walk(v); }); })([files, fileNotes]);
newText.push(...NAMED);
const bag = (arr, re) => { const m = new Map(); for (const s of arr) for (const x of s.matchAll(re)) { const v = x[1] ?? x[0]; m.set(v, (m.get(v) ?? 0) + 1); } return m; };
// (each distinct date, quote and word of the old notes must be somewhere in the new data: the same words said twice by two notes
// are kept once, rule 3)
const lost = (a, b) => [...a].filter(([k]) => !b.has(k)).map(([k, n]) => `${k} (${n} → 0)`);
const dates = [bag(oldText, DATE), bag(newText, DATE)];
const quoteBag = arr => { const m = new Map(); for (const s of arr) for (const q of quotesIn(s)) m.set(q, (m.get(q) ?? 0) + 1); return m; };
const oldQ = quoteBag(oldText);
const newQ = new Map(); { const add = q => newQ.set(q, (newQ.get(q) ?? 0) + 1); (function walk(o, key) { if (typeof o === "string") { if (key === "quote") add(o); else quotesIn(o).forEach(add); } else if (Array.isArray(o)) o.forEach(x => walk(x, key)); else if (o && typeof o === "object") Object.entries(o).forEach(([k, v]) => walk(v, k)); })([files, fileNotes]); }
const WORD = /[A-Za-z0-9][A-Za-z0-9'’.-]*[A-Za-z0-9]|[A-Za-z0-9]/g;
const words = [bag(oldText, WORD), bag(newText, WORD)];
const problems = [...lost(dates[0], dates[1]).map(x => `date ${x}`), ...lost(oldQ, newQ).map(x => `quote "${x}"`), ...lost(words[0], words[1]).map(x => `word ${x}`)];
const sum = m => [...m.values()].reduce((a, b) => a + b, 0);
console.log(`notes ${notes.length} (and ${sections.length} sections' and the file's own) → ${Object.values(files).reduce((a, f) => a + Object.keys(f.knobs).length, 0)} entries in ${sections.length} files`);
console.log(`dates ${sum(dates[0])} → ${sum(dates[1])}; quotes ${sum(oldQ)} → ${sum(newQ)}; words ${sum(words[0])} → ${sum(words[1])}`);
if (problems.length) { console.error(`LOST from the old notes:\n  ${problems.slice(0, 40).join("\n  ")}${problems.length > 40 ? `\n  … ${problems.length - 40} more` : ""}`); process.exit(1); }

// ---- write
const strip = v => Array.isArray(v) ? v.map(strip) : isObj(v) ? Object.fromEntries(Object.entries(v).filter(([k]) => !k.startsWith("_")).map(([k, x]) => [k, strip(x)])) : v;
const values = strip(T);
if (JSON.stringify(strip(JSON.parse(raw))) !== JSON.stringify(values)) throw new Error("the values changed");
if (DRY) { console.log("(--dry: nothing written)"); process.exit(0); }
if (existsSync(OUT)) rmSync(OUT, { recursive: true });
mkdirSync(OUT, { recursive: true });
const w = (p, o) => writeFileSync(p, JSON.stringify(o, null, 2) + "\n");
w(`${OUT}/index.json`, { readme: fileNotes.readme, sections: fileNotes.sections, order: sections });
for (const [sec, f] of Object.entries(files)) w(`${OUT}/${sec}.json`, f);
// (the notes taken out of the file's text, so every other line stays as it was: a knob a line, its value compact; a note
// inside a knob's value, as chart's and wisps' are, comes out of its line)
const NOTE_STR = '"(?:[^"\\\\]|\\\\.)*"';
let text = raw.split("\n").filter(l => !new RegExp(`^\\s*"_[^"]*": ${NOTE_STR},?\\s*$`).test(l)).join("\n");
text = text.replace(new RegExp(`"_[A-Za-z]*": ${NOTE_STR},\\s*`, "g"), "").replace(new RegExp(`,\\s*"_[A-Za-z]*": ${NOTE_STR}(?=\\s*})`, "g"), "");
text = text.replace(/,(\s*\n\s*})\s*$/, "$1\n").replace(/\n{3,}/g, "\n\n").replace(/\{\n\n/, "{\n");
if (JSON.stringify(JSON.parse(text)) !== JSON.stringify(values)) throw new Error("the values-only file doesn't parse to the same values");
writeFileSync(TUNING, text);
console.log(`wrote ${OUT}/ (${sections.length} sections and index.json) and ${TUNING}, values only`);
