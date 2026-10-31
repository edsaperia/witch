/** Small deterministic RGBA canvas for the kitchen painter's ellipse/rectangle unit parity proof.
 * This is a software raster, not browser visual acceptance. Both painter versions also compare draw-command streams. */
type Gradient = { x: number; y: number; radius: number; stops: [number, string][]; addColorStop(at: number, colour: string): void };
export class KitchenCanvas {
  private w = 1; private h = 1;
  pixels = new Uint8ClampedArray(4);
  readonly context = new KitchenContext(this);
  get width() { return this.w; } set width(w: number) { this.w = w; this.reset(); }
  get height() { return this.h; } set height(h: number) { this.h = h; this.reset(); }
  private reset() { this.pixels = new Uint8ClampedArray(this.w * this.h * 4); }
  getContext() { return this.context; }
}
class KitchenContext {
  fillStyle: string | Gradient = "#000000";
  imageSmoothingEnabled = false;
  readonly commands: unknown[][] = [];
  private shape = [0, 0, 0, 0];
  constructor(readonly canvas: KitchenCanvas) {}
  beginPath() { this.shape = [0, 0, 0, 0]; }
  ellipse(x: number, y: number, rx: number, ry: number) { this.shape = [x, y, rx, ry]; }
  fill() {
    const [x, y, rx, ry] = this.shape; this.commands.push(["ellipse", ...this.shape, this.fillStyle]);
    this.paint(Math.floor(x - rx), Math.floor(y - ry), Math.ceil(rx * 2), Math.ceil(ry * 2), (px, py) => ((px - x) / rx) ** 2 + ((py - y) / ry) ** 2 <= 1);
  }
  fillRect(x: number, y: number, w: number, h: number) { this.commands.push(["rect", x, y, w, h, this.fillStyle]); this.paint(x, y, w, h, () => true); }
  clearRect(x: number, y: number, w: number, h: number) { for (let yy = Math.max(0, y); yy < Math.min(this.canvas.height, y + h); yy++) for (let xx = Math.max(0, x); xx < Math.min(this.canvas.width, x + w); xx++) this.canvas.pixels.fill(0, (yy * this.canvas.width + xx) * 4, (yy * this.canvas.width + xx) * 4 + 4); }
  createRadialGradient(x: number, y: number, _r0: number, _x1: number, _y1: number, radius: number): Gradient {
    return { x, y, radius, stops: [], addColorStop(at, colour) { this.stops.push([at, colour]); } };
  }
  getImageData(_x: number, _y: number, _w: number, _h: number) { return { data: this.canvas.pixels.slice() }; }
  putImageData(image: { data: Uint8ClampedArray }) { this.canvas.pixels.set(image.data); }
  private paint(x: number, y: number, w: number, h: number, inside: (x: number, y: number) => boolean) {
    for (let yy = Math.max(0, Math.floor(y)); yy < Math.min(this.canvas.height, Math.ceil(y + h)); yy++) for (let xx = Math.max(0, Math.floor(x)); xx < Math.min(this.canvas.width, Math.ceil(x + w)); xx++) {
      if (!inside(xx + .5, yy + .5)) continue;
      let colour: number[];
      if (typeof this.fillStyle === "string") colour = rgba(this.fillStyle);
      else { const g = this.fillStyle, a = rgba(g.stops[0][1]), b = rgba(g.stops[g.stops.length - 1][1]), t = Math.min(1, Math.hypot(xx - g.x, yy - g.y) / g.radius); colour = a.map((v, i) => v + (b[i] - v) * t); }
      const k = (yy * this.canvas.width + xx) * 4, buffer = this.canvas.pixels, alpha = colour[3] / 255, oldAlpha = buffer[k + 3] / 255, result = alpha + oldAlpha * (1 - alpha);
      for (let i = 0; i < 3; i++) buffer[k + i] = result ? (colour[i] * alpha + buffer[k + i] * oldAlpha * (1 - alpha)) / result : 0;
      buffer[k + 3] = result * 255;
    }
  }
}
function rgba(text: string): number[] {
  if (text.startsWith("#")) { const n = parseInt(text.slice(1), 16); return [n >> 16, n >> 8 & 255, n & 255, 255]; }
  const values = text.match(/[\d.]+/g)!.map(Number); return [values[0], values[1], values[2], (values[3] ?? 1) * 255];
}
