// The loading screen's start (src/ui/loadingScreen.js), its own small script ahead of the game's (index.html), so it's up at the
// page's first paint. Not for a start with no wake-up in the bedroom (the tools' ?creator=0, a bot game, a chart's arrival, the zoo,
// a shot, the old opening, the chart's page) or under automation (the smoke and bench runs time and shoot the game itself), unless
// ?loading=1; ?loading=0 never. main.ts cancels it for any other start that doesn't wake in the bedroom.
import cinzel from "./ui/fonts/CinzelDecorative-Regular.ttf?url";
import { startLoadingScreen } from "./ui/loadingScreen.js";
import { loading as built } from "../config/tuning.json"; // (its one block, a named import, so the screen's script stays small)
import { decisions } from "../config/decisions/1194-loading-screen.json";

const p = new URLSearchParams(location.search);
const off = p.get("loading") === "0" || (navigator.webdriver && p.get("loading") !== "1") || p.get("creator") === "0" || p.has("bot") || p.has("arrive") || p.has("zoo") || p.has("shot") || p.get("opening") === "old" || p.has("chart");
if (!off) {
  const face = new FontFace("Cinzel Decorative", `url(${cinzel})`);
  document.fonts.add(face);
  void face.load().catch(() => {});
  window.witchLoading = startLoadingScreen('"Cinzel Decorative"', knobs());
}

/** The tuning's loading block with the pause page's saved sliders over it (localStorage witch.settings, as app/settings.ts keeps
 *  them: read here since the screen is up before main.ts applies them). */
function knobs() {
  const k = { ...built };
  let saved = {};
  try { saved = JSON.parse(localStorage.getItem("witch.settings") || "{}"); } catch { /* storage blocked: as built */ }
  for (const d of decisions) {
    const v = saved[d.id];
    if (typeof v === "number" && v >= d.control.min && v <= d.control.max) k[d.apply.knob.slice("loading.".length)] = v;
  }
  return k;
}
