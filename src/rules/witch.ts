// The witch: where she is, how fast she flies, and her two modes. Ground mode is slower and
// under the trees; treetop mode is faster and above the canopy. One button rises or descends,
// which takes riseTime or descendTime: `lift` runs from 0 (ground) to 1 (treetop).
import { lakeKnobs, onLake, stopAtShore } from "./lakes";
import { clamp, lerp, smoothstep } from "./random";
import type { Tuning } from "./tuning";
import { beachOf, keepIn, softEdge, type Bounds } from "./mapShape";
import { NO_LOAD, type LeashLoad } from "./leashWeight";
import { flyOnto, keepInHouse, keepOnDeck, landsOn, noRiseAt, overDeck, type Deck } from "./treehouse";

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
  /** On the treehouse deck (rules/treehouse.ts): landing on it, standing on it (mode "ground", its floor her ground), or rising off it. */
  perch?: boolean;
  /** Falling off the balcony's open rim with no broom (rules/treehouse.ts, house.fall): seconds fallen; at fall.time she's back at the circle. */
  falling?: number;
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

/** How high (lift, 0 to 1) she holds over a lake's water, coming down: she never lands on it. */
const LAKE_HOVER = 0.3;

export const NO_INTENT: Intent = { moveX: 0, moveZ: 0, toggleMode: false };

export function newWitch(x: number, z: number): WitchState {
  return { x, z, vx: 0, vz: 0, lift: 0, mode: "ground", facing: 1, away: false, lean: false };
}

export const witchHeight = (w: WitchState, t: Tuning) => w.perch && t.treehouse.deck
  ? lerp(t.treehouse.deck.height + t.groundHeight, t.treetopHeight, smoothstep(w.lift)) // (on the deck its floor is her ground)
  : lerp(t.groundHeight, t.treetopHeight, smoothstep(w.lift));
/** How much of the canopy shows: 0 in ground mode, 1 in treetop mode. */
export const canopyShown = (w: WitchState) => smoothstep(w.lift);

/** `load`: the pull of the sigils she carries (rules/leashWeight.ts): slower away from it, a little drift toward it, a
 *  slower rise, and over the treetops a slow sink (to leash.weight.floor while she flies on; all the way, and down to
 *  the ground, if she stops or the load is extreme). */
export function stepWitch(w: WitchState, intent: Intent, dt: number, t: Tuning, bounds: Bounds, load: LeashLoad = NO_LOAD, deck: Deck | null = null): WitchState {
  if (w.seated) {
    if (!intent.toggleMode && Math.hypot(intent.moveX, intent.moveZ) < 0.1) return w;
    w = { ...w, seated: false };
  }
  if (w.stargazing) {
    // Lying on the sand she stays, still pushing out to sea or not at all; any other way (or a rise) gets her up.
    if (!intent.toggleMode && seaward(w, intent, bounds) !== false) return w.vx || w.vz ? { ...w, vx: 0, vz: 0 } : w;
    w = { ...w, stargazing: false, beachPush: 0 };
  }
  // The fall (the house, rules/treehouse.ts): off the balcony's open rim with no broom, she drops out of sight (drawing only: her
  // height stays the floor's, so the camera stays up), hits the ground below after house.fall.time (a thud: rules/game.ts) and, a
  // beat (house.fall.beat) later, is back at the magic circle. No steering meanwhile.
  if (w.falling !== undefined && deck?.house) {
    const f = w.falling + dt, F = deck.house.fall;
    if (f >= F.time + (F.beat ?? 0)) return { ...w, x: deck.house.circle.x, z: deck.house.circle.z, vx: 0, vz: 0, lift: 0, mode: "ground", falling: undefined, perch: true, lean: false, boost: 0, braking: false, away: false, heading: "side" };
    if (f >= F.time) return { ...w, vx: 0, vz: 0, falling: f, lean: false, boost: 0, braking: false }; // (down there, unseen, a moment)
    const k = Math.exp(-3 * dt);
    return { ...w, x: w.x + w.vx * dt, z: w.z + w.vz * dt, vx: w.vx * k, vz: w.vz * k, falling: f, lean: false, boost: 0, braking: false };
  }
  let { mode, lift } = w, perch = !!w.perch && !!deck && overDeck(deck, w.x, w.z); // (put somewhere else, she's off it)
  // (in the house's rooms and on its branches she can't rise, only on the Terrace: rules/treehouse.ts noRiseAt)
  if (intent.toggleMode && !(perch && mode === "ground" && deck && noRiseAt(deck, w.x, w.z))) mode = mode === "ground" || mode === "descending" ? "rising" : "descending";
  // The treehouse deck (rules/treehouse.ts): coming down from the treetops over it, she lands on it; rising takes her off it.
  if (deck && intent.toggleMode && mode === "descending" && landsOn(deck, w.x, w.z)) perch = true;
  // The house's balcony (Ed, 2026-10-14): flying in over it at treetop height, she lands on it, no button (below, once this step's
  // move is known: she must come onto it from outside, so rising straight up off it doesn't land her again at once).
  const wasOver = !!deck?.house && flyOnto(deck, w.x, w.z);
  const Wt = t.leash.weight, over = load.over, steering = Math.hypot(intent.moveX, intent.moveZ) > 0.1;
  if (mode === "rising") { lift += dt / Math.max(1e-3, t.riseTime * (1 + Wt.rise * over)); if (lift >= 1) { lift = 1; mode = "treetop"; perch = false; } }
  else if (mode === "descending") { lift -= dt / Math.max(1e-3, perch && deck?.house ? deck.house.landTime : t.descendTime); if (lift <= 0) { lift = 0; mode = "ground"; } }
  else if (mode === "treetop") {
    // Loaded, she's slowly pulled down: to the floor while she flies on (never dropped into a fight she didn't choose),
    // all the way if she stops or the load is extreme, landing; unloaded, she floats back up.
    if (over > 0) {
      // Over a lake (Ed, 2026-10-23: never down over the water from the treetops) the pull stops at its floor: she never lands there.
      const lake = !!bounds.lakes && onLake(bounds, w.x, w.z, lakeKnobs(t).pad);
      const floor = lake ? Math.max(Wt.floor, LAKE_HOVER) : steering && !load.extreme ? Wt.floor : 0;
      if (lift > floor) lift = Math.max(floor, lift - Math.min(Wt.sinkMax, Wt.sink * over) * dt);
      if (lift <= 0) { lift = 0; mode = "ground"; }
    } else if (lift < 1) lift = Math.min(1, lift + dt / Math.max(1e-3, t.riseTime));
  }

  // Never down on a lake's water (Ed, 2026-10-11: rules/lakes.ts): coming down over it, she holds a little off it, and lands
  // once she's over the shore.
  if (bounds.lakes && mode !== "rising" && mode !== "treetop" && w.mode !== "ground" && lift < LAKE_HOVER && onLake(bounds, w.x, w.z, lakeKnobs(t).pad)) { lift = LAKE_HOVER; mode = "descending"; }
  let mx = intent.moveX, mz = intent.moveZ;
  const len = Math.hypot(mx, mz);
  if (len > 1) { mx /= len; mz /= len; }
  // On foot in the house (Ed, 2026-10-21: "she shouldn't use her broom until she steps off the balcony"): she walks, at the house's
  // walk, not her broom's ground speed.
  const ground = perch && deck?.house ? deck.house.walk : t.groundSpeed;
  const L = smoothstep(lift), max = lerp(ground, t.treetopSpeed, L);
  // On the ground: snappy, straight to the input's speed (Ed: "ground should feel snappy").
  const kg = 1 - Math.exp(-t.groundAcceleration * dt);
  const gx = w.vx + (mx * ground - w.vx) * kg, gz = w.vz + (mz * ground - w.vz) * kg;
  // In the treetops: momentum (Ed: "a high top speed and more momentum"). See treetopFlight.
  const top = treetopFlight(w, mx, mz, dt, t);
  // Rising and descending blend the two, keeping her speed.
  let vx = lerp(gx, top.vx, L), vz = lerp(gz, top.vz, L);
  const boost = top.boost * L, braking = top.braking && L > 0.5;
  // Her sigils' pull (rules/leashWeight.ts): moving away from it, that part of her speed is cut (her input still steers);
  // and she drifts a little toward it (to driftShare of her top speed at an extreme load).
  let driftX = 0, driftZ = 0;
  if (over > 0) {
    const away = -(vx * load.x + vz * load.z);
    if (away > 0) { const cut = away * (1 - 1 / (1 + Wt.drag * over)); vx += load.x * cut; vz += load.z * cut; }
    const drift = Wt.drift * max * Math.min(1, over / Math.max(1e-6, Wt.extreme));
    driftX = load.x * drift; driftZ = load.z * drift;
  }
  if (bounds.land) ({ vx, vz } = softEdge(bounds, w.x, w.z, vx, vz, Math.max(max, Math.hypot(vx, vz)), t.map?.push ?? 0, t.map?.drift ?? 0)); // (the island's soft edge)
  let x = w.x + (vx + driftX) * dt, z = w.z + (vz + driftZ) * dt;
  if (bounds.land) { const p = keepIn(bounds, x, z); if (p.x !== x || p.z !== z) { const n = bounds.land.inward(p.x, p.z), out = -(vx * n.x + vz * n.z); if (out > 0) { vx += n.x * out; vz += n.z * out; } x = p.x; z = p.z; } }
  else {
    if (x < bounds.minX || x > bounds.maxX) { x = clamp(x, bounds.minX, bounds.maxX); vx = 0; }
    if (z < bounds.minZ || z > bounds.maxZ) { z = clamp(z, bounds.minZ, bounds.maxZ); vz = 0; }
  }
  // On foot, a lake's shore stops her (sliding along it).
  if (mode === "ground" && bounds.lakes) {
    const q = stopAtShore(bounds, w.x, w.z, x, z, lakeKnobs(t).pad, 0);
    if (q) { const into = -(vx * q.nx + vz * q.nz); if (into < 0) { vx += q.nx * into; vz += q.nz * into; } x = q.x; z = q.z; }
  }
  // On foot, the zoo's gold fences stop her too (Ed, 2026-10-26: "the witch can fly over the fence, not walk"): sliding along.
  if (mode === "ground" && bounds.fence) {
    const q = bounds.fence.stop(w.x, w.z, x, z);
    if (q) { const into = vx * q.nx + vz * q.nz; if (into > 0) { vx -= q.nx * into; vz -= q.nz * into; } x = q.x; z = q.z; }
  }
  if (deck?.house && !perch && mode === "treetop" && lift > 0.9 && !wasOver && flyOnto(deck, x, z)) { perch = true; mode = "descending"; }
  // On the deck (or coming down onto it): kept on it, inside its rail, round the map table and behind the decks. In the house
  // (rules/treehouse.ts keepInHouse): kept in by the hub's wall and the balcony's sides, but out over the balcony's open rim on
  // foot she's off: flying again (rising, as the button would), or falling with no broom (house.fall).
  let falling: number | undefined;
  if (perch && deck && mode !== "rising" && mode !== "treetop") {
    const p = deck.house ? keepInHouse(deck, x, z) : { ...keepOnDeck(deck, x, z), off: false };
    if (p.off && mode === "ground") { if (deck.house!.fall.on) falling = 0; else mode = "rising"; }
    else if (p.x !== x || p.z !== z) { if (mode === "ground") { vx = (p.x - w.x) / Math.max(dt, 1e-6); vz = (p.z - w.z) / Math.max(dt, 1e-6); } x = p.x; z = p.z; }
  }
  const facing: 1 | -1 = vx > 0.3 ? 1 : vx < -0.3 ? -1 : w.facing;
  const speed = Math.hypot(vx, vz), away = facingAway(vx, vz, w.away, Math.max(1, max * 0.15), t), heading = headingOf(vx, vz, w.heading, Math.max(1, max * 0.15), t);
  const next: WitchState = { x, z, vx, vz, lift, mode, facing, away, heading, lean: speed > max * t.leanAt, boost, braking, ...(perch ? { perch: true } : {}), ...(falling !== undefined ? { falling } : {}) };
  if (perch) return next; // (no beach up here)
  // Flying on out over the beach (Ed, 2026-10-06: "If you try and fly past the beach, you land and stargaze"): pushing seaward
  // against the edge's soft hold, on the sand, for restAfter seconds, she comes down (from the treetops too) and, landed, lies down.
  const B = t.beach, beach = B?.on ? beachOf(bounds, t) : null;
  const held = beach && beach.intoSand(x, z) > 0 && beach.land.distAt(x, z) < (t.map?.push ?? 0) * 0.6; // (on the sand, where the edge is holding her back)
  if (held && seaward(next, intent, bounds)) {
    next.beachPush = (w.beachPush ?? 0) + dt;
    if (next.beachPush >= B!.restAfter) {
      if (mode === "treetop" || mode === "rising") next.mode = "descending";
      else if (mode === "ground") Object.assign(next, { stargazing: true, vx: 0, vz: 0, lean: false, boost: 0, braking: false, away: false, heading: "side" });
    }
  } else if (w.beachPush) next.beachPush = 0;
  return next;
}

/** Is she being steered on out to sea (within 60 degrees of straight out to the water)? undefined: not steered at all. */
export function seaward(w: { x: number; z: number }, intent: Intent, bounds: Bounds): boolean | undefined {
  const L = bounds.land, m = Math.hypot(intent.moveX, intent.moveZ);
  if (!L || m < 0.1) return undefined;
  const n = L.inward(w.x, w.z);
  return -(intent.moveX * n.x + intent.moveZ * n.z) / m > 0.5;
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
