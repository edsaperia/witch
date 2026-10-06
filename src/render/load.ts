// Sigil weight, made visible (Ed, 2026-10-06: "We can make the mechanic obvious through the artwork."): the leashes she
// carries pull on her by their tension and their creatures' weight (the rule: slower moving away from her army, slower
// rising, sinking slowly in the treetops when heavily loaded), and the art shows it at a glance: her sigil stack sags and
// leans toward the pull, the threads go taut and bright, she leans forward against it when flying away, her broom strains
// (tilted nose-up, its shaft bowed, its bristles splaying sparks), and sinking in the treetops a few sparks fall from her.
// Nothing at low load: the first few sigils are free.
//
// The load is the rules' leashLoad(g) (builder hotel's: rules/leashWeight.ts): its `over`, past the free allowance, makes
// the look, full at `full`; she's sinking while her lift is below 1 in treetop mode. Everything here writes into one object, so nothing is made per frame.
import { leashLoad, type Game } from "../rules/game";

export interface LoadTuning {
  on: boolean;
  /** The load past the rules' free allowance (leashLoad's over, weight units) at which the look is full. */
  full: number;
  /** The stack: its gaps shrink by up to sag (a share), and it leans toward the pull by lean metres a sigil up it. */
  stackSag: number;
  stackLean: number;
  /** The threads: shown from this share of the leash's length at full load (0.85 unloaded), brighter by bright. */
  threadFrom: number;
  threadBright: number;
  /** Her lean forward flying away from the pull (metres per metre up at full), her broom's tilt nose-up (metres per metre
   *  across), its bow (art pixels), and bristle sparks a second at full load. */
  witchLean: number;
  broomTilt: number;
  broomBow: number;
  sparks: number;
}

export const LOAD_DEFAULT: LoadTuning = { on: true, full: 6, stackSag: 0.4, stackLean: 0.35, threadFrom: 0.45, threadBright: 1.2, witchLean: 0.16, broomTilt: 0.12, broomBow: 1.5, sparks: 14 };

/** What the art reads: the load (0 none, 1 full), the pull's direction on the ground (unit), how much she's flying away
 *  from it (0 to 1), and how fast she's sinking over the treetops (0 to 1). */
export interface LoadView { load: number; dx: number; dz: number; away: number; sinking: number }

/** The load as the art reads it, eased (so a sigil picked up or let go doesn't snap the look), into `out`. */
export function loadView(g: Game, T: LoadTuning, dt: number, out: LoadView): LoadView {
  if (!T.on) { out.load = 0; out.away = 0; out.sinking = 0; return out; }
  const raw = leashLoad(g);
  const want = Math.max(0, Math.min(1, raw.over / Math.max(0.01, T.full))), e = 1 - Math.exp(-Math.max(0, dt) * 3);
  out.load += (want - out.load) * e;
  if (out.load < 1e-3) out.load = 0;
  if (raw.x || raw.z) { out.dx += (raw.x - out.dx) * e; out.dz += (raw.z - out.dz) * e; const n = Math.hypot(out.dx, out.dz) || 1; out.dx /= n; out.dz /= n; }
  const w = g.witch, sp = Math.hypot(w.vx, w.vz), top = w.mode === "treetop" ? g.tuning.treetopSpeed : g.tuning.groundSpeed;
  const away = sp > 0.5 ? Math.max(0, -(w.vx * out.dx + w.vz * out.dz) / sp) * Math.min(1, sp / Math.max(1, top * 0.6)) : 0;
  out.away += (away - out.away) * e;
  // sinking: the rules drop her lift below 1 while she stays in treetop mode (toward leash.weight.floor flying on; all the
  // way if she stops or the load is extreme)
  const lift = typeof w.lift === "number" ? w.lift : 1, floor = g.tuning.leash.weight?.floor ?? 0.75;
  const sink = w.mode === "treetop" && raw.over > 0 && lift < 0.999 ? (raw.extreme ? 1 : Math.min(1, (1 - lift) / Math.max(0.05, 1 - floor))) : 0;
  out.sinking += (sink - out.sinking) * e;
  return out;
}

export const newLoadView = (): LoadView => ({ load: 0, dx: 0, dz: 1, away: 0, sinking: 0 });
