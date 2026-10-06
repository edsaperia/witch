// Can she walk away from a charge or a leap? (Ed, 2026-10-06: "Charging creatures can easily be evaded by
// just walking away from them. They should jump far enough or charge far enough that this doesn't work.")
// The real rules, headless: each charging or leaping species (an adult, wild) set at a distance from her on
// the ground, and her escape, from the moment its head goes down (its windup, the tell): walk (straight away from it, at her ground speed), side
// (standing till its head goes down, then walking at right angles to its lane: the skilful dodge), blink
// (straight away, blinking the moment its head goes down), stand (the control: still). Each cell: hit (✗ caught) or not (✓ escaped), within 8 s.
//   node tools/balance/charges.mjs [--dists 10,20,30,40] [--escapes walk,side,blink,stand] [--set path=value;...]
import { arg, list, openRules } from "./lib.mjs";

const DISTS = list(arg("dists", "10,15,20,25,30,40")).map(Number), ESC = list(arg("escapes", "walk,side,blink"));
const SETS = String(arg("set", "")).split(";").filter(Boolean).map(kv => { const [k, v] = kv.split("="); return [k.trim().split("."), JSON.parse(v)]; });
const { load, close } = await openRules();
const { TUNING, withTuning } = await load("/src/rules/tuning.ts");
const { newGame, stepGame, STEP } = await load("/src/rules/game.ts");
const MOVE = (await import("node:fs")).readFileSync("config/movement.json", "utf8");
const PROFILES = JSON.parse(MOVE).profiles;
const SPECIES = Object.entries(PROFILES).filter(([, p]) => p.move && (p.move.kind === "charge" || p.move.kind === "leap")).map(([s, p]) => [s, p.move.kind]);
const over = () => { const o = {}; for (const [path, v] of SETS) { let a = o, src = TUNING; for (const k of path.slice(0, -1)) { src = src[k]; a = a[k] ??= { ...src }; } a[path[path.length - 1]] = v; } return o; };
const T = withTuning({ ...over(), legendCircle: { ...TUNING.legendCircle, slow: { ...TUNING.legendCircle?.slow, on: false } } });

function trial(species, dist, esc) {
  const g = newGame(77, T); g.clock.paused = false; g.party.paused = true;
  const d0 = g.map.dancefloor;
  g.witch = { ...g.witch, seated: false, x: d0.x + 260, z: d0.z + 60, mode: "ground", lift: 0 };
  const W = g.witches[0]; W.health.hp = 1e6;
  for (const c of g.creatures) if (Math.hypot(c.x - g.witch.x, c.z - g.witch.z) < 250) c.gone = true;
  const c = g.creatures.find(k => !k.gone && !k.leashed && !k.boss && Math.hypot(k.x - g.witch.x, k.z - g.witch.z) > 300);
  const x = g.witch.x - dist, z = g.witch.z;
  Object.assign(c, { species, level: 2, x, z, tx: x, tz: z, homeX: x, homeZ: z, anchorX: x, anchorZ: z, safeR: undefined, seen: g.clock.time, hp: undefined, boss: false, siege: undefined, rest: 0, state: "enraged", enraged: true, circle: undefined });
  c.cell = g.map.cellSafe(g.witch.x, g.witch.z).cell; g.byArea = null;
  const hp0 = W.health.hp; let side = 0, seen = false;
  for (let i = 0; i < 8 / STEP; i++) {
    let mx = 0, mz = 0, boost = false;
    const away = { x: g.witch.x - c.x, z: g.witch.z - c.z }, ad = Math.hypot(away.x, away.z) || 1;
    const wound = (c.charge && c.charge.from !== undefined) || c.leap;
    if (wound) seen = true; // (she reacts to its tell: until its head goes down, she stands)
    if ((esc === "walk" || esc === "blink") && seen) { mx = away.x / ad; mz = away.z / ad; }
    if (esc === "blink" && wound && !side) { side = 1; boost = true; } // (one blink away, the moment its head goes down)
    if (esc === "side") { if (wound && !side) side = 1; if (side) { mz = 1; } }
    stepGame(g, { moveX: mx, moveZ: mz, toggleMode: false, zoom: 0, autoTalk: false, dash: boost }, STEP);
    if (W.health.hp < hp0) return { hit: true, at: g.clock.time };
  }
  return { hit: false };
}

console.log(`Walking away from a charge or a leap (the real rules; her ground speed ${T.groundSpeed} m/s). ✗ caught, ✓ escaped, within 8 s.\n`);
console.log("| species | move | " + ESC.map(e => DISTS.map(d => `${e} ${d} m`).join(" | ")).join(" | ") + " |");
console.log("|---|---|" + ESC.map(() => DISTS.map(() => "---").join("|")).join("|") + "|");
for (const [sp, kind] of SPECIES) {
  const cells = ESC.flatMap(e => DISTS.map(d => (trial(sp, d, e).hit ? "✗" : "✓")));
  console.log(`| ${sp} | ${kind} | ${cells.join(" | ")} |`);
}
await close();
