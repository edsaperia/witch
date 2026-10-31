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

export function* build(a4ViewHost: View, a4PrivateHost: ViewInternals, a4SharedHost: ViewShared): Steps {
    const game = a4ViewHost.game, t = game.tuning, style = a4ViewHost.style, M = moodOf(t), deckOn = deckOf(game.map, t); // (the treehouse Ent holding the deck, rules/treehouse.ts; else the old treehouse)
    yield "island";
    // (Each island layer made at its old place among the View's own: three.js breaks draw-order ties by creation order.)
    a4ViewHost.island = new IslandLayers(a4ViewHost.scene, { game, style, mpp: a4ViewHost.mpp, maxTexture: a4ViewHost.renderer.capabilities.maxTextureSize, assets: a4ViewHost.assets, deck: deckOn });
    yield* a4ViewHost.island.groundSteps();
    yield "sky";
    a4ViewHost.sky = new Sky(t.sky, t.moon.disc);
    a4ViewHost.scene.add(a4ViewHost.sky.mesh);
    a4ViewHost.clouds = new Clouds(t.sky.clouds, t.sky.lightning, game.seed);
    a4ViewHost.scene.add(a4ViewHost.clouds.mesh, a4ViewHost.clouds.bolt);
    a4PrivateHost.smoke = new Smoke(t.smoke);
    { const S = lakeKnobs(t).steam; a4PrivateHost.steam = new Smoke({ ...t.smoke, on: S.on, rate: 1.2, life: S.life, rise: S.rise, speed: (S.rise / S.life) * 1.6, size: S.size, grow: 2, opacity: S.opacity, warm: 0, perFire: 8, maxFires: 12 }); }
    a4ViewHost.scene.add(a4PrivateHost.smoke.mesh, a4PrivateHost.steam.mesh);
    a4ViewHost.assets.onFloor = (type, tile) => a4ViewHost.ground.setFloor(type, tile);
    a4ViewHost.assets.prefetchType(HOME_LOOK); // home's meadow floor (no trees ask for it)
    const cs = t.canopyShadow;
    a4ViewHost.ground.setCanopyShadow(cs.on ? cs.strength : 0, cs.height, cs.cover, cs.wind);
    a4ViewHost.shadows = new ShadowBatch(t.shadows.strength);
    a4ViewHost.shadows.mesh.visible = t.shadows.on;
    a4ViewHost.scene.add(a4ViewHost.shadows.mesh);
    if (t.mist.on && t.mist.strength > 0) {
      a4ViewHost.mist = new Mist(M?.mist ?? t.mist.strength, t.mist.height, t.mist.wind, a4ViewHost.post.scene.depthTexture, a4ViewHost.post.fxSize); // (the effects layer is half the scene's size: post.ts)
      a4ViewHost.post.fxScene = new THREE.Scene(); a4ViewHost.post.fxScene.add(a4ViewHost.mist.mesh);
    }
    if (t.lightRings?.on && (t.lightRings.strength > 0 || t.lightRings.gloryStrength > 0) && !t.bare) {
      a4ViewHost.lightRings = new LightRings(t.lightRings, a4ViewHost.post.scene.depthTexture, game.map.seed);
      (a4ViewHost.post.fxScene ??= new THREE.Scene()).add(a4ViewHost.lightRings.mesh);
    }
    // (no haze in the bare view; the mood's fog comes nearer than the culling's far edge, which stays t.haze.far)
    LIGHT_UNIFORMS.uHazeRange.value.set(t.bare ? 1e5 : M?.hazeNear ?? t.haze.near, t.bare ? 2e5 : M?.hazeFar ?? t.haze.far);
    yield "paths";
    yield* a4ViewHost.island.pathSteps();
    yield "witch";

    // The witch is depth-tested like everything else, drawn after it; where something still hides
    // her, a silhouette in her glow colour shows through, and tall things in front of her fade.
    const O = t.occlusion;
    a4ViewHost.witchBatch = a4ViewHost.makeWitchBatch();
    a4ViewHost.backdrop = new StationBackdrop(a4ViewHost.scene);
    SPRITE_UNIFORMS.uOcc.value.set(O.fadeOpacity, O.edge, O.minHeight, O.on ? 1 : 0);
    // The treehouse, home: its base and its crown (the crown only from the treetops), its trunk's
    // foot on its spot. It fades like other tall things when she's behind it.
    {
      // (Placed each frame by placeTreehouse: where it stands depends on the camera's angle.)
      // With the deck's map table (rules/treehouse.ts): the sea chart's live miniature on its top (render/mapTable.ts).
      a4ViewHost.island.buildTreehouse();
      // The house's placeholder rooms off the hub (render/houseRooms.ts; Ed, 2026-10-19).
      if (deckOn?.house?.rooms) { a4ViewHost.houseRooms = new HouseRoomsView(); a4ViewHost.scene.add(...a4ViewHost.houseRooms.meshes); }
      a4PrivateHost.ensureCrown(game); // (the great oak's crown over it: render/crown.ts)
    }
    // Spawn markers: gameplay (always drawn in range, never budget-culled).
    yield* a4ViewHost.island.markerSteps();
    yield "grass";
    a4ViewHost.scene.add(a4ViewHost.markerFx.group, a4ViewHost.waveNumbers.mesh);
    // The ground cover: tufts round the witch, in ground mode.
    a4PrivateHost.tuftBiome = style.biome ?? a4ViewHost.assets.typeBiome; // (in the island's biome: art/flora/biomes.js; ?biome= over it)
    const tufts = yield* GrassView.tufts(a4PrivateHost.tuftBiome ? { ...style, biome: a4PrivateHost.tuftBiome } : style, a4SharedHost.islandTypes(game.map));
    yield;
    a4ViewHost.grass = new GrassView(game.map, t, a4ViewHost.mpp, style, game.forest, (a4ViewHost.ground.mesh.material as THREE.ShaderMaterial).uniforms, tufts);
    yield "parts";
    a4ViewHost.scene.add(a4ViewHost.grass.mesh);
    a4ViewHost.scene.add(a4ViewHost.spellFx.trail);
    a4ViewHost.magic.legacyParty=(x,y,z,age)=>{a4ViewHost.spellFx.reset();a4ViewHost.spellFx.partyBurst(x,y,z,a4ViewHost.game.herTime-age);a4ViewHost.spellFx.update(a4ViewHost.game,a4ViewHost.game.herTime,y);};
    a4PrivateHost.trail = new WitchTrail(game.tuning.trail ?? TRAIL_DEFAULT);
    a4ViewHost.scene.add(a4PrivateHost.trail.mesh);
    bridgeNativeObject(a4PrivateHost.trail.mesh,"flightTrail");
    bridgeNativeObject(a4ViewHost.spellFx.trail,"broomSpark");
    // The dancefloor's speakers: their batch comes with their art (drawSpeakers).
    a4ViewHost.assets.speakerArt();
    a4ViewHost.propBatch = new SpriteBatch(a4ViewHost.assets.props, a4ViewHost.mpp, { fade: true }).name("props");
    // Berries: a small shiny dark-red berry, drawn here (a highlight upper left, a darker side),
    // always drawn (gameplay), unlit so it reads at night; its halo and glints are in leash.ts.
    a4ViewHost.berryBatch = new SpriteBatch(packAtlas([berrySprite(t.berries.colour)], 64), a4ViewHost.mpp, { unlit: true });
    a4ViewHost.scene.add(...a4ViewHost.berryBatch.meshes);
    a4ViewHost.scene.add(...a4ViewHost.propBatch.meshes);
    yield "party";
    a4PrivateHost.partyView = new PartyView(a4ViewHost.assets.soundsystems, a4ViewHost.mpp, new SoundsystemGenView(a4ViewHost.scene, a4ViewHost.assets, a4ViewHost.mpp, a4ViewHost.renderer, a4ViewHost.camera, a4ViewHost.trunkShadowBatches));
    a4PrivateHost.strings = new StringLightsView(a4ViewHost.scene, game);
    a4PrivateHost.strings.setCrown(a4ViewHost.crown); // (the crown's lights, made before the strings were)
    a4ViewHost.leashView = new LeashView(a4ViewHost.scene, game);
    a4ViewHost.post.sharp = a4ViewHost.leashView.stackMask; // (her stack kept sharp through the tilt-shift: Ed, 2026-10-27)
    a4ViewHost.leashView.herOffset = a4ViewHost.herOffset;
    a4ViewHost.rig = rigOn() ? new RigView(a4ViewHost.scene, a4ViewHost.assets, a4ViewHost.mpp) : null; // the live rig (#79): on unless ?rig=0
    a4PrivateHost.lasers = new Lasers(a4ViewHost.scene, game);
    yield "holograms";
    const glyphs = yield* SigilHolograms.glyphs();
    yield;
    a4PrivateHost.holograms = new SigilHolograms(t.holograms, glyphs);
    a4ViewHost.scene.add(a4PrivateHost.holograms.group);
    bridgeNativeObject(a4PrivateHost.holograms.group,"hologram");
    yield "fireworks";
    a4ViewHost.fireworks = new Fireworks(SPRITE_UNIFORMS.uRes, a4ViewHost.mpp);
    a4ViewHost.scene.add(a4ViewHost.fireworks.mesh);
    bridgeNativeObject(a4ViewHost.fireworks.mesh,"firework");
    yield "ley";
    a4ViewHost.island.buildLey();
    a4PrivateHost.leyBase = M?.leyBright ?? 1;
    a4ViewHost.ley.scale(a4PrivateHost.leyBase);
    a4PrivateHost.leyRgb = M?.leyRgb ? new THREE.Vector3(...[1, 3, 5].map(i => parseInt(M.leyRgb!.slice(i, i + 2), 16) / 255)) : null;
    a4PrivateHost.glades = new Glades(t.glades);
    a4ViewHost.scene.add(a4PrivateHost.glades.points);
    if (t.wisps?.on) { a4PrivateHost.wisps = new Wisps(t.wisps); a4ViewHost.scene.add(a4PrivateHost.wisps.points); }
    yield "partyObjects";
    a4ViewHost.partyObjects = new PartyObjectsView(a4ViewHost.scene, a4ViewHost.assets, a4ViewHost.mpp);
    a4ViewHost.partyWitchView = new PartyWitchView(a4ViewHost.scene, a4ViewHost.assets, a4ViewHost.mpp, t.witch);
    a4ViewHost.beachView = new BeachView(a4ViewHost.scene, a4ViewHost.assets, a4ViewHost.ground, a4ViewHost.mpp, t.witch);
    a4PrivateHost.lakeShore = new LakeShoreView(a4ViewHost.scene, a4ViewHost.mpp);
    a4ViewHost.swoopTrails = new SwoopTrails(game.tuning.swoopTrail ?? SWOOP_TRAIL_DEFAULT);
    a4ViewHost.scene.add(a4ViewHost.swoopTrails.mesh);
    bridgeNativeObject(a4ViewHost.swoopTrails.mesh,"partySwoop");
    bridgeNativeObject(a4ViewHost.markerFx.group,"runestone");
    a4ViewHost.inviteView = new InviteView(game);
    a4ViewHost.inviteView.herOffset = a4ViewHost.herOffset;
    // The 💌s and the invite rings hidden as the animals are, by what stands in front of them and the smoke (render/occlusion.ts;
    // Ed, 2026-10-19). ?occlusion=off: drawn over everything, as before, to compare.
    yield "occlusion";
    a4ViewHost.occlusion = new OcclusionProbes(a4ViewHost.scene, a4ViewHost.renderer, a4ViewHost.camera, a4PrivateHost.smoke);
    a4ViewHost.occlusion.on = typeof location === "undefined" || new URLSearchParams(location.search).get("occlusion") !== "off";
    a4ViewHost.inviteView.probes = a4ViewHost.occlusion;
    a4ViewHost.inviteView.onVanished = (x, z) => a4ViewHost.edgeSparkle(x, z);
    yield "stateMarks";
    a4ViewHost.stateMarks = new StateMarks(a4ViewHost.scene, a4ViewHost.mpp);
    yield "borders";
    a4PrivateHost.borders = new BorderView(a4ViewHost.scene, game);
    yield;
    a4PrivateHost.soundBatch = new SpriteBatch(a4ViewHost.assets.soundsystems, a4ViewHost.mpp, { solid: true }).name("soundsystems");
    a4ViewHost.scene.add(...a4PrivateHost.soundBatch.meshes);
    yield "dancefloor";
    a4ViewHost.island.buildDancefloor();
    yield* a4ViewHost.island.finishSteps();

    // A shadow under the witch, so her height reads: soft (multiplied over the ground).
    const sm = new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, blending: THREE.CustomBlending, blendSrc: THREE.ZeroFactor, blendDst: THREE.SrcColorFactor,
      vertexShader: a4SharedHost.SHADOW_VERT, uniforms: { ...HEIGHT_UNIFORMS, uShadowDebug: SHADOW_DEBUG },
      fragmentShader: "uniform float uShadowDebug; varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; float r = dot(p, p); if (r > 1.0) discard; gl_FragColor = uShadowDebug > 0.5 ? vec4(1.0, 0.0, 1.0, 1.0) : vec4(vec3(1.0 - 0.75 * (1.0 - r) * (1.0 - r)), 1.0); }",
    });
    // Finely divided, each point laid on the rolling ground, and drawn a little toward the camera: one
    // flat quad on a slope (Ed, v289) sank into the ground's coarser grid in places, a ragged blob.
    sm.polygonOffset = true; sm.polygonOffsetFactor = -2; sm.polygonOffsetUnits = -4;
    a4ViewHost.shadow = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.7, 6, 3).rotateX(-Math.PI / 2), sm);
    a4ViewHost.shadow.renderOrder = 1;
    a4ViewHost.scene.add(a4ViewHost.shadow);
  }

export async function prepare(a4ViewHost: View, a4PrivateHost: ViewInternals, a4SharedHost: ViewShared, o: { sail?: boolean; dive?: (x: number, z: number) => number; track?: [number, number, number, number][] }): Promise<void> {
    performance.mark("witch:prep-start");
    if (o.sail) { a4ViewHost.homeDone = false; a4ViewHost.shaderDrawStatus.active = true; a4ViewHost.shaderDrawStatus.skipped = {}; a4ViewHost.shaderDrawStatus.fallback = {}; a4ViewHost.shaderDrawStatus.submitted = {}; if (!a4PrivateHost.shaderChartLanding) a4ViewHost.startLandingShaderGrace(); }
    a4PrivateHost.makeLoadingMist();
    { // tonight's own trees, if drawn ahead and kept (app/landingBake.ts), for the swap before she sees the island (retype)
      const m = a4ViewHost.game.map, types = new Set<number>();
      for (let y = m.first; y < m.first + m.n; y++) for (let x = m.first; x < m.first + m.n; x++) types.add(m.typeOf(x, y));
      a4ViewHost.assets.tonight(types);
    }
    // Every area type the map has, drawn in the background so the forest ahead is ready however fast she flies; the
    // nearest her first. Only the map's own (Ed, 2026-10-12: an island grows only its roster's species, rules/map.ts): a type
    // it hasn't is never drawn, and home's area is its meadow (HOME_LOOK, asked for by the house), not its type's trees.
    // By the treehouse, where she wakes and sits at her decks (Ed, 2026-10-24, the loading mist: "If loading starts with areas
    // closer to the treehouse, this will look fine"): each type by its nearest area to the house; a sail's, to the dive's view.
    const m = a4ViewHost.game.map, h = m.treehouse, near = new Map<number, number>();
    for (let y = m.first; y < m.first + m.n; y++) for (let x = m.first; x < m.first + m.n; x++) {
      if (x === m.centreCell[0] && y === m.centreCell[1]) continue;
      const s = m.siteOf(x, y), t = m.typeOf(x, y), d = o.dive ? o.dive(s.x, s.z) : Math.hypot(s.x - h.x, s.z - h.z);
      if (!(near.get(t)! <= d)) near.set(t, d);
    }
    if (o.dive) {
      a4ViewHost.homeDone = false;
      a4ViewHost.prepared = true;
      a4PrivateHost.askIsland(near); // (the workers drawing the dive's areas while the shaders link)
      await a4PrivateHost.compileAll(o.sail);
      // The ground where the dive first sees the island (Ed, 2026-10-24: the dive's view needs the ground; Echo's island black through
      // the descent, its tiles not drawn yet): the first TRACK_AHEAD metres of its track in from the sea, TRACK_REACH each side, a few
      // tiles a frame under the chart; the rest of it as the dive goes, the view's own each frame (render/view/ahead.ts).
      const leg = o.track?.[0];
      if (leg && !a4ViewHost.shaderLandingLimited) {
        const [x0, z0] = leg, r = { minX: x0 - a4SharedHost.TRACK_REACH, maxX: x0 + a4SharedHost.TRACK_REACH, minZ: z0 - a4SharedHost.TRACK_AHEAD, maxZ: z0 + a4SharedHost.TRACK_REACH };
        while (a4ViewHost.ground.fill(a4ViewHost.renderer, r, x0, z0, 6) > 0) await nextFrame();
      }
      performance.mark("witch:prep-track");
      const homeEpoch = a4PrivateHost.shaderEpoch;
      void a4PrivateHost.buildHome(homeEpoch).catch(e => { console.error("the house's start after a sail went wrong", e); }).finally(() => { if (homeEpoch === a4PrivateHost.shaderEpoch) { a4ViewHost.homeDone = true; performance.mark('landing:house-complete'); } });
      return;
    }
    await runSliced(a4PrivateHost.warmSteps(), "warm"); // (the first frame's own lazy work made ahead, a slice at a time)
    performance.mark("witch:prep-warm");
    a4ViewHost.render(0, false);
    drawCreatures(a4ViewHost);
    { const rect = viewRect(a4ViewHost, a4ViewHost.game.tuning.haze.near, 20), w = a4ViewHost.game.witch; // (the ground round the start, a few tiles a frame: render/slices.ts)
      while (a4ViewHost.ground.fill(a4ViewHost.renderer, rect, w.x, w.z, 6) > 0) await nextFrame(); }
    performance.mark("witch:prep-ground");
    if (o.sail) {
      while (!a4ViewHost.assets.homeReady && performance.now() < a4PrivateHost.shaderLandingDeadline) { a4ViewHost.assets.work(4); await nextFrame(); }
      if (!a4ViewHost.assets.homeReady) {
        a4PrivateHost.armLimitedLanding(); a4ViewHost.prepared = true; await a4PrivateHost.compileAll(true);
        const homeEpoch = a4PrivateHost.shaderEpoch;
        void a4PrivateHost.buildHome(homeEpoch).catch(e => { console.error("the house's start after a sail went wrong", e); }).finally(() => { if (homeEpoch === a4PrivateHost.shaderEpoch) { a4ViewHost.homeDone = true; performance.mark('landing:house-complete'); } });
        a4PrivateHost.askIsland(near); return;
      }
    } else await a4ViewHost.assets.homeArt(); // initial boot still waits for all home art
    performance.mark("witch:prep-home");
    await a4ViewHost.assets.whenIdle(true); // (what the view asked for as needed now; the scenery kits and creatures draw on and fade in: the first-load hunt, 2026-10-20, half the cold load)
    performance.mark("witch:prep-idle");
    a4ViewHost.render(0, false);
    await runSliced(refreshSteps(a4ViewHost), "refresh"); // (refresh(this, true), a slice at a time)
    a4ViewHost.prepared = true;
    await a4PrivateHost.compileAll(o.sail);
    a4PrivateHost.askIsland(near);
    a4ViewHost.homeDone = true;
  }

export function treeExtent(a4ViewHost: View, _a4PrivateHost: ViewInternals, _a4SharedHost: ViewShared): TreeExtent | null {
    const g = a4ViewHost.game, deck = deckOf(g.map, g.tuning);
    if (a4ViewHost.crown && deck) {
      let x0 = Infinity, x1 = -Infinity, z0 = Infinity, z1 = -Infinity, top = 0;
      for (const l of a4ViewHost.crown.crown.lobes) {
        const p = fromPlan({ x: deck.x, z: deck.z }, l.x, l.z);
        x0 = Math.min(x0, p.x - l.r); x1 = Math.max(x1, p.x + l.r); z0 = Math.min(z0, p.z - l.r); z1 = Math.max(z1, p.z + l.r); top = Math.max(top, l.y + l.r);
      }
      if (Number.isFinite(x0)) return { x: (x0 + x1) / 2, z: (z0 + z1) / 2, height: deck.h + top, width: x1 - x0 };
    }
    const a = a4ViewHost.assets, th = g.map.treehouse;
    return a.home.treehouse ? { x: th.x, z: th.z, height: a.treehouse.base.y * a4ViewHost.mpp, width: (a.treehouse.atlas.frames[0]?.w ?? 0) * a4ViewHost.mpp } : null;
  }

export function askIsland(a4ViewHost: View, _a4PrivateHost: ViewInternals, _a4SharedHost: ViewShared, near: Map<number, number>): void {
    // Each legend's carving (render/legendCarving.ts: 10-80 ms a kind) made in idle time now, not the first time she comes near one.
    warmCarvings(a4ViewHost.game.map.legendClearings.map(c => AREA_TYPES[a4ViewHost.game.map.typeOf(c.cell[0], c.cell[1])].creature));
    if (a4ViewHost.quick) return; // ?quick=1 (the CI smoke test): only what's needed, as it's needed
    // (the zoo, every island its own type and kind, dozens of them: each island's creatures and sleeping legend with its trees,
    // nearest first, not every type's trees ahead of any creature, or the island she's on waits behind the whole zoo's)
    // (only its islands found: one not found yet is a lake, and the streets are bare, so their cells' types grow nothing; a typical
    // player's zoo is home's ten and a few, not all 64: tools/zoo/perf.cjs)
    if (a4ViewHost.game.map.zoo?.layout) { const m = a4ViewHost.game.map, shown = new Set(m.cells.map(([cx, cy]) => m.typeOf(cx, cy))); for (const [t] of [...near].filter(([t]) => shown.has(t)).sort((a, b) => a[1] - b[1])) { a4ViewHost.assets.prefetchType(t); const sp = AREA_TYPES[t]?.creature; if (sp) { a4ViewHost.assets.creatureArt(sp); a4ViewHost.assets.sleepArt(sp); } } return; }
    for (const [t] of [...near].sort((a, b) => a[1] - b[1])) a4ViewHost.assets.prefetchType(t);
    // The island's own creatures' art ahead (the map's area types' and the night's legends'), not every species' (Ed's log,
    // 2026-10-14: the audio under-ran in bursts through the first ten minutes of every night; the workers were baking all sixty
    // species, 1 to 14 s each, on every core but the page's, with the audio thread starved among them: a wave landing's own art,
    // the woken looks and the party witches, then queued behind them).
    const own = new Set<string>(a4ViewHost.game.map.legendKinds);
    for (const [t] of near) { const sp = AREA_TYPES[t]?.creature; if (sp) own.add(sp); }
    for (const sp of own) a4ViewHost.assets.creatureArt(sp);
  }

export function* setGameSteps(a4ViewHost: View, a4PrivateHost: ViewInternals, a4SharedHost: ViewShared, game: Game): Steps {
    a4PrivateHost.shaderEpoch++; // a previous island's background completion cannot release this island's gate
    const t = game.tuning, old = a4ViewHost.island;
    // The last night's: the scenery's rebuild under way, the creatures' caches, the candles; its area types' batches and their
    // shadows, and its soundsystems' (their atlases the art's: freed once, by reseat).
    cancelRefresh(a4ViewHost); resetCreatureCaches(); forgetCandles(a4ViewHost);
    a4PrivateHost.potionObservers.dispose(a4ViewHost);
    for (const b of a4ViewHost.typeBatches.values()) { a4ViewHost.scene.remove(...b.meshes); b.release(); }
    a4ViewHost.typeBatches.clear();
    for (const [k, b] of a4ViewHost.trunkShadowBatches) if (typeof k === "number") { a4ViewHost.scene.remove(...b.meshes); b.dispose(); a4ViewHost.trunkShadowBatches.delete(k); }
    a4ViewHost.trunkShadowBatches.delete("markers"); // (the old island's runestones': let go with it)
    a4PrivateHost.partyView.gen?.reset();
    for (const b of a4ViewHost.appearing.keys()) b.appearU.value = 1; // (a kept batch caught fading in shows whole)
    a4ViewHost.assets.reseat({ seed: game.seed, typeSeed: islandArtSeed(t.map?.world ?? 0, t.map?.island ?? "home"), typeBiome: biomeKey(t.map?.island ?? "home", t.map?.world ?? 0, t.biomeLooks), treehouse: a4SharedHost.treehouseArtId(game) });
    a4ViewHost.game = game;
    Object.assign(a4ViewHost, a4SharedHost.nightState(t));
    const M = moodOf(t);
    a4ViewHost.areaMoods = M ? new AreaMoods(M) : null;
    // The new island, off the scene.
    const island = new IslandLayers(a4ViewHost.scene, { game, style: a4ViewHost.style, mpp: a4ViewHost.mpp, maxTexture: a4ViewHost.renderer.capabilities.maxTextureSize, assets: a4ViewHost.assets, deck: deckOf(game.map, t) }, false);
    yield* island.groundSteps(); yield "paths"; yield* island.pathSteps(); yield; island.buildTreehouse(); yield* island.markerSteps(); yield "ley"; island.buildLey(); yield; island.buildDancefloor();
    yield* island.finishSteps();
    const tb = a4ViewHost.style.biome ?? a4ViewHost.assets.typeBiome, tufts = tb !== a4PrivateHost.tuftBiome ? yield* GrassView.tufts(tb ? { ...a4ViewHost.style, biome: tb } : a4ViewHost.style, a4SharedHost.islandTypes(game.map)) : null; // (another biome's: drawn again, a step an area type)
    yield "swap";
    island.minimap.on = old.minimap.on;
    { const cs = t.canopyShadow; island.ground.setCanopyShadow(cs.on ? cs.strength : 0, cs.height, cs.cover, cs.wind); }
    island.ley.scale(a4PrivateHost.leyBase);
    // What draws on the ground re-pointed at the new one before the old is let go.
    a4ViewHost.beachView.setGround(island.ground);
    if (tufts) { a4ViewHost.grass.setArt(tufts); a4PrivateHost.tuftBiome = tb; }
    a4ViewHost.grass.setMap(game.map, game.forest, (island.ground.mesh.material as THREE.ShaderMaterial).uniforms);
    // The swap: the new island in (its hills the field in use), then the old let go.
    a4ViewHost.island = island;
    island.attach();
    old.dispose();
    // The house's rooms with this island's treehouse's (render/houseRooms.ts: the same rooms on any island, placed by its treehouse).
    const rooms = !!deckOf(game.map, t)?.house?.rooms;
    if (rooms && a4ViewHost.houseRooms) a4ViewHost.houseRooms.reset();
    else if (rooms) { a4ViewHost.houseRooms = new HouseRoomsView(); a4ViewHost.scene.add(...a4ViewHost.houseRooms.meshes); }
    else if (a4ViewHost.houseRooms) { a4ViewHost.scene.remove(...a4ViewHost.houseRooms.meshes); a4ViewHost.houseRooms.dispose(); a4ViewHost.houseRooms = null; }
    if (!game.map.zoo?.layout && a4ViewHost.zooExitTag) { a4ViewHost.zooExitTag.dispose(); a4ViewHost.zooExitTag = null; }
    a4PrivateHost.ensureCrown(game);
    // Every other part that keeps something of a night.
    a4PrivateHost.strings.setGame(game); a4ViewHost.leashView.setGame(game); a4PrivateHost.lasers.setGame(game); a4PrivateHost.borders.setGame(game); a4ViewHost.inviteView.setGame(game);
    a4ViewHost.partyObjects.reset(); a4ViewHost.rig?.reset(); a4PrivateHost.holograms.reset(); a4PrivateHost.glades.reset(); a4PrivateHost.wisps?.reset();
    a4ViewHost.clouds.reseed(game.seed); a4ViewHost.lightRings?.reseed(game.map.seed);
    a4ViewHost.fireworks.reset(); a4ViewHost.swoopTrails.reset(); a4ViewHost.spellFx.reset(); a4PrivateHost.trail.newNight(); a4ViewHost.combatLight.reset(); a4ViewHost.occlusion.reset();
    a4ViewHost.assets.prefetchType(HOME_LOOK); // home's meadow floor (no trees ask for it)
  }

export function retype(a4ViewHost: View, _a4PrivateHost: ViewInternals, _a4SharedHost: ViewShared, types: number[]): void {
    for (const t of types) {
      const b = a4ViewHost.typeBatches.get(t);
      if (b) { a4ViewHost.scene.remove(...b.meshes); b.release(); b.atlas.albedo.dispose(); b.atlas.normal.dispose(); a4ViewHost.typeBatches.delete(t); } // (the island's art let go: tonight's is the type's now)
      const s = a4ViewHost.trunkShadowBatches.get(t);
      if (s) { a4ViewHost.scene.remove(...s.meshes); s.dispose(); a4ViewHost.trunkShadowBatches.delete(t); }
      a4ViewHost.noFade.add(t);
    }
  }
