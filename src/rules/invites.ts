// The 💌 invite (Ed, issue #87: "we are throwing a party, we're inviting everyone"): on the ground the
// witch shoots spinning 💌s, aimed twin-stick (the right stick or the cursor), and they replace the old
// proximity chat. Firing is a burst of `burst` volleys `burstGap` seconds apart, each of `multiShot`
// letters fanned over `spread` degrees, then `cooldown` seconds before the next burst; letters fly at
// `speed` m/s for `range` metres, turning toward the nearest invitable creature ahead at up to `homing`
// degrees a second. All of it is data (tuning `invites`), so legend buffs can change it like the rest.
// A letter that reaches an invitable (wild) creature is a hit on its affection; enraged creatures and
// legends block letters; anything else (her own party, happy ones) lets them through. No drawing here.
import { inviteCreature, invitable as canInvite, type LeashState } from "./leash";
import { LEGEND, type Creature } from "./creatures";
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
}

export type InviteEventKind = "shot" | "hit" | "blocked" | "fizzled" | "happy";
export interface InviteEvent { kind: InviteEventKind; x: number; z: number; at: number; /** the creature hit, blocked by or made happy */ id?: number; n?: number }

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
  /** This frame's events, for the view (stepGame clears them each frame, like combat's). */
  events: InviteEvent[];
  /** Affection per creature, 0 to 1 (the stand-in below; the state machine will own it). */
  meter: Map<number, number>;
}

export const newInvites = (): Invites => ({ letters: [], burstLeft: 0, nextVolley: 0, readyAt: 0, burstAt: -Infinity, ax: 1, az: 0, next: 0, events: [], meter: new Map() });

/** The affection interface (issue #87), which the creature state machine provides. Until it lands,
 *  `standInAffection` does the job with today's leash: a full meter invites (leashes) the creature. */
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

/** How many 💌s fill a creature at its level (babies few, adults many). */
export const hitsNeeded = (c: Creature, t: Tuning) => t.invites.hits[Math.min(c.level, t.invites.hits.length - 1)];

export function standInAffection(s: Invites, leash: LeashState, t: Tuning): Affection {
  return {
    invitable: c => canInvite(c) && c.level !== LEGEND && !c.boss && (!c.legendState || c.legendState === "awake"),
    blocksLetters: c => !!c.enraged || !!c.boss || c.level === LEGEND,
    hit(c, amount, time) {
      const v = (s.meter.get(c.id) ?? 0) + amount / Math.max(1, hitsNeeded(c, t));
      if (v >= 1 - 1e-9) {
        s.meter.delete(c.id);
        inviteCreature(leash, c, c.x, c.z, time);
        s.events.push({ kind: "happy", x: c.x, z: c.z, at: time, id: c.id });
      } else s.meter.set(c.id, v);
    },
    affection: c => s.meter.get(c.id) ?? null,
  };
}

export interface InviteControls {
  /** Fire held (click, trigger, or its key). */
  fire?: boolean;
  /** Where she aims (world x/z direction; need not be unit; 0,0 keeps the last aim). */
  aimX?: number;
  aimZ?: number;
}

/** One step: start or carry on a burst, fly the letters, and land them. `canFire`: on the ground,
 *  off her seat, not knocked out. */
export function stepInvites(s: Invites, c: InviteControls, witch: { x: number; z: number; facing: number; vx?: number; vz?: number }, canFire: boolean, creatures: Creature[], A: Affection, time: number, dt: number, t: Tuning): void {
  const I = t.invites;
  const ax = c.aimX ?? 0, az = c.aimZ ?? 0, al = Math.hypot(ax, az);
  if (al > 1e-3 && s.burstLeft === 0) { s.ax = ax / al; s.az = az / al; }
  if (!canFire) s.burstLeft = 0;
  else if (c.fire && s.burstLeft === 0 && time >= s.readyAt) {
    s.burstLeft = Math.max(1, Math.round(I.burst)); s.nextVolley = time; s.burstAt = time;
    // No aim (touch): the way she's going, or facing.
    if (al <= 1e-3) { const vx = witch.vx ?? 0, vz = witch.vz ?? 0, v = Math.hypot(vx, vz); if (v > 0.5) { s.ax = vx / v; s.az = vz / v; } else { s.ax = witch.facing; s.az = 0; } }
  }
  while (s.burstLeft > 0 && time >= s.nextVolley - 1e-9) {
    const n = Math.max(1, Math.round(I.multiShot)), base = Math.atan2(s.az, s.ax), fan = (I.spread * Math.PI) / 180;
    for (let k = 0; k < n; k++) {
      const a = base + (n > 1 ? (k / (n - 1) - 0.5) * fan : 0);
      s.letters.push({ n: s.next++, x: witch.x + Math.cos(a) * 0.6, z: witch.z + Math.sin(a) * 0.6, vx: Math.cos(a) * I.speed, vz: Math.sin(a) * I.speed, flown: 0, at: time });
    }
    s.events.push({ kind: "shot", x: witch.x, z: witch.z, at: time, n: s.next - 1 });
    s.burstLeft--;
    s.nextVolley = time + I.burstGap;
    if (s.burstLeft === 0) s.readyAt = time + I.cooldown;
  }

  // The creatures a letter could meet this step: those within its range of her.
  const reach = I.range + 4, near = s.letters.length ? creatures.filter(k => !k.gone && Math.abs(k.x - witch.x) < reach && Math.abs(k.z - witch.z) < reach) : [];
  const homing = (I.homing * Math.PI) / 180, cone = Math.cos((I.homingCone * Math.PI) / 180);
  s.letters = s.letters.filter(L => {
    // Homing: turn toward the nearest invitable creature ahead, within the cone.
    if (homing > 0) {
      const sp = Math.hypot(L.vx, L.vz), ux = L.vx / sp, uz = L.vz / sp;
      let best: Creature | null = null, bd = I.homingRange;
      for (const k of near) {
        if (!A.invitable(k)) continue;
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
    const step = Math.hypot(L.vx, L.vz) * dt, x0 = L.x, z0 = L.z;
    L.x += L.vx * dt; L.z += L.vz * dt; L.flown += step;
    // The first creature its path this step passes within reach of: a hit, a block, or nothing (it passes through).
    let first: Creature | null = null, ft = Infinity;
    for (const k of near) {
      const hitR = I.radius + bodyRadius(k), dx = L.x - x0, dz = L.z - z0, len2 = dx * dx + dz * dz;
      const f = len2 > 0 ? Math.max(0, Math.min(1, ((k.x - x0) * dx + (k.z - z0) * dz) / len2)) : 0;
      if (Math.hypot(x0 + dx * f - k.x, z0 + dz * f - k.z) > hitR || f >= ft) continue;
      if (!A.blocksLetters(k) && !A.invitable(k)) continue;
      first = k; ft = f;
    }
    if (first) {
      if (A.blocksLetters(first)) s.events.push({ kind: "blocked", x: L.x, z: L.z, at: time, id: first.id, n: L.n });
      else { s.events.push({ kind: "hit", x: L.x, z: L.z, at: time, id: first.id, n: L.n }); A.hit(first, I.amount, time); }
      return false;
    }
    if (L.flown >= I.range) { s.events.push({ kind: "fizzled", x: L.x, z: L.z, at: time, n: L.n }); return false; }
    return true;
  });

  // The stand-in's meters drain slowly when not being hit.
  for (const [id, v] of s.meter) {
    const left = v - I.drain * dt, k = creatures[id];
    if (left <= 0 || !k || k.leashed || k.gone || k.enraged) s.meter.delete(id); else s.meter.set(id, left);
  }
}

/** How far the next burst has recharged: 0 just fired, 1 ready (for the action bar). */
export function inviteCharge(s: Invites, time: number): number {
  if (time >= s.readyAt) return 1;
  const total = s.readyAt - s.burstAt;
  return total > 0 ? Math.max(0, Math.min(1, (time - s.burstAt) / total)) : 1;
}
