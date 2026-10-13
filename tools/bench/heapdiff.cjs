// What grew between two heap snapshots (tools/bench/stalls.cjs SNAP=1: start.heapsnapshot, end.heapsnapshot): the nodes' self
// sizes added up by kind (type and name, so "system / JSArrayBufferData" is a typed array's bytes, "Float32Array" its wrapper),
// the kinds that grew most, and for the kind that grew most a few of its biggest nodes' retainer chains (who holds them).
//   node tools/bench/heapdiff.cjs <start.heapsnapshot> <end.heapsnapshot> [kind] [chains]
const fs = require("fs");
const [a, b, KIND, CHAINS = "6"] = process.argv.slice(2);
function load(file) {
  const snap = JSON.parse(fs.readFileSync(file, "utf8")), m = snap.snapshot.meta, nf = m.node_fields, ef = m.edge_fields;
  const N = snap.nodes, E = snap.edges, S = snap.strings, nfl = nf.length, efl = ef.length;
  const iType = nf.indexOf("type"), iName = nf.indexOf("name"), iSize = nf.indexOf("self_size"), iEdges = nf.indexOf("edge_count"), iId = nf.indexOf("id");
  const eType = ef.indexOf("type"), eName = ef.indexOf("name_or_index"), eTo = ef.indexOf("to_node");
  const types = m.node_types[iType], etypes = m.edge_types[eType], count = N.length / nfl;
  const kindOf = i => `${types[N[i * nfl + iType]]} ${S[N[i * nfl + iName]]}`, sizeOf = i => N[i * nfl + iSize];
  return { N, E, S, nfl, efl, iType, iName, iSize, iEdges, iId, eType, eName, eTo, types, etypes, count, kindOf, sizeOf };
}
function byKind(s) { const m = new Map(); for (let i = 0; i < s.count; i++) { const k = s.kindOf(i); const r = m.get(k) ?? { n: 0, bytes: 0 }; r.n++; r.bytes += s.sizeOf(i); m.set(k, r); } return m; }
const A = load(a), B = load(b), ka = byKind(A), kb = byKind(B);
const mb = v => (v / 1048576).toFixed(1);
const rows = [...new Set([...ka.keys(), ...kb.keys()])].map(k => { const x = ka.get(k) ?? { n: 0, bytes: 0 }, y = kb.get(k) ?? { n: 0, bytes: 0 }; return { k, dn: y.n - x.n, db: y.bytes - x.bytes, n: y.n, bytes: y.bytes }; });
const total = (m) => [...m.values()].reduce((t, r) => t + r.bytes, 0);
console.log(`self sizes: ${mb(total(ka))} MB -> ${mb(total(kb))} MB`);
console.log("grew most (MB, count):");
for (const r of rows.sort((p, q) => q.db - p.db).slice(0, 20)) console.log(`  ${mb(r.db).padStart(8)} MB  ${String(r.dn).padStart(8)}  ${r.k}  (now ${mb(r.bytes)} MB, ${r.n})`);
// Retainers in the end snapshot: for the kind that grew most (or the one asked), its biggest nodes, each with a chain of retainers.
const kind = KIND ?? rows[0].k, s = B;
const first = new Int32Array(s.count + 1); { let e = 0; for (let i = 0; i < s.count; i++) { first[i] = e; e += s.N[i * s.nfl + s.iEdges] * s.efl; } first[s.count] = e; }
const retainers = new Map(); // to -> [[from, edge name]]
for (let i = 0; i < s.count; i++) for (let e = first[i]; e < first[i + 1]; e += s.efl) { const to = s.E[e + s.eTo] / s.nfl, et = s.etypes[s.E[e + s.eType]]; if (et === "weak" || et === "shortcut") continue; const name = et === "element" || et === "hidden" ? `[${s.E[e + s.eName]}]` : s.S[s.E[e + s.eName]]; let l = retainers.get(to); if (!l) retainers.set(to, (l = [])); if (l.length < 4) l.push([i, name, et]); }
const big = []; for (let i = 0; i < s.count; i++) if (s.kindOf(i) === kind) big.push(i);
big.sort((p, q) => s.sizeOf(q) - s.sizeOf(p));
console.log(`retainers of the biggest "${kind}" nodes at the end:`);
for (const i of big.slice(0, +CHAINS)) {
  const chain = []; let cur = i, seen = new Set([i]);
  for (let d = 0; d < 7; d++) { const r = (retainers.get(cur) ?? []).find(([f]) => !seen.has(f)); if (!r) break; seen.add(r[0]); chain.push(`${r[1]} of ${s.kindOf(r[0])}`); cur = r[0]; }
  console.log(`  ${mb(s.sizeOf(i))} MB: ${chain.join(" <- ")}`);
}
