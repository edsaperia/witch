// The follower buffs' icons (rules/buffs.ts; Ed, 2026-11-03: "Visible: an icon to the right of the creature's sigil in her stack"):
// one small pixel glyph a group, drawn white into the leash view's glyph atlas (render/leash.ts) in a slot of its own, as the rank
// sigils' bare glyphs and the legend's crown are, and tinted when drawn (render/leash/stack.ts). 12 × 12 art pixels, 2 px a pixel in
// the 32 px slot (so its strokes are as thick as the bold sigils'), each read at a glance:
//   climbers: a wing (an extra dash);       darters: a lightning bolt (faster);       stalkers: an eye (invites fly further);
//   heavies: two arrows back to back (a shot each way); packHunters: three claw marks (faster, wider);  shells: two chain links.
import type { BuffGroup } from "../../rules/buffs";
import { SLOT, SLOTS } from "./glyphs";

/** Each icon's pixels, "#" on, 12 rows of 12. */
export const BUFF_ICONS: Record<BuffGroup, readonly string[]> = {
  climbers: [
    "............",
    ".........##.",
    ".......####.",
    ".....######.",
    "....#######.",
    "...#######..",
    "..#######...",
    ".#####......",
    ".####.##....",
    "##...##.....",
    "#...........",
    "............",
  ],
  darters: [
    "......###...",
    ".....###....",
    "....###.....",
    "...###......",
    "..########..",
    ".......###..",
    "......###...",
    ".....###....",
    "....###.....",
    "...##.......",
    "..#.........",
    "............",
  ],
  stalkers: [
    "............",
    "............",
    "....####....",
    "..##....##..",
    ".#...##...#.",
    "#...####...#",
    "#...####...#",
    ".#...##...#.",
    "..##....##..",
    "....####....",
    "............",
    "............",
  ],
  heavies: [
    "............",
    "............",
    "............",
    "..#......#..",
    ".##......##.",
    "############",
    "############",
    ".##......##.",
    "..#......#..",
    "............",
    "............",
    "............",
  ],
  packHunters: [
    "#...#...#...",
    "#...#...#...",
    ".#...#...#..",
    ".#...#...#..",
    ".#...#...#..",
    "..#...#...#.",
    "..#...#...#.",
    "..#...#...#.",
    "...#...#...#",
    "...#...#...#",
    "............",
    "............",
  ],
  shells: [
    "............",
    ".####.......",
    "#....#......",
    "#....#......",
    "#...######..",
    "#...##...#..",
    ".####....#..",
    "....#....#..",
    "....#....#..",
    ".....####...",
    "............",
    "............",
  ],
};
export const ICON_GRID = 12;

/** What the icons need of the leash view: its atlas canvas and texture, its next free slot, and a slot's rect. */
interface Atlas { canvas: HTMLCanvasElement; tex: { needsUpdate: boolean }; nextSlot: number; uv(slot: number, span?: number): number[] }
const slots = new WeakMap<Atlas, Map<BuffGroup, number[]>>();

/** A group's icon's rect in the atlas, drawn there the first time it's asked for. */
export function buffIconUv(lv: Atlas, group: BuffGroup): number[] {
  let m = slots.get(lv);
  if (!m) slots.set(lv, (m = new Map()));
  const had = m.get(group);
  if (had) return had;
  const s = lv.nextSlot++, ox = (s % SLOTS) * SLOT, oy = Math.floor(s / SLOTS) * SLOT, px = 2, o = (SLOT - ICON_GRID * px) >> 1;
  const g = lv.canvas.getContext("2d", { willReadFrequently: true })!;
  g.clearRect(ox, oy, SLOT, SLOT);
  g.fillStyle = "#ffffff";
  BUFF_ICONS[group].forEach((row, y) => { for (let x = 0; x < ICON_GRID; x++) if (row[x] === "#") g.fillRect(ox + o + x * px, oy + o + y * px, px, px); });
  lv.tex.needsUpdate = true;
  const uv = lv.uv(s);
  m.set(group, uv);
  return uv;
}

/** A redundant icon's blue (the wild adult's, #2d6eff) and an unfed one's pink (the berries', #c8228c), when the tuning has none
 *  (buffs.icons). */
export const ICON_BLUE = [0.176, 0.431, 1], ICON_PINK = [0.784, 0.133, 0.549];
/** An unfed icon's twinkle (Ed, 2026-11-03: "it twinkles in pink"): its brightness, 0.25 to 1.2, once a `period` s, each creature's
 *  its own phase (by `seed`). */
export function iconTwinkle(time: number, period: number, seed: number): number {
  const p = Math.max(0.05, period), ph = ((time / p + seed * 0.618) % 1 + 1) % 1, k = Math.pow(Math.abs(Math.sin(ph * Math.PI)), 3);
  return 0.25 + 0.95 * k;
}
