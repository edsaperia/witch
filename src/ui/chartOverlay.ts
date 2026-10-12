// The sea chart over the game (Ed, 2026-10-11: "The world map is in the centre" of the treehouse deck; rules/treehouse.ts): E at
// the deck's map table opens the chart's own page (chart.html: render/chart/seaChart.ts, app/chartPage.ts) in a frame over the
// game, to sail from at any time (Ed: "Sail anytime"): its sail asks `onSail` (the game records the night, unwon if it's still on,
// then sails). Esc, E or the ✕ closes it. A stand-in for the chart's own embeddable view (mountChart, #702).

let open: HTMLDivElement | null = null, sailing: ((href: string) => void) | null = null;

/** Open the chart over the game; `onSail` with the island's link when she sails. Does nothing if it's already open. */
export function openChart(onSail: (href: string) => void): void {
  if (open) return;
  const wrap = document.createElement("div");
  wrap.id = "chart-overlay";
  wrap.style.cssText = "position:fixed;inset:4vh 4vw;z-index:50;border:2px solid #3a2f5c;border-radius:8px;overflow:hidden;background:#05060e;box-shadow:0 0 0 100vmax rgba(5,6,14,.55)";
  const frame = document.createElement("iframe");
  frame.src = "chart.html";
  frame.title = "Sea chart";
  frame.style.cssText = "width:100%;height:100%;border:0;display:block";
  const close = document.createElement("button");
  close.textContent = "✕";
  close.setAttribute("aria-label", "Close the chart");
  close.style.cssText = "position:absolute;top:8px;right:10px;z-index:1;font:16px ui-monospace,monospace;color:#e8e2f4;background:rgba(10,9,22,.78);border:1px solid #3a2f5c;border-radius:6px;padding:2px 9px;cursor:pointer";
  close.onclick = closeChart;
  wrap.append(frame, close);
  document.body.append(wrap);
  open = wrap; sailing = onSail;
  frame.addEventListener("load", () => frame.contentWindow?.focus());
}

/** Close the chart, if open. */
export function closeChart(): void {
  open?.remove();
  open = null;
  window.focus();
}

export const chartOpen = (): boolean => !!open;

// The chart page asks to close (its Esc or E: app/chartPage.ts), as does Esc here.
window.addEventListener("message", e => {
  if (e.data === "chart:close") closeChart();
  else if (open && typeof e.data?.chartSail === "string") { const go = sailing; closeChart(); go?.(new URL(e.data.chartSail, location.href).href); }
});
window.addEventListener("keydown", e => { if (open && e.key === "Escape") { e.preventDefault(); closeChart(); } });
