// Her, each frame (moved out of view.ts's render, unchanged): her pose (hover, lean, rise and descend, brake and fast, her
// headings, on foot, the treehouse's seat, a knockout, mid-blink), her hat knocked off, her sprite stood by its frame's ground,
// the party's and the beach's views of her, where she is on screen, and her shadow.
import type { View } from "../view";
import { PARTY_CAST } from "../../rules/party";
import { STEP } from "../../rules/game";
import { stunned } from "../../rules/knock";
import { canopyShown, witchHeight } from "../../rules/witch";
import { bendPoint, groundHeight, placed } from "../height";
import { LIGHT_UNIFORMS } from "../lighting";
import { LOAD_DEFAULT } from "../load";
import { setOverlayTilt } from "../overlayTilt";
import { SPRITE_UNIFORMS } from "../sprites";
import { inView } from "./culling";
import { DJ_DEPTH, nearerCamera } from "./home";
import { beatAt } from "../../rules/beat";
import { djRoutineAt } from "../../rules/djSet";
import { respawnLeft } from "../../rules/knockout";
import { HAT_BESIDE } from "../view";
import { hatFlight } from "../hatFlight";
import { atDecksFrom, koIris } from "../koIris";

/** The player asked for less motion (the knockout's iris then a plain cut: render/koIris.ts). */
const REDUCED = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Draws her for this frame; returns her hat's top (m over the ground), for the sigil stack over it. onTreehouse: a point on
 *  the treehouse's sprite (its pixels) in the world. */
export function drawWitch(v: View, time: number, ht: number, onTreehouse: (px: number, py: number) => { x: number; y: number; z: number }): number {
  const g = v.game, t = g.tuning, w = g.witch, h = witchHeight(w, t), T = v.assets.treehouse;
  const KO = g.witches[0].ko;
  const irisOn = !!KO && g.witches[0].hat.has && !!g.witches[0].hat.down && !REDUCED; // (the cut from her fallen hat to her decks, render/koIris.ts)
  const bob = Math.sin(ht * 2.4) * 0.12;
  // Her hover frames, turned away when flying up the screen, leaning when fast.
  // Climbing to the treetops or dropping to the ground: the rise or descend pose, fluttering
  // between its two frames, until the move is about 90% done.
  const climbing = w.mode === "rising" && w.lift < 0.9, dropping = w.mode === "descending" && w.lift > 0.1;
  // Leaning, her four-frame lean cycle (#37) plays faster the faster she goes: 8 fps at her ordinary ground speed.
  const ldt = Math.min(0.1, Math.max(0, ht - v.leanTime));
  v.leanTime = ht;
  v.leanPhase += ldt * 8 * Math.hypot(w.vx, w.vz) / Math.max(1, t.groundSpeed);
  const leanK = Math.floor(v.leanPhase) % 4, LC = v.assets.witchLean[w.away ? "away" : "towards"];
  let wf = climbing || dropping ? (climbing ? 8 : 12) + (w.away ? 2 : 0) + (Math.floor(ht * 7) % 2)
    : w.lean ? LC[leanK] ?? 6 + (w.away ? 1 : 0) : (w.away ? 3 : 0) + (Math.floor(ht * 4) % 3);
  // Treetop momentum: skidding to brake on a sharp turn, and the fast pose at boost.
  if (!climbing && !dropping) {
    const Fl = v.assets.witchFly, sideF = w.away ? "away" : "towards";
    if (w.braking) wf = Fl.brake[sideF][Math.floor(ht * Fl.brake.fps) % Fl.brake[sideF].length];
    else if ((w.boost ?? 0) > 0.7) wf = Fl.fast[sideF][Math.floor(ht * Fl.fast.fps) % Fl.fast[sideF].length];
    // Straight up or down the screen (#27): her heading frames, from behind or coming at us.
    const Hd = w.heading && w.heading !== "side" ? v.assets.witchHeading[w.heading] : null;
    if (Hd) wf = w.braking ? Hd.brake[Math.floor(ht * Fl.brake.fps) % Hd.brake.length] : (w.boost ?? 0) > 0.7 ? Hd.fast[Math.floor(ht * Fl.fast.fps) % Hd.fast.length] : w.lean ? Hd.leanCycle[leanK] ?? Hd.lean : Hd.hover[Math.floor(ht * 4) % Hd.hover.length];
  }
  // Handling a sigil, she lands first (Ed, 2026-10-03): down to the ground, then the placeSigil or
  // liftSigil pose, and back up into the air when she's done. Talking (by herself, Ed v244), she
  // chats on the fly while moving and settles into the talk pose when she comes to rest.
  const L = g.leash, F = v.assets.witchFoot, side = w.away ? "away" : "towards";
  for (const e of L.events) if (e.kind === "placed" || e.kind === "fizzled") v.footAct = { pose: "placeSigil", at: ht }; else if (e.kind === "picked" || e.kind === "hatPicked") v.footAct = { pose: "liftSigil", at: ht };
  const actLen = v.footAct ? F[v.footAct.pose].towards.length / F[v.footAct.pose].fps : 0;
  const acting = !!v.footAct && ht - v.footAct.at < actLen + 0.3;
  const still = Math.hypot(w.vx, w.vz) < 0.6;
  const wantFoot = w.mode === "ground" && ((!!L.talk && still) || acting || !!w.stargazing) ? 1 : 0;
  const fdt = Math.min(0.1, Math.max(0, ht - v.footTime)), prevFoot = v.foot;
  v.footTime = ht;
  v.foot += (wantFoot - v.foot) * Math.min(1, fdt * 8);
  if (Math.abs(wantFoot - v.foot) < 0.01) v.foot = wantFoot;
  const pick = (pose: string, k: number) => { const fr = F[pose][side]; return fr[Math.max(0, Math.min(fr.length - 1, k))]; };
  if (v.foot > 0.6) {
    if (acting && v.footAct) wf = pick(v.footAct.pose, Math.floor((ht - v.footAct.at) * F[v.footAct.pose].fps));
    else if (L.talk) wf = pick("talk", Math.floor(ht * F.talk.fps) % F.talk[side].length);
    else wf = pick("stand", Math.floor(ht * F.stand.fps) % F.stand[side].length);
  } else if (v.foot > 0.02) wf = v.foot >= prevFoot ? pick("land", Math.floor(v.foot * 3)) : pick("takeoff", Math.floor((1 - v.foot) * 3));
  const footEase = v.foot * v.foot * (3 - 2 * v.foot), wy = (h + bob - 0.4) * (1 - footEase);
  // At the start she sits on the treehouse terrace (the sit pose, swinging her legs), and eases
  // off it into the air when she first moves.
  const sdt = Math.min(0.1, Math.max(0, ht - v.seatTime));
  v.seatTime = ht;
  v.seatK = w.seated ? 1 : Math.max(0, v.seatK - sdt / 1.0); // down from the studio (some 7 m up) over a second
  let wx = w.x, wz = w.z, wyy = wy, djUpper = -1;
  // Staggered by a blow (rules/knock.ts): a wobble side to side, fading as it wears off.
  { const K = g.witches[0].knock; if (stunned(K, ht)) { const left = (K!.stunUntil - ht) / Math.max(0.1, K!.stunUntil - K!.at); wx += Math.sin(ht * 34) * 0.18 * Math.min(1, left * 2); } }
  if (v.seatK > 0) {
    const seat = onTreehouse(T.seat.x, T.seat.y), k = v.seatK * v.seatK * (3 - 2 * v.seatK);
    v.leashView.seatAt = seat; // (where she sparkles back in after a knockout)
    const cam = onTreehouse(T.camera.x, T.camera.y);
    g.introFocus = { x: cam.x, y: cam.y, z: cam.z }; // the opening shot frames the studio (the art's camera anchor)
    // (a touch nearer the camera than the house, along the ray to it, so she lands on the seat's own pixel: render/view/home.ts)
    const near = nearerCamera(v, seat, DJ_DEPTH.her);
    wx += (near.x - wx) * k; wyy += (near.y - wyy) * k; wz += (near.z - wz) * k;
    if (w.seated) {
      // Behind the decks (Ed, 2026-10-06: "The witch should have a 'DJing' animation for when she's standing behind the decks"):
      // facing us, DJing on the beat clock (a gesture a bar: art/witch.js djFrame), her upper half drawn again over the DJ
      // table so her hands are on the decks; casting the party spell, both hands up in a burst of sparkles; in a game
      // without the spell, sitting.
      const sp = g.party.spellAt, casting = typeof sp === "number" && time >= sp && time < sp + PARTY_CAST, Dj = v.assets.witchDj;
      if (sp === undefined || !Dj.full.length) wf = F.sit.towards[Math.floor(time * F.sit.fps) % F.sit.towards.length];
      else {
        // Her set's routine (rules/djSet.ts: the needle drop after the cast, the scratching after a respawn) over her ordinary set.
        const R = djRoutineAt(g, time);
        // (from the iris's cut, render/koIris.ts, to her respawn routine at ko.inAt: her hand on the record, mid-scratch, as it opens on her)
        const j = R ? v.assets.djGestureFrame(R.gesture, R.frame) : KO && irisOn && ht >= atDecksFrom(KO, true) && ht < KO.inAt ? v.assets.djGestureFrame("scratch", 0) : v.assets.djFrame(beatAt(g.beat, time), casting, respawnLeft(g.witches[0].ko, ht) !== null); // (its fallback: scratching through a knockout's wait, rules/knockout.ts)
        wf = Dj.full[j]; djUpper = Dj.upper[j];
      }
      if (typeof sp === "number" && sp !== v.castSeen) { v.castSeen = sp; v.spellFx.partyBurst(wx, wyy, wz, sp); }
    }
  }
  // Knocked out (Ed, 2026-10-04): she sits slumped on the ground while her stack lets go, then
  // vanishes in a sparkle and comes back in one at the treehouse.
  // Mid-blink she's nowhere (from the step it starts, so she never slides between its two points).
  const D = g.witches[0].dash;
  let hidden = ht >= D.at - STEP && ht < D.until;
  if (KO) {
    if (ht < KO.teleportAt) { wf = F.sit.towards[Math.floor(ht * F.sit.fps) % F.sit.towards.length]; wyy = 0; djUpper = -1; }
    else hidden = ht < atDecksFrom(KO, irisOn); // (with the iris, at her decks from its cut: render/koIris.ts)
  }
  // Over the ride's smoothed height (eased in off the treehouse seat), in the air only: on foot she stands on the ground itself,
  // over her shadow (the ride, smoothed along her flight, sits above a slope she drifts down; Ed, 2026-10-06: "check shadows in general").
  wyy += v.rideOff * (1 - v.seatK * v.seatK * (3 - 2 * v.seatK)) * (1 - footEase);
  // Her hat knocked off (rules/hat.ts): her frames without it, and the hat where it lies. Baked a moment after the game is up
  // (not at a knockout, mid-fight), if she has a hat to lose.
  const Hat = g.witches[0].hat;
  if (!v.bareAsked && Hat.has && !g.clock.paused && ht > 1) { v.bareAsked = true; setTimeout(() => { v.bareBatch ??= v.makeWitchBatch(true); }, 0); }
  const bare = Hat.has && !!Hat.down ? (v.bareBatch ??= v.makeWitchBatch(true)) : null;
  const watlas = bare ? v.assets.witchBare() : v.assets.witch, wframe = watlas.frames[wf], hatTop = wyy + wframe.h * v.mpp;
  // Stood by her frame's ground (art/witch.js liftShadow): the point under her on the model's ground lands on wyy, so on
  // foot her feet are on the ground, not on the bottom of a box that held a shadow drawn into her (Ed, 2026-10-06); and
  // her shadow lies at that point, under her feet whatever the pose.
  const wg = watlas.grounds?.[wf], wflip = w.seated ? false : w.facing < 0, U = SPRITE_UNIFORMS.uUp.value, R = SPRITE_UNIFORMS.uRight.value;
  const wsink = wg ? (wframe.h - wg.y) * v.mpp : 0, wside = wg ? (wg.x - wframe.w / 2) * v.mpp * (wflip ? -1 : 1) : 0;
  v.partyWitchView.update(g, time, (x, z, ww, hh) => inView(v, x, z, ww, hh, 4));
  v.swoopTrails.update(g.partyWitches.list, time);
  setOverlayTilt(t.tiltShift, w.lift, v.canvas.clientHeight || window.innerHeight, v.height); // (the DOM overlays blurred as the world: render/overlayTilt.ts)
  v.partyWitchView.bubbles(g, time, v.camera, v.canvas.clientWidth || window.innerWidth, v.canvas.clientHeight || window.innerHeight);
  const onBeach = v.beachView.update(g, time, (x, z, ww, hh) => inView(v, x, z, ww, hh, 4), v.camera, v.canvas.clientWidth || window.innerWidth, v.canvas.clientHeight || window.innerHeight);
  v.stateMarks.update(g, time, v.leashView.tops, 70, v.camera.position);
  v.inviteView.update(ht, v.camera, v.canvas.clientWidth || window.innerWidth, v.canvas.clientHeight || window.innerHeight, v.leashView.tops);
  // Idling into the party, she's drawn in her party pose there instead.
  // Behind the decks her frame stands with its ground anchor on the seat (not its box's middle), so her hands land on the decks;
  // her upper layer goes over the DJ table, nearer the camera along the same ray.
  const wcen = djUpper >= 0 && wg ? (wg.x - wframe.w / 2) * v.mpp : 0;
  const her = v.partyWitchView.herIdle || onBeach || hidden ? [] : [{ x: wx - U.x * wsink - R.x * wcen, y: wyy + groundHeight(wx, wz) - U.y * wsink - R.y * wcen, z: wz - U.z * wsink - R.z * wcen, frame: wframe, flip: wflip }];
  if (djUpper >= 0 && her.length) { const b = her[0], up = nearerCamera(v, b, DJ_DEPTH.upper - DJ_DEPTH.her); her.push({ ...up, frame: watlas.frames[djUpper], flip: false }); }
  const hatFrame = bare ? v.assets.witchBare().frames[v.assets.witchHatFrame] : undefined;
  { // Under a load (render/load.ts), in flight: she leans forward flying away from the pull, her broom tilts nose-up and bows.
    const LV = v.leashView.load, LT = t.load ?? LOAD_DEFAULT, flying = !w.seated && !KO && v.foot < 0.05 && !v.partyWitchView.herIdle;
    const fwd = w.facing < 0 ? -1 : 1, k = flying ? LV.load : 0;
    v.witchBatch.leanU.value.set(fwd * LT.witchLean * k * LV.away, fwd * LT.broomTilt * k, LT.broomBow * k, 0);
    v.leashView.bristle.on = flying && !hidden;
  }
  v.witchBatch.set(bare ? [] : her);
  v.witchBatch.silhouette = djUpper < 0; if (v.bareBatch) v.bareBatch.silhouette = djUpper < 0;
  // Knocked off, her hat floats down (Ed, 2026-10-07: "the hat slowly floats to the floor over about 4 seconds"): from her head
  // to where it lies over the knockout's float (ko.at to ko.floatUntil, knockout.hatFloat: rules/knockout.ts), drifting over as it goes, swaying side to
  // side less as it settles and rocking with each swing (the sprite turned as it swings back), its shadow gathering under it.
  const fk = bare && hatFrame && KO && KO.floatUntil > KO.at ? Math.max(0, Math.min(1, (ht - KO.at) / (KO.floatUntil - KO.at))) : 1;
  const hat = bare && hatFrame ? hatFlight(Hat.down!.x, Hat.down!.z, fk, Math.max(0, hatTop - hatFrame.h * v.mpp * 0.6), HAT_BESIDE) : null;
  v.bareBatch?.set(bare ? (hat ? [...her, { x: hat.x, y: hat.y + groundHeight(hat.x, hat.z), z: hat.z, frame: hatFrame!, flip: hat.flip }] : her) : []);
  // The party's and the beach's witches' shadows, and a small one under her hat (gathering as it comes down).
  v.witchShadows = [...v.partyWitchView.shadows, ...v.beachView.shadows];
  if (hat) { const s = 0.35 + 0.65 * fk * fk; v.witchShadows.push({ x: hat.x, z: hat.z, w: hatFrame!.w * v.mpp * 0.9 * s, d: hatFrame!.w * v.mpp * 0.35 * s }); }
  // The rest of the screen dims while she's down with her hat floating off (render/post.ts uKoDim): in over half a second from
  // the knockdown, held till she sparkles away, out as she goes. No hat to lose, no dim.
  const KD = t.knockout.dim ?? 0;
  // Then the iris (render/koIris.ts): it closes onto the hat, which turns into a spinning record; the cut, a rewind smear; it
  // opens on her at her decks. The dim holds till the cut, the iris's dark outside over it.
  const IR = irisOn && hat ? koIris(KO, ht, true, false, brimOf(v, hat.x, hat.y + groundHeight(hat.x, hat.z), hat.z, hatFrame!.w * v.mpp * 0.5)) : null;
  v.post.koDim = KO && hat && KD > 0 ? KD * Math.min(1, Math.max(0, (ht - KO.at) / 0.5)) * (IR ? (IR.on === "hat" ? 1 : 0) : 1 - Math.min(1, Math.max(0, (ht - KO.teleportAt) / 0.6))) : 0;
  if (IR) {
    // on the hat, then from where it was on screen over to her at the decks as it opens (no jump at the cut)
    let ctr = IR.on === "hat" ? onScreen(v, hat!.x, hat!.y + groundHeight(hat!.x, hat!.z) + hatFrame!.h * v.mpp * 0.3, hat!.z) : T.platter ? (({ x, y, z }) => onScreen(v, x, y, z))(onTreehouse(T.platter.x, T.platter.y)) : onScreen(v, wx, wyy + groundHeight(wx, wz) + (hatTop - wyy) * 0.4, wz); // (on the record under her hand: the treehouse's platter anchor)
    if (IR.on === "hat") v.irisHat = ctr; else if (v.irisHat) ctr = [v.irisHat[0] + (ctr[0] - v.irisHat[0]) * IR.move, v.irisHat[1] + (ctr[1] - v.irisHat[1]) * IR.move];
    v.post.iris.set(ctr[0], ctr[1], IR.r, IR.dark); v.post.iris2.set(IR.spin, IR.label, IR.smear, IR.labelR);
  } else { v.post.iris.set(0, 0, 0, 0); v.post.iris2.set(0, 0, 0, 0); }
  // The glide by her own snap: what the sprite shader's snap of her base takes off, given back by
  // the canvas's shift (main.ts) with the camera's own snap, so she lands where the unsnapped camera
  // would put her, to a screen pixel, every frame (the world then lands within half an art pixel).
  v.witchBase.x = wx; v.witchBase.y = wyy + groundHeight(wx, wz); v.witchBase.z = wz;
  if (!hidden && !v.partyWitchView.herIdle && !onBeach) {
    const b = bendPoint(v.v3.set(wx, wyy + groundHeight(wx, wz), wz)).project(v.camera);
    const X = (b.x * 0.5 + 0.5) * v.width, Y = (b.y * 0.5 + 0.5) * v.height;
    // (Her place under the camera before its snap: what her own snap takes off, and what the camera's did.)
    v.subpixel.x += X - (Math.floor(X) + 0.5); v.subpixel.y += -(Y - (Math.floor(Y) + 0.5));
  }
  // Where she is on screen (low-res pixels) and how far from the camera, for the occluder fade.
  {
    const px = (x: number, y: number, z: number) => { const p = placed(v.v3.set(x, y, z)).project(v.camera); return [(p.x + 1) / 2 * v.width, (p.y + 1) / 2 * v.height]; };
    const base = px(wx, wyy, wz), top = px(wx, hatTop, wz), side = px(wx + wframe.w * v.mpp / 2, wyy, wz);
    SPRITE_UNIFORMS.uWitch.value.set((base[0] + top[0]) / 2, (base[1] + top[1]) / 2, Math.abs(side[0] - base[0]) + 1, Math.abs(top[1] - base[1]) / 2 + 1);
    SPRITE_UNIFORMS.uWitchDepth.value = -placed(v.v3.set(wx, v.seatK > 0 ? wyy : h + v.rideOff, wz)).applyMatrix4(v.camera.matrixWorldInverse).z;
    // Her pool on screen, for the grade to spare (render/post.ts: on a dark floor her light sits among the tones the
    // spooky grade drains to blue, and it vanished: the art director's round 3, the fern forest): its centre under her
    // feet and its half-widths across and up the screen, out to half her light's reach.
    const R = LIGHT_UNIFORMS.uGlowR.value * LIGHT_UNIFORMS.uGlowNear.value * 0.5, foot = px(wx, 0, wz), across = px(wx + R, 0, wz), down = px(wx, 0, wz + R);
    v.post.pool.set(foot[0] / v.width, foot[1] / v.height, Math.max(1e-3, Math.abs(across[0] - foot[0]) / v.width), Math.max(1e-3, Math.abs(down[1] - foot[1]) / v.height));
  }
  v.clouds.update(time, v.camera, SPRITE_UNIFORMS.uWitch.value, v.width, v.height);
  // Her shadow under her feet (her frame's ground), as wide as the pose (lying down, all of her); none while she's up on the
  // terrace, nowhere (mid-blink, sparkled away), or drawn by the party's or the beach's view (they lay her shadow there).
  const ref = watlas.grounds?.[0], wide = wg && ref && ref.w > 0 ? Math.max(0.6, Math.min(3, wg.w / ref.w)) : 1;
  v.shadow.position.set(wx + R.x * wside, 0.08, wz + R.z * wside);
  const shown = hidden || v.partyWitchView.herIdle || onBeach ? 0 : (1 - 0.5 * canopyShown(w)) * (1 - v.seatK);
  v.shadow.scale.set(shown * wide + 1e-3, 1, shown + 1e-3);

  return hatTop;
}

/** A point's place on screen, 0 to 1 across and up (the post composite's uv). */
function onScreen(v: View, x: number, y: number, z: number): [number, number] {
  const p = placed(v.v3.set(x, y, z)).project(v.camera);
  return [(p.x + 1) / 2, (p.y + 1) / 2];
}
/** A hat's brim's radius on screen (half its width), as a share of the screen's height. */
function brimOf(v: View, x: number, y: number, z: number, half: number): number {
  const a = onScreen(v, x, y, z), b = onScreen(v, x + SPRITE_UNIFORMS.uRight.value.x * half, y, z + SPRITE_UNIFORMS.uRight.value.z * half);
  return Math.hypot((b[0] - a[0]) * v.width / v.height, b[1] - a[1]);
}
