import { appendFileSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';
import { newGame, stepGame, STEP } from '../../src/rules/game.ts';
import { setupArena } from '../../src/rules/arena.ts';
import { TUNING } from '../../src/rules/tuning.ts';
import { newCombat, COMBAT } from '../../src/rules/combat/data.ts';
import { spellWorld } from '../../src/rules/attacks/combatWorld.ts';
import { SPECIES_ATTACKS, speciesAttack, adultOf, legendAttack } from '../../src/rules/attacks/species.ts';
import { LEGENDS } from '../../src/rules/legends.ts';
import { newObserver } from '../../src/bots/observe.ts';
import { cast, newSpells, stepSpells, readability, ownWarning, telegraphKind, parseAttack } from '../../src/rules/attacks/index.ts';
import { classOf, momentumOf } from '../../src/rules/momentum.ts';

const out = process.argv[2], save = (name, value) => writeFileSync(join(out, name), JSON.stringify(value, null, 2) + '\n');
const idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const style = a => [a.body?.kind ?? 'bolt', a.emit?.pattern ?? 'single', a.area?.shape ?? '', a.area?.at ?? '', ...Object.keys(a.hit?.effect ?? {}), a.area?.rain ? 'rain' : '', a.area?.grow ? 'grow' : '', a.speed?.profile ?? '', ...(a.path ?? []).map(t => Object.keys(t)[0]), ...Object.keys(a.pack ?? {}), ...Object.keys(a.on ?? {}), a.force ? 'force' : '', a.life?.bounce ? 'bounce' : '', a.life?.stick ? 'stick' : ''].filter(Boolean).join('+');
const rows = Object.entries(SPECIES_ATTACKS).map(([species, raw]) => {
  const young = speciesAttack(species, 1), adult = speciesAttack(species, 2);
  const L = LEGENDS.attack, legend = legendAttack(species, { range: L.range, windup: L.windup, interval: L.interval, flight: L.lobFlight, radius: L.lobRadius });
  return { species, note: raw.note, body: raw.body?.kind ?? 'bolt', pattern: raw.emit?.pattern ?? 'single', style: style(raw), range: young.cast?.range ?? 20, adultRange: adult.cast?.range ?? 20, windup: young.cast?.windup ?? 0.6, cooldown: young.cast?.cooldown ?? 2, tell: raw.cast?.tell ?? null, telegraph: telegraphKind(young), youngWarning: readability(young, {}).warning, adultWarning: readability(adult, {}).warning, rawWarning: readability(raw, {}).warning, firstOwnWarning: ownWarning(young, false), hit: raw.hit ?? {}, paths: raw.path ?? [], area: raw.area ?? null, beam: raw.beam ?? null, pack: raw.pack ?? null, children: Object.keys(raw.on ?? {}), legend: { body: legend.body.kind, range: legend.cast.range, windup: legend.cast.windup, cooldown: legend.cast.cooldown, warning: readability(legend, {}).warning }, parseErrors: parseAttack(raw, {}, { strict: true }).errors, adultParseErrors: parseAttack(adultOf(raw), {}, { strict: true }).errors };
});
save('species.json', rows);

function engineCase(spec, targets, { blocked, dodge = false, seconds = 4 } = {}) {
  const S = newSpells(5), hits = [], source = { id: 999, x: 0, z: 0, side: 'wild', species: 'wolf', heading: 0 };
  let now = 0, actionAt = null;
  const W = { seed: 5, near: () => targets, hostile: (side, t) => side !== t.side, harm: (t, damage, effect) => hits.push({ at: now, kind: t.kind, id: t.id, damage, effect }), where: (kind, id) => kind === 'creature' && id === 999 ? source : targets.find(t => t.kind === kind && t.id === id) ?? null, ...(blocked ? { blocked } : {}) };
  cast(S, W, spec, 'fixture', source, targets[0], 0, 1);
  const cue = Math.min(...S.telegraphs.filter(t => t.alive).map(t => t.start));
  const respond = Number.isFinite(cue) ? Math.ceil((cue + 0.25) / 0.125 - 1e-9) * 0.125 : null;
  for (let i = 1; i <= seconds / STEP; i++) {
    now = i * STEP;
    if (dodge && respond !== null && actionAt === null && now + 1e-9 >= respond) { targets[0].z += TUNING.dash.distance; actionAt = now; }
    stepSpells(S, W, {}, now, STEP);
  }
  return { contacts: hits.length, firstContact: hits[0]?.at ?? null, hits, cue: Number.isFinite(cue) ? cue : null, response: actionAt, events: S.events.reduce((m, e) => (m[e.kind] = (m[e.kind] ?? 0) + 1, m), {}), capped: S.capped };
}
const target = (kind, id, x = 4, z = 0) => ({ kind, id, x, z, r: 0.3, side: 'party', species: kind === 'creature' ? 'fox' : undefined });
const piercing = { cast: { windup: 0.5 }, body: { kind: 'bolt', radius: 0.3 }, speed: { v: 20 }, life: { range: 20, pierce: 2 }, hit: { damage: 1 } };
const area = { cast: { windup: 0.5 }, body: { kind: 'area' }, area: { r: 8 }, hit: { damage: 1 } };
const diagnostics = {
  idCollision: {
    piercingSameId: engineCase(piercing, [target('witch', 0), target('creature', 0)]),
    piercingDistinctId: engineCase(piercing, [target('witch', 0), target('creature', 2)]),
    areaSameId: engineCase(area, [target('witch', 0), target('creature', 0)]),
    areaDistinctId: engineCase(area, [target('witch', 0), target('creature', 2)]),
  },
  blockedPort: {
    withWall: engineCase(piercing, [target('witch', 0, 8)], { blocked: x => x >= 3 && x <= 4 }),
    withoutWall: engineCase(piercing, [target('witch', 0, 8)]),
  },
};
const spy = { hit: 0, stun: 0, slow: 0 }, witches = [{ id: 0, x: 4, z: 0, onGround: true, down: false, shelter: 42 }];
const w = { creatures: [], witches, time: 0, t: TUNING, asleep: () => false, hitWitch: () => spy.hit++, stunWitch: () => spy.stun++, slowWitch: () => spy.slow++ };
w.creatures[1] = { id: 1, species: 'wolf', level: 2, x: 0, z: 0 };
const livePort = spellWorld(w, newCombat(), { near: () => [] }, 5, COMBAT);
livePort.harm(target('witch', 0), 1, { stun: 0.2, slow: { mult: 0.5, time: 1 } }, 0, 0, 1, 'audit:shelter', 'bolt');
diagnostics.shelterEffects = { ...spy, portHasBlocked: typeof livePort.blocked === 'function', note: 'Actual spellWorld harm adapter; records damage and effect callbacks for an outside attack on a sheltered witch.' };
for (const species of Object.keys(SPECIES_ATTACKS)) {
  if (classOf(species, TUNING) === 'heavy') continue;
  const base = momentumOf(species, TUNING);
  const changed = { ...TUNING, dodge: { ...TUNING.dodge, a: { ...TUNING.dodge.a, heavy: { ...TUNING.dodge.a.heavy, species: [...TUNING.dodge.a.heavy.species, species] } } } };
  const cached = momentumOf(species, changed), fresh = momentumOf(species, { ...changed, creatureMomentum: { ...changed.creatureMomentum, classes: { ...changed.creatureMomentum.classes } } });
  if (JSON.stringify(cached) !== JSON.stringify(fresh)) { diagnostics.momentumCache = { species, beforeClass: classOf(species, TUNING), afterClass: classOf(species, changed), base, cached, fresh, note: 'Diagnostic-only copy changes class membership; no tuning file edited.' }; break; }
}
save('diagnostics.json', diagnostics);

const fairness = rows.map(row => {
  const spec = speciesAttack(row.species, 1), x = spec.body?.kind === 'area' || spec.body?.kind === 'zone' ? 1 : Math.min(8, Math.max(1, (spec.cast?.range ?? 8) / 2));
  const still = engineCase(spec, [target('witch', 0, x)]), dodge = engineCase(spec, [target('witch', 0, x)], { dodge: true });
  return { species: row.species, startDistance: x, stationaryContacts: still.contacts, dodgingContacts: dodge.contacts, firstContact: still.firstContact, cue: dodge.cue, actionAt: dodge.response, assessed: still.contacts > 0, limitedFixture: 'Spell engine, one caster and one target on flat ground; instant 15m blink at >=0.25s reaction, 8Hz input. No Game terrain, packmates, camera or iframe claim.' };
});
save('reaction-fixtures.json', fairness);

const cases = [
  { id: 'wolves-ravens', seed: 5, spec: 'wolf*3@2,raven*3@2' },
  { id: 'wolves-cats', seed: 5, spec: 'wolf*3@2,cat*3@2' },
  { id: 'boars-foxes', seed: 7, spec: 'boar*3@2,fox*3@2' },
  { id: 'wolves-ravens-repeat', seed: 5, spec: 'wolf*3@2,raven*3@2' },
];
const arenaRows = [];
for (const fixture of process.argv.includes('--witch-only') ? [] : cases) {
  const began = performance.now(), g = newGame(fixture.seed, TUNING);
  g.clock.paused = false; g.party.paused = true; setupArena(g, fixture.spec);
  g.witches[0].body.mode = 'treetop'; g.witches[0].body.lift = 1;
  const ids = g.arena.ids, first = ids.filter(id => g.creatures[id].leashed), second = ids.filter(id => !g.creatures[id].leashed);
  // Isolate the arena as the existing arena tests do; no health/stun/damage tuning.
  const arenaSet = new Set(ids); for (const c of g.creatures) if (!arenaSet.has(c.id)) c.gone = true;
  g.byArea = null;
  const events = {}, byAttack = {}, seen = new WeakSet(), bodyTouched = new Set();
  let completed = null;
  for (let frame = 0; frame < 20 / STEP; frame++) {
    stepGame(g, idle, STEP);
    for (const e of g.combat.spells?.events ?? []) if (!seen.has(e)) {
      seen.add(e); const key = e.attack + '@' + e.source, a = byAttack[key] ??= { attack: e.attack, source: e.source, species: g.creatures[e.source]?.species, cast: 0, release: 0, hitContacts: 0, expiredBodiesWithoutContact: 0, fizzles: 0, dodges: null, effectiveHits: null, stuns: null };
      if (e.kind === 'cast') a.cast++; if (e.kind === 'release') a.release++; if (e.kind === 'fizzle') a.fizzles++;
      if (e.kind === 'hit') { a.hitContacts++; if (e.body !== undefined) bodyTouched.add(e.body); }
      if (e.kind === 'expire' && e.body !== undefined && !bodyTouched.has(e.body)) a.expiredBodiesWithoutContact++;
    }
    for (const e of g.combat.events) if (!seen.has(e)) { seen.add(e); events[e.kind] = (events[e.kind] ?? 0) + 1; }
    const alive = side => side.filter(id => !g.creatures[id].gone && !g.creatures[id].ranOff && !g.creatures[id].dazed);
    if (completed === null && (!alive(first).length || !alive(second).length)) completed = { atWorldSeconds: g.clock.time, winner: alive(first).length ? 'party' : alive(second).length ? 'wild' : 'neither', definition: 'first side with no active non-dazed/non-running members, not conversion or persistence' };
  }
  const final = ids.map(id => { const c = g.creatures[id]; return { id, species: c.species, level: c.level, x: +c.x.toFixed(6), z: +c.z.toFixed(6), dazed: !!c.dazed, ranOff: !!c.ranOff, gone: !!c.gone, affection: c.affection ?? 0, drops: c.drops ?? 0 }; });
  const record = { ...fixture, requestedStepSeconds: 20, worldSeconds: g.clock.time, witchMode: g.witches[0].body.mode, executionMs: performance.now() - began, completed, censored: completed === null, events, byAttack: Object.values(byAttack), final, digest: createHash('sha256').update(JSON.stringify({ final, events, byAttack })).digest('hex'), limits: 'Witch stays treetop to avoid distracting the pack-v-pack fight. No visual/readability judgement. Engine hit contacts are not accepted damage; effective hits/dodges/stuns lack per-attack attribution and are null. Expired-body misses exclude live bodies/zones/beams. Single-seed examples do not rank general strength.' };
  arenaRows.push(record); appendFileSync(join(out, 'arena.jsonl'), JSON.stringify(record) + '\n');
  console.log(JSON.stringify({ case: fixture.id, executionMs: record.executionMs, digest: record.digest, completed }));
}
const witchRows = [];
for (const species of ['wolf', 'cat']) for (const delayed of [false, true]) {
  const g = newGame(5, TUNING); g.clock.paused = false; g.party.paused = true; setupArena(g, `pack-${species}`, { wildOnly: true });
  const ids = new Set(g.arena.ids); for (const c of g.creatures) if (!ids.has(c.id)) c.gone = true; g.byArea = null;
  const observe = newObserver(), queue = [], actions = [], inputTimes = [];
  let control = idle, nextInput = 0, nextDash = 0, acceptedHits = 0, attempts = 0, blinks = 0, kos = 0, beforeKo = false, lastAt = g.witches[0].dash.at;
  for (let frame = 0; frame < 12 / STEP; frame++) {
    const player = frame * STEP;
    if (player + 1e-9 >= nextInput) {
      nextInput = player + 0.125; inputTimes.push(player); queue.push({ at: player, observation: observe(g) });
      let consumed;
      while (queue.length && queue[0].at <= player - 0.25 + 1e-9) consumed = queue.shift();
      const o = consumed?.observation, cue = o?.windups[0]; control = idle;
      if (delayed && o && cue && player >= nextDash && !o.self.ko) {
        const dx = o.self.x - cue.x, dz = o.self.z - cue.z, d = Math.hypot(dx, dz) || 1;
        control = { ...idle, moveX: -dz / d, moveZ: dx / d, dash: true }; attempts++; nextDash = player + 1;
        actions.push({ atPlayerSeconds: player, consumedAt: consumed.at, delay: player - consumed.at, cue, self: o.self });
      }
    }
    const before = g.witches[0].health.hp; stepGame(g, control, STEP);
    const W = g.witches[0]; acceptedHits += Math.max(0, before - W.health.hp);
    if (W.dash.at !== lastAt && Number.isFinite(W.dash.at)) blinks++; lastAt = W.dash.at;
    if (W.ko && !beforeKo) kos++; beforeKo = !!W.ko;
  }
  const record = { species, seed: 5, delayedPolicy: delayed, requestedStepSeconds: 12, worldSeconds: g.clock.time, acceptedHealthLost: acceptedHits, koEntries: kos, dashAttempts: attempts, acceptedBlinks: blinks, actions, inputIntervalMinimum: 0.125, actualMinimumInputGap: Math.min(...inputTimes.slice(1).map((t, i) => t - inputTimes[i])), reactionDelay: 0.25, observation: 'Existing expert approximate default-camera rectangle without occlusion plus public HUD/audio cues; policy uses delayed self and windup positions only.', limits: 'One fixed sidestep policy, no aiming or invitation. A failure is not proof that no dodge works; not a trained-bot or win-strength claim.' };
  witchRows.push(record); appendFileSync(join(out, 'witch-arena.jsonl'), JSON.stringify(record) + '\n');
}
save('summary.json', { species: rows.length, minimumYoungWarning: Math.min(...rows.map(r => r.youngWarning)), minimumAdultWarning: Math.min(...rows.map(r => r.adultWarning)), parseErrors: rows.reduce((n, r) => n + r.parseErrors.length + r.adultParseErrors.length, 0), engineReactionAssessed: fairness.filter(r => r.assessed).length, engineReactionStillContactAfterBlink: fairness.filter(r => r.assessed && r.dodgingContacts > 0).map(r => r.species), arenaCases: arenaRows.length, repeatedCaseMatches: arenaRows.length === 4 ? arenaRows[0].digest === arenaRows[3].digest : null, reactionBudget: { reaction: 0.25, inputInterval: 0.125, worstQuantizedPlusStep: 0.25 + 0.125 + STEP }, limits: ['No general dodge guarantee', 'No arena dominance ranking from three small paired matches', 'No invisible-source or real terrain proof from flat engine fixtures', 'No current validation of seven impossible solo stuns; historical protected-health cutoff is not impossibility'] });
