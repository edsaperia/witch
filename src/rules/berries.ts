// Berries and evolving (Ed, 2026-10-04). Every area has berry bushes; a small glowing berry grows
// on some of them, one per bush, berries.perArea of them in each area at the start. Party animals
// (invited creatures, following the witch or held at a sigil; never wild ones, never legends)
// take a berry on their way: within berries.detour of the line to where they're heading (the witch,
// or their sigil) or of their sigil, never beyond their leash; they nip over, eat it, and carry on.
// Bushes grow in patches (berries.patch), so a sigil set in the middle of one is a feeding spot.
// An eaten berry grows again at once on a free berry bush somewhere else on the map, so the number
// of berries never changes. A party animal that has eaten enough evolves: the berries its next
// level's strength costs (toEvolve: 4 and 4 for a species of normal strength); evolving stops at adult (Ed, 2026-10-04: legends are the areas'
// own, never grown). It evolves on the next bar line of the music, so the view can make a show of it. No drawing here.
import { COMBAT, creatureMaxHp, strengthOf } from "./combat";
import { beatAt, timeAt, type BeatClock } from "./beat";
import { LEGEND, heal, type Creature, type Level } from "./creatures";
import { gaitRate, leashSpeed } from "./leash";
import type { ForestMap } from "./map";
import { rng } from "./random";
import type { Tuning } from "./tuning";

/** A berry bush: where it stands, and its area's type (it's one of that area's own bushes). */
export interface BerryBush { x: number; z: number; type: number; variant: number; flip: boolean; /** a spot of the Harvest hat's ring (rules/spells.ts): no bush drawn, and never a regrown berry's */ harvest?: boolean }

export interface Berry {
  id: number;
  /** The bush it grows on (an index into bushes). */
  bush: number;
  /** The party animal on its way to eat it, if any. */
  claimedBy: number | null;
  /** One of the Harvest hat's ring (rules/spells.ts): eaten, it's gone (not grown again elsewhere) till the hat grows the ring again. */
  once?: boolean;
  /** Eaten and not grown again yet (a Harvest berry): not on the map. */
  gone?: boolean;
}

/** A party animal busy with a berry: walking to it, or eating it (eatLeft counts down). */
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
  evolving: Map<number, Evolving>;
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
  const L = COMBAT.levels, m = species ? strengthOf(species, level) : 1;
  const at = (l: number) => { const p = L.hp[l] * m * L.dps[l] * m; return t.berries.cost.by === "value" ? Math.sqrt(p) : p; };
  return at(level + 1) - at(level);
}

/** Berries needed to go up from a level (Ed, 2026-10-05: "tie the cost to strength"): the strength
 *  it gains, at berries.cost.per a berry, rounded, at least one (times cost.scale, the legends'
 *  evolve-faster buff). By fighting value (cost.by "value") a species of normal strength pays 4 and 4. Adults and
 *  legends don't evolve. */
export const toEvolve = (level: Level, t: Tuning, species?: string): number => {
  if (level >= TOP_LEVEL) return Infinity;
  if (level === 0 && t.berries.babyCost !== undefined) return Math.max(1, t.berries.babyCost); // (one berry makes a baby a youth: Ed, 2026-10-11)
  const C = t.berries.cost;
  return Math.max(1, Math.round((strengthGain(level, species, t) / C.per) * (C.scale ?? 1)));
};
/** Who may eat berries: party animals that aren't legends (and aren't already evolving). */
/** Whether a party animal goes for berries: not mid-fight or evolving; still able to evolve
 *  (below adult), or hurt (a berry heals it to full, Ed 2026-10-04: so a hurt one wants one whatever its level). */
export const canEat = (c: Creature, s: BerryState): boolean => c.leashed && !c.travelling && !s.evolving.has(c.id) && !c.fight?.target && (c.level < TOP_LEVEL || hurtNow(c));
const hurtNow = (c: Creature) => c.hp !== undefined && c.hp < creatureMaxHp(c);
/** Whether its next berry would make it an adult (Ed, 2026-10-27: adults are strong and heavy, she can't fly with one, so "a youth
 *  eats up until it's one berry away from adult, and that last berry has to be manual"): following her, it leaves that berry,
 *  hurt or not; only at a sigil she's put down does it eat it. */
export const lastBerry = (c: Creature, s: BerryState, t: Tuning): boolean => c.level > 0 && c.level < TOP_LEVEL && (s.fed.get(c.id) ?? 0) + 1 >= toEvolve(c.level, t, c.species);

/** The berry bushes and the berries on them, from the seed: in every area of the playable map,
 *  berries.bushesPerArea bushes at spots a bush may grow (in its own area, not on a path or in a
 *  kept clearing), and berries.perArea (a seeded number in that range) berries on distinct ones. */
/** The berries' tuning with its per-area counts for this map's areas: they're for an area 112 m
 *  across, and a bigger one has more, by its ground (Ed, 2026-10-05: bigger areas), so the berries
 *  are as thick on the ground as before. */
export function berryCounts(map: ForestMap, t: Tuning): Tuning["berries"] {
  const k = (map.areaSize / 112) ** 2, B = t.berries;
  return { ...B, bushesPerArea: Math.round(B.bushesPerArea * k), perArea: B.perArea.map(v => Math.round(v * k)) };
}

export function newBerries(map: ForestMap, t: Tuning): BerryState {
  const B = berryCounts(map, t), r = rng(map.seed * 6151 + 29), bushes: BerryBush[] = [], berries: Berry[] = [];
  const P = B.patch;
  for (const [cx, cy] of map.cells) {
    if (cx === map.centreCell[0] && cy === map.centreCell[1]) continue; // home: the dancefloor's clearing
    const s = map.siteOf(cx, cy), ar = rng(map.seed * 3571 + cx * 389 + cy * 7741 + 17), first = bushes.length;
    // In patches (Ed, v233): a few bushes clustered within patch.radius of a centre, so a sigil in
    // the middle of one is a feeding spot. Patch centres lie out in the area's woods, between its
    // clearing and its edge.
    for (let tries = 0; tries < B.bushesPerArea * 12 && bushes.length - first < B.bushesPerArea; tries++) {
      const a = ar() * Math.PI * 2, d = map.areaSize * (0.15 + ar() * 0.5), px = s.x + Math.cos(a) * d, pz = s.z + Math.sin(a) * d;
      const at = map.areaAt(px, pz);
      if (at.cell[0] !== cx || at.cell[1] !== cy || map.hardClear(px, pz) || map.paths.at(px, pz, 1.5)) continue;
      if (bushes.slice(first).some(b => Math.hypot(b.x - px, b.z - pz) < P.radius * 2.5)) continue; // patches apart
      const want = Math.min(B.bushesPerArea - (bushes.length - first), P.bushes[0] + Math.floor(ar() * (P.bushes[1] - P.bushes[0] + 1))), from = bushes.length;
      for (let k = 0; k < want * 8 && bushes.length - from < want; k++) {
        const ba = ar() * Math.PI * 2, bd = bushes.length === from ? 0 : P.radius * (0.35 + 0.65 * ar());
        const x = px + Math.cos(ba) * bd, z = pz + Math.sin(ba) * bd, here = map.areaAt(x, z);
        if (here.cell[0] !== cx || here.cell[1] !== cy || map.hardClear(x, z) || map.paths.at(x, z, 1.5)) continue;
        if (bushes.slice(from).some(b => Math.hypot(b.x - x, b.z - z) < 1.2)) continue;
        bushes.push({ x, z, type: here.type, variant: Math.floor(ar() * 1e6), flip: ar() < 0.5 });
      }
    }
    const here = bushes.length - first, want = Math.min(here, B.perArea[0] + Math.floor(ar() * (B.perArea[1] - B.perArea[0] + 1)));
    // A seeded shuffle of this area's bushes; the first `want` carry berries.
    const order = Array.from({ length: here }, (_, i) => first + i);
    for (let i = order.length - 1; i > 0; i--) { const j = Math.floor(ar() * (i + 1)); [order[i], order[j]] = [order[j], order[i]]; }
    for (let i = 0; i < want; i++) berries.push({ id: berries.length, bush: order[i], claimedBy: null });
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

/** How far (x, z) is from the line from a to b. */
function offPath(x: number, z: number, ax: number, az: number, bx: number, bz: number): number {
  const vx = bx - ax, vz = bz - az, l2 = vx * vx + vz * vz;
  const k = l2 > 0 ? Math.max(0, Math.min(1, ((x - ax) * vx + (z - az) * vz) / l2)) : 0;
  return Math.hypot(x - ax - vx * k, z - az - vz * k);
}

/** The nearest unclaimed berry a party animal at (x, z), leashed at lp, would go for (Ed, v233): one
 *  on its way, within berries.detour of the line from it to its leash point (where it's heading), or
 *  of the leash point itself; and never beyond its leash's length (plus the detour) from that point. */
function berryFor(s: BerryState, x: number, z: number, lp: { x: number; z: number }, t: Tuning): Berry | null {
  const D = t.berries.detour, reach = t.leash.length + D;
  let best: Berry | null = null, bd = Infinity;
  for (const b of s.berries) {
    if (b.claimedBy !== null || b.gone) continue;
    const p = s.bushes[b.bush];
    if (Math.abs(p.x - x) > reach * 2 || Math.abs(p.z - z) > reach * 2) continue;
    if (Math.hypot(p.x - lp.x, p.z - lp.z) > reach || offPath(p.x, p.z, x, z, lp.x, lp.z) > D) continue;
    const d = (p.x - x) ** 2 + (p.z - z) ** 2;
    if (d < bd) { bd = d; best = b; }
  }
  return best;
}

/** Let go of a creature's claim (pulled away, or no longer a party animal). */
/** A growth spurt (a flask drunk, Ed 2026-10-18: "all creatures following you become adults"): each of these party animals
 *  younger than an adult becomes one at once (the evolving's flash and burst on the next step, as a berry's evolving ends);
 *  any berry it had is let go. Returns how many grow. */
export function growthSpurt(s: BerryState, creatures: Creature[], ids: readonly number[], time: number): number {
  let n = 0;
  for (const id of ids) {
    const c = creatures[id];
    if (!c || c.gone || c.boss || c.level >= 2) continue;
    release(s, id); s.fed.set(id, 0);
    s.evolving.set(id, { from: c.level, to: 2 as Level, at: time, since: time });
    n++;
  }
  return n;
}

function release(s: BerryState, id: number): void {
  const f = s.feeding.get(id);
  if (f) { const b = s.berries[f.berry]; if (b.claimedBy === id) b.claimedBy = null; s.feeding.delete(id); }
}

/** Count one berry eaten; at the threshold, start evolving on the next bar line. */
export function feed(s: BerryState, c: Creature, time: number, t: Tuning, clock?: BeatClock): void {
  // A berry heals a party animal to full (Ed, 2026-10-04), as well as counting toward evolving.
  if (c.leashed && hurtNow(c)) heal(c, time);
  if (c.level >= TOP_LEVEL || s.evolving.has(c.id)) return;
  const n = (s.fed.get(c.id) ?? 0) + 1;
  s.ateAt.set(c.id, time);
  if (n >= toEvolve(c.level, t, c.species)) {
    s.fed.set(c.id, 0);
    // a whole bar of build-up, then the bar line (on the beat clock when there is one)
    const at = clock ? timeAt(clock, (Math.floor(beatAt(clock, time) / 4) + 2) * 4) : (Math.floor(time / ((60 / t.beat.bpm) * 4)) + 2) * ((60 / t.beat.bpm) * 4);
    s.evolving.set(c.id, { from: c.level, to: (c.level + 1) as Level, at, since: time });
    release(s, c.id);
    s.events.push({ kind: "evolving", id: c.id, x: c.x, z: c.z, at: time });
  } else s.fed.set(c.id, n);
}

/** One step. `leashPointOf` says where each party animal's leash is fixed (the witch, or its
 *  sigil); a feeding animal is moved here (the leash leaves it alone while it has a berry). */
/** The nearest unclaimed berry within `reach` metres of a baby's placed sigil at (sx, sz) (Ed, 2026-10-11: a baby eats only there). */
export function babyBerry(s: BerryState, sx: number, sz: number, reach: number): Berry | null {
  let best: Berry | null = null, bd = reach * reach;
  for (const b of s.berries) {
    if (b.claimedBy !== null || b.gone) continue;
    const p = s.bushes[b.bush], d = (p.x - sx) ** 2 + (p.z - sz) ** 2;
    if (d <= bd) { bd = d; best = b; }
  }
  return best;
}

/** One step. `leashPointOf` says where each party animal's leash is fixed (the witch, or its
 *  sigil); a feeding animal is moved here (the leash leaves it alone while it has a berry). `sigilOf` says where its
 *  sigil lies when it's put down (null while it follows her): a baby eats only then (Ed, 2026-10-11). */
export function stepBerries(s: BerryState, creatures: Creature[], leashPointOf: (id: number) => { x: number; z: number } | null, time: number, dt: number, t: Tuning, clock?: BeatClock, sigilOf?: (id: number) => { x: number; z: number } | null): void {
  s.events = [];
  const B = t.berries;
  // Evolving: on its bar line, it goes up a level (and stays a party animal, legends too).
  for (const [id, e] of s.evolving) if (time >= e.at) {
    const c = creatures[id];
    c.level = e.to;
    if (c.level >= LEGEND) c.speed = Math.min(c.speed, t.legendSpeed); // a legend lumbers
    s.evolving.delete(id);
    s.events.push({ kind: "evolved", id, x: c.x, z: c.z, at: time });
  }
  // Animals busy with a berry: give it up if pulled away or no longer a party animal; else walk to it and eat it.
  for (const [id, f] of s.feeding) {
    const c = creatures[id], b = s.berries[f.berry], p = s.bushes[b.bush], lp = leashPointOf(id);
    if (!canEat(c, s) || !lp || b.gone || Math.hypot(p.x - lp.x, p.z - lp.z) > t.leash.length + B.detour * 2 || (sigilOf && (c.level === 0 || lastBerry(c, s, t)) && !sigilOf(id))) { release(s, id); continue; } // left behind (or a baby, or a youth one short of adult, taken up again)
    const dx = p.x - c.x, dz = p.z - c.z + 0.6, d = Math.hypot(dx, dz); // it stands just in front of the bush
    if (!f.eating) {
      if (d > 0.3) {
        const speed = leashSpeed(c, t), step = Math.min(d, speed * dt); // at its leash pace, not its idle amble (Ed, v233)
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
      c.rest = 0.6; c.away = false; // a moment's pause, then back to following or dancing
    }
  }
  // Party animals with nothing to do take a berry on their way.
  for (const c of creatures) {
    if (!canEat(c, s) || s.feeding.has(c.id)) continue;
    const lp = leashPointOf(c.id);
    if (!lp) continue;
    // A baby eats only at its placed sigil, a berry within berries.babyReach of it; following her, never (Ed, 2026-10-11).
    const sg = sigilOf && c.level === 0 ? sigilOf(c.id) : null;
    if (sigilOf && c.level === 0 && !sg) continue;
    // A youth one berry short of adult eats that last one only at a sigil she's put down; following her, it leaves it (lastBerry).
    if (sigilOf && lastBerry(c, s, t) && !sigilOf(c.id)) continue;
    const b = sg ? babyBerry(s, sg.x, sg.z, B.babyReach ?? 10) : berryFor(s, c.x, c.z, lp, t);
    if (!b) continue;
    const p = s.bushes[b.bush];
    b.claimedBy = c.id;
    s.feeding.set(c.id, { berry: b.id, eating: false, eatLeft: 0 });
    s.events.push({ kind: "claimed", id: c.id, x: p.x, z: p.z, at: time });
  }
}

/** Debug: the nearest party animal to (x, z) eats a berry at once (it must be one that can eat). */
export function feedNearest(s: BerryState, creatures: Creature[], x: number, z: number, time: number, t: Tuning, clock?: BeatClock): Creature | null {
  let best: Creature | null = null, bd = Infinity;
  for (const c of creatures) if (canEat(c, s)) { const d = Math.hypot(c.x - x, c.z - z); if (d < bd) { bd = d; best = c; } }
  if (best) { release(s, best.id); feed(s, best, time, t, clock); s.events.push({ kind: "ate", id: best.id, x: best.x, z: best.z, at: time }); }
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
    if (b.claimedBy !== null) { const f = s.feeding.get(b.claimedBy); if (f && f.berry === id) s.feeding.delete(b.claimedBy); b.claimedBy = null; }
    p.x = x + Math.cos(a) * radius; p.z = z + Math.sin(a) * radius;
    b.gone = false; s.onBush[b.bush] = id;
    s.events.push({ kind: "regrew", id, x: p.x, z: p.z, at: time });
    spots.push({ x: p.x, z: p.z });
  });
  return spots;
}
