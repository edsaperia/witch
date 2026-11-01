// A4 mechanical extraction from src/render/view.ts; body identity is checked by tools/refactor/a4-split.mjs.
import type { View, ViewInternals, ViewShared, ForestLight } from "../view";
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

export function render(a4ViewHost: View, a4PrivateHost: ViewInternals, a4SharedHost: ViewShared, time: number, draw: NonNullable<Parameters<View["render"]>[1]>): void {
    // Allocate only when a whole display-pixel step changes, including Try/Stop and expiry.
    if (a4PrivateHost.pixelViewport.w > 0 && a4PrivateHost.scenePixelSize() !== a4ViewHost.cssPixel) a4ViewHost.resize(a4PrivateHost.pixelViewport.w, a4PrivateHost.pixelViewport.h);
    // Late art may introduce programs after compileAll's background pass has ended.
    for (const p of a4PrivateHost.readyPrograms()) p.isReady();
    a4ViewHost.assets.playing = a4ViewHost.game.party.spellAt !== null; // (the night playing: the art ahead of need shares the workers, render/assets.ts dispatch)
    a4ViewHost.ms = {}; a4PrivateHost.lap = a4ViewHost.frameStart = performance.now();
    const g = a4ViewHost.game, t = g.tuning, P0 = poseOf(g), F = a4ViewHost.fly;
    if (a4ViewHost.magic.galleryCamera !== null) { g.witch.mode=a4ViewHost.magic.galleryCamera?"treetop":"ground"; g.witch.lift=a4ViewHost.magic.galleryCamera?1:0; }
    // (arriving from the sea chart: the flight's shot, app/arrive.ts)
    const pose = F ? { ...P0, tx: F.tx, ty: F.ty, tz: F.tz, angle: F.angle, distance: F.distance, ...shotCamera(F) } : P0;
    a4PrivateHost.prefetchWave();
    // Her clock (rules/slowTime.ts): she and everything of hers (her frames, blinks, trail, 💌s, sigils, the action bar) at full
    // speed, while the world (time) may run slow in a sleeping legend's circle; eased between steps as the world's is.
    const ht = Math.max(0, g.herTime - Math.max(0, g.clock.time - time) / Math.max(1e-3, g.timeScale));
    a4ViewHost.magic.begin(ht, g.witch.x, g.witch.z, g);
    a4ViewHost.magic.batches.mpp.value = a4ViewHost.mpp;
    a4ViewHost.magic.batches.canopy = g.witch.lift > 0.5;
    // The scenery budget follows the real frame rate (only frames that are drawn count).
    if (draw) {
      const now = performance.now();
      if (a4ViewHost.lastReal) a4ViewHost.budget = stepBudget(a4ViewHost.budget, (now - a4ViewHost.lastReal) / 1000, t);
      a4ViewHost.lastReal = now;
    }
    if (a4ViewHost.sceneryFixed !== null) a4ViewHost.budget.radius = Math.min(t.haze.far, Math.max(1, a4ViewHost.sceneryFixed));
    LIGHT_UNIFORMS.uScenery.value.set(a4ViewHost.budget.radius, Math.max(1, t.scenery.fade));
    SPRITE_UNIFORMS.uEdgeDither.value = t.scenery.edgeDither ? 1 : 0; SPRITE_UNIFORMS.uHoleHard.value = t.canopyCutout.hard ? t.canopyCutout.hardAt ?? a4SharedHost.HOLE_HARD_AT : 0; // (the quality ladder's dithered far edge: render/sprites.ts)
    // In the air, the crowns' reach (render/view/scenery.ts), eased in and out over half a second or so (no far crowns popping as she lands).
    // Through the telescope (rules/telescope.ts), crowns out to the island's far side, and its own, further haze; back as it was after.
    const TL = a4ViewHost.telescope && t.telescope, haze = LIGHT_UNIFORMS.uHazeRange.value;
    if (TL) { a4PrivateHost.hazeBeforeTelescope ??= haze.clone(); haze.set(TL.hazeNear, TL.hazeFar); } else if (a4PrivateHost.hazeBeforeTelescope) { haze.copy(a4PrivateHost.hazeBeforeTelescope); a4PrivateHost.hazeBeforeTelescope = null; }
    const canopyTo = TL ? TL.reach : g.witch.mode !== "ground" ? Math.min(t.haze.far, t.scenery.canopyReach ?? 0) : 0;
    a4ViewHost.canopyNow += (canopyTo - a4ViewHost.canopyNow) * (Math.abs(canopyTo - a4ViewHost.canopyNow) < 1 ? 1 : 0.08);
    LIGHT_UNIFORMS.uCanopyReach.value = a4ViewHost.canopyNow;
    const up = placeCamera(a4ViewHost, time, pose);

    a4PrivateHost.swapHomeArt();
    setFrameUniforms(a4ViewHost, time, up);
    setReveal(a4ViewHost, time);
    const w = g.witch;
    a4ViewHost.time("uniforms");
    updateSources(a4ViewHost, time);
    a4ViewHost.time("sources");
    // The party: soundsystems rising in partifying areas, and their lights.
    // The party's over (render/partyOver.ts): its lights go out in a ripple from home.
    const over = updatePartyOver(g, partyOverEase(g, a4PrivateHost.overDebug), a4ViewHost.over), offAt = (x: number, z: number) => partyOff(over, x, z);
    a4ViewHost.leashView.partyOverEase = over.ease;
    a4ViewHost.fireworks.update(g.waveEvents, time, t, key => { const [cx, cy] = key.split(",").map(Number); return sigilColour(AREA_TYPES[g.map.typeOf(cx, cy)].creature) as number[]; }, at => !!g.win && g.win.lapAt !== undefined && at >= g.win.lapAt); // (the win's, from its victory lap on: the finale's palette; before the soundsystems: a celebrated one's lasers come on as its show starts)
    const party = a4PrivateHost.partyView.update(g, time, (x, z, ww, hh) => inView(a4ViewHost, x, z, ww, hh, 4), () => false, a4ViewHost.fireworks.celebrated, offAt);
    if (over.front > 0) { for (const l of party.lights) l.strength *= 1 - offAt(l.x, l.z); party.playing = party.playing.filter(p => offAt(p.x, p.z) < 0.98); party.projectors = party.projectors.filter(p => offAt(p.x, p.z) < 0.98); }
    a4PrivateHost.soundBatch.set(party.items);
    a4ViewHost.ground.setLegendRings(a4PrivateHost.legendRings(g, time), a4ViewHost.ringCount);
    a4ViewHost.ground.setLegendFloors(a4PrivateHost.floorItems, a4ViewHost.ringCount);
    // (the zoo's undiscovered islands, rules/zooMap.ts: the nearest four lakes' sigils, faint on the water)
    if (g.map.zoo?.layout) {
      const L = g.map.zoo.layout, w = g.witch, items = a4PrivateHost.lakeSigils;
      items.length = 0;
      for (const I of L.islands) if (!I.found && Math.abs(I.x - w.x) < 500 && Math.abs(I.z - w.z) < 500) items.push({ x: I.x, z: I.z, r: I.most * 0.62, species: I.kind, d: Math.hypot(I.x - w.x, I.z - w.z) });
      items.sort((a, b) => a.d - b.d);
      a4ViewHost.ground.setLakeSigils(items.slice(0, 4));
    }
    a4PrivateHost.lasers.update(time, w.x, w.z, a4ViewHost.speakerTops, g.map.dancefloor); // (the dancefloor ring's: the soundsystems project their sigils instead)
    a4PrivateHost.holograms.update(party.projectors, time, w.x, w.z);
    {
      // The ley lines: fading from the colour of the area each starts in to that of the area it ends
      // in (Ed, 2026-10-05), the colour partified areas and soundsystems use: its creature's sigil's.
      // (Nothing allocated a frame but on a change: the key's a number, the callbacks are the view's own.)
      a4ViewHost.leyParty = g.party; // (leyLines.advance is the rules' own now: rules/leylines.ts questsMove)
      a4ViewHost.ley.update(leyKey(a4ViewHost.leyParty), a4PrivateHost.leyChainNow, a4PrivateHost.leyColour, time, canopyShown(w));
      // The party's over (rules/partyOver.ts): the line fades to partyOver.leyFloor of itself, its pulse gone.
      const po = g.partyOver?.ease ?? 0, leyK = a4PrivateHost.leyBase * (1 - (1 - t.partyOver.leyFloor) * po);
      if (leyK !== a4ViewHost.leyScaled) { a4ViewHost.leyScaled = leyK; a4ViewHost.ley.scale(leyK); }
      // One line (Ed, 2026-10-29): the boot ring's link first, from the treehouse's front round the home ring (rules/bootRing.ts),
      // the route on from where its lap ends. Its pulse: the boot's along the ring while home boots up (its share of the boot path,
      // the stones turning as it passes), then the wave's along the current link, by the party's clock (as the HUD's pointer).
      const B = bootPath(g.map), bootPulse = g.party.spellAt !== null && time < g.party.bootUntil;
      a4ViewHost.ley.pulse(g.partyOver || bootPulse ? null : shaderPulse(g.party, g.map, time), g.partyOver || !bootPulse ? null : bootPulseAt(g.party, g.map, time) / B.length);
      a4ViewHost.ley.lap(winPulse(g)?.links ?? null, winPulseOut(g)?.links ?? null, winLit(g)); // (the victory lap: its sparklers racing home and on to the route's end from where the wave's pulse was, rules/win.ts)
      // None till the party spell; then reveal times as far along the line as the pulse (the boot's, then the wave's: leyReveal and
      // bootLineAt, the same measure), the tip round the ring first and on out along the route without a jump.
      a4ViewHost.ley.near(w.x, w.z);
      // (the Route-seer hat worn, rules/hatSpells.ts: the whole route, however far the reveal has grown)
      a4ViewHost.ley.grow(leyDrawnTo(g.party, g.map, time, t.leyLines.reveal ?? 3, routeSeen(g)), bootLineAt(g.party, g.map, time, t.leyLines.reveal ?? 3) / B.length); // (none before the party, the hat's too)
      { // The ring's link: full while home boots up, faint round the speakers after (RING_AFTER), nothing before the spell; it fades out too once the party's over.
        const live = g.party.spellAt !== null && (g.party.bootFrom === undefined || time < g.party.bootUntil);
        a4ViewHost.ley.ring((g.party.spellAt === null ? 0 : live ? 1 : RING_AFTER) * (1 - (g.partyOver?.ease ?? 0)), a4PrivateHost.leyRgb ?? undefined);
        a4ViewHost.ley.front(time, (beatTime(g.beat, time) * t.beat.bpm) / 60, 1 - (g.partyOver?.ease ?? 0)); // its front and pulse: a pixel spark, its small light (render/sparkler.ts)
        const tip=a4ViewHost.ley.pulseTip??a4ViewHost.ley.tip;
        if(tip)a4ViewHost.magic.native("ley",tip.x,0.4,tip.z,1,920001,[tip.colour.x,tip.colour.y,tip.colour.z]);
        a4ViewHost.leashView.ley = a4ViewHost.ley; // (the rainbow wave and the analyser behind the spark stand on the line as drawn: render/leash/rainbow.ts)
      }
    }
    // The sleeping legends' clearings: their twilight and motes, the nearest few (render/glades.ts).
    { const gdt = Math.min(0.1, Math.max(0, ht - a4ViewHost.gladeTime)); a4ViewHost.gladeTime = ht; // (eased on her clock, so the slowing doesn't slow its own look)
      // (none on the house, its rooms, Terrace and telescope: its own slowing greyed all the view there as outside a circle it isn't
      // in, washing the island out through the telescope; Ed, 2026-10-26: "I think it should not be grey": indoors the slowed time
      // shows only in how things move. A sleeping legend's circle outdoors keeps its grey.)
      a4PrivateHost.glades.update(g, w.x, w.z, gdt, w.mode === "ground", undefined, w.perch || a4ViewHost.telescope ? 0 : slowAmount(g.timeScale, slowest(t))); }
    a4PrivateHost.wisps?.update(g, w.x, w.z, ht); // (the wild areas' wisps round her, render/wisps.ts)
    a4ViewHost.time("party");
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
    a4PrivateHost.strings.update();
    a4PrivateHost.borders.update();
    // A point on the treehouse's sprite (its pixels) in the world, standing on its spot.
    a4ViewHost.houseShift = houseShiftOf(a4ViewHost); // (before the Ent and the house are placed: render/view/witch.ts)
    const T = a4ViewHost.assets.treehouse, thf = T.atlas.frames[0], at = placeTreehouse(a4ViewHost, pose.angle, time), U2 = SPRITE_UNIFORMS;
    const onTreehouse = (px: number, py: number) => {
      const r = U2.uRight.value, u = U2.uUp.value, dx = (px - thf.w / 2) * a4ViewHost.mpp, dy = (thf.h - py) * a4ViewHost.mpp;
      return { x: at.x + r.x * dx + u.x * dy, y: at.y + r.y * dx + u.y * dy, z: at.z + r.z * dx + u.z * dy };
    };
    const deck = T.ent ? deckOf(g.map, t) : null;
    if (a4ViewHost.mapTable) { // (its top's middle on the Ent's painted table, in the world's heights)
      const tp = deck && T.ent ? onTreehouse(T.ent.table.x, T.ent.table.y) : null;
      a4ViewHost.mapTable.update(tp && deck ? { x: tp.x, y: tp.y + groundHeight(deck.x, deck.z) + 0.02, z: tp.z } : null, deck ? Math.hypot(w.x - deck.x, w.z - deck.z) : Infinity, canopyShown(w) < 0.05, ht);
    }
    const thLights: ForestLight[] = deck?.house && T.ent // (the house: the clockwork moon over the map, the lantern posts by the decks: the art's own lights, art/ent.js)
      ? T.lights.filter(l => l.kind === "moon" || l.kind === "lantern").slice(0, 3).map(l => { const p = onTreehouse(l.x, l.y); return { x: p.x, y: p.y + groundHeight(deck.x, deck.z), z: p.z, reach: t.treehouse.lightReach, rgb: new THREE.Vector3(l.rgb[0] / 255, l.rgb[1] / 255, l.rgb[2] / 255), strength: t.treehouse.lightStrength * (l.kind === "moon" ? 0.8 : 0.92 + 0.08 * Math.sin(time * 3 + l.x)) }; })
      : deck // (the deck: one warm lantern over it, at the map table)
      ? [{ x: deck.x, y: groundHeight(deck.x, deck.z) + deck.h + 3, z: deck.z, reach: t.treehouse.lightReach, rgb: a4SharedHost.DECK_LANTERN_RGB, strength: t.treehouse.lightStrength * (0.92 + 0.08 * Math.sin(time * 3)) }]
      : T.lights.filter(l => l.kind === "lantern" || l.kind === "window").slice(0, 2).map(l => ({
        ...onTreehouse(l.x, l.y), reach: t.treehouse.lightReach, rgb: new THREE.Vector3(l.rgb[0] / 255, l.rgb[1] / 255, l.rgb[2] / 255), strength: t.treehouse.lightStrength * (0.92 + 0.08 * Math.sin(time * 3 + l.x)),
      }));
    const markerLights = drawMarkers(a4ViewHost, time);
    const speakerLights = drawSpeakers(a4ViewHost, time, pose.angle);
    a4ViewHost.spellFx.update(g, ht, witchHeight(w, t) + 0.6 + a4ViewHost.rideOff);
    const speedForMagic=Math.hypot(w.vx,w.vz);
    if(speedForMagic>2){a4ViewHost.magic.native("flightTrail",w.x,witchHeight(w,t),w.z,Math.min(1,speedForMagic/20),920002);a4ViewHost.magic.native("broomSpark",w.x,witchHeight(w,t),w.z,0.5,920003);}
    const blink = g.witches[0].dash;
    if (blink.at !== a4PrivateHost.magicBlink && ht >= blink.at && Number.isFinite(blink.at)) {
      a4PrivateHost.magicBlink = blink.at;
      a4ViewHost.magic.emit("moonlight", "aura", blink.fromX, 1.5, blink.fromZ, 1, 0.7, 0.5, 910001);
      a4ViewHost.magic.emit("moonlight", "burst", blink.toX, 0.8, blink.toZ, 1, 0.7, 0.6, 910002);
    }
    {
      // her trail: behind her broom, as long as she's fast, in the colour of the area under her (its creature's neon, as the
      // ley lines and runestones; home's own lavender)
      const lift = canopyShown(w), A = g.map.areaAt(w.x, w.z), sp = Math.hypot(w.vx, w.vz), top = t.groundSpeed + (t.treetopSpeed - t.groundSpeed) * lift;
      const c = A.look === HOME_LOOK ? a4PrivateHost.trailRgb.set(0.8, 0.7, 1) : a4PrivateHost.trailRgb.copy(a4ViewHost.markerArt.colour.get(AREA_TYPES[A.type].creature) ?? a4PrivateHost.trailRgb.set(0.8, 0.7, 1));
      const dt = a4ViewHost.trailAt < 0 ? 0 : Math.min(0.1, Math.max(0, ht - a4ViewHost.trailAt)); a4ViewHost.trailAt = ht;
      const back = sp > 0.1 ? 0.6 / sp : 0, W0 = g.witches[0], D = W0.dash;
      // (and its length at least the shared cooldown's share: rules/cooldown.ts, Ed 2026-10-15; the ribbon along her blink's line)
      const tw = witchTuning(g, W0), cool = tw.cooldown?.shared ? coolShare(W0.cool, coolRoom(tw, blinkCharges(g, W0))) : 0; // (her broom's parts: rules/broomParts.ts)
      a4PrivateHost.trail.update(w.x - w.vx * back, witchHeight(w, t) + 0.25 + a4ViewHost.rideOff, w.z - w.vz * back, sp, top, lift, c, ht, dt, D.at, D, cool);
      // the load she carries (render/load.ts): read once a frame, for the stack, the threads, her lean and her broom
      loadView(g, t.load ?? LOAD_DEFAULT, dt, a4ViewHost.leashView.load);
      const Bp = a4ViewHost.leashView.bristle; Bp.x = w.x - w.vx * back; Bp.y = witchHeight(w, t) + 0.25 + a4ViewHost.rideOff; Bp.z = w.z - w.vz * back;
    }
    // Tufts part round her and the three nearest creatures.
    // (only those within reach made into objects: mapping every creature, a thousand late in a run, every frame was much of the frame's garbage)
    const near: { x: number; z: number; r: number; d: number }[] = [], GR = t.groundCover.radius;
    const cs = g.creatures; // (by index: render is too big for the engine to optimise, and for...of made an object a creature)
    for (let i = 0; i < cs.length; i++) {
      const c = cs[i], dx = c.x - w.x, dz = c.z - w.z;
      if (Math.abs(dx) >= GR || Math.abs(dz) >= GR) continue;
      const d = Math.sqrt(dx * dx + dz * dz);
      if (d < GR) near.push({ x: c.x, z: c.z, r: Math.max(0.8, (a4ViewHost.leashView.tops.get(c.id) ?? 1.6) * 0.75), d }); // parting by its drawn size (#47)
    }
    const parts = [{ x: w.x, z: w.z, r: 1.6 * (1 - canopyShown(w)) }, ...near.sort((a, b) => a.d - b.d).slice(0, 3)];
    // No tufts over a placed sigil's rune (Ed, v233): trampled out to groundCover.sigilClear, or the rune's own size.
    const clear = g.leash.placed.map(p => ({ x: p.x, z: p.z, r: Math.max(t.groundCover.sigilClear, (3 + g.creatures[p.id].level * 0.8) * 0.45) }));
    { const W0 = g.witches[0].hat, H = W0.down; if (H && W0.has) clear.push({ x: H.x + a4SharedHost.HAT_BESIDE, z: H.z, r: t.groundCover.sigilClear }); for (const q of W0.left) clear.push({ x: q.x + a4SharedHost.HAT_BESIDE, z: q.z, r: t.groundCover.sigilClear }); } // (her hats where they lie)
    for (let i = 0; i < cs.length; i++) { const c = cs[i]; if (Math.abs(c.x - w.x) < GR && Math.abs(c.z - w.z) < GR && hasRune(c)) clear.push({ x: c.x, z: c.z, r: t.groundCover.sigilClear }); } // (a happy one's rune at its feet)
    for (const r of relicsOut(g)) if ((r.state === "lying" || r.state === "dropped") && Math.abs(r.sx - w.x) < GR && Math.abs(r.sz - w.z) < GR) clear.push({ x: r.sx, z: r.sz, r: Math.max(t.groundCover.sigilClear, 3.4 * 0.45) }); // (and a relic's sigil, south of it)
    { const F = findClear(a4ViewHost); if (F) clear.unshift(F); } // (tonight's find's patch, first: render/view/finds.ts)
    a4ViewHost.time("markers");
    a4ViewHost.grass.update(w.x, w.z, 1 - canopyShown(w), parts, t.suspects.groundCover ? LIGHT_UNIFORMS.uGlowR.value * 1.05 : t.groundCover.radius, clear); // out to the canopy hole's edge
    const partyObjectLights = a4ViewHost.partyObjects.update(g, time, a4ViewHost.camera, (x, z, ww, hh) => inView(a4ViewHost, x, z, ww, hh, 4), a4ViewHost.worldFires, a4ViewHost.lastView);
    a4PrivateHost.updateSteam(g, time);
    a4PrivateHost.lakeShore.update(g, a4ViewHost.assets, w.x, w.z);
    a4PrivateHost.updateSmoke(g, time); // (time is the world's: what moves on its own slows with it, rules/slowTime.ts)
    const floorOff = offAt(g.map.dancefloor.x, g.map.dancefloor.z);
    if (over.front > 0) for (const L of [markerLights, speakerLights, partyObjectLights]) for (const l of L) l.strength *= 1 - offAt(l.x, l.z);
    // (the zoo: no treehouse, dancefloor or speakers, only the Ent's circle on its plaza; Ed, 2026-10-26)
    const noHome = !!g.map.zoo?.layout, discoLight = a4PrivateHost.dancefloor.update(time, a4ViewHost.ground, g, floorOff);
    if (noHome) { // (the treehouse's art only as the little one by the plaza, its way out: render/zooExit.ts)
      for (const m of [...(a4ViewHost.speakerBatch?.meshes ?? []), a4PrivateHost.dancefloor.ball, a4PrivateHost.dancefloor.beam, a4PrivateHost.dancefloor.motes]) m.visible = false;
      a4ViewHost.treehouseBatch.set(miniTreehouse(a4ViewHost, pose.angle)); thLights.length = 0; speakerLights.length = 0;
      (a4ViewHost.zooExitTag ??= new ZooExitTag()).update(a4ViewHost);
    }
    const zooF = a4ViewHost.island.zooFences; // (the zoo's railings: clear round her line of sight; the nearest lamps light the street, render/zooFences.ts)
    zooF?.update(w.x, witchHeight(w, t) + a4ViewHost.rideOff + 1, w.z);
    a4ViewHost.island.zooWords?.update(w.x, w.z);
    if (t.bare) setLights(a4ViewHost, [], w.x, w.z); else setLights(a4ViewHost, [...(noHome ? [] : [discoLight]), ...(zooF ? zooF.lights(w.x, w.z, time) : []), ...(zooF && g.map.zoo?.layout && Math.hypot(w.x - g.map.zoo.layout.home.x, w.z - g.map.zoo.layout.home.z) < 160 ? [{ x: g.map.zoo.layout.home.x, y: 7, z: g.map.zoo.layout.home.z, reach: 75, rgb: a4SharedHost.PLAZA_RGB, strength: 1.0 }] : []), ...party.lights, ...a4ViewHost.fireworks.lights(time), ...thLights, ...markerLights, ...speakerLights, ...partyObjectLights, ...lanternLights(a4ViewHost, time), ...a4PrivateHost.lakeShore.lavaLights(g, time, w.x, w.z), ...sigilLights(a4ViewHost, time, witchHeight(w, t) + a4ViewHost.rideOff + t.sigilSpill.stackHeight), ...relicLights(a4ViewHost, time), ...a4ViewHost.forestLights], w.x, w.z);
    SHADOW_TINT.value = t.shadows.tint ?? 0; // (every shadow's colour: render/shadows.ts, trunkShadows.ts)
    { // the trunks' and palms' shadows (render/trunkShadows.ts): on foot (fading out as she rises), from her glow and the nearest lit fires
      const TS = t.shadows.trunks, lift = Math.min(1, Math.max(0, w.lift ?? 0)), on = !!TS && TS.mode !== "off" && lift < 1 && !t.bare, U = TRUNK_SHADOW_UNIFORMS;
      for (const b of a4ViewHost.trunkShadowBatches.values()) b.visible = on;
      a4PrivateHost.castOn = on && TS.mode !== "debug" && (t.shadows.cast ?? true);
      if (a4ViewHost.beachView.palmShadows) a4ViewHost.beachView.palmShadows.visible = on;
      if (on) {
        // (the lit campfires, and the soundsystems' and runestones' lights: those tagged with a shadow, Ed 2026-10-13)
        const base = t.lights.campfire.strength, fires = a4PrivateHost.shadowLights;
        fires.length = 0;
        for (const l of a4ViewHost.forestLights) if (l.rgb === a4ViewHost.fire) fires.push({ x: l.x, y: l.y, z: l.z, reach: l.reach, rgb: l.rgb, k: Math.min(1, l.strength / (base * 0.8)) });
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
    a4ViewHost.time("grass+lights");
    LIGHT_UNIFORMS.uTime.value = time; LIGHT_UNIFORMS.uRealTime.value = ht; // (the circle's motes and edge keep her clock)
    a4ViewHost.mist?.follow(pose.tx, pose.tz);
    if (a4ViewHost.loadingMist && draw) { // (on the page's own clock, a frame counting at most a tenth of a second: not the house's slowed time)
      const now = performance.now(); a4PrivateHost.mistClock += a4PrivateHost.mistLast ? Math.min(0.1, (now - a4PrivateHost.mistLast) / 1000) : 0; a4PrivateHost.mistLast = now;
      a4ViewHost.loadingMist.update(a4PrivateHost.mistClock, ty => a4ViewHost.assets.hasType(ty));
    }
    a4ViewHost.lightRings?.update(a4ViewHost.camera, w.x, witchHeight(w, t) + a4ViewHost.rideOff, w.z, canopyShown(w), time);
    const hatTop = drawWitch(a4ViewHost, time, ht, onTreehouse);
    a4PrivateHost.mushroomView.update(a4ViewHost);
    a4ViewHost.ground.prepareCoast(a4ViewHost.renderer, a4ViewHost.camera, a4ViewHost.scene);
    a4ViewHost.houseRooms?.update(a4ViewHost, onTreehouse, ht);
    a4PrivateHost.potionObservers.update(a4ViewHost, onTreehouse);
    if (a4ViewHost.crown && (a4ViewHost.crown.lights !== (t.treehouse.house?.crown?.lights ?? 1) || (a4ViewHost.crown.crown.wrap ?? 0) !== (t.treehouse.house?.crown?.wrap ?? 0))) a4PrivateHost.ensureCrown(a4ViewHost.game); // (its lights' density or their wrapping moved on the pause page: grown again)
    if (a4ViewHost.crown && deck) { // (the crown: in the world, or laid over the floors with her indoors: render/crown.ts)
      const W = a4PrivateHost.crownWorld, a = ((HOUSE_ROOMS.turn ?? 0) * Math.PI) / 180, c = Math.cos(a), s = Math.sin(a);
      W.o.set(deck.x, groundHeight(deck.x, deck.z) + deck.h, deck.z); W.ex.set(c, 0, -s); W.ez.set(s, 0, c);
      const plan = a4ViewHost.houseRooms?.plan ?? null, here = plan ? toPlan({ x: deck.x, z: deck.z }, w.x, w.z) : null;
      const dt = Number.isFinite(a4PrivateHost.crownAt) ? Math.min(0.1, Math.max(0, ht - a4PrivateHost.crownAt)) : 0; a4PrivateHost.crownAt = ht;
      // (indoors, the forest's hole round her as it would be outdoors, its middle where she's drawn: render/view/witch.ts set uWitch
      // this frame, her house's slide in it; Ed, 2026-10-26: "The witch should have a canopy circle cut around her in the treehouse")
      const cut = t.canopyCutout, hw = SPRITE_UNIFORMS.uWitch.value, CR = t.treehouse.house?.crown;
      const hole = { x: hw.x, y: hw.y, r: 0.5 * cut.screenFraction * (t.suspects.holeCut ? 1 : 0) * a4ViewHost.width, edge: cut.edge * a4ViewHost.width };
      a4ViewHost.crown.uniforms.uWarmK.value = CR?.warm ?? 0; // (the house's warm light up into it, live from the pause page)
      a4ViewHost.crown.update(a4ViewHost.camera, W, plan, here, dt, hole, CR?.cutFade ?? 0, { x: w.x, y: groundHeight(w.x, w.z) + witchHeight(w, t), z: w.z }); // (her: the oak hidden when she's behind it)
      if (a4PrivateHost.crownFar) { // (and over the horizon from far off: its picture baked the first frame there is one)
        if (!a4ViewHost.shaderDrawStatus.active) a4PrivateHost.crownFar.bake(a4ViewHost.renderer);
        const at = g.party.spellAt;
        a4PrivateHost.crownFar.update(a4ViewHost.camera, W.o, W.ex, W.ez, at === null ? 1e9 : at === undefined ? -1e9 : at, a4ViewHost.crown.indoors);
      }
      // (wholly behind the bend from far off, the real crown and its lights aren't drawn: the landmark stands in for them)
      // (set as it changes only, so tools/bench/crown-cost.cjs can hide its parts)
      const drawn = !a4PrivateHost.crownFar?.realHidden;
      if (drawn !== a4PrivateHost.crownDrawn) { a4PrivateHost.crownDrawn = drawn; for (const m of [...a4ViewHost.crown.meshes, ...(a4PrivateHost.strings?.crownMeshes ?? [])]) m.visible = drawn; }
    }
    a4ViewHost.time("witch");
    refresh(a4ViewHost);
    a4ViewHost.time("refresh");
    a4PrivateHost.easeAppearing();
    drawCreatures(a4ViewHost, time);
    drawBerries(a4ViewHost, time);
    drawHatArt(a4ViewHost); // (the Harvest hat's sprouts, the Cyclone's whirlwind: render/view/hatArt.ts)
    drawFinds(a4ViewHost); // (tonight's travel trunk: render/view/finds.ts)
    checkPops(a4ViewHost, "moving");
    a4ViewHost.time("creatures");
    a4ViewHost.rulers.update(a4ViewHost.camera, a4ViewHost.canvas.clientWidth || window.innerWidth, a4ViewHost.canvas.clientHeight || window.innerHeight, w.x, w.z);
    // (no cue toward the dancefloor any more: Ed, 2026-10-06, "You can remove the UI icon that points towards the dancefloor")
    a4ViewHost.minimap.update(g.party, w.x, w.z);
    drawPointers(a4ViewHost, time);
    a4ViewHost.time("hud");
    a4ViewHost.leashView.update(ht, a4ViewHost.camera, a4ViewHost.canvas.clientWidth || window.innerWidth, a4ViewHost.canvas.clientHeight || window.innerHeight, hatTop, a4ViewHost.witchBodyY, a4ViewHost.witchFeetY, a4ViewHost.witchFrameH);
    (a4ViewHost.castTag ??= new CastTag()).update(a4ViewHost); // (the spell's key prompt by its 🎶, drawn just now: render/castTag.ts)
    a4ViewHost.time("leash");
    a4ViewHost.magic.finish(t.lightBudget);
    a4ViewHost.stats.lights = LIGHT_UNIFORMS.uLightCount.value;
    if (a4SharedHost.FX_MOCK_MODE) (a4ViewHost.fxMock ??= new FxMock(a4ViewHost, a4SharedHost.FX_MOCK_MODE)).update(a4ViewHost, ht);
    workAhead(a4ViewHost);
    if (a4ViewHost.debugCull) drawGhosts(a4ViewHost, time);
    if (!draw) return;
    a4ViewHost.renderer.info.reset();
    a4ViewHost.post.lift = a4ViewHost.game.witch.lift;
    a4ViewHost.post.tilt = tiltShareShown(a4ViewHost.tiltK); // (as houseTilt gives the overlays)
    if (t.bare) a4PrivateHost.hideForBare();
    a4PrivateHost.behindHouse(a4ViewHost.game);
    // (the cast-shadow map is the forest's: none while only the house is drawn)
    if (a4ViewHost.post.behind > 0) a4PrivateHost.castMap.render(a4ViewHost.renderer, a4ViewHost.scene, a4ViewHost.game.witch.x, a4ViewHost.game.witch.z, a4PrivateHost.castOn);
    a4PrivateHost.occluders();
    a4ViewHost.magic.hideBackdrop(a4ViewHost.scene);
    if (a4ViewHost.game.cauldron || a4PrivateHost.cauldronLook) (a4PrivateHost.cauldronLook ??= new CauldronView()).update(a4ViewHost);
    a4ViewHost.post.render(a4ViewHost.scene, a4ViewHost.camera);
    a4PrivateHost.cauldronLook?.finish(a4ViewHost);
    a4ViewHost.magic.restoreBackdrop(a4ViewHost.scene);
    a4ViewHost.occlusion.veil(); // (the smoke over the 💌s, once the frame's smoke is drawn)
    a4ViewHost.time("draw");
    a4ViewHost.drawEst += (Math.min(8, a4ViewHost.ms.draw) - a4ViewHost.drawEst) * 0.1; // (eased; a stalled frame counts for at most 8 ms)
    // Anything set but not drawn (three.js capping a batch's instances) is a bug: count and log it.
    a4SharedHost.DROPPED = a4ViewHost.propBatch.dropped + a4PrivateHost.soundBatch.dropped + (a4ViewHost.speakerBatch?.dropped ?? 0);
    a4ViewHost.typeBatches.forEach(a4SharedHost.addDropped); a4ViewHost.creatureBatches.forEach(a4SharedHost.addDropped); // (no list of every batch a frame)
    const dropped = a4SharedHost.DROPPED;
    if (dropped && !a4ViewHost.stats.dropped) console.warn(`view: ${dropped} sprite instances set but not drawn`);
    a4ViewHost.stats.dropped = dropped;
    a4ViewHost.stats.drawCalls = a4ViewHost.renderer.info.render.calls;
    a4ViewHost.stats.batches = a4ViewHost.typeBatches.size + a4ViewHost.creatureBatches.size;
    keepUnderBudget(a4ViewHost, performance.now());
    a4ViewHost.stats.sceneryRadius = a4ViewHost.budget.radius; a4ViewHost.stats.fps = a4ViewHost.budget.fps;
    a4ViewHost.stats.scenery = a4ViewHost.stats.trees + a4ViewHost.stats.bushes;
    a4ViewHost.stats.gameplay = a4ViewHost.stats.creatures + a4ViewHost.propBatch.count + a4PrivateHost.soundBatch.count + (a4PrivateHost.partyView.gen?.count ?? 0);
  }
