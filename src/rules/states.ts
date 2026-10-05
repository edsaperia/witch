// The creature-state model in the balance simulator (issue #87, Ed 2026-10-05): the witch does no
// damage, and her only action is the invite. A wild creature she invites turns happy and stays
// to defend its own area (never enraged); leashing a happy one is a second step, and only leashed
// ones (her army) grow, eating berries as her posse goes. When an area gets its soundsystem its
// wild young and up (and its legend, unless its quest was done) turn enraged and besiege the
// nearest soundsystem; babies never do, and stay invitable. Knocked down, happy, leashed and
// enraged creatures run off for good (a knocked-down enraged one can lie dazed, invitable, for
// dazedTime first, a knob); no new creatures grow in an area with a soundsystem. A headless model
// on the real map, its creatures, growth and wave order, like rules/balance.ts, with the witch's
// time spent flying, landing and talking. Read by tools/balance/states.mjs and states.test.ts.
import { attackOf, COMBAT, strengthOf } from "./combat";
import { spawnCreatures, speedFactor, LEGEND, type Level } from "./creatures";
import { countScale, grownAt, growthLevel } from "./growth";
import { toEvolve } from "./berries";
import { AREA_TYPES, type ForestMap } from "./map";
import type { Cell } from "./partition";
import { cellKey, newParty, soundsystemFor, spreadWave } from "./party";
import { hash2 } from "./random";

/** How she splits her invites (issue #87): every one a defender; every third leashed; every one
 *  leashed; or the babies leashed (they grow) and the young and adults left as defenders. */
export type Policy = "defend" | "third" | "leash" | "babies";

export interface StatesOptions {
  /** Seconds between waves, and the waves to stop at. */
  interval: number;
  maxWaves: number;
  policy: Policy;
  /** Her invite rate, times the game's (talk times invite.talkTime: baby 3 s, young 6, adult 12). */
  skill: number;
  /** Seconds to find and reach each creature she invites (a guess: 3). */
  approach?: number;
  /** Seconds for the second step, happy to leashed (a guess: 2). */
  leashTime?: number;
  /** The share of the areas she works before their wave whose legend's quest she does (0). */
  questShare?: number;
  /** Seconds a quest takes her (20). */
  questTime?: number;
  /** Metres round an area's middle its happy creatures defend, and round her army (40). */
  guardRadius?: number;
  /** Seconds a knocked-down enraged creature lies dazed, invitable, where she is (0: they run off). */
  dazedTime?: number;
  /** Berries her army eats in each area she works (the tuning's berries.perArea, mean). */
  berriesPerArea?: number;
  /** A new soundsystem's health (the tuning's combat.soundsystemHealth). */
  soundHealth?: number;
  /** A happy legend's health and damage, times (1). */
  legendDefence?: number;
  /** Treetop speed (m/s; the tuning's), a posse's walk (m/s; leash run × 1.4) and its routes' length over the straight line (1.3). */
  witchSpeed?: number;
  posseSpeed?: number;
  route?: number;
  /** She defends (takes her army to a siege) when it is worth at most this share of her army's F (0.9). */
  margin?: number;
  dt?: number;
}

/** One wave, sampled just before the next. */
export interface StatesWave {
  wave: number;
  /** Wild (invitable) creatures left on the map, and their F. */
  pool: number;
  poolF: number;
  /** Of those, in the areas the next two waves wake (where her invites count most). */
  frontier: number;
  /** Happy creatures standing, leashed ones, and the army's F. */
  happy: number;
  leashed: number;
  armyF: number;
  /** Enraged still fighting, and their F. */
  enraged: number;
  enragedF: number;
  standing: number;
  /** Seconds of the wave she had nothing to invite or defend. */
  idle: number;
  /** Invites this wave. */
  invites: number;
}

/** One area's own fight when it woke: the share of its young and up (by F) she had invited
 *  before (happy or leashed), the defenders' F and the enraged's, and how it went. */
export interface LocalFight { wave: number; key: string; invited: number; defendersF: number; enragedF: number; /** Its soundsystem was standing at the next wave. */ held: boolean; /** Seconds after waking it fell, if it did. */ fellAfter?: number; /** Its defenders beat its own enraged (null: no fight). */ won: boolean | null }

export interface StatesResult {
  seed: number;
  survived: number;
  lost: { wave: number; time: number } | null;
  waves: StatesWave[];
  local: LocalFight[];
  /** Enraged creatures' first targets: their own area's soundsystem, or another's. */
  targets: { own: number; other: number };
  /** Soundsystem damage dealt by enraged creatures of the area, and by others'. */
  damage: { own: number; other: number };
  /** The first wave she spent half or more of idle (the pool ran dry within reach), or null. */
  starve: number | null;
  invited: { happy: number; leashed: number };
  falls: number;
}

type State = "wild" | "happy" | "leashed" | "enraged" | "dazed" | "gone";
interface Unit { id: number; species: string; cell: string; x: number; z: number; level: Level; m: number; hp: number; dps: number; reach: number; speed: number; state: State; target: string | null; legend: boolean; until?: number }
interface Sound { key: string; x: number; z: number; hp: number; radius: number; wave: number; at: number }

const valueOf = (u: Unit) => Math.sqrt(Math.max(0, u.hp) * u.dps);
const fullHp = (level: Level, m: number) => COMBAT.levels.hp[level] * m;

/** One run of the model on `map`. */
export function simulateStates(map: ForestMap, o: StatesOptions): StatesResult {
  const t = map.tuning, C = t.combat, dt = o.dt ?? 0.5, d = map.dancefloor;
  const approach = o.approach ?? 3, leashTime = o.leashTime ?? 2, questTime = o.questTime ?? 20, GR = o.guardRadius ?? 40, dazed = o.dazedTime ?? 0, margin = o.margin ?? 0.9;
  const witchSpeed = o.witchSpeed ?? t.treetopSpeed, posseSpeed = (o.posseSpeed ?? t.leash.runSpeed * 1.4) / (o.route ?? 1.3), LD = o.legendDefence ?? 1;
  const berriesPerArea = o.berriesPerArea ?? (t.berries.perArea[0] + t.berries.perArea[1]) / 2;
  const size = t.areaSize * t.areaScale, land = t.descendTime + t.riseTime, cross = (0.5 * size) / t.groundSpeed;
  const talk = t.invite.talkTime;

  // Every creature: the map's own (legends asleep, home's happy), then what grows wave by wave.
  const units: Unit[] = [], byCell = new Map<string, Unit[]>();
  const add = (u: Unit) => { units.push(u); let l = byCell.get(u.cell); if (!l) byCell.set(u.cell, (l = [])); l.push(u); };
  const make = (id: number, species: string, cell: string, x: number, z: number, level: Level): Unit => {
    const legend = level === LEGEND, m = strengthOf(species, level), A = attackOf(species, level, COMBAT)?.attack;
    const reach = !A ? 0 : A.delivery === "shot" ? A.range * 0.8 : A.range + (A.lunge ?? 0) - 0.3; // (babies don't attack)
    return { id, species, cell, x, z, level, m, hp: fullHp(level, m), dps: COMBAT.levels.dps[level] * m, reach, speed: (legend ? t.legendSpeed : t.creatureSpeed * speedFactor(species, level, t)) * C.marchMult, state: "wild", target: null, legend };
  };
  const homeKey = cellKey(map.centreCell);
  for (const c of spawnCreatures(map)) {
    const u = make(c.id, c.species, cellKey(c.cell), c.x, c.z, c.level);
    u.speed = c.speed * C.marchMult; // (its own, as combat.ts marches it)
    if (u.legend) { u.state = c.legendState === "happy" ? "happy" : "wild"; if (u.state === "happy") { u.hp *= LD; u.dps *= LD; } }
    add(u);
  }
  let nextId = 1e6;

  const party = newParty(map), sounds = new Map<string, Sound>();
  sounds.set("home", { key: "home", x: d.x, z: d.z, hp: C.homeHealth, radius: C.homeRadius, wave: 0, at: 0 });
  const soundOf = (key: string) => (key === homeKey ? sounds.get("home") : sounds.get(key));
  const ruined = new Set<string>(), quested = new Set<string>(), worked = new Set<string>(), fed = new Set<string>();
  const waves: StatesWave[] = [], local: LocalFight[] = [], targets = { own: 0, other: 0 }, damage = { own: 0, other: 0 }, invited = { happy: 0, leashed: 0 };
  const openLocal = new Map<string, LocalFight>(), deciding = new Set<LocalFight>();
  let berries = 0, invitesNow = 0, idleNow = 0, falls = 0, count = 0, starve: number | null = null, lost: StatesResult["lost"] = null;

  // Her and her army: where they are and what she's doing.
  const witch = { x: d.x, z: d.z }, army = { x: d.x, z: d.z };
  type Task = { kind: "fly"; to: string; x: number; z: number; until: number } | { kind: "talk"; u: Unit; until: number; leash: boolean } | { kind: "leash"; u: Unit; until: number } | { kind: "quest"; key: string; until: number } | { kind: "defend"; key: string; x: number; z: number; until: number } | null;
  let task: Task = null, here: string | null = null, defending: { x: number; z: number } | null = null;
  const leashed = () => units.filter(u => u.state === "leashed");
  const armyF = () => leashed().reduce((a, u) => a + valueOf(u), 0);

  const nearestSound = (x: number, z: number): string | null => {
    let best: string | null = null, bd = Infinity;
    for (const s of sounds.values()) { if (s.hp <= 0) continue; const k = Math.hypot(s.x - x, s.z - z); if (k < bd) { bd = k; best = s.key; } }
    return best;
  };
  const grow = (key: string, cell: Cell, wave: number) => {
    const G = t.population.growth, species = AREA_TYPES[map.typeOf(cell[0], cell[1])].creature, site = map.siteOf(cell[0], cell[1]);
    for (let n = 0; n < grownAt(wave, G.perWave, countScale(species)); n++) {
      const level = growthLevel(map.seed, cell, wave, n, G.weights), a = hash2(wave * 31 + n, cell[0] * 97 + cell[1], map.seed + 404) * Math.PI * 2, r = size * 0.35 * Math.sqrt(hash2(wave * 17 + n, cell[1] * 89 + cell[0], map.seed + 405));
      add(make(nextId++, species, key, site.x + Math.cos(a) * r, site.z + Math.sin(a) * r, level));
    }
  };
  const evolve = () => {
    // Babies first (the most F a berry), then the young; nothing past adult.
    for (const lvl of [0, 1] as Level[]) for (const u of leashed()) {
      if (u.level !== lvl) continue;
      const cost = toEvolve(lvl, t, u.species);
      if (berries < cost) return;
      berries -= cost;
      const was = fullHp(u.level, u.m), up = (lvl + 1) as Level;
      const nu = make(u.id, u.species, u.cell, u.x, u.z, up);
      u.level = up; u.hp = nu.hp * Math.max(0, u.hp) / was; u.dps = nu.dps; u.reach = nu.reach;
    }
  };
  const wild = (key: string) => (byCell.get(key) ?? []).filter(u => u.state === "wild" && (!u.legend));
  // Which wild one she invites next in an area: the biggest (the ones that would turn on her), babies last.
  const pick = (key: string) => {
    let best: Unit | null = null;
    for (const u of wild(key)) if (!best || u.level > best.level) best = u;
    return best;
  };
  const dazedNear = (x: number, z: number) => units.find(u => u.state === "dazed" && Math.hypot(u.x - x, u.z - z) < GR * 1.5) ?? null;
  const leashIt = (u: Unit) => {
    if (o.policy === "leash") return true;
    if (o.policy === "babies") return u.level === 0;
    if (o.policy === "third") return ++count % 3 === 0;
    return false;
  };
  const fly = (to: string, x: number, z: number, time: number): Task => ({ kind: "fly", to, x, z, until: time + Math.hypot(x - witch.x, z - witch.z) / witchSpeed + land + cross });
  // Where to invite next: the areas the next wave wakes, then the one after, then the nearest wild area.
  const chooseArea = (): string | null => {
    const has = (k: string) => !sounds.has(k) && k !== homeKey && wild(k).length > 0;
    for (const set of [party.next, party.afterNext]) {
      let best: string | null = null, bd = Infinity;
      for (const c of set) { const k = cellKey(c); if (!has(k)) continue; const s = map.siteOf(c[0], c[1]), dd = Math.hypot(s.x - witch.x, s.z - witch.z); if (dd < bd) { bd = dd; best = k; } }
      if (best) return best;
    }
    // Then the nearest wild ones bordering the party (where the waves go soon), else any.
    let best: string | null = null, bd = Infinity;
    for (const [k, l] of byCell) { if (!has(k) || !l.length) continue; const [cx, cy] = k.split(",").map(Number), s = map.siteOf(cx, cy), dd = Math.hypot(s.x - witch.x, s.z - witch.z); if (dd < bd) { bd = dd; best = k; } }
    return best;
  };
  // A siege worth taking her army to: the biggest group (by target) it beats with margin.
  const chooseSiege = (): string | null => {
    const F = armyF();
    if (F <= 0) return null;
    const g = new Map<string, number>();
    for (const u of units) if (u.state === "enraged" && u.target) g.set(u.target, (g.get(u.target) ?? 0) + valueOf(u));
    let best: string | null = null, bv = 0;
    for (const [k, v] of g) if (v <= F * margin && v > bv) { bv = v; best = k; }
    return best;
  };

  let time = 0, nextAt = t.boot.time + t.party.startDelay + o.interval;
  const sample = () => {
    let pool = 0, poolF = 0, happy = 0, lea = 0, aF = 0, en = 0, eF = 0;
    for (const u of units) {
      if (u.state === "wild" && !u.legend) { pool++; poolF += valueOf(u); }
      else if (u.state === "happy") happy++;
      else if (u.state === "leashed") { lea++; aF += valueOf(u); }
      else if (u.state === "enraged") { en++; eF += valueOf(u); }
    }
    const idle = idleNow, soon = new Set([...party.next, ...party.afterNext].map(cellKey));
    let frontier = 0;
    for (const k of soon) frontier += wild(k).length;
    waves.push({ wave: party.wave, pool, poolF, frontier, happy, leashed: lea, armyF: aF, enraged: en, enragedF: eF, standing: [...sounds.values()].filter(s => s.hp > 0).length, idle, invites: invitesNow });
    if (starve === null && party.wave >= 1 && idle >= o.interval / 2) starve = party.wave;
    idleNow = 0; invitesNow = 0;
  };

  while (!lost) {
    if (time >= nextAt) {
      sample();
      for (const lf of openLocal.values()) { lf.held = (sounds.get(lf.key)?.hp ?? 0) > 0; }
      openLocal.clear();
      if (party.wave >= o.maxWaves) break;
      nextAt += o.interval;
      const wave = party.wave + 1;
      // What grows while wild (never in an area with a soundsystem).
      for (let cy = 0; cy < t.mapAreas; cy++) for (let cx = 0; cx < t.mapAreas; cx++) {
        const k = cellKey([cx, cy]);
        if (k !== homeKey && !sounds.has(k) && !ruined.has(k) && byCell.has(k)) grow(k, [cx, cy], wave);
      }
      for (const a of spreadWave(party, map, time)) {
        const key = cellKey(a.cell), at = soundsystemFor(map, a.cell);
        sounds.set(key, { key, x: at.x, z: at.z, hp: o.soundHealth ?? C.soundsystemHealth, radius: C.soundsystemRadius, wave: party.wave, at: time });
        const l = byCell.get(key) ?? [];
        let defF = 0, inv = 0, all = 0;
        for (const u of l) {
          if (u.level === 0) continue;
          const v = valueOf(u);
          if (u.state === "happy") defF += v;
          if (!u.legend) { all += v; if (u.state === "happy" || u.state === "leashed" || u.state === "gone") inv += v; }
        }
        let enF = 0;
        for (const u of l) {
          if (u.state !== "wild" || u.level === 0) continue; // babies never
          if (u.legend && quested.has(key)) continue;
          u.state = "enraged";
          u.target = u.legend ? key : nearestSound(u.x, u.z);
          if (!u.legend) { if (u.target === key) targets.own++; else targets.other++; }
          enF += valueOf(u);
        }
        const lf: LocalFight = { wave: party.wave, key, invited: all > 0 ? inv / all : 0, defendersF: defF, enragedF: enF, held: true, won: null };
        local.push(lf); openLocal.set(key, lf); if (enF > 0 && defF > 0) deciding.add(lf);
      }
    }

    // Her time.
    if (task && time >= task.until) {
      const k: Task = task;
      task = null;
      if (k.kind === "fly") { witch.x = k.x; witch.z = k.z; here = k.to; }
      else if (k.kind === "talk") {
        if (k.u.state === "wild" || k.u.state === "dazed") {
          k.u.state = "happy"; k.u.hp = fullHp(k.u.level, k.u.m); k.u.target = null; invitesNow++; invited.happy++;
          if (k.leash) task = { kind: "leash", u: k.u, until: time + leashTime };
        }
      } else if (k.kind === "leash") { if (k.u.state === "happy") { k.u.state = "leashed"; invited.leashed++; invited.happy--; } }
      else if (k.kind === "quest") { quested.add(k.key); const L = (byCell.get(k.key) ?? []).find(u => u.legend); if (L && L.state === "wild") { L.state = "happy"; L.hp *= LD; L.dps *= LD; } }
      else if (k.kind === "defend") { witch.x = k.x; witch.z = k.z; defending = { x: k.x, z: k.z }; here = null; }
    }
    if (!task) {
      const dz = dazed > 0 ? dazedNear(witch.x, witch.z) : null;
      if (dz) task = { kind: "talk", u: dz, until: time + talk[dz.level] / o.skill + approach * 0.5, leash: leashIt(dz) };
      else if (defending && units.some(u => u.state === "enraged" && Math.hypot(u.x - defending!.x, u.z - defending!.z) < GR) && armyF() > 0) { /* still fighting there */ }
      else {
        defending = null;
        const s = chooseSiege();
        if (s) {
          const S = sounds.get(s)!, tw = Math.hypot(S.x - witch.x, S.z - witch.z) / witchSpeed + land, ta = Math.hypot(S.x - army.x, S.z - army.z) / posseSpeed;
          task = { kind: "defend", key: s, x: S.x, z: S.z, until: time + Math.max(tw, ta) };
        } else {
          const area = chooseArea();
          if (!area) idleNow += dt;
          else if (area !== here) { const [cx, cy] = area.split(",").map(Number), st = map.siteOf(cx, cy); task = fly(area, st.x, st.z, time); }
          else {
            if (!worked.has(area)) {
              worked.add(area);
              if ((o.questShare ?? 0) > 0 && !quested.has(area)) { const [cx, cy] = area.split(",").map(Number); if (hash2(cx, cy, map.seed + 991) < (o.questShare ?? 0)) task = { kind: "quest", key: area, until: time + questTime }; }
            }
            if (!task) { const u = pick(area); if (u) task = { kind: "talk", u, until: time + talk[u.level] / o.skill + approach, leash: leashIt(u) }; }
          }
        }
      }
    }
    // Her army follows her (or makes for the siege she's taking it to), eating the berries of each area it reaches.
    const goal = task?.kind === "defend" ? { x: task.x, z: task.z } : defending ?? witch, gd = Math.hypot(goal.x - army.x, goal.z - army.z);
    if (gd > 1) { const step = Math.min(gd, posseSpeed * dt); army.x += ((goal.x - army.x) / gd) * step; army.z += ((goal.z - army.z) / gd) * step; }
    if (here && gd < 20 && !fed.has(here) && leashed().length) { fed.add(here); berries += berriesPerArea; }
    if (berries > 0) evolve();
    for (const u of units) if (u.state === "leashed") { u.x = army.x; u.z = army.z; }

    // Fights: each area's happy creatures against the enraged within guardRadius of its middle;
    // her army against the enraged within guardRadius of it; focus fire, both ways.
    const enraged = units.filter(u => u.state === "enraged");
    const held = new Set<Unit>();
    if (enraged.length) {
      const zones: { x: number; z: number; side: Unit[] }[] = [];
      const happyBy = new Map<string, Unit[]>();
      for (const u of units) if (u.state === "happy") { let l = happyBy.get(u.cell); if (!l) happyBy.set(u.cell, (l = [])); l.push(u); }
      for (const [k, side] of happyBy) {
        const s = soundOf(k), [cx, cy] = k.split(",").map(Number), c = s ?? map.siteOf(cx, cy);
        zones.push({ x: c.x, z: c.z, side });
        for (const u of side) { u.x = c.x; u.z = c.z; }
      }
      const L = leashed();
      if (L.length && task?.kind !== "defend") zones.push({ x: army.x, z: army.z, side: L }); // (not while walking to a siege)
      for (const zn of zones) {
        const foes = enraged.filter(u => !held.has(u) && Math.abs(u.x - zn.x) < GR && Math.abs(u.z - zn.z) < GR && Math.hypot(u.x - zn.x, u.z - zn.z) < GR);
        if (!foes.length) continue;
        for (const f of foes) held.add(f);
        const hit = (from: Unit[], to: Unit[]) => {
          let dmg = from.reduce((a, u) => a + (u.hp > 0 ? u.dps : 0), 0) * dt;
          for (const u of to) { if (dmg <= 0) break; if (u.hp <= 0) continue; const k = Math.min(dmg, u.hp); u.hp -= k; dmg -= k; }
        };
        hit(zn.side, foes); hit(foes, zn.side);
        for (const u of [...foes, ...zn.side]) if (u.hp <= 0 && u.state !== "gone" && u.state !== "dazed") {
          if (u.state === "enraged" && dazed > 0 && !u.legend && Math.hypot(u.x - witch.x, u.z - witch.z) < GR * 1.5) { u.state = "dazed"; u.until = time + dazed; u.hp = 1; }
          else u.state = "gone";
        }
      }
    }
    for (const u of units) if (u.state === "dazed" && time >= (u.until ?? 0)) u.state = "gone";
    // An area's own fight is decided once one side of it is gone.
    for (const lf of deciding) {
      const own = byCell.get(lf.key) ?? [];
      if (!own.some(u => u.state === "enraged")) lf.won = true;
      else if (!own.some(u => u.state === "happy" && u.level > 0)) lf.won = false;
      if (lf.won !== null) deciding.delete(lf);
    }
    // The rest march on their soundsystems and hit them.
    for (const u of enraged) {
      if (u.state !== "enraged" || held.has(u) || !u.target) continue;
      const s = sounds.get(u.target);
      if (!s || s.hp <= 0) { u.target = u.legend ? null : nearestSound(u.x, u.z); continue; }
      const dx = s.x - u.x, dz = s.z - u.z, dist = Math.hypot(dx, dz), want = u.reach + s.radius;
      if (dist > want) { const step = Math.min(dist - want, u.speed * dt); u.x += (dx / dist) * step; u.z += (dz / dist) * step; }
      else { const k = u.dps * dt; s.hp -= k; if (u.cell === s.key) damage.own += k; else damage.other += k; }
    }
    for (const s of sounds.values()) {
      if (s.hp > 0 || ruined.has(s.key)) continue;
      ruined.add(s.key); falls++;
      const lf = local.find(l => l.key === s.key);
      if (lf) lf.fellAfter = time - s.at;
      if (s.key !== "home") { party.areas.delete(s.key); (party.ruined ??= new Set()).add(s.key); }
      for (const u of units) if (u.state === "enraged" && u.target === s.key) u.target = u.legend ? null : nearestSound(u.x, u.z);
    }
    if ([...sounds.values()].every(s => s.hp <= 0)) lost = { wave: party.wave, time };
    time += dt;
  }
  if (lost) sample();
  return { seed: map.seed, survived: lost ? lost.wave - 1 : party.wave, lost, waves, local, targets, damage, starve, invited, falls };
}
