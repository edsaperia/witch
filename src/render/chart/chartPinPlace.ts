// The sea chart's 🧭 (render/chart/chartPin.ts): where it stands, clear over its island's highest drawn point, and how it fades
// while its island's the one chosen. Pure: the projection is passed in.

/** Where an island's drawing reaches highest on the screen (CSS pixels from the canvas's top left): of a ring `r` round its middle
 *  (x, z) at its land's top height (its outline, sigil and sparkle all inside), the point highest on screen, and the middle's x;
 *  `project` puts a world point on the screen. The pin's tip goes over this, so it never covers the island (Ed, 2026-10-26: "The
 *  pointers on the map screen should not obscure the island they are indicating"). */
export function islandTop(project: (x: number, y: number, z: number) => { x: number; y: number }, x: number, top: number, z: number, r: number, n = 16): { x: number; y: number } {
  const mid = project(x, top, z);
  let y = mid.y;
  for (let k = 0; k < n; k++) { const a = (k / n) * Math.PI * 2, p = project(x + Math.cos(a) * r, top, z + Math.sin(a) * r); if (p.y < y) y = p.y; }
  return { x: mid.x, y };
}

/** A pin's showing (0 to 1) a frame on, eased toward `want` (0 while its island's the one chosen, Ed, 2026-10-26: "While the
 *  pointed island is selected, the pointer fades out"; 1 otherwise) over about a quarter second; snapped there once close. */
export function pinFade(shown: number, want: number, dt: number): number {
  const s = shown + (want - shown) * Math.min(1, Math.max(0, dt) * 8);
  return Math.abs(s - want) < 0.01 ? want : s;
}
