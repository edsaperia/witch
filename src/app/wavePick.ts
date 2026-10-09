// The waves' pace (Ed, 2026-10-08: "a dropdown in the top right during character creation, underneath the bot selector", and
// not remembered): "Waves:" the ley pulse's speed (Ed, 2026-10-09: "Pure constant speed"; a wave lands as it reaches its
// stone, so the gaps follow the links' lengths), slow, normal or fast, or off, under the dev "Player:" pick
// (app/playerPick.ts) in the bedroom's top right corner, plain like it. Every game starts at the tuning's pace (or the link's
// ?pulse=) until one is picked.
import type { Creator } from "../ui/creator";

/** The choices (m/s): slow, normal (the tuning's 4), fast, and 0 for off. */
export const PULSE_CHOICES = [2.5, 4, 6, 0];
const NAMES: Record<number, string> = { 2.5: "slow", 4: "normal", 6: "fast" };
export const waveLabel = (v: number) => (v === 0 ? "off" : `${NAMES[v] ? `${NAMES[v]} · ` : ""}${v} m/s`);

/** The dropdown, its choices (and the current speed if a link set another), showing `now`; `pick` sets the speed (m/s, 0 off). */
export function wavePick(creator: Creator, choices: number[], now: number, belowPlayer: boolean, pick: (speed: number) => void): HTMLSelectElement {
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
