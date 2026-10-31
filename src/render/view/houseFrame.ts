// A4 mechanical extraction from src/render/view.ts; body identity is checked by tools/refactor/a4-split.mjs.
import type { View, ViewInternals, ViewShared } from "../view";
import * as THREE from "three";
import { deckOf } from "../../rules/treehouse";
import { HOUSE_LAYER } from "../post";
import { CrownView } from "../crown";
import { CrownLandmark } from "../crownLandmark";
import { makeCrown, type HouseOutline } from "../../rules/crown";
import { rooms as OUTLINE_ROOMS, branches as OUTLINE_BRANCHES, stubs as OUTLINE_STUBS, takeoff as OUTLINE_TAKEOFF } from "../../../config/house/outline.json";
import { toPlan } from "../../rules/houseRooms";
import { speakerRadius } from "../../rules/speakers";
import { Hiz, HIZ_LAYER } from "../hiz";
import type { Game } from "../../rules/game";
import { stepTiltShare, tiltShareShown } from "../overlayTilt";
import { nextFrame, runSliced, type Steps } from "../slices";
import { refreshSteps } from "./scenery";

export function houseTilt(view: View, internals: ViewInternals, shared: ViewShared, g: Game): number {
    const want = g.witch.perch && !view.telescope ? 0 : 1, dt = Number.isFinite(internals.tiltAt) ? Math.max(0, Math.min(0.1, g.herTime - internals.tiltAt)) : 1e9;
    internals.tiltAt = g.herTime;
    view.tiltK = stepTiltShare(view.tiltK, want, dt, shared.HOUSE_TILT_EASE);
    return tiltShareShown(view.tiltK);
  }

export function behindHouse(view: View, internals: ViewInternals, _shared: ViewShared, g: Game): void {
    // A late landing's house-only camera layer must still submit the critical ground to its readiness gate.
    view.ground.mesh.layers[view.shaderLandingLimited && view.shaderDrawStatus.active ? 'enable' : 'disable'](HOUSE_LAYER);
    const D = internals.dark, T = g.tuning.treehouse.house?.dark, deck = deckOf(g.map, g.tuning), w = g.witch;
    const inHouse = !!T?.on && !!deck?.house?.rooms && !!w.perch && w.mode === "ground" && !view.telescope; // (on foot: rising out of it, the forest comes back as she lifts off)
    const enclosed = inHouse && !g.islandReady;
    // (where it comes back from: the whole picture as the island's ready, or through the telescope; else where she left the house)
    if (enclosed !== D.enclosed) { D.reveal = !enclosed && inHouse; D.door = (view.telescope || D.reveal) && !enclosed ? null : { x: w.x, z: w.z }; D.enclosed = enclosed; }
    const dt = Number.isFinite(D.at) ? Math.max(0, Math.min(0.1, g.herTime - D.at)) : 1e9;
    D.at = g.herTime;
    const fade = Math.max(1e-3, (D.reveal && !enclosed ? T?.reveal : undefined) ?? T?.fade ?? 0.6);
    D.k = enclosed ? Math.max(0, D.k - dt / fade) : Math.min(1, D.k + dt / fade);
    if (!T?.on) D.k = 1;
    const P = view.post;
    P.behind = D.k < 1 ? D.k * D.k * (3 - 2 * D.k) : 1; // (eased in and out)
    if (D.k >= 1) return;
    // The house's own meshes on its layer as well as the scene's (they come and go: each frame).
    for (const o of [...(view.houseRooms?.meshes ?? []), ...(view.crown?.meshes ?? []), ...(internals.strings?.crownMeshes ?? []), ...view.treehouseBatch.meshes, ...view.witchBatch.meshes, ...(view.bareBatch?.meshes ?? [])]) o.traverse(c => c.layers.enable(HOUSE_LAYER));
    if (D.door) {
      const p = view.v3.set(D.door.x, view.witchFeetY, D.door.z).project(view.camera);
      P.behindAt = D.uv.set(p.x * 0.5 + 0.5, p.y * 0.5 + 0.5);
    } else P.behindAt = null;
  }

export function occluders(view: View, internals: ViewInternals, shared: ViewShared): void {
    const T = view.game.map.treehouse, cp = view.camera.position, m = view.treehouseBatch.meshes[0];
    const on = !internals.hizOff && !!m && (cp.x - T.x) ** 2 + (cp.z - T.z) ** 2 < shared.HIZ_NEAR * shared.HIZ_NEAR;
    if (on && !internals.hiz) internals.hiz = new Hiz(view.renderer);
    if (m) m.layers.enable(HIZ_LAYER);
    internals.hiz?.render(view.renderer, view.scene, view.camera, view.width, view.height, on);
  }

export function ensureCrown(view: View, internals: ViewInternals, _shared: ViewShared, game: Game): void {
    const t = game.tuning, H = t.treehouse.house, want = !!(H?.on && H.crown?.on && deckOf(game.map, t)?.house?.rooms);
    // (the crown whole over the Terrace or with its gap, the pause page's switch: Ed, 2026-10-26, grown again when it's flipped)
    const gap = H?.crown?.whole !== true, lights = H?.crown?.lights ?? 1, wrap = H?.crown?.wrap ?? 0;
    if (view.crown && want && (view.crown.crown.gap !== gap || view.crown.lights !== lights || (view.crown.crown.wrap ?? 0) !== wrap)) { view.scene.remove(...view.crown.meshes); internals.strings?.setCrown(null); view.crown.dispose(); view.crown = null; if (internals.crownFar) { view.scene.remove(...internals.crownFar.meshes); internals.crownFar.dispose(); internals.crownFar = null; } }
    if (want && !view.crown && H) {
      const outline = { rooms: OUTLINE_ROOMS, branches: OUTLINE_BRANCHES, stubs: OUTLINE_STUBS, takeoff: OUTLINE_TAKEOFF } as unknown as HouseOutline;
      // (the dancefloor and its speakers stay open to the sky as the Terrace does: it stands south-east of the house, under the crown's edge)
      const deck = deckOf(game.map, t)!, df = game.map.dancefloor, dp = toPlan({ x: deck.x, z: deck.z }, df.x, df.z);
      const open = [{ x: dp.x, z: dp.z, r: speakerRadius(t) + t.dancefloor.speakers.footprint + 4 }];
      view.crown = new CrownView(makeCrown({ outline, floor: H.height, seed: H.crown!.seed, open, gap, wrap }), t.stringLights.bulbSpacing, outline, lights);
      view.crown.drawMask = (key, box) => { const p = view.assets.oneOff({ kind: "crownMask", id: `${key}@${box.map(v => v.toFixed(4)).join(",")}`, style: view.assets.style, box: [...box] }).then(r => r.mask ?? Promise.reject(new Error("no mask"))); view.assets.track(`crownMask:${key}`, p); return p; };
      view.scene.add(...view.crown.meshes);
      internals.strings?.setCrown(view.crown); // (its string lights: render/strings.ts)
      internals.crownFar = new CrownLandmark(view.crown, t.stringLights.palette.map(h => new THREE.Color(h))); view.scene.add(...internals.crownFar.meshes);
    } else if (!want && view.crown) {
      view.scene.remove(...view.crown.meshes); internals.strings?.setCrown(null); view.crown.dispose(); view.crown = null;
      if (internals.crownFar) { view.scene.remove(...internals.crownFar.meshes); internals.crownFar.dispose(); internals.crownFar = null; }
    }
  }

export async function buildHome(view: View, internals: ViewInternals, _shared: ViewShared, epoch: NonNullable<Parameters<View["buildHome"]>[0]>): Promise<void> {
    const steps = internals.warmSteps(), view = view;
    await runSliced((function* (): Steps { while (epoch === view.shaderEpoch) { const step = steps.next(); if (step.done) return; yield step.value; } })(), "warm");
    if (epoch !== internals.shaderEpoch) return;
    performance.mark("witch:prep-warm");
    while (!view.assets.homeReady) { if (epoch !== internals.shaderEpoch) return; view.assets.work(4); await nextFrame(); } // existing dispatch policy unchanged
    performance.mark("witch:prep-home");
    { const w = view.game.witch, R = view.game.tuning.haze.near + 20, r = { minX: w.x - R, maxX: w.x + R, minZ: w.z - R, maxZ: w.z + R }; // (round her, not the dive's view)
      while (epoch === internals.shaderEpoch && view.ground.fill(view.renderer, r, w.x, w.z, 3) > 0) await nextFrame(); }
    if (epoch !== internals.shaderEpoch) return;
    performance.mark("witch:prep-ground");
    const refresh = refreshSteps(view);
    await runSliced((function* (): Steps { while (epoch === view.shaderEpoch) { const step = refresh.next(); if (step.done) return; yield step.value; } })(), "refresh");
    performance.mark("witch:prep-house");
  }

export function swapHomeArt(view: View, internals: ViewInternals, _shared: ViewShared): void {
    const A = view.assets;
    const now = performance.now();
    const previousHouseShare = view.landingHouseShare;
    view.landingHouseShare = internals.landingFades.share('treehouse', A.home.treehouse, now);
    if (view.shaderLandingLimited && previousHouseShare === 0 && view.landingHouseShare > 0) performance.mark('landing:house-fading');
    if (view.shaderLandingLimited && previousHouseShare < 1 && view.landingHouseShare === 1) performance.mark('landing:house-faded');
    view.treehouseBatch.arrivalFade.value = view.landingHouseShare;
    view.propBatch.arrivalFade.value = internals.landingFades.share('props', A.home.props, now);
    internals.soundBatch.arrivalFade.value = internals.landingFades.share('soundsystems', A.home.soundsystems, now);
    if (!view.spin) { // (a twirl's in the clothes she had: render/spin.ts)
      if (view.witchBatch.atlas !== A.witch) view.witchBatch.setAtlas(A.witch);
      if (view.bareBatch && view.bareBatch.atlas !== A.witchBare()) view.bareBatch.setAtlas(A.witchBare());
      A.letGo([view.witchBatch.atlas, ...(view.bareBatch ? [view.bareBatch.atlas] : [])]);
    }
    if (view.treehouseBatch.atlas !== A.treehouse.atlas) view.treehouseBatch.setAtlas(A.treehouse.atlas);
    if (view.propBatch.atlas !== A.props) view.propBatch.setAtlas(A.props);
    if (internals.soundBatch.atlas !== A.soundsystems) { internals.soundBatch.setAtlas(A.soundsystems); internals.partyView.atlas = A.soundsystems; }
  }
