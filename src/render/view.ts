// The Three.js view: reads the game state each frame and draws it. Rendered into a canvas of
// (window size / pixel size) and stretched with nearest-neighbour by the browser, so every art
// pixel stays a crisp square.
import * as THREE from "three";
import type { Game } from "../rules/game";
import { poseOf } from "../rules/game";
import { canopyShown, witchHeight } from "../rules/witch";
import { AssetLibrary } from "./assets";
import { Ground } from "./ground";
import { applyStyleLight, LIGHT_UNIFORMS } from "./lighting";
import { SPRITE_UNIFORMS, SpriteBatch, type SpriteInstance } from "./sprites";
import type { Style } from "./style";

export interface ViewStats { trees: number; bushes: number; creatures: number; batches: number; drawCalls: number; pendingArt: number; pendingGround: number }

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
  private lastBuild = { x: Infinity, z: Infinity, version: -1 };
  private prefetch = false;
  private width = 1;
  private height = 1;
  stats: ViewStats = { trees: 0, bushes: 0, creatures: 0, batches: 0, drawCalls: 0, pendingArt: 0, pendingGround: 0 };

  constructor(readonly canvas: HTMLCanvasElement, readonly game: Game, readonly style: Style) {
    const t = game.tuning;
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: "high-performance", preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(1);
    this.renderer.outputColorSpace = THREE.LinearSRGBColorSpace; // colours are the art's own sRGB values, untouched
    this.mpp = 1 / (t.artPixelsPerMetre * (2 / t.pixelSize));
    this.camera = new THREE.PerspectiveCamera(t.camera.fov, 1, 0.5, 600);
    this.scene.background = new THREE.Color(0x0b0a16);
    applyStyleLight(style, t.glowReach, this.mpp);
    this.assets = new AssetLibrary(style, game.seed, t.pixelSize);
    this.ground = new Ground(game.map, style, this.mpp);
    this.scene.add(this.ground.mesh);

    this.witchBatch = new SpriteBatch(this.assets.witch, this.mpp, { unlit: true, onTop: true });
    this.scene.add(this.witchBatch.mesh);
    this.stoneBatch = new SpriteBatch(this.assets.stones, this.mpp);
    this.scene.add(this.stoneBatch.mesh);
    const d = game.map.dancefloor, stones: SpriteInstance[] = [];
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2 + 0.3;
      stones.push({ x: d.x + Math.cos(a) * d.radius, y: 0, z: d.z + Math.sin(a) * d.radius, frame: this.assets.stones.frames[i % 4], flip: i % 2 === 0 });
    }
    this.stoneBatch.set(stones);

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

  /** Fit the canvas to the window: low resolution, scaled up by the pixel size. */
  resize(cssW: number, cssH: number): void {
    const p = this.game.tuning.pixelSize;
    this.width = Math.max(1, Math.ceil(cssW / p));
    this.height = Math.max(1, Math.ceil(cssH / p));
    this.renderer.setSize(this.width, this.height, false);
    this.canvas.style.width = this.width * p + "px";
    this.canvas.style.height = this.height * p + "px";
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
  }

  /** Make the art and ground round the start before the first frame. */
  async prepare(): Promise<void> {
    this.refresh(true);
    this.drawCreatures();
    this.ground.fill(this.renderer, this.game.witch.x, this.game.witch.z, 50, Infinity);
    await this.assets.whenIdle();
    this.prefetch = true;
    this.refresh(true);
  }

  private batchFor<K>(map: Map<K, SpriteBatch>, key: K, atlas: () => SpriteBatch | undefined): SpriteBatch | undefined {
    let b = map.get(key);
    if (!b) { b = atlas(); if (b) { map.set(key, b); this.scene.add(b.mesh); } }
    return b;
  }

  /** Rebuild the tree and bush batches round the camera, when it has moved far enough. */
  private refresh(force = false): void {
    const g = this.game, cam = g.camera, R = g.tuning.drawRadius;
    const cx = cam.tx, cz = cam.tz - R * 0.25;
    if (!force && Math.hypot(cx - this.lastBuild.x, cz - this.lastBuild.z) < 6 && this.assets.version === this.lastBuild.version) return;
    this.lastBuild = { x: cx, z: cz, version: this.assets.version };
    const per = new Map<number, SpriteInstance[]>();
    const add = (type: number, inst: SpriteInstance) => { let l = per.get(type); if (!l) per.set(type, (l = [])); l.push(inst); };
    // Ask ahead for the art of every area a little beyond what is drawn.
    const A = g.map.areaSize, ahead = R + A * 1.5;
    if (this.prefetch) for (let cy = Math.floor((cz - ahead) / A); cy <= Math.floor((cz + ahead) / A); cy++)
      for (let cx2 = Math.floor((cx - ahead) / A); cx2 <= Math.floor((cx + ahead) / A); cx2++) this.assets.prefetchType(g.map.typeOf(cx2, cy));
    const trees = g.forest.treesNear(cx, cz, R), bushes = g.forest.bushesNear(cx, cz, R * 0.8);
    let nt = 0, nb = 0;
    for (const p of trees) {
      const art = this.assets.typeArt(p.type);
      if (!art) continue;
      const f = art.atlas.frames;
      add(p.type, { x: p.x, y: 0, z: p.z, frame: f[art.treeFrame(p.variant, false)], flip: p.flip });
      add(p.type, { x: p.x, y: 0, z: p.z, frame: f[art.treeFrame(p.variant, true)], flip: p.flip, top: true });
      nt++;
    }
    for (const p of bushes) {
      const art = this.assets.typeArt(p.type);
      if (!art) continue;
      add(p.type, { x: p.x, y: 0, z: p.z, frame: art.atlas.frames[art.bushFrame(p.variant)], flip: p.flip });
      nb++;
    }
    for (const [type, b] of this.typeBatches) if (!per.has(type)) b.set([]);
    for (const [type, list] of per) {
      const b = this.batchFor(this.typeBatches, type, () => { const a = this.assets.typeArt(type); return a && new SpriteBatch(a.atlas, this.mpp); });
      b?.set(list);
    }
    this.stats.trees = nt; this.stats.bushes = nb;
  }

  private drawCreatures(): void {
    const g = this.game, cam = g.camera, R = g.tuning.drawRadius;
    const per = new Map<string, SpriteInstance[]>();
    let n = 0;
    for (const c of g.creatures) {
      if (Math.abs(c.x - cam.tx) > R || Math.abs(c.z - cam.tz) > R) continue;
      const art = this.assets.creatureArt(c.species);
      if (!art) continue;
      const frame = art.atlas.frames[art.frame(c.level, c.moving ? Math.floor(c.walk) % 2 : 0)];
      let l = per.get(c.species);
      if (!l) per.set(c.species, (l = []));
      l.push({ x: c.x, y: 0, z: c.z, frame, flip: c.facing < 0 });
      n++;
    }
    for (const [s, b] of this.creatureBatches) if (!per.has(s)) b.set([]);
    for (const [s, list] of per) {
      const b = this.batchFor(this.creatureBatches, s, () => { const a = this.assets.creatureArt(s); return a && new SpriteBatch(a.atlas, this.mpp); });
      b?.set(list);
    }
    this.stats.creatures = n;
  }

  render(time: number): void {
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
    SPRITE_UNIFORMS.uTopFade.value = canopyShown(g.witch);

    const w = g.witch, h = witchHeight(w, t);
    LIGHT_UNIFORMS.uGlowPos.value.set(w.x, h + t.glowHeight, w.z);
    const bob = Math.sin(time * 2.4) * 0.12;
    this.witchBatch.set([{ x: w.x, y: h + bob - 0.4, z: w.z, frame: this.assets.witch.frames[0], flip: w.facing < 0 }]);
    this.shadow.position.set(w.x, 0.03, w.z);
    this.shadow.scale.setScalar(1 - 0.5 * canopyShown(w));

    this.refresh();
    this.drawCreatures();
    this.assets.work(6);
    this.stats.pendingGround = this.ground.fill(this.renderer, pose.tx, pose.tz - 10, t.drawRadius + 20, 3);
    this.stats.pendingArt = this.assets.pending;
    this.renderer.render(this.scene, this.camera);
    this.stats.drawCalls = this.renderer.info.render.calls;
    this.stats.batches = this.typeBatches.size + this.creatureBatches.size;
  }
}
