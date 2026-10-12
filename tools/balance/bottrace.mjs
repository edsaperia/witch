// A bot's run, as a trace (bots-again, 2026-10-11): every change in what it's doing, with the clock, her place, mode,
// hits, stack, the wave and the soundsystems standing; for reading why a bot plays as it does.
//   node tools/balance/bottrace.mjs [--seed 1000] [--bot skilled] [--island 10] [--kind badger (that kind's island)] [--time 900] [--every 0 (also a line every N s)] [--game (the bot game's options)] [--feed]
import { arg, openRules } from "./lib.mjs";
const { load, close } = await openRules();
const { TUNING, withTuning } = await load("/src/rules/tuning.ts");
const { newGame, stepGame } = await load("/src/rules/game.ts");
const { newBot, BOT_GAME } = await load("/src/rules/bot.ts");
const { cellKey } = await load("/src/rules/party.ts");
const SEED = +arg("seed", 1000), BOT = arg("bot", "skilled"), ISL = +arg("island", 10), TIME = +arg("time", 900), EVERY = +arg("every", 0);
const g = newGame(SEED, withTuning({ map: { ...TUNING.map, islandAreas: ISL, ...(arg("kind", "") ? { island: arg("kind") } : {}) } })), w = g.witches[0];
g.clock.paused = false; w.body = { ...w.body, seated: false };
const brain = newBot(BOT, { ...(process.argv.includes("--game") ? BOT_GAME[BOT] : {}), ...(process.argv.includes("--feed") ? { feed: true } : {}) });
let last = "", lastAt = -1e9, inv = 0;
const line = why => { const b = w.body, st = [...g.combat.sounds.values()].filter(h => h.hp > 0).length, d0 = g.map.dancefloor;
  console.log(`${(g.clock.time / 60).toFixed(2)}m w${g.party.wave} next${(g.party.nextAt - g.clock.time).toFixed(0)}s ${b.mode[0]} (${Math.round(b.x - d0.x)},${Math.round(b.z - d0.z)}) hp${w.health.hp}${w.ko ? " KO" : ""} stack${w.leash.stack.length}+${w.leash.placed.length} inv${inv} snd${st} | ${why}`); };
for (let s = 0; s * STEP() < TIME; s++) {
  const c = brain.decide(g); stepGame(g, c, 1 / 60);
  for (const e of w.invites.events) if (e.kind === "happy") inv++;
  if (brain.doing !== last || (EVERY && g.clock.time - lastAt >= EVERY)) { line(brain.doing + (c.fire ? " [fire]" : "")); last = brain.doing; lastAt = g.clock.time; }
  if (g.partyOver) { line("PARTY OVER"); break; }
  if (g.win?.phase === "won") { line("WON"); break; }
}
function STEP() { return 1 / 60; }
await close();
