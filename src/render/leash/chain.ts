// The leashes as chains (Ed, 2026-10-28, after the runestone mocks): every leash line, her stack's sigils to their creatures and a
// placed sigil to its own, drawn as a chain of links in its rank's colour, each link as long as its rank's (tuning leash.ranks.chain),
// a legend's tether's bigger still. A chain is laid from her end, so as it lengthens or shortens it gains or loses links at the
// creature's end. Its links are kept from frame to frame, each with where it was (px, py, pz) as well as where it is, so a solver
// (verlet) can drive them later; for now layChain lays them on a still arc (Ed will decide on their motion separately).
import type { LeashView } from "../leash";
import { SLOT, SLOTS } from "./glyphs";

export interface ChainLink { x: number; y: number; z: number; px: number; py: number; pz: number }
export interface Chain { links: ChainLink[] }

/** Lay `ch` from (ax, ay, az) to (bx, by, bz): links `link` m apart along the line, bowing up `arc` m in the middle. `count` holds the
 *  chain to that many links whatever the span (a legend's tether, its length its span at pick-up: it bows higher as she comes in
 *  closer), unless the span needs more; without it, as many as fit. Links are added or dropped at the far (creature's) end. */
export function layChain(ch: Chain, ax: number, ay: number, az: number, bx: number, by: number, bz: number, link: number, arc: number, count?: number): void {
  const span = Math.hypot(bx - ax, by - ay, bz - az), fit = Math.floor(span / link), n = Math.max(1, count === undefined ? fit : Math.max(count, fit));
  while (ch.links.length > n) ch.links.pop();
  while (ch.links.length < n) { const l = ch.links[ch.links.length - 1]; ch.links.push(l ? { ...l } : { x: ax, y: ay, z: az, px: ax, py: ay, pz: az }); }
  // A held chain longer than its span bows up as much as a parabola of its length would (s ≈ d + 8h²/3d).
  const slack = count !== undefined && n * link > span ? Math.sqrt((3 * span * (n * link - span)) / 8) : 0, h = Math.max(arc, slack);
  for (let i = 0; i < n; i++) {
    const k = count !== undefined ? (i + 1) / n : Math.min(1, ((i + 1) * link) / Math.max(span, 1e-6)), L = ch.links[i];
    L.x = L.px = ax + (bx - ax) * k; L.y = L.py = ay + (by - ay) * k + Math.sin(k * Math.PI) * h; L.z = L.pz = az + (bz - az) * k;
  }
}

/** The atlas's link glyphs (made once into the leash view's atlas): a link face on (an oval ring) and edge on (a bar). */
export function linkSlots(lv: LeashView): { face: number[]; edge: number[] } {
  const slot = (key: string, draw: (g: CanvasRenderingContext2D, ox: number, oy: number) => void): number[] => {
    const had = lv.slots.get(key);
    if (had !== undefined) return lv.uv(had);
    const s = lv.nextSlot++, g = lv.canvas.getContext("2d")!, ox = (s % SLOTS) * SLOT, oy = Math.floor(s / SLOTS) * SLOT;
    g.clearRect(ox, oy, SLOT, SLOT); g.fillStyle = "#fff"; draw(g, ox, oy);
    lv.slots.set(key, s); lv.tex.needsUpdate = true;
    return lv.uv(s);
  };
  return {
    face: slot("chain:face", (g, ox, oy) => { for (let y = 0; y < 32; y++) for (let x = 0; x < 32; x++) { const r = Math.hypot((x + 0.5 - 16) / 13, (y + 0.5 - 16) / 8); if (r <= 1 && r >= 0.62) g.fillRect(ox + x, oy + y, 1, 1); } }),
    edge: slot("chain:edge", (g, ox, oy) => g.fillRect(ox + 3, oy + 13, 26, 6)),
  };
}

/** Draw a laid chain: its links alternately face on and edge on, crisp (the solid batch), each with a faint glow of its colour. */
export function drawChain(lv: LeashView, ch: Chain, link: number, r: number, g: number, b: number, a: number, dot: number[], glow = 0.12): void {
  const S = linkSlots(lv);
  for (let i = 0; i < ch.links.length; i++) {
    const L = ch.links[i], face = i % 2 === 1;
    lv.solid.add(L.x, L.y, L.z, link * (face ? 1 : 0.9), face ? S.face : S.edge, r, g, b, a);
    if (glow > 0) lv.over.add(L.x, L.y, L.z, link * 1.4, dot, r, g, b, glow * a, 1, true);
  }
}
