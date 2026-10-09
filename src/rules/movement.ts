// Creature movement in a fight (Stage 5; DESIGN.md "Creature movement"): composable steering
// behaviours, a movement profile per species (config/movement.json), and pack tactics. A creature
// that's fighting moves by the weighted sum of its profile's behaviours, toward the slot its pack's
// tactic gives it, with its own acceleration. Species without a profile keep the plain approach.
// All seeded and stepped in fixed steps: deterministic. No drawing here.
import raw from "../../config/movement.json";
import type { Creature } from "./creatures";
import { hash2 } from "./random";

export type BehaviourKind = "arrive" | "keepRange" | "orbit" | "strafe" | "slot" | "separation" | "cohesion" | "wander" | "dodge" | "light";
export interface Behaviour { kind: BehaviourKind; w: number; near?: number; far?: number; radius?: number; swap?: number }
export type TacticKind = "surround" | "pincer" | "hitAndRun" | "volley" | "swarm" | "flank" | "none";
export interface Move { kind: "charge" | "ambush" | "burrow" | "leap" | "dig" | "block" | "trail" | "flash" | "swoop"; cooldown: number;
  /** A swoop (the wild flyers): it circles `radius` m round its target at `circle` m/s, `height` m up (out of reach), now and then
   *  wavering by `jitter` of its radius (a bat's erratic flight); then telegraphs for `windup` seconds (rising to `rise` times its
   *  height meanwhile: the raven climbing out of view, its shadow growing), dives along a line at `speed` m/s at where its target
   *  will be (`lead` of its velocity times the dive's flight time, at the moment it lets go), on `overshoot` m past, skims low for
   *  `bottom` seconds and climbs back up over `climb` seconds; `dives` such dives in a bout, then `cooldown` seconds circling.
   *  Hittable (and invitable) only in the dive and at the bottom. A dive that touches her throws her `knockback` m. */
  circle?: number; jitter?: number; rise?: number; lead?: number; bottom?: number; climb?: number; dives?: number; knockback?: number;
  /** A charge: backs off at this speed (m/s) while it lowers its head (the ram's run-up); its pack mates charge with it (the stags' pair); curled up while it rolls, taking this times the damage (the hedgehog's, the woodlouse's). */ backup?: number; pair?: boolean; curl?: number;
  /** A leap that lands a blow on its target (the lynx's pounce), not a slam round it; an ambush that strikes the moment it springs (the snake's). */ strike?: boolean;
  /** Dig in, block, trail, flash: seconds it lasts (time), the damage it takes meanwhile times armour, a slow's speed times slow, a trail's drop every seconds, a radius. */ armour?: number; slow?: number; every?: number; radius?: number; /** A charge: seconds it lowers its head first (its lane telegraphed); how fast it builds speed and brakes (m/s each second), how fast it turns braking (degrees a second), and how far it runs on past its target before braking (m). */ windup?: number; accel?: number; brake?: number; turn?: number; overshoot?: number; from?: number; to?: number; speed?: number; time?: number; trigger?: number; height?: number }
export interface Profile {
  /** Its speed in a fight (m/s, times tuning fight.speed; the usual is combat.fightRun). */
  speed?: number;
  /** Its sprint closing in from afar (m/s; else combat.pursuitRun): slow kinds (a snail) don't sprint. */
  pursuit?: number;
  /** How quickly it changes velocity (m/s per second): heavy creatures turn slowly. */
  accel: number;
  fight: Behaviour[];
  tactics?: { kind: TacticKind; w: number }[];
  move?: Move;
}
/** A wild legend's move set (Stage 5): moves (combat.json attacks) in a loop, and its second phase. */
export interface LegendSet { pattern: string[]; phase2: { at: number; pattern: string[]; speed: number; cooldown: number } }
export interface MovementData { repick: number; packRadius: number; profiles: Record<string, Profile>; legends: LegendSet & { bySpecies: Record<string, LegendSet> }; /** Body sizes, for spacing (rules/spacing.ts). */ bodies: import("./spacing").Bodies }
export const MOVEMENT = raw as unknown as MovementData;

/** The fight's scale and speed (Ed's motion scale pass, 2026-10-04; tuning fight, ?fightScale= and
 *  ?fightSpeed=, and live in the debug overlay): every length in a fight (attack ranges, lunges,
 *  radii, knockback, pattern sizes, pursuit) times scale; every fight speed (running, charging,
 *  shots) times speed; momentum: how heavily creatures in a fight change speed and turn (their
 *  accelerations and turn rates divided by it). Set from the tuning at each combat step. */
/** The fight's scale and speed, and (Ed's round 13, 2026-10-06: "charging and jumping creatures should
 *  charge or jump much further ... much more momentum, travelling in wide arcs") every species' charge
 *  and leap scaled: tuning fight.charge (reach: its run's time and overshoot, turn: its turn rate,
 *  brake: how hard it slows) and fight.leap (reach: how far off it leaps from, through: metres past
 *  its target it lands; less than 0, short of it). Set from the tuning each step (rules/combat.ts). */
export const FIGHT: { scale: number; speed: number; momentum: number; charge: { reach: number; turn: number; brake: number; chase?: number; miss?: number }; leap: { reach: number; through: number; lead?: number }; walk: number } = { scale: 1, speed: 1, momentum: 1, charge: { reach: 1, turn: 1, brake: 1 }, leap: { reach: 1, through: -1.5 }, walk: 0 };

export const profileOf = (species: string, data: MovementData = MOVEMENT): Profile | null => data.profiles[species] ?? null;
export const legendSetOf = (species: string, data: MovementData = MOVEMENT): LegendSet => data.legends.bySpecies[species] ?? data.legends;

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
  /** Which way the target is heading (a unit vector), or none if it's standing still (flanking goes round to its back). */
  heading?: { x: number; z: number } | null;
  /** Lights near it (glow-worms, soundsystems): moths are drawn to them. */
  lights?: { x: number; z: number }[];
  /** Its attack is ready (hit and run goes in only then). */
  ready: boolean;
  /** Seconds a beat lasts (the volley fires on it). */
  beat: number;
  /** Cutting off her retreat (tuning dodge.c): it makes for a place ahead of her as she runs, `ahead` metres on along her
   *  heading and `angle` radians to one side of it, `reach` times its attack's reach out. */
  cutoff?: { ahead: number; angle: number; reach: number };
  /** How far it may fire from, if further than `range` (a shooter at her, tuning dodge.b.range: it keeps its distance by `range`). */
  fire?: number;
  /** Where "arrive" makes for, if not `want` (committed strikes, tuning dodge.a: right in on her, striking as it comes). */
  arriveAt?: number;
}

/** Steer a fighting creature by its profile for one step. Returns whether it may start an attack now. */
export function steer(c: Creature, P: Profile, x: SteerContext): boolean {
  const dx = x.px - c.x, dz = x.pz - c.z, d = Math.hypot(dx, dz) || 1e-6, ux = dx / d, uz = dz / d, S = FIGHT.scale;
  let vx = 0, vz = 0, may = d <= Math.max(x.want + 1.5 * S, (x.fire ?? x.range) * 0.95); // (a shooter may strike from anywhere in its range)
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
      if (!x.ready) { const a = Math.atan2(-dz, -dx) + (i - (n - 1) / 2) * 0.6, R = Math.max(25 * S, x.want + 12 * S); slot = { x: x.px + Math.cos(a) * R, z: x.pz + Math.sin(a) * R }; may = false; }
      break;
    }
    case "volley": {
      // A line across the way to the target, at range, a few metres between members; it fires on the beat.
      const from = Math.atan2(pack.cz - x.pz, pack.cx - x.px), R = x.range * 0.8, off = (i - (n - 1) / 2) * 6 * S;
      const lx = x.px + Math.cos(from) * R, lz = x.pz + Math.sin(from) * R;
      slot = { x: lx - Math.sin(from) * off, z: lz + Math.cos(from) * off };
      const beatPhase = (x.time / x.beat) % 1;
      may = may && beatPhase < 0.2;
      break;
    }
    case "flank": {
      // Round to its back (Ed's species pass: the fox, the marten pack): slots behind the way it's
      // heading, fanned a little apart; standing still, a ring round it (as surround).
      const h = x.heading, R = Math.max(x.want * 0.9, 1);
      const a = h ? Math.atan2(-h.z, -h.x) + (i - (n - 1) / 2) * 0.7 : base + (i / n) * Math.PI * 2;
      slot = { x: x.px + Math.cos(a) * R, z: x.pz + Math.sin(a) * R };
      // (it strikes only from behind her: within 70 degrees of her back)
      if (h && may) { const bx = c.x - x.px, bz = c.z - x.pz, bd = Math.hypot(bx, bz) || 1; may = (bx * -h.x + bz * -h.z) / bd > 0.35 || d < x.want * 0.6; }
      break;
    }
    default: break;
  }
  // Cutting off her retreat (dodge.c): a place ahead of her as she runs, to one side (by its id), making for it hard whatever
  // its tactic (or its kind's behaviours: a bat has no slot to keep), striking from there as she comes.
  const cut = x.cutoff && x.heading ? x.cutoff : null;
  if (cut) {
    const h = x.heading!, side = hash2(c.id, 9, 17) < 0.5 ? 1 : -1, a = Math.atan2(h.z, h.x) + side * cut.angle, R = Math.max(x.want * cut.reach, 1);
    slot = { x: x.px + h.x * cut.ahead + Math.cos(a) * R, z: x.pz + h.z * cut.ahead + Math.sin(a) * R };
    const sx = slot.x - c.x, sz = slot.z - c.z, sd = Math.hypot(sx, sz) || 1e-6;
    if (sd > 0.6 * S) add(sx / sd, sz / sd, 1.5 * Math.min(1, sd / (4 * S)));
  }
  for (const b of P.fight) {
    switch (b.kind) {
      case "arrive": { const k = Math.max(-0.4, Math.min(1, (d - (x.arriveAt ?? x.want)) / (4 * S))); if (!slot) add(ux, uz, b.w * k); break; }
      case "keepRange": { const near = x.range * (b.near ?? 0.5), far = x.range * (b.far ?? 0.9); if (d < near) add(-ux, -uz, b.w); else if (d > far) add(ux, uz, b.w); break; }
      case "orbit": { const dir = hash2(c.id, 5, 7) < 0.5 ? 1 : -1, R = x.range * (b.radius ?? 0.7); add(-uz * dir, ux * dir, b.w); add(ux * (d - R) / Math.max(1, R), uz * (d - R) / Math.max(1, R), b.w * 0.6); break; }
      case "strafe": { const dir = hash2(c.id, Math.floor(x.time / (b.swap ?? 2)), 11) < 0.5 ? 1 : -1; add(-uz * dir, ux * dir, b.w); break; }
      case "slot": { if (slot && !cut) {
        // A slot round the far side: it goes round its target, not through it.
        const ac = Math.atan2(c.z - x.pz, c.x - x.px), as = Math.atan2(slot.z - x.pz, slot.x - x.px), da = ((as - ac + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
        const sd = Math.hypot(slot.x - c.x, slot.z - c.z);
        let gx = slot.x, gz = slot.z;
        if (Math.abs(da) > 0.9) { const a = ac + Math.sign(da) * 0.9, R = Math.max(x.want + 3 * S, Math.min(d, x.want + 10 * S)); gx = x.px + Math.cos(a) * R; gz = x.pz + Math.sin(a) * R; }
        const sx = gx - c.x, sz = gz - c.z, gd = Math.hypot(sx, sz) || 1e-6; if (sd > 0.6 * S) add(sx / gd, sz / gd, b.w * Math.min(1, sd / (4 * S)));
        // Surrounding or pincering, it takes its place before it strikes.
        if ((pack?.tactic === "surround" || pack?.tactic === "pincer") && sd > 3 * S) may = false; } break; }
      case "separation": { const R = (b.radius ?? 7) * S; for (const o of x.neighbours) { if (o === c) continue; const ox = c.x - o.x, oz = c.z - o.z, od = Math.hypot(ox, oz); if (od < R && od > 1e-4) add(ox / od, oz / od, b.w * (1 - od / R)); } break; }
      case "cohesion": { if (pack && n > 1) { const cx = pack.cx - c.x, cz = pack.cz - c.z, cd = Math.hypot(cx, cz); if (cd > (b.radius ?? 14) * S) add(cx / cd, cz / cd, b.w); } break; }
      case "wander": { const a = hash2(c.id, Math.floor(x.time * 2), 13) * Math.PI * 2; add(Math.cos(a), Math.sin(a), b.w); break; }
      case "light": {
        // Drawn to the nearest light (a moth): toward it, fluttering round it once there.
        let best: { x: number; z: number } | null = null, bd = (b.radius ?? 30) * S;
        for (const l of x.lights ?? []) { const ld = Math.hypot(l.x - c.x, l.z - c.z); if (ld < bd) { bd = ld; best = l; } }
        if (best) { const lx = best.x - c.x, lz = best.z - c.z, ld = Math.max(bd, 1e-3); if (ld > 3 * S) add(lx / ld, lz / ld, b.w); else add(-lz / ld, lx / ld, b.w); }
        break;
      }
      case "dodge": {
        // Step sideways out of a shot coming its way (not its own side's).
        const R = (b.radius ?? 20) * S;
        for (const s of x.threats) {
          if (s.side === x.side) continue;
          // A lob coming down on it: out of its ring, away from where it lands.
          if (s.lob) { const lx = c.x - s.lob.tx, lz = c.z - s.lob.tz, ld = Math.hypot(lx, lz), lr = (s.radius ?? 4) + 2 * S; if (ld < lr) add(ld > 1e-3 ? lx / ld : 1, ld > 1e-3 ? lz / ld : 0, b.w * 1.5); continue; }
          const rx = c.x - s.x, rz = c.z - s.z, rd = Math.hypot(rx, rz), sv = Math.hypot(s.vx, s.vz) || 1;
          if (rd > R) continue;
          const along = (rx * s.vx + rz * s.vz) / sv; // ahead of the shot
          if (along <= 0) continue;
          const lat = (rx * -s.vz + rz * s.vx) / sv; // which side of its line
          if (Math.abs(lat) < 2.5 * S) { const sgn = lat >= 0 ? 1 : -1; add((-s.vz / sv) * sgn, (s.vx / sv) * sgn, b.w); }
        }
        break;
      }
    }
  }
  // A behaviour asking for more than full speed is held to it; then ease toward it at its acceleration.
  const m = Math.hypot(vx, vz);
  if (m > 1) { vx /= m; vz /= m; }
  const tx = vx * x.speed, tz = vz * x.speed, ax = tx - (c.vx ?? 0), az = tz - (c.vz ?? 0), am = Math.hypot(ax, az), step = (P.accel * x.dt * FIGHT.speed) / FIGHT.momentum;
  const k = am > step ? step / am : 1;
  c.vx = (c.vx ?? 0) + ax * k; c.vz = (c.vz ?? 0) + az * k;
  c.x += c.vx * x.dt; c.z += c.vz * x.dt;
  const sp = Math.hypot(c.vx, c.vz);
  c.moving = sp > 0.15;
  if (c.moving) c.walk += x.dt * (2 + Math.min(sp, 8) * 1.5);
  // It faces its target while it fights (or the way it runs, when it's running fast away).
  // (with a margin either way, so it doesn't flicker left and right as it passes straight up or down the screen)
  const fx = sp > 6 ? c.vx : dx;
  if (Math.abs(fx) > (sp > 6 ? 1.5 : 1)) c.facing = fx > 0 ? 1 : -1;
  c.away = dz < -Math.abs(dx);
  return may;
}

/** The charge (Stage 5: the boar; with momentum, Ed 2026-10-05: "they should have more momentum").
 *  It lowers its head (windup seconds, easing to a stop, its lane shown), then builds speed down
 *  that locked lane at `accel` up to `speed`, hits whatever it reaches once and carries on through,
 *  until it's `overshoot` metres past its target or `time` seconds have gone; then it brakes at
 *  `brake`, turning in an arc toward its target at `turn` degrees a second, and once it's down to its
 *  run its own steering takes over (with its velocity). Then the move cools down. Returns "hit" on
 *  the step it reaches the target. */
export function stepCharge(c: Creature, mv: Move, px: number, pz: number, reach: number, time: number, dt: number, run = 0): "none" | "charging" | "hit" {
  const ch = c.charge, M = FIGHT.momentum, V = FIGHT.speed;
  const CH = FIGHT.charge, accel = ((mv.accel ?? 40) * V) / M, brake = ((mv.brake ?? 30) * V * CH.brake) / M, turn = ((((mv.turn ?? 140) * Math.PI) / 180) * V * CH.turn) / M;
  if (ch) {
    let vx = c.vx ?? 0, vz = c.vz ?? 0, v = Math.hypot(vx, vz);
    if (ch.from !== undefined && time < ch.from) {
      if (mv.backup) {
        // Backing off for a run at it (the ram): easing back up its lane, facing down it.
        const bx = -ch.dx * mv.backup * V - vx, bz = -ch.dz * mv.backup * V - vz, bm = Math.hypot(bx, bz), k = bm > brake * dt ? (brake * dt) / bm : 1;
        vx += bx * k; vz += bz * k; v = Math.hypot(vx, vz);
        c.walk += dt * (2 + v);
      } else {
        // Lowering its head: easing to a stop, facing down its lane.
        const nv = Math.max(0, v - brake * dt); if (v > 1e-6) { vx *= nv / v; vz *= nv / v; } v = nv;
      }
      c.vx = vx; c.vz = vz; c.x += vx * dt; c.z += vz * dt; c.moving = v > 0.3; c.facing = ch.dx >= 0 ? 1 : -1;
      return "charging";
    }
    const tx = px - c.x, tz = pz - c.z, along = tx * ch.dx + tz * ch.dz;
    if (!ch.braking && (time >= ch.until || along < -(mv.overshoot ?? 8) * CH.reach * FIGHT.scale)) ch.braking = true;
    if (!ch.braking) {
      // Building speed down its lane (its velocity swings onto the lane, no snapping); a heavy's lane swings toward her as it runs (ch.home).
      if (ch.home) { const h = Math.atan2(ch.dz, ch.dx), da = ((Math.atan2(tz, tx) - h + Math.PI * 3) % (Math.PI * 2)) - Math.PI, nh = h + Math.max(-ch.home * dt, Math.min(ch.home * dt, da)); ch.dx = Math.cos(nh); ch.dz = Math.sin(nh); }
      const nv = Math.min(ch.speed, Math.max(v, 0) + accel * dt);
      vx = ch.dx * nv; vz = ch.dz * nv; v = nv;
    } else {
      // Braking in an arc: slowing, its heading turning toward its target at its turn rate.
      const nv = Math.max(0, v - brake * dt);
      let h = Math.atan2(vz, vx);
      const want = Math.atan2(tz, tx), da = ((want - h + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
      h += Math.max(-turn * dt, Math.min(turn * dt, da));
      vx = Math.cos(h) * nv; vz = Math.sin(h) * nv; v = nv;
      if (v <= Math.max(run, 1)) { c.vx = vx; c.vz = vz; c.x += vx * dt; c.z += vz * dt; c.charge = undefined; return "charging"; } // (its run takes over, with its velocity)
    }
    c.vx = vx; c.vz = vz; c.x += vx * dt; c.z += vz * dt;
    c.moving = true; c.walk += dt * (4 + Math.min(v, 30) * 0.3);
    if (Math.abs(vx) > 1.5) c.facing = vx > 0 ? 1 : -1;
    if (!ch.struck && !ch.braking && Math.hypot(tx, tz) <= reach) { ch.struck = true; return "hit"; } // (and it carries on through)
    return "charging";
  }
  const d = Math.hypot(px - c.x, pz - c.z);
  if (time >= (c.moveReadyAt ?? 0) && d >= (mv.from ?? 10) * FIGHT.scale && d <= (mv.to ?? 40) * FIGHT.scale) { startCharge(c, mv, px, pz, time); return "charging"; }
  return "none";
}

/** Start a charge at (px, pz) now: its head goes down (its lane locked), then it runs. */
export function startCharge(c: Creature, mv: Move, px: number, pz: number, time: number): void {
  // Walking away is no escape (Ed, 2026-10-06: "Charging creatures can easily be evaded by just walking away from
  // them. They should jump far enough or charge far enough that this doesn't work"): at least FIGHT.charge.chase
  // times her walking speed, and it runs on until it has caught up with her walking straight down its lane (or
  // its own time, if longer), so only stepping out of the lane (or a blink, or the treetops) gets her clear.
  const d = Math.hypot(px - c.x, pz - c.z) || 1e-6, wind = mv.windup ?? 0.5, walk = FIGHT.walk * FIGHT.speed, chase = FIGHT.charge.chase ?? 0;
  const s = Math.max((mv.speed ?? 28) * FIGHT.speed, chase * walk), accel = ((mv.accel ?? 40) * FIGHT.speed) / FIGHT.momentum;
  const catchUp = chase > 0 && s > walk ? (d + walk * wind + (s * s) / (2 * accel)) / (s - walk) : 0; // (the gap she opens walking away during its windup and while it builds speed, closed at s - walk)
  c.charge = { dx: (px - c.x) / d, dz: (pz - c.z) / d, speed: s, from: time + wind, until: time + wind + Math.max((mv.time ?? 1.6) * FIGHT.charge.reach, catchUp), ...(mv.curl ? { curl: mv.curl } : {}) };
  c.moveReadyAt = time + mv.cooldown;
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
    if (d < 1.5 * FIGHT.scale || time >= c.burrow.until) { c.burrow = undefined; c.moveReadyAt = time + mv.cooldown; return "surfaced"; }
    return "under";
  }
  if (time >= (c.moveReadyAt ?? 0) && d >= (mv.from ?? 10) * FIGHT.scale) { c.burrow = { until: time + (mv.time ?? 4) }; c.moving = false; return "burrowed"; }
  return "none";
}

/** A wild flyer's swoop (owl, bat, raven; hotel's phase-3 flyer table, built 2026-10-09): see Move. Each phase eases its height
 *  from h0 to h1 over dur seconds from at; `up` while it's out of reach (rising, circling, telegraphing, climbing, landing). */
export interface Swoop {
  phase: "circle" | "tele" | "dive" | "low" | "climb" | "land";
  at: number; dur: number; h0: number; h1: number;
  /** Its angle round its target while circling, and which way round it goes. */
  ang: number; dir: number;
  /** Dives left in this bout. */
  left: number;
  /** The dive's line: from, to (its aim plus the overshoot), and its direction. */
  fx: number; fz: number; tx: number; tz: number; dx: number; dz: number;
  /** Whom this dive has touched (once each). */
  hit?: number[];
  up: boolean;
}

/** How high a swooping flyer is at `time` (m): its phase's ease from h0 to h1 (the dive's an ease-in, falling faster as it goes). */
export function swoopHeight(s: Swoop, time: number): number {
  const k = Math.max(0, Math.min(1, (time - s.at) / Math.max(1e-6, s.dur)));
  const e = s.phase === "dive" ? k * k : k * k * (3 - 2 * k);
  return s.h0 + (s.h1 - s.h0) * e;
}
/** Out of reach: no 💌, blow, touch or talk reaches it. */
export const aloft = (c: Creature): boolean => !!c.swoop?.up;
/** Striking at her: telegraphing, diving or at its bottom (for a cap on strikes at her at once: prototype's dodge A, #587). */
export const swoopStriking = (c: Creature): boolean => !!c.swoop && (c.swoop.phase === "tele" || c.swoop.phase === "dive" || c.swoop.phase === "low");
/** The height a swooping creature is drawn at, 0 for any other (render/view/creatures.ts). */
export const flightHeight = (c: Creature, time: number): number => (c.swoop ? swoopHeight(c.swoop, time) : 0);

const LOW = 0.5; // (m: the bottom of a dive, skimming the ground)
function phase(s: Swoop, p: Swoop["phase"], time: number, dur: number, h1: number): void {
  s.h0 = swoopHeight(s, time); s.phase = p; s.at = time; s.dur = Math.max(1e-3, dur); s.h1 = h1;
  s.up = p !== "dive" && p !== "low";
}

/** It's done fighting (no target, invited, leashed, dazed, marching): it glides down to the ground over a second, out of reach meanwhile. */
export function landSwoop(c: Creature, time: number): void {
  const s = c.swoop;
  if (!s) return;
  if (s.phase === "land") { if (time >= s.at + s.dur) c.swoop = undefined; return; }
  const h = swoopHeight(s, time);
  if (h < 0.3) { c.swoop = undefined; return; }
  phase(s, "land", time, 1 / FIGHT.speed, 0);
}

/** One step of a wild flyer's swoop at its target (px, pz), moving at (tvx, tvz). `ready`: its attack is ready (a new bout may start).
 *  `may`: it may strike now (each dive's telegraph waits for it: the dodge work's cap on strikes at her at once, #587); a
 *  function is asked only as a telegraph would start (so a token is taken only then).
 *  Returns what happened this step: "tele" as it starts its telegraph, "dive" as it lets go, "low" while it can touch her (the dive and
 *  the bottom), else "air". */
export function stepSwoop(c: Creature, mv: Move, px: number, pz: number, ready: boolean, time: number, dt: number, tvx = 0, tvz = 0, may: boolean | (() => boolean) = true): "tele" | "dive" | "low" | "air" {
  const mayNow = () => (typeof may === "function" ? may() : may); // (asked only as a telegraph would start: the cap's token is taken then)
  const S = FIGHT.scale, V = FIGHT.speed, H = (mv.height ?? 8) * S, R = (mv.radius ?? 12) * S, cs = (mv.circle ?? 8) * V;
  let s = c.swoop;
  if (!s) {
    // Up it goes, from wherever it stands, round its target the shorter way.
    s = c.swoop = { phase: "circle", at: time, dur: 0.8 / V, h0: 0, h1: H, ang: Math.atan2(c.z - pz, c.x - px), dir: hash2(c.id, 3, 61) < 0.5 ? 1 : -1, left: 0, fx: 0, fz: 0, tx: 0, tz: 0, dx: 1, dz: 0, up: true };
    c.moveReadyAt = Math.max(c.moveReadyAt ?? 0, time + 1.2 / V); // (a moment aloft before its first dive)
  }
  if (s.phase === "land") phase(s, "circle", time, 0.8 / V, H); // (back into the fight from its glide down)
  const circling = (slow: number) => {
    // Round its target, wavering (a bat's erratic flight), toward its place on the circle, a little faster than it goes round.
    const wob = (mv.jitter ?? 0) * Math.sin(time * 2.7 + c.id * 1.3), r = R * (1 + wob);
    s!.ang += (s!.dir * cs * slow * dt) / Math.max(1, r);
    const ox = px + Math.cos(s!.ang) * r, oz = pz + Math.sin(s!.ang) * r, dx = ox - c.x, dz = oz - c.z, d = Math.hypot(dx, dz), step = Math.min(d, cs * 1.8 * dt);
    if (d > 1e-6) { c.x += (dx / d) * step; c.z += (dz / d) * step; c.vx = (dx / d) * (step / dt); c.vz = (dz / d) * (step / dt); c.facing = dx >= 0 ? 1 : -1; }
    c.moving = true; c.walk += dt * 6;
  };
  const done = time >= s.at + s.dur;
  switch (s.phase) {
    case "circle": {
      circling(1);
      if (!done) return "air";
      if (s.left > 0) { if (!mayNow()) return "air"; phase(s, "tele", time, (mv.windup ?? 1) / V, H * (mv.rise ?? 1)); return "tele"; } // (the rest of its bout, held up for the cap)
      if (ready && time >= (c.moveReadyAt ?? 0) && mayNow()) { s.left = Math.max(1, Math.round(mv.dives ?? 1)); phase(s, "tele", time, (mv.windup ?? 1) / V, H * (mv.rise ?? 1)); return "tele"; }
      return "air";
    }
    case "climb": {
      // Pulling back up and away along its line, slowing, then round again.
      const k = Math.max(0, 1 - (time - s.at) / s.dur), sp = (mv.speed ?? 24) * V * 0.35 * k + cs * (1 - k);
      c.x += s.dx * sp * dt; c.z += s.dz * sp * dt; c.vx = s.dx * sp; c.vz = s.dz * sp; c.moving = true; c.walk += dt * 6;
      if (done) {
        s.ang = Math.atan2(c.z - pz, c.x - px);
        if (s.left > 0 && mayNow()) { phase(s, "tele", time, (mv.windup ?? 1) / V, H * (mv.rise ?? 1)); return "tele"; }
        phase(s, "circle", time, 0.01, H); if (s.left <= 0) c.moveReadyAt = time + mv.cooldown / V;
      }
      return "air";
    }
    case "tele": {
      // Telegraphing (the owl's hoot and tuck, the bat's screech, the raven climbing): circling slowly, facing her; then it lets go.
      circling(0.4); c.facing = px >= c.x ? 1 : -1;
      if (!done) return "air";
      // Where she'll be when it gets there, as she's going now (lead of it: the dodge work's lead-at-release), and on past.
      // (the flight time to where she'll be: a few steps to the intercept, so lead 1 meets her walking straight on)
      const sp = Math.max(1, (mv.speed ?? 24) * V), lead = mv.lead ?? 0;
      let fly = Math.hypot(px - c.x, pz - c.z) / sp;
      for (let i = 0; i < 4; i++) fly = Math.hypot(px + tvx * fly * lead - c.x, pz + tvz * fly * lead - c.z) / sp;
      const ax = px + tvx * fly * lead, az = pz + tvz * fly * lead, lx = ax - c.x, lz = az - c.z, L = Math.hypot(lx, lz) || 1, past = (mv.overshoot ?? 4) * S;
      s.fx = c.x; s.fz = c.z; s.dx = lx / L; s.dz = lz / L; s.tx = ax + s.dx * past; s.tz = az + s.dz * past; s.hit = []; s.left--;
      phase(s, "dive", time, (L + past) / sp, LOW);
      c.facing = s.dx >= 0 ? 1 : -1;
      return "dive";
    }
    case "dive": {
      const k = Math.min(1, (time - s.at) / s.dur);
      c.x = s.fx + (s.tx - s.fx) * k; c.z = s.fz + (s.tz - s.fz) * k; c.vx = (s.tx - s.fx) / s.dur; c.vz = (s.tz - s.fz) / s.dur; c.moving = true; c.walk += dt * 10;
      if (done) phase(s, "low", time, (mv.bottom ?? 0.5) / V, LOW);
      return "low";
    }
    case "low": {
      // Skimming the ground at the bottom, gliding on and slowing: the moment to catch it.
      const sp = (mv.speed ?? 24) * V * 0.25;
      c.x += s.dx * sp * dt; c.z += s.dz * sp * dt; c.vx = s.dx * sp; c.vz = s.dz * sp; c.moving = true;
      if (done) phase(s, "climb", time, (mv.climb ?? 1) / V, H);
      return "low";
    }
  }
  return "air";
}

/** The leap (Stage 5: the toad): when its attack is ready and its target is between `from` and
 *  `to` metres off (times FIGHT.leap.reach), it leaps in an arc to FIGHT.leap.through metres past
 *  it (short of it if less than 0), `time` seconds in the air, landing where it aimed (step out of the ring). Returns "landed" on the step it comes down. */
export function stepLeap(c: Creature, mv: Move, px: number, pz: number, ready: boolean, time: number, tvx = 0, tvz = 0): "none" | "leapt" | "air" | "landed" {
  const L = c.leap;
  if (L) {
    const k = Math.min(1, (time - L.at) / Math.max(0.01, L.lands - L.at));
    c.x = L.fx + (L.tx - L.fx) * k; c.z = L.fz + (L.tz - L.fz) * k; c.moving = false; c.vx = 0; c.vz = 0;
    if (k >= 1) { c.leap = undefined; return "landed"; }
    return "air";
  }
  const dx = px - c.x, dz = pz - c.z, d = Math.hypot(dx, dz);
  if (ready && time >= (c.moveReadyAt ?? 0) && d >= (mv.from ?? 8) * FIGHT.scale && d <= (mv.to ?? 30) * FIGHT.leap.reach * FIGHT.scale) {
    // Where it comes down: a pounce (a strike) FIGHT.leap.through metres past its target, carrying on
    // through (short of it if less than 0); a slam (the toad's) no further than onto it, its blow all round where it lands.
    const past = Math.max(-d, (mv.strike ? FIGHT.leap.through : Math.min(0, FIGHT.leap.through)) * FIGHT.scale);
    // Leading her (Ed, 2026-10-06, walking away is no escape): it comes down where she'll be when it lands, as she's going now (FIGHT.leap.lead of it).
    const fly = (mv.time ?? 0.9) / FIGHT.speed, lead = FIGHT.leap.lead ?? 0, ax = px + tvx * fly * lead, az = pz + tvz * fly * lead;
    c.leap = { fx: c.x, fz: c.z, tx: ax + (dx / d) * past, tz: az + (dz / d) * past, at: time, lands: time + fly, height: (mv.height ?? 6) * FIGHT.scale };
    c.moveReadyAt = time + mv.cooldown; c.facing = dx >= 0 ? 1 : -1;
    return "leapt";
  }
  return "none";
}
