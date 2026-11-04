// Numerical movement mechanics shared by waiting travel and attack trajectories.
// Intent selection and attack effects do not write a second position afterwards.
export interface MotionBody { x: number; z: number; vx?: number; vz?: number }
export interface Route { fx: number; fz: number; tx: number; tz: number; at: number; lands: number; bend?: number }
export interface MotionCommand {
  vx?: number; vz?: number; acceleration?: number;
  route?: Route;
  /** Fraction of route velocity retained for the next phase (0..1). */
  carry?: number;
}

/** A line, bow or arc from the same continuous curve; bend is signed metres. */
export function trajectoryAt(route: Route, time: number): { x: number; z: number; vx: number; vz: number; progress: number } {
  const duration = Math.max(0.01, route.lands - route.at), progress = Math.max(0, Math.min(1, (time - route.at) / duration));
  const dx = route.tx - route.fx, dz = route.tz - route.fz, length = Math.hypot(dx, dz) || 1;
  const bend = route.bend ?? 0, bow = 4 * progress * (1 - progress) * bend, slope = 4 * (1 - 2 * progress) * bend;
  return { x: route.fx + dx * progress - dz / length * bow, z: route.fz + dz * progress + dx / length * bow,
    vx: (dx - dz / length * slope) / duration, vz: (dz + dx / length * slope) / duration, progress };
}

/** The single position/velocity integrator for a chosen movement command. */
export function advanceMotion(body: MotionBody, command: MotionCommand, time: number, dt: number): number {
  if (command.route) {
    const sample = trajectoryAt(command.route, time), carry = command.carry ?? 0;
    body.x = sample.x; body.z = sample.z; body.vx = sample.vx * carry; body.vz = sample.vz * carry;
    return sample.progress;
  }
  const vx = body.vx ?? 0, vz = body.vz ?? 0, ax = (command.vx ?? 0) - vx, az = (command.vz ?? 0) - vz;
  const amount = Math.hypot(ax, az), limit = (command.acceleration ?? Infinity) * dt, blend = amount > limit ? limit / amount : 1;
  body.vx = vx + ax * blend; body.vz = vz + az * blend;
  body.x += body.vx * dt; body.z += body.vz * dt;
  return 1;
}
