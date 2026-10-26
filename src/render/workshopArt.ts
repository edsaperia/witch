// The Workshop in the world (Ed, 2026-10-22/23; docs/backlog/workshop.md): her broom resting on the bay's trestles while she's at the
// bay (on the lathe while she's at the lathe; elsewhere it's in her hand on the Terrace, or not drawn: rules/stations.ts broomWhere),
// drawn from her fitted parts, and the parts found hanging on the pegboard's 3 × 3 biome board (rules/broomParts.ts
// BOARD), each in its cell: a found one in her broom's colours, a missing one a dark outline, tonight's (the night's find, when it's a
// part: g.trunk) glowing in its cell (the board says one is out there, never where). Laid on Alpha's furniture by its marks
// (art/furniture.js: broomBay.rest, lathe.rest, pegboard.cell0 to cell8; render/houseRooms.ts places them), drawn by the art
// workers once per look (render/workshopPieces.ts, in the house's pixel and light; without workers, here a frame each). Its pictures are also the bay's and the pegboard's cards
// (ui/stationPanel.ts: partCanvas). First versions: an art pass should draw each part's own sprite and her broom from its parts.
import * as THREE from "three";
import * as Art from "../../art/generator.js";
import { BOARD, SLOTS, type Fitted } from "../rules/broomParts";
import { pieceArt, type FurnitureArt } from "./houseFurniture";
import type { PiecePixels } from "./housePieces";
import { partPicture, workshopPicture, type WorkshopPic } from "./workshopPieces";
import { hashText } from "./artCache";
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

/** A part's picture, lit in the Workshop's light in her broom's colours (`colours`: broomColours), on the page (the bay's and the
 *  pegboard's cards: ui/stationPanel.ts). */
export function partCanvas(st: Style, colours: Record<string, number[]>, id: string, o: { fit?: number; pitch?: number; yaw?: number; hung?: boolean } = {}): { c: HTMLCanvasElement; ox: number; oy: number } {
  const p = partPicture(st, colours, id, pageCanvas, o);
  return { ...p, c: p.c as HTMLCanvasElement };
}
function pageCanvas(w: number, h: number): HTMLCanvasElement { const c = document.createElement("canvas"); c.width = w; c.height = h; c.getContext("2d", { willReadFrequently: true }); return c; }

/** Where a piece of furniture's mark is, `dx`, `dy` art pixels off it, in the world this frame (render/houseRooms.ts); null while the
 *  piece isn't baked yet. */
export type MarkAt = (piece: string, mark: string, dx: number, dy: number) => V3 | null;
/** What the Workshop shows: her parts, the ones she's found, tonight's (a part to find, not found yet) and where her broom rests. */
export interface WorkshopState { fitted: Fitted; found: ReadonlySet<string>; tonight: string | null; /** where her broom rests (null: not here, she's elsewhere: rules/stations.ts broomWhere) */ at: "bay" | "lathe" | null; genome: unknown }

interface Pic { key: string; mesh: THREE.Mesh; pos: Float32Array; w: number; h: number; ox: number; oy: number; piece: string; mark: string; glow?: boolean }
/** Asks the art workers for a picture (render/houseRooms.ts: Assets.oneOff, tracked); rejected without them. */
export type DrawPic = (key: string, pic: WorkshopPic) => Promise<PiecePixels>;

export class WorkshopArt {
  readonly group = new THREE.Group();
  private pics = new Map<string, Pic>();
  private want: { key: string; piece: string; mark: string; pic: WorkshopPic; glow?: boolean }[] = [];
  /** Asked of the workers; come back, waiting for their meshes; to draw here instead (no workers), a frame each. */
  private asked = new Set<string>();
  private came: { key: string; art: FurnitureArt }[] = [];
  private toDrawHere: string[] = [];

  /** A frame: what to show (`s`), how to bake (the house's style, pixel and pitch; each host piece's yaw), who draws (`draw`: the art
   *  workers) and where (markAt). `order`: each host piece's draw order, its pictures just after it. `t`: her clock, for tonight's glow. */
  update(s: WorkshopState, st: Style, ppm: number, pitch: number, yawOf: (piece: string) => number, markAt: MarkAt, orderOf: (piece: string) => number, t: number, draw: DrawPic): void {
    const colours = broomColours(st, s.genome), ck = hashText(JSON.stringify(colours));
    const host = s.at === "lathe" ? "lathe" : "broomBay";
    this.want = !s.at ? [] : [{ key: `broom|${host}|${SLOTS.map(k => s.fitted[k] ?? "-").join(",")}|${ck}|${ppm.toFixed(3)}|${pitch.toFixed(3)}`, piece: host, mark: "rest",
      pic: { what: "broom", fitted: s.fitted, host, ppm, pitch, yaw: yawOf(host), colours } }];
    BOARD.forEach((cell, i) => {
      const found = s.found.has(cell.part), glow = !found && s.tonight === cell.part, state = found ? "found" : glow ? "tonight" : "missing";
      this.want.push({ key: `cell${i}|${cell.part}|${state}|${found ? ck : ""}|${ppm.toFixed(3)}|${pitch.toFixed(3)}`, piece: "pegboard", mark: `cell${i}`, glow,
        pic: { what: "part", part: cell.part, state, fit: ppm * PEG_FIT, pitch, yaw: yawOf("pegboard"), colours } });
    });
    // what's wanted and not drawn: asked of the art workers (each one once), laid as it comes
    const keys = new Set(this.want.map(w => w.key));
    for (const [k, p] of this.pics) if (!keys.has(k)) { this.group.remove(p.mesh); (p.mesh.material as THREE.MeshBasicMaterial).map?.dispose(); (p.mesh.material as THREE.Material).dispose(); p.mesh.geometry.dispose(); this.pics.delete(k); }
    for (const w of this.want) if (!this.asked.has(w.key)) {
      this.asked.add(w.key);
      draw(w.key, w.pic).then(px => { this.came.push({ key: w.key, art: pieceArt(px) }); }, () => { this.toDrawHere.push(w.key); });
    }
    const here = this.toDrawHere.shift(), hw = here ? this.want.find(w => w.key === here) : undefined;
    if (hw) this.came.push({ key: hw.key, art: pieceArt(workshopPicture(hw.pic, st, pageCanvas)) });
    for (const { key, art } of this.came.splice(0)) {
      const w = this.want.find(q => q.key === key);
      if (!w || this.pics.has(key)) { art.tex.dispose(); if (!w) this.asked.delete(key); continue; } // (no longer wanted: asked again if it comes back)
      const geo = new THREE.BufferGeometry(), pos = new Float32Array(12);
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), 2));
      geo.setIndex([0, 1, 2, 0, 2, 3]);
      const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: art.tex, transparent: true, alphaTest: 0.05, side: THREE.DoubleSide, depthWrite: false, depthTest: false }));
      mesh.frustumCulled = false; this.group.add(mesh);
      this.pics.set(key, { key, mesh, pos, w: art.w, h: art.h, ox: art.ox, oy: art.oy, piece: w.piece, mark: w.mark, glow: w.glow });
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
