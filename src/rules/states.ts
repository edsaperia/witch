// The creature-state model in the balance simulator (issue #87, Ed 2026-10-05): the witch does no
// damage, and her only action is the invite. A wild creature she invites turns happy and stays
// to defend its own area (never enraged); leashing a happy one is a second step, and only leashed
// ones (her army) grow, eating berries as her posse goes. When an area gets its soundsystem its
// wild young and up turn enraged and besiege the nearest soundsystem; babies never do, and stay
// invitable. Legends (Ed, 2026-10-05, redesigned): asleep until their area holds none of their kind,
// then restless, and angry after restlessTime (slow long-range blasts at her and her posse only,
// never soundsystems, reaching into the next areas); happy (a defender, blasting the enraged in
// range) where she places one of the map's few relics. Knocked down, happy, leashed and
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
import { crowdTime, INVITE_FIRE, movement, throughput, type Buff, type Limits } from "./throughput";

/** How she splits her invites (issue #87): every one a defender; every third leashed; every one
 *  leashed; the babies leashed (they grow) and the young and adults left as defenders; or (relay,
 *  for the own-kind rule) happy in the area the next wave wakes and leashed everywhere else, so her
 *  army is of other kinds than the area it will defend; or mass (Ed, 2026-10-05: during a siege
 *  she either fetches new animals or masses defences at the next soundsystem to be attacked):
 *  leashed as relay, but her army doesn't follow her: it waits at the next soundsystem to be
 *  attacked (where a siege's besiegers go once theirs falls; with none on, the next wave's area). */
export type Policy = "defend" | "third" | "leash" | "babies" | "relay" | "mass";

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
  /** Relics on the map (3 or 4 by the seed, Ed 2026-10-05), one found every relicEvery waves (4),
   *  each placed by the legend of the next area the wave wakes (relicTime s, 5). Quests only give a
   *  buff now (the legend sleeps on), which the model leaves out. */
  relics?: number;
  relicEvery?: number;
  relicTime?: number;
  /** Seconds a legend stays restless (its area without its kind) before it turns angry (60). */
  restlessTime?: number;
  /** A legend's reach (m): angry, at her posse and her; happy, at the enraged (Ed, 2026-10-05: 2–3 areas; 420). */
  legendRange?: number;
  /** How many a legend's blast hits at once (3). */
  legendAoe?: number;
  /** Her invites in an angry legend's reach take this many times as long (dodging; 2); she works elsewhere when she can. */
  angryHazard?: number;
  /** Metres round an area's middle its happy creatures defend, and round her army (40). */
  guardRadius?: number;
  /** Seconds a knocked-down enraged creature lies dazed, invitable, where she is (0: they run off). */
  dazedTime?: number;
  /** Berries her army eats in each area she works (the tuning's berries.perArea, mean). */
  berriesPerArea?: number;
  /** A new soundsystem's health (the tuning's combat.soundsystemHealth). */
  soundHealth?: number;
  /** A happy legend's health, times its level's (1). Enraged animals in reach wear it down; beaten,
   *  it goes back to sleep (Ed, 2026-10-05; she keeps its buff). */
  legendDefence?: number;
  /** A legend's shot (happy or angry, Ed 2026-10-05: slow, far-reaching, less damage): legendShot
   *  damage to up to legendAoe targets every legendEvery seconds (10 every 15 s: tuned so relics help, REPORT 2026-10-05). */
  legendShot?: number;
  legendEvery?: number;
  /** Creatures never attack their own kind, whatever their states (Ed, 2026-10-05): a happy defender
   *  leaves its own area's enraged kin be, so a fresh soundsystem falls to other species to defend
   *  (true; false lets kin fight, as before). */
  ownKind?: boolean;
  /** Treetop speed (m/s; the tuning's), a posse's walk (m/s; leash run × 1.4) and its routes' length over the straight line (1.3). */
  witchSpeed?: number;
  posseSpeed?: number;
  route?: number;
  /** She defends (takes her army to a siege) when it is worth at most this share of her army's F (0.9). */
  margin?: number;
  dt?: number;
  /** 💌 invites (Ed, 2026-10-05, PR #89) in place of the talk times: she fills a crowd of up to
   *  `crowd` (4) wild ones at once, at her build's throughput (rules/throughput.ts: her legend
   *  buffs, the per-animal hit gap and any limits); skill scales how many letters land. */
  letters?: { buffs: Buff[]; limits?: Limits; crowd?: number };
  /** Record the run every this many seconds (for the point of no return; off). */
  trace?: number;
  /** Once the soundsystems standing fall to this share of their peak, the enraged march and hit
   *  hurryFactor times as fast (a way to shorten a lost run; off). */
  hurryAt?: number;
  /** Faster waves (Ed, 2026-10-05: "How about increasing wave speed?"). Once the soundsystems
   *  standing fall to rushAt of their peak, the gap between waves is times rushFactor (and with
   *  rushNow the next wave comes at once); a ramp shortens the gap over the whole run, linearly
   *  from `interval` to `rampTo` by wave `rampBy`, or by rampPct a wave down to rampTo. */
  /** Stop at this game time (s) too, lost or not (to compare runs whose waves come at different rates). */
  maxTime?: number;
  /** A fallen soundsystem costs wave time (Ed, 2026-10-05: "there's not much penalty for losing a
   *  soundsystem. Maybe it penalises you wave time?"; he picked 60 s): the next wave comes
   *  fallAdvance seconds sooner (60; at once if less is left; 0 off), or fallShare of the gap
   *  then; fallShrink (every later gap times 1 − it, down to fallFloor) was tried and dropped. */
  fallAdvance?: number;
  fallShare?: number;
  fallShrink?: number;
  fallFloor?: number;
  rushAt?: number;
  rushFactor?: number;
  rushNow?: boolean;
  rampTo?: number;
  rampBy?: number;
  rampPct?: number;
  hurryFactor?: number;
}

/** A moment of a traced run. */
export interface StatesTrace { time: number; wave: number; standing: number; peak: number; enragedF: number; /** Her army's, the happy creatures' and the happy legends' F. */ defenceF: number; homeHp: number; /** Enraged within 60 m of home, and the F there that can fight them (other kinds). */ homeSiegeF: number; homeDefF: number }

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
  /** Legends angry then. */
  angry: number;
  /** Seconds of the wave she had nothing to invite or defend. */
  idle: number;
  /** Invites this wave. */
  invites: number;
}

/** One area's own fight when it woke: the share of its young and up (by F) she had invited
 *  before (happy or leashed), the defenders' F and the enraged's, and how it went. */
export interface LocalFight { wave: number; key: string; invited: number; defendersF: number; enragedF: number; /** Of the defenders there (its happy and her army, if near), those of other kinds than the area's own (F): the ones that can fight its kin. */ otherF: number; /** Its soundsystem was standing at the next wave. */ held: boolean; /** Seconds after waking it fell, if it did. */ fellAfter?: number; /** Its own enraged were all beaten while its soundsystem stood, with some of its defenders left (null: no fight). */ won: boolean | null }

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
  /** The wave whose soundsystem fell first (not home), or null. */
  firstFall: number | null;
  /** Legends: how many turned angry (and where: woken areas or wild), happy by a relic, relics used,
   *  her seconds inviting in an angry one's reach, and her army lost to their blasts. */
  trace?: StatesTrace[];
  legends: { angry: number; angryAreas: { wave: number; key: string; woken: boolean }[]; happy: number; relicsUsed: number; hazardTime: number; armyLost: number; /** Happy legends worn down, back to sleep. */ beaten: number };
}

type State = "wild" | "happy" | "leashed" | "enraged" | "dazed" | "gone";
interface Unit { id: number; species: string; cell: string; x: number; z: number; level: Level; m: number; hp: number; dps: number; reach: number; speed: number; state: State; target: string | null; legend: boolean; until?: number; /** A legend's mood while it isn't happy. */ mood?: "asleep" | "restless" | "angry"; since?: number }
interface Sound { key: string; x: number; z: number; hp: number; radius: number; wave: number; at: number }

const valueOf = (u: Unit) => Math.sqrt(Math.max(0, u.hp) * u.dps);
const fullHp = (level: Level, m: number) => COMBAT.levels.hp[level] * m;

/** One run of the model on `map`. */
export function simulateStates(map: ForestMap, o: StatesOptions): StatesResult {
  const t = map.tuning, C = t.combat, dt = o.dt ?? 0.5, d = map.dancefloor;
  const approach = o.approach ?? 3, leashTime = o.leashTime ?? 2, GR = o.guardRadius ?? 40, dazed = o.dazedTime ?? 0, margin = o.margin ?? 0.9;
  const ownKind = o.ownKind ?? true, witchSpeed = o.witchSpeed ?? t.treetopSpeed, posseSpeed = (o.posseSpeed ?? t.leash.runSpeed * 1.4) / (o.route ?? 1.3), LD = o.legendDefence ?? 1;
  const berriesPerArea = o.berriesPerArea ?? (t.berries.perArea[0] + t.berries.perArea[1]) / 2;
  const size = t.areaSize * t.areaScale, land = t.descendTime + t.riseTime, cross = (0.5 * size) / t.groundSpeed;
  const talk = t.invite.talkTime;
  const relicCount = o.relics ?? (hash2(map.seed, 7, 1313) < 0.5 ? 3 : 4), relicEvery = o.relicEvery ?? 4, relicTime = o.relicTime ?? 5;
  const restlessTime = o.restlessTime ?? 60, LR = o.legendRange ?? 420, SHOT = o.legendShot ?? 10, EVERY = o.legendEvery ?? 15, AOE = o.legendAoe ?? 3, hazard = o.angryHazard ?? 2;

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
    if (u.legend) { u.state = c.legendState === "happy" ? "happy" : "wild"; u.mood = "asleep"; if (u.state === "happy") u.hp *= LD; }
    add(u);
  }
  let nextId = 1e6;

  const party = newParty(map), sounds = new Map<string, Sound>();
  sounds.set("home", { key: "home", x: d.x, z: d.z, hp: C.homeHealth, radius: C.homeRadius, wave: 0, at: 0 });
  const soundOf = (key: string) => (key === homeKey ? sounds.get("home") : sounds.get(key));
  const ruined = new Set<string>(), worked = new Set<string>(), fed = new Set<string>();
  const legends = units.filter(u => u.legend), legendStats = { angry: 0, angryAreas: [] as { wave: number; key: string; woken: boolean }[], happy: 0, relicsUsed: 0, hazardTime: 0, armyLost: 0, beaten: 0 };
  let relicsFound = 0, relicsHeld = 0;
  const waves: StatesWave[] = [], local: LocalFight[] = [], targets = { own: 0, other: 0 }, damage = { own: 0, other: 0 }, invited = { happy: 0, leashed: 0 };
  const openLocal = new Map<string, LocalFight>(), deciding = new Set<LocalFight>();
  let berries = 0, invitesNow = 0, idleNow = 0, falls = 0, count = 0, starve: number | null = null, lost: StatesResult["lost"] = null;

  // Her and her army: where they are and what she's doing.
  const witch = { x: d.x, z: d.z }, army = { x: d.x, z: d.z };
  type Task = { kind: "fly"; to: string; x: number; z: number; until: number } | { kind: "talk"; us: Unit[]; until: number } | { kind: "leash"; u: Unit; until: number } | { kind: "relic"; key: string; until: number } | { kind: "defend"; key: string; x: number; z: number; until: number } | null;
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
  // Who she invites at once: one at a time by talking; with 💌s, a crowd of up to `crowd`, biggest first.
  const LT = o.letters, TP = LT ? throughput(LT.buffs, undefined, LT.limits ?? {}) : null, MV = LT ? movement(LT.buffs) : { treetop: 1, land: 1, approach: 1 };
  const group = (key: string): Unit[] => {
    if (!LT) { const u = pick(key); return u ? [u] : []; }
    return wild(key).sort((a, b) => b.level - a.level).slice(0, LT.crowd ?? 4);
  };
  const inviteTime = (us: Unit[]) => (TP ? crowdTime(us.map(u => INVITE_FIRE.hits[u.level]), TP, o.skill) : talk[us[0].level] / o.skill);
  const leashQueue: Unit[] = [];
  const dazedNear = (x: number, z: number) => units.find(u => u.state === "dazed" && Math.hypot(u.x - x, u.z - z) < GR * 1.5) ?? null;
  const leashIt = (u: Unit) => {
    if (o.policy === "leash") return true;
    if (o.policy === "babies") return u.level === 0;
    if (o.policy === "third") return ++count % 3 === 0;
    if (o.policy === "relay" || o.policy === "mass") return !party.next.some(c => cellKey(c) === u.cell);
    return false;
  };
  const fly = (to: string, x: number, z: number, time: number): Task => ({ kind: "fly", to, x, z, until: time + Math.hypot(x - witch.x, z - witch.z) / (witchSpeed * MV.treetop) + land * MV.land + cross * MV.approach });
  // Angry legends' reach: their blasts at her and her posse.
  const inReach = (x: number, z: number) => legends.some(L => L.mood === "angry" && L.state === "wild" && Math.abs(L.x - x) < LR && Math.abs(L.z - z) < LR && Math.hypot(L.x - x, L.z - z) < LR);
  const siteOfKey = (k: string) => { const [cx, cy] = k.split(",").map(Number); return map.siteOf(cx, cy); };
  // Where to invite next: the areas the next wave wakes, then the one after, then the nearest wild
  // area; an area in an angry legend's reach counts as two areas further off.
  const chooseArea = (): string | null => {
    const has = (k: string) => !sounds.has(k) && k !== homeKey && wild(k).length > 0;
    const cost = (k: string) => { const st = siteOfKey(k); return Math.hypot(st.x - witch.x, st.z - witch.z) + (inReach(st.x, st.z) ? 2 * size : 0); };
    const best = (keys: Iterable<string>) => { let b: string | null = null, bd = Infinity; for (const k of keys) { if (!has(k)) continue; const c = cost(k); if (c < bd) { bd = c; b = k; } } return b; };
    return best(party.next.map(cellKey)) ?? best(party.afterNext.map(cellKey)) ?? best(byCell.keys());
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

  // Mass: the next soundsystem to be attacked.
  let massGoal = { x: d.x, z: d.z };
  const massAt = () => {
    const g = new Map<string, number>();
    for (const u of units) if (u.state === "enraged" && u.target) g.set(u.target, (g.get(u.target) ?? 0) + valueOf(u));
    let big: string | null = null, bv = 0;
    for (const [k, v] of g) if (v > bv) { bv = v; big = k; }
    if (big) {
      const s0 = sounds.get(big)!;
      let best: Sound | null = null, bd = Infinity;
      for (const s1 of sounds.values()) { if (s1.hp <= 0 || s1.key === big) continue; const k = Math.hypot(s1.x - s0.x, s1.z - s0.z); if (k < bd) { bd = k; best = s1; } }
      // (While this one still has most of its health, stand by it.)
      if (best && s0.hp < (s0.key === "home" ? C.homeHealth : o.soundHealth ?? C.soundsystemHealth) * 0.5) return { x: best.x, z: best.z };
      return { x: s0.x, z: s0.z };
    }
    const c = party.next[0];
    return c ? soundsystemFor(map, c) : { x: d.x, z: d.z };
  };
  const trace: StatesTrace[] = [];
  let peak = 1;
  let hurry = 1, rushing = false, shrunk = 1, firstFall: number | null = null;
  // The gap before wave w (Ed's faster waves: a ramp over the run, and a rush once it's lost).
  const gapNow = (w: number) => {
    let g = o.interval;
    if (o.rampTo !== undefined && o.rampBy) g = Math.max(o.rampTo, o.interval - ((o.interval - o.rampTo) * w) / o.rampBy);
    else if (o.rampTo !== undefined && o.rampPct) g = Math.max(o.rampTo, o.interval * Math.pow(1 - o.rampPct, w));
    g = Math.max(Math.min(g, o.fallFloor ?? 60), g * shrunk);
    return rushing ? g * (o.rushFactor ?? 0.5) : g;
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
    waves.push({ wave: party.wave, pool, poolF, frontier, happy, leashed: lea, armyF: aF, enraged: en, enragedF: eF, standing: [...sounds.values()].filter(s => s.hp > 0).length, angry: legends.filter(L => L.state === "wild" && L.mood === "angry").length, idle, invites: invitesNow });
    if (starve === null && party.wave >= 1 && idle >= o.interval / 2) starve = party.wave;
    idleNow = 0; invitesNow = 0;
  };

  while (!lost) {
    if (o.maxTime !== undefined && time >= o.maxTime) break;
    if (time >= nextAt) {
      sample();
      for (const lf of openLocal.values()) { lf.held = (sounds.get(lf.key)?.hp ?? 0) > 0; }
      openLocal.clear();
      if (party.wave >= o.maxWaves) break;
      nextAt += gapNow(party.wave + 1);
      const wave = party.wave + 1;
      if (wave % relicEvery === 0 && relicsFound < relicCount) { relicsFound++; relicsHeld++; } // (she finds one on her travels)
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
        const kind = AREA_TYPES[map.typeOf(a.cell[0], a.cell[1])].creature;
        let otherF = 0;
        for (const u of l) if (u.state === "happy" && u.species !== kind) otherF += valueOf(u);
        if (Math.hypot(army.x - at.x, army.z - at.z) < GR * 1.5) for (const u of leashed()) if (u.species !== kind) otherF += valueOf(u);
        let enF = 0;
        for (const u of l) {
          if (u.state !== "wild" || u.level === 0) continue; // babies never
          if (u.legend) continue; // (soundsystems no longer wake legends)
          u.state = "enraged";
          u.target = nearestSound(u.x, u.z);
          if (u.target === key) targets.own++; else targets.other++;
          enF += valueOf(u);
        }
        const lf: LocalFight = { wave: party.wave, key, invited: all > 0 ? inv / all : 0, defendersF: defF, enragedF: enF, otherF, held: true, won: null };
        local.push(lf); openLocal.set(key, lf); if (enF > 0 && defF > 0) deciding.add(lf);
      }
    }

    // Her time.
    if (task && time >= task.until) {
      const k: Task = task;
      task = null;
      if (k.kind === "fly") { witch.x = k.x; witch.z = k.z; here = k.to; }
      else if (k.kind === "talk") {
        for (const u of k.us) if (u.state === "wild" || u.state === "dazed") {
          u.state = "happy"; u.hp = fullHp(u.level, u.m); u.target = null; invitesNow++; invited.happy++;
          if (leashIt(u)) leashQueue.push(u);
        }
      } else if (k.kind === "leash") { if (k.u.state === "happy") { k.u.state = "leashed"; invited.leashed++; invited.happy--; } }
      else if (k.kind === "relic") { const L = legends.find(u => u.cell === k.key); if (L && L.state === "wild") { L.state = "happy"; L.mood = undefined; L.hp = fullHp(LEGEND, 1) * LD; relicsHeld--; legendStats.relicsUsed++; legendStats.happy++; } }
      else if (k.kind === "defend") { witch.x = k.x; witch.z = k.z; defending = { x: k.x, z: k.z }; here = null; }
    }
    if (!task) {
      const dz = dazed > 0 ? dazedNear(witch.x, witch.z) : null;
      const lq = leashQueue.shift();
      if (lq) { if (lq.state === "happy") task = { kind: "leash", u: lq, until: time + leashTime }; }
      else if (dz) task = { kind: "talk", us: [dz], until: time + inviteTime([dz]) * 0.5 + approach * 0.5 };
      else if (defending && units.some(u => u.state === "enraged" && Math.hypot(u.x - defending!.x, u.z - defending!.z) < GR) && armyF() > 0) { /* still fighting there */ }
      else {
        defending = null;
        const s = o.policy === "mass" ? null : chooseSiege();
        if (s) {
          const S = sounds.get(s)!, tw = Math.hypot(S.x - witch.x, S.z - witch.z) / witchSpeed + land, ta = Math.hypot(S.x - army.x, S.z - army.z) / posseSpeed;
          task = { kind: "defend", key: s, x: S.x, z: S.z, until: time + Math.max(tw, ta) };
        } else {
          const area = chooseArea();
          if (!area) idleNow += dt;
          else if (area !== here) { const [cx, cy] = area.split(",").map(Number), st = map.siteOf(cx, cy); task = fly(area, st.x, st.z, time); }
          else {
            worked.add(area);
            // A relic she holds goes by the legend of the area the next wave wakes.
            if (relicsHeld > 0 && party.next.some(c => cellKey(c) === area) && legends.some(u => u.cell === area && u.state === "wild")) task = { kind: "relic", key: area, until: time + relicTime };
            if (!task) {
              const us = group(area), slow = inReach(witch.x, witch.z) ? hazard : 1;
              if (us.length) { const dur = (inviteTime(us) + approach * MV.approach) * slow; task = { kind: "talk", us, until: time + dur }; if (slow > 1) legendStats.hazardTime += dur; }
            }
          }
        }
      }
    }
    // Her army follows her (or makes for the siege she's taking it to), eating the berries of each area it reaches.
    if (o.policy === "mass" && Math.floor(time / 2) !== Math.floor((time - dt) / 2)) massGoal = massAt();
    const goal = o.policy === "mass" ? massGoal : task?.kind === "defend" ? { x: task.x, z: task.z } : defending ?? witch, gd = Math.hypot(goal.x - army.x, goal.z - army.z);
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
      for (const u of units) if (u.state === "happy" && !u.legend) { let l = happyBy.get(u.cell); if (!l) happyBy.set(u.cell, (l = [])); l.push(u); }
      for (const [k, side] of happyBy) {
        const s = soundOf(k), [cx, cy] = k.split(",").map(Number), c = s ?? map.siteOf(cx, cy);
        zones.push({ x: c.x, z: c.z, side });
        for (const u of side) { u.x = c.x; u.z = c.z; }
      }
      // Happy legends: the enraged that come within guardRadius wear them down (their shots are above).
      for (const H of legends) {
        if (H.state !== "happy") continue;
        const foes = enraged.filter(u => !held.has(u) && u.species !== H.species && Math.abs(u.x - H.x) < GR && Math.abs(u.z - H.z) < GR && Math.hypot(u.x - H.x, u.z - H.z) < GR);
        if (!foes.length) { H.hp = Math.min(fullHp(LEGEND, 1) * LD, H.hp + ((fullHp(LEGEND, 1) * LD) / 120) * dt); continue; } // (healing over 2 minutes with none near)
        for (const f of foes) held.add(f);
        H.hp -= foes.reduce((a, u) => a + u.dps, 0) * dt;
        if (H.hp <= 0) { H.state = "wild"; H.mood = "asleep"; H.hp = fullHp(LEGEND, 1); legendStats.beaten++; } // back to sleep (her buff stays)
      }
      const L = leashed();
      if (L.length && task?.kind !== "defend") zones.push({ x: army.x, z: army.z, side: L }); // (not while walking to a siege)
      for (const zn of zones) {
        // (With the own-kind rule, only foes some defender here can fight, and only them.)
        const foes = enraged.filter(u => !held.has(u) && Math.abs(u.x - zn.x) < GR && Math.abs(u.z - zn.z) < GR && Math.hypot(u.x - zn.x, u.z - zn.z) < GR && (!ownKind || zn.side.some(v => v.species !== u.species && v.hp > 0)));
        if (!foes.length) continue;
        for (const f of foes) held.add(f);
        // Focus fire, kind by kind: each species' damage goes to the first foes not of its kind.
        const hit = (from: Unit[], to: Unit[]) => {
          const by = new Map<string, number>();
          for (const u of from) if (u.hp > 0) by.set(ownKind ? u.species : "", (by.get(ownKind ? u.species : "") ?? 0) + u.dps * dt);
          for (const [sp, d0] of by) {
            let dmg = d0;
            for (const u of to) { if (dmg <= 0) break; if (u.hp <= 0 || (ownKind && u.species === sp)) continue; const k = Math.min(dmg, u.hp); u.hp -= k; dmg -= k; }
          }
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
      if ((sounds.get(lf.key)?.hp ?? 0) <= 0) lf.won = false; // (its soundsystem fell first)
      else if (!own.some(u => u.state === "enraged")) lf.won = true;
      else if (!own.some(u => u.state === "happy" && u.level > 0)) lf.won = false;
      if (lf.won !== null) deciding.delete(lf);
    }
    // Legends: restless while their area holds none of their kind (any state; her army counts where
    // it stands), angry after restlessTime, calm again as soon as one is back.
    if (Math.floor(time / 2) !== Math.floor((time - dt) / 2)) {
      const present = new Set<string>();
      for (const u of units) if (!u.legend && (u.state === "wild" || u.state === "happy" || u.state === "enraged" || u.state === "dazed")) present.add(`${u.cell}|${u.species}`);
      for (const L of legends) {
        if (L.state !== "wild") continue;
        const st = siteOfKey(L.cell);
        const here = present.has(`${L.cell}|${L.species}`) || (Math.hypot(army.x - st.x, army.z - st.z) < size / 2 && leashed().some(u => u.species === L.species));
        if (here) { if (L.mood === "restless") L.mood = "asleep"; continue; }
        if (L.mood === "asleep") { L.mood = "restless"; L.since = time; }
        else if (L.mood === "restless" && time - (L.since ?? time) >= restlessTime) { L.mood = "angry"; legendStats.angry++; legendStats.angryAreas.push({ wave: party.wave, key: L.cell, woken: sounds.has(L.cell) }); }
      }
    }
    // Their shots: slow, far-reaching, up to legendAoe at once, never their own kind. Angry ones at
    // her posse (and her: the model has her dodge, slowing her invites), happy ones at the enraged in reach.
    for (const L of legends) {
      if (!(L.state === "happy" || (L.state === "wild" && L.mood === "angry"))) continue;
      if (time < (L.until ?? 0)) continue;
      const near = (u: Unit) => Math.abs(u.x - L.x) <= LR && Math.abs(u.z - L.z) <= LR && Math.hypot(u.x - L.x, u.z - L.z) <= LR;
      const want: State = L.state === "happy" ? "enraged" : "leashed";
      if (want === "leashed" && Math.hypot(army.x - L.x, army.z - L.z) > LR) continue;
      let n = 0;
      for (const u of units) {
        if (n >= AOE) break;
        if (u.state !== want || u.species === L.species || !near(u)) continue;
        u.hp -= SHOT; n++;
        if (u.hp <= 0) { u.state = "gone"; if (want === "leashed") legendStats.armyLost++; }
      }
      if (n) L.until = time + EVERY;
    }
    // The rest march on their soundsystems and hit them.
    for (const u of enraged) {
      if (u.state !== "enraged" || held.has(u) || !u.target) continue;
      const s = sounds.get(u.target);
      if (!s || s.hp <= 0) { if (u.legend) u.state = "gone"; else u.target = nearestSound(u.x, u.z); continue; }
      const dx = s.x - u.x, dz = s.z - u.z, dist = Math.hypot(dx, dz), want = u.reach + s.radius;
      if (dist > want) { const step = Math.min(dist - want, u.speed * hurry * dt); u.x += (dx / dist) * step; u.z += (dz / dist) * step; }
      else { const k = u.dps * hurry * dt; s.hp -= k; if (u.cell === s.key) damage.own += k; else damage.other += k; }
    }
    for (const s of sounds.values()) {
      if (s.hp > 0 || ruined.has(s.key)) continue;
      ruined.add(s.key); falls++;
      if (s.key !== "home") {
        firstFall ??= party.wave;
        // The wave time it costs: the next wave sooner, and every later gap shorter.
        const left = nextAt - time, cut = o.fallShare !== undefined ? o.fallShare * gapNow(party.wave + 1) : o.fallAdvance ?? 60;
        if (cut > 0) nextAt = time + Math.max(0, left - cut);
        if (o.fallShrink) shrunk *= 1 - o.fallShrink;
      }
      const lf = local.find(l => l.key === s.key);
      if (lf) lf.fellAfter = time - s.at;
      if (s.key !== "home") { party.areas.delete(s.key); (party.ruined ??= new Set()).add(s.key); }
      // Its besiegers march on to the next-nearest; its own legend goes back to sleep, for good (Ed, 2026-10-05).
      for (const u of units) if (u.state === "enraged" && u.target === s.key) { if (u.legend) u.state = "gone"; else u.target = nearestSound(u.x, u.z); }
    }
    const standing = [...sounds.values()].filter(s => s.hp > 0).length;
    peak = Math.max(peak, standing);
    if (o.hurryAt !== undefined && hurry === 1 && party.wave >= 3 && standing <= o.hurryAt * peak) hurry = o.hurryFactor ?? 2;
    if (o.rushAt !== undefined && !rushing && party.wave >= 3 && standing <= o.rushAt * peak) {
      rushing = true;
      const left = nextAt - time;
      nextAt = o.rushNow ? time : time + left * (o.rushFactor ?? 0.5);
    }
    if (o.trace && Math.floor(time / o.trace) !== Math.floor((time - dt) / o.trace)) {
      let eF = 0, dF = 0, hs = 0, hd = 0;
      const H = sounds.get("home")!;
      const nearHome: Unit[] = [];
      for (const u of units) {
        if (u.state === "enraged") { const v = valueOf(u); eF += v; if (Math.hypot(u.x - H.x, u.z - H.z) < 60) { hs += v; nearHome.push(u); } }
        else if (u.state === "happy" || u.state === "leashed") dF += valueOf(u);
      }
      for (const u of units) if ((u.state === "happy" || u.state === "leashed") && nearHome.some(f => f.species !== u.species) && Math.hypot(u.x - H.x, u.z - H.z) < (u.legend ? LR : 60)) hd += valueOf(u);
      trace.push({ time, wave: party.wave, standing, peak, enragedF: eF, defenceF: dF, homeHp: Math.max(0, H.hp), homeSiegeF: hs, homeDefF: hd });
    }
    if ([...sounds.values()].every(s => s.hp <= 0)) lost = { wave: party.wave, time };
    time += dt;
  }
  if (lost) sample();
  return { seed: map.seed, survived: lost ? lost.wave - 1 : party.wave, lost, waves, local, targets, damage, starve, invited, falls, firstFall, legends: legendStats, ...(o.trace ? { trace } : {}) };
}
