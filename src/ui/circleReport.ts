// The circle report (Ed, 2026-10-14: "a simpler test harness ... so you can try lots of tests quickly"): the circle bug shows on
// Ed's machine and never on the builders' software renderers, so this measures it there. From the pause page, with the circle in
// view: the frozen frame drawn three ways (as it is; the see-through at full opacity, which should look the same as without it;
// the see-through off), read back from the canvas and saved as one sheet (the three and where the second differs from the third,
// times eight) with a JSON of the GPU, its precision, the screen and the numbers, for the builders to read.
import { knobAt, setKnob } from "./decisions";

/** What the report needs from the game. */
export interface ReportHost { canvas: HTMLCanvasElement; gl: WebGL2RenderingContext | WebGLRenderingContext; tuning: object; seed: number; version: string; /** her place on the canvas, in its pixels from the top left (null if unknown) */ witch: () => [number, number] | null }

const VARIANTS: { name: string; set: Record<string, unknown> }[] = [
  { name: "as it is", set: {} },
  { name: "see-through at full opacity", set: { "occlusion.fadeOpacity": 1 } },
  { name: "see-through off", set: { "suspects.seeSplit": false } },
];

const frames = (n: number) => new Promise<void>(ok => { const f = () => (--n <= 0 ? ok() : requestAnimationFrame(f)); requestAnimationFrame(f); });

function grab(canvas: HTMLCanvasElement): ImageData {
  const c = document.createElement("canvas"); c.width = canvas.width; c.height = canvas.height;
  const x = c.getContext("2d")!; x.drawImage(canvas, 0, 0);
  return x.getImageData(0, 0, c.width, c.height);
}

function save(name: string, blob: Blob): void {
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}

/** Runs it and saves the two files; resolves with a one-line summary. */
export async function circleReport(h: ReportHost): Promise<string> {
  const kept = new Map<string, unknown>();
  const shots: ImageData[] = [];
  try {
    for (const v of VARIANTS) {
      for (const [k, val] of Object.entries(v.set)) { if (!kept.has(k)) kept.set(k, knobAt(h.tuning, k)); setKnob(h.tuning, k, val); }
      await frames(4);
      shots.push(grab(h.canvas));
      for (const [k, val] of kept) setKnob(h.tuning, k, val);
    }
  } finally { for (const [k, val] of kept) setKnob(h.tuning, k, val); }
  const [A, B, C] = shots, W = A.width, H = A.height;
  // Where B (the see-through at full opacity) differs from C (no see-through), by distance from her in rings of 20 px.
  const diff = new ImageData(W, H), at = h.witch() ?? [W / 2, H / 2], rings: { px: number; diff: number; sum: number }[] = [];
  let changed = 0, maxD = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4;
    const d = Math.max(Math.abs(B.data[i] - C.data[i]), Math.abs(B.data[i + 1] - C.data[i + 1]), Math.abs(B.data[i + 2] - C.data[i + 2]));
    diff.data[i] = diff.data[i + 1] = diff.data[i + 2] = Math.min(255, d * 8); diff.data[i + 3] = 255;
    const r = Math.floor(Math.hypot(x - at[0], y - at[1]) / 20);
    (rings[r] ??= { px: 0, diff: 0, sum: 0 }).px++;
    if (d > 2) { changed++; rings[r].diff++; }
    rings[r].sum += d; maxD = Math.max(maxD, d);
  }
  // The sheet: A B on top, C and the difference below, each labelled.
  const sheet = document.createElement("canvas"); sheet.width = W * 2; sheet.height = H * 2;
  const s = sheet.getContext("2d")!;
  const label = (t: string, x: number, y: number) => { s.font = `${Math.max(14, Math.round(H / 40))}px monospace`; s.fillStyle = "#000"; s.fillRect(x, y, s.measureText(t).width + 16, Math.max(20, H / 30)); s.fillStyle = "#ff0"; s.fillText(t, x + 8, y + Math.max(15, H / 40)); };
  [A, B, C, diff].forEach((img, k) => { const x = (k % 2) * W, y = Math.floor(k / 2) * H; s.putImageData(img, x, y); label(k < 3 ? VARIANTS[k].name : "where 2 differs from 3, x8", x, y); });
  const g = h.gl, dbg = g.getExtension("WEBGL_debug_renderer_info");
  const prec = (t: number, p: number) => { const f = g.getShaderPrecisionFormat(t, p); return f ? { rangeMin: f.rangeMin, rangeMax: f.rangeMax, precision: f.precision } : null; };
  const info = {
    version: h.version, seed: h.seed, url: location.href, userAgent: navigator.userAgent, dpr: devicePixelRatio, canvas: [W, H], css: [h.canvas.clientWidth, h.canvas.clientHeight], witch: at,
    gpu: dbg ? { vendor: g.getParameter(dbg.UNMASKED_VENDOR_WEBGL), renderer: g.getParameter(dbg.UNMASKED_RENDERER_WEBGL) } : { vendor: g.getParameter(g.VENDOR), renderer: g.getParameter(g.RENDERER) },
    fragment: { high: prec(g.FRAGMENT_SHADER, g.HIGH_FLOAT), medium: prec(g.FRAGMENT_SHADER, g.MEDIUM_FLOAT) }, vertex: { high: prec(g.VERTEX_SHADER, g.HIGH_FLOAT), medium: prec(g.VERTEX_SHADER, g.MEDIUM_FLOAT) },
    webgl2: typeof WebGL2RenderingContext !== "undefined" && g instanceof WebGL2RenderingContext, extensions: g.getSupportedExtensions(),
    changed, maxDiff: maxD,
    rings: rings.map((r, k) => r && { from: k * 20, px: r.px, changedShare: +(r.diff / r.px).toFixed(4), meanDiff: +(r.sum / r.px).toFixed(2) }),
    knobs: { occlusion: knobAt(h.tuning, "occlusion"), suspects: knobAt(h.tuning, "suspects"), canopyCutout: knobAt(h.tuning, "canopyCutout") },
  };
  const stamp = `circle-${h.version}-${Date.now()}`;
  save(`${stamp}.json`, new Blob([JSON.stringify(info, null, 1)], { type: "application/json" }));
  await new Promise<void>(ok => sheet.toBlob(b => { if (b) save(`${stamp}.png`, b); ok(); }, "image/png"));
  return `saved ${stamp}.png and .json: ${changed} pixels differ (max ${maxD})`;
}
