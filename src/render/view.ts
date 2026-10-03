// The Three.js view: reads the game state each frame and draws it. Rendered into a canvas of
// (window size / pixel size) and stretched with nearest-neighbour by the browser, so every art
// pixel stays a crisp square.
import * as THREE from "three";
import { sigilColour } from "../../art/generator.js";
import type { Game } from "../rules/game";
import { poseOf } from "../rules/game";
import { cameraPose } from "../rules/camera";
import { AREA_TYPES } from "../rules/map";
import { canopyShown, witchHeight } from "../rules/witch";
import { AssetLibrary, type CreatureArt, type TypeArt } from "./assets";
import type { Piece } from "./artBuild";
import type { LightSource, Plant } from "../rules/forest";
import { hash2 } from "../rules/random";
import { Ground } from "./ground";
import { applyStyleLight, LIGHT_UNIFORMS, MAX_LIGHTS } from "./lighting";
import { Post } from "./post";
import { Dancefloor } from "./dancefloor";
import { PartyView } from "./party";
import { StringLightsView } from "./strings";
import { LeashView } from "./leash";
import { Lasers } from "./lasers";
import { BorderView } from "./borders";
import { Mist } from "./mist";
import { ShadowBatch, type ShadowInstance } from "./shadows";
import { lerp } from "../rules/random";
import { SPRITE_UNIFORMS, SpriteBatch, type SpriteInstance } from "./sprites";
import type { Style } from "./style";

/** A point light: where, how far it reaches, its colour and strength. */
export interface ForestLight { x: number; y: number; z: number; reach: number; rgb: THREE.Vector3; strength: number }

export interface ViewStats { dropped: number; trees: number; bushes: number; creatures: number; batches: number; drawCalls: number; pendingArt: number; pendingGround: number; lights: number }

export class View {
  readonly renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private ground: Ground;
  readonly assets: AssetLibrary;
  private typeBatches = new Map<number, SpriteBatch>();
  private creatureBatches = new Map<string, SpriteBatch>();
  private witchBatch: SpriteBatch;
  private stoneBatch: SpriteBatch;
  private shadow: THREE.Mesh;
  private mpp: number; // metres per art pixel
  private lastBuild = { x: Infinity, y: Infinity, z: Infinity, version: -1 };
  readonly post: Post;
  private dancefloor: Dancefloor;
  private propBatch: SpriteBatch;
  private partyView: PartyView;
  private strings: StringLightsView;
  private leashView: LeashView;
  private lasers: Lasers;
  private borders: BorderView;
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
  private ghosts: { x: number; z: number; h: number; until: number }[] = [];
  private ghostLines: THREE.LineSegments | null = null;
  private now = 0;
  stats: ViewStats = { dropped: 0, trees: 0, bushes: 0, creatures: 0, batches: 0, drawCalls: 0, pendingArt: 0, pendingGround: 0, lights: 0 };

  constructor(readonly canvas: HTMLCanvasElement, readonly game: Game, readonly style: Style) {
    const t = game.tuning;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: "high-performance", preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(1);
    this.renderer.info.autoReset = false; // count every pass of a frame, reset in render()
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace; // colours are the art's own sRGB values, untouched
    this.mpp = 1 / (t.artPixelsPerMetre * (2 / t.pixelSize));
    this.camera = new THREE.PerspectiveCamera(t.camera.fov, 1, 1, 900);
    this.post = new Post(this.renderer, t);
    this.scene.background = new THREE.Color(0x0b0a16);
    applyStyleLight(style, t.glowReach, this.mpp, t.tone.ambient);
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
    this.scene.add(this.ground.mesh);

    this.witchBatch = new SpriteBatch(this.assets.witch, this.mpp, { unlit: true, onTop: true });
    this.scene.add(this.witchBatch.mesh);
    this.stoneBatch = new SpriteBatch(this.assets.stones, this.mpp);
    this.scene.add(this.stoneBatch.mesh);
    const d = game.map.dancefloor, stones: SpriteInstance[] = [];
    const n = game.tuning.dancefloor.stones;
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + 0.3;
      stones.push({ x: d.x + Math.cos(a) * d.radius, y: 0, z: d.z + Math.sin(a) * d.radius, frame: this.assets.stones.frames[i % 4], flip: i % 2 === 0 });
    }
    this.stoneBatch.set(stones);
    this.propBatch = new SpriteBatch(this.assets.props, this.mpp);
    this.scene.add(this.propBatch.mesh);
    this.partyView = new PartyView(this.assets.soundsystems, this.mpp);
    this.strings = new StringLightsView(this.scene, game);
    this.leashView = new LeashView(this.scene, game);
    this.lasers = new Lasers(this.scene, game);
    this.borders = new BorderView(this.scene, game);
    this.soundBatch = new SpriteBatch(this.assets.soundsystems, this.mpp);
    this.scene.add(this.soundBatch.mesh);
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
    // the forest ahead is ready however fast she flies.
    for (let t = 0; t < AREA_TYPES.length; t++) this.assets.prefetchType(t);
    for (const t of AREA_TYPES) this.assets.creatureArt(t.creature);
  }

  private batchFor<K>(map: Map<K, SpriteBatch>, key: K, atlas: () => SpriteBatch | undefined): SpriteBatch | undefined {
    let b = map.get(key);
    if (!b) { b = atlas(); if (b) { map.set(key, b); this.scene.add(b.mesh); } }
    return b;
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
  private inView(x: number, z: number, w: number, h: number, margin: number): boolean {
    const wx = this.game.witch.x, wz = this.game.witch.z, far = this.game.tuning.haze.far + margin;
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
        if (this.inInnerView(+x, +z, +h)) this.pops.push(`${what} ${kind} ${(+x).toFixed(0)},${(+z).toFixed(0)}`);
      };
      for (const k of tr.now) if (!tr.before.has(k)) at(k, "appeared");
      for (const k of tr.before) if (!tr.now.has(k)) at(k, "vanished");
    }
    tr.before = tr.now;
    tr.now = new Set();
  }

  private lastPose = { distance: 0, angle: 0, zoomStep: -1, lift: -1 };

  /** Rebuild the batches for what the camera sees, once it has moved, turned or zoomed. */
  private refresh(force = false): void {
    const g = this.game, t = g.tuning, cam = this.camera, margin = t.viewMargin, pose = poseOf(g);
    const key = { x: cam.position.x, y: cam.position.y, z: cam.position.z };
    const lp = this.lastPose, lift = g.witch.mode === "rising" || g.witch.mode === "treetop" ? 1 : 0;
    const moved = Math.hypot(key.x - this.lastBuild.x, key.y - this.lastBuild.y, key.z - this.lastBuild.z) >= margin / 3;
    const turned = Math.abs(pose.distance - lp.distance) > 2 || Math.abs(pose.angle - lp.angle) > 0.5 || g.camera.zoomStep !== lp.zoomStep || lift !== lp.lift;
    if (!force && !moved && !turned && this.assets.version === this.lastBuild.version) return;
    this.lastBuild = { ...key, version: this.assets.version };
    this.lastPose = { distance: pose.distance, angle: pose.angle, zoomStep: g.camera.zoomStep, lift };
    const r = this.viewRect(t.haze.far, margin), cx = (r.minX + r.maxX) / 2, cz = (r.minZ + r.maxZ) / 2, half = Math.max(r.maxX - r.minX, r.maxZ - r.minZ) / 2;
    const shadows: ShadowInstance[] = [];
    // Shadows fall away from the moon: from the upper left, so toward the lower right.
    const L = LIGHT_UNIFORMS.uMoonDir.value, sx = -L.x / Math.max(0.2, L.y), sz = -L.z / Math.max(0.2, L.y);
    const per = new Map<number, SpriteInstance[]>();
    const add = (type: number, inst: SpriteInstance) => { let l = per.get(type); if (!l) per.set(type, (l = [])); l.push(inst); };
    const mpp = this.mpp;
    let nt = 0, nb = 0;
    for (const p of g.forest.treesNear(cx, cz, half)) {
      const art = this.assets.typeArt(p.type);
      if (!art || !art.layout.big.length) continue;
      const f = art.atlas.frames, big = art.layout.big[p.variant % art.layout.big.length], whole = f[big.top ?? big.bot];
      if (!this.inView(p.x, p.z, whole.w * mpp, whole.h * mpp, margin)) continue;
      const fresh = this.mark("tree", p.x, p.z, whole.h * mpp);
      add(p.type, { x: p.x, y: 0, z: p.z, frame: f[big.bot], flip: p.flip, fresh });
      if (big.top !== null) add(p.type, { x: p.x, y: 0, z: p.z, frame: f[big.top], flip: p.flip, top: true, fresh });
      const w = whole.w * mpp, h = whole.h * mpp * (big.top === null ? 0.2 : 0.6);
      if (t.shadows.trees) shadows.push({ x: p.x + sx * h, z: p.z + sz * h, w: w * 0.8, d: w * 0.45 });
      nt++;
    }
    const scatter = (kind: string, list: Plant[], pick: (l: TypeArt["layout"]) => Piece[]) => {
      for (const p of list) {
        const art = this.assets.typeArt(p.type);
        if (!art) continue;
        const pieces = pick(art.layout);
        if (!pieces.length) continue;
        const piece = pieces[p.variant % pieces.length], f = art.atlas.frames, frame = f[piece.bot], whole = f[piece.top ?? piece.bot];
        if (!this.inView(p.x, p.z, whole.w * mpp, whole.h * mpp, margin)) continue;
        const fresh = this.mark(kind, p.x, p.z, whole.h * mpp);
        add(p.type, { x: p.x, y: 0, z: p.z, frame, flip: p.flip, fresh });
        if (piece.top !== null) add(p.type, { x: p.x, y: 0, z: p.z, frame: f[piece.top], flip: p.flip, top: true, fresh });
        shadows.push({ x: p.x, z: p.z, w: frame.w * mpp * 0.8, d: frame.w * mpp * 0.3 });
        nb++;
      }
    };
    scatter("small", g.forest.bushesNear(cx, cz, half), l => l.small);
    scatter("wall", g.forest.wallsNear(cx, cz, half), l => l.walls.map(bot => ({ bot, top: null })));
    scatter("setpiece", g.forest.setPiecesNear(cx, cz, half), l => (l.set === null ? [] : [l.set]));
    for (const [type, b] of this.typeBatches) if (!per.has(type)) b.set([]);
    for (const [type, list] of per) {
      const b = this.batchFor(this.typeBatches, type, () => { const a = this.assets.typeArt(type); return a && new SpriteBatch(a.atlas, mpp); });
      b?.set(list);
    }
    this.checkPops("placed", !force);
    this.sources = g.forest.lightsNear(g.witch.x, g.witch.z, t.haze.far + margin);
    this.stats.trees = nt; this.stats.bushes = nb;
    this.shadowList = shadows;
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
      l.push({ x: c.x + sway, y: dance, z: c.z, frame, flip: c.facing < 0, fresh });
      creatureShadows.push({ x: c.x, z: c.z, w: frame.w * this.mpp * 0.7, d: frame.w * this.mpp * 0.25 });
      n++;
    }
    for (const [s, b] of this.creatureBatches) if (!per.has(s)) b.set([]);
    for (const [s, list] of per) {
      const b = this.batchFor(this.creatureBatches, s, () => { const a = arts.get(s); return a && new SpriteBatch(a.atlas, this.mpp); });
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

  /** Draw a frame; with draw false, only bring the camera, batches and art requests up to date. */
  render(time: number, draw = true): void {
    const g = this.game, t = g.tuning, pose = poseOf(g);
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
    this.strings.update();
    this.borders.update();
    this.setLights([this.dancefloor.update(time, this.ground), ...party.lights, ...this.forestLights], w.x, w.z);
    LIGHT_UNIFORMS.uTime.value = time;
    this.mist?.follow(pose.tx, pose.tz);
    const bob = Math.sin(time * 2.4) * 0.12;
    // Her hover frames, turned away when flying up the screen, leaning when fast.
    const wf = w.lean ? 6 + (w.away ? 1 : 0) : (w.away ? 3 : 0) + (Math.floor(time * 4) % 3);
    const wframe = this.assets.witch.frames[wf], hatTop = h + bob - 0.4 + wframe.h * this.mpp;
    this.witchBatch.set([{ x: w.x, y: h + bob - 0.4, z: w.z, frame: wframe, flip: w.facing < 0 }]);
    this.shadow.position.set(w.x, 0.03, w.z);
    this.shadow.scale.setScalar(1 - 0.5 * canopyShown(w));

    this.refresh();
    this.drawCreatures(time);
    this.checkPops("moving");
    this.leashView.update(time, this.camera, this.canvas.clientWidth || window.innerWidth, this.canvas.clientHeight || window.innerHeight, hatTop);
    this.assets.work(6);
    // The ground's area tiles: everything the cameras can see, plus a band ahead.
    this.stats.pendingGround = this.ground.fill(this.renderer, this.viewRect(t.haze.far, 40), w.x, w.z, 4);
    this.stats.pendingArt = this.assets.pending;
    if (this.debugCull) this.drawGhosts(time);
    if (!draw) return;
    this.renderer.info.reset();
    this.post.render(this.scene, this.camera);
    // Anything set but not drawn (three.js capping a batch's instances) is a bug: count and log it.
    let dropped = 0;
    for (const b of [...this.typeBatches.values(), ...this.creatureBatches.values(), this.propBatch, this.soundBatch]) dropped += b.dropped;
    if (dropped && !this.stats.dropped) console.warn(`view: ${dropped} sprite instances set but not drawn`);
    this.stats.dropped = dropped;
    this.stats.drawCalls = this.renderer.info.render.calls;
    this.stats.batches = this.typeBatches.size + this.creatureBatches.size;
  }
}
