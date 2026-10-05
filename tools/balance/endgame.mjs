// How long losing takes (Ed, 2026-10-05: "keep going until you lose. We should test how long
// losing takes – once things are unrecoverable it's not fun to wait to lose"). Runs the creature-
// state model (src/rules/states.ts) traced every 10 s, tries candidate signals for the point of no
// return (the first moment after which the run never recovers), and measures the tail from each to
// game over, in minutes and waves; then tries a way to shorten the tail (sieges hurrying once the
// soundsystems standing fall to a share of their peak) and what it costs the comebacks.
//
//   node tools/balance/endgame.mjs [--seeds 4] [--gaps 300,120] [--skills 0.1,0.25,0.5,1] [--policies defend,leash,relay,mass] [--cap 60] [--hurry 0.5,3] [--relics 0]
import { createServer } from "vite";

const arg = (name, def) => { const i = process.argv.indexOf(`--${name}`); return i > 0 ? process.argv[i + 1] : def; };
const list = s => String(s).split(",");
const SEEDS = +arg("seeds", 4), GAPS = list(arg("gaps", "300,120")).map(Number), SKILLS = list(arg("skills", "0.1,0.25,0.5,1")).map(Number);
const POLICIES = list(arg("policies", "defend,leash,relay,mass")), CAP = +arg("cap", 60), [HURRY_AT, HURRY_X] = list(arg("hurry", "0.5,3")).map(Number);
const RELICS = arg("relics") !== undefined ? +arg("relics") : undefined;

const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: "custom", logLevel: "error", optimizeDeps: { noDiscovery: true, include: [] } });
const load = p => server.ssrLoadModule(p);
const { generateMap } = await load("/src/rules/map.ts");
const { TUNING } = await load("/src/rules/tuning.ts");
const { simulateStates } = await load("/src/rules/states.ts");

const mean = a => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : NaN);
const median = a => { if (!a.length) return NaN; const b = [...a].sort((x, y) => x - y); return b[Math.floor(b.length / 2)]; };
const pct = x => (Number.isNaN(x) ? "–" : `${Math.round(x * 100)}%`);
const seeds = Array.from({ length: SEEDS }, (_, i) => 1000 + i * 7919);
const maps = seeds.map(s => generateMap(s, TUNING));
const say = s => console.log(s), t0 = Date.now();

// The candidates: when each first fires in a traced run (null: never).
const SIGNALS = {
  "standing ≤ ½ of peak": tr => tr.find(x => x.peak >= 3 && x.standing <= 0.5 * x.peak),
  "standing ≤ ¼ of peak": tr => tr.find(x => x.peak >= 4 && x.standing <= 0.25 * x.peak),
  "only home left": tr => tr.find(x => x.peak >= 3 && x.standing <= 1),
  "enraged > 2 × defence": tr => tr.find(x => x.enragedF > 100 && x.enragedF > 2 * x.defenceF),
  "enraged > 4 × defence": tr => tr.find(x => x.enragedF > 100 && x.enragedF > 4 * x.defenceF),
  "home besieged, no defender": tr => tr.find(x => x.homeSiegeF > 0 && x.homeDefF === 0),
  "home besieged, no defender, ≤ ½ standing": tr => tr.find(x => x.homeSiegeF > 0 && x.homeDefF === 0 && x.standing <= 0.5 * x.peak),
  "home < ½ health": tr => tr.find(x => x.homeHp < TUNING.combat.homeHealth / 2),
};

const all = [];
for (const gap of GAPS) for (const p of POLICIES) for (const k of SKILLS) for (const m of maps) {
  const r = simulateStates(m, { interval: gap, maxWaves: CAP, policy: p, skill: k, dt: gap >= 120 ? 1 : 0.5, trace: 10, relics: RELICS });
  const h = simulateStates(m, { interval: gap, maxWaves: CAP, policy: p, skill: k, dt: gap >= 120 ? 1 : 0.5, hurryAt: HURRY_AT, hurryFactor: HURRY_X, relics: RELICS });
  all.push({ gap, p, k, seed: m.seed, r, h });
  process.stderr.write(`${gap} ${p} ×${k} ${m.seed}: ${r.lost ? `lost w${r.lost.wave}` : "cap"} / hurried ${h.lost ? `w${h.lost.wave}` : "cap"}\n`);
}

say(`Point of no return (Ed, 2026-10-05): ${SEEDS} seeds × policies ${POLICIES.join(", ")} × skills ${SKILLS.map(k => `×${k}`).join(", ")}, gaps ${GAPS.join(" and ")} s, cap ${CAP} waves; the current legend rules (relics ${RELICS ?? "3–4"}). ${all.filter(x => x.r.lost).length} of ${all.length} runs lost.\n`);
for (const gap of GAPS) {
  const runs = all.filter(x => x.gap === gap), lost = runs.filter(x => x.r.lost);
  say(`**${gap} s waves: ${lost.length} of ${runs.length} runs lost. Each signal: in how many lost runs it fired first (recall), its false alarms (fired in runs that then reached the cap), and the tail from it to game over (median, mean; minutes and waves)**\n`);
  say("| signal | fired in lost runs | false alarms | tail (median) | tail (mean) | waves (median) |");
  say("|---|---|---|---|---|---|");
  for (const [name, f] of Object.entries(SIGNALS)) {
    const fired = runs.map(x => ({ x, at: f(x.r.trace) })).filter(y => y.at);
    const inLost = fired.filter(y => y.x.r.lost), fa = fired.filter(y => !y.x.r.lost);
    const tails = inLost.map(y => (y.x.r.lost.time - y.at.time) / 60), tw = inLost.map(y => y.x.r.lost.wave - y.at.wave);
    say(`| ${name} | ${lost.length ? pct(inLost.length / lost.length) : "–"} | ${fired.length ? `${fa.length} of ${fired.length}` : "–"} | ${tails.length ? `${median(tails).toFixed(1)} min` : "–"} | ${tails.length ? `${mean(tails).toFixed(1)} min` : "–"} | ${tw.length ? median(tw) : "–"} |`);
  }
  say("");
  // By policy and skill: the tail from the best candidate (picked below by the reader), and the run length.
  say(`**${gap} s: lost runs by policy and skill, survived waves (mean), and the tail from "standing ≤ ½ of peak" (median minutes)**\n`);
  say("| policy \\ skill | " + SKILLS.map(k => `×${k}`).join(" | ") + " |");
  say("|---|" + SKILLS.map(() => "---").join("|") + "|");
  for (const p of POLICIES) say(`| ${p} | ` + SKILLS.map(k => {
    const rs = runs.filter(x => x.p === p && x.k === k), l = rs.filter(x => x.r.lost);
    const tails = l.map(x => { const a = SIGNALS["standing ≤ ½ of peak"](x.r.trace); return a ? (x.r.lost.time - a.time) / 60 : null; }).filter(v => v !== null);
    return `${l.length}/${rs.length} lost, ${mean(rs.map(x => x.r.survived)).toFixed(1)} w${tails.length ? `, ${median(tails).toFixed(1)} min` : ""}`;
  }).join(" | ") + " |");
  say("");
  // Hurrying: sieges march and hit HURRY_X times as fast once standing ≤ HURRY_AT of the peak.
  const shorter = lost.map(x => (x.r.lost.time - (x.h.lost?.time ?? Infinity)) / 60).filter(Number.isFinite);
  const capped = runs.filter(x => !x.r.lost), killed = capped.filter(x => x.h.lost);
  const comeback = runs.filter(x => x.r.lost && SIGNALS["standing ≤ ½ of peak"](x.r.trace)).length;
  say(`**${gap} s: hurrying the sieges (×${HURRY_X} once standing ≤ ${HURRY_AT} of peak).** Lost runs end ${shorter.length ? `${median(shorter).toFixed(1)} min sooner (median; mean ${mean(shorter).toFixed(1)})` : "–"}; of the ${capped.length} runs that reached the cap, ${killed.length} lose with it (comebacks it takes away); survived waves ${mean(runs.map(x => x.r.survived)).toFixed(1)} → ${mean(runs.map(x => x.h.survived)).toFixed(1)}. (${comeback} lost runs crossed the line.)\n`);
}
say(`(${((Date.now() - t0) / 1000).toFixed(0)} s)`);
await server.close();
