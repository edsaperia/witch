// A4 mechanical extraction from src/render/view.ts; body identity is checked by tools/refactor/a4-split.mjs.
import type { View, ViewInternals, ViewShared } from "../view";
import { RigView, rigOn } from "../rig/rigView";
import { bridgeNativeObject } from "../fx/native";
import * as THREE from "three";
import { deckOf } from "../../rules/treehouse";
import { StationBackdrop } from "../stationBackdrop";
import { islandArtSeed } from "../artCache";
import { biomeKey } from "../../rules/lakeLooks";
import { HouseRoomsView } from "../houseRooms";
import { fromPlan } from "../../rules/houseRooms";
import { warmCarvings } from "../legendCarving";
import type { Game } from "../../rules/game";
import { type TreeExtent } from "../../rules/arrive";
import { AREA_TYPES, HOME_LOOK } from "../../rules/map";
import { IslandLayers } from "../island";
import { Sky } from "../sky";
import { Clouds } from "../clouds";
import { Smoke } from "../smoke";
import { LakeShoreView } from "../lakeShore";
import { lakeKnobs } from "../../rules/lakes";
import { OcclusionProbes } from "../occlusion";
import { HEIGHT_UNIFORMS } from "../height";
import { LIGHT_UNIFORMS } from "../lighting";
import { AreaMoods, moodOf } from "../mood";
import { GrassView } from "../grass";
import { TRAIL_DEFAULT, WitchTrail } from "../trail";
import { SWOOP_TRAIL_DEFAULT, SwoopTrails } from "../swoopTrails";
import { InviteView } from "../invites";
import { StateMarks } from "../looks";
import { PartyView } from "../party";
import { StringLightsView } from "../strings";
import { LeashView } from "../leash";
import { Lasers } from "../lasers";
import { SigilHolograms } from "../hologram";
import { SoundsystemGenView } from "../soundsystemGen";
import { PartyWitchView } from "../partyWitches";
import { BeachView } from "../beach";
import { PartyObjectsView } from "../partyObjects";
import { BorderView } from "../borders";
import { Mist } from "../mist";
import { LightRings } from "../lightRings";
import { SHADOW_DEBUG, ShadowBatch } from "../shadows";
import { packAtlas } from "../atlas";
import { berrySprite } from "../berries";
import { Glades } from "../glades";
import { Wisps } from "../wisps";
import { SPRITE_UNIFORMS, SpriteBatch } from "../sprites";
import { nextFrame, runSliced, type Steps } from "../slices";
import { Fireworks } from "../fireworks";
import { viewRect } from "./culling";
import { cancelRefresh, refreshSteps } from "./scenery";
import { drawCreatures, resetCreatureCaches } from "./creatures";
import { forgetCandles } from "./home";

export function* build(view: View, internals: ViewInternals, shared: ViewShared): Steps {
    const game = view.game, t = game.tuning, style = view.style, M = moodOf(t), deckOn = deckOf(game.map, t); // (the treehouse Ent holding the deck, rules/treehouse.ts; else the old treehouse)
    yield "island";
    // (Each island layer made at its old place among the View's own: three.js breaks draw-order ties by creation order.)
    view.island = new IslandLayers(view.scene, { game, style, mpp: view.mpp, maxTexture: view.renderer.capabilities.maxTextureSize, assets: view.assets, deck: deckOn });
    yield* view.island.groundSteps();
    yield "sky";
    view.sky = new Sky(t.sky, t.moon.disc);
    view.scene.add(view.sky.mesh);
    view.clouds = new Clouds(t.sky.clouds, t.sky.lightning, game.seed);
    view.scene.add(view.clouds.mesh, view.clouds.bolt);
    internals.smoke = new Smoke(t.smoke);
    { const S = lakeKnobs(t).steam; internals.steam = new Smoke({ ...t.smoke, on: S.on, rate: 1.2, life: S.life, rise: S.rise, speed: (S.rise / S.life) * 1.6, size: S.size, grow: 2, opacity: S.opacity, warm: 0, perFire: 8, maxFires: 12 }); }
    view.scene.add(internals.smoke.mesh, internals.steam.mesh);
    view.assets.onFloor = (type, tile) => view.ground.setFloor(type, tile);
    view.assets.prefetchType(HOME_LOOK); // home's meadow floor (no trees ask for it)
    const cs = t.canopyShadow;
    view.ground.setCanopyShadow(cs.on ? cs.strength : 0, cs.height, cs.cover, cs.wind);
    view.shadows = new ShadowBatch(t.shadows.strength);
    view.shadows.mesh.visible = t.shadows.on;
    view.scene.add(view.shadows.mesh);
    if (t.mist.on && t.mist.strength > 0) {
      view.mist = new Mist(M?.mist ?? t.mist.strength, t.mist.height, t.mist.wind, view.post.scene.depthTexture, view.post.fxSize); // (the effects layer is half the scene's size: post.ts)
      view.post.fxScene = new THREE.Scene(); view.post.fxScene.add(view.mist.mesh);
    }
    if (t.lightRings?.on && (t.lightRings.strength > 0 || t.lightRings.gloryStrength > 0) && !t.bare) {
      view.lightRings = new LightRings(t.lightRings, view.post.scene.depthTexture, game.map.seed);
      (view.post.fxScene ??= new THREE.Scene()).add(view.lightRings.mesh);
    }
    // (no haze in the bare view; the mood's fog comes nearer than the culling's far edge, which stays t.haze.far)
    LIGHT_UNIFORMS.uHazeRange.value.set(t.bare ? 1e5 : M?.hazeNear ?? t.haze.near, t.bare ? 2e5 : M?.hazeFar ?? t.haze.far);
    yield "paths";
    yield* view.island.pathSteps();
    yield "witch";

    // The witch is depth-tested like everything else, drawn after it; where something still hides
    // her, a silhouette in her glow colour shows through, and tall things in front of her fade.
    const O = t.occlusion;
    view.witchBatch = view.makeWitchBatch();
    view.backdrop = new StationBackdrop(view.scene);
    SPRITE_UNIFORMS.uOcc.value.set(O.fadeOpacity, O.edge, O.minHeight, O.on ? 1 : 0);
    // The treehouse, home: its base and its crown (the crown only from the treetops), its trunk's
    // foot on its spot. It fades like other tall things when she's behind it.
    {
      // (Placed each frame by placeTreehouse: where it stands depends on the camera's angle.)
      // With the deck's map table (rules/treehouse.ts): the sea chart's live miniature on its top (render/mapTable.ts).
      view.island.buildTreehouse();
      // The house's placeholder rooms off the hub (render/houseRooms.ts; Ed, 2026-10-19).
      if (deckOn?.house?.rooms) { view.houseRooms = new HouseRoomsView(); view.scene.add(...view.houseRooms.meshes); }
      internals.ensureCrown(game); // (the great oak's crown over it: render/crown.ts)
    }
    // Spawn markers: gameplay (always drawn in range, never budget-culled).
    yield* view.island.markerSteps();
    yield "grass";
    view.scene.add(view.markerFx.group, view.waveNumbers.mesh);
    // The ground cover: tufts round the witch, in ground mode.
    internals.tuftBiome = style.biome ?? view.assets.typeBiome; // (in the island's biome: art/flora/biomes.js; ?biome= over it)
    const tufts = yield* GrassView.tufts(internals.tuftBiome ? { ...style, biome: internals.tuftBiome } : style, shared.islandTypes(game.map));
    yield;
    view.grass = new GrassView(game.map, t, view.mpp, style, game.forest, (view.ground.mesh.material as THREE.ShaderMaterial).uniforms, tufts);
    yield "parts";
    view.scene.add(view.grass.mesh);
    view.scene.add(view.spellFx.trail);
    view.magic.legacyParty=(x,y,z,age)=>{view.spellFx.reset();view.spellFx.partyBurst(x,y,z,view.game.herTime-age);view.spellFx.update(view.game,view.game.herTime,y);};
    internals.trail = new WitchTrail(game.tuning.trail ?? TRAIL_DEFAULT);
    view.scene.add(internals.trail.mesh);
    bridgeNativeObject(internals.trail.mesh,"flightTrail");
    bridgeNativeObject(view.spellFx.trail,"broomSpark");
    // The dancefloor's speakers: their batch comes with their art (drawSpeakers).
    view.assets.speakerArt();
    view.propBatch = new SpriteBatch(view.assets.props, view.mpp, { fade: true }).name("props");
    // Berries: a small shiny dark-red berry, drawn here (a highlight upper left, a darker side),
    // always drawn (gameplay), unlit so it reads at night; its halo and glints are in leash.ts.
    view.berryBatch = new SpriteBatch(packAtlas([berrySprite(t.berries.colour)], 64), view.mpp, { unlit: true });
    view.scene.add(...view.berryBatch.meshes);
    view.scene.add(...view.propBatch.meshes);
    yield "party";
    internals.partyView = new PartyView(view.assets.soundsystems, view.mpp, new SoundsystemGenView(view.scene, view.assets, view.mpp, view.renderer, view.camera, view.trunkShadowBatches));
    internals.strings = new StringLightsView(view.scene, game);
    internals.strings.setCrown(view.crown); // (the crown's lights, made before the strings were)
    view.leashView = new LeashView(view.scene, game);
    view.post.sharp = view.leashView.stackMask; // (her stack kept sharp through the tilt-shift: Ed, 2026-10-27)
    view.leashView.herOffset = view.herOffset;
    view.rig = rigOn() ? new RigView(view.scene, view.assets, view.mpp) : null; // the live rig (#79): on unless ?rig=0
    internals.lasers = new Lasers(view.scene, game);
    yield "holograms";
    const glyphs = yield* SigilHolograms.glyphs();
    yield;
    internals.holograms = new SigilHolograms(t.holograms, glyphs);
    view.scene.add(internals.holograms.group);
    bridgeNativeObject(internals.holograms.group,"hologram");
    yield "fireworks";
    view.fireworks = new Fireworks(SPRITE_UNIFORMS.uRes, view.mpp);
    view.scene.add(view.fireworks.mesh);
    bridgeNativeObject(view.fireworks.mesh,"firework");
    yield "ley";
    view.island.buildLey();
    internals.leyBase = M?.leyBright ?? 1;
    view.ley.scale(internals.leyBase);
    internals.leyRgb = M?.leyRgb ? new THREE.Vector3(...[1, 3, 5].map(i => parseInt(M.leyRgb!.slice(i, i + 2), 16) / 255)) : null;
    internals.glades = new Glades(t.glades);
    view.scene.add(internals.glades.points);
    if (t.wisps?.on) { internals.wisps = new Wisps(t.wisps); view.scene.add(internals.wisps.points); }
    yield "partyObjects";
    view.partyObjects = new PartyObjectsView(view.scene, view.assets, view.mpp);
    view.partyWitchView = new PartyWitchView(view.scene, view.assets, view.mpp, t.witch);
    view.beachView = new BeachView(view.scene, view.assets, view.ground, view.mpp, t.witch);
    internals.lakeShore = new LakeShoreView(view.scene, view.mpp);
    view.swoopTrails = new SwoopTrails(game.tuning.swoopTrail ?? SWOOP_TRAIL_DEFAULT);
    view.scene.add(view.swoopTrails.mesh);
    bridgeNativeObject(view.swoopTrails.mesh,"partySwoop");
    bridgeNativeObject(view.markerFx.group,"runestone");
    view.inviteView = new InviteView(game);
    view.inviteView.herOffset = view.herOffset;
    // The 💌s and the invite rings hidden as the animals are, by what stands in front of them and the smoke (render/occlusion.ts;
    // Ed, 2026-10-19). ?occlusion=off: drawn over everything, as before, to compare.
    yield "occlusion";
    view.occlusion = new OcclusionProbes(view.scene, view.renderer, view.camera, internals.smoke);
    view.occlusion.on = typeof location === "undefined" || new URLSearchParams(location.search).get("occlusion") !== "off";
    view.inviteView.probes = view.occlusion;
    view.inviteView.onVanished = (x, z) => view.edgeSparkle(x, z);
    yield "stateMarks";
    view.stateMarks = new StateMarks(view.scene, view.mpp);
    yield "borders";
    internals.borders = new BorderView(view.scene, game);
    yield;
    internals.soundBatch = new SpriteBatch(view.assets.soundsystems, view.mpp, { solid: true }).name("soundsystems");
    view.scene.add(...internals.soundBatch.meshes);
    yield "dancefloor";
    view.island.buildDancefloor();
    yield* view.island.finishSteps();

    // A shadow under the witch, so her height reads: soft (multiplied over the ground).
    const sm = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.CustomBlending, blendSrc: THREE.ZeroFactor, blendDst: THREE.SrcColorFactor,
      vertexShader: shared.SHADOW_VERT, uniforms: { ...HEIGHT_UNIFORMS, uShadowDebug: SHADOW_DEBUG },
      fragmentShader: "uniform float uShadowDebug; varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; float r = dot(p, p); if (r > 1.0) discard; gl_FragColor = uShadowDebug > 0.5 ? vec4(1.0, 0.0, 1.0, 1.0) : vec4(vec3(1.0 - 0.75 * (1.0 - r) * (1.0 - r)), 1.0); }",
    });
    // Finely divided, each point laid on the rolling ground, and drawn a little toward the camera: one
    // flat quad on a slope (Ed, v289) sank into the ground's coarser grid in places, a ragged blob.
    sm.polygonOffset = true; sm.polygonOffsetFactor = -2; sm.polygonOffsetUnits = -4;
    view.shadow = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.7, 6, 3).rotateX(-Math.PI / 2), sm);
    view.shadow.renderOrder = 1;
    view.scene.add(view.shadow);
  }

export async function prepare(view: View, internals: ViewInternals, shared: ViewShared, o: { sail?: boolean; dive?: (x: number, z: number) => number; track?: [number, number, number, number][] }): Promise<void> {
    performance.mark("witch:prep-start");
    if (o.sail) { view.homeDone = false; view.shaderDrawStatus.active = true; view.shaderDrawStatus.skipped = {}; view.shaderDrawStatus.fallback = {}; view.shaderDrawStatus.submitted = {}; if (!internals.shaderChartLanding) view.startLandingShaderGrace(); }
    internals.makeLoadingMist();
    { // tonight's own trees, if drawn ahead and kept (app/landingBake.ts), for the swap before she sees the island (retype)
      const m = view.game.map, types = new Set<number>();
      for (let y = m.first; y < m.first + m.n; y++) for (let x = m.first; x < m.first + m.n; x++) types.add(m.typeOf(x, y));
      view.assets.tonight(types);
    }
    // Every area type the map has, drawn in the background so the forest ahead is ready however fast she flies; the
    // nearest her first. Only the map's own (Ed, 2026-10-12: an island grows only its roster's species, rules/map.ts): a type
    // it hasn't is never drawn, and home's area is its meadow (HOME_LOOK, asked for by the house), not its type's trees.
    // By the treehouse, where she wakes and sits at her decks (Ed, 2026-10-24, the loading mist: "If loading starts with areas
    // closer to the treehouse, this will look fine"): each type by its nearest area to the house; a sail's, to the dive's view.
    const m = view.game.map, h = m.treehouse, near = new Map<number, number>();
    for (let y = m.first; y < m.first + m.n; y++) for (let x = m.first; x < m.first + m.n; x++) {
      if (x === m.centreCell[0] && y === m.centreCell[1]) continue;
      const s = m.siteOf(x, y), t = m.typeOf(x, y), d = o.dive ? o.dive(s.x, s.z) : Math.hypot(s.x - h.x, s.z - h.z);
      if (!(near.get(t)! <= d)) near.set(t, d);
    }
    if (o.dive) {
      view.homeDone = false;
      view.prepared = true;
      internals.askIsland(near); // (the workers drawing the dive's areas while the shaders link)
      await internals.compileAll(o.sail);
      // The ground where the dive first sees the island (Ed, 2026-10-24: the dive's view needs the ground; Echo's island black through
      // the descent, its tiles not drawn yet): the first TRACK_AHEAD metres of its track in from the sea, TRACK_REACH each side, a few
      // tiles a frame under the chart; the rest of it as the dive goes, the view's own each frame (render/view/ahead.ts).
      const leg = o.track?.[0];
      if (leg && !view.shaderLandingLimited) {
        const [x0, z0] = leg, r = { minX: x0 - shared.TRACK_REACH, maxX: x0 + shared.TRACK_REACH, minZ: z0 - shared.TRACK_AHEAD, maxZ: z0 + shared.TRACK_REACH };
        while (view.ground.fill(view.renderer, r, x0, z0, 6) > 0) await nextFrame();
      }
      performance.mark("witch:prep-track");
      const homeEpoch = internals.shaderEpoch;
      void internals.buildHome(homeEpoch).catch(e => { console.error("the house's start after a sail went wrong", e); }).finally(() => { if (homeEpoch === internals.shaderEpoch) { view.homeDone = true; performance.mark('landing:house-complete'); } });
      return;
    }
    await runSliced(internals.warmSteps(), "warm"); // (the first frame's own lazy work made ahead, a slice at a time)
    performance.mark("witch:prep-warm");
    view.render(0, false);
    drawCreatures(view);
    { const rect = viewRect(view, view.game.tuning.haze.near, 20), w = view.game.witch; // (the ground round the start, a few tiles a frame: render/slices.ts)
      while (view.ground.fill(view.renderer, rect, w.x, w.z, 6) > 0) await nextFrame(); }
    performance.mark("witch:prep-ground");
    if (o.sail) {
      while (!view.assets.homeReady && performance.now() < internals.shaderLandingDeadline) { view.assets.work(4); await nextFrame(); }
      if (!view.assets.homeReady) {
        internals.armLimitedLanding(); view.prepared = true; await internals.compileAll(true);
        const homeEpoch = internals.shaderEpoch;
        void internals.buildHome(homeEpoch).catch(e => { console.error("the house's start after a sail went wrong", e); }).finally(() => { if (homeEpoch === internals.shaderEpoch) { view.homeDone = true; performance.mark('landing:house-complete'); } });
        internals.askIsland(near); return;
      }
    } else await view.assets.homeArt(); // initial boot still waits for all home art
    performance.mark("witch:prep-home");
    await view.assets.whenIdle(true); // (what the view asked for as needed now; the scenery kits and creatures draw on and fade in: the first-load hunt, 2026-10-20, half the cold load)
    performance.mark("witch:prep-idle");
    view.render(0, false);
    await runSliced(refreshSteps(view), "refresh"); // (refresh(this, true), a slice at a time)
    view.prepared = true;
    await internals.compileAll(o.sail);
    internals.askIsland(near);
    view.homeDone = true;
  }

export function treeExtent(view: View, _internals: ViewInternals, _shared: ViewShared): TreeExtent | null {
    const g = view.game, deck = deckOf(g.map, g.tuning);
    if (view.crown && deck) {
      let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity, top = 0;
      for (const l of view.crown.crown.lobes) {
        const p = fromPlan({ x: deck.x, z: deck.z }, l.x, l.z);
        x0 = Math.min(x0, p.x - l.r); x1 = Math.max(x1, p.x + l.r); z0 = Math.min(z0, p.z - l.r); z1 = Math.max(z1, p.z + l.r); top = Math.max(top, l.y + l.r);
      }
      if (Number.isFinite(x0)) return { x: (x0 + x1) / 2, z: (z0 + z1) / 2, height: deck.h + top, width: x1 - x0 };
    }
    const a = view.assets, th = g.map.treehouse;
    return a.home.treehouse ? { x: th.x, z: th.z, height: a.treehouse.base.y * view.mpp, width: (a.treehouse.atlas.frames[0]?.w ?? 0) * view.mpp } : null;
  }

export function askIsland(view: View, _internals: ViewInternals, _shared: ViewShared, near: Map<number, number>): void {
    // Each legend's carving (render/legendCarving.ts: 10-80 ms a kind) made in idle time now, not the first time she comes near one.
    warmCarvings(view.game.map.legendClearings.map(c => AREA_TYPES[view.game.map.typeOf(c.cell[0], c.cell[1])].creature));
    if (view.quick) return; // ?quick=1 (the CI smoke test): only what's needed, as it's needed
    // (the zoo, every island its own type and kind, dozens of them: each island's creatures and sleeping legend with its trees,
    // nearest first, not every type's trees ahead of any creature, or the island she's on waits behind the whole zoo's)
    // (only its islands found: one not found yet is a lake, and the streets are bare, so their cells' types grow nothing; a typical
    // player's zoo is home's ten and a few, not all 64: tools/zoo/perf.cjs)
    if (view.game.map.zoo?.layout) { const m = view.game.map, shown = new Set(m.cells.map(([cx, cy]) => m.typeOf(cx, cy))); for (const [t] of [...near].filter(([t]) => shown.has(t)).sort((a, b) => a[1] - b[1])) { view.assets.prefetchType(t); const sp = AREA_TYPES[t]?.creature; if (sp) { view.assets.creatureArt(sp); view.assets.sleepArt(sp); } } return; }
    for (const [t] of [...near].sort((a, b) => a[1] - b[1])) view.assets.prefetchType(t);
    // The island's own creatures' art ahead (the map's area types' and the night's legends'), not every species' (Ed's log,
    // 2026-10-14: the audio under-ran in bursts through the first ten minutes of every night; the workers were baking all sixty
    // species, 1 to 14 s each, on every core but the page's, with the audio thread starved among them: a wave landing's own art,
    // the woken looks and the party witches, then queued behind them).
    const own = new Set<string>(view.game.map.legendKinds);
    for (const [t] of near) { const sp = AREA_TYPES[t]?.creature; if (sp) own.add(sp); }
    for (const sp of own) view.assets.creatureArt(sp);
  }

export function* setGameSteps(view: View, internals: ViewInternals, shared: ViewShared, game: Game): Steps {
    internals.shaderEpoch++; // a previous island's background completion cannot release this island's gate
    const t = game.tuning, old = view.island;
    // The last night's: the scenery's rebuild under way, the creatures' caches, the candles; its area types' batches and their
    // shadows, and its soundsystems' (their atlases the art's: freed once, by reseat).
    cancelRefresh(view); resetCreatureCaches(); forgetCandles(view);
    internals.potionObservers.dispose(view);
    for (const b of view.typeBatches.values()) { view.scene.remove(...b.meshes); b.release(); }
    view.typeBatches.clear();
    for (const [k, b] of view.trunkShadowBatches) if (typeof k === "number") { view.scene.remove(...b.meshes); b.dispose(); view.trunkShadowBatches.delete(k); }
    view.trunkShadowBatches.delete("markers"); // (the old island's runestones': let go with it)
    internals.partyView.gen?.reset();
    for (const b of view.appearing.keys()) b.appearU.value = 1; // (a kept batch caught fading in shows whole)
    view.assets.reseat({ seed: game.seed, typeSeed: islandArtSeed(t.map?.world ?? 0, t.map?.island ?? "home"), typeBiome: biomeKey(t.map?.island ?? "home", t.map?.world ?? 0, t.biomeLooks), treehouse: shared.treehouseArtId(game) });
    view.game = game;
    Object.assign(view, shared.nightState(t));
    const M = moodOf(t);
    view.areaMoods = M ? new AreaMoods(M) : null;
    // The new island, off the scene.
    const island = new IslandLayers(view.scene, { game, style: view.style, mpp: view.mpp, maxTexture: view.renderer.capabilities.maxTextureSize, assets: view.assets, deck: deckOf(game.map, t) }, false);
    yield* island.groundSteps(); yield "paths"; yield* island.pathSteps(); yield; island.buildTreehouse(); yield* island.markerSteps(); yield "ley"; island.buildLey(); yield; island.buildDancefloor();
    yield* island.finishSteps();
    const tb = view.style.biome ?? view.assets.typeBiome, tufts = tb !== internals.tuftBiome ? yield* GrassView.tufts(tb ? { ...view.style, biome: tb } : view.style, shared.islandTypes(game.map)) : null; // (another biome's: drawn again, a step an area type)
    yield "swap";
    island.minimap.on = old.minimap.on;
    { const cs = t.canopyShadow; island.ground.setCanopyShadow(cs.on ? cs.strength : 0, cs.height, cs.cover, cs.wind); }
    island.ley.scale(internals.leyBase);
    // What draws on the ground re-pointed at the new one before the old is let go.
    view.beachView.setGround(island.ground);
    if (tufts) { view.grass.setArt(tufts); internals.tuftBiome = tb; }
    view.grass.setMap(game.map, game.forest, (island.ground.mesh.material as THREE.ShaderMaterial).uniforms);
    // The swap: the new island in (its hills the field in use), then the old let go.
    view.island = island;
    island.attach();
    old.dispose();
    // The house's rooms with this island's treehouse's (render/houseRooms.ts: the same rooms on any island, placed by its treehouse).
    const rooms = !!deckOf(game.map, t)?.house?.rooms;
    if (rooms && view.houseRooms) view.houseRooms.reset();
    else if (rooms) { view.houseRooms = new HouseRoomsView(); view.scene.add(...view.houseRooms.meshes); }
    else if (view.houseRooms) { view.scene.remove(...view.houseRooms.meshes); view.houseRooms.dispose(); view.houseRooms = null; }
    if (!game.map.zoo?.layout && view.zooExitTag) { view.zooExitTag.dispose(); view.zooExitTag = null; }
    internals.ensureCrown(game);
    // Every other part that keeps something of a night.
    internals.strings.setGame(game); view.leashView.setGame(game); internals.lasers.setGame(game); internals.borders.setGame(game); view.inviteView.setGame(game);
    view.partyObjects.reset(); view.rig?.reset(); internals.holograms.reset(); internals.glades.reset(); internals.wisps?.reset();
    view.clouds.reseed(game.seed); view.lightRings?.reseed(game.map.seed);
    view.fireworks.reset(); view.swoopTrails.reset(); view.spellFx.reset(); internals.trail.newNight(); view.combatLight.reset(); view.occlusion.reset();
    view.assets.prefetchType(HOME_LOOK); // home's meadow floor (no trees ask for it)
  }

export function retype(view: View, _internals: ViewInternals, _shared: ViewShared, types: number[]): void {
    for (const t of types) {
      const b = view.typeBatches.get(t);
      if (b) { view.scene.remove(...b.meshes); b.release(); b.atlas.albedo.dispose(); b.atlas.normal.dispose(); view.typeBatches.delete(t); } // (the island's art let go: tonight's is the type's now)
      const s = view.trunkShadowBatches.get(t);
      if (s) { view.scene.remove(...s.meshes); s.dispose(); view.trunkShadowBatches.delete(t); }
      view.noFade.add(t);
    }
  }
