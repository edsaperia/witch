// The Three.js view: reads the game state each frame and draws it. Rendered into a canvas of
// (window size / pixel size) and stretched with nearest-neighbour by the browser, so every art
// pixel stays a crisp square.
import * as THREE from "three";
import type { Game } from "../rules/game";
import { poseOf } from "../rules/game";
import { AREA_TYPES } from "../rules/map";
import { canopyShown, witchHeight } from "../rules/witch";
import { AssetLibrary, type TypeArt } from "./assets";
import type { Piece } from "./artBuild";
import type { LightSource, Plant } from "../rules/forest";
import { hash2 } from "../rules/random";
import { Ground } from "./ground";
import { applyStyleLight, LIGHT_UNIFORMS, MAX_LIGHTS } from "./lighting";
import { Post } from "./post";
import { Dancefloor } from "./dancefloor";
import { Mist } from "./mist";
import { ShadowBatch, type ShadowInstance } from "./shadows";
import { lerp } from "../rules/random";
import { SPRITE_UNIFORMS, SpriteBatch, type SpriteInstance } from "./sprites";
import type { Style } from "./style";

/** A point light: where, how far it reaches, its colour and strength. */
export interface ForestLight { x: number; y: number; z: number; reach: number; rgb: THREE.Vector3; strength: number }

export interface ViewStats { trees: number; bushes: number; creatures: number; batches: number; drawCalls: number; pendingArt: number; pendingGround: number; lights: number }

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
  private sources: LightSource[] = [];
  /** Lights in the forest besides the witch's glow, from the light sources (set by the view). */
  private forestLights: ForestLight[] = [];
  private shadows: ShadowBatch;
  private shadowList: ShadowInstance[] = [];
  private mist: Mist | null = null;
  private width = 1;
  private height = 1;
  stats: ViewStats = { trees: 0, bushes: 0, creatures: 0, batches: 0, drawCalls: 0, pendingArt: 0, pendingGround: 0, lights: 0 };

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
    this.assets = new AssetLibrary(style, game.seed, t.pixelSize);
    this.ground = new Ground(game.map, style, this.mpp);
    this.assets.onFloor = (type, tile) => this.ground.setFloor(type, tile);
    const cs = t.canopyShadow;
    this.ground.setCanopyShadow(cs.on ? cs.strength : 0, cs.height, cs.cover, cs.wind);
    this.shadows = new ShadowBatch(t.shadows.strength);
    this.shadows.mesh.visible = t.shadows.on;
    this.scene.add(this.shadows.mesh);
    if (t.mist.on && t.mist.strength > 0) { this.mist = new Mist(t.mist.strength, t.mist.height, t.mist.wind, this.mpp); this.scene.add(this.mist.mesh); }
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
    this.dancefloor = new Dancefloor(game.map, t, SPRITE_UNIFORMS, this.mpp);
    this.scene.add(this.dancefloor.ball, this.dancefloor.beam);

    // A dithered shadow under the witch, so her height reads.
    const sm = new THREE.ShaderMaterial({
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
  }

  /** Make the art and ground round the start before the first frame. */
  async prepare(): Promise<void> {
    this.render(0, false);
    this.drawCreatures();
    this.ground.fill(this.renderer, this.game.witch.x, this.game.witch.z, 50, Infinity);
    await this.assets.whenIdle();
    this.updateFrustum();
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

  // What the camera can see: its frustum, and the patch of ground under it (plus a margin), so
  // trees are only ever added or dropped off screen and never pop in view.
  private frustum = new THREE.Frustum();
  private box = new THREE.Box3();
  private m4 = new THREE.Matrix4();
  private v3 = new THREE.Vector3();
  private drawn = new Set<string>();
  pops: string[] = [];

  private updateFrustum(): void {
    this.camera.updateMatrixWorld();
    this.m4.multiplyMatrices(this.camera.projectionMatrix, this.camera.matrixWorldInverse);
    this.frustum.setFromProjectionMatrix(this.m4);
  }

  /** The ground rectangle the camera can see, out to `far` metres from the witch, plus `margin`. */
  private viewRect(far: number, margin: number) {
    const cam = this.camera, o = cam.position, w = this.game.witch, pts: [number, number][] = [];
    for (const nx of [-1, 1]) for (const ny of [-1, 1]) {
      const d = this.v3.set(nx, ny, 1).unproject(cam).sub(o).normalize();
      for (const h of [0, 25]) {
        let t = d.y < -1e-3 ? (h - o.y) / d.y : Infinity;
        if (!(t > 0)) t = Infinity;
        t = Math.min(t, far + o.distanceTo(new THREE.Vector3(w.x, o.y, w.z)) + margin);
        pts.push([o.x + d.x * t, o.z + d.z * t]);
      }
    }
    pts.push([o.x, o.z]);
    const xs = pts.map(p => p[0]), zs = pts.map(p => p[1]);
    return { minX: Math.min(...xs) - margin, maxX: Math.max(...xs) + margin, minZ: Math.min(...zs) - margin, maxZ: Math.max(...zs) + margin };
  }

  /** Whether a sprite standing at (x, z), w wide and h tall, may be on screen (with a margin). */
  private inView(x: number, z: number, w: number, h: number, margin: number): boolean {
    const wx = this.game.witch.x, wz = this.game.witch.z, far = this.game.tuning.haze.far + margin;
    if ((x - wx) ** 2 + (z - wz) ** 2 > far * far) return false;
    this.box.min.set(x - w / 2 - margin, -margin, z - h - margin);
    this.box.max.set(x + w / 2 + margin, h + margin, z + margin);
    return this.frustum.intersectsBox(this.box);
  }

  /** Whether a point is well inside the screen and near enough to be seen clearly. */
  private inInnerView(x: number, z: number, h: number): boolean {
    const w = this.game.witch;
    if (Math.hypot(x - w.x, z - w.z) > this.game.tuning.haze.near) return false;
    for (const y of [0, h]) {
      const p = this.v3.set(x, y, z).project(this.camera);
      if (Math.abs(p.x) < 0.85 && Math.abs(p.y) < 0.85 && p.z < 1) return true;
    }
    return false;
  }

  /** Rebuild the batches for what the camera sees, once it has moved a few metres. */
  private refresh(force = false): void {
    const g = this.game, t = g.tuning, cam = this.camera, margin = t.viewMargin;
    const key = { x: cam.position.x, y: cam.position.y, z: cam.position.z };
    if (!force && Math.hypot(key.x - this.lastBuild.x, key.y - this.lastBuild.y, key.z - this.lastBuild.z) < margin / 3 && this.assets.version === this.lastBuild.version) return;
    this.lastBuild = { ...key, version: this.assets.version };
    const r = this.viewRect(t.haze.far, margin), cx = (r.minX + r.maxX) / 2, cz = (r.minZ + r.maxZ) / 2, half = Math.max(r.maxX - r.minX, r.maxZ - r.minZ) / 2;
    const shadows: ShadowInstance[] = [];
    // Shadows fall away from the moon: from the upper left, so toward the lower right.
    const L = LIGHT_UNIFORMS.uMoonDir.value, sx = -L.x / Math.max(0.2, L.y), sz = -L.z / Math.max(0.2, L.y);
    const per = new Map<number, SpriteInstance[]>(), drawn = new Set<string>();
    const add = (type: number, inst: SpriteInstance) => { let l = per.get(type); if (!l) per.set(type, (l = [])); l.push(inst); };
    const mpp = this.mpp;
    let nt = 0, nb = 0;
    for (const p of g.forest.treesNear(cx, cz, half)) {
      const art = this.assets.typeArt(p.type);
      if (!art || !art.layout.big.length) continue;
      const f = art.atlas.frames, big = art.layout.big[p.variant % art.layout.big.length], whole = f[big.top ?? big.bot];
      if (!this.inView(p.x, p.z, whole.w * mpp, whole.h * mpp, margin)) continue;
      add(p.type, { x: p.x, y: 0, z: p.z, frame: f[big.bot], flip: p.flip });
      if (big.top !== null) add(p.type, { x: p.x, y: 0, z: p.z, frame: f[big.top], flip: p.flip, top: true });
      const w = whole.w * mpp, h = whole.h * mpp * (big.top === null ? 0.2 : 0.6);
      shadows.push({ x: p.x + sx * h, z: p.z + sz * h, w: w * 0.8, d: w * 0.45 });
      drawn.add(`${p.x.toFixed(2)},${p.z.toFixed(2)},${whole.h * mpp}`);
      nt++;
    }
    const scatter = (list: Plant[], pick: (l: TypeArt["layout"]) => Piece[]) => {
      for (const p of list) {
        const art = this.assets.typeArt(p.type);
        if (!art) continue;
        const pieces = pick(art.layout);
        if (!pieces.length) continue;
        const piece = pieces[p.variant % pieces.length], f = art.atlas.frames, frame = f[piece.bot], whole = f[piece.top ?? piece.bot];
        if (!this.inView(p.x, p.z, whole.w * mpp, whole.h * mpp, margin)) continue;
        add(p.type, { x: p.x, y: 0, z: p.z, frame, flip: p.flip });
        if (piece.top !== null) add(p.type, { x: p.x, y: 0, z: p.z, frame: f[piece.top], flip: p.flip, top: true });
        shadows.push({ x: p.x, z: p.z, w: frame.w * mpp * 0.8, d: frame.w * mpp * 0.3 });
        nb++;
      }
    };
    scatter(g.forest.bushesNear(cx, cz, half), l => l.small);
    scatter(g.forest.wallsNear(cx, cz, half), l => l.walls.map(bot => ({ bot, top: null })));
    scatter(g.forest.setPiecesNear(cx, cz, half), l => (l.set === null ? [] : [l.set]));
    for (const [type, b] of this.typeBatches) if (!per.has(type)) b.set([]);
    for (const [type, list] of per) {
      const b = this.batchFor(this.typeBatches, type, () => { const a = this.assets.typeArt(type); return a && new SpriteBatch(a.atlas, mpp); });
      b?.set(list);
    }
    // Pop check: a tree that appears or disappears where the player can clearly see it is a bug.
    if (!force && this.assets.pending === 0) {
      const check = (k: string, what: string) => { const [x, z, h] = k.split(",").map(Number); if (this.inInnerView(x, z, h)) this.pops.push(`${what} ${x.toFixed(0)},${z.toFixed(0)}`); };
      for (const k of drawn) if (!this.drawn.has(k)) check(k, "appeared");
      for (const k of this.drawn) if (!drawn.has(k)) check(k, "vanished");
    }
    this.drawn = drawn;
    this.sources = g.forest.lightsNear(g.witch.x, g.witch.z, t.haze.far + margin);
    this.stats.trees = nt; this.stats.bushes = nb;
    this.shadowList = shadows;
  }

  private drawCreatures(): void {
    const g = this.game, cam = g.camera, R = g.tuning.haze.far;
    const per = new Map<string, SpriteInstance[]>(), creatureShadows: ShadowInstance[] = [];
    let n = 0;
    for (const c of g.creatures) {
      if (Math.abs(c.x - cam.tx) > R || Math.abs(c.z - cam.tz) > R) continue;
      const art = this.assets.creatureArt(c.species);
      if (!art) continue;
      const frame = art.atlas.frames[art.frame(c.level, c.moving ? Math.floor(c.walk) % 2 : 0)];
      if (!this.inView(c.x, c.z, frame.w * this.mpp, frame.h * this.mpp, 4)) continue;
      let l = per.get(c.species);
      if (!l) per.set(c.species, (l = []));
      l.push({ x: c.x, y: 0, z: c.z, frame, flip: c.facing < 0 });
      creatureShadows.push({ x: c.x, z: c.z, w: frame.w * this.mpp * 0.7, d: frame.w * this.mpp * 0.25 });
      n++;
    }
    for (const [s, b] of this.creatureBatches) if (!per.has(s)) b.set([]);
    for (const [s, list] of per) {
      const b = this.batchFor(this.creatureBatches, s, () => { const a = this.assets.creatureArt(s); return a && new SpriteBatch(a.atlas, this.mpp); });
      b?.set(list);
    }
    this.stats.creatures = n;
    if (this.game.tuning.shadows.on) this.shadows.set(this.shadowList.concat(creatureShadows));
  }

  // Campfires flicker, magic stones pulse; their props are drawn, ponds go to the ground.
  private fire = new THREE.Vector3(1, 0.5, 0.16);
  private runeCyan = new THREE.Vector3(0.3, 0.9, 1);
  private runeViolet = new THREE.Vector3(0.75, 0.45, 1);
  private updateSources(time: number): void {
    const f = this.assets.props.frames, items: SpriteInstance[] = [], lights: ForestLight[] = [], ponds: { x: number; z: number; r: number; d: number }[] = [];
    const w = this.game.witch;
    for (const src of this.sources) {
      const k = hash2(Math.round(src.x * 10), Math.round(src.z * 10), 7);
      if (src.kind === "pond") { ponds.push({ x: src.x, z: src.z, r: 3 * src.size, d: Math.hypot(src.x - w.x, src.z - w.z) }); continue; }
      if (src.kind === "campfire") {
        const flick = 0.8 + 0.12 * Math.sin(time * 11 + k * 40) + 0.08 * Math.sin(time * 23.7 + k * 13);
        lights.push({ x: src.x + Math.sin(time * 9 + k) * 0.08, y: 1.2, z: src.z, reach: 13 * src.size, rgb: this.fire, strength: 1.6 * flick });
        if (this.inView(src.x, src.z, 2, 2, 2)) items.push({ x: src.x, y: 0, z: src.z, frame: f[Math.floor(time * 7 + k * 10) % 2], flip: k < 0.5 });
      } else {
        const violet = k < 0.4, pulse = 0.7 + 0.3 * Math.sin(time * 0.9 + k * 20);
        lights.push({ x: src.x, y: 2, z: src.z, reach: 10 * src.size, rgb: violet ? this.runeViolet : this.runeCyan, strength: 1.1 * pulse });
        if (this.inView(src.x, src.z, 1.2, 2.6, 2)) items.push({ x: src.x, y: 0, z: src.z, frame: f[violet ? 3 : 2], flip: k < 0.5 });
      }
    }
    this.propBatch.set(items);
    this.forestLights = lights;
    this.ground.setPonds(ponds.sort((a, b) => a.d - b.d));
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

    // Sprites face the camera, tilted back toward it by spriteTilt.
    const tilt = t.spriteTilt;
    SPRITE_UNIFORMS.uUp.value.set(0, 1, 0).lerp(up, tilt).normalize();
    SPRITE_UNIFORMS.uFacing.value.crossVectors(SPRITE_UNIFORMS.uRight.value, SPRITE_UNIFORMS.uUp.value).normalize();
    // The canopy is always drawn; round the witch a hole is cut, sized to the view, which shrinks
    // to nothing as she rises (and opens as she descends).
    const lifted = canopyShown(g.witch), cut = t.canopyCutout;
    this.camera.updateMatrixWorld();
    const ws = this.v3.set(g.witch.x, witchHeight(g.witch, t) * 0.5, g.witch.z).project(this.camera);
    SPRITE_UNIFORMS.uCutout.value.set((ws.x * 0.5 + 0.5) * this.width, (ws.y * 0.5 + 0.5) * this.height, cut.radius * this.height * (1 - lifted), Math.max(1, cut.edge * this.height * (1 - lifted)));
    SPRITE_UNIFORMS.uTopFade.value = lifted;

    const w = g.witch, h = witchHeight(w, t);
    LIGHT_UNIFORMS.uGlowPos.value.set(w.x, h + t.glowHeight, w.z);
    LIGHT_UNIFORMS.uHazeCentre.value.set(w.x, w.z);
    this.updateSources(time);
    this.setLights([this.dancefloor.update(time, this.ground), ...this.forestLights], w.x, w.z);
    LIGHT_UNIFORMS.uTime.value = time;
    this.mist?.follow(pose.tx, pose.tz);
    const bob = Math.sin(time * 2.4) * 0.12;
    this.witchBatch.set([{ x: w.x, y: h + bob - 0.4, z: w.z, frame: this.assets.witch.frames[0], flip: w.facing < 0 }]);
    this.shadow.position.set(w.x, 0.03, w.z);
    this.shadow.scale.setScalar(1 - 0.5 * canopyShown(w));

    this.updateFrustum();
    this.refresh();
    this.drawCreatures();
    this.assets.work(6);
    const groundR = lerp(t.haze.near, t.haze.far, canopyShown(w)) * 0.8;
    this.stats.pendingGround = this.ground.fill(this.renderer, pose.tx, pose.tz - groundR * 0.5, groundR, 3);
    this.stats.pendingArt = this.assets.pending;
    if (!draw) return;
    this.renderer.info.reset();
    this.post.render(this.scene, this.camera);
    this.stats.drawCalls = this.renderer.info.render.calls;
    this.stats.batches = this.typeBatches.size + this.creatureBatches.size;
  }
}
