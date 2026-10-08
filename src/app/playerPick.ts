// The dev "Player:" pick (Ed, 2026-10-06: "add the bot game selector ... a dropdown with e.g. human / crude / skilled / champion
// ... it won't be in the final game so don't worry about making it look nice"): human, then every bot in BOT_KINDS (a new one
// shows up by itself); casting the scroll with a bot picked starts that bot's game, as ?bot=<kind>. Kept for the session
// (sessionStorage witch.player); ?dev=0 hides it. Plain and unstyled, in the bedroom's top right corner.
import { BOT_KINDS } from "../rules/bot";
import type { Creator } from "../ui/creator";

export function playerPick(params: URLSearchParams, creator: Creator): HTMLSelectElement | null {
  if (params.get("dev") === "0") return null;
  const box = document.createElement("label"), sel = document.createElement("select");
  box.id = "player-pick"; box.textContent = "Player: ";
  Object.assign(box.style, { position: "absolute", right: "8px", top: "8px", zIndex: "5", font: "12px sans-serif", color: "#ccc" });
  for (const k of ["human", ...BOT_KINDS]) { const o = document.createElement("option"); o.value = o.textContent = k; sel.append(o); }
  try { const v = sessionStorage.getItem("witch.player"); if (v && [...sel.options].some(o => o.value === v)) sel.value = v; } catch { /* storage blocked */ }
  sel.addEventListener("change", () => { try { sessionStorage.setItem("witch.player", sel.value); } catch { /* this load only */ } });
  for (const ev of ["pointerdown", "click", "keydown"]) sel.addEventListener(ev, e => e.stopPropagation()); // (its own keys, not the room's)
  box.append(sel); creator.root.append(box);
  return sel;
}
