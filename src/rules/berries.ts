// Berries and evolving (Ed, 2026-10-04). Every area has berry bushes; a small glowing berry grows on some of them, one per bush,
// berries.perArea of them in each area at the start. Bushes grow in patches (berries.patch). An eaten berry grows again at once on
// a free berry bush somewhere else on the map, so the number of berries never changes.
// Feeding on command (Ed, 2026-11-03: berry feeding is something she does deliberately and accurately, under time pressure): no
// animal eats on its own. Only the animal at the bottom of her sigil stack eats, and only when she presses the sigil button with a
// berry within berries.feed.reach of her (rules/sigilButton.ts): each press queues one more berry for it, while one is in reach and
// it has room (a youth's growth unfinished, an adult's pips under the most, or hurt; never a legend). It walks to each in order, at
// its own leash pace times berries.feed.speed (Ed: "otherwise feeding berries becomes a way of moving creatures quickly rather than
// levelling them up"), eats it, and goes back to her, or to its sigil if she has parked it meanwhile. A party animal that has eaten
// enough evolves on the next bar line of the music, so the view can make a show of it: the berries its next level's strength costs
// (toEvolve); a baby's one berry makes it a youth; evolving stops at adult (Ed, 2026-10-04: legends are the areas' own, never
// grown). An adult's berry is a buff pip (rules/buffs.ts); a hurt one's heals it, and gives no pip. No drawing here.
import { combatProfile } from "./combat";
import { beatAt, timeAt, type BeatClock } from "./beat";
import { LEGEND, heal, type Creature, type Level } from "./creatures";
import { gaitRate, leashSpeed } from "./leash";
import { stumpClearance, type ForestMap } from "./map";
import { rng } from "./random";
import type { Tuning } from "./tuning";
import { addPip, pipCount, pipFuel, wantsPip } from "./buffs";
import { chainLength } from "./chains";

/** A berry bush: where it stands, and its area's type (it's one of that area's own bushes). */
export interface BerryBush { x: number; z: number; type: number; variant: number; flip: boolean; /** a spot of the Harvest hat's ring (rules/spells.ts): no bush drawn, and never a regrown berry's */ harvest?: boolean }

export interface Berry {
  id: number;
  /** The bush it grows on (an index into bushes). */
  bush: number;
  /** The party animal it's queued for (on its way to eat it, or to after the one it's on), if any: taken. */
  claimedBy: number | null;
  /** One of the Harvest hat's ring (rules/spells.ts): eaten, it's gone (not grown again elsewhere) till the hat grows the ring again. */
  once?: boolean;
  /** Eaten and not grown again yet (a Harvest berry): not on the map. */
  gone?: boolean;
}

/** A party animal busy with a berry she fed it: walking to it, or eating it (eatLeft counts down). */
export interface Feeding { berry: number; eating: boolean; eatLeft: number }

export interface Evolving { from: Level; to: Level; /** game time of the bar line it evolves on */ at: number; /** when it began */ since: number }

export type BerryEventKind = "claimed" | "ate" | "regrew" | "evolving" | "evolved";
export interface BerryEvent { kind: BerryEventKind; id: number; x: number; z: number; at: number }

export interface BerryState {
  bushes: BerryBush[];
  berries: Berry[];
  /** Which bush carries a berry (by bush index): the berry's id, or -1. */
  onBush: Int32Array;
  /** Berries eaten towards the next level, per creature. */
  fed: Map<number, number>;
  feeding: Map<number, Feeding>;
  /** Berries queued after the one it's on, per creature, in order (Ed, 2026-11-03: each press of the sigil button queues one more). Made
   *  at the first queued; game state, so lockstep play and a guest's queue replay alike. */
  queue?: Map<number, number[]>;
  evolving: Map<number, Evolving>;
  /** Follower buffs (rules/buffs.ts): each adult's berry pips, as seconds of buff left (none kept yet: buffs.pips.start). */
  pips?: Map<number, number>;
  /** Game time each creature last ate (for the view's progress ring). */
  ateAt: Map<number, number>;
  events: BerryEvent[];
  rand: () => number;
  /** The Harvest hat's ring (rules/spells.ts): its berries' ids, made the first time it grows and reused after. */
  harvest?: number[];
}

/** The highest level a party animal evolves to: adult (Ed, 2026-10-04). */
export const TOP_LEVEL: Level = 2;
/** How much stronger a creature of `species` is at `level + 1` than at `level`, by berries.cost.by:
 *  "power", health × damage a second (the square of its fighting value), or "value", its fighting
 *  value √(hp × dps) (rules/power.ts); its species' strength included. */
export function strengthGain(level: Level, species: string | undefined, t: Tuning): number {
  const at = (l: number) => { const stats = combatProfile(species ?? "", l as Level), p = stats.health * stats.damagePerSecond; return t.berries.cost.by === "value" ? Math.sqrt(p) : p; };
  return at(level + 1) - at(level);
}

/** Berries needed to go up from a level (Ed, 2026-10-05: "tie the cost to strength"): the strength
 *  it gains, at berries.cost.per a berry, rounded, at least one. By fighting value (cost.by "value") a young of normal strength pays 4 (a baby berries.babyCost, 1). Adults and
 *  legends don't evolve. */
export const toEvolve = (level: Level, t: Tuning, species?: string): number => {
  if (level >= TOP_LEVEL) return Infinity;
  if (level === 0 && t.berries.babyCost !== undefined) return Math.max(1, t.berries.babyCost); // (one berry makes a baby a youth: Ed, 2026-10-11)
  const C = t.berries.cost;
  return Math.max(1, Math.round(strengthGain(level, species, t) / C.per));
};
const hurtNow = (c: Creature) => !!c.drops; // (its 💧s: rules/orbit.ts)

/** The feeding knobs (berries.feed), with their first values for an older tuning. */
export const feedKnobs = (t: Tuning): { reach: number; speed: number; hold: number } => t.berries.feed ?? { reach: 15, speed: 1, hold: 0.3 };

/** How many berries a party animal could eat now, before any queued (Ed, 2026-11-03: "not full"): a youth's or a baby's to finish its
 *  growing, an adult's to its most pips (rules/buffs.ts), and one more if it's hurt (that berry heals it and counts for nothing else);
 *  none for a legend, one evolving, or one not hers. */
export function feedRoom(c: Creature, s: BerryState, t: Tuning): number {
  if (!c || c.gone || !c.leashed || c.boss || c.partyLegend || c.level >= LEGEND || s.evolving.has(c.id)) return 0;
  const hurt = hurtNow(c) ? 1 : 0;
  if (c.level < TOP_LEVEL) return hurt + Math.max(0, Math.ceil(toEvolve(c.level, t, c.species) - (s.fed.get(c.id) ?? 0)));
  const P = t.buffs?.pips;
  return hurt + (P && wantsPip(c, s, t) ? Math.max(0, P.max - pipCount(pipFuel(s, c.id, t), t)) : 0);
}
/** Berries queued for it: the one it's on and those after. */
export const queuedFor = (s: BerryState, id: number): number => (s.feeding.has(id) ? 1 : 0) + (s.queue?.get(id)?.length ?? 0);
/** Whether a press would queue it one more: it has room left after what's queued. */
export const hasRoom = (c: Creature, s: BerryState, t: Tuning): boolean => feedRoom(c, s, t) - queuedFor(s, c.id) > 0;
/** Who may eat berries at all now (the debug key, B): a party animal with room. */
export const canEat = (c: Creature, s: BerryState, t: Tuning): boolean => feedRoom(c, s, t) > 0;

/** The nearest berry no one has taken within `reach` metres of (x, z), or null. */
export function nearestBerry(s: BerryState, x: number, z: number, reach: number): Berry | null {
  let best: Berry | null = null, bd = reach * reach;
  for (const b of s.berries) {
    if (b.claimedBy !== null || b.gone) continue;
    const p = s.bushes[b.bush];
    if (Math.abs(p.x - x) > reach || Math.abs(p.z - z) > reach) continue;
    const d = (p.x - x) ** 2 + (p.z - z) ** 2;
    if (d <= bd) { bd = d; best = b; }
  }
  return best;
}

/** The berry a press would queue for `c` with her at (x, z): the nearest un-taken one within berries.feed.reach of her, while it has
 *  room; else null. (The view makes this one glow brighter, the key over it: render/feedTag.ts.) */
export const feedTarget = (s: BerryState, c: Creature | undefined, x: number, z: number, t: Tuning): Berry | null =>
  c && hasRoom(c, s, t) ? nearestBerry(s, x, z, feedKnobs(t).reach) : null;

/** A press of the sigil button feeding `c` (her at x, z): one more berry queued for it, taken, if there's one in reach and it has room.
 *  Returns it, or null. */
export function queueBerry(s: BerryState, c: Creature, x: number, z: number, time: number, t: Tuning): Berry | null {
  const b = feedTarget(s, c, x, z, t);
  if (!b) return null;
  b.claimedBy = c.id;
  if (!s.feeding.has(c.id)) s.feeding.set(c.id, { berry: b.id, eating: false, eatLeft: 0 });
  else { const q = (s.queue ??= new Map()), l = q.get(c.id); if (l) l.push(b.id); else q.set(c.id, [b.id]); }
  const p = s.bushes[b.bush];
  s.events.push({ kind: "claimed", id: c.id, x: p.x, z: p.z, at: time });
  return b;
}

/** Its queue cancelled (a knockdown, Ed 2026-11-03; or it can't go on): the berry it's on and those after let go. */
export function cancelFeeding(s: BerryState, id: number): void {
  const f = s.feeding.get(id);
  if (f) { const b = s.berries[f.berry]; if (b?.claimedBy === id) b.claimedBy = null; s.feeding.delete(id); }
  const l = s.queue?.get(id);
  if (l) { for (const bid of l) { const b = s.berries[bid]; if (b?.claimedBy === id) b.claimedBy = null; } s.queue!.delete(id); }
}

/** The next berry of its queue (still there and still its), else it's done. */
function nextQueued(s: BerryState, id: number): void {
  const l = s.queue?.get(id);
  while (l?.length) {
    const bid = l.shift()!, b = s.berries[bid];
    if (b && !b.gone && b.claimedBy === id) { s.feeding.set(id, { berry: bid, eating: false, eatLeft: 0 }); break; }
  }
  if (l && !l.length) s.queue!.delete(id);
}

/** The berries' tuning with its per-area counts for this map's areas: they're for an area 112 m
 *  across, and a bigger one has more, by its ground (Ed, 2026-10-05: bigger areas), so the berries
 *  are as thick on the ground as before. */
export function berryCounts(map: ForestMap, t: Tuning): Tuning["berries"] {
  const k = (map.areaSize / 112) ** 2, B = t.berries;
  return { ...B, bushesPerArea: Math.round(B.bushesPerArea * k), perArea: B.perArea.map(v => Math.round(v * k)) };
}

/** A patch of berry bushes (berryPatches): its area, its centre, and its bushes, bushes[from] to bushes[to - 1]. */
export interface BerryPatch { cell: readonly [number, number]; x: number; z: number; from: number; to: number }

/** Candidate spots weighed for each patch centre (the best-candidate sampler below). */
const PATCH_CANDIDATES = 24;

/** Where a bush may stand in area (cx, cy): in that area, not on hardClear ground (kept clearings, lakes and their shores, the
 *  beach, the stump's roots), not within 1.5 m of a path, and `clear` metres or more from every stump (map.stoneGap: its own area's
 *  and its neighbours', measured from the stump; stumpClearance). */
const bushGround = (map: ForestMap, cx: number, cy: number, clear: number, x: number, z: number): boolean => {
  const c = map.areaAt(x, z).cell;
  if (c[0] !== cx || c[1] !== cy || map.stoneGap(x, z) < clear) return false;
  return !map.hardClear(x, z) && !map.paths.at(x, z, 1.5);
};

/** The berry bushes, in patches, from the seed: in every area of the playable map but home's centre, berries.bushesPerArea (scaled by
 *  berryCounts) in patches of patch.bushes [min, max] within patch.radius of a centre (Ed, v233), so she finds several berries in reach
 *  together. Spread evenly over the area (Ed, 2026-11-06: "I think we should change this process to more evenly distribute patches in
 *  the area, and also increase the clearance from the stump (not the middle)."): each patch centre is the best of PATCH_CANDIDATES
 *  random spots on the area's bush ground, the one farthest from every patch already placed (its own area's and its neighbours'), and
 *  never nearer one than patch.spacing metres (Mitchell's best-candidate sampling: blue noise, every patch as far from the others as the
 *  ground allows). A centre keeps its whole patch on that ground: patch.radius inside its area's rim and stumpClearance (rules/map.ts) +
 *  patch.radius from every stump (map.soundsystemSpot, where the stump stands, not the area's middle), so no bush grows in a stump's
 *  fighting arena. An area that runs out of room stops short of its bushes rather than grow them nearer (the coordinator, for Ed,
 *  2026-11-06). Bushes are made area by area, in map.cells order, each area's patches together. */
export function berryPatches(map: ForestMap, t: Tuning): { bushes: BerryBush[]; patches: BerryPatch[] } {
  const B = berryCounts(map, t), P = B.patch, A = map.areaSize, bushes: BerryBush[] = [], patches: BerryPatch[] = [];
  const spacing = P.spacing, clear = stumpClearance(t), R = P.radius;
  for (const [cx, cy] of map.cells) {
    if (cx === map.centreCell[0] && cy === map.centreCell[1]) continue; // home: the dancefloor's clearing
    const s = map.siteOf(cx, cy), ar = rng(map.seed * 3571 + cx * 389 + cy * 7741 + 17), first = bushes.length;
    // (the patches near enough to matter: its neighbours' already placed, and its own as they come)
    const near = patches.filter(p => Math.abs(p.x - s.x) < A * 2 && Math.abs(p.z - s.z) < A * 2);
    const gap = (x: number, z: number) => { let d = Infinity; for (const p of near) d = Math.min(d, Math.hypot(p.x - x, p.z - z)); return d; };
    const centreOk = (x: number, z: number) => {
      if (!bushGround(map, cx, cy, clear + R, x, z)) return false;
      for (let i = 0; i < 6; i++) { const c = map.areaAt(x + Math.cos(i * Math.PI / 3) * R, z + Math.sin(i * Math.PI / 3) * R).cell; if (c[0] !== cx || c[1] !== cy) return false; } // (off its rim)
      return true;
    };
    while (bushes.length - first < B.bushesPerArea) {
      let px = 0, pz = 0, best = -1;
      for (let tries = 0, seen = 0; seen < PATCH_CANDIDATES && tries < PATCH_CANDIDATES * 40; tries++) {
        const x = s.x + (ar() * 2 - 1) * A, z = s.z + (ar() * 2 - 1) * A;
        if (!centreOk(x, z)) continue;
        seen++;
        const d = gap(x, z);
        if (d >= spacing && d > best) { best = d; px = x; pz = z; }
      }
      if (best < 0) break; // (no room left at patch.spacing)
      const want = Math.min(B.bushesPerArea - (bushes.length - first), P.bushes[0] + Math.floor(ar() * (P.bushes[1] - P.bushes[0] + 1))), from = bushes.length;
      for (let k = 0; k < want * 8 && bushes.length - from < want; k++) {
        const ba = ar() * Math.PI * 2, bd = bushes.length === from ? 0 : R * (0.35 + 0.65 * ar());
        const x = px + Math.cos(ba) * bd, z = pz + Math.sin(ba) * bd;
        if (!bushGround(map, cx, cy, clear, x, z)) continue;
        if (bushes.slice(from).some(b => Math.hypot(b.x - x, b.z - z) < 1.2)) continue;
        bushes.push({ x, z, type: map.areaAt(x, z).type, variant: Math.floor(ar() * 1e6), flip: ar() < 0.5 });
      }
      const patch = { cell: [cx, cy] as const, x: px, z: pz, from, to: bushes.length };
      patches.push(patch); near.push(patch);
    }
  }
  return { bushes, patches };
}

/** The berry bushes (berryPatches) and the berries on them, from the seed: in each area, berries.perArea (a seeded number in that
 *  range, scaled by berryCounts) berries on distinct ones of its bushes. */
export function newBerries(map: ForestMap, t: Tuning): BerryState {
  const B = berryCounts(map, t), r = rng(map.seed * 6151 + 29), { bushes, patches } = berryPatches(map, t), berries: Berry[] = [];
  for (let i = 0; i < patches.length;) {
    // (an area's patches lie together: its bushes are bushes[first] to bushes[end - 1])
    const [cx, cy] = patches[i].cell, first = patches[i].from;
    while (i < patches.length && patches[i].cell[0] === cx && patches[i].cell[1] === cy) i++;
    const here = patches[i - 1].to - first, ar = rng(map.seed * 3571 + cx * 389 + cy * 7741 + 23);
    const want = Math.min(here, B.perArea[0] + Math.floor(ar() * (B.perArea[1] - B.perArea[0] + 1)));
    // A seeded shuffle of this area's bushes; the first `want` carry berries.
    const order = Array.from({ length: here }, (_, k) => first + k);
    for (let k = order.length - 1; k > 0; k--) { const j = Math.floor(ar() * (k + 1)); [order[k], order[j]] = [order[j], order[k]]; }
    for (let k = 0; k < want; k++) berries.push({ id: berries.length, bush: order[k], claimedBy: null });
  }
  const onBush = new Int32Array(bushes.length).fill(-1);
  for (const b of berries) onBush[b.bush] = b.id;
  return { bushes, berries, onBush, fed: new Map(), feeding: new Map(), evolving: new Map(), ateAt: new Map(), events: [], rand: r };
}

/** Grow an eaten berry again on a random free bush anywhere on the map (never its own). */
function regrow(s: BerryState, b: Berry): void {
  s.onBush[b.bush] = -1;
  if (b.once) { b.gone = true; b.claimedBy = null; return; } // (a Harvest berry: gone till the ring grows again)
  const harvest = s.harvest?.length ?? 0, free = s.bushes.length - harvest - (s.berries.length - harvest);
  if (free > 0) {
    let k = Math.floor(s.rand() * free);
    for (let i = 0; i < s.bushes.length; i++) if (s.onBush[i] < 0 && i !== b.bush && !s.bushes[i].harvest && k-- <= 0) { b.bush = i; break; }
  }
  s.onBush[b.bush] = b.id;
  b.claimedBy = null;
}

/** A growth spurt (a flask drunk, Ed 2026-10-18: "all creatures following you become adults"): each of these party animals
 *  younger than an adult becomes one at once (the evolving's flash and burst on the next step, as a berry's evolving ends);
 *  any berry it had is let go. Returns how many grow. */
export function growthSpurt(s: BerryState, creatures: Creature[], ids: readonly number[], time: number): number {
  let n = 0;
  for (const id of ids) {
    const c = creatures[id];
    if (!c || c.gone || c.boss || c.level >= 2) continue;
    cancelFeeding(s, id); s.fed.set(id, 0);
    s.evolving.set(id, { from: c.level, to: 2 as Level, at: time, since: time });
    n++;
  }
  return n;
}

/** Count one berry eaten; at the threshold, start evolving on the next bar line. */
export function feed(s: BerryState, c: Creature, time: number, t: Tuning, clock?: BeatClock): void {
  // A berry heals a party animal to full (Ed, 2026-10-04), as well as counting toward evolving.
  // (Ed, 2026-10-28: one berry takes all its 💧s, and counts toward growing up only when it had none)
  if (c.leashed && hurtNow(c)) { heal(c, time); return; }
  if (c.level === TOP_LEVEL && !c.boss) { addPip(s, c.id, t); s.ateAt.set(c.id, time); return; } // (an adult's berry: a buff pip, rules/buffs.ts)
  if (c.level >= TOP_LEVEL || s.evolving.has(c.id)) return;
  const n = (s.fed.get(c.id) ?? 0) + 1;
  s.ateAt.set(c.id, time);
  if (n >= toEvolve(c.level, t, c.species)) {
    s.fed.set(c.id, 0);
    // a whole bar of build-up, then the bar line (on the beat clock when there is one)
    const at = clock ? timeAt(clock, (Math.floor(beatAt(clock, time) / 4) + 2) * 4) : (Math.floor(time / ((60 / t.beat.bpm) * 4)) + 2) * ((60 / t.beat.bpm) * 4);
    s.evolving.set(c.id, { from: c.level, to: (c.level + 1) as Level, at, since: time });
    cancelFeeding(s, c.id);
    s.events.push({ kind: "evolving", id: c.id, x: c.x, z: c.z, at: time });
  } else s.fed.set(c.id, n);
}

/** One step: animals evolving on their bar lines, and each fed one walking to the berry it's on, eating it, then on to the next it has
 *  queued; done, it goes back to its leash point (her, or its sigil: rules/leash.ts moves it, the berries leave it then). `leashPointOf`
 *  says where each one's leash is fixed; one whose berry has fallen beyond her chain from there gives up its queue. */
export function stepBerries(s: BerryState, creatures: Creature[], leashPointOf: (id: number) => { x: number; z: number } | null, time: number, dt: number, t: Tuning, clock?: BeatClock): void {
  s.events = [];
  const B = t.berries, F = feedKnobs(t), far = Math.max(chainLength(t), F.reach + t.leash.length);
  // Evolving: on its bar line, it goes up a level (and stays a party animal, legends too).
  for (const [id, e] of s.evolving) if (time >= e.at) {
    const c = creatures[id];
    c.level = e.to;
    if (c.level >= LEGEND) c.speed = Math.min(c.speed, t.legendSpeed); // a legend lumbers
    s.evolving.delete(id);
    s.events.push({ kind: "evolved", id, x: c.x, z: c.z, at: time });
  }
  // Animals fed a berry: walk to it at their own pace (Ed, 2026-11-03: not much faster than they travel), eat it, then the next queued.
  for (const [id, f] of s.feeding) {
    const c = creatures[id], b = s.berries[f.berry], p = s.bushes[b.bush], lp = leashPointOf(id);
    if (!c || c.gone || !c.leashed || s.evolving.has(id) || b.gone || b.claimedBy !== id || !lp || Math.hypot(p.x - lp.x, p.z - lp.z) > far) { cancelFeeding(s, id); continue; }
    const dx = p.x - c.x, dz = p.z - c.z + 0.6, d = Math.hypot(dx, dz); // it stands just in front of the bush
    if (!f.eating) {
      if (d > 0.3) {
        const speed = leashSpeed(c, t) * F.speed, step = Math.min(d, speed * dt);
        c.x += (dx / d) * step; c.z += (dz / d) * step;
        if (Math.abs(dx) > 0.02) c.facing = dx > 0 ? 1 : -1;
        c.away = dz < -0.3 && Math.abs(dz) > Math.abs(dx);
        c.moving = true; c.walk += dt * gaitRate(speed);
        continue;
      }
      f.eating = true; f.eatLeft = B.eatTime;
    }
    c.moving = false; c.away = true;
    f.eatLeft -= dt;
    if (f.eatLeft <= 0) {
      s.feeding.delete(id);
      s.events.push({ kind: "ate", id, x: p.x, z: p.z, at: time });
      regrow(s, b);
      const q = s.bushes[b.bush];
      s.events.push({ kind: "regrew", id: b.id, x: q.x, z: q.z, at: time });
      feed(s, c, time, t, clock);
      c.rest = 0.6; c.away = false; // a moment's pause, then the next, or back to following or its sigil
      if (!s.evolving.has(id) && feedRoom(c, s, t) > 0) nextQueued(s, id); else cancelFeeding(s, id);
    }
  }
}

/** Debug: the nearest party animal to (x, z) eats a berry at once (it must be one that can eat). */
export function feedNearest(s: BerryState, creatures: Creature[], x: number, z: number, time: number, t: Tuning, clock?: BeatClock): Creature | null {
  let best: Creature | null = null, bd = Infinity;
  for (const c of creatures) if (canEat(c, s, t)) { const d = Math.hypot(c.x - x, c.z - z); if (d < bd) { bd = d; best = c; } }
  if (best) { cancelFeeding(s, best.id); feed(s, best, time, t, clock); s.events.push({ kind: "ate", id: best.id, x: best.x, z: best.z, at: time }); }
  return best;
}

/** The Harvest hat put down at (x, z) (Ed, 2026-10-11: "Harvest hat should grow a circle of six berries around the hat when
 *  placed"): `n` berries in a ring `radius` metres round it, on spots of their own (no bush drawn; rules/spells.ts). The same
 *  ring each time, moved: any of it still uneaten moves with it, so putting the hat down again never makes more than `n`.
 *  Returns the ring's spots. */
export function growRing(s: BerryState, x: number, z: number, n: number, radius: number, time: number): { x: number; z: number }[] {
  if (!s.harvest) {
    s.harvest = [];
    const onBush = new Int32Array(s.bushes.length + n).fill(-1);
    onBush.set(s.onBush);
    s.onBush = onBush;
    for (let i = 0; i < n; i++) {
      s.bushes.push({ x, z, type: 0, variant: i, flip: false, harvest: true });
      const id = s.berries.length;
      s.berries.push({ id, bush: s.bushes.length - 1, claimedBy: null, once: true, gone: true });
      s.harvest.push(id);
    }
  }
  const spots: { x: number; z: number }[] = [];
  s.harvest.forEach((id, i) => {
    const b = s.berries[id], p = s.bushes[b.bush], a = (i / s.harvest!.length) * Math.PI * 2 - Math.PI / 2;
    // (an animal on its way to one where it was lets it go: it's moved)
    if (b.claimedBy !== null) cancelFeeding(s, b.claimedBy);
    p.x = x + Math.cos(a) * radius; p.z = z + Math.sin(a) * radius;
    b.gone = false; s.onBush[b.bush] = id;
    s.events.push({ kind: "regrew", id, x: p.x, z: p.z, at: time });
    spots.push({ x: p.x, z: p.z });
  });
  return spots;
}
