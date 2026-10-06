// The dream bubble's pointer (Ed, 2026-10-06: the legend's bubble tells you which way its quest animal's runestone is): a pixel
// arrow, one of the eight compass points (north up the screen: the camera looks north), in the dreamt creature's neon with a
// dark rim, drawn at whole pixels (no rotating: each direction is its own drawing, the diagonals their own shape).

const N = 9; // the arrow's own pixels, before its rim

/** The arrow pointing up (north) and up-right (north-east), 9 × 9; the rest are these turned by quarter turns. */
const UP = [
  "....#....",
  "...###...",
  "..#####..",
  ".#######.",
  "#########",
  "...###...",
  "...###...",
  "...###...",
  "...###...",
];
// (the diagonal: a head filling the top right corner, its shaft a band down to the bottom left)
const UP_RIGHT = Array.from({ length: N }, (_, y) => Array.from({ length: N }, (_, x) =>
  (x - y >= 3 && x >= 3 && y <= 5) || (Math.abs(x + y - 8) <= 1 && x <= 5) ? "#" : ".").join(""));

const turn = (m: string[]): string[] => m.map((_, y) => m.map((_r, x) => m[N - 1 - x][y]).join("")); // (a quarter turn clockwise)

/** The mask for compass point k (0 north, 1 north-east ... 7 north-west). */
function mask(k: number): string[] {
  let m = k % 2 ? UP_RIGHT : UP;
  for (let i = 0; i < Math.floor(k / 2); i++) m = turn(m);
  return m;
}

/** Draws the arrow for point k into `c` (11 × 11 with its rim), in rgb; k < 0 draws a small ring (she's there). */
export function compassArrow(c: HTMLCanvasElement, k: number, rgb: [number, number, number]): void {
  const S = N + 2;
  c.width = c.height = S;
  const g = c.getContext("2d");
  if (!g) return;
  g.clearRect(0, 0, S, S);
  const on = (x: number, y: number): boolean => {
    if (k < 0) { const d = Math.hypot(x - 4, y - 4); return d >= 2.5 && d <= 4; }
    return mask(k)[y]?.[x] === "#";
  };
  // the rim: dark round every lit pixel
  g.fillStyle = "rgb(20, 12, 30)";
  for (let y = -1; y <= N; y++) for (let x = -1; x <= N; x++) {
    if (on(x, y)) continue;
    if (on(x - 1, y) || on(x + 1, y) || on(x, y - 1) || on(x, y + 1)) g.fillRect(x + 1, y + 1, 1, 1);
  }
  // the arrow, lit from above: its top rows a little brighter
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    if (!on(x, y)) continue;
    const lift = on(x, y - 1) ? 0 : 40;
    g.fillStyle = `rgb(${Math.min(255, rgb[0] + lift)}, ${Math.min(255, rgb[1] + lift)}, ${Math.min(255, rgb[2] + lift)})`;
    g.fillRect(x + 1, y + 1, 1, 1);
  }
}
