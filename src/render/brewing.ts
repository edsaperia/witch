// Pixel-art kitchen props and short brewing animation. Bounded textures: halos, furniture, then smoke in front.
import * as THREE from 'three';
import type { View } from './view';
import { kitchenPlan, basketNear } from '../rules/mushrooms';
import { toPlan } from '../rules/houseRooms';
import { deckOf } from '../rules/treehouse';
import { MUSHROOM_COLOURS } from './mushroomArt';
import { pixelTexture } from './houseFurniture';
import { complement, subtractiveMaterial } from './mushroomGlow';

type Point = { x: number; y: number; z: number };
type PixelMap = (x: number, z: number, dx: number, dy: number) => Point;
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
  private readonly front = panel(19.956);
  private lastFrame = '';
  constructor() { subtractiveMaterial(this.halo.mesh.material); this.group.add(this.halo.mesh, this.back.mesh, this.front.mesh); }
  update(v: View, pxWorld: PixelMap, pitch: number): void {
    const g = v.game, state = g.mushrooms, layout = kitchenPlan();
    if (!state || !layout) { this.group.visible = false; return; }
    this.group.visible = true;
    const ppm = 1 / v.mpp, room = layout.room, width = Math.ceil(24 * ppm), height = Math.ceil(25 * ppm);
    const ox = width / 2, oy = 17 * ppm;
    for (const p of [this.halo, this.back, this.front]) {
      if (p.canvas.width !== width || p.canvas.height !== height) { p.canvas.width = width; p.canvas.height = height; }
      const pos = p.mesh.geometry.getAttribute('position') as THREE.BufferAttribute;
      [[-ox, -oy], [width - ox, -oy], [width - ox, height - oy], [-ox, height - oy]].forEach(([dx, dy], i) => {
        const q = pxWorld(room.x, room.z, dx, dy); pos.setXYZ(i, q.x, q.y, q.z);
      }); pos.needsUpdate = true;
    }
    const selected = basketNear(g)?.type ?? '';
    const key = `${Math.floor(g.herTime * 12)}:${width}:${pitch.toFixed(3)}:${selected}`;
    if (this.lastFrame === key) return;
    this.lastFrame = key;
    const c = this.back.canvas.getContext('2d')!, f = this.front.canvas.getContext('2d')!, halo = this.halo.canvas.getContext('2d')!;
    halo.clearRect(0, 0, width, height);
    c.clearRect(0, 0, width, height); f.clearRect(0, 0, width, height);
    c.imageSmoothingEnabled = f.imageSmoothingEnabled = false;
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
    const colour = colours.length ? colours[Math.floor(g.herTime * 1.3) % colours.length] : '#171b20';
    const lit = contents.length > 0 || !!smoke;
    // Iron bowl, little feet and side handles; the empty bowl remains visibly dark and hollow.
    ellipse(c, cx, cy, 5.1 * ppm, 1.3 * ppm, '#191319');
    for (const side of [-1, 1]) {
      ellipse(c, cx + side * 3.1 * ppm, cy - .55 * ppm, .43 * ppm, 1 * ppm, '#2a252a');
      ellipse(c, cx + side * 4.8 * ppm, cy - 3.4 * ppm, .75 * ppm, 1.1 * ppm, '#6c6261');
      ellipse(c, cx + side * 4.8 * ppm, cy - 3.4 * ppm, .43 * ppm, .69 * ppm, '#211e25');
    }
    ellipse(c, cx, cy - 2.9 * ppm, 4.7 * ppm, 2.8 * ppm, '#29282e');
    ellipse(c, cx - .65 * ppm, cy - 3 * ppm, 3.9 * ppm, 2.35 * ppm, '#474247');
    ellipse(c, cx - 1.9 * ppm, cy - 3.45 * ppm, 1.25 * ppm, 1.8 * ppm, '#595052');
    // Riveted band and warm reflected colour along the bowl.
    c.fillStyle = '#252329'; c.fillRect(Math.round(cx - 4.4 * ppm), Math.round(cy - 2.7 * ppm), Math.round(8.8 * ppm), Math.max(1, Math.round(.24 * ppm)));
    for (let i = -3; i <= 3; i += 2) ellipse(c, cx + i * ppm, cy - 2.55 * ppm, .11 * ppm, .11 * ppm, '#94816e');
    ellipse(c, cx, cy - 5 * ppm, 5 * ppm, 1.5 * ppm, '#1a1d22');
    ellipse(c, cx, cy - 5.15 * ppm, 4.8 * ppm, 1.35 * ppm, '#7c7773');
    ellipse(c, cx, cy - 5.17 * ppm, 4.4 * ppm, 1.03 * ppm, lit ? colour : '#0c1016');
    if (lit) {
      ellipse(c, cx - .8 * ppm, cy - 5.4 * ppm, 3.15 * ppm, .35 * ppm, rgba('#ffffff', .24));
      for (let k = 0; k < 9; k++) {
        const q = (g.herTime * .7 + k * .173) % 1, a = k * 2.4;
        ellipse(c, cx + Math.cos(a) * 3.7 * ppm, cy - (5.2 + Math.sin(a) * .5) * ppm,
          (.12 + q * .32) * ppm, (.08 + q * .18) * ppm, rgba('#fff9c9', .7 * (1 - q)));
      }
      for (let k = 0; k < 7; k++) {
        const flame = 1.0 + .5 * Math.sin(g.herTime * 11 + k * 1.9), x = cx + (k - 3) * .7 * ppm;
        ellipse(c, x, cy - .25 * ppm, .45 * ppm, flame * ppm, '#d95720');
        ellipse(c, x, cy - .2 * ppm, .23 * ppm, flame * .65 * ppm, '#ffdf6d');
      }
      if (contents.length > 1) for (let k = 0; k < 14; k++) {
        const age = (g.herTime * .35 + k * .137) % 1, x = cx + Math.sin(k * 7.1) * 3.7 * ppm;
        ellipse(f, x + Math.sin(age * 8 + k) * ppm * .3, cy - (5.3 + age * 3) * ppm, .10 * ppm, .10 * ppm, rgba(colours[k % colours.length], 1 - age));
      }
    }
    // Woven baskets, tiny natural variations, with their mushroom colour visible in the lining even when empty.
    layout.baskets.forEach((basket, i) => {
      const [x, y] = p(basket.x, basket.z), w = (1.35 + .09 * Math.sin(i * 5)) * ppm, h = (1.25 + .12 * Math.sin(i * 3)) * ppm;
      const fill = state.baskets[basket.type] ?? 0, col = MUSHROOM_COLOURS[basket.type];
      if (fill > 0) darkGlow(x, y - h, w * 1.65, basket.type);
      if (selected === basket.type) ellipse(c, x, y, w * .85, h * .43, rgba(col, .6));
      for (const side of [-1, 1]) {
        ellipse(c, x + side * w * .48, y - h * 1.05, w * .13, h * .30, '#a38b6b');
        ellipse(c, x + side * w * .48, y - h * 1.05, w * .065, h * .19, '#362a23');
      }
      ellipse(c, x, y - h * .45, w * .6, h * .7, '#5e4636');
      ellipse(c, x, y - h * .5, w * .51, h * .62, i % 2 ? '#ae8a5e' : '#b99a71');
      for (let row = 0; row < 5; row++) {
        const yy = y - h * .1 - row * h * .2;
        c.fillStyle = row % 2 ? '#73553c' : '#d0b181'; c.fillRect(Math.round(x - w * .5), Math.round(yy), Math.round(w), 1);
      }
      for (let colx = -2; colx <= 2; colx++) { c.fillStyle = '#806345'; c.fillRect(Math.round(x + colx * w * .17), Math.round(y - h), 1, Math.round(h)); }
      ellipse(c, x, y - h, w * .6, h * .3, '#d3bb8e');
      ellipse(c, x, y - h, w * .45, h * .20, '#42352c');
      c.fillStyle = col; c.fillRect(Math.round(x - w * .13), Math.round(y - h * .5), Math.max(1, Math.round(w * .26)), Math.max(1, Math.round(h * .22)));
      const visible = fill === 0 ? 0 : fill <= 5 ? 2 : fill <= 15 ? 5 : 9;
      for (let j = 0; j < visible; j++) {
        const xx = x + Math.sin(j * 2.4 + i) * w * (fill > 15 ? .57 : .30), yy = y - h * (.9 + (j > 3 ? .25 : 0)) + Math.cos(j * 1.7) * h * .12;
        ellipse(c, xx, yy, w * .20, h * .14, col); ellipse(c, xx - w * .05, yy - h * .04, .09 * ppm, .07 * ppm, '#fff5d9');
      }
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
    const pixels = c.getImageData(0, 0, width, height);
    for (let i = 3; i < pixels.data.length; i += 4) pixels.data[i] = pixels.data[i] < 100 ? 0 : 255;
    c.putImageData(pixels, 0, 0); this.back.texture.needsUpdate = this.front.texture.needsUpdate = this.halo.texture.needsUpdate = true;
  }
  dispose(): void { for (const p of [this.halo, this.back, this.front]) { p.texture.dispose(); p.mesh.geometry.dispose(); p.mesh.material.dispose(); } }
}
