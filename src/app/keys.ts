// The page's own keys and buttons outside the game's controls (platform/input.ts): the touch wave buttons and the touch
// controls, the metre rulers (G, the debug button, or ?debug), the minimap (M) and the action bar (H).
import type { View } from "../render/view";
import type { Input } from "../platform/input";
import { setupTouch } from "../ui/touch";

export function setupDebugKeys(view: View, input: Input, params: URLSearchParams): void {
  document.getElementById("next-wave")!.addEventListener("pointerdown", e => { e.preventDefault(); input.touch.nextWave = true; });
  document.getElementById("pause-waves")!.addEventListener("pointerdown", e => { e.preventDefault(); input.touch.pauseWaves = true; });
  setupTouch(document.body, input.touch);

  // Metre rulers and a ground grid: G, the debug button, or on with ?debug.
  view.rulers.on = params.has("debug");
  const toggleRulers = () => { view.rulers.on = !view.rulers.on; };
  window.addEventListener("keydown", e => { if (e.code === "KeyG" && !e.repeat) toggleRulers(); });
  // M: the debug minimap (the party's spread: woken areas, the next to wake, the candidates).
  window.addEventListener("keydown", e => { if (e.code === "KeyM" && !e.repeat) view.minimap.on = !view.minimap.on; });
  document.getElementById("rulers")!.addEventListener("pointerdown", e => { e.preventDefault(); toggleRulers(); });
}

export function setupActionBar(view: View): void {
  // The action bar (1 2 3 4 Q W E R, its keys and recharge) replaces the old line of controls (Ed,
  // 2026-10-04); H shows or hides it (remembered on this browser).
  let barOn = true;
  try { if (localStorage.getItem("witch.bar") === "off") { barOn = false; view.actionBar.visible = false; } } catch { /* storage blocked: shown */ }
  window.addEventListener("keydown", e => {
    if (e.code !== "KeyH" || e.repeat) return;
    barOn = !barOn; view.actionBar.visible = barOn;
    try { localStorage.setItem("witch.bar", barOn ? "on" : "off"); } catch { /* fine */ }
  });
}
