// Compare transparent sprite buffers aligned as on the sheet: left/bottom.
export function spritePixelDiff(a, b) {
  const w = Math.max(a.width, b.width), h = Math.max(a.height, b.height);
  const channel = (s, x, y, c) => x < s.width && y >= h - s.height ? s.data[((y - h + s.height) * s.width + x) * 4 + c] : 0;
  let changed = 0;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    for (let c = 0; c < 4; c++) if (channel(a, x, y, c) !== channel(b, x, y, c)) { changed++; break; }
  }
  return changed;
}
