// The Workshop in the world (Ed, 2026-10-22/23; docs/backlog/workshop.md): her broom resting on the bay's trestles (on the lathe while
// she's at the lathe), drawn from her fitted parts, and the parts found hanging on the pegboard's 3 × 3 biome board (rules/broomParts.ts
// BOARD), each in its cell: a found one in her broom's colours, a missing one a dark outline, tonight's (the night's find, when it's a
// part: g.trunk) glowing in its cell (the board says one is out there, never where). Laid on Alpha's furniture by its marks
// (art/furniture.js: broomBay.rest, lathe.rest, pegboard.cell0 to cell8; render/houseRooms.ts places them), baked a piece a frame,
// once per look (art/workshop.js, in the house's pixel and light). Its pictures are also the bay's and the pegboard's cards
// (ui/stationPanel.ts: partCanvas). First versions: an art pass should draw each part's own sprite and her broom from its parts.
import * as THREE from "three";
import * as Art from "../../art/generator.js";
import { partSprite, restingBroomSprite } from "../../art/workshop.js";
import { BOARD, SLOTS, type Fitted } from "../rules/broomParts";
import { litCanvas, pixelTexture, type Drawn } from "./houseFurniture";
import type { Style } from "./style";

type V3 = { x: number; y: number; z: number };
/** A part hung on the pegboard, this long (house metres: its pixels at the house's ppm; a cell is about 1.6 m across). */
const PEG_FIT = 1.75;
/** Her broom's colours by material (her look's broom and bristles: its body and trim) and her magic's glow: only those, the parts'
 *  salvage (their steel, brass, old wood and rust) staying the Workshop's own (art/broomParts.js). */
let memo: { st: Style; g: unknown; c: Record<string, number[]> } | null = null;
export function broomColours(st: Style, genome: unknown): Record<string, number[]> {
  if (memo && memo.st === st && memo.g === genome) return memo.c;
  const all = coloursOf(st, genome), M = Art.M as Record<string, number>, c = Object.fromEntries([M.BROOM, M.STRAW, M.MAGIC, M.MAGIC2].map(k => [k, all[k]]));
  memo = { st, g: genome, c };
  return c;
}
function coloursOf(st: Style, genome: unknown): Record<string, number[]> {
  const look = (Art.genomeLook as (g: unknown) => { outfit: object | null })(genome ?? Art.WITCH_GENOME); // (null: the classic witch, hers)
  return (Art.witchColours as (st: Style, o?: object, x?: object) => Record<string, number[]>)(st, look.outfit ?? undefined, look.outfit ? { styleHues: false } : undefined);
}

/** A part's picture, lit in the Workshop's light in her broom's colours (`colours`: broomColours). */
export function partCanvas(st: Style, colours: Record<string, number[]>, id: string, o: { fit?: number; pitch?: number; yaw?: number; hung?: boolean } = {}): { c: HTMLCanvasElement; ox: number; oy: number } {
  const d = partSprite(id, o) as Drawn;
  return { c: litCanvas(d, "workshop", st, 1, "", colours), ox: d.origin.x, oy: d.origin.y };
}
/** A picture as a dark outline (a part not found yet: the pegboard's empty pegs), its edge `edge` and its inside a faint dark. */
export function outlineCanvas(src: HTMLCanvasElement, edge: number[] = [150, 140, 170], inside: number[] = [16, 12, 24, 150]): HTMLCanvasElement {
  const w = src.width, h = src.height, c = document.createElement("canvas"); c.width = w; c.height = h;
  const a = src.getContext("2d")!.getImageData(0, 0, w, h).data, x = c.getContext("2d")!, img = x.createImageData(w, h), o = img.data;
  const on = (i: number, j: number) => i >= 0 && j >= 0 && i < w && j < h && a[(j * w + i) * 4 + 3] > 0;
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    if (!on(i, j)) continue;
    const k = (j * w + i) * 4, rim = !on(i - 1, j) || !on(i + 1, j) || !on(i, j - 1) || !on(i, j + 1), q = rim ? [...edge, 255] : inside;
    o[k] = q[0]; o[k + 1] = q[1]; o[k + 2] = q[2]; o[k + 3] = q[3];
  }
  x.putImageData(img, 0, 0);
  return c;
}
/** A picture with a glowing rim round it, `pad` pixels out (tonight's part on the board): the canvas grows by pad each side. */
export function glowCanvas(src: HTMLCanvasElement, pad = 3, rgb: number[] = [255, 214, 120]): HTMLCanvasElement {
  const w = src.width + pad * 2, h = src.height + pad * 2, c = document.createElement("canvas"); c.width = w; c.height = h;
  const a = src.getContext("2d")!.getImageData(0, 0, src.width, src.height).data, x = c.getContext("2d")!, img = x.createImageData(w, h), o = img.data;
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    let d = pad + 1;
    for (let v = -pad; v <= pad && d > 1; v++) for (let u = -pad; u <= pad; u++) { const si = i - pad + u, sj = j - pad + v; if (si >= 0 && sj >= 0 && si < src.width && sj < src.height && a[(sj * src.width + si) * 4 + 3]) d = Math.min(d, Math.max(Math.abs(u), Math.abs(v))); }
    if (d > pad) continue;
    const k = (j * w + i) * 4, f = d <= 1 ? 1 : 1 - (d - 1) / pad; // (the rim bright, fading out; pixel steps, no blur)
    o[k] = rgb[0]; o[k + 1] = rgb[1]; o[k + 2] = rgb[2]; o[k + 3] = Math.round(255 * (f > .6 ? 1 : f > .3 ? .55 : .25));
  }
  x.putImageData(img, 0, 0);
  x.drawImage(src, pad, pad);
  return c;
}

/** Where a piece of furniture's mark is, `dx`, `dy` art pixels off it, in the world this frame (render/houseRooms.ts); null while the
 *  piece isn't baked yet. */
export type MarkAt = (piece: string, mark: string, dx: number, dy: number) => V3 | null;
/** What the Workshop shows: her parts, the ones she's found, tonight's (a part to find, not found yet) and where her broom rests. */
export interface WorkshopState { fitted: Fitted; found: ReadonlySet<string>; tonight: string | null; at: "bay" | "lathe"; genome: unknown }

interface Pic { key: string; mesh: THREE.Mesh; pos: Float32Array; w: number; h: number; ox: number; oy: number; piece: string; mark: string; glow?: boolean }

export class WorkshopArt {
  readonly group = new THREE.Group();
  private pics = new Map<string, Pic>();
  private want: { key: string; piece: string; mark: string; bake: () => { c: HTMLCanvasElement; ox: number; oy: number }; glow?: boolean }[] = [];

  /** A frame: what to show (`s`), how to bake (the house's style, pixel and pitch; each host piece's yaw) and where (markAt). `order`:
   *  each host piece's draw order, its pictures just after it. `t`: her clock, for tonight's glow. */
  update(s: WorkshopState, st: Style, ppm: number, pitch: number, yawOf: (piece: string) => number, markAt: MarkAt, orderOf: (piece: string) => number, t: number): void {
    const colours = broomColours(st, s.genome), ck = JSON.stringify([colours[(Art.M as Record<string, number>).BROOM], colours[(Art.M as Record<string, number>).STRAW]]);
    const host = s.at === "lathe" ? "lathe" : "broomBay";
    this.want = [{ key: `broom|${host}|${SLOTS.map(k => s.fitted[k] ?? "-").join(",")}|${ck}|${ppm.toFixed(3)}`, piece: host, mark: "rest",
      bake: () => { const d = restingBroomSprite(s.fitted, { ppm, pitch, yaw: yawOf(host), scale: host === "lathe" ? 1.5 : 2 }) as Drawn; return { c: litCanvas(d, "workshop", st, 1, "", colours), ox: d.origin.x, oy: d.origin.y }; } }];
    BOARD.forEach((cell, i) => {
      const found = s.found.has(cell.part), glow = !found && s.tonight === cell.part;
      this.want.push({ key: `cell${i}|${cell.part}|${found ? "found" : glow ? "tonight" : "missing"}|${found ? ck : ""}|${ppm.toFixed(3)}`, piece: "pegboard", mark: `cell${i}`, glow,
        bake: () => { const p = partCanvas(st, colours, cell.part, { fit: ppm * PEG_FIT, pitch, yaw: yawOf("pegboard"), hung: true }); if (found) return p; const o = outlineCanvas(p.c); return glow ? { c: glowCanvas(o), ox: p.ox + 3, oy: p.oy + 3 } : { ...p, c: o }; } });
    });
    // what's wanted and not baked: one a frame (the nearest piece first doesn't matter here: ten small pictures)
    const keys = new Set(this.want.map(w => w.key));
    for (const [k, p] of this.pics) if (!keys.has(k)) { this.group.remove(p.mesh); (p.mesh.material as THREE.MeshBasicMaterial).map?.dispose(); (p.mesh.material as THREE.Material).dispose(); p.mesh.geometry.dispose(); this.pics.delete(k); }
    const todo = this.want.find(w => !this.pics.has(w.key));
    if (todo) {
      const { c, ox, oy } = todo.bake(), geo = new THREE.BufferGeometry(), pos = new Float32Array(12);
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), 2));
      geo.setIndex([0, 1, 2, 0, 2, 3]);
      const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: pixelTexture(c), transparent: true, alphaTest: 0.05, side: THREE.DoubleSide, depthWrite: false, depthTest: false }));
      mesh.frustumCulled = false; this.group.add(mesh);
      this.pics.set(todo.key, { key: todo.key, mesh, pos, w: c.width, h: c.height, ox, oy, piece: todo.piece, mark: todo.mark, glow: todo.glow });
    }
    for (const p of this.pics.values()) {
      const corners = [[-p.ox, -p.oy], [p.w - p.ox, -p.oy], [p.w - p.ox, p.h - p.oy], [-p.ox, p.h - p.oy]].map(([dx, dy]) => markAt(p.piece, p.mark, dx, dy));
      p.mesh.visible = corners.every(Boolean);
      if (!p.mesh.visible) continue;
      corners.forEach((q, i) => { p.pos[i * 3] = q!.x; p.pos[i * 3 + 1] = q!.y; p.pos[i * 3 + 2] = q!.z; });
      (p.mesh.geometry.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
      p.mesh.renderOrder = orderOf(p.piece) + 0.00005;
      if (p.glow) (p.mesh.material as THREE.MeshBasicMaterial).opacity = 0.7 + 0.3 * Math.sin(t * 3); // (tonight's, breathing)
    }
  }
  dispose(): void { for (const p of this.pics.values()) { (p.mesh.material as THREE.MeshBasicMaterial).map?.dispose(); (p.mesh.material as THREE.Material).dispose(); p.mesh.geometry.dispose(); } this.pics.clear(); }
}
