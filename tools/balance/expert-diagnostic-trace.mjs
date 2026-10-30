// Paired diagnostic trace (PR #1477, diagnostic-1): one bot, the report-runtime.mjs `make` setup stated explicitly, JSONL out.
//   node tools/balance/expert-diagnostic-trace.mjs --bot expert|skilled --out file.jsonl [--limit 600] [--wall 900]
// Diagnostic only: reads the game's full state, never an input to the expert.
import { writeFileSync, appendFileSync } from "node:fs";
import { arg, openRules } from "./lib.mjs";
const BOT = arg("bot", "expert"), OUT = arg("out", `${BOT}.jsonl`), LIMIT = +arg("limit", 600), WALL = +arg("wall", 900) * 1000;
const CASE = { worldSeed: 0, seed: 1000, bpm: 100, island: "home", condition: "matched", bag: "satchel", hat: "none", wearsHat: false, parts: [] };
const { load, close } = await openRules();
const { TUNING, withTuning } = await load("/src/rules/tuning.ts");
const { newGame, stepGame, STEP } = await load("/src/rules/game.ts");
const { newBot } = await load("/src/rules/bot.ts");
const { recordTempo } = await load("/src/rules/beat.ts");
const { fillTrunk } = await load("/src/rules/finds.ts");
const { stateOf } = await load("/src/rules/creatureStates.ts");
const { stoneStack, castReady, stoneOpen, stoneNear } = await load("/src/rules/stoneStacks.ts");
const c = CASE;
const g = newGame(c.seed, withTuning({ map: { ...TUNING.map, island: c.island, world: c.worldSeed }, spells: { ...TUNING.spells, bag: c.bag, hat: c.hat, parts: c.parts } }));
g.witches[0].hat.has = c.wearsHat; g.clock.paused = false; g.witches[0].body = { ...g.witches[0].body, seated: false };
recordTempo(g.beat, g.tuning, c.bpm, 0); fillTrunk(g, {});
const brain = newBot(BOT, { expertSeed: c.seed ^ 0x1477, bag: c.bag });
const w = g.witches[0], r = x => Math.round(x * 100) / 100, areaKey = () => { const cl = g.map.cellSafe(w.body.x, w.body.z).cell; return `${cl[0]},${cl[1]}`; };
writeFileSync(OUT, "");
const emit = o => appendFileSync(OUT, JSON.stringify(o) + "\n");
emit({ ev: "setup", bot: BOT, case: c, expertSeed: c.seed ^ 0x1477, STEP, limit: LIMIT });
const t0 = Date.now();
let lastDoing = null, lastArea = null, lastSpell = g.party.spellAt, lastWave = -1, hits = 0, happy = 0, sw = { fire: 0, sigil: 0, place: 0, toggle: 0, cast: 0, held: 0 }, nextSample = 0, outcome = "limit", lastCasting = null;
const sample = () => {
  const b = w.body, near = g.creatures.filter(q => !q.gone && Math.hypot(q.x - b.x, q.z - b.z) < 80).sort((p, q) => Math.hypot(p.x - b.x, p.z - b.z) - Math.hypot(q.x - b.x, q.z - b.z)).slice(0, 12)
    .map(q => ({ id: q.id, sp: q.species, rank: q.boss ? 3 : q.level, angry: stateOf(q) === "angry" || !!q.enraged, happy: stateOf(q) === "happy", d: r(Math.hypot(q.x - b.x, q.z - b.z)) }));
  const cs = stoneNear(g, b.x, b.z, 80), key = areaKey(), stone = cs ? { key: cs.key, ready: true, d: r(Math.hypot(cs.x - b.x, cs.z - b.z)) } : null;
  const here = stoneOpen(g, key) ? { key, open: true, ready: castReady(g, key), enemies: stoneStack(g, key).filter(e => !e.friend).length, friends: stoneStack(g, key).filter(e => e.friend).length } : { key, open: false };
  emit({ ev: "sample", herTime: r(g.herTime), worldTime: r(g.clock.time), doing: brain.doing, x: r(b.x), z: r(b.z), mode: b.mode, hp: w.health.hp, ko: !!w.ko, ctl: { ...sw }, carried: w.leash.stack.length, placed: w.leash.placed.length, targets: near, castableStone: stone, hereStone: here, hits, happy, wave: g.party.wave, spellAt: g.party.spellAt, area: key });
  sw = { fire: 0, sigil: 0, place: 0, toggle: 0, cast: 0, held: 0 };
};
for (let i = 0; i < Math.ceil(LIMIT / STEP); i++) {
  const dt = Math.min(STEP, LIMIT - i * STEP), ctl = brain.decide(g);
  stepGame(g, ctl, dt);
  if (ctl.fire) sw.fire++; if (ctl.sigil) sw.sigil++; if (ctl.place) sw.place++; if (ctl.toggleMode) sw.toggle++; if (ctl.castParty) sw.cast++; if (ctl.sigilHeld) sw.held++;
  for (const e of w.invites.events) { if (e.kind === "hit") hits++; if (e.kind === "happy") happy++; }
  if (brain.doing !== lastDoing) { emit({ ev: "doing", herTime: r(g.herTime), worldTime: r(g.clock.time), from: lastDoing, doing: brain.doing }); lastDoing = brain.doing; }
  const ak = areaKey(); if (ak !== lastArea) { emit({ ev: "area", herTime: r(g.herTime), worldTime: r(g.clock.time), area: ak, from: lastArea }); lastArea = ak; }
  if (g.party.spellAt !== lastSpell) { emit({ ev: "partySpell", herTime: r(g.herTime), spellAt: g.party.spellAt }); lastSpell = g.party.spellAt; }
  const cst = (() => { try { return stoneNear(g, w.body.x, w.body.z, 0)?.key ?? null; } catch { return null; } })(); const casting = cst && ctl.sigilHeld ? cst : null;
  if (casting !== lastCasting) { emit({ ev: "cast", herTime: r(g.herTime), stone: casting }); lastCasting = casting; }
  if (g.party.wave !== lastWave) { emit({ ev: "wave", herTime: r(g.herTime), worldTime: r(g.clock.time), wave: g.party.wave }); lastWave = g.party.wave; }
  if (g.herTime >= nextSample) { sample(); nextSample += 1; }
  if (g.partyOver) { outcome = "lost"; break; }
  if (g.win?.wonAt !== undefined) { outcome = "won"; break; }
  if (Date.now() - t0 > WALL) { outcome = "wall-cap"; break; }
}
sample();
emit({ ev: "end", outcome, herTime: r(g.herTime), worldTime: r(g.clock.time), wave: g.party.wave, wallSeconds: r((Date.now() - t0) / 1000), partyOver: g.partyOver ? { ...g.partyOver } : null, win: g.win ? { phase: g.win.phase, wonAt: g.win.wonAt } : null });
await close();
