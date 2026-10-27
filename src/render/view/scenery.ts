// The scenery rebuild (from render/view.ts, issue #122): trees, undergrowth, walls, set pieces, decor,
// path pieces, relics, grounds and scenes round the camera, rebuilt once it has moved, turned or zoomed.
import { relicArtId, relicBottle, relicFlipped } from "./lights";
import type { Frame, Piece, RelicArt } from "../artBuild";
import { LIGHT_UNIFORMS } from "../lighting";
import type { Plant } from "../../rules/forest";
import { SPRITE_UNIFORMS, SpriteBatch, asFloor, type SpriteInstance } from "../sprites";
import type { ShadowInstance } from "../shadows";
import { TrunkShadowBatch, type TrunkShadow } from "../trunkShadows";
import type { Atlas } from "../atlas";
import type { TypeArt } from "../assets";
import { hash2 } from "../../rules/random";

/** A tree's own leaf-colour jitter seeds, -1 to 1 for hue and for value, from where it stands (Ed, 2026-10-16: "a small amount of
 *  per-tree colour jitter"; the amount is the tuning's leafJitter, applied to its leaves in the sprite shader). One pair a tree,
 *  the same every frame and every load. */
const JITTERS = new Map<number, [number, number]>();
/** The biggest a tree is drawn (m, wide and tall, a grove's boost included): what may be on screen before its art is in. */
const TREE_MAX = { w: 40, h: 80 };
export function leafJitterOf(p: { x: number; z: number }): [number, number] {
  const xi = Math.round(p.x * 4) | 0, zi = Math.round(p.z * 4) | 0, key = xi * 131071 + zi;
  let j = JITTERS.get(key);
  if (!j) { j = [hash2(xi, zi, 7101) * 2 - 1, hash2(xi, zi, 7103) * 2 - 1]; if (JITTERS.size > 20000) JITTERS.clear(); JITTERS.set(key, j); }
  return j;
}
import { poseOf, type Game } from "../../rules/game";
import type { View } from "../view";
import type { Steps } from "../slices";
import { focusOf, inView, viewRect } from "./culling";
import { checkPops, mark } from "./pops";
import { BarkFaces } from "../barkFaces";
import { relicsOut } from "../../rules/partyOver";

/** The scenery's own trunk-shadow batches, by the key they're kept under in View.trunkShadowBatches (the area types' by number). */
const SCENERY_CASTS = new Set(["decor", "relics", "scenes"]);
// Each map's bark faces (render/barkFaces.ts), made once; the forest's trees round a spot, for its anchors to find theirs.
const FACES = new WeakMap<object, BarkFaces>(), NEAR = new WeakMap<object, (x: number, z: number, r: number) => Iterable<Plant>>();
function facesOf(g: Game): BarkFaces { let f = FACES.get(g.map); if (!f) { const d = g.map.dancefloor; FACES.set(g.map, (f = new BarkFaces(g.map, d ? g.map.areaAt(d.x, d.z).cell : undefined))); } return f; }
function nearTrees(g: Game): (x: number, z: number, r: number) => Iterable<Plant> { let n = NEAR.get(g.forest); if (!n) NEAR.set(g.forest, (n = (x, z, r) => g.forest.treesNear(x, z, r))); return n; }

/** An index by weight, from a seeded integer (its last six digits as a share). */
function pickWeighted(w: number[], seed: number): number {
  let total = 0;
  for (const x of w) total += x;
  let u = ((seed % 1000003) / 1000003) * total;
  for (let i = 0; i < w.length; i++) { u -= w[i]; if (u < 0) return i; }
  return Math.max(0, w.length - 1);
}

/** A rebuild under way, for each view: the rest of it, a part each frame. */
const jobs = new WeakMap<View, { run: Generator<void, void, void>; frames: number; art: boolean }>();
/** Another night in the view (View.setGame): a rebuild under way dropped (it lists the last night's island). */
export function cancelRefresh(v: View): void { jobs.delete(v); }

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
  // (a rebuild for new art alone, with nothing moved: never stale however long it takes, so always sliced and given ART_FRAMES;
  // whole, each set of a new island's art coming in was a whole rebuild a frame, 130 to 190 ms each on Ed's laptop after a sail,
  // its frames slow so the next was whole too: his playtest of v4821, "sailing transition loading was slow")
  const slow = v.budget.fps > 0 && v.budget.fps < SLICE_FPS, job = jobs.get(v);
  if (job) {
    const next = due(v);
    if (!force && (!next || (job.art && next.art)) && ++job.frames < (job.art ? ART_FRAMES : MAX_FRAMES) && !(slow && !job.art)) { if (job.run.next().done) jobs.delete(v); return; }
    while (!job.run.next().done);
    jobs.delete(v);
  }
  const d = due(v);
  if (!d && !force) return;
  const art = !force && !!d?.art, run = rebuild(v, d ?? due(v, true)!, force);
  if (force || (slow && !art)) { while (!run.next().done); return; }
  if (!run.next().done) jobs.set(v, { run, frames: 1, art });
}

/** refresh(v, true) in steps (render/slices.ts: the start's, View.prepare): the rebuild under way finished, then a whole one, a
 *  slice of it at a time (nothing is drawn meanwhile: the start's frames wait for it). */
export function* refreshSteps(v: View): Steps {
  const job = jobs.get(v);
  if (job) { while (!job.run.next().done) yield; jobs.delete(v); }
  const run = rebuild(v, due(v) ?? due(v, true)!, true);
  while (!run.next().done) yield;
}

const SLICE_MS = 2.5, MAX_FRAMES = 4, ART_FRAMES = 120, SLICE_FPS = 30;

/** The tallest trees' squeeze (treeCap) as one number, to see it change. */
const treeCapKey = (t: View["game"]["tuning"]): number => t.treeCap.from * 1e3 + t.treeCap.keep;
/** Which quest relics lie in the world, as a bit mask (their bottles are scenery). */
const lyingRelics = (g: View["game"]): number => { let m = 0; for (const r of relicsOut(g)) if (r.state === "lying") m |= 1 << (r.id % 30); return m; };

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
  // In the air (rising, in the treetops, coming down) the crowns reach further than the rest of the scenery (Ed's playtest,
  // 2026-10-13: "outside of a circle around the witch, the canopy is not drawn"): out to the canopy's reach, crowns alone (no
  // trunk, shadow or undergrowth); on the ground, where her view doesn't reach the far crowns, as far as the rest.
  const canopy = Math.max(reach, v.canopyNow);
  const regrown = Math.abs(radius - v.lastBuild.radius) >= margin / 3 || Math.abs(canopy - (v.lastBuild.canopy ?? reach)) >= margin / 3;
  // Looking through the telescope (render/view/camera.ts): listed again each half of its wedge it pans, or as it zooms; or no longer.
  const TW = t.telescope, tele = v.telescope && TW ? 1 + Math.round(v.telescope.heading / Math.max(1, TW.wedge / 2)) * 1000 + Math.round(v.telescope.fov) : 0;
  const turned = Math.abs(pose.distance - lp.distance) > 2 || Math.abs(pose.angle - lp.angle) > 0.5 || g.camera.zoomStep !== lp.zoomStep || lift !== lp.lift || tele !== (lp.tele ?? 0);
  const relics = lyingRelics(g); // (one picked up or put back: its bottle goes or comes at once)
  const cap = treeCapKey(t); // (the tallest trees' squeeze changed on the pause page's sliders: drawn again at once, on the frozen frame too)
  if (!force && !moved && !turned && !regrown && v.assets.version === v.lastBuild.version && relics === v.lastBuild.relics && cap === v.lastBuild.cap) return null;
  const art = !force && !moved && !turned && !regrown && relics === v.lastBuild.relics && cap === v.lastBuild.cap; // (only new art in)
  return { margin, pose, key, lift, radius, reach, canopy, tele, art };
}

function* rebuild(v: View, { margin, pose, key, lift, radius, reach, canopy, tele }: NonNullable<ReturnType<typeof due>>, force: boolean): Generator<void, void, void> {
  let t0 = performance.now();
  const sliceDone = () => performance.now() - t0 > SLICE_MS, resume = () => { t0 = performance.now(); };
  const g = v.game, t = g.tuning;
  v.lastBuild = { ...key, version: v.assets.version, radius, canopy, relics: lyingRelics(v.game), cap: treeCapKey(t) };
  v.lastPose = { distance: pose.distance, angle: pose.angle, zoomStep: g.camera.zoomStep, lift, tele };
  // Through the telescope, the whole circle round her at once (it pans with nothing listed again; inView passes all within reach).
  const round = (far: number) => { const f = focusOf(v); return { minX: f.x - far - margin, maxX: f.x + far + margin, minZ: f.z - far - margin, maxZ: f.z + far + margin }; };
  const r = tele ? round(reach) : viewRect(v, reach, margin), cx = (r.minX + r.maxX) / 2, cz = (r.minZ + r.maxZ) / 2, half = Math.max(r.maxX - r.minX, r.maxZ - r.minZ) / 2;
  v.lastView = { x: cx, z: cz, half };
  const shadows: ShadowInstance[] = [];
  // Shadows fall away from the moon: from the upper left, so toward the lower right.
  const L = LIGHT_UNIFORMS.uMoonDir.value, sx = -L.x / Math.max(0.2, L.y), sz = -L.z / Math.max(0.2, L.y);
  const per = new Map<number, SpriteInstance[]>();
  const trunks = new Map<number, TrunkShadow[]>(); // (their shadows from her glow and the fires: render/trunkShadows.ts)
  // Scenery casts them too (Ed, 2026-10-12: "Scenery (temples etc) should also cast them"): set pieces (in their area's batch, with
  // its trees), decor, relics and scenes (a batch an atlas), upright pieces at least sceneryMin metres tall, whole, cast from
  // their middle (their foot fade and taper by their own width: render/trunkShadows.ts). Decals lie flat and cast none.
  const ST = t.shadows.trunks, castMin = ST?.scenery ? ST.sceneryMin ?? 1.2 : Infinity;
  const casts = new Map<string, TrunkShadow[]>();
  const cast = (key: string, x: number, z: number, frame: Frame, m: number, flip: boolean) => {
    if (frame.h * m < castMin) return;
    let l = casts.get(key); if (!l) casts.set(key, (l = [])); l.push({ x, z, w: frame.w * m, h: frame.h * m, frame, flip, scenery: true });
  };
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
  const TS = t.telescope, eye = focusOf(v);
  const rc = canopy > reach ? (tele ? round(canopy) : viewRect(v, canopy, margin)) : r, ccx = (rc.minX + rc.maxX) / 2, ccz = (rc.minZ + rc.maxZ) / 2, chalf = Math.max(rc.maxX - rc.minX, rc.maxZ - rc.minZ) / 2;
  for (const p of g.forest.treesNear(ccx, ccz, chalf)) {
    // (its area type's art asked for only if the tree may be on screen, by the biggest a tree is drawn: the first frame's art
    // first, not every type in the canopy's square; the island's others come ahead of need, view.ts askIsland)
    if (!v.assets.hasType(p.type) && !inView(v, p.x, p.z, TREE_MAX.w, TREE_MAX.h, margin, Math.max(reach, canopy))) continue;
    const art = v.assets.typeArt(p.type);
    if (!art || !art.layout.big.length) continue;
    // (a legend's grove, rules/forest.ts legendGrove: as strong as it is here, a share of the area's two tallest kinds,
    // drawn bigger, both easing out with it into the area's own forest)
    const gv = art.layout.grove, gs = p.grove ?? 0, GT = t.legendClearing.grove, u = ((p.variant >> 3) % 101) / 100;
    const G = gs > 0 && gv && u < GT.tallest * gs ? (u < GT.tallest * gs * 0.4 ? gv.giant : gv.tall) : undefined;
    // (one of the area's two bark faces at most, render/barkFaces.ts: its faced tree instead)
    const face = art.layout.face !== undefined && facesOf(g).isFace(p, nearTrees(g)) ? art.layout.face : -1;
    const f = art.atlas.frames, big = art.layout.big[face >= 0 ? face : G?.length ? G[p.variant % G.length] : pickWeighted(art.layout.bigWeight, p.variant)], whole = f[big.top ?? big.bot];
    const boost = 1 + (GT.scale - 1) * gs * (0.75 + 0.5 * (((p.variant >> 5) % 97) / 96));
    const near = inView(v, p.x, p.z, whole.w * mpp * boost, whole.h * mpp * boost, margin, reach);
    if (!near && (big.top === null || canopy <= reach || !inView(v, p.x, p.z, whole.w * mpp * boost, whole.h * mpp * boost, margin, canopy))) continue;
    // The telescope's far forest (Ed, 2026-10-21: "fewer, flatter crowns past 360 m"): past thinFrom, one crown in `thin`, bigger.
    const thinned = tele && !near && TS && (p.x - eye.x) ** 2 + (p.z - eye.z) ** 2 > TS.thinFrom ** 2;
    if (thinned && p.variant % TS.thin !== 0) continue;
    // Squeeze the tallest variants so they never bury her flight (treeCap); a grove's a little beyond.
    const tall = whole.h * mpp, C = t.treeCap, scale = (tall > C.from ? (C.from + (tall - C.from) * C.keep) / tall : 1) * boost * (thinned ? TS.thinGrow : 1);
    const fresh = mark(v, "tree", p.x, p.z, tall * scale);
    const at = stand(p.x, p.z, f[big.bot], mpp * scale);
    const jitter = leafJitterOf(p); // (its own leaf colour, both halves alike: Ed, 2026-10-16)
    if (!near) { add(p.type, { ...at, frame: f[big.top!], flip: p.flip, top: true, fresh, scale, sway: 1, jitter, foot: f[big.bot].foot }); nt++; if (sliceDone()) { yield; resume(); } continue; } // (past the scenery's radius, in the treetops: its crown alone)
    // A tree's two halves share one box and sway alike (from its foot), so crown and trunk stay together.
    const sway = big.top !== null ? 1 : 0;
    add(p.type, { ...at, frame: f[big.bot], flip: p.flip, fresh, scale, cut: big.top !== null ? art.cut.get(big.bot) : undefined, sway, jitter });
    if (big.top !== null || f[big.bot].h > f[big.bot].w * 1.5) { let l = trunks.get(p.type); if (!l) trunks.set(p.type, (l = [])); l.push({ x: p.x, z: p.z, w: f[big.bot].w * mpp * scale, h: f[big.bot].h * mpp * scale, frame: f[big.bot], flip: p.flip }); }
    if (big.top !== null) add(p.type, { ...at, frame: f[big.top], flip: p.flip, top: true, fresh, scale, sway, jitter, foot: f[big.bot].foot });
    const w = whole.w * mpp, h = whole.h * mpp * (big.top === null ? 0.2 : 0.6);
    if (t.shadows.trees) shadows.push({ x: p.x + sx * h, z: p.z + sz * h, w: w * 0.8, d: w * 0.45, scenery: true });
    nt++;
    if (sliceDone()) { yield; resume(); }
  }
  const scatter = function* (kind: string, list: Plant[], pick: (l: TypeArt["layout"]) => Piece[]): Generator<void, void, void> {
    for (const p of list) {
      if (!v.assets.hasType(p.type) && !inView(v, p.x, p.z, TREE_MAX.w, TREE_MAX.h, margin, reach)) continue; // (as the trees: asked for only if it may be on screen)
      const art = v.assets.typeArt(p.type);
      if (!art) continue;
      const pieces = pick(art.layout);
      if (!pieces.length) continue;
      const piece = pieces[p.variant % pieces.length], f = art.atlas.frames, frame = f[piece.bot], whole = f[piece.top ?? piece.bot];
      const scale = kind === "setpiece" ? t.setPieceScale / (v.style.setPieceScale || 1) : 1, m = mpp * scale; // set pieces: each area's landmark, big: baked at setPieceScale (the style's), so drawn at 1
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
      if (piece.top !== null) add(p.type, { ...at, frame: f[piece.top], flip: p.flip, top: true, fresh, scale, sway, foot: f[piece.bot].foot });
      // Set pieces model their own ground: no blob under them (it read as a hard dark oval).
      // Its shadow lies under it, its front edge at its base (not centred on its bottom edge,
      // which leaves half of it in front, reading as a shadow below something hovering); one
      // drawn in perspective, anchored by its middle (its origin), round that middle, as relics are.
      const sd = frame.w * m * 0.3;
      if (kind === "setpiece" && frame.h * m >= castMin) { let l = trunks.get(p.type); if (!l) trunks.set(p.type, (l = [])); l.push({ x: p.x, z: p.z, w: frame.w * m, h: frame.h * m, frame, flip: p.flip, scenery: true }); }
      if (kind !== "setpiece") shadows.push({ x: p.x, z: piece.origin ? p.z : p.z - sd * 0.4, w: frame.w * m * 0.8, d: sd, scenery: true });
      nb++;
      if (sliceDone()) { yield; resume(); }
    }
  };
  yield* scatter("small", g.forest.bushesNear(cx, cz, half), l => l.small);
  yield* scatter("small", g.forest.bedsNear(cx, cz, half), l => l.small); // a formal garden's beds, in rows
  // Berry bushes (rules/berries.ts): normal bushes of their area, a berry on some of them.
  yield* scatter("berrybush", g.berries.bushes.filter(b => !b.harvest && Math.abs(b.x - cx) <= half && Math.abs(b.z - cz) <= half), l => l.small);
  yield* scatter("wall", g.forest.wallsNear(cx, cz, half), l => l.walls.map(bot => ({ bot, top: null })));
  yield* scatter("setpiece", g.forest.setPiecesNear(cx, cz, half), l => (l.set === null ? [] : [l.set]));
  // The rim kit round the legends' clearings (rules/forest.ts legendRim), drawn whole.
  yield* scatter("rim", g.forest.rimNear(cx, cz, half), l => rimPieces(l));
  // Decorations: ruins, rocks and freak trees, as scenery (each family's pieces picked by its variant).
  // (its set asked for once one may be on screen, as the trees' art; held, as ever, its island's biome look asked for again)
  const decor = v.assets.hasDecor() || g.forest.decorNear(cx, cz, half).some(d => inView(v, d.x, d.z, TREE_MAX.w, TREE_MAX.h, margin, reach)) ? v.assets.decorArt() : undefined, dl: SpriteInstance[] = [], dk = `all${decor?.biome ? "@" + decor.biome : ""}`;
  for (const [k, b] of v.decorBatches) if ((k === "all" || k.startsWith("all@")) && (!decor || k !== dk)) { v.scene.remove(...b.meshes); b.release(); v.decorBatches.delete(k); } // (another biome's rocks, or being drawn again in this island's)
  if (decor) for (const d of g.forest.decorNear(cx, cz, half)) {
    const list = decor.families[d.family];
    if (!list?.length) continue;
    const piece = list[d.variant % list.length], f = decor.atlas.frames, frame = f[piece.bot], whole = f[piece.top ?? piece.bot];
    if (!inView(v, d.x, d.z, whole.w * mpp, whole.h * mpp, margin, reach)) continue;
    const fresh = mark(v, "decor", d.x, d.z, whole.h * mpp), at = stand(d.x, d.z, frame, mpp);
    dl.push({ ...at, frame, flip: d.flip, fresh });
    if (piece.top !== null) dl.push({ ...at, frame: f[piece.top], flip: d.flip, top: true, fresh, foot: f[piece.bot].foot });
    cast("decor", d.x, d.z, frame, mpp, d.flip); // (a tall one's two halves share one box: each casts its own, together the whole)
    if (piece.top !== null) cast("decor", d.x, d.z, f[piece.top], mpp, d.flip);
    const sd = frame.w * mpp * 0.3; // its shadow under it, front edge at its base
    shadows.push({ x: d.x, z: d.z - sd * 0.4, w: frame.w * mpp * 0.8, d: sd, scenery: true });
    nb++;
  }
  // The paths' 3D pieces (bridges, stairs, railway landmarks, posts), as scenery, each with its
  // middle on the ground over its spot.
  const pa = v.assets.hasPathPieces() || g.map.paths.pieces.some(p => Math.abs(p.x - cx) <= half && Math.abs(p.z - cz) <= half && inView(v, p.x, p.z, TREE_MAX.w, TREE_MAX.h, margin, reach)) ? v.assets.pathPieceArt() : undefined;
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
      if (!a.decal) cast("relics", gx, gz, frame, mpp, flip);
      if (!a.decal) shadows.push({ x: gx, z: gz, w: frame.w * mpp * 0.6, d: frame.w * mpp * 0.22, scenery: true });
      nb++;
    };
    if (ra.modern.length) for (const r of g.forest.relicsNear(cx, cz, half)) put(ra.modern[r.variant % ra.modern.length], r.x, r.z, r.flip);
    // The quest relics still lying where they were found: each its party relic bottle in its mound, standing on its lowest drawn
    // pixel like the rest (its gold rune, the pickup marker, lies sigilOffset metres south: render/leash.ts).
    for (const r of relicsOut(g)) { // (none before the party: rules/partyOver.ts)
      if (r.state !== "lying" || Math.abs(r.x - cx) > half || Math.abs(r.z - cz) > half) continue;
      const a = ra.byId[relicArtId(r.kind)] ?? ra.byId[`party:${relicBottle(r.kind)}`];
      if (a) put(a, r.x, r.z, relicFlipped(r.kind));
    }
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
        if (!a.decal) cast("scenes", gx, gz, frame, mpp, flip);
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
  if (decor) v.batchFor(v.decorBatches, dk, () => new SpriteBatch(decor.atlas, mpp, { scenery: true, fade: true }))?.set(dl);
  for (const [type, b] of v.typeBatches) if (!per.has(type)) b.set([]);
  { const now = performance.now(); for (const t of per.keys()) v.typeUsed.set(t, now); } // (listed: kept by the GPU budget, view/gpuBudget.ts)
  if (t.shadows.trunks) { // (always set, so ?trunks or the pause page's switch can turn them on live; hidden while off: render/view.ts)
    for (const [type, b] of v.trunkShadowBatches) if (typeof type === "number" ? !trunks.has(type) : SCENERY_CASTS.has(type) && !casts.has(type)) b.set([]);
    for (const [type, list] of trunks) {
      let b = v.trunkShadowBatches.get(type);
      if (!b) { const a = v.assets.typeArt(type); if (!a) continue; b = new TrunkShadowBatch(a.atlas); v.trunkShadowBatches.set(type, b); v.scene.add(...b.meshes); }
      b.set(list);
    }
    const atlases: Record<string, Atlas | undefined> = { decor: decor?.atlas, relics: ra?.atlas, scenes: sa?.atlas };
    for (const [key, list] of casts) {
      let b = v.trunkShadowBatches.get(key);
      const a = atlases[key];
      if (b && b.atlas !== a) { v.scene.remove(...b.meshes); b.dispose(); b = undefined; } // (its art rebaked: a new atlas)
      if (!b) { if (!a) continue; b = new TrunkShadowBatch(a); v.trunkShadowBatches.set(key, b); v.scene.add(...b.meshes); }
      b.set(list);
    }
  }
  // Nearest the camera first (it looks north: larger z is nearer), so the GPU's early depth test
  // skips the pixels of the trees behind them: in the treetops most of the forest, and with the
  // bend the far forest folded in behind the near canopy, is hidden behind trees in front.
  for (const list of per.values()) list.sort((a, b) => b.z - a.z);
  for (const [type, list] of per) {
    const b = v.batchFor(v.typeBatches, type, () => { const a = v.assets.typeArt(type); return a && new SpriteBatch(a.atlas, mpp, { scenery: true, fade: true }); });
    b?.set(list);
    if (sliceDone()) { yield; resume(); }
  }
  { const th = g.map.treehouse; shadows.push({ x: th.x, z: th.z, w: g.tuning.treehouse.deck?.on ? 9 : 7, d: g.tuning.treehouse.deck?.on ? 5 : 3.5, scenery: false }); } // soft, under the treehouse
  checkPops(v, "placed", !force);
  const fo = focusOf(v);
  v.sources = g.forest.lightsNear(fo.x, fo.z, t.haze.far + margin);
  v.stats.trees = nt; v.stats.bushes = nb;
  v.shadowList = shadows;
}
