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
import { NEED_BAG } from "../rules/kit";
import * as THREE from "three";
import { gpuKind } from "./gpuLedger";
import type { View } from "./view";
import { deckOf, type Deck } from "../rules/treehouse";
import { fromPlan, toPlan, HOUSE_ROOMS, hatsOnFloor, hatSlots, hatToTake, objectAt, type HouseObject } from "../rules/houseRooms";
import { houseArtLayout, objectOffset } from "../rules/housePlacement";
import { groundHeight } from "./height";
import { alongRay } from "./view/home";
import type { FloorPixels } from "./houseArt";
import houseStanding from "virtual:house-standing";
import { paintFloorOff } from "./houseFloor";
import type { PlanMap } from "./crown";
import { bakePieceHere, furnitureState, furnitureStates, pieceArt, standing as facing, DRAWN_ELSEWHERE, FURNITURE, type FurnitureArt } from "./houseFurniture";
import { BrewingView } from './brewing';
import { basketNear } from '../rules/mushrooms';
import { WorkshopArt } from "./workshopArt";
import { broomWhere, stationOf } from "../rules/stations";
import * as Art from "../../art/generator.js";
import { witchLookOf } from "./artBuild";
import { pileOut } from "../rules/clothesPile";
import { DECOR_ROOMS, placedDecorPlan } from "./houseDecor";
import { Spotlight } from "./spotlight";
import { LoanSparkle } from "./loanSparkle";
import { UseGlow } from "./useGlow";
import { glyphOf, keycapCanvas, wasdCanvas, type KeycapGlyph } from "../ui/keyHint";
import { atDecks } from "../rules/wakeUp";
import { loadingFloorBounds } from './landingReadiness';
import { LIGHT_UNIFORMS } from './lighting';
import { LOADING_LIGHT_GLSL } from './loadingLight';
import { materialProgramsReady } from './shaderDrawGate';
import { loanFind } from "../rules/finds";

type V3 = { x: number; y: number; z: number };
/** A quad of the rooms in metres on the house's plan (x, z from the hub's centre, rules/houseRooms.ts; h up off the floor) and its
 *  colour; `obj`, the object it's part of (lit when she's at it); `layer`, its place in the drawing (floors, walls, objects) and,
 *  within it, `depth`: how far south its nearest point is in the world (the far drawn first). */
interface Quad { p: [number, number, number][]; rgb: [number, number, number]; obj?: string; layer: number; depth: number }

const KIND: Record<HouseObject["use"]["kind"], [number, number, number]> = { creator: [0.32, 0.62, 0.45], hats: [0.32, 0.62, 0.45], zoo: [0.32, 0.62, 0.45], telescope: [0.32, 0.62, 0.45], bed: [0.82, 0.62, 0.3], say: [0.48, 0.42, 0.56], chart: [0.32, 0.62, 0.45], instrument: [0.62, 0.36, 0.7], invites: [0.32, 0.62, 0.45], pile: [0.32, 0.62, 0.45], scenery: [0.48, 0.42, 0.56] };
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
  for (const u of houseStanding) q.push(quad(u.p, u.rgb, u.layer));
  objects(q);
  return inOrder(q);
}

/** The objects: a box each (its two near sides and its top: the plan's x0 and z1 faces); the hats' floor a rug. */
function objects(q: Quad[]): void {
  for (const o of HOUSE_ROOMS.objects) {
    if (FURNITURE.has(o.id) || DRAWN_ELSEWHERE.has(o.id) || o.id.startsWith("mushroom-basket:")) continue; // (drawn as art: render/houseFurniture.ts, or by another's)
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
  /** The wake-up's keys beside the bed, in bed with her alarm ringing: getting up on its left, snoozing on its right. */
  private readonly wakeL: HTMLDivElement;
  private readonly wakeR: HTMLDivElement;
  private wakeKey = "";
  private said: { obj: HouseObject; at: number; line: string } | null = null;
  private readonly labels: { el: HTMLDivElement; x: number; z: number }[] = [];
  /** The furniture drawn as art (render/houseFurniture.ts): each piece's picture and its quad, baked a piece a frame as she first comes in. */
  private readonly furniture = new THREE.Group();
  /** Named points of the furniture in the world this frame, "<id>.<mark>" (the mic's spot lamp: "microphone.spot"), for the view. */
  readonly marks = new Map<string, V3>();
  private readonly pieces = new Map<string, { art: FurnitureArt; mesh: THREE.Mesh; pos: Float32Array; id: string; x: number; z: number }>();
  /** The Workshop's: her broom on the bay (or the lathe) and the parts on the pegboard, laid on those pieces' marks (render/workshopArt.ts). */
  private readonly workshop = new WorkshopArt();
  private readonly brewing = new BrewingView();
  /** Pieces baked to nothing (a room with no dressing), not tried again. */
  private readonly empty = new Set<string>();
  /** The pieces asked of the art workers (render/housePieces.ts), by key; those that came back, waiting for their meshes; and those
   *  to bake here instead (no workers: the tests), a frame each. */
  private readonly asked = new Set<string>();
  /** Each object's piece last shown (its key), shown on while a new state's piece is still being baked. */
  private readonly shownState = new Map<string, string>();
  private readonly came: { key: string; art: FurnitureArt | null }[] = [];
  private readonly toBakeHere: string[] = [];
  /** The light round the piece she can use (render/useGlow.ts), drawn just after it. */
  private readonly glow = new UseGlow();
  /** The Studio mic's cone of light from its spot lamp (render/spotlight.ts), drawn just after the mic. */
  private readonly spot = new Spotlight();
  // (the Ent's own floors, painted: render/houseArt.ts; a grid laid on the house's plane, an art pixel a texel)
  private readonly floor = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, depthTest: false, side: THREE.DoubleSide }));
  readonly loadingFloor = new THREE.Mesh(new THREE.BufferGeometry(), new THREE.ShaderMaterial({
    uniforms: { ...LIGHT_UNIFORMS, uLoadingOpacity: { value: 1 } }, transparent: true, depthWrite: false, side: THREE.DoubleSide,
    vertexShader: `varying vec3 vWorld; void main() { vec4 p = modelMatrix * vec4(position, 1.0); vWorld = p.xyz; gl_Position = projectionMatrix * viewMatrix * p; }`,
    fragmentShader: `varying vec3 vWorld; uniform float uLoadingOpacity; ${LOADING_LIGHT_GLSL} void main() { gl_FragColor = vec4(loadingLight(vec3(0.62, 0.53, 0.37), vWorld), uLoadingOpacity); }`,
  }));
  private floorArrivalAt = -Infinity;
  private floorCompiled = true;
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
    this.loadingFloor.name = 'Loading house platform'; this.loadingFloor.visible = false; this.loadingFloor.frustumCulled = false; this.loadingFloor.renderOrder = 19.924;
    this.loadingFloor.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(12), 3)); this.loadingFloor.geometry.setIndex([0, 1, 2, 0, 2, 3]);
    this.meshes = [this.loadingFloor, this.floor, this.terraceFloor, ...this.parts.map(p => p.mesh), this.furniture, this.workshop.group, this.brewing.group, ...programTwins()];
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
    const side = "position:absolute;display:none;filter:drop-shadow(0 0 3px rgba(255,214,140,.55))";
    this.wakeL = document.createElement("div"); this.wakeL.style.cssText = side + ";transform:translate(-100%,-50%)";
    this.wakeR = document.createElement("div"); this.wakeR.style.cssText = side + ";transform:translate(0,-50%);display:none;align-items:center;gap:8px;font:700 15px/1 ui-monospace,monospace;color:#f3e8ff;text-shadow:0 1px 0 #1a1022,0 0 4px #1a1022";
    this.box.append(this.tag, this.bubble, this.ring, this.wakeL, this.wakeR);
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
    this.loadingFloor.visible = false;
    this.hub = -1; this.quads = []; this.hatsKey = ""; this.said = null; this.box.style.display = "none";
    for (const p of this.parts) p.mesh.visible = false;
  }
  /** The actual floor and bed, not optional props/ground/detail programs. */
  landingReady(renderer: THREE.WebGLRenderer): boolean {
    const bed = HOUSE_ROOMS.objects.find(o => o.use.kind === 'bed');
    const piece = [...this.pieces.values()].find(p => p.id === bed?.id && p.mesh.visible);
    return !!(this.floorArt && this.floorCompiled && this.floor.visible && piece &&
      [this.floor, this.terraceFloor, piece.mesh, ...this.parts.map(p => p.mesh).filter(o => o.visible)].every(o => materialProgramsReady(renderer.properties.get(o.material))));
  }
  /** Off the page (an island whose treehouse has no rooms): its meshes' geometry and material let go, its labels taken off. */
  dispose(): void {
    this.loadingFloor.geometry.dispose(); this.loadingFloor.material.dispose();
    for (const p of this.parts) p.geo.dispose();
    this.mat.dispose(); this.box.remove();
    for (const { art, mesh } of this.pieces.values()) { art.tex.dispose(); mesh.geometry.dispose(); (mesh.material as THREE.Material).dispose(); }
    this.workshop.dispose();
    this.brewing.dispose();
    this.spot.dispose();
    this.sparkle?.canvas.remove();
  }

  /** A frame: `onTreehouse` takes a point of the Ent's art (pixels) into the world (render/view.ts); `ht`, her clock. */
  update(v: View, onTreehouse: (px: number, py: number) => V3, ht: number): void {
    const g = v.game, w = g.witch, t = g.tuning, T = v.assets.treehouse, d = deckOf(g.map, t);
    const shown = !!(d?.house?.rooms && T.ent && w.perch && (w.mode === "ground" || w.mode === "descending")); // (at her decks too: the Terrace the oak's floor, render/houseArt.ts)
    const late = v.shaderLandingLimited, share = v.landingHouseShare, arrivalNow = v.landingPresentationMs + g.clock.time * 1000;
    const world = (px: number, pz: number, h: number): V3 => { const p = fromPlan(d!, px, pz); return { ...p, y: groundHeight(p.x, p.z) + d!.h + h }; };
    const g0 = d ? groundHeight(d.x, d.z) : 0;
    const ky = T.ent && d ? (T.seat.y - T.ent.deck.y) / Math.max(0.1, d.seat.z - d.z) : 0;
    const toWorld = (px: number, pz: number, h: number): V3 => {
      if (!T.ent) return world(px, pz, h);
      const { x, z } = fromPlan({ x: 0, z: 0 }, px, pz), p = onTreehouse(T.ent.deck.x + x / v.mpp, T.ent.deck.y + z * ky + v.houseShift - h / v.mpp);
      const b = alongRay(v, { x: p.x, y: p.y + g0, z: p.z }, z);
      if (!late || share >= 1) return b;
      const a = world(px, pz, h);
      return { x: a.x + (b.x - a.x) * share, y: a.y + (b.y - a.y) * share, z: a.z + (b.z - a.z) * share };
    };
    const floorShare = this.floorArt && this.floorCompiled ? Math.min(1, Math.max(0, (arrivalNow - this.floorArrivalAt) / 800)) : 0;
    const terraceMaterial = this.terraceFloor.material as THREE.MeshBasicMaterial;
    if (terraceMaterial.transparent !== late) { terraceMaterial.transparent = late; terraceMaterial.needsUpdate = true; }
    this.loadingFloor.visible = !!(late && d?.house?.rooms && w.perch && share * floorShare < 1);
    if (this.loadingFloor.visible) {
      const b = loadingFloorBounds([...HOUSE_ROOMS.rooms, ...HOUSE_ROOMS.corridors], d!.r), pos = this.loadingFloor.geometry.getAttribute('position') as THREE.BufferAttribute;
      [[b.x0, b.z0], [b.x1, b.z0], [b.x1, b.z1], [b.x0, b.z1]].forEach(([x, z], i) => { const p = toWorld(x, z, 0); pos.setXYZ(i, p.x, p.y, p.z); });
      pos.needsUpdate = true; this.loadingFloor.material.uniforms.uLoadingOpacity.value = 1 - share * floorShare;
    }
    this.mat.opacity = late ? share : 1;
    for (const p of this.parts) p.mesh.visible = shown;
    this.furniture.visible = shown;
    this.workshop.group.visible = shown;
    this.brewing.group.visible = shown;
    this.floor.visible = this.terraceFloor.visible = shown;
    if (!shown) {
      this.box.style.display = "none"; this.plan = null; this.sparkle?.draw([], 0, 1); v.usePrompt.id = "";
      for (const el of [this.ring, this.wakeL, this.wakeR, ...this.labels.map(l => l.el)]) el.style.display = 'none';
      if (v.landingSleeping && d?.house?.rooms) {
        // Retain the boot's already-drawn bed while the next house atlas is still absent.
        const bed = HOUSE_ROOMS.objects.find(o => o.use.kind === 'bed'), M = v.camera.matrixWorld.elements;
        let used = false;
        for (const { id, art, mesh, pos } of this.pieces.values()) {
          mesh.visible = !used && id === bed?.id;
          if (!mesh.visible || !bed) continue;
          used = true; this.furniture.visible = true;
          mesh.userData.loadingOrder ??= mesh.renderOrder; mesh.renderOrder = 9.99;
          (mesh.material as THREE.MeshBasicMaterial).opacity = 1;
          const anchor = world(bed.x, bed.z, 0);
          [[-art.ox, -art.oy], [art.w - art.ox, -art.oy], [art.w - art.ox, art.h - art.oy], [-art.ox, art.h - art.oy]].forEach(([dx, dy], i) => {
            const x = dx * v.mpp, y = -dy * v.mpp;
            pos[i * 3] = anchor.x + M[0] * x + M[4] * y;
            pos[i * 3 + 1] = anchor.y + M[1] * x + M[5] * y;
            pos[i * 3 + 2] = anchor.z + M[2] * x + M[6] * y;
          });
          (mesh.geometry.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true;
        }
      } else if (late && d?.house?.rooms && w.perch) {
        const at = objectAt(d, w.x, w.z);
        if (at && at.use.kind !== 'scenery') {
          const p = toWorld(at.x, at.z, 1.5), s = v.v3.set(p.x, p.y, p.z).project(v.camera), cv = v.canvas.getBoundingClientRect();
          this.box.style.display = 'block'; this.tag.style.display = this.bubble.style.display = 'block';
          this.tag.replaceChildren(keycapCanvas(useGlyph(v.useDevice), Math.max(2, Math.round(cv.width / Math.max(1, v.width)))));
          for (const el of [this.tag, this.bubble]) { el.style.left = `${cv.left + (s.x + 1) * cv.width / 2}px`; el.style.top = `${cv.top + (1 - s.y) * cv.height / 2}px`; }
          this.bubble.style.top = `${cv.top + (1 - s.y) * cv.height / 2 + 28}px`;
          this.bubble.textContent = this.said?.line ?? at.label; v.usePrompt.id = at.id; v.usePrompt.top = cv.top + (1 - s.y) * cv.height / 2 - this.tag.offsetHeight;
          this.tapUse = v.useDevice === 'touch' ? v.onUse : null; this.tag.style.pointerEvents = this.tapUse ? 'auto' : 'none';
        }
      }
      return;
    }
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
    // (each point of the plan turned into the house's metres first: rules/houseRooms.ts fromPlan)
    if (this.floor.visible && !this.floorArt) {
      // (painted by workers, the first time it's shown: the boot freeze, 2026-10-25; the floor shows once it's come)
      if (!this.floorAsked) { this.floorAsked = true; const p = paintFloorOff(v.mpp).then(F => { this.floorCame = F; }); v.assets.track("houseFloor", p); }
      if (!this.floorCame) this.floor.visible = this.terraceFloor.visible = false;
    }
    let floorCreated = false;
    if (this.floor.visible) {
      const N = 48;
      if (!this.floorArt) {
        const A = (this.floorArt = this.floorCame!);
        floorCreated = true;
        this.floorArrivalAt = late ? arrivalNow : -Infinity;
        for (const [mesh, px] of [[this.floor, A.rest], [this.terraceFloor, A.terrace]] as const) {
          const tex = gpuKind(new THREE.DataTexture(px, A.w, A.h, THREE.RGBAFormat), "house");
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
    if (late && floorCreated) {
      this.floorCompiled = false;
      void Promise.all([v.renderer.compileAsync(this.floor, v.camera, v.scene), v.renderer.compileAsync(this.terraceFloor, v.camera, v.scene)]).then(() => { this.floorCompiled = true; this.floorArrivalAt = v.landingPresentationMs + g.clock.time * 1000; }, () => {});
    }
    const nativeShare = late ? share * (this.floorArt && this.floorCompiled ? Math.min(1, Math.max(0, (arrivalNow - this.floorArrivalAt) / 800)) : 0) : 1;
    (this.floor.material as THREE.MeshBasicMaterial).opacity = nativeShare;
    terraceMaterial.opacity = nativeShare;
    // (the floors' map without the push along the camera's rays, which moves nothing on the screen: what's laid over them in their
    // plane, the crown, is drawn after them with no depth)
    { const flat = (px: number, pz: number, h: number) => { const { x, z } = fromPlan({ x: 0, z: 0 }, px, pz), p = onTreehouse(T.ent!.deck.x + x / v.mpp, T.ent!.deck.y + z * ky + v.houseShift - h / v.mpp); return new THREE.Vector3(p.x, p.y + g0, p.z); }; // (slid with the rooms: houseShift)
      const o = flat(0, 0, 0); this.plan = { o, ex: flat(1, 0, 0).sub(o), ey: flat(0, 0, 1).sub(o), ez: flat(0, 1, 0).sub(o) }; }
    // (the hats' floor isn't a thing to use: the hat she's by is, hatToTake; Ed, 2026-10-29: "just an area where normal hat objects
    // are placed")
    const at0 = objectAt(D, w.x, w.z), hatBy = at0?.use.kind === "hats" || HOUSE_ROOMS.layout ? hatToTake(W, D, w.x, w.z, g.tuning.leash.runeRadius) : null;
    const hatArea = HOUSE_ROOMS.objects.find(o => o.use.kind === "hats");
    const at = hatBy && HOUSE_ROOMS.layout && hatArea ? { ...hatArea, ...toPlan(D, hatBy.x, hatBy.z) } : at0?.use.kind === "hats" && !hatBy ? null : at0;
    const lit = at && at.id !== v.houseOpen ? (hatBy ? (hatBy.slot !== undefined ? `hat:${hatBy.slot}` : "") : at.id) : undefined; // (lit, the one she can use; out while it's open)
    for (const P of this.parts) {
      let k = 0;
      for (const q of P.quads) {
        const glow = q.obj && q.obj === lit ? 1.45 : 1;
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
    const decorRooms = HOUSE_ROOMS.layout ? HOUSE_ROOMS.rooms.filter(r => placedDecorPlan(r).length) : DECOR_ROOMS;
    for (const r of decorRooms) wanted.push({ key: `decor:${r.id}`, x: (r.x0 + r.x1) / 2, z: (r.z0 + r.z1) / 2 });
    // (and every other state a piece can be in, after the rest: rules/kit.ts's desk and lathe, swapped at once when she takes from them)
    const spare = HOUSE_ROOMS.objects.filter(o => FURNITURE.has(o.id)).flatMap(o => furnitureStates(o.id).map(st => ({ key: `${o.id}|${st}`, x: o.x, z: o.z })).filter(q => !wanted.some(w => w.key === q.key)));
    const near = (a: { x: number; z: number }) => Math.hypot(a.x - here.x, a.z - here.z);
    wanted.push(...spare);
    for (const q of wanted.filter(q => !this.asked.has(q.key)).sort((a, b) => (spare.includes(a) ? 1e6 : 0) + near(a) - (spare.includes(b) ? 1e6 : 0) - near(b))) {
      this.asked.add(q.key);
      const p = v.assets.oneOff({ kind: "housePiece", id: `${q.key}@${ppm.toFixed(4)}:${pitch.toFixed(4)}`, style: v.assets.style, ppm, pitch, ...(HOUSE_ROOMS.layout ? { layout: houseArtLayout(HOUSE_ROOMS) } : {}) })
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
      if (late) mesh.userData.landingAppearAt = arrivalNow;
      this.furniture.add(mesh); this.pieces.set(key, { art, mesh, pos, id, x: at.x, z: at.z });
    }
    const pxWorld = (px: number, pz: number, dx: number, dy: number): V3 => {
      const { x, z } = fromPlan({ x: 0, z: 0 }, px, pz), p = onTreehouse(T.ent!.deck.x + x / v.mpp + dx, T.ent!.deck.y + z * ky + v.houseShift + dy);
      const b = alongRay(v, { x: p.x, y: p.y + g0, z: p.z }, z);
      if (!late || share >= 1) return b;
      const anchor = toWorld(px, pz, 0);
      // Carry the whole painted piece with its moving floor anchor; retain its own pixel offsets.
      const q = onTreehouse(T.ent!.deck.x + x / v.mpp, T.ent!.deck.y + z * ky + v.houseShift), full = alongRay(v, { x: q.x, y: q.y + g0, z: q.z }, z);
      return { x: b.x + anchor.x - full.x, y: b.y + anchor.y - full.y, z: b.z + anchor.z - full.z };
    };
    this.brewing.update(v, pxWorld, ky * v.mpp);
    let glowed = false;
    const now = v.game.clock.time;
    for (const [k, { art, mesh, pos, id, x, z }] of this.pieces) {
      if (mesh.userData.loadingOrder !== undefined) { mesh.renderOrder = mesh.userData.loadingOrder; delete mesh.userData.loadingOrder; }
      const o = HOUSE_ROOMS.objects.find(q => q.id === id);
      // (a piece in another state than now's, hidden, unless now's isn't in yet: the last one shown stays till it is; a room's dressing always)
      const cur = o ? pieceKey(o) : k;
      if (o && this.pieces.has(cur)) this.shownState.set(id, cur);
      mesh.visible = !o || k === (this.pieces.has(cur) ? cur : this.shownState.get(id) ?? cur);
      if (!mesh.visible) continue;
      // (corners in the picture's pixels from its floor's middle: top-left, top-right, bottom-right, bottom-left; flipY off, so v 0 is its top)
      [[-art.ox, -art.oy], [art.w - art.ox, -art.oy], [art.w - art.ox, art.h - art.oy], [-art.ox, art.h - art.oy]].forEach(([dx, dy], i) => { const p = pxWorld(x, z, dx, dy); pos[i * 3] = p.x; pos[i * 3 + 1] = p.y; pos[i * 3 + 2] = p.z; });
      for (const [name, q] of Object.entries(art.marks)) this.marks.set(`${id}.${name}`, pxWorld(x, z, q.x - art.ox, q.y - art.oy));
      this.marks.set(`${id}.top`, pxWorld(x, z, art.top.x - art.ox, art.top.y - art.oy)); // (its top as drawn: pins clear it, render/pins.ts)
      (mesh.geometry.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
      (mesh.material as THREE.MeshBasicMaterial).color.setScalar(id === lit ? 1.15 : 1);
      (mesh.material as THREE.MeshBasicMaterial).opacity = late ? share * Math.min(1, Math.max(0, (arrivalNow - (mesh.userData.landingAppearAt ?? -Infinity)) / 800)) : 1;
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
          const b = (Art.bake as (sp: object, c: object, st: object, o: unknown) => { A: HTMLCanvasElement })(sp, mine.colours, st, (st as { cOutline?: unknown }).cOutline), tex = gpuKind(new THREE.CanvasTexture(b.A), "house");
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
    for (const e of g.leashEvents) if ((e.kind === "house" || e.kind === "needBag") && e.obj) {
      const o = HOUSE_ROOMS.objects.find(q => q.id === e.obj);
      if (o && e.kind === "needBag") this.said = { obj: o, at: ht, line: NEED_BAG }; // (the desk with no bag to carry them: rules/kit.ts)
      else if (o?.use.kind === "say" && this.said?.at !== ht) this.said = { obj: o, at: ht, line: o.use.line };
    }
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
    if (glints.length || this.sparkle) (this.sparkle ??= new LoanSparkle()).draw(glints, v.game.clock.time, Math.max(2, Math.round(cv.width / v.width * 3)));
    const waking = !!g.wake && (!g.wake.open || (at?.use.kind === "bed" && g.party.spellAt === null)); // (the new opening's wake-up, rules/wakeUp.ts: no tag while she's in bed; the bed's not for sleeping yet)
    // over it, the button that uses it (Ed's playtest, 2026-10-26: "there's a prompt showing the button to press to open it"; then
    // "Please remove words from the station tags. We used to have little keys to show 'WASD', can we use these for E"): a keycap
    // alone, the old walking keys' (ui/keyHint.ts), the use button as bound (E, the pad's ✕: ui/keyHint.ts glyphOf), or on a touch screen the keycap itself to tap; none while it's
    // open. Up at her decks before the party, E there starts it (rules/wakeUp.ts atDecks).
    const decks = !at && g.wake?.open && g.party.spellAt === null && atDecks(g) ? decksSpot(D) : null;
    const basket = g.mushrooms && !g.cauldron ? basketNear(g) : null;
    const basketTag: HouseObject | null = basket && !g.mushrooms.smoke && !g.mushrooms.affected[W.id] ? {
      id: `mushroom-basket:${basket.type}`, room: 'kitchen', label: `${basket.type} mushrooms`,
      ...toPlanAt0(basket.x - D.x, basket.z - D.z), w: 1.4, d: 1.4, h: 1.5, use: { kind: 'scenery' },
    } : null;
    const tagged = basketTag ?? decks ?? (at && at.use.kind !== "scenery" && !this.said && !waking && !(at.use.kind === "pile" && !pileOut(g.wake)) ? at : null);
    const usable0 = tagged && tagged.id !== v.houseOpen ? tagged : null, usable = usable0 && hatBy && usable0 === at ? { ...usable0, ...toPlanAt0(hatBy.x - D.x, hatBy.z - D.z), h: 0 } : usable0, px = Math.max(2, Math.round(cv.width / Math.max(1, v.width))), glyph = useGlyph(v.useDevice), cap = `${glyph}|${px}`;
    if (cap !== this.tagKey) { this.tagKey = cap; this.tag.replaceChildren(keycapCanvas(glyph, px)); }
    this.tapUse = usable && v.useDevice === "touch" ? v.onUse : null;
    this.tag.style.pointerEvents = this.tapUse ? "auto" : "none";
    place(this.tag, usable, decks ? 1.9 : tagHeight(usable?.use.kind));
    v.usePrompt.id = usable?.id ?? ""; // (none shown: none for a pin to keep clear of)
    if (usable) v.usePrompt.top = screen(usable, decks ? 1.9 : tagHeight(usable.use.kind))[1] - this.tag.offsetHeight; // (the keycap stands on that point: translate -100%)
    place(this.bubble, this.said?.obj ?? null, 0.6, this.said?.line ?? "");
    const from = W.house?.bedFrom, bed = at?.use.kind === "bed" ? at : null;
    if (bed && from !== undefined) {
      const f = Math.min(1, (ht - from) / Math.max(1e-6, HOUSE_ROOMS.bed.hold));
      place(this.ring, bed, 1.6);
      this.ring.style.background = `conic-gradient(rgba(255,214,140,.95) ${f * 360}deg, rgba(20,14,32,.6) 0deg)`;
      this.ring.style.boxShadow = "0 0 0 3px rgba(20,14,32,.7) inset";
    } else this.ring.style.display = "none";
    // the wake-up in bed (rules/wakeUp.ts; Ed, 2026-10-26: "This should just be WASD in keycaps to the left of the bed and 'E
    // snooooze' to the right", "or the equivalent for controller"), in place of the card at the foot of the screen: the walking keys
    // (a pad's left stick) beside the bed's left, its snooze key (the use button as bound) and "snooooze" beside its right while it rings (not
    // snoozing; every morning alike since Ed's playtest of v4821, one wake-up); the keys follow the device she last played with
    const wk = g.wake, inBed = !!wk && !wk.open && (wk.beat === "alarm" || wk.beat === "snooze"), bedObj = inBed ? HOUSE_ROOMS.objects.find(o => o.use.kind === "bed") ?? null : null;
    const pad = v.useDevice === "pad", snooze = inBed && wk!.beat === "alarm", wkey = `${pad}|${px}|${useGlyph(v.useDevice)}|${glyphOf("game.moveUp", "keys")}`;
    if (bedObj && wkey !== this.wakeKey) {
      this.wakeKey = wkey;
      this.wakeL.replaceChildren(pad ? keycapCanvas(glyphOf("game.moveUp", "pad"), px) : wasdCanvas(px));
      const word = document.createElement("span"); word.textContent = "snooooze";
      this.wakeR.replaceChildren(keycapCanvas(useGlyph(pad ? "pad" : "keys"), px), word);
    }
    const gap = 1.5; // (metres out from the bed's sides)
    const side = (sign: number) => { if (!bedObj) return null; const d = objectOffset(bedObj, sign * (bedObj.w / 2 + gap), 0); return { ...bedObj, x: bedObj.x + d.x, z: bedObj.z + d.z }; };
    place(this.wakeL, side(-1), 0.2);
    place(this.wakeR, snooze ? side(1) : null, 0.2);
    if (snooze && bedObj) this.wakeR.style.display = "flex";
  }
}

/** The use prompt's keycap on each device: the use action's as bound now (platform/bindings.ts: E, the pad's cross), a tap. */
export const useGlyph = (device: "keys" | "pad" | "touch"): KeycapGlyph => glyphOf("game.use", device);

/** Her decks' spot for a tag, as a house object's (on the plan: rules/houseRooms.ts), just behind her seat. */
function decksSpot(D: Deck): HouseObject {
  const p = toPlanAt0(D.seat.x - D.x, D.seat.z - D.z);
  return { id: "decks", label: "Decks", room: "terrace", x: p.x, z: p.z, w: 1, d: 1, h: 0, use: { kind: "say", line: "" } } as unknown as HouseObject;
}
