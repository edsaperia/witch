// A panel on the pause page (main.ts pauseControls; Ed, 2026-10-23: What's new and Options, on the first load's sea chart till its
// chart-first start went): its buttons open it on what the start card holds (its keys, What's new, the screen shake's option), borrowed while it's up and put
// back where they were as it closes, so the creator's tabs still find them later in the page (main.ts dressCreator). One at a time;
// its ×, Esc or the button again closes it.
let shown: { el: HTMLDivElement; back: (() => void)[]; id: string } | null = null;

/** The current panel's pad focus stays inside it rather than reaching the pause controls behind it. */
export const cornerPanelRoot = (): HTMLElement | null => shown?.el ?? null;

/** Show `nodes` in a panel titled `title` over `host`; the same `id` again closes it. */
export function toggleCornerPanel(host: HTMLElement, id: string, title: string, nodes: HTMLElement[]): void {
  const was = shown?.id;
  closeCornerPanel();
  if (was === id) return;
  const el = document.createElement("div");
  el.className = "corner-panel";
  el.style.cssText = "position:absolute;right:12px;top:56px;z-index:62;width:min(560px,calc(100% - 24px));max-height:calc(100% - 140px);overflow:auto;background:rgba(10,9,22,.94);border:1px solid #3a2f5c;border-radius:8px;padding:12px 16px;color:#e8e2f4;font:13px/1.45 ui-monospace,monospace;box-sizing:border-box";
  const head = document.createElement("div");
  head.style.cssText = "display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;font-weight:bold;letter-spacing:.08em";
  head.textContent = title;
  const x = document.createElement("button");
  x.type = "button"; x.textContent = "×"; x.title = "Close (Esc)";
  x.style.cssText = "font:inherit;font-size:16px;color:#e8e2f4;background:none;border:1px solid #3a2f5c;border-radius:6px;padding:0 10px;cursor:pointer";
  x.addEventListener("click", closeCornerPanel);
  head.append(x);
  el.append(head);
  const back = nodes.map(n => { const parent = n.parentNode, next = n.nextSibling, display = n.style.display; n.style.display = ""; el.append(n); return () => { n.style.display = display; parent?.insertBefore(n, next); }; });
  host.append(el);
  addEventListener("keydown", onKey, { capture: true });
  shown = { el, back, id };
}

/** Close the panel, if one's up: its borrowed nodes back where they were. */
export function closeCornerPanel(): void {
  if (!shown) return;
  for (const b of shown.back) b();
  shown.el.remove();
  shown = null;
  removeEventListener("keydown", onKey, { capture: true });
}

function onKey(e: KeyboardEvent): void {
  if (e.code !== "Escape") return;
  e.preventDefault(); e.stopPropagation();
  closeCornerPanel();
}
