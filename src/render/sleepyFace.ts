// A sleeping legend's face while it gives its quest (Ed, 2026-10-06: "mostly 😴 and occasionally 🥱😑😌🫠😮‍💨😔😪☺️"),
// shown in its dream bubble by render/leash.ts; and whether this browser can draw an emoji at all.
import { hash2 } from "../rules/random";
/** A sleeping legend's face now (tuning dreams.sleepy): its own throw each turn of `every` seconds (seeded by its id, the turns
 *  staggered by it too, so legends never change together): `face` with chance `weight`, else one of `faces`. */
export function sleepyFace(id: number, time: number, Z: { face: string; weight: number; every: number; faces: string[] }): string {
  const t = time / Math.max(0.5, Z.every) + (id % 97) * 0.37, turn = Math.floor(t), h = hash2(id, turn, 811);
  if (h < Z.weight || !Z.faces.length) return Z.face;
  return Z.faces[Math.floor(((h - Z.weight) / Math.max(1e-6, 1 - Z.weight)) * Z.faces.length) % Z.faces.length];
}
/** The emoji if this browser draws it (not the box of a missing glyph), else `or` (🫠 and 😮‍💨 are new). Asked once each. */
const emojiDrawn = new Map<string, boolean>();
export function emojiOr(e: string, or: string): string {
  let ok = emojiDrawn.get(e);
  if (ok === undefined) {
    ok = true;
    try {
      const c = document.createElement("canvas"); c.width = c.height = 24;
      const x = c.getContext("2d", { willReadFrequently: true });
      if (x) {
        const ink = (s: string) => { x.clearRect(0, 0, 24, 24); x.font = "20px sans-serif"; x.textAlign = "center"; x.textBaseline = "middle"; x.fillText(s, 12, 12); return x.getImageData(0, 0, 24, 24).data; };
        const a = ink(e), tofu = ink("\u{10FFFD}");
        let colour = false, same = true;
        for (let i = 0; i < a.length; i += 4) { if (a[i + 3] > 40 && Math.max(a[i], a[i + 1], a[i + 2]) - Math.min(a[i], a[i + 1], a[i + 2]) > 40) colour = true; if (a[i + 3] !== tofu[i + 3]) same = false; }
        ok = colour && !same; // (a drawn emoji has colour; a missing one is the grey box every missing glyph gets)
      }
    } catch { /* no canvas: trust it */ }
    emojiDrawn.set(e, ok);
  }
  return ok ? e : or;
}
