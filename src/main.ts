import { browserSaveSlots, slotStorage, switchSave } from "./app/saveSlots";
// Starts the prototype: the seed from the URL, the game rules, the view, input, and the loop.
import { drew, holding } from "./render/impact";
import { spinStep } from "./render/spin";
import { keycapCanvas } from "./ui/keyHint";
import { fillControls } from "./ui/controlsText";
import { bagOf, setBag } from "./rules/bags";
import { bindings } from "./platform/bindings";
import { Rumble } from "./platform/rumble";
import { currentSettings } from "./app/playerSettings";
import { wavesOver } from "./rules/win";
import { chartOpen, closeChart, openChart, prepareChart, finishChartFlight, type Sailed } from "./ui/chartOverlay";
import { openingWay, opensDirectly, opensInBedroom, opensWithCreator, sailLandsInBed } from "./app/opening";
import { wakeInBedroom } from "./rules/opening";
import { endDream, startParty, startWake } from "./rules/wakeUp";
import { LandingSleep } from './app/landingSleep';
import { STATION_SLOT, wearFromStation, wornGenome } from "./rules/clothesPile";
import { WakeCard } from "./render/wakeUp";
import { toggleCornerPanel, closeCornerPanel, cornerPanelRoot } from "./ui/cornerPanel";
import { MenuFocus } from "./ui/menuFocus";
import { carryTiming, clearCarried, mark, sinceSail, timingOn, transitionTiming, watchLongTasks } from "./app/timing";
import "./platform/tuningPreset"; // (first: ?tuning=pre-overnight writes the old balance over the config before anything reads it)
import { FrameStats } from "./platform/frameStats";
import { gpuName, QualityLadder } from "./app/ladder";
import { musicCue } from "./rules/musicPlan";
import { areaUnderWitch, interpolated, STEP, type Game } from "./rules/game";
import { enableCauldron, homeMushroomPickups } from "./rules/cauldronNight";
import { TUNING, type Tuning } from "./rules/tuning";
import { diveReach, diveTrack, handoffShot, newFlightClock, stepFlightClock, type Shot } from "./rules/arrive";
import { nextFrame, runSliced } from "./render/slices";
import { compareKey, rendererOf, sceneMode } from "./app/compareKey";
import { debugText, machineLines, precisionLines, reproLine, reproQuery, reproState, tuningDiff } from "./app/repro";
import { currentValue, DECISION_LIST, valuesText } from "./ui/decisions";
import { awaitingSpell } from "./rules/leypulse";
import { parseSeed } from "./rules/map";
import { Input } from "./platform/input";
import { View } from "./render/view";
import { prewarmArtWorkers } from "./render/assets";
import { AimHud } from "./render/aimhud";
import { StallLog } from "./platform/stallLog";
import { Freeze } from "./platform/freeze";
import { StudioPlayer } from "./app/studio";
import { StudioPanel } from "./ui/studioPanel";
import { Creator, loadGenome, saveGenome } from "./ui/creator";
import { BOT_KINDS, type BotKind } from "./rules/botKinds";
import type { Bot } from "./rules/bot";
import type { BotTag } from "./ui/botGame";
import { pleasingWitch } from "./ui/looks";
import type { DecidePanel } from "./ui/decide";
import { saveLoadout } from "./app/loadout";
import { castable, hatSpell, setParts } from "./rules/spells";
import { changeLoadout } from "./rules/hatSpells";
import { HOUSE_ROOMS, addFloorHat } from "./rules/houseRooms";
import { stationOf, tableOf } from "./rules/stations";
import { itemById, shelfOf, shelvesAt, stationsShowing } from "./rules/wardrobe";
import { FIND_KINDS, fillTrunk, findKind, loanFind, spawnFind, spawnSpot, type FindKindId } from "./rules/finds";
import { fitBroom, loadBroom, migrateBroom } from "./app/broomSave";
import { partById } from "./rules/broomParts";
import { loadOwned } from "./app/owned";
import { ownedToChoose, partsToChoose, setUnlockAll, syncHatUnlock, unlockAll } from "./app/debugUnlock";
import { defaultsText, newWitchLink } from "./app/defaultLook";
import { foundAll, keepFound, type FindsCtx } from "./app/finds";
import { dreamsAfter, homeOf, hatWithoutLoan, lend, loanName, lookWithoutLoan, partsWithoutLoan, settle, withLoan, type Loan } from "./app/loan";
import { DreamView, dreamArt, findCanvas } from "./render/dream";
import { LoanIcon } from "./render/loanIcon";
import { FindsPanel } from "./ui/findsPanel";
import { fightDt, fightFrame, fightLink, newFightSeed } from "./app/fightArena";
import { BagPreview } from "./ui/bagPreview";
import { BAGS } from "./rules/bags";
import { StationPanel, type WorkshopCtx } from "./ui/stationPanel";
import { DjBooth } from "./ui/djBooth";
import { chooseRecord, lastRecord, ownedRecords } from "./app/recordSave";
import { ZooOverlay, domZooHost, zooUrl } from "./app/zooOverlay";
import { leaveZoo } from "./app/zooExit";
import { TelescopeView, integratedGpu } from "./app/telescope";
import { loadSave, nightOver, sailNight, storeSave, unvisited, worldSeed } from "./app/chartSave";
import { readZooCoasts } from "./app/zooCoasts";
import { guidanceOf, seeGuide, GUIDANCE_HOOKS } from "./rules/guidance";
import { addNew, dropNew, loadGuide, storeGuide } from "./app/guideSave";
import { GuidePin } from "./render/view/guidance";
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
import { SettingsPage, mutedAway } from "./app/settingsPage";
import { playerPick as makePlayerPick } from "./app/playerPick";
import { installHooks } from "./app/hooks";
import { gpuLine, gpuSample } from "./render/view/gpuBudget";
import { PerfHud } from "./app/perfHud";
import { keepAtlasPixels } from "./render/atlas";
import { installPixelUi } from "./ui/pixelUi";
import { debugBlows } from "./rules/alarms";
import { SHED_STEPS } from "./platform/audio/shed";
import { hydrateMs, prepUsed, startBootMapPrep } from "./app/mapPrep";
import { endNight, flyIn, startNight, wearHat as wear, type Night, type NightSpec, type Page } from "./app/night";
import { BackGuard, chartIsland, nightFromHref, nightHref, sailHref, sailOrReload, sailParams, sailWay, stayLabel, type NightWay } from "./app/sail";
import { hudFade, showStill } from "./app/arrive";
import { forgetArrival, type Arrival } from "./app/arrival";
import { shotParams } from "./app/shot";
import type { FlightEnd } from "./render/chart/seaChart";
import { restoreGame } from "./rules/nightSnapshot";
import { browserNightStore, captureNight, nightHasStarted, NightAutosave, savedNight, savesEnabled, type SavedNight, type NightStore } from "./app/nightSave";
import { Breadcrumbs, browserCommentStore, captureComment, CommentBook, parseCommentFile } from "./app/playtestComments";
import { LOG_EXPANDED_BYTES } from "./platform/logCodec";
import { observePlaytestErrors, logCaughtError } from "./platform/playtestLog";
import { currentJournal, journalEntry, notable } from "./platform/playtestJournal";
import { pageMutation, pageFocus, recordedStep, recordingFor } from "./app/recordingHooks";
import { replayRecording } from "./platform/inputRecording";
import { snapshotGame } from "./rules/nightSnapshot";
import { nightSaveNotice } from "./ui/resumeNight";
import { restoreSettingsBase } from "./app/playerSettings";

declare const __BUILD__: string;
const BUILD = typeof __BUILD__ === "string" ? __BUILD__ : "dev";

performance.mark("witch:main"); // (the load's steps, for timing the arrival: witch:main, :game, :view, :ready; app/arrive.ts :landed)
prewarmArtWorkers(); // (the art workers load their code while the night is made: render/assets.ts)
const params = new URLSearchParams(location.search);
/** ?mistgate=0 (a builder's, the loading mist: render/loadingMist.ts): the island counted ready (g.islandReady) without waiting
 *  for its art (nothing in the house waits on it since the oak; with ?artdelay=<s>, slowly), to see the mist roll away. */
const mistGateOff = params.get("mistgate") === "0";
/** The link as it came (before the boot puts its own ?seed= in): whether this load opens on the sea chart (app/opening.ts). */
const bootLink = new URLSearchParams(location.search);
const restoringComment = params.get("restore") === "comment";
const bootSlot = browserSaveSlots().active();
let nightStore: NightStore | null = null, resumeSave: SavedNight | null = null, resumeGame: Game | undefined;
if (savesEnabled(bootLink, navigator.webdriver)) {
  try {
    nightStore = browserNightStore(browserSaveSlots().nightKey(location.pathname));
    const source = restoringComment ? browserNightStore(location.pathname + ":comment-restore") : nightStore;
    const value = await source.read(), saved = savedNight(value, BUILD, bootLink);
    if (saved) {
      try {
        const restored = restoreGame(saved.game);
        restoreSettingsBase(restored.tuning, saved.settingsBase);
        resumeGame = restored; resumeSave = saved;
        if (restoringComment) await source.clear();
        for (const key of [...params.keys()]) params.delete(key);
        for (const [key, value] of new URLSearchParams(saved.params)) params.append(key, value);
        params.delete("arrive");
        forgetArrival();
        document.getElementById("arrive-still")?.remove();
        document.getElementById("arrive-landing")?.remove();
        history.replaceState(null, "", "?" + params.toString() + location.hash);
      } catch (error) { nightStore = null; logCaughtError(error, "save slot: saved night kept after restore failure"); nightSaveNotice("Your saved night could not be restored. It has been kept; this new night will not replace it."); }
    } else if (value) { nightStore = null; logCaughtError(new Error("Incompatible format or explicit link"), "save slot: saved night kept"); nightSaveNotice("This saved night has another format or island. It has been kept; this new night will not replace it."); }
  } catch (error) { logCaughtError(error, "save slot: read night"); nightSaveNotice("Nights cannot be saved on this browser. Keep this page open to continue playing."); nightStore = null; }
}
// ?timing=1 (Ed, 2026-10-19): the sail's steps and the main thread's long tasks into the L log (app/timing.ts), kept for the tab.
const TIMING = timingOn(params);
if (TIMING) watchLongTasks();
/** The transition so far into the L log (?timing=1). */
const logTiming = (): void => { N().playtest.timing(sinceSail(transitionTiming())); }; // (always: the long tasks only with ?timing=1)
// The zoo (?zoo; rules/zoo.ts): straight in, as ?creator=0 (no bedroom, no party spell), unless the link says otherwise.
if (params.has("zoo") && !params.has("creator")) params.set("creator", "0");
// A builder's quick shot (?shot=<scene>, app/shot.ts): only the art the view needs, no start card or bedroom, the waves held.
shotParams(params); shotParams(bootLink);
// (its controls, src/zoo/panel.ts, loaded only for it, once the game is made)
let zooPanel: import("./zoo/panel").ZooPanel | null = null;
let zooLeaving = false;
let bootSeed = parseSeed(params.get("seed"));
if (bootSeed === null) {
  bootSeed = Math.floor(Math.random() * 1000000);
  params.set("seed", String(bootSeed));
  history.replaceState(null, "", "?" + params.toString() + location.hash);
}

// The boot's own map, made in a worker from here on (app/mapPrep.ts; Ed, 2026-10-20): the page's thread free while it's made (the
// opening's chart, the bedroom); a sail's arrival (&arrive=1) takes the chart's instead.
// (the zoo: its islands' real coasts read back from the chart's cache first, a moment at most, for its map: app/zooCoasts.ts)
if (params.has("zoo")) { const w = params.get("world"), t0 = performance.now(), r = await readZooCoasts(w ? worldSeed(w) : loadSave().world); console.info(`zoo: ${Object.keys(r.coasts).length} islands in their real shapes (${Math.round(performance.now() - t0)} ms)${r.missing.length ? `, ${r.missing.length} round till the chart makes them` : ""}`); }
const bootMap = resumeGame || params.get("arrive") ? null : startBootMapPrep(bootSeed, params);

// Brooms before parts (app/broomSave.ts; the Workshop, Ed 2026-10-23): a saved broom shape back to the Classic look and a saved
// broom spell dropped, once, before her look is read.
migrateBroom();
// Her look (the character creator's, kept on this browser; else the classic witch).
const savedLook = (resumeSave?.look as ReturnType<typeof loadGenome> | null) ?? loadGenome();
let lookNow = JSON.stringify(resumeSave?.look ?? savedLook);
// What she has on (rules/clothesPile.ts; Ed, 2026-10-23): her look, less what's still in last night's pile while she wakes (her
// nightie, bare feet, no hat...); shown whenever her look or the pile changes (`shownLook`: what the view was last given).
let shownLook = "";
function showLook(): void {
  const pile = (page.night ?? page.last)?.game.wake?.pile, key = `${lookNow}|${pile?.join() ?? ""}`;
  if (key === shownLook) return;
  const look = JSON.parse(lookNow) as unknown;
  if (view.houseRooms) view.houseRooms.outfit = look;
  shownLook = key; view.setWitch(wornGenome(look as never, pile));
}
// The page and the night (app/night.ts; docs/plans/sail-without-reload.md B): the page made once, the night (its link, tuning,
// game, playtest run, HUD, arrival and flags) held in `page.night`, read there by everything that needs it, never captured.
const page: Page = { night: null, build: BUILD, look: () => (lookNow ? JSON.parse(lookNow) : savedLook) };
/** The night on now (while the next is made after a sail in place, the one just ended: app/night.ts endNight). */
const N = (): Night => (page.night ?? page.last)!;
function mutate<T>(label: string, action: () => T): T { return pageMutation(N().game, label, action); }
function captureRecording(game: Game): SavedNight {
  const n = N();
  return captureNight(game, { build: BUILD, params: n.params.toString(), look: page.look() as Record<string, unknown> | null, loan,
    flags: { chartRecorded: n.flags.chartRecorded, overRecorded: n.flags.overRecorded } });
}
/** The next night being made in place (a sail, another way to a new night, or ?debug=sail's swap): the frame loop holds still. (Up
 *  here: the bedroom's progress reads it from the boot on.) */
let sailing = false;
// The boot's night: the link's tuning, the game, the link's switches, her hat, the playtest run, the knobs' start, the HUD.
await startNight(page, { how: "boot", island: params.get("island") ?? "", seed: bootSeed, world: params.has("world") ? Number(params.get("world")) : undefined, params, ready: bootMap ?? undefined, resume: resumeGame });
if (resumeSave) Object.assign(N().flags, resumeSave.flags);
const { tuning: bootTuning } = N();
// The opening (app/opening.ts; Ed, 2026-10-23: "the first screen should be the witch waking up in her bedroom on the home island
// instead of the map"): a plain first load is home's night, asleep in the dark while it's made, then she wakes in her bedroom
// there (wakeFirst); ?opening=old for the old start (the character creator as the loading cover).
const inBedroom = !resumeGame && opensInBedroom(bootLink, bootTuning);
if (!inBedroom) (window as unknown as { witchLoading?: { cancel(): void } }).witchLoading?.cancel();
if (N().game.map.zoo) void import("./zoo/panel").then(({ ZooPanel }) => { zooPanel = new ZooPanel(N().game); });
// The settings as built (the tuning file's), for the debug overlay's and the playtest log's list of what's changed (app/repro.ts).
const BUILT = JSON.parse(JSON.stringify(TUNING)) as object;
const canvas = document.getElementById("game") as HTMLCanvasElement;
// The art is drawn for the pixel size the game renders at (the tuning file's), not the Lab's.
const style = styleFromLink(params, bootTuning); // (app/viewParams.ts)
/** Load timings (ms since the page started): the view built (the page's own sprites drawn), ready to play. */
const loadTimes = { viewStart: performance.now(), view: 0, ready: 0, mapPrep: prepUsed === "worker" ? 1 : prepUsed === "stale" ? -1 : prepUsed === "unsound" ? -2 : prepUsed === "failed" ? -3 : 0, mapPrepMs: Math.round(hydrateMs) }; // (mapPrep: the map made from the worker's prep, 1; one there for another night, -1; unsound, -2; failed to hydrate, -3. mapPrepMs: the hydrate's own time)
/** Her hat on or not by her look (app/night.ts). */
const wearHat = (g: unknown) => mutate("dressing: hat", () => wear(N().game, g));
/** Tonight's find on loan till she sleeps (app/loan.ts; Ed, 2026-10-24): held here, never written; settled as she sleeps. */
let loan: Loan | null = resumeSave?.loan ?? null;
/** Her dream of a settled loan (render/dream.ts), playing over the sleep's dark; as it ends (by itself, or a key), her alarm rings
 *  in the next night's wake-up (rules/wakeUp.ts endDream), or, the night not made yet, as soon as it is. */
let dream: DreamView | null = null, dreamAsleep = false;
/** The settled loan she dreams of as she sleeps in place (the bed's way), or null. */
let dreamNext: { loan: Loan; won: boolean } | null = null;
/** The settled loan she dreams of after a sail (Ed, 2026-10-24: "the chart's flight in lands her asleep in bed, the dream plays there
 *  exactly as after a night in bed, and the alarm ends it"), or null: the flight lands in her bedroom, the dream as it lands. */
let dreamAfterDive: { loan: Loan; won: boolean } | null = null;
/** The broom parts she has tonight: those she's found, and a part on loan. */
const partsNow = (): Set<string> => withLoan("part", new Set(loadBroom().found), loan);
const view = page.view = await View.create(canvas, N().game, gameStyle(style, bootTuning), savedLook); // (built a frame's budget at a time: the bedroom's frames go on meanwhile, render/slices.ts)
view.setIntroFocus = pageFocus;
// The loading screen (src/loading.js, src/ui/loadingScreen.js), up since the first paint: given the view for its count of the art
// and the shaders; gone at once for a start with no wake-up in the bedroom, its supernova into the bedroom's alarm otherwise (below).
const loading = (window as unknown as { witchLoading?: { view: unknown; finish(): void; cancel(): void } }).witchLoading;
if (loading) loading.view = view;
loadTimes.view = performance.now();
view.partsFound = partsNow(); // (the Workshop's pegboard hangs them: render/workshopArt.ts)
performance.mark("witch:view");
viewFromLink(view, params); // (app/viewParams.ts)
void installPixelUi(); // (the pixel font, for the HUD's edge cues' labels too: render/indicator.ts)
const ATTACK_DEBUG = params.get("debug") === "attack";
if (params.get("pixels") === "keep") keepAtlasPixels(true); // (the atlases keep their pixels on the page: the smoke test's floating check reads them)
const input = new Input();
input.aimFrom = (x, y) => view.aimAt(x, y);
const aimHud = new AimHud(canvas); // the reticle where the mouse aims: 💌 range and the dodge's recharge
setupDebugKeys(view, input, params); // (app/keys.ts)
// The playtest log (Ed, 2026-10-04): a sample every 10 s of play, kept on this browser, a run a night (app/night.ts); the pause
// page's Download log (Ed, 2026-10-29: "rather than a key": the L key is gone), or opening the game with ?playtest=download, saves
// the last few runs as JSON.
if (params.get("playtest") === "download") setTimeout(() => N().playtest.download(), 500);

// The debug knobs: the fight's scale, speed and momentum, the treetop speed (app/knobs.ts): their keys, and their live setters
// for the pause page's sliders and the decisions panel (by the link's param); their start is the night's.
const knobLive = setupKnobs(N, mutate);

// Auto-talk (Ed's playtest, 2026-10-04: a new player wanted to turn it off): T, or a click
// on its slot, turns it on or off (remembered on this browser); off, she talks while Shift is held.
let autoTalk = true;
try { if (slotStorage.getItem("witch.autotalk") === "off") autoTalk = false; } catch { /* storage blocked: on */ }
const setAutoTalk = (on: boolean) => {
  autoTalk = on;
  try { slotStorage.setItem("witch.autotalk", on ? "on" : "off"); } catch { /* fine */ }
};

document.getElementById("version")!.textContent = typeof __BUILD__ === "string" ? __BUILD__ : "dev";
// The old card remains only as a hidden home for the Controls/Options nodes borrowed by menus.
// Ed, 2026-10-30: no start screen and no eager update notes.
const seedEl = document.getElementById("seed")!;
seedEl.innerHTML = `seed <a href="?seed=${N().seed}">${N().seed}</a>`;
const startEl = document.getElementById("start")!;
const startedNights = new WeakSet<Game>();
startEl.style.display = "none";
// The controls list as bound now (ui/controlsText.ts; Ed, 2026-10-28: a remap shows everywhere), again on a change (the list moves into
// the creator's and the pause page's tabs: the element itself kept).
{ const keysEl = startEl.querySelector<HTMLElement>(".keys"); if (keysEl) { fillControls(keysEl); bindings.onChange(() => fillControls(keysEl)); } }
/** The party spell (Ed, 2026-10-06): cast by the creator's scroll (ui/spellScroll.ts), its burst starting play; without the
 *  creator (?creator=0&spell=wait), Enter (once play has begun, so the start screen's Enter isn't it) or her spell key casts it
 *  on the next step. */
// Wanted until it's cast (Ed's v3668, stuck at the decks: a press dropped on a frame too short for a step, or a start that found the
// game frozen, left her held with no spell): pressed on every frame the clock runs, till the rules have it.
// (the night's flags.castWanted)
const queueCast = () => { const n = N(); if (awaitingSpell(n.game.party) && !n.game.wake) n.flags.castWanted = true; }; // (a night woken in her bedroom: E at her decks casts it, rules/wakeUp.ts)
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
  const night = N();
  if (night.arrival) bedFirst(night); // (the island's link loaded anew, &arrive=1: in bed before the dive, as a sail in place)
  await view.prepare();
  night.flags.ready = true;
  // The sea chart's renderer and shaders made ahead, while the start screen shows (ui/chartOverlay.ts prepareChart): E at the map
  // table then opens it without seconds of waiting. Not under automation (the smoke and bench runs), unless ?prepChart=1.
  if (params.get("prepChart") === "1" || (params.get("prepChart") !== "0" && !navigator.webdriver)) setTimeout(() => void prepareChart().catch(e => console.warn("sea chart: not made ahead", e)), 300);
  loadTimes.ready = performance.now();
  performance.mark("witch:ready");
  startEl.classList.remove("loading");
  if (inBedroom) { loading?.finish(); wakeFirst(); }
  else if (opensDirectly(params, { bedroom: inBedroom, arriving: !!night.arrival, resuming: !!resumeGame, bot: botKind ? bot ? "ready" : "loading" : "off" })) {
    startDirect();
    if (resumeGame) { if (restoringComment && !freeze.frozen) freeze.toggle(); resumeGame = undefined; resumeSave = null; }
  }
  night.arrival?.begin(night.game); // (the camera takes over from the chart's still)
}, 0));

// The sound: the volume slider in the corner, then the context, music and sound effects at the first press (app/sound.ts).
const sound = page.sound = new Sound(bootTuning, N().musicStyle, N().seed);
sound.leyLink = () => view.ley.currentLink(); // (the pulse's fizz heard where the line is drawn)
// The freeze (Esc, gamepad Start, the ❚❚ button): a true still for screenshots, . steps (platform/freeze.ts).
const freeze = page.freeze = new Freeze(N().game, N().seed, BUILD);
freeze.mutate = mutate;
freeze.advance = (game, controls, dt) => recordedStep(game, controls, dt, BUILD, captureRecording);
freeze.started = () => (startEl.style.display === "none" || creator.open) && !studio.at; // (in the bedroom too: Ed, 2026-10-14, "Can we pause from the bedroom?")
freeze.ownsEsc = () => !bot && !document.querySelector("#settings-page.open"); // (the Settings page's Esc is its own: it closes, the pause page stays) // (the bot game's Esc is its way back to the start screen: ui/botGame.ts)

// Arriving from the sea chart (?arrive=1, or a sail in place; the night's arrival, app/night.ts): the chart's last frame while the
// night builds, then the flight from the chart's camera down to her asleep in her bed (Ed, 2026-10-25: "a sail always ends with her
// asleep in bed"; bedFirst; at her decks under ?opening=old, the party spell cast as it lands). Any key or tap skips to its end; as
// it lands she wakes (arrived), and if no key or tap has come by then (browsers keep sound off till one does) a small note asks for one.
const bootArrival = N().arrival;
// (Ed, 2026-10-12: the HUD hidden through the flight, fading in as she settles at her decks)
const HUD_IDS = ["clock", "seed", "version", "aim", "touch", "bubbles", "invites"];
if (bootArrival) {
  hudFade(HUD_IDS); // (app/arrive.ts)
  document.body.classList.add("arriving");
}
let gestured = false;
const soundNote = () => {
  if (document.getElementById("sound-note")) return;
  const el = document.createElement("div");
  el.id = "sound-note"; el.textContent = "🔊 press any key for sound";
  el.style.cssText = "position:fixed;left:50%;bottom:72px;transform:translateX(-50%);z-index:30;font:13px ui-monospace,monospace;color:#e8e2f4;background:rgba(10,9,22,.7);border:1px solid #3a2f5c;border-radius:6px;padding:6px 12px;pointer-events:none";
  document.body.append(el);
  const go = () => { gestured = true; sound.wake(); el.remove(); removeEventListener("keydown", go); removeEventListener("pointerdown", go); };
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
/** A sail's night put to bed before its dive (Ed, 2026-10-25, 2a: every sail ends with her asleep in bed; app/opening.ts
 *  sailLandsInBed): her in her bedroom, the camera settled on her there, so the flight's last shot is her room (app/arrive.ts end). Not
 *  under ?opening=old, or without the house's rooms: then her decks as before, and no dream after the dive. */
function bedFirst(n: Night): void {
  pageMutation(n.game, "wake: bed arrival", () => bedFirstNow(n));
}
function bedFirstNow(n: Night): void {
  n.flags.inBed = sailLandsInBed(n.params, n.tuning) && wakeInBedroom(n.game);
  if (!n.flags.inBed) dreamAfterDive = null;
}
/** It's landed: in her bed, she wakes as after the bed (the one wake-up, every morning: Ed, 2026-10-26, in place of his decision 10's shorter one), dreaming
 *  first of a find on loan; at her decks (?opening=old), the night starts, the party spell cast, as the bedroom's scroll would. */
function arrived(): void {
  mutate("house: arrival", arrivedNow);
}
function arrivedNow(): void {
  logTiming(); clearCarried(); // (?timing=1: the whole sail, from the chart to her decks)
  N().flags.landed = true;
  document.body.classList.remove("arriving"); // (the HUD fades in)
  sound.sailing(0); // (sailed in place: the sea and the wind fade as the night's start comes in)
  const n = N();
  if (view.shaderLandingLimited && n.flags.inBed && !view.landingWakeReady()) {
    startWake(n.game, n.game.herTime, { dreaming: true, mirrored: mirrored(), yesterday: true });
    landingSleep.begin(n.game); view.landingSleeping = true; view.foot = 1; view.seatK = 0; n.game.clock.paused = true;
    input.release(); input.clearPresses(); (wakeCard ??= new WakeCard()).sleep();
    mark('landing:asleep'); return;
  }
  wakeArrival();
}
function wakeArrival(): void { mutate("wake: arrival", wakeArrivalNow); }
function wakeArrivalNow(): void {
  view.landingSleeping = false;
  // (landed asleep in her bed: with a loan settled, dreaming it, the alarm when it ends; else the alarm at once: rules/wakeUp.ts, render/dream.ts)
  const dd = dreamAfterDive;
  dreamAfterDive = null;
  if (N().flags.inBed && startWake(N().game, N().game.herTime, { dreaming: !!dd, mirrored: mirrored(), yesterday: true }) && dd) startDream(dd); // (a sail: a night played, last night's clothes in their pile)
  if (start()) queueCast(); // (woken in her bedroom, the dive's landing: not yet, rules/wakeUp.ts)
  if (N().game.wake) mark("opening:alarm");
  if (!gestured) soundNote(); else sound.wake();
}

// The character creator (Ed, 2026-10-05; "dressing up" to the player, the house's Bedroom being the room with the bed): at every
// load but a sail's arrival (&arrive=1 lands in her bed), from the hidden start card's button, and mid-night from the treehouse's
// stations (below); ?creator=0 skips it (tests, the smoke run), and loading is the start screen's as before.
// It's also the loading screen (Ed, 2026-10-05): it opens at once and the forest grows behind it;
// Start waits ("getting ready") until play can begin.
const creator = new Creator(style, savedLook, bootTuning.pixelSize);
creator.version = typeof __BUILD__ === "string" ? __BUILD__.split(" ")[0] : "dev"; // (its version, top left: Ed, 2026-10-13)
(window as unknown as { __creator: Creator }).__creator = creator; // (the creator's smoke scripts read her place in the room)
// Her hat's spell (rules/spells.ts, app/loadout.ts): the creator's Hat box chooses it from the hats she owns, kept on this browser.
creator.loadout = { hat: N().game.spells.hat }; creator.hats = unlockAll() ? undefined : N().game.spells.hats; // (the pause page's Unlock everything: every hat, app/debugUnlock.ts)
creator.onLoadout = l => mutate("dressing: loadout", () => { const { game } = N(); changeLoadout(game.witches[0], l.hat); saveLoadout({ hat: hatWithoutLoan(game.spells.hat, loan) as typeof game.spells.hat }); wearHat(page.look()); }); // (a loaned hat never saved: app/loan.ts; a hat swapped while hers lies elsewhere leaves that one lying: rules/hatSpells.ts)
// Her room mid-night from the treehouse's rooms (rules/houseRooms.ts; Ed, 2026-10-19): E at a dressing station, the bags or the broom
// stand opens it at only that station's choices (config/house/), the world running on at the house's tenth; its way out brings
// her back where she stood, in her new look and broom: any hat lying about staying where it lies (Ed, 2026-10-12). They are the only
// ways in mid-night (Ed: the Bedroom button and F are gone). The bestiary's book opens the zoo over the night, paused under it,
// and closing it goes back to the night where she was; the bed, E held, ends the night and starts the next on this island, a new
// seed (the only way to: Ed, 2026-10-21; the afterparty's 💤 pin leads her here, rules/guidance.ts).
// The stations' panels (Ed, 2026-10-21, the station menus: "The menu should open when she gets near, and mouse or gamepad direction
// keys are used to navigate the options"; rules/stations.ts, rules/wardrobe.ts, ui/stationPanel.ts): walking up to a station slides
// its shelves in over the game on E there, and E (the pad's ○, Esc) slides them out, she standing still at it (Ed, 2026-10-26); no room. What she owns (app/owned.ts) is on its shelves, what's
// still to find as silhouettes; each change goes on her a beat later and she turns to show it; choosing, the camera eases in on her
// (camera.station), and out as she moves.
const stations = new StationPanel(style, bootTuning.pixelSize);
// (the bags' list: each bag firing, Juliet's BagPreview running the 💌 rules with its stats; Ed, 2026-10-29)
stations.preview = id => (BAGS.some(b => b.id === id) ? new BagPreview(id, { w: 220, h: 110, tuning: N().tuning }) : null);
/** Something of the house's open at the end of the last frame (a station, the chart, the telescope, an instrument): a use press now
 *  closes it, nothing else (the frame below). */
let openPrev = false;
/** On a touch screen, while something's open, the use keycap in the corner: a tap closes it (there's no E to press). */
const shutButton = document.createElement("div");
shutButton.style.cssText = "position:fixed;right:16px;bottom:16px;z-index:70;display:none;cursor:pointer;filter:drop-shadow(0 0 3px rgba(255,214,140,.55))";
shutButton.append(keycapCanvas("TAP", 5));
shutButton.addEventListener("pointerdown", e => { e.preventDefault(); input.touch.sigil = true; });
document.body.append(shutButton);
let owned: Set<string> | null = null, stillAt = 0;
/** What the finds' keepers work on (app/finds.ts): tonight's spells and what she owns to wear, kept. */
const findsCtx = (): FindsCtx => ({ spells: N().game.spells, owned: () => (owned ??= withLoan("wearable", loadOwned((page.look() ?? creator.genome()) as Record<string, unknown>), loan)) });
stations.onLook = g => mutate("dressing: station look and bag", () => {
  saveGenome(lookWithoutLoan(g as Record<string, unknown>, loan) as never); creator.adopt(g); // (saved without the loan: app/loan.ts)
  // (not yet dressed: a station's choice puts its piece on her, out of last night's pile: rules/clothesPile.ts; Ed, 2026-10-23)
  const w = N().game.wake; if (w && stations.station) wearFromStation(w, stations.station);
  if (JSON.stringify(g) !== lookNow) { lookNow = JSON.stringify(g); wearHat(g); setBag(N().game.witches[0].spells, bagOf(g as Record<string, unknown>)); } // (her bag's 💌 stats follow the bag she wears: rules/bags.ts)
  showLook();
});
stations.onBack = () => shutStation("back"); // (menu.back, E by default: platform/bindings.ts; the pad's, circle, comes through padControls)
// Her DJ booth at the decks (Ed, 2026-10-29; ui/djBooth.ts): E there opens it (the wake-up's "booth" event); "Get this party started"
// closes it and starts the party at the record's bpm (rules/wakeUp.ts startParty), the record remembered for next time.
const booth = new DjBooth();
booth.onBack = () => booth.close();
booth.onStart = r => mutate("house: DJ party start", () => { chooseRecord(r.id); booth.close(); startParty(N().game, r.bpm); });
stations.onChange = () => { const { game } = N(); view.turnUntil = game.herTime + 0.8; };
stations.onDress = () => { view.spin = spinStep(view.spin, N().game.herTime); }; // (Ed, 2026-10-26: she twirls while her new look draws)
// The Workshop's bay (Ed, 2026-10-23; docs/backlog/workshop.md): a part chosen goes on her broom at once, mid-night too (its stats
// and its set's spell with it: rules/spells.ts setParts), and is kept on this browser for the nights after (app/broomSave.ts).
stations.onFit = f => mutate("dressing: broom fitting", () => { const { game } = N(); setParts(game.witches[0].spells, f); fitBroom(partsWithoutLoan(f, loan)); }); // (kept without a part on loan: app/loan.ts)
/** What the Workshop's stations show (ui/stationPanel.ts): the parts found, her broom, tonight's part to find, her tuning. */
const workshopNow = (): WorkshopCtx => { const { game, tuning } = N(), t = game.trunk; return { found: partsToChoose(partsNow()), fitted: game.witches[0].spells.parts, tonight: t && t.kind === "part" && !t.found ? t.item : null, tuning }; };
/** Tonight's find taken (the "found" event): on loan till she sleeps (app/loan.ts), hers to wear or use at once, never written. */
function lendFind(kind: FindKindId, id: string): void {
  const { game } = N();
  loan = lend(kind, id, { look: (page.look() ?? creator.genome()) as Record<string, unknown> | null, hat: game.spells.hat, parts: game.witches[0].spells.parts });
  if (kind === "wearable" || kind === "bag") findsCtx().owned().add(id); // (in what she owns tonight, not in her save)
  view.partsFound = partsNow();
  // (new in the treehouse: her guidance pin over where it is till she's been there, rules/guidance.ts)
  const at = kind === "part" ? "lathe" : kind === "hat" ? "hats" : stationsShowing(shelfOf(id)?.id ?? "")[0];
  if (at) { addNew(guide, { kind: kind === "part" || kind === "hat" ? kind : "wearable", id, at }); storeGuide(guide); }
}
/** Her guidance (rules/guidance.ts): what's kept of it on this browser (app/guideSave.ts), her pin, and the islands found (the
 *  chart's save, read a second at most). */
const guide = loadGuide(), guidePin = new GuidePin(view);
let chartFound: { at: number; unvisited: string[] } = { at: -Infinity, unvisited: [] };
/** Her guidance pin this frame (rules/guidance.ts): what's next, over it, while she's in the treehouse and not at it. */
function stepGuide(now: number): void {
  const { game } = N();
  if (seeGuide(game, 0, guide)) storeGuide(guide);
  if (now - chartFound.at > 1000) chartFound = { at: now, unvisited: unvisited(loadSave(), N().tuning.map?.island ?? "home") }; // (where she is counts as been to: app/chartSave.ts unvisited)
  const G = guidanceOf(game, 0, guide, chartFound.unvisited);
  guidePin.update(G, !!G && !creator.open && !chartOpen() && !sailing); // (wherever she is, at its target too: Ed, 2026-10-28)
}
/** The loan settled as she sleeps (the bed, a sail; Ed, 2026-10-24): the night won, kept for good (its kind's own save, and what she
 *  has on of it with it); not, gone back to the sky, what she has on of it back to what she had before. What her dream shows, or
 *  null with nothing on loan. */
function settleLoan(won: boolean): { loan: Loan; won: boolean } | null {
  return mutate("finds: settle loan", () => settleLoanNow(won));
}
function settleLoanNow(won: boolean): { loan: Loan; won: boolean } | null {
  const l = loan, { game } = N();
  if (!l) return null;
  loan = null;
  const look = (page.look() ?? creator.genome()) as Record<string, unknown> | null;
  const woke = settle(l, won, { look, hat: game.spells.hat, parts: game.witches[0].spells.parts }, {
    keep: (kind, id) => keepFound(findsCtx(), kind, id), look: g => saveGenome(g as never), hat: h => saveLoadout({ hat: h as typeof game.spells.hat }), parts: f => fitBroom(f),
  });
  if (woke && woke !== look) { creator.adopt(woke); lookNow = JSON.stringify(woke); }
  if (!won) { owned = null; dropNew(guide, l.id); storeGuide(guide); } // (read afresh from her save, the loan not in it; gone back to the sky, no longer new)
  view.partsFound = partsNow();
  return { loan: l, won };
}
/** Her dream of a settled loan shown (`veil`: over a night not asleep, its own dark under it). */
function startDream(s: { loan: Loan; won: boolean }, veil = false): void {
  dream?.dispose();
  const of = { item: s.loan.id, name: loanName(s.loan), piece: findKind(s.loan.kind).piece(s.loan.id), won: s.won, home: homeOf(s.loan, id => stationsShowing(shelfOf(id)?.id ?? "")) };
  dream = new DreamView(of, dreamArt(of, view.assets.style), veil, herHead).play(veil && params.has("shot"));
  dreamAsleep = !veil; // (asleep: its end rings the next night's alarm; shown over a night, ?dream= or the dev panel, nothing)
  dream.onOver = () => { const n = page.night; if (dreamAsleep && n?.game.wake) mutate("wake: dream dismissed", () => endDream(n.game, n.game.herTime)); };
  (window as unknown as { __dream?: DreamView }).__dream = dream; // (the shot tools draw it at a time: tools/loan/dream-shots.cjs)
}
/** Her head's top on the page (CSS px) as last drawn (render/view/witch.ts herHead), for her dream's cloud to rise from; null
 *  before she's drawn. */
function herHead(): { x: number; y: number } | null {
  const H = view.herHouseHead, w = N().game.witch;
  if (w.perch && H.at > 0) return { x: H.x, y: H.y }; // (in the house: as its labels are placed; kept while the next island is made)
  const h = view.herHead, r = canvas.getBoundingClientRect();
  return h.on ? { x: r.left + h.x * r.width, y: r.top + (1 - h.y) * r.height } : null;
}
/** The on-loan icon, top left (render/loanIcon.ts). */
const loanIcon = new LoanIcon();
let zooPaused = false, zooHeld = false;
// (the night under it held as under the sea chart: nothing drawn, its art workers stopped, so the zoo's own page, a whole second
// game, has the machine; tools/zoo/perf.cjs)
const zoo = new ZooOverlay(domZooHost(on => mutate("house: zoo pause", () => { const { clock } = N().game; if (on) { zooPaused = clock.paused; clock.paused = true; } else clock.paused = zooPaused; zooHeld = on; view.assets.hold(on || chartHeld); input.clearPresses(); })), zooUrl(location.href));
// The telescope in the crow's nest (Ed, 2026-10-21; app/telescope.ts, rules/telescope.ts): E at it looks through it (Ed's
// playtest, 2026-10-26, in place of 2026-10-23's "opens when you walk up to it"; look around with the aiming keys), full screen,
// the night running on at the house's tenth while she stands still, WASD and the left stick looking round too (Ed, 2026-10-26:
// "walking away shouldn't work"); E (the pad's ○) leaves, and E there looks again; Esc pauses over it. Its picture is drawn at telescope.resolution, on an integrated GPU
// (Ed's Intel UHD) telescope.lowGpuResolution (?telescopeRes= sets it: 0.25 to 3, 1 the game's pixels, 2 twice as fine).
// The treehouse Studio's instruments (Ed, 2026-10-23; app/studio.ts, rules/studio.ts, ui/studioPanel.ts): walking up to the drum
// kit, the modular synth or the microphone she's at it, its menu in and every key playing it (she stands still: her keys are its),
// till Esc (the pad's B) steps her away; the first Esc is the instrument's, the next the pause's. The Studio's loop is its own.
const studioPanel = new StudioPanel();
const studio = new StudioPlayer(N().musicStyle, () => sound.audio, () => N().tuning.music.volume * sound.level, studioPanel);
/** What takes the keys now (the frame loop: input.release() as it changes). */
let keysTaken = "";
const telescope = new TelescopeView(document.body, bootTuning.telescope?.vignette ?? 0.6);
let scopeAt: string | null = null; // (the telescope it's open at)
telescope.onChange = on => {
  const T = N().tuning.telescope, res = Number(new URLSearchParams(location.search).get("telescopeRes")) || (T && integratedGpu(view.renderer.getContext()) ? T.lowGpuResolution : T?.resolution ?? 1);
  view.pixelScale = on ? 1 / Math.max(0.25, Math.min(3, res)) : 1; // (finer than the game's pixels too: Ed, 2026-10-23, "too pixellated")
  fit();
  input.clearPresses();
};
const useHouse = (obj: string): void => mutate("house: use", () => {
  const { game, tuning, flags: { chartRecorded, overRecorded } } = N();
  if (obj === "slept") { if (!chartRecorded && !overRecorded) nightOver(tuning.map?.island ?? "", { won: false }, undefined, tuning.map?.world ?? 0); setTimeout(() => newNight("bed"), 0); return; } // (the sea chart: played, as the afterparty records it; then a new seed: app/newForest.ts; after this frame, in place)
  const o = HOUSE_ROOMS.objects.find(q => q.id === obj);
  if (!o || creator.open || game.witches[0].ko) return;
  if (o.use.kind === "zoo") zoo.open(); // (a station's E and an instrument's: their panels, below in the frame and app/studio.ts)
  else if (o.use.kind === "telescope" && tuning.telescope && !telescope.on) { scopeAt = o.id; telescope.open(game, tuning.telescope); }
});
creator.progress = () => { const a = view.assets; return { done: a.done, total: a.done + a.pending, ready: !sailing && N().flags.ready }; }; // (a new night in place: not till it's made)
// (its room's ambience plays while it's open: overnight, 2026-10-06)
creator.onGesture = () => sound.wake();
creator.onStart = g => {
  const who = playerPick?.value ?? "human"; // (the dev "Player:" pick: a bot plays the run instead of her)
  if (who !== "human" && BOT_KINDS.includes(who as BotKind)) { botGame(who as BotKind); return; }
  if (JSON.stringify(g) !== lookNow) { lookNow = JSON.stringify(g); showLook(); wearHat(g); }
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
  lookNow = JSON.stringify(look); showLook(); wearHat(look);
  if (creator.open) creator.hide();
  void Promise.all([import("./rules/bot"), import("./ui/botGame")]).then(([{ BOT_GAME, newBot }, { BotTag }]) => {
    bot = newBot(kind, BOT_GAME[kind]); // (the skilled one questing, bringing relics and feeding: rules/bot.ts BOT_GAME)
    botTag = new BotTag(kind, () => newNight("bot")); // (back to the start: a night in place on this link without ?bot)
    if (N().flags.ready) startDirect(); // (else the forest's ready starts it)
  });
}
if (botParam && BOT_KINDS.includes(botParam)) botGame(botParam);
else if (opensWithCreator(params, { bedroom: inBedroom, arriving: !!bootArrival, resuming: !!resumeGame })) creator.show();
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
  if (landingSleep.holds(game)) return false;
  if (!flags.ready || !game.clock.paused || freeze.frozen) return false;
  if (creator.open) return true;
  sound.start(); // (browsers keep sound off until the player presses something: the start is that press)
  if (!arrival) revealArt(); // (play starting from behind the bedroom or the start screen: the island not seen till now)
  mutate("start play", () => { game.clock.paused = false; });
  startedNights.add(game);
  startEl.style.display = "none";
  input.clearPresses();
  return true;
}
function startDirect(): void { if (start() && !gestured) soundNote(); }
input.onAny = () => (N().arrival && !N().flags.landed ? true : start()); // (arriving: a key skips the flight, app/arrive.ts; the landing starts it)
// The audio watchdog (app/sound.ts).
sound.watch(() => !N().game.clock.paused && !freeze.frozen && !document.hidden && !mutedAway(), () => N().game.speakerBoot.some(t => t !== null), () => N().playtest);
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
/** Controls and Options on the pause page (the opening, Ed's decision 3: "Controls are taught in the bedroom and kept in
 *  the pause menu"; Ed, 2026-10-23, the chart's corner gone with the chart-first start): where the creator's tabs were never set up,
 *  buttons while paused show the start card's keys, its What's new and the screen shake's option (ui/cornerPanel.ts, borrowed and
 *  put back). */
let pauseBtns: HTMLDivElement | null = null;
function pauseControls(on: boolean): void {
  if (!on || dressed) { if (pauseBtns) pauseBtns.style.display = "none"; closeCornerPanel(); return; }
  if (!pauseBtns) {
    pauseBtns = document.createElement("div");
    pauseBtns.id = "pause-btns"; pauseBtns.style.cssText = "position:fixed;right:12px;top:12px;z-index:61;display:flex;gap:8px";
    const keys = startEl.querySelector<HTMLElement>(".keys");
    for (const [label, id, title, el] of [["❔ Controls", "controls", "CONTROLS", keys], ["⚙ Options", "options", "OPTIONS", shakeEl]] as const) {
      if (!el) continue;
      const b = document.createElement("button");
      b.type = "button"; b.textContent = label;
      b.style.cssText = "font:13px ui-monospace,monospace;color:#e8e2f4;background:rgba(10,9,22,.86);border:1px solid #3a2f5c;border-radius:6px;padding:6px 12px;cursor:pointer";
      b.addEventListener("click", () => toggleCornerPanel(document.body, id, title, [el]));
      pauseBtns.append(b);
    }
    document.body.append(pauseBtns);
  }
  pauseBtns.style.display = "";
}
freeze.onToggle = on => {
  notable("screen", on ? "Paused" : "Resumed");
  input.clearPresses(); // (a press not yet read as she pauses or resumes is dropped: an E pending under the pause closed a station's panel there, the pause check's broom bay on a slow runner)
  settingsPage.gate(); // (suspended while paused, and muted in the background if so set: app/settingsPage.ts)
  if (!on) settingsPage.close();
  pauseControls(on);
  musicLabPanel?.frozen(on);
  creator.frozen = on; // (paused in her room: its keys and clicks wait, Esc resumes; the sliders backed over its panel)
  if (on) void newBuild.check();
  if (pauseSliders) { pauseSliders.show(on, creator.open); return; }
  if (!on || pauseLoading) return;
  pauseLoading = true;
  void import("./ui/decide").then(({ PauseSliders }) => {
    const report = () => import("./ui/visualReport").then(({ report }) => report(reportHost()));
    pauseSliders = new PauseSliders({ mutate, saveComment, restoreComment, downloadReadableLog: () => { void N().playtest.download("text"); }, settings: () => settingsPage.show(), get tuning() { return N().game.tuning; }, get seed() { return N().game.seed; }, version: BUILD, live: knobLive, report, musicLab: openMusicLab, audioTest: () => { window.open("audio-test/", "_blank", "noopener"); }, downloadLog: () => N().playtest.download(), unlockAll: { get: () => unlockAll(), set: on => mutate("debug: unlock all", () => { setUnlockAll(on); for (const W of N().game.witches) syncHatUnlock(W, on, params); creator.hats = N().game.spells.hats; }) }, defaults: { text: () => defaultsText(lookWithoutLoan((page.look() ?? creator.genome()) as Record<string, unknown> | null, loan), partsWithoutLoan(N().game.witches[0].spells.parts, loan)), tryIt: () => { window.open(newWitchLink(location.href), "_blank", "noopener"); }, shown: () => N().hud.debugOn || unlockAll() }, fightArena: () => { window.open(fightLink(newFightSeed()), "_blank", "noopener"); }, finds: () => findsPanel.toggle(true), findsShown: () => N().hud.debugOn || devFinds, quality: { lines: () => ladder.lines(), options: () => ladder.options(), current: () => ladder.current(), choose: v => { ladder.choose(v); ladder.apply(N().game.tuning); } } });
    requestAnimationFrame(() => pauseSliders!.show(freeze.frozen, creator.open)); // (a frame shut first, so it slides in)
  }, () => { // (its files replaced under it: Ed, 2026-10-14, "the menu does not appear")
    pauseLoading = false;
    void newBuild.check().then(() => { if (newBuild.latest) menuGone = true; else window.alert("A newer build of the game is up, so the pause page can't load: reload the page (Shift+Reload)."); });
  });

};
// Screen shake when she's hit, and the camera's sub-pixel glide (app/shake.ts).
const shake = page.shake = new ScreenShake(N().game, bootTuning, view, canvas, params), shakeEl = shake.option;
// Ed, 2026-10-30: the retired card is hidden on every route. Controls and Options remain available in existing menus;
// update notes move to the lazy Settings tab. The normal bedroom/legacy creator retain their own opening actions.
/** The creator's tabs and its Zoo button, once a page (at the boot, or a night in place that opens the bedroom after a load that didn't). */
let dressed = false;
function dressCreator(): void {
  if (dressed) return;
  dressed = true;
  const keys = startEl.querySelector<HTMLElement>(".keys");
  if (keys) creator.addTab("controls", "❔ Controls", [keys]);
  if (shakeEl) creator.addTab("options", "⚙ Options", [shakeEl]);
  // The zoo (Ed, 2026-10-13: ?zoo, "plus a Zoo button"): every creature in its own block, out of a run.
  creator.addButton("Zoo", () => { const u = new URL(location.href); u.searchParams.set("zoo", "1"); location.href = u.toString(); });
}
if (bootArrival) { /* (no card, no bedroom: the still, then the flight) */ } else if (inBedroom) { /* (no card, no creator: asleep in the dark, then the wake-up: wakeFirst) */ }
else if (!resumeGame && params.get("creator") !== "0" && !botKind) dressCreator();
// Ed's decisions panel (src/ui/decide.ts, config/decisions.json): ?decide opens it, F2 opens and closes it. Its code loads
// only then (overnight phase 2: out of the game's bundle); its knobs' choices in the link are put on as the game starts
// (ui/decisions.ts, app/linkParams.ts).
let decide: DecidePanel | null = null, decideLoading = false;
const decidePanel = (open: boolean) => {
  if (decide || decideLoading) return;
  decideLoading = true;
  void import("./ui/decide").then(({ DecidePanel }) => { decide = new DecidePanel({ mutate, get tuning() { return N().game.tuning; }, get seed() { return N().game.seed; }, version: BUILD, live: knobLive }, open); });
};
if (params.has("decide")) decidePanel(true);
window.addEventListener("keydown", e => { if (e.code !== "F2") return; e.preventDefault(); if (decide) decide.toggle(); else decidePanel(true); });
document.addEventListener("visibilitychange", () => { if (document.hidden) N().flags.last = 0; });

const endedNights = new WeakSet<Game>();
const commentBook = new CommentBook(browserCommentStore()), breadcrumbs = new Breadcrumbs();
void currentJournal()?.ready.then(({ unexpected, persistent }) => {
  if (!unexpected && persistent) return;
  const notice = document.createElement("div"), download = document.createElement("button"), dismiss = document.createElement("button");
  notice.setAttribute("role", "status");
  for (const type of ["keydown", "keyup", "pointerdown", "pointerup", "click", "wheel"]) notice.addEventListener(type, event => event.stopPropagation());
  notice.style.cssText = "position:fixed;bottom:12px;left:12px;z-index:10000;max-width:420px;padding:12px;background:#171324;color:#fff;border-radius:8px;font:14px sans-serif";
  notice.append(document.createTextNode(unexpected ? "previous session ended unexpectedly — log kept" : "Logs are kept on this page only: browser storage is unavailable."));
  download.textContent = "Download log"; download.onclick = () => { void N().playtest.download(); };
  dismiss.textContent = "Dismiss"; dismiss.onclick = () => notice.remove();
  notice.append(download, dismiss); document.body.append(notice);
});
observePlaytestErrors(error => breadcrumbs.add(N().game, "error", error));
let lastRecordedInput = "", lastInputAt = -Infinity;
async function saveComment(text: string): Promise<string> {
  const n = N();
  const comment = captureComment(n.game, text, { build: BUILD, params: n.params.toString(), look: page.look() as Record<string, unknown> | null, loan,
    flags: { chartRecorded: n.flags.chartRecorded, overRecorded: n.flags.overRecorded } }, repro.link(), Object.fromEntries(repro.changed()), breadcrumbs.recent(n.game), Date.now(), recordingFor(n.game, BUILD, captureRecording).export());
  const kept = await commentBook.add(comment);
  const status = kept ? "Comment and saved moment kept in the playtest log." : "Comment kept on this page only: browser storage is unavailable. Download the log before closing.";
  return comment.recording?.complete ? status : `${status} Exact input replay is incomplete: ${comment.recording?.failure ?? "unavailable"}.`;
}
async function restoreComment(file: File): Promise<void> {
  if (file.size > LOG_EXPANDED_BYTES) throw Error("This log file is too large.");
  const comment = await parseCommentFile(await file.text(), BUILD);
  // Validate the full graph before writing or navigating. Importing JSON never executes code.
  const replayed = comment.recording ? replayRecording(comment.recording, BUILD) : restoreGame(comment.night.game);
  if (JSON.stringify(snapshotGame(replayed)) !== JSON.stringify(comment.night.game)) throw Error("Input replay differs from the saved comment moment. The log is kept; report this replay failure.");
  await browserNightStore(location.pathname + ":comment-restore").write(comment.night);
  const url = new URL(location.href); url.search = "?restore=comment&resume=1"; location.href = url.toString();
}
let nightWriteReported = false;
const autosave = nightStore ? new NightAutosave(nightStore, () => {
  const n = page.night;
  if (!n || endedNights.has(n.game) || !n.flags.ready || sailing || bot || dream && !dream.over || n.arrival && !n.flags.landed || !savesEnabled(n.params, navigator.webdriver)) return null;
  // The opening, before play starts, must not replace an existing night merely because the page loaded.
  if (!nightHasStarted(n.game, startedNights.has(n.game))) return null;
  browserSaveSlots().summary(n.game.tuning.map?.island ?? "home", false, bootSlot);
  return captureNight(n.game, { build: BUILD, params: n.params.toString(), look: page.look() as Record<string, unknown> | null, loan,
    flags: { chartRecorded: n.flags.chartRecorded, overRecorded: n.flags.overRecorded } });
}, error => { if (!nightWriteReported) { nightWriteReported = true; logCaughtError(error, "save slot: write night"); } nightSaveNotice("Your night could not be saved. Keep this page open to continue playing."); }) : null;
page.onNightEnd = () => { if (page.night && !endedNights.has(page.night.game)) { endedNights.add(page.night.game); browserSaveSlots().summary(page.night.game.tuning.map?.island ?? "home", true, bootSlot); } void autosave?.clear(); };
if (autosave) {
  setInterval(() => { void autosave.save(performance.now()); }, 5000);
  addEventListener("pagehide", () => { void autosave.save(performance.now(), true); });
  document.addEventListener("visibilitychange", () => { if (document.hidden) void autosave.save(performance.now(), true); });
}

let lastDraw = 0;
/** The wake-up's card and dark (render/wakeUp.ts), made the first time a night has one. */
let wakeCard: WakeCard | null = null;
const landingSleep = new LandingSleep<Game>();
let landingSnoreAt = -Infinity;
/** A plain first load asleep in the dark while home's night is made (the card kept up till she wakes: wakeFirst). */
let bootAsleep = inBedroom;
if (inBedroom) (wakeCard = new WakeCard()).sleep();
const frameStats = new FrameStats(view.renderer.getContext());
/** The quality ladder (app/ladder.ts, rules/ladder.ts; Ed, 2026-10-27): steps the scenery's quality down while the GPU's frames
 *  are over budget and back up while there's room, remembered for this device; ?ladder=off or ?ladder=<n> to hold it. */
const ladder = new QualityLadder(gpuName(view.renderer.getContext()), params);
// The player's Settings page (app/settingsPage.ts): its settings on the live pieces now, the page itself opened from the pause page's dev menu.
const settingsPage = new SettingsPage({ mutate, input, shake, ladder, freeze, audio: on => sound.freeze(!on), tuning: () => N().game.tuning, version: BUILD,
  saves: { list: () => browserSaveSlots().list(), active: () => bootSlot, choose: id =>
    switchSave(browserSaveSlots(), () => autosave?.flush(performance.now()) ?? Promise.resolve(true), () => { forgetArrival(); location.assign(location.pathname); }, id) },
});
ladder.mutate = mutate;
const pauseFocus = new MenuFocus();
const rumble = new Rumble();
// ?perf=1: the performance panel (app/perfHud.ts), always on.
const perfHud = page.perfHud = params.get("perf") === "1" ? new PerfHud(N().game, view, frameStats) : null;
// Frames of 100 ms or more, with what they spent it on (Ed, 2026-10-06: occasional half-second freezes): the overlay and the playtest log.
const stallLog = new StallLog(summary => {
  journalEntry("slowframe", summary);
  notable("warning", `Slow frames: ${summary.count}; worst gap ${summary.maxGap} ms, work ${summary.maxWork} ms`, { loading: summary.loadingCount, parts: summary.worst.parts });
});
// (the playtest log's hooks read the night on now, so they carry to the next night's run as they are: app/night.ts)
N().playtest.stalls = () => stallLog.stalls;
// What a builder needs from a screenshot of the overlay (Ed, 2026-10-14; app/repro.ts): the link that rebuilds what she saw, the
// machine, and every setting changed from the build's; the same in the playtest log (the pause page's Download log).
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
// The finds' dev control (ui/findsPanel.ts; Ed, 2026-10-23): from the debug overlay's buttons, or ?dev=finds.
// Spawning a find near her (Ed, 2026-10-23: "a way to spawn the collectible near the player, perhaps from the pause menu";
// rules/finds.ts spawnSpot, spawnFind): a kind's item, or tonight's own find (kind null), on clear ground a few metres in front
// of her, as tonight's find: the constellation, the telescope and E at it go by it, and taking it is the real claim.
function spawnHere(kind: FindKindId | null, item: string | null): string {
  return mutate("debug: spawn find", () => spawnHereNow(kind, item));
}
function spawnHereNow(kind: FindKindId | null, item: string | null): string {
  const g = N().game, at = spawnSpot(g);
  if (!at) return "no clear ground within 12 m of her (in the treehouse? step out onto the island)";
  if (kind && item) return spawnFind(g, kind, item, at) ? `${kind} ${item} spawned ${Math.round(Math.hypot(at.x - g.witch.x, at.z - g.witch.z))} m from her` : `no ${kind} ${item}`;
  if (g.trunk && g.trunk.item === null) fillTrunk(g, foundAll(findsCtx()));
  if (!g.trunk?.item || g.trunk.found) return "no find tonight (all found, or taken)";
  const c = g.map.cellSafe(at.x, at.z).cell;
  Object.assign(g.trunk, { x: at.x, z: at.z, cell: [c[0], c[1]] });
  return `tonight's ${g.trunk.kind} ${g.trunk.item} moved next to her`;
}
// (it redraws after each give or take, asking again: the pegboard's parts kept up with it)
const findsPanel = new FindsPanel(() => { view.partsFound = partsNow(); return findsCtx(); }, spawnHere, {
  now: () => (loan ? loanName(loan) : null),
  keep: () => { const s = settleLoan(true); if (s) startDream(s, true); },
  back: () => { const s = settleLoan(false); if (s) startDream(s, true); },
});
findsPanel.mutate = action => mutate("debug: finds changes", action);
// ?dream=won:hat:sentry (or lost:wearable:top-cape, ...): her dream of such a loan over the night, at once, its own dark under it
// (for a look at it; under ?shot= it's drawn only when asked, window.__dream.draw(seconds): tools/loan/dream-shots.cjs).
{ const [v, k, ...r] = (params.get("dream") ?? "").split(":"), id = r.join(":");
  if ((v === "won" || v === "lost") && FIND_KINDS.some(q => q.id === k && q.items.includes(id))) startDream({ loan: lend(k as FindKindId, id, { look: null, hat: "none", parts: N().game.witches[0].spells.parts }), won: v === "won" }, true); }
document.getElementById("finds-dev-btn")?.addEventListener("click", () => findsPanel.toggle());
const devFinds = new URLSearchParams(location.search).get("dev") === "finds";
if (devFinds) findsPanel.toggle(true);
// ?spawnfind=kind:item (or tonight): spawned once, as soon as she first stands on open ground (the treehouse isn't), for shots.
let spawnWanted = new URLSearchParams(location.search).get("spawnfind");
document.getElementById("copy-debug")?.addEventListener("click", e => {
  const b = e.currentTarget as HTMLButtonElement, text = repro.full();
  void navigator.clipboard?.writeText(text).then(() => { b.textContent = "copied"; }, () => { b.textContent = "copy failed: see console"; console.log(text); }).finally(() => setTimeout(() => { b.textContent = "copy debug info"; }, 1500));
});
N().playtest.debugInfo = () => ({ link: repro.link(), machine: repro.machine().map(l => l.slice(7)), changed: Object.fromEntries(repro.changed()) });
N().playtest.comments = () => commentBook.all();
N().playtest.inputRecording = () => recordingFor(N().game, BUILD, captureRecording).export();
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
// The comparability key (app/compareKey.ts; Ed, 2026-10-26: "only compare like with like"): with the playtest log's run and its
// samples' scenes, and for the browser tools (window.witch.compareKey(spot): tools/bench/comparable.cjs pageKey).
const keyNow = (spot?: string) => compareKey({ build: BUILD, game: N().game, canvas, window: { width: innerWidth, height: innerHeight }, renderer: rendererOf(view.renderer.getContext()), changed: repro.changed(), params: N().params, spot, dpr: devicePixelRatio, nav: navigator as Navigator & { deviceMemory?: number } });
N().playtest.keyState = () => keyNow();
N().playtest.sceneState = () => sceneMode(N().game);
// The measured output (Ed, round 16: "Is there a way for the game to know if anything is being sent to the speakers or not?";
// platform/audio/outputMeter.ts): what leaves the game for the speakers, read a few times a second; silence while the music
// should be heard goes in the playtest log (the pause page's Download log) with where she was and the nearest stall. ?micCheck=1 (debug only) also
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
// What the GPU holds (render/gpuLedger.ts, view/gpuBudget.ts): each sample's, the pause page's and the overlay's line, and its
// trouble kept in the log. A lost GL context can't be mended in place (the atlases let their pixels go once uploaded, and the
// ground's tiles live only on the GPU), so once it's back the night is loaded anew from the repro link: the island, the waves
// brought on, her place and the zoom (DECISION FOR ED: the fights in between aren't replayed).
N().playtest.gpuState = () => gpuSample(view);
freeze.extra = () => [gpuLine(view)];
view.onGpuEvent = what => N().playtest.gpuEvent(what, Math.round(view.ledger.total / 1048576));
view.onContextRestored = () => {
  N().playtest.gpuEvent("context restored: the night loaded again");
  const link = repro.link();
  location.replace(N().params.has("debug") ? link : link.replace(/&debug$/, ""));
};
N().playtest.frameState = () => {
  const r = frameStats.recent(), pct = (a: number[], p: number) => { if (!a.length) return null; const s = [...a].sort((x, y) => x - y); return Math.round(s[Math.min(s.length - 1, Math.floor(p * s.length))] * 10) / 10; };
  const S = view.stats, { game } = N(), w = game.witch;
  return { ms: pct(r.frames, 0.5) ?? 0, p95: pct(r.frames, 0.95) ?? 0, cpu: pct(r.cpu, 0.5) ?? 0, cpu95: pct(r.cpu, 0.95) ?? 0, gpu: pct(r.gpu, 0.5), gpu95: pct(r.gpu, 0.95), over20: r.frames.length ? Math.round((100 * r.frames.filter(x => x > 20).length) / r.frames.length) : 0, draws: S.drawCalls ?? 0, trees: S.trees, bushes: S.bushes, creatures: S.creatures, mode: w.mode, zoom: game.camera.zoomStep, rung: ladder.state.rung, ladder: ladder.state.mode };
};
const micWanted = params.get("micCheck") === "1";
let chartHeld = false, chartWasPaused = false; // (the sea chart open: the night held behind it)
let lastShedS = -1; // (the sound's safety valve, checked once a second: platform/audio/shed.ts)
const SLOW_AUDIO = 150; let slowAudioLogged = 0; // (ms: a frame's audio work worth a line in the playtest log)
/** Driven from outside (the perf check, tools/smoke): the loop below stands still, and
 *  window.witch.frame steps and draws one frame of a fixed length instead. */
const loop = { manual: false, get bot() { return bot; }, get botTag() { return botTag; }, get ready() { return N().flags.ready; } };
const spellButton = document.getElementById("spell");
/** The sea chart over the night (the map table's): choosing the island she's on never starts a new night (Ed,
 *  2026-10-21: "choosing the same island after a night has ended shouldn't start a new night - going to bed does that"): the chart
 *  closes as Close does, nothing recorded, and the night (or its afterparty) goes on as it was; another sails. */
function chartOverNight(table?: string): void {
  const n = N(), island = chartIsland(n.tuning.map?.island);
  const here = island ? { island, world: n.tuning.map?.world ?? 0, label: stayLabel(n.game.partyOver ? "over" : n.game.win?.phase === "won" ? "won" : "on") } : undefined;
  if (table) chartAt = table;
  openChart((href, to) => { chartAt = null; void sailFromChart(href, to); }, chartWorldArg(), { here, onDepart: departFromChart, onStay: () => console.info(`sea chart: ${island} chosen, she's there: back to the night (seed ${N().seed}, game time ${N().game.clock.time.toFixed(1)} s)`),
    onFly: () => view.beginLandingShaders(true),
    onLandingDue: dueAt => view.startLandingShaderGrace(dueAt),
    ...(table ? { table: { onLeave: () => { chartAt = null; closeChart(); } } } : {}) });
}
/** The map table's chart (Ed, 2026-10-23: "Map menu slides in from the bottom when you go near it, like the clothes stations"; since
 *  his playtest of 2026-10-26, E at it: rules/stations.ts tableOf, ui/chartOverlay.ts `table`): up from the bottom, the night held
 *  behind it; she moves and it slides away. The table it's up at. */
let chartAt: string | null = null;
/** The world the chart is given: the link's own ?world=, carried on as chart.html's links do (else the save's). */
function chartWorldArg(): number | undefined { return new URLSearchParams(location.search).has("world") ? N().tuning.map?.world : undefined; } // (a function: the first load's chart opens before this line runs)
/** Sailing from the map table's sea chart (ui/chartOverlay.ts, and window.witch.sail under it): the night recorded on the chart,
 *  unwon if it's still on, then the next night started in place (app/sail.ts; the tuning's sail.inPlace, ?sail=inplace|reload)
 *  or the page loaded anew on the island's link as before; in place, anything going wrong loads it anew all the same, quietly
 *  (Ed's decision 2). Resolves once the new night's start is ready (true) or the page is going (false). */
function sailFromChart(href: string, to: Sailed): Promise<boolean> {
  const d = departing?.island === to.island && departing.seed === to.seed ? departing : null;
  departing = null;
  if (!d) recordSail();
  if (sailWay(N().params, N().tuning) === "reload") { location.href = href; return Promise.resolve(false); }
  return sailOrReload(() => sailInPlace(to, d?.night), href, h => { location.href = h; }, e => {
    console.error("sail in place: it went wrong, so the island's page loads instead", e);
    N().playtest.sail(String((e as Error)?.stack ?? e).slice(0, 600));
  });
}
/** The night she's leaving recorded on the chart, unwon if it's still on (in the campaign's world only, as nightOver). */
function recordSail(): void {
  page.onNightEnd?.();
  // (she sleeps as she sails: tonight's loan settled, and its dream after the dive, in bed: Ed, 2026-10-24)
  dreamAfterDive = dreamsAfter("sail") ? settleLoan(N().game.win?.phase === "won") : null;
  const n = N(), W = n.tuning.map?.world ?? 0, save = loadSave();
  if (save.world === W) storeSave(sailNight(save, n.tuning.map?.island ?? "", !wavesOver(n.game) && !n.flags.chartRecorded && !n.flags.overRecorded));
  carryTiming(); // (?timing=1: the chart page's steps carried to the next, app/timing.ts)
}
/** The next night made under the sea chart as it flies (Ed, 2026-10-24, the sail's transition: "Start the dive as soon as what it
 *  really needs is ready", "Never a frozen frame"): from the moment she sails (the chart's onDepart), the night she's leaving
 *  recorded and ended and the next made as a sail's is (makeSailNight), its first frames drawn ahead at the chart's hand-off; the
 *  chart's flight slows to wait for it (app/chartView.ts), then hands over (sailFromChart, with this night). Resolves once it's ready,
 *  or has gone wrong (the hand-off then loads the island's page, as ever). */
let departing: { island: string; seed: number; night: Promise<Night> } | null = null;
function departFromChart(to: Sailed, at: FlightEnd["cam"] | null): Promise<void> {
  if (sailWay(N().params, N().tuning) === "reload") return Promise.resolve();
  recordSail();
  const night = makeSailNight(to, undefined, at);
  departing = { island: to.island, seed: to.seed, night };
  return night.then(() => undefined, () => undefined);
}
/** Whether she's woken on this browser before (set as she first gets up): her first-ever morning's dressing table carries the
 *  "First night" banner (`firstEver`, read as the page's first wake-up starts). The wake-up itself is one for every morning since Ed,
 *  2026-10-26, replacing his decision 4's shorter one on later loads. */
const WOKEN_KEY = "witch.woken";
const wokenBefore = (): boolean => { try { return slotStorage.getItem(WOKEN_KEY) === "1"; } catch { return false; } };
const woke = (): void => { try { slotStorage.setItem(WOKEN_KEY, "1"); } catch { /* storage blocked: her first morning again next time */ } };
let firstEver = false;
/** Whether she's come to the dressing table before, ever (its first visit marked once: rules/wakeUp.ts `mirror`). */
const MIRROR_KEY = "witch.mirrored";
const mirrored = (): boolean => { try { return slotStorage.getItem(MIRROR_KEY) === "1"; } catch { return false; } };
const sawMirror = (): void => { try { slotStorage.setItem(MIRROR_KEY, "1"); } catch { /* storage blocked: marked again next time */ } };
/** The opening's wake-up on a plain first load (app/opening.ts opensInBedroom): home's night made (its start's art drawn, the rest
 *  drawing on behind her while she dresses and walks down: rules/wakeUp.ts), she wakes in her bedroom in the treehouse
 *  (rules/opening.ts), the one wake-up, as every morning. Without the house's rooms, the old start. */
function wakeFirst(): void {
  mutate("wake: first morning", wakeFirstNow);
}
function wakeFirstNow(): void {
  const n = N();
  bootAsleep = false;
  firstEver = !wokenBefore();
  if (!wakeInBedroom(n.game) || !startWake(n.game, n.game.herTime, { mirrored: mirrored() })) { wakeCard?.hide(); dressCreator(); creator.show(); return; }
  mark("opening:wake");
  start();
  if (!gestured) soundNote(); else sound.wake(); // (the alarm heard once she's pressed something: browsers keep sound off till then)
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
async function sailInPlace(to: Sailed, made?: Promise<Night>): Promise<void> {
  const arrival: Arrival | undefined = to.end ? { v: 1, island: to.island, world: to.world ?? loadSave().world, at: Date.now(), ...to.end } : undefined;
  if (arrival) { showStill(arrival, !made); hudFade(HUD_IDS); document.body.classList.add("arriving"); armSkip(); } // (made under the flight: no "landing…", the still goes at once)
  const n = await (made ?? makeSailNight(to, arrival));
  if (made && arrival) flyIn(n, arrival); // (made under the chart's flight: its hand-off, the still its last frame)
  if (n.arrival) n.arrival.onReveal = revealArt;
  n.flags.ready = true;
  input.clearPresses();
  sailing = false;
  if (n.arrival) {
    n.arrival.begin(n.game, !!made); // the camera takes over from the chart's still
    if (view.shaderLandingLimited) n.arrival.skip(); // map/house readiness still applies; shaders add no further flight/warm-up wait
  }
  else arrived(); // (no flight: the chart couldn't fly)
}
/** A sail's night made (sailInPlace, or under the chart's flight: departFromChart): the old night's music fading to the sea and the
 *  wind, the old night ended, the night's link pushed (and Back's guard), the night made (startNight) and its start readied: the
 *  ground, the house and the shaders, not the trees (Ed, 2026-10-24: "Don't wait for the trees": they come under the loading mist,
 *  the dive's own areas first, rules/arrive.ts diveReach); `at`, the chart's hand-off, its first frames drawn there ahead. */
async function makeSailNight(to: Sailed, arrival?: Arrival, at?: FlightEnd["cam"] | null): Promise<Night> {
  if (sailFail) throw new Error("?debug=sail: the sail in place made to fail"); // (window.witch.sail's test of the fallback)
  if (at === undefined) view.beginLandingShaders(false);
  sailing = true;
  gestured = true; // (she's played: the sound's woken already)
  sound.sailing(1);
  forgetArrival(); // (the reload's copy, sessionStorage's: a reload later doesn't fly again)
  chartHeld = false; view.assets.hold(false); // (the chart closed, or flying in: the art workers free for the next island)
  endNight(page, params.get("debug") === "sail");
  const p = sailParams(new URLSearchParams(location.search), to.island, to.seed, to.world);
  backGuard.sailed("?" + p.toString() + location.hash);
  armBack();
  const n = await startNight(page, { how: "sail", island: to.island, seed: to.seed, world: to.world, arrival, params: p });
  seedEl.innerHTML = `seed <a href="?seed=${n.seed}">${n.seed}</a>`;
  bedFirst(n); // (the flight in ends on her asleep in her bedroom, rules/opening.ts)
  lastDraw = 0;
  const A = n.tuning.arrive;
  await view.prepare({ sail: true, ...(A && at !== undefined ? { dive: diveReach(n.game.map, A), track: diveTrack(n.game.map, A) } : {}) });
  if (at && A && !view.shaderLandingLimited) await warmAt(n, handoffShot({ cam: at }, n.game.map), A);
  if (view.shaderLandingLimited) await view.waitForLandingWitch();
  if (view.shaderLandingLimited) finishChartFlight();
  mark("sail:ready");
  return n;
}
/** The night's first frames drawn at `shot` (the chart's hand-off), under the chart, until they come calm as the flight's warm-up
 *  waits for (rules/arrive.ts stepFlightClock): the heavy ones over before the dive, not at its start. */
async function warmAt(n: Night, shot: Shot, A: NonNullable<Tuning["arrive"]>): Promise<void> {
  await runSliced(view.heights.fillSteps(shot.tx, shot.tz), "handoff-heights");
  const c = newFlightClock();
  view.fly = shot;
  view.assets.hold(true); // (the art workers paused for them: the first draws not fighting them for the machine)
  try {
    while (!stepFlightClock(c, performance.now(), A).faded) {
      view.limitedLandingReady();
      if (view.shaderLandingLimited) break;
      const t0 = performance.now();
      view.render(n.game.clock.time);
      try {
      stallLog.frame({ t: n.game.clock.time, gap: 0, work: performance.now() - t0, step: 0, draw: performance.now() - t0, measured: { step: false, draw: true }, parts: Object.fromEntries(Object.entries(view.ms).map(([name, ms]) => [`draw.${name}`, ms])), source: "warm-draw", loading: { phase: "handoff-warm", ready: n.flags.ready, ...view.readiness }, mode: n.game.witch.mode, x: n.game.witch.x, z: n.game.witch.z, wave: n.game.party.wave, creatures: n.game.creatures.length });
      } catch (error) { logCaughtError(error, "warm-draw observation"); }
      if (TIMING) console.info(`sail-timing: warm frame ${Math.round(performance.now() - t0)} ms`, JSON.stringify(Object.fromEntries(Object.entries(view.ms).filter(([, v]) => v > 20).map(([k, v]) => [k, Math.round(v)]))));
      await nextFrame();
    }
  } finally { view.fly = null; view.assets.hold(false); }
}
/** Another way to a new night (the plan's PR 6: the bed, the bot game's exit): in place as a sail is (the tuning's sail.inPlace,
 *  ?sail=), else, in a bot game for any but its exit (the bot's on the old night), or on anything going wrong, the link loaded as
 *  before (app/sail.ts nightHref's), quietly. */
function newNight(how: NightWay): void {
  if (sailing) return;
  page.onNightEnd?.();
  // (she sleeps: tonight's loan settled, won or not, and on the bed's way she dreams it: app/loan.ts, render/dream.ts)
  const settled = settleLoan(N().game.win?.phase === "won");
  dreamNext = dreamsAfter(how) ? settled : null;
  const n = N(), href = nightHref(how, location.href);
  const reload = (h: string) => { location.href = h; };
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
  // After the bed in the new opening (Ed's decision 10): asleep in the dark while the next island's made, then the wake-up (one for every morning since Ed, 2026-10-26)
  // in her bedroom, its curtains waiting on that island's build (rules/wakeUp.ts); else the bedroom as the loading screen, as before.
  const wakes = spec.how === "bed" && openingWay(spec.params, N().tuning) === "bedroom";
  const room = !wakes && spec.params.get("creator") !== "0";
  startEl.classList.add("loading");
  startEl.style.display = "none";
  if (room) { dressCreator(); creator.show(); }
  if (wakes) (wakeCard ??= new WakeCard()).sleep();
  if (wakes && dreamNext) startDream(dreamNext);
  dreamNext = null;
  const n = await startNight(page, spec);
  seedEl.innerHTML = `seed <a href="?seed=${n.seed}">${n.seed}</a>`;
  creator.loadout = { hat: n.game.spells.hat }; creator.hats = unlockAll() ? undefined : n.game.spells.hats;
  lastDraw = 0;
  await view.prepare();
  n.flags.ready = true;
  startEl.classList.remove("loading");
  input.clearPresses();
  sailing = false;
  if (wakes && wakeInBedroom(n.game) && startWake(n.game, n.game.herTime, { dreaming: !!dream && !dream.over, mirrored: mirrored(), yesterday: true })) { mark("opening:bed"); start(); } // (after the bed: last night's clothes in their pile)
  else if (!room && !wakes) startDirect();
}
/** The bot game left (its exit in place): the bot and its tag gone, her own look back (the creator's, as a fresh page has it). */
function leaveBot(): void {
  botTag?.dispose();
  bot = null; botTag = null; botKind = null;
  const look = loadGenome();
  lookNow = JSON.stringify(look);
  showLook();
}
/** ?debug=sail's test of the fallback: window.witch.sail(island, seed, { fail: true }). */
let sailFail = false;
/** Controls with nothing pressed or held (the aim left where it is). */
/** The house object E was pressed at in the last step (the rules' "house" event: rules/sigilButton.ts), or null; never in a bot's game. */
view.onUse = down => { if (down) input.touch.sigil = true; input.touch.sigilHeld = down; }; // (a tap on a use prompt: the touch sigil button's press)
const usedAt = (g: Game): string | null => (bot ? null : g.leashEvents.find(e => e.kind === "house" && e.obj && e.obj !== "slept")?.obj ?? null);
const stillControls = <T extends object>(c: T): T => Object.fromEntries(Object.entries(c).map(([k, v]) => [k, typeof v === "boolean" ? false : typeof v === "number" ? 0 : v])) as T;
/** The station panels' closes, the last few (window.witch.stationShuts): why, her clock, and whether paused. */
const stationShuts: { why: string; at: number; frozen: boolean; station: string | null }[] = [];
function shutStation(why: string): void {
  stationShuts.push({ why, at: Math.round(performance.now()), frozen: freeze.frozen, station: stations.station }); if (stationShuts.length > 8) stationShuts.shift();
  stations.close();
}
let lastObservedFrame = 0;
let measuredStep: number | undefined, measuredDraw: number | undefined;
let measuredParts: Record<string, number> = {};
function drawFrame(time: number): void {
  const start = performance.now(), previousParts = view.ms;
  try { view.render(time); }
  finally {
    measuredDraw = (measuredDraw ?? 0) + performance.now() - start;
    if (view.ms !== previousParts) for (const [name, ms] of Object.entries(view.ms)) measuredParts[`draw.${name}`] = (measuredParts[`draw.${name}`] ?? 0) + ms;
  }
}
function frame(now: number): void {
  const start = performance.now(), gap = lastObservedFrame && !document.hidden ? now - lastObservedFrame : 0;
  lastObservedFrame = now; measuredStep = measuredDraw = undefined; measuredParts = {};
  const n = N(), phase = sailing ? "sailing" : landingSleep.holds(n.game) ? "landing-sleep" : !n.flags.ready ? "building" : n.arrival && !n.flags.landed ? "arrival" : "play";
  try { frameBody(now); }
  finally {
    try {
      if (!loop.manual) stallLog.frame({ t: n.game.clock.time, gap, work: performance.now() - start, step: measuredStep ?? 0, draw: measuredDraw, measured: { step: measuredStep !== undefined, draw: measuredDraw !== undefined }, parts: measuredParts, source: "raf", loading: { phase, ready: n.flags.ready, ...view.readiness }, mode: n.game.witch.mode, x: n.game.witch.x, z: n.game.witch.z, wave: n.game.party.wave, creatures: n.game.creatures.length });
    } catch (error) { logCaughtError(error, "slow-frame observation"); }
  }
}
function frameBody(now: number): void {
  requestAnimationFrame(frame);
  if (loop.manual) return;
  if (sailing) { sound.tickSail(); return; } // (the next island being made after a sail in place: nothing stepped or drawn, the sea and the wind heard)
  // The night on now, read afresh each frame (app/night.ts): its game, tuning, playtest run, HUD, arrival and flags.
  const { game, tuning, playtest, hud, arrival, flags: F } = N();
  if (F.ready && !F.frame1) { F.frame1 = true; mark("game:frame1"); if (!arrival) { logTiming(); clearCarried(); } }
  if (ladder.cap30 && F.last && now - F.last < 1000 / 30 - 4) return; // (the ladder's steady-30 rung: every other frame at 60 Hz)
  const dt = F.last ? (now - F.last) / 1000 : 0;
  F.last = now;
  const work0 = performance.now();
  ladder.frame(now, dt * 1000, !F.ready || game.clock.paused || freeze.frozen || document.hidden || scopeAt !== null || (!!arrival && !F.landed), tuning, frameStats.gpuTimes);
  frameStats.frame(dt * 1000);
  freeze.pollPad();
  if (landingSleep.holds(game)) {
    input.release(); input.clearPresses(); game.clock.paused = true;
    updatePauseMenus(now);
    if (!freeze.frozen && view.landingWakeReady() && mutate("wake: landing release", () => landingSleep.release(game, true))) {
      input.release(); input.clearPresses(); mark('landing:alarm-ready'); wakeArrival();
      F.last = now; // discard the loading interval before the first normal simulation step
    } else {
      (wakeCard ??= new WakeCard()).sleep();
      if (!freeze.frozen && now - landingSnoreAt > 4500) { sound.sfx?.snore(0, 0, 0.2); landingSnoreAt = now; }
      drawFrame(game.clock.time); hud.clock(); freeze.update(); return;
    }
  }
  // (the sea chart open over the game, ui/chartOverlay.ts: its keys and clicks are the chart's, hers held still)
  // (her room open mid-night, or the telescope: she stands still; the telescope takes her stick, keys and wheel, E leaving it)
  studio.update(bot ? null : game, !creator.open && !chartOpen() && !freeze.frozen && !telescope.on, dt, usedAt(game)); // (E at an instrument: she's at it)
  // (a menu or overlay that takes the keys opening or closing, the Studio's, the chart, the telescope, the creator or the zoo:
  // everything held let go, so a key-up it took doesn't leave her walking after; Ed's playtest of v4515, the Studio's mic)
  const takes = `${studio.at}|${chartOpen()}|${telescope.on}|${creator.open}|${zoo.isOpen}|${stations.station}`;
  if (takes !== keysTaken) { keysTaken = takes; input.release(); notable("screen", "Active screen changed", { studio: studio.at, chart: chartOpen(), telescope: telescope.on, creator: creator.open, zoo: zoo.isOpen, station: stations.station }); }
  // While a station's panel, the map table's chart, the telescope or an instrument is open she stands still, the movement keys its
  // buttons (Ed, 2026-10-26: "walking away shouldn't work - then we can use the movement keys as buttons in the menus"), and the use
  // button (E; the pad's back, ○, since Ed's layout of 2026-10-28; a tap on touch) closes it: that press is the close and nothing else, even when the thing
  // open closed itself on it a moment before (the chart and the instruments take E themselves), so it never opens it again.
  const raw = input.read(), openNow = chartOpen() || telescope.on || !!studio.at || !!stations.station || booth.isOpen, shutTap = !freeze.frozen && !!(raw.sigil || raw.place) && (openNow || openPrev); // (E is `place`; the pad's back, ○, and a tap `sigil`; never under the pause)
  if (shutTap) { if (booth.isOpen) booth.close(); if (stations.station) shutStation("E"); if (studio.at) studio.leave(); if (chartAt && chartOpen()) { chartAt = null; closeChart(); } } // (the telescope: its own step, below)
  const human = openNow || shutTap ? stillControls(raw) : raw;
  telescope.device = input.device;
  if (telescope.on) { if (telescope.night !== game || game.witches[0].ko || chartOpen() || !tuning.telescope) telescope.close(); else telescope.step({ ...raw, sigil: !!(raw.sigil || raw.place) }, dt, tuning.telescope); } // (E or ○ leaves it)
  view.telescope = tuning.telescope ? telescope.look(tuning.telescope) : null;
  // The sea chart over the night (the transition review, 2026-10-19: the night ran and drew on behind it, and its art workers drew
  // on, so the chart's islands and the next island's art drawn ahead got what was left): while it's open the night is paused,
  // nothing is drawn (the canvas keeps its last frame), and no new art is handed to the workers; closed, all as it was.
  const charting = chartOpen();
  if (charting !== chartHeld) mutate("house: chart pause", () => { chartHeld = charting; view.assets.hold(charting); if (charting) { chartWasPaused = game.clock.paused; game.clock.paused = true; } else game.clock.paused = chartWasPaused; });
  // A bot game: the bot's controls, not hers (the camera's zoom and the debug key still hers).
  const c: typeof human = bot ? { ...bot.decide(game), zoom: human.zoom, debug: human.debug, toggleAutoTalk: false } : human;
  if (bot) botTag?.update(bot.doing);
  if (F.castWanted && !game.clock.paused) { if (awaitingSpell(game.party)) c.castParty = !bot; else F.castWanted = false; }
  if (c.toggleAutoTalk) setAutoTalk(!autoTalk);
  // Choosing at a station (the pointer or the d-pad in its panel, or stood still a moment): the camera eases in on her; she moves, out.
  if (c.moveX || c.moveZ) { stations.walked(); stillAt = 0; } else stillAt += dt;
  c.framing = !!stations.station && (stations.choosing || stillAt > 0.4);
  c.framePart = c.framing ? stations.framePart : null; // (zoomed on the part of her being chosen: camera.station.parts)
  view.hatOff = stations.bareHead; // (her hat off at the dressing table, so her face and hair show)
  c.autoTalk = autoTalk;
  if (c.debug) hud.setDebug(!hud.debugOn);
  view.debugReadouts = hud.debugOn;
  const step0 = performance.now();
  const recordedInput = JSON.stringify(c);
  if (recordedInput !== lastRecordedInput || game.clock.time - lastInputAt >= 1) { breadcrumbs.add(game, "input", c); lastRecordedInput = recordedInput; lastInputAt = game.clock.time; }
  if (params.get("cauldron") !== "0" && !game.cauldron) mutate("cauldron: enable", () => enableCauldron(game, homeMushroomPickups(game))); // (on by default, Ed 2026-10-30; ?cauldron=0 turns it off)
  recordedStep(game, c, fightDt(dt * (botTag?.speed ?? 1)), BUILD, captureRecording); // Same stepGame and original controls; tape is diagnostic only.
  for (const [kind, events] of [["ko", game.koEvents], ["quest", game.questEvents], ["spell", game.combat.spells?.events ?? []]] as const) for (const event of events) { breadcrumbs.add(game, kind, event); if (kind !== "spell") notable(kind, `${kind} event`, event); }
  rumble.update(game, currentSettings(), input.device === "pad" && !document.hidden ? [freeze.pad()] : [], now);
  // ?debug=attack: every 10 s, a few seconds of blows on the two soundsystems farthest from her (never felling one), so the
  // 🔇 alarm (render/alarm.ts) shows whenever she's away from them.
  if (ATTACK_DEBUG && !game.clock.paused) { const tt = game.clock.time, ph = tt % 10; if (ph < 4 && Math.floor(tt * 2) !== F.attackTick) { F.attackTick = Math.floor(tt * 2); debugBlows(game.combat.sounds, game.combat.events, game.witch.x, game.witch.z, tt); } }
  const stepMs = performance.now() - step0;
  measuredStep = stepMs; measuredParts["update.input-and-rules"] = stepMs;
  // E at the treehouse deck's map table (rules/treehouse.ts): the sea chart over the game, to sail from at any time (Ed, 2026-10-11:
  // "Sail anytime"); mid-night that ends the night unwon: played, nothing found (app/chartSave.ts), as a loss.
  if (!bot) for (const e of game.leashEvents) if (e.kind === "house" && e.obj) useHouse(e.obj);
  // Tonight's find (rules/finds.ts): the night's one draw over everything she hasn't found, a wearable (the trunk) or a broom part
  // (a wreck), made once a night; taken, it's hers for the night, on loan till she sleeps (app/loan.ts; Ed, 2026-10-24): to wear
  // or use at once, never saved unless the night's won.
  if (game.trunk && game.trunk.item === null) mutate("finds: fill trunk", () => fillTrunk(game, foundAll(findsCtx())));
  for (const e of game.leashEvents) if (e.kind === "found" && e.obj && e.find) {
    mutate("finds: loan", () => lendFind(e.find!, e.obj!));
    if (e.find === "part") hud.found(`found: ${partById(e.obj)?.name.toLowerCase() ?? e.obj} · at the Workshop`); // (not fitted: the bay fits it)
    else if (e.find === "hat") hud.found(`found: the ${hatSpell(e.obj)?.name.toLowerCase() ?? e.obj} hat · on the hats' floor`); // (the rules laid it there: rules/houseRooms.ts addFloorHat)
    else { const it = itemById(e.obj), at = stationsShowing(shelfOf(e.obj)?.id ?? "")[0], where = HOUSE_ROOMS.objects.find(q => q.id === at)?.label.toLowerCase(); hud.found(`found: ${it?.name.toLowerCase() ?? e.obj}${where ? ` · at the ${where}` : ""}`); }
  }
  if (spawnWanted && !game.witch.perch && game.witch.mode === "ground" && !game.witch.seated) {
    const [k, i] = spawnWanted.includes(":") ? spawnWanted.split(":") : [null, null];
    const said = spawnHere(k as FindKindId | null, i);
    if (!said.startsWith("no clear ground")) { console.log(`spawnfind: ${said}`); spawnWanted = null; }
  }
  // The station she's at (lit, E over it: render/houseRooms.ts); E there slides its panel in (Ed's playtest, 2026-10-26: "Menus should
  // open when she presses E near an interactive object ... instead of them opening automatically just through proximity"); walking
  // off it, out (not over her room open full screen, the chart, or a bot's game). E again or the pad's ○ slides it out (Esc pauses over it, platform/freeze.ts) (Ed: "I think E should also close, and we can have spacebar to select"; the frame's start), she standing still at it; Space chooses in it (ui/stationPanel.ts).
  const station = bot || creator.open || charting ? null : stationOf(game, stations.station), shelves = station ? shelvesAt(station.id) : null;
  stations.setLoaned(loan?.id ?? null); // (its card sparkles: ui/stationPanel.ts)
  if (stations.station && station?.id !== stations.station) shutStation(`off it (${station?.id ?? "none"}${charting ? ", charting" : ""}${creator.open ? ", creator" : ""})`); // (she's somehow off it: a knockout, a new night; E closes it above)
  if (station && shelves && station.id !== stations.station && usedAt(game) === station.id) { const g = (page.look() ?? creator.genome()) as Record<string, unknown>; stations.open(station.id, shelves, g as never, ownedToChoose(findsCtx().owned()), game.wake && firstEver && !game.wake.yesterday && station.id === "dressingTable" ? "First night · pick your look here, and at the wardrobe, cloak pegs and shoe rack" : "", shelves.some(q => q.slot || q.board) ? workshopNow() : null, !!game.wake?.pile?.includes(STATION_SLOT[station.id])); }
  else if (!shelves && stations.station) shutStation("no shelves");
  stations.update(performance.now() / 1000); booth.update(performance.now() / 1000);
  // The telescope: E at it looks (useHouse); E or ○ shuts it (its own step; Esc pauses over it); and should she somehow be off it, it shuts.
  const scope = bot || creator.open || sailing || charting ? null : stationOf(game, telescope.on ? scopeAt : null, tuning, ["telescope"]);
  if (!scope && telescope.on && scopeAt) { telescope.close(); scopeAt = null; }
  input.dpadMenu = !!stations.station || booth.isOpen || telescope.on || !!studio.at || chartOpen(); // (a menu owns the pad: a station's panel, the telescope, an instrument, the map table's chart; only its back, circle, closes it: Ed's layout, 2026-10-28)
  openPrev = chartOpen() || telescope.on || !!studio.at || !!stations.station || booth.isOpen;
  shutButton.style.display = openPrev && input.device === "touch" ? "block" : "none"; // (on touch, a way to close it: the tap keycap)
  // (the use prompts, render/houseRooms.ts: the button on what she plays with, and none over what's open)
  view.useDevice = input.device; stations.setDevice(input.device); booth.setDevice(input.device); studioPanel.setDevice(input.device); view.houseOpen = stations.station ?? studio.state.players[0].object ?? (telescope.on ? scopeAt : null) ?? chartAt;
  // The new opening's wake-up (rules/wakeUp.ts, render/wakeUp.ts): its card, the dark and her phone; its beats marked for ?timing=1,
  // and the first time she comes to the dressing table; the island's art latched drawn (marked, nothing waits on it).
  if (!game.islandReady && F.ready && F.artRevealed && (mistGateOff || view.islandDrawn())) { game.islandReady = true; mark("island:ready"); } // (latched: the island's own art drawn, render/view.ts islandDrawn; its time marked for ?timing=1)
  showLook(); // (what she has on: last night's pile as it stands, rules/clothesPile.ts)
  // Her dream of tonight's loan (render/dream.ts): a key the rules took (the pad's too) ends it; ended, the alarm rings (endDream).
  if (dream && dreamAsleep) {
    if (game.wake?.beat === "dream" && dream.over) mutate("wake: dream complete", () => endDream(game, game.herTime));
    else if (game.wake && game.wake.beat !== "dream" && !dream.over) dream.end();
  }
  if (dream && !dream.canvas.isConnected) dream = null;
  // The on-loan icon, top left (render/loanIcon.ts): tonight's find once she's taken it, till she sleeps.
  { const lf = loanFind(game, game.map.treehouse.x, game.map.treehouse.z); loanIcon.set(bot ? null : lf?.item ?? null, () => (lf ? findCanvas(findKind(lf.kind).piece(lf.item), view.assets.style) : null)); loanIcon.draw(now / 1000); }
  if (game.wake) {
    for (const e of game.wake.events) { mark(`opening:${e}`); if (e === "up") woke(); if (e === "mirror") sawMirror(); if (e === "dressed") sound.sfx?.spell("rustle", 0.6); if (e === "booth") booth.open(ownedRecords(), lastRecord()); } // (dressed: a rustle of clothes) // (the dressing table's mirror: its panel on E, as every station's)
    if (creator.open || stations.station) wakeCard?.hide(); // (at the mirror: its panel over it)
    else (wakeCard ??= new WakeCard()).update(game, game.herTime, dt, () => sound.sfx?.alarm());
  } else if (!sailing && !bootAsleep) wakeCard?.hide(); // (asleep while the next night's made: kept up)
  if (!bot) stepGuide(now);
  // The tables (the map table's sea chart): E at one brings its chart up, as the stations' panels (Ed's playtest, 2026-10-26).
  const table = bot || creator.open || sailing || F.ready === false ? null : tableOf(game, chartAt);
  if (table && table.use.kind === "chart" && !chartOpen() && game.leashEvents.some(e => e.kind === "chart")) chartOverNight(table.id);
  // The night's end (Ed, 2026-10-26: "Remove the end cards"): no card, won or lost; the guidance pins lead her home (rules/guidance.ts).
  // The night won (rules/win.ts): the islands its woken legends showed recorded on the sea chart (app/chartSave.ts), once, as its
  // finale settles; the enraged legends' (win.lost) not.
  if (game.win?.settled && !F.chartRecorded) { F.chartRecorded = true; nightOver(tuning.map?.island ?? "", { won: true, found: game.win.found }, undefined, tuning.map?.world ?? 0); if (warmOn) warmChart(chartWorld(), loadSave().found); } // (in the campaign's world only; home grows with what she's found: made again ahead)
  // The touch spell button only with a broom that has a spell to cast (rules/spells.ts castable).
  { const want = castable(game.spells) ? "" : "none"; if (spellButton && spellButton.style.display !== want) spellButton.style.display = want; }
  newBuild.update(creator.open || freeze.frozen || menuGone); // (a newer build is out: in the bedroom and on the pause page)
  // The party's over (rules/partyOver.ts; Ed, 2026-10-06): no end screen and no pause, the afterparty; once it has eased in, the
  // night recorded on the sea chart as played (losing loses nothing).
  if (game.partyOver && game.partyOver.ease >= 1 && !F.overRecorded) {
    F.overRecorded = true;
    nightOver(tuning.map?.island ?? "", { won: false }, undefined, tuning.map?.world ?? 0);
  }
  const log0 = performance.now();
  playtest.update();
  const audio0 = performance.now();
  // The music: one track, mixed by how near the witch is to a playing soundsystem.
  const cue = N().musicCue = musicCue(game, N().musicCue);
  sound.update(game, cue, creator.open);
  // The soundsystem spell's analyser bars (render/leash/stones.ts): the mix's spectrum, read once a frame only while its ring shows, and
  // only while the audio runs (else the bars idle gently).
  { const SV = view.leashView.stoneView; SV.spectrum = SV.wantsSpectrum && sound.audio?.state === "running" ? sound.music?.spectrum() ?? null : null; }
  const meter0 = performance.now();
  if (sound.audio) {
    meter.tap(sound.audio, [sound.music?.output, sound.music?.circleOutput, sound.sfx?.output]);
    meter.read(performance.now(), sound.musicExpected());
    const shedS = Math.floor(performance.now() / 1000);
    if (shedS !== lastShedS) { lastShedS = shedS; const cw = meter.clockWatch, why = sound.shedCheck(shedS, cw.underruns, cw.drift); if (why) { playtest.audio(why); console.warn(`audio: ${why}`); } }
    if (micWanted && !meter.mic && startedNights.has(game)) meter.startMic(e => {
      const pageS = performance.now() / 1000;
      N().playtest.mic({ kind: e.kind, t: Math.round(N().game.clock.time * 10) / 10, dur: Math.round(e.dur * 100) / 100, outDb: e.outDb, micDb: e.micDb, lag: Math.round(e.lag * 1000), stall: nearestStall(pageS) });
    });
  }
  const outside = { playtest: audio0 - log0, audio: performance.now() - audio0 }; // (for the stall log: not the view's own parts)
  measuredParts["update.playtest"] = outside.playtest; measuredParts["update.audio"] = outside.audio;
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
  if (game.zooExit !== undefined && !zooLeaving) { zooLeaving = true; leaveZoo(); } // (her way out of the zoo: its little treehouse, or its edge; app/zooExit.ts)
  // Behind the start screen, a frame every 0.3 s is plenty: the CPU goes to drawing the forest's
  // art in the background instead (and so slow a frame doesn't count against the scenery budget).
  // (arriving: the flight's shot on the view, every frame; landed, the night starts)
  const flying = !!arrival && !F.landed && F.ready;
  if (flying && arrival!.frame(view, game, now)) arrived();
  // The pad on the pause page and Settings: before the chart's or the zoo's early return, so it works paused over the chart too.
  updatePauseMenus(now);
  if (chartHeld || zooHeld) return; // (the sea chart or the zoo over the night: its last frame kept, nothing drawn)
  if (game.clock.paused && !freeze.frozen && !flying && now - lastDraw < 300) return;
  lastDraw = now;
  // Drawn between the last two fixed steps (game time: party transitions, sigils and waves are stamped in it).
  frameStats.beginGpu();
  // (a 💌 filling a ring holds the picture a few frames, a hitstop: the last frame kept, the rules running on; render/impact.ts)
  const held = holding(performance.now());
  if (!held) interpolated(game, () => drawFrame(Math.max(0, game.clock.time - (1 - game.alpha) * STEP * game.timeScale))); // (the world's step is STEP x timeScale: rules/slowTime.ts)
  if (!held) drew(performance.now());
  fightFrame((x, y, z) => view.screenOf(x, y, z)); // (the Fight Arena's telegraph timings, if it's on)
  frameStats.endGpu();
  aimHud.update(game, game.herTime, input.cursor, input.lastAim, startedNights.has(game) && !bot);
  frameStats.work(performance.now() - work0);
  perfHud?.frame(now, dt * 1000, stepMs, !game.clock.paused && !freeze.frozen);
  shake.apply();
  freeze.update();
  // The overlay (app/hud.ts), four times a second.
  hud.overlay(now, overlayHead);
}
/** The pause/menu path is also live while a limited arrival holds the entire simulation asleep. */
function updatePauseMenus(now: number): void {
  settingsPage.update(now / 1000);
  const corner = cornerPanelRoot(), pauseRoots = freeze.frozen && !settingsPage.open ? (corner ? [corner] : [document.getElementById('pause-sliders'), pauseBtns].filter((el): el is HTMLElement => !!el)) : [];
  const opened = pauseRoots.length ? freeze.takeOpenPad() : undefined;
  if (pauseFocus.update(pauseRoots, freeze.pad(), now / 1000, () => { if (corner) closeCornerPanel(); else freeze.toggle(); }, corner ? undefined : opened)) input.device = 'pad';
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
    gpuLine(view),
    ...(game.lod ? [`sim    full ${game.lod.full}  coarse ${game.lod.coarse}  frozen ${game.lod.frozen}   marching full ${game.lod.marchFull}  coarse ${game.lod.marchCoarse}`] : []),
  ];
}
requestAnimationFrame(frame);


// For the smoke test, the tools and for poking at in the console (app/hooks.ts).
installHooks({ night: N, view, sound, meter, shake, frameStats, ladder, loadTimes, loop, advance: (game, controls, dt) => recordedStep(game, controls, dt, BUILD, captureRecording) });
// witch.take(kind, item): tonight's find taken where she stands, as E at it takes it (the kind's claim, the hats' floor, the loan):
// for the tools (tools/loan/shots.cjs) to look at a night with a find on loan without walking to it.
(window as unknown as { witch: Record<string, unknown> }).witch.compareKey = keyNow;
(window as unknown as { witch: Record<string, unknown> }).witch.take = (kind: FindKindId, id: string): boolean => {
  const { game } = N(), k = FIND_KINDS.find(q => q.id === kind), W = game.witches[0];
  if (!k?.items.includes(id)) return false;
  const c = game.map.cellSafe(game.witch.x, game.witch.z).cell;
  game.trunk = { x: game.witch.x, z: game.witch.z, cell: [c[0], c[1]], kind, item: id, found: true };
  k.claim?.(W.spells, id);
  if (kind === "hat") addFloorHat(W, id);
  lendFind(kind, id);
  return true;
};
// witch.dream("won" | "lost", kind, item): her dream of such a loan over the night, its own dark under it (as ?dream=); under ?shot=
// drawn only when asked, window.__dream.draw(seconds) (tools/loan/shots.cjs).
// window.witch.guide: her guidance pin's state, what's kept of it (what's new, the islands seen) the pickups' hooks, and a step of it (window.witch.frame's manual frames don't run the page's loop: shots).
// window.witch.wakeUp(yesterday): a wake-up in her bed as the game starts one (rules/wakeUp.ts startWake), with or without a night
// played before it (the shots of the first morning's hat on the hats' floor, and of last night's pile).
(window as unknown as { witch: Record<string, unknown> }).witch.wakeUp = (yesterday: boolean): boolean => { const { game } = N(); return wakeInBedroom(game) && startWake(game, game.herTime, { yesterday }); };
// window.witch.stationShuts: the station panels' last closes, why, when, and whether paused (the pause check's broom bay, closed
// under the pause on the slow runner now and then: tools/smoke/pause-on-top.cjs prints them when a row fails).
(window as unknown as { witch: Record<string, unknown> }).witch.stationShuts = stationShuts;
(window as unknown as { witch: Record<string, unknown> }).witch.guide = { save: guide, pin: () => guidePin.state, hooks: GUIDANCE_HOOKS, step: () => stepGuide(performance.now()) };
(window as unknown as { witch: Record<string, unknown> }).witch.dream = (v: string, kind: FindKindId, id: string): boolean => {
  if (!FIND_KINDS.some(q => q.id === kind && q.items.includes(id))) return false;
  startDream({ loan: lend(kind, id, { look: null, hat: "none", parts: N().game.witches[0].spells.parts }), won: v === "won" }, true);
  return true;
};
// ?debug=sail (docs/plans/sail-without-reload.md, PR 4b): another night in place, made as a sail will make one (app/night.ts
// startNight, the view taking it: View.setGame), its start's art made and play started as the start screen's would; for
// tools/sail/swap.cjs.
if (params.get("debug") === "sail") (window as unknown as { witch: Record<string, unknown> }).witch.debugSwap = async (seed: number, island?: string): Promise<number> => {
  const p = new URLSearchParams(params), was = N().spec;
  p.set("seed", String(seed));
  if (island !== undefined) p.set("island", island);
  sailing = true;
  loan = null; // (a debug swap: tonight's loan, if any, just gone)
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
// window.witch.chart(): the sea chart over the night, as the map table opens it (tools/smoke/quick.cjs: choosing her own island).
(window as unknown as { witch: Record<string, unknown> }).witch.chart = () => chartOverNight();
// The bestiary book's zoo over the night, for the tools (tools/zoo/perf.cjs): open and close it as the book and its × do.
(window as unknown as { witch: Record<string, unknown> }).witch.zooOverlay = zoo;
// The Studio's instruments for the tools (tools/studio/check.cjs): where she's at and what it plays (its meter).
(window as unknown as { witch: Record<string, unknown> }).witch.studio = studio;
// The telescope for the tools (tools/telescope/shots.cjs, tools/stars/shots.cjs): look through it pointed at a bearing and zoom (0
// wide, 1 close) and an elevation (degrees up; its lowest if not given), or stop.
(window as unknown as { witch: Record<string, unknown> }).witch.telescope = {
  look: (heading: number, zoom: number, elevation?: number) => { const { game, tuning } = N(); if (!tuning.telescope) return false; telescope.open(game, tuning.telescope); telescope.point(heading, zoom, tuning.telescope, elevation); view.telescope = telescope.look(tuning.telescope); return true; },
  close: () => { telescope.close(); view.telescope = null; },
  get on() { return telescope.on; },
  get aim() { return telescope.aiming; },
};
(window as unknown as { witch: Record<string, unknown> }).witch.sail = (island: string, seed: number, o: { end?: FlightEnd | null; fail?: boolean } = {}): Promise<boolean> => {
  sailFail = !!o.fail && params.get("debug") === "sail";
  const world = chartWorldArg(), end = o.end === null ? undefined : o.end ?? { cam: { x: 0, z: 700, height: 260, pitch: 0.45, fov: 40, speed: 60 }, still: "" };
  return sailFromChart(sailHref(island, seed, world, location.href), { island, seed, world, end });
};
// Known synchronous console mutations use declared boundaries too. Arbitrary direct writes to witch.game remain detectable replay failures.
{
  const hooks = (window as unknown as { witch: Record<string, unknown> }).witch;
  for (const name of ["arena", "arenaAttack", "shot", "guest", "lose", "rainbow", "hit", "take", "wakeUp", "dream"]) {
    const action = hooks[name];
    if (typeof action === "function") hooks[name] = (...args: unknown[]) => mutate(`debug: ${name}`, () => Reflect.apply(action, hooks, args));
  }
}
