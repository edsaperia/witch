// Drawing the party objects (rules/partyDressing.ts; art/party.js, #38) in every partified area
// near the witch: the clusters as laid out, the loose pieces, the set dressing, and an escaped
// balloon caught up in a tree. They appear as the party arrives (late in the area's transition,
// each popping up in turn), balloons bob in the breeze (the art's bob hints), campfires flicker
// through their frames, and campfires and lanterns light their surroundings (a few an area).
// Decals (confetti, streamers, glitter) lie flat under everything.
import * as THREE from "three";
import type { Game } from "../rules/game";
import { dressingOf, excluded, isLit, leftOut, lightOf, partyDef, pieceId, type Dressing } from "../rules/partyDressing";
import { hash2 } from "../rules/random";
import type { AssetLibrary } from "./assets";
import type { ForestLight } from "./view";
import { SPRITE_UNIFORMS, SpriteBatch, asFloor, type SpriteInstance } from "./sprites";
import { moodOf, type Mood } from "./mood";

/** A party piece's ref worked out once (its id, its def, whether it lights): the rules' helpers split the ref each call, and
 *  these ran for every piece every frame. Whether it's left out still asks the tuning each time (it can change live). */
const REFS = new Map<string, { id: string; def: ReturnType<typeof partyDef>; lit: boolean }>();
const refOf = (ref: string) => { let r = REFS.get(ref); if (!r) REFS.set(ref, (r = { id: pieceId(ref), def: partyDef(ref), lit: isLit(ref) })); return r; };

export class PartyObjectsView {
  private upright: SpriteBatch | null = null;
  private flat: SpriteBatch | null = null;
  private dressings = new Map<string, Dressing>();
  /** Each area's dressing's bounds (min x, min z, max x, max z, with room for its clusters and its hanging pieces' trees). */
  private bounds = new Map<string, [number, number, number, number]>();
  /** The tree each hanging piece hangs in (by area, then by piece; null for none), found once. */
  private trees = new Map<string, ({ x: number; z: number } | null)[]>();
  /** Each area's cluster pieces' refs in its neons ([cluster][piece]), worked out once (a string replace a piece a frame before). */
  private neonRefs = new Map<string, string[][]>();
  /** Each area's fires (its campfires, bonfires and tiki torches, in its clusters and loose), for the smoke: x, z, size, ... */
  private fireSpots = new Map<string, number[]>();
  /** Instances drawn this frame (for the debug overlay). */
  count = 0;

  constructor(private scene: THREE.Scene, private assets: AssetLibrary, private mpp: number) {}

  /** Whether the art is in (the world's campfires are drawn here then, with the party campfire's frames). */
  get ready(): boolean { return !!this.assets.partyObjectArt(); }

  /** The party's fires burning now (each partified area's campfires, bonfires and torches, once it has arrived), within `reach`
   *  of (x, z), handed to `add` (x, z, size): found once per area from its dressing, so nothing is allocated a frame. */
  fires(g: Game, time: number, x: number, z: number, reach: number, add: (x: number, z: number, size: number) => void): void {
    const t = g.tuning;
    if (!t.partyObjects.on) return;
    const art = this.assets.partyObjectArt();
    if (!art) return;
    for (const [key, area] of g.party.areas) {
      const site = g.map.siteOf(area.cell[0], area.cell[1]);
      if (Math.abs(site.x - x) > reach + g.map.areaSize || Math.abs(site.z - z) > reach + g.map.areaSize) continue;
      const from = area.at + t.party.transition * 0.7;
      if (time < from + 1) continue;
      let f = this.fireSpots.get(key);
      if (!f) {
        let d = this.dressings.get(key);
        if (!d) { this.dressings.set(key, (d = dressingOf(g.map, area.cell, t))); this.bounds.set(key, boundsOf(d)); }
        const out: number[] = [], id = (ref: string) => ref.replace(/^party:/, "").split(/[@~]/)[0];
        for (const c of d.clusters) { const lay = art.layouts[c.id]; if (lay) for (const p of c.mirror ? lay.mirror : lay.plain) { const k = FIRE_SMOKE[id(p.ref)]; if (k && !excluded(p.ref, t)) out.push(c.x + p.dx, c.z + p.dz, k); } }
        for (const p of d.loose) { const k = FIRE_SMOKE[id(p.ref)]; if (k && !excluded(p.ref, t)) out.push(p.x, p.z, k); }
        this.fireSpots.set(key, (f = out));
      }
      for (let i = 0; i < f.length; i += 3) add(f[i], f[i + 1], f[i + 2]);
    }
  }

  // The frame's working, so the pieces are put by a method and not a closure an area a frame, and the lists and records
  // (the sprites, the lights, their colours) are kept and refilled (the churn hunt, 2026-10-13).
  private art!: NonNullable<ReturnType<AssetLibrary["partyObjectArt"]>>;
  private t!: Game["tuning"];
  private M: Mood | null = null;
  private time = 0;
  private from = 0;
  private rise = 0;
  private visible: (x: number, z: number, w: number, h: number) => boolean = () => false;
  private readonly uprightList: SpriteInstance[] = [];
  private readonly flatList: SpriteInstance[] = [];
  private readonly pool: SpriteInstance[] = [];
  private n = 0;
  private readonly lights: ForestLight[] = [];
  private readonly lightPool: ForestLight[] = [];
  private nl = 0;
  /** Each lit piece's colour (by its ref), as the mood warms it: made once a mood. */
  private readonly rgbs = new Map<string, { m: Mood | null; v: THREE.Vector3 }>();
  private readonly fwd = new THREE.Vector3();
  private readonly upV = new THREE.Vector3();

  /** A sprite instance from the pool (every field written by its user). */
  private inst(): SpriteInstance {
    let o = this.pool[this.n];
    if (!o) this.pool[this.n] = o = { x: 0, y: 0, z: 0, frame: this.art.atlas.frames[0], flip: false };
    this.n++;
    return o;
  }

  /** A real light: campfires flicker; everything fades up as it appears. In the spooky mood its colour goes decorWarm of the
   *  way to the party's amber (the art director's round 4: an area's neon pieces lit its ground lime; the neon stays on the
   *  bulbs, the pool on the ground stays warm). */
  private light(x: number, z: number, ref: string, L: { rgb: number[]; radius: number; height: number }, age: number): void {
    const M = this.M, time = this.time, flick = 0.85 + 0.1 * Math.sin(time * 11 + x) + 0.05 * Math.sin(time * 23 + z);
    let e = this.rgbs.get(ref);
    if (!e || e.m !== M) {
      const rgb = new THREE.Vector3(L.rgb[0] / 255, L.rgb[1] / 255, L.rgb[2] / 255), w = M?.partyWarm?.[0];
      if (M?.decorWarm && w) rgb.lerp(WARM.set(w[0], w[1], w[2]), M.decorWarm);
      this.rgbs.set(ref, (e = { m: M, v: rgb }));
    }
    let o = this.lightPool[this.nl];
    if (!o) this.lightPool[this.nl] = o = { x: 0, y: 0, z: 0, reach: 0, rgb: e.v, strength: 0 };
    this.nl++;
    o.x = x; o.y = L.height + 0.4; o.z = z; o.reach = L.radius * (M?.decorReach ?? 1); o.rgb = e.v; o.strength = 1.6 * (M?.decorStrength ?? 1) * flick * Math.min(1, Math.max(0, age) / 1.5);
    this.lights.push(o);
  }

  /** One piece put on the ground (or hung `hang` metres up), if it's in view and has popped up yet. */
  private put(ref: string, gx: number, gz: number, flip: boolean, i: number, hang = 0): void {
    const art = this.art, a = art.pieces[ref], r = refOf(ref), def = r.def, t = this.t, time = this.time, mpp = this.mpp;
    if (!a || !def || leftOut(r.id, t)) return; // (left out of the clusters too)
    // Each pops up in turn as the party arrives.
    const since = time - this.from - hash2(i, Math.round(gx * 3), 77) * 2.5;
    if (since < 0) return;
    const grow = Math.min(1, since / 0.35), k = grow * grow * (3 - 2 * grow) * (1 + 0.25 * Math.sin(Math.min(1, since / 0.5) * Math.PI));
    const fi = a.frames[a.frames.length > 1 ? Math.floor(time * 8 + i) % a.frames.length : 0], frame = art.atlas.frames[fi];
    // The first frame's pad for every frame, so nothing hops as it animates.
    const U = SPRITE_UNIFORMS.uUp.value, R = SPRITE_UNIFORMS.uRight.value;
    const pad = a.decal ? 0 : art.atlas.frames[a.frames[0]].pad ?? 0, dx = (a.originX - frame.w / 2) * mpp * (flip ? -1 : 1), toward = Math.max(0, frame.h - pad - a.originY) * mpp * this.rise;
    const bob = def.bob ? def.bob.amplitude * Math.sin(((time / def.bob.period) + def.bob.phase + i * 0.17) * Math.PI * 2) : 0;
    const x = gx - R.x * dx, z = gz - R.z * dx + toward;
    if (!this.visible(x, z, frame.w * mpp, frame.h * mpp + hang)) return;
    const d0 = pad * mpp, pop = k === 1 ? undefined : k, o = this.inst(); // (its pop in whole art pixels, docs/STYLE.md rule 1)
    o.frame = frame; o.flip = flip; o.sx = pop; o.sy = pop;
    if (a.decal) { o.x = x; o.y = 0; o.z = z; o.sway = undefined; this.flatList.push(o); }
    else { o.x = x - U.x * d0; o.y = -U.y * d0 + hang + bob; o.z = z - U.z * d0; o.sway = def.bob ? 1 : 0; this.uprightList.push(o); }
    this.count++;
  }

  /** `fires`: the world's campfires showing now (view.ts lights them): drawn as the party's small
   *  campfire, whose frames share one box and one scale (the old ones changed scale every frame).
   *  `view`: the square the scenery is listed in (its middle and half-size): an area whose
   *  dressing lies wholly outside it only lights its lights (Ed, 2026-10-05: late in a run every
   *  piece of every partified area in reach was looked at every frame). The lights come back in one
   *  list kept from frame to frame: read them this frame. */
  update(g: Game, time: number, camera: THREE.Camera, visible: (x: number, z: number, w: number, h: number) => boolean, fires: { x: number; z: number; scale: number; flip: boolean }[] = [], view: { x: number; z: number; half: number } | null = null): ForestLight[] {
    const lights = this.lights, t = g.tuning, M = moodOf(t); // (spooky: more of the decor's lights, wider and stronger: render/mood.ts)
    lights.length = 0; this.nl = 0; this.n = 0;
    this.count = 0;
    if (!t.partyObjects.on) { this.upright?.set(NONE); this.flat?.set(NONE); return lights; }
    const art = this.assets.partyObjectArt();
    if (!art) return lights;
    if (!this.upright) {
      this.upright = new SpriteBatch(art.atlas, this.mpp, { scenery: true, fade: true });
      this.flat = new SpriteBatch(art.atlas, this.mpp, { scenery: true, flat: true });
      asFloor(this.flat); // right after the ground, under everything standing
      this.scene.add(...this.upright.meshes, ...this.flat.meshes);
    }
    const mpp = this.mpp, U = SPRITE_UNIFORMS.uUp.value, R = SPRITE_UNIFORMS.uRight.value, w = g.witch;
    const fwd = camera.getWorldDirection(this.fwd), up = this.upV.set(0, 1, 0).applyQuaternion(camera.quaternion), rise = U.dot(up) / Math.max(0.2, -fwd.y);
    this.art = art; this.t = t; this.M = M; this.time = time; this.rise = rise; this.visible = visible;
    const upright = this.uprightList, flat = this.flatList, reach = t.haze.far + g.map.areaSize;
    upright.length = 0; flat.length = 0;
    const fire = art.pieces["party:campfire-small"];
    if (fire) for (let i = 0; i < fires.length; i++) {
      const c = fires[i], fi = fire.frames[Math.floor(time * 8 + i) % fire.frames.length], frame = art.atlas.frames[fi], pad = art.atlas.frames[fire.frames[0]].pad ?? 0;
      const dx = (fire.originX - frame.w / 2) * mpp * (c.flip ? -1 : 1), toward = Math.max(0, frame.h - pad - fire.originY) * mpp * rise;
      const x = c.x - R.x * dx, z = c.z - R.z * dx + toward, d0 = pad * mpp;
      if (!visible(x, z, frame.w * mpp, frame.h * mpp)) continue;
      const o = this.inst(), pop = c.scale < 1 ? c.scale : undefined; // (growing in whole art pixels, docs/STYLE.md rule 1)
      o.x = x - U.x * d0; o.y = -U.y * d0; o.z = z - U.z * d0; o.frame = frame; o.flip = c.flip; o.sx = pop; o.sy = pop; o.sway = undefined;
      upright.push(o);
    }
    for (const [key, area] of g.party.areas) {
      const site = g.map.siteOf(area.cell[0], area.cell[1]);
      if (Math.abs(site.x - w.x) > reach || Math.abs(site.z - w.z) > reach) continue;
      let d = this.dressings.get(key);
      if (!d) { this.dressings.set(key, (d = dressingOf(g.map, area.cell, t))); this.bounds.set(key, boundsOf(d)); }
      const from = area.at + t.party.transition * 0.7;
      if (time < from) continue;
      this.from = from;
      const age = since(time, from), maxLit = M?.decorLights ?? t.partyObjects.lightsPerArea;
      let lit = d.lights.length;
      const b = this.bounds.get(key)!, PAD = 20;
      if (view && (b[0] > view.x + view.half + PAD || b[2] < view.x - view.half - PAD || b[1] > view.z + view.half + PAD || b[3] < view.z - view.half - PAD)) {
        // Out of view: its lights only (they reach onto the ground in view), as below.
        for (let ci = 0; ci < d.clusters.length; ci++) {
          const c = d.clusters[ci], lay = art.layouts[c.id];
          if (!lay) continue;
          const ps = c.mirror ? lay.mirror : lay.plain;
          for (let pi = 0; pi < ps.length; pi++) { const p = ps[pi]; if (lit < maxLit && refOf(p.ref).lit) { lit++; this.light(c.x + p.dx, c.z + p.dz, p.ref, lightOf(p.ref, t)!, age); } }
        }
        for (let li = 0; li < d.lights.length; li++) { const p = d.lights[li]; this.light(p.x, p.z, p.ref, lightOf(p.ref, t)!, age); }
        continue;
      }
      let refs = this.neonRefs.get(key);
      if (!refs) this.neonRefs.set(key, (refs = []));
      for (let ci = 0; ci < d.clusters.length; ci++) {
        const c = d.clusters[ci], lay = art.layouts[c.id];
        if (!lay) continue;
        const cr = (refs[ci] ??= []), ps = c.mirror ? lay.mirror : lay.plain;
        for (let pi = 0; pi < ps.length; pi++) {
          const p = ps[pi];
          // a cluster's neon pieces in the area's neons (its own colour, one accent: rules/partyDressing.ts areaNeons)
          const ref = (cr[pi] ??= d.neons?.length && p.ref.includes("@") ? p.ref.replace(/@[a-z]+/, "@" + d.neons[(ci * 7 + pi * 3) % d.neons.length]) : p.ref);
          this.put(ref, c.x + p.dx, c.z + p.dz, p.left, ci * 16 + pi);
          // The clusters' campfires and lanterns light up too, while the area has lights to spare.
          if (lit < maxLit && refOf(ref).lit) { lit++; this.light(c.x + p.dx, c.z + p.dz, ref, lightOf(ref, t)!, age); }
        }
      }
      for (let i = 0; i < d.loose.length; i++) { const p = d.loose[i]; this.put(p.ref, p.x, p.z, p.flip, 200 + i); }
      for (let li = 0; li < d.lights.length; li++) { const p = d.lights[li]; this.light(p.x, p.z, p.ref, lightOf(p.ref, t)!, age); }
      // Hanging things, and the caught balloon: from a branch point in the nearest tree's crown, their
      // hang (or tie) anchor at that height, a little out from the trunk towards us; none if no tree is near.
      let trees = this.trees.get(key);
      if (!trees) this.trees.set(key, (trees = []));
      const nh = d.hanging.length, total = nh + (d.caught ? 1 : 0);
      for (let i = 0; i < total; i++) {
        const p = i < nh ? d.hanging[i] : d.caught!, a = art.pieces[p.ref];
        // Its tree, found once (asking the forest every frame cost a boosting flight its frame budget).
        if (trees[i] === undefined) trees[i] = g.forest.treesNear(p.x, p.z, 10).sort((u, v) => Math.hypot(u.x - p.x, u.z - p.z) - Math.hypot(v.x - p.x, v.z - p.z))[0] ?? null;
        const tree = trees[i];
        if (!a || !tree) continue;
        const k = hash2(Math.round(tree.x * 7) + i, Math.round(tree.z * 7), 5), side = k < 0.5 ? -1 : 1;
        const branch = 3 + hash2(i, Math.round(tree.x), 6) * 2.5, below = ((a.originY - (a.hang?.y ?? 0)) * mpp);
        this.put(p.ref, tree.x + side * (0.6 + k), tree.z + 0.5, p.flip, 400 + i, branch - below);
      }
    }
    this.upright.set(upright);
    this.flat!.set(flat);
    return lights;
  }
}

/** A batch with nothing in it: one shared empty list. */
const NONE: SpriteInstance[] = [];

// How big each burning piece's smoke is (render/smoke.ts): a small campfire 1, a bonfire about 2, a tiki torch a wisp.
const FIRE_SMOKE: Record<string, number> = { "campfire-small": 0.8, "campfire-logs": 1, "campfire-kettle": 1, bonfire: 2.2, "tiki-torch": 0.3 };

const since = (time: number, from: number) => time - from;

/** A dressing's bounds: its clusters (with room for their layouts) and pieces, and its hanging pieces' trees. */
function boundsOf(d: Dressing): [number, number, number, number] {
  const b: [number, number, number, number] = [Infinity, Infinity, -Infinity, -Infinity];
  const add = (x: number, z: number, r: number) => { b[0] = Math.min(b[0], x - r); b[1] = Math.min(b[1], z - r); b[2] = Math.max(b[2], x + r); b[3] = Math.max(b[3], z + r); };
  for (const c of d.clusters) add(c.x, c.z, 8);
  for (const p of d.loose) add(p.x, p.z, 1);
  for (const p of [...d.hanging, ...d.lights, ...(d.caught ? [d.caught] : [])]) add(p.x, p.z, 12);
  return b;
}

const WARM = new THREE.Vector3();

