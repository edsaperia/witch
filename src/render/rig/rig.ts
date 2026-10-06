// The live rig (#79 stage 5): a creature put together each frame from its baked parts (rigBuild.ts)
// and driven by how it moves. Pure maths, no Three.js: rigView.ts draws what this lays out.
//   A four-legged body: its torso, head and tail pieces at the nearest of eight headings; each leg
//   a two-bone chain (analytic IK) from its hip to a foot that steps on a gait schedule (a trot:
//   each leg's phase offset, a duty factor sliding from walk to run with speed), its bones drawn
//   as discs; the body leans into acceleration, crouches before a charge, stretches out during one
//   and tucks its legs in a leap; its tail swings out on turns (a lagging chain).
//   A serpent: a chain of discs, each following the one ahead at its spacing (follow the leader),
//   the head weaving side to side as it goes, its neck rising to its baked head.
// Units: positions in metres (world x right, z toward the camera, y up); the parts' model units are
// turned into metres by u2m (the sprite's pixels per unit times metres per pixel times its scale).
import type { RigMeta, RigPiece } from "./rigBuild";

export const RIG_HEADINGS = [-Math.PI / 2, -Math.PI / 4, 0, Math.PI / 4, Math.PI / 2];
/** A heading (radians: 0 right, a quarter turn toward the camera) as a baked heading and a mirror. */
export function rigDirection(h: number): { i: number; flip: boolean; a: number } {
  let a = Math.atan2(Math.sin(h), Math.cos(h)), flip = false;
  if (Math.abs(a) > Math.PI / 2) { a = Math.sign(a) * Math.PI - a; flip = true; }
  const i = Math.max(0, Math.min(4, Math.round((a + Math.PI / 2) / (Math.PI / 4))));
  return { i, flip, a: RIG_HEADINGS[i] };
}
/** A model-space point (x forward, y up, z the near side) in world metres from the body's origin,
 *  for baked heading a (mirrored or not), at u2m metres per unit. */
export function rigWorld(p: ArrayLike<number>, a: number, flip: boolean, u2m: number, out: number[] = [0, 0, 0]): number[] {
  const c = Math.cos(a), s = Math.sin(a), x = p[0], z = p[2];
  const wx = x * c - z * s;
  out[0] = (flip ? -wx : wx) * u2m; out[1] = p[1] * u2m; out[2] = (x * s + z * c) * u2m;
  return out;
}

/** Two-bone IK in a plane: the knee for a hip at (hx, hy), a foot target (fx, fy), bones l1 and
 *  l2, bending to the side `bend` (+1 or -1). The target is pulled in when out of reach. */
export function ik2(hx: number, hy: number, fx: number, fy: number, l1: number, l2: number, bend: number): [number, number, number, number] {
  let dx = fx - hx, dy = fy - hy, d = Math.hypot(dx, dy);
  const max = (l1 + l2) * 0.999, min = Math.abs(l1 - l2) * 1.001 + 1e-6;
  if (d > max) { dx *= max / d; dy *= max / d; d = max; }
  if (d < min) { const k = d ? min / d : 0; dx = d ? dx * k : 0; dy = d ? dy * k : -min; d = min; }
  const a = Math.acos(Math.max(-1, Math.min(1, (l1 * l1 + d * d - l2 * l2) / (2 * l1 * d)))), base = Math.atan2(dy, dx), t = base + bend * a;
  return [hx + Math.cos(t) * l1, hy + Math.sin(t) * l1, hx + dx, hy + dy];
}

/** Follow the leader: node i keeps `gap` from node i - 1 (nodes are x, y, z triples), node 0 set by the caller. */
export function followChain(nodes: Float32Array, n: number, gap: number): void {
  for (let i = 1; i < n; i++) {
    const o = i * 3, p = o - 3, dx = nodes[o] - nodes[p], dy = nodes[o + 1] - nodes[p + 1], dz = nodes[o + 2] - nodes[p + 2], d = Math.hypot(dx, dy, dz) || 1e-6;
    nodes[o] = nodes[p] + (dx / d) * gap; nodes[o + 1] = nodes[p + 1] + (dy / d) * gap; nodes[o + 2] = nodes[p + 2] + (dz / d) * gap;
  }
}

/** Gait: the share of the cycle each foot is down (above a half a walk, below a run) by speed in body lengths a second. */
export const dutyFactor = (speedBodies: number, walk = 0.65, run = 0.35) => walk + (run - walk) * Math.min(1, Math.max(0, (speedBodies - 0.6) / 2));
/** Where a foot is in its cycle (0..1, the leg's own phase): forward offset (-0.5..0.5 of the
 *  stride) and lift (0 down, up to 1 at the top of its swing). */
export function footCycle(phase: number, duty: number): [number, number] {
  const p = ((phase % 1) + 1) % 1;
  if (p < duty) return [0.5 - p / duty, 0]; // planted: sliding back under the body as it goes
  const q = (p - duty) / (1 - duty);
  return [-0.5 + q, Math.sin(q * Math.PI)]; // swinging forward, lifted
}

/** How the body moves this frame: given by the view from the creature's state. */
export interface RigDrive {
  /** Crouching for a charge or a leap, 0..1. */ crouch: number;
  /** Charging: stretched out, at a run. */ charging: boolean;
  /** In the air (a leap), 0..1 of its arc's height: legs tucked. */ air: number;
  /** Tapping a front foot on the beat while it stands (a party animal): -1..1, the far (−) or near (+) one lifted. */ tap?: number;
}
/** What the rig lays out: a piece or a disc of the atlas, its pivot's world position (metres from
 *  the creature's place on the ground) and a nudge toward the camera (model units) to settle which
 *  of two pieces at the same depth is in front (the head over the torso, the tail behind it). */
export interface RigItem { piece: RigPiece; x: number; y: number; z: number; flip: boolean; bias: number }
/** Where the rig lays its items: a pool reused from frame to frame (no garbage for hundreds of creatures). */
export class RigOut {
  readonly items: RigItem[] = [];
  n = 0;
  reset(): void { this.n = 0; }
  push(piece: RigPiece, x: number, y: number, z: number, flip: boolean, bias: number): void {
    let it = this.items[this.n];
    if (!it) this.items[this.n] = it = { piece, x, y, z, flip, bias };
    else { it.piece = piece; it.x = x; it.y = y; it.z = z; it.flip = flip; it.bias = bias; }
    this.n++;
  }
}

const N_SPINE = 12, HOOF = 23; // HOOF: art/core.js M.NOSE, the hooves' dark horn
/** One creature's rig: the state it carries from frame to frame. */
export class RigBody {
  private init = false;
  x = 0; z = 0; heading = 0; speed = 0; accel = 0; turn = 0; phase = 0;
  private headOff = 0; private sway = 0; private weave = 0; private laid = false;
  /** Each leg's foot where it was put down (world x, z from the creature's place's origin), while it's planted. */
  private plant = new Float32Array(8); private planted = new Uint8Array(4);
  /** Each foot as drawn this frame: world x, z, and 1 while it's planted (for measuring slide). */
  readonly feet = new Float32Array(12);
  readonly tail = new Float32Array(9);
  readonly spine = new Float32Array(N_SPINE * 3);
  // the point last put in the world (world()): metres from the creature's place
  private wx = 0; private wy = 0; private wz = 0;
  private world(x: number, y: number, z: number, a: number, flip: boolean, u2m: number): void {
    const c = Math.cos(a), s = Math.sin(a), X = x * c - z * s;
    this.wx = (flip ? -X : X) * u2m; this.wy = y * u2m; this.wz = (x * s + z * c) * u2m;
  }

  /** Moves the rig on to the creature's place (x, z) after dt seconds; heading from its velocity
   *  if it has one (vx, vz) or from how it moved. */
  update(x: number, z: number, dt: number, vx?: number, vz?: number): void {
    if (!this.init || dt <= 0 || dt > 0.5) {
      if (!this.init) { this.heading = vx || vz ? Math.atan2(vz ?? 0, vx ?? 0) : 0; this.init = true; }
      this.x = x; this.z = z; return;
    }
    const mx = (x - this.x) / dt, mz = (z - this.z) / dt, ux = vx ?? mx, uz = vz ?? mz, sp = Math.hypot(ux, uz);
    const k = 1 - Math.exp(-dt * 10), was = this.speed;
    this.speed += (sp - this.speed) * k;
    this.accel += ((this.speed - was) / dt - this.accel) * (1 - Math.exp(-dt * 6));
    if (sp > 0.15) {
      const want = Math.atan2(uz, ux), d = Math.atan2(Math.sin(want - this.heading), Math.cos(want - this.heading)), turn = d * Math.min(1, dt * 8);
      this.heading += turn;
      this.turn += (turn / dt - this.turn) * k;
    } else this.turn *= 1 - k;
    this.x = x; this.z = z;
  }

  /** A four-legged body's parts this frame, pushed to `out`. u2m: metres per model unit. */
  quadruped(m: RigMeta, u2m: number, dt: number, drive: RigDrive, out: RigOut): void {
    const { i, flip, a } = rigDirection(this.heading), len = Math.max(0.3, m.len) * 2, legLen = m.legs.length ? Math.hypot(m.legs[0].hip[0] - m.legs[0].foot[0], m.legs[0].hip[1] - m.legs[0].foot[1]) : 0.6;
    // the gait: the cycle's clock by stride, its duty factor by speed (body lengths a second)
    const v = this.speed / u2m, bodies = v / len, duty = drive.charging ? 0.3 : dutyFactor(bodies), stride = Math.min(legLen * 0.9, 0.25 + v * 0.18);
    const go = Math.min(1, v / 0.4); // how much it's walking (feet step) vs standing (feet under the hips)
    // the cycle runs by distance, not time: a planted foot sweeps back one stride (stride × go) in the share `duty` of a cycle,
    // as far as the body goes in that time, so the stride matches its speed over the ground and stops when it stops
    if (v > 0.05) this.phase += (dt * v * duty) / Math.max(0.05, stride * Math.max(0.25, go));
    // lean, crouch, stretch: the head runs ahead into acceleration and the body sinks when braking or crouching
    const acc = Math.max(-1, Math.min(1, this.accel / u2m / 6));
    this.headOff += ((drive.charging ? 0.14 : 0) + acc * 0.08 - this.headOff) * Math.min(1, dt * 8);
    const sink = drive.crouch * 0.16 + Math.max(0, -acc) * 0.04, bob = go * Math.abs(Math.sin(this.phase * Math.PI * 2)) * 0.025;
    const bodyY = -sink + bob + drive.air * 0.05;
    const at = (piece: RigPiece | null | undefined, x: number, y: number, z: number, bias: number) => { if (!piece) return; this.world(x, y, z, a, flip, u2m); out.push(piece, this.wx, this.wy, this.wz, flip, bias); };
    at(m.torso[i], 0, bodyY, 0, 0);
    at(m.head[i], m.neck[0] + this.headOff, m.neck[1] + bodyY - drive.crouch * 0.12 - Math.max(0, acc) * 0.04, m.neck[2], a < -0.1 ? -0.05 : 0.05); // in front of the torso, unless walking away
    // the tail swings out on turns: a lagging point behind its base, the piece nudged toward it
    this.sway += (Math.max(-1, Math.min(1, -this.turn * 0.35)) * (drive.charging ? 0.3 : 1) - this.sway) * Math.min(1, dt * 5);
    at(m.tail[i], m.tailAt[0], m.tailAt[1] + bodyY, m.tailAt[2] + this.sway * 0.25 * (flip ? -1 : 1), a > 0.1 ? -0.05 : 0.05); // behind, unless walking away
    // the legs: each foot on its own phase (a trot: diagonal pairs together), IK to the knee, bones as discs
    for (let k = 0; k < m.legs.length; k++) {
      const L = m.legs[k], [fwd, lift] = footCycle(this.phase + (TROT[L.name] ?? 0), duty);
      const hipY = L.hip[1] + bodyY, tuck = drive.air * legLen * 0.45;
      const tapping = L.fore && drive.tap ? (drive.tap > 0) === (L.side > 0) ? Math.abs(drive.tap) * (1 - go) : 0 : 0; // its shoe tapping while it stands
      let fx = L.foot[0] + fwd * stride * go + (drive.charging && !L.fore ? -0.08 : 0), fy = L.foot[1] + lift * 0.14 * go + tuck + tapping * 0.09;
      const z = L.hip[2]; let fz = z;
      // planted: a foot on the ground stays where it was put down (in the world) while the body goes on over it; lifted, it swings
      // to its next place. (Not in the air or tapping, and only while walking: standing, the feet settle under the hips.)
      const stance = k < 4 && lift === 0 && go > 0.05 && !drive.air && !tapping;
      if (stance) {
        if (!this.planted[k]) { this.world(fx, 0, z, a, flip, u2m); this.plant[k * 2] = this.x + this.wx; this.plant[k * 2 + 1] = this.z + this.wz; this.planted[k] = 1; }
        else { // the planted spot back in model space for the drawn heading (rigWorld undone): along it and across it
          const ca = Math.cos(a), sa = Math.sin(a), X = ((flip ? -1 : 1) * (this.plant[k * 2] - this.x)) / u2m, W = (this.plant[k * 2 + 1] - this.z) / u2m;
          const px = X * ca + W * sa, pz = -X * sa + W * ca;
          if (Math.abs(px - L.foot[0]) > stride + 0.05 || Math.abs(pz - z) > stride * 0.6 + 0.05) this.planted[k] = 0; // left far behind (a sharp turn, a jump): it lets go and steps
          else { fx = px; fz = pz; }
        }
      } else if (k < 4) this.planted[k] = 0;
      if (k < 4) { this.world(fx, 0, fz, a, flip, u2m); this.feet[k * 3] = this.x + this.wx; this.feet[k * 3 + 1] = this.z + this.wz; this.feet[k * 3 + 2] = this.planted[k]; }
      const l1 = Math.hypot(L.hip[0] - L.knee[0], L.hip[1] - L.knee[1]), l2 = Math.hypot(L.knee[0] - L.foot[0], L.knee[1] - L.foot[1]);
      const restBend = Math.sign((L.knee[0] - L.hip[0]) * (L.foot[1] - L.hip[1]) - (L.knee[1] - L.hip[1]) * (L.foot[0] - L.hip[0])) || (L.fore ? -1 : 1);
      const [kx, ky, ex, ey] = ik2(L.hip[0], hipY, fx, fy, l1, l2, -restBend);
      const near = L.side > 0, discs = discLut(m, L.mat);
      const bias = near ? 0.02 : -0.02;
      const kz = (z + fz) / 2; // (the knee halfway across to a foot planted off the hip's line)
      // thigh into shin into foot: the thigh full at the hip (blending into the body) tapering to the knee; a hind leg bends
      // again at the hock, back from the line knee-to-foot, its cannon bone slim and upright down to the foot
      this.bone(discs, L.hip[0], hipY, kx, ky, z, L.r[0] * 1.1, L.r[1], a, flip, u2m, m.s, bias, out, kz);
      if (!L.fore) {
        const dx = ex - kx, dy = ey - ky, l = Math.hypot(dx, dy) || 1, back = 0.16 * l * (1 - 0.5 * drive.air);
        const hx = kx + dx * 0.55 - Math.abs(dy / l) * back, hy = ky + dy * 0.55 + Math.abs(dx / l) * back * 0.3, hz = kz + (fz - kz) * 0.55;
        this.bone(discs, kx, ky, hx, hy, kz, L.r[1], (L.r[1] + L.r[2]) / 2, a, flip, u2m, m.s, bias, out, hz);
        this.bone(discs, hx, hy, ex, ey, hz, (L.r[1] + L.r[2]) / 2 * 0.9, L.r[2], a, flip, u2m, m.s, bias, out, fz);
      } else this.bone(discs, kx, ky, ex, ey, kz, L.r[1], L.r[2], a, flip, u2m, m.s, bias, out, fz);
      const fp = m.shoe?.[i] ?? pickDisc(L.hoof && m.discs[HOOF] ? discLut(m, HOOF) : discs, L.fl * 0.9 * m.s); // a party animal's shoe, else its hoof or paw
      if (fp) { this.world(ex + L.fl * 0.5, ey, fz, a, flip, u2m); out.push(fp, this.wx, this.wy, this.wz, flip, bias + (m.shoe ? 0.01 : 0)); }
    }
  }

  /** A bone from (x0, y0) to (x1, y1) at side z, as discs from radius r0 to r1 (model units). */
  private bone(discs: (RigPiece | undefined)[], x0: number, y0: number, x1: number, y1: number, z: number, r0: number, r1: number, a: number, flip: boolean, u2m: number, s: number, bias: number, out: RigOut, z1 = z): void {
    // discs every 0.7 of a radius (in pixels; eight at most): overlapping that closely their edges run straight, one smooth tapering limb,
    // not a string of beads (Ed's playtest, 2026-10-06: "creature legs look like a string of balls")
    const len = Math.hypot(x1 - x0, y1 - y0), n = Math.max(2, Math.min(8, Math.ceil((len * s) / Math.max(1, Math.min(r0, r1) * s * 0.7))));
    for (let k = 0; k <= n; k++) {
      const t = k / n, r = r0 + (r1 - r0) * t, d = pickDisc(discs, r * s);
      if (!d) continue;
      this.world(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, z + (z1 - z) * t, a, flip, u2m);
      out.push(d, this.wx, this.wy, this.wz, flip, bias);
    }
  }

  /** A serpent's parts this frame: its body chain following its head, its head at the front. */
  serpent(m: RigMeta, u2m: number, dt: number, drive: RigDrive, out: RigOut): void {
    const sp = m.spine, { ground, segLen } = spineOf(m);
    const gap = segLen * u2m * (drive.charging ? 1.15 : 1); // stretched out in a charge
    // the head weaves side to side as it goes (more the faster), the body follows its path
    const v = this.speed / u2m;
    this.weave += dt * (2 + v * 3);
    const lat = Math.sin(this.weave) * Math.min(1, v / 0.6) * 0.12 * u2m * (drive.charging ? 0.3 : 1), h = this.heading;
    this.spine[0] = this.x - Math.sin(h) * lat; this.spine[2] = this.z + Math.cos(h) * lat; this.spine[1] = 0;
    if (!this.laid) { // first seen: laid out straight behind its head, at its spacing (or the chain folds up)
      for (let k = 1; k < N_SPINE; k++) { this.spine[k * 3] = this.spine[0] - Math.cos(h) * gap * k; this.spine[k * 3 + 1] = 0; this.spine[k * 3 + 2] = this.spine[2] - Math.sin(h) * gap * k; }
      this.laid = true;
    }
    followChain(this.spine, N_SPINE, gap);
    const discs = discLut(m, 1);
    for (let k = 0; k < N_SPINE; k++) {
      const t = 1 - k / (N_SPINE - 1), r = radiusAt(ground, t), d = pickDisc(discs, r * m.s);
      if (d) out.push(d, this.spine[k * 3] - this.x, r * u2m * (1 - drive.crouch * 0.3), this.spine[k * 3 + 2] - this.z, false, 0);
    }
    // the neck rises from the front of the body to the head, held lower in a crouch, thrust forward in a charge
    const { i, flip, a } = rigDirection(h), hp = m.headAt, reach = (drive.charging ? 0.2 : 0) + drive.crouch * -0.1;
    const neck0 = sp[12], tx = hp[0] + reach - ground[12][0], ty = hp[1] * (1 - drive.crouch * 0.5);
    for (let k = 1; k <= 4; k++) {
      const t = k / 5, d = pickDisc(discs, (neck0[3] + (0.07 - neck0[3]) * t) * m.s);
      if (!d) continue;
      this.world(tx * t, neck0[1] + (ty - neck0[1]) * t, 0, a, flip, u2m);
      out.push(d, this.wx, this.wy, this.wz, false, 0.01);
    }
    const piece = m.head[i];
    if (piece) { this.world(tx, ty, 0, a, flip, u2m); out.push(piece, this.wx, this.wy, this.wz, flip, 0.05); }
  }
}

/** A trot: each leg's phase offset, the diagonal pairs together. */
const TROT: Record<string, number> = { legFN: 0, legHF: 0, legFF: 0.5, legHN: 0.5 };
// A material's discs by radius in whole pixels (each the nearest baked one), worked out once per rig page.
const luts = new WeakMap<RigMeta, Map<number, (RigPiece | undefined)[]>>();
function discLut(m: RigMeta, mat: number): (RigPiece | undefined)[] {
  let byMat = luts.get(m);
  if (!byMat) luts.set(m, (byMat = new Map()));
  let lut = byMat.get(mat);
  if (!lut) {
    const discs = m.discs[mat] ?? m.discs[+Object.keys(m.discs)[0]] ?? {}, radii = Object.keys(discs).map(Number);
    lut = [];
    const max = radii.length ? Math.max(...radii) + 1 : 0;
    for (let r = 0; r <= max; r++) { let best: RigPiece | undefined, d = Infinity; for (const k of radii) { const e = Math.abs(k - r); if (e < d) { d = e; best = discs[k]; } } lut[r] = best; }
    byMat.set(mat, lut);
  }
  return lut;
}
const pickDisc = (lut: (RigPiece | undefined)[], rpx: number) => lut[Math.max(0, Math.min(lut.length - 1, Math.round(rpx)))];
// A serpent's ground spine and its links' length, worked out once per rig page.
const spines = new WeakMap<RigMeta, { ground: number[][]; segLen: number }>();
function spineOf(m: RigMeta): { ground: number[][]; segLen: number } {
  let v = spines.get(m);
  if (!v) {
    const ground = m.spine.slice(0, 13);
    v = { ground, segLen: ground.reduce((t, p, k) => k ? t + Math.hypot(p[0] - ground[k - 1][0], p[2] - ground[k - 1][2]) : 0, 0) / (N_SPINE - 1) };
    spines.set(m, v);
  }
  return v;
}
/** The spine's radius a share t of the way from its tail (0) to its head (1). */
function radiusAt(sp: number[][], t: number): number {
  const f = t * (sp.length - 1), i = Math.min(sp.length - 2, Math.floor(f)), u = f - i;
  return sp[i][3] + (sp[i + 1][3] - sp[i][3]) * u;
}
