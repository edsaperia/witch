// 💌 throughput under stacked legend buffs (Ed, 2026-10-05, issue #87): how fast she can fill
// a crowd's affection with no buffs, typical builds and worst-case stacks, with the per-animal hit
// gap (invites.perAnimalHitGap, 0.5 s) and other limits; then waves survived in the creature-state
// model (src/rules/states.ts) with each build.
//   node tools/balance/buffs.mjs [--seeds 4] [--gap 120] [--cap 60] [--skills 0.5,1] [--policies defend,leash] [--relics 0] [--no-sim]
import { openRules, arg, list, mean } from "./lib.mjs";

const SEEDS = +arg("seeds", 4), GAP = +arg("gap", 120), CAP = +arg("cap", 60), SKILLS = list(arg("skills", "0.5,1")).map(Number), POLICIES = list(arg("policies", "defend,leash"));
const RELICS = arg("relics") !== undefined ? +arg("relics") : undefined;

const { load, close } = await openRules();
const { throughput, crowdTime, INVITE_FIRE } = await load("/src/rules/throughput.ts");
const say = s => console.log(s), t0 = Date.now();

const WORST = ["flutter", "fan", "echo", "howl", "quickFire", "pierce", "spawn"];
const BUILDS = {
  "none": [],
  "Flutter + Charm": ["flutter", "charm"],
  "Fan + Quick fire + Wings": ["fan", "quickFire", "wings"],
  "Echo + Pierce + Big heart + Scamper": ["echo", "pierce", "bigHeart", "scamper"],
  "Howl + Spawn + Strike": ["howl", "spawn", "strike"],
  "worst (Flutter Fan Echo Howl Quick fire Pierce Spawn)": WORST,
  "worst, Fan and Echo twice": [...WORST, "fan", "echo"],
};
const LIMITS = {
  "gap 0.5 s (as is)": {},
  "gap 0.75 s": { gap: 0.75 },
  "gap 1 s": { gap: 1 },
  "each buff once (no stacking)": { stack: 1 },
  "at most 3 animals at once": { maxTargets: 3 },
  "at most 2 animals at once": { maxTargets: 2 },
  "hits ≤ 5 a second in all": { maxRate: 5 },
};
// Crowds: a pack (an adult, a young, a baby) to the late game's 10.
const CROWDS = { "1 adult": [12], "pack (adult, young, baby)": [12, 6, 3], "4 (2 adults, young, baby)": [12, 12, 6, 3], "6 adults": [12, 12, 12, 12, 12, 12], "10 mixed": [12, 12, 12, 12, 6, 6, 6, 3, 3, 3] };
const base = throughput([]);
say(`💌 throughput (the firing numbers of PR #89: bursts of ${INVITE_FIRE.burst} letters ${INVITE_FIRE.burstGap} s apart, ${INVITE_FIRE.cooldown} s cooldown; hits to fill: baby ${INVITE_FIRE.hits[0]}, young ${INVITE_FIRE.hits[1]}, adult ${INVITE_FIRE.hits[2]}; one letter's affection an animal every ${INVITE_FIRE.perAnimalHitGap} s). Guesses (rules/throughput.ts): 60% of plain letters land; each buff's effect from its one line on #87. Skill ×1 here.\n`);
say("**Each build: letters a second, the share landing, animals reached at once, hits a second on 1 / 3 / 6 / 10 animals**\n");
say("| build | letters/s | land | reach | hits/s on 1 | on 3 | on 6 | on 10 |");
say("|---|---|---|---|---|---|---|---|");
for (const [name, b] of Object.entries(BUILDS)) { const t = throughput(b); say(`| ${name} | ${t.letters.toFixed(1)} | ${Math.round(t.land * 100)}% | ${t.cover.toFixed(1)} | ${[1, 3, 6, 10].map(n => t.rate(n).toFixed(1)).join(" | ")} |`); }
say("");
say("**Seconds to fill a crowd (all at once), and against no buffs**\n");
say("| build | " + Object.keys(CROWDS).join(" | ") + " |");
say("|---|" + Object.keys(CROWDS).map(() => "---").join("|") + "|");
for (const [name, b] of Object.entries(BUILDS)) { const t = throughput(b); say(`| ${name} | ` + Object.values(CROWDS).map(h => { const s = crowdTime(h, t), s0 = crowdTime(h, base); return `${s.toFixed(1)} s (${(s0 / s).toFixed(1)}×)`; }).join(" | ") + " |"); }
say("");
say("**The worst stack (7 buffs) under each limit: its invite rate against no buffs (with the same limit), by crowd; the target is under about 2×**\n");
say("| limit | " + Object.keys(CROWDS).join(" | ") + " |");
say("|---|" + Object.keys(CROWDS).map(() => "---").join("|") + "|");
for (const [name, L] of Object.entries(LIMITS)) {
  const w = throughput(WORST, undefined, L), b0 = throughput([], undefined, L), b1 = throughput([]);
  say(`| ${name} | ` + Object.values(CROWDS).map(h => `${(crowdTime(h, b0) / crowdTime(h, w)).toFixed(1)}× (no buffs ${(crowdTime(h, b1) / crowdTime(h, b0)).toFixed(2)}× as fast as now)`).join(" | ") + " |");
}
say("");
if (!process.argv.includes("--no-sim")) {
  const { generateMap } = await load("/src/rules/map.ts");
  const { TUNING } = await load("/src/rules/tuning.ts");
  const { simulateStates } = await load("/src/rules/states.ts");
    const maps = Array.from({ length: SEEDS }, (_, i) => generateMap(1000 + i * 7919, TUNING));
  const SIM = { "talk times (before 💌s)": null, "💌, no buffs": { buffs: [] }, "💌, Echo + Pierce + Big heart + Scamper": { buffs: BUILDS["Echo + Pierce + Big heart + Scamper"] }, "💌, worst stack": { buffs: WORST }, "💌, worst stack, at most 3 at once": { buffs: WORST, limits: { maxTargets: 3 } } };
  say(`**Waves survived in the state model: ${GAP} s waves, ${SEEDS} seeds, cap ${CAP}${RELICS !== undefined ? `, ${RELICS} relics` : ""}; her invites a run in brackets. Skill: her aim (talk times: her talk speed)**\n`);
  say("| build | " + POLICIES.flatMap(p => SKILLS.map(k => `${p} ×${k}`)).join(" | ") + " |");
  say("|---|" + POLICIES.flatMap(p => SKILLS.map(() => "---")).join("|") + "|");
  for (const [name, L] of Object.entries(SIM)) {
    const cells = POLICIES.flatMap(p => SKILLS.map(k => {
      const rs = maps.map(m => simulateStates(m, { interval: GAP, maxWaves: CAP, policy: p, skill: k, dt: 1, relics: RELICS, ...(L ? { letters: L } : {}) }));
      process.stderr.write(`${name} ${p} ×${k}\n`);
      return `${rs.every(r => !r.lost) ? `${CAP}+` : mean(rs.map(r => r.survived)).toFixed(1)} (${Math.round(mean(rs.map(r => r.invited.happy + r.invited.leashed)))})`;
    }));
    say(`| ${name} | ${cells.join(" | ")} |`);
  }
  say("");
}
say(`(${((Date.now() - t0) / 1000).toFixed(0)} s)`);
await close();
