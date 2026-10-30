/** Row zero stays lossless (including the eye/glow alpha codes); row one is cold albedo. */
export function frostPalette(palette: Uint8Array): Uint8Array {
  const out = new Uint8Array(256 * 4 * 2);
  out.set(palette.subarray(0, 1024));
  for (let i = 0; i < 256; i++) {
    const k = i * 4, l = (palette[k] * 0.3 + palette[k + 1] * 0.55 + palette[k + 2] * 0.15) / 255;
    out.set([Math.round(90 + l * 150), Math.round(145 + l * 105), Math.round(180 + l * 75), palette[k + 3]], 1024 + k);
  }
  return out;
}
