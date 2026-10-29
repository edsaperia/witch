import { openRules } from "./lib.mjs";
import { observer, phaseOf, rangedTargeted } from "./report-core.mjs";

export async function runtime() {
  const { load, close } = await openRules();
  try {
    const { TUNING, withTuning } = await load("/src/rules/tuning.ts");
    const { newGame, stepGame, STEP } = await load("/src/rules/game.ts");
    const { newBot, BOT_KINDS } = await load("/src/rules/bot.ts");
    const { BAGS } = await load("/src/rules/bags.ts");
    const { REAL_KINDS, KINDS } = await load("/src/rules/rosters.ts");
    const { CREATURE_IDS } = await load("/src/rules/creatureConfig.ts");
    const { recordTempo } = await load("/src/rules/beat.ts");
    const { attackOf } = await load("/src/rules/combat/data.ts");
    const { fillTrunk } = await load("/src/rules/finds.ts");
    const make = c => {
      const g = newGame(c.seed, withTuning({ map: { ...TUNING.map, island: c.island ?? "home" }, spells: { ...TUNING.spells, bag: c.bag, hat: "none", parts: [] } }));
      g.clock.paused = false;
      g.witches[0].body = { ...g.witches[0].body, seated: false };
      recordTempo(g.beat, g.tuning, c.bpm, 0);
      fillTrunk(g, {}); // Fixed empty-owned finds profile, not this computer's saved campaign.
      return g;
    };
    function run(c, limit) {
      const g = make(c), brain = newBot(c.bot === "sloppy" ? "novice" : c.bot, { bag: c.bag }), seen = observer();
      for (let i = 0; i < Math.ceil(limit / STEP); i++) {
        const dt = Math.min(STEP, limit - i * STEP), before = { phase: phaseOf(g), wave: g.party.wave, time: g.clock.time };
        const exposed = rangedTargeted(g, attackOf);
        stepGame(g, brain.decide(g), dt);
        seen.step(before, g, g.clock.time - before.time, exposed);
        if (g.partyOver || g.win?.wonAt !== undefined) break;
      }
      return { ...c, mode: "runs", playerEnd: g.herTime, phaseNumber: c.island === "home" ? 0 : KINDS[c.island].phase + 1, ...seen.finish(g) };
    }
    function stun(c, limit, distance) {
      const g = make(c), w = g.witches[0], d = g.map.dancefloor;
      g.party.paused = true;
      w.body = { ...w.body, x: d.x, z: d.z + 20, mode: "ground", lift: 0, vx: 0, vz: 0 };
      const target = g.creatures.find(q => !q.boss && !q.leashed);
      if (!target) throw Error(`No spare rank ${c.level} creature`);
      // A fixture, not a copied model: all movement, attacks, letters and orbit slots still run normally.
      for (const q of g.creatures) if (q !== target) q.gone = true;
      const x = w.body.x + distance, z = w.body.z;
      Object.assign(target, { species: c.species, level: c.level, x, z, tx: x, tz: z, homeX: x, homeZ: z, anchorX: x, anchorZ: z, circle: undefined, safeR: undefined, seen: 0, boss: false, siege: undefined, rest: 0, asleep: undefined, napUntil: undefined, affection: undefined, affectionAt: undefined, fills: undefined, hp: undefined, dazed: false, dazedUntil: undefined, fight: undefined });
      target.cell = g.map.cellSafe(x, z).cell;
      g.byArea = null;
      let hits = 0, stunned = false;
      for (let i = 0; i < Math.ceil(limit / STEP); i++) {
        w.health.hp = 1e6;
        stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, fire: true, aimX: target.x - w.body.x, aimZ: target.z - w.body.z }, Math.min(STEP, limit - i * STEP));
        hits += w.invites.events.filter(e => e.kind === "hit" && e.id === target.id).length;
        stunned = !!target.dazed || target.leashed || w.invites.events.some(e => e.kind === "happy" && e.id === target.id);
        if (stunned) break;
      }
      return { ...c, mode: "stuns", distance, hits, stunned, end: g.clock.time };
    }
    return { close, run, stun, STEP, bags: BAGS.map(b => b.id), bots: [...BOT_KINDS, "sloppy"], islands: ["home", ...REAL_KINDS], species: [...CREATURE_IDS].sort() };
  } catch (e) { await close(); throw e; }
}
