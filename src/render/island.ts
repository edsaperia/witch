// The island's own layers (docs/plans/sail-without-reload.md, A2 and PR 4a): everything the View builds from one island's map,
// gathered under one root group so the island can be let go of whole (dispose) and, later, another built in its place. Today
// the View builds its one island through it, once, as it's made.
//
// Built in stages, each called by the View where it made that layer before: three.js breaks ties in its draw order by
// material and object id, which is creation order, so each layer is made at its old place among the View's own. Under one
// group the scene's traversal order changes, but the draw order doesn't (the sort keys are the same; the group's render
// order is 0, as the scene's, and its matrix the identity).
import * as THREE from "three";
import type { Game } from "../rules/game";
import type { Deck } from "../rules/treehouse";
import type { AssetLibrary } from "./assets";
import { Dancefloor } from "./dancefloor";
import { Ground } from "./ground";
import { HeightField, useHeightField } from "./height";
import { LeyLines } from "./leylines";
import { MapTable } from "./mapTable";
import { MarkerArt } from "./markers";
import { Minimap } from "./minimap";
import { PathView } from "./paths";
import { SPRITE_UNIFORMS, SpriteBatch } from "./sprites";
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
  treehouseBatch!: SpriteBatch;
  mapTable: MapTable | null = null;
  minimap!: Minimap;
  markerArt!: MarkerArt;
  markerBatch!: SpriteBatch;
  /** The runestones' trunk shadows (render/view/home.ts), made as they're first cast. */
  markerShadows: TrunkShadowBatch | null = null;
  ley!: LeyLines;
  dancefloor!: Dancefloor;

  constructor(readonly scene: THREE.Scene, private src: IslandSource) {
    this.root.name = "island";
    scene.add(this.root);
  }

  /** The rolling ground, made the field in use and centred on her, and the ground under it. */
  buildGround(): void {
    const { game, style, mpp, maxTexture } = this.src, t = game.tuning;
    // The steepest the hills may be: the camera's shallowest pitch at any zoom, ground or treetop (Ed, v289).
    const C = t.camera, pitch = Math.min(C.ground.angleIn, C.ground.angleOut, C.treetop.angleIn, C.treetop.angleOut);
    this.heights = new HeightField(game.map, game.forest, { ...t.ground.hills, maxSlope: Math.tan((pitch * Math.PI) / 180) });
    useHeightField(this.heights);
    this.heights.follow(game.witch.x, game.witch.z);
    this.ground = new Ground(game.map, game.forest, style, mpp, maxTexture);
    this.ground.mesh.renderOrder = -1; // first: the grounds' decals go on it before anything stands on it
    this.root.add(this.ground.mesh);
  }

  /** The paths, roads, railways and streams. */
  buildPaths(): void {
    const { game, style, mpp } = this.src;
    this.paths = new PathView(game.map, style, mpp, game.tuning.pathFade.metres);
    this.root.add(this.paths.group);
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
  buildMarkers(): void {
    const { game, style, mpp } = this.src;
    this.minimap = new Minimap(document.body, game.map);
    this.markerArt = new MarkerArt(style, game.tuning, game.map);
    this.markerBatch = new SpriteBatch(this.markerArt.atlas, mpp, { solid: true }).name("markers");
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
    this.ground?.dispose();
    this.paths?.dispose();
    this.treehouseBatch?.release();
    this.mapTable?.dispose();
    this.minimap?.dispose();
    this.markerShadows?.dispose();
    this.markerBatch?.release();
    this.markerArt?.dispose();
    this.ley?.dispose();
    this.dancefloor?.dispose();
  }
}
