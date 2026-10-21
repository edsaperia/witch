// The treehouse's placeholder rooms (Ed, 2026-10-19: "Plain plank boxes and corridors drawn by the game; the Ent's branches are left
// as they are"; rules/houseRooms.ts, config/house.json): plank floors, walls (the front two, towards the camera, cut down to a
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
import { fromPlan, toPlan, HOUSE_ROOMS, hatsOnFloor, hatSlots, objectAt, type HouseObject, type Rect } from "../rules/houseRooms";
import type { Witch } from "../rules/game";
import { hatSpell } from "../rules/spells";
import { groundHeight } from "./height";
import { alongRay } from "./view/home";

type V3 = { x: number; y: number; z: number };
/** A quad of the rooms in metres on the house's plan (x, z from the hub's centre, rules/houseRooms.ts; h up off the floor) and its
 *  colour; `obj`, the object it's part of (lit when she's at it); `layer`, its place in the drawing (floors, walls, objects) and,
 *  within it, `depth`: how far south its nearest point is in the world (the far drawn first). */
interface Quad { p: [number, number, number][]; rgb: [number, number, number]; obj?: string; layer: number; depth: number }

const PLANK: [number, number, number] = [0.36, 0.25, 0.16], PLANK2: [number, number, number] = [0.31, 0.21, 0.13], SEAM: [number, number, number] = [0.2, 0.13, 0.08];
const WALL: [number, number, number] = [0.3, 0.2, 0.12], WALL_R: [number, number, number] = [0.22, 0.145, 0.085], WALL_TOP: [number, number, number] = [0.42, 0.3, 0.19];
const KIND: Record<string, [number, number, number]> = { creator: [0.32, 0.62, 0.45], hats: [0.32, 0.62, 0.45], zoo: [0.32, 0.62, 0.45], telescope: [0.32, 0.62, 0.45], bed: [0.82, 0.62, 0.3], curtains: [0.55, 0.18, 0.26], say: [0.48, 0.42, 0.56] };
const SKIRT = 0.35, PLANK_W = 0.5, STEP_X = 2;
/** How long a placeholder's line stays up (s). */
const SAY_FOR = 3.5;

const inside = (r: Rect, x: number, z: number) => x > r.x0 + 1e-6 && x < r.x1 - 1e-6 && z > r.z0 + 1e-6 && z < r.z1 - 1e-6;

/** How far south a point of the plan lies in the world (the hub's centre 0): the drawing's depth. */
const south = (x: number, z: number) => fromPlan({ x: 0, z: 0 }, x, z).z;
const quad = (p: [number, number, number][], rgb: [number, number, number], layer: number, obj?: string): Quad => ({ p, rgb, layer, depth: Math.max(...p.map(c => south(c[0], c[1]))), ...(obj ? { obj } : {}) });
/** In the drawing's order: floors, then walls, then objects; each far to near. */
const inOrder = (q: Quad[]) => q.sort((a, b) => a.layer - b.layer || a.depth - b.depth);

/** The rooms' quads, once: floors in planks, walls with their doorways cut, the objects' boxes. */
function buildQuads(hub: number): Quad[] {
  const H = HOUSE_ROOMS, all: Rect[] = [...H.rooms, ...H.corridors], q: Quad[] = [];
  const open = (x: number, z: number, self: Rect) => Math.hypot(x, z) < hub || all.some(r => r !== self && inside(r, x, z)); // (a wall's spot inside another room or corridor, or the hub: a doorway)
  // floors: boards running along the plan's x, half a metre each, a seam between
  for (const r of all) for (let z = r.z0, i = 0; z < r.z1 - 1e-6; z += PLANK_W, i++) {
    const z1 = Math.min(r.z1, z + PLANK_W);
    for (let x = r.x0; x < r.x1 - 1e-6; x += STEP_X) { const x1 = Math.min(r.x1, x + STEP_X); q.push(quad([[x, z, 0], [x1, z, 0], [x1, z1 - 0.04, 0], [x, z1 - 0.04, 0]], i % 2 ? PLANK : PLANK2, 0), quad([[x, z1 - 0.04, 0], [x1, z1 - 0.04, 0], [x1, z1, 0], [x, z1, 0]], SEAM, 0)); }
  }
  // walls: along each edge, in 0.5 m pieces, left out where another room, a corridor or the hub opens onto it
  const wall = (r: Rect, a: [number, number], b: [number, number], h: number, rgb: [number, number, number]) => {
    const n = Math.max(1, Math.round(Math.hypot(b[0] - a[0], b[1] - a[1]) / 0.5));
    for (let i = 0; i < n; i++) {
      const u0 = i / n, u1 = (i + 1) / n, x0 = a[0] + (b[0] - a[0]) * u0, z0 = a[1] + (b[1] - a[1]) * u0, x1 = a[0] + (b[0] - a[0]) * u1, z1 = a[1] + (b[1] - a[1]) * u1;
      const mx = (x0 + x1) / 2, mz = (z0 + z1) / 2, nx = (b[1] - a[1]) === 0 ? 0 : 0.3, nz = (b[1] - a[1]) === 0 ? 0.3 : 0;
      if (open(mx + nx, mz + nz, r) || open(mx - nx, mz - nz, r)) continue;
      q.push(quad([[x0, z0, 0], [x1, z1, 0], [x1, z1, h - 0.12], [x0, z0, h - 0.12]], rgb, 1), quad([[x0, z0, h - 0.12], [x1, z1, h - 0.12], [x1, z1, h], [x0, z0, h]], WALL_TOP, 1));
    }
  };
  for (const r of all) {
    wall(r, [r.x0, r.z0], [r.x1, r.z0], H.wall, WALL); wall(r, [r.x1, r.z0], [r.x1, r.z1], H.wall, WALL_R); // the far two, standing: up-left and up-right on the screen
    wall(r, [r.x0, r.z0], [r.x0, r.z1], SKIRT, WALL); wall(r, [r.x0, r.z1], [r.x1, r.z1], SKIRT, WALL_R); // the near two, cut down (the camera's side)
  }
  // the objects: a box each (its two near sides and its top: the plan's x0 and z1 faces); the hats' floor a rug
  for (const o of H.objects) {
    const c = KIND[o.use.kind], x0 = o.x - o.w / 2, x1 = o.x + o.w / 2, z0 = o.z - o.d / 2, z1 = o.z + o.d / 2, top: [number, number, number] = [c[0] * 1.15, c[1] * 1.15, c[2] * 1.15];
    if (o.use.kind === "hats") { q.push(quad([[x0, z0, 0.01], [x1, z0, 0.01], [x1, z1, 0.01], [x0, z1, 0.01]], [0.36, 0.16, 0.26], 2, o.id)); continue; }
    const box = [quad([[x0, z0, 0], [x0, z1, 0], [x0, z1, o.h], [x0, z0, o.h]], c, 2, o.id), quad([[x0, z1, 0], [x1, z1, 0], [x1, z1, o.h], [x0, z1, o.h]], [c[0] * 0.72, c[1] * 0.72, c[2] * 0.72], 2, o.id), quad([[x0, z0, o.h], [x1, z0, o.h], [x1, z1, o.h], [x0, z1, o.h]], top, 2, o.id)];
    const d = Math.max(...box.map(b => b.depth));
    for (const b of box) b.depth = d; // (an object's faces kept together, in this order: its sides, then its top)
    q.push(...box);
  }
  return inOrder(q);
}

/** A hat lying on the hats' floor: a cone and its brim, standing up off the floor, turned to the camera (in its slot's spell's band
 *  colour); (x, z) its slot on the plan. */
function hatQuads(x: number, z: number, i: number): Quad[] {
  const band: [number, number, number] = [[0.9, 0.5, 0.2], [0.4, 0.8, 0.9], [0.9, 0.35, 0.7], [0.5, 0.9, 0.4]][i % 4] as [number, number, number], dark: [number, number, number] = [0.16, 0.11, 0.24];
  const a = fromPlan({ x: 0, z: 0 }, 1, 0), b = fromPlan({ x: 0, z: 0 }, 0, 1), ex = [a.x, b.x]; // (the world's east on the plan: across the screen)
  const at = (e: number, h: number): [number, number, number] => [x + e * ex[0], z + e * ex[1], h];
  return [
    quad([at(-0.32, 0), at(0.32, 0), at(0.32, 0.06), at(-0.32, 0.06)], dark, 3),
    quad([at(-0.17, 0.06), at(0.17, 0.06), at(0.15, 0.13), at(-0.15, 0.13)], band, 3),
    quad([at(-0.15, 0.13), at(0.15, 0.13), at(0.04, 0.5), at(-0.02, 0.5)], dark, 3),
  ];
}

/** The plan's point under (x, z) metres from the hub's centre in the world. */
const toPlanAt0 = (x: number, z: number) => toPlan({ x: 0, z: 0 }, x, z);

/** North of this (m, the hub's centre 0), a quad is behind the hub: drawn first. */
const BEHIND = -3;

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

export class HouseRoomsView {
  /** Its meshes, for the scene: behind the hub, and in front. */
  readonly meshes: THREE.Mesh[];
  // (a placeholder's floor plan over the picture: in the see-through pass (three.js draws every solid thing first), after the
  // trees' see-through passes, 11 and 19.9, before her, 19.95 in a room (render/view/witch.ts), so the trees round the house never
  // hide it nor it her; no depth, their own quads in order, the far ones first, floors, walls, then the objects)
  private readonly mat = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.DoubleSide, transparent: true, depthWrite: false, depthTest: false });
  private readonly parts: [Part, Part];
  private quads: Quad[] = [];
  private hub = -1;
  private hatsKey = "";
  private readonly box: HTMLDivElement;
  private readonly tag: HTMLDivElement;
  private readonly bubble: HTMLDivElement;
  private readonly ring: HTMLDivElement;
  private said: { obj: HouseObject; at: number } | null = null;

  constructor() {
    this.parts = [new Part(this.mat, 19.93), new Part(this.mat, 19.94)];
    this.meshes = this.parts.map(p => p.mesh);
    this.box = document.createElement("div");
    this.box.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:11;display:none";
    const pill = "position:absolute;transform:translate(-50%,-100%);white-space:nowrap;font:600 14px/1.2 inherit;padding:3px 8px;border-radius:8px;";
    this.tag = document.createElement("div"); this.tag.style.cssText = pill + "background:rgba(20,14,32,.82);color:#f3e8ff;border:1px solid rgba(255,214,140,.55)";
    this.bubble = document.createElement("div"); this.bubble.style.cssText = pill + "background:rgba(250,244,255,.94);color:#2a1d38;border-radius:12px;padding:6px 12px;max-width:320px;white-space:normal;text-align:center";
    this.ring = document.createElement("div"); this.ring.style.cssText = "position:absolute;width:38px;height:38px;transform:translate(-50%,-50%);border-radius:50%";
    this.box.append(this.tag, this.bubble, this.ring);
    document.body.append(this.box);
  }

  /** Another night at a house with rooms (View.setGame): its plan made afresh, nothing said. */
  reset(): void {
    this.hub = -1; this.quads = []; this.hatsKey = ""; this.said = null; this.box.style.display = "none";
    for (const p of this.parts) p.mesh.visible = false;
  }
  /** Off the page (an island whose treehouse has no rooms): its meshes' geometry and material let go, its labels taken off. */
  dispose(): void { for (const p of this.parts) p.geo.dispose(); this.mat.dispose(); this.box.remove(); }

  /** A frame: `onTreehouse` takes a point of the Ent's art (pixels) into the world (render/view.ts); `ht`, her clock. */
  update(v: View, onTreehouse: (px: number, py: number) => V3, ht: number): void {
    const g = v.game, w = g.witch, t = g.tuning, T = v.assets.treehouse, d = deckOf(g.map, t);
    const shown = !!(d?.house?.rooms && T.ent && w.perch && !w.seated && (w.mode === "ground" || w.mode === "descending"));
    for (const p of this.parts) p.mesh.visible = shown;
    if (!shown) { this.box.style.display = "none"; return; }
    const D = d as Deck & { house: NonNullable<Deck["house"]> };
    if (this.hub !== D.r) { this.hub = D.r; this.quads = buildQuads(D.r); this.hatsKey = ""; }
    // her hats on the hats' floor (rules/houseRooms.ts floorHats: laid out the first time she comes in)
    const W = g.witches[0], hats = hatsOnFloor(W), key = hats.join();
    if (key !== this.hatsKey) {
      this.hatsKey = key;
      const slots = hatSlots({ x: 0, z: 0 }).map(p => toPlanAt0(p.x, p.z)), base = this.quads.filter(q => !q.obj?.startsWith("hat:"));
      hats.forEach((s, i) => { if (s) for (const q of hatQuads(slots[i].x, slots[i].z, i)) base.push({ ...q, obj: `hat:${i}` }); });
      this.quads = inOrder(base);
      const behind = (q: Quad) => q.depth < BEHIND;
      this.parts[0].set(base.filter(behind)); this.parts[1].set(base.filter(q => !behind(q)));
    }
    // the house's plane (render/view/witch.ts): x across the Ent's art in its pixels, z down it, h up it; along the ray by z
    const ky = (T.seat.y - T.ent!.deck.y) / Math.max(0.1, D.seat.z - D.z), g0 = groundHeight(D.x, D.z);
    // (each point of the plan turned into the house's metres first: rules/houseRooms.ts fromPlan)
    const toWorld = (px: number, pz: number, h: number): V3 => { const { x, z } = fromPlan({ x: 0, z: 0 }, px, pz), p = onTreehouse(T.ent!.deck.x + x / v.mpp, T.ent!.deck.y + z * ky - h / v.mpp); return alongRay(v, { x: p.x, y: p.y + g0, z: p.z }, z); };
    const at = objectAt(D, w.x, w.z), lit = at?.id;
    for (const P of this.parts) {
      let k = 0;
      for (const q of P.quads) {
        const glow = q.obj && (q.obj === lit || (lit === "hats" && q.obj.startsWith("hat:"))) ? 1.45 : 1;
        for (const [x, z, h] of q.p) { const p = toWorld(x, z, h); P.pos[k] = p.x; P.pos[k + 1] = p.y; P.pos[k + 2] = p.z; P.col[k] = Math.min(1, q.rgb[0] * glow); P.col[k + 1] = Math.min(1, q.rgb[1] * glow); P.col[k + 2] = Math.min(1, q.rgb[2] * glow); k += 3; }
      }
      (P.geo.getAttribute("position") as THREE.BufferAttribute).needsUpdate = true;
      (P.geo.getAttribute("color") as THREE.BufferAttribute).needsUpdate = true;
    }
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
    const waking = !!g.wake && !g.wake.open; // (the new opening's wake-up, rules/wakeUp.ts: no tag while she's in bed; the bed's not for sleeping yet)
    place(this.tag, at && !this.said && !(waking && (g.wake!.beat !== "up" || at.use.kind === "bed")) ? at : null, 0.5, at ? tagOf(at, W, D, w) : "");
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

/** What the tag over an object says: its name and what E does there (the hats' floor: the hat nearest her; a dressing station, its name only). */
function tagOf(o: HouseObject, W: Witch, D: Deck, w: { x: number; z: number }): string {
  if (o.use.kind === "bed") return "Bed · hold E to sleep (ends the night)";
  if (o.use.kind === "zoo") return "Bestiary book · E: the zoo";
  if (o.use.kind === "telescope") return "Telescope · E: look";
  if (o.use.kind === "say") return `${o.label} · E`;
  if (o.use.kind === "hats") {
    const hats = hatsOnFloor(W), slots = hatSlots(D);
    let best = -1, bd = 0.9;
    hats.forEach((s, i) => { const dd = Math.hypot(slots[i].x - w.x, slots[i].z - w.z); if (s && dd <= bd) { bd = dd; best = i; } });
    return best >= 0 ? `${hatSpell(hats[best])?.name ?? hats[best]} hat · E: wear it` : "Hats · E: put yours down";
  }
  if (o.use.kind === "creator") return o.label; // (its choices are in by her being here: rules/stations.ts, no E)
  return `${o.label} · E`;
}
