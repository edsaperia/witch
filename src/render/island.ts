// The island's own layers (docs/plans/sail-without-reload.md, A2 and PR 4a): everything the View builds from one island's map,
// gathered under one root group so the island can be let go of whole (dispose) and another built in its place: the View builds
// its first island through it as it's made, and each night after's off the scene, swapped in before the last is let go (setGame).
//
// Built in stages, each called by the View where it made that layer before: three.js breaks ties in its draw order by
// material and object id, which is creation order, so each layer is made at its old place among the View's own. Under one
// group the scene's traversal order changes, but the draw order doesn't (the sort keys are the same; the group's render
// order is 0, as the scene's, and its matrix the identity).
import * as THREE from "three";
import type { Game } from "../rules/game";
import { ZooFall, ZooFences } from "./zooFences";
import { ZooInscriptions } from "./zooInscriptions";
import { ZOO_CONFIG } from "../rules/zoo";
import type { Deck } from "../rules/treehouse";
import type { AssetLibrary } from "./assets";
import { Dancefloor } from "./dancefloor";
import { discoArt, discoSettle, Ground } from "./ground";
import type { DiscoDrawn } from "./islandArt";
import { HeightField, useHeightField } from "./height";
import { LeyLines } from "./leylines";
import { glacierMesh, lakeLooksOf } from "./lakeLooks";
import { lakeKnobs } from "../rules/lakes";
import { MapTable } from "./mapTable";
import { MarkerArt } from "./markers";
import type { Atlas } from "./atlas";
import { Minimap } from "./minimap";
import { PathView } from "./paths";
import { asFloor, SPRITE_UNIFORMS, SpriteBatch } from "./sprites";
import { runSync, type Later, type Steps } from "./slices";
import type { Style } from "./style";
import { TrunkShadowBatch } from "./trunkShadows";

/** What an island's layers are made from. */
export interface IslandSource {
  game: Game;
  style: Style;
  /** Metres per art pixel. */
  mpp: number;
  /** The renderer's largest texture (the ground's area texture fits it). */
  maxTexture: number;
  /** The treehouse's art (the island's deck: AssetLibrary's own, left to it). */
  assets: AssetLibrary;
  /** The treehouse deck (rules/treehouse.ts deckOf), or null for the old treehouse. */
  deck: Deck | null;
}

export class IslandLayers {
  /** Everything of the island's in the scene, under one group. */
  readonly root = new THREE.Group();
  heights!: HeightField;
  ground!: Ground;
  paths!: PathView;
  /** The zoo's gold fences (laid out like the chart only). */
  zooFences?: ZooFences;
  /** The zoo's edge pouring off into space (render/zooFences.ts). */
  zooFall?: ZooFall;
  /** The zoo's inscriptions in the street south of each island. */
  zooWords?: ZooInscriptions;
  treehouseBatch!: SpriteBatch;
  mapTable: MapTable | null = null;
  minimap!: Minimap;
  markerArt!: MarkerArt;
  /** The stones' runes' glow (rank sigils: leash.ranks.stoneGlow, set each frame by render/view/home.ts; 1 otherwise). */
  readonly markerGlow = { value: 1 };
  markerBatch!: SpriteBatch;
  /** The great stumps (runeMarkers.stump), in place of the stones: a floor, under everything standing (render/view/home.ts). */
  readonly stumpBatches = new Map<string, SpriteBatch>();
  /** A great stump's batch (one a baked stump, its own atlas: AssetLibrary.stumpArt), made the first time it's drawn. */
  stumpBatch(id: string, atlas: Atlas, mpp: number): SpriteBatch {
    let b = this.stumpBatches.get(id);
    if (!b) { b = asFloor(new SpriteBatch(atlas, mpp, { scenery: true, flat: true }).name("stump")); this.stumpBatches.set(id, b); this.root.add(...b.meshes); }
    return b;
  }
  /** The runestones' trunk shadows (render/view/home.ts), made as they're first cast. */
  markerShadows: TrunkShadowBatch | null = null;
  ley!: LeyLines;
  dancefloor!: Dancefloor;
  /** The north's lakes' glacier, if the island has any (render/lakeLooks.ts). */
  glacier: THREE.Mesh | null = null;

  /** `attach` false: built off the scene, to be swapped in (attach) once whole (View.setGame: the next island built before the
   *  last is let go, so the shader programs both use are never freed and made again). */
  constructor(readonly scene: THREE.Scene, private src: IslandSource, attach = true) {
    this.root.name = "island";
    if (attach) scene.add(this.root);
  }

  /** Into the scene (an island built off it): the field in use its hills'. */
  attach(): void {
    useHeightField(this.heights);
    this.scene.add(this.root);
  }

  /** The rolling ground, made the field in use and centred on her, and the ground under it. */
  buildGround(): void { runSync(this.groundSteps()); }
  /** buildGround in steps (render/slices.ts): the hills' first fill a few rows at a time, the dancefloor's looks a bake at a time. */
  *groundSteps(): Steps {
    const { game, style, mpp, maxTexture } = this.src, t = game.tuning;
    // The steepest the hills may be: the camera's shallowest pitch at any zoom, ground or treetop (Ed, v289).
    const C = t.camera, pitch = Math.min(C.ground.angleIn, C.ground.angleOut, C.treetop.angleIn, C.treetop.angleOut);
    this.heights = new HeightField(game.map, game.forest, { ...t.ground.hills, maxSlope: Math.tan((pitch * Math.PI) / 180) });
    useHeightField(this.heights);
    yield "heights";
    yield* this.heights.fillSteps(game.witch.x, game.witch.z);
    yield "ground";
    const disco = yield* discoArt(style, game.map.dancefloor.radius, job => this.src.assets.oneOff(job)); // (by an art worker, sliced)
    yield;
    this.ground = new Ground(game.map, game.forest, style, mpp, maxTexture, disco.art);
    this.discoLater = disco.later;
    this.ground.mesh.renderOrder = -1; // first: the grounds' decals go on it before anything stands on it
    this.root.add(this.ground.mesh);
    // the north's lakes' glacier (render/lakeLooks.ts), its peaks under her treetop flight (she can't come down over a lake: #1016)
    const lakes = lakeLooksOf(game.map), ice = lakes && glacierMesh(lakes, game.map.island?.seed ?? game.map.seed, mpp, t.treetopHeight - lakeKnobs(t).glacierClear);
    if (ice) { this.glacier = ice; this.root.add(ice); }
  }

  /** The dancefloor's pictures being drawn by an art worker (groundSteps), put in by finishSteps. */
  private discoLater: Later<DiscoDrawn> | null = null;
  /** The build's last step: what was drawn elsewhere while it went on put in its place (the page has its frames till it's in). */
  *finishSteps(): Steps {
    if (this.discoLater) { yield "finish"; yield* discoSettle(this.src.style, this.ground, this.discoLater); this.discoLater = null; }
  }

  /** The paths, roads, railways and streams. */
  buildPaths(): void { runSync(this.pathSteps()); }
  /** buildPaths in steps (render/slices.ts): the lines a few at a time, the strips' textures a bake at a time. */
  *pathSteps(): Steps {
    const { game, style, mpp } = this.src;
    const made = yield* PathView.prep(game.map, style);
    yield;
    this.paths = new PathView(game.map, style, mpp, game.tuning.pathFade.metres, made);
    this.root.add(this.paths.group);
    // (the zoo's gold fences round its islands: render/zooFences.ts)
    if (game.map.zoo?.layout) {
      this.zooFences = new ZooFences(game.map); this.zooFall = new ZooFall(game.map, ZOO_CONFIG.lip ?? 110);
      this.zooWords = new ZooInscriptions(game.map.zoo.layout, game.map.zoo.blocks, game.map.zoo.layout.reach + (ZOO_CONFIG.margin ?? 120) - 8); // (each island's words in the street: render/zooInscriptions.ts)
      this.root.add(this.zooFences.mesh, this.zooFall.mesh, this.zooWords.group);
    }
  }

  /** The treehouse's batch (placed each frame by placeTreehouse) and the deck's map table, with the deck on. */
  buildTreehouse(): void {
    const { assets, mpp, deck } = this.src;
    this.treehouseBatch = new SpriteBatch(assets.treehouse.atlas, mpp, { fade: true }).name("treehouse");
    this.root.add(...this.treehouseBatch.meshes);
    // The sea chart's live miniature on its top (render/mapTable.ts); the house's map is a drawing (Ed, 2026-10-14).
    if (deck && !deck.house) { this.mapTable = new MapTable(deck.table.r); this.root.add(this.mapTable.mesh); }
  }

  /** The debug minimap and the runestones (gameplay: always drawn in range, never budget-culled). */
  buildMarkers(): void { runSync(this.markerSteps()); }
  /** buildMarkers in steps (render/slices.ts): the stones drawn a stone at a time. */
  *markerSteps(): Steps {
    const { game, style, mpp } = this.src;
    this.minimap = new Minimap(document.body, game.map);
    yield "markers";
    const stones = yield* MarkerArt.stones(style, game.tuning, game.map, job => this.src.assets.oneOff(job)); // (by an art worker, sliced)
    yield;
    this.markerArt = new MarkerArt(style, game.tuning, game.map, stones);
    this.markerBatch = new SpriteBatch(this.markerArt.atlas, mpp, { solid: true, glowGain: this.markerGlow }).name("markers");
    this.root.add(...this.markerBatch.meshes);
  }

  /** The runestones' trunk shadows, made the first time they're asked for. */
  markerShadowBatch(): TrunkShadowBatch {
    if (!this.markerShadows) { this.markerShadows = new TrunkShadowBatch(this.markerArt.atlas); this.root.add(...this.markerShadows.meshes); }
    return this.markerShadows;
  }

  /** The ley lines through the runestones in wave order. */
  buildLey(): void {
    const t = this.src.game.tuning;
    this.ley = new LeyLines(t.leyLines, (x, z) => this.heights.sourceAt(x, z), this.src.game.map);
    this.root.add(...this.ley.meshes);
    this.ley.addMeshes = m => this.root.add(...m); // (the victory lap's outward sparkler, made as it's first needed)
  }

  /** The dancefloor's mirror ball, beam and motes. */
  buildDancefloor(): void {
    this.dancefloor = new Dancefloor(this.src.game.map, this.src.game.tuning, SPRITE_UNIFORMS, this.src.mpp);
    this.root.add(this.dancefloor.ball, this.dancefloor.beam, this.dancefloor.motes);
  }

  /** Take it all out of the scene and let go of everything it made. The treehouse's atlas is the AssetLibrary's, left to it;
   *  the height field stays the one in use until the next is made (nothing is drawn meanwhile). */
  dispose(): void {
    this.scene.remove(this.root);
    this.root.clear();
    this.heights?.dispose();
    this.zooFences?.dispose();
    this.zooFall?.dispose();
    this.zooWords?.dispose();
    this.ground?.dispose();
    this.paths?.dispose();
    this.treehouseBatch?.release();
    this.mapTable?.dispose();
    this.minimap?.dispose();
    this.markerShadows?.dispose();
    this.markerBatch?.release();
    for (const b of this.stumpBatches.values()) b.release(); this.stumpBatches.clear();
    this.markerArt?.dispose();
    this.ley?.dispose();
    this.dancefloor?.dispose();
    if (this.glacier) { this.glacier.geometry.dispose(); (this.glacier.material as THREE.Material).dispose(); }
  }
}
