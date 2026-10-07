// The coach's eye on one run (overnight, 2026-10-07): a bot plays a seed headless and, each --every seconds, prints
// what decides a siege: her place and mode, her stack and parked sigils, every standing soundsystem's health, and the
// marchers (enraged) by the soundsystem they're after with their distance from it; and each soundsystem as it falls.
//   node tools/balance/coachwatch.mjs [--bot champion] [--seed 1000] [--time 2700] [--every 60] [--opts file.json]
import { readFileSync } from "node:fs";
import { arg, openRules } from "./lib.mjs";

const { load, close } = await openRules();
const { TUNING } = await load("/src/rules/tuning.ts");
const { newGame, stepGame } = await load("/src/rules/game.ts");
const { newBot, BOT_GAME } = await load("/src/rules/bot.ts");
const KIND = arg("bot", "champion"), SEED = +arg("seed", 1000), TIME = +arg("time", 2700), EVERY = +arg("every", 60);
const opts = arg("opts") ? JSON.parse(readFileSync(arg("opts"), "utf8")) : BOT_GAME[KIND] ?? {};
const g = newGame(SEED, TUNING), w = g.witches[0], dt = 1 / 60;
g.clock.paused = false; w.body = { ...w.body, seated: false };
const bot = newBot(KIND, opts);
const r0 = n => Math.round(n);
let fallen = new Set();
for (let step = 0; step * dt < TIME; step++) {
  stepGame(g, bot.decide(g), dt);
  if (g.partyOver) { console.log(`party's over at ${(g.clock.time / 60).toFixed(1)} min`); break; }
  for (const [k, h] of g.combat.sounds) if (h.hp <= 0 && !fallen.has(k)) { fallen.add(k); const d = Math.hypot(h.x - w.body.x, h.z - w.body.z); console.log(`  ${(g.clock.time / 60).toFixed(1)} min: soundsystem ${k} lost; she was ${r0(d)} m off, ${bot.doing}`); }
  if (step % (EVERY * 60) !== 0) continue;
  const lv = ids => [0, 1, 2, 3].map(l => ids.filter(id => g.creatures[id].level === l).length).join("/");
  const by = new Map();
  for (const c of g.creatures) if (!c.gone && c.siege) { const h = g.combat.sounds.get(c.siege); const a = by.get(c.siege) ?? []; a.push(h ? r0(Math.hypot(c.x - h.x, c.z - h.z)) : -1); by.set(c.siege, a); }
  const ss = [...g.combat.sounds].filter(([, h]) => h.hp > 0).map(([k, h]) => `${k}:${r0(100 * h.hp / h.max)}%@${r0(Math.hypot(h.x - w.body.x, h.z - w.body.z))}m${by.has(k) ? `<${by.get(k).length} (${Math.min(...by.get(k))}m)` : ""}`);
  const parked = new Map(); for (const p of w.leash.placed) { const k = `${r0(p.x / 50)},${r0(p.z / 50)}`; parked.set(k, (parked.get(k) ?? 0) + 1); }
  const hitters = new Map();
  for (const c of g.creatures) { const tg = c.fight?.target; if (!c.gone && tg?.kind === "sound") { const a = hitters.get(tg.key) ?? []; a.push(`${c.boss ? "LEGEND:" + c.legendState + ":" : ""}${c.species}${c.level}${c.enraged ? "!" : ""}${c.siege ? "@" + c.siege : ""}`); hitters.set(tg.key, a); } }
  for (const bm of g.combat.beams) if (bm.sound) { const a = hitters.get(bm.sound.key) ?? []; a.push(`beam:${bm.species}`); hitters.set(bm.sound.key, a); }
  for (const sh of g.combat.shots) if (sh.sound) { const a = hitters.get(sh.sound.key) ?? []; a.push(`lob:${sh.species}`); hitters.set(sh.sound.key, a); }
  if (hitters.size) console.log(`   hitting: ${[...hitters].map(([k, a]) => `${k} <- ${a.join(",")}`).join(" | ")}`);
  console.log(`${(g.clock.time / 60).toFixed(1)} min wave ${g.party.wave} (next in ${r0(g.party.nextAt - g.clock.time)} s) hp ${w.health.hp} ${w.body.mode}: ${bot.doing} | stack ${w.leash.stack.length} (${lv(w.leash.stack)}) parked ${w.leash.placed.length} in ${parked.size} spots | ${ss.join(" ")}`);
}
await close();
