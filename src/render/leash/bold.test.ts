import { describe, expect, it } from "vitest";
import { BOLD, BOLD_GRID, boldGlyph, SIGILS, SPECIES } from "../../../art/generator.js";

// The bold sigils (art/sigils.js BOLD; docs/notes/art-checks.md **Bold sigils**): each a species', in the unit box, filling its 24 px
// grid with strokes thick enough to read at stack size, and no two alike.
describe("bold sigils", () => {
  const B = BOLD as Record<string, unknown[]>, ids = Object.keys(B), ink = (id: string) => boldGlyph(id, BOLD_GRID)!.m;
  it("each a species with a sigil, its points in the unit box", () => {
    expect(ids.length).toBeGreaterThan(0);
    const species = new Set(SPECIES.map((s: { id: string }) => s.id));
    for (const id of ids) {
      expect(species.has(id) && !!(SIGILS as Record<string, unknown>)[id], id).toBe(true);
      for (const s of B[id] as { l?: number[][]; a?: number[]; d?: number[] }[]) {
        const pts = s.l ?? (s.d ? [s.d] : s.a ? [[s.a[0] - s.a[2], s.a[1] - s.a[2]], [s.a[0] + s.a[2], s.a[1] + s.a[2]]] : []);
        for (const [x, y] of pts) { expect(x, id).toBeGreaterThanOrEqual(0); expect(x, id).toBeLessThanOrEqual(1); expect(y, id).toBeGreaterThanOrEqual(0); expect(y, id).toBeLessThanOrEqual(1); }
      }
    }
  });
  it("fills its grid: most of it across and down, ink a tenth to a half of it, strokes two pixels thick", () => {
    for (const id of ids) {
      const m = ink(id), n = BOLD_GRID; let k = 0, x0 = n, x1 = -1, y0 = n, y1 = -1, thin = 0;
      for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (m[y * n + x]) {
        k++; x0 = Math.min(x0, x); x1 = Math.max(x1, x); y0 = Math.min(y0, y); y1 = Math.max(y1, y);
        const on = (a: number, b: number) => a >= 0 && b >= 0 && a < n && b < n && !!m[b * n + a];
        if (!(on(x - 1, y) || on(x + 1, y)) || !(on(x, y - 1) || on(x, y + 1))) thin++; // (a pixel with no ink beside it across or down: a 1 px line)
      }
      expect(x1 - x0 + 1, id).toBeGreaterThanOrEqual(16); expect(y1 - y0 + 1, id).toBeGreaterThanOrEqual(16);
      expect(k / (n * n), id).toBeGreaterThan(0.1); expect(k / (n * n), id).toBeLessThan(0.5);
      expect(thin / k, id).toBeLessThan(0.08);
    }
  });
  it("no two alike: every pair differs in at least a third of their ink", () => {
    for (let i = 0; i < ids.length; i++) for (let j = i + 1; j < ids.length; j++) {
      const a = ink(ids[i]), b = ink(ids[j]); let both = 0, either = 0;
      for (let p = 0; p < a.length; p++) { if (a[p] && b[p]) both++; if (a[p] || b[p]) either++; }
      expect(1 - both / either, `${ids[i]} / ${ids[j]}`).toBeGreaterThan(1 / 3);
    }
  });
});
