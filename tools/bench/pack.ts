// The challenge pack's cost (Ed, 2026-11-03: "128 animal pack is the ultimate challenge"): the late-campaign home, every kind known
// (64 by default, --kinds), her down in the middle of its challenge circle with its whole pack (an adult and a youth of each kind)
// hunting her, timing every stepGame over --steps (600: 10 s) of the fight; then, for comparison on the same machine, a normal heavy
// wave fight (the home of 10, brought to --wave 28 with the playtest key and flown along perf.ts's path). Her health held: she
// never falls. Per run: step mean/p50/p95/p99/worst, steps over 4 and 16.7 ms (perf.ts's), the pack hunting her, its attacks.
// node tools/bench/ts.mjs pack [--kinds=64] [--steps=600] [--seed=1] [--wave=28]. Report only: it changes nothing in the game.
import { newGame, stepGame, STEP, type Controls, type Game } from "../../src/rules/game";
import { TUNING, type Tuning } from "../../src/rules/tuning";
import { knownKinds } from "../../src/rules/rosters";
import { KINDS_TABLE } from "../../src/rules/kinds";

const args = new Map(process.argv.slice(2).map(a => { const [k, v] = a.replace(/^--/, "").split("="); return [k, v ?? "1"]; }));
const kinds = Number(args.get("kinds") ?? 64), steps = Number(args.get("steps") ?? 600), seed = Number(args.get("seed") ?? 1), wave = Number(args.get("wave") ?? 28);
const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
const pct = (s: number[], p: number) => s[Math.min(s.length - 1, Math.floor(p * s.length))];
const r3 = (x: number) => +x.toFixed(3);
const stats = (times: number[]) => { const s = [...times].sort((a, b) => a - b), sum = times.reduce((a, b) => a + b, 0); return { mean: r3(sum / times.length), p50: r3(pct(s, 0.5)), p95: r3(pct(s, 0.95)), p99: r3(pct(s, 0.99)), worst: r3(s[s.length - 1]), over4: times.filter(t => t > 4).length, over16: times.filter(t => t > 1000 / 60).length }; };

/** The late home: `n` kinds known (home's 10 first, then the rest in the table's order), an area each. */
export function lateHome(n: number, t: Tuning = TUNING): Tuning {
  const all = knownKinds(Object.keys(KINDS_TABLE)).slice(0, n);
  return { ...t, map: { ...t.map!, island: "home", islandAreas: all.length, found: all } };
}

function packFight(): unknown {
  const t0 = performance.now(), g: Game = newGame(seed, lateHome(kinds)), made = performance.now() - t0;
  const ch = g.challenge!;
  g.clock.paused = false; g.party.spellAt = undefined; g.party.paused = true; // (no waves: the pack alone)
  g.witches[0].health.hp = 1e9;
  // (every other creature near the circle gone: the pack alone hunts her)
  for (const c of g.creatures) if (!ch.pack.includes(c.id) && Math.hypot(c.x - ch.x, c.z - ch.z) < 300) c.gone = true;
  g.byArea = null;
  g.witch = { ...g.witch, x: ch.x, z: ch.z + 2, mode: "ground", lift: 0, seated: false, perch: undefined, vx: 0, vz: 0 };
  const times: number[] = [];
  let hunting = 0, near = 0, hits = 0, windups = 0; // (hits: steps she was hurt in; windups: strikes begun)
  const dist: number[] = [], seenWindup = new Set<string>();
  // (she walks slow circles round the middle, as a player dodging would: the pack follows)
  for (let i = 0; i < steps; i++) {
    const a = (i / 240) * Math.PI * 2, c: Controls = { ...idle, moveX: Math.cos(a) * 0.5, moveZ: Math.sin(a) * 0.5 };
    g.witches[0].health.hp = 1e9;
    const s = performance.now();
    stepGame(g, c, STEP);
    times.push(performance.now() - s);
    if (i === steps - 1) for (const id of ch.pack) { const k = g.creatures[id]; if (k.hunting !== undefined) hunting++; if (Math.hypot(k.x - g.witch.x, k.z - g.witch.z) < 6) near++; dist.push(Math.hypot(k.x - g.witch.x, k.z - g.witch.z)); }
    for (const e of g.combat?.events ?? []) if (e.kind === "windup" && !seenWindup.has(`${e.id}@${e.at}`)) { seenWindup.add(`${e.id}@${e.at}`); windups++; }
    if (g.witches[0].health.hp < 1e9) hits++;
  }
  // (the timed part: from the wild watch's end on, the fight itself)
  const watch = Math.round((TUNING.wildWatch?.time ?? 4) / STEP) + 30;
  const fight = times.slice(watch);
  return { kinds, pack: ch.pack.length, radius: ch.radius, creatures: g.creatures.length, makeMs: Math.round(made), hunting, within6m: near, hurtSteps: hits, windups, distance: { p10: r3(pct(dist.sort((a, b) => a - b), 0.1)), p50: r3(pct(dist, 0.5)), p90: r3(pct(dist, 0.9)) }, all: stats(times), fight: stats(fight) };
}

function waveFight(): unknown {
  const g = newGame(seed, TUNING);
  g.clock.paused = false;
  g.witches[0].health.hp = 1e9;
  stepGame(g, { ...idle, moveX: 1 }, STEP);
  let guard = 0;
  while (g.party.wave < wave && !g.over && guard++ < wave * 1000) { stepGame(g, { ...idle, nextWave: true }, STEP); for (let i = 0; i < 180 && !g.over; i++) stepGame(g, idle, STEP); }
  const times: number[] = [];
  for (let i = 0; i < steps; i++) {
    const leg = Math.floor(i / 240) % 6, ang = (leg * Math.PI) / 3, c = { ...idle, moveX: Math.cos(ang), moveZ: Math.sin(ang), toggleMode: i % 600 === 300, sigil: i % 450 === 200 };
    g.witches[0].health.hp = 1e9;
    const s = performance.now();
    stepGame(g, c, STEP);
    times.push(performance.now() - s);
  }
  let marching = 0;
  for (const c of g.creatures) if (c.siege) marching++;
  return { wave: g.party.wave, creatures: g.creatures.length, marching, all: stats(times) };
}

const pack = packFight();
console.error(`pack of ${kinds} kinds: ${JSON.stringify(pack)}`);
const waves = args.get("wave") === "0" ? null : waveFight();
if (waves) console.error(`wave fight: ${JSON.stringify(waves)}`);
console.log(JSON.stringify({ steps, seed, pack, waves }, null, 1));
