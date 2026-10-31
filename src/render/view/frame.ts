// A4 mechanical extraction from src/render/view.ts; body identity is checked by tools/refactor/a4-split.mjs.
import type { View, ViewInternals, ViewShared } from "../view";
import { CauldronView } from "../cauldronView";
import { FxMock } from "../fxMock";
import { beatTime } from "../../rules/beat";
import * as THREE from "three";
import { deckOf } from "../../rules/treehouse";
import { HOUSE_ROOMS, toPlan } from "../../rules/houseRooms";
import { sigilColour } from "../../../art/generator.js";
import { tiltShareShown } from "../overlayTilt";
import { blinkCharges, poseOf, witchTuning } from "../../rules/game";
import { coolRoom, coolShare } from "../../rules/cooldown";
import { shotCamera } from "../../rules/arrive";
import { AREA_TYPES, HOME_LOOK } from "../../rules/map";
import { canopyShown, witchHeight } from "../../rules/witch";
import { slowAmount, slowest } from "../slowtime";
import { groundHeight } from "../height";
import { LIGHT_UNIFORMS } from "../lighting";
import { partyOff, partyOverEase, updatePartyOver } from "../partyOver";
import { LOAD_DEFAULT, loadView } from "../load";
import { partyZones } from "../../rules/party";
import { hasRune } from "../../rules/creatureStates";
import { SHADOW_TINT } from "../shadows";
import { MAX_FIRES, TRUNK_SHADOW_UNIFORMS } from "../trunkShadows";
import { stepBudget } from "../../rules/budget";
import { keepUnderBudget } from "./gpuBudget";
import { leyDrawnTo, RING_AFTER, shaderPulse } from "../leylines";
import { routeSeen } from "../../rules/hatSpells";
import { bootLineAt, bootPath, bootPulseAt } from "../../rules/bootRing";
import { leyKey } from "../../rules/leylines";
import { SPRITE_UNIFORMS } from "../sprites";
import { inView } from "./culling";
import { checkPops, drawGhosts } from "./pops";
import { refresh } from "./scenery";
import { drawBerries, drawCreatures } from "./creatures";
import { drawHatArt } from "./hatArt";
import { drawFinds, findClear } from "./finds";
import { drawMarkers, drawSpeakers, placeTreehouse } from "./home";
import { miniTreehouse, ZooExitTag } from "../zooExit";
import { CastTag } from "../castTag";
import { lanternLights, relicLights, setLights, sigilLights, updateSources } from "./lights";
import { placeCamera } from "./camera";
import { setFrameUniforms } from "./frameUniforms";
import { setReveal } from "./reveal";
import { drawWitch, houseShiftOf } from "./witch";
import { drawPointers } from "./hud";
import { workAhead } from "./ahead";
import { winLit, winPulse, winPulseOut } from "../../rules/win";
import { relicsOut } from "../../rules/partyOver";

export function render(view: View, internals: ViewInternals, shared: ViewShared, time: number, draw: NonNullable<Parameters<View["render"]>[1]>): void {
    // Allocate only when a whole display-pixel step changes, including Try/Stop and expiry.
    if (internals.pixelViewport.w > 0 && internals.scenePixelSize() !== view.cssPixel) view.resize(internals.pixelViewport.w, internals.pixelViewport.h);
    // Late art may introduce programs after compileAll's background pass has ended.
    for (const p of internals.readyPrograms()) p.isReady();
    view.assets.playing = view.game.party.spellAt !== null; // (the night playing: the art ahead of need shares the workers, render/assets.ts dispatch)
    view.ms = {}; internals.lap = view.frameStart = performance.now();
    const g = view.game, t = g.tuning, P0 = poseOf(g), F = view.fly;
    if (view.magic.galleryCamera !== null) { g.witch.mode=view.magic.galleryCamera?"treetop":"ground"; g.witch.lift=view.magic.galleryCamera?1:0; }
    // (arriving from the sea chart: the flight's shot, app/arrive.ts)
    const pose = F ? { ...P0, tx: F.tx, ty: F.ty, tz: F.tz, angle: F.angle, distance: F.distance, ...shotCamera(F) } : P0;
    internals.prefetchWave();
    // Her clock (rules/slowTime.ts): she and everything of hers (her frames, blinks, trail, 💌s, sigils, the action bar) at full
    // speed, while the world (time) may run slow in a sleeping legend's circle; eased between steps as the world's is.
    const ht = Math.max(0, g.herTime - Math.max(0, g.clock.time - time) / Math.max(1e-3, g.timeScale));
    view.magic.begin(ht, g.witch.x, g.witch.z, g);
    view.magic.batches.mpp.value = view.mpp;
    view.magic.batches.canopy = g.witch.lift > 0.5;
    // The scenery budget follows the real frame rate (only frames that are drawn count).
    if (draw) {
      const now = performance.now();
      if (view.lastReal) view.budget = stepBudget(view.budget, (now - view.lastReal) / 1000, t);
      view.lastReal = now;
    }
    if (view.sceneryFixed !== null) view.budget.radius = Math.min(t.haze.far, Math.max(1, view.sceneryFixed));
    LIGHT_UNIFORMS.uScenery.value.set(view.budget.radius, Math.max(1, t.scenery.fade));
    SPRITE_UNIFORMS.uEdgeDither.value = t.scenery.edgeDither ? 1 : 0; SPRITE_UNIFORMS.uHoleHard.value = t.canopyCutout.hard ? t.canopyCutout.hardAt ?? shared.HOLE_HARD_AT : 0; // (the quality ladder's dithered far edge: render/sprites.ts)
    // In the air, the crowns' reach (render/view/scenery.ts), eased in and out over half a second or so (no far crowns popping as she lands).
    // Through the telescope (rules/telescope.ts), crowns out to the island's far side, and its own, further haze; back as it was after.
    const TL = view.telescope && t.telescope, haze = LIGHT_UNIFORMS.uHazeRange.value;
    if (TL) { internals.hazeBeforeTelescope ??= haze.clone(); haze.set(TL.hazeNear, TL.hazeFar); } else if (internals.hazeBeforeTelescope) { haze.copy(internals.hazeBeforeTelescope); internals.hazeBeforeTelescope = null; }
    const canopyTo = TL ? TL.reach : g.witch.mode !== "ground" ? Math.min(t.haze.far, t.scenery.canopyReach ?? 0) : 0;
    view.canopyNow += (canopyTo - view.canopyNow) * (Math.abs(canopyTo - view.canopyNow) < 1 ? 1 : 0.08);
    LIGHT_UNIFORMS.uCanopyReach.value = view.canopyNow;
    const up = placeCamera(view, time, pose);

    internals.swapHomeArt();
    setFrameUniforms(view, time, up);
    setReveal(view, time);
    const w = g.witch;
    view.time("uniforms");
    updateSources(view, time);
    view.time("sources");
    // The party: soundsystems rising in partifying areas, and their lights.
    // The party's over (render/partyOver.ts): its lights go out in a ripple from home.
    const over = updatePartyOver(g, partyOverEase(g, internals.overDebug), view.over), offAt = (x: number, z: number) => partyOff(over, x, z);
    view.leashView.partyOverEase = over.ease;
    view.fireworks.update(g.waveEvents, time, t, key => { const [cx, cy] = key.split(",").map(Number); return sigilColour(AREA_TYPES[g.map.typeOf(cx, cy)].creature) as number[]; }, at => !!g.win && g.win.lapAt !== undefined && at >= g.win.lapAt); // (the win's, from its victory lap on: the finale's palette; before the soundsystems: a celebrated one's lasers come on as its show starts)
    const party = internals.partyView.update(g, time, (x, z, ww, hh) => inView(view, x, z, ww, hh, 4), () => false, view.fireworks.celebrated, offAt);
    if (over.front > 0) { for (const l of party.lights) l.strength *= 1 - offAt(l.x, l.z); party.playing = party.playing.filter(p => offAt(p.x, p.z) < 0.98); party.projectors = party.projectors.filter(p => offAt(p.x, p.z) < 0.98); }
    internals.soundBatch.set(party.items);
    view.ground.setLegendRings(internals.legendRings(g, time), view.ringCount);
    view.ground.setLegendFloors(internals.floorItems, view.ringCount);
    // (the zoo's undiscovered islands, rules/zooMap.ts: the nearest four lakes' sigils, faint on the water)
    if (g.map.zoo?.layout) {
      const L = g.map.zoo.layout, w = g.witch, items = internals.lakeSigils;
      items.length = 0;
      for (const I of L.islands) if (!I.found && Math.abs(I.x - w.x) < 500 && Math.abs(I.z - w.z) < 500) items.push({ x: I.x, z: I.z, r: I.most * 0.62, species: I.kind, d: Math.hypot(I.x - w.x, I.z - w.z) });
      items.sort((a, b) => a.d - b.d);
      view.ground.setLakeSigils(items.slice(0, 4));
    }
    internals.lasers.update(time, w.x, w.z, view.speakerTops, g.map.dancefloor); // (the dancefloor ring's: the soundsystems project their sigils instead)
    internals.holograms.update(party.projectors, time, w.x, w.z);
    {
      // The ley lines: fading from the colour of the area each starts in to that of the area it ends
      // in (Ed, 2026-10-05), the colour partified areas and soundsystems use: its creature's sigil's.
      // (Nothing allocated a frame but on a change: the key's a number, the callbacks are the view's own.)
      view.leyParty = g.party; // (leyLines.advance is the rules' own now: rules/leylines.ts questsMove)
      view.ley.update(leyKey(view.leyParty), internals.leyChainNow, internals.leyColour, time, canopyShown(w));
      // The party's over (rules/partyOver.ts): the line fades to partyOver.leyFloor of itself, its pulse gone.
      const po = g.partyOver?.ease ?? 0, leyK = internals.leyBase * (1 - (1 - t.partyOver.leyFloor) * po);
      if (leyK !== view.leyScaled) { view.leyScaled = leyK; view.ley.scale(leyK); }
      // One line (Ed, 2026-10-29): the boot ring's link first, from the treehouse's front round the home ring (rules/bootRing.ts),
      // the route on from where its lap ends. Its pulse: the boot's along the ring while home boots up (its share of the boot path,
      // the stones turning as it passes), then the wave's along the current link, by the party's clock (as the HUD's pointer).
      const B = bootPath(g.map), bootPulse = g.party.spellAt !== null && time < g.party.bootUntil;
      view.ley.pulse(g.partyOver || bootPulse ? null : shaderPulse(g.party, g.map, time), g.partyOver || !bootPulse ? null : bootPulseAt(g.party, g.map, time) / B.length);
      view.ley.lap(winPulse(g)?.links ?? null, winPulseOut(g)?.links ?? null, winLit(g)); // (the victory lap: its sparklers racing home and on to the route's end from where the wave's pulse was, rules/win.ts)
      // None till the party spell; then reveal times as far along the line as the pulse (the boot's, then the wave's: leyReveal and
      // bootLineAt, the same measure), the tip round the ring first and on out along the route without a jump.
      view.ley.near(w.x, w.z);
      // (the Route-seer hat worn, rules/hatSpells.ts: the whole route, however far the reveal has grown)
      view.ley.grow(leyDrawnTo(g.party, g.map, time, t.leyLines.reveal ?? 3, routeSeen(g)), bootLineAt(g.party, g.map, time, t.leyLines.reveal ?? 3) / B.length); // (none before the party, the hat's too)
      { // The ring's link: full while home boots up, faint round the speakers after (RING_AFTER), nothing before the spell; it fades out too once the party's over.
        const live = g.party.spellAt !== null && (g.party.bootFrom === undefined || time < g.party.bootUntil);
        view.ley.ring((g.party.spellAt === null ? 0 : live ? 1 : RING_AFTER) * (1 - (g.partyOver?.ease ?? 0)), internals.leyRgb ?? undefined);
        view.ley.front(time, (beatTime(g.beat, time) * t.beat.bpm) / 60, 1 - (g.partyOver?.ease ?? 0)); // its front and pulse: a pixel spark, its small light (render/sparkler.ts)
        const tip=view.ley.pulseTip??view.ley.tip;
        if(tip)view.magic.native("ley",tip.x,0.4,tip.z,1,920001,[tip.colour.x,tip.colour.y,tip.colour.z]);
        view.leashView.ley = view.ley; // (the rainbow wave and the analyser behind the spark stand on the line as drawn: render/leash/rainbow.ts)
      }
    }
    // The sleeping legends' clearings: their twilight and motes, the nearest few (render/glades.ts).
    { const gdt = Math.min(0.1, Math.max(0, ht - view.gladeTime)); view.gladeTime = ht; // (eased on her clock, so the slowing doesn't slow its own look)
      // (none on the house, its rooms, Terrace and telescope: its own slowing greyed all the view there as outside a circle it isn't
      // in, washing the island out through the telescope; Ed, 2026-10-26: "I think it should not be grey": indoors the slowed time
      // shows only in how things move. A sleeping legend's circle outdoors keeps its grey.)
      internals.glades.update(g, w.x, w.z, gdt, w.mode === "ground", undefined, w.perch || view.telescope ? 0 : slowAmount(g.timeScale, slowest(t))); }
    internals.wisps?.update(g, w.x, w.z, ht); // (the wild areas' wisps round her, render/wisps.ts)
    view.time("party");
    // The canopy uplight over the nearest partified areas, fading in with each one's transition.
    {
      const U = SPRITE_UNIFORMS, P = t.party, list = partyZones(g.party, g.map).map(([, a]) => ({ a, s: g.map.siteOf(a.cell[0], a.cell[1]) })) // (a legend area lit with its pair)
        .sort((p, q) => Math.hypot(p.s.x - w.x, p.s.z - w.z) - Math.hypot(q.s.x - w.x, q.s.z - w.z)).slice(0, 16);
      list.forEach(({ a, s }, i) => {
        const fade = (a.wave === 0 ? 1 : Math.min(1, Math.max(0, (time - a.at) / Math.max(0.01, P.transition)))) * (1 - offAt(s.x, s.z));
        U.uParty.value[i].set(s.x, s.z, g.map.areaSize * 0.85, fade);
        const c = sigilColour(AREA_TYPES[g.map.typeOf(a.cell[0], a.cell[1])].creature);
        U.uPartyCol.value[i].set(c[0] / 255, c[1] / 255, c[2] / 255);
      });
      U.uPartyCount.value = list.length;
      U.uUplight.value.set(P.uplight.strength, P.uplight.pulse, P.uplight.edge, (beatTime(g.beat, time) * t.beat.bpm / 60) * Math.PI * 2);
    }
    internals.strings.update();
    internals.borders.update();
    // A point on the treehouse's sprite (its pixels) in the world, standing on its spot.
    view.houseShift = houseShiftOf(view); // (before the Ent and the house are placed: render/view/witch.ts)
    const T = view.assets.treehouse, thf = T.atlas.frames[0], at = placeTreehouse(view, pose.angle, time), U2 = SPRITE_UNIFORMS;
    const onTreehouse = (px: number, py: number) => {
      const r = U2.uRight.value, u = U2.uUp.value, dx = (px - thf.w / 2) * view.mpp, dy = (thf.h - py) * view.mpp;
      return { x: at.x + r.x * dx + u.x * dy, y: at.y + r.y * dx + u.y * dy, z: at.z + r.z * dx + u.z * dy };
    };
    const deck = T.ent ? deckOf(g.map, t) : null;
    if (view.mapTable) { // (its top's middle on the Ent's painted table, in the world's heights)
      const tp = deck && T.ent ? onTreehouse(T.ent.table.x, T.ent.table.y) : null;
      view.mapTable.update(tp && deck ? { x: tp.x, y: tp.y + groundHeight(deck.x, deck.z) + 0.02, z: tp.z } : null, deck ? Math.hypot(w.x - deck.x, w.z - deck.z) : Infinity, canopyShown(w) < 0.05, ht);
    }
    const thLights: ForestLight[] = deck?.house && T.ent // (the house: the clockwork moon over the map, the lantern posts by the decks: the art's own lights, art/ent.js)
      ? T.lights.filter(l => l.kind === "moon" || l.kind === "lantern").slice(0, 3).map(l => { const p = onTreehouse(l.x, l.y); return { x: p.x, y: p.y + groundHeight(deck.x, deck.z), z: p.z, reach: t.treehouse.lightReach, rgb: new THREE.Vector3(l.rgb[0] / 255, l.rgb[1] / 255, l.rgb[2] / 255), strength: t.treehouse.lightStrength * (l.kind === "moon" ? 0.8 : 0.92 + 0.08 * Math.sin(time * 3 + l.x)) }; })
      : deck // (the deck: one warm lantern over it, at the map table)
      ? [{ x: deck.x, y: groundHeight(deck.x, deck.z) + deck.h + 3, z: deck.z, reach: t.treehouse.lightReach, rgb: shared.DECK_LANTERN_RGB, strength: t.treehouse.lightStrength * (0.92 + 0.08 * Math.sin(time * 3)) }]
      : T.lights.filter(l => l.kind === "lantern" || l.kind === "window").slice(0, 2).map(l => ({
        ...onTreehouse(l.x, l.y), reach: t.treehouse.lightReach, rgb: new THREE.Vector3(l.rgb[0] / 255, l.rgb[1] / 255, l.rgb[2] / 255), strength: t.treehouse.lightStrength * (0.92 + 0.08 * Math.sin(time * 3 + l.x)),
      }));
    const markerLights = drawMarkers(view, time);
    const speakerLights = drawSpeakers(view, time, pose.angle);
    view.spellFx.update(g, ht, witchHeight(w, t) + 0.6 + view.rideOff);
    const speedForMagic=Math.hypot(w.vx,w.vz);
    if(speedForMagic>2){view.magic.native("flightTrail",w.x,witchHeight(w,t),w.z,Math.min(1,speedForMagic/20),920002);view.magic.native("broomSpark",w.x,witchHeight(w,t),w.z,0.5,920003);}
    const blink = g.witches[0].dash;
    if (blink.at !== internals.magicBlink && ht >= blink.at && Number.isFinite(blink.at)) {
      internals.magicBlink = blink.at;
      view.magic.emit("moonlight", "aura", blink.fromX, 1.5, blink.fromZ, 1, 0.7, 0.5, 910001);
      view.magic.emit("moonlight", "burst", blink.toX, 0.8, blink.toZ, 1, 0.7, 0.6, 910002);
    }
    {
      // her trail: behind her broom, as long as she's fast, in the colour of the area under her (its creature's neon, as the
      // ley lines and runestones; home's own lavender)
      const lift = canopyShown(w), A = g.map.areaAt(w.x, w.z), sp = Math.hypot(w.vx, w.vz), top = t.groundSpeed + (t.treetopSpeed - t.groundSpeed) * lift;
      const c = A.look === HOME_LOOK ? internals.trailRgb.set(0.8, 0.7, 1) : internals.trailRgb.copy(view.markerArt.colour.get(AREA_TYPES[A.type].creature) ?? internals.trailRgb.set(0.8, 0.7, 1));
      const dt = view.trailAt < 0 ? 0 : Math.min(0.1, Math.max(0, ht - view.trailAt)); view.trailAt = ht;
      const back = sp > 0.1 ? 0.6 / sp : 0, W0 = g.witches[0], D = W0.dash;
      // (and its length at least the shared cooldown's share: rules/cooldown.ts, Ed 2026-10-15; the ribbon along her blink's line)
      const tw = witchTuning(g, W0), cool = tw.cooldown?.shared ? coolShare(W0.cool, coolRoom(tw, blinkCharges(g, W0))) : 0; // (her broom's parts: rules/broomParts.ts)
      internals.trail.update(w.x - w.vx * back, witchHeight(w, t) + 0.25 + view.rideOff, w.z - w.vz * back, sp, top, lift, c, ht, dt, D.at, D, cool);
      // the load she carries (render/load.ts): read once a frame, for the stack, the threads, her lean and her broom
      loadView(g, t.load ?? LOAD_DEFAULT, dt, view.leashView.load);
      const Bp = view.leashView.bristle; Bp.x = w.x - w.vx * back; Bp.y = witchHeight(w, t) + 0.25 + view.rideOff; Bp.z = w.z - w.vz * back;
    }
    // Tufts part round her and the three nearest creatures.
    // (only those within reach made into objects: mapping every creature, a thousand late in a run, every frame was much of the frame's garbage)
    const near: { x: number; z: number; r: number; d: number }[] = [], GR = t.groundCover.radius;
    const cs = g.creatures; // (by index: render is too big for the engine to optimise, and for...of made an object a creature)
    for (let i = 0; i < cs.length; i++) {
      const c = cs[i], dx = c.x - w.x, dz = c.z - w.z;
      if (Math.abs(dx) >= GR || Math.abs(dz) >= GR) continue;
      const d = Math.sqrt(dx * dx + dz * dz);
      if (d < GR) near.push({ x: c.x, z: c.z, r: Math.max(0.8, (view.leashView.tops.get(c.id) ?? 1.6) * 0.75), d }); // parting by its drawn size (#47)
    }
    const parts = [{ x: w.x, z: w.z, r: 1.6 * (1 - canopyShown(w)) }, ...near.sort((a, b) => a.d - b.d).slice(0, 3)];
    // No tufts over a placed sigil's rune (Ed, v233): trampled out to groundCover.sigilClear, or the rune's own size.
    const clear = g.leash.placed.map(p => ({ x: p.x, z: p.z, r: Math.max(t.groundCover.sigilClear, (3 + g.creatures[p.id].level * 0.8) * 0.45) }));
    { const W0 = g.witches[0].hat, H = W0.down; if (H && W0.has) clear.push({ x: H.x + shared.HAT_BESIDE, z: H.z, r: t.groundCover.sigilClear }); for (const q of W0.left) clear.push({ x: q.x + shared.HAT_BESIDE, z: q.z, r: t.groundCover.sigilClear }); } // (her hats where they lie)
    for (let i = 0; i < cs.length; i++) { const c = cs[i]; if (Math.abs(c.x - w.x) < GR && Math.abs(c.z - w.z) < GR && hasRune(c)) clear.push({ x: c.x, z: c.z, r: t.groundCover.sigilClear }); } // (a happy one's rune at its feet)
    for (const r of relicsOut(g)) if ((r.state === "lying" || r.state === "dropped") && Math.abs(r.sx - w.x) < GR && Math.abs(r.sz - w.z) < GR) clear.push({ x: r.sx, z: r.sz, r: Math.max(t.groundCover.sigilClear, 3.4 * 0.45) }); // (and a relic's sigil, south of it)
    { const F = findClear(view); if (F) clear.unshift(F); } // (tonight's find's patch, first: render/view/finds.ts)
    view.time("markers");
    view.grass.update(w.x, w.z, 1 - canopyShown(w), parts, t.suspects.groundCover ? LIGHT_UNIFORMS.uGlowR.value * 1.05 : t.groundCover.radius, clear); // out to the canopy hole's edge
    const partyObjectLights = view.partyObjects.update(g, time, view.camera, (x, z, ww, hh) => inView(view, x, z, ww, hh, 4), view.worldFires, view.lastView);
    internals.updateSteam(g, time);
    internals.lakeShore.update(g, view.assets, w.x, w.z);
    internals.updateSmoke(g, time); // (time is the world's: what moves on its own slows with it, rules/slowTime.ts)
    const floorOff = offAt(g.map.dancefloor.x, g.map.dancefloor.z);
    if (over.front > 0) for (const L of [markerLights, speakerLights, partyObjectLights]) for (const l of L) l.strength *= 1 - offAt(l.x, l.z);
    // (the zoo: no treehouse, dancefloor or speakers, only the Ent's circle on its plaza; Ed, 2026-10-26)
    const noHome = !!g.map.zoo?.layout, discoLight = internals.dancefloor.update(time, view.ground, g, floorOff);
    if (noHome) { // (the treehouse's art only as the little one by the plaza, its way out: render/zooExit.ts)
      for (const m of [...(view.speakerBatch?.meshes ?? []), internals.dancefloor.ball, internals.dancefloor.beam, internals.dancefloor.motes]) m.visible = false;
      view.treehouseBatch.set(miniTreehouse(view, pose.angle)); thLights.length = 0; speakerLights.length = 0;
      (view.zooExitTag ??= new ZooExitTag()).update(view);
    }
    const zooF = view.island.zooFences; // (the zoo's railings: clear round her line of sight; the nearest lamps light the street, render/zooFences.ts)
    zooF?.update(w.x, witchHeight(w, t) + view.rideOff + 1, w.z);
    view.island.zooWords?.update(w.x, w.z);
    if (t.bare) setLights(view, [], w.x, w.z); else setLights(view, [...(noHome ? [] : [discoLight]), ...(zooF ? zooF.lights(w.x, w.z, time) : []), ...(zooF && g.map.zoo?.layout && Math.hypot(w.x - g.map.zoo.layout.home.x, w.z - g.map.zoo.layout.home.z) < 160 ? [{ x: g.map.zoo.layout.home.x, y: 7, z: g.map.zoo.layout.home.z, reach: 75, rgb: shared.PLAZA_RGB, strength: 1.0 }] : []), ...party.lights, ...view.fireworks.lights(time), ...thLights, ...markerLights, ...speakerLights, ...partyObjectLights, ...lanternLights(view, time), ...internals.lakeShore.lavaLights(g, time, w.x, w.z), ...sigilLights(view, time, witchHeight(w, t) + view.rideOff + t.sigilSpill.stackHeight), ...relicLights(view, time), ...view.forestLights], w.x, w.z);
    SHADOW_TINT.value = t.shadows.tint ?? 0; // (every shadow's colour: render/shadows.ts, trunkShadows.ts)
    { // the trunks' and palms' shadows (render/trunkShadows.ts): on foot (fading out as she rises), from her glow and the nearest lit fires
      const TS = t.shadows.trunks, lift = Math.min(1, Math.max(0, w.lift ?? 0)), on = !!TS && TS.mode !== "off" && lift < 1 && !t.bare, U = TRUNK_SHADOW_UNIFORMS;
      for (const b of view.trunkShadowBatches.values()) b.visible = on;
      internals.castOn = on && TS.mode !== "debug" && (t.shadows.cast ?? true);
      if (view.beachView.palmShadows) view.beachView.palmShadows.visible = on;
      if (on) {
        // (the lit campfires, and the soundsystems' and runestones' lights: those tagged with a shadow, Ed 2026-10-13)
        const base = t.lights.campfire.strength, fires = internals.shadowLights;
        fires.length = 0;
        for (const l of view.forestLights) if (l.rgb === view.fire) fires.push({ x: l.x, y: l.y, z: l.z, reach: l.reach, rgb: l.rgb, k: Math.min(1, l.strength / (base * 0.8)) });
        // (their shadows reach past their glow, to the trees round their clearings: shadows.trunks.lightReach)
        const LR = TS.lightReach ?? 0;
        if (LR > 0) for (const L of [party.lights, markerLights]) for (const l of L) if (l.shadow && l.shadow.k > 0) fires.push({ x: l.shadow.x, y: l.shadow.y, z: l.shadow.z, reach: Math.max(l.reach, LR), rgb: l.rgb, k: l.shadow.k * (1 - offAt(l.x, l.z)) });
        fires.sort((a, b) => Math.hypot(a.x - w.x, a.z - w.z) - Math.hypot(b.x - w.x, b.z - w.z)); if (fires.length > MAX_FIRES) fires.length = MAX_FIRES;
        fires.forEach((l, i) => { U.uFires.value[i].set(l.x, l.y + groundHeight(l.x, l.z), l.z, l.reach); U.uFireFade.value[i] = l.k; U.uFireRgb.value[i].copy(l.rgb); });
        U.uFireCount.value = fires.length; U.uTrunkHard.value = TS.mode === "debug" ? 2 : TS.mode === "hard" ? 1 : 0; U.uTrunkStrength.value = TS.strength * (1 - lift); U.uTrunkLong.value = TS.long;
        U.uGlowReach.value = TS.glowReach; U.uGlowLift.value = TS.glowHeight; U.uTrunkAcross.value = TS.across; U.uTrunkCore.value = TS.core; U.uTrunkFoot.value = TS.foot ?? 0; U.uTrunkTaper.value = TS.taper ?? 0; U.uTrunkNear.value = TS.near ?? 0; U.uTrunkCover.value = TS.cover ?? 0;
        U.uTintScenery.value = U.uTintTrees.value = SHADOW_TINT.value; U.uCasterLight.value = TS.glowLight ?? 0; U.uSceneryFoot.value = TS.sceneryFoot ?? 0; U.uSceneryTaper.value = TS.sceneryTaper ?? 0;
      }
    }
    view.time("grass+lights");
    LIGHT_UNIFORMS.uTime.value = time; LIGHT_UNIFORMS.uRealTime.value = ht; // (the circle's motes and edge keep her clock)
    view.mist?.follow(pose.tx, pose.tz);
    if (view.loadingMist && draw) { // (on the page's own clock, a frame counting at most a tenth of a second: not the house's slowed time)
      const now = performance.now(); internals.mistClock += internals.mistLast ? Math.min(0.1, (now - internals.mistLast) / 1000) : 0; internals.mistLast = now;
      view.loadingMist.update(internals.mistClock, ty => view.assets.hasType(ty));
    }
    view.lightRings?.update(view.camera, w.x, witchHeight(w, t) + view.rideOff, w.z, canopyShown(w), time);
    const hatTop = drawWitch(view, time, ht, onTreehouse);
    internals.mushroomView.update(view);
    view.ground.prepareCoast(view.renderer, view.camera, view.scene);
    view.houseRooms?.update(view, onTreehouse, ht);
    internals.potionObservers.update(view, onTreehouse);
    if (view.crown && (view.crown.lights !== (t.treehouse.house?.crown?.lights ?? 1) || (view.crown.crown.wrap ?? 0) !== (t.treehouse.house?.crown?.wrap ?? 0))) internals.ensureCrown(view.game); // (its lights' density or their wrapping moved on the pause page: grown again)
    if (view.crown && deck) { // (the crown: in the world, or laid over the floors with her indoors: render/crown.ts)
      const W = internals.crownWorld, a = ((HOUSE_ROOMS.turn ?? 0) * Math.PI) / 180, c = Math.cos(a), s = Math.sin(a);
      W.o.set(deck.x, groundHeight(deck.x, deck.z) + deck.h, deck.z); W.ex.set(c, 0, -s); W.ez.set(s, 0, c);
      const plan = view.houseRooms?.plan ?? null, here = plan ? toPlan({ x: deck.x, z: deck.z }, w.x, w.z) : null;
      const dt = Number.isFinite(internals.crownAt) ? Math.min(0.1, Math.max(0, ht - internals.crownAt)) : 0; internals.crownAt = ht;
      // (indoors, the forest's hole round her as it would be outdoors, its middle where she's drawn: render/view/witch.ts set uWitch
      // this frame, her house's slide in it; Ed, 2026-10-26: "The witch should have a canopy circle cut around her in the treehouse")
      const cut = t.canopyCutout, hw = SPRITE_UNIFORMS.uWitch.value, CR = t.treehouse.house?.crown;
      const hole = { x: hw.x, y: hw.y, r: 0.5 * cut.screenFraction * (t.suspects.holeCut ? 1 : 0) * view.width, edge: cut.edge * view.width };
      view.crown.uniforms.uWarmK.value = CR?.warm ?? 0; // (the house's warm light up into it, live from the pause page)
      view.crown.update(view.camera, W, plan, here, dt, hole, CR?.cutFade ?? 0, { x: w.x, y: groundHeight(w.x, w.z) + witchHeight(w, t), z: w.z }); // (her: the oak hidden when she's behind it)
      if (internals.crownFar) { // (and over the horizon from far off: its picture baked the first frame there is one)
        if (!view.shaderDrawStatus.active) internals.crownFar.bake(view.renderer);
        const at = g.party.spellAt;
        internals.crownFar.update(view.camera, W.o, W.ex, W.ez, at === null ? 1e9 : at === undefined ? -1e9 : at, view.crown.indoors);
      }
      // (wholly behind the bend from far off, the real crown and its lights aren't drawn: the landmark stands in for them)
      // (set as it changes only, so tools/bench/crown-cost.cjs can hide its parts)
      const drawn = !internals.crownFar?.realHidden;
      if (drawn !== internals.crownDrawn) { internals.crownDrawn = drawn; for (const m of [...view.crown.meshes, ...(internals.strings?.crownMeshes ?? [])]) m.visible = drawn; }
    }
    view.time("witch");
    refresh(view);
    view.time("refresh");
    internals.easeAppearing();
    drawCreatures(view, time);
    drawBerries(view, time);
    drawHatArt(view); // (the Harvest hat's sprouts, the Cyclone's whirlwind: render/view/hatArt.ts)
    drawFinds(view); // (tonight's travel trunk: render/view/finds.ts)
    checkPops(view, "moving");
    view.time("creatures");
    view.rulers.update(view.camera, view.canvas.clientWidth || window.innerWidth, view.canvas.clientHeight || window.innerHeight, w.x, w.z);
    // (no cue toward the dancefloor any more: Ed, 2026-10-06, "You can remove the UI icon that points towards the dancefloor")
    view.minimap.update(g.party, w.x, w.z);
    drawPointers(view, time);
    view.time("hud");
    view.leashView.update(ht, view.camera, view.canvas.clientWidth || window.innerWidth, view.canvas.clientHeight || window.innerHeight, hatTop, view.witchBodyY, view.witchFeetY, view.witchFrameH);
    (view.castTag ??= new CastTag()).update(view); // (the spell's key prompt by its 🎶, drawn just now: render/castTag.ts)
    view.time("leash");
    view.magic.finish(t.lightBudget);
    view.stats.lights = LIGHT_UNIFORMS.uLightCount.value;
    if (shared.FX_MOCK_MODE) (view.fxMock ??= new FxMock(view, shared.FX_MOCK_MODE)).update(view, ht);
    workAhead(view);
    if (view.debugCull) drawGhosts(view, time);
    if (!draw) return;
    view.renderer.info.reset();
    view.post.lift = view.game.witch.lift;
    view.post.tilt = tiltShareShown(view.tiltK); // (as houseTilt gives the overlays)
    if (t.bare) internals.hideForBare();
    internals.behindHouse(view.game);
    // (the cast-shadow map is the forest's: none while only the house is drawn)
    if (view.post.behind > 0) internals.castMap.render(view.renderer, view.scene, view.game.witch.x, view.game.witch.z, internals.castOn);
    internals.occluders();
    view.magic.hideBackdrop(view.scene);
    if (view.game.cauldron || internals.cauldronLook) (internals.cauldronLook ??= new CauldronView()).update(view);
    view.post.render(view.scene, view.camera);
    internals.cauldronLook?.finish(view);
    view.magic.restoreBackdrop(view.scene);
    view.occlusion.veil(); // (the smoke over the 💌s, once the frame's smoke is drawn)
    view.time("draw");
    view.drawEst += (Math.min(8, view.ms.draw) - view.drawEst) * 0.1; // (eased; a stalled frame counts for at most 8 ms)
    // Anything set but not drawn (three.js capping a batch's instances) is a bug: count and log it.
    shared.DROPPED = view.propBatch.dropped + internals.soundBatch.dropped + (view.speakerBatch?.dropped ?? 0);
    view.typeBatches.forEach(shared.addDropped); view.creatureBatches.forEach(shared.addDropped); // (no list of every batch a frame)
    const dropped = shared.DROPPED;
    if (dropped && !view.stats.dropped) console.warn(`view: ${dropped} sprite instances set but not drawn`);
    view.stats.dropped = dropped;
    view.stats.drawCalls = view.renderer.info.render.calls;
    view.stats.batches = view.typeBatches.size + view.creatureBatches.size;
    keepUnderBudget(view, performance.now());
    view.stats.sceneryRadius = view.budget.radius; view.stats.fps = view.budget.fps;
    view.stats.scenery = view.stats.trees + view.stats.bushes;
    view.stats.gameplay = view.stats.creatures + view.propBatch.count + internals.soundBatch.count + (internals.partyView.gen?.count ?? 0);
  }
