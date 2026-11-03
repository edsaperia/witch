// Riding the rolling ground (Ed, v289: "when you're moving quickly, you jerk up and down with the
// roll of hills; if that could be smoothed, I think it would be perfectly fine"). Drawing only, like
// the hills: the height of ground she rides over is not the ground under her but a damped follow
// of it, looking ahead along her velocity, so at speed she glides like a broom rider, rising early
// for a crest and sinking gently into a dip, and never dips into a slope rising in front of her.
// Standing still she sits exactly on the ground.

export interface RideTuning {
  /** Seconds the height takes to settle at full speed (a critically damped spring); 0: no smoothing. */
  heightSmooth: number;
  /** Seconds of her flight behind and ahead of her that the ground is averaged over. */
  heightLookAhead: number;
  /** Metres she always keeps over the actual ground under her and just in front of her. */
  heightClearance: number;
}

/** How soft its maxima are (metres). */
const SOFT = 0.5;
/** The highest of vs, smoothly (log-sum-exp: a little over the highest, never kinking). */
function softMax(vs: number[], t: number): number {
  const m = Math.max(...vs);
  let s = 0;
  for (const v of vs) s += Math.exp((v - m) / t);
  return m + t * Math.log(s);
}

/** A damped ground height to ride on. */
export class Ride {
  /** The ground height she rides on now. */
  h = NaN;
  private v = 0;
  private x = NaN;
  private z = NaN;

  /** dt: seconds since the last frame; x, z, vx, vz: where she is and how fast she goes; full: the
   *  speed (m/s) at which smoothing is at its most; ground(x, z): the ground's height; lift: how high
   *  she is drawn over the ride (her feet), so the clearance is kept under her feet, not the ride. */
  update(dt: number, x: number, z: number, vx: number, vz: number, full: number, ground: (x: number, z: number) => number, T: RideTuning, lift = 0): number {
    const here = ground(x, z), speed = Math.hypot(vx, vz), k = Math.min(1, speed / Math.max(0.1, full));
    const jumped = !(Math.hypot(x - this.x, z - this.z) < 30); // (moved there at once: placed, not flown)
    this.x = x; this.z = z;
    if (!(T.heightSmooth > 0) || Number.isNaN(this.h) || dt > 1 || jumped) { this.h = here; this.v = 0; return this.h; }
    if (dt <= 0) return this.h; // (the same moment drawn again, or paused)
    // Where it's heading: the ground averaged over a stretch of her path behind and ahead of her
    // (heightLookAhead seconds of flight each way, weighted to her: a symmetric window has no lag
    // on a steady slope, so it follows the hills and only smooths their bumps; a crest ahead lifts
    // her early and a dip is glided over); and never lower than keeps her feet clear of the
    // highest ground ahead, so that floor is met smoothly, not hit. Maxima taken smoothly (a hard
    // one kinks as the highest point changes, and the spring turns each kink into a jolt).
    const room = Math.min(T.heightClearance, lift) - lift, ahead = [here];
    let sum = here * 7, wsum = 7;
    if (speed > 0.05) {
      const ux = vx / speed, uz = vz / speed, reach = speed * T.heightLookAhead;
      for (let i = 1; i <= 6; i++) {
        const s = (reach * i) / 6, w = 7 - i, ga = ground(x + ux * s, z + uz * s), gb = ground(x - ux * s, z - uz * s);
        ahead.push(ga); sum += w * (ga + gb); wsum += 2 * w;
      }
    }
    const target = softMax([sum / wsum, softMax(ahead, SOFT) + room], SOFT);
    // A critically damped spring toward it, its time shrinking to nothing as she slows to a stop.
    const tau = T.heightSmooth * k;
    if (tau < 1e-3) { this.h = target; this.v = 0; }
    else {
      const w = 2 / tau, e = Math.exp(-w * dt), d = this.h - target, tmp = (this.v + w * d) * dt;
      this.v = (this.v - w * tmp) * e;
      this.h = target + (d + tmp) * e;
    }
    // Never into the ground, at the last: her feet keep the clearance over the ground under her.
    const need = here + Math.min(T.heightClearance, lift) - lift;
    if (this.h < need) { this.h = need; this.v = Math.max(0, this.v); }
    // Standing still, back on the ground exactly (and never left hovering once she stops).
    if (k < 0.02) { this.h = here; this.v = 0; }
    return this.h;
  }
}
