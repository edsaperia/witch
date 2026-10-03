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
};
if (params.get("shadows") === "off") tuning.shadows.on = false;
if (params.get("canopy") === "off") tuning.canopyShadow.on = false;
if (params.get("mist") === "off") tuning.mist.on = false;
const tilt = params.get("tilt");
if (tilt === "off") tuning.tiltShift.on = false;
else if (tilt === "before" || tilt === "after") { tuning.tiltShift.on = true; tuning.tiltShift.where = tilt; }
if (params.get("bloom") === "off") tuning.bloom.on = false;
const fx = params.get("fx");
if (fx === "pixel" || fx === "smooth") tuning.fx = fx;

const game = newGame(seed, tuning);
const canvas = document.getElementById("game") as HTMLCanvasElement;
// The art is drawn for the pixel size the game renders at (the tuning file's), not the Lab's.
const style = loadStyle();
const view = new View(canvas, game, {
  ...style, pixel: tuning.pixelSize,
  // Trees taller by treeHeight; crowns wider by crownWidth in all (treeHeight widens them too).
  treeSize: style.treeSize * tuning.treeHeight, crownWidth: style.crownWidth * tuning.crownWidth / tuning.treeHeight,
});
view.debugCull = params.get("debug") === "cull";
// ?scenery=<metres>: a fixed scenery radius instead of the adaptive budget.
const sceneryAt = Number(params.get("scenery"));
if (params.has("scenery") && sceneryAt > 0) view.sceneryFixed = sceneryAt;
const input = new Input();
document.getElementById("next-wave")!.addEventListener("pointerdown", e => { e.preventDefault(); input.touch.nextWave = true; });
document.getElementById("pause-waves")!.addEventListener("pointerdown", e => { e.preventDefault(); input.touch.pauseWaves = true; });
setupTouch(document.body, input.touch);

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
requestAnimationFrame(() => setTimeout(async () => {
  await view.prepare();
  ready = true;
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
document.addEventListener("visibilitychange", () => { if (document.hidden) last = 0; });

let last = 0, fps = 60, frames = 0, fpsT = 0;
function frame(now: number): void {
  requestAnimationFrame(frame);
  const dt = last ? (now - last) / 1000 : 0;
  last = now;
  frames++; fpsT += dt;
  if (fpsT >= 0.5) { fps = frames / fpsT; frames = 0; fpsT = 0; }
  const c = input.read();
  if (c.debug) { debugOn = !debugOn; debugEl.classList.toggle("on", debugOn); debugButtons.classList.toggle("on", debugOn); }
  stepGame(game, c, dt);
  if (!ready) return;
  // The wave countdown bar: empties toward the next wave.
  const cd = waveCountdown(game.party, game.map, game.clock.time);
  waveFill.style.height = `${(1 - cd.gone) * 100}%`;
  waveLabel.textContent = `wave ${game.party.wave} · ${game.party.areas.size} areas · ${Math.ceil(cd.left)} s`;
  waveEl.classList.toggle("paused", game.party.paused);
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
(window as unknown as { witch: unknown }).witch = { game, view, areaUnderWitch: () => areaUnderWitch(game), areaTypeId: (i: number) => AREA_TYPES[i].id, spriteUp: () => SPRITE_UNIFORMS.uUp.value, get ready() { return ready; } };
