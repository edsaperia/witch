// The 💌 invite (Ed, issue #87: "we are throwing a party, we're inviting everyone"): on the ground the
// witch shoots spinning 💌s, aimed twin-stick (the right stick or the cursor), and they replace the old
// proximity chat. Firing is a burst of `burst` volleys `burstGap` seconds apart, each of `multiShot`
// letters fanned over `spread` degrees, then `cooldown` seconds before the next burst; letters fly at
// `speed` m/s for `range` metres, turning toward the nearest invitable creature ahead at up to `homing`
// degrees a second. All of it is data (tuning `invites`).
// A letter that reaches an invitable (wild) creature is a hit on its affection; enraged creatures and
// legends block letters; anything else (her own party, happy ones) lets them through; scenery never
// stops them (Ed). Every letter that lands on an invitable creature counts (Ed, 2026-10-06: "I think we should
// remove the 0.5s cooldown between counted hits per creature - better to control this through the witch firing
// speed instead of having hits not register"): how fast she invites is her firing rate, a tuning value. No drawing here.
import { type Creature } from "./creatures";
import { bodyRadius } from "./spacing";
import type { Tuning } from "./tuning";

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
  /** What it is: flying (undefined), or caught by the Slingshot hat, circling it (rules/spells.ts). */
  kind?: "sling";
  /** Its hit radius and range (m). */
  r: number;
  range: number;
  /** Homes hard (invites.hard): one thrown or flung by a hat. */
  home: boolean;
  /** The animals it has landed on (it passes them by). */
  hit: number[];
  /** Caught by the Slingshot hat: when it flies on, and its place round the hat. */
  until?: number;
  slot?: number;
  /** Thrown by her hat (the Sentry's), or flung by it (the Slingshot's): it isn't caught again. */
  hat?: boolean;
  /** Caught by a Slingshot hat: where that hat lies. */
  hx?: number;
  hz?: number;
}

/** Her hats on the ground with a spell that throws 💌s (rules/hatSpells.ts hatLetters): where each lies, and its spell's
 *  numbers. Each Sentry hat throws one at the nearest invitable creature within `range` every `every` seconds; each Slingshot
 *  hat catches her 💌s that fly within `catch` of it, holds them circling it (`radius` out) `hold` seconds, then flings each at
 *  the nearest invitable creature within `fire` of it (at most `max` held at once; one with none to fly at keeps circling,
 *  and goes after `hold` × 4). */
/** Something that takes a 💌 in its way and is gone (the raven's mirage images, rules/combat/packs.ts). */
export interface Decoy { x: number; z: number; r: number; hit: () => void }
export interface HatLetters {
  sentry: { x: number; z: number; range: number; every: number }[];
  sling: { x: number; z: number; catch: number; fire: number; hold: number; radius: number; max: number }[];
}

/** What a 💌 did this frame: thrown or fizzled (its number n); landed on a creature (id; spent: always false
 *  since the per-creature gap went, 2026-10-06: every hit counts) or stopped by one; or a creature won over (happy). */
interface InviteEventAt { x: number; z: number; at: number }
export type InviteEvent =
  | (InviteEventAt & { kind: "shot" | "fizzled" | "vanished"; n: number; id?: undefined; spent?: undefined })
  | (InviteEventAt & { kind: "hit"; id: number; n: number; spent: boolean })
  | (InviteEventAt & { kind: "blocked"; id: number; n: number; spent?: undefined; /** its flight (m/s) as it was stopped: the view tosses the crumpled letter back the way it came */ vx?: number; vz?: number })
  | (InviteEventAt & { kind: "happy"; id: number; n?: undefined; spent?: undefined });

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
  /** The burst's volleys to fire: when, and which way. */
  queue: { at: number; ax: number; az: number }[];
  /** When the Sentry hat may throw its next 💌. */
  sentryAt?: number;
  /** This frame's events, for the view (stepGame clears them each frame, like combat's). */
  events: InviteEvent[];
}

export const newInvites = (): Invites => ({ letters: [], queue: [], burstLeft: 0, nextVolley: 0, readyAt: 0, burstAt: -Infinity, ax: 1, az: 0, next: 0, events: [] });

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

/** A letter launched from (x, z) at angle a. */
function letter(s: Invites, x: number, z: number, a: number, time: number, t: Tuning, more: Partial<Letter> = {}): Letter {
  const I = t.invites, L: Letter = { n: s.next++, x, z, vx: Math.cos(a) * I.speed, vz: Math.sin(a) * I.speed, flown: 0, at: time, r: I.radius, range: I.range, home: false, hit: [], ...more };
  s.letters.push(L);
  return L;
}

/** One step: start or carry on a burst, fly the letters, and land them. `canFire`: on the ground,
 *  off her seat, not knocked out. */
export function stepInvites(s: Invites, c: InviteControls, witch: { x: number; z: number; facing: number; vx?: number; vz?: number }, canFire: boolean, creatures: Creature[], A: Affection, time: number, dt: number, t: Tuning, leaves?: (x0: number, z0: number, x1: number, z1: number) => boolean, hat?: HatLetters, decoys?: readonly Decoy[]): void {
  const I = t.invites, HARD = I.hard;
  const ax = c.aimX ?? 0, az = c.aimZ ?? 0, al = Math.hypot(ax, az);
  if (al > 1e-3 && s.queue.length === 0) { s.ax = ax / al; s.az = az / al; }
  /** Aim with nothing to aim by (touch): the way she's going, or facing. */
  const aimOwn = () => { const vx = witch.vx ?? 0, vz = witch.vz ?? 0, v = Math.hypot(vx, vz); if (v > 0.5) { s.ax = vx / v; s.az = vz / v; } else { s.ax = witch.facing; s.az = 0; } };
  if (!canFire) s.queue = [];
  else if (c.fire && s.queue.length === 0 && time >= s.readyAt) {
    const volleys = Math.max(1, Math.round(I.burst));
    s.burstAt = time;
    if (al <= 1e-3) aimOwn();
    for (let i = 0; i < volleys; i++) s.queue.push({ at: time + i * I.burstGap, ax: s.ax, az: s.az });
    s.readyAt = time + (volleys - 1) * I.burstGap + I.cooldown;
  }
  // The volleys due: multiShot letters each, over spread degrees.
  s.queue.sort((a, b) => a.at - b.at);
  while (s.queue.length && time >= s.queue[0].at - 1e-9) {
    const q = s.queue.shift()!;
    const n = Math.max(1, Math.round(I.multiShot)), base = Math.atan2(q.az, q.ax), fan = (I.spread * Math.PI) / 180;
    for (let k = 0; k < n; k++) { const a = base + (n > 1 ? (k / (n - 1) - 0.5) * fan : 0); letter(s, witch.x + Math.cos(a) * 0.6, witch.z + Math.sin(a) * 0.6, a, time, t); }
    s.events.push({ kind: "shot", x: witch.x, z: witch.z, at: time, n: s.next - 1 });
  }
  s.burstLeft = s.queue.length;

  // The creatures a letter could meet this step: those near any letter or hat.
  let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity;
  const sentries = hat?.sentry ?? [], slings = hat?.sling ?? [];
  for (const p of [...s.letters, ...sentries, ...slings]) { x0 = Math.min(x0, p.x); x1 = Math.max(x1, p.x); z0 = Math.min(z0, p.z); z1 = Math.max(z1, p.z); }
  const pad = Math.max(HARD.range, I.homingRange, ...sentries.map(q => q.range), ...slings.map(q => q.fire)) + 4;
  const near = x0 <= x1 ? creatures.filter(k => !k.gone && k.x > x0 - pad && k.x < x1 + pad && k.z > z0 - pad && k.z < z1 + pad) : [];
  /** The nearest invitable animal to (x, z) within r. */
  const nearest = (x: number, z: number, r: number): Creature | null => {
    let best: Creature | null = null, bd = r;
    for (const k of near) { if (!A.invitable(k)) continue; const d = Math.hypot(k.x - x, k.z - z); if (d < bd) { bd = d; best = k; } }
    return best;
  };
  const aimAt = (L: Letter, k: Creature) => { const sp = Math.hypot(L.vx, L.vz) || I.speed, d = Math.hypot(k.x - L.x, k.z - L.z) || 1; L.vx = ((k.x - L.x) / d) * sp; L.vz = ((k.z - L.z) / d) * sp; };
  /** Love landing on k: every letter counts (no gap since 2026-10-06: her firing rate sets the pace). */
  const love = (k: Creature, x: number, z: number, n: number) => {
    s.events.push({ kind: "hit", x, z, at: time, id: k.id, n, spent: false });
    A.hit(k, I.amount, time);
  };

  // The Sentry hats: each a 💌 at the nearest invitable creature in its reach, every few seconds, homing hard.
  if (sentries.length && time >= (s.sentryAt ?? 0)) {
    for (const q of sentries) {
      const k = nearest(q.x, q.z, q.range);
      if (!k) continue;
      const a = Math.atan2(k.z - q.z, k.x - q.x), L = letter(s, q.x + Math.cos(a) * 0.6, q.z + Math.sin(a) * 0.6, a, time, t, { home: true, hat: true, range: q.range * 1.5 });
      s.sentryAt = time + q.every;
      s.events.push({ kind: "shot", x: q.x, z: q.z, at: time, n: L.n });
    }
  }
  /** The Slingshot hat lying at (x, z), if one still does. */
  const slingAt = (x?: number, z?: number) => slings.find(q => q.x === x && q.z === z);
  const held = slings.map(q => s.letters.filter(L => L.kind === "sling" && L.hx === q.x && L.hz === q.z).length);

  s.letters = s.letters.filter(L => {
    // The Slingshot hat: a 💌 of hers flying within its reach is caught, circling it; after its hold, flung at the nearest
    // invitable creature in its range (Ed, 2026-10-11: captured 💌s "hold in orbit for a period, then curve round the hat and
    // fly at the nearest creature it can invite").
    if (!L.kind && !L.hat) {
      const i = slings.findIndex((q, j) => held[j] < q.max && Math.hypot(L.x - q.x, L.z - q.z) <= q.catch);
      if (i >= 0) { const q = slings[i]; Object.assign(L, { kind: "sling", hat: true, until: time + q.hold, slot: L.n % q.max, hit: [], hx: q.x, hz: q.z }); held[i]++; }
    }
    if (L.kind === "sling") {
      const SL = slingAt(L.hx, L.hz);
      if (!SL) { s.events.push({ kind: "fizzled", x: L.x, z: L.z, at: time, n: L.n }); return false; } // (the hat picked up)
      const a = (time * 200 * Math.PI) / 180 + ((L.slot ?? 0) / SL.max) * Math.PI * 2;
      L.x = SL.x + Math.cos(a) * SL.radius; L.z = SL.z + Math.sin(a) * SL.radius;
      if (time < (L.until ?? 0)) return true;
      const k = nearest(SL.x, SL.z, SL.fire);
      if (!k) { if (time >= (L.until ?? 0) + SL.hold * 3) { s.events.push({ kind: "fizzled", x: L.x, z: L.z, at: time, n: L.n }); return false; } return true; }
      Object.assign(L, { kind: undefined, home: true, range: SL.fire * 1.5, flown: 0, vx: I.speed, vz: 0 }); aimAt(L, k);
      s.events.push({ kind: "shot", x: L.x, z: L.z, at: time, n: L.n });
    }
    // Homing: toward the nearest invitable creature ahead, within the cone (a hat's: hard, wide and far, invites.hard).
    const homing = ((L.home ? HARD.homing : I.homing) * Math.PI) / 180, cone = Math.cos(((L.home ? HARD.cone : I.homingCone) * Math.PI) / 180), hr = L.home ? HARD.range : I.homingRange;
    const sp = Math.hypot(L.vx, L.vz);
    if (homing > 0 && sp > 0) {
      const ux = L.vx / sp, uz = L.vz / sp;
      let best: Creature | null = null, bd = hr;
      for (const k of near) {
        if (!A.invitable(k) || L.hit.includes(k.id)) continue;
        const dx = k.x - L.x, dz = k.z - L.z, d = Math.hypot(dx, dz);
        if (d < bd && d > 1e-6 && (dx * ux + dz * uz) / d > cone) { bd = d; best = k; }
      }
      if (best) {
        // (toward where it'll be as the 💌 gets there, by how it's moving: so it finds the quick movers too, the circlers and the
        // hoppers of the fight styles; Ed's playtest, 2026-10-29)
        const ahead = bd / sp, want = Math.atan2(best.z + (best.vx === undefined ? 0 : (best.vz ?? 0) * ahead) - L.z, best.x + (best.vx ?? 0) * ahead - L.x), cur = Math.atan2(uz, ux);
        let turn = want - cur;
        turn = Math.atan2(Math.sin(turn), Math.cos(turn));
        const quick = Math.max(1, Math.hypot(best.vx ?? 0, best.vz ?? 0) / 10), h = homing * quick; // (turning harder after a quick one: ×1 at 10 m/s and under)
        const a = cur + Math.max(-h * dt, Math.min(h * dt, turn));
        L.vx = Math.cos(a) * sp; L.vz = Math.sin(a) * sp;
      }
    }
    const step = sp * dt, px = L.x, pz = L.z;
    L.x += L.vx * dt; L.z += L.vz * dt; L.flown += step;
    // Out of a sleeping legend's circle (Ed, 2026-10-06: "Your invitations disappear if they go outside the circle from inside"): gone in a sparkle.
    if (leaves?.(px, pz, L.x, L.z)) { s.events.push({ kind: "vanished", x: L.x, z: L.z, at: time, n: L.n }); return false; }
    // The first creature its path this step passes within reach of: a hit, a block, or nothing (it passes through).
    let first: Creature | null = null, ft = Infinity;
    for (const k of near) {
      if (L.hit.includes(k.id) || k.swoop?.up) continue; // (a flyer aloft: it passes under, rules/movement.ts stepSwoop)
      const hitR = L.r + bodyRadius(k), dx = L.x - px, dz = L.z - pz, len2 = dx * dx + dz * dz;
      const f = len2 > 0 ? Math.max(0, Math.min(1, ((k.x - px) * dx + (k.z - pz) * dz) / len2)) : 0;
      if (Math.hypot(px + dx * f - k.x, pz + dz * f - k.z) > hitR || f >= ft) continue;
      if (!A.blocksLetters(k) && !A.invitable(k)) continue;
      first = k; ft = f;
    }
    // A decoy in its way first (pack combat: the raven's mirage images, rules/combat/packs.ts): it takes the 💌 and bursts.
    if (decoys?.length) for (const q of decoys) {
      const dx = L.x - px, dz = L.z - pz, len2 = dx * dx + dz * dz, f = len2 > 0 ? Math.max(0, Math.min(1, ((q.x - px) * dx + (q.z - pz) * dz) / len2)) : 0;
      if (f < ft && Math.hypot(px + dx * f - q.x, pz + dz * f - q.z) <= L.r + q.r) { q.hit(); s.events.push({ kind: "fizzled", x: q.x, z: q.z, at: time, n: L.n }); return false; }
    }
    if (first) {
      // Stopped dead by an enraged animal or a legend; else love lands.
      if (A.blocksLetters(first)) { s.events.push({ kind: "blocked", x: L.x, z: L.z, at: time, id: first.id, n: L.n, vx: L.vx, vz: L.vz }); return false; }
      love(first, L.x, L.z, L.n);
      L.hit.push(first.id);
      return false;
    }
    if (L.flown >= L.range) { s.events.push({ kind: "fizzled", x: L.x, z: L.z, at: time, n: L.n }); return false; }
    return true;
  });
}

