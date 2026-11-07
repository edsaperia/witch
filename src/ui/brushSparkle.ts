// The basin's brushing (Ed, 2026-11-07: "a short brushing animation with a little sparkle and a sound, flavour only"): a few pixel
// sparkles twinkling at her face over the brushing's last half, then gone. A DOM overlay at her head as the house places it
// (main.ts herHead: render/houseRooms.ts herHouseHead), in the panels' pixel-glint style (ui/stationPanel.ts .loaned). No words.

/** How long she brushes (s): her brush frames, the scrubs and the sparkle (main.ts). */
export const BRUSH = 1.6;

export class BrushSparkle {
  private readonly el = document.createElement("div");
  private raf = 0;
  constructor(private readonly head: () => { x: number; y: number } | null) {
    this.el.id = "brush-sparkle";
    this.el.innerHTML = [[-14, 10, 0], [16, 4, .25], [-4, -10, .5], [10, 22, .7]].map(([x, y, d]) => `<i style="left:${x}px;top:${y}px;animation-delay:${d}s"></i>`).join("");
    installCss();
    document.body.append(this.el);
  }
  /** Sparkles over `len` seconds' second half, following her head. */
  play(len = BRUSH): void {
    cancelAnimationFrame(this.raf);
    const t0 = performance.now(), from = len * 500, to = len * 1000 + 600;
    const step = () => {
      const t = performance.now() - t0, h = this.head();
      if (t > to || !h) { this.el.style.display = "none"; return; }
      this.el.style.display = t >= from ? "block" : "none";
      this.el.style.transform = `translate(${Math.round(h.x)}px, ${Math.round(h.y)}px)`;
      this.raf = requestAnimationFrame(step);
    };
    this.raf = requestAnimationFrame(step);
  }
}

let cssDone = false;
function installCss(): void {
  if (cssDone) return; cssDone = true;
  const s = document.createElement("style");
  s.textContent = `
#brush-sparkle { position: fixed; left: 0; top: 0; width: 0; height: 0; z-index: 17; pointer-events: none; display: none; }
#brush-sparkle i { position: absolute; width: 3px; height: 3px; background: #fffbe8; image-rendering: pixelated;
  box-shadow: 3px 0 0 #fff2b8, -3px 0 0 #fff2b8, 0 3px 0 #fff2b8, 0 -3px 0 #fff2b8, 6px 0 0 rgba(255,242,184,.5), -6px 0 0 rgba(255,242,184,.5), 0 6px 0 rgba(255,242,184,.5), 0 -6px 0 rgba(255,242,184,.5);
  animation: brush-twinkle .7s steps(4) infinite; opacity: 0; }
@keyframes brush-twinkle { 0%, 100% { opacity: 0; transform: scale(.5); } 50% { opacity: 1; transform: scale(1); } }
@media (prefers-reduced-motion: reduce) { #brush-sparkle i { animation: none; opacity: .8; } }
`;
  document.head.append(s);
}
