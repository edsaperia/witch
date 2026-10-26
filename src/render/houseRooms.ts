// The treehouse's placeholder rooms (Ed, 2026-10-19: "Plain plank boxes and corridors drawn by the game; the Ent's branches are left
// as they are"; rules/houseRooms.ts, config/house/): plank floors, walls (the front two, towards the camera, cut down to a
// skirting, as the hub's front is cut away), doorways where the corridors meet, and each object a plain box in its colour (working,
// the bed, placeholder), the hats' floor a rug with her hats lying on it. Isometric boxes (Ed, 2026-10-21: "more of an isometric
// view"): the plan's turned 45 degrees (rules/houseRooms.ts fromPlan), so each floor is a diamond, its two far walls standing behind
// it (the left lit, the right in shade) and each object shows its top and its two near sides; drawn far to near. Laid in the plane the Ent's house is drawn in, as she is
// (render/view/witch.ts: her place on the house's floor taken into the Ent's art pixels and along the ray from the camera), so she
// walks on them; drawn only while she's in the house (from outside the house isn't seen: treehouse.md). Over them, on the page:
// the object she's at, its name and E; a placeholder's line in a bubble a few seconds when she uses it; the bed's ring filling as
// E is held (rules/houseRooms.ts stepBed).
import * as THREE from "three";
import type { View } from "./view";
import { deckOf, type Deck } from "../rules/treehouse";
import { fromPlan, toPlan, HOUSE_ROOMS, hatsOnFloor, hatSlots, objectAt, type HouseObject } from "../rules/houseRooms";
import { groundHeight } from "./height";
import { alongRay } from "./view/home";
import { standing, type FloorPixels } from "./houseArt";
import { paintFloorOff } from "./houseFloor";
import type { PlanMap } from "./crown";
import { bakePieceHere, furnitureState, pieceArt, standing as facing, DRAWN_ELSEWHERE, FURNITURE, type FurnitureArt } from "./houseFurniture";
import { WorkshopArt } from "./workshopArt";
import { broomWhere, stationOf } from "../rules/stations";
import * as Art from "../../art/generator.js";
import { witchLookOf } from "./artBuild";
import { pileOut } from "../rules/clothesPile";
import { DECOR_ROOMS } from "./houseDecor";
import { Spotlight } from "./spotlight";
import { LoanSparkle } from "./loanSparkle";
import { UseGlow } from "./useGlow";
import { keycapCanvas, type KeycapGlyph } from "../ui/keyHint";
import { atDecks } from "../rules/wakeUp";
import { loanFind } from "../rules/finds";

type V3 = { x: number; y: number; z: number };
/** A quad of the rooms in metres on the house's plan (x, z from the hub's centre, rules/houseRooms.ts; h up off the floor) and its
 *  colour; `obj`, the object it's part of (lit when she's at it); `layer`, its place in the drawing (floors, walls, objects) and,
 *  within it, `depth`: how far south its nearest point is in the world (the far drawn first). */
interface Quad { p: [number, number, number][]; rgb: [number, number, number]; obj?: string; layer: number; depth: number }

const KIND: Record<HouseObject["use"]["kind"], [number, number, number]> = { creator: [0.32, 0.62, 0.45], hats: [0.32, 0.62, 0.45], zoo: [0.32, 0.62, 0.45], telescope: [0.32, 0.62, 0.45], bed: [0.82, 0.62, 0.3], say: [0.48, 0.42, 0.56], chart: [0.32, 0.62, 0.45], instrument: [0.62, 0.36, 0.7], pile: [0.32, 0.62, 0.45] };
/** How long a placeholder's line stays up (s). */
const SAY_FOR = 3.5;

/** How far south a point of the plan lies in the world (the hub's centre 0): the drawing's depth. */
const south = (x: number, z: number) => fromPlan({ x: 0, z: 0 }, x, z).z;
const quad = (p: [number, number, number][], rgb: [number, number, number], layer: number, obj?: string): Quad => ({ p, rgb, layer, depth: Math.max(...p.map(c => south(c[0], c[1]))), ...(obj ? { obj } : {}) });
/** In the drawing's order: floors, then walls, then objects; each far to near. */
const inOrder = (q: Quad[]) => q.sort((a, b) => a.layer - b.layer || a.depth - b.depth);

/** The rooms' quads, once: what stands up off the floor (render/houseArt.ts: the floor itself a painted texture, FloorMesh), and the
 *  objects' boxes. */
function buildQuads(): Quad[] {
  const q: Quad[] = [];
  for (const u of standing(HOUSE_ROOMS)) q.push(quad(u.p, u.rgb, u.layer));
  objects(q);
  return inOrder(q);
}

/** The objects: a box each (its two near sides and its top: the plan's x0 and z1 faces); the hats' floor a rug. */
function objects(q: Quad[]): void {
  for (const o of HOUSE_ROOMS.objects) {
    if (FURNITURE.has(o.id) || DRAWN_ELSEWHERE.has(o.id)) continue; // (drawn as art: render/houseFurniture.ts, or by another's)
    const c = KIND[o.use.kind], x0 = o.x - o.w / 2, x1 = o.x + o.w / 2, z0 = o.z - o.d / 2, z1 = o.z + o.d / 2, top: [number, number, number] = [c[0] * 1.15, c[1] * 1.15, c[2] * 1.15];
    if (o.use.kind === "hats") { q.push(quad([[x0, z0, 0.01], [x1, z0, 0.01], [x1, z1, 0.01], [x0, z1, 0.01]], [0.36, 0.16, 0.26], 2, o.id)); continue; }
    const box = [quad([[x0, z0, 0], [x0, z1, 0], [x0, z1, o.h], [x0, z0, o.h]], c, 2, o.id), quad([[x0, z1, 0], [x1, z1, 0], [x1, z1, o.h], [x0, z1, o.h]], [c[0] * 0.72, c[1] * 0.72, c[2] * 0.72], 2, o.id), quad([[x0, z0, o.h], [x1, z0, o.h], [x1, z1, o.h], [x0, z1, o.h]], top, 2, o.id)];
    const d = Math.max(...box.map(b => b.depth));
    for (const b of box) b.depth = d; // (an object's faces kept together, in this order: its sides, then its top)
    q.push(...box);
  }
}

/** A hat lying on the hats' floor: a cone and its brim, standing up off the floor, turned to the camera (in its slot's spell's band
 *  colour); (x, z) its slot on the plan. */
/** How tall a hat lying on the hats' floor is drawn (m): its label goes above it (tagHeight). */
export const HAT_TALL = 0.5;
/** How high over an object's middle its label sits (m): above the clothes pile, and above the hats lying on the hats' floor (Golf,
 *  2026-10-24: at 0.5 it lay across their row and hid them); 0.5 for the rest. */
export const tagHeight = (kind: string | undefined): number => (kind === "pile" ? 1.6 : kind === "hats" ? HAT_TALL + 0.7 : 0.5);
function hatQuads(x: number, z: number, i: number): Quad[] {
  const band: [number, number, number] = [[0.9, 0.5, 0.2], [0.4, 0.8, 0.9], [0.9, 0.35, 0.7], [0.5, 0.9, 0.4]][i % 4] as [number, number, number], dark: [number, number, number] = [0.16, 0.11, 0.24];
  const a = fromPlan({ x: 0, z: 0 }, 1, 0), b = fromPlan({ x: 0, z: 0 }, 0, 1), ex = [a.x, b.x]; // (the world's east on the plan: across the screen)
  const at = (e: number, h: number): [number, number, number] => [x + e * ex[0], z + e * ex[1], h];
  return [
    quad([at(-0.32, 0), at(0.32, 0), at(0.32, 0.06), at(-0.32, 0.06)], dark, 3),
    quad([at(-0.17, 0.06), at(0.17, 0.06), at(0.15, 0.13), at(-0.15, 0.13)], band, 3),
    quad([at(-0.15, 0.13), at(0.15, 0.13), at(0.04, HAT_TALL), at(-0.02, HAT_TALL)], dark, 3),
  ];
}

/** The plan's point under (x, z) metres from the hub's centre in the world. */
const toPlanAt0 = (x: number, z: number) => toPlan({ x: 0, z: 0 }, x, z);


/** North of this (m, the hub's centre 0), a quad is behind the hub: drawn first. */
const BEHIND = -3;
/** The rooms' drawing order (three.js's renderOrder: no depth, so what's drawn later is in front): behind the hub its floors and walls,
 *  then its furniture (furnitureOrder), then its near rails and rims (layer 3); the same again in front of it. */
export const ROOMS_ORDER = { back: 19.93, backNear: 19.934, front: 19.94, frontNear: 19.944 };
/** A piece of furniture's order: after its half's floors and walls, before its near rails; nearer pieces later (dz: plan metres south
 *  of the hub); a room's dressing before all furniture. */
export const furnitureOrder = (dz: number, decor = false): number => (dz < BEHIND ? 19.931 : 19.941) + (decor ? 0 : 0.001) + 0.0009 * (0.5 + Math.atan(dz / 30) / Math.PI);
/** The hats lying on the hats' floor (Golf, 2026-10-24: they didn't show; drawn with the floors, their own furniture, the rug, went over
 *  them): just after that piece, else after their half's furniture, and before its near rails, so a rail in front still hides them. */
export const hatsOrder = (dz: number, rug: number | null): number => (rug !== null ? rug + 1e-6 : dz < BEHIND ? ROOMS_ORDER.backNear - 1e-4 : ROOMS_ORDER.frontNear - 1e-4);

/** One of the two halves of the rooms' drawing: behind the hub (drawn first) or in front of it. */
class Part {
  readonly geo = new THREE.BufferGeometry();
  readonly mesh: THREE.Mesh;
  quads: Quad[] = [];
  pos = new Float32Array(0);
  col = new Float32Array(0);
  constructor(mat: THREE.Material, order: number) { this.mesh = new THREE.Mesh(this.geo, mat); this.mesh.frustumCulled = false; this.mesh.visible = false; this.mesh.renderOrder = order; }
  set(quads: Quad[]): void {
    this.quads = quads;
    const n = quads.length, idx: number[] = [];
    this.pos = new Float32Array(n * 4 * 3); this.col = new Float32Array(n * 4 * 3);
    for (let i = 0; i < n; i++) idx.push(i * 4, i * 4 + 1, i * 4 + 2, i * 4, i * 4 + 2, i * 4 + 3);
    this.geo.setIndex(idx);
    this.geo.setAttribute("position", new THREE.BufferAttribute(this.pos, 3));
    this.geo.setAttribute("color", new THREE.BufferAttribute(this.col, 3));
  }
}

/** The house's programs to come held by twins that are never shown, so the view compiles and links them with the rest before play
 *  (View.compileAll), as the beach's (render/ground.ts): the floors and the furniture take their textured materials only as their
 *  pictures come back from the art workers, often after the start, and a program's first draw waits for its link there (the
 *  coordinator, 2026-10-26: 2 to 10 s held at the start in some cold starts). Each the same material as its own, with a texel for a map:
 *  the floor's, the Terrace's and the furniture's (the Workshop's pictures and last night's clothes share the furniture's). */
function programTwins(): THREE.Mesh[] {
  const tex = new THREE.DataTexture(new Uint8Array(4), 1, 1, THREE.RGBAFormat);
  tex.colorSpace = THREE.NoColorSpace; tex.needsUpdate = true;
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(12), 3));
  geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), 2));
  geo.setIndex([0, 1, 2, 0, 2, 3]);
  return [
    { map: tex, transparent: true, depthWrite: false, depthTest: false, side: THREE.DoubleSide }, // (the floor's)
    { map: tex, alphaTest: 0.5, side: THREE.DoubleSide }, // (the Terrace's)
    { map: tex, transparent: true, alphaTest: 0.5, side: THREE.DoubleSide, depthWrite: false, depthTest: false }, // (a piece of furniture's)
  ].map(o => { const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial(o)); m.visible = false; m.frustumCulled = false; return m; });
}

export class HouseRoomsView {
  /** Its meshes, for the scene: behind the hub, and in front. */
  readonly meshes: THREE.Object3D[];
  // (a placeholder's floor plan over the picture: in the see-through pass (three.js draws every solid thing first), after the
  // trees' see-through passes, 11 and 19.9, before her, 19.95 in a room (render/view/witch.ts), so the trees round the house never
  // hide it nor it her; no depth, their own quads in order, the far ones first, floors, walls, then the objects)
  private readonly mat = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide, transparent: true, depthWrite: false, depthTest: false });
  // (the rooms' quads in four parts: behind the hub and in front of it, each split again round its furniture, so what stands in
  // front of a room's floor and pieces, its near rail and its rim, layer 3, is drawn after them; and a fifth, the hats lying on
  // the hats' floor, on top of their own piece: hatsOrder)
  private readonly parts: [Part, Part, Part, Part, Part];
  private quads: Quad[] = [];
  private hub = -1;
  private hatsKey = "";
  /** A hat on loan lying on the hats' floor, sparkling (render/loanSparkle.ts; Ed, 2026-10-24). */
  private sparkle: LoanSparkle | null = null;
  private readonly box: HTMLDivElement;
  private readonly tag: HTMLDivElement;
  private tagKey = "";
  /** While the prompt is a tap target (touch): the view's onUse. */
  private tapUse: ((down: boolean) => void) | null = null;
  private readonly bubble: HTMLDivElement;
  private readonly ring: HTMLDivElement;
  private said: { obj: HouseObject; at: number } | null = null;
  private readonly labels: { el: HTMLDivElement; x: number; z: number }[] = [];
  /** The furniture drawn as art (render/houseFurniture.ts): each piece's picture and its quad, baked a piece a frame as she first comes in. */
  private readonly furniture = new THREE.Group();
  /** Named points of the furniture in the world this frame, "<id>.<mark>" (the mic's spot lamp: "microphone.spot"), for the view. */
  readonly marks = new Map<string, V3>();
  private readonly pieces = new Map<string, { art: FurnitureArt; mesh: THREE.Mesh; pos: Float32Array; id: string; x: number; z: number }>();
  /** The Workshop's: her broom on the bay (or the lathe) and the parts on the pegboard, laid on those pieces' marks (render/workshopArt.ts). */
  private readonly workshop = new WorkshopArt();
  /** Pieces baked to nothing (a room with no dressing), not tried again. */
  private readonly empty = new Set<string>();
  /** The pieces asked of the art workers (render/housePieces.ts), by key; those that came back, waiting for their meshes; and those
   *  to bake here instead (no workers: the tests), a frame each. */
  private readonly asked = new Set<string>();
  private readonly came: { key: string; art: FurnitureArt | null }[] = [];
  private readonly toBakeHere: string[] = [];
  /** The light round the piece she can use (render/useGlow.ts), drawn just after it. */
  private readonly glow = new UseGlow();
  /** The Studio mic's cone of light from its spot lamp (render/spotlight.ts), drawn just after the mic. */
  private readonly spot = new Spotlight();
  // (the Ent's own floors, painted: render/houseArt.ts; a grid laid on the house's plane, an art pixel a texel)
  private readonly floor = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, depthTest: false, side: THREE.DoubleSide }));
  private floorArt: FloorPixels | null = null;
  /** The floor being painted off the page's thread (render/houseFloor.ts), and what came back. */
  private floorAsked = false;
  private floorCame: FloorPixels | null = null;
  // (the Terrace's own floor apart, in the solid pass, depth-tested, the same grid: she and the Ent's near half, its decks, stand on
  // it in front, where in the see-through pass it would be drawn over them; render/view/witch.ts draws her there, on the Terrace)
  private readonly terraceFloor = new THREE.Mesh(this.floor.geometry, new THREE.MeshBasicMaterial({ alphaTest: 0.5, side: THREE.DoubleSide }));
  /** The floors' own map from the house's plan into the world this frame (render/crown.ts lays the great oak's crown over them by
   *  it, in place of the rooms' leaf roofs: Ed, 2026-10-24), null while she isn't in the house. */
  plan: PlanMap | null = null;
  /** Her whole outfit (her genome, as the creator and the stations keep it), for last night's clothes in their pile: she herself is
   *  drawn in what she has on (main.ts: rules/clothesPile.ts wornGenome). */
  outfit: unknown = null;
  // (last night's clothes by her bed while she's not yet dressed: her outfit's own sprite, art/witch.js clothesPileSprite, of what's
  // still in the pile; drawn as the furniture is, a picture in the house's plane)
  private pile: { key: string; mesh: THREE.Mesh; pos: Float32Array; w: number; h: number } | null = null;

  constructor() {
    const R = ROOMS_ORDER;
    this.parts = [new Part(this.mat, R.back), new Part(this.mat, R.backNear), new Part(this.mat, R.front), new Part(this.mat, R.frontNear), new Part(this.mat, R.frontNear - 1e-4)];
    this.floor.frustumCulled = false; this.floor.visible = false; this.floor.renderOrder = 19.925;
    this.terraceFloor.frustumCulled = false; this.terraceFloor.visible = false;
    this.furniture.add(this.spot.mesh, this.glow.mesh);
    this.meshes = [this.floor, this.terraceFloor, ...this.parts.map(p => p.mesh), this.furniture, this.workshop.group, ...programTwins()];
    this.box = document.createElement("div");
    this.box.id = "house-tags"; // (hidden under a table's chart: ui/chartOverlay.ts)
    this.box.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:11;display:none";
    const pill = "position:absolute;transform:translate(-50%,-100%);white-space:nowrap;font:600 14px/1.2 inherit;padding:3px 8px;border-radius:8px;";
    this.tag = document.createElement("div"); this.tag.style.cssText = "position:absolute;transform:translate(-50%,-100%);filter:drop-shadow(0 0 3px rgba(255,214,140,.55))"; // (a keycap alone: ui/keyHint.ts)
    // (on a touch screen the prompt is itself the button: a tap uses the object, as the touch sigil button does; ui/touch.ts)
    this.tag.addEventListener("pointerdown", e => { if (this.tapUse) { e.preventDefault(); this.tapUse(true); } });
    for (const ev of ["pointerup", "pointerleave", "pointercancel"]) this.tag.addEventListener(ev, () => this.tapUse?.(false));
    this.bubble = document.createElement("div"); this.bubble.style.cssText = pill + "background:rgba(250,244,255,.94);color:#2a1d38;border-radius:12px;padding:6px 12px;max-width:320px;white-space:normal;text-align:center";
    this.ring = document.createElement("div"); this.ring.style.cssText = "position:absolute;width:38px;height:38px;transform:translate(-50%,-50%);border-radius:50%";
    this.box.append(this.tag, this.bubble, this.ring);
    // (?rooms=labels: each room's name on its floor, for the plan's shots)
    if (typeof location !== "undefined" && /[?&]rooms=labels/.test(location.search)) for (const r of HOUSE_ROOMS.rooms) {
      const el = document.createElement("div"); el.textContent = r.label;
      el.style.cssText = "position:absolute;transform:translate(-50%,-50%);white-space:nowrap;font:700 15px/1.1 inherit;padding:2px 7px;border-radius:6px;background:rgba(255,236,190,.92);color:#2a1d38";
      this.box.append(el); this.labels.push({ el, x: r.x, z: r.z });
    }
    document.body.append(this.box);
  }

  /** Another night at a house with rooms (View.setGame): its plan made afresh, nothing said. */
  reset(): void {
    this.hub = -1; this.quads = []; this.hatsKey = ""; this.said = null; this.box.style.display = "none";
    for (const p of this.parts) p.mesh.visible = false;
  }
  /** Off the page (an island whose treehouse has no rooms): its meshes' geometry and material let go, its labels taken off. */
  dispose(): void {
    for (const p of this.parts) p.geo.dispose();
    this.mat.dispose(); this.box.remove();
    for (const { art, mesh } of this.pieces.values()) { art.tex.dispose(); mesh.geometry.dispose(); (mesh.material as THREE.Material).dispose(); }
    this.workshop.dispose();
    this.spot.dispose();
    this.sparkle?.canvas.remove();
  }

  /** A frame: `onTreehouse` takes a point of the Ent's art (pixels) into the world (render/view.ts); `ht`, her clock. */
  update(v: View, onTreehouse: (px: number, py: number) => V3, ht: number): void {
    const g = v.game, w = g.witch, t = g.tuning, T = v.assets.treehouse, d = deckOf(g.map, t);
    const shown = !!(d?.house?.rooms && T.ent && w.perch && (w.mode === "ground" || w.mode === "descending")); // (at her decks too: the Terrace the oak's floor, render/houseArt.ts)
    for (const p of this.parts) p.mesh.visible = shown;
    this.furniture.visible = shown;
    this.workshop.group.visible = shown;
    this.floor.visible = this.terraceFloor.visible = shown;
    if (!shown) { this.box.style.display = "none"; this.plan = null; this.sparkle?.draw([], 0, 1); return; }
    const D = d as Deck & { house: NonNullable<Deck["house"]> };
    if (this.hub !== D.r) { this.hub = D.r; this.quads = buildQuads(); this.hatsKey = ""; }
    // her hats on the hats' floor (rules/houseRooms.ts floorHats: laid out the first time she comes in)
    const W = g.witches[0], hats = hatsOnFloor(W), key = hats.join();
    if (key !== this.hatsKey) {
      this.hatsKey = key;
      const slots = hatSlots({ x: 0, z: 0 }).map(p => toPlanAt0(p.x, p.z)), base = this.quads.filter(q => !q.obj?.startsWith("hat:"));
      hats.forEach((s, i) => { if (s) for (const q of hatQuads(slots[i].x, slots[i].z, i)) base.push({ ...q, obj: `hat:${i}` }); });
      this.quads = inOrder(base);
      const behind = (q: Quad) => q.depth < BEHIND, near = (q: Quad) => q.layer === 3, hat = (q: Quad) => !!q.obj?.startsWith("hat:"), room = this.quads.filter(q => !hat(q));
      this.parts[0].set(room.filter(q => behind(q) && !near(q))); this.parts[1].set(room.filter(q => behind(q) && near(q)));
      this.parts[2].set(room.filter(q => !behind(q) && !near(q))); this.parts[3].set(room.filter(q => !behind(q) && near(q)));
      this.parts[4].set(this.quads.filter(hat));
    }
    // the house's plane (render/view/witch.ts): x across the Ent's art in its pixels, z down it, h up it; along the ray by z
    const ky = (T.seat.y - T.ent!.deck.y) / Math.max(0.1, D.seat.z - D.z), g0 = groundHeight(D.x, D.z);
    // (each point of the plan turned into the house's metres first: rules/houseRooms.ts fromPlan)
    const toWorld = (px: number, pz: number, h: number): V3 => { const { x, z } = fromPlan({ x: 0, z: 0 }, px, pz), p = onTreehouse(T.ent!.deck.x + x / v.mpp, T.ent!.deck.y + z * ky + v.houseShift - h / v.mpp); return alongRay(v, { x: p.x, y: p.y + g0, z: p.z }, z); }; // (slid up the plane with her: render/view/witch.ts houseShift)
    if (this.floor.visible && !this.floorArt) {
      // (painted by workers, the first time it's shown: the boot freeze, 2026-10-25; the floor shows once it's come)
      if (!this.floorAsked) { this.floorAsked = true; const p = paintFloorOff(v.mpp).then(F => { this.floorCame = F; }); v.assets.track("houseFloor", p); }
      if (!this.floorCame) this.floor.visible = this.terraceFloor.visible = false;
    }
    if (this.floor.visible) {
      const N = 48;
      if (!this.floorArt) {
        const A = (this.floorArt = this.floorCame!);
        for (const [mesh, px] of [[this.floor, A.rest], [this.terraceFloor, A.terrace]] as const) {
          const tex = new THREE.DataTexture(px, A.w, A.h, THREE.RGBAFormat);
          tex.magFilter = THREE.NearestFilter; tex.minFilter = THREE.NearestFilter; tex.generateMipmaps = false; tex.flipY = false; tex.colorSpace = THREE.NoColorSpace; tex.needsUpdate = true; // (its colours as the quads' vertex colours are: as they are)
          (mesh.material as THREE.MeshBasicMaterial).map = tex; (mesh.material as THREE.MeshBasicMaterial).needsUpdate = true;
        }
        const uv: number[] = [], idx: number[] = [];
        for (let j = 0; j <= N; j++) for (let i = 0; i <= N; i++) uv.push(i / N, j / N);
        for (let j = 0; j < N; j++) for (let i = 0; i < N; i++) { const a = j * (N + 1) + i; idx.push(a, a + 1, a + N + 2, a, a + N + 2, a + N + 1); }
        this.floor.geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array((N + 1) * (N + 1) * 3), 3));
        this.floor.geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uv, 2)); this.floor.geometry.setIndex(idx);
      }
      const A = this.floorArt, pos = this.floor.geometry.getAttribute("position") as THREE.BufferAttribute;
      for (let j = 0, k = 0; j <= N; j++) for (let i = 0; i <= N; i++, k++) { const p = toWorld(A.x0 + (A.ww * i) / N, A.z0 + (A.hh * j) / N, 0); pos.setXYZ(k, p.x, p.y, p.z); }
      pos.needsUpdate = true;
    }
    // (the floors' map without the push along the camera's rays, which moves nothing on the screen: what's laid over them in their
    // plane, the crown, is drawn after them with no depth)
    { const flat = (px: number, pz: number, h: number) => { const { x, z } = fromPlan({ x: 0, z: 0 }, px, pz), p = onTreehouse(T.ent!.deck.x + x / v.mpp, T.ent!.deck.y + z * ky + v.houseShift - h / v.mpp); return new THREE.Vector3(p.x, p.y + g0, p.z); }; // (slid with the rooms: houseShift)
      const o = flat(0, 0, 0); this.plan = { o, ex: flat(1, 0, 0).sub(o), ey: flat(0, 0, 1).sub(o), ez: flat(0, 1, 0).sub(o) }; }
    const at = objectAt(D, w.x, w.z), lit = at && at.id !== v.houseOpen ? at.id : undefined; // (lit, the one she can use; out while it's open)
    for (const P of this.parts) {
      let k = 0;
      for (const q of P.quads) {
        const glow = q.obj && (q.obj === lit || (lit === "hats" && q.obj.startsWith("hat:"))) ? 1.45 : 1;
        for (const [x, z, h] of q.p) { const p = toWorld(x, z, h); P.pos[k] = p.x; P.pos[k + 1] = p.y; P.pos[k + 2] = p.z; P.col[k] = Math.min(1, q.rgb[0] * glow); P.col[k + 1] = Math.min(1, q.rgb[1] * glow); P.col[k + 2] = Math.min(1, q.rgb[2] * glow); k += 3; }
      }
      (P.geo.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
      (P.geo.getAttribute("color") as THREE.BufferAttribute).needsUpdate = true;
    }
    // the furniture: each piece baked by the art workers (the house's pixel and its view's pitch: its plane takes plan depth z to z * ky pixels down,
    // so the view looks down at asin(ky * mpp)), each laid as a picture its floor's middle on the object's middle, after its part's
    // floors and walls and before its near rails (nearer pieces later)
    // (each piece keyed by its id and the state it's drawn in now)
    const pieceKey = (o: HouseObject) => `${o.id}|${furnitureState(o.id, g) ?? ""}`;
    // (every piece asked of the art workers the first time the house shows, the nearest her first: a piece is tens of milliseconds to
    // bake, a room's dressing hundreds, on Ed's laptop well over 100 ms a frame each when they were baked here as she came near (his
    // playtest of v4515); each one tracked, so the shots and the bench wait for them; without workers, baked here, a frame each)
    const here = toPlanAt0(w.x - D.x, w.z - D.z), pitch = Math.asin(Math.min(.95, Math.max(.2, ky * v.mpp))), ppm = 1 / v.mpp;
    const wanted: { key: string; x: number; z: number }[] = [];
    for (const o of HOUSE_ROOMS.objects) if (FURNITURE.has(o.id)) wanted.push({ key: pieceKey(o), x: o.x, z: o.z });
    for (const r of DECOR_ROOMS) wanted.push({ key: `decor:${r.id}`, x: (r.x0 + r.x1) / 2, z: (r.z0 + r.z1) / 2 });
    for (const q of wanted.filter(q => !this.asked.has(q.key)).sort((a, b) => Math.hypot(a.x - here.x, a.z - here.z) - Math.hypot(b.x - here.x, b.z - here.z))) {
      this.asked.add(q.key);
      const p = v.assets.oneOff({ kind: "housePiece", id: `${q.key}@${ppm.toFixed(4)}:${pitch.toFixed(4)}`, style: v.assets.style, ppm, pitch })
        .then(r => { this.came.push({ key: q.key, art: r.housePiece ? pieceArt(r.housePiece) : null }); }, () => { this.toBakeHere.push(q.key); });
      v.assets.track(`housePiece:${q.key}`, p);
    }
    const bakedHere = this.toBakeHere.shift();
    if (bakedHere) this.came.push({ key: bakedHere, art: bakePieceHere(bakedHere, v.assets.style, ppm, pitch) });
    for (const { key, art } of this.came.splice(0)) {
      if (!art) { this.empty.add(key); continue; }
      const decor = key.startsWith("decor:"), id = decor ? key : key.split("|")[0], at = wanted.find(q => q.key === key);
      if (!at || this.pieces.has(key)) { art.tex.dispose(); continue; }
      const geo = new THREE.BufferGeometry(), pos = new Float32Array(12);
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), 2));
      geo.setIndex([0, 1, 2, 0, 2, 3]);
      const mat = new THREE.MeshBasicMaterial({ map: art.tex, transparent: true, alphaTest: 0.5, side: THREE.DoubleSide, depthWrite: false, depthTest: false });
      // (after its part's floors and walls, before its near rails; nearer pieces later; a room's dressing before all furniture)
      const mesh = new THREE.Mesh(geo, mat);
      mesh.frustumCulled = false; mesh.renderOrder = furnitureOrder(south(at.x, at.z), decor);
      this.furniture.add(mesh); this.pieces.set(key, { art, mesh, pos, id, x: at.x, z: at.z });
    }
    const pxWorld = (px: number, pz: number, dx: number, dy: number): V3 => { const { x, z } = fromPlan({ x: 0, z: 0 }, px, pz), p = onTreehouse(T.ent!.deck.x + x / v.mpp + dx, T.ent!.deck.y + z * ky + v.houseShift + dy); return alongRay(v, { x: p.x, y: p.y + g0, z: p.z }, z); };
    let glowed = false;
    const now = performance.now() / 1000;
    for (const [k, { art, mesh, pos, id, x, z }] of this.pieces) {
      const o = HOUSE_ROOMS.objects.find(q => q.id === id);
      mesh.visible = !o || k === pieceKey(o); // (a piece in another state than now's, hidden; a room's dressing always)
      if (!mesh.visible) continue;
      // (corners in the picture's pixels from its floor's middle: top-left, top-right, bottom-right, bottom-left; flipY off, so v 0 is its top)
      [[-art.ox, -art.oy], [art.w - art.ox, -art.oy], [art.w - art.ox, art.h - art.oy], [-art.ox, art.h - art.oy]].forEach(([dx, dy], i) => { const p = pxWorld(x, z, dx, dy); pos[i * 3] = p.x; pos[i * 3 + 1] = p.y; pos[i * 3 + 2] = p.z; });
      for (const [name, q] of Object.entries(art.marks)) this.marks.set(`${id}.${name}`, pxWorld(x, z, q.x - art.ox, q.y - art.oy));
      this.marks.set(`${id}.top`, pxWorld(x, z, art.top.x - art.ox, art.top.y - art.oy)); // (its top as drawn: pins clear it, render/pins.ts)
      (mesh.geometry.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
      (mesh.material as THREE.MeshBasicMaterial).color.setScalar(id === lit ? 1.15 : 1);
      if (id === lit) { this.glow.set(art.tex, art.w, art.h, -art.ox, -art.oy, (dx, dy) => pxWorld(x, z, dx, dy), mesh.renderOrder, now); glowed = true; }
    }
    // the Workshop's (render/workshopArt.ts): her broom resting on the bay while she's at it, on the lathe while she's at that (Ed,
    // 2026-10-23: "only while she's at the bay"; rules/stations.ts broomWhere), her parts on the pegboard;
    // only in or near the Workshop (its pieces baked: they're baked as she nears them)
    const piece = (id: string) => { for (const p of this.pieces.values()) if (p.id === id && p.mesh.visible) return p; return null; };
    // (the hats on top of the hats' floor's own piece, wherever the house puts it)
    const floorOf = HOUSE_ROOMS.objects.find(o => o.use.kind === "hats");
    if (floorOf) this.parts[4].mesh.renderOrder = hatsOrder(south(floorOf.x, floorOf.z), piece(floorOf.id)?.mesh.renderOrder ?? null);
    // (every frame the house shows, its pieces there or not: its pictures asked of the workers at once, laid once their pieces are in)
    {
      const tr = g.trunk, tonight = tr && tr.kind === "part" && !tr.found ? tr.item : null, where = broomWhere(g, stationOf(g, null, t)?.id ?? null, t);
      this.workshop.update({ fitted: W.spells.parts, found: v.partsFound, tonight, at: where === "bay" || where === "lathe" ? where : null, genome: v.assets.witchGenome }, v.assets.style, 1 / v.mpp, pitch,
        id => { const o = HOUSE_ROOMS.objects.find(q => q.id === id); return o ? facing(o).yaw : 0; },
        (id, mark, dx, dy) => { const p = piece(id), q = p?.art.marks[mark]; return p && q ? pxWorld(p.x, p.z, q.x - p.art.ox + dx, q.y - p.art.oy + dy) : null; },
        id => piece(id)?.mesh.renderOrder ?? 19.94, ht,
        (key, pic) => { const p = v.assets.oneOff({ kind: "workshopPic", id: key, style: v.assets.style, pic }).then(r => r.housePiece ?? Promise.reject(new Error("nothing drawn"))); v.assets.track(`workshopPic:${key}`, p); return p; });
    }
    // the mic's spotlight, from its lamp down to the floor round its foot (its `spot` mark: art/furniture.js)
    const mic = [...this.pieces.values()].find(p => p.id === "microphone" && p.mesh.visible && p.art.marks.spot);
    if (mic) { const s = mic.art.marks.spot; this.spot.place({ x: s.x - mic.art.ox, y: s.y - mic.art.oy }, 1 / v.mpp, ky, (dx, dy) => pxWorld(mic.x, mic.z, dx, dy), mic.mesh.renderOrder + 0.00001); }
    else this.spot.mesh.visible = false;
    // last night's clothes, in a pile by her bed (rules/clothesPile.ts): what's still in it, till she's dressed
    const po = HOUSE_ROOMS.objects.find(o => o.use.kind === "pile"), slots = pileOut(g.wake) ? g.wake!.pile! : []; // (none on her first wake-up)
    if (po && slots.length) {
      const key = `${JSON.stringify(this.outfit)}|${slots.join()}`;
      if (this.pile?.key !== key) {
        if (this.pile) { this.furniture.remove(this.pile.mesh); this.pile.mesh.geometry.dispose(); ((this.pile.mesh.material as THREE.MeshBasicMaterial).map)?.dispose(); (this.pile.mesh.material as THREE.Material).dispose(); this.pile = null; }
        const st = v.assets.style, mine = witchLookOf(st, this.outfit), sp = (Art.clothesPileSprite as (st: object, o: object) => { w: number; h: number } | null)(st, { look: mine.look, slots });
        if (sp) {
          const b = (Art.bake as (sp: object, c: object, st: object, o: unknown) => { A: HTMLCanvasElement })(sp, mine.colours, st, (st as { cOutline?: unknown }).cOutline), tex = new THREE.CanvasTexture(b.A);
          tex.magFilter = tex.minFilter = THREE.NearestFilter; tex.generateMipmaps = false; tex.colorSpace = THREE.NoColorSpace; tex.flipY = false;
          const geo = new THREE.BufferGeometry(), pos = new Float32Array(12);
          geo.setAttribute("position", new THREE.BufferAttribute(pos, 3)); geo.setAttribute("uv", new THREE.BufferAttribute(new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), 2)); geo.setIndex([0, 1, 2, 0, 2, 3]);
          const mesh = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ map: tex, transparent: true, alphaTest: 0.5, side: THREE.DoubleSide, depthWrite: false, depthTest: false }));
          mesh.frustumCulled = false; mesh.renderOrder = 19.9425; this.furniture.add(mesh);
          this.pile = { key, mesh, pos, w: sp.w, h: sp.h };
        }
      }
      if (this.pile) {
        const P = this.pile; P.mesh.visible = true;
        [[-P.w / 2, -P.h], [P.w / 2, -P.h], [P.w / 2, 0], [-P.w / 2, 0]].forEach(([dx, dy], i) => { const p = pxWorld(po.x, po.z, dx, dy); P.pos[i * 3] = p.x; P.pos[i * 3 + 1] = p.y; P.pos[i * 3 + 2] = p.z; });
        (P.mesh.geometry.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
        (P.mesh.material as THREE.MeshBasicMaterial).color.setScalar(po.id === lit ? 1.15 : 1);
        if (po.id === lit && !glowed) { this.glow.set((P.mesh.material as THREE.MeshBasicMaterial).map, P.w, P.h, -P.w / 2, -P.h, (dx, dy) => pxWorld(po.x, po.z, dx, dy), P.mesh.renderOrder, now); glowed = true; }
      }
    } else if (this.pile) this.pile.mesh.visible = false;
    if (!glowed) this.glow.set(null);
    // on the page: the object she's at, a placeholder's line, the bed's ring
    for (const e of g.leashEvents) if (e.kind === "house" && e.obj) { const o = HOUSE_ROOMS.objects.find(q => q.id === e.obj); if (o?.use.kind === "say") this.said = { obj: o, at: ht }; }
    if (this.said && (ht - this.said.at > SAY_FOR || this.said.at > ht)) this.said = null;
    const cv = v.canvas.getBoundingClientRect(), screen = (o: HouseObject, up: number) => { const p = toWorld(o.x, o.z, o.h + up), s = v.v3.set(p.x, p.y, p.z).project(v.camera); return [cv.left + (s.x + 1) / 2 * cv.width, cv.top + (1 - s.y) / 2 * cv.height]; };
    const place = (el: HTMLElement, o: HouseObject | null, up: number, text?: string) => {
      if (!o) { el.style.display = "none"; return; }
      const [x, y] = screen(o, up); el.style.display = "block"; el.style.left = `${x}px`; el.style.top = `${y}px`;
      if (text !== undefined && el.textContent !== text) el.textContent = text;
    };
    this.box.style.display = "block";
    for (const L of this.labels) { const p = toWorld(L.x, L.z, 0), s = v.v3.set(p.x, p.y, p.z).project(v.camera); L.el.style.left = `${cv.left + (s.x + 1) / 2 * cv.width}px`; L.el.style.top = `${cv.top + (1 - s.y) / 2 * cv.height}px`; }
    // her head on the page in the house, as its labels are placed (her dream's cloud rises from it: render/dream.ts; her own drawing's
    // world point lies elsewhere in the house's plane)
    { const me = toPlanAt0(w.x - D.x, w.z - D.z), p = toWorld(me.x, me.z, v.witchTall || 1.8), q = v.v3.set(p.x, p.y, p.z).project(v.camera); v.herHouseHead.x = cv.left + (q.x + 1) / 2 * cv.width; v.herHouseHead.y = cv.top + (1 - q.y) / 2 * cv.height; v.herHouseHead.at = performance.now(); }
    // a hat on loan lying on the hats' floor sparkles (Ed, 2026-10-24: no words, sparkly), till she sleeps on it
    const lf = loanFind(g, g.map.treehouse.x, g.map.treehouse.z), li = lf?.kind === "hat" ? hats.indexOf(lf.item) : -1, glints: { x: number; y: number; r: number }[] = [];
    if (li >= 0) {
      const sl = toPlanAt0(hatSlots({ x: 0, z: 0 })[li].x, hatSlots({ x: 0, z: 0 })[li].z), p = toWorld(sl.x, sl.z, 0.2), q = v.v3.set(p.x, p.y, p.z).project(v.camera), px = cv.width / v.width / v.mpp;
      glints.push({ x: cv.left + (q.x + 1) / 2 * cv.width, y: cv.top + (1 - q.y) / 2 * cv.height, r: Math.max(18, px * 0.45) });
    }
    if (glints.length || this.sparkle) (this.sparkle ??= new LoanSparkle()).draw(glints, performance.now() / 1000, Math.max(2, Math.round(cv.width / v.width * 3)));
    const waking = !!g.wake && (!g.wake.open || (at?.use.kind === "bed" && g.party.spellAt === null)); // (the new opening's wake-up, rules/wakeUp.ts: no tag while she's in bed; the bed's not for sleeping yet)
    // over it, the button that uses it (Ed's playtest, 2026-10-26: "there's a prompt showing the button to press to open it"; then
    // "Please remove words from the station tags. We used to have little keys to show 'WASD', can we use these for E"): a keycap
    // alone, the old walking keys' (ui/keyHint.ts), E, the pad's □, or on a touch screen the keycap itself to tap; none while it's
    // open. Up at her decks before the party, E there starts it (rules/wakeUp.ts atDecks).
    const decks = !at && g.wake?.open && g.party.spellAt === null && atDecks(g) ? decksSpot(D) : null;
    const tagged = decks ?? (at && !this.said && !waking && !(at.use.kind === "pile" && !pileOut(g.wake)) ? at : null);
    const usable = tagged && tagged.id !== v.houseOpen ? tagged : null, px = Math.max(2, Math.round(cv.width / Math.max(1, v.width))), glyph = USE_GLYPH[v.useDevice], cap = `${glyph}|${px}`;
    if (cap !== this.tagKey) { this.tagKey = cap; this.tag.replaceChildren(keycapCanvas(glyph, px)); }
    this.tapUse = usable && v.useDevice === "touch" ? v.onUse : null;
    this.tag.style.pointerEvents = this.tapUse ? "auto" : "none";
    place(this.tag, usable, decks ? 1.9 : tagHeight(usable?.use.kind));
    place(this.bubble, this.said?.obj ?? null, 0.6, this.said?.obj.use.kind === "say" ? this.said.obj.use.line : "");
    const from = W.house?.bedFrom, bed = at?.use.kind === "bed" ? at : null;
    if (bed && from !== undefined) {
      const f = Math.min(1, (ht - from) / Math.max(1e-6, HOUSE_ROOMS.bed.hold));
      place(this.ring, bed, 1.6);
      this.ring.style.background = `conic-gradient(rgba(255,214,140,.95) ${f * 360}deg, rgba(20,14,32,.6) 0deg)`;
      this.ring.style.boxShadow = "0 0 0 3px rgba(20,14,32,.7) inset";
    } else this.ring.style.display = "none";
  }
}

/** The use prompt's keycap on each device: E, the pad's left face button (the sigil's, platform/input.ts PAD), a tap. */
export const USE_GLYPH: Record<"keys" | "pad" | "touch", KeycapGlyph> = { keys: "E", pad: "SQ", touch: "TAP" };

/** Her decks' spot for a tag, as a house object's (on the plan: rules/houseRooms.ts), just behind her seat. */
function decksSpot(D: Deck): HouseObject {
  const p = toPlanAt0(D.seat.x - D.x, D.seat.z - D.z);
  return { id: "decks", label: "Decks", room: "terrace", x: p.x, z: p.z, w: 1, d: 1, h: 0, use: { kind: "say", line: "" } } as unknown as HouseObject;
}
