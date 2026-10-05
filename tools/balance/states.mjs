// The creature-state model's report (issue #87): src/rules/states.ts on the real maps.
//   node tools/balance/states.mjs [--seeds 6] [--gap 60] [--skills 0.5,1,2,4] [--policies defend,third,leash,babies,relay] [--cap 40]
//     [--health 4000] [--dazed 0] [--quest 0] [--legend 1] [--approach 3] [--leash 2] [--berries 12.5] [--dt 0.5] [--kin-fight] [--quick]
import { createServer } from "vite";

const arg = (name, def) => { const i = process.argv.indexOf(`--${name}`); return i > 0 ? process.argv[i + 1] : def; };
const list = s => String(s).split(",");
const QUICK = process.argv.includes("--quick");
const SEEDS = +arg("seeds", QUICK ? 2 : 6), GAP = +arg("gap", 60), SKILLS = list(arg("skills", "0.5,1,2,4")).map(Number), POLICIES = list(arg("policies", "defend,third,leash,babies"));
const CAP = +arg("cap", 40);
const knobs = { soundHealth: arg("health") ? +arg("health") : undefined, dazedTime: +arg("dazed", 0), questShare: +arg("quest", 0), legendDefence: +arg("legend", 1), approach: +arg("approach", 3), leashTime: +arg("leash", 2), berriesPerArea: arg("berries") ? +arg("berries") : undefined, dt: arg("dt") ? +arg("dt") : undefined, ownKind: !process.argv.includes("--kin-fight") };

const server = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: "custom", logLevel: "error", optimizeDeps: { noDiscovery: true, include: [] } });
const load = p => server.ssrLoadModule(p);
const { generateMap } = await load("/src/rules/map.ts");
const { TUNING } = await load("/src/rules/tuning.ts");
const { simulateStates } = await load("/src/rules/states.ts");

const mean = a => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : NaN);
const pct = x => (Number.isNaN(x) ? "–" : `${Math.round(x * 100)}%`);
const seeds = Array.from({ length: SEEDS }, (_, i) => 1000 + i * 7919);
const maps = seeds.map(s => generateMap(s, TUNING));
const t0 = Date.now(), say = s => console.log(s);
const runs = {};
for (const p of POLICIES) for (const k of SKILLS) {
  runs[`${p},${k}`] = maps.map(m => simulateStates(m, { interval: GAP, maxWaves: CAP, policy: p, skill: k, ...knobs }));
  process.stderr.write(`${p} × ${k}: ${mean(runs[`${p},${k}`].map(r => r.survived)).toFixed(1)}\n`);
}
const idle = maps.map(m => simulateStates(m, { interval: GAP, maxWaves: CAP, policy: "defend", skill: 1e-9, ...knobs }));
const surv = rs => (rs.every(r => !r.lost) ? `${CAP}+` : mean(rs.map(r => r.survived)).toFixed(1));
say(`States model (issue #87): ${SEEDS} seeds, ${TUNING.mapAreas}² areas of ${TUNING.areaSize * TUNING.areaScale} m, treetop ${TUNING.treetopSpeed} m/s, waves every ${GAP} s, soundsystems ${knobs.soundHealth ?? TUNING.combat.soundsystemHealth} hp; skill = invite rate × the game's talk times (${TUNING.invite.talkTime.slice(0, 3).join("/")} s), plus ${knobs.approach} s to reach each and ${knobs.leashTime} s to leash; dazed ${knobs.dazedTime} s, ${knobs.ownKind ? "never their own kind" : "kin fight kin"}, quests ${pct(knobs.questShare)}, legend defence ×${knobs.legendDefence}. Idle (no invites): ${surv(idle)} waves.\n`);
const table = (title, f) => {
  say(`**${title}**\n`);
  say("| policy \\ skill | " + SKILLS.map(k => `×${k}`).join(" | ") + " |");
  say("|---|" + SKILLS.map(() => "---").join("|") + "|");
  for (const p of POLICIES) say(`| ${p} | ` + SKILLS.map(k => f(runs[`${p},${k}`])).join(" | ") + " |");
  say("");
};
table(`Waves survived (cap ${CAP})`, surv);
table("Invited a run: happy / leashed (mean)", rs => `${Math.round(mean(rs.map(r => r.invited.happy)))} / ${Math.round(mean(rs.map(r => r.invited.leashed)))}`);
table("Starves (first wave she's idle half of; – never), mean over the seeds that do, and how many do", rs => { const s = rs.filter(r => r.starve !== null).map(r => r.starve); return s.length ? `${mean(s).toFixed(1)} (${s.length}/${rs.length})` : "–"; });
// The pool by wave, for skill 1 (and the army's F).
const at = [1, 5, 10, 15, 20, 30, 40].filter(w => w <= CAP);
for (const k of [1].concat(SKILLS.includes(2) ? [2] : [])) {
  say(`**The pool at skill ×${k}: wild creatures left on the map (in the next two waves' areas), by wave; the army's F in brackets**\n`);
  say("| policy | " + at.map(w => `w${w}`).join(" | ") + " |");
  say("|---|" + at.map(() => "---").join("|") + "|");
  for (const p of POLICIES) say(`| ${p} | ` + at.map(w => { const s = (runs[`${p},${k}`] ?? []).map(r => r.waves.find(x => x.wave === w)).filter(Boolean); return s.length ? `${Math.round(mean(s.map(x => x.pool)))} (${Math.round(mean(s.map(x => x.frontier)))}) [${Math.round(mean(s.map(x => x.armyF)))}]` : "–"; }).join(" | ") + " |");
  say("");
}
// Local fights by invited share.
const bands = [[0, 0.001], [0.001, 0.25], [0.25, 0.5], [0.5, 0.75], [0.75, 1.01]];
say("**Local fight: an area's own fight when it wakes, by the share of its young and up (by F) invited before (happy or leashed); its soundsystem never falling, its mean life if it fell, and its defenders beating its own enraged (all policies and skills)**\n");
say("| invited before | areas | never fell | life if fell | defenders won |");
say("|---|---|---|---|---|");
const allLocal = Object.values(runs).flat().flatMap(r => r.local.filter(l => l.wave <= r.survived - 3)); // (not the last few, cut short)
for (const [a, b] of bands) {
  const l = allLocal.filter(x => x.invited >= a && x.invited < b), w = l.filter(x => x.won !== null);
  const f = l.filter(x => x.fellAfter !== undefined);
  say(`| ${a === 0 ? "none" : `${Math.round(a * 100)}–${Math.min(100, Math.round(b * 100))}%`} | ${l.length} | ${pct(mean(l.map(x => (x.fellAfter === undefined ? 1 : 0))))} | ${f.length ? `${Math.round(mean(f.map(x => x.fellAfter)))} s` : "–"} | ${pct(mean(w.map(x => (x.won ? 1 : 0))))} |`);
}
say("");
say("**Other kinds at the wake: an area's own fight by the F of other species there (her army, if near, and happy creatures of other kinds) over its enraged's F; its soundsystem never falling, its mean life if it fell**\n");
say("| other kinds / enraged | areas | never fell | life if fell |");
say("|---|---|---|---|");
for (const [a, b] of [[0, 0.001], [0.001, 0.5], [0.5, 1], [1, 2], [2, 1e9]]) {
  const l = allLocal.filter(x => x.enragedF > 0 && x.otherF / x.enragedF >= a && x.otherF / x.enragedF < b), f = l.filter(x => x.fellAfter !== undefined);
  say(`| ${a === 0 ? "none" : b > 1e8 ? `${a}+` : `${a}–${b}`} | ${l.length} | ${pct(mean(l.map(x => (x.fellAfter === undefined ? 1 : 0))))} | ${f.length ? `${Math.round(mean(f.map(x => x.fellAfter)))} s` : "–"} |`);
}
say("");
table("Siege targets: enraged whose nearest soundsystem was another area's (share); soundsystem damage by other areas' creatures in brackets", rs => { const o = mean(rs.map(r => r.targets.other / Math.max(1, r.targets.own + r.targets.other))), dmg = mean(rs.map(r => r.damage.other / Math.max(1, r.damage.own + r.damage.other))); return `${pct(o)} (${pct(dmg)})`; });
say(`(${((Date.now() - t0) / 1000).toFixed(0)} s)`);
await server.close();
