// Her health as claw slashes over her (Ed, 2026-10-08: "whenever she gets hit she gets a jagged diagonal glowing red 'slash'
// mark that appears on top of her, which fades along its length to show the hit healing over time. Each time she's hit an
// extra slash mark gets added, three in total"). In place of the pips under her feet: one torn, tapering stroke per hit taken,
// upper left to lower right, the first the longest and each below it a little shorter and offset, as in the three-claw scratch.
// A new one slashes in from its tip with a white-hot flash; the newest drains away from its upper tip to its lower one as the
// repair timer runs (rules/knockout.ts repair), and is gone when that hit is healed. Pixel art in art pixels (pixelSize screen
// pixels each), screen-aligned over her body, its red added to the scene (screen blend) with a red glow. No rules here.

/** One pixel of a slash: where (art pixels), its tone (0 hot core, 1 body, 2 torn edge), and how far along the stroke it is
 *  (0 its upper-left tip, 1 its lower-right tip). */
export interface SlashPixel { x: number; y: number; tone: 0 | 1 | 2; t: number }

/** The slashes' canvas, in art pixels. */
export const SLASH_W = 30, SLASH_H = 32;

const hash = (a: number, b: number): number => { let h = (a * 374761393 + b * 668265263) | 0; h = Math.imul(h ^ (h >>> 13), 1274126177); return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };

/** The three slashes' pixels (the first, top one, longest), each a jagged stroke tapering to points at both ends. */
export function slashPixels(): SlashPixel[][] {
  const dx = 0.76, dy = 0.65, nx = -0.65, ny = 0.76; // (along the stroke, down to the right; across it, down to the left)
  // each below the last by `gap` across the strokes and a little further along (offset), shorter
  const GAP = 6.8, STROKES = [{ len: 24, w: 2.3, on: 0 }, { len: 20.5, w: 2.1, on: 2.2 }, { len: 17, w: 1.9, on: 4.6 }].map((s, i) => ({ ...s, x: 9 + i * GAP * nx + s.on * dx, y: 2 + i * GAP * ny + s.on * dy }));
  return STROKES.map((s, i) => {
    const out: SlashPixel[] = [];
    for (let y = 0; y < SLASH_H; y++) for (let x = 0; x < SLASH_W; x++) {
      const px = x + 0.5 - s.x, py = y + 0.5 - s.y, along = px * dx + py * dy, across = px * nx + py * ny, t = along / s.len;
      if (t < 0 || t > 1) continue;
      // tapering to points, torn along both edges (each edge its own rag, in whole steps)
      const step = Math.floor(along / 1.4), side = across < 0 ? 1 : 2;
      const rag = (hash(i * 7 + side, step) - 0.5) * 1.1 - (hash(i * 13 + side, step) > 0.8 ? 0.9 : 0); // (torn: uneven, with a nick here and there)
      const half = s.w * Math.pow(Math.sin(Math.PI * t), 0.7) + rag * Math.pow(Math.sin(Math.PI * t), 0.8);
      if (half <= 0.15 || Math.abs(across) > half) continue;
      const k = Math.abs(across) / half;
      out.push({ x, y, tone: k < 0.24 ? 0 : k < 0.7 ? 1 : 2, t });
    }
    return out;
  });
}

/** Colours (RGB) for the tones: a hot core, the glowing red, the torn dark-blood edge (Ed's reference, #6e1a1a). */
export const SLASH_TONES: readonly (readonly [number, number, number])[] = [[255, 118, 92], [228, 30, 38], [118, 16, 22]];
/** How long a new slash takes to cut in (s), and its white-hot flash. */
export const SLASH_IN = 0.12, SLASH_FLASH = 0.16;

/** What shows of each slash at `time`: hits taken (0 to `hits`), the newest's cut-in (0..1), its flash (0..1), and how much of
 *  it has drained (0..1, from its upper tip) as its hit heals. */
export function slashState(h: { hp: number; repairAt: number; hurtAt: number }, hits: number, repairTime: number, time: number): { count: number; cut: number; flash: number; drained: number } {
  const count = Math.max(0, Math.min(hits, hits - h.hp)), since = time - h.hurtAt;
  const cut = since >= 0 ? Math.min(1, since / SLASH_IN) : 1, flash = since >= 0 && since < SLASH_FLASH ? 1 - since / SLASH_FLASH : 0;
  const drained = count > 0 && Number.isFinite(h.repairAt) && repairTime > 0 ? Math.max(0, Math.min(1, 1 - (h.repairAt - time) / repairTime)) : 0;
  return { count, cut, flash, drained };
}

/** Paints the slashes into RGBA (SLASH_W x SLASH_H) for a state: every slash up to `count`, the newest cut in to `cut` and
 *  drained from its upper tip by `drained`, flashing white-hot by `flash`. */
export function paintSlashes(out: Uint8ClampedArray, st: { count: number; cut: number; flash: number; drained: number }, px = slashPixels()): void {
  out.fill(0);
  for (let i = 0; i < st.count; i++) {
    const newest = i === st.count - 1;
    for (const p of px[i]) {
      if (newest && (p.t > st.cut || p.t < st.drained)) continue;
      let [r, g, b] = SLASH_TONES[p.tone];
      if (newest && st.flash > 0) { r += (255 - r) * st.flash; g += (255 - g) * st.flash * 0.9; b += (255 - b) * st.flash * 0.85; }
      // (the draining edge: the pixel at the front of the drain a tone cooler, so it reads as fading along its length)
      if (newest && st.drained > 0 && p.t < st.drained + 0.08) { r *= 0.7; g *= 0.6; b *= 0.6; }
      const o = (p.y * SLASH_W + p.x) * 4; out[o] = r; out[o + 1] = g; out[o + 2] = b; out[o + 3] = 255;
    }
  }
}
