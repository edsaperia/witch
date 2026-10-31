import { HOUSE_ROOMS } from "../rules/houseRooms";
import { floorFrame, paintFloorRows, type Upright } from "../render/houseArt";
import uprights from "virtual:house-standing";
import { furnitureSprite, FURNITURE_IDS } from "../../art/furniture.js";
import { decorSprite } from "../../art/houseDecor.js";
import { messSprite } from "../../art/houseMess.js";
import { SIZE } from "../../art/furniture.js";
import { RUG_DIM, MESS_DIM } from "../render/houseDecor";
import { litCanvas, type Drawn } from "../render/housePieces";
import { loadStyle } from "../render/style";
import { artKey, attachedPoint, cameraYaw, corners, isHatZone, lightingRoom, rotate, zoneSlots, type Layout, type LayoutItem, type Placement } from "./houseLayout";

const PITCH = 24 * Math.PI / 180, SIN = Math.sin(PITCH), COS = Math.cos(PITCH), PPM = 6;
export const makeCanvas = (w: number, h: number): HTMLCanvasElement => { const c = document.createElement("canvas"); c.width = w; c.height = h; return c; };
export interface Frame { x: number; z: number; width: number; height: number }
export interface Mapping { scale: number; x: number; y: number; project(x: number, z: number, h?: number): { x: number; y: number }; unproject(x: number, y: number): { x: number; z: number } }
export function mapping(canvas: HTMLCanvasElement, frame: Frame, camera: boolean, zoom = 1): Mapping {
  const k = camera ? SIN : 1, scale = Math.min((canvas.width - 60) / frame.width, (canvas.height - 60) / (frame.height * k + (camera ? 14 : 0))) * zoom;
  const x = canvas.width / 2 - frame.x * scale, y = canvas.height / 2 - frame.z * scale * k;
  return { scale, x, y, project: (px, pz, h = 0) => ({ x: x + px * scale, y: y + (pz * k - h * (camera ? COS : 0)) * scale }), unproject: (px, py) => ({ x: (px - x) / scale, z: (py - y) / (scale * k) }) };
}
export class HousePreview {
  private floor: HTMLCanvasElement | null = null;
  private readonly floorBox = floorFrame(HOUSE_ROOMS, .35);
  private style = loadStyle();
  private art = new Map<string, { canvas: HTMLCanvasElement; ox: number; oy: number }>();
  private ids = new Set<string>(FURNITURE_IDS);
  async prepare(progress: (text: string) => void): Promise<void> {
    const F = this.floorBox, out = makeCanvas(F.w, F.h), ctx = out.getContext("2d")!;
    for (let j = 0; j < F.h; j += 12) {
      const rows = Math.min(12, F.h - j), data = paintFloorRows(HOUSE_ROOMS, .35, j, j + rows), px = new Uint8ClampedArray(data.rest);
      for (let i = 0; i < px.length; i += 4) if (data.terrace[i + 3]) px.set(data.terrace.subarray(i, i + 4), i);
      ctx.putImageData(new ImageData(px, F.w, rows), 0, j);
      progress(`Preparing house floor ${Math.round((j + rows) / F.h * 100)}%`);
      await new Promise<void>(resolve => requestAnimationFrame(() => resolve()));
    }
    this.floor = out;
  }
  /** Reuses the production model, room palette, bake and lighting; no screenshot stand-ins. */
  bake(item: LayoutItem, pose: Placement): boolean {
    if (!item.decor && !this.ids.has(item.id)) return false;
    const key = artKey(item, pose);
    if (this.art.has(key)) return true;
    const base = item.facing, yaw = cameraYaw(pose), d = item.decor;
    const drawn = (d ? d.kind === "mess" ? messSprite(d.of!, d.foot!, this.style, { ppm: PPM, pitch: PITCH, yaw })
      : decorSprite(d.kind, d.k, this.style, { ppm: PPM, pitch: PITCH, yaw, ...(d.r ? { r: d.r / SIZE } : {}) })
      : furnitureSprite(item.id, base.foot, this.style, { ppm: PPM, pitch: PITCH, yaw, curve: base.curve })) as Drawn;
    const dim = d?.kind === "rug" ? RUG_DIM : d?.kind === "mess" ? MESS_DIM : 1;
    const canvas = litCanvas(drawn, lightingRoom(pose), this.style, makeCanvas, dim, d ? "" : item.id) as HTMLCanvasElement;
    this.art.set(key, { canvas, ox: drawn.origin.x, oy: drawn.origin.y });
    // Authoring may explore many angles; retain a bounded image cache.
    if (this.art.size > 400) this.art.delete(this.art.keys().next().value!);
    return true;
  }
  draw(canvas: HTMLCanvasElement, items: LayoutItem[], layout: Layout, selected: string, frame: Frame, camera: boolean, zoom: number): Mapping {
    const rect = canvas.getBoundingClientRect(); canvas.width = Math.max(200, Math.round(rect.width)); canvas.height = Math.max(200, Math.round(rect.height));
    const ctx = canvas.getContext("2d")!, m = mapping(canvas, frame, camera, zoom), F = this.floorBox, k = camera ? SIN : 1;
    ctx.fillStyle = "#151b22"; ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.imageSmoothingEnabled = false;
    if (this.floor) { const p = m.project(F.x0, F.z0); ctx.drawImage(this.floor, p.x, p.y, F.ww * m.scale, F.hh * m.scale * k); }
    if (camera) for (const q of (uprights as Upright[]).filter(q => q.layer === 1)) this.wall(ctx, m, q);
    if (!camera) {
      ctx.font = "12px system-ui"; ctx.fillStyle = "#f3dca8"; ctx.textAlign = "center";
      for (const r of HOUSE_ROOMS.rooms) { const p = m.project(r.x, r.z); ctx.fillText(r.label, p.x, p.y - r.r * m.scale + 12); }
    }
    const byId = new Map(items.map(o => [o.id, o]));
    const floor = (id: string) => isHatZone(byId.get(id)!) || ["rug", "mess"].includes(byId.get(id)?.decor?.kind ?? "");
    for (const p of [...layout.objects].sort((a, b) => Number(floor(b.id)) - Number(floor(a.id)) || a.z - b.z)) {
      const o = byId.get(p.id)!, active = o.id === selected, pos = m.project(p.x, p.z);
      if (camera) {
        const art = this.art.get(artKey(o, p));
        if (art) { const s = m.scale / PPM; ctx.drawImage(art.canvas, pos.x - art.ox * s, pos.y - art.oy * s, art.canvas.width * s, art.canvas.height * s); }
        else { this.proxy(ctx, m, o, p); }
      }
      if (!camera || active) {
        const points = corners(o, p).map(c => m.project(c.x, c.z)); ctx.beginPath(); points.forEach((c, i) => i ? ctx.lineTo(c.x, c.y) : ctx.moveTo(c.x, c.y)); ctx.closePath();
        ctx.fillStyle = active ? "#ffc77855" : "#9ac6c522"; if (!camera) ctx.fill(); ctx.strokeStyle = active ? "#ffd079" : "#c3d2ce"; ctx.lineWidth = active ? 2 : 1; ctx.stroke();
        if (isHatZone(o)) {
          for (const slot of zoneSlots(o, p)) { const dot = m.project(slot.x, slot.z); ctx.beginPath(); ctx.arc(dot.x, dot.y, 2.5, 0, Math.PI * 2); ctx.fillStyle = "#dbb2ef"; ctx.fill(); }
        } else {
          const a = attachedPoint(o, p), anchor = m.project(a.x, a.z); ctx.beginPath(); ctx.moveTo(pos.x, pos.y); ctx.lineTo(anchor.x, anchor.y); ctx.strokeStyle = "#89e0da"; ctx.stroke();
          ctx.beginPath(); ctx.arc(anchor.x, anchor.y, 4, 0, Math.PI * 2); ctx.fillStyle = "#89e0da"; ctx.fill();
        }
        if (active) {
          const f = rotate(0, o.facing.foot.d / 2 + 1, p.rotation), front = m.project(p.x + f.x, p.z + f.z);
          ctx.beginPath(); ctx.moveTo(pos.x, pos.y); ctx.lineTo(front.x, front.y); ctx.strokeStyle = "#ffb67d"; ctx.lineWidth = 3; ctx.stroke();
          ctx.beginPath(); ctx.arc(front.x, front.y, 4, 0, Math.PI * 2); ctx.fillStyle = "#ffb67d"; ctx.fill();
          ctx.font = "bold 12px system-ui"; ctx.fillStyle = "#fff1d5"; ctx.textAlign = "center"; ctx.fillText(o.label, pos.x, pos.y + Math.max(16, o.d * m.scale * k / 2 + 14));
        }
      }
    }
    if (camera) for (const q of (uprights as Upright[]).filter(q => q.layer === 3)) this.wall(ctx, m, q);
    return m;
  }
  private wall(ctx: CanvasRenderingContext2D, m: Mapping, q: Upright): void {
    ctx.beginPath(); q.p.forEach(([x, z, h], i) => { const p = m.project(x, z, h); if (i) ctx.lineTo(p.x, p.y); else ctx.moveTo(p.x, p.y); }); ctx.closePath(); ctx.fillStyle = `rgb(${q.rgb.map(v => Math.round(v * 255)).join(",")})`; ctx.fill();
  }
  private proxy(ctx: CanvasRenderingContext2D, m: Mapping, o: LayoutItem, p: Placement): void {
    const cs = corners(o, p), top = cs.map(c => m.project(c.x, c.z, o.h));
    ctx.beginPath(); top.forEach((c, i) => i ? ctx.lineTo(c.x, c.y) : ctx.moveTo(c.x, c.y)); ctx.closePath(); ctx.fillStyle = "#868a9b"; ctx.fill(); ctx.strokeStyle = "#b4bac9"; ctx.stroke();
    ctx.fillStyle = "#fff"; ctx.font = "10px system-ui"; ctx.textAlign = "center"; const a = m.project(p.x, p.z, o.h); ctx.fillText(o.label, a.x, a.y - 5);
  }
}
