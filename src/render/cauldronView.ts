// Cauldron-only presentation. Existing mushroom art and house palette; no shared effects,
// lighting or post-shader changes (coordinator #1472 comment6513317902).
import * as THREE from "three";
import { decorSprite } from "../../art/houseDecor.js";
import { furnitureColours } from "../../art/furniture.js";
import { M } from "../../art/core.js";
import { MUSHROOM_KINDS } from "../rules/cauldron";
import { inKitchen, kitchenBasketNear, kitchenBasketPoints } from "../rules/cauldronNight";
import { tripStrength } from "../rules/cauldronTrip";
import { HOUSE_ROOMS, toPlan } from "../rules/houseRooms";
import { litCanvas } from "./houseFurniture";
import type { Drawn } from "./housePieces";
import { bendPoint, groundHeight } from "./height";
import { glyphOf } from "../ui/keyHint";
import type { View } from "./view";
import { cauldronMaterial, mirrorGroundLight, mirrorSpriteMaterial } from "./cauldronMaterials";

const VERT = `varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}`;
const FRAG = `uniform sampler2D picture; uniform float strength,time; varying vec2 vUv;
void main(){
  vec2 edge=abs(vUv-.5)*2.; float k=smoothstep(.65,1.,max(edge.x,edge.y));
  vec2 uv=clamp(vUv+strength*k*.003*vec2(sin(vUv.y*27.+time*1.7),sin(vUv.x*23.+time*1.3)),.001,.999);
  gl_FragColor=texture2D(picture,uv);
}`;

interface Reflection { mesh: THREE.Mesh; source: THREE.ShaderMaterial; up: THREE.IUniform; strength: THREE.IUniform }

export class CauldronView {
  private group = new THREE.Group();
  private reflections = new Map<THREE.Mesh, Reflection>();
  private pickups = new Map<number, THREE.Sprite>();
  private baskets: THREE.Sprite[] = [];
  private contents: THREE.Sprite[] = [];
  private mushroomTextures: THREE.CanvasTexture[] = [];
  private basketTexture: THREE.CanvasTexture | null = null;
  private tag: HTMLDivElement | null = null;
  private smoke: HTMLDivElement | null = null;
  private attached: THREE.Scene | null = null;
  private picture: THREE.FramebufferTexture | null = null;
  private screen = new THREE.Scene();
  private camera = new THREE.Camera();
  private material = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG,
    uniforms: { picture: { value: null }, strength: { value: 0 }, time: { value: 0 } }, depthTest: false, depthWrite: false });
  private quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.material);
  private amount = 0;
  private lastCounts = Array(6).fill(0) as number[];
  private jumps: { sprite: THREE.Sprite; from: THREE.Vector3; to: THREE.Vector3; at: number }[] = [];
  private bubbles: THREE.Sprite[] = [];
  private ground: { mesh: THREE.Mesh; original: THREE.ShaderMaterial; trip: THREE.ShaderMaterial } | null = null;

  constructor() { this.group.name = "Cauldron slice"; this.screen.add(this.quad); }

  private sprite(texture: THREE.Texture): THREE.Sprite {
    const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false, depthTest: false }));
    sprite.center.set(.5, 0); sprite.renderOrder = 12;
    this.group.add(sprite);
    return sprite;
  }

  private init(v: View): void {
    if (this.basketTexture) return;
    // Reuse the already-authored glowing mushroom/stump model with its existing variation seeds.
    for (const seed of [11, 29]) {
      const canvas = litCanvas(decorSprite("mushrooms", seed, v.style, { ppm: 24 }) as Drawn, "kitchen", v.style);
      const texture = new THREE.CanvasTexture(canvas);
      texture.magFilter = texture.minFilter = THREE.NearestFilter;
      texture.generateMipmaps = false;
      this.mushroomTextures.push(texture);
    }
    const canvas = document.createElement("canvas"); canvas.width = 24; canvas.height = 18;
    const ctx = canvas.getContext("2d")!, colours = furnitureColours(v.style, "kitchen") as Record<string, number[]>;
    const rgb = (id: number) => `rgb(${colours[id].join(",")})`;
    ctx.fillStyle = rgb(M.BARKD); ctx.fillRect(1, 3, 22, 4); ctx.fillRect(3, 6, 18, 11);
    ctx.fillStyle = rgb(M.WOOD);
    for (let y = 7; y < 17; y += 3) ctx.fillRect(4, y, 16, 1);
    for (let x = 5; x < 21; x += 4) ctx.fillRect(x, 6, 1, 10);
    ctx.fillRect(2, 4, 20, 1);
    this.basketTexture = new THREE.CanvasTexture(canvas);
    this.basketTexture.magFilter = this.basketTexture.minFilter = THREE.NearestFilter;
    for (let i = 0; i < 6; i++) {
      this.baskets.push(this.sprite(this.basketTexture));
      this.contents.push(this.sprite(this.mushroomTextures[i % 2]));
    }
    const bubble = document.createElement("canvas"); bubble.width = bubble.height = 8;
    const bg = bubble.getContext("2d")!;
    bg.fillStyle = "#ffffff"; bg.fillRect(2, 0, 4, 1); bg.fillRect(0, 2, 1, 4); bg.fillRect(7, 2, 1, 4); bg.fillRect(2, 7, 4, 1);
    bg.fillRect(1, 1, 1, 1); bg.fillRect(6, 1, 1, 1); bg.fillRect(1, 6, 1, 1); bg.fillRect(6, 6, 1, 1);
    const bubbleTexture = new THREE.CanvasTexture(bubble); bubbleTexture.magFilter = bubbleTexture.minFilter = THREE.NearestFilter;
    for (let i = 0; i < 8; i++) {
      const sprite = this.sprite(bubbleTexture);
      (sprite.material as THREE.SpriteMaterial).color.setRGB(...(colours[[M.MAGIC, M.GLINT, M.COLLAR][i % 3]].map(x => x / 255) as [number, number, number]));
      this.bubbles.push(sprite);
    }
    this.tag = document.createElement("div");
    this.tag.style.cssText = "position:fixed;z-index:35;pointer-events:none;color:#fff;text-shadow:0 2px 2px #000;transform:translate(-50%,-100%);font:16px sans-serif;display:none";
    document.body.append(this.tag);
    this.tag.addEventListener("pointerdown", e => { if (v.useDevice === "touch") { e.preventDefault(); v.onUse?.(true); } });
    this.tag.addEventListener("pointerup", () => v.onUse?.(false));
    this.tag.addEventListener("pointercancel", () => v.onUse?.(false));
    this.smoke = document.createElement("div");
    this.smoke.style.cssText = "position:fixed;inset:0;z-index:34;pointer-events:none;opacity:0;background:radial-gradient(ellipse at 40% 65%,#b6dbd8cc,transparent 70%),radial-gradient(ellipse at 65% 45%,#bd9bc9cc,transparent 75%)";
    document.body.append(this.smoke);
  }

  update(v: View): void {
    const g = v.game, state = g.cauldron;
    if (this.attached !== v.scene) { this.attached?.remove(this.group); v.scene.add(this.group); this.attached = v.scene; }
    this.group.visible = !!state;
    this.amount = tripStrength(g.witches[0].cauldronTrip);
    if (!state) { if (this.tag) this.tag.style.display = "none"; if (this.smoke) this.smoke.style.opacity = "0"; this.updateGround(v); return; }
    this.init(v);
    for (const sprite of this.pickups.values()) sprite.visible = false;
    for (const mushroom of state.pickups) {
      let sprite = this.pickups.get(mushroom.id);
      if (!sprite) { sprite = this.sprite(this.mushroomTextures[mushroom.kind === "B" ? 1 : 0]); this.pickups.set(mushroom.id, sprite); }
      sprite.visible = !mushroom.collected && !g.witch.perch && Math.hypot(mushroom.x - g.witch.x, mushroom.z - g.witch.z) < 80;
      sprite.position.copy(bendPoint(new THREE.Vector3(mushroom.x, groundHeight(mushroom.x, mushroom.z) + .04, mushroom.z)));
      sprite.scale.set(1.5, 1.5, 1);
    }
    const plan = v.houseRooms?.plan, nearby = kitchenBasketNear(g, g.witches[0]), points = kitchenBasketPoints(g);
    const pot = HOUSE_ROOMS.objects.find(o => o.id === "cauldron");
    const potPoint = plan && pot ? plan.o.clone().addScaledVector(plan.ex, pot.x).addScaledVector(plan.ez, pot.z).addScaledVector(plan.ey, 2) : null;
    for (let i = 0; i < 6; i++) {
      const basket = this.baskets[i], content = this.contents[i];
      basket.visible = content.visible = !!plan && inKitchen(g, g.witches[0]);
      if (!plan || !points[i]) continue;
      const p = toPlan(g.map.treehouse, points[i].x, points[i].z);
      basket.position.copy(plan.o).addScaledVector(plan.ex, p.x).addScaledVector(plan.ez, p.z);
      const tremble = nearby === i ? Math.sin(g.herTime * 24) * .035 : 0;
      basket.position.addScaledVector(plan.ex, tremble);
      basket.scale.setScalar(plan.ey.length() * 1.35);
      (basket.material as THREE.SpriteMaterial).color.setScalar(nearby === i ? 1.45 : 1);
      content.position.copy(basket.position).addScaledVector(plan.ey, .5);
      content.scale.setScalar(plan.ey.length() * .8);
      content.visible &&= state.stock.baskets[MUSHROOM_KINDS[i]] > 0;
      const count = state.stock.baskets[MUSHROOM_KINDS[i]], change = count - this.lastCounts[i];
      if (plan && potPoint && inKitchen(g, g.witches[0]) && change) {
        const p = toPlan(g.map.treehouse, g.witch.x, g.witch.z);
        const from = change > 0 ? plan.o.clone().addScaledVector(plan.ex, p.x).addScaledVector(plan.ez, p.z).addScaledVector(plan.ey, 1) : content.position.clone();
        const to = change > 0 ? content.position.clone() : potPoint.clone();
        for (let j = 0; j < Math.min(Math.abs(change), 6); j++) {
          const sprite = this.sprite(this.mushroomTextures[i % 2]); sprite.scale.setScalar(plan.ey.length() * .6);
          this.jumps.push({ sprite, from: from.clone(), to: to.clone(), at: g.herTime + j * .06 });
        }
      }
      this.lastCounts[i] = count;
      if (nearby === i && this.tag) {
        const s = content.position.clone().addScaledVector(plan.ey, .8).project(v.camera), rect = v.canvas.getBoundingClientRect();
        this.tag.style.left = `${rect.left + (s.x + 1) * rect.width / 2}px`;
        this.tag.style.top = `${rect.top + (1 - s.y) * rect.height / 2}px`;
        this.tag.textContent = `${glyphOf("game.use", v.useDevice)} · ${state.stock.baskets[MUSHROOM_KINDS[i]]}`;
      }
    }
    if (this.tag) { this.tag.style.display = nearby >= 0 ? "block" : "none"; this.tag.style.pointerEvents = v.useDevice === "touch" ? "auto" : "none"; }
    const brew = state.kitchen.brew;
    for (const jump of this.jumps) {
      const t = Math.max(0, Math.min(1, (g.herTime - jump.at) / .5));
      jump.sprite.position.lerpVectors(jump.from, jump.to, t);
      if (plan) jump.sprite.position.addScaledVector(plan.ey, Math.sin(t * Math.PI));
      jump.sprite.visible = !!plan && inKitchen(g, g.witches[0]) && g.herTime >= jump.at && t < 1;
    }
    this.jumps = this.jumps.filter(jump => {
      if (g.herTime - jump.at < .5) return true;
      this.group.remove(jump.sprite); (jump.sprite.material as THREE.Material).dispose(); return false;
    });
    this.bubbles.forEach((bubble, i) => {
      bubble.visible = !!brew && !!potPoint && inKitchen(g, g.witches[0]);
      if (!potPoint || !plan || !brew) return;
      const t = (brew.elapsed * 1.4 + i / 8) % 1;
      bubble.position.copy(potPoint).addScaledVector(plan.ex, Math.sin(i * 2.4 + t * 3) * .8).addScaledVector(plan.ey, t * 3);
      bubble.scale.setScalar(plan.ey.length() * (.15 + t * .4));
      (bubble.material as THREE.SpriteMaterial).opacity = 1 - t;
    });
    if (this.smoke) this.smoke.style.opacity = brew?.recipients.includes(g.witches[0].id) ? String(Math.min(.95, brew.elapsed * 1.5)) : "0";
    this.updateReflections(v);
    this.updateGround(v);
  }

  private updateGround(v: View): void {
    const mesh = v.ground.mesh;
    if (this.ground && this.ground.mesh !== mesh) {
      this.ground.mesh.material = this.ground.original; this.ground.trip.dispose(); this.ground = null;
    }
    if (this.amount > 0 && !this.ground && mesh.material instanceof THREE.ShaderMaterial) {
      const original = mesh.material, trip = cauldronMaterial(original);
      trip.uniforms.cauldronGroundLight = { value: mirrorGroundLight(this.amount) };
      trip.fragmentShader = "uniform float cauldronGroundLight;\n" + original.fragmentShader.replace("void main()", "void cauldronGround()")
        + "\nvoid main(){cauldronGround();gl_FragColor.rgb*=cauldronGroundLight;}";
      this.ground = { mesh, original, trip };
    }
    if (this.ground) {
      this.ground.trip.uniforms.cauldronGroundLight.value = mirrorGroundLight(this.amount);
      mesh.material = this.amount > 0 ? this.ground.trip : this.ground.original;
    }
  }

  private updateReflections(v: View): void {
    const seen = new Set<THREE.Mesh>();
    if (this.amount > 0) v.scene.traverse(object => {
      if (!(object instanceof THREE.Mesh) || object.userData.cauldronReflection || !object.visible) return;
      const source = object.material;
      if (!(source instanceof THREE.ShaderMaterial) || !object.geometry.hasAttribute("iPos") || !source.uniforms.uUp
        || source.uniforms.uFadePass?.value !== 0 || source.uniforms.uSilhouette?.value.w || source.uniforms.uLie?.value || source.uniforms.uLies?.value) return;
      seen.add(object);
      let reflected = this.reflections.get(object);
      if (!reflected) {
        const material = mirrorSpriteMaterial(source);
        const mesh = new THREE.Mesh(object.geometry, material); mesh.userData.cauldronReflection = true;
        mesh.frustumCulled = false; mesh.renderOrder = -.1; mesh.matrixAutoUpdate = false;
        reflected = { mesh, source, up: { value: new THREE.Vector3() }, strength: { value: this.amount } };
        this.reflections.set(object, reflected); this.group.add(mesh);
      }
      const material = reflected.mesh.material as THREE.ShaderMaterial;
      material.uniforms = { ...source.uniforms, uUp: reflected.up, cauldronStrength: reflected.strength };
      (reflected.up.value as THREE.Vector3).copy(source.uniforms.uUp.value).negate();
      reflected.strength.value = this.amount;
      reflected.mesh.geometry = object.geometry; reflected.mesh.visible = true;
      object.updateWorldMatrix(true, false); reflected.mesh.matrix.copy(object.matrixWorld);
    });
    for (const [source, reflection] of this.reflections) {
      reflection.mesh.visible = seen.has(source);
      if (!source.parent) { this.group.remove(reflection.mesh); (reflection.mesh.material as THREE.Material).dispose(); this.reflections.delete(source); }
    }
  }

  /** Final image only: a slight edge wobble, leaving the central picture still. */
  finish(v: View): void {
    if (this.amount <= 0) return;
    const size = v.renderer.getDrawingBufferSize(new THREE.Vector2());
    if (!this.picture || this.picture.image.width !== size.x || this.picture.image.height !== size.y) {
      this.picture?.dispose(); this.picture = new THREE.FramebufferTexture(size.x, size.y);
    }
    v.renderer.copyFramebufferToTexture(this.picture);
    this.material.uniforms.picture.value = this.picture;
    this.material.uniforms.strength.value = this.amount;
    this.material.uniforms.time.value = v.game.herTime;
    const clear = v.renderer.autoClear; v.renderer.autoClear = false;
    v.renderer.render(this.screen, this.camera); v.renderer.autoClear = clear;
  }
}
