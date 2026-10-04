// The balance simulator (Ed, 2026-10-04: "how powerful we think a player can get, and how
// quickly"; what matters more is whether a late-reacting player can still catch up). A headless
// model of only what decides a run: the real map, its creatures and the real wave order (the
// party's own picker, ruined areas dropping out as in the game); each wave's soundsystem with its
// health; its area's young and up marching on it in straight lines at their march speed
// (creatureSpeed × marchMult, as combat.ts moves them) and, once in reach, hitting it at their
// level's dps; survivors of a fallen soundsystem marching on to the next-nearest still standing;
// the run over when none stands, home included. Soundsystems are passive, so the same-kind truce
// doesn't matter here. An optional player grows at a steady rate of fighting value and fights
// sieges by the square law (rules/power.ts). It runs in well under a second a run, where the full
// game manages about 3.5 times real time. Read by tools/balance/sim.mjs and balance.test.ts.
import { attackOf, COMBAT } from "./combat";
import { spawnCreatures, type Creature, type Level } from "./creatures";
import type { ForestMap } from "./map";
import { cellKey, newParty, soundsystemFor, spreadWave } from "./party";
import { lanchester, levelValue } from "./power";

/** A player in the model (the guesses are here): from the start of wave `fromWave` (0: from the
 *  start) their party's fighting value grows by `growth` a minute (inviting, feeding, evolving);
 *  whenever free, they fight the biggest siege they can beat (strictly less than their own value),
 *  ending it and keeping √(theirs² − its²), and are then busy `fightTime` seconds (getting there,
 *  the fight, regrouping). */
export interface SimPlayer { growth: number; fromWave: number; fightTime: number }

/** The director (a pacing variant, Ed 2026-10-04: "have areas spawn creatures over time in
 *  response to the player's progress"; not in the game yet): at each wave the dormant areas the
 *  next wave will wake get reinforcements (adults) worth budget = (base + perWave × wave^power) × max(0,
 *  1 + alpha × (player's F / expected − 1)) fighting value, expected being `expected` F a minute
 *  since the first wave's countdown began. alpha 0: the same whatever the player does. */
export interface SimDirector { base: number; perWave: number; alpha: number; expected: number; /** The budget's growth: perWave × wave^power (1 straight; 1.5 makes survival scale with skill, see the REPORT). */ power?: number }

export interface SimOptions {
  /** Seconds between waves. */
  interval: number;
  /** Attrition on the march (a pacing variant): the share of a fallen soundsystem's besiegers
   *  that march on to the next (the rest scatter home and leave the fight). 1, as in the game. */
  marchOn?: number;
  director?: SimDirector;
  /** Stop once this many waves have come (and the wave after it would arrive), lost or not. */
  maxWaves: number;
  /** The model's step (seconds). */
  dt?: number;
  player?: SimPlayer;
}

export interface WaveSample {
  wave: number;
  /** Game time, just before the next wave. */
  time: number;
  /** The biggest siege's fighting value, and every besieger's together. */
  largest: number;
  marching: number;
  /** Soundsystems standing (home included). */
  standing: number;
  /** The player's value then (with a player). */
  player?: number;
  /** Whether the player could beat the biggest siege then. */
  ahead?: boolean;
  /** Sieges marching or fighting then, and the director's reinforcements so far (F). */
  groups: number;
  reinforced: number;
}

export interface SimResult {
  seed: number;
  interval: number;
  /** When the last soundsystem fell: the wave then and the game time; null if it lasted maxWaves. */
  lost: { wave: number; time: number } | null;
  /** Waves seen through (the run lasted until wave survived + 1 would come). */
  survived: number;
  waves: WaveSample[];
}

interface Fighter { id: number; level: Level; cell: string; x: number; z: number; x0: number; z0: number; speed: number; dps: number; reach: number; value: number; siege: string | null; gone: boolean }
interface Sound { key: string; x: number; z: number; hp: number; radius: number }

/** A map's fighters (young and up), by area, worth working out once per map. */
const FIGHTERS = new WeakMap<ForestMap, Map<string, Fighter[]>>();

/** The fighters of a map's creatures: each with its march speed, dps, reach and value. */
export function fightersOf(map: ForestMap, creatures: Creature[] = spawnCreatures(map)): Map<string, Fighter[]> {
  const known = FIGHTERS.get(map);
  if (known) return known;
  const t = map.tuning, C = t.combat, by = new Map<string, Fighter[]>();
  for (const c of creatures) {
    if (c.level === 0) continue; // babies never join a siege
    const atk = attackOf(c.species, c.level, COMBAT)!, A = atk.attack, kites = A.delivery === "shot" && COMBAT.kite.species.includes(c.species);
    const reach = A.delivery === "shot" ? A.range * (kites ? COMBAT.kite.far : 0.8) : A.range + (A.lunge ?? 0) - 0.3;
    const f: Fighter = { id: c.id, level: c.level, cell: cellKey(c.cell), x: c.x, z: c.z, x0: c.x, z0: c.z, speed: c.speed * C.marchMult, dps: COMBAT.levels.dps[c.level], reach, value: levelValue(c.level), siege: null, gone: false };
    let l = by.get(f.cell);
    if (!l) by.set(f.cell, (l = []));
    l.push(f);
  }
  FIGHTERS.set(map, by);
  return by;
}

/** One run of the model on `map` (its tuning's population, combat and health numbers). */
export function simulate(map: ForestMap, o: SimOptions): SimResult {
  const t = map.tuning, C = t.combat, dt = o.dt ?? 0.5, by = fightersOf(map);
  for (const [k, l] of by) by.set(k, l.filter(f => f.id >= 0)); // (a previous run's reinforcements)
  for (const l of by.values()) for (const f of l) { f.gone = false; f.siege = null; f.x = f.x0; f.z = f.z0; }
  const live: Fighter[] = [], sounds = new Map<string, Sound>(), party = newParty(map), waves: WaveSample[] = [];
  const d = map.dancefloor;
  sounds.set("home", { key: "home", x: d.x, z: d.z, hp: C.homeHealth, radius: C.homeRadius });
  const P = o.player, ruined = new Set<string>(), D = o.director, share = o.marchOn ?? 1, adult = levelValue(2);
  let reinforced = 0, owed = 0, nextId = -1;
  let time = 0, nextAt = t.boot.time + t.party.startDelay + o.interval, playerF = 0, busyUntil = 0, lost: SimResult["lost"] = null;
  const nearest = (x: number, z: number) => {
    let best: string | null = null, bd = Infinity;
    for (const s of sounds.values()) { if (s.hp <= 0) continue; const k = Math.hypot(s.x - x, s.z - z); if (k < bd) { bd = k; best = s.key; } }
    return best;
  };
  const groups = () => {
    const g = new Map<string, number>();
    for (const f of live) if (!f.gone && f.siege) g.set(f.siege, (g.get(f.siege) ?? 0) + f.value);
    return g;
  };
  const sample = () => {
    const g = groups(), vals = [...g.values()], largest = vals.length ? Math.max(...vals) : 0;
    const s: WaveSample = { wave: party.wave, time, largest, marching: vals.reduce((a, b) => a + b, 0), standing: [...sounds.values()].filter(h => h.hp > 0).length, groups: vals.length, reinforced };
    if (P) { s.player = playerF; s.ahead = playerF > largest; }
    waves.push(s);
  };
  while (!lost) {
    if (time >= nextAt) {
      if (party.wave >= 1) sample();
      if (party.wave >= o.maxWaves) break;
      nextAt += o.interval;
      for (const a of spreadWave(party, map, time)) {
        const key = cellKey(a.cell), at = soundsystemFor(map, a.cell);
        sounds.set(key, { key, x: at.x, z: at.z, hp: C.soundsystemHealth, radius: C.soundsystemRadius });
        for (const f of by.get(key) ?? []) if (!f.gone) { f.siege = key; live.push(f); }
      }
      // The director: reinforcements for the areas the next wave wakes, by the player's progress.
      if (D && party.next.length) {
        const start = t.boot.time + t.party.startDelay, expected = (D.expected * Math.max(0, time - start)) / 60;
        const k = Math.max(0, 1 + D.alpha * ((expected > 0 ? playerF / expected : 1) - 1)), budget = (D.base + D.perWave * Math.pow(party.wave, D.power ?? 1)) * k;
        owed += budget;
        for (; owed >= adult; owed -= adult) {
          const cell = party.next[Math.floor(-nextId) % party.next.length], key = cellKey(cell), site = map.siteOf(cell[0], cell[1]);
          let l = by.get(key);
          if (!l) by.set(key, (l = []));
          l.push(reinforcement(nextId--, key, site.x, site.z, map));
          reinforced += adult;
        }
      }
    }
    // The player grows and fights the biggest siege they can beat.
    if (P && party.wave >= P.fromWave) {
      playerF += (P.growth / 60) * dt;
      if (time >= busyUntil) {
        let best: string | null = null, bv = 0;
        for (const [k, v] of groups()) if (v < playerF && v > bv) { bv = v; best = k; }
        if (best) {
          playerF = lanchester(playerF, bv);
          for (const f of live) if (f.siege === best) f.gone = true;
          busyUntil = time + P.fightTime;
        }
      }
    }
    // The sieges march and hit.
    for (const f of live) {
      if (f.gone || !f.siege) continue;
      const s = sounds.get(f.siege)!;
      const dx = s.x - f.x, dz = s.z - f.z, dist = Math.hypot(dx, dz), want = f.reach + s.radius;
      if (dist > want) { const step = Math.min(dist - want, f.speed * dt); f.x += (dx / dist) * step; f.z += (dz / dist) * step; }
      else s.hp -= f.dps * dt;
    }
    for (const s of sounds.values()) {
      if (s.hp > 0 || ruined.has(s.key)) continue;
      ruined.add(s.key);
      if (s.key !== "home") { party.areas.delete(s.key); (party.ruined ??= new Set()).add(s.key); }
      // Survivors march on to the next-nearest (with attrition, only a share of them; the rest scatter).
      for (const f of live) if (f.siege === s.key) f.siege = share >= 1 || frac(f.id * 0.6180339887 + s.x * 0.013) < share ? nearest(f.x, f.z) : null;
    }
    if ([...sounds.values()].every(s => s.hp <= 0)) lost = { wave: party.wave, time };
    time += dt;
  }
  if (lost) sample();
  return { seed: map.seed, interval: o.interval, lost, survived: lost ? lost.wave - 1 : party.wave, waves };
}

const frac = (x: number) => x - Math.floor(x);

/** A director's reinforcement: an adult at its area's centre, marching and hitting as one. */
function reinforcement(id: number, cell: string, x: number, z: number, map: ForestMap): Fighter {
  const A = COMBAT.attacks[COMBAT.byLevel.melee[2]!];
  return { id, level: 2, cell, x, z, x0: x, z0: z, speed: map.tuning.creatureSpeed * map.tuning.combat.marchMult, dps: COMBAT.levels.dps[2], reach: A.range + (A.lunge ?? 0) - 0.3, value: levelValue(2), siege: null, gone: false };
}
