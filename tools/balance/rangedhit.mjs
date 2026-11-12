// Do creatures' ranged attacks hit her? (Ed, 2026-11-12: "the preparation time seems long, projectile speed is low, if you're
// moving at all they basically never hit you"; "measure first", and the changes, once decided, for every creature.) Through the real
// attack engine, one cast at a time (tools/balance/rangedhit-core.mjs): each kind's ranged attack at each level, as it throws it
// alone (solo), as a pack or team shooter (team) or, for a close kind, its pack's old bolt (pack), against her standing still,
// walking across the shot, straight away or towards it, zig-zagging every second, and in the treetops; with its current values (wind-up,
// speed, reach, aim, homing, radius) and the time from wind-up to impact against how far she walks in it. Variants in memory only:
// --lead (aim at where she'll be, locked --commit s before release and at least --impact s (never under the reaction floor) before it can reach her; a factor by
// level; --lead-old gives the close kinds' old pack bolts, which lead fully now, the same factor), --speed / --min-speed (times its speed, or
// at least that many times her ground speed), --windup (times, by level) with --windup-floor; never written to the game.
//   node tools/balance/rangedhit.mjs [--kinds home|all|fox,dormouse] [--levels 1,2,3] [--paths solo,team,pack] [--n 300] [--seed 1] [--drift 0 (the caster's m/s through its windup)] [--lo m --hi m]
//                                    [--lead 1:0.5,2:1,3:1] [--commit 0.2 | 1:0.35,2:0.2] [--impact 1:0.75,2:0.6] [--lead-old] [--speed 1.5] [--min-speed 2] [--windup 0.7 | 1:0.6,2:0.75] [--windup-floor 0.45] [--values] [--json out.json]
import { writeFileSync } from "node:fs";
import { openRules, arg } from "./lib.mjs";
import { loadRules, attackFor, applyVariant, hitRate, isRanged, timeToImpact } from "./rangedhit-core.mjs";

const byLevel = s => (s === undefined ? undefined : s.includes(":") ? Object.fromEntries(s.split(",").map(kv => kv.split(":").map(Number))) : Number(s));
const N = +arg("n", 300), SEED = +arg("seed", 1), DRIFT = +arg("drift", 0), LEVELS = String(arg("levels", "1,2,3")).split(",").map(Number), PATHS = String(arg("paths", "solo,team,pack")).split(",");
const LO = arg("lo", undefined), HI = arg("hi", undefined);
const V = Object.fromEntries(Object.entries({ lead: byLevel(arg("lead", undefined)), commit: byLevel(arg("commit", undefined)), impact: byLevel(arg("impact", undefined)), speed: arg("speed", undefined) === undefined ? undefined : +arg("speed"), minSpeed: arg("min-speed", undefined) === undefined ? undefined : +arg("min-speed"), windup: byLevel(arg("windup", undefined)), windupFloor: arg("windup-floor", undefined) === undefined ? undefined : +arg("windup-floor"), leadOld: process.argv.includes("--lead-old") || undefined }).filter(([, v]) => v !== undefined));
const PATTERNS = ["still", "across", "away", "toward", "zigzag"];

const { load, close } = await openRules();
const R = await loadRules(load);
const home = Object.entries((await load("/src/rules/kinds.ts")).KINDS_TABLE).filter(([, k]) => k.phase === 0).map(([id]) => id);
const kindsArg = String(arg("kinds", "home")), KINDS = kindsArg === "home" ? home : kindsArg === "all" ? Object.keys(R.SPECIES_ATTACKS) : kindsArg.split(",");

/** Its values in words: speed, aim, homing, radius. */
function describe(atk) {
  const s = atk.spec, kind = s.body?.kind ?? "bolt", path = s.path ?? [];
  const speed = kind === "lob" ? `lob, ${s.body?.flight ?? 1.2} s up` : kind === "bolt" || kind === "runner" ? `${s.speed?.v ?? 28}${s.speed?.profile ? ` ${s.speed.profile}${s.speed.to !== undefined ? `→${s.speed.to}` : ""}` : ""} m/s` : kind === "beam" ? "beam" : kind === "area" ? "none (ground)" : kind;
  const home = path.find(p => "home" in p)?.home, bent = path.filter(p => !("home" in p)).map(p => Object.keys(p)[0]);
  const aim = atk.aim === "release" ? (atk.lead ? `at release, leads ×${atk.lead}` : "at release") : kind === "lob" || s.area?.at === "target" ? "where she stood at wind-up start" : "her place at wind-up start";
  const radius = kind === "beam" ? `${s.beam?.width ?? 1} wide` : kind === "area" ? `r ${s.area?.r ?? 2}` : `${+(s.body?.radius ?? 0.6).toFixed(2)}`;
  const pattern = s.emit?.pattern && s.emit.pattern !== "single" ? ` ${s.emit.pattern}×${s.emit.n ?? 1}` : "";
  return { body: kind + pattern, speed, aim, homing: home ? `turns ${home.turn}°/s after ${home.after ?? 0} s` : "none", bent: bent.join("+") || "", radius };
}

const rows = [], say = s => console.log(s), t0 = Date.now();
say(`Variant: ${Object.keys(V).length ? JSON.stringify(V) : "none (current values)"}; ${N} casts a cell, seed ${SEED}, caster drift ${DRIFT} m/s.\n`);
say("| kind | level | path | body | wind-up s | speed | fires from (m) | stands at (m) | cooldown s | aim | homing | path bends | radius | wind-up→impact s (she walks m) | still | across | away | toward | zig-zag | treetops |");
say("|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|");
for (const sp of KINDS) for (const level of LEVELS) for (const path of PATHS) {
  const base = attackFor(R, sp, level, path);
  if (!base || !isRanged(R, base.spec)) continue;
  const atk = applyVariant(R, base, level, V), d = describe(atk), legend = level === 3;
  const range = legend ? { lo: +(LO ?? 20), hi: +(HI ?? 60) } : { lo: LO === undefined ? undefined : +LO, hi: HI === undefined ? undefined : +HI };
  const mid = legend ? (range.lo + range.hi) / 2 : atk.stand, tti = timeToImpact(R, atk, mid);
  const hits = {};
  if (!arg("values", false) && !process.argv.includes("--values")) {
    for (const p of PATTERNS) hits[p] = hitRate(R, atk, p, { n: N, seed: SEED, drift: DRIFT, ...range }).rate;
    hits.treetop = hitRate(R, atk, "still", { n: Math.max(20, N / 10), seed: SEED, mode: "treetop", ...range }).rate;
  }
  const pc = x => (x === undefined ? "" : `${Math.round(x * 100)}%`);
  const row = { kind: sp, level, path, ...d, windup: atk.windup, fire: atk.fire, stand: atk.stand, cooldown: atk.cooldown, impact: tti, hits };
  rows.push(row);
  say(`| ${sp} | ${["baby", "young", "adult", "legend"][level]} | ${path} | ${d.body} | ${(+atk.windup).toFixed(2)} | ${d.speed.replace(/(\d+\.\d)\d+/g, "$1")} | ${atk.fire.toFixed(0)} | ${legend ? `${range.lo}–${range.hi} (any to ${atk.fire})` : atk.stand.toFixed(1)} | ${atk.cooldown} | ${d.aim} | ${d.homing} | ${d.bent} | ${d.radius} | ${tti.total.toFixed(2)} (${tti.walked.toFixed(0)}) | ${PATTERNS.map(p => pc(hits[p])).join(" | ")} | ${pc(hits.treetop)} |`);
}
say(`\n(babies have no attack; ${((Date.now() - t0) / 1000).toFixed(0)} s)`);
const json = arg("json", "");
if (json) writeFileSync(json, JSON.stringify({ variant: V, n: N, seed: SEED, drift: DRIFT, rows }, null, 1));
await close();
