// The scenery rebuild (from render/view.ts, issue #122): trees, undergrowth, walls, set pieces, decor,
// path pieces, relics, grounds and scenes round the camera, rebuilt once it has moved, turned or zoomed.
import type { Frame, Piece, RelicArt } from "../artBuild";
import { LIGHT_UNIFORMS } from "../lighting";
import type { Plant } from "../../rules/forest";
import { SPRITE_UNIFORMS, SpriteBatch, asFloor, type SpriteInstance } from "../sprites";
import type { ShadowInstance } from "../shadows";
import type { TypeArt } from "../assets";
import { hash2 } from "../../rules/random";
import { poseOf } from "../../rules/game";
import type { View } from "../view";
import { inView, viewRect } from "./culling";
import { checkPops, mark } from "./pops";

/** An index by weight, from a seeded integer (its last six digits as a share). */
function pickWeighted(w: number[], seed: number): number {
  let total = 0;
  for (const x of w) total += x;
  let u = ((seed % 1000003) / 1000003) * total;
  for (let i = 0; i < w.length; i++) { u -= w[i]; if (u < 0) return i; }
  return Math.max(0, w.length - 1);
}

/** A rebuild under way, for each view: the rest of it, a part each frame. */
const jobs = new WeakMap<View, { run: Generator<void, void, void>; frames: number }>();

/** Rebuild the batches for what the camera sees, once it has moved, turned or zoomed: a slice of
 *  at most SLICE_MS a frame (the trees, then the undergrowth, walls, set pieces and the rest, then
 *  each kind's batch handed its list, nearest first), so no frame takes the whole of it (Ed,
 *  2026-10-06: a rebuild was 5 ms on average and up to 11, the biggest spike left late in a run).
 *  Each batch keeps its old list until its new one is ready. A rebuild under way is finished at
 *  once when another is already due (she has flown, turned or zoomed on past what it was listed
 *  for: slow frames, like the software renderer's, cover a lot of ground each) or after MAX_FRAMES,
 *  so what it lists is never older than an unsliced rebuild's would be by much. `force`: all of it now. */
/** An area type's rim kit as whole pieces, made once a layout. */
const rimCache = new WeakMap<TypeArt["layout"], Piece[]>();
const rimPieces = (l: TypeArt["layout"]): Piece[] => { let r = rimCache.get(l); if (!r) rimCache.set(l, (r = (l.rim ?? []).map(k => ({ bot: k.frame, top: null })))); return r; };

export function refresh(v: View, force = false): void {
  // Below SLICE_FPS a frame covers so much flight that a rebuild spread over frames would be
  // stale when handed over (pops): then it's done whole, as it always was.
  const whole = force || (v.budget.fps > 0 && v.budget.fps < SLICE_FPS), job = jobs.get(v);
  if (job) {
    if (!whole && !due(v) && ++job.frames < MAX_FRAMES) { if (job.run.next().done) jobs.delete(v); return; }
    while (!job.run.next().done);
    jobs.delete(v);
  }
  const d = due(v);
  if (!d && !force) return;
  const run = rebuild(v, d ?? due(v, true)!, force);
  if (whole) { while (!run.next().done); return; }
  if (!run.next().done) jobs.set(v, { run, frames: 1 });
}

const SLICE_MS = 2.5, MAX_FRAMES = 4, SLICE_FPS = 30;

/** What a rebuild needs, if one is due now (she has moved, turned or zoomed, the scenery's radius has grown, or new art is in), else null; `force`: anyway. */
function due(v: View, force = false) {
  // The margin grows with her speed (a quarter second's flight), so at full boost the batches are
  // rebuilt every 10 m or so rather than every 4 (Ed, v256: dropped frames boosting over the treetops).
  const g = v.game, t = g.tuning, cam = v.camera, margin = Math.max(t.viewMargin, Math.hypot(g.witch.vx, g.witch.vz) * 0.25), pose = poseOf(g);
  const key = { x: cam.position.x, y: cam.position.y, z: cam.position.z };
  const lp = v.lastPose, lift = g.witch.mode === "rising" || g.witch.mode === "treetop" ? 1 : 0;
  const moved = Math.hypot(key.x - v.lastBuild.x, key.y - v.lastBuild.y, key.z - v.lastBuild.z) >= margin / 3;
  // Scenery is listed a little past the budget's radius (drawn there fully faded), so it is in
  // the list before the radius grows over it.
  const radius = v.budget.radius, reach = Math.min(t.haze.far, radius + margin / 2);
  const regrown = Math.abs(radius - v.lastBuild.radius) >= margin / 3;
  const turned = Math.abs(pose.distance - lp.distance) > 2 || Math.abs(pose.angle - lp.angle) > 0.5 || g.camera.zoomStep !== lp.zoomStep || lift !== lp.lift;
  if (!force && !moved && !turned && !regrown && v.assets.version === v.lastBuild.version) return null;
  return { margin, pose, key, lift, radius, reach };
}

function* rebuild(v: View, { margin, pose, key, lift, radius, reach }: NonNullable<ReturnType<typeof due>>, force: boolean): Generator<void, void, void> {
  let t0 = performance.now();
  const sliceDone = () => performance.now() - t0 > SLICE_MS, resume = () => { t0 = performance.now(); };
  const g = v.game, t = g.tuning;
  v.lastBuild = { ...key, version: v.assets.version, radius };
  v.lastPose = { distance: pose.distance, angle: pose.angle, zoomStep: g.camera.zoomStep, lift };
  const r = viewRect(v, reach, margin), cx = (r.minX + r.maxX) / 2, cz = (r.minZ + r.maxZ) / 2, half = Math.max(r.maxX - r.minX, r.maxZ - r.minZ) / 2;
  v.lastView = { x: cx, z: cz, half };
  const shadows: ShadowInstance[] = [];
  // Shadows fall away from the moon: from the upper left, so toward the lower right.
  const L = LIGHT_UNIFORMS.uMoonDir.value, sx = -L.x / Math.max(0.2, L.y), sz = -L.z / Math.max(0.2, L.y);
  const per = new Map<number, SpriteInstance[]>();
  const add = (type: number, inst: SpriteInstance) => { let l = per.get(type); if (!l) per.set(type, (l = [])); l.push(inst); };
  const mpp = v.mpp;
  // How far up the screen a step up a sprite goes, for each step of ground toward the camera.
  const pitch = (pose.angle * Math.PI) / 180, upOnScreen = SPRITE_UNIFORMS.uUp.value.dot(v.v3.set(0, Math.cos(pitch), -Math.sin(pitch)));
  // Every sprite stands on its lowest drawn pixel, not on the bottom of its box: it is slid back
  // along its own up (so that pixel lands exactly on the ground point, nothing sinks into the
  // ground) by the empty rows under its drawing. A tree's crown moves with its trunk.
  const U = SPRITE_UNIFORMS.uUp.value;
  const stand = (x: number, z: number, frame: Frame, m: number) => { const d = (frame.pad ?? 0) * m; return { x: x - U.x * d, y: -U.y * d, z: z - U.z * d }; };
  let nt = 0, nb = 0;
  for (const p of g.forest.treesNear(cx, cz, half)) {
    const art = v.assets.typeArt(p.type);
    if (!art || !art.layout.big.length) continue;
    // (a legend's grove, rules/forest.ts legendGrove: as strong as it is here, a share of the area's two tallest kinds,
    // drawn bigger, both easing out with it into the area's own forest)
    const gv = art.layout.grove, gs = p.grove ?? 0, GT = t.legendClearing.grove, u = ((p.variant >> 3) % 101) / 100;
    const G = gs > 0 && gv && u < GT.tallest * gs ? (u < GT.tallest * gs * 0.4 ? gv.giant : gv.tall) : undefined;
    const f = art.atlas.frames, big = art.layout.big[G?.length ? G[p.variant % G.length] : pickWeighted(art.layout.bigWeight, p.variant)], whole = f[big.top ?? big.bot];
    const boost = 1 + (GT.scale - 1) * gs * (0.75 + 0.5 * (((p.variant >> 5) % 97) / 96));
    if (!inView(v, p.x, p.z, whole.w * mpp * boost, whole.h * mpp * boost, margin, reach)) continue;
    // Squeeze the tallest variants so they never bury her flight (treeCap); a grove's a little beyond.
    const tall = whole.h * mpp, C = t.treeCap, scale = (tall > C.from ? (C.from + (tall - C.from) * C.keep) / tall : 1) * boost;
    const fresh = mark(v, "tree", p.x, p.z, tall * scale);
    const at = stand(p.x, p.z, f[big.bot], mpp * scale);
    // A tree's two halves share one box and sway alike (from its foot), so crown and trunk stay together.
    const sway = big.top !== null ? 1 : 0;
    add(p.type, { ...at, frame: f[big.bot], flip: p.flip, fresh, scale, cut: big.top !== null ? art.cut.get(big.bot) : undefined, sway });
    if (big.top !== null) add(p.type, { ...at, frame: f[big.top], flip: p.flip, top: true, fresh, scale, sway });
    const w = whole.w * mpp, h = whole.h * mpp * (big.top === null ? 0.2 : 0.6);
    if (t.shadows.trees) shadows.push({ x: p.x + sx * h, z: p.z + sz * h, w: w * 0.8, d: w * 0.45, scenery: true });
    nt++;
    if (sliceDone()) { yield; resume(); }
  }
  const scatter = function* (kind: string, list: Plant[], pick: (l: TypeArt["layout"]) => Piece[]): Generator<void, void, void> {
    for (const p of list) {
      const art = v.assets.typeArt(p.type);
      if (!art) continue;
      const pieces = pick(art.layout);
      if (!pieces.length) continue;
      const piece = pieces[p.variant % pieces.length], f = art.atlas.frames, frame = f[piece.bot], whole = f[piece.top ?? piece.bot];
      const scale = kind === "setpiece" ? t.setPieceScale : 1, m = mpp * scale; // set pieces: each area's landmark, drawn big
      // A piece drawn in perspective is anchored by its origin, its middle on the ground: its
      // bottom row (the front of it, nearest the camera) stands on the ground that much nearer
      // the camera, so the origin lands on its spot and nothing of it sinks under the ground.
      let x = p.x, z = p.z;
      if (piece.origin) {
        const ox = p.flip ? frame.w - piece.origin.x : piece.origin.x;
        x += (frame.w / 2 - ox) * m;
        z += ((frame.h - (frame.pad ?? 0) - piece.origin.y) * m * upOnScreen) / Math.max(0.2, Math.sin(pitch));
      }
      if (!inView(v, x, z, whole.w * m, whole.h * m, margin, reach)) continue;
      const fresh = mark(v, kind, p.x, p.z, whole.h * m);
      const at = stand(x, z, frame, m);
      const sway = kind === "small" ? 1 : 0; // undergrowth sways; walls and set pieces stand still
      add(p.type, { ...at, frame, flip: p.flip, fresh, scale, sway });
      if (piece.top !== null) add(p.type, { ...at, frame: f[piece.top], flip: p.flip, top: true, fresh, scale, sway });
      // Set pieces model their own ground: no blob under them (it read as a hard dark oval).
      // Its shadow lies under it, its front edge at its base (not centred on its bottom edge,
      // which leaves half of it in front, reading as a shadow below something hovering); one
      // drawn in perspective, anchored by its middle (its origin), round that middle, as relics are.
      const sd = frame.w * m * 0.3;
      if (kind !== "setpiece") shadows.push({ x: p.x, z: piece.origin ? p.z : p.z - sd * 0.4, w: frame.w * m * 0.8, d: sd, scenery: true });
      nb++;
      if (sliceDone()) { yield; resume(); }
    }
  };
  yield* scatter("small", g.forest.bushesNear(cx, cz, half), l => l.small);
  yield* scatter("small", g.forest.bedsNear(cx, cz, half), l => l.small); // a formal garden's beds, in rows
  // Berry bushes (rules/berries.ts): normal bushes of their area, a berry on some of them.
  yield* scatter("berrybush", g.berries.bushes.filter(b => Math.abs(b.x - cx) <= half && Math.abs(b.z - cz) <= half), l => l.small);
  yield* scatter("wall", g.forest.wallsNear(cx, cz, half), l => l.walls.map(bot => ({ bot, top: null })));
  yield* scatter("setpiece", g.forest.setPiecesNear(cx, cz, half), l => (l.set === null ? [] : [l.set]));
  // The rim kit round the legends' clearings (rules/forest.ts legendRim), drawn whole.
  yield* scatter("rim", g.forest.rimNear(cx, cz, half), l => rimPieces(l));
  // Decorations: ruins, rocks and freak trees, as scenery (each family's pieces picked by its variant).
  const decor = v.assets.decorArt(), dl: SpriteInstance[] = [];
  if (decor) for (const d of g.forest.decorNear(cx, cz, half)) {
    const list = decor.families[d.family];
    if (!list?.length) continue;
    const piece = list[d.variant % list.length], f = decor.atlas.frames, frame = f[piece.bot], whole = f[piece.top ?? piece.bot];
    if (!inView(v, d.x, d.z, whole.w * mpp, whole.h * mpp, margin, reach)) continue;
    const fresh = mark(v, "decor", d.x, d.z, whole.h * mpp), at = stand(d.x, d.z, frame, mpp);
    dl.push({ ...at, frame, flip: d.flip, fresh });
    if (piece.top !== null) dl.push({ ...at, frame: f[piece.top], flip: d.flip, top: true, fresh });
    const sd = frame.w * mpp * 0.3; // its shadow under it, front edge at its base
    shadows.push({ x: d.x, z: d.z - sd * 0.4, w: frame.w * mpp * 0.8, d: sd, scenery: true });
    nb++;
  }
  // The paths' 3D pieces (bridges, stairs, railway landmarks, posts), as scenery, each with its
  // middle on the ground over its spot.
  const pa = v.assets.pathPieceArt();
  if (pa) {
    const pl: SpriteInstance[] = [], R = SPRITE_UNIFORMS.uRight.value;
    for (const p of g.map.paths.pieces) {
      if (Math.abs(p.x - cx) > half || Math.abs(p.z - cz) > half) continue;
      const a = pa.byId[`${p.id}~${Math.floor(hash2(Math.round(p.x), Math.round(p.z), 61) * 3)}`] ?? pa.byId[p.id]; // a bridge's generated variant by its place (baked only under ?props=gen)
      if (!a) continue;
      // Anchored by its origin like a set piece: the part drawn below its middle lies on the
      // ground nearer the camera, its lowest drawn pixel on the ground.
      const frame = pa.atlas.frames[a.frame], dx = (a.originX - frame.w / 2) * mpp, below = Math.max(0, frame.h - (frame.pad ?? 0) - a.originY) * mpp;
      const at = stand(p.x - R.x * dx, p.z - R.z * dx + (below * upOnScreen) / Math.max(0.2, Math.sin(pitch)), frame, mpp);
      if (!inView(v, at.x, at.z, frame.w * mpp, frame.h * mpp, margin, reach)) continue;
      pl.push({ ...at, frame, flip: false, fresh: mark(v, "pathpiece", p.x, p.z, frame.h * mpp) });
      const sd = frame.w * mpp * 0.25; // under it, round its middle
      shadows.push({ x: p.x, z: p.z, w: frame.w * mpp * 0.7, d: sd, scenery: true });
      nb++;
    }
    v.batchFor(v.decorBatches, "pieces", () => new SpriteBatch(pa.atlas, mpp, { scenery: true, fade: true }))?.set(pl);
  }
  // Modern relics and the grounds (playgrounds, sports grounds: the art's arrangements, the
  // court or pitch decal first, under everything), each piece standing on its ground point.
  const ra = v.assets.relicArt();
  if (ra) {
    const fwd = v.camera.getWorldDirection(v.v3b), up = v.v3c.set(0, 1, 0).applyQuaternion(v.camera.quaternion);
    const U = SPRITE_UNIFORMS.uUp.value, R = SPRITE_UNIFORMS.uRight.value, rise = U.dot(up) / Math.max(0.2, -fwd.y);
    const upright: SpriteInstance[] = [], flat: SpriteInstance[] = [];
    const put = (a: RelicArt, gx: number, gz: number, flip: boolean) => {
      // Upright pieces stand on their lowest drawn pixel too (decals lie flat, as they are).
      const frame = ra.atlas.frames[a.frame], pad = a.decal ? 0 : frame.pad ?? 0, dx = (a.originX - frame.w / 2) * mpp * (flip ? -1 : 1), toward = Math.max(0, frame.h - pad - a.originY) * mpp * rise;
      const at = a.decal ? { x: gx - R.x * dx, y: 0, z: gz - R.z * dx + toward } : stand(gx - R.x * dx, gz - R.z * dx + toward, frame, mpp);
      if (!inView(v, at.x, at.z, frame.w * mpp, frame.h * mpp, margin, reach)) return;
      (a.decal ? flat : upright).push({ ...at, frame, flip, fresh: mark(v, "relic", gx, gz, frame.h * mpp) });
      if (!a.decal) shadows.push({ x: gx, z: gz, w: frame.w * mpp * 0.6, d: frame.w * mpp * 0.22, scenery: true });
      nb++;
    };
    if (ra.modern.length) for (const r of g.forest.relicsNear(cx, cz, half)) put(ra.modern[r.variant % ra.modern.length], r.x, r.z, r.flip);
    for (const gr of g.map.grounds) {
      if (Math.abs(gr.x - cx) > half + gr.r || Math.abs(gr.z - cz) > half + gr.r) continue;
      for (const p of ra.layouts[gr.kind] ?? []) { const a = ra.byId[p.id]; if (a) put(a, gr.x + (gr.flip ? -p.x : p.x), gr.z + p.z, gr.flip); } // mirrored whole
    }
    v.batchFor(v.decorBatches, "relics", () => new SpriteBatch(ra.atlas, mpp, { scenery: true, fade: true }))?.set(upright);
    v.batchFor(v.decorBatches, "decals", () => {
      return asFloor(new SpriteBatch(ra.atlas, mpp, { scenery: true, flat: true })); // right after the ground, under everything standing
    })?.set(flat);
  }
  // Scenes (Ed, 2026-10-04): each a few pieces standing round its middle, as authored or
  // mirrored as a whole, each piece nudged a little; anchored by their ground points like relics.
  const sa = g.map.scenes.length ? v.assets.sceneArt() : undefined;
  if (sa) {
    const fwd = v.camera.getWorldDirection(v.v3b), up = v.v3c.set(0, 1, 0).applyQuaternion(v.camera.quaternion);
    const U = SPRITE_UNIFORMS.uUp.value, R = SPRITE_UNIFORMS.uRight.value, rise = U.dot(up) / Math.max(0.2, -fwd.y);
    const upright: SpriteInstance[] = [], flat: SpriteInstance[] = [];
    for (const sc of g.map.scenes) {
      if (Math.abs(sc.x - cx) > half + sc.r || Math.abs(sc.z - cz) > half + sc.r) continue;
      const lay = sa.layouts[sc.id];
      if (!lay) continue;
      (sc.mirror ? lay.mirror : lay.plain).forEach((p, i) => {
        const a = sa.pieces[p.ref];
        if (!a) return;
        const jx = (hash2(i, Math.round(sc.x), 901) - 0.5) * 0.4, jz = (hash2(i, Math.round(sc.z), 903) - 0.5) * 0.4;
        const gx = sc.x + p.dx + jx, gz = sc.z + p.dz + jz, flip = p.left;
        const frame = sa.atlas.frames[a.frame], pad = a.decal ? 0 : frame.pad ?? 0, dx = (a.originX - frame.w / 2) * mpp * (flip ? -1 : 1), toward = Math.max(0, frame.h - pad - a.originY) * mpp * rise;
        const at = a.decal ? { x: gx - R.x * dx, y: 0, z: gz - R.z * dx + toward } : stand(gx - R.x * dx, gz - R.z * dx + toward, frame, mpp);
        if (!inView(v, at.x, at.z, frame.w * mpp, frame.h * mpp, margin, reach)) return;
        (a.decal ? flat : upright).push({ ...at, frame, flip, fresh: mark(v, "scene", gx, gz, frame.h * mpp) });
        if (!a.decal) shadows.push({ x: gx, z: gz, w: frame.w * mpp * 0.6, d: frame.w * mpp * 0.22, scenery: true });
        nb++;
      });
    }
    v.batchFor(v.decorBatches, "scenes", () => new SpriteBatch(sa.atlas, mpp, { scenery: true, fade: true }))?.set(upright);
    v.batchFor(v.decorBatches, "sceneDecals", () => {
      return asFloor(new SpriteBatch(sa.atlas, mpp, { scenery: true, flat: true }));
    })?.set(flat);
  }
  if (sliceDone()) { yield; resume(); }
  dl.sort((a, b) => b.z - a.z); // nearest first, as the trees below
  if (decor) v.batchFor(v.decorBatches, "all", () => new SpriteBatch(decor.atlas, mpp, { scenery: true, fade: true }))?.set(dl);
  for (const [type, b] of v.typeBatches) if (!per.has(type)) b.set([]);
  // Nearest the camera first (it looks north: larger z is nearer), so the GPU's early depth test
  // skips the pixels of the trees behind them: in the treetops most of the forest, and with the
  // bend the far forest folded in behind the near canopy, is hidden behind trees in front.
  for (const list of per.values()) list.sort((a, b) => b.z - a.z);
  for (const [type, list] of per) {
    const b = v.batchFor(v.typeBatches, type, () => { const a = v.assets.typeArt(type); return a && new SpriteBatch(a.atlas, mpp, { scenery: true, fade: true }); });
    b?.set(list);
    if (sliceDone()) { yield; resume(); }
  }
  { const th = g.map.treehouse; shadows.push({ x: th.x, z: th.z, w: 7, d: 3.5, scenery: false }); } // soft, under the treehouse
  checkPops(v, "placed", !force);
  v.sources = g.forest.lightsNear(g.witch.x, g.witch.z, t.haze.far + margin);
  v.stats.trees = nt; v.stats.bushes = nb;
  v.shadowList = shadows;
}
