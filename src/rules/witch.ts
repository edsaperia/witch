// The witch: where she is, how fast she flies, and her two modes. Ground mode is slower and
// under the trees; treetop mode is faster and above the canopy. One button rises or descends,
// which takes riseTime or descendTime: `lift` runs from 0 (ground) to 1 (treetop).
import { clamp, lerp, smoothstep } from "./random";
import type { Tuning } from "./tuning";
import { beachOf, keepIn, softEdge, type Bounds } from "./mapShape";

export type Mode = "ground" | "rising" | "treetop" | "descending";

export interface WitchState {
  x: number;
  z: number;
  vx: number;
  vz: number;
  /** 0 on the ground, 1 at the treetops; eased for height and speed. */
  lift: number;
  mode: Mode;
  /** 1 facing right (east), -1 facing left. */
  facing: 1 | -1;
  /** Turned away from the viewer: only while clearly flying up the screen (see facingAway). */
  away: boolean;
  /** Flying straight up the screen ("up": seen from behind) or straight down it ("down": coming at
   *  us), within facing.heading degrees of the vertical (see headingOf); otherwise "side". */
  heading?: Heading;
  /** Leaning into fast flight: above leanAt of the mode's top speed. */
  lean: boolean;
  /** Treetop boost: 0 at cruise, 1 at full boost (treetop.boost times cruise). */
  boost?: number;
  /** Slowing hard in the treetops (a sharp turn or reversal bleeding speed): the brake pose. */
  braking?: boolean;
  /** Sitting on the treehouse terrace (the start), until the first move or rise. */
  seated?: boolean;
  /** Lying on the beach looking at the stars (the tuning's beach): she flew on out over the sand, so landed; any other way gets her up. */
  stargazing?: boolean;
  /** How long she's been pushing on out over the sand (seconds). */
  beachPush?: number;
}

/** What the player asks for this frame: a direction (length up to 1) and button presses. */
export interface Intent {
  moveX: number;
  moveZ: number;
  /** Rise or descend was pressed this frame. */
  toggleMode: boolean;
}

/** Towards the viewer unless clearly heading up the screen (Ed, 2026-10-03): away only while the
 *  heading is within the away cone round straight up (entering at awayEnter degrees, leaving at
 *  awayLeave, so diagonals don't flicker) and moving faster than `minSpeed`. Sideways, downward
 *  or stopped: towards. For the witch and the creatures alike. */
export function facingAway(vx: number, vz: number, wasAway: boolean, minSpeed: number, t: Tuning): boolean {
  if (Math.hypot(vx, vz) < minSpeed || vz >= 0) return false;
  const angle = (Math.atan2(Math.abs(vx), -vz) * 180) / Math.PI; // 0 straight up the screen
  return angle < (wasAway ? t.facing.awayLeave : t.facing.awayEnter);
}

export type Heading = "side" | "up" | "down";

/** Straight up or down the screen (Ed, #27: her heading sprites), with hysteresis: entering within
 *  facing.headingEnter degrees of the vertical, leaving past headingLeave, and only above minSpeed. */
export function headingOf(vx: number, vz: number, was: Heading | undefined, minSpeed: number, t: Tuning): Heading {
  if (Math.hypot(vx, vz) < minSpeed) return "side";
  const off = (Math.atan2(Math.abs(vx), Math.abs(vz)) * 180) / Math.PI, want: Heading = vz < 0 ? "up" : "down"; // off: degrees from the vertical
  return off < (was === want ? t.facing.headingLeave : t.facing.headingEnter) ? want : "side";
}

export const NO_INTENT: Intent = { moveX: 0, moveZ: 0, toggleMode: false };

export function newWitch(x: number, z: number): WitchState {
  return { x, z, vx: 0, vz: 0, lift: 0, mode: "ground", facing: 1, away: false, lean: false };
}

export const witchHeight = (w: WitchState, t: Tuning) => lerp(t.groundHeight, t.treetopHeight, smoothstep(w.lift));
/** How much of the canopy shows: 0 in ground mode, 1 in treetop mode. */
export const canopyShown = (w: WitchState) => smoothstep(w.lift);

export function stepWitch(w: WitchState, intent: Intent, dt: number, t: Tuning, bounds: Bounds): WitchState {
  if (w.seated) {
    if (!intent.toggleMode && Math.hypot(intent.moveX, intent.moveZ) < 0.1) return w;
    w = { ...w, seated: false };
  }
  if (w.stargazing) {
    // Lying on the sand she stays, still pushing out to sea or not at all; any other way (or a rise) gets her up.
    if (!intent.toggleMode && seaward(w, intent, bounds) !== false) return w.vx || w.vz ? { ...w, vx: 0, vz: 0 } : w;
    w = { ...w, stargazing: false, beachPush: 0 };
  }
  let { mode, lift } = w;
  if (intent.toggleMode) mode = mode === "ground" || mode === "descending" ? "rising" : "descending";
  if (mode === "rising") { lift += dt / Math.max(1e-3, t.riseTime); if (lift >= 1) { lift = 1; mode = "treetop"; } }
  else if (mode === "descending") { lift -= dt / Math.max(1e-3, t.descendTime); if (lift <= 0) { lift = 0; mode = "ground"; } }

  let mx = intent.moveX, mz = intent.moveZ;
  const len = Math.hypot(mx, mz);
  if (len > 1) { mx /= len; mz /= len; }
  const L = smoothstep(lift), max = lerp(t.groundSpeed, t.treetopSpeed, L);
  // On the ground: snappy, straight to the input's speed (Ed: "ground should feel snappy").
  const kg = 1 - Math.exp(-t.groundAcceleration * dt);
  const gx = w.vx + (mx * t.groundSpeed - w.vx) * kg, gz = w.vz + (mz * t.groundSpeed - w.vz) * kg;
  // In the treetops: momentum (Ed: "a high top speed and more momentum"). See treetopFlight.
  const top = treetopFlight(w, mx, mz, dt, t);
  // Rising and descending blend the two, keeping her speed.
  let vx = lerp(gx, top.vx, L), vz = lerp(gz, top.vz, L);
  const boost = top.boost * L, braking = top.braking && L > 0.5;
  if (bounds.circle) ({ vx, vz } = softEdge(bounds, w.x, w.z, vx, vz, Math.max(max, Math.hypot(vx, vz)), t.map?.push ?? 0, t.map?.drift ?? 0)); // (the circular map's soft edge)
  let x = w.x + vx * dt, z = w.z + vz * dt;
  if (bounds.circle) { const p = keepIn(bounds, x, z); if (p.x !== x || p.z !== z) { const c = bounds.circle, nx = (p.x - c.x) / c.r, nz = (p.z - c.z) / c.r, out = vx * nx + vz * nz; if (out > 0) { vx -= nx * out; vz -= nz * out; } x = p.x; z = p.z; } }
  else {
    if (x < bounds.minX || x > bounds.maxX) { x = clamp(x, bounds.minX, bounds.maxX); vx = 0; }
    if (z < bounds.minZ || z > bounds.maxZ) { z = clamp(z, bounds.minZ, bounds.maxZ); vz = 0; }
  }
  const facing: 1 | -1 = vx > 0.3 ? 1 : vx < -0.3 ? -1 : w.facing;
  const speed = Math.hypot(vx, vz), away = facingAway(vx, vz, w.away, Math.max(1, max * 0.15), t), heading = headingOf(vx, vz, w.heading, Math.max(1, max * 0.15), t);
  const next: WitchState = { x, z, vx, vz, lift, mode, facing, away, heading, lean: speed > max * t.leanAt, boost, braking };
  // Flying on out over the beach (Ed, 2026-10-06: "If you try and fly past the beach, you land and stargaze"): pushing seaward
  // against the edge's soft hold, on the sand, for restAfter seconds, she comes down (from the treetops too) and, landed, lies down.
  const B = t.beach, beach = B?.on ? beachOf(bounds, t) : null;
  const held = beach && beach.intoSand(x, z) > 0 && Math.hypot(x - beach.x, z - beach.z) > beach.edge(Math.atan2(z - beach.z, x - beach.x)) - (t.map?.push ?? 0) * 0.6; // (on the sand, where the edge is holding her back)
  if (held && seaward(next, intent, bounds)) {
    next.beachPush = (w.beachPush ?? 0) + dt;
    if (next.beachPush >= B!.restAfter) {
      if (mode === "treetop" || mode === "rising") next.mode = "descending";
      else if (mode === "ground") Object.assign(next, { stargazing: true, vx: 0, vz: 0, lean: false, boost: 0, braking: false, away: false, heading: "side" });
    }
  } else if (w.beachPush) next.beachPush = 0;
  return next;
}

/** Is she being steered on out to sea (within 60 degrees of straight out from the circle's middle)? undefined: not steered at all. */
function seaward(w: { x: number; z: number }, intent: Intent, bounds: Bounds): boolean | undefined {
  const c = bounds.circle, m = Math.hypot(intent.moveX, intent.moveZ);
  if (!c || m < 0.1) return undefined;
  const d = Math.hypot(w.x - c.x, w.z - c.z) || 1;
  return (intent.moveX * (w.x - c.x) + intent.moveZ * (w.z - c.z)) / (d * m) > 0.5;
}

/** Treetop flight with momentum: pressing a direction reaches cruise (treetopSpeed) quickly;
 *  holding it within treetop.boostAngle builds boost over boostTime, up to treetop.boost times
 *  cruise; her heading turns toward the input at no more than turnRate degrees a second (slower
 *  at boost), so she swoops in arcs; a sharp turn or a reversal bleeds the boost fast (and she
 *  brakes); letting go, she glides to a stop over about glideTime. */
export function treetopFlight(w: WitchState, mx: number, mz: number, dt: number, t: Tuning): { vx: number; vz: number; boost: number; braking: boolean } {
  const T = t.treetop, m = Math.min(1, Math.hypot(mx, mz)), s = Math.hypot(w.vx, w.vz);
  let boost = w.boost ?? 0, braking = false;
  if (m < 0.1) {
    // Gliding: speed and boost fade over glideTime (to about 5%).
    const k = Math.exp((-3 * dt) / Math.max(0.05, T.glideTime));
    return { vx: w.vx * k, vz: w.vz * k, boost: boost * k, braking: false };
  }
  const dx = mx / m, dz = mz / m;
  let hx = dx, hz = dz;
  let ang = 0;
  if (s > 2) {
    // Turn the heading toward the input, at a limited rate.
    const cx = w.vx / s, cz = w.vz / s;
    ang = Math.acos(clamp(cx * dx + cz * dz, -1, 1));
    // Slow (under sharpTurnSpeed of cruise), she turns crisply, at turnRateSlow; at cruise, at
    // turnRate; boosting, slower still (Ed: the size of the skid should depend on how fast she's going).
    const pace = clamp((s / t.treetopSpeed - T.sharpTurnSpeed) / Math.max(0.05, 1 - T.sharpTurnSpeed), 0, 1), deg0 = T.turnRateSlow + (T.turnRate - T.turnRateSlow) * pace;
    const cross = cx * dz - cz * dx, rate = ((deg0 * (1 - 0.5 * boost)) * Math.PI) / 180, turn = Math.min(ang, rate * dt) * (cross >= 0 ? 1 : -1);
    const c = Math.cos(turn), sn = Math.sin(turn);
    hx = cx * c - cz * sn; hz = cx * sn + cz * c;
  }
  const deg = (ang * 180) / Math.PI;
  if (deg <= T.boostAngle) boost = Math.min(1, boost + dt / Math.max(0.05, T.boostTime));
  else if (deg >= 90) { boost = Math.max(0, boost - dt * T.sharpTurnBleed); braking = s > t.treetopSpeed * T.brakeAt; }
  // Between, the boost bleeds the more the sharper the turn.
  else boost = Math.max(0, boost - dt * Math.max(0.5, (T.sharpTurnBleed * (deg - T.boostAngle)) / (90 - T.boostAngle)));
  // Turning hard, she doesn't speed up along her old heading (so a slow about-face stays tight).
  const target = deg >= 90 ? Math.min(s, t.treetopSpeed * (1 + (T.boost - 1) * boost) * m) : t.treetopSpeed * (1 + (T.boost - 1) * boost) * m;
  // Reaching cruise takes about 0.3 s; above it, the boost sets the pace. Turning hard bleeds speed.
  const k = 1 - Math.exp(-t.acceleration * dt * (deg >= 90 ? T.sharpTurnBleed : 1));
  const speed = s + (target - s) * k;
  return { vx: hx * speed, vz: hz * speed, boost, braking };
}
