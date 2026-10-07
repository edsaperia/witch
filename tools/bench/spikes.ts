// The rules' long steps (overnight phase 2: Ed's stalls): plays a bot game headless, notes every stepGame over --over ms (the
// step, game time, wave, areas and creatures before and after), and with --profile=<step>,... profiles exactly those steps
// (the game is deterministic, so a second run replays them) into spike-<seed>-<step>.cpuprofile. Report only.
import { Session } from "node:inspector/promises";
import { writeFileSync } from "node:fs";
import { newGame, stepGame, STEP, type Controls } from "../../src/rules/game";
import { TUNING } from "../../src/rules/tuning";
import { BOT_GAME, newBot, type BotKind } from "../../src/rules/bot";
const args = new Map(process.argv.slice(2).map(a => { const [k, v] = a.replace(/^--/, "").split("="); return [k, v ?? "1"]; }));
const seed = Number(args.get("seed") ?? 123), kind = (args.get("bot") ?? "champion") as BotKind, until = Number(args.get("wave") ?? 10), over = Number(args.get("over") ?? 40);
const profileAt = new Set((args.get("profile") ?? "").split(",").filter(Boolean).map(Number));
const g = newGame(seed, TUNING), bot = newBot(kind, BOT_GAME[kind]);
g.clock.paused = false;
const session = new Session(); session.connect(); await session.post("Profiler.enable");
let i = 0; const spikes: unknown[] = [];
while (g.party.wave < until && !g.partyOver && i < until * 40000) {
  const c: Controls = bot.decide(g);
  const prof = profileAt.has(i);
  if (prof) await session.post("Profiler.start");
  const wave0 = g.party.wave, areas0 = g.party.areas.size, n0 = g.creatures.length, a = performance.now();
  stepGame(g, c, STEP);
  const ms = performance.now() - a;
  if (prof) { const { profile } = await session.post("Profiler.stop"); writeFileSync(`spike-${seed}-${i}.cpuprofile`, JSON.stringify(profile)); }
  if (ms > over) spikes.push({ i, t: +g.clock.time.toFixed(2), ms: +ms.toFixed(1), wave: [wave0, g.party.wave], areas: [areas0, g.party.areas.size], creatures: [n0, g.creatures.length], mode: g.witch.mode, waveEvents: g.waveEvents.length, ko: g.koEvents.length });
  i++;
}
console.log(JSON.stringify(spikes, null, 0));
