// The rules' performance at late waves (overnight phase 2's baseline): a headless game on each seed, brought on with
// the playtest key (as tools/bench/rules.ts) to each wave in turn, then flown along the same fixed path for a while,
// timing every stepGame. Per wave: p50/p95/p99/worst, hitches (steps over 4 ms and over 16.7 ms: a step is a 60th of a
// second, and a frame runs one or two), the creatures by state, the simulation's level of detail (game.lod) and the heap.
// Bundled by tools/bench/run-perf.mjs with esbuild and run in Node: no Three.js, no browser. Report only: it changes
// nothing in the game.
import { newGame, stepGame, STEP, type Controls } from "../../src/rules/game";
import { TUNING } from "../../src/rules/tuning";
import { BOT_GAME, newBot, type BotKind } from "../../src/rules/bot";

const args = new Map(process.argv.slice(2).map(a => { const [k, v] = a.replace(/^--/, "").split("="); return [k, v ?? "1"]; }));
const seeds = (args.get("seeds") ?? "123,871136").split(",").map(Number);
const waves = (args.get("waves") ?? "10,20,28").split(",").map(Number);
const steps = Number(args.get("steps") ?? 1200);
const gap = Number(args.get("gap") ?? 180); // steps between waves on the way (3 s; rules.ts's)
// --bot=skilled: a bot plays the run instead (at the game's own wave interval, no playtest key), so the sieges build up as
// in a real run where she defends; timed while it plays.
const botKind = args.get("bot") as BotKind | undefined;

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
function path(i: number): Controls {
  const leg = Math.floor(i / 240) % 6, ang = (leg * Math.PI) / 3;
  return { ...idle, moveX: Math.cos(ang), moveZ: Math.sin(ang), toggleMode: i % 600 === 300, sigil: i % 450 === 200 };
}
const pct = (s: number[], p: number) => s[Math.min(s.length - 1, Math.floor(p * s.length))];
const r3 = (x: number) => +x.toFixed(3);
const gc = (globalThis as { gc?: () => void }).gc;
const heapMB = () => { gc?.(); return +(process.memoryUsage().heapUsed / 2 ** 20).toFixed(1); };

const out: unknown[] = [];
for (const seed of seeds) {
  const g = newGame(seed, TUNING), bot = botKind ? newBot(botKind, BOT_GAME[botKind]) : null;
  g.clock.paused = false;
  stepGame(g, { ...idle, moveX: 1 }, STEP);
  let stepsFlown = 0;
  for (const wave of waves) {
    const w0 = performance.now();
    let guard = 0;
    if (bot) while (g.party.wave < wave && !g.over && !g.partyOver && guard++ < wave * 40000) stepGame(g, bot.decide(g), STEP);
    else while (g.party.wave < wave && !g.over && guard++ < wave * 1000) {
      stepGame(g, { ...idle, nextWave: true }, STEP);
      for (let i = 0; i < gap && !g.over; i++) stepGame(g, idle, STEP);
    }
    const reach = performance.now() - w0;
    const heap0 = heapMB();
    const times: number[] = [];
    let lodSum = { full: 0, coarse: 0, frozen: 0, marchFull: 0, marchCoarse: 0 };
    for (let i = 0; i < steps; i++) {
      const c = bot ? bot.decide(g) : path(stepsFlown + i), a = performance.now(); // (the bot's thinking not timed)
      stepGame(g, c, STEP);
      times.push(performance.now() - a);
      if (g.lod) for (const k of Object.keys(lodSum) as (keyof typeof lodSum)[]) lodSum[k] += g.lod[k];
    }
    stepsFlown += steps;
    const heap1 = heapMB();
    const s = [...times].sort((a, b) => a - b), sum = times.reduce((a, b) => a + b, 0);
    const by: Record<string, number> = {};
    let marching = 0;
    for (const c of g.creatures) { by[c.state ?? "wild"] = (by[c.state ?? "wild"] ?? 0) + 1; if (c.siege) marching++; }
    lodSum = Object.fromEntries(Object.entries(lodSum).map(([k, v]) => [k, Math.round(v / steps)])) as typeof lodSum;
    out.push({
      seed, wave: g.party.wave, over: !!g.over, partyOver: !!g.partyOver, reachS: +(reach / 1000).toFixed(1),
      creatures: g.creatures.length, marching, byState: by,
      lod: lodSum,
      step: { mean: r3(sum / steps), p50: r3(pct(s, 0.5)), p95: r3(pct(s, 0.95)), p99: r3(pct(s, 0.99)), worst: r3(s[s.length - 1]), over4: times.filter(t => t > 4).length, over16: times.filter(t => t > 1000 / 60).length },
      heapMB: { before: heap0, after: heap1 },
    });
    console.error(`seed ${seed} wave ${g.party.wave}: ${g.creatures.length} creatures (${marching} marching), p50 ${r3(pct(s, 0.5))} p99 ${r3(pct(s, 0.99))} worst ${r3(s[s.length - 1])} ms, heap ${heap1} MB`);
    if (g.over || g.partyOver) break; // (the party's over: no more waves)
  }
}
console.log(JSON.stringify({ steps, gap, runs: out }, null, 1));
