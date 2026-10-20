// Starts the prototype: the seed from the URL, the game rules, the view, input, and the loop.
import { wavesOver } from "./rules/win";
import { chartOpen, chartWarmsNight, openChart, prepareChart, type Sailed } from "./ui/chartOverlay";
import { opensOnChart } from "./app/opening";
import { toggleCornerPanel, closeCornerPanel } from "./ui/cornerPanel";
import { carryTiming, clearCarried, mark, timingOn, transitionTiming, watchLongTasks } from "./app/timing";
import "./platform/tuningPreset"; // (first: ?tuning=pre-overnight writes the old balance over the config before anything reads it)
import { FrameStats } from "./platform/frameStats";
import { musicCue } from "./rules/musicPlan";
import { areaUnderWitch, interpolated, STEP, stepGame } from "./rules/game";
import { TUNING } from "./rules/tuning";
import { debugText, machineLines, precisionLines, reproLine, reproQuery, reproState, tuningDiff } from "./app/repro";
import { currentValue, DECISION_LIST, valuesText } from "./ui/decisions";
import { awaitingSpell } from "./rules/leypulse";
import { parseSeed } from "./rules/map";
import { Input } from "./platform/input";
import { View } from "./render/view";
import { CHANGELOG_VERSIONS } from "./changelog";
import { setupStartScreen, startOnGesture } from "./ui/startScreen";
import { AimHud } from "./render/aimhud";
import { UPCOMING } from "./ui/upcoming";
import { StallLog } from "./platform/stallLog";
import { Freeze } from "./platform/freeze";
import { Creator, loadGenome } from "./ui/creator";
import { BOT_KINDS, type BotKind } from "./rules/botKinds";
import type { Bot } from "./rules/bot";
import type { BotTag } from "./ui/botGame";
import { pleasingWitch } from "./ui/looks";
import type { DecidePanel } from "./ui/decide";
import { saveLoadout } from "./app/loadout";
import { castable } from "./rules/spells";
import { changeLoadout, newHatFromRoom } from "./rules/hatSpells";
import { HOUSE_ROOMS } from "./rules/houseRooms";
import { ZooOverlay, domZooHost, zooUrl } from "./app/zooOverlay";
import { loadSave, nightOver, sailNight, storeSave } from "./app/chartSave";
import { warmChart } from "./app/chartWarm";
import { powerLines } from "./app/hud";
import { NewBuildNotice } from "./app/newBuild";
import { SPRITE_UNIFORMS } from "./render/sprites";
import { setupKnobs } from "./app/knobs";
import { Sound } from "./app/sound";
import { OutputMeter } from "./platform/audio/outputMeter";
import { gameStyle, styleFromLink, viewFromLink } from "./app/viewParams";
import { setupDebugKeys } from "./app/keys";
import { ScreenShake } from "./app/shake";
import { playerPick as makePlayerPick } from "./app/playerPick";
import { installHooks } from "./app/hooks";
import { PerfHud } from "./app/perfHud";
import { keepAtlasPixels } from "./render/atlas";
import { installPixelUi } from "./ui/pixelUi";
import { debugBlows } from "./rules/alarms";
import { wonText } from "./app/wonCard";
import { SHED_STEPS } from "./platform/audio/shed";
import { prepUsed } from "./app/mapPrep";
import { endNight, startNight, wearHat as wear, type Night, type NightSpec, type Page } from "./app/night";
import { BackGuard, nightFromHref, nightHref, sailHref, sailOrReload, sailParams, sailWay, type NightWay } from "./app/sail";
import { hudFade, showStill } from "./app/arrive";
import { forgetArrival, type Arrival } from "./app/arrival";
import type { FlightEnd } from "./render/chart/seaChart";

performance.mark("witch:main"); // (the load's steps, for timing the arrival: witch:main, :game, :view, :ready; app/arrive.ts :landed)
const params = new URLSearchParams(location.search);
/** The link as it came (before the boot puts its own ?seed= in): whether this load opens on the sea chart (app/opening.ts). */
const bootLink = new URLSearchParams(location.search);
// ?timing=1 (Ed, 2026-10-19): the sail's steps and the main thread's long tasks into the L log (app/timing.ts), kept for the tab.
const TIMING = timingOn(params);
if (TIMING) watchLongTasks();
/** The transition so far into the L log (?timing=1). */
const logTiming = (): void => { if (TIMING) N().playtest.timing(transitionTiming()); };
// The zoo (?zoo; rules/zoo.ts): straight in, as ?creator=0 (no bedroom, no party spell), unless the link says otherwise.
if (params.has("zoo") && !params.has("creator")) params.set("creator", "0");
// (its controls, src/zoo/panel.ts, loaded only for it, once the game is made)
let zooPanel: import("./zoo/panel").ZooPanel | null = null;
let bootSeed = parseSeed(params.get("seed"));
if (bootSeed === null) {
  bootSeed = Math.floor(Math.random() * 1000000);
  params.set("seed", String(bootSeed));
  history.replaceState(null, "", "?" + params.toString() + location.hash);
}

declare const __BUILD__: string;
const BUILD = typeof __BUILD__ === "string" ? __BUILD__ : "dev";
// Her look (the character creator's, kept on this browser; else the classic witch).
const savedLook = loadGenome();
let lookNow = JSON.stringify(savedLook);
// The page and the night (app/night.ts; docs/plans/sail-without-reload.md B): the page made once, the night (its link, tuning,
// game, playtest run, HUD, arrival and flags) held in `page.night`, read there by everything that needs it, never captured.
const page: Page = { night: null, build: BUILD, look: () => (lookNow ? JSON.parse(lookNow) : savedLook) };
/** The night on now (while the next is made after a sail in place, the one just ended: app/night.ts endNight). */
const N = (): Night => (page.night ?? page.last)!;
/** The next night being made in place (a sail, another way to a new night, or ?debug=sail's swap): the frame loop holds still. (Up
 *  here: the bedroom's progress reads it from the boot on.) */
let sailing = false;
// The boot's night: the link's tuning, the game, the link's switches, her hat, the playtest run, the knobs' start, the HUD.
await startNight(page, { how: "boot", island: params.get("island") ?? "", seed: bootSeed, world: params.has("world") ? Number(params.get("world")) : undefined, params });
const { tuning: bootTuning } = N();
// The new opening (app/opening.ts; Ed, 2026-10-20): a plain first load opens on the sea chart over the boot's night (home's, made
// and its art drawn under the chart), in place of the bedroom; off by default till the whole opening is in (?opening=chart).
const onChart = opensOnChart(bootLink, bootTuning);
if (N().game.map.zoo) void import("./zoo/panel").then(({ ZooPanel }) => { zooPanel = new ZooPanel(N().game); });
// The settings as built (the tuning file's), for the debug overlay's and the playtest log's list of what's changed (app/repro.ts).
const BUILT = JSON.parse(JSON.stringify(TUNING)) as object;
const canvas = document.getElementById("game") as HTMLCanvasElement;
// The art is drawn for the pixel size the game renders at (the tuning file's), not the Lab's.
const style = styleFromLink(params, bootTuning); // (app/viewParams.ts)
/** Load timings (ms since the page started): the view built (the page's own sprites drawn), ready to play. */
const loadTimes = { viewStart: performance.now(), view: 0, ready: 0, mapPrep: prepUsed === "worker" ? 1 : prepUsed === "stale" ? -1 : 0 }; // (mapPrep: the map made from the worker's prep, 1; one there for another night, -1)
/** Her hat on or not by her look (app/night.ts). */
const wearHat = (g: unknown) => wear(N().game, g);
const view = page.view = new View(canvas, N().game, gameStyle(style, bootTuning), savedLook);
loadTimes.view = performance.now();
performance.mark("witch:view");
viewFromLink(view, params); // (app/viewParams.ts)
void installPixelUi(); // (the pixel font, for the HUD's edge cues' labels too: render/indicator.ts)
const ATTACK_DEBUG = params.get("debug") === "attack";
if (params.get("pixels") === "keep") keepAtlasPixels(true); // (the atlases keep their pixels on the page: the smoke test's floating check reads them)
const input = new Input();
input.aimFrom = (x, y) => view.aimAt(x, y);
const aimHud = new AimHud(canvas); // the reticle where the mouse aims: 💌 range and the dodge's recharge
setupDebugKeys(view, input, params); // (app/keys.ts)
// The playtest log (Ed, 2026-10-04): a sample every 10 s of play, kept on this browser, a run a night (app/night.ts); L, or
// opening the game with ?playtest=download, saves the last few runs as JSON.
window.addEventListener("keydown", e => { if (e.code === "KeyL" && !e.repeat) N().playtest.download(); });
if (params.get("playtest") === "download") setTimeout(() => N().playtest.download(), 500);

// The debug knobs: the fight's scale, speed and momentum, the treetop speed (app/knobs.ts): their keys, and their live setters
// for the pause page's sliders and the decisions panel (by the link's param); their start is the night's.
const knobLive = setupKnobs(N);

// Auto-talk (Ed's playtest, 2026-10-04: a new player wanted to turn it off): T, or a click
// on its slot, turns it on or off (remembered on this browser); off, she talks while Shift is held.
let autoTalk = true;
try { if (localStorage.getItem("witch.autotalk") === "off") autoTalk = false; } catch { /* storage blocked: on */ }
const setAutoTalk = (on: boolean) => {
  autoTalk = on;
  try { localStorage.setItem("witch.autotalk", on ? "on" : "off"); } catch { /* fine */ }
};

document.getElementById("version")!.textContent = typeof __BUILD__ === "string" ? __BUILD__ : "dev";
// The start screen, full screen: What's new in this build (config/changelog/) and what's coming up
// (the open pull requests, listed at deploy time), the controls below (src/ui/startScreen.ts).
declare const __BUILD_DATE__: string;
setupStartScreen({
  el: document.getElementById("start")!, build: typeof __BUILD__ === "string" ? __BUILD__.split(" ")[0] : "dev",
  builtOn: typeof __BUILD_DATE__ === "string" ? __BUILD_DATE__ : new Date().toISOString().slice(0, 10), versions: CHANGELOG_VERSIONS, upcoming: UPCOMING,
});
const seedEl = document.getElementById("seed")!;
seedEl.innerHTML = `seed <a href="?seed=${N().seed}">${N().seed}</a>`;
const startEl = document.getElementById("start")!;
/** The party spell (Ed, 2026-10-06): cast by the creator's scroll (ui/spellScroll.ts), its burst starting play; without the
 *  creator (?creator=0&spell=wait), Enter (once play has begun, so the start screen's Enter isn't it) or her spell key casts it
 *  on the next step. */
// Wanted until it's cast (Ed's v3668, stuck at the decks: a press dropped on a frame too short for a step, or a start that found the
// game frozen, left her held with no spell): pressed on every frame the clock runs, till the rules have it.
// (the night's flags.castWanted)
const queueCast = () => { const n = N(); if (awaitingSpell(n.game.party)) n.flags.castWanted = true; };
window.addEventListener("keydown", e => { if (e.code === "Enter" && N().game.clock.time > 0.3 && !creator.open && !chartOpen()) queueCast(); }); // (Enter on the chart sails)
// (the clock, its pops and the debug overlay: the night's HUD, app/hud.ts)

const fit = () => view.resize(window.innerWidth, window.innerHeight);
window.addEventListener("resize", fit);
fit();

// Make the art and ground round the start before the first frame, behind the start screen (the night's flags.ready).
// The start screen's progress bar: the sets of sprites drawn so far. Play can start once what the
// start needs is ready; the rest is drawn in the background (nearest areas first).
const progressEl = document.getElementById("progress")!, progressFill = progressEl.querySelector<HTMLElement>(".fill")!, progressLabel = progressEl.querySelector<HTMLElement>(".label")!;
const showProgress = setInterval(() => {
  const a = view.assets, done = a.done, total = done + a.pending;
  progressFill.style.width = `${total ? (100 * done) / total : 0}%`;
  const ready = N().flags.ready;
  progressLabel.textContent = ready ? `the rest of the forest, in the background: ${done} of ${total}` : `growing the forest: ${done} of ${total}`;
  if (ready && !a.pending) { progressEl.classList.add("done"); clearInterval(showProgress); }
}, 250);
// The sea chart made ahead (app/chartWarm.ts; Ed, 2026-10-12: "can we do it earlier, before we need to show it?"): once the
// forest has grown and the tab is in view, a worker makes and keeps the chart's islands, so the map table opens on them at once.
// Not under automation (the smoke and bench runs time the game's own frames), unless ?warmChart=1.
const chartWorld = () => (params.has("world") ? N().tuning.map?.world ?? 0 : loadSave().world);
const warmOn = params.get("warmChart") === "1" || (params.get("warmChart") !== "0" && !navigator.webdriver);
const warmWhenSettled = warmOn ? setInterval(() => {
  if (!N().flags.ready || view.assets.pending || document.hidden || chartOpen()) return;
  clearInterval(warmWhenSettled);
  const t0 = performance.now(), log = params.get("warmChart") === "1"; // (?warmChart=1: each island logged, for timing it)
  if (log) console.info("sea chart: making ahead");
  warmChart(chartWorld(), loadSave().found, (made, kept) => console.info(`sea chart made ahead: ${made} islands made, ${kept} already kept, ${((performance.now() - t0) / 1000).toFixed(1)} s`), log ? (id, made) => console.info(`sea chart: ${id} ${made ? "made" : "kept"} at ${((performance.now() - t0) / 1000).toFixed(1)} s`) : undefined);
}, 3000) : 0;
requestAnimationFrame(() => setTimeout(async () => {
  await view.prepare();
  const night = N();
  night.flags.ready = true;
  // The sea chart's renderer and shaders made ahead, while the start screen shows (ui/chartOverlay.ts prepareChart): E at the map
  // table then opens it without seconds of waiting. Not under automation (the smoke and bench runs), unless ?prepChart=1.
  if (params.get("prepChart") === "1" || (params.get("prepChart") !== "0" && !navigator.webdriver)) setTimeout(() => void prepareChart().catch(e => console.warn("sea chart: not made ahead", e)), 300);
  loadTimes.ready = performance.now();
  performance.mark("witch:ready");
  startEl.classList.remove("loading");
  if (bot) start(); // (a bot game starts itself as soon as it can)
  night.arrival?.begin(night.game); // (the camera takes over from the chart's still)
}, 0));

// The sound: the volume slider in the corner, then the context, music and sound effects at the first press (app/sound.ts).
const sound = page.sound = new Sound(bootTuning, N().musicStyle, N().seed);
sound.leyLink = () => view.ley.currentLink(); // (the pulse's fizz heard where the line is drawn)
// The freeze (Esc, gamepad Start, the ❚❚ button): a true still for screenshots, . steps (platform/freeze.ts).
const freeze = page.freeze = new Freeze(N().game, N().seed, BUILD);
freeze.started = () => startEl.style.display === "none" || creator.open; // (in the bedroom too: Ed, 2026-10-14, "Can we pause from the bedroom?")

// Arriving from the sea chart (?arrive=1; the night's arrival, app/night.ts): the chart's last frame while the night builds, then
// the flight from the chart's camera to her decks; no bedroom. Any key or tap skips to the decks; the night starts (the party
// spell cast) as it lands, and if no key or tap has come by then (browsers keep sound off till one does) a small note asks for one.
const bootArrival = N().arrival;
// (Ed, 2026-10-12: the HUD hidden through the flight, fading in as she settles at her decks)
const HUD_IDS = ["clock", "seed", "version", "buffs", "aim", "touch", "bubbles", "invites"];
if (bootArrival) {
  hudFade(HUD_IDS); // (app/arrive.ts)
  document.body.classList.add("arriving");
}
let gestured = false;
const soundNote = () => {
  const el = document.createElement("div");
  el.id = "sound-note"; el.textContent = "🔊 press any key for sound";
  el.style.cssText = "position:fixed;left:50%;bottom:72px;transform:translateX(-50%);z-index:30;font:13px ui-monospace,monospace;color:#e8e2f4;background:rgba(10,9,22,.7);border:1px solid #3a2f5c;border-radius:6px;padding:6px 12px;pointer-events:none";
  document.body.append(el);
  const go = () => { sound.wake(); el.remove(); removeEventListener("keydown", go); removeEventListener("pointerdown", go); };
  addEventListener("keydown", go); addEventListener("pointerdown", go);
};
/** Any key or tap skips an arrival's flight (once a page: the boot's arrival, or the first sail in place). */
let skipArmed = false;
const armSkip = () => {
  if (skipArmed) return;
  skipArmed = true;
  for (const ev of ["keydown", "pointerdown"]) addEventListener(ev, () => { gestured = true; const a = N().arrival; if (a && !a.done) a.skip(); }, { capture: true });
};
if (bootArrival) armSkip();
/** The swap point (the transition review, 2026-10-19; Ed: "revisits can draw instantly then redraw during the bedroom sequence"):
 *  the island's trees were drawn at once from what's kept (its own seed, render/artCache.ts islandArtSeed); here, the last moment
 *  she can't see them change (the landing still about to fade; else play starting from behind the bedroom), tonight's own (drawn
 *  ahead by the chart, app/landingBake.ts) take their place where they're ready, and the rest stay the island's all night (never
 *  swapped in play). The one hook: the wake-up sequence takes it over when it comes. */
function revealArt(): void {
  const F = N().flags;
  if (F.artRevealed) return;
  F.artRevealed = true;
  const swapped = view.assets.swapTonight();
  if (swapped.length) view.retype(swapped);
  mark("game:reveal");
}
if (bootArrival) bootArrival.onReveal = revealArt;
/** It's landed at her decks: the night starts, the party spell cast, as the bedroom's scroll would. */
function arrived(): void {
  logTiming(); clearCarried(); // (?timing=1: the whole sail, from the chart to her decks)
  N().flags.landed = true;
  document.body.classList.remove("arriving"); // (the HUD fades in)
  sound.sailing(0); // (sailed in place: the sea and the wind fade as the night's start comes in)
  if (start()) queueCast();
  if (!gestured) soundNote(); else sound.wake();
}

// The character creator (Ed, 2026-10-05; "dressing up" to the player, the house's Bedroom being the room with the bed): at every
// load but a sail's arrival (&arrive=1 lands at her decks), from the hidden start card's button, and mid-night from the treehouse's
// stations (below); ?creator=0 skips it (tests, the smoke run), and loading is the start screen's as before.
// It's also the loading screen (Ed, 2026-10-05): it opens at once and the forest grows behind it;
// Start waits ("getting ready") until play can begin.
const creator = new Creator(style, savedLook, bootTuning.pixelSize);
creator.version = typeof __BUILD__ === "string" ? __BUILD__.split(" ")[0] : "dev"; // (its version, top left: Ed, 2026-10-13)
(window as unknown as { __creator: Creator }).__creator = creator; // (the creator's smoke scripts read her place in the room)
// Her hat and broom spells (rules/spells.ts, app/loadout.ts): the creator's Hat and Broom boxes choose them, kept on this browser.
creator.loadout = { hat: N().game.spells.hat, broom: N().game.spells.broom };
creator.onLoadout = l => { const { game } = N(); changeLoadout(game.witches[0], l.hat, l.broom); saveLoadout({ hat: game.spells.hat, broom: game.spells.broom }); wearHat(page.look()); }; // (a hat swapped while hers lies elsewhere leaves that one lying: rules/hatSpells.ts)
// Her room mid-night from the treehouse's rooms (rules/houseRooms.ts; Ed, 2026-10-19): E at a dressing station, the bags or the broom
// stand opens it at only that station's choices (config/house.json), the world running on at the house's tenth; its way out brings
// her back where she stood, in her new look and broom: any hat lying about staying where it lies (Ed, 2026-10-12). They are the only
// ways in mid-night (Ed: the Bedroom button and F are gone). The bestiary's book opens the zoo over the night, paused under it,
// and closing it goes back to the night where she was; the bed, E held, ends the night as the afterparty's "A new forest" does.
creator.onExit = g => { newHatFromRoom(N().game.witches[0]); if (JSON.stringify(g) !== lookNow) { lookNow = JSON.stringify(g); view.setWitch(g); wearHat(g); } input.clearPresses(); };
let zooPaused = false;
const zoo = new ZooOverlay(domZooHost(on => { const { clock } = N().game; if (on) { zooPaused = clock.paused; clock.paused = true; } else clock.paused = zooPaused; input.clearPresses(); }), zooUrl(location.href));
const useHouse = (obj: string): void => {
  const { game, tuning, flags: { chartRecorded, overShown } } = N();
  if (obj === "slept") { if (!chartRecorded && !overShown) nightOver(tuning.map?.island ?? "", { won: false }, undefined, tuning.map?.world ?? 0); setTimeout(() => newNight("bed"), 0); return; } // (the sea chart: played, as the afterparty records it; and a new forest, as its button: app/newForest.ts; after this frame, in place)
  const o = HOUSE_ROOMS.objects.find(q => q.id === obj);
  if (!o || creator.open || game.witches[0].ko) return;
  if (o.use.kind === "creator") { creator.loadout = { hat: game.spells.hat, broom: game.spells.broom }; creator.visit(o.use); }
  else if (o.use.kind === "zoo") zoo.open();
};
creator.progress = () => { const a = view.assets; return { done: a.done, total: a.done + a.pending, ready: !sailing && N().flags.ready }; }; // (a new night in place: not till it's made)
// (its room's ambience plays while it's open: overnight, 2026-10-06)
creator.onGesture = () => sound.wake();
creator.onStart = g => {
  const who = playerPick?.value ?? "human"; // (the dev "Player:" pick: a bot plays the run instead of her)
  if (who !== "human" && BOT_KINDS.includes(who as BotKind)) { botGame(who as BotKind); return; }
  if (JSON.stringify(g) !== lookNow) { lookNow = JSON.stringify(g); view.setWitch(g); wearHat(g); }
  if (start()) queueCast();
}; // (the scroll's burst: play, and the spell cast)
creator.spellSound = (cue, v) => sound.sfx?.spell(cue, v);
// The bot game (Ed, 2026-10-06: "start the game and watch the skilled bot play"; ?bot=skilled|crude, or the start
// screen's Bot game): rules/bot.ts plays in place of her controls, a seeded witch, no character creation. The bot's code loads
// only for a bot game (overnight phase 2: out of the game's bundle); it starts as soon as both it and the forest are ready.
const botParam = params.get("bot") as BotKind | null;
let bot: Bot | null = null, botTag: BotTag | null = null, botKind: BotKind | null = null;
function botGame(kind: BotKind): void {
  if (botKind) return;
  botKind = kind;
  const look = pleasingWitch(N().seed);
  lookNow = JSON.stringify(look); view.setWitch(look); wearHat(look);
  if (creator.open) creator.hide();
  void Promise.all([import("./rules/bot"), import("./ui/botGame")]).then(([{ BOT_GAME, newBot }, { BotTag }]) => {
    bot = newBot(kind, BOT_GAME[kind]); // (the skilled one questing, bringing relics and feeding: rules/bot.ts BOT_GAME)
    botTag = new BotTag(kind, () => newNight("bot")); // (back to the start: a night in place on this link without ?bot)
    if (N().flags.ready) start(); // (else the forest's ready starts it)
  });
}
if (botParam && BOT_KINDS.includes(botParam)) botGame(botParam);
else if (params.get("creator") !== "0" && !bootArrival && !onChart) creator.show();
const lookBtn = document.getElementById("look-btn");
if (lookBtn) {
  for (const ev of ["pointerdown", "pointerup", "click", "touchstart"]) lookBtn.addEventListener(ev, e => e.stopPropagation()); // (not a start)
  lookBtn.addEventListener("click", () => { if (N().flags.ready && N().game.clock.paused) creator.show(); });
}
// (the bedroom has the dev "Player:" pick above in place of a Bot game button)
// The dev "Player:" pick (app/playerPick.ts), shown with the debug overlay only.
const playerPick = makePlayerPick(params, creator);
const botBtn = document.getElementById("bot-btn");
if (botBtn) {
  for (const ev of ["pointerdown", "pointerup", "click", "touchstart"]) botBtn.addEventListener(ev, e => e.stopPropagation()); // (not a start of her own)
  botBtn.addEventListener("click", () => { if (!N().game.clock.paused) return; botGame("skilled"); }); // (it starts as soon as it and the forest are ready)
}
function start(): boolean {
  if (sailing) return false; // (the next night being made in place)
  const { game, flags, arrival } = N();
  if (!flags.ready || !game.clock.paused || freeze.frozen) return false;
  if (creator.open) return true;
  sound.start(); // (browsers keep sound off until the player presses something: the start is that press)
  if (!arrival) revealArt(); // (play starting from behind the bedroom or the start screen: the island not seen till now)
  game.clock.paused = false;
  startEl.style.display = "none";
  input.clearPresses();
  return true;
}
input.onAny = () => (chartWarmsNight() || (N().arrival && !N().flags.landed) ? true : start()); // (the first load's chart up: its keys are the chart's, the night under it not started; arriving: a key skips the flight, app/arrive.ts; the landing starts it)
// The audio watchdog (app/sound.ts).
sound.watch(() => !N().game.clock.paused && !freeze.frozen && !document.hidden, () => N().game.speakerBoot.some(t => t !== null), () => N().playtest);
// The pause page's test sliders (Ed, 2026-10-12; ui/decide.ts PauseSliders): down the left while frozen, the freeze quiet (no card
// of its own: nothing else over the game), its stamp at their foot. Their code loads on the first freeze.
let pauseSliders: import("./ui/decide").PauseSliders | null = null, pauseLoading = false;
// The Music Lab panel (Ed, 2026-10-15, from Kilo's mock; ui/musicLabPanel.ts, app/musicLab.ts): the pause page's 🎛 button opens
// it down the right edge; Esc resumes with it up, so changes are heard in play; ✕ closes it. Its code loads on the first open.
let musicLabPanel: import("./ui/musicLabPanel").MusicLabPanel | null = null, musicLabLoading = false;
const openMusicLab = () => {
  if (musicLabPanel) { musicLabPanel.show(true); return; }
  if (musicLabLoading) return;
  musicLabLoading = true;
  void Promise.all([import("./ui/musicLabPanel"), import("./app/musicLab")]).then(([{ MusicLabPanel }, { MusicLab }]) => {
    const lab = sound.lab ?? (sound.lab = new MusicLab(N().musicStyle));
    musicLabPanel = new MusicLabPanel({ lab, sound, game: () => N().game, nextWave: () => { input.touch.nextWave = true; }, noNight: () => !N().game.speakerBoot.some(t => t !== null) });
    musicLabPanel.show(true);
  }, () => { musicLabLoading = false; window.alert("The Music Lab's code couldn't load (a newer build may be up: reload the page)."); });
};
freeze.quiet = true;
freeze.onStamp = text => pauseSliders?.setStamp(text);
// "A newer version is out" (Ed, 2026-10-14; app/newBuild.ts): read version.json on load, on pausing and every few minutes; shown in the
// bedroom and on the pause page, and when a menu's code has been replaced under it.
const newBuild = new NewBuildNotice(BUILD, document.getElementById("new-build"));
let menuGone = false;
freeze.onToggle = on => {
  sound.freeze(on);
  musicLabPanel?.frozen(on);
  creator.frozen = on; // (paused in her room: its keys and clicks wait, Esc resumes; the sliders backed over its panel)
  if (on) void newBuild.check();
  if (pauseSliders) { pauseSliders.show(on, creator.open); return; }
  if (!on || pauseLoading) return;
  pauseLoading = true;
  void import("./ui/decide").then(({ PauseSliders }) => {
    const report = () => import("./ui/visualReport").then(({ report }) => report(reportHost()));
    pauseSliders = new PauseSliders({ get tuning() { return N().game.tuning; }, get seed() { return N().game.seed; }, version: BUILD, live: knobLive, report, musicLab: openMusicLab });
    requestAnimationFrame(() => pauseSliders!.show(freeze.frozen, creator.open)); // (a frame shut first, so it slides in)
  }, () => { // (its files replaced under it: Ed, 2026-10-14, "the menu does not appear")
    pauseLoading = false;
    void newBuild.check().then(() => { if (newBuild.latest) menuGone = true; else window.alert("A newer build of the game is up, so the pause page can't load: reload the page (Shift+Reload)."); });
  });

};
startOnGesture(startEl, start); // a click or a tap starts; a touch that drags scrolls the text
// Screen shake when she's hit, and the camera's sub-pixel glide (app/shake.ts).
const shake = page.shake = new ScreenShake(N().game, bootTuning, view, canvas, params), shakeEl = shake.option;
// No start card before her room (Ed, 2026-10-06: "There is something before the bedroom… can we skip it and go straight to
// the bedroom?"): with the character creator the page opens straight into it, and the card's contents live in its tabs
// (❔ Controls, also the ? key; 📜 What's new; ⚙ Options: the screen shake; the waves' pace is the top right's dropdown). The card itself shows only for a
// run without the creator (?creator=0: the tools and smoke runs, "press any key") or a bot game while the forest grows.
/** The creator's tabs and its Zoo button, once a page (at the boot, or a night in place that opens the bedroom after a load that didn't). */
let dressed = false;
function dressCreator(): void {
  if (dressed) return;
  dressed = true;
  const keys = startEl.querySelector<HTMLElement>(".keys"), news = startEl.querySelector<HTMLElement>(".ss-body");
  if (keys) creator.addTab("controls", "❔ Controls", [keys]);
  if (news) creator.addTab("news", "📜 What's new", [news]);
  if (shakeEl) creator.addTab("options", "⚙ Options", [shakeEl]);
  // The zoo (Ed, 2026-10-13: ?zoo, "plus a Zoo button"): every creature in its own block, out of a run.
  creator.addButton("Zoo", () => { const u = new URL(location.href); u.searchParams.set("zoo", "1"); location.href = u.toString(); });
}
if (bootArrival) { /* (no card, no bedroom: the still, then the flight) */ } else if (onChart && !botKind) openingChart();
else if (params.get("creator") !== "0" && !botKind) dressCreator();
else startEl.style.display = "";
// Ed's decisions panel (src/ui/decide.ts, config/decisions.json): ?decide opens it, F2 opens and closes it. Its code loads
// only then (overnight phase 2: out of the game's bundle); its knobs' choices in the link are put on as the game starts
// (ui/decisions.ts, app/linkParams.ts).
let decide: DecidePanel | null = null, decideLoading = false;
const decidePanel = (open: boolean) => {
  if (decide || decideLoading) return;
  decideLoading = true;
  void import("./ui/decide").then(({ DecidePanel }) => { decide = new DecidePanel({ get tuning() { return N().game.tuning; }, get seed() { return N().game.seed; }, version: BUILD, live: knobLive }, open); });
};
if (params.has("decide")) decidePanel(true);
window.addEventListener("keydown", e => { if (e.code !== "F2") return; e.preventDefault(); if (decide) decide.toggle(); else decidePanel(true); });
document.addEventListener("visibilitychange", () => { if (document.hidden) N().flags.last = 0; });

let lastDraw = 0;
const frameStats = new FrameStats(view.renderer.getContext());
// ?perf=1: the performance panel (app/perfHud.ts), always on.
const perfHud = page.perfHud = params.get("perf") === "1" ? new PerfHud(N().game, view, frameStats) : null;
// Frames of 100 ms or more, with what they spent it on (Ed, 2026-10-06: occasional half-second freezes): the overlay and the playtest log.
const stallLog = new StallLog();
// (the playtest log's hooks read the night on now, so they carry to the next night's run as they are: app/night.ts)
N().playtest.stalls = () => stallLog.stalls;
// What a builder needs from a screenshot of the overlay (Ed, 2026-10-14; app/repro.ts): the link that rebuilds what she saw, the
// machine, and every setting changed from the build's; the same in the playtest log (L).
const repro = (() => {
  let machine: string[] | null = null, diff: [string, unknown][] = [], at = -Infinity;
  const changed = () => { const now = performance.now(); if (now - at > 1000) { at = now; diff = tuningDiff(N().tuning, BUILT); } return diff; };
  const link = () => location.origin + location.pathname + reproQuery(reproState(N().game, changed()), N().params);
  const gl = () => view.renderer.getContext();
  const mach = () => (machine ??= (() => { try { return [...machineLines(gl(), canvas, N().tuning.pixelSize), ...precisionLines(gl())]; } catch { return ["gpu    (unknown)"]; } })());
  const targets = () => { const z = view.post.sizes(), c = SPRITE_UNIFORMS.uCutout.value, d = { x: gl().drawingBufferWidth, y: gl().drawingBufferHeight }, f = (a: [number, number]) => a.join("×");
    return [`rt     scene ${f(z.scene)}  effects ${f(z.fx)}  bloom ${f(z.bloom)}  out ${f(z.out)}  drawing buffer ${d.x}×${d.y}`, `hole   canopy cut-away at ${c.x.toFixed(0)}, ${c.y.toFixed(0)} px  radius ${c.z.toFixed(1)} px  edge ${c.w.toFixed(1)} px`]; };
  /** All of it, for the button and the log: the link, the machine, the targets, the overlay's lines, every setting changed and every test slider. */
  const full = () => debugText(`Witch debug info · ${BUILD} · seed ${N().seed} · ${new Date().toISOString()}`, [
    ["Link", [link()]],
    ["Machine", [...mach(), ...targets()]],
    ["Overlay", [...overlayHead(), ...powerLines(N().game)]],
    ["Settings changed from the build's", changed().map(([p, v]) => `${p} = ${JSON.stringify(v)}`)],
    ["Test sliders (the pause page)", valuesText(new Map(DECISION_LIST.map(d => [d.id, currentValue(d, N().tuning, N().params)])), "", N().seed).split("\n").slice(1)],
  ]);
  return { link, machine: mach, changed, full, line: () => reproLine(reproState(N().game, changed()), changed().length) };
})();
document.getElementById("copy-debug")?.addEventListener("click", e => {
  const b = e.currentTarget as HTMLButtonElement, text = repro.full();
  void navigator.clipboard?.writeText(text).then(() => { b.textContent = "copied"; }, () => { b.textContent = "copy failed: see console"; console.log(text); }).finally(() => setTimeout(() => { b.textContent = "copy debug info"; }, 1500));
});
N().playtest.debugInfo = () => ({ link: repro.link(), machine: repro.machine().map(l => l.slice(7)), changed: Object.fromEntries(repro.changed()) });
N().playtest.debugText = () => repro.full();
// The pause page's Report (ui/visualReport.ts): the frame drawn with each neutral pair, where they differ, the GPU, her place, the
// camera and the repro link. window.__neutralCheck: the same pairs' numbers for the smoke test (tools/smoke/smoke.cjs "neutral").
const reportHost = () => {
  const { game } = N(), version = BUILD, w = game.witch, c = game.camera;
  return {
    canvas, gl: view.renderer.getContext(), tuning: game.tuning, seed: game.seed, version, link: repro.link, changed: repro.changed,
    witch: (): [number, number] | null => { const u = SPRITE_UNIFORMS.uWitch.value, low = view.post.lowSize; return low.x > 0 ? [u.x * canvas.width / low.x, (low.y - u.y) * canvas.height / low.y] : null; },
    world: () => ({ x: w.x, z: w.z, mode: w.mode, lift: w.lift, area: game.map.areaAt(w.x, w.z).type, camera: { zoomStep: c.zoomStep, zoom: c.zoom, tx: c.tx, ty: c.ty, tz: c.tz } }),
  };
};
(window as unknown as { __neutralCheck: () => Promise<unknown> }).__neutralCheck = () => import("./ui/visualReport").then(({ neutralCheck }) => neutralCheck(reportHost()));
N().playtest.viewState = () => { const { game } = N(), w = game.witch; return { x: Math.round(w.x), z: Math.round(w.z), mode: w.mode, area: areaUnderWitch(game), zoom: game.camera.zoomStep, timeScale: Math.round((game.timeScale ?? 1) * 100) / 100 }; };
// The measured output (Ed, round 16: "Is there a way for the game to know if anything is being sent to the speakers or not?";
// platform/audio/outputMeter.ts): what leaves the game for the speakers, read a few times a second; silence while the music
// should be heard goes in the playtest log (L) with where she was and the nearest stall. ?micCheck=1 (debug only) also
// listens to the microphone for dropouts after the game. It measures what the game sends: not the device's volume.
const meter = new OutputMeter();
const nearestStall = (pageS: number): { off: number; ms: number } | undefined => {
  let best: { off: number; ms: number } | undefined;
  for (const st of stallLog.stalls) { const off = Math.round((st.at - pageS) * 10) / 10; if (!best || Math.abs(off) < Math.abs(best.off)) best = { off, ms: Math.max(st.gap, st.work) }; }
  return best;
};
meter.onSilence = e => {
  const { game, playtest } = N(), w = game.witch, ago = performance.now() / 1000 - e.start;
  const r2 = (x: number) => Math.round(x * 100) / 100, { lastMix, music, audio } = sound;
  playtest.silence({ cause: meter.reading.clock >= 0.9 ? "game" : "clock", t: Math.round((game.clock.time - ago) * 10) / 10, dur: Math.round(e.dur * 100) / 100, x: Math.round(w.x), z: Math.round(w.z), area: areaUnderWitch(game), mode: w.mode, mix: r2(lastMix?.volume ?? 0), gain: music ? r2((music.output as GainNode).gain.value) : 0, state: audio?.state ?? "none", clock: meter.reading.clock, back: e.db, stall: nearestStall(e.start) });
  console.warn(`audio: the output silent for ${e.dur.toFixed(2)} s while the music should be heard`);
};
// each playtest sample's audio carries the clock's account too: under-runs, coarse clock steps or a true clock
{
  const log = N().playtest, own = log.audioState, cw = meter.clockWatch;
  log.audioState = () => ({ ...(own?.() ?? { state: "none", volume: 0, distort: 0, distance: 0, mends: 0 }), clock: { slow: cw.slow, fast: cw.fast, drift: cw.drift, played: cw.outDrift, underruns: cw.underruns, underrunMs: cw.underrunMs, verdict: cw.verdict() } });
}
// each sample's frames too (Ed's overlay, 2026-10-13: a GPU-bound night; the L log shows which it was)
N().playtest.frameState = () => {
  const r = frameStats.recent(), pct = (a: number[], p: number) => { if (!a.length) return null; const s = [...a].sort((x, y) => x - y); return Math.round(s[Math.min(s.length - 1, Math.floor(p * s.length))] * 10) / 10; };
  const S = view.stats, { game } = N(), w = game.witch;
  return { ms: pct(r.frames, 0.5) ?? 0, p95: pct(r.frames, 0.95) ?? 0, cpu: pct(r.cpu, 0.5) ?? 0, cpu95: pct(r.cpu, 0.95) ?? 0, gpu: pct(r.gpu, 0.5), gpu95: pct(r.gpu, 0.95), over20: r.frames.length ? Math.round((100 * r.frames.filter(x => x > 20).length) / r.frames.length) : 0, draws: S.drawCalls ?? 0, trees: S.trees, bushes: S.bushes, creatures: S.creatures, mode: w.mode, zoom: game.camera.zoomStep };
};
const micWanted = params.get("micCheck") === "1";
let chartHeld = false, chartWasPaused = false; // (the sea chart open: the night held behind it)
let lastShedS = -1; // (the sound's safety valve, checked once a second: platform/audio/shed.ts)
const SLOW_AUDIO = 150; let slowAudioLogged = 0; // (ms: a frame's audio work worth a line in the playtest log)
/** Driven from outside (the perf check, tools/smoke): the loop below stands still, and
 *  window.witch.frame steps and draws one frame of a fixed length instead. */
const loop = { manual: false, get bot() { return bot; }, get botTag() { return botTag; }, get ready() { return N().flags.ready; } };
const spellButton = document.getElementById("spell");
document.getElementById("won-close")?.addEventListener("click", () => document.getElementById("won")!.classList.remove("on"));
/** The cards' Sea chart (Ed, 2026-10-11: after a loss, replay the island or pick another) and Sail on (its islands found now lit):
 *  the map table's chart over the game, so its sail is in place (the plan's PR 6); the old way (?sail=reload, a bot game), or
 *  anything going wrong, chart.html as before (app/chartPage.ts). */
function chartFromCard(): void {
  const n = N(), toPage = (h: string) => { location.href = h; };
  if (botKind || sailing || sailWay(n.params, n.tuning) === "reload") { toPage("chart.html"); return; }
  void sailOrReload(async () => openChart((href, to) => void sailFromChart(href, to), chartWorldArg()), "chart.html", toPage, e => console.error("sea chart: it couldn't open over the game, so chart.html loads instead", e));
}
document.getElementById("won-sail")?.addEventListener("click", chartFromCard);
document.getElementById("again")?.addEventListener("click", () => newNight("again"));
document.getElementById("chart-open")?.addEventListener("click", chartFromCard);
document.getElementById("over-close")?.addEventListener("click", () => document.getElementById("over")!.classList.remove("on"));
document.getElementById("fresh")?.addEventListener("click", () => newNight("fresh"));
/** The first load's sea chart (app/opening.ts): over the boot's night, its art drawn on under it (ui/chartOverlay.ts chartWarmsNight),
 *  its corner holding What's new and Options (the start card's, borrowed while shown: ui/cornerPanel.ts) and the zoo; no Close.
 *  Choosing an island starts its night in place as a sail does, the boot's own never played, so nothing's recorded on the chart. */
function openingChart(): void {
  mark("opening:chart");
  const host = () => document.getElementById("chart-overlay") ?? document.body, news = startEl.querySelector<HTMLElement>(".ss-body");
  openChart((href, to) => { closeCornerPanel(); void sailFromChart(href, to, false); }, chartWorldArg(), { opening: true, corner: [
    ...(news ? [{ label: "📜 What's new", onClick: () => toggleCornerPanel(host(), "news", "WHAT'S NEW", [news]) }] : []),
    ...(shakeEl ? [{ label: "⚙ Options", onClick: () => toggleCornerPanel(host(), "options", "OPTIONS", [shakeEl]) }] : []),
    { label: "🐾 Zoo", title: "Every creature, out of a run", onClick: () => { const u = new URL(location.href); u.searchParams.set("zoo", "1"); location.href = u.toString(); } },
  ] });
}
/** The world the chart is given: the link's own ?world=, carried on as chart.html's links do (else the save's). */
function chartWorldArg(): number | undefined { return new URLSearchParams(location.search).has("world") ? N().tuning.map?.world : undefined; } // (a function: the first load's chart opens before this line runs)
/** Sailing from the map table's sea chart (ui/chartOverlay.ts, and window.witch.sail under it): the night recorded on the chart,
 *  unwon if it's still on, then the next night started in place (app/sail.ts; the tuning's sail.inPlace, ?sail=inplace|reload)
 *  or the page loaded anew on the island's link as before; in place, anything going wrong loads it anew all the same, quietly
 *  (Ed's decision 2). Resolves once the new night's start is ready (true) or the page is going (false). */
function sailFromChart(href: string, to: Sailed, record = true): Promise<boolean> {
  const n = N(), W = n.tuning.map?.world ?? 0, save = loadSave();
  if (!record) mark("opening:sail"); // (the first load's chart: the boot's night never played)
  if (record && save.world === W) storeSave(sailNight(save, n.tuning.map?.island ?? "", !wavesOver(n.game) && !n.flags.chartRecorded && !n.flags.overShown)); // (in the campaign's world only, as nightOver)
  carryTiming(); // (?timing=1: the chart page's steps carried to the next, app/timing.ts)
  if (sailWay(n.params, n.tuning) === "reload") { location.href = href; return Promise.resolve(false); }
  return sailOrReload(() => sailInPlace(to), href, h => { location.href = h; }, e => {
    console.error("sail in place: it went wrong, so the island's page loads instead", e);
    N().playtest.sail(String((e as Error)?.stack ?? e).slice(0, 600));
  });
}
/** Back after a sail in place opens the pause menu (Ed's decision 1; app/sail.ts): armed by the first sail (a first load leaves
 *  Back alone); while the next island is made it only keeps the guard. */
const backGuard = new BackGuard(history, () => { if (!sailing && !freeze.frozen) freeze.toggle(); });
let backArmed = false;
const armBack = () => { if (backArmed) return; backArmed = true; addEventListener("popstate", () => backGuard.popped()); };
/** The sail in place (docs/plans/sail-without-reload.md B): the old night's music fading to the sea and the wind, the old night
 *  ended (its game marked disposed under ?debug=sail), the chart's last frame up while the next is made, the night's link pushed
 *  (and Back's guard), the next night made as the boot makes one (app/night.ts startNight: the view taking it, the sliders
 *  carried), its start's art made, then the flight in from the chart's camera (passed in memory), landing as a sail's does. */
async function sailInPlace(to: Sailed): Promise<void> {
  if (sailFail) throw new Error("?debug=sail: the sail in place made to fail"); // (window.witch.sail's test of the fallback)
  sailing = true;
  gestured = true; // (she's played: the sound's woken already)
  sound.sailing(1);
  const arrival: Arrival | undefined = to.end ? { v: 1, island: to.island, world: to.world ?? loadSave().world, at: Date.now(), ...to.end } : undefined;
  forgetArrival(); // (the reload's copy, sessionStorage's: a reload later doesn't fly again)
  chartHeld = false; view.assets.hold(false); // (the chart closed: the art workers free for the next island)
  endNight(page, params.get("debug") === "sail");
  if (arrival) { showStill(arrival); hudFade(HUD_IDS); document.body.classList.add("arriving"); armSkip(); }
  const p = sailParams(new URLSearchParams(location.search), to.island, to.seed, to.world);
  backGuard.sailed("?" + p.toString() + location.hash);
  armBack();
  const n = await startNight(page, { how: "sail", island: to.island, seed: to.seed, world: to.world, arrival, params: p });
  seedEl.innerHTML = `seed <a href="?seed=${n.seed}">${n.seed}</a>`;
  if (n.arrival) n.arrival.onReveal = revealArt;
  lastDraw = 0;
  await view.prepare();
  n.flags.ready = true;
  input.clearPresses();
  sailing = false;
  if (n.arrival) n.arrival.begin(n.game); // (the camera takes over from the chart's still; it lands as a sail's does: arrived)
  else arrived(); // (no flight: the chart couldn't fly)
}
/** Another way to a new night (the plan's PR 6: Play again, a new forest, the bed, the bot game's exit): in place as a sail is
 *  (the tuning's sail.inPlace, ?sail=), else, in a bot game for any but its exit (the bot's on the old night), or on anything going
 *  wrong, the link loaded as before (Play again reloading the page, the others app/sail.ts nightHref's), quietly. */
function newNight(how: NightWay): void {
  if (sailing) return;
  const n = N(), href = nightHref(how, location.href);
  const reload = how === "again" ? () => location.reload() : (h: string) => { location.href = h; };
  if ((botKind && how !== "bot") || sailWay(n.params, n.tuning) === "reload") { reload(href); return; }
  void sailOrReload(() => nightInPlace(nightFromHref(how, href), href), href, reload, e => {
    console.error(`a new night in place (${how}): it went wrong, so the page loads instead`, e);
    N().playtest.sail(String((e as Error)?.stack ?? e).slice(0, 600));
  });
}
/** A new night in place by one of those ways (docs/plans/sail-without-reload.md B), starting as a fresh load of its link would: the
 *  old night's music faded and the night ended, the link pushed (and Back's guard), the bedroom open as the loading screen (the
 *  start card under ?creator=0), the night made (startNight: the view taking it, the sliders carried), its start's art made;
 *  no flight in. The bot game's exit leaves the bot and her seeded look first. */
async function nightInPlace(spec: NightSpec, href: string): Promise<void> {
  if (sailFail) throw new Error("?debug=sail: the night in place made to fail");
  if (freeze.frozen) freeze.toggle(); // (a fresh page isn't paused: the bot game's Esc out pauses it too, the freeze's key first)
  sailing = true;
  sound.music?.fadeOut(N().tuning.sfx.sail?.fade ?? 1.5); // (a fresh page's music is silent till the home speakers boot)
  chartHeld = false; view.assets.hold(false);
  endNight(page, params.get("debug") === "sail");
  if (spec.how === "bot") leaveBot();
  const u = new URL(href);
  backGuard.sailed(u.search + u.hash);
  armBack();
  const room = spec.params.get("creator") !== "0";
  startEl.classList.add("loading");
  startEl.style.display = room ? "none" : ""; // (the start card only for a run without the creator, as at the boot)
  if (room) { dressCreator(); creator.show(); }
  const n = await startNight(page, spec);
  seedEl.innerHTML = `seed <a href="?seed=${n.seed}">${n.seed}</a>`;
  creator.loadout = { hat: n.game.spells.hat, broom: n.game.spells.broom };
  lastDraw = 0;
  await view.prepare();
  n.flags.ready = true;
  startEl.classList.remove("loading");
  input.clearPresses();
  sailing = false;
}
/** The bot game left (its exit in place): the bot and its tag gone, her own look back (the creator's, as a fresh page has it). */
function leaveBot(): void {
  botTag?.dispose();
  bot = null; botTag = null; botKind = null;
  const look = loadGenome();
  lookNow = JSON.stringify(look);
  view.setWitch(look);
}
/** ?debug=sail's test of the fallback: window.witch.sail(island, seed, { fail: true }). */
let sailFail = false;
/** Controls with nothing pressed or held (the aim left where it is). */
const stillControls = <T extends object>(c: T): T => Object.fromEntries(Object.entries(c).map(([k, v]) => [k, typeof v === "boolean" ? false : typeof v === "number" ? 0 : v])) as T;
function frame(now: number): void {
  requestAnimationFrame(frame);
  if (loop.manual) return;
  if (sailing) { sound.tickSail(); return; } // (the next island being made after a sail in place: nothing stepped or drawn, the sea and the wind heard)
  // The night on now, read afresh each frame (app/night.ts): its game, tuning, playtest run, HUD, arrival and flags.
  const { game, tuning, playtest, hud, arrival, flags: F } = N();
  if (F.ready && !F.frame1) { F.frame1 = true; mark("game:frame1"); if (!arrival) { logTiming(); clearCarried(); } }
  const dt = F.last ? (now - F.last) / 1000 : 0;
  F.last = now;
  const work0 = performance.now();
  frameStats.frame(dt * 1000);
  freeze.pollPad();
  // (the sea chart open over the game, ui/chartOverlay.ts: its keys and clicks are the chart's, hers held still)
  const human = chartOpen() || creator.visiting ? stillControls(input.read()) : input.read(); // (her room open mid-night: she stands still on the deck)
  // The sea chart over the night (the transition review, 2026-10-19: the night ran and drew on behind it, and its art workers drew
  // on, so the chart's islands and the next island's art drawn ahead got what was left): while it's open the night is paused,
  // nothing is drawn (the canvas keeps its last frame), and no new art is handed to the workers; closed, all as it was.
  const charting = chartOpen();
  if (charting !== chartHeld) { chartHeld = charting; view.assets.hold(charting && !chartWarmsNight()); if (charting) { chartWasPaused = game.clock.paused; game.clock.paused = true; } else game.clock.paused = chartWasPaused; }
  // A bot game: the bot's controls, not hers (the camera's zoom and the debug key still hers).
  const c: typeof human = bot ? { ...bot.decide(game), zoom: human.zoom, debug: human.debug, toggleAutoTalk: false } : human;
  if (bot) botTag?.update(bot.doing);
  if (F.castWanted && !game.clock.paused) { if (awaitingSpell(game.party)) c.castParty = !bot; else F.castWanted = false; }
  if (c.toggleAutoTalk) setAutoTalk(!autoTalk);
  c.autoTalk = autoTalk;
  if (c.debug) hud.setDebug(!hud.debugOn);
  view.debugReadouts = hud.debugOn;
  const step0 = performance.now();
  stepGame(game, c, dt * (botTag?.speed ?? 1));
  // ?debug=attack: every 10 s, a few seconds of blows on the two soundsystems farthest from her (never felling one), so the
  // 🔇 alarm (render/alarm.ts) shows whenever she's away from them.
  if (ATTACK_DEBUG && !game.clock.paused) { const tt = game.clock.time, ph = tt % 10; if (ph < 4 && Math.floor(tt * 2) !== F.attackTick) { F.attackTick = Math.floor(tt * 2); debugBlows(game.combat.sounds, game.combat.events, game.witch.x, game.witch.z, tt); } }
  const stepMs = performance.now() - step0;
  // E at the treehouse deck's map table (rules/treehouse.ts): the sea chart over the game, to sail from at any time (Ed, 2026-10-11:
  // "Sail anytime"); mid-night that ends the night unwon: played, nothing found (app/chartSave.ts), as a loss.
  if (!bot) for (const e of game.leashEvents) if (e.kind === "house" && e.obj) useHouse(e.obj);
  if (!bot && game.leashEvents.some(e => e.kind === "chart")) openChart((href, to) => void sailFromChart(href, to), chartWorldArg());
  // The party's over (rules/partyOver.ts; Ed, 2026-10-06): no end screen and no pause, the afterparty. Once it has eased
  // in, a small card under the clock says so, with the time she lasted, and a way to play again.
  // The night won (rules/win.ts): its card, the islands its woken legends showed, and those found recorded on the sea chart
  // (app/chartSave.ts), once, as its card comes up; the enraged legends' (win.lost) not.
  if (game.win?.card && !F.wonShown) {
    F.wonShown = true;
    document.getElementById("won-found")!.textContent = wonText(game.win);
    document.getElementById("won")!.classList.add("on");
  }
  if (game.win?.card && !F.chartRecorded) { F.chartRecorded = true; nightOver(tuning.map?.island ?? "", { won: true, found: game.win.found }, undefined, tuning.map?.world ?? 0); if (warmOn) warmChart(chartWorld(), loadSave().found); } // (in the campaign's world only; home grows with what she's found: made again ahead)
  // The touch spell button only with a broom that has a spell to cast (rules/spells.ts castable).
  { const want = castable(game.spells) ? "" : "none"; if (spellButton && spellButton.style.display !== want) spellButton.style.display = want; }
  newBuild.update(creator.open || freeze.frozen || menuGone); // (a newer build is out: in the bedroom and on the pause page)
  if (game.partyOver && game.partyOver.ease >= 1 && !F.overShown) {
    F.overShown = true;
    nightOver(tuning.map?.island ?? "", { won: false }, undefined, tuning.map?.world ?? 0); // (the sea chart: played; losing loses nothing)
    document.getElementById("over-stats")!.textContent = `You lasted ${Math.floor(game.partyOver.at / 60)} min ${Math.floor(game.partyOver.at % 60)} s and ${game.party.wave} waves.`;
    document.getElementById("over")!.classList.add("on");
  }
  const log0 = performance.now();
  playtest.update();
  const audio0 = performance.now();
  // The music: one track, mixed by how near the witch is to a playing soundsystem.
  const cue = N().musicCue = musicCue(game, N().musicCue);
  sound.update(game, cue, creator.open);
  const meter0 = performance.now();
  if (sound.audio) {
    meter.tap(sound.audio, [sound.music?.output, sound.music?.circleOutput, sound.sfx?.output]);
    meter.read(performance.now(), sound.musicExpected());
    const shedS = Math.floor(performance.now() / 1000);
    if (shedS !== lastShedS) { lastShedS = shedS; const cw = meter.clockWatch, why = sound.shedCheck(shedS, cw.underruns, cw.drift); if (why) { playtest.audio(why); console.warn(`audio: ${why}`); } }
    if (micWanted && !meter.mic && startEl.style.display === "none") meter.startMic(e => {
      const pageS = performance.now() / 1000;
      N().playtest.mic({ kind: e.kind, t: Math.round(N().game.clock.time * 10) / 10, dur: Math.round(e.dur * 100) / 100, outDb: e.outDb, micDb: e.micDb, lag: Math.round(e.lag * 1000), stall: nearestStall(pageS) });
    });
  }
  const outside = { playtest: audio0 - log0, audio: performance.now() - audio0 }; // (for the stall log: not the view's own parts)
  // A slow audio frame's parts in the playtest log (Ed's v3668: a second of "audio" on play's first frame, 2026-10-14), a few a load
  if (outside.audio > SLOW_AUDIO && slowAudioLogged < 8) {
    slowAudioLogged++;
    const p = sound.parts, r = (x: number) => Math.round(x);
    playtest.audio(`slow audio frame ${r(outside.audio)} ms: music ${r(p.music ?? 0)}, cues ${r(p.cues ?? 0)}, mix ${r(p.mix ?? 0)}, room ${r(p.room ?? 0)}, meter ${r(performance.now() - meter0)}`);
  }
  if (!F.ready) return;
  hud.losses();
  hud.clock();
  zooPanel?.update(); // (the zoo's block bar: src/zoo/panel.ts)
  // Behind the start screen, a frame every 0.3 s is plenty: the CPU goes to drawing the forest's
  // art in the background instead (and so slow a frame doesn't count against the scenery budget).
  // (arriving: the flight's shot on the view, every frame; landed, the night starts)
  const flying = !!arrival && !F.landed && F.ready;
  if (flying && arrival!.frame(view, game, now)) arrived();
  if (chartHeld) return; // (the sea chart over the night: its last frame kept, nothing drawn)
  if (game.clock.paused && !freeze.frozen && !flying && now - lastDraw < 300) return;
  lastDraw = now;
  // Drawn between the last two fixed steps (game time: party transitions, sigils and waves are stamped in it).
  frameStats.beginGpu();
  interpolated(game, () => view.render(Math.max(0, game.clock.time - (1 - game.alpha) * STEP * game.timeScale))); // (the world's step is STEP x timeScale: rules/slowTime.ts)
  frameStats.endGpu();
  aimHud.update(game, game.herTime, input.cursor, input.lastAim, startEl.style.display === "none" && !bot);
  frameStats.work(performance.now() - work0);
  perfHud?.frame(now, dt * 1000, stepMs, !game.clock.paused && !freeze.frozen);
  if (!game.clock.paused) stallLog.frame({ t: game.clock.time, gap: dt * 1000, work: performance.now() - work0, step: stepMs, parts: { ...view.ms, ...outside }, mode: game.witch.mode, x: game.witch.x, z: game.witch.z, wave: game.party.wave, creatures: game.creatures.length });
  shake.apply();
  freeze.update();
  // The overlay (app/hud.ts), four times a second.
  hud.overlay(now, overlayHead);
}
/** The overlay's lines (the power meter's are hud.ts's), shared with the debug info's copied text. */
function overlayHead(): string[] {
  const { game, seed } = N(), w = game.witch, s = view.stats;
  return [
    ...frameStats.lines(),
    stallLog.line(),
    meter.line() + (sound.valve.level ? `  shed ${sound.valve.level} (${SHED_STEPS[sound.valve.level]})` : "  full mix"),
    repro.line(),
    `seed   ${seed}  ${BUILD}`,
    `area   ${areaUnderWitch(game)}`,
    `mode   ${w.mode}`,
    `at     ${w.x.toFixed(0)}, ${w.z.toFixed(0)} m   zoom ${game.camera.zoomStep}`,
    `trees  ${s.trees}  bushes ${s.bushes}  creatures ${s.creatures}`,
    `budget scenery to ${s.sceneryRadius.toFixed(0)} m (${s.scenery})  gameplay ${s.gameplay}  dropped ${s.dropped}`,
    `draws  ${s.drawCalls}  art queued ${s.pendingArt}  ground tiles ${s.pendingGround}`,
    ...(game.lod ? [`sim    full ${game.lod.full}  coarse ${game.lod.coarse}  frozen ${game.lod.frozen}   marching full ${game.lod.marchFull}  coarse ${game.lod.marchCoarse}`] : []),
  ];
}
requestAnimationFrame(frame);


// For the smoke test, the tools and for poking at in the console (app/hooks.ts).
installHooks({ night: N, view, sound, meter, shake, frameStats, loadTimes, loop });
// ?debug=sail (docs/plans/sail-without-reload.md, PR 4b): another night in place, made as a sail will make one (app/night.ts
// startNight, the view taking it: View.setGame), its start's art made and play started as the start screen's would; for
// tools/sail/swap.cjs.
if (params.get("debug") === "sail") (window as unknown as { witch: Record<string, unknown> }).witch.debugSwap = async (seed: number, island?: string): Promise<number> => {
  const p = new URLSearchParams(params), was = N().spec;
  p.set("seed", String(seed));
  if (island !== undefined) p.set("island", island);
  sailing = true;
  endNight(page, true); // (its game marked disposed: a reader left on it that steps it throws)
  const n = await startNight(page, { how: "debug", island: island ?? was.island, seed, world: was.world, params: p });
  seedEl.innerHTML = `seed <a href="?seed=${n.seed}">${n.seed}</a>`;
  await view.prepare();
  n.flags.ready = true;
  sailing = false;
  start();
  return n.seed;
};
// window.witch.sail(island, seed, { end, fail }): a sail as the map table's chart sails (sailFromChart, the same path: its record
// on the chart, the way by sail.inPlace or ?sail=, in place the fallback), for tools/sail/leak.cjs and swap.cjs; `end` the
// chart's flight end (a plain one out at sea south of the island if not given: its still a dark screen; null, none), `fail`
// (?debug=sail only) the sail in place made to throw, to see the fallback. Resolves once the night's start is ready.
(window as unknown as { witch: Record<string, unknown> }).witch.sail = (island: string, seed: number, o: { end?: FlightEnd | null; fail?: boolean } = {}): Promise<boolean> => {
  sailFail = !!o.fail && params.get("debug") === "sail";
  const world = chartWorldArg(), end = o.end === null ? undefined : o.end ?? { cam: { x: 0, z: 700, height: 260, pitch: 0.45, fov: 40, speed: 60 }, still: "" };
  return sailFromChart(sailHref(island, seed, world, location.href), { island, seed, world, end });
};
