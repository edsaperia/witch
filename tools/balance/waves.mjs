// Faster waves for the endgame (Ed, 2026-10-05: "How about increasing wave speed?"), against the
// siege hurry: waves rushing once the run is lost (from the point of no return, ¼ of the peak
// soundsystems standing, or ½), and a ramp shortening the gap over the whole run. For each variant,
// on the creature-state model (src/rules/states.ts): how much sooner lost runs end, the tail from
// the point of no return, the comebacks it takes away (runs that reached the cap without it and lose
// with it), and survival by policy and skill.
//   node tools/balance/waves.mjs [--seeds 3] [--gap 300] [--skills 0.1,0.25,0.5] [--policies defend,leash,relay,mass] [--cap 60 (waves at the starting gap: the runs stop at cap × gap seconds)] [--json out.json]
//   node tools/balance/waves.mjs --report a.json,b.json,...   (merge several runs' JSON into the tables)
import { createServer } from "vite";
import { readFileSync, writeFileSync } from "node:fs";

const arg = (name, def) => { const i = process.argv.indexOf(`--${name}`); return i > 0 ? process.argv[i + 1] : def; };
const list = s => String(s).split(",");
const VARIANTS = {
  "no penalty (before)": { fallAdvance: 0 },
  "a fall: next wave 60 s sooner (Ed's pick)": { fallAdvance: 60 },
  "a fall: next wave 30 s sooner": { fallAdvance: 30 },
  "a fall: next wave 90 s sooner": { fallAdvance: 90 },
  "60 s, and sieges hurry ×3 at ¼": { fallAdvance: 60, hurryAt: 0.25, hurryFactor: 3 },
  "no penalty, sieges hurry ×3 at ¼": { fallAdvance: 0, hurryAt: 0.25, hurryFactor: 3 },
};
const BASE = "no penalty (before)";
const mean = a => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : NaN);
const median = a => { if (!a.length) return NaN; const b = [...a].sort((x, y) => x - y); return b[Math.floor(b.length / 2)]; };
const say = s => console.log(s);

let rows;
if (arg("report")) rows = list(arg("report")).flatMap(f => JSON.parse(readFileSync(f, "utf8")));
else {
  const SEEDS = +arg("seeds", 3), GAP = +arg("gap", 300), SKILLS = list(arg("skills", "0.1,0.25,0.5")).map(Number), POLICIES = list(arg("policies", "defend,leash,relay,mass")), CAP = +arg("cap", 60);
  const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: "custom", logLevel: "error", optimizeDeps: { noDiscovery: true, include: [] } });
  const load = p => server.ssrLoadModule(p);
  const { generateMap } = await load("/src/rules/map.ts");
  const { TUNING } = await load("/src/rules/tuning.ts");
  const { simulateStates } = await load("/src/rules/states.ts");
  const maps = Array.from({ length: SEEDS }, (_, i) => generateMap(1000 + i * 7919, TUNING));
  rows = [];
  for (const p of POLICIES) for (const k of SKILLS) for (const m of maps) for (const [v, opt] of Object.entries(VARIANTS)) {
    const r = simulateStates(m, { interval: GAP, maxWaves: 1e4, maxTime: CAP * GAP, policy: p, skill: k, dt: 1, trace: 10, ...opt });
    const pnr = r.trace.find(x => x.peak >= 4 && x.standing <= 0.25 * x.peak);
    rows.push({ gap: GAP, cap: CAP, p, k, seed: m.seed, v, firstFall: r.firstFall, survived: r.survived, lostAt: r.lost?.time ?? null, pnrAt: pnr?.time ?? null, end: r.trace[r.trace.length - 1]?.time ?? 0 });
    process.stderr.write(`${p} ×${k} ${m.seed} ${v}: ${r.lost ? `lost w${r.lost.wave}` : "cap"}\n`);
  }
  await server.close();
  if (arg("json")) { writeFileSync(arg("json"), JSON.stringify(rows)); process.exit(0); }
}

const gap = rows[0].gap, cap = rows[0].cap, key = r => `${r.p},${r.k},${r.seed}`, base = new Map(rows.filter(r => r.v === BASE).map(r => [key(r), r]));
say(`Faster waves for the endgame (Ed, 2026-10-05): ${gap} s waves to start with; every run stops at ${(cap * gap / 3600).toFixed(1)} h (${cap} waves at the starting gap), so "+" means it lasted that long; the current rules; ${base.size} runs a variant (policies × skills × seeds). The point of no return: ¼ of the peak soundsystems standing.\n`);
// Runs that lose a soundsystem early (by wave 10) and still last to the cap as things are: what each variant does to them.
const recover = [...base.values()].filter(b => b.firstFall !== null && b.firstFall <= 10 && b.lostAt === null);
say("| variant | runs lost | lost runs end sooner than with no penalty (median) | tail from the point of no return (median, lost runs) | comebacks it takes away (reached the cap with no penalty, lose with it) | early fall, recovered with no penalty (" + recover.length + " runs): lost with it / its length | waves survived (mean) | a run's length (median) |");
say("|---|---|---|---|---|---|---|---|");
for (const v of Object.keys(VARIANTS)) {
  const rs = rows.filter(r => r.v === v), lost = rs.filter(r => r.lostAt !== null);
  const sooner = lost.map(r => { const b = base.get(key(r)); return b?.lostAt != null ? (b.lostAt - r.lostAt) / 60 : null; }).filter(x => x !== null);
  const tails = lost.filter(r => r.pnrAt !== null).map(r => (r.lostAt - r.pnrAt) / 60);
  const taken = rs.filter(r => r.lostAt !== null && base.get(key(r))?.lostAt === null).length, capped = [...base.values()].filter(b => b.lostAt === null).length;
  const rec = recover.map(b => rs.find(r => key(r) === key(b))).filter(Boolean), recLost = rec.filter(r => r.lostAt !== null);
  say(`| ${v} | ${lost.length} of ${rs.length} | ${v === BASE ? "–" : sooner.length ? `${median(sooner).toFixed(1)} min` : "–"} | ${tails.length ? `${median(tails).toFixed(1)} min` : "–"} | ${v === BASE ? "–" : `${taken} of ${capped}`} | ${rec.length ? `${recLost.length} lost, ${Math.round(median(rec.map(r => (r.lostAt ?? r.end) / 60)))} min` : "–"} | ${mean(rs.map(r => r.survived)).toFixed(1)} | ${Math.round(median(rs.map(r => (r.lostAt ?? r.end) / 60)))} min |`);
}
say("");
const P = [...new Set(rows.map(r => r.p))], K = [...new Set(rows.map(r => r.k))];
for (const v of Object.keys(VARIANTS)) {
  say(`**Waves survived (mean) and a run's length (median minutes), ${v}**\n`);
  say("| policy \\ skill | " + K.map(k => `×${k}`).join(" | ") + " |");
  say("|---|" + K.map(() => "---").join("|") + "|");
  for (const p of P) say(`| ${p} | ` + K.map(k => { const rs = rows.filter(r => r.v === v && r.p === p && r.k === k); return `${mean(rs.map(r => r.survived)).toFixed(1)}${rs.every(r => r.lostAt === null) ? "+" : ""}, ${Math.round(median(rs.map(r => (r.lostAt ?? r.end) / 60)))} min`; }).join(" | ") + " |");
  say("");
}
