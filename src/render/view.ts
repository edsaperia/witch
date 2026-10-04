// The Three.js view: reads the game state each frame and draws it. Rendered into a canvas of
// (window size / pixel size) and stretched with nearest-neighbour by the browser, so every art
// pixel stays a crisp square.
import * as THREE from "three";
import * as Art from "../../art/generator.js";
import { sigilColour } from "../../art/generator.js";
import type { Game } from "../rules/game";
import { poseOf } from "../rules/game";
import { cameraPose } from "../rules/camera";
import { AREA_TYPES } from "../rules/map";
import { canopyShown, witchHeight } from "../rules/witch";
import { AssetLibrary, type CreatureArt, type TypeArt } from "./assets";
import type { Frame, Piece, RelicArt } from "./artBuild";
import type { LightSource, Plant } from "../rules/forest";
import { hash2 } from "../rules/random";
import { Ground } from "./ground";
import { PathView } from "./paths";
import { applyStyleLight, LIGHT_UNIFORMS, MAX_LIGHTS } from "./lighting";
import { Post } from "./post";
import { Dancefloor } from "./dancefloor";
import { PartyView } from "./party";
import { MarkerArt, MarkerFx, MARKER_LEVELS, type Beacon, type Laser, type Mote } from "./markers";
import { spawnMarkers, waveCountdown, type SpawnMarker } from "../rules/party";
import { StringLightsView } from "./strings";
import { LeashView } from "./leash";
import { Lasers } from "./lasers";
import { BorderView } from "./borders";
import { MusicIndicator, StoneIndicator } from "./indicator";
import { Minimap } from "./minimap";
import { Rulers } from "./rulers";
import { Mist } from "./mist";
import { ShadowBatch, type ShadowInstance } from "./shadows";
import { lerp } from "../rules/random";
import { newBudget, stepBudget, type SceneryBudget } from "../rules/budget";
import { packAtlas } from "./atlas";
import { berrySprite } from "./berries";
import { SPRITE_UNIFORMS, SpriteBatch, type SpriteInstance } from "./sprites";
import type { Style } from "./style";

/** A point light: where, how far it reaches, its colour and strength. */
/** An index by weight, from a seeded integer (its last six digits as a share). */
function pickWeighted(w: number[], seed: number): number {
  let total = 0;
  for (const x of w) total += x;
  let u = ((seed % 1000003) / 1000003) * total;
  for (let i = 0; i < w.length; i++) { u -= w[i]; if (u < 0) return i; }
  return Math.max(0, w.length - 1);
}

export interface ForestLight { x: number; y: number; z: number; reach: number; rgb: THREE.Vector3; strength: number }

export interface ViewStats { berries: number; forestMs: number; forestMissing: number; sceneryRadius: number; fps: number; gameplay: number; scenery: number; dropped: number; trees: number; bushes: number; creatures: number; batches: number; drawCalls: number; pendingArt: number; pendingGround: number; lights: number }

export class View {
  readonly renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private ground: Ground;
  readonly assets: AssetLibrary;
  private typeBatches = new Map<number, SpriteBatch>();
  private decorBatches = new Map<string, SpriteBatch>();
  private creatureBatches = new Map<string, SpriteBatch>();
  private witchBatch: SpriteBatch;
  private treehouseBatch: SpriteBatch;
  private markerArt: MarkerArt;
  private markerBatch: SpriteBatch;
  private markerFx = new MarkerFx();
  private markerCache = { wave: -1, n: -1, list: [] as SpawnMarker[] };
  /** 1 while she sits on the treehouse terrace, easing to 0 as she takes off. */
  private seatK = 1;
  private seatTime = 0;
  private speakerBatch: SpriteBatch | null = null;
  private shadow: THREE.Mesh;
  private mpp: number; // metres per art pixel
  private lastBuild = { x: Infinity, y: Infinity, z: Infinity, version: -1, radius: -1 };
  /** The scenery budget: how far round the witch scenery is drawn (rules/budget.ts). */
  private budget: SceneryBudget;
  /** ?scenery=<metres>: a fixed scenery radius instead of the adaptive one. */
  sceneryFixed: number | null = null;
  private lastReal = 0;
  readonly post: Post;
  private dancefloor: Dancefloor;
  private propBatch: SpriteBatch;
  private partyView: PartyView;
  private strings: StringLightsView;
  private leashView: LeashView;
  private lasers: Lasers;
  private borders: BorderView;
  private music = new MusicIndicator(document.body);
  private nextStone = new StoneIndicator(document.body);
  readonly minimap: Minimap;
  /** Metre rulers and a ground grid (G). */
  readonly rulers = new Rulers(document.body);
  /** Show debug readouts (the debug overlay is on). */
  debugReadouts = false;
  private soundBatch: SpriteBatch;
  private sources: LightSource[] = [];
  /** Lights in the forest besides the witch's glow, from the light sources (set by the view). */
  private forestLights: ForestLight[] = [];
  private shadows: ShadowBatch;
  private shadowList: ShadowInstance[] = [];
  private mist: Mist | null = null;
  private width = 1;
  private height = 1;
  /** ?debug=cull: tint anything that has just appeared bright red, and mark where anything has
   *  just vanished with a red frame for a second. */
  debugCull = false;
  /** ?quick=1, for the quick smoke test in CI: no drawing the rest of the map's art ahead of need. */
  quick = false;
  private ghosts: { x: number; z: number; h: number; until: number }[] = [];
  private ghostLines: THREE.LineSegments | null = null;
  private now = 0;
  stats: ViewStats = { berries: 0, forestMs: 0, forestMissing: 0, sceneryRadius: 0, fps: 0, gameplay: 0, scenery: 0, dropped: 0, trees: 0, bushes: 0, creatures: 0, batches: 0, drawCalls: 0, pendingArt: 0, pendingGround: 0, lights: 0 };

  constructor(readonly canvas: HTMLCanvasElement, readonly game: Game, readonly style: Style) {
    const t = game.tuning;
    this.budget = newBudget(t);
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: "high-performance", preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(1);
    this.renderer.info.autoReset = false; // count every pass of a frame, reset in render()
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace; // colours are the art's own sRGB values, untouched
    this.mpp = 1 / (t.artPixelsPerMetre * (2 / t.pixelSize));
    this.camera = new THREE.PerspectiveCamera(t.camera.fov, 1, 1, 900);
    this.post = new Post(this.renderer, t);
    this.scene.background = new THREE.Color(0x0b0a16);
    applyStyleLight({ ...style, shafts: style.shafts * t.moonbeams }, t.glowReach, this.mpp, t.tone.ambient, t.glowFalloff, t.tone.moon);
    LIGHT_UNIFORMS.uGlowPower.value = t.glowPower;
    this.assets = new AssetLibrary(style, game.seed, t.pixelSize);
    this.ground = new Ground(game.map, game.forest, style, this.mpp);
    this.assets.onFloor = (type, tile) => this.ground.setFloor(type, tile);
    const cs = t.canopyShadow;
    this.ground.setCanopyShadow(cs.on ? cs.strength : 0, cs.height, cs.cover, cs.wind);
    this.shadows = new ShadowBatch(t.shadows.strength, t.fx === "smooth");
    this.shadows.mesh.visible = t.shadows.on;
    this.scene.add(this.shadows.mesh);
    const smooth = t.fx === "smooth";
    LIGHT_UNIFORMS.uSmooth.value = smooth ? 1 : 0;
    if (t.mist.on && t.mist.strength > 0) {
      this.mist = new Mist(t.mist.strength, t.mist.height, t.mist.wind, this.mpp, smooth, this.post.scene.depthTexture, this.post.lowSize);
      if (smooth) { this.post.fxScene = new THREE.Scene(); this.post.fxScene.add(this.mist.mesh); }
      else this.scene.add(this.mist.mesh);
    }
    LIGHT_UNIFORMS.uHazeRange.value.set(t.haze.near, t.haze.far);
    this.ground.mesh.renderOrder = -1; // first: the grounds' decals go on it before anything stands on it
    this.scene.add(this.ground.mesh);
    this.scene.add(new PathView(game.map, style, this.mpp, t.pathFade.metres).group);

    // The witch is depth-tested like everything else, drawn after it; where something still hides
    // her, a silhouette in her glow colour shows through, and tall things in front of her fade.
    const O = t.occlusion;
    this.witchBatch = new SpriteBatch(this.assets.witch, this.mpp, { unlit: true, silhouette: { colour: LIGHT_UNIFORMS.uGlowRgb.value.clone(), opacity: O.silhouette } });
    this.witchBatch.mesh.renderOrder = 10;
    this.scene.add(...this.witchBatch.meshes);
    SPRITE_UNIFORMS.uOcc.value.set(O.fadeOpacity, O.edge, O.minHeight, O.on ? 1 : 0);
    // The treehouse, home: its base and its crown (the crown only from the treetops), its trunk's
    // foot on its spot. It fades like other tall things when she's behind it.
    {
      // (Placed each frame by placeTreehouse: where it stands depends on the camera's angle.)
      this.treehouseBatch = new SpriteBatch(this.assets.treehouse.atlas, this.mpp, { fade: true });
      this.scene.add(...this.treehouseBatch.meshes);
    }
    // Spawn markers: gameplay (always drawn in range, never budget-culled).
    this.minimap = new Minimap(document.body, game.map);
    this.markerArt = new MarkerArt(style, t);
    this.markerBatch = new SpriteBatch(this.markerArt.atlas, this.mpp, { solid: true });
    this.scene.add(...this.markerBatch.meshes, this.markerFx.group);
    // The dancefloor's speakers: their batch comes with their art (drawSpeakers).
    this.assets.speakerArt();
    this.propBatch = new SpriteBatch(this.assets.props, this.mpp, { fade: true });
    // Berries: a small shiny dark-red berry, drawn here (a highlight upper left, a darker side),
    // always drawn (gameplay), unlit so it reads at night; its halo and glints are in leash.ts.
    this.berryBatch = new SpriteBatch(packAtlas([berrySprite(t.berries.colour)], 64), this.mpp, { unlit: true });
    this.scene.add(...this.berryBatch.meshes);
    this.scene.add(...this.propBatch.meshes);
    this.partyView = new PartyView(this.assets.soundsystems, this.mpp);
    this.strings = new StringLightsView(this.scene, game);
    this.leashView = new LeashView(this.scene, game);
    this.lasers = new Lasers(this.scene, game);
    this.borders = new BorderView(this.scene, game);
    this.soundBatch = new SpriteBatch(this.assets.soundsystems, this.mpp, { solid: true });
    this.scene.add(...this.soundBatch.meshes);
    this.dancefloor = new Dancefloor(game.map, t, SPRITE_UNIFORMS, this.mpp);
    this.scene.add(this.dancefloor.ball, this.dancefloor.beam, this.dancefloor.motes);

    // A shadow under the witch, so her height reads: soft (multiplied over the ground), or
    // dithered with ?fx=pixel.
    const sm = t.fx === "smooth"
      ? new THREE.ShaderMaterial({
        transparent: true, depthWrite: false, blending: THREE.CustomBlending, blendSrc: THREE.ZeroFactor, blendDst: THREE.SrcColorFactor,
        vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
        fragmentShader: "varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; float r = dot(p, p); if (r > 1.0) discard; gl_FragColor = vec4(vec3(1.0 - 0.75 * (1.0 - r) * (1.0 - r)), 1.0); }",
      })
      : new THREE.ShaderMaterial({
        transparent: false, depthWrite: false,
        vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
        fragmentShader: "varying vec2 vUv; void main(){ vec2 p = vUv * 2.0 - 1.0; if (dot(p, p) > 1.0 || mod(floor(gl_FragCoord.x) + floor(gl_FragCoord.y), 2.0) > 0.5) discard; gl_FragColor = vec4(0.02, 0.02, 0.05, 1.0); }",
      });
    this.shadow = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 0.7).rotateX(-Math.PI / 2), sm);
    this.shadow.renderOrder = 1;
    this.scene.add(this.shadow);
  }

  /** Fit the canvas to the window: the scene at low resolution, shown scaled up by the pixel size. */
  resize(cssW: number, cssH: number): void {
    const p = this.game.tuning.pixelSize;
    this.width = Math.max(1, Math.ceil(cssW / p));
    this.height = Math.max(1, Math.ceil(cssH / p));
    // With the tilt-shift after the upscale, the canvas holds the full-size image; otherwise the
    // low-resolution one, which the browser scales up with nearest-neighbour.
    const k = this.post.fullResolution ? p : 1;
    this.renderer.setSize(this.width * k, this.height * k, false);
    this.post.resize(this.width, this.height, this.width * k, this.height * k);
    this.canvas.style.width = this.width * p + "px";
    this.canvas.style.height = this.height * p + "px";
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    SPRITE_UNIFORMS.uRes.value.set(this.width, this.height);
  }

  /** Make the art and ground round the start before the first frame. */
  async prepare(): Promise<void> {
    this.render(0, false);
    this.drawCreatures();
    this.ground.fill(this.renderer, this.viewRect(this.game.tuning.haze.near, 20), this.game.witch.x, this.game.witch.z, Infinity);
    await this.assets.whenIdle();
    this.render(0, false);
    this.refresh(true);
    // There are only 30 area types and 30 creatures: draw them all in the background now, so
    // the forest ahead is ready however fast she flies; the area types nearest her first.
    const m = this.game.map, w = this.game.witch, near = new Map<number, number>();
    for (let y = 0; y < m.n; y++) for (let x = 0; x < m.n; x++) {
      const s = m.siteOf(x, y), t = m.typeOf(x, y), d = Math.hypot(s.x - w.x, s.z - w.z);
      if (!(near.get(t)! <= d)) near.set(t, d);
    }
    for (let t = 0; t < AREA_TYPES.length; t++) if (!near.has(t)) near.set(t, Infinity);
    this.prepared = true;
    if (this.quick) return; // ?quick=1 (the CI smoke test): only what's needed, as it's needed
    for (const [t] of [...near].sort((a, b) => a[1] - b[1])) this.assets.prefetchType(t);
    for (const t of AREA_TYPES) this.assets.creatureArt(t.creature);
  }

  private batchFor<K>(map: Map<K, SpriteBatch>, key: K, atlas: () => SpriteBatch | undefined): SpriteBatch | undefined {
    let b = map.get(key);
    if (!b) {
      b = atlas();
      if (b) {
        map.set(key, b); this.scene.add(...b.meshes);
        // A set drawn after the start (flying toward an area whose art was still being drawn)
        // fades in rather than popping in.
        if (this.prepared) { b.appearU.value = 0; this.appearing.set(b, performance.now()); }
      }
    }
    return b;
  }
  /** Sets fading in since they were drawn, and when they arrived (real ms). */
  private appearing = new Map<SpriteBatch, number>();
  private prepared = false;
  private easeAppearing(): void {
    const now = performance.now();
    for (const [b, at] of this.appearing) {
      const k = Math.min(1, (now - at) / 800);
      b.appearU.value = k * k * (3 - 2 * k);
      if (k >= 1) this.appearing.delete(b);
    }
  }

  // What the camera can see: its frustum now, and the frustum it is easing toward (a zoom step
  // or a rise or descent changes the view faster than any margin), plus a margin round both.
  // Everything drawn goes through this one test, so nothing is added or dropped on screen.
  private frustum = new THREE.Frustum();
  private frustumTo = new THREE.Frustum();
  private cullCam = new THREE.PerspectiveCamera();
  private box = new THREE.Box3();
  private m4 = new THREE.Matrix4();
  private v3 = new THREE.Vector3();
  private v3b = new THREE.Vector3();
  private v3c = new THREE.Vector3();
  /** What was drawn last time, for the fresh tint and the pop check: one record for what the
   *  rebuild places (trees, undergrowth, walls, set pieces), one for what moves every frame
   *  (creatures, light props). */
  private at = new Map<string, [number, number, number]>();
  private tracks = { placed: { now: new Set<string>(), before: new Set<string>() }, moving: { now: new Set<string>(), before: new Set<string>() } };
  pops: string[] = [];

  private poseCamera(cam: THREE.PerspectiveCamera, pose: { angle: number; distance: number; tx: number; ty: number; tz: number }): void {
    const a = (pose.angle * Math.PI) / 180;
    cam.position.set(pose.tx, pose.ty + Math.sin(a) * pose.distance, pose.tz + Math.cos(a) * pose.distance);
    cam.up.set(0, 1, 0);
    cam.lookAt(pose.tx, pose.ty, pose.tz);
    cam.updateMatrixWorld();
  }

  private updateFrustum(): void {
    const g = this.game, t = g.tuning, cam = this.camera;
    cam.updateMatrixWorld();
    this.m4.multiplyMatrices(cam.projectionMatrix, cam.matrixWorldInverse);
    this.frustum.setFromProjectionMatrix(this.m4);
    // Where the camera is heading: the chosen zoom step, and the height she is rising or descending to.
    const steps = Math.max(1, t.camera.zoomSteps), lift = g.witch.mode === "rising" || g.witch.mode === "treetop" ? 1 : 0;
    const to = cameraPose({ ...g.camera, zoom: steps > 1 ? g.camera.zoomStep / (steps - 1) : 0 }, lift, t);
    const c = this.cullCam;
    c.fov = cam.fov; c.aspect = cam.aspect; c.near = cam.near; c.far = cam.far; c.updateProjectionMatrix();
    this.poseCamera(c, { ...to, ty: lerp(t.groundHeight, t.treetopHeight, lift) });
    this.m4.multiplyMatrices(c.projectionMatrix, c.matrixWorldInverse);
    this.frustumTo.setFromProjectionMatrix(this.m4);
  }

  /** The ground rectangle the cameras can see, out to `far` metres from the witch, plus `margin`. */
  private viewRect(far: number, margin: number) {
    const w = this.game.witch, pts: [number, number][] = [];
    for (const cam of [this.camera, this.cullCam]) {
      const o = cam.position, reach = far + Math.hypot(o.x - w.x, o.z - w.z) + margin;
      for (const nx of [-1, 1]) for (const ny of [-1, 1]) {
        const d = this.v3.set(nx, ny, 1).unproject(cam).sub(o).normalize();
        for (const h of [0, 25]) {
          let t = d.y < -1e-3 ? (h - o.y) / d.y : Infinity;
          if (!(t > 0)) t = Infinity;
          t = Math.min(t, reach);
          pts.push([o.x + d.x * t, o.z + d.z * t]);
        }
      }
      pts.push([o.x, o.z]);
    }
    const xs = pts.map(p => p[0]), zs = pts.map(p => p[1]);
    return { minX: Math.min(...xs) - margin, maxX: Math.max(...xs) + margin, minZ: Math.min(...zs) - margin, maxZ: Math.max(...zs) + margin };
  }

  /** Whether a sprite standing at (x, z), w wide and h tall, may be on screen now or soon. Nothing
   *  is drawn beyond the haze's far edge, where the haze has already hidden it completely. */
  private inView(x: number, z: number, w: number, h: number, margin: number, reach = this.game.tuning.haze.far): boolean {
    const wx = this.game.witch.x, wz = this.game.witch.z, far = reach + margin;
    if ((x - wx) ** 2 + (z - wz) ** 2 > far * far) return false;
    this.box.min.set(x - w / 2 - margin, -margin, z - h - margin);
    this.box.max.set(x + w / 2 + margin, h + margin, z + margin);
    return this.frustum.intersectsBox(this.box) || this.frustumTo.intersectsBox(this.box);
  }

  /** Whether a point is on screen and clear of the haze, so a change there would be seen. */
  private inInnerView(x: number, z: number, h: number): boolean {
    const w = this.game.witch, hz = this.game.tuning.haze;
    if (Math.hypot(x - w.x, z - w.z) > hz.near + (hz.far - hz.near) * 0.6) return false;
    for (const y of [0, h * 0.5, h]) {
      const p = this.v3.set(x, y, z).project(this.camera);
      if (Math.abs(p.x) < 1 && Math.abs(p.y) < 1 && p.z < 1) return true;
    }
    return false;
  }

  /** Note that an object is drawn this frame; returns whether it has just appeared. */
  private mark(kind: string, x: number, z: number, h: number, id: string | number = ""): boolean {
    // Placed things are known by where they stand; moving ones (creatures) by their id, with
    // where they are this frame kept for the in-view test.
    const tr = kind === "creature" || kind === "prop" ? this.tracks.moving : this.tracks.placed;
    const k = kind === "creature" ? `${kind}|${id}` : `${kind}|${x.toFixed(1)}|${z.toFixed(1)}|${h.toFixed(1)}|${id}`;
    if (kind === "creature") this.at.set(k, [x, z, h]);
    tr.now.add(k);
    return !tr.before.has(k);
  }

  /** Compare what was drawn with last time: anything appearing or vanishing in clear view is a pop. */
  private checkPops(which: "placed" | "moving", record = true): void {
    const tr = this.tracks[which], live = record && this.assets.pending === 0 && tr.before.size > 0;
    if (this.debugCull) for (const k of tr.before) if (!tr.now.has(k)) {
      const p = this.at.get(k), [, ...rest] = k.split("|"), [x, z, h] = p ?? rest.map(Number);
      this.ghosts.push({ x: +x, z: +z, h: Math.max(1, +h), until: this.now + 1 });
    }
    if (live) {
      const at = (k: string, what: string) => {
        const p = this.at.get(k), [kind, ...rest] = k.split("|"), [x, z, h] = p ?? rest.map(Number);
        // Scenery in or past the budget's fade has faded out: its coming and going isn't seen.
        const w = this.game.witch, faded = which === "placed" && Math.hypot(+x - w.x, +z - w.z) > this.budget.radius - this.game.tuning.scenery.fade;
        if (!faded && this.inInnerView(+x, +z, +h)) this.pops.push(`${what} ${kind} ${(+x).toFixed(0)},${(+z).toFixed(0)}`);
      };
      // (Scenery appearing while a just-drawn set fades in is that fade, not a pop.)
      if (which !== "placed" || !this.appearing.size) for (const k of tr.now) if (!tr.before.has(k)) at(k, "appeared");
      for (const k of tr.before) if (!tr.now.has(k)) at(k, "vanished");
    }
    tr.before = tr.now;
    tr.now = new Set();
  }

  /** On foot: 0 flying, 1 landed (eased), and the sigil pose she's playing, if any. */
  private foot = 0;
  private footTime = 0;
  private footAct: { pose: string; at: number } | null = null;

  /** Where the last rebuild looked: the middle and half-size of its square (for the prefetch). */
  private lastView: { x: number; z: number; half: number } | null = null;
  private lastPose = { distance: 0, angle: 0, zoomStep: -1, lift: -1 };

  /** Rebuild the batches for what the camera sees, once it has moved, turned or zoomed. */
  private refresh(force = false): void {
    const g = this.game, t = g.tuning, cam = this.camera, margin = t.viewMargin, pose = poseOf(g);
    const key = { x: cam.position.x, y: cam.position.y, z: cam.position.z };
    const lp = this.lastPose, lift = g.witch.mode === "rising" || g.witch.mode === "treetop" ? 1 : 0;
    const moved = Math.hypot(key.x - this.lastBuild.x, key.y - this.lastBuild.y, key.z - this.lastBuild.z) >= margin / 3;
    // Scenery is listed a little past the budget's radius (drawn there fully faded), so it is in
    // the list before the radius grows over it.
    const radius = this.budget.radius, reach = Math.min(t.haze.far, radius + margin / 2);
    const regrown = Math.abs(radius - this.lastBuild.radius) >= margin / 3;
    const turned = Math.abs(pose.distance - lp.distance) > 2 || Math.abs(pose.angle - lp.angle) > 0.5 || g.camera.zoomStep !== lp.zoomStep || lift !== lp.lift;
    if (!force && !moved && !turned && !regrown && this.assets.version === this.lastBuild.version) return;
    this.lastBuild = { ...key, version: this.assets.version, radius };
    this.lastPose = { distance: pose.distance, angle: pose.angle, zoomStep: g.camera.zoomStep, lift };
    const r = this.viewRect(reach, margin), cx = (r.minX + r.maxX) / 2, cz = (r.minZ + r.maxZ) / 2, half = Math.max(r.maxX - r.minX, r.maxZ - r.minZ) / 2;
    this.lastView = { x: cx, z: cz, half };
    const shadows: ShadowInstance[] = [];
    // Shadows fall away from the moon: from the upper left, so toward the lower right.
    const L = LIGHT_UNIFORMS.uMoonDir.value, sx = -L.x / Math.max(0.2, L.y), sz = -L.z / Math.max(0.2, L.y);
    const per = new Map<number, SpriteInstance[]>();
    const add = (type: number, inst: SpriteInstance) => { let l = per.get(type); if (!l) per.set(type, (l = [])); l.push(inst); };
    const mpp = this.mpp;
    // How far up the screen a step up a sprite goes, for each step of ground toward the camera.
    const pitch = (pose.angle * Math.PI) / 180, upOnScreen = SPRITE_UNIFORMS.uUp.value.dot(this.v3.set(0, Math.cos(pitch), -Math.sin(pitch)));
    // Every sprite stands on its lowest drawn pixel, not on the bottom of its box: it is slid back
    // along its own up (so that pixel lands exactly on the ground point, nothing sinks into the
    // ground) by the empty rows under its drawing. A tree's crown moves with its trunk.
    const U = SPRITE_UNIFORMS.uUp.value;
    const stand = (x: number, z: number, frame: Frame, m: number) => { const d = (frame.pad ?? 0) * m; return { x: x - U.x * d, y: -U.y * d, z: z - U.z * d }; };
    let nt = 0, nb = 0;
    for (const p of g.forest.treesNear(cx, cz, half)) {
      const art = this.assets.typeArt(p.type);
      if (!art || !art.layout.big.length) continue;
      const f = art.atlas.frames, big = art.layout.big[pickWeighted(art.layout.bigWeight, p.variant)], whole = f[big.top ?? big.bot];
      if (!this.inView(p.x, p.z, whole.w * mpp, whole.h * mpp, margin, reach)) continue;
      // Squeeze the tallest variants so they never bury her flight (treeCap).
      const tall = whole.h * mpp, C = t.treeCap, scale = tall > C.from ? (C.from + (tall - C.from) * C.keep) / tall : 1;
      const fresh = this.mark("tree", p.x, p.z, tall * scale);
      const at = stand(p.x, p.z, f[big.bot], mpp * scale);
      add(p.type, { ...at, frame: f[big.bot], flip: p.flip, fresh, scale, cut: big.top !== null ? art.cut.get(big.bot) : undefined });
      if (big.top !== null) add(p.type, { ...at, frame: f[big.top], flip: p.flip, top: true, fresh, scale });
      const w = whole.w * mpp, h = whole.h * mpp * (big.top === null ? 0.2 : 0.6);
      if (t.shadows.trees) shadows.push({ x: p.x + sx * h, z: p.z + sz * h, w: w * 0.8, d: w * 0.45, scenery: true });
      nt++;
    }
    const scatter = (kind: string, list: Plant[], pick: (l: TypeArt["layout"]) => Piece[]) => {
      for (const p of list) {
        const art = this.assets.typeArt(p.type);
        if (!art) continue;
        const pieces = pick(art.layout);
        if (!pieces.length) continue;
        const piece = pieces[p.variant % pieces.length], f = art.atlas.frames, frame = f[piece.bot], whole = f[piece.top ?? piece.bot];
        const scale = kind === "setpiece" ? t.setPieceScale : 1, m = mpp * scale; // set pieces: each area's landmark, drawn big
        // A piece drawn in perspective is anchored by its origin, its middle on the ground: its
        // bottom row (the front of it, nearest the camera) stands on the ground that much nearer
        // the camera, so the origin lands on its spot and nothing of it sinks under the ground.
        let x = p.x, z = p.z;
        if (piece.origin) {
          const ox = p.flip ? frame.w - piece.origin.x : piece.origin.x;
          x += (frame.w / 2 - ox) * m;
          z += ((frame.h - (frame.pad ?? 0) - piece.origin.y) * m * upOnScreen) / Math.max(0.2, Math.sin(pitch));
        }
        if (!this.inView(x, z, whole.w * m, whole.h * m, margin, reach)) continue;
        const fresh = this.mark(kind, p.x, p.z, whole.h * m);
        const at = stand(x, z, frame, m);
        add(p.type, { ...at, frame, flip: p.flip, fresh, scale });
        if (piece.top !== null) add(p.type, { ...at, frame: f[piece.top], flip: p.flip, top: true, fresh, scale });
        // Set pieces model their own ground: no blob under them (it read as a hard dark oval).
        // Its shadow lies under it, its front edge at its base (not centred on its bottom edge,
        // which leaves half of it in front, reading as a shadow below something hovering).
        const sd = frame.w * m * 0.3;
        if (kind !== "setpiece") shadows.push({ x: p.x, z: p.z - sd * 0.4, w: frame.w * m * 0.8, d: sd, scenery: true });
        nb++;
      }
    };
    scatter("small", g.forest.bushesNear(cx, cz, half), l => l.small);
    scatter("small", g.forest.bedsNear(cx, cz, half), l => l.small); // a formal garden's beds, in rows
    // Berry bushes (rules/berries.ts): normal bushes of their area, a berry on some of them.
    scatter("berrybush", g.berries.bushes.filter(b => Math.abs(b.x - cx) <= half && Math.abs(b.z - cz) <= half), l => l.small);
    scatter("wall", g.forest.wallsNear(cx, cz, half), l => l.walls.map(bot => ({ bot, top: null })));
    scatter("setpiece", g.forest.setPiecesNear(cx, cz, half), l => (l.set === null ? [] : [l.set]));
    // Decorations: ruins, rocks and freak trees, as scenery (each family's pieces picked by its variant).
    const decor = this.assets.decorArt(), dl: SpriteInstance[] = [];
    if (decor) for (const d of g.forest.decorNear(cx, cz, half)) {
      const list = decor.families[d.family];
      if (!list?.length) continue;
      const piece = list[d.variant % list.length], f = decor.atlas.frames, frame = f[piece.bot], whole = f[piece.top ?? piece.bot];
      if (!this.inView(d.x, d.z, whole.w * mpp, whole.h * mpp, margin, reach)) continue;
      const fresh = this.mark("decor", d.x, d.z, whole.h * mpp), at = stand(d.x, d.z, frame, mpp);
      dl.push({ ...at, frame, flip: d.flip, fresh });
      if (piece.top !== null) dl.push({ ...at, frame: f[piece.top], flip: d.flip, top: true, fresh });
      const sd = frame.w * mpp * 0.3; // its shadow under it, front edge at its base
      shadows.push({ x: d.x, z: d.z - sd * 0.4, w: frame.w * mpp * 0.8, d: sd, scenery: true });
      nb++;
    }
    // The paths' 3D pieces (bridges, stairs, railway landmarks, posts), as scenery, each with its
    // middle on the ground over its spot.
    const pa = this.assets.pathPieceArt();
    if (pa) {
      const pl: SpriteInstance[] = [], R = SPRITE_UNIFORMS.uRight.value;
      for (const p of g.map.paths.pieces) {
        if (Math.abs(p.x - cx) > half || Math.abs(p.z - cz) > half) continue;
        const a = pa.byId[p.id];
        if (!a) continue;
        // Anchored by its origin like a set piece: the part drawn below its middle lies on the
        // ground nearer the camera, its lowest drawn pixel on the ground.
        const frame = pa.atlas.frames[a.frame], dx = (a.originX - frame.w / 2) * mpp, below = Math.max(0, frame.h - (frame.pad ?? 0) - a.originY) * mpp;
        const at = stand(p.x - R.x * dx, p.z - R.z * dx + (below * upOnScreen) / Math.max(0.2, Math.sin(pitch)), frame, mpp);
        if (!this.inView(at.x, at.z, frame.w * mpp, frame.h * mpp, margin, reach)) continue;
        pl.push({ ...at, frame, flip: false, fresh: this.mark("pathpiece", p.x, p.z, frame.h * mpp) });
        const sd = frame.w * mpp * 0.25; // under it, round its middle
        shadows.push({ x: p.x, z: p.z, w: frame.w * mpp * 0.7, d: sd, scenery: true });
        nb++;
      }
      this.batchFor(this.decorBatches, "pieces", () => new SpriteBatch(pa.atlas, mpp, { scenery: true, fade: true }))?.set(pl);
    }
    // Modern relics and the grounds (playgrounds, sports grounds: the art's arrangements, the
    // court or pitch decal first, under everything), each piece standing on its ground point.
    const ra = this.assets.relicArt();
    if (ra) {
      const fwd = this.camera.getWorldDirection(this.v3b), up = this.v3c.set(0, 1, 0).applyQuaternion(this.camera.quaternion);
      const U = SPRITE_UNIFORMS.uUp.value, R = SPRITE_UNIFORMS.uRight.value, rise = U.dot(up) / Math.max(0.2, -fwd.y);
      const upright: SpriteInstance[] = [], flat: SpriteInstance[] = [];
      const put = (a: RelicArt, gx: number, gz: number, flip: boolean) => {
        // Upright pieces stand on their lowest drawn pixel too (decals lie flat, as they are).
        const frame = ra.atlas.frames[a.frame], pad = a.decal ? 0 : frame.pad ?? 0, dx = (a.originX - frame.w / 2) * mpp * (flip ? -1 : 1), toward = Math.max(0, frame.h - pad - a.originY) * mpp * rise;
        const at = a.decal ? { x: gx - R.x * dx, y: 0, z: gz - R.z * dx + toward } : stand(gx - R.x * dx, gz - R.z * dx + toward, frame, mpp);
        if (!this.inView(at.x, at.z, frame.w * mpp, frame.h * mpp, margin, reach)) return;
        (a.decal ? flat : upright).push({ ...at, frame, flip, fresh: this.mark("relic", gx, gz, frame.h * mpp) });
        if (!a.decal) shadows.push({ x: gx, z: gz, w: frame.w * mpp * 0.6, d: frame.w * mpp * 0.22, scenery: true });
        nb++;
      };
      if (ra.modern.length) for (const r of g.forest.relicsNear(cx, cz, half)) put(ra.modern[r.variant % ra.modern.length], r.x, r.z, r.flip);
      for (const gr of g.map.grounds) {
        if (Math.abs(gr.x - cx) > half + gr.r || Math.abs(gr.z - cz) > half + gr.r) continue;
        for (const p of ra.layouts[gr.kind] ?? []) { const a = ra.byId[p.id]; if (a) put(a, gr.x + (gr.flip ? -p.x : p.x), gr.z + p.z, gr.flip); } // mirrored whole
      }
      this.batchFor(this.decorBatches, "relics", () => new SpriteBatch(ra.atlas, mpp, { scenery: true, fade: true }))?.set(upright);
      this.batchFor(this.decorBatches, "decals", () => {
        const b = new SpriteBatch(ra.atlas, mpp, { scenery: true, flat: true });
        for (const m of b.meshes) { m.renderOrder = -0.5; (m.material as THREE.Material).depthWrite = false; } // right after the ground, under everything standing
        return b;
      })?.set(flat);
    }
    if (decor) this.batchFor(this.decorBatches, "all", () => new SpriteBatch(decor.atlas, mpp, { scenery: true, fade: true }))?.set(dl);
    for (const [type, b] of this.typeBatches) if (!per.has(type)) b.set([]);
    for (const [type, list] of per) {
      const b = this.batchFor(this.typeBatches, type, () => { const a = this.assets.typeArt(type); return a && new SpriteBatch(a.atlas, mpp, { scenery: true, fade: true }); });
      b?.set(list);
    }
    { const th = g.map.treehouse; shadows.push({ x: th.x, z: th.z, w: 7, d: 3.5, scenery: false }); } // soft, under the treehouse
    this.checkPops("placed", !force);
    this.sources = g.forest.lightsNear(g.witch.x, g.witch.z, t.haze.far + margin);
    this.stats.trees = nt; this.stats.bushes = nb;
    this.shadowList = shadows;
  }

  /** The spawn markers (rune stones where soundsystems will come): their sprites, beacons and
   *  motes; returns the lights of the nearest. */
  private drawMarkers(time: number): ForestLight[] {
    const g = this.game, t = g.tuning, R = t.runeMarkers, w = g.witch, range = t.haze.far + 20, mc = this.markerCache;
    if (mc.wave !== g.party.wave || mc.n !== g.party.areas.size) { mc.wave = g.party.wave; mc.n = g.party.areas.size; mc.list = spawnMarkers(g.party, g.map); }
    const cd = waveCountdown(g.party, g.map, time), build = g.party.paused ? 0 : cd.gone;
    const phase = (time * t.beat.bpm) / 60, beat = Math.pow(0.5 + 0.5 * Math.cos(phase * Math.PI * 2), 2); // 1 on the beat
    const inst: SpriteInstance[] = [], lights: ForestLight[] = [], beacons: Beacon[] = [], motes: Mote[] = [], lasers: Laser[] = [];
    const style = R.awakeStyle, column = style !== "beam", laser = style !== "column";
    const scale = R.scale;
    const stone = (x: number, z: number, species: string, level: number, y = 0) => {
      const frame = this.markerArt.atlas.frames[this.markerArt.frame(species, level)];
      if (!this.inView(x, z, frame.w * this.mpp * scale, frame.h * this.mpp * scale, 6)) return false;
      inst.push({ x, y, z, frame, flip: false, scale, fresh: this.mark("marker", x, z, frame.h * this.mpp * scale) });
      return true;
    };
    const near: { d: number; l: ForestLight }[] = [];
    for (const m of mc.list) {
      const d = Math.hypot(m.x - w.x, m.z - w.z);
      if (d > range) continue;
      const species = AREA_TYPES[g.map.typeOf(m.cell[0], m.cell[1])].creature, col = this.markerArt.colour.get(species)!;
      // Awake: brighter on the beat, more so as the countdown runs out; dormant: a steady glow.
      const level = m.awake ? 1 + Math.round(Math.min(1, beat * (0.4 + 0.6 * build)) * (MARKER_LEVELS - 2)) : 0;
      stone(m.x, m.z, species, level);
      // The beam and laser rise from the top of the stone, not from inside it.
      const top = (this.markerArt.height.get(species) ?? 0) * this.mpp * scale;
      const A = R.awake, D = R.dormant;
      const strength = m.awake ? (A.light + A.lightBuild * build) * (0.55 + 0.45 * beat) : D.light;
      if (d < R.lightRange) near.push({ d, l: { x: m.x, y: 0.5, z: m.z + 1.5, reach: m.awake ? A.reach : D.reach, rgb: col, strength } });
      // Awake: a column of light (column), a thin laser straight up (beam), or both (Ed, v149: "let's
      // see both"); dormant: only the faint column above the canopy.
      if (!m.awake || column) beacons.push({ x: m.x, z: m.z, colour: col, strength: m.awake ? A.beam * (0.6 + 0.4 * beat) * (1 + build) : D.beam, base: top });
      if (m.awake && laser) lasers.push({ x: m.x, z: m.z, colour: col, strength: R.laser.opacity * (0.55 + 0.45 * beat) * (0.7 + 0.6 * build), width: R.laser.width, height: R.laser.length, base: top });
      if (m.awake) {
        const n = Math.round(A.motes + A.moteBuild * build);
        for (let i = 0; i < n; i++) {
          const s = (m.cell[0] * 31 + m.cell[1] * 17 + i * 7.3) % 1 || 0.37 * (i + 1) % 1, rise = ((time * (0.25 + 0.15 * ((i * 0.618) % 1)) + i / n) % 1);
          const a = i * 2.399 + m.cell[0];
          motes.push({ x: m.x + Math.cos(a) * (0.6 + rise * 1.4), y: 0.6 + rise * 7, z: m.z + Math.sin(a) * (0.6 + rise * 1.4), colour: col, alpha: (1 - rise) * (0.5 + 0.5 * beat) * (0.6 + s * 0.4) });
        }
      }
    }
    // The stones the party has just reached: they flare and sink as the soundsystems arrive.
    for (const a of g.party.areas.values()) {
      if (!a.soundsystem || time - a.at > R.flare.time || time < a.at) continue;
      const k = (time - a.at) / R.flare.time, species = AREA_TYPES[g.map.typeOf(a.cell[0], a.cell[1])].creature, col = this.markerArt.colour.get(species)!;
      const s0 = g.map.soundsystemSpot(a.cell[0], a.cell[1]);
      stone(s0.x, s0.z, species, MARKER_LEVELS - 1, -k * k * 4 * scale);
      near.push({ d: 0, l: { x: s0.x, y: 2.5, z: s0.z, reach: R.awake.reach * 1.5, rgb: col, strength: R.flare.light * (1 - k) } });
    }
    near.sort((p, q) => p.d - q.d);
    for (const n of near.slice(0, 8)) lights.push(n.l);
    this.markerBatch.set(inst);
    this.markerFx.update(beacons, R.beamHeight, canopyShown(w), motes, lasers);
    return lights;
  }

  private berryBatch: SpriteBatch;
  /** When each berry last grew again (game time), so it grows in rather than appearing. */
  private regrewAt = new Map<number, number>();
  /** When each party animal evolved (game time): the flash, the pop and the sparkles. */
  readonly evolvedAt = new Map<number, number>();
  private drawBerries(time: number): void {
    const g = this.game, B = g.berries, w = g.witch, R = g.tuning.haze.far, f = this.berryBatch.atlas.frames[0], items: SpriteInstance[] = [];
    for (const e of B.events) {
      if (e.kind === "regrew") this.regrewAt.set(e.id, time);
      if (e.kind === "evolved") this.evolvedAt.set(e.id, time);
    }
    for (const [id, at] of this.regrewAt) if (time - at > 0.6) this.regrewAt.delete(id);
    for (const [id, at] of this.evolvedAt) if (time - at > 1.2) this.evolvedAt.delete(id);
    for (const b of B.berries) {
      const p = B.bushes[b.bush];
      if (Math.abs(p.x - w.x) > R || Math.abs(p.z - w.z) > R || !this.inView(p.x, p.z, 0.5, 1.2, 2)) continue;
      const at = this.regrewAt.get(b.id), grow = at === undefined ? 1 : Math.min(1, (time - at) / 0.5);
      if (grow <= 0.05) continue;
      items.push({ x: p.x, y: 0.75, z: p.z + 0.25, frame: f, flip: false, scale: grow });
    }
    this.berryBatch.set(items);
    this.stats.berries = items.length;
  }

  private drawCreatures(time = 0): void {
    const g = this.game, R = g.tuning.haze.far + 20;
    const per = new Map<string, SpriteInstance[]>(), arts = new Map<string, CreatureArt>(), creatureShadows: ShadowInstance[] = [];
    const beat = 60 / g.tuning.beat.bpm;
    let n = 0;
    for (const c of g.creatures) {
      if (Math.abs(c.x - g.witch.x) > R || Math.abs(c.z - g.witch.z) > R) continue;
      // Invited creatures are party animals: their party gear once it's drawn (the wild look till then).
      const party = c.leashed ? this.assets.partyArt(c.species, c.id, sigilColour(c.species)) : undefined;
      const art = party ?? this.assets.creatureArt(c.species), key = party ? `party-${c.id}` : c.species;
      if (!art) continue;
      arts.set(key, art);
      const frame = art.atlas.frames[art.frame(c.level, c.moving ? Math.floor(c.walk) % 2 : 0, c.away)];
      if (!this.inView(c.x, c.z, frame.w * this.mpp, frame.h * this.mpp, 4)) continue;
      const fresh = this.mark("creature", c.x, c.z, frame.h * this.mpp, c.id);
      let l = per.get(key);
      if (!l) per.set(key, (l = []));
      // Party animals never stand still: a bounce and a sway on the beat when idle, a little
      // bounce as they go. (Wild ones roam, graze and pause.)
      const ph = (time / beat + (c.id % 4) * 0.25) * Math.PI;
      const dance = c.leashed ? Math.abs(Math.sin(ph)) * (c.moving ? 0.15 : 0.4) : 0, sway = c.leashed && !c.moving ? Math.sin(ph * 0.5) * 0.12 : 0;
      // Evolving: glowing white, pulsing on the beat, brighter toward the bar line; then the flash
      // as it becomes its next level, and a pop from 1.3 times its size back to its own.
      const ev = g.berries.evolving.get(c.id), done = this.evolvedAt.get(c.id);
      let glow = 0, scale = 1;
      if (ev) {
        const k = Math.min(1, (time - ev.since) / Math.max(0.1, ev.at - ev.since)), pulse = 0.5 + 0.5 * Math.cos((time / beat) * Math.PI * 2);
        glow = Math.min(1, (0.25 + 0.5 * k) * (0.55 + 0.45 * pulse) + (ev.at - time < 0.12 ? 1 : 0));
      } else if (done !== undefined) {
        const d = time - done;
        glow = Math.max(0, 1 - d / 0.2);
        scale = 1 + 0.3 * Math.max(0, 1 - d / 0.5) ** 2;
      }
      l.push({ x: c.x + sway, y: dance, z: c.z, frame, flip: c.facing < 0, fresh, glow, scale });
      creatureShadows.push({ x: c.x, z: c.z, w: frame.w * this.mpp * 0.7, d: frame.w * this.mpp * 0.25 });
      n++;
    }
    for (const [s, b] of this.creatureBatches) if (!per.has(s)) b.set([]);
    for (const [s, list] of per) {
      const b = this.batchFor(this.creatureBatches, s, () => { const a = arts.get(s); return a && new SpriteBatch(a.atlas, this.mpp, { solid: true }); }); // creatures stay solid round her (Ed, v149)
      b?.set(list);
    }
    this.stats.creatures = n;
    if (this.game.tuning.shadows.on) this.shadows.set(this.shadowList.concat(creatureShadows));
  }

  // Campfires flicker, magic stones pulse; their props are drawn (ponds are in the ground).
  private fire = new THREE.Vector3(1, 0.5, 0.16);
  private runeCyan = new THREE.Vector3(0.3, 0.9, 1);
  private runeViolet = new THREE.Vector3(0.75, 0.45, 1);
  private runeGreen = new THREE.Vector3(0.45, 1, 0.5);
  private updateSources(time: number): void {
    const f = this.assets.props.frames, items: SpriteInstance[] = [], lights: ForestLight[] = [];
    for (const src of this.sources) {
      if (src.kind === "pond") continue;
      const k = hash2(Math.round(src.x * 10), Math.round(src.z * 10), 7);
      if (src.kind === "campfire") {
        const flick = 0.8 + 0.12 * Math.sin(time * 11 + k * 40) + 0.08 * Math.sin(time * 23.7 + k * 13);
        lights.push({ x: src.x + Math.sin(time * 9 + k) * 0.08, y: 1.2, z: src.z, reach: this.game.tuning.lights.campfire.reach * src.size, rgb: this.fire, strength: this.game.tuning.lights.campfire.strength * flick });
        const fr = f[Math.floor(time * 8 + k * 10) % 3];
        if (this.inView(src.x, src.z, fr.w * this.mpp, fr.h * this.mpp, 4)) items.push({ x: src.x, y: 0, z: src.z, frame: fr, flip: k < 0.5, fresh: this.mark("prop", src.x, src.z, 2) });
      } else {
        const kind = k < 0.33 ? 1 : k < 0.66 ? 0 : 2, pulse = 0.7 + 0.3 * Math.sin(time * 0.9 + k * 20), fr = f[3 + kind];
        lights.push({ x: src.x, y: 2, z: src.z, reach: this.game.tuning.lights.stone.reach * src.size, rgb: [this.runeCyan, this.runeViolet, this.runeGreen][kind], strength: this.game.tuning.lights.stone.strength * pulse });
        if (this.inView(src.x, src.z, fr.w * this.mpp, fr.h * this.mpp, 4)) items.push({ x: src.x, y: 0, z: src.z, frame: fr, flip: k < 0.5, fresh: this.mark("prop", src.x, src.z, 2.6) });
      }
    }
    this.propBatch.set(items);
    this.forestLights = lights;
  }

  /** Shade with only the nearest lights (the light budget), fading out those at the budget's
   *  edge so none pops on or off. */
  private setLights(all: ForestLight[], x: number, z: number): void {
    const budget = Math.min(MAX_LIGHTS, this.game.tuning.lightBudget);
    const near = all.map(l => ({ l, d: Math.hypot(l.x - x, l.z - z) - l.reach })).sort((a, b) => a.d - b.d).slice(0, budget + 1);
    // The light just outside the budget sets the fade: the last ones in fade as it nears them.
    const edge = near.length > budget ? near[budget].d : Infinity;
    const U = LIGHT_UNIFORMS;
    let n = 0;
    for (const { l, d } of near.slice(0, budget)) {
      const fade = Math.min(1, Math.max(0, (edge - d) / 15));
      U.uLightPos.value[n].set(l.x, l.y, l.z, l.reach);
      U.uLightCol.value[n].set(l.rgb.x, l.rgb.y, l.rgb.z, l.strength * fade);
      n++;
    }
    U.uLightCount.value = n;
    this.stats.lights = n;
  }

  /** ?debug=cull: a red frame, for a second, where something drawn before is no longer drawn. */
  private drawGhosts(time: number): void {
    this.now = time;
    this.ghosts = this.ghosts.filter(g => g.until > time);
    if (!this.ghostLines) {
      this.ghostLines = new THREE.LineSegments(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: 0xff2020, depthTest: false }));
      this.ghostLines.frustumCulled = false;
      this.ghostLines.renderOrder = 20;
      this.scene.add(this.ghostLines);
    }
    const R = SPRITE_UNIFORMS.uRight.value, U = SPRITE_UNIFORMS.uUp.value, pts: number[] = [];
    for (const g of this.ghosts) {
      const w = g.h * 0.4, c = (sx: number, sy: number) => [g.x + R.x * sx * w + U.x * sy * g.h, R.y * sx * w + U.y * sy * g.h, g.z + R.z * sx * w + U.z * sy * g.h];
      const a = c(-1, 0), b = c(1, 0), d = c(1, 1), e = c(-1, 1);
      pts.push(...a, ...b, ...b, ...d, ...d, ...e, ...e, ...a, ...a, ...d);
    }
    const geo = this.ghostLines.geometry;
    geo.dispose(); // its buffer is replaced every frame
    geo.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    geo.setDrawRange(0, pts.length / 3);
    this.ghostLines.visible = pts.length > 0;
  }

  /** The dancefloor's ring of speakers (Ed, v160): gameplay, always drawn and never see-through.
   *  Each shows its front to the camera, the far half facing in and the near half out, so its
   *  sprite is the drawn angle nearest its yaw, flipped for the other side; a playing speaker's
   *  cones pump on the beat. Anchored by its ground point, like a path piece. */
  private drawSpeakers(time: number, angle: number): void {
    const A = this.assets.speakerArt(), g = this.game;
    if (!A) return;
    if (!this.speakerBatch) {
      this.speakerBatch = new SpriteBatch(A.atlas, this.mpp, { solid: true });
      this.scene.add(...this.speakerBatch.meshes);
    }
    const mpp = this.mpp, U = SPRITE_UNIFORMS.uUp.value, R = SPRITE_UNIFORMS.uRight.value;
    const pitch = (angle * Math.PI) / 180, upOnScreen = U.dot(this.v3.set(0, Math.cos(pitch), -Math.sin(pitch)));
    const beat = (time * g.tuning.beat.bpm) / 60, ph = beat - Math.floor(beat);
    const list: SpriteInstance[] = [];
    g.map.dancefloor.speakers.forEach((sp, i) => {
      const face = Art.dancefloorSpeakerFacing(sp.ring) as { angle: number; flip: boolean }, state = g.speakers[i] ?? "playing";
      // Playing: rest, then the cones thump out and settle, once a beat; damaged: a slow stutter.
      const frame = state === "playing" ? (ph < 0.12 ? 2 : ph < 0.3 ? 1 : 0) : state === "damaged" ? Math.floor(time * 2.5 + i) % 2 : 0;
      const fi = A.frames[`${face.angle}:${state}:${frame}`];
      if (fi === undefined) return;
      const f = A.atlas.frames[fi], o = A.origin[face.angle], ox = face.flip ? f.w - o.x : o.x;
      const dx = (ox - f.w / 2) * mpp, below = Math.max(0, f.h - (f.pad ?? 0) - o.y) * mpp, d = (f.pad ?? 0) * mpp;
      const x = sp.x - R.x * dx, z = sp.z - R.z * dx + (below * upOnScreen) / Math.max(0.2, Math.sin(pitch));
      if (!this.inView(x, z, f.w * mpp, f.h * mpp, 6)) return;
      list.push({ x: x - U.x * d, y: -U.y * d, z: z - U.z * d, frame: f, flip: face.flip, fresh: this.mark("speaker", sp.x, sp.z, f.h * mpp) });
    });
    this.speakerBatch.set(list);
  }

  /** Stand the treehouse with its trunk's foot (its base anchor) on its spot: like a set piece's
   *  origin, the roots drawn below the foot lie on the ground nearer the camera, its lowest drawn
   *  pixel on the ground. Returns where its sprite stands (the bottom middle of its box). */
  private placeTreehouse(angle: number): { x: number; y: number; z: number } {
    const T = this.assets.treehouse, f = T.atlas.frames, th = this.game.map.treehouse, mpp = this.mpp, U = SPRITE_UNIFORMS.uUp.value;
    const pitch = (angle * Math.PI) / 180, upOnScreen = U.dot(this.v3.set(0, Math.cos(pitch), -Math.sin(pitch)));
    const pad = f[0].pad ?? 0, below = Math.max(0, f[0].h - pad - T.base.y) * mpp, d = pad * mpp;
    const x = th.x - (T.base.x - f[0].w / 2) * mpp, z = th.z + (below * upOnScreen) / Math.max(0.2, Math.sin(pitch));
    const at = { x: x - U.x * d, y: -U.y * d, z: z - U.z * d };
    this.treehouseBatch.set([{ ...at, frame: f[0], flip: false }, { ...at, frame: f[1], flip: false, top: true }]);
    return at;
  }

  /** Draw a frame; with draw false, only bring the camera, batches and art requests up to date. */
  render(time: number, draw = true): void {
    const g = this.game, t = g.tuning, pose = poseOf(g);
    // The scenery budget follows the real frame rate (only frames that are drawn count).
    if (draw) {
      const now = performance.now();
      if (this.lastReal) this.budget = stepBudget(this.budget, (now - this.lastReal) / 1000, t);
      this.lastReal = now;
    }
    if (this.sceneryFixed !== null) this.budget.radius = Math.min(t.haze.far, Math.max(1, this.sceneryFixed));
    LIGHT_UNIFORMS.uScenery.value.set(this.budget.radius, Math.max(1, t.scenery.fade));
    const a = (pose.angle * Math.PI) / 180;
    // Camera, snapped to the pixel grid along the screen's axes so the art does not shimmer.
    const wpp = (2 * pose.distance * Math.tan((t.camera.fov * Math.PI) / 360)) / this.height;
    const up = new THREE.Vector3(0, Math.cos(a), -Math.sin(a));
    const target = new THREE.Vector3(pose.tx, pose.ty, pose.tz);
    const u = target.dot(up), r = target.x;
    target.addScaledVector(up, Math.round(u / wpp) * wpp - u);
    target.x += Math.round(r / wpp) * wpp - r;
    const back = new THREE.Vector3(0, Math.sin(a), Math.cos(a)).multiplyScalar(pose.distance);
    this.camera.position.copy(target).add(back);
    this.camera.up.set(0, 1, 0);
    this.camera.lookAt(target);
    this.updateFrustum();

    // Sprites face the camera, tilted back toward it by spriteTilt.
    const tilt = t.spriteTilt;
    SPRITE_UNIFORMS.uUp.value.set(0, 1, 0).lerp(up, tilt).normalize();
    SPRITE_UNIFORMS.uFacing.value.crossVectors(SPRITE_UNIFORMS.uRight.value, SPRITE_UNIFORMS.uUp.value).normalize();
    // The canopy is always drawn; round the witch a hole is cut, sized to the view, which shrinks
    // to nothing as she rises (and opens as she descends).
    const lifted = canopyShown(g.witch), cut = t.canopyCutout;
    this.camera.updateMatrixWorld();
    const ws = this.v3.set(g.witch.x, witchHeight(g.witch, t) * 0.5, g.witch.z).project(this.camera);
    SPRITE_UNIFORMS.uCutout.value.set((ws.x * 0.5 + 0.5) * this.width, (ws.y * 0.5 + 0.5) * this.height, 0.5 * cut.screenFraction * this.width * (1 - lifted), Math.max(1, cut.edge * this.width * (1 - lifted)));
    SPRITE_UNIFORMS.uTopFade.value = lifted;
    SPRITE_UNIFORMS.uTrunkFade.value.set(t.trunkFade.metres, this.mpp);
    // The witch's glow reaches as far as the ground-mode canopy hole round her (Ed, v149: "about
    // the width of the canopy hiding circle"): the hole's radius plus its soft edge, in metres at
    // her depth, times glowToCutout; beyond it the forest is dark. ?glow= fixes it instead.
    if (!t.glowFixed) {
      const wx = g.witch.x, wz = g.witch.z, R = SPRITE_UNIFORMS.uRight.value;
      const a = this.v3.set(wx, 0, wz).project(this.camera).x, b = this.v3.set(wx + R.x * 10, 0, wz + R.z * 10).project(this.camera).x;
      const pxPerM = Math.max(1e-3, (Math.abs(b - a) * 0.5 * this.width) / 10);
      LIGHT_UNIFORMS.uGlowR.value = ((0.5 * cut.screenFraction + cut.edge) * this.width / pxPerM) * t.glowToCutout;
    }
    SPRITE_UNIFORMS.uDebugCull.value = this.debugCull ? 1 : 0;

    const w = g.witch, h = witchHeight(w, t);
    LIGHT_UNIFORMS.uGlowPos.value.set(w.x, h + t.glowHeight, w.z);
    LIGHT_UNIFORMS.uHazeCentre.value.set(w.x, w.z);
    this.updateSources(time);
    // The party: soundsystems rising in partifying areas, their lights, the sweeping fronts.
    const party = this.partyView.update(g, time, (x, z, ww, hh) => this.inView(x, z, ww, hh, 4), () => false);
    this.soundBatch.set(party.items);
    this.ground.setSweeps(party.sweeps);
    this.lasers.update(time, party.playing, w.x, w.z);
    // The canopy uplight over the nearest partified areas, fading in with each one's transition.
    {
      const U = SPRITE_UNIFORMS, P = t.party, list = [...g.party.areas.values()].map(a => ({ a, s: g.map.siteOf(a.cell[0], a.cell[1]) }))
        .sort((p, q) => Math.hypot(p.s.x - w.x, p.s.z - w.z) - Math.hypot(q.s.x - w.x, q.s.z - w.z)).slice(0, 16);
      list.forEach(({ a, s }, i) => {
        const fade = a.wave === 0 ? 1 : Math.min(1, Math.max(0, (time - a.at) / Math.max(0.01, P.transition)));
        U.uParty.value[i].set(s.x, s.z, g.map.areaSize * 0.85, fade);
        const c = sigilColour(AREA_TYPES[g.map.typeOf(a.cell[0], a.cell[1])].creature);
        U.uPartyCol.value[i].set(c[0] / 255, c[1] / 255, c[2] / 255);
      });
      U.uPartyCount.value = list.length;
      U.uUplight.value.set(P.uplight.strength, P.uplight.pulse, P.uplight.edge, (time * t.beat.bpm / 60) * Math.PI * 2);
    }
    this.strings.update();
    this.borders.update();
    // A point on the treehouse's sprite (its pixels) in the world, standing on its spot.
    const T = this.assets.treehouse, thf = T.atlas.frames[0], at = this.placeTreehouse(pose.angle), U2 = SPRITE_UNIFORMS;
    const onTreehouse = (px: number, py: number) => {
      const r = U2.uRight.value, u = U2.uUp.value, dx = (px - thf.w / 2) * this.mpp, dy = (thf.h - py) * this.mpp;
      return { x: at.x + r.x * dx + u.x * dy, y: at.y + r.y * dx + u.y * dy, z: at.z + r.z * dx + u.z * dy };
    };
    const thLights: ForestLight[] = T.lights.filter(l => l.kind === "lantern" || l.kind === "window").slice(0, 2).map(l => ({
      ...onTreehouse(l.x, l.y), reach: t.treehouse.lightReach, rgb: new THREE.Vector3(l.rgb[0] / 255, l.rgb[1] / 255, l.rgb[2] / 255), strength: t.treehouse.lightStrength * (0.92 + 0.08 * Math.sin(time * 3 + l.x)),
    }));
    const markerLights = this.drawMarkers(time);
    this.drawSpeakers(time, pose.angle);
    this.setLights([this.dancefloor.update(time, this.ground, g), ...party.lights, ...thLights, ...markerLights, ...this.forestLights], w.x, w.z);
    LIGHT_UNIFORMS.uTime.value = time;
    this.mist?.follow(pose.tx, pose.tz);
    const bob = Math.sin(time * 2.4) * 0.12;
    // Her hover frames, turned away when flying up the screen, leaning when fast.
    // Climbing to the treetops or dropping to the ground: the rise or descend pose, fluttering
    // between its two frames, until the move is about 90% done.
    const climbing = w.mode === "rising" && w.lift < 0.9, dropping = w.mode === "descending" && w.lift > 0.1;
    let wf = climbing || dropping ? (climbing ? 8 : 12) + (w.away ? 2 : 0) + (Math.floor(time * 7) % 2)
      : w.lean ? 6 + (w.away ? 1 : 0) : (w.away ? 3 : 0) + (Math.floor(time * 4) % 3);
    // Treetop momentum: skidding to brake on a sharp turn, and the fast pose at boost.
    if (!climbing && !dropping) {
      const Fl = this.assets.witchFly, sideF = w.away ? "away" : "towards";
      if (w.braking) wf = Fl.brake[sideF][Math.floor(time * Fl.brake.fps) % Fl.brake[sideF].length];
      else if ((w.boost ?? 0) > 0.7) wf = Fl.fast[sideF][Math.floor(time * Fl.fast.fps) % Fl.fast[sideF].length];
    }
    // Talking or handling a sigil, she lands first (Ed, 2026-10-03): down to the ground, then the
    // talk, placeSigil or liftSigil pose, and back up into the air when she's done.
    const L = g.leash, F = this.assets.witchFoot, side = w.away ? "away" : "towards";
    for (const e of L.events) if (e.kind === "placed" || e.kind === "fizzled") this.footAct = { pose: "placeSigil", at: time }; else if (e.kind === "picked") this.footAct = { pose: "liftSigil", at: time };
    const actLen = this.footAct ? F[this.footAct.pose].towards.length / F[this.footAct.pose].fps : 0;
    const acting = !!this.footAct && time - this.footAct.at < actLen + 0.3;
    const wantFoot = w.mode === "ground" && (!!L.talk || L.held || acting) ? 1 : 0;
    const fdt = Math.min(0.1, Math.max(0, time - this.footTime)), prevFoot = this.foot;
    this.footTime = time;
    this.foot += (wantFoot - this.foot) * Math.min(1, fdt * 8);
    if (Math.abs(wantFoot - this.foot) < 0.01) this.foot = wantFoot;
    const pick = (pose: string, k: number) => { const fr = F[pose][side]; return fr[Math.max(0, Math.min(fr.length - 1, k))]; };
    if (this.foot > 0.6) {
      if (acting && this.footAct) wf = pick(this.footAct.pose, Math.floor((time - this.footAct.at) * F[this.footAct.pose].fps));
      else if (L.talk) wf = pick("talk", Math.floor(time * F.talk.fps) % F.talk[side].length);
      else wf = pick("stand", Math.floor(time * F.stand.fps) % F.stand[side].length);
    } else if (this.foot > 0.02) wf = this.foot >= prevFoot ? pick("land", Math.floor(this.foot * 3)) : pick("takeoff", Math.floor((1 - this.foot) * 3));
    const footEase = this.foot * this.foot * (3 - 2 * this.foot), wy = (h + bob - 0.4) * (1 - footEase);
    // At the start she sits on the treehouse terrace (the sit pose, swinging her legs), and eases
    // off it into the air when she first moves.
    const sdt = Math.min(0.1, Math.max(0, time - this.seatTime));
    this.seatTime = time;
    this.seatK = w.seated ? 1 : Math.max(0, this.seatK - sdt / 0.6);
    let wx = w.x, wz = w.z, wyy = wy;
    if (this.seatK > 0) {
      const seat = onTreehouse(T.seat.x, T.seat.y), k = this.seatK * this.seatK * (3 - 2 * this.seatK);
      g.introFocus = { x: seat.x, y: seat.y + 1, z: seat.z }; // the opening shot frames her seat (the art's camera anchor when it has one)
      const fwd = this.camera.getWorldDirection(this.v3);
      wx += (seat.x - fwd.x * 0.6 - wx) * k; wyy += (seat.y - fwd.y * 0.6 - wyy) * k; wz += (seat.z - fwd.z * 0.6 - wz) * k;
      if (w.seated) wf = F.sit.towards[Math.floor(time * F.sit.fps) % F.sit.towards.length];
    }
    const wframe = this.assets.witch.frames[wf], hatTop = wyy + wframe.h * this.mpp;
    this.witchBatch.set([{ x: wx, y: wyy, z: wz, frame: wframe, flip: w.seated ? false : w.facing < 0 }]);
    // Where she is on screen (low-res pixels) and how far from the camera, for the occluder fade.
    {
      const px = (x: number, y: number, z: number) => { const p = this.v3.set(x, y, z).project(this.camera); return [(p.x + 1) / 2 * this.width, (p.y + 1) / 2 * this.height]; };
      const base = px(wx, wyy, wz), top = px(wx, hatTop, wz), side = px(wx + wframe.w * this.mpp / 2, wyy, wz);
      SPRITE_UNIFORMS.uWitch.value.set((base[0] + top[0]) / 2, (base[1] + top[1]) / 2, Math.abs(side[0] - base[0]) + 1, Math.abs(top[1] - base[1]) / 2 + 1);
      SPRITE_UNIFORMS.uWitchDepth.value = -this.v3.set(wx, this.seatK > 0 ? wyy : h, wz).applyMatrix4(this.camera.matrixWorldInverse).z;
    }
    this.shadow.position.set(wx, 0.03, wz);
    this.shadow.scale.setScalar((1 - 0.5 * canopyShown(w)) * (1 - this.seatK) + 1e-3); // none while she's up on the terrace

    this.refresh();
    this.easeAppearing();
    // Make the forest ahead a little each frame (about 4 ms), centred where the view will be in two
    // seconds at her speed, so a rebuild finds its chunks already made instead of making a whole
    // strip at once (a stutter flying into new forest).
    const lv = this.lastView;
    if (lv) this.stats.forestMissing = g.forest.prefetch(lv.x + w.vx * 2, lv.z + w.vz * 2, lv.half + 64, 4);
    this.stats.forestMs = g.forest.buildMs; g.forest.buildMs = 0;
    this.drawCreatures(time);
    this.drawBerries(time);
    this.checkPops("moving");
    this.rulers.update(this.camera, this.canvas.clientWidth || window.innerWidth, this.canvas.clientHeight || window.innerHeight, w.x, w.z);
    const df = g.map.dancefloor;
    this.music.update(this.camera, this.canvas.clientWidth || window.innerWidth, this.canvas.clientHeight || window.innerHeight, df.x, df.z, w.x, w.z, time, t.beat.bpm, this.debugReadouts);
    this.minimap.update(g.party, w.x, w.z);
    // The next waking stone, when it's off screen.
    {
      const nx = g.party.next, cw = this.canvas.clientWidth || window.innerWidth, ch = this.canvas.clientHeight || window.innerHeight;
      if (nx) {
        const s = g.map.soundsystemSpot(nx[0], nx[1]), species = AREA_TYPES[g.map.typeOf(nx[0], nx[1])].creature;
        const cd = waveCountdown(g.party, g.map, time);
        this.nextStone.update(this.camera, cw, ch, { x: s.x, z: s.z, colour: this.markerArt.colour.get(species)! }, w.x, w.z, time, t.beat.bpm, g.party.paused ? 0 : cd.gone);
      } else this.nextStone.update(this.camera, cw, ch, null, w.x, w.z, time, t.beat.bpm, 0);
    }
    this.leashView.update(time, this.camera, this.canvas.clientWidth || window.innerWidth, this.canvas.clientHeight || window.innerHeight, hatTop);
    this.assets.work(6);
    // The ground's area tiles: everything the cameras can see, plus a band ahead.
    this.stats.pendingGround = this.ground.fill(this.renderer, this.viewRect(t.haze.far, 40), w.x, w.z, 4);
    this.stats.pendingArt = this.assets.pending;
    if (this.debugCull) this.drawGhosts(time);
    if (!draw) return;
    this.renderer.info.reset();
    this.post.lift = this.game.witch.lift;
    this.post.render(this.scene, this.camera);
    // Anything set but not drawn (three.js capping a batch's instances) is a bug: count and log it.
    let dropped = 0;
    for (const b of [...this.typeBatches.values(), ...this.creatureBatches.values(), this.propBatch, this.soundBatch, ...(this.speakerBatch ? [this.speakerBatch] : [])]) dropped += b.dropped;
    if (dropped && !this.stats.dropped) console.warn(`view: ${dropped} sprite instances set but not drawn`);
    this.stats.dropped = dropped;
    this.stats.drawCalls = this.renderer.info.render.calls;
    this.stats.batches = this.typeBatches.size + this.creatureBatches.size;
    this.stats.sceneryRadius = this.budget.radius; this.stats.fps = this.budget.fps;
    this.stats.scenery = this.stats.trees + this.stats.bushes;
    this.stats.gameplay = this.stats.creatures + this.propBatch.count + this.soundBatch.count;
  }
}
