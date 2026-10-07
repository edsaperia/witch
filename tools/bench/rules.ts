// The rules benchmark and rules-match (Part B of the refactor: "benchmark first"): a headless game
// on fixed seeds, brought on to a late wave with the playtest key, then flown along a fixed path
// for a fixed number of steps, timing every stepGame. Prints the timings and a fingerprint of the
// game's state at checkpoints; a refactor that changes no behaviour gives the same fingerprints
// (tools/bench/run.mjs compares them with a saved baseline). Bundled by tools/bench/run.mjs with
// esbuild and run in Node: no Three.js, no browser.
import { newGame, stepGame, STEP, type Controls } from "../../src/rules/game";
import { fingerprint } from "./fingerprint";
import { TUNING } from "../../src/rules/tuning";

const args = new Map(process.argv.slice(2).map(a => { const [k, v] = a.replace(/^--/, "").split("="); return [k, v ?? "1"]; }));
const seeds = (args.get("seeds") ?? "123,165272").split(",").map(Number);
const wave = Number(args.get("wave") ?? 30), steps = Number(args.get("steps") ?? 1800), every = Number(args.get("every") ?? 300);

const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };

/** The fixed path flown while timing: a loop of headings, rising and descending now and then. */
function path(i: number): Controls {
  const leg = Math.floor(i / 240) % 6, ang = (leg * Math.PI) / 3;
  return { ...idle, moveX: Math.cos(ang), moveZ: Math.sin(ang), toggleMode: i % 600 === 300, sigil: i % 450 === 200 };
}

const pct = (xs: number[], p: number) => { const s = [...xs].sort((a, b) => a - b); return s[Math.min(s.length - 1, Math.floor(p * s.length))]; };

const report: unknown[] = [];
for (const seed of seeds) {
  const t0 = performance.now();
  const g = newGame(seed, TUNING);
  const built = performance.now() - t0;
  g.clock.paused = false;
  // Off the seat, then a wave every few seconds until the late wave (or the run ends).
  stepGame(g, { ...idle, moveX: 1 }, STEP);
  const w0 = performance.now();
  let guard = 0;
  while (g.party.wave < wave && !g.over && guard++ < wave * 1000) {
    stepGame(g, { ...idle, nextWave: true }, STEP);
    for (let i = 0; i < 180 && !g.over; i++) stepGame(g, idle, STEP);
  }
  const reach = performance.now() - w0;
  const times: number[] = [], prints: { step: number; print: Record<string, string> }[] = [];
  for (let i = 0; i < steps; i++) {
    const a = performance.now();
    stepGame(g, path(i), STEP);
    times.push(performance.now() - a);
    if ((i + 1) % every === 0) prints.push({ step: i + 1, print: fingerprint(g) });
  }
  const sum = times.reduce((a, b) => a + b, 0);
  report.push({
    seed, wave: g.party.wave, over: !!g.over, creatures: g.creatures.length, areas: g.party.areas.size,
    buildMs: +built.toFixed(1), reachMs: +reach.toFixed(0),
    step: { mean: +(sum / steps).toFixed(3), median: +pct(times, 0.5).toFixed(3), p99: +pct(times, 0.99).toFixed(3), worst: +Math.max(...times).toFixed(3) },
    prints,
  });
}
console.log(JSON.stringify({ wave, steps, every, seeds: report }, null, 1));
