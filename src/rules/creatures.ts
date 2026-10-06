// Creatures: each area's own kind, more of them and older the longer the area stays wild
// (Ed, 2026-10-04): every area starts the same, a young and an adult (Ed, 2026-10-05), and grows by a creature
// of a random level every wave while it stays wild (rules/growth.ts), so the areas the party
// reaches late are the dangerous ones. The home area holds none. Wild legends are rare, late threats (Ed,
// 2026-10-04): a few a map, only in remote areas, each a boss, asleep until the party reaches it. Idle creatures roam their whole area, never leaving it.
// Only those near the witch are simulated; the rest pick up where they would plausibly be.
import { coarseTurn, inFull, type LodCounts } from "./simLod";
import { questFor, type Quest } from "./quest";
import { rng } from "./random";
import { countScale, startCount } from "./growth";
import { AREA_TYPES, type ForestMap } from "./map";
import { isInside } from "./mapShape";
import { facingAway } from "./witch";
import type { Tuning } from "./tuning";
import type { Fight } from "./combat";

export type Level = 0 | 1 | 2 | 3;
export const LEGEND = 3;

/** How fast a species moves, against the usual (Ed, 2026-10-04): the witch is much faster than
 *  almost all of them; a few species are fast (rare, and weaker when combat comes); legends are
 *  very slow. */
export function speedFactor(species: string, level: Level, t: Tuning): number {
  const S = t.creatureSpeeds;
  return level === LEGEND ? S.legend : S.fast.includes(species) ? S.fastMult : 1;
}

export interface Creature {
  id: number;
  /** Its species id in the art module's bestiary: the area type's creature. */
  species: string;
  /** The area it belongs to. */
  cell: [number, number];
  /** 0 baby, 1 young, 2 adult, 3 legend. */
  level: Level;
  /** Its area's centre. */
  homeX: number;
  homeZ: number;
  /** How far from the centre it looks for somewhere to go (the area's reach). */
  range: number;
  /** A point surely inside its own area (its centre can lie in a neighbour's ground). */
  anchorX: number;
  anchorZ: number;
  x: number;
  z: number;
  tx: number;
  tz: number;
  /** Seconds left pausing (sniffing, grazing, sitting) before it picks somewhere new. */
  rest: number;
  speed: number;
  facing: 1 | -1;
  /** Turned away from the viewer: only while walking up the screen (see facingAway). */
  away: boolean;
  moving: boolean;
  /** Walk cycle clock, for the two walking frames. */
  walk: number;
  /** Game time it was last simulated. */
  seen: number;
  /** Its level of detail (rules/simLod.ts) when last stepped: in full, or coarse (unset: never decided). */
  lod?: "full" | "coarse";
  /** Invited, so leashed: to the witch or a placed sigil (rules/leash.ts moves it, not its roam). */
  leashed: boolean;
  /** Combat (rules/combat.ts): its health (maxHp by level when unset), when it was last hurt,
   *  knockback still to ease off, slowed until, its fight. */
  hp?: number;
  hurtAt?: number;
  kx?: number;
  kz?: number;
  slowUntil?: number;
  /** Stunned until (an armoured creature knocked over: Stage 5 counters). */
  stunUntil?: number;
  /** Burrowed (the mole, Stage 5): under the ground until, untouchable. */
  burrow?: { until: number };
  /** Leaping (the toad, Stage 5): from, to, when it took off and lands, how high. */
  leap?: { fx: number; fz: number; tx: number; tz: number; at: number; lands: number; height: number; /** whom a pounce has touched on the way (fight.leap.contact) */ hit?: number[] };
  fight?: Fight;
  /** Beaten in a fight: running for (fleeX, fleeZ), just off the map's edge (fleeUntil set), then gone. */
  fleeUntil?: number;
  /** Gave up a chase past its band (Ed, 2026-10-06): heading back into its area, then roaming; since retreatFrom. */
  retreat?: boolean;
  retreatFrom?: number;
  fleeX?: number;
  fleeZ?: number;
  /** Stage 5 movement (rules/movement.ts): its velocity in a fight, a charge under way, when its
   *  signature move is ready again, and when an ambush was sprung. */
  vx?: number;
  vz?: number;
  /** A charging legend's long charge (rules/combat.ts, legends.json charge): winding up, running,
   *  braking in its arc, or walking home; its heading (radians), speed, target, whom it has hit. */
  run?: { phase: "windup" | "run" | "brake" | "home"; at: number; angle: number; speed: number; turn: 1 | -1; target: import("./combat").Target | null; tx: number; tz: number; ran: number; hit: number[]; fromX: number; fromZ: number; decel?: number };
  /** Where a legend lies: where it spawned (it charges from here, and walks back here). */
  lairX?: number;
  lairZ?: number;
  /** A legend gone back to sleep away from where it lay, walking home to lie down there (Ed, 2026-10-06; rules/legends.ts). */
  homing?: boolean;
  charge?: { dx: number; dz: number; speed: number; until: number; /** when it sets off (it lowers its head till then) */ from?: number; /** it has struck (once a charge), it's braking */ struck?: boolean; braking?: boolean; /** a legend's charge: whom it has trampled */ hit?: number[]; /** rolling curled up (a hedgehog, a woodlouse): the damage it takes times this */ curl?: number };
  /** Dug in (a badger) or braced behind its tail (a beaver) until then: rooted, taking less. */
  dug?: number;
  /** A party animal travelling (rules/travel.ts: far from her on the ground or its sigil, quiet both
   *  ways), its route along area borders, and until when it stays in her posse after a fight. */
  travelling?: boolean;
  /** Its state (rules/creatureStates.ts, issue #87): set when it's invited to happy, or enraged; read it with stateOf. */
  state?: "wild" | "happy" | "leashed" | "enraged";
  /** When it was made happy (its 💌 ring full): its sigil rune pops out then (creatureStates.ts hasRune). */
  happyAt?: number;
  /** Knocked down while wild: dazed (nothing attacks it, it can still be invited) until then, then it runs off. */
  dazed?: boolean;
  /** Happy, in an area with a soundsystem: it keeps round it, dancing (rules/creatureStates.ts danceAt). */
  dancing?: boolean;
  /** A legend (rules/legends.ts): its restlessness 0..1 (no kin in its area: a nightmare), whether its
   *  dream quest can still be done (its dream shows), and whether it gives its buff (for good). */
  restlessness?: number;
  questOpen?: boolean;
  buffed?: boolean;
  /** A legend winding up a volley: where each shot is aimed, and at whom. */
  aims?: { x: number; z: number; target: import("./combat").Target }[];
  dazedUntil?: number;
  /** Its 💌 invite meter (0..1 at its last hit) and when that was (rules/affection.ts). */
  affection?: number;
  affectionAt?: number;
  /** The invite button held on it (states.leash "hold"): for how long, till when. */
  holdT?: number;
  holdAt?: number;
  route?: import("./travel").Route;
  engagedUntil?: number;
  brace?: number;
  /** A wild legend's move set (Stage 5): where it is in its pattern, and its phase. */
  legend?: { step: number; phase: 1 | 2 };
  moveReadyAt?: number;
  sprung?: number;
  /** Enraged by a wave (it's besieging or marching on a soundsystem): it can't be invited (Ed's playtest). */
  enraged?: boolean;
  /** Gone for the run: a beaten creature that ran off the map. */
  gone?: boolean;
  /** Marching on a soundsystem (its area's key, "home" for the dancefloor): a siege. */
  siege?: string;
  /** Let go when its witch was knocked out (Ed, 2026-10-04): neutral, walking to this area of its
   *  own kind, where it becomes an ordinary wild creature of that area. */
  wanderTo?: { x: number; z: number; cell: [number, number] };
  /** When it was last healed to full (a berry, or being invited): the view's heal pop. */
  healedAt?: number;
  /** An area's legend (Ed, 2026-10-04: every area has one, sleeping): a mini-boss once awake. */
  boss?: boolean;
  /** A legend's state (DESIGN.md, "Sleeping legends"): asleep (sunk in the ground, scenery) →
   *  its area's wave → waking (wildLegends.wake seconds, untouchable) → awake (angry, guarding its
   *  area) → beaten → slept (asleep for good). Asleep or awake → (later: mollified) → happy (its
   *  buff on, at home in its area). And when it last changed. */
  legendState?: LegendState;
  stateAt?: number;
  /** A legend's quest (rules/quest.ts): the creature it dreams of, and whether it was brought. */
  quest?: Quest;
  /** Of an area whose legend's quest is done, still wild: it leaves her and her party be. */
  friendly?: boolean;
  /** Of a friendly area the party has reached: a party animal guarding its area (not on her leash). */
  guard?: boolean;
  /** A disc (centre, radius in metres) found to lie wholly in its own area: see inOwnArea. */
  safeX?: number;
  safeZ?: number;
  safeR?: number;
  rand: () => number;
}

export type LegendState = "asleep" | "restless" | "angry" | "happy";

export interface AreaPopulation { babies: number; young: number; adults: number }

/** How many of each level every area starts with (Ed, 2026-10-04: every area the same; one young
 *  and one adult, Ed 2026-10-05; it was a baby and two adults). It grows by a creature a wave while it stays wild
 *  (rules/growth.ts). (Each area also has its sleeping legend: spawnCreatures.) */
export function population(map: ForestMap): AreaPopulation {
  const S = map.tuning.population.start;
  return { babies: S.babies, young: S.young, adults: S.adults };
}

/** A new wild creature of an area: at `at` if given, else somewhere in the area chosen by `r`. */
export function makeCreature(map: ForestMap, cell: [number, number], level: Level, id: number, r: () => number, at?: [number, number]): Creature {
  const t = map.tuning, type = AREA_TYPES[map.typeOf(cell[0], cell[1])], home = map.siteOf(cell[0], cell[1]);
  const range = wanderRange(map), [anchorX, anchorZ] = anchorOf(map, cell, home.x, home.z, range);
  const base = { cell, homeX: home.x, homeZ: home.z, range, anchorX, anchorZ };
  const [x, z] = at ?? pointInArea(map, base, r);
  return {
    id, species: type.creature, level, ...base, x, z, tx: x, tz: z,
    rest: r() * 3, speed: (level === LEGEND ? t.legendSpeed : t.creatureSpeed * speedFactor(type.creature, level, t)) * (0.7 + r() * 0.6),
    facing: r() < 0.5 ? 1 : -1, away: false, moving: false, walk: r(), seen: 0, leashed: false, ...(level === LEGEND ? { boss: true, legendState: "asleep" as const, stateAt: 0 } : {}),
    rand: rng(map.seed * 31 + (id + 1) * 7 + 11),
  };
}

/** Where an area's legend lies (Ed, 2026-10-04): out of its clearing, but well inside the map (where she can fly). */
function legendSpot(map: ForestMap, cell: [number, number], r: () => number): [number, number] {
  // In its clearing, near the top (Ed, 2026-10-06); else, where none fit, as before.
  const lc = map.legendClearing(cell[0], cell[1]);
  if (lc) return [lc.legend.x, lc.legend.z];
  const site = map.siteOf(cell[0], cell[1]), range = wanderRange(map), [anchorX, anchorZ] = anchorOf(map, cell, site.x, site.z, range);
  const base = { cell, homeX: site.x, homeZ: site.z, range, anchorX, anchorZ }, B = map.bounds;
  const inside = (px: number, pz: number) => isInside(B, px, pz, 15);
  let best = -1, at: [number, number] = [anchorX, anchorZ];
  for (let i = 0; i < 9; i++) { const [px, pz] = pointInArea(map, base, r), dd = Math.hypot(px - site.x, pz - site.z); if (inside(px, pz) && dd > best) { best = dd; at = [px, pz]; } }
  return at;
}

/** How far from its area's centre a creature looks for places to go: the whole area. */
export const wanderRange = (map: ForestMap) => map.areaSize * 0.75;

const inCell = (map: ForestMap, x: number, z: number, cell: [number, number]) => { const c = map.cellSafe(x, z).cell; return c[0] === cell[0] && c[1] === cell[1]; };

/** Whether (x, z) is in the creature's own area: asked of the map only once it leaves the disc
 *  last found to be surely inside (map.cellSafe), so a creature ambling about asks every metre
 *  or so, not every step (the area lookup was most of a frame's work with hundreds of them). */
function inOwnArea(map: ForestMap, c: Creature, x: number, z: number): boolean {
  if (c.safeR !== undefined && Math.hypot(x - c.safeX!, z - c.safeZ!) < c.safeR) return true;
  const r = map.cellSafe(x, z);
  if (r.cell[0] !== c.cell[0] || r.cell[1] !== c.cell[1]) return false;
  c.safeX = x; c.safeZ = z; c.safeR = r.safe;
  return true;
}

/** A point surely inside an area: its centre if that lies in its own ground, else the nearest
 *  such point found on rings round it. */
export function anchorOf(map: ForestMap, cell: [number, number], hx: number, hz: number, range: number): [number, number] {
  if (inCell(map, hx, hz, cell)) return [hx, hz];
  for (let d = 2; d < range * 1.5; d += 2) for (let k = 0; k < 16; k++) {
    const a = (k / 16) * Math.PI * 2, x = hx + Math.cos(a) * d, z = hz + Math.sin(a) * d;
    if (inCell(map, x, z, cell)) return [x, z];
  }
  return [hx, hz];
}

/** Somewhere inside the creature's own area, chosen by `r` (round its home, or round its party spot while it dances); its anchor if none is found. */
export function pointInArea(map: ForestMap, c: Pick<Creature, "cell" | "homeX" | "homeZ" | "range" | "anchorX" | "anchorZ"> & { dancing?: boolean }, r: () => number): [number, number] {
  // (a dancing one keeps round its party spot, its anchor: rules/partyGuests.ts)
  const cx = c.dancing ? c.anchorX : c.homeX, cz = c.dancing ? c.anchorZ : c.homeZ;
  for (let i = 0; i < 12; i++) {
    const a = r() * Math.PI * 2, d = Math.sqrt(r()) * c.range, x = cx + Math.cos(a) * d, z = cz + Math.sin(a) * d;
    if (inCell(map, x, z, c.cell)) return [x, z];
  }
  return [c.anchorX, c.anchorZ];
}

export function spawnCreatures(map: ForestMap): Creature[] {
  const out: Creature[] = [], pop = population(map);
  // The home area holds no creatures (Ed, 2026-10-03) and no legend (Ed, 2026-10-05: "Home area
  // shouldn't have a legend": so no buff at the start). The areas map.hasLegend picks (legends.share of them, Ed 2026-10-06) have their legend, sleeping in its clearing.
  const [hx, hy] = map.centreCell;
  for (const [cx, cy] of map.cells) {
    const home = cx === hx && cy === hy;
    const r = rng(map.seed * 7919 + cx * 131 + cy * 977 + 3), cell: [number, number] = [cx, cy], make = (level: Level) => out.push(makeCreature(map, cell, level, out.length, r));
    if (home) continue;
    {
      // Weaker species come in larger numbers, stronger fewer (Ed, 2026-10-05): 1 / their strength times as many.
      const k = countScale(AREA_TYPES[map.typeOf(cx, cy)].creature);
      for (let i = 0; i < startCount(pop.babies, k); i++) make(0);
      for (let i = 0; i < startCount(pop.young, k); i++) make(1);
      for (let i = 0; i < startCount(pop.adults, k); i++) make(2);
    }
    if (map.hasLegend && !map.hasLegend(cx, cy)) continue; // (legends in legends.share of the areas: Ed, 2026-10-06)
    const L = makeCreature(map, cell, LEGEND, out.length, r, legendSpot(map, cell, r));
    L.legendState = "asleep"; L.stateAt = 0;
    L.lairX = L.x; L.lairZ = L.z; // (where it lies: home, which it goes back to before it sleeps again; Ed, 2026-10-06)
    L.quest = questFor(map, cell, L.species);
    out.push(L);
  }
  return out;
}

/** Roam: walk to a random spot in its own area, pause a while, pick another. It never crosses
 *  its area's border: a step that would cross it is not taken, and it chooses again. */
export function stepCreature(c: Creature, dt: number, map: ForestMap): void {
  // Out of its own area (it chased the witch, Ed 2026-10-04): it walks back to its spot first.
  if (!inOwnArea(map, c, c.x, c.z)) {
    const dx = c.anchorX - c.x, dz = c.anchorZ - c.z, d = Math.hypot(dx, dz) || 1, step = Math.min(d, c.speed * 2 * dt);
    c.x += (dx / d) * step; c.z += (dz / d) * step; c.tx = c.anchorX; c.tz = c.anchorZ; c.rest = 0;
    if (Math.abs(dx) > 0.02) c.facing = dx > 0 ? 1 : -1;
    c.moving = true; c.walk += dt * 4;
    return;
  }
  if (c.rest > 0) { c.rest -= dt; c.moving = false; c.away = false; return; }
  const dx = c.tx - c.x, dz = c.tz - c.z, d = Math.hypot(dx, dz);
  if (d < 0.05) {
    [c.tx, c.tz] = pointInArea(map, c, c.rand);
    c.rest = 0.8 + c.rand() * 3.5; c.moving = false;
    return;
  }
  const step = Math.min(d, c.speed * dt), nx = c.x + (dx / d) * step, nz = c.z + (dz / d) * step;
  // Every step checks where it would stand: still its own area? If not, it stops and chooses again.
  if (!inOwnArea(map, c, nx, nz)) { c.tx = c.x; c.tz = c.z; c.moving = false; return; }
  c.x = nx; c.z = nz;
  if (Math.abs(dx) > 0.02) c.facing = dx > 0 ? 1 : -1;
  c.away = facingAway(dx, dz, c.away, 0, map.tuning); // away only while heading up the screen
  c.moving = true;
  c.walk += dt * (c.level === LEGEND ? 1.5 : 4);
}

/** A creature moved by combat (rules/combat.ts) or a knockout (rules/knockout.ts) this step,
 *  not by its roam or its leash. */
export const heldByCombat = (c: Creature) => !!(c.gone || c.fleeUntil || c.wanderTo || c.fight?.target || c.retreat || (c.siege && !c.leashed));

/** Step only the creatures within `radius` metres of (x, z). One coming back into range after a
 *  while is put where it would plausibly be by now (a point in its area chosen from its id and
 *  the time), rather than where it was left. A `dormant` one (a wild legend still asleep) stays
 *  where it lies. */
export function stepCreaturesNear(all: Creature[], x: number, z: number, radius: number, dt: number, time: number, map: ForestMap, dormant: (c: Creature) => boolean = () => false, lod: { full: number; band: number; every: number } = { full: Infinity, band: 0, every: 1 }, counts?: LodCounts): void {
  // In full within lod.full of her (what the view can show); beyond, coarsely (rules/simLod.ts):
  // once every lod.every steps, by that many steps at once, taking turns by id; past `radius`
  // (by its home) not at all.
  const tick = Math.round(time / dt);
  for (const c of all) {
    if (c.leashed || c.gone) continue;
    const ax = Math.abs(c.homeX - x), az = Math.abs(c.homeZ - z);
    if (ax > radius || az > radius) { if (counts) counts.frozen++; continue; }
    if (heldByCombat(c)) { c.seen = time; continue; } // fighting, fleeing, marching or walking home: moved by combat and knockout
    const full = inFull(c, Math.max(Math.abs(c.x - x), Math.abs(c.z - z)), lod.full, lod.band);
    if (counts) { if (full) counts.full++; else counts.coarse++; }
    if (!full && !coarseTurn(tick, c.id, lod.every) && time - c.seen <= 3) continue; // (its turn comes well within 3 s: `seen` is kept fresh by it)
    if (dormant(c)) { c.seen = time; c.moving = false; c.away = false; continue; }
    if (time - c.seen > 3) {
      const r = rng(c.id * 7919 + Math.floor(time / 20) * 131 + 5);
      [c.x, c.z] = pointInArea(map, c, r);
      [c.tx, c.tz] = pointInArea(map, c, r);
      c.rest = r() * 2;
    }
    c.seen = time;
    stepCreature(c, full ? dt : dt * lod.every, map);
  }
}

/** Noticing the witch (Ed's playtest, 2026-10-04: a larger responsive area makes them feel alive):
 *  wild creatures roaming within notice.radius of a witch on the ground turn to look at her when
 *  they pause; babies of a curious kind come up to about notice.curious metres from her, skittish
 *  ones keep about notice.skittish off (within their own area: their roam keeps them in it). */
export function stepNotice(list: Iterable<Creature>, witches: { x: number; z: number; onGround: boolean }[], temper: (species: string) => "curious" | "skittish" | null, t: Tuning): void {
  const N = t.notice;
  for (const c of list) {
    if (c.leashed || c.gone || heldByCombat(c)) continue;
    let w: { x: number; z: number } | null = null, d = N.radius;
    for (const v of witches) { if (!v.onGround) continue; const k = Math.hypot(v.x - c.x, v.z - c.z); if (k < d) { d = k; w = v; } }
    if (!w) continue;
    const kind = c.level === 0 ? temper(c.species) : null, ux = (w.x - c.x) / (d || 1), uz = (w.z - c.z) / (d || 1);
    if (kind === "curious" && d > N.curious + 1) { c.tx = w.x - ux * N.curious; c.tz = w.z - uz * N.curious; c.rest = 0; }
    else if (kind === "skittish" && d < N.skittish) { c.tx = c.x - ux * (N.skittish - d + 2); c.tz = c.z - uz * (N.skittish - d + 2); c.rest = 0; }
    else if (c.rest > 0) { c.facing = w.x >= c.x ? 1 : -1; c.away = w.z < c.z - 1; }
  }
}

