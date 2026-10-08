// Where the rules allocate (phase 2's GC churn audit): a headless game on a seed brought to a late wave with the playtest
// key, then flown along the bench's fixed path while V8's sampling heap profiler records every allocation by function.
// Prints the bytes allocated a step, collections, and the top allocating functions (self) with their files.
//   node tools/bench/alloc.mjs [--seed=123] [--wave=20] [--steps=1200] [--top=30]
import { Session } from "node:inspector/promises";
import { newGame, stepGame, STEP, type Controls } from "../../src/rules/game";
import { TUNING } from "../../src/rules/tuning";

const args = new Map(process.argv.slice(2).map(a => { const [k, v] = a.replace(/^--/, "").split("="); return [k, v ?? "1"]; }));
const seed = Number(args.get("seed") ?? 123), wave = Number(args.get("wave") ?? 20), steps = Number(args.get("steps") ?? 1200), top = Number(args.get("top") ?? 30);
const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
const path = (i: number): Controls => { const leg = Math.floor(i / 240) % 6, ang = (leg * Math.PI) / 3; return { ...idle, moveX: Math.cos(ang), moveZ: Math.sin(ang), toggleMode: i % 600 === 300, sigil: i % 450 === 200 }; };

const g = newGame(seed, TUNING);
g.clock.paused = false;
stepGame(g, { ...idle, moveX: 1 }, STEP);
let guard = 0;
while (g.party.wave < wave && !g.over && guard++ < wave * 1000) { stepGame(g, { ...idle, nextWave: true }, STEP); for (let i = 0; i < 180 && !g.over; i++) stepGame(g, idle, STEP); }
for (let i = 0; i < 120; i++) stepGame(g, path(i), STEP); // (warm)

type Node = { callFrame: { functionName: string; url: string; lineNumber: number }; selfSize: number; children: Node[] };
const s = new Session(); s.connect();
await s.post("HeapProfiler.enable");
await s.post("HeapProfiler.startSampling", { samplingInterval: 1024, includeObjectsCollectedByMajorGC: true, includeObjectsCollectedByMinorGC: true } as never);
const t0 = performance.now();
for (let i = 0; i < steps; i++) stepGame(g, path(i), STEP);
const ms = performance.now() - t0;
const { profile } = (await s.post("HeapProfiler.stopSampling")) as unknown as { profile: { head: Node } };
const by = new Map<string, number>();
let total = 0;
const walk = (n: Node) => { const f = n.callFrame, k = `${f.functionName || "(anon)"}  ${(f.url.split("/src/")[1] ?? f.url.split("/").pop() ?? "")}:${f.lineNumber + 1}`; by.set(k, (by.get(k) ?? 0) + n.selfSize); total += n.selfSize; n.children.forEach(walk); };
walk(profile.head);
const creatures = g.creatures.filter(c => !c.gone).length;
console.log(`seed ${seed}, wave ${g.party.wave}, ${creatures} creatures, ${steps} steps: ${(total / steps / 1024).toFixed(1)} KB allocated a step (sampled), ${(ms / steps).toFixed(2)} ms a step`);
console.log("top allocators (self, KB a step):");
for (const [k, v] of [...by].sort((a, b) => b[1] - a[1]).slice(0, top)) console.log(`${(v / steps / 1024).toFixed(2).padStart(8)}  ${(100 * v / total).toFixed(1).padStart(5)}%  ${k}`);
