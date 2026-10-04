// Starts the prototype: the seed from the URL, the game rules, the view, input, and the loop.
import { areaUnderWitch, newGame, stepGame } from "./rules/game";
import { AREA_TYPES } from "./rules/map";
import { waveCountdown } from "./rules/party";
import { parseSeed } from "./rules/map";
import { TUNING } from "./rules/tuning";
import { Input } from "./platform/input";
import { View } from "./render/view";
import { SPRITE_UNIFORMS } from "./render/sprites";
import { loadStyle } from "./render/style";
import { setupTouch } from "./ui/touch";
import changelog from "../config/changelog.json";

const params = new URLSearchParams(location.search);
let seed = parseSeed(params.get("seed"));
if (seed === null) {
  seed = Math.floor(Math.random() * 1000000);
  params.set("seed", String(seed));
  history.replaceState(null, "", "?" + params.toString() + location.hash);
}

// Variants as switches in the link: ?tilt=before|after|off, ?bloom=off, ?shadows=off,
// ?canopy=off (the canopy shadow layer), ?mist=off.
const tuning = {
  ...TUNING, bloom: { ...TUNING.bloom }, tiltShift: { ...TUNING.tiltShift },
  shadows: { ...TUNING.shadows }, canopyShadow: { ...TUNING.canopyShadow }, mist: { ...TUNING.mist },
  party: { ...TUNING.party },
};
if (params.get("shadows") === "off") tuning.shadows.on = false;
if (params.get("canopy") === "off") tuning.canopyShadow.on = false;
if (params.get("mist") === "off") tuning.mist.on = false;
const tilt = params.get("tilt");
if (tilt === "off") tuning.tiltShift.on = false;
else if (tilt === "before" || tilt === "after") { tuning.tiltShift.on = true; tuning.tiltShift.where = tilt; }
if (params.get("bloom") === "off") tuning.bloom.on = false;
if (params.get("moonbeams") === "on") tuning.moonbeams = 1;
// ?rune=beam|column|both: how an awake rune stone shows above it.
const runeParam = params.get("rune");
if (runeParam && ["beam", "column", "both"].includes(runeParam)) tuning.runeMarkers = { ...tuning.runeMarkers, awakeStyle: runeParam };
// ?picker=noisy|near3|near3touch|nearest: how the party picks the next area to wake.
const pickerParam = params.get("picker");
if (pickerParam && ["noisy", "near3", "near3touch", "nearest"].includes(pickerParam)) tuning.party.picker = pickerParam;
// ?glow=<reach>,<falloff>: the witch's glow, to tune live (e.g. ?glow=50,2.5).
const glowParam = params.get("glow")?.split(",").map(Number);
if (glowParam && glowParam[0] > 0) { tuning.glowReach = glowParam[0]; tuning.glowFixed = true; }
if (glowParam && glowParam[1] > 0) tuning.glowFalloff = glowParam[1];
const fx = params.get("fx");
if (fx === "pixel" || fx === "smooth") tuning.fx = fx;

const game = newGame(seed, tuning);

// How often the party spreads: the tuning file's interval (5 minutes), or ?wave=<seconds> (0 or
// "off": no waves), or what this viewer last picked on the start screen.
const WAVE_CHOICES = [30, 60, 120, 300, 600, 0];
function setWaveInterval(sec: number): void {
  tuning.party.interval = sec > 0 ? sec : 1e9;
  game.party.paused = sec === 0;
  game.party.nextAt = game.clock.time + tuning.party.startDelay + tuning.party.interval;
  document.querySelectorAll<HTMLButtonElement>("#waves button").forEach(b => b.classList.toggle("on", +b.dataset.s! === sec));
}
let waveChoice = tuning.party.interval;
try { const saved = localStorage.getItem("witch.wave"); if (saved !== null && WAVE_CHOICES.includes(+saved)) waveChoice = +saved; } catch { /* storage blocked */ }
const waveParam = params.get("wave");
if (waveParam !== null) waveChoice = waveParam === "off" ? 0 : Math.max(0, +waveParam || 0);
const canvas = document.getElementById("game") as HTMLCanvasElement;
// The art is drawn for the pixel size the game renders at (the tuning file's), not the Lab's.
const style = loadStyle();
/** Load timings (ms since the page started): the view built (the page's own sprites drawn), ready to play. */
const loadTimes = { viewStart: performance.now(), view: 0, ready: 0 };
const view = new View(canvas, game, {
  ...style, pixel: tuning.pixelSize,
  // Trees taller by treeHeight; crowns wider by crownWidth in all (treeHeight widens them too).
  treeSize: style.treeSize * tuning.treeHeight, crownWidth: style.crownWidth * tuning.crownWidth / tuning.treeHeight,
});
loadTimes.view = performance.now();
view.debugCull = params.get("debug") === "cull";
view.quick = params.get("quick") === "1";
// ?scenery=<metres>: a fixed scenery radius instead of the adaptive budget.
const sceneryAt = Number(params.get("scenery"));
if (params.has("scenery") && sceneryAt > 0) view.sceneryFixed = sceneryAt;
const input = new Input();
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

// The controls hint in the corner: H shows or hides it (remembered on this browser).
const helpEl = document.getElementById("help")!;
try { if (localStorage.getItem("witch.help") === "off") helpEl.classList.add("off"); } catch { /* storage blocked: shown */ }
window.addEventListener("keydown", e => {
  if (e.code !== "KeyH" || e.repeat) return;
  const off = helpEl.classList.toggle("off");
  try { localStorage.setItem("witch.help", off ? "off" : "on"); } catch { /* fine */ }
});

declare const __BUILD__: string;
document.getElementById("version")!.textContent = typeof __BUILD__ === "string" ? __BUILD__ : "dev";
// What's new, on the start screen: the last three versions, newest first (config/changelog.json).
const newsEl = document.getElementById("news")!;
const buildName = typeof __BUILD__ === "string" ? __BUILD__.split(" ")[0] : "dev";
const esc = (s: string) => s.replace(/[&<>]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c]!);
newsEl.innerHTML = "<b>What's new</b>" + changelog.entries.filter(e => e.items.length).slice(0, 3).map(e =>
  `<div>${e.version === null ? `${buildName} (this version)` : "v" + e.version}</div><ul>${e.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>`).join("");
const seedEl = document.getElementById("seed")!;
seedEl.innerHTML = `seed <a href="?seed=${seed}">${seed}</a>`;
const debugEl = document.getElementById("debug")!, startEl = document.getElementById("start")!;
const debugButtons = document.getElementById("debug-buttons")!;
const waveEl = document.getElementById("wave")!, waveFill = waveEl.querySelector<HTMLElement>(".fill")!, waveLabel = waveEl.querySelector<HTMLElement>(".label")!;
let debugOn = params.has("debug");
debugEl.classList.toggle("on", debugOn);
debugButtons.classList.toggle("on", debugOn);

const fit = () => view.resize(window.innerWidth, window.innerHeight);
window.addEventListener("resize", fit);
fit();

// Make the art and ground round the start before the first frame, behind the start screen.
let ready = false;
// The start screen's progress bar: the sets of sprites drawn so far. Play can start once what the
// start needs is ready; the rest is drawn in the background (nearest areas first).
const progressEl = document.getElementById("progress")!, progressFill = progressEl.querySelector<HTMLElement>(".fill")!, progressLabel = progressEl.querySelector<HTMLElement>(".label")!;
const showProgress = setInterval(() => {
  const a = view.assets, done = a.done, total = done + a.pending;
  progressFill.style.width = `${total ? (100 * done) / total : 0}%`;
  progressLabel.textContent = ready ? `the rest of the forest, in the background: ${done} of ${total}` : `growing the forest: ${done} of ${total}`;
  if (ready && !a.pending) { progressEl.classList.add("done"); clearInterval(showProgress); }
}, 250);
requestAnimationFrame(() => setTimeout(async () => {
  await view.prepare();
  ready = true;
  loadTimes.ready = performance.now();
  startEl.classList.remove("loading");
}, 0));

// Browsers keep sound off until the player presses something: the start screen is that press.
let audio: AudioContext | null = null;
function start(): boolean {
  if (!ready || !game.clock.paused) return false;
  try { audio ??= new AudioContext(); void audio.resume(); } catch { /* no sound yet anyway */ }
  game.clock.paused = false;
  startEl.style.display = "none";
  input.clearPresses();
  return true;
}
input.onAny = start;
startEl.addEventListener("pointerdown", e => { e.preventDefault(); start(); });
// The wave selector on the start screen: picking one doesn't start the game.
const wavesEl = document.getElementById("waves")!;
wavesEl.innerHTML = "waves every " + WAVE_CHOICES.map(s => `<button type="button" data-s="${s}">${s === 0 ? "off" : s < 60 ? s + " s" : s / 60 + " min"}</button>`).join("");
wavesEl.addEventListener("pointerdown", e => {
  e.stopPropagation();
  const b = (e.target as HTMLElement).closest("button");
  if (!b) return;
  const sec = +b.dataset.s!;
  setWaveInterval(sec);
  try { localStorage.setItem("witch.wave", String(sec)); } catch { /* fine */ }
});
setWaveInterval(waveChoice);
document.addEventListener("visibilitychange", () => { if (document.hidden) last = 0; });

let lastDraw = 0;
let last = 0, fps = 60, frames = 0, fpsT = 0;
function frame(now: number): void {
  requestAnimationFrame(frame);
  const dt = last ? (now - last) / 1000 : 0;
  last = now;
  frames++; fpsT += dt;
  if (fpsT >= 0.5) { fps = frames / fpsT; frames = 0; fpsT = 0; }
  const c = input.read();
  if (c.debug) { debugOn = !debugOn; debugEl.classList.toggle("on", debugOn); debugButtons.classList.toggle("on", debugOn); }
  view.debugReadouts = debugOn;
  stepGame(game, c, dt);
  if (!ready) return;
  // The wave countdown bar: empties toward the next wave.
  const cd = waveCountdown(game.party, game.map, game.clock.time);
  waveFill.style.height = `${(1 - cd.gone) * 100}%`;
  const left = tuning.party.interval >= 1e9 ? "waves off" : cd.left >= 60 ? `${Math.floor(cd.left / 60)}:${String(Math.ceil(cd.left) % 60).padStart(2, "0")}` : `${Math.ceil(cd.left)} s`;
  waveLabel.textContent = `wave ${game.party.wave} · ${game.party.areas.size} areas · ${left}`;
  waveEl.classList.toggle("paused", game.party.paused);
  // Behind the start screen, a frame every 0.3 s is plenty: the CPU goes to drawing the forest's
  // art in the background instead (and so slow a frame doesn't count against the scenery budget).
  if (game.clock.paused && now - lastDraw < 300) return;
  lastDraw = now;
  view.render(game.clock.time); // game time: party transitions, sigils and waves are stamped in it
  if (debugOn) {
    const w = game.witch, s = view.stats;
    debugEl.textContent = [
      `fps    ${fps.toFixed(0)}`,
      `seed   ${seed}`,
      `area   ${areaUnderWitch(game)}`,
      `mode   ${w.mode}`,
      `at     ${w.x.toFixed(0)}, ${w.z.toFixed(0)} m   zoom ${game.camera.zoomStep}`,
      `trees  ${s.trees}  bushes ${s.bushes}  creatures ${s.creatures}`,
      `budget scenery to ${s.sceneryRadius.toFixed(0)} m (${s.scenery})  gameplay ${s.gameplay}  dropped ${s.dropped}`,
      `draws  ${s.drawCalls}  art queued ${s.pendingArt}  ground tiles ${s.pendingGround}`,
    ].join("\n");
  }
}
requestAnimationFrame(frame);

// For the smoke test and for poking at in the console.
(window as unknown as { witch: unknown }).witch = { game, view, areaUnderWitch: () => areaUnderWitch(game), areaTypeId: (i: number) => AREA_TYPES[i].id, spriteUp: () => SPRITE_UNIFORMS.uUp.value, loadTimes, get ready() { return ready; } };
