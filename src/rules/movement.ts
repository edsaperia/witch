// Creature movement in a fight (Stage 5; DESIGN.md "Creature movement"): composable steering
// behaviours, a movement profile per species (config/movement.json), and pack tactics. A creature
// that's fighting moves by the weighted sum of its profile's behaviours, toward the slot its pack's
// tactic gives it, with its own acceleration. Species without a profile keep the plain approach.
// All seeded and stepped in fixed steps: deterministic. No drawing here.
import raw from "../../config/movement.json";
import type { Creature } from "./creatures";
import { hash2 } from "./random";

export type BehaviourKind = "arrive" | "keepRange" | "orbit" | "strafe" | "slot" | "separation" | "cohesion" | "wander" | "dodge";
export interface Behaviour { kind: BehaviourKind; w: number; near?: number; far?: number; radius?: number; swap?: number }
export type TacticKind = "surround" | "pincer" | "hitAndRun" | "volley" | "swarm" | "none";
export interface Move { kind: "charge" | "ambush" | "burrow" | "leap"; cooldown: number; from?: number; to?: number; speed?: number; time?: number; trigger?: number; height?: number }
export interface Profile {
  /** Its speed in a fight, times its own (the usual is combat.chaseMult). */
  run?: number;
  /** How quickly it changes velocity (m/s per second): heavy creatures turn slowly. */
  accel: number;
  fight: Behaviour[];
  tactics?: { kind: TacticKind; w: number }[];
  move?: Move;
}
export interface MovementData { repick: number; packRadius: number; profiles: Record<string, Profile> }
export const MOVEMENT = raw as unknown as MovementData;

export const profileOf = (species: string, data: MovementData = MOVEMENT): Profile | null => data.profiles[species] ?? null;

/** A pack: creatures of one kind on one side going for the same target, and the tactic it's using. */
export interface Pack { tactic: TacticKind; members: Creature[]; seed: number; cx: number; cz: number }

/** Group the fighting creatures into packs and pick each one's tactic (re-picked every `repick`
 *  seconds, seeded by its first member and the time). Keyed by creature id. */
export function packsOf(fighters: { c: Creature; target: string }[], time: number, data: MovementData = MOVEMENT): Map<number, Pack> {
  const groups = new Map<string, Creature[]>();
  for (const { c, target } of fighters) {
    const p = profileOf(c.species, data);
    if (!p?.tactics?.length) continue;
    const k = `${c.leashed ? "p" : "w"}|${c.species}|${target}`;
    let l = groups.get(k);
    if (!l) groups.set(k, (l = []));
    l.push(c);
  }
  const out = new Map<number, Pack>();
  for (const members of groups.values()) {
    members.sort((a, b) => a.id - b.id);
    const P = profileOf(members[0].species, data)!, bucket = Math.floor(time / data.repick), seed = hash2(members[0].id, bucket, 6007);
    let total = 0;
    for (const t of P.tactics!) total += t.w;
    let r = seed * total, tactic: TacticKind = P.tactics![0].kind;
    for (const t of P.tactics!) { if (r < t.w) { tactic = t.kind; break; } r -= t.w; }
    let cx = 0, cz = 0;
    for (const m of members) { cx += m.x; cz += m.z; }
    const pack: Pack = { tactic: members.length > 1 || tactic === "hitAndRun" ? tactic : "none", members, seed, cx: cx / members.length, cz: cz / members.length };
    for (const m of members) out.set(m.id, pack);
  }
  return out;
}

export interface SteerContext {
  /** The target: where it is and its size. */
  px: number; pz: number; pr: number;
  /** Where it wants to attack from (its attack's reach), and its attack's range. */
  want: number; range: number;
  /** Its top speed now (its run in a fight, slowed or not). */
  speed: number;
  time: number; dt: number;
  pack: Pack | null;
  /** Nearby fighting creatures (for separation and cohesion). */
  neighbours: Iterable<Creature>;
  /** Shots and lobs in flight (for dodging). */
  threats: { x: number; z: number; vx: number; vz: number; side: string; radius?: number; lob?: { tx: number; tz: number } }[];
  side: string;
  /** Its attack is ready (hit and run goes in only then). */
  ready: boolean;
  /** Seconds a beat lasts (the volley fires on it). */
  beat: number;
}

/** Steer a fighting creature by its profile for one step. Returns whether it may start an attack now. */
export function steer(c: Creature, P: Profile, x: SteerContext): boolean {
  const dx = x.px - c.x, dz = x.pz - c.z, d = Math.hypot(dx, dz) || 1e-6, ux = dx / d, uz = dz / d;
  let vx = 0, vz = 0, may = d <= x.want + 0.6;
  const add = (ax: number, az: number, w: number) => { vx += ax * w; vz += az * w; };
  const pack = x.pack, n = pack ? pack.members.length : 1, i = pack ? Math.max(0, pack.members.indexOf(c)) : 0;
  // The slot its pack's tactic gives it (if any), and whether the tactic lets it strike now.
  let slot: { x: number; z: number } | null = null;
  const base = (pack ? pack.seed : hash2(c.id, 1, 3)) * Math.PI * 2;
  switch (pack?.tactic) {
    case "surround": { const a = base + (i / n) * Math.PI * 2, R = Math.max(x.want * 0.9, 1); slot = { x: x.px + Math.cos(a) * R, z: x.pz + Math.sin(a) * R }; break; }
    case "pincer": { const side = i % 2 ? Math.PI / 2 : -Math.PI / 2, from = Math.atan2(pack.cz - x.pz, pack.cx - x.px), a = from + side + (Math.floor(i / 2) * 0.35), R = Math.max(x.want * 0.9, 1); slot = { x: x.px + Math.cos(a) * R, z: x.pz + Math.sin(a) * R }; break; }
    case "hitAndRun": {
      // In when its strike is ready; otherwise back out to a ring round the target, spread round it.
      // (Out the way it came, members fanned a little apart, so it doesn't run through its target.)
      if (!x.ready) { const a = Math.atan2(-dz, -dx) + (i - (n - 1) / 2) * 0.6, R = Math.max(7, x.want + 5); slot = { x: x.px + Math.cos(a) * R, z: x.pz + Math.sin(a) * R }; may = false; }
      break;
    }
    case "volley": {
      // A line across the way to the target, at range, a few metres between members; it fires on the beat.
      const from = Math.atan2(pack.cz - x.pz, pack.cx - x.px), R = x.range * 0.8, off = (i - (n - 1) / 2) * 3;
      const lx = x.px + Math.cos(from) * R, lz = x.pz + Math.sin(from) * R;
      slot = { x: lx - Math.sin(from) * off, z: lz + Math.cos(from) * off };
      const beatPhase = (x.time / x.beat) % 1;
      may = may && beatPhase < 0.2;
      break;
    }
    default: break;
  }
  for (const b of P.fight) {
    switch (b.kind) {
      case "arrive": { const k = Math.max(-0.4, Math.min(1, (d - x.want) / 2)); if (!slot) add(ux, uz, b.w * k); break; }
      case "keepRange": { const near = x.range * (b.near ?? 0.5), far = x.range * (b.far ?? 0.9); if (d < near) add(-ux, -uz, b.w); else if (d > far) add(ux, uz, b.w); break; }
      case "orbit": { const dir = hash2(c.id, 5, 7) < 0.5 ? 1 : -1, R = x.range * (b.radius ?? 0.7); add(-uz * dir, ux * dir, b.w); add(ux * (d - R) / Math.max(1, R), uz * (d - R) / Math.max(1, R), b.w * 0.6); break; }
      case "strafe": { const dir = hash2(c.id, Math.floor(x.time / (b.swap ?? 2)), 11) < 0.5 ? 1 : -1; add(-uz * dir, ux * dir, b.w); break; }
      case "slot": { if (slot) {
        // A slot round the far side: it goes round its target, not through it.
        const ac = Math.atan2(c.z - x.pz, c.x - x.px), as = Math.atan2(slot.z - x.pz, slot.x - x.px), da = ((as - ac + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
        const sd = Math.hypot(slot.x - c.x, slot.z - c.z);
        let gx = slot.x, gz = slot.z;
        if (Math.abs(da) > 0.9) { const a = ac + Math.sign(da) * 0.9, R = Math.max(x.want + 1.5, Math.min(d, x.want + 4)); gx = x.px + Math.cos(a) * R; gz = x.pz + Math.sin(a) * R; }
        const sx = gx - c.x, sz = gz - c.z, gd = Math.hypot(sx, sz) || 1e-6; if (sd > 0.3) add(sx / gd, sz / gd, b.w * Math.min(1, sd / 2));
        // Surrounding or pincering, it takes its place before it strikes.
        if ((pack?.tactic === "surround" || pack?.tactic === "pincer") && sd > 1.5) may = false; } break; }
      case "separation": { const R = b.radius ?? 2; for (const o of x.neighbours) { if (o === c) continue; const ox = c.x - o.x, oz = c.z - o.z, od = Math.hypot(ox, oz); if (od < R && od > 1e-4) add(ox / od, oz / od, b.w * (1 - od / R)); } break; }
      case "cohesion": { if (pack && n > 1) { const cx = pack.cx - c.x, cz = pack.cz - c.z, cd = Math.hypot(cx, cz); if (cd > (b.radius ?? 4)) add(cx / cd, cz / cd, b.w); } break; }
      case "wander": { const a = hash2(c.id, Math.floor(x.time * 2), 13) * Math.PI * 2; add(Math.cos(a), Math.sin(a), b.w); break; }
      case "dodge": {
        // Step sideways out of a shot coming its way (not its own side's).
        const R = b.radius ?? 5;
        for (const s of x.threats) {
          if (s.side === x.side) continue;
          // A lob coming down on it: out of its ring, away from where it lands.
          if (s.lob) { const lx = c.x - s.lob.tx, lz = c.z - s.lob.tz, ld = Math.hypot(lx, lz), lr = (s.radius ?? 1.8) + 1; if (ld < lr) add(ld > 1e-3 ? lx / ld : 1, ld > 1e-3 ? lz / ld : 0, b.w * 1.5); continue; }
          const rx = c.x - s.x, rz = c.z - s.z, rd = Math.hypot(rx, rz), sv = Math.hypot(s.vx, s.vz) || 1;
          if (rd > R) continue;
          const along = (rx * s.vx + rz * s.vz) / sv; // ahead of the shot
          if (along <= 0) continue;
          const lat = (rx * -s.vz + rz * s.vx) / sv; // which side of its line
          if (Math.abs(lat) < 1.5) { const sgn = lat >= 0 ? 1 : -1; add((-s.vz / sv) * sgn, (s.vx / sv) * sgn, b.w); }
        }
        break;
      }
    }
  }
  // A behaviour asking for more than full speed is held to it; then ease toward it at its acceleration.
  const m = Math.hypot(vx, vz);
  if (m > 1) { vx /= m; vz /= m; }
  const tx = vx * x.speed, tz = vz * x.speed, ax = tx - (c.vx ?? 0), az = tz - (c.vz ?? 0), am = Math.hypot(ax, az), step = P.accel * x.dt;
  const k = am > step ? step / am : 1;
  c.vx = (c.vx ?? 0) + ax * k; c.vz = (c.vz ?? 0) + az * k;
  c.x += c.vx * x.dt; c.z += c.vz * x.dt;
  const sp = Math.hypot(c.vx, c.vz);
  c.moving = sp > 0.15;
  if (c.moving) c.walk += x.dt * (2 + sp * 1.5);
  // It faces its target while it fights (or the way it runs, when it's running fast away).
  c.facing = (sp > 2 && Math.abs(c.vx) > 0.3 ? c.vx : dx) >= 0 ? 1 : -1;
  c.away = dz < -Math.abs(dx);
  return may;
}

/** The charge (Stage 5: the boar): a burst in a straight line at its target, locked once it starts;
 *  it ends after `time` seconds or once it reaches the target (the hit, for the caller), then the
 *  move cools down. Returns "hit" when it reached the target this step. */
export function stepCharge(c: Creature, mv: Move, px: number, pz: number, reach: number, base: number, time: number, dt: number): "none" | "charging" | "hit" {
  const ch = c.charge;
  if (ch && time < ch.until) {
    c.x += ch.dx * ch.speed * dt; c.z += ch.dz * ch.speed * dt; c.vx = ch.dx * ch.speed; c.vz = ch.dz * ch.speed;
    c.moving = true; c.walk += dt * 10; c.facing = ch.dx >= 0 ? 1 : -1;
    if (Math.hypot(px - c.x, pz - c.z) <= reach) { c.charge = { ...ch, until: time }; return "hit"; }
    return "charging";
  }
  const d = Math.hypot(px - c.x, pz - c.z);
  if (time >= (c.moveReadyAt ?? 0) && d >= (mv.from ?? 4) && d <= (mv.to ?? 14)) {
    const s = base * (mv.speed ?? 3.5);
    c.charge = { dx: (px - c.x) / d, dz: (pz - c.z) / d, speed: s, until: time + (mv.time ?? 1.2) };
    c.moveReadyAt = time + mv.cooldown;
    return "charging";
  }
  return "none";
}

/** The burrow (Stage 5: the mole): from `from` metres off it goes under (untouchable: a mound
 *  moving over the ground) and tunnels at `speed` times its run to its target, surfacing under it
 *  (or after `time` seconds), then the move cools down. */
export function stepBurrow(c: Creature, mv: Move, px: number, pz: number, base: number, time: number, dt: number): "none" | "burrowed" | "under" | "surfaced" {
  const dx = px - c.x, dz = pz - c.z, d = Math.hypot(dx, dz);
  if (c.burrow) {
    const step = Math.min(d, base * (mv.speed ?? 1.5) * dt);
    if (d > 1e-3) { c.x += (dx / d) * step; c.z += (dz / d) * step; c.facing = dx >= 0 ? 1 : -1; }
    c.moving = true; c.walk += dt * 6; c.vx = 0; c.vz = 0;
    if (d < 1.2 || time >= c.burrow.until) { c.burrow = undefined; c.moveReadyAt = time + mv.cooldown; return "surfaced"; }
    return "under";
  }
  if (time >= (c.moveReadyAt ?? 0) && d >= (mv.from ?? 4)) { c.burrow = { until: time + (mv.time ?? 4) }; c.moving = false; return "burrowed"; }
  return "none";
}

/** The leap (Stage 5: the toad): when its attack is ready and its target is between `from` and
 *  `to` metres off, it leaps in an arc to just short of it, `time` seconds in the air, landing
 *  where it aimed (step out of the ring). Returns "landed" on the step it comes down. */
export function stepLeap(c: Creature, mv: Move, px: number, pz: number, ready: boolean, time: number): "none" | "leapt" | "air" | "landed" {
  const L = c.leap;
  if (L) {
    const k = Math.min(1, (time - L.at) / Math.max(0.01, L.lands - L.at));
    c.x = L.fx + (L.tx - L.fx) * k; c.z = L.fz + (L.tz - L.fz) * k; c.moving = false; c.vx = 0; c.vz = 0;
    if (k >= 1) { c.leap = undefined; return "landed"; }
    return "air";
  }
  const dx = px - c.x, dz = pz - c.z, d = Math.hypot(dx, dz);
  if (ready && time >= (c.moveReadyAt ?? 0) && d >= (mv.from ?? 3) && d <= (mv.to ?? 10)) {
    const stop = Math.min(d, 0.8);
    c.leap = { fx: c.x, fz: c.z, tx: px - (dx / d) * stop, tz: pz - (dz / d) * stop, at: time, lands: time + (mv.time ?? 0.8), height: mv.height ?? 2.5 };
    c.moveReadyAt = time + mv.cooldown; c.facing = dx >= 0 ? 1 : -1;
    return "leapt";
  }
  return "none";
}
