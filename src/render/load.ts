// Sigil weight, made visible (Ed, 2026-10-06: "We can make the mechanic obvious through the artwork."): the leashes she
// carries pull on her by their tension and their creatures' weight (the rule: slower moving away from her army, slower
// rising, sinking slowly in the treetops when heavily loaded), and the art shows it at a glance: her sigil stack sags and
// leans toward the pull, the threads go taut and bright, she leans forward against it when flying away, her broom strains
// (tilted nose-up, its shaft bowed, its bristles splaying sparks), and sinking in the treetops a few sparks fall from her.
// Nothing at low load: the first few sigils are free.
//
// The load comes from the rules' leashLoad(g) once it lands (builder hotel's, claude/sigil-weight-rules); until then,
// `stubLoad` below stands in for it, by the same rule and numbers. Everything here writes into one object, so nothing is made per frame.
import type { Game } from "../rules/game";
import { strengthOf } from "../rules/combat";

export interface LoadTuning {
  on: boolean;
  /** The free allowance (weight units: the stub's, till the rules' leash.weight.free), and the load past it at which the look is full. */
  free: number;
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
  /** Over the treetops, sinking from this load (0 to 1): sparks falling from her. */
  sinkFrom: number;
}

export const LOAD_DEFAULT: LoadTuning = { on: true, free: 2.5, full: 8, stackSag: 0.4, stackLean: 0.35, threadFrom: 0.45, threadBright: 1.2, witchLean: 0.16, broomTilt: 0.12, broomBow: 1.5, sparks: 14, sinkFrom: 0.6 };

/** What the art reads: the load (0 none, 1 full), the pull's direction on the ground (unit), how much she's flying away
 *  from it (0 to 1), and how fast she's sinking over the treetops (0 to 1). */
export interface LoadView { load: number; dx: number; dz: number; away: number; sinking: number }

/** A creature's weight by level (baby, young, adult, legend), times its species' strength: the stub's, until the rules'. */
const WEIGHT = [0.5, 1, 2, 3]; // (the rules' leash.weight.levels)

/** The rules' leashLoad(g) as builder hotel settled it (2026-10-06): the summed pull's size (total, weight units), the part
 *  past the free allowance (over: 0, she feels nothing), its direction from her toward the creatures (x, z: unit, or 0, 0),
 *  and whether it's extreme (she sinks all the way to the ground). */
export interface RulesLoad { total: number; over: number; x: number; z: number; extreme: boolean }

/** Until leashLoad(g) is on the prototype, the same rule: each sigil in her stack (placed ones weigh nothing) pulls toward
 *  its creature by its leash's strain (the dotted thread's: 0 within 0.85 of its length, rising to 1) times its weight. */
export function stubLoad(g: Game, T: LoadTuning, out: RulesLoad): RulesLoad {
  const w = g.witch, L = g.tuning.leash.length;
  let px = 0, pz = 0;
  for (const id of g.leash.stack) {
    const c = g.creatures[id];
    if (!c) continue;
    const dx = c.x - w.x, dz = c.z - w.z, d = Math.hypot(dx, dz), strain = Math.max(0, Math.min(1, (d - L * 0.85) / L));
    if (strain <= 0 || d < 1e-3) continue;
    const pull = strain * (WEIGHT[c.level] ?? 1) * strengthOf(c.species, c.level);
    px += (dx / d) * pull; pz += (dz / d) * pull;
  }
  const total = Math.hypot(px, pz);
  out.total = total; out.over = Math.max(0, total - T.free); out.x = total > 1e-6 ? px / total : 0; out.z = total > 1e-6 ? pz / total : 0;
  out.extreme = out.over >= T.full; // (the rules' leash.weight.extreme)
  return out;
}

const raw: RulesLoad = { total: 0, over: 0, x: 0, z: 0, extreme: false };

/** The load as the art reads it, eased (so a sigil picked up or let go doesn't snap the look), into `out`. */
export function loadView(g: Game, T: LoadTuning, dt: number, out: LoadView): LoadView {
  if (!T.on) { out.load = 0; out.away = 0; out.sinking = 0; return out; }
  stubLoad(g, T, raw);
  const want = Math.max(0, Math.min(1, raw.over / Math.max(0.01, T.full))), e = 1 - Math.exp(-Math.max(0, dt) * 3);
  out.load += (want - out.load) * e;
  if (out.load < 1e-3) out.load = 0;
  if (raw.x || raw.z) { out.dx += (raw.x - out.dx) * e; out.dz += (raw.z - out.dz) * e; const n = Math.hypot(out.dx, out.dz) || 1; out.dx /= n; out.dz /= n; }
  const w = g.witch, sp = Math.hypot(w.vx, w.vz), top = w.mode === "treetop" ? g.tuning.treetopSpeed : g.tuning.groundSpeed;
  const away = sp > 0.5 ? Math.max(0, -(w.vx * out.dx + w.vz * out.dz) / sp) * Math.min(1, sp / Math.max(1, top * 0.6)) : 0;
  out.away += (away - out.away) * e;
  // sinking: over the treetops, loaded (the rules drop her lift below 1 while she stays in treetop mode), or extreme
  const lift = typeof w.lift === "number" ? w.lift : 1;
  const sink = w.mode === "treetop" && raw.over > 0 ? Math.max(raw.extreme ? 1 : 0, Math.max(0, (out.load - T.sinkFrom) / Math.max(0.01, 1 - T.sinkFrom)), Math.min(1, (1 - lift) * 4)) : 0;
  out.sinking += (sink - out.sinking) * e;
  return out;
}

export const newLoadView = (): LoadView => ({ load: 0, dx: 0, dz: 1, away: 0, sinking: 0 });
