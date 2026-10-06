// The 💌 invite (Ed, issue #87: "we are throwing a party, we're inviting everyone"): on the ground the
// witch shoots spinning 💌s, aimed twin-stick (the right stick or the cursor), and they replace the old
// proximity chat. Firing is a burst of `burst` volleys `burstGap` seconds apart, each of `multiShot`
// letters fanned over `spread` degrees, then `cooldown` seconds before the next burst; letters fly at
// `speed` m/s for `range` metres, turning toward the nearest invitable creature ahead at up to `homing`
// degrees a second. All of it is data (tuning `invites`), so legend buffs can change it like the rest.
// A letter that reaches an invitable (wild) creature is a hit on its affection; enraged creatures and
// legends block letters; anything else (her own party, happy ones) lets them through; scenery never
// stops them (Ed). Every letter that lands on an invitable creature counts (Ed, 2026-10-06: "I think we should
// remove the 0.5s cooldown between counted hits per creature - better to control this through the witch firing
// speed instead of having hits not register"): how fast she invites is her firing rate, a tuning value. No drawing here.
import { LEGEND, type Creature } from "./creatures";
import { bodyRadius } from "./spacing";
import type { Tuning } from "./tuning";
import { LEGEND_BUFFS, noMods, type BuffHow, type BuffMods } from "./buffs";

const NO_MODS: BuffMods = noMods();

export interface Letter {
  /** Its number (the view keys its spin and bubble by it). */
  n: number;
  x: number;
  z: number;
  vx: number;
  vz: number;
  /** Metres flown so far. */
  flown: number;
  at: number;
  /** What it is: flying (undefined), a cache waiting on the ground (Squirrel, Beaver), or one of
   *  the letters circling her (Dormouse). */
  kind?: "cache" | "orbit";
  /** Its hit radius and range (m): the tuning's, or a small split one's. */
  r: number;
  range: number;
  /** Animals it may still pass through (Stag), bounce on to (Otter); whether it splits on landing
   *  (Toad) or is a small one split off; homes hard (Fox); slips through the enraged (Elk). */
  pierce: number;
  bounce: number;
  split: boolean;
  small?: boolean;
  home: boolean;
  slip: boolean;
  /** A boomerang (Snail): 0 going out, 1 coming back. */
  back?: 0 | 1;
  /** Lanterns (Glow-worm): when it drops the next. */
  trailAt?: number;
  /** The animals it has landed on (it passes them by). */
  hit: number[];
  /** A cache: when it goes. An orbiting one: its place in the ring. */
  until?: number;
  slot?: number;
}

/** A lantern on the ground (Glow-worm): any animal it touches before it goes out is a hit. */
export interface Lantern { x: number; z: number; until: number; n: number; /** The animals it has landed on (once each). */ hit?: number[] }

/** What a 💌 did this frame: thrown or fizzled (its number n); landed on a creature (id; spent: always false
 *  since the per-creature gap went, 2026-10-06: every hit counts) or stopped by one; or a creature won over (happy). */
interface InviteEventAt { x: number; z: number; at: number }
export type InviteEvent =
  | (InviteEventAt & { kind: "shot" | "fizzled" | "vanished"; n: number; id?: undefined; spent?: undefined })
  | (InviteEventAt & { kind: "hit"; id: number; n: number; spent: boolean })
  | (InviteEventAt & { kind: "blocked"; id: number; n: number; spent?: undefined })
  | (InviteEventAt & { kind: "happy"; id: number; n?: undefined; spent?: undefined });
export type InviteEventKind = InviteEvent["kind"];

export interface Invites {
  letters: Letter[];
  /** Volleys left in this burst, and when the next goes. */
  burstLeft: number;
  nextVolley: number;
  /** When the next burst may start. */
  readyAt: number;
  /** When this burst started (for the recharge ring). */
  burstAt: number;
  /** The way she last aimed (unit, world x/z): a burst keeps it. */
  ax: number;
  az: number;
  next: number;
  /** Volleys to fire (the burst's, and echoes): when, and which way. */
  queue: { at: number; ax: number; az: number; echo?: boolean }[];
  /** Bursts fired (Howl rings every few). */
  bursts: number;
  /** Wind-up (Bear): when the charge began (after a burst, fire still held), and how full it is, 0 to 1. */
  chargeFrom: number | null;
  charge: number;
  /** When she next drops a cache (Squirrel). */
  cacheAt: number;
  /** When each orbiting letter's slot fills again (Dormouse). */
  orbitAt: number[];
  /** Glow-worm lanterns lying. */
  lanterns: Lantern[];
  /** This frame's events, for the view (stepGame clears them each frame, like combat's). */
  events: InviteEvent[];
}

export const newInvites = (): Invites => ({ letters: [], queue: [], bursts: 0, chargeFrom: null, charge: 0, cacheAt: 0, orbitAt: [], lanterns: [], burstLeft: 0, nextVolley: 0, readyAt: 0, burstAt: -Infinity, ax: 1, az: 0, next: 0, events: [] });

/** The affection interface (issue #87): rules/affection.ts behind it (game.ts affectionOf). */
export interface Affection {
  /** Whether a 💌 can affect it now. */
  invitable(c: Creature): boolean;
  /** Whether it stops 💌s dead: enraged animals and legends. */
  blocksLetters(c: Creature): boolean;
  /** A 💌 landed on it: `amount` 1 a letter. */
  hit(c: Creature, amount: number, time: number): void;
  /** Its meter, 0 to 1, or null when it has none. */
  affection(c: Creature): number | null;
}

export interface InviteControls {
  /** Fire held (click, trigger, or its key). */
  fire?: boolean;
  /** Where she aims (world x/z direction; need not be unit; 0,0 keeps the last aim). */
  aimX?: number;
  aimZ?: number;
}

/** Where a cache lies or a letter is launched from, and how it flies: the buffs' behaviours. */
function letter(s: Invites, x: number, z: number, a: number, time: number, t: Tuning, M: BuffMods, more: Partial<Letter> = {}): Letter {
  const I = t.invites, L: Letter = {
    n: s.next++, x, z, vx: Math.cos(a) * I.speed, vz: Math.sin(a) * I.speed, flown: 0, at: time, r: I.radius, range: I.range,
    pierce: M.pierce, bounce: M.ricochet, split: M.split > 0, home: M.charm > 0, slip: M.slip > 0, hit: [], ...more,
  };
  if (M.boomerang > 0 && L.back === undefined && !L.kind) L.back = 0;
  if (M.trail > 0) L.trailAt = time;
  s.letters.push(L);
  return L;
}

/** Drop a cache (Squirrel's, or Beaver's decoy) at (x, z): it waits there, then flies at the first
 *  invitable animal near. At most cache.max (times the buffs) lie at once, the oldest going first. */
export function dropCache(s: Invites, x: number, z: number, time: number, t: Tuning, M: BuffMods, H: BuffHow = LEGEND_BUFFS.how): void {
  const lying = s.letters.filter(L => L.kind === "cache"), most = H.cache.max * Math.max(1, M.cache + M.decoy);
  if (lying.length >= most) s.letters.splice(s.letters.indexOf(lying[0]), 1);
  letter(s, x, z, 0, time, t, M, { kind: "cache", until: time + H.cache.life, vx: 0, vz: 0 });
}

/** One step: start or carry on a burst, fly the letters, and land them. `canFire`: on the ground,
 *  off her seat, not knocked out. `M`: the buffs' behaviours on now (rules/buffs.ts). */
export function stepInvites(s: Invites, c: InviteControls, witch: { x: number; z: number; facing: number; vx?: number; vz?: number }, canFire: boolean, creatures: Creature[], A: Affection, time: number, dt: number, t: Tuning, M: BuffMods = NO_MODS, H: BuffHow = LEGEND_BUFFS.how, leaves?: (x0: number, z0: number, x1: number, z1: number) => boolean): void {
  const I = t.invites;
  const ax = c.aimX ?? 0, az = c.aimZ ?? 0, al = Math.hypot(ax, az);
  const mainLeft = () => s.queue.filter(q => !q.echo).length;
  if (al > 1e-3 && mainLeft() === 0) { s.ax = ax / al; s.az = az / al; }
  /** Aim with nothing to aim by (touch): the way she's going, or facing. */
  const aimOwn = () => { const vx = witch.vx ?? 0, vz = witch.vz ?? 0, v = Math.hypot(vx, vz); if (v > 0.5) { s.ax = vx / v; s.az = vz / v; } else { s.ax = witch.facing; s.az = 0; } };
  if (!canFire) { s.queue = []; s.chargeFrom = null; s.charge = 0; }
  else if (s.chargeFrom !== null) {
    // Wind-up (Bear): held, it fills; let go, a big volley if it's past min.
    s.charge = Math.min(1, Math.max(0, (time - s.chargeFrom - H.charge.after) / Math.max(1e-3, H.charge.time)));
    if (!c.fire) {
      if (s.charge >= H.charge.min) {
        if (al <= 1e-3) aimOwn();
        const n = Math.max(2, Math.round(H.charge.letters * s.charge * M.charge)), fan = (H.charge.spread * Math.PI) / 180, base = Math.atan2(s.az, s.ax);
        for (let k = 0; k < n; k++) { const a = base + (k / (n - 1) - 0.5) * fan; letter(s, witch.x + Math.cos(a) * 0.6, witch.z + Math.sin(a) * 0.6, a, time, t, M); }
        s.events.push({ kind: "shot", x: witch.x, z: witch.z, at: time, n: s.next - 1 });
        s.readyAt = Math.max(s.readyAt, time + I.cooldown); s.burstAt = time;
      }
      s.chargeFrom = null; s.charge = 0;
    }
  } else if (c.fire && mainLeft() === 0 && time >= s.readyAt) {
    const volleys = Math.max(1, Math.round(I.burst));
    s.burstAt = time; s.bursts++;
    if (al <= 1e-3) aimOwn();
    for (let i = 0; i < volleys; i++) s.queue.push({ at: time + i * I.burstGap, ax: s.ax, az: s.az });
    // Echo (Owl): the burst again, delay seconds on (each Echo once more), its aim kept.
    for (let e = 1; e <= M.echo; e++) for (let i = 0; i < volleys; i++) s.queue.push({ at: time + e * H.echo.delay + i * I.burstGap, ax: s.ax, az: s.az, echo: true });
    s.readyAt = time + (volleys - 1) * I.burstGap + I.cooldown;
    const base = Math.atan2(s.az, s.ax);
    // Rear guard (Woodlouse): one behind her each burst (each Rear guard one more).
    for (let k = 0; k < M.rear; k++) { const a = base + Math.PI + (k - (M.rear - 1) / 2) * (H.rear.spread * Math.PI) / 180; letter(s, witch.x + Math.cos(a) * 0.6, witch.z + Math.sin(a) * 0.6, a, time, t, M); }
    // Howl (Wolf): every every-th burst, a ring all round her.
    if (M.ring > 0 && s.bursts % H.ring.every === 0) { const n = H.ring.letters * M.ring; for (let k = 0; k < n; k++) { const a = base + (k / n) * Math.PI * 2; letter(s, witch.x + Math.cos(a) * 0.6, witch.z + Math.sin(a) * 0.6, a, time, t, M); } }
    // Cache (Squirrel): a waiting letter at her feet every few seconds of firing.
    if (M.cache > 0 && time >= s.cacheAt) { dropCache(s, witch.x, witch.z, time, t, M, H); s.cacheAt = time + H.cache.every; }
  } else if (c.fire && M.charge > 0 && mainLeft() === 0 && time >= s.burstAt + (Math.max(1, Math.round(I.burst)) - 1) * I.burstGap) s.chargeFrom = time; // (a burst done, still held: winding up)
  // The volleys due: multiShot letters each (Fan: per more a Fan, wider), over spread degrees.
  s.queue.sort((a, b) => a.at - b.at);
  while (s.queue.length && time >= s.queue[0].at - 1e-9) {
    const q = s.queue.shift()!;
    const n = Math.max(1, Math.round(I.multiShot)) * (1 + H.fan.per * M.fan), base = Math.atan2(q.az, q.ax), fan = ((I.spread + M.fan * H.fan.spread) * Math.PI) / 180;
    for (let k = 0; k < n; k++) { const a = base + (n > 1 ? (k / (n - 1) - 0.5) * fan : 0); letter(s, witch.x + Math.cos(a) * 0.6, witch.z + Math.sin(a) * 0.6, a, time, t, M); }
    s.events.push({ kind: "shot", x: witch.x, z: witch.z, at: time, n: s.next - 1 });
  }
  s.burstLeft = mainLeft();

  // Lullaby orbit (Dormouse): orbit.letters (per Lullaby) circle her on the ground, each refilled respawn seconds after it flies.
  const slots = canFire ? H.orbit.letters * M.orbit : 0;
  if (s.orbitAt.length !== slots) s.orbitAt = Array.from({ length: slots }, (_, k) => s.orbitAt[k] ?? time);
  s.letters = s.letters.filter(L => L.kind !== "orbit" || (L.slot ?? 0) < slots);
  for (let k = 0; k < slots; k++) if (time >= s.orbitAt[k] && !s.letters.some(L => L.kind === "orbit" && L.slot === k)) letter(s, witch.x, witch.z, 0, time, t, M, { kind: "orbit", slot: k, vx: 0, vz: 0 });

  // The creatures a letter could meet this step: those near any letter or lantern.
  let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity;
  for (const p of [...s.letters, ...s.lanterns]) { x0 = Math.min(x0, p.x); x1 = Math.max(x1, p.x); z0 = Math.min(z0, p.z); z1 = Math.max(z1, p.z); }
  const pad = Math.max(H.cache.reach, H.orbit.reach, H.charm.range, I.homingRange, H.ricochet.range) + 4;
  const near = x0 <= x1 ? creatures.filter(k => !k.gone && k.x > x0 - pad && k.x < x1 + pad && k.z > z0 - pad && k.z < z1 + pad) : [];
  /** The nearest invitable animal to (x, z) within r, not among `skip`. */
  const nearest = (x: number, z: number, r: number, skip: number[] = []): Creature | null => {
    let best: Creature | null = null, bd = r;
    for (const k of near) { if (skip.includes(k.id) || !A.invitable(k)) continue; const d = Math.hypot(k.x - x, k.z - z); if (d < bd) { bd = d; best = k; } }
    return best;
  };
  const aimAt = (L: Letter, k: Creature) => { const sp = Math.hypot(L.vx, L.vz) || I.speed, d = Math.hypot(k.x - L.x, k.z - L.z) || 1; L.vx = ((k.x - L.x) / d) * sp; L.vz = ((k.z - L.z) / d) * sp; };
  /** Love landing on k: every letter counts (no gap since 2026-10-06: her firing rate sets the pace). */
  const love = (k: Creature, x: number, z: number, n: number) => {
    s.events.push({ kind: "hit", x, z, at: time, id: k.id, n, spent: false });
    A.hit(k, I.amount, time);
  };
  /** Stops it dead: an enraged animal (unless it slips past: Elk) or a legend. */
  const blocks = (L: Letter, k: Creature) => A.blocksLetters(k) && !(L.slip && !k.boss && k.level !== LEGEND);

  const born: Letter[] = [];
  s.letters = s.letters.filter(L => {
    if (L.kind === "cache") {
      if (time >= (L.until ?? Infinity)) { s.events.push({ kind: "fizzled", x: L.x, z: L.z, at: time, n: L.n }); return false; }
      const k = nearest(L.x, L.z, H.cache.reach);
      if (!k) return true;
      // It flies at the animal, homing hard.
      Object.assign(L, { kind: undefined, home: true, range: H.cache.reach * 2, flown: 0, vx: I.speed, vz: 0 }); aimAt(L, k);
      s.events.push({ kind: "shot", x: L.x, z: L.z, at: time, n: L.n });
    } else if (L.kind === "orbit") {
      const n = Math.max(1, slots), a = (time * H.orbit.spin * Math.PI) / 180 + ((L.slot ?? 0) / n) * Math.PI * 2;
      L.x = witch.x + Math.cos(a) * H.orbit.radius; L.z = witch.z + Math.sin(a) * H.orbit.radius;
      const k = nearest(L.x, L.z, H.orbit.reach);
      if (!k) return true;
      s.orbitAt[L.slot ?? 0] = time + H.orbit.respawn;
      Object.assign(L, { kind: undefined, home: true, range: H.orbit.reach * 2, flown: 0, vx: I.speed, vz: 0 }); aimAt(L, k);
      s.events.push({ kind: "shot", x: L.x, z: L.z, at: time, n: L.n });
    }
    // Homing: toward the nearest invitable creature ahead, within the cone (Charm: hard, wide and far). Not coming back.
    const homing = ((L.home ? H.charm.homing : I.homing) * Math.PI) / 180, cone = Math.cos(((L.home ? H.charm.cone : I.homingCone) * Math.PI) / 180), hr = L.home ? H.charm.range : I.homingRange;
    const sp = Math.hypot(L.vx, L.vz);
    if (L.back === 1) {
      // Coming back (Snail): straight for her; caught when it reaches her.
      const dx = witch.x - L.x, dz = witch.z - L.z, d = Math.hypot(dx, dz);
      if (d < H.boomerang.catch) return false;
      L.vx = (dx / d) * sp; L.vz = (dz / d) * sp;
    } else if (homing > 0 && sp > 0) {
      const ux = L.vx / sp, uz = L.vz / sp;
      let best: Creature | null = null, bd = hr;
      for (const k of near) {
        if (!A.invitable(k) || L.hit.includes(k.id)) continue;
        const dx = k.x - L.x, dz = k.z - L.z, d = Math.hypot(dx, dz);
        if (d < bd && d > 1e-6 && (dx * ux + dz * uz) / d > cone) { bd = d; best = k; }
      }
      if (best) {
        const want = Math.atan2(best.z - L.z, best.x - L.x), cur = Math.atan2(uz, ux);
        let turn = want - cur;
        turn = Math.atan2(Math.sin(turn), Math.cos(turn));
        const a = cur + Math.max(-homing * dt, Math.min(homing * dt, turn));
        L.vx = Math.cos(a) * sp; L.vz = Math.sin(a) * sp;
      }
    }
    const step = sp * dt, px = L.x, pz = L.z;
    L.x += L.vx * dt; L.z += L.vz * dt; L.flown += step;
    // Out of a sleeping legend's circle (Ed, 2026-10-06: "Your invitations disappear if they go outside the circle from inside"): gone in a sparkle.
    if (leaves?.(px, pz, L.x, L.z)) { s.events.push({ kind: "vanished", x: L.x, z: L.z, at: time, n: L.n }); return false; }
    // Lanterns (Glow-worm): one dropped every every seconds where it flies.
    if (L.trailAt !== undefined && time >= L.trailAt) { s.lanterns.push({ x: L.x, z: L.z, until: time + H.trail.life, n: L.n }); L.trailAt = time + H.trail.every; }
    // The first creature its path this step passes within reach of: a hit, a block, or nothing (it passes through).
    let first: Creature | null = null, ft = Infinity;
    for (const k of near) {
      if (L.hit.includes(k.id)) continue;
      const hitR = L.r + bodyRadius(k), dx = L.x - px, dz = L.z - pz, len2 = dx * dx + dz * dz;
      const f = len2 > 0 ? Math.max(0, Math.min(1, ((k.x - px) * dx + (k.z - pz) * dz) / len2)) : 0;
      if (Math.hypot(px + dx * f - k.x, pz + dz * f - k.z) > hitR || f >= ft) continue;
      if (!blocks(L, k) && !A.invitable(k)) continue;
      first = k; ft = f;
    }
    if (first) {
      if (blocks(L, first)) { s.events.push({ kind: "blocked", x: L.x, z: L.z, at: time, id: first.id, n: L.n }); return false; }
      love(first, L.x, L.z, L.n);
      L.hit.push(first.id);
      // Pierce (Stag): on through it. Skimming stone (Otter): on to another. Spawn (Toad): small ones.
      if (L.pierce > 0) { L.pierce--; return true; }
      if (L.bounce > 0) {
        const k = nearest(L.x, L.z, H.ricochet.range, L.hit);
        if (k) { L.bounce--; aimAt(L, k); L.flown = Math.max(0, Math.min(L.flown, L.range - H.ricochet.range)); return true; }
      }
      if (L.split && !L.small) {
        const base = Math.atan2(L.vz, L.vx), n = H.split.letters * Math.max(1, M.split), fan = (H.split.spread * Math.PI) / 180;
        for (let k = 0; k < n; k++) {
          const a = base + (n > 1 ? (k / (n - 1) - 0.5) * fan : 0);
          const kid = letter(s, L.x, L.z, a, time, t, M, { small: true, split: false, pierce: 0, bounce: 0, r: L.r * H.split.radius, range: H.split.range, hit: [...L.hit] });
          if (kid.back !== undefined) kid.back = undefined; // (the small ones don't come back)
          born.push(s.letters.pop()!);
        }
      }
      return false;
    }
    if (L.back === 0 && L.flown >= L.range * H.boomerang.turn) { L.back = 1; L.hit = []; } // (on its way back it may land again)
    if (L.flown >= (L.back !== undefined ? L.range * (1 + H.boomerang.turn) + 10 : L.range)) { s.events.push({ kind: "fizzled", x: L.x, z: L.z, at: time, n: L.n }); return false; }
    return true;
  });
  s.letters.push(...born);
  // Lanterns land on any invitable animal they touch, once each.
  s.lanterns = s.lanterns.filter(p => {
    if (time >= p.until) return false;
    for (const k of near) if (A.invitable(k) && !p.hit?.includes(k.id) && Math.hypot(k.x - p.x, k.z - p.z) <= H.trail.radius + bodyRadius(k)) { (p.hit ??= []).push(k.id); love(k, p.x, p.z, p.n); }
    return true;
  });

}

/** How far the next burst has recharged: 0 just fired, 1 ready (for the action bar). */
export function inviteCharge(s: Invites, time: number): number {
  if (time >= s.readyAt) return 1;
  const total = s.readyAt - s.burstAt;
  return total > 0 ? Math.max(0, Math.min(1, (time - s.burstAt) / total)) : 1;
}
