// Which attacks fire in play, and how (Ed's playtest, 2026-10-29: "I didn't seem to see any projectile attacks, just melee and
// beams"): a bot night on an island (the real rules headless, waves on), each wild or enraged creature's attacks counted as they're
// thrown. Two ways an attack goes out: the attack grammar's (rules/attacks/: a release, its first body's kind from its spec: bolt,
// lob, runner, mine..., or an area, a zone, a beam) and the old fight's (rules/combat.ts: a pack's own move or a species' old attack,
// by the event it raises: shot, landed (a lob), beam, quake, pulse, charged, leapt, or a windup with nothing else, a melee blow).
// With each island's kinds and what their own attack in the grammar is (config/species-attacks.json).
//   node tools/attacks/deliveries.mjs [--runs home:533531,squirrel:615594,ibex:542195] [--world 1268398697] [--found squirrel,hedgehog] [--time 900] [--bot skilled]
import { arg, list, openRules } from "../balance/lib.mjs";

const RUNS = list(arg("runs", "home:533531,squirrel:615594,ibex:542195")).map(s => { const [island, seed] = s.split(":"); return { island, seed: +seed }; });
const WORLD = +arg("world", 1268398697), FOUND = list(arg("found", "squirrel,hedgehog")), TIME = +arg("time", 900), BOT = arg("bot", "skilled");
const { load, close } = await openRules();
try {
  const { TUNING, withTuning } = await load("/src/rules/tuning.ts");
  const { newGame, stepGame } = await load("/src/rules/game.ts");
  const { newBot } = await load("/src/rules/bot.ts");
  const { SPECIES_ATTACKS } = await load("/src/rules/attacks/species.ts");
  const kindOf = sp => { const a = SPECIES_ATTACKS[sp]; return !a ? "—" : a.body?.kind ?? (a.beam ? "beam" : a.area ? "area" : a.zone ? "zone" : "bolt"); };
  for (const { island, seed } of RUNS) {
    const t = withTuning({ map: { ...TUNING.map, island, world: WORLD, found: FOUND } }), g = newGame(seed, t), w = g.witches[0], dt = 1 / 60;
    g.clock.paused = false; w.body = { ...w.body, seated: false };
    const brain = newBot(BOT, {});
    const kinds = new Map(); // species -> creatures (wild, young and up)
    for (const c of g.creatures) if (!c.boss && c.level >= 1) kinds.set(c.species, (kinds.get(c.species) ?? 0) + 1);
    const grammar = new Map(), old = new Map(), casts = new Map(), fizzles = new Map(), windups = new Map(), alone = new Map(), grouped = new Map(), bump = (m, k) => m.set(k, (m.get(k) ?? 0) + 1);
    let seen = 0, hits = 0, kos = 0, wasKo = false;
    for (let step = 0; step * dt < TIME && !g.partyOver; step++) {
      const hp0 = w.health.hp;
      stepGame(g, brain.decide(g), dt);
      if (w.health.hp < hp0) hits++;
      if (w.ko && !wasKo) kos++;
      wasKo = !!w.ko;
      const S = g.combat.spells;
      if (S) for (let i = 0; i < S.events.length; i++) {
        const e = S.events[i]; if (!String(e.attack).startsWith("species:")) continue;
        const sp = e.attack.slice(8);
        if (e.kind === "release") { bump(grammar, `${kindOf(sp)}`); bump(grammar, `${sp}:${kindOf(sp)}`); }
        if (e.kind === "cast") bump(casts, sp);
        if (e.kind === "fizzle") bump(fizzles, sp);
      }
      // (the old fight's: each creature's windup and what came of it this step)
      const by = new Map();
      for (const e of g.combat.events) if (e.id !== undefined && typeof e.id === "number") { const c = g.creatures[e.id]; if (!c || c.leashed || c.boss) continue; (by.get(e.id) ?? by.set(e.id, new Set()).get(e.id)).add(e.kind); }
      for (const [id, ks] of by) {
        const c = g.creatures[id], d = ks.has("shot") ? "shot" : ks.has("landed") ? "lob" : ks.has("beam") ? "beam" : ks.has("quake") ? "quake" : ks.has("pulse") ? "pulse" : ks.has("charged") ? "charge" : ks.has("leapt") ? "leap" : ks.has("windup") ? "windup" : null;
        if (ks.has("windup")) {
          bump(windups, c.species);
          // (alone or in a group: its kind's others fighting the same target)
          const tg = c.fight?.target, mates = tg ? g.creatures.filter(o => o !== c && !o.gone && !o.leashed && o.species === c.species && o.fight?.target && o.fight.target.kind === tg.kind && o.fight.target.id === tg.id).length : 0;
          bump(mates ? grouped : alone, c.species);
        }
        if (d && d !== "windup") { bump(old, d); bump(old, `${c.species}:${d}`); }
      }
      seen = Math.max(seen, g.party.wave);
    }
    const row = [...kinds].sort((a, b) => b[1] - a[1]).map(([s, n]) => `${s}×${n} (${kindOf(s)})`).join(", ");
    console.log(`\n## ${island} (seed ${seed}, world ${WORLD}), ${TIME} s of ${BOT} bot, to wave ${seen}: her hits taken ${hits}, knockouts ${kos}`);
    console.log(`kinds (young and up), and their own attack in the grammar: ${row}`);
    const tops = m => [...m].filter(([k]) => !k.includes(":")).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k} ${n}`).join(", ") || "none";
    const per = m => [...m].filter(([k]) => k.includes(":")).sort((a, b) => b[1] - a[1]).map(([k, n]) => `${k} ${n}`).join(", ") || "none";
    console.log(`grammar releases by body: ${tops(grammar)}`);
    console.log(`  by species: ${per(grammar)}`);
    const all = new Set([...windups.keys(), ...casts.keys()]);
    console.log(`windups (any attack) / grammar casts / releases / fizzles, by species: ${[...all].sort((a, b) => (windups.get(b) ?? 0) - (windups.get(a) ?? 0)).map(sp => `${sp} ${windups.get(sp) ?? 0}/${casts.get(sp) ?? 0}/${grammar.get(`${sp}:${kindOf(sp)}`) ?? 0}/${fizzles.get(sp) ?? 0}`).join(", ")}`);
    console.log(`windups alone / in a group of its kind, by species: ${[...windups.keys()].map(sp => `${sp} ${alone.get(sp) ?? 0}/${grouped.get(sp) ?? 0}`).join(", ")}`);
    console.log(`old fight's attacks besides a plain blow: ${tops(old)}`);
    console.log(`  by species: ${per(old)}`);
  }
} finally { await close(); }
