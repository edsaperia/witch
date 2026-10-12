// The dream's pixel thought bubble (render/thoughtCloud.ts; Ed, 2026-10-08): a one-pixel outline round a flat fill, a big cloud
// holding its symbol, puffs growing toward it from the sleeper; one symbol at a time, emoji and quest sigil by turns, the flask now and then.
import { describe, expect, it } from "vitest";
import { dreamSymbol, GRID, snap, thoughtShape } from "./thoughtCloud";

/** The shape's 4-connected pieces, each as its pixel count and lowest row. */
function pieces(s: ReturnType<typeof thoughtShape>) {
  const seen = new Uint8Array(s.w * s.h), out: { n: number; low: number }[] = [];
  for (let i = 0; i < s.px.length; i++) {
    if (!s.px[i] || seen[i]) continue;
    const q = [i]; seen[i] = 1; let n = 0, low = 0;
    while (q.length) {
      const j = q.pop()!, x = j % s.w, y = (j - x) / s.w; n++; low = Math.max(low, y);
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { const X = x + dx, Y = y + dy, k = Y * s.w + X; if (X >= 0 && Y >= 0 && X < s.w && Y < s.h && s.px[k] && !seen[k]) { seen[k] = 1; q.push(k); } }
    }
    out.push({ n, low });
  }
  return out.sort((a, b) => b.low - a.low); // (the sleeper's end first)
}

describe("a dream's thought bubble", () => {
  for (const [inner, puffs] of [[30, 3], [20, 3], [12, 2]] as const) it(`round a ${inner}-pixel symbol, with ${puffs} puffs`, () => {
    const s = thoughtShape(inner, puffs), at = (x: number, y: number) => (x < 0 || y < 0 || x >= s.w || y >= s.h ? 0 : s.px[y * s.w + x]);
    // its outline one pixel thick, as the speech bubbles': every fill pixel walled in, every outline pixel open on a side
    for (let y = 0; y < s.h; y++) for (let x = 0; x < s.w; x++) {
      const v = at(x, y), open = [at(x - 1, y), at(x + 1, y), at(x, y - 1), at(x, y + 1)].some(n => n === 0);
      if (v === 2) expect(open).toBe(false);
      if (v === 1) expect(open).toBe(true);
    }
    // the symbol's square inside the big cloud's fill
    for (let y = s.box.y; y < s.box.y + s.box.n; y++) for (let x = s.box.x; x < s.box.x + s.box.n; x++) expect(at(x, y)).toBe(2);
    // the big cloud and its puffs apart, smallest at the sleeper growing up to it, the foot in the smallest
    const p = pieces(s);
    expect(p.length).toBe(puffs + 1);
    for (let i = 1; i < p.length; i++) expect(p[i].n).toBeGreaterThan(p[i - 1].n);
    expect(at(s.foot.x, s.foot.y)).toBe(2);
    expect(p[0].low).toBeGreaterThanOrEqual(s.foot.y);
    // no fleck: every pixel held on two sides at least
    for (let y = 0; y < s.h; y++) for (let x = 0; x < s.w; x++) if (at(x, y)) expect([at(x - 1, y), at(x + 1, y), at(x, y - 1), at(x, y + 1)].filter(Boolean).length).toBeGreaterThanOrEqual(2);
  });

  it("sits on the game's 3 px grid", () => {
    expect(GRID).toBe(3);
    for (const v of [0, 1, 1.4, 1.6, 299.5, -4.4]) expect(snap(v) % 3 === 0).toBe(true);
    expect(snap(4.4)).toBe(3);
  });
});

describe("which symbol a dream shows", () => {
  const C = { hold: 1.8, fade: 0.3, flask: 0.25 };
  it("by turns: the emoji, then the quest sigil (now and then the flask), then the emoji again", () => {
    const kinds: string[] = [];
    for (let k = 0; k < 400; k++) kinds.push(dreamSymbol(k * C.hold + 0.9 - (5 % 11) * C.hold * 0.29, 5, C).kind);
    for (let k = 0; k < kinds.length; k++) expect(kinds[k] === "emoji").toBe(k % 2 === 0);
    const flasks = kinds.filter(k => k === "flask").length / 200;
    expect(flasks).toBeGreaterThan(0.12); expect(flasks).toBeLessThan(0.4);
    expect(kinds).toContain("sigil");
  });

  it("fades softly in and out at each swap, whole in the middle of its turn", () => {
    const at = (u: number) => dreamSymbol(u - (3 % 11) * C.hold * 0.29, 3, C);
    expect(at(C.hold * 4 + 0.001).alpha).toBeLessThan(0.05);
    expect(at(C.hold * 4 + C.fade / 2).alpha).toBeGreaterThan(0.2);
    expect(at(C.hold * 4 + C.hold / 2).alpha).toBe(1);
    expect(at(C.hold * 5 - 0.001).alpha).toBeLessThan(0.05);
  });

  it("neighbours don't swap together, and with no quest to show it's the emoji alone", () => {
    const a = [1, 2, 3, 4].map(id => dreamSymbol(10, id, C).kind);
    expect(new Set(a).size).toBeGreaterThan(1);
    expect(dreamSymbol(10.3, 7, C, false)).toEqual({ kind: "emoji", alpha: 1 });
    expect(dreamSymbol(10.3, 7, { ...C, flask: 0 }).kind).not.toBe("flask");
  });
});
