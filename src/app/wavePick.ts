// The waves' pace (Ed, 2026-10-08: "a dropdown in the top right during character creation, underneath the bot selector", and
// not remembered): "Waves:" 30 s, 1, 2, 5 or 10 minutes, or off, under the dev "Player:" pick (app/playerPick.ts) in the
// bedroom's top right corner, plain like it. Every game starts at the tuning's pace (or the link's ?wave=) until one is picked.
import type { Creator } from "../ui/creator";

export const waveLabel = (s: number) => (s === 0 ? "off" : s < 60 ? `${s} s` : s % 60 ? `${+(s / 60).toFixed(2)} min` : `${s / 60} min`);

/** The dropdown, its choices (and the current pace if a link set another), showing `now`; `pick` sets the pace. */
export function wavePick(creator: Creator, choices: number[], now: number, belowPlayer: boolean, pick: (sec: number) => void): HTMLSelectElement {
  const box = document.createElement("label"), sel = document.createElement("select");
  box.id = "wave-pick"; box.textContent = "Waves: ";
  Object.assign(box.style, { position: "absolute", right: "8px", top: belowPlayer ? "34px" : "8px", zIndex: "5", font: "12px sans-serif", color: "#ccc" });
  const paces = [...new Set([...choices, now].filter(s => s > 0))].sort((a, b) => a - b); // (the tuning's or a link's own pace in its place, off last)
  for (const s of [...paces, 0]) { const o = document.createElement("option"); o.value = String(s); o.textContent = waveLabel(s); sel.append(o); }
  sel.value = String(now);
  sel.addEventListener("change", () => pick(+sel.value));
  for (const ev of ["pointerdown", "click", "keydown"]) sel.addEventListener(ev, e => e.stopPropagation()); // (its own keys, not the room's)
  box.append(sel); creator.root.append(box);
  return sel;
}
