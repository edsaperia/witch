// Real-rule runner and isolated invitation fixtures for report.mjs; no simulated combat model.
import { openRules } from "./lib.mjs";
import { observer, phaseOf, rangedTargeted } from "./report-core.mjs";
import { progressObserver } from "./expert-progress.mjs";

export async function runtime() {
  const { load, close } = await openRules();
  try {
    const { TUNING, withTuning } = await load("/src/rules/tuning.ts");
    const { newGame, stepGame, STEP } = await load("/src/rules/game.ts");
    const { newBot, BOT_KINDS } = await load("/src/rules/bot.ts");
    const { BAGS } = await load("/src/rules/bags.ts");
    const { REAL_KINDS, KINDS, knownKinds } = await load("/src/rules/rosters.ts");
    const { HAT_SPELLS } = await load("/src/rules/spells.ts");
    const { SLOTS, partsFor } = await load("/src/rules/broomParts.ts");
    const { CREATURE_IDS } = await load("/src/rules/creatureConfig.ts");
    const { recordTempo } = await load("/src/rules/beat.ts");
    const { attackOf } = await load("/src/rules/combat/data.ts");
    const { fillTrunk } = await load("/src/rules/finds.ts");
    const { castPartySpell, heldBySpell } = await load("/src/rules/party.ts");
    const { worldAsleep } = await load("/src/rules/partyOver.ts");
    const make = c => {
      const unlocked = c.condition === "home-everything";
      if (unlocked && c.island !== "home") throw Error("Home-everything requires home island");
      const g = newGame(c.seed, withTuning({ map: { ...TUNING.map, island: c.island ?? "home", ...(c.worldSeed !== undefined ? { world: c.worldSeed } : {}), ...(unlocked ? { found: [...REAL_KINDS], islandAreas: knownKinds(REAL_KINDS).length } : {}) }, spells: { ...TUNING.spells, bag: c.bag, hat: c.hat ?? "none", parts: c.parts ?? [], ...(unlocked ? { hats: "*" } : {}) } }));
      // Explicit search cases distinguish no hat from a plain hat. Preserve legacy
      // report runs unless they explicitly provide this setup field.
      if (c.wearsHat !== undefined) g.witches[0].hat.has = c.wearsHat;
      g.clock.paused = false;
      g.witches[0].body = { ...g.witches[0].body, seated: false };
      recordTempo(g.beat, g.tuning, c.bpm, 0);
      fillTrunk(g, {}); // Fixed empty-owned finds profile, not this computer's saved campaign.
      return g;
    };
    function run(c, limit, options = {}) {
      const g = make(c), brain = newBot(c.bot === "sloppy" ? "novice" : c.bot, { expertSeed: c.seed ^ 0x1477, ...options, bag: c.bag }), seen = observer(), progress = progressObserver();
      progress.step(g);
      for (let i = 0; i < Math.ceil(limit / STEP); i++) {
        const dt = Math.min(STEP, limit - i * STEP), before = { phase: phaseOf(g), wave: g.party.wave, time: g.clock.time };
        const exposed = rangedTargeted(g, attackOf);
        stepGame(g, brain.decide(g), dt);
        progress.step(g);
        seen.step(before, g, g.clock.time - before.time, exposed);
        if (g.partyOver || g.win?.wonAt !== undefined) break;
      }
      const quests = g.creatures.filter(q => q.boss && q.quest), questsCompleted = quests.filter(q => q.quest.done !== undefined).length;
      return { ...c, mode: "runs", playerEnd: g.herTime, phaseNumber: c.island === "home" ? 0 : KINDS[c.island].phase + 1, ...seen.finish(g), questsCompleted, questsTotal: quests.length, allQuestsCompleted: quests.length > 0 && questsCompleted === quests.length, upgradeFound: !!g.trunk?.found, upgradeEligibleToKeep: !!g.trunk?.found && g.win?.wonAt !== undefined, upgradePersisted: false, ...progress.finish() };
    }
    function stun(c, limit, distance) {
      const g = make(c), w = g.witches[0], d = g.map.dancefloor;
      g.party.paused = true;
      w.body = { ...w.body, x: d.x, z: d.z + 20, mode: "ground", lift: 0, vx: 0, vz: 0 };
      const target = g.creatures.find(q => !q.boss && !q.leashed);
      if (!target) throw Error(`No spare rank ${c.level} creature`);
      // newGame's legacy headless start is active (spellAt undefined); the app opening sets it to null.
      // If waiting for the spell, start it publicly and finish its input hold before timing the fixture.
      for (const q of g.creatures) q.gone = true;
      if (g.party.spellAt === null) castPartySpell(g.party, g.map, g.clock.time);
      const idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
      while (heldBySpell(g.party, g.clock.time)) stepGame(g, idle, STEP);
      if (worldAsleep(g)) throw Error("Stun fixture requires an active party");
      const x = w.body.x + distance, z = w.body.z;
      Object.assign(target, { species: c.species, level: c.level, x, z, tx: x, tz: z, homeX: x, homeZ: z, anchorX: x, anchorZ: z, circle: undefined, safeR: undefined, seen: g.clock.time, gone: false, boss: false, siege: undefined, rest: 0, asleep: undefined, bed: undefined, napUntil: undefined, affection: undefined, affectionAt: undefined, fills: undefined, hp: undefined, dazed: false, dazedUntil: undefined, fight: undefined });
      target.cell = g.map.cellSafe(x, z).cell;
      g.byArea = null;
      const start = g.clock.time;
      let hits = 0, stunned = false, retaliation = 0;
      for (let i = 0; i < Math.ceil(limit / STEP); i++) {
        w.health.hp = 1e6;
        stepGame(g, { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, fire: true, aimX: target.x - w.body.x, aimZ: target.z - w.body.z }, Math.min(STEP, limit - i * STEP));
        hits += w.invites.events.filter(e => e.kind === "hit" && e.id === target.id).length;
        retaliation += g.combat.events.filter(e => e.kind === "windup" && e.id === target.id).length;
        stunned = !!target.dazed || target.leashed || w.invites.events.some(e => e.kind === "happy" && e.id === target.id);
        if (stunned) break;
      }
      return { ...c, mode: "stuns", distance, hits, stunned, retaliation, end: g.clock.time - start, fixture: "active-party-after-intro-v2" };
    }
    // Separate survey fixtures use a naturally generated creature of the exact
    // requested species/rank. In particular rank 3 is never a relabelled ordinary.
    function isolated(c, limit, kind, distance = 10) {
      const g = make(c), w = g.witches[0];
      const target = g.creatures.find(q => !q.gone && !q.leashed && q.species === c.species && (c.rank === 3 ? q.boss : !q.boss && q.level === c.rank));
      if (!target) return { status: "unsupported", reason: "Exact natural species/rank absent from this generated map", ...c };
      g.party.paused = true;
      for (const q of g.creatures) if (q !== target) q.gone = true;
      if (target.boss) { target.legendState = "angry"; target.enraged = true; }
      w.leash.stack = []; w.leash.placed = [];
      w.body = { ...w.body, x: target.x - distance, z: target.z, mode: "ground", lift: 0, vx: 0, vz: 0, seated: false, perch: undefined };
      if (g.party.spellAt === null) castPartySpell(g.party, g.map, g.clock.time);
      const idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
      while (heldBySpell(g.party, g.clock.time)) stepGame(g, idle, STEP);
      if (worldAsleep(g)) throw Error("Isolated fixture requires an active party");
      const start = g.clock.time; let hits = 0, retaliation = 0, stunned = false, knockout = false;
      for (let i = 0; i < Math.ceil(limit / STEP); i++) {
        if (kind === "stun") w.health.hp = 1e6;
        stepGame(g, { ...idle, ...(kind === "stun" ? { fire: true, aimX: target.x - w.body.x, aimZ: target.z - w.body.z } : {}) }, Math.min(STEP, limit - i * STEP));
        hits += w.invites.events.filter(e => e.kind === "hit" && e.id === target.id).length;
        retaliation += g.combat.events.filter(e => e.kind === "windup" && e.id === target.id).length;
        stunned = !!target.dazed || target.leashed || w.invites.events.some(e => e.kind === "happy" && e.id === target.id);
        knockout = !!w.ko;
        if ((kind === "stun" && stunned) || (kind === "ko" && knockout)) break;
      }
      return { status: "ok", ...c, fixture: kind === "stun" ? "exact-natural-rank-protected-stun-v1" : "exact-natural-rank-unprotected-ko-v1", actualBoss: !!target.boss, actualRank: target.boss ? 3 : target.level, hits, retaliation, stunned, knockout, end: g.clock.time - start, censored: kind === "stun" ? !stunned : !knockout };
    }
    return { close, run, stun, isolated, STEP, bags: BAGS.map(b => b.id), hats: HAT_SPELLS.filter(h => h.built).map(h => h.id), parts: Object.fromEntries(SLOTS.map(s => [s, [null, ...partsFor(s).map(p => p.id)]])), bots: [...BOT_KINDS, "sloppy"], islands: ["home", ...REAL_KINDS], species: [...CREATURE_IDS].sort() };
  } catch (e) { await close(); throw e; }
}
