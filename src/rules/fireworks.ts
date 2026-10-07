// The wave's celebration at an area already cleared (Ed, 2026-10-07: when the wave reaches an area whose soundsystem is
// already up, "celebrate" it: fireworks over that soundsystem, and its lasers on for good). The rules emit `waveCelebrate`
// (game.ts); this is the show's schedule: which shells go up when, how high, what burst and what colour, a function of the
// event alone (its place and time), so the picture (render/fireworks.ts) and the sound (platform/sfxCues.ts) agree on every
// launch and burst without either telling the other. No drawing here.
import { hash2 } from "./random";
import type { Tuning } from "./tuning";

/** A shell's burst: a round peony, a ring, a willow's drooping gold, or a crackling glitter. */
export type ShellKind = "peony" | "ring" | "willow" | "crackle";
const KINDS: ShellKind[] = ["peony", "peony", "ring", "willow", "crackle"];

export interface Shell {
  /** Game time it leaves the soundsystem's top, and when it bursts. */
  launch: number;
  burst: number;
  /** Where it bursts: over the soundsystem, drifting a little (m), and how high (m over the ground). */
  x: number;
  z: number;
  height: number;
  /** Its burst's shape, size (radius, m) and colour (along the party palette, 0-1; a second for a two-colour burst, or -1). */
  kind: ShellKind;
  radius: number;
  hue: number;
  hue2: number;
  /** One of the finale's, going up together at the end. */
  finale: boolean;
}

type FireworksTuning = NonNullable<Tuning["fireworks"]>;

/** The defaults, if the tuning file has none. */
export const FIREWORKS: FireworksTuning = { on: true, shells: [6, 9], over: 4, rise: [0.9, 1.2], height: [20, 32], radius: [7, 11], drift: 6, finale: 3 };

/** The show at (x, z) from game time `at`: every shell, in launch order. The last `finale` go up together at the end. */
export function fireworkShells(x: number, z: number, at: number, t?: Tuning): Shell[] {
  const F = { ...FIREWORKS, ...(t?.fireworks ?? {}) };
  if (!F.on) return [];
  const s = Math.round(x * 3.1) * 7919 + Math.round(z * 2.7), r = (i: number, k: number) => hash2(s, i, 6011 + k);
  const n = Math.round(F.shells[0] + r(0, 0) * (F.shells[1] - F.shells[0])), fin = Math.min(F.finale, n), out: Shell[] = [];
  const lerp = (a: number[], u: number) => a[0] + (a[1] - a[0]) * u;
  for (let i = 0; i < n; i++) {
    // Spaced over `over` seconds with a little swing, the finale's together at the end.
    const finale = i >= n - fin, launch = at + (finale ? F.over : (i / Math.max(1, n - fin)) * F.over * 0.85 + r(i, 1) * 0.25);
    const a = r(i, 2) * Math.PI * 2, d = F.drift * Math.sqrt(r(i, 3));
    const kind = finale ? (i === n - 1 ? "crackle" : "peony") : KINDS[Math.floor(r(i, 4) * KINDS.length) % KINDS.length];
    out.push({
      launch, burst: launch + lerp(F.rise, r(i, 5)), x: x + Math.cos(a) * d, z: z + Math.sin(a) * d, height: lerp(F.height, r(i, 6)) + (finale ? 6 : 0),
      kind, radius: lerp(F.radius, r(i, 7)) * (finale ? 1.25 : 1) * (kind === "willow" ? 1.2 : kind === "crackle" ? 0.8 : 1),
      hue: r(i, 8), hue2: r(i, 9) < 0.4 ? (r(i, 8) + 0.35 + r(i, 10) * 0.3) % 1 : -1, finale,
    });
  }
  return out;
}

/** When the show's done (the last burst's sparks out), for whoever holds it. */
export const showEnds = (shells: Shell[]): number => shells.reduce((e, s) => Math.max(e, s.burst + (s.kind === "willow" ? 3.2 : 2.2)), 0);
