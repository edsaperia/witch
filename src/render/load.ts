// Sigil weight, made visible (Ed, 2026-10-06: "We can make the mechanic obvious through the artwork."): the leashes she
// carries pull on her by their tension and their creatures' weight (the rule: slower moving away from her army, slower
// rising, sinking slowly in the treetops when heavily loaded), and the art shows it at a glance: her sigil stack sags and
// leans toward the pull, the threads go taut and bright, she leans forward against it when flying away, her broom strains
// (tilted nose-up, its shaft bowed, its bristles splaying sparks), and sinking in the treetops a few sparks fall from her.
// Nothing at low load: the first few sigils are free.
//
// The load comes from the rules' leashLoad(g) once it lands (the hotel builder's); until then, `stubLoad` below stands in
// for it from the leash as it is. Everything here writes into one object, so nothing is made per frame.
import type { Game } from "../rules/game";

export interface LoadTuning {
  on: boolean;
  /** The rules' load (or the stub's) at which the look starts (the free sigils), and at which it is full. */
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

export const LOAD_DEFAULT: LoadTuning = { on: true, free: 4, full: 16, stackSag: 0.4, stackLean: 0.35, threadFrom: 0.45, threadBright: 1.2, witchLean: 0.16, broomTilt: 0.12, broomBow: 1.5, sparks: 14, sinkFrom: 0.6 };

/** What the art reads: the load (0 none, 1 full), the pull's direction on the ground (unit), how much she's flying away
 *  from it (0 to 1), and how fast she's sinking over the treetops (0 to 1). */
export interface LoadView { load: number; dx: number; dz: number; away: number; sinking: number }

/** A creature's weight by level (baby, young, adult, legend): the stub's, until the rules' own. */
const WEIGHT = [1, 2, 3.5, 6];

/** Until the rules' leashLoad(g): each sigil in her stack pulls with its creature's weight, more as its leash stretches
 *  (from half its length), toward it. Returns the raw load (the rules' units: tuning `free` and `full` read it). */
export function stubLoad(g: Game, out: { total: number; dx: number; dz: number }): void {
  const w = g.witch, L = g.tuning.leash.length;
  let total = 0, px = 0, pz = 0;
  for (const id of g.leash.stack) {
    const c = g.creatures[id];
    if (!c) continue;
    const dx = c.x - w.x, dz = c.z - w.z, d = Math.hypot(dx, dz), tension = Math.max(0, Math.min(1.5, (d - L * 0.5) / L));
    const pull = (WEIGHT[c.level] ?? 1) * (0.5 + tension);
    total += pull;
    if (d > 1e-3) { px += (dx / d) * pull * (0.2 + tension); pz += (dz / d) * pull * (0.2 + tension); }
  }
  const n = Math.hypot(px, pz);
  out.total = total; out.dx = n > 1e-6 ? px / n : 0; out.dz = n > 1e-6 ? pz / n : 0;
}

const raw = { total: 0, dx: 0, dz: 0 };

/** The load as the art reads it, eased (so a sigil picked up or let go doesn't snap the look), into `out`. */
export function loadView(g: Game, T: LoadTuning, dt: number, out: LoadView): LoadView {
  if (!T.on) { out.load = 0; out.away = 0; out.sinking = 0; return out; }
  stubLoad(g, raw);
  const want = Math.max(0, Math.min(1, (raw.total - T.free) / Math.max(0.01, T.full - T.free))), e = 1 - Math.exp(-Math.max(0, dt) * 3);
  out.load += (want - out.load) * e;
  if (out.load < 1e-3) out.load = 0;
  if (raw.dx || raw.dz) { out.dx += (raw.dx - out.dx) * e; out.dz += (raw.dz - out.dz) * e; const n = Math.hypot(out.dx, out.dz) || 1; out.dx /= n; out.dz /= n; }
  const w = g.witch, sp = Math.hypot(w.vx, w.vz), top = w.mode === "treetop" ? g.tuning.treetopSpeed : g.tuning.groundSpeed;
  const away = sp > 0.5 ? Math.max(0, -(w.vx * out.dx + w.vz * out.dz) / sp) * Math.min(1, sp / Math.max(1, top * 0.6)) : 0;
  out.away += (away - out.away) * e;
  const sink = w.mode === "treetop" ? Math.max(0, (out.load - T.sinkFrom) / Math.max(0.01, 1 - T.sinkFrom)) : 0;
  out.sinking += (sink - out.sinking) * e;
  return out;
}

export const newLoadView = (): LoadView => ({ load: 0, dx: 0, dz: 1, away: 0, sinking: 0 });
