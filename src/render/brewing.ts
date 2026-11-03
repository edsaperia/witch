// Pixel-art kitchen props and short brewing animation. Bounded textures: halos, furniture behind her, furniture in front of her
// (the painter's rule: a prop whose foot is south of hers covers her), then smoke in front.
import * as THREE from 'three';
import { paintKitchenCauldron, paintMushroomBasket } from './brewingProps';
import type { View } from './view';
import { kitchenPlan, basketNear } from '../rules/mushrooms';
import { fromPlan, toPlan } from '../rules/houseRooms';
import { deckOf } from '../rules/treehouse';
import { MUSHROOM_COLOURS } from './mushroomArt';
import { pixelTexture } from './houseFurniture';
import { complement, subtractiveMaterial } from './mushroomGlow';
import { brewingFrame } from './brewingFrame';
import { edLayoutRequested } from '../rules/housePlacement';
import { HOUSE_OVER_HER_ORDER, inFrontOfHer } from './houseWitchPass';

type Point = { x: number; y: number; z: number };
type PixelMap = (x: number, z: number, dx: number, dy: number) => Point;
/** How far south of the hub a point of the plan lies (render/houseRooms.ts south): the house's drawing depth. */
const south = (x: number, z: number) => fromPlan({ x: 0, z: 0 }, x, z).z;
function panel(order: number) {
  const canvas = document.createElement('canvas'), texture = pixelTexture(canvas), geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(12), 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), 2));
  geometry.setIndex([0, 1, 2, 0, 2, 3]);
  const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, depthTest: false, side: THREE.DoubleSide }));
  mesh.frustumCulled = false; mesh.renderOrder = order;
  return { canvas, texture, mesh };
}
const rgba = (hex: string, alpha: number) => {
  const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${alpha})`;
};
export class BrewingView {
  readonly group = new THREE.Group();
  private readonly back = panel(19.943);
  private readonly halo = panel(19.9429);
  /** The props standing in front of her (inFrontOfHer), drawn after her room pass (HOUSE_OVER_HER_ORDER); the rest stay on `back`. */
  private readonly over = panel(HOUSE_OVER_HER_ORDER);
  private readonly front = panel(19.956);
  private lastFrame = '';
  constructor() { subtractiveMaterial(this.halo.mesh.material); this.group.add(this.halo.mesh, this.back.mesh, this.over.mesh, this.front.mesh); }
  /** `her`: her point on the house's plan (null: she isn't in it); the cauldron and each basket south of it are painted over her. */
  update(v: View, pxWorld: PixelMap, pitch: number, her: { x: number; z: number } | null = null): void {
    const g = v.game, state = g.mushrooms, layout = kitchenPlan();
    if (!state || !layout || g.cauldron) { this.group.visible = false; return; }
    this.group.visible = true;
    const ppm = 1 / v.mpp, room = layout.room;
    const { width, height, ox, oy } = brewingFrame(layout, ppm, pitch, edLayoutRequested());
    for (const p of this.panels) {
      if (p.canvas.width !== width || p.canvas.height !== height) {
        // A warm draw may already have allocated immutable GPU storage at the old size.
        // Release that storage before repainting; needsUpdate below uploads the new dimensions.
        p.texture.dispose(); p.canvas.width = width; p.canvas.height = height;
      }
      const pos = p.mesh.geometry.getAttribute('position') as THREE.BufferAttribute;
      [[-ox, -oy], [width - ox, -oy], [width - ox, height - oy], [-ox, height - oy]].forEach(([dx, dy], i) => {
        const q = pxWorld(room.x, room.z, dx, dy); pos.setXYZ(i, q.x, q.y, q.z);
      }); pos.needsUpdate = true;
    }
    const selected = basketNear(g)?.type ?? '';
    const herSouth = her ? south(her.x, her.z) : null, inFront = (q: { x: number; z: number }) => inFrontOfHer(south(q.x, q.z), herSouth);
    const potOver = inFront(layout.cauldron), basketsOver = layout.baskets.map(inFront);
    const key = `${Math.floor(g.herTime * 12)}:${width}:${height}:${ox}:${oy}:${pitch.toFixed(3)}:${selected}:${+potOver}${basketsOver.map(Number).join('')}`;
    if (this.lastFrame === key) return;
    this.lastFrame = key;
    const c = this.back.canvas.getContext('2d')!, o = this.over.canvas.getContext('2d')!, f = this.front.canvas.getContext('2d')!, halo = this.halo.canvas.getContext('2d')!;
    halo.clearRect(0, 0, width, height);
    c.clearRect(0, 0, width, height); o.clearRect(0, 0, width, height); f.clearRect(0, 0, width, height);
    c.imageSmoothingEnabled = o.imageSmoothingEnabled = f.imageSmoothingEnabled = false;
    const p = (x: number, z: number, h = 0) => [Math.round(ox + (x - room.x) * ppm), Math.round(oy + ((z - room.z) * pitch - h) * ppm)];
    const ellipse = (ctx: CanvasRenderingContext2D, x: number, y: number, rx: number, ry: number, colour: string) => {
      ctx.fillStyle = colour; ctx.beginPath(); ctx.ellipse(Math.round(x), Math.round(y), Math.max(.5, rx), Math.max(.5, ry), 0, 0, Math.PI * 2); ctx.fill();
    };
    const darkGlow = (x: number, y: number, radius: number, type: string) => {
      const rgb = complement(type).map(c => Math.round(c * 255)), grad = halo.createRadialGradient(x, y, 0, x, y, radius);
      grad.addColorStop(0, `rgba(${rgb.join(',')},0.42)`); grad.addColorStop(1, `rgba(${rgb.join(',')},0)`);
      halo.fillStyle = grad; halo.fillRect(Math.floor(x - radius), Math.floor(y - radius), Math.ceil(radius * 2), Math.ceil(radius * 2));
    };
    const pot = layout.cauldron, [cx, cy] = p(pot.x, pot.z);
    const contents = state.ingredients, smoke = state.smoke;
    const colours = (smoke?.recipe ?? contents).map(type => MUSHROOM_COLOURS[type]);
    const paint = { c, f, ppm, p, ellipse, darkGlow, rgba };
    paintKitchenCauldron(potOver ? { ...paint, c: o } : paint, { ...pot, id: "cauldron" }, state, g.herTime);
    // Woven baskets, tiny natural variations, with their mushroom colour visible in the lining even when empty.
    layout.baskets.forEach((basket, i) => {
      paintMushroomBasket(basketsOver[i] ? { ...paint, c: o } : paint, { ...basket, id: `mushroom-basket:${basket.type}`, index: i }, state, selected);
    });
    const deck = deckOf(g.map, g.tuning);
    if (deck) for (const flight of state.flights) {
      const q = Math.max(0, Math.min(1, (g.herTime - flight.at) / (flight.lands - flight.at)));
      if (q >= 1) continue;
      const a = toPlan(deck, flight.from.x, flight.from.z), b = toPlan(deck, flight.to.x, flight.to.z);
      const h0 = flight.kind === 'brew' ? 1.4 : 1.8, h1 = flight.kind === 'brew' ? 5.4 : 1.4;
      const [x, y] = p(a.x + (b.x - a.x) * q, a.z + (b.z - a.z) * q, h0 + (h1 - h0) * q + Math.sin(q * Math.PI) * 3.5);
      f.fillStyle = '#dcc3a1'; f.fillRect(x - 1, y, Math.max(1, Math.round(.22 * ppm)), Math.round(.7 * ppm));
      ellipse(f, x, y, .5 * ppm, .3 * ppm, MUSHROOM_COLOURS[flight.type]);
      ellipse(f, x - .15 * ppm, y - .09 * ppm, .10 * ppm, .08 * ppm, '#fff9da');
    }
    if (smoke) {
      const age = g.herTime - smoke.at, remaining = smoke.until - g.herTime;
      const opacity = Math.min(1, age / 1.2, remaining / 1.2);
      for (let i = 0; i < 32; i++) {
        const angle = i * 2.399, spread = Math.min(1, age / 2.5), radius = (2 + (i % 5)) * spread;
        const x = cx + Math.cos(angle + age * .10) * radius * ppm;
        const y = cy + (3 * spread - (i % 7) * 1.5 + Math.sin(age * .7 + i) * .4) * ppm;
        ellipse(f, x, y, (1.8 + (i % 3) * .5) * ppm, (1.25 + (i % 4) * .2) * ppm, rgba(colours[i % colours.length], opacity * .65));
      }
    }
    // Snap the physical artwork to whole opaque pixels. Smoke keeps its translucent pixel coverage.
    for (const ctx of [c, o]) {
      const pixels = ctx.getImageData(0, 0, width, height);
      for (let i = 3; i < pixels.data.length; i += 4) pixels.data[i] = pixels.data[i] < 100 ? 0 : 255;
      ctx.putImageData(pixels, 0, 0);
    }
    for (const p of this.panels) p.texture.needsUpdate = true;
  }
  private get panels() { return [this.halo, this.back, this.over, this.front]; }
  dispose(): void { for (const p of this.panels) { p.texture.dispose(); p.mesh.geometry.dispose(); p.mesh.material.dispose(); } }
}
