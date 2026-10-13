// The records in art/genome/species.js's GENOMES array (tools/creatures.mjs adopt and check): a merge pastes a species' record back
// into the array next to the index's spread (`...CREATURE_GENOMES,`), and adopt moves it out to art/creatures/<id>/genome.js. Each
// record comes back as the text of its own module (`export const GENOME_<ID> = { ... };`, the comment lines of its own above it
// kept), and `rest` is the file without them. The spread line and blank lines are nobody's (Foxtrot, 2026-10-13: the spread
// line was carried into the stegosaurus's genome.js).
export const ident = id => "GENOME_" + id.toUpperCase().replace(/[^A-Z0-9]/g, "_");
export function recordsIn(text) {
  const open = text.indexOf("export const GENOMES = ["), close = text.indexOf("\n];", open);
  if (open < 0 || close < 0) return { records: [], rest: text };
  const body = text.slice(text.indexOf("\n", open) + 1, close + 1), lines = body.split("\n"), records = [];
  let cur = null, pending = [];
  const flush = () => { if (cur) { records.push(cur); cur = null; } };
  for (const line of lines) {
    if (/^  \{ id: "/.test(line)) { flush(); cur = { lines: [...pending, line] }; pending = []; }
    else if (/^  \/\//.test(line) && !cur?.open) { pending.push(line); } // (a comment at the record's own indent before the next record)
    else if (cur) cur.lines.push(line);
    else if (/^\s*\.\.\./.test(line) || !line.trim()) pending = []; // (the index's spread, `...CREATURE_GENOMES,`, or a blank line: no record's, and the comments before it weren't the next record's either)
    else pending.push(line);
    if (cur) { const depth = cur.lines.filter(l => !/^\s*\/\//.test(l)).join("\n"); const opens = (depth.match(/[{[]/g) || []).length, closes = (depth.match(/[}\]]/g) || []).length; cur.open = opens > closes; if (!cur.open) { flush(); } }
  }
  flush();
  for (const r of records) {
    while (r.lines.length && !r.lines[r.lines.length - 1].trim()) r.lines.pop();
    const id = /^  \{ id: "([^"]+)"/.exec(r.lines.find(l => /^  \{ id: "/.test(l)))[1];
    const out = r.lines.map(l => l.replace(/^  /, "")); // (the record's own indent off: it stands at the module's top level)
    const last = out.length - 1, m = /^(.*?)(\s*\/\/.*)?$/.exec(out[last]); // (the record's trailing comma off, before any comment after it)
    out[last] = m[1].replace(/,\s*$/, "") + ";" + (m[2] ?? "");
    const at = out.findIndex(l => /^\{ id: "/.test(l)); out[at] = `export const ${ident(id)} = ` + out[at];
    r.id = id; r.text = out.join("\n") + "\n";
  }
  const rest = text.slice(0, text.indexOf("\n", open) + 1) + text.slice(close + 1);
  return { records, rest };
}
