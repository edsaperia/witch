// Pure extraction of the current potion kitchen painter. No art constants or drawing order changed.
import type { MushroomColour, MushroomState } from "../rules/mushrooms";
import { MUSHROOM_COLOURS } from "./mushroomArt";
import type { KitchenPropPosition } from "../rules/kitchenPlacement";
export interface KitchenPaintContext {
  c: CanvasRenderingContext2D; f: CanvasRenderingContext2D; ppm: number;
  p: (x: number, z: number, h?: number) => number[];
  ellipse: (ctx: CanvasRenderingContext2D, x: number, y: number, rx: number, ry: number, colour: string) => void;
  darkGlow: (x: number, y: number, radius: number, type: string) => void;
  rgba: (hex: string, alpha: number) => string;
}
type PaintState = Pick<MushroomState, "ingredients" | "smoke" | "baskets">;
/** Existing camera-facing pixel artwork; position/rotation identity is supplied by the layout, never inferred from a room label. */
export function paintKitchenCauldron(ctx: KitchenPaintContext, position: KitchenPropPosition & { id: "cauldron" }, state: PaintState, time: number): void {
  const { c, f, ppm, p, ellipse, rgba } = ctx, g = { herTime: time };
  const [cx, cy] = p(position.x, position.z), contents = state.ingredients, smoke = state.smoke;
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
}
export function paintMushroomBasket(ctx: KitchenPaintContext, position: KitchenPropPosition & { id: string; type: MushroomColour; index: number }, state: PaintState, selected = ""): void {
  const { c, ppm, p, ellipse, darkGlow, rgba } = ctx, basket = position, i = position.index;
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
}
