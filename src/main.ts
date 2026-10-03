// Starts the prototype: the seed from the URL, the game rules, the view, input, and the loop.
import { areaUnderWitch, newGame, stepGame } from "./rules/game";
import { parseSeed } from "./rules/map";
import { TUNING } from "./rules/tuning";
import { Input } from "./platform/input";
import { View } from "./render/view";
import { loadStyle } from "./render/style";
import { setupTouch } from "./ui/touch";

const params = new URLSearchParams(location.search);
let seed = parseSeed(params.get("seed"));
if (seed === null) {
  seed = Math.floor(Math.random() * 1000000);
  params.set("seed", String(seed));
  history.replaceState(null, "", "?" + params.toString() + location.hash);
}

const game = newGame(seed, TUNING);
const canvas = document.getElementById("game") as HTMLCanvasElement;
// The art is drawn for the pixel size the game renders at (the tuning file's), not the Lab's.
const view = new View(canvas, game, { ...loadStyle(), pixel: TUNING.pixelSize });
const input = new Input();
setupTouch(document.body, input.touch);

const seedEl = document.getElementById("seed")!;
seedEl.innerHTML = `seed <a href="?seed=${seed}">${seed}</a>`;
const debugEl = document.getElementById("debug")!, startEl = document.getElementById("start")!;
let debugOn = params.has("debug");
debugEl.classList.toggle("on", debugOn);

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
  if (c.debug) { debugOn = !debugOn; debugEl.classList.toggle("on", debugOn); }
  stepGame(game, c, dt);
  if (!ready) return;
  view.render(now / 1000);
  if (debugOn) {
    const w = game.witch, s = view.stats;
    debugEl.textContent = [
      `fps    ${fps.toFixed(0)}`,
      `seed   ${seed}`,
      `area   ${areaUnderWitch(game)}`,
      `mode   ${w.mode}`,
      `at     ${w.x.toFixed(0)}, ${w.z.toFixed(0)} m   zoom ${game.camera.zoomStep}`,
      `trees  ${s.trees}  bushes ${s.bushes}  creatures ${s.creatures}`,
      `draws  ${s.drawCalls}  art queued ${s.pendingArt}  ground tiles ${s.pendingGround}`,
    ].join("\n");
  }
}
requestAnimationFrame(frame);

// For the smoke test and for poking at in the console.
(window as unknown as { witch: unknown }).witch = { game, view, areaUnderWitch: () => areaUnderWitch(game), get ready() { return ready; } };
