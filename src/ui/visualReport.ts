// The Report (Ed, 2026-10-14, after the circle bug: "a general Report button for any visual bug"): a visual bug on Ed's machine may
// never show on the builders' software renderers, so the pause page measures it there. The paused frame is drawn as it is and then
// as each neutral pair: two settings that should draw exactly the same picture (the see-through at full opacity against none, the
// mist at strength 0 against none). Where a pair's two pictures differ is a bug, measured to the pixel (the circle bug was a
// see-through pass that didn't match the solid one: a disc of difference round her). It saves one sheet (the frame, then each
// pair's two pictures and where they differ, times eight) and a JSON: the GPU and its precision, the screen, her place in the world
// and on screen, the camera, the repro link that puts a builder where she was (app/repro.ts), the settings changed from the
// build's, and each pair's numbers. The smoke test runs the same pairs (tools/smoke/smoke.cjs "neutral": each must differ nowhere).
import { knobAt, setKnob } from "./decisions";

/** Two settings that must draw the same picture: `a` and `b` are tuning knobs set over the game's own for the frame. */
export interface NeutralPair { name: string; a: Record<string, unknown>; b: Record<string, unknown> }
export const NEUTRAL_PAIRS: NeutralPair[] = [
  { name: "see-through at full opacity = see-through off", a: { "occlusion.fadeOpacity": 1 }, b: { "occlusion.on": false } },
  { name: "low mist at strength 0 = low mist off", a: { "mist.gain": 0 }, b: { "suspects.mist": false } },
];

/** What the report needs from the game. */
export interface ReportHost {
  canvas: HTMLCanvasElement; gl: WebGL2RenderingContext | WebGLRenderingContext; tuning: object; seed: number; version: string;
  /** her place on the canvas, in its pixels from the top left (null if unknown) */ witch: () => [number, number] | null;
  /** her place in the world, her mode and the camera, as the game holds them */ world: () => Record<string, unknown>;
  /** the repro link (app/repro.ts) */ link: () => string;
  /** the settings changed from the build's */ changed: () => [string, unknown][];
  /** the blob shadows shown or hidden (issue #1091: see neutralCheck) */ blobShadows?: (on: boolean) => void;
}

const frames = (n: number) => new Promise<void>(ok => { const f = () => (--n <= 0 ? ok() : requestAnimationFrame(f)); requestAnimationFrame(f); });

function grab(canvas: HTMLCanvasElement): ImageData {
  const c = document.createElement("canvas"); c.width = canvas.width; c.height = canvas.height;
  const x = c.getContext("2d")!; x.drawImage(canvas, 0, 0);
  return x.getImageData(0, 0, c.width, c.height);
}

/** The frame drawn with these knobs set over the game's own, then the game's put back. */
async function drawn(h: ReportHost, set: Record<string, unknown>): Promise<ImageData> {
  const kept = new Map<string, unknown>();
  try {
    for (const [k, v] of Object.entries(set)) { kept.set(k, knobAt(h.tuning, k)); setKnob(h.tuning, k, v); }
    await frames(4);
    return grab(h.canvas);
  } finally { for (const [k, v] of kept) setKnob(h.tuning, k, v); }
}

export interface PairResult { name: string; changed: number; maxDiff: number; rings: ({ from: number; px: number; changedShare: number; meanDiff: number } | null)[]; a: ImageData; b: ImageData; diff: ImageData }

/** Where a and b differ: the pixels by more than 2 of 255 in any channel, the most, and by distance from her in rings of 20 px. */
function compare(name: string, A: ImageData, B: ImageData, at: [number, number]): PairResult {
  const W = A.width, H = A.height, diff = new ImageData(W, H), rings: { px: number; diff: number; sum: number }[] = [];
  let changed = 0, maxD = 0;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = (y * W + x) * 4;
    const d = Math.max(Math.abs(A.data[i] - B.data[i]), Math.abs(A.data[i + 1] - B.data[i + 1]), Math.abs(A.data[i + 2] - B.data[i + 2]));
    diff.data[i] = diff.data[i + 1] = diff.data[i + 2] = Math.min(255, d * 8); diff.data[i + 3] = 255;
    const r = Math.floor(Math.hypot(x - at[0], y - at[1]) / 20);
    (rings[r] ??= { px: 0, diff: 0, sum: 0 }).px++;
    if (d > 2) { changed++; rings[r].diff++; }
    rings[r].sum += d; maxD = Math.max(maxD, d);
  }
  return { name, changed, maxDiff: maxD, a: A, b: B, diff, rings: Array.from(rings, (r, k) => r ? { from: k * 20, px: r.px, changedShare: +(r.diff / r.px).toFixed(4), meanDiff: +(r.sum / r.px).toFixed(2) } : null) };
}

/** Every neutral pair drawn and compared (the game's own frame first). */
export async function measure(h: ReportHost, pairs: NeutralPair[] = NEUTRAL_PAIRS): Promise<{ frame: ImageData; pairs: PairResult[] }> {
  const frame = await drawn(h, {}), at = h.witch() ?? [frame.width / 2, frame.height / 2];
  const out: PairResult[] = [];
  for (const p of pairs) out.push(compare(p.name, await drawn(h, p.a), await drawn(h, p.b), at));
  return { frame, pairs: out };
}

/** The smoke test's check: each pair's numbers alone. */
export async function neutralCheck(h: ReportHost): Promise<{ pairs: { name: string; changed: number; maxDiff: number }[]; seeThroughInUse: number; still: number; pixels: number; shadowless?: { changed: number; maxDiff: number } }> {
  const { frame, pairs } = await measure(h);
  // (and how much the paused frame changes by itself, drawn again as it is: anything still moving while paused)
  const still = compare("still", frame, await drawn(h, {}), [0, 0]).changed;
  // (and that the frame has something in front of her for the see-through to fade: the frame as it is against none, else the
  // see-through pair proves nothing)
  const used = compare("in use", frame, await drawn(h, NEUTRAL_PAIRS[0].b), [0, 0]).changed;
  // (and the see-through pair again with the blob shadows hidden: issue #1091, a known residue. The shadows draw before the
  // see-through's front pass, multiplying what's under them and pulled a little toward the camera, so they also tint the lowest
  // pixels of a low bush standing in one; see-through, even at full opacity, that bush is drawn after them and covers it, a few
  // pixels a few levels brighter. With them hidden the pair must draw the same: anything else is a new difference.)
  let shadowless: { changed: number; maxDiff: number } | undefined;
  if (h.blobShadows) {
    h.blobShadows(false);
    try { const p = NEUTRAL_PAIRS[0], r = compare(p.name, await drawn(h, p.a), await drawn(h, p.b), [0, 0]); shadowless = { changed: r.changed, maxDiff: r.maxDiff }; }
    finally { h.blobShadows(true); }
  }
  return { pairs: pairs.map(({ name, changed, maxDiff }) => ({ name, changed, maxDiff })), seeThroughInUse: used, still, pixels: frame.width * frame.height, shadowless };
}

function save(name: string, blob: Blob): void {
  const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = name; document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 5000);
}

/** Runs it and saves the two files; resolves with a one-line summary. */
export async function report(h: ReportHost): Promise<string> {
  const { frame, pairs } = await measure(h), W = frame.width, H = frame.height;
  // The sheet: the frame on top; then a row a pair: its two pictures and where they differ.
  const sheet = document.createElement("canvas"); sheet.width = W * 3; sheet.height = H * (1 + pairs.length);
  const s = sheet.getContext("2d")!; s.fillStyle = "#000"; s.fillRect(0, 0, sheet.width, sheet.height);
  const label = (t: string, x: number, y: number) => { s.font = `${Math.max(12, Math.round(H / 40))}px monospace`; s.fillStyle = "#000"; s.fillRect(x, y, s.measureText(t).width + 16, Math.max(18, H / 30)); s.fillStyle = "#ff0"; s.fillText(t, x + 8, y + Math.max(13, H / 40)); };
  s.putImageData(frame, 0, 0); label("as it is", 0, 0);
  pairs.forEach((p, k) => {
    const y = H * (k + 1), [left, right] = p.name.split(" = ");
    s.putImageData(p.a, 0, y); label(left, 0, y);
    s.putImageData(p.b, W, y); label(right ?? "b", W, y);
    s.putImageData(p.diff, W * 2, y); label(`differ: ${p.changed} px (max ${p.maxDiff}), x8`, W * 2, y);
  });
  const g = h.gl, dbg = g.getExtension("WEBGL_debug_renderer_info");
  const prec = (t: number, p: number) => { const f = g.getShaderPrecisionFormat(t, p); return f ? { rangeMin: f.rangeMin, rangeMax: f.rangeMax, precision: f.precision } : null; };
  const info = {
    version: h.version, seed: h.seed, link: h.link(), url: location.href, userAgent: navigator.userAgent, dpr: devicePixelRatio,
    canvas: [W, H], css: [h.canvas.clientWidth, h.canvas.clientHeight], onScreen: h.witch(), world: h.world(), changed: Object.fromEntries(h.changed()),
    gpu: dbg ? { vendor: g.getParameter(dbg.UNMASKED_VENDOR_WEBGL), renderer: g.getParameter(dbg.UNMASKED_RENDERER_WEBGL) } : { vendor: g.getParameter(g.VENDOR), renderer: g.getParameter(g.RENDERER) },
    fragment: { high: prec(g.FRAGMENT_SHADER, g.HIGH_FLOAT), medium: prec(g.FRAGMENT_SHADER, g.MEDIUM_FLOAT) }, vertex: { high: prec(g.VERTEX_SHADER, g.HIGH_FLOAT), medium: prec(g.VERTEX_SHADER, g.MEDIUM_FLOAT) },
    webgl2: typeof WebGL2RenderingContext !== "undefined" && g instanceof WebGL2RenderingContext, extensions: g.getSupportedExtensions(),
    pairs: pairs.map(({ name, changed, maxDiff, rings }) => ({ name, changed, maxDiff, rings })),
  };
  const stamp = `report-${h.version.replace(/[^a-z0-9]+/gi, "_")}-${Date.now()}`;
  save(`${stamp}.json`, new Blob([JSON.stringify(info, null, 1)], { type: "application/json" }));
  await new Promise<void>(ok => sheet.toBlob(b => { if (b) save(`${stamp}.png`, b); ok(); }, "image/png"));
  const bad = pairs.filter(p => p.changed > 0);
  return `saved ${stamp}.png and .json: ${bad.length ? bad.map(p => `${p.name}: ${p.changed} px differ`).join("; ") : "every neutral pair draws the same"}`;
}
