// A sleeping legend's glowing outline only while she's in its circle (Ed, 2026-10-07: outside it, no outline: it reads as a
// mossy boulder in its clearing), fading in and out over a band at the circle's edge (by where she is, so it works in the
// circle's slowed time). Carried to the sprite shader in the instance's glow beside its moss (render/sprites.ts): glow is
// -2 - (moss + 2 k), k the outline's steps off (0 full, STEPS none), moss under 1.

export const OUTLINE_STEPS = 16;

/** How much of its outline shows, 0 to 1, with her `d` metres from its circle's centre (radius r), over `band` metres at its edge. */
export function outlineIn(d: number, r: number, band = 3): number {
  const t = Math.min(1, Math.max(0, (d - (r - band / 2)) / band));
  return 1 - t * t * (3 - 2 * t);
}

/** A sleeping legend's glow: its moss (0 to 1) and its outline (0 to 1) in one number. */
export function legendGlow(moss: number, outline: number): number {
  const k = Math.round((1 - Math.min(1, Math.max(0, outline))) * OUTLINE_STEPS);
  return -2 - (Math.min(0.999, Math.max(0, moss)) + 2 * k);
}

/** The shader's reading of it (as in render/sprites.ts): its moss and its outline. */
export function readLegendGlow(glow: number): { moss: number; outline: number } {
  const v = -(glow + 2), k = Math.floor(v / 2 + 1e-4);
  return { moss: v - 2 * k, outline: 1 - k / OUTLINE_STEPS };
}
