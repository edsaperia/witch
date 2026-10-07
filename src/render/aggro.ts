// The rising aggro of a wild area watching her come down (rules/wildWatch.ts; Ed, 2026-10-07: "a visible sign of aggro (e.g.
// red tint) rising that lets a player who wanders into a dangerous area understand what's happening and have time to run
// away"): each watcher reddens, its outline red and pulsing faster, from faint as they notice her to full as they attack, the
// whole area together, stronger the more dangerous the area. Carried to the sprite shader in the instance's glow, between a
// blink's -1 and a sleeping legend's -1.5 and below (render/sprites.ts).

/** A watcher's red, 0 to 1: how far through the watch (k, 0 to 1), times the area's danger (0 to 1: a first-ring area's at 0.4
 *  of the deepest's), times the tuning's tint. */
export const aggroAmount = (k: number, danger: number, tint = 0.8): number => Math.min(1, Math.max(0, k * (0.4 + 0.6 * danger) * tint / 0.8));

/** Its red as an instance's glow (0 to 1 → -1.05 to -1.45). */
export const aggroGlow = (a: number): number => -1.05 - 0.4 * Math.min(1, Math.max(0, a));

/** The shader's reading (as render/sprites.ts): its red, or null for any other glow. */
export const readAggroGlow = (g: number): number | null => (g < -1.02 && g > -1.5 ? Math.min(1, Math.max(0, (-1.05 - g) / 0.4)) : null);
