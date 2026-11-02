// Optional observations, moved from bot.test.ts under Ed's 2 Nov outcome-statistics ruling.
// node tools/balance/bot-outcomes.mjs > previews/bot-outcomes.json
// Preserves the original seeds, loadouts, starts, time limits and recruitment paths. No quality assertions.
import { openRules } from "./lib.mjs";
import { execFileSync } from "node:child_process";

const { load, close } = await openRules();
try {
  const { TUNING, withTuning } = await load("/src/rules/tuning.ts");
  const { newGame, stepGame } = await load("/src/rules/game.ts");
  const { newBot } = await load("/src/rules/bot.ts");
  const rows = [];
  for (const seed of [11, 22, 33]) {
    const g = newGame(seed, withTuning({ map: { ...TUNING.map, islandAreas: 10 } }));
    g.clock.paused = false; g.witch = { ...g.witch, seated: false, perch: false };
    const bot = newBot("skilled"), babies = g.creatures.filter(c => c.level === 0);
    const alreadyHappy = new Set(babies.filter(c => c.state === "happy").map(c => c.id)), joinedBabies = new Set();
    let invited = 0;
    for (let i = 0; i < 20 * 60 * 60 && g.win?.phase !== "won" && !g.partyOver; i++) {
      stepGame(g, bot.decide(g), 1 / 60);
      for (const e of g.witches[0].invites.events) if (e.kind === "happy") invited++;
      for (const c of babies) if (c.state === "happy" && !alreadyHappy.has(c.id)) joinedBabies.add(c.id);
    }
    rows.push({ scenario: "ten-area-night", seed, seconds: g.clock.time, outcome: g.win?.phase === "won" ? "won" : g.partyOver ? "lost" : "censored", invited, joinedBabies: joinedBabies.size, recruited: invited + joinedBabies.size, historicalReference: { outcome: "won", recruitedAtLeast: 15 } });
  }
  {
    const g = newGame(1000, withTuning({ map: { ...TUNING.map, islandAreas: 10 } }));
    g.clock.paused = false; g.witch = { ...g.witch, seated: false };
    const bot = newBot("skilled"), w = g.witches[0];
    let won = 0;
    for (let i = 0; i < 40 * 60 && !won; i++) {
      stepGame(g, bot.decide(g), 1 / 60);
      won += w.invites.events.filter(e => e.kind === "happy").length;
    }
    rows.push({ scenario: "first-recruit", seed: 1000, seconds: g.clock.time, won, historicalReference: { wonGreaterThan: 0 } });
  }
  console.log(JSON.stringify({ source: execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(), schema: 1, bot: "skilled", islandAreas: 10, step: 1 / 60, rows }, null, 2));
} finally { await close(); }
