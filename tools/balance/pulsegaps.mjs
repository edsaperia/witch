// The waves' gaps with the ley pulse at a constant speed (Ed, 2026-10-09: "Pure constant speed"): on each seed's map, the route
// waved through stone by stone (rules/party.ts spreadWave), each gap its stretch's length over the speed (rules/pulseRoute.ts),
// the boot its 179 m path over it (rules/bootRing.ts). Prints the gaps' spread over all seeds (min, p10, median, p90, max) and
// the whole run (boot and every wave) against waves a fixed interval apart after a fixed boot.
//   node tools/balance/pulsegaps.mjs [--seeds 10] [--speed 4] [--interval 60] [--boot 30]
import { openRules, arg } from "./lib.mjs";

const SEEDS = +arg("seeds", 10), SPEED = +arg("speed", 4), INTERVAL = +arg("interval", 60), BOOT = +arg("boot", 30);
const { load, close } = await openRules();
const { generateMap } = await load("/src/rules/map.ts"), { TUNING, withTuning } = await load("/src/rules/tuning.ts");
const { newParty, spreadWave } = await load("/src/rules/party.ts"), { stretchSeconds } = await load("/src/rules/pulseRoute.ts"), { bootSeconds } = await load("/src/rules/bootRing.ts");
const t = withTuning({ leyLines: { ...TUNING.leyLines, pulseSpeed: SPEED } });
const q = (a, p) => a[Math.min(a.length - 1, Math.floor(p * (a.length - 1) + 0.5))];
const all = [], rows = [];
for (let i = 0; i < SEEDS; i++) {
  const seed = 1000 + i * 7919, map = generateMap(seed, t), p = newParty(map), gaps = [];
  for (let w = 0; w < 400; w++) { const s = stretchSeconds(p, map, SPEED); if (!Number.isFinite(s)) break; gaps.push(s); spreadWave(p, map, 0); }
  const boot = bootSeconds(map), run = boot + gaps.reduce((a, b) => a + b, 0), was = BOOT + gaps.length * INTERVAL;
  all.push(...gaps); rows.push({ seed, waves: gaps.length, boot, run, was });
}
all.sort((a, b) => a - b);
const f = s => (s >= 120 ? `${(s / 60).toFixed(1)} min` : `${s.toFixed(1)} s`), m = s => `${(s / 60).toFixed(0)} min`;
console.log(`The ley pulse at ${SPEED} m/s, ${SEEDS} seeds (${all.length} waves)\n`);
console.log(`| gap between waves | min | p10 | median | p90 | max |\n|---|---|---|---|---|---|\n| at ${SPEED} m/s | ${f(all[0])} | ${f(q(all, 0.1))} | ${f(q(all, 0.5))} | ${f(q(all, 0.9))} | ${f(all[all.length - 1])} |\n`);
console.log(`| seed | waves | boot | whole run at ${SPEED} m/s | at ${INTERVAL} s waves after a ${BOOT} s boot |\n|---|---|---|---|---|`);
for (const r of rows) console.log(`| ${r.seed} | ${r.waves} | ${r.boot.toFixed(1)} s | ${m(r.run)} | ${m(r.was)} |`);
const mean = k => rows.reduce((a, r) => a + r[k], 0) / rows.length;
console.log(`| mean | ${mean("waves").toFixed(0)} | ${mean("boot").toFixed(1)} s | ${m(mean("run"))} | ${m(mean("was"))} |`);
close();
