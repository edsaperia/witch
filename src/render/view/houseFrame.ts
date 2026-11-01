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

export function houseTilt(a4ViewHost: View, a4PrivateHost: ViewInternals, a4SharedHost: ViewShared, g: Game): number {
    const want = g.witch.perch && !a4ViewHost.telescope ? 0 : 1, dt = Number.isFinite(a4PrivateHost.tiltAt) ? Math.max(0, Math.min(0.1, g.herTime - a4PrivateHost.tiltAt)) : 1e9;
    a4PrivateHost.tiltAt = g.herTime;
    a4ViewHost.tiltK = stepTiltShare(a4ViewHost.tiltK, want, dt, a4SharedHost.HOUSE_TILT_EASE);
    return tiltShareShown(a4ViewHost.tiltK);
  }

export function behindHouse(a4ViewHost: View, a4PrivateHost: ViewInternals, _a4SharedHost: ViewShared, g: Game): void {
    // A late landing's house-only camera layer must still submit the critical ground to its readiness gate.
    a4ViewHost.ground.mesh.layers[a4ViewHost.shaderLandingLimited && a4ViewHost.shaderDrawStatus.active ? 'enable' : 'disable'](HOUSE_LAYER);
    const D = a4PrivateHost.dark, T = g.tuning.treehouse.house?.dark, deck = deckOf(g.map, g.tuning), w = g.witch;
    const inHouse = !!T?.on && !!deck?.house?.rooms && !!w.perch && w.mode === "ground" && !a4ViewHost.telescope; // (on foot: rising out of it, the forest comes back as she lifts off)
    const enclosed = inHouse && !g.islandReady;
    // (where it comes back from: the whole picture as the island's ready, or through the telescope; else where she left the house)
    if (enclosed !== D.enclosed) { D.reveal = !enclosed && inHouse; D.door = (a4ViewHost.telescope || D.reveal) && !enclosed ? null : { x: w.x, z: w.z }; D.enclosed = enclosed; }
    const dt = Number.isFinite(D.at) ? Math.max(0, Math.min(0.1, g.herTime - D.at)) : 1e9;
    D.at = g.herTime;
    const fade = Math.max(1e-3, (D.reveal && !enclosed ? T?.reveal : undefined) ?? T?.fade ?? 0.6);
    D.k = enclosed ? Math.max(0, D.k - dt / fade) : Math.min(1, D.k + dt / fade);
    if (!T?.on) D.k = 1;
    const P = a4ViewHost.post;
    P.behind = D.k < 1 ? D.k * D.k * (3 - 2 * D.k) : 1; // (eased in and out)
    if (D.k >= 1) return;
    // The house's own meshes on its layer as well as the scene's (they come and go: each frame).
    for (const o of [...(a4ViewHost.houseRooms?.meshes ?? []), ...(a4ViewHost.crown?.meshes ?? []), ...(a4PrivateHost.strings?.crownMeshes ?? []), ...a4ViewHost.treehouseBatch.meshes, ...a4ViewHost.witchBatch.meshes, ...(a4ViewHost.bareBatch?.meshes ?? [])]) o.traverse(c => c.layers.enable(HOUSE_LAYER));
    if (D.door) {
      const p = a4ViewHost.v3.set(D.door.x, a4ViewHost.witchFeetY, D.door.z).project(a4ViewHost.camera);
      P.behindAt = D.uv.set(p.x * 0.5 + 0.5, p.y * 0.5 + 0.5);
    } else P.behindAt = null;
  }

export function occluders(a4ViewHost: View, a4PrivateHost: ViewInternals, a4SharedHost: ViewShared): void {
    const T = a4ViewHost.game.map.treehouse, cp = a4ViewHost.camera.position, m = a4ViewHost.treehouseBatch.meshes[0];
    const on = !a4PrivateHost.hizOff && !!m && (cp.x - T.x) ** 2 + (cp.z - T.z) ** 2 < a4SharedHost.HIZ_NEAR * a4SharedHost.HIZ_NEAR;
    if (on && !a4PrivateHost.hiz) a4PrivateHost.hiz = new Hiz(a4ViewHost.renderer);
    if (m) m.layers.enable(HIZ_LAYER);
    a4PrivateHost.hiz?.render(a4ViewHost.renderer, a4ViewHost.scene, a4ViewHost.camera, a4ViewHost.width, a4ViewHost.height, on);
  }

export function ensureCrown(a4ViewHost: View, a4PrivateHost: ViewInternals, _a4SharedHost: ViewShared, game: Game): void {
    const t = game.tuning, H = t.treehouse.house, want = !!(H?.on && H.crown?.on && deckOf(game.map, t)?.house?.rooms);
    // (the crown whole over the Terrace or with its gap, the pause page's switch: Ed, 2026-10-26, grown again when it's flipped)
    const gap = H?.crown?.whole !== true, lights = H?.crown?.lights ?? 1, wrap = H?.crown?.wrap ?? 0;
    if (a4ViewHost.crown && want && (a4ViewHost.crown.crown.gap !== gap || a4ViewHost.crown.lights !== lights || (a4ViewHost.crown.crown.wrap ?? 0) !== wrap)) { a4ViewHost.scene.remove(...a4ViewHost.crown.meshes); a4PrivateHost.strings?.setCrown(null); a4ViewHost.crown.dispose(); a4ViewHost.crown = null; if (a4PrivateHost.crownFar) { a4ViewHost.scene.remove(...a4PrivateHost.crownFar.meshes); a4PrivateHost.crownFar.dispose(); a4PrivateHost.crownFar = null; } }
    if (want && !a4ViewHost.crown && H) {
      const outline = { rooms: OUTLINE_ROOMS, branches: OUTLINE_BRANCHES, stubs: OUTLINE_STUBS, takeoff: OUTLINE_TAKEOFF } as unknown as HouseOutline;
      // (the dancefloor and its speakers stay open to the sky as the Terrace does: it stands south-east of the house, under the crown's edge)
      const deck = deckOf(game.map, t)!, df = game.map.dancefloor, dp = toPlan({ x: deck.x, z: deck.z }, df.x, df.z);
      const open = [{ x: dp.x, z: dp.z, r: speakerRadius(t) + t.dancefloor.speakers.footprint + 4 }];
      a4ViewHost.crown = new CrownView(makeCrown({ outline, floor: H.height, seed: H.crown!.seed, open, gap, wrap }), t.stringLights.bulbSpacing, outline, lights);
      a4ViewHost.crown.drawMask = (key, box) => { const p = a4ViewHost.assets.oneOff({ kind: "crownMask", id: `${key}@${box.map(v => v.toFixed(4)).join(",")}`, style: a4ViewHost.assets.style, box: [...box] }).then(r => r.mask ?? Promise.reject(new Error("no mask"))); a4ViewHost.assets.track(`crownMask:${key}`, p); return p; };
      a4ViewHost.scene.add(...a4ViewHost.crown.meshes);
      a4PrivateHost.strings?.setCrown(a4ViewHost.crown); // (its string lights: render/strings.ts)
      a4PrivateHost.crownFar = new CrownLandmark(a4ViewHost.crown, t.stringLights.palette.map(h => new THREE.Color(h))); a4ViewHost.scene.add(...a4PrivateHost.crownFar.meshes);
    } else if (!want && a4ViewHost.crown) {
      a4ViewHost.scene.remove(...a4ViewHost.crown.meshes); a4PrivateHost.strings?.setCrown(null); a4ViewHost.crown.dispose(); a4ViewHost.crown = null;
      if (a4PrivateHost.crownFar) { a4ViewHost.scene.remove(...a4PrivateHost.crownFar.meshes); a4PrivateHost.crownFar.dispose(); a4PrivateHost.crownFar = null; }
    }
  }

export async function buildHome(a4ViewHost: View, a4PrivateHost: ViewInternals, _a4SharedHost: ViewShared, epoch: NonNullable<Parameters<View["buildHome"]>[0]>): Promise<void> {
    const steps = a4PrivateHost.warmSteps(), view = a4PrivateHost;
    await runSliced((function* (): Steps { while (epoch === view.shaderEpoch) { const step = steps.next(); if (step.done) return; yield step.value; } })(), "warm");
    if (epoch !== a4PrivateHost.shaderEpoch) return;
    performance.mark("witch:prep-warm");
    while (!a4ViewHost.assets.homeReady) { if (epoch !== a4PrivateHost.shaderEpoch) return; a4ViewHost.assets.work(4); await nextFrame(); } // existing dispatch policy unchanged
    performance.mark("witch:prep-home");
    { const w = a4ViewHost.game.witch, R = a4ViewHost.game.tuning.haze.near + 20, r = { minX: w.x - R, maxX: w.x + R, minZ: w.z - R, maxZ: w.z + R }; // (round her, not the dive's view)
      while (epoch === a4PrivateHost.shaderEpoch && a4ViewHost.ground.fill(a4ViewHost.renderer, r, w.x, w.z, 3) > 0) await nextFrame(); }
    if (epoch !== a4PrivateHost.shaderEpoch) return;
    performance.mark("witch:prep-ground");
    const refresh = refreshSteps(a4ViewHost);
    await runSliced((function* (): Steps { while (epoch === view.shaderEpoch) { const step = refresh.next(); if (step.done) return; yield step.value; } })(), "refresh");
    performance.mark("witch:prep-house");
  }

export function swapHomeArt(a4ViewHost: View, a4PrivateHost: ViewInternals, _a4SharedHost: ViewShared): void {
    const A = a4ViewHost.assets;
    const now = performance.now();
    const previousHouseShare = a4ViewHost.landingHouseShare;
    a4ViewHost.landingHouseShare = a4PrivateHost.landingFades.share('treehouse', A.home.treehouse, now);
    if (a4ViewHost.shaderLandingLimited && previousHouseShare === 0 && a4ViewHost.landingHouseShare > 0) performance.mark('landing:house-fading');
    if (a4ViewHost.shaderLandingLimited && previousHouseShare < 1 && a4ViewHost.landingHouseShare === 1) performance.mark('landing:house-faded');
    a4ViewHost.treehouseBatch.arrivalFade.value = a4ViewHost.landingHouseShare;
    a4ViewHost.propBatch.arrivalFade.value = a4PrivateHost.landingFades.share('props', A.home.props, now);
    a4PrivateHost.soundBatch.arrivalFade.value = a4PrivateHost.landingFades.share('soundsystems', A.home.soundsystems, now);
    if (!a4ViewHost.spin) { // (a twirl's in the clothes she had: render/spin.ts)
      if (a4ViewHost.witchBatch.atlas !== A.witch) a4ViewHost.witchBatch.setAtlas(A.witch);
      if (a4ViewHost.bareBatch && a4ViewHost.bareBatch.atlas !== A.witchBare()) a4ViewHost.bareBatch.setAtlas(A.witchBare());
      A.letGo([a4ViewHost.witchBatch.atlas, ...(a4ViewHost.bareBatch ? [a4ViewHost.bareBatch.atlas] : [])]);
    }
    if (a4ViewHost.treehouseBatch.atlas !== A.treehouse.atlas) a4ViewHost.treehouseBatch.setAtlas(A.treehouse.atlas);
    if (a4ViewHost.propBatch.atlas !== A.props) a4ViewHost.propBatch.setAtlas(A.props);
    if (a4PrivateHost.soundBatch.atlas !== A.soundsystems) { a4PrivateHost.soundBatch.setAtlas(A.soundsystems); a4PrivateHost.partyView.atlas = A.soundsystems; }
  }
