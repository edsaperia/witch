// The loading screen's start (src/ui/loadingScreen.js), its own small script ahead of the game's (index.html), so it's up at the
// page's first paint. Not for a start with no wake-up in the bedroom (the tools' ?creator=0, a bot game, a chart's arrival, the zoo,
// a shot, the old opening, the chart's page) or under automation (the smoke and bench runs time and shoot the game itself), unless
// ?loading=1; ?loading=0 never. main.ts cancels it for any other start that doesn't wake in the bedroom.
import cinzel from "./ui/fonts/CinzelDecorative-Regular.ttf?url";
import { startLoadingScreen } from "./ui/loadingScreen.js";

const p = new URLSearchParams(location.search);
const off = p.get("loading") === "0" || (navigator.webdriver && p.get("loading") !== "1") || p.get("creator") === "0" || p.has("bot") || p.has("arrive") || p.has("zoo") || p.has("shot") || p.get("opening") === "old" || p.has("chart");
if (!off) {
  const face = new FontFace("Cinzel Decorative", `url(${cinzel})`);
  document.fonts.add(face);
  void face.load().catch(() => {});
  window.witchLoading = startLoadingScreen('"Cinzel Decorative"');
}
