import { test } from "node:test";
import assert from "node:assert/strict";
import { observer, phaseOf, markdown, caseKey, rangedTargeted } from "./report-core.mjs";
import { runtime } from "./report-runtime.mjs";

test("observations separate cutoff, KO onset, wave passage and completed phases", () => {
  const g = { clock: { time: 0 }, witches: [{ ko: null }], party: { wave: 0 }, win: null, partyOver: null, islandsTonight: ["fox"], trunk: { found: true, kind: "record", item: "120" } };
  const o = observer();
  const step = (dt, mutate, exposure) => { const before = { phase: phaseOf(g), wave: g.party.wave }; mutate(); g.clock.time += dt; o.step(before, g, dt, exposure); };
  step(2, () => { g.party.wave = 1; g.witches[0].ko = {}; }, null);
  step(3, () => {}, null);
  step(1, () => { g.witches[0].ko = null; }, true);
  let r = o.finish(g);
  assert.equal(r.outcome, "censored"); assert.equal(r.knockdowns, 1); assert.equal(r.wavesPassed, 0);
  assert.equal(r.phases.opening.completed, true); assert.equal(r.phases.opening.seconds, 2);
  assert.equal(r.phases.waves.completed, false); assert.equal(r.phases.waves.seconds, 4);
  assert.equal(r.rangedSeconds, 1); assert.equal(r.eligibleSeconds, 1);
  assert.deepEqual(r.islandsKept, []); assert.equal(r.loanEligibleToKeep, false);
  g.partyOver = { at: 6 }; assert.equal(o.finish(g).outcome, "lost");
  g.partyOver = null; g.win = { phase: "won", wonAt: 6, found: ["fox"] };
  r = o.finish(g); assert.equal(r.outcome, "won"); assert.deepEqual(r.islandsKept, ["fox"]); assert.equal(r.loanEligibleToKeep, true);
});

test("tables keep bag/bpm/island denominators separate and omit censored win times", () => {
  const base = { mode: "runs", island: "home", phaseNumber: 0, bpm: 100, bag: "satchel", bot: "sloppy", waveReached: 2, wavesPassed: 1, knockdowns: 0, rangedSeconds: 0, eligibleSeconds: 0, islandsDiscovered: [], islandsKept: [], loanFound: null, phases: {} };
  const rows = [{ ...base, outcome: "won", wonAt: 20 }, { ...base, outcome: "censored", wonAt: null }, { ...base, bpm: 200, outcome: "lost", wonAt: null }];
  const md = markdown(rows, { seeds: [1000], step: 1 / 60, limit: 30 });
  assert.match(md, /2 \| 1 \/ 0 \/ 1 \| 50\.00 \| 20\.00/);
  assert.match(md, /200 \| satchel \| sloppy \| 1 \| 0 \/ 1 \/ 0 \| 0\.00 \| —/);
  assert.doesNotMatch(md, /NaN|Infinity/);
  assert.notEqual(caseKey({ seed: 1, bag: "satchel" }), caseKey({ seed: 1, bag: "tote" }));
});

test("real-rules replay is deterministic across interleaved bots and bags", async () => {
  const r = await runtime();
  try {
    const c = { seed: 1000, island: "home", bpm: 120, bag: "satchel", bot: "sloppy" };
    const first = r.run(c, 30);
    r.run({ ...c, bot: "skilled", bag: "purse", bpm: 200 }, 5);
    assert.deepEqual(r.run(c, 30), first);
    assert.equal(first.outcome, "censored");
    assert.ok(Math.abs(Object.values(first.phases).reduce((s, p) => s + p.seconds, 0) - first.end) < 1e-8);
    const stun = { seed: 1000, bpm: 100, bag: "tote", species: "fox", level: 1 };
    const a = r.stun(stun, 15, 10), b = r.stun(stun, 15, 10);
    assert.deepEqual(a, b); assert.equal(a.stunned, true); assert.ok(a.hits > 0);
  } finally { await r.close(); }
});

test("ranged observation counts this witch's live casts, excluding melee, expired and other targets", () => {
  const target = { kind: "witch", id: 0 }, spells = { pending: [], bodies: [], beams: [] };
  const g = { witches: [{ id: 0, body: { mode: "ground" } }], clock: { time: 10 }, creatures: [], combat: { spells, beams: [] } };
  const attack = () => ({ attack: { delivery: "shot" } });
  assert.equal(rangedTargeted(g, attack), false);
  spells.pending.push({ aim: target, attack: { body: { kind: "melee" } } });
  assert.equal(rangedTargeted(g, attack), false);
  spells.pending[0].attack.body.kind = "bolt"; assert.equal(rangedTargeted(g, attack), true);
  spells.pending[0].aim = { kind: "witch", id: 1 }; assert.equal(rangedTargeted(g, attack), false);
  spells.bodies.push({ alive: true, target }); assert.equal(rangedTargeted(g, attack), true);
  spells.bodies[0].alive = false; assert.equal(rangedTargeted(g, attack), false);
  g.creatures.push({ fight: { windupUntil: 11, target, packMove: "ranged" } });
  assert.equal(rangedTargeted(g, () => null), true);
  g.creatures[0].fight.windupUntil = 9; assert.equal(rangedTargeted(g, attack), false);
  g.witches[0].ko = {}; assert.equal(rangedTargeted(g, attack), null);
  g.witches[0].ko = null; g.witches[0].body.mode = "treetop"; assert.equal(rangedTargeted(g, attack), null);
});
