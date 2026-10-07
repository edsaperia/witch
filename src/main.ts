// Starts the prototype: the seed from the URL, the game rules, the view, input, and the loop.
import { LEGEND_BUFFS } from "./rules/buffs";
import { FrameStats } from "./platform/frameStats";
import { Shake } from "./render/shake";
import { musicCue } from "./rules/musicPlan";
import { setupArena } from "./rules/arena";
import { endParty } from "./rules/partyOver";
import { newCamera } from "./rules/camera";
import { setupQuestDemo } from "./rules/quest";
import { witchHeight } from "./rules/witch";
import { cellKey } from "./rules/party";
import { areaUnderWitch, hitWitch, interpolated, joinParty, loseSoundsystem, newGame, STEP, stepGame } from "./rules/game";
import { AREA_TYPES } from "./rules/map";
import { awaitingSpell } from "./rules/leypulse";
import { parseSeed } from "./rules/map";
import { Input } from "./platform/input";
import { View } from "./render/view";
import { bendPoint, groundHeight, placed } from "./render/height";
import { Vector3 } from "three";
import { SPRITE_UNIFORMS } from "./render/sprites";
import { LIGHT_UNIFORMS } from "./render/lighting";
import { loadStyle } from "./render/style";
import { setupTouch } from "./ui/touch";
import { CHANGELOG_VERSIONS } from "./changelog";
import { setupStartScreen, startOnGesture } from "./ui/startScreen";
import { AimHud } from "./render/aimhud";
import { UPCOMING } from "./ui/upcoming";
import { PlaytestLog } from "./platform/playtestLog";
import { StallLog } from "./platform/stallLog";
import { Freeze } from "./platform/freeze";
import { Creator, loadGenome } from "./ui/creator";
import { BOT_GAME, BOT_KINDS, newBot, type Bot, type BotKind } from "./rules/bot";
import { BotTag } from "./ui/botGame";
import { pleasingWitch } from "./ui/looks";
import { DecidePanel } from "./ui/decide";
import { tuningFromLink } from "./app/linkParams";
import { Hud } from "./app/hud";
import { setupKnobs } from "./app/knobs";
import { Sound } from "./app/sound";

const params = new URLSearchParams(location.search);
let seed = parseSeed(params.get("seed"));
if (seed === null) {
  seed = Math.floor(Math.random() * 1000000);
  params.set("seed", String(seed));
  history.replaceState(null, "", "?" + params.toString() + location.hash);
}

// The link's switches and the tuning for this load (app/linkParams.ts).
const { tuning, musicStyle, musicCue: linkMusicCue, world, WORLD_DEFAULT, propsGen } = tuningFromLink(params);
let musicCueNow = linkMusicCue;
const game = newGame(seed, tuning);
// The party spell (Ed, 2026-10-06): she stands behind her decks until it's cast (the button, or Enter). ?creator=0 (the
// tools and smoke runs) starts at once, as before, unless ?spell=wait; ?spell=auto starts at once anywhere.
if (params.get("spell") !== "auto" && !(params.get("creator") === "0" && params.get("spell") !== "wait")) game.party.spellAt = null;
// ?buffs=fox,toad,stag (debug): these legends' buffs on from the start, whatever the legends do (a
// species twice stacks it). ?buffs=all: every one.
const buffsParam = params.get("buffs");
if (buffsParam) game.buffs.forced = buffsParam === "all" ? Object.keys(LEGEND_BUFFS.species) : buffsParam.split(",").map(s => s.trim().toLowerCase().replace(/[^a-z]/g, "")).filter(Boolean);
// ?quest=1 (the first quest, a demo): beside the nearest sleeping legend, with the creature it
// dreams of on her stack; put its sigil down there (E) to make it happy.
if (params.get("quest")) setupQuestDemo(game, (x, z) => {
  game.witch = { ...game.witch, x, z, mode: "ground", lift: 0, seated: false, vx: 0, vz: 0 };
  game.camera = newCamera(tuning, x, witchHeight(game.witch, tuning), z);
  game.introFocus = undefined;
});
// ?arena=wolf*4,beetle*3 (Stage 5, a debug arena): hers against the wild in the home clearing,
// no waves; J sets it up again.
// ?partyover=1 (a debug flag): the party's over from the start, the afterparty (rules/partyOver.ts).
if (params.get("partyover") === "1") endParty(game);
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
{ const artStyle = params.get("style") ?? "bold"; if (artStyle === "bold" || artStyle === "ref") style.artStyle = artStyle; } // bold by default (Ed, 2026-10-06: "I think I prefer bold style"); ?style=now|bold|ref: a pixel-art style (art/stylise.js) baked into every sprite, carried to the art worker in the style
if (propsGen) { style.propGen = 1; tuning.partyObjects.generated = true; } // the prop generator (by default; ?props=hand turns it off): the prop generator (art/props/) stands in for the areas' stones, cairns, pools, stumps, logs, fungi and henges, several shapes of each, and the party's generated bunting, balloons and lanterns for the hand-made ones (carried to the art worker in the style, to the rules in the tuning)
if (params.get("texture") === "0") style.texture = 0; // ?texture=0: creatures as before their fur, feathers and scales (art/genome/texture.js), to compare
if (params.get("flora")) style.flora = params.get("flora"); // ?flora=new|fantasy|all|<ids>: every wooded area grows these tree species (art/flora), carried to the art worker in the style
/** Load timings (ms since the page started): the view built (the page's own sprites drawn), ready to play. */
const loadTimes = { viewStart: performance.now(), view: 0, ready: 0 };
// Her look (the character creator's, kept on this browser; else the classic witch).
const savedLook = loadGenome();
/** Whether her look has a hat to lose on a knockout (rules/hat.ts; Ed, 2026-10-06: "If she chooses no hat in character creation, then she simply doesn't have this mechanic"). */
const hasHat = (g: unknown) => (g as { hat?: { shape?: string } } | null)?.hat?.shape !== "none";
const wearHat = (g: unknown) => { const H = game.witches[0].hat; H.has = hasHat(g); if (!H.has) H.down = null; };
wearHat(savedLook);
const view = new View(canvas, game, {
  ...style, pixel: tuning.pixelSize,
  // Trees taller by treeHeight; crowns wider by crownWidth in all (treeHeight widens them too).
  treeSize: style.treeSize * tuning.treeHeight, crownWidth: style.crownWidth * tuning.crownWidth / tuning.treeHeight,
}, savedLook);
loadTimes.view = performance.now();
view.debugCull = params.get("debug") === "cull";
// ?debug=shadows: every shadow a flat magenta tint, to see each against what casts it (render/shadows.ts).
if (params.get("debug") === "shadows") view.debugShadows();
view.quick = params.get("quick") === "1";
// ?scenery=<metres>: a fixed scenery radius instead of the adaptive budget.
const sceneryAt = Number(params.get("scenery"));
if (params.has("scenery") && sceneryAt > 0) view.sceneryFixed = sceneryAt;
const input = new Input();
input.aimFrom = (x, y) => view.aimAt(x, y);
const aimHud = new AimHud(canvas); // the reticle where the mouse aims: 💌 range and the dodge's recharge
/** Where a dodge would put her now (toward the cursor, rules/dash.ts), in client pixels, for the reticle's mark. */
const landV = new Vector3();
function dashLanding(): { x: number; y: number } | null {
  const a = input.lastAim, D = game.buffs.tuning.dash, W = game.witch;
  if (!a || !D.toCursor || W.mode !== "ground") return null;
  const l = Math.hypot(a.x, a.z), dx = l >= D.aimDead ? a.x / l : W.facing, dz = l >= D.aimDead ? a.z / l : 0;
  placed(landV.set(W.x + dx * D.distance, 0, W.z + dz * D.distance)).project(view.camera);
  const r = canvas.getBoundingClientRect();
  return { x: r.left + (landV.x * 0.5 + 0.5) * r.width, y: r.top + (-landV.y * 0.5 + 0.5) * r.height };
}
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

// The debug knobs: the fight's scale and speed, the treetop speed (app/knobs.ts).
const knobs = setupKnobs(tuning, game, world, WORLD_DEFAULT, params, playtest);

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
// The start screen, full screen: What's new in this build (config/changelog/) and what's coming up
// (the open pull requests, listed at deploy time), the controls below (src/ui/startScreen.ts).
declare const __BUILD_DATE__: string;
setupStartScreen({
  el: document.getElementById("start")!, build: typeof __BUILD__ === "string" ? __BUILD__.split(" ")[0] : "dev",
  builtOn: typeof __BUILD_DATE__ === "string" ? __BUILD_DATE__ : new Date().toISOString().slice(0, 10), versions: CHANGELOG_VERSIONS, upcoming: UPCOMING,
});
const seedEl = document.getElementById("seed")!;
seedEl.innerHTML = `seed <a href="?seed=${seed}">${seed}</a>`;
const startEl = document.getElementById("start")!;
/** The party spell (Ed, 2026-10-06): cast by the creator's scroll (ui/spellScroll.ts), its burst starting play; without the
 *  creator (?creator=0&spell=wait), Enter (once play has begun, so the start screen's Enter isn't it) or her spell key casts it
 *  on the next step. */
let castQueued = false;
const queueCast = () => { if (awaitingSpell(game.party) && !game.clock.paused) castQueued = true; };
window.addEventListener("keydown", e => { if (e.code === "Enter" && game.clock.time > 0.3 && !creator.open) queueCast(); });
// The clock, its pops and the debug overlay (app/hud.ts).
const hud = new Hud(game, tuning, knobs);
hud.setDebug(params.has("debug"));

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
  if (bot) start(); // (a bot game starts itself as soon as it can)
}, 0));

// The sound: the volume slider in the corner, then the context, music and sound effects at the first press (app/sound.ts).
const sound = new Sound(tuning, musicStyle, seed!);
sound.volumeSlider();
// The freeze (Esc, gamepad Start, the ❚❚ button): a true still for screenshots, . steps (platform/freeze.ts).
const freeze = new Freeze(game, seed!, typeof __BUILD__ === "string" ? __BUILD__ : "dev");
freeze.started = () => startEl.style.display === "none";

// The character creator (Ed, 2026-10-05): at every load (and from the start screen's button);
// ?creator=0 skips it (tests, the smoke run), and loading is the start screen's as before.
// It's also the loading screen (Ed, 2026-10-05): it opens at once and the forest grows behind it;
// Start waits ("getting ready") until play can begin.
const creator = new Creator(style, savedLook, tuning.pixelSize);
(window as unknown as { __creator: Creator }).__creator = creator; // (the creator's smoke scripts read her place in the room)
let lookNow = JSON.stringify(savedLook);
creator.progress = () => { const a = view.assets; return { done: a.done, total: a.done + a.pending, ready }; };
// (its room's ambience plays while it's open: overnight, 2026-10-06)
creator.onGesture = () => sound.wake();
creator.onStart = g => {
  const who = playerPick?.value ?? "human"; // (the dev "Player:" pick: a bot plays the run instead of her)
  if (who !== "human" && BOT_KINDS.includes(who as BotKind)) { botGame(who as BotKind); start(); return; }
  if (JSON.stringify(g) !== lookNow) { lookNow = JSON.stringify(g); view.setWitch(g); wearHat(g); }
  if (start()) queueCast();
}; // (the scroll's burst: play, and the spell cast)
creator.spellSound = (cue, v) => sound.sfx?.spell(cue, v);
// The bot game (Ed, 2026-10-06: "start the game and watch the skilled bot play"; ?bot=skilled|crude, or the start
// screen's Bot game): rules/bot.ts plays in place of her controls, a seeded witch, no character creation.
const botParam = params.get("bot") as BotKind | null;
let bot: Bot | null = null, botTag: BotTag | null = null;
function botGame(kind: BotKind): void {
  if (bot) return;
  bot = newBot(kind, BOT_GAME[kind]); // (the skilled one questing, bringing relics and feeding: rules/bot.ts BOT_GAME)
  const look = pleasingWitch(seed!);
  lookNow = JSON.stringify(look); view.setWitch(look); wearHat(look);
  botTag = new BotTag(kind, () => { const u = new URL(location.href); u.searchParams.delete("bot"); location.href = u.toString(); });
  if (creator.open) creator.hide();
}
if (botParam && BOT_KINDS.includes(botParam)) botGame(botParam);
else if (params.get("creator") !== "0") creator.show();
const lookBtn = document.getElementById("look-btn");
if (lookBtn) {
  for (const ev of ["pointerdown", "pointerup", "click", "touchstart"]) lookBtn.addEventListener(ev, e => e.stopPropagation()); // (not a start)
  lookBtn.addEventListener("click", () => { if (ready && game.clock.paused) creator.show(); });
}
// (the bedroom has the dev "Player:" pick above in place of a Bot game button)
// The dev "Player:" pick (Ed, 2026-10-06: "add the bot game selector ... a dropdown with e.g. human / crude / skilled / champion
// ... it won't be in the final game so don't worry about making it look nice"): human, then every bot in BOT_KINDS (a new one
// shows up by itself); casting the scroll with a bot picked starts that bot's game, as ?bot=<kind>. Kept for the session
// (sessionStorage witch.player); ?dev=0 hides it. Plain and unstyled, in the bedroom's top right corner.
const playerPick: HTMLSelectElement | null = params.get("dev") === "0" ? null : (() => {
  const box = document.createElement("label"), sel = document.createElement("select");
  box.id = "player-pick"; box.textContent = "Player: ";
  Object.assign(box.style, { position: "absolute", right: "8px", top: "8px", zIndex: "5", font: "12px sans-serif", color: "#ccc" });
  for (const k of ["human", ...BOT_KINDS]) { const o = document.createElement("option"); o.value = o.textContent = k; sel.append(o); }
  try { const v = sessionStorage.getItem("witch.player"); if (v && [...sel.options].some(o => o.value === v)) sel.value = v; } catch { /* storage blocked */ }
  sel.addEventListener("change", () => { try { sessionStorage.setItem("witch.player", sel.value); } catch { /* this load only */ } });
  for (const ev of ["pointerdown", "click", "keydown"]) sel.addEventListener(ev, e => e.stopPropagation()); // (its own keys, not the room's)
  box.append(sel); creator.root.append(box);
  return sel;
})();
const botBtn = document.getElementById("bot-btn");
if (botBtn) {
  for (const ev of ["pointerdown", "pointerup", "click", "touchstart"]) botBtn.addEventListener(ev, e => e.stopPropagation()); // (not a start of her own)
  botBtn.addEventListener("click", () => { if (!game.clock.paused) return; botGame("skilled"); if (ready) start(); }); // (before the forest's ready, it starts as soon as it is)
}
function start(): boolean {
  if (!ready || !game.clock.paused || freeze.frozen) return false;
  if (creator.open) return true;
  sound.start(); // (browsers keep sound off until the player presses something: the start is that press)
  game.clock.paused = false;
  startEl.style.display = "none";
  input.clearPresses();
  return true;
}
input.onAny = start;
// The audio watchdog (app/sound.ts).
sound.watch(() => !game.clock.paused && !freeze.frozen && !document.hidden, () => game.speakerBoot.some(t => t !== null), playtest);
freeze.onToggle = on => sound.freeze(on);
startOnGesture(startEl, start); // a click or a tap starts; a touch that drags scrolls the text
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
// Screen shake when she's hit (Ed, 2026-10-05; render/shake.ts), laid on the canvas as a transform.
// For comfort it can be turned off: ?shake=0, or the start screen's toggle (remembered here).
let shakeOn = params.get("shake") !== "0";
try { if (params.get("shake") === null && localStorage.getItem("witch.shake") === "0") shakeOn = false; } catch { /* fine */ }
const shake = new Shake(tuning.camera.shake, shakeOn), shakeEl = document.getElementById("shake-opt");
const showShakeOpt = () => { if (shakeEl) shakeEl.innerHTML = `screen shake <button type="button" data-v="1" class="${shake.on ? "on" : ""}">on</button><button type="button" data-v="0" class="${shake.on ? "" : "on"}">off</button>`; };
showShakeOpt();
shakeEl?.addEventListener("pointerdown", e => {
  e.stopPropagation();
  const b = (e.target as HTMLElement).closest("button");
  if (!b) return;
  shake.on = b.dataset.v === "1";
  try { localStorage.setItem("witch.shake", shake.on ? "1" : "0"); } catch { /* fine */ }
  showShakeOpt();
});
let shaken = false;
// No start card before her room (Ed, 2026-10-06: "There is something before the bedroom… can we skip it and go straight to
// the bedroom?"): with the character creator the page opens straight into it, and the card's contents live in its tabs
// (❔ Controls, also the ? key; 📜 What's new; ⚙ Options: the waves and the screen shake). The card itself shows only for a
// run without the creator (?creator=0: the tools and smoke runs, "press any key") or a bot game while the forest grows.
if (params.get("creator") !== "0" && !bot) {
  const keys = startEl.querySelector<HTMLElement>(".keys"), news = startEl.querySelector<HTMLElement>(".ss-body");
  if (keys) creator.addTab("controls", "❔ Controls", [keys]);
  if (news) creator.addTab("news", "📜 What's new", [news]);
  creator.addTab("options", "⚙ Options", [wavesEl, ...(shakeEl ? [shakeEl] : [])]);
} else startEl.style.display = "";
// ?subpixel=0: the camera's old whole-art-pixel steps, to compare (on by default: Ed, 2026-10-05, "it feels low").
const subpixelOn = params.get("subpixel") !== "0";
if (params.get("glide") === "camera") view.glide = "camera"; // (?glide=camera: the glide by the camera's snap, as before 2026-10-06)
// Ed's decisions panel (src/ui/decide.ts, config/decisions.json): ?decide opens it, F2 opens and closes it.
let decide: DecidePanel | null = null;
const decidePanel = (open: boolean) => decide ??= new DecidePanel({ tuning: game.tuning, seed: game.seed, version: typeof __BUILD__ === "string" ? __BUILD__ : "dev", live: { glide: v => { view.glide = v === "camera" ? "camera" : "witch"; } } }, open);
if (params.has("decide")) decidePanel(true);
window.addEventListener("keydown", e => { if (e.code !== "F2") return; e.preventDefault(); if (decide) decide.toggle(); else decidePanel(true); });
function applyShake(): void {
  const W = game.witches[0];
  shake.watch(W.health, !!W.ko, tuning.witchHealth.hits, game.clock.time);
  const o = shake.offset(game.clock.time, tuning.pixelSize);
  // The camera's sub-pixel glide (view.subpixel): the snap it took off, given back in whole screen pixels.
  const p = tuning.pixelSize, gx = subpixelOn ? Math.round(view.subpixel.x * p) : 0, gy = subpixelOn ? Math.round(view.subpixel.y * p) : 0;
  if (o.amount <= 0) {
    if (gx || gy) { canvas.style.transform = `translate(${gx}px, ${gy}px)`; shaken = true; }
    else if (shaken) { canvas.style.transform = ""; shaken = false; }
    return;
  }
  // Zoomed in just enough that no edge shows while it's off centre and turned.
  const w = window.innerWidth, h = window.innerHeight, turn = Math.abs((o.rot * Math.PI) / 180) * 0.5 * Math.hypot(w, h);
  const zoom = 1 + (2 * (Math.max(Math.abs(o.x), Math.abs(o.y)) + turn)) / Math.min(w, h);
  canvas.style.transform = `translate(${o.x + gx}px, ${o.y + gy}px) rotate(${o.rot.toFixed(3)}deg) scale(${zoom.toFixed(4)})`;
  shaken = true;
}
document.addEventListener("visibilitychange", () => { if (document.hidden) last = 0; });

let lastDraw = 0;
let last = 0;
const frameStats = new FrameStats(view.renderer.getContext());
// Frames of 100 ms or more, with what they spent it on (Ed, 2026-10-06: occasional half-second freezes): the overlay and the playtest log.
const stallLog = new StallLog();
playtest.stalls = () => stallLog.stalls;
/** Driven from outside (the perf check, tools/smoke): the loop below stands still, and
 *  window.witch.frame steps and draws one frame of a fixed length instead. */
let manual = false;
let overShown = false;
document.getElementById("again")?.addEventListener("click", () => location.reload());
document.getElementById("over-close")?.addEventListener("click", () => document.getElementById("over")!.classList.remove("on"));
document.getElementById("fresh")?.addEventListener("click", () => { const u = new URL(location.href); u.searchParams.set("seed", String(Math.floor(Math.random() * 1e6))); location.href = u.toString(); });
function frame(now: number): void {
  requestAnimationFrame(frame);
  if (manual) return;
  const dt = last ? (now - last) / 1000 : 0;
  last = now;
  const work0 = performance.now();
  frameStats.frame(dt * 1000);
  freeze.pollPad();
  const human = input.read();
  // A bot game: the bot's controls, not hers (the camera's zoom and the debug key still hers).
  const c: typeof human = bot ? { ...bot.decide(game), zoom: human.zoom, debug: human.debug, toggleAutoTalk: false } : human;
  if (bot) botTag?.update(bot.doing);
  if (castQueued) { c.castParty = !bot; castQueued = false; }
  if (c.toggleAutoTalk) setAutoTalk(!autoTalk);
  c.autoTalk = autoTalk;
  if (c.debug) hud.setDebug(!hud.debugOn);
  view.debugReadouts = hud.debugOn;
  const step0 = performance.now();
  stepGame(game, c, dt * (botTag?.speed ?? 1));
  const stepMs = performance.now() - step0;
  // The party's over (rules/partyOver.ts; Ed, 2026-10-06): no end screen and no pause, the afterparty. Once it has eased
  // in, a small card under the clock says so, with the time she lasted, and a way to play again.
  if (game.partyOver && game.partyOver.ease >= 1 && !overShown) {
    overShown = true;
    document.getElementById("over-stats")!.textContent = `You lasted ${Math.floor(game.partyOver.at / 60)} min ${Math.floor(game.partyOver.at % 60)} s and ${game.party.wave} waves.`;
    document.getElementById("over")!.classList.add("on");
  }
  const log0 = performance.now();
  playtest.update();
  const audio0 = performance.now();
  // The music: one track, mixed by how near the witch is to a playing soundsystem.
  musicCueNow = musicCue(game, musicCueNow);
  sound.update(game, musicCueNow, creator.open);
  const outside = { playtest: audio0 - log0, audio: performance.now() - audio0 }; // (for the stall log: not the view's own parts)
  if (!ready) return;
  hud.losses();
  hud.clock();
  // Behind the start screen, a frame every 0.3 s is plenty: the CPU goes to drawing the forest's
  // art in the background instead (and so slow a frame doesn't count against the scenery budget).
  if (game.clock.paused && !freeze.frozen && now - lastDraw < 300) return;
  lastDraw = now;
  // Drawn between the last two fixed steps (game time: party transitions, sigils and waves are stamped in it).
  frameStats.beginGpu();
  interpolated(game, () => view.render(Math.max(0, game.clock.time - (1 - game.alpha) * STEP * game.timeScale))); // (the world's step is STEP x timeScale: rules/slowTime.ts)
  frameStats.endGpu();
  aimHud.update(game, game.herTime, input.cursor, input.lastAim, startEl.style.display === "none" && !bot, dashLanding());
  frameStats.work(performance.now() - work0);
  if (!game.clock.paused) stallLog.frame({ t: game.clock.time, gap: dt * 1000, work: performance.now() - work0, step: stepMs, parts: { ...view.ms, ...outside }, mode: game.witch.mode, x: game.witch.x, z: game.witch.z, wave: game.party.wave, creatures: game.creatures.length });
  applyShake();
  freeze.update();
  // The overlay (app/hud.ts), four times a second.
  hud.overlay(now, () => {
    const w = game.witch, s = view.stats;
    return [
      ...frameStats.lines(),
      stallLog.line(),
      `seed   ${seed}`,
      `area   ${areaUnderWitch(game)}`,
      `mode   ${w.mode}`,
      `at     ${w.x.toFixed(0)}, ${w.z.toFixed(0)} m   zoom ${game.camera.zoomStep}`,
      `trees  ${s.trees}  bushes ${s.bushes}  creatures ${s.creatures}`,
      `budget scenery to ${s.sceneryRadius.toFixed(0)} m (${s.scenery})  gameplay ${s.gameplay}  dropped ${s.dropped}`,
      `draws  ${s.drawCalls}  art queued ${s.pendingArt}  ground tiles ${s.pendingGround}`,
      ...(game.lod ? [`sim    full ${game.lod.full}  coarse ${game.lod.coarse}  frozen ${game.lod.frozen}   marching full ${game.lod.marchFull}  coarse ${game.lod.marchCoarse}`] : []),
    ];
  });
}
requestAnimationFrame(frame);


// For the smoke test and for poking at in the console.
(window as unknown as { witch: unknown }).witch = { game, view, arena: (spec: string) => setupArena(game, spec), // (a debug hook: another arena without reloading)
  /** A debug hook (screenshots of the party's life): creature `id` joins its area's party, happy, at its spot (rules/partyGuests.ts); home's round the dancefloor. */
  guest: (id: number) => { const c = game.creatures[id], a = game.party.areas.get(cellKey(c.cell)); if (!c || !a) return false; c.state = "happy"; c.enraged = false; c.siege = undefined; joinParty(game, c, a.soundsystem ?? game.map.dancefloor, a.cell); return true; },
  /** A debug hook: lose a soundsystem now (its key, "home" the dancefloor's ring), as if destroyed. */
  lose: (key = "home") => { const s = game.combat.sounds.get(key); if (s) s.hp = 0; loseSoundsystem(game, key, s?.x ?? 0, s?.z ?? 0); const e = game.waveEvents[game.waveEvents.length - 1]; if (e) hud.showLoss(e); return e; },
  /** A debug hook (the dropped hat's previews): a hit on her now, as a creature's would be (her last one knocks her out). */
  hit: () => { hitWitch(game, 0, game.clock.time); return !!game.witches[0].ko; },
  get manual() { return manual; }, set manual(on: boolean) { manual = on; },
  /** The bot game's bot and its tag (rules/bot.ts, ui/botGame.ts), null in a game of her own: tools drive it a frame at a time. */
  get bot() { return bot; }, get botTag() { return botTag; },
  /** A debug hook (tools/sfx/live.cjs): the audio context, the music and the sound effects. */
  get audio() { return { ctx: sound.audio, music: sound.music, sfx: sound.sfx, mends: sound.watchdog?.mends ?? [] }; },
  /** A debug hook for frame feel (tools/feel/trace.cjs): one frame as the real loop runs it (the
   *  fixed steps, the render eased between the last two, the camera's sub-pixel glide), then where
   *  things landed on screen, in screen pixels as drawn (the art-pixel snap and the canvas's shift):
   *  the witch, ground points (probes, metres) and creatures (ids). */
  frameLive: (c: Parameters<typeof stepGame>[1], dt: number, probes: { x: number; z: number }[] = [], ids: number[] = []) => {
    const t0 = game.clock.time;
    stepGame(game, c, dt);
    const steps = Math.round((game.clock.time - t0) / STEP), alpha = game.alpha, P = tuning.pixelSize;
    const v = new Vector3(), ndc = (x: number, y: number, z: number) => { placed(v.set(x, y, z)).project(view.camera); return v; };
    const snap = (n: Vector3) => [(Math.floor((n.x * 0.5 + 0.5) * view.width) + 0.5) * P, (Math.floor((-n.y * 0.5 + 0.5) * view.height) + 0.5) * P];
    let at: { witch: number[]; probes: number[][]; creatures: (number[] | null)[]; witchWorld: number[] } = { witch: [], probes: [], creatures: [], witchWorld: [] };
    interpolated(game, () => {
      view.render(Math.max(0, game.clock.time - (1 - game.alpha) * STEP * game.timeScale));
      const W = game.witch, B = view.witchBase;
      bendPoint(v.set(B.x, B.y, B.z)).project(view.camera);
      at = { witch: snap(v), witchWorld: [W.x, W.z], probes: probes.map(p => snap(ndc(p.x, 0, p.z))), creatures: ids.map(id => { const k = game.creatures[id]; return k ? snap(ndc(k.x, 0, k.z)) : null; }) };
    });
    applyShake();
    const P2 = tuning.pixelSize, gx = subpixelOn ? Math.round(view.subpixel.x * P2) : 0, gy = subpixelOn ? Math.round(view.subpixel.y * P2) : 0;
    const add = (q: number[] | null) => (q ? [q[0] + gx, q[1] + gy] : null);
    return { steps, alpha, gx, gy, time: game.clock.time, witch: add(at.witch), witchWorld: at.witchWorld, probes: at.probes.map(add), creatures: at.creatures.map(add) };
  },
  frame: (c: Parameters<typeof stepGame>[1], dt: number, draw = true) => { const t0 = performance.now(); stepGame(game, c, dt); const t1 = performance.now(); view.render(game.clock.time, draw); applyShake(); return { step: t1 - t0, render: performance.now() - t1, ms: view.ms }; }, areaUnderWitch: () => areaUnderWitch(game), areaTypeId: (i: number) => AREA_TYPES[i].id, lightUniforms: LIGHT_UNIFORMS, spriteUp: () => SPRITE_UNIFORMS.uUp.value, spriteRight: () => SPRITE_UNIFORMS.uRight.value, groundHeight, loadTimes, get ready() { return ready; } };
