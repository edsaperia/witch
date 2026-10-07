// The rules benchmark and rules-match (Part B of the refactor: "benchmark first"): a headless game
// on fixed seeds, brought on to a late wave with the playtest key, then flown along a fixed path
// for a fixed number of steps, timing every stepGame. Prints the timings and a fingerprint of the
// game's state at checkpoints; a refactor that changes no behaviour gives the same fingerprints
// (tools/bench/run.mjs compares them with a saved baseline). Bundled by tools/bench/run.mjs with
// esbuild and run in Node: no Three.js, no browser.
import { createHash } from "node:crypto";
import { newGame, stepGame, STEP, type Controls, type Game } from "../../src/rules/game";
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

/** JSON of a value with Maps, Sets and typed arrays spelled out, functions left out; canonical: every object's keys
 *  sorted, and its "_" notes (string values under "_"-prefixed keys: the tuning file's) dropped. So a note edited, or the
 *  tuning file's groups reordered, leaves the fingerprint as it was (the game's tuning rides in g.buffs); a value changed
 *  still changes it. (Maps, Sets and arrays keep their order: that's the state's.) */
function plain(v: unknown): string {
  return JSON.stringify(v, (_k, x) => {
    if (x instanceof Map) return { map: [...x.entries()] };
    if (x instanceof Set) return { set: [...x] };
    if (ArrayBuffer.isView(x)) return { typed: Array.from(x as unknown as ArrayLike<number>) };
    if (typeof x === "function") return undefined;
    if (x && typeof x === "object" && !Array.isArray(x)) {
      const o = x as Record<string, unknown>, out: Record<string, unknown> = {};
      for (const k of Object.keys(o).sort()) if (!(k.startsWith("_") && typeof o[k] === "string")) out[k] = o[k];
      return out;
    }
    return x;
  });
}
const hash = (s: string) => createHash("sha256").update(s).digest("hex").slice(0, 12);

/** The state that moves (the map and the forest are made from the seed and stand still). */
function fingerprint(g: Game): Record<string, string> {
  const parts: Record<string, unknown> = {
    clock: g.clock, witches: g.witches, creatures: g.creatures, party: g.party, combat: g.combat, growth: g.growth,
    berries: g.berries, beat: g.beat, camera: g.camera, speakers: g.speakers, floor: g.floor, buffs: g.buffs,
    partyWitches: g.partyWitches, friendly: g.friendly, tally: g.tally, over: g.over,
  };
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(parts)) out[k] = hash(plain(v) ?? "undefined"); // (a part a later change took away, or not made yet)
  out.all = hash(Object.values(out).join(""));
  return out;
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
