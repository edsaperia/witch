// ?perf=1: a small performance panel, always on, cheap, for reading the game's costs on Ed's own machine (overnight phase 2;
// docs/perf/BASELINE-2026-10-07.md: the cloud's software renderer can't say what the "draw" part costs a real CPU). Four times
// a second: the frames (platform/frameStats.ts's lines: fps, frame times, the CPU's own work, the GPU's where the browser
// times it); hitches (frames over 50 and 100 ms, in the last minute and since the start); the rules' step; the view's
// biggest parts, "draw" split into the scene (three.js walking it, its uploads and GL calls) and the post passes after; the
// draw calls, triangles and what the GPU holds; the JS heap, how fast it grows and how often it's collected; and the
// creatures by state and by the simulation's level of detail. Reads only: it changes nothing it shows.
import type { Game } from "../rules/game";
import type { View } from "../render/view";
import type { FrameStats } from "../platform/frameStats";

const KEEP = 120; // frames kept for the parts and the step (about 2 s)
type Memory = { usedJSHeapSize: number; jsHeapSizeLimit: number };

export class PerfHud {
  private readonly el = document.createElement("div");
  private readonly steps: number[] = [];
  private readonly parts: Record<string, number>[] = [];
  private readonly hitches: { at: number; ms: number }[] = [];
  private hitches50 = 0;
  private hitches100 = 0;
  private worst = 0;
  private heapLast = 0;
  private heapGrowth = 0; // MB a second, eased, between collections
  private heapAt = 0;
  private readonly gcs: number[] = []; // when the heap fell (a collection)
  private shown = 0;

  constructor(private game: Game, private view: View, private frames: FrameStats) {
    this.el.id = "perf-hud";
    Object.assign(this.el.style, {
      position: "fixed", right: "10px", top: "34px", zIndex: "20", pointerEvents: "none", whiteSpace: "pre",
      font: "11px ui-monospace, monospace", color: "#e8e0ff", background: "rgba(16, 10, 30, 0.78)", padding: "6px 8px", borderRadius: "6px",
    });
    document.body.append(this.el);
  }

  /** After each frame the loop draws: its gap since the last (ms), the rules' step (ms); `playing` false behind the start
   *  screen or frozen (its slow frames aren't hitches). */
  frame(now: number, gapMs: number, stepMs: number, playing: boolean): void {
    this.steps.push(stepMs); if (this.steps.length > KEEP) this.steps.shift();
    const ms = { ...this.view.ms }, scene = this.view.post.sceneMs;
    if (ms.draw !== undefined) { ms["draw: scene"] = Math.min(scene, ms.draw); ms["draw: post"] = Math.max(0, ms.draw - scene); delete ms.draw; }
    this.parts.push(ms); if (this.parts.length > KEEP) this.parts.shift();
    if (playing && gapMs > 50 && gapMs < 5000) { // (not a hidden tab coming back)
      this.hitches.push({ at: now, ms: gapMs }); this.hitches50++; if (gapMs > 100) this.hitches100++;
      this.worst = Math.max(this.worst, gapMs);
    }
    while (this.hitches.length && now - this.hitches[0].at > 60000) this.hitches.shift();
    const mem = (performance as unknown as { memory?: Memory }).memory;
    if (mem) {
      const mb = mem.usedJSHeapSize / 2 ** 20;
      if (this.heapLast && mb < this.heapLast - 2) this.gcs.push(now);
      else if (this.heapAt && now > this.heapAt) this.heapGrowth += ((mb - this.heapLast) / ((now - this.heapAt) / 1000) - this.heapGrowth) * 0.05;
      this.heapLast = mb; this.heapAt = now;
      while (this.gcs.length && now - this.gcs[0] > 60000) this.gcs.shift();
    }
    if (now - this.shown < 250) return;
    this.shown = now;
    this.el.textContent = this.lines(mem).join("\n");
  }

  private lines(mem?: Memory): string[] {
    const g = this.game, s = this.view.stats, info = this.view.renderer.info;
    const st = [...this.steps].sort((a, b) => a - b), at = (p: number) => st[Math.min(st.length - 1, Math.floor(p * st.length))] ?? 0;
    const mean: Record<string, number> = {};
    for (const p of this.parts) for (const [k, v] of Object.entries(p)) mean[k] = (mean[k] ?? 0) + v / this.parts.length;
    const top = Object.entries(mean).sort((a, b) => b[1] - a[1]).slice(0, 7).map(([k, v]) => `${k} ${v.toFixed(1)}`);
    const last = this.hitches.filter(h => h.ms > 100).length;
    let wild = 0, marching = 0;
    for (const c of g.creatures) { if ((c.state ?? "wild") === "wild") wild++; if (c.siege) marching++; }
    const L = g.lod;
    return [
      ...this.frames.lines(),
      `hitch  ${this.hitches.length} >50 ms, ${last} >100 (last min) · ${this.hitches50}/${this.hitches100} all, worst ${this.worst.toFixed(0)} ms`,
      `rules  ${at(0.5).toFixed(1)} ms median  ${at(0.95).toFixed(1)} p95  ${(st[st.length - 1] ?? 0).toFixed(1)} worst  (a step)`,
      `view   ${top.slice(0, 4).join("  ")}`,
      `       ${top.slice(4).join("  ")}`,
      `gl     ${info.render.calls} calls  ${(info.render.triangles / 1000).toFixed(0)}k tris  ${info.memory.textures} tex  ${info.memory.geometries} geo  ${s.dropped} dropped`,
      mem ? `heap   ${this.heapLast.toFixed(0)} MB  +${Math.max(0, this.heapGrowth).toFixed(1)} MB/s  ${this.gcs.length} GCs (last min)` : "heap   (this browser doesn't say)",
      `crowd  ${g.creatures.length}: ${wild} wild, ${marching} marching`,
      ...(L ? [`sim    ${L.full} full ${L.coarse} coarse ${L.frozen} frozen · march ${L.marchFull}/${L.marchCoarse}`] : []),
    ];
  }
}
