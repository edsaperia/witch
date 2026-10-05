// Starts the prototype: the seed from the URL, the game rules, the view, input, and the loop.
import { Music } from "./platform/music";
import { musicMix } from "./rules/music";
import { musicCue, type MusicCue } from "./rules/musicPlan";
import type { MusicStyle } from "./rules/musicScore";
import musicStyleJson from "../config/music-style.json";
import { setupArena } from "./rules/arena";
import { newCamera } from "./rules/camera";
import { setupQuestDemo } from "./rules/quest";
import { witchHeight } from "./rules/witch";
import { areaUnderWitch, interpolated, newGame, STEP, stepGame } from "./rules/game";
import { AREA_TYPES } from "./rules/map";
import { waveCountdown } from "./rules/party";
import { parseSeed } from "./rules/map";
import { TUNING } from "./rules/tuning";
import { Input } from "./platform/input";
import { View } from "./render/view";
import { groundHeight } from "./render/height";
import { SPRITE_UNIFORMS } from "./render/sprites";
import { loadStyle } from "./render/style";
import { setupTouch } from "./ui/touch";
import changelog from "../config/changelog.json";
import { PlaytestLog } from "./platform/playtestLog";
import { powerReport } from "./rules/power";

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
  ...TUNING, bloom: { ...TUNING.bloom }, tiltShift: { ...TUNING.tiltShift, treetop: { ...TUNING.tiltShift.treetop } },
  shadows: { ...TUNING.shadows }, canopyShadow: { ...TUNING.canopyShadow }, mist: { ...TUNING.mist },
  party: { ...TUNING.party },
};
if (params.get("shadows") === "off") tuning.shadows.on = false;
if (params.get("canopy") === "off") tuning.canopyShadow.on = false;
if (params.get("mist") === "off") tuning.mist.on = false;
const tilt = params.get("tilt");
if (tilt === "off") tuning.tiltShift.on = false;
else if (tilt === "before" || tilt === "after") { tuning.tiltShift.on = true; tuning.tiltShift.where = tilt; }
// ?tilt=<strength>,<band>: the treetops' tilt-shift, to try values live (e.g. ?tilt=6,0.28).
else if (tilt && /^[\d.]+(,[\d.]+)?$/.test(tilt)) { const [st, bd] = tilt.split(",").map(Number); tuning.tiltShift.on = true; tuning.tiltShift.treetop.strength = st; if (bd > 0) tuning.tiltShift.treetop.band = bd; }
if (params.get("bloom") === "off") tuning.bloom.on = false;
if (params.get("moonbeams") === "on") tuning.moonbeams = 1;
const witchesParam = Number(params.get("witches")); // debug: this many more party witches
if (witchesParam > 0) tuning.partyWitches = { ...tuning.partyWitches, debugExtra: Math.min(48, Math.floor(witchesParam)) };
if (params.get("find") === "0") tuning.find = { ...tuning.find, on: false }; // Ed, v244: compare without the find-in-the-dark looks
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
// The music's style (config/music-style.json) sets the beat everything pulses to.
const musicStyle = musicStyleJson as unknown as MusicStyle;
// The beat's base tempo is the style's; each wave's tempo is its arc step's (Ed: 120 rising to about 140).
tuning.beat = { ...tuning.beat, bpm: musicStyle.bpm, tempos: musicStyle.arc.map(a => a.bpm ?? musicStyle.bpm), blockBars: musicStyle.blockBars, rampBars: musicStyle.tempoRampBars ?? 8 };
// ?music=off: no music; ?music=<section> plays that section of the style over and over (e.g.
// ?music=drop); ?music=wave<N> plays wave N's music whatever the wave (e.g. ?music=wave7).
const musicParam = params.get("music") ?? "";
if (musicParam === "off") tuning.music = { ...tuning.music, on: false };
let musicCueNow: MusicCue | undefined;
{
  const m = /^wave(\d+)$/.exec(musicParam);
  if (m || musicStyle.sections[musicParam]) musicCueNow = { waves: [], nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0, forceWave: m ? +m[1] : undefined, forceSection: m ? undefined : musicParam };
  // a wave's music plays at that wave's tempo throughout
  if (m) tuning.beat = { ...tuning.beat, tempos: [tuning.beat.tempos![Math.min(+m[1], tuning.beat.tempos!.length - 1)]] };
}
// ?blend=off: neighbouring areas' floors meet on a plain edge (to compare); ?blend=<warp>,<fine>,<band> tunes it.
const blendParam = params.get("blend");
if (blendParam === "off") tuning.groundBlend = { ...tuning.groundBlend, on: false };
else if (blendParam) { const [w, f, b] = blendParam.split(",").map(Number); tuning.groundBlend = { ...tuning.groundBlend, warp: w || 0, fine: f || 0, band: b || 0 }; }
// ?border=<twinkle>,<swapRate>,<swapBeat>: the party border's sparkle.
const borderParam = params.get("border")?.split(",").map(Number);
if (borderParam) { const [tw, sr, sb] = borderParam; tuning.borders = { ...tuning.borders, ...(tw >= 0 ? { twinkle: tw } : {}), ...(sr >= 0 ? { swapRate: sr } : {}), ...(sb >= 0 ? { swapBeat: sb } : {}) }; }
// ?grass=0..2: how thick the ground cover is (0 none).
const grassParam = params.get("grass");
if (grassParam !== null && !isNaN(Number(grassParam))) tuning.groundCover = { ...tuning.groundCover, density: Number(grassParam) };
// ?wind=<strength>: the wind's sway (0 still).
const windParam = params.get("wind");
if (windParam !== null && !isNaN(Number(windParam))) tuning.wind = { ...tuning.wind, strength: Number(windParam) };
// ?relief=<strength>: the ground's fake relief (0 flat).
const reliefParam = params.get("relief");
if (reliefParam !== null && !isNaN(Number(reliefParam))) tuning.ground = { ...tuning.ground, relief: { ...tuning.ground.relief, strength: Number(reliefParam) } };
// ?hills=0: the ground flat again; ?hills=<amplitude>: the rolling ground's swells, in metres.
const hillsParam = params.get("hills");
if (hillsParam !== null && !isNaN(Number(hillsParam))) tuning.ground = { ...tuning.ground, hills: { ...tuning.ground.hills, on: Number(hillsParam) > 0, amplitude: Number(hillsParam) > 0 ? Number(hillsParam) : tuning.ground.hills.amplitude } };
// ?ley=0: no ley lines through the runestones.
if (params.get("ley") === "0") tuning.leyLines = { ...tuning.leyLines, on: false };
// ?bare=1: the terrain on its own, to judge the hills, the bumps and the bend (Ed, 2026-10-04): no
// trees, undergrowth, grass, decor, scenes, relics, path props, string lights, mist or shadows; no
// point lights, glow or haze, and a low raking moonlight. ?bare=2: a flat grey ground with contour
// lines every 0.5 m and a 10 m grid, instead of its textures.
const bare = Math.max(0, Math.min(2, Number(params.get("bare")) || 0));
if (bare) {
  tuning.groundCover = { ...tuning.groundCover, on: false };
  tuning.mist = { ...tuning.mist, on: false };
  tuning.canopyShadow = { ...tuning.canopyShadow, on: false };
  tuning.shadows = { ...tuning.shadows, on: false };
  tuning.stringLights = { ...tuning.stringLights, on: false };
  tuning.bare = bare;
}
// ?clouds=<count>: how many clouds (0 none), to compare and to measure.
const cloudsParam = params.get("clouds");
if (cloudsParam !== null && !isNaN(Number(cloudsParam))) tuning.sky = { ...tuning.sky, clouds: { ...tuning.sky.clouds, count: Math.max(0, Number(cloudsParam)) } };
// ?sky=off: no night sky over the bend (the plain dark background), to compare and to measure.
if (params.get("sky") === "off") tuning.sky = { ...tuning.sky, on: false };
// ?curve=<treetop>: the world's bend over the treetops (0 off), to try values live.
const curveParam = params.get("curve");
if (curveParam !== null && !isNaN(Number(curveParam))) tuning.camera = { ...tuning.camera, curve: { ...tuning.camera.curve, treetop: Number(curveParam) } };
const fx = params.get("fx");
if (fx === "pixel" || fx === "smooth") tuning.fx = fx;

const game = newGame(seed, tuning);
// ?quest=1 (the first quest, a demo): beside the nearest sleeping legend, with the creature it
// dreams of on her stack; put its sigil down there (E) to make it happy.
if (params.get("quest")) setupQuestDemo(game, (x, z) => {
  game.witch = { ...game.witch, x, z, mode: "ground", lift: 0, seated: false, vx: 0, vz: 0 };
  game.camera = newCamera(tuning, x, witchHeight(game.witch, tuning), z);
  game.introFocus = undefined;
});
// ?arena=wolf*4,beetle*3 (Stage 5, a debug arena): hers against the wild in the home clearing,
// no waves; J sets it up again.
const arenaParam = params.get("arena");
if (arenaParam) {
  setupArena(game, arenaParam);
  window.addEventListener("keydown", e => { if (e.code === "KeyJ" && !e.repeat) setupArena(game, arenaParam); });
}

// How often the party spreads: the tuning file's interval (5 minutes), or ?wave=<seconds> (0 or
// "off": no waves), or what this viewer last picked on the start screen.
const WAVE_CHOICES = [30, 60, 120, 300, 600, 0];
function setWaveInterval(sec: number): void {
  tuning.party.interval = sec > 0 ? sec : 1e9;
  game.party.paused = sec === 0;
  game.party.nextAt = Math.max(game.clock.time, game.party.bootUntil) + tuning.party.startDelay + tuning.party.interval; // after the boot-up
  document.querySelectorAll<HTMLButtonElement>("#waves button").forEach(b => b.classList.toggle("on", +b.dataset.s! === sec));
}
let waveChoice = tuning.party.interval;
try { const saved = localStorage.getItem("witch.wave"); if (saved !== null && WAVE_CHOICES.includes(+saved)) waveChoice = +saved; } catch { /* storage blocked */ }
const waveParam = params.get("wave");
if (waveParam !== null) waveChoice = waveParam === "off" ? 0 : Math.max(0, +waveParam || 0);
if (arenaParam) waveChoice = 0;
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
// The playtest log (Ed, 2026-10-04): a sample every 10 s of play, kept on this browser; L, or
// opening the game with ?playtest=download, saves the last few runs as JSON.
const playtest = new PlaytestLog(game, typeof __BUILD__ === "string" ? __BUILD__ : "dev");
window.addEventListener("keydown", e => { if (e.code === "KeyL" && !e.repeat) playtest.download(); });
if (params.get("playtest") === "download") setTimeout(() => playtest.download(), 500);

// The action bar (1 2 3 4 Q W E R, its keys and recharge) replaces the old line of controls (Ed,
// 2026-10-04); H shows or hides it (remembered on this browser).
let barOn = true;
try { if (localStorage.getItem("witch.bar") === "off") { barOn = false; view.actionBar.visible = false; } } catch { /* storage blocked: shown */ }
window.addEventListener("keydown", e => {
  if (e.code !== "KeyH" || e.repeat) return;
  barOn = !barOn; view.actionBar.visible = barOn;
  try { localStorage.setItem("witch.bar", barOn ? "on" : "off"); } catch { /* fine */ }
});

// Auto-talk (Ed's playtest, 2026-10-04: a new player wanted to turn it off): 1 or T, or a click
// on its slot, turns it on or off (remembered on this browser); off, she talks while Shift is held.
let autoTalk = true;
try { if (localStorage.getItem("witch.autotalk") === "off") autoTalk = false; } catch { /* storage blocked: on */ }
view.actionBar.autoTalk = autoTalk;
view.actionBar.onAutoTalk = () => { input.touch.autoTalk = true; };
const setAutoTalk = (on: boolean) => {
  autoTalk = on; view.actionBar.autoTalk = on;
  try { localStorage.setItem("witch.autotalk", on ? "on" : "off"); } catch { /* fine */ }
};

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

// The volume (Ed's playtest, 2026-10-04): a slider in the corner, 0 mutes; remembered on this browser.
// (The music is the only sound for now; sound effects will follow the same level.)
let level = 0.8;
try { const v = localStorage.getItem("witch.volume"); if (v !== null && !isNaN(+v)) level = Math.min(1, Math.max(0, +v)); } catch { /* storage blocked */ }
const volumeEl = document.createElement("label");
volumeEl.id = "volume";
volumeEl.title = "volume (0 mutes)";
Object.assign(volumeEl.style, { position: "fixed", right: "10px", bottom: "12px", zIndex: "3", display: "flex", alignItems: "center", gap: "4px", padding: "2px 6px", borderRadius: "6px", background: "rgba(14,11,28,.55)", color: "#e8e2f4", font: "12px ui-monospace, Menlo, Consolas, monospace", pointerEvents: "auto" });
const volumeIcon = document.createElement("span"), volumeRange = document.createElement("input");
volumeRange.type = "range"; volumeRange.min = "0"; volumeRange.max = "100"; volumeRange.value = String(Math.round(level * 100));
volumeRange.style.width = "80px";
const showVolume = () => { volumeIcon.textContent = level === 0 ? "🔇" : level < 0.4 ? "🔈" : "🔊"; };
volumeRange.addEventListener("input", () => {
  level = +volumeRange.value / 100; showVolume();
  if (music) music.volume = tuning.music.volume * level;
  try { localStorage.setItem("witch.volume", String(level)); } catch { /* fine */ }
});
for (const ev of ["pointerdown", "keydown"]) volumeRange.addEventListener(ev, e => e.stopPropagation()); // its own presses and arrow keys don't fly her
volumeEl.append(volumeIcon, volumeRange); showVolume();
document.body.append(volumeEl);

// Browsers keep sound off until the player presses something: the start screen is that press.
let audio: AudioContext | null = null, music: Music | null = null;
function start(): boolean {
  if (!ready || !game.clock.paused) return false;
  try { audio ??= new AudioContext(); void audio.resume(); if (!music && tuning.music.on) music = new Music(audio, tuning.music.volume * level, musicStyle, seed!, tuning.music.src); } catch { /* no sound yet anyway */ }
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
/** Driven from outside (the perf check, tools/smoke): the loop below stands still, and
 *  window.witch.frame steps and draws one frame of a fixed length instead. */
let manual = false;
let overShown = false;
document.getElementById("again")?.addEventListener("click", () => location.reload());
document.getElementById("fresh")?.addEventListener("click", () => { const u = new URL(location.href); u.searchParams.set("seed", String(Math.floor(Math.random() * 1e6))); location.href = u.toString(); });
function frame(now: number): void {
  requestAnimationFrame(frame);
  if (manual) return;
  const dt = last ? (now - last) / 1000 : 0;
  last = now;
  frames++; fpsT += dt;
  if (fpsT >= 0.5) { fps = frames / fpsT; frames = 0; fpsT = 0; }
  const c = input.read();
  if (c.toggleAutoTalk) setAutoTalk(!autoTalk);
  c.autoTalk = autoTalk;
  if (c.debug) { debugOn = !debugOn; debugEl.classList.toggle("on", debugOn); debugButtons.classList.toggle("on", debugOn); }
  view.debugReadouts = debugOn;
  stepGame(game, c, dt);
  // The run is over when every soundsystem has fallen (Stage 4): the end screen, and a restart.
  if (game.over && !overShown) {
    overShown = true;
    game.clock.paused = true;
    document.getElementById("over-stats")!.textContent = `You lasted ${Math.floor(game.clock.time / 60)} min ${Math.floor(game.clock.time % 60)} s and ${game.party.wave} waves.`;
    document.getElementById("over")!.classList.add("on");
  }
  playtest.update();
  // The music: one track, mixed by how near the witch is to a playing soundsystem.
  musicCueNow = musicCue(game, musicCueNow);
  music?.update(musicMix(game, game.witch), musicCueNow, game.clock.time, game.beat, !game.clock.paused);
  if (!ready) return;
  // The wave countdown bar: empties toward the next wave.
  const cd = waveCountdown(game.party, game.map, game.clock.time);
  waveFill.style.height = `${(1 - cd.gone) * 100}%`;
  const clock = (s: number) => (s >= 60 ? `${Math.floor(s / 60)}:${String(Math.ceil(s) % 60).padStart(2, "0")}` : `${Math.ceil(s)} s`);
  const left = tuning.party.interval >= 1e9 ? "waves off" : cd.booting ? `booting · ${clock(cd.bootLeft)}` : cd.left >= 60 ? `${Math.floor(cd.left / 60)}:${String(Math.ceil(cd.left) % 60).padStart(2, "0")}` : `${Math.ceil(cd.left)} s`;
  waveLabel.textContent = `wave ${game.party.wave} · ${game.party.areas.size} areas · ${left}`;
  waveEl.classList.toggle("paused", game.party.paused);
  // Behind the start screen, a frame every 0.3 s is plenty: the CPU goes to drawing the forest's
  // art in the background instead (and so slow a frame doesn't count against the scenery budget).
  if (game.clock.paused && now - lastDraw < 300) return;
  lastDraw = now;
  // Drawn between the last two fixed steps (game time: party transitions, sigils and waves are stamped in it).
  interpolated(game, () => view.render(Math.max(0, game.clock.time - (1 - game.alpha) * STEP)));
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
      ...powerLines(),
    ].join("\n");
  }
}
requestAnimationFrame(frame);

/** The power meter (Ed, 2026-10-04): fighting value, Σ √(hp × dps) (rules/power.ts), of the party
 *  (leashed and parked) against each siege and every besieger together. */
function powerLines(): string[] {
  const p = powerReport(game.creatures, game.witches, game.combat.sounds), n = p.counts, f = (x: number) => x.toFixed(0);
  const sieges = p.sieges.slice(0, 4).map(s => `${s.key} ${f(s.value)} (${s.count}, ${f(s.hp)} hp)`).join("  ");
  return [
    `power  party ${f(p.leashed + p.parked)} = leashed ${f(p.leashed)} + parked ${f(p.parked)}   ${n[0]}b ${n[1]}y ${n[2]}a ${n[3]}L   berries ${game.tally.berries} invites ${game.tally.invites}`,
    `wild   grown ${game.growth.grown} a wave at a time, ${game.growth.made} come out, ${game.growth.grown - game.growth.made} waiting as counts   creatures ${game.creatures.length}`,
    `enemy  marching ${f(p.marching)}${p.sieges.length ? `   ${sieges}${p.sieges.length > 4 ? ` +${p.sieges.length - 4} more` : ""}` : ""}   (L saves the playtest log)`,
  ];
}

// For the smoke test and for poking at in the console.
(window as unknown as { witch: unknown }).witch = { game, view,
  get manual() { return manual; }, set manual(on: boolean) { manual = on; },
  frame: (c: Parameters<typeof stepGame>[1], dt: number, draw = true) => { const t0 = performance.now(); stepGame(game, c, dt); const t1 = performance.now(); view.render(game.clock.time, draw); return { step: t1 - t0, render: performance.now() - t1, ms: view.ms }; }, areaUnderWitch: () => areaUnderWitch(game), areaTypeId: (i: number) => AREA_TYPES[i].id, spriteUp: () => SPRITE_UNIFORMS.uUp.value, spriteRight: () => SPRITE_UNIFORMS.uRight.value, groundHeight, loadTimes, get ready() { return ready; } };
