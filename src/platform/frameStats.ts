// What the frames really are (Ed, 2026-10-05: "Even though the framerate appears to be high in the
// stats, it feels low when you are playing"): the debug overlay's frame line. An average fps over
// half a second hides an uneven run of frames (a 10 ms frame and a 30 ms one average 50 fps, and
// feel like 33), so this keeps the last two seconds of frame-to-frame times and shows their spread:
// the median and the 95th percentile, the worst, how many ran long, and the "1% low" fps; and, where
// the browser can time the GPU (WebGL2's EXT_disjoint_timer_query_webgl2), how long each frame's
// drawing took on the GPU, which is where a frame can be slow while the CPU's own work looks small.

const KEEP = 2; // seconds of frames kept

export class FrameStats {
  private times: number[] = [];
  private sum = 0;
  private gpu: number[] = [];
  private cpu: number[] = [];
  private gl: WebGL2RenderingContext | null = null;
  private ext: { TIME_ELAPSED_EXT: number; GPU_DISJOINT_EXT: number } | null = null;
  private queries: WebGLQuery[] = [];
  private open: WebGLQuery | null = null;

  constructor(gl?: WebGLRenderingContext | WebGL2RenderingContext) {
    if (gl && typeof WebGL2RenderingContext !== "undefined" && gl instanceof WebGL2RenderingContext) {
      this.ext = gl.getExtension("EXT_disjoint_timer_query_webgl2") as { TIME_ELAPSED_EXT: number; GPU_DISJOINT_EXT: number } | null;
      if (this.ext) this.gl = gl;
    }
  }

  /** A frame's time since the one before (ms). */
  frame(ms: number): void {
    if (!(ms > 0) || ms > 1000) return; // (the first frame, or back from a hidden tab)
    this.times.push(ms); this.sum += ms;
    while (this.sum > KEEP * 1000 && this.times.length > 1) this.sum -= this.times.shift()!;
  }

  /** A frame's own work on the CPU (ms): rules, view and the GL calls, up to handing the frame over. */
  work(ms: number): void { this.cpu.push(ms); if (this.cpu.length > 120) this.cpu.shift(); }

  /** Around a frame's drawing: its GPU time comes back a frame or two later. */
  beginGpu(): void {
    const gl = this.gl, ext = this.ext;
    if (!gl || !ext || this.open) return;
    this.collect();
    if (this.queries.length > 4) return; // (results not back yet: don't pile them up)
    const q = gl.createQuery();
    if (!q) return;
    gl.beginQuery(ext.TIME_ELAPSED_EXT, q);
    this.open = q;
  }
  endGpu(): void {
    const gl = this.gl, ext = this.ext;
    if (!gl || !ext || !this.open) return;
    gl.endQuery(ext.TIME_ELAPSED_EXT);
    this.queries.push(this.open);
    this.open = null;
  }
  private collect(): void {
    const gl = this.gl!, ext = this.ext!;
    while (this.queries.length) {
      const q = this.queries[0];
      if (!gl.getQueryParameter(q, gl.QUERY_RESULT_AVAILABLE)) break;
      const ns = gl.getQueryParameter(q, gl.QUERY_RESULT) as number, disjoint = gl.getParameter(ext.GPU_DISJOINT_EXT);
      if (!disjoint) { this.gpu.push(ns / 1e6); if (this.gpu.length > 120) this.gpu.shift(); }
      gl.deleteQuery(q); this.queries.shift();
    }
  }

  /** The overlay's lines. */
  lines(): string[] {
    const t = [...this.times].sort((a, b) => a - b), n = t.length;
    if (!n) return ["frames —"];
    const at = (p: number) => t[Math.min(n - 1, Math.floor(p * n))];
    const mean = this.sum / n, long = this.times.filter(x => x > 20).length;
    // 1% low: the fps of the slowest 1% of frames (at least one).
    const slow = t.slice(Math.max(0, n - Math.max(1, Math.round(n / 100)))), low = 1000 / (slow.reduce((a, b) => a + b, 0) / slow.length);
    const out = [
      `fps    ${(1000 / mean).toFixed(0)} avg  ${(1000 / at(0.5)).toFixed(0)} median  ${low.toFixed(0)} 1% low`,
      `frame  ${at(0.5).toFixed(1)} ms median  ${at(0.95).toFixed(1)} p95  ${t[n - 1].toFixed(1)} worst  ${((100 * long) / n).toFixed(0)}% over 20 ms`,
    ];
    if (this.cpu.length) { const c = [...this.cpu].sort((a, b) => a - b); out.push(`cpu    ${c[Math.floor(c.length / 2)].toFixed(1)} ms median  ${c[Math.min(c.length - 1, Math.floor(0.95 * c.length))].toFixed(1)} p95  (its own work)`); }
    if (this.gpu.length) { const g = [...this.gpu].sort((a, b) => a - b); out.push(`gpu    ${g[Math.floor(g.length / 2)].toFixed(1)} ms median  ${g[Math.min(g.length - 1, Math.floor(0.95 * g.length))].toFixed(1)} p95`); }
    else out.push(this.gl ? "gpu    (timing…)" : "gpu    (not timed in this browser)");
    return out;
  }
}
