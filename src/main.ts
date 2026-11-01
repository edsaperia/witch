import { browserSaveSlots, slotStorage, switchSave } from "./app/saveSlots";
// Starts the prototype: the seed from the URL, the game rules, the view, input, and the loop.


import { keycapCanvas } from "./ui/keyHint";
import { fillControls } from "./ui/controlsText";

import { bindings } from "./platform/bindings";
import { Rumble } from "./platform/rumble";


import { chartOpen, prepareChart, type Sailed } from "./ui/chartOverlay";
import { opensDirectly, opensInBedroom, opensWithCreator } from "./app/opening";


import { LandingSleep } from './app/landingSleep';
import { wornGenome } from "./rules/clothesPile";
import { WakeCard } from "./render/wakeUp";

import { MenuFocus } from "./ui/menuFocus";
import { sinceSail, timingOn, transitionTiming, watchLongTasks } from "./app/timing";
import "./platform/tuningPreset"; // (first: ?tuning=pre-overnight writes the old balance over the config before anything reads it)
import { FrameStats } from "./platform/frameStats";
import { gpuName, QualityLadder } from "./app/ladder";

import { areaUnderWitch, type Game } from "./rules/game";

import { TUNING, type Tuning } from "./rules/tuning";
import { type Shot } from "./rules/arrive";

import { compareKey } from "./app/compareKey";
import { debugText, machineLines, precisionLines, reproLine, reproQuery, reproState, tuningDiff } from "./app/repro";
import { currentValue, DECISION_LIST, valuesText } from "./ui/decisions";

import { parseSeed } from "./rules/map";
import { Input } from "./platform/input";
import { View } from "./render/view";
import { prewarmArtWorkers } from "./render/assets";
import { AimHud } from "./render/aimhud";
import { StallLog } from "./platform/stallLog";
import { Freeze } from "./platform/freeze";
import { StudioPlayer } from "./app/studio";
import { StudioPanel } from "./ui/studioPanel";
import { Creator, loadGenome } from "./ui/creator";
import { BOT_KINDS, type BotKind } from "./rules/botKinds";
import type { Bot } from "./rules/bot";
import type { BotTag } from "./ui/botGame";

import type { DecidePanel } from "./ui/decide";



import { installEdLayout } from "./rules/houseRooms";
import { setEdLayoutActive } from "./rules/housePlacement";


import { FIND_KINDS, type FindKindId } from "./rules/finds";
import { migrateBroom } from "./app/broomSave";




import { type FindsCtx } from "./app/finds";
import { lend, loanName, type Loan } from "./app/loan";
import { DreamView } from "./render/dream";
import { LoanIcon } from "./render/loanIcon";
import { FindsPanel } from "./ui/findsPanel";



import { StationPanel, type WorkshopCtx } from "./ui/stationPanel";
import { DjBooth } from "./ui/djBooth";

import { ZooOverlay, domZooHost, zooUrl } from "./app/zooOverlay";

import { TelescopeView } from "./app/telescope";
import { loadSave, worldSeed } from "./app/chartSave";
import { readZooCoasts } from "./app/zooCoasts";

import { loadGuide } from "./app/guideSave";
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
import { SettingsPage } from "./app/settingsPage";
import { playerPick as makePlayerPick } from "./app/playerPick";


import { PerfHud } from "./app/perfHud";
import { keepAtlasPixels } from "./render/atlas";
import { installPixelUi } from "./ui/pixelUi";


import { hydrateMs, prepUsed, startBootMapPrep } from "./app/mapPrep";
import { startNight, wearHat as wear, type Night, type NightSpec, type Page } from "./app/night";
import { BackGuard, type NightWay } from "./app/sail";
import { hudFade } from "./app/arrive";
import { forgetArrival, type Arrival } from "./app/arrival";
import { shotParams } from "./app/shot";
import type { FlightEnd } from "./render/chart/seaChart";
import { restoreGame } from "./rules/nightSnapshot";
import { browserNightStore, captureNight, nightHasStarted, NightAutosave, savedNight, savesEnabled, type SavedNight, type NightStore } from "./app/nightSave";
import { Breadcrumbs, browserCommentStore, CommentBook } from "./app/playtestComments";

import { logCaughtError } from "./platform/playtestLog";
import { currentJournal, journalEntry, notable } from "./platform/playtestJournal";
import { pageMutation, pageFocus } from "./app/recordingHooks";


import { nightSaveNotice } from "./ui/resumeNight";
import { restoreSettingsBase } from "./app/playerSettings";

import { openPotionLab as a4_openPotionLab, pauseControls as a4_pauseControls, updatePauseMenus as a4_updatePauseMenus, openMusicLab as a4_openMusicLab, installPause1 as a4_installPause1, installPause2 as a4_installPause2, installPause3 as a4_installPause3, installPause4 as a4_installPause4, installPause5 as a4_installPause5, installPause6 as a4_installPause6, installPause7 as a4_installPause7, installPause8 as a4_installPause8, installPause9 as a4_installPause9 } from "./app/pagePause";
import { shutStation as a4_shutStation, findsCtx as a4_findsCtx, workshopNow as a4_workshopNow, useHouse as a4_useHouse, installStations1 as a4_installStations1, installStations2 as a4_installStations2, installStations3 as a4_installStations3, installStations4 as a4_installStations4, installStations5 as a4_installStations5, installStations6 as a4_installStations6, installStations7 as a4_installStations7, installStations8 as a4_installStations8, installStations9 as a4_installStations9, installStations10 as a4_installStations10, installStations11 as a4_installStations11, installStations12 as a4_installStations12, installStations13 as a4_installStations13, installStations14 as a4_installStations14, installStations15 as a4_installStations15, installStations16 as a4_installStations16 } from "./app/pageStations";
import { revealArt as a4_revealArt, bedFirst as a4_bedFirst, bedFirstNow as a4_bedFirstNow, arrived as a4_arrived, arrivedNow as a4_arrivedNow, wakeArrival as a4_wakeArrival, wakeArrivalNow as a4_wakeArrivalNow, start as a4_start, startDirect as a4_startDirect, dressCreator as a4_dressCreator, chartOverNight as a4_chartOverNight, chartWorldArg as a4_chartWorldArg, sailFromChart as a4_sailFromChart, recordSail as a4_recordSail, departFromChart as a4_departFromChart, wakeFirst as a4_wakeFirst, wakeFirstNow as a4_wakeFirstNow, sailInPlace as a4_sailInPlace, makeSailNight as a4_makeSailNight, warmAt as a4_warmAt, newNight as a4_newNight, nightInPlace as a4_nightInPlace, leaveBot as a4_leaveBot, chartWorld as a4_chartWorld, soundNote as a4_soundNote, armSkip as a4_armSkip, queueCast as a4_queueCast, armBack as a4_armBack, wokenBefore as a4_wokenBefore, woke as a4_woke, mirrored as a4_mirrored, sawMirror as a4_sawMirror } from "./app/pageNight";
import { lendFind as a4_lendFind, settleLoan as a4_settleLoan, settleLoanNow as a4_settleLoanNow, startDream as a4_startDream, herHead as a4_herHead, stepGuide as a4_stepGuide, partsNow as a4_partsNow } from "./app/pageFinds";
import { botGame as a4_botGame, saveComment as a4_saveComment, restoreComment as a4_restoreComment, spawnHere as a4_spawnHere, spawnHereNow as a4_spawnHereNow, decidePanel as a4_decidePanel, keyNow as a4_keyNow, installDebug1 as a4_installDebug1, installDebug2 as a4_installDebug2, installDebug3 as a4_installDebug3, installDebug4 as a4_installDebug4, installDebug5 as a4_installDebug5, installDebug6 as a4_installDebug6, installDebug7 as a4_installDebug7, installDebug8 as a4_installDebug8, installDebug9 as a4_installDebug9, installDebug10 as a4_installDebug10, installDebug11 as a4_installDebug11, installDebug12 as a4_installDebug12, installDebug13 as a4_installDebug13, installDebug14 as a4_installDebug14, installDebug15 as a4_installDebug15, installDebug16 as a4_installDebug16, installDebug17 as a4_installDebug17, installDebug18 as a4_installDebug18, installDebug19 as a4_installDebug19, installDebug20 as a4_installDebug20, installDebug21 as a4_installDebug21, installDebug22 as a4_installDebug22, installDebug23 as a4_installDebug23, installDebug24 as a4_installDebug24, installDebug25 as a4_installDebug25, installDebug26 as a4_installDebug26, installDebug27 as a4_installDebug27, installDebug28 as a4_installDebug28, installDebug29 as a4_installDebug29, installDebug30 as a4_installDebug30 } from "./app/pageDebug";
import { drawFrame as a4_drawFrame, frame as a4_frame, frameBody as a4_frameBody, overlayHead as a4_overlayHead } from "./app/pageFrame";
import { createBuildNotice as a4_createBuildNotice, installBuildNotice1 as a4_installBuildNotice1 } from "./app/pageBuildNotice";

const pageHost = {
  get ATTACK_DEBUG(): typeof ATTACK_DEBUG { return ATTACK_DEBUG; },
  get BUILD(): typeof BUILD { return BUILD; },
  get HUD_IDS(): typeof HUD_IDS { return HUD_IDS; },
  get MIRROR_KEY(): typeof MIRROR_KEY { return MIRROR_KEY; },
  get N(): typeof N { return N; },
  get SLOW_AUDIO(): typeof SLOW_AUDIO { return SLOW_AUDIO; },
  get TIMING(): typeof TIMING { return TIMING; },
  get WOKEN_KEY(): typeof WOKEN_KEY { return WOKEN_KEY; },
  get aimHud(): typeof aimHud { return aimHud; },
  get armBack(): typeof armBack { return armBack; },
  get armSkip(): typeof armSkip { return armSkip; },
  get arrived(): typeof arrived { return arrived; },
  get arrivedNow(): typeof arrivedNow { return arrivedNow; },
  get autoTalk(): typeof autoTalk { return autoTalk; }, set autoTalk(value: typeof autoTalk) { autoTalk = value; },
  get backArmed(): typeof backArmed { return backArmed; }, set backArmed(value: typeof backArmed) { backArmed = value; },
  get backGuard(): typeof backGuard { return backGuard; },
  get bedFirst(): typeof bedFirst { return bedFirst; },
  get bedFirstNow(): typeof bedFirstNow { return bedFirstNow; },
  get bootAsleep(): typeof bootAsleep { return bootAsleep; }, set bootAsleep(value: typeof bootAsleep) { bootAsleep = value; },
  get booth(): typeof booth { return booth; },
  get bot(): typeof bot { return bot; }, set bot(value: typeof bot) { bot = value; },
  get botGame(): typeof botGame { return botGame; },
  get botKind(): typeof botKind { return botKind; }, set botKind(value: typeof botKind) { botKind = value; },
  get botTag(): typeof botTag { return botTag; }, set botTag(value: typeof botTag) { botTag = value; },
  get breadcrumbs(): typeof breadcrumbs { return breadcrumbs; },
  get canvas(): typeof canvas { return canvas; },
  get captureRecording(): typeof captureRecording { return captureRecording; },
  get chartAt(): typeof chartAt { return chartAt; }, set chartAt(value: typeof chartAt) { chartAt = value; },
  get chartFound(): typeof chartFound { return chartFound; }, set chartFound(value: typeof chartFound) { chartFound = value; },
  get chartHeld(): typeof chartHeld { return chartHeld; }, set chartHeld(value: typeof chartHeld) { chartHeld = value; },
  get chartOverNight(): typeof chartOverNight { return chartOverNight; },
  get chartWasPaused(): typeof chartWasPaused { return chartWasPaused; }, set chartWasPaused(value: typeof chartWasPaused) { chartWasPaused = value; },
  get chartWorld(): typeof chartWorld { return chartWorld; },
  get chartWorldArg(): typeof chartWorldArg { return chartWorldArg; },
  get commentBook(): typeof commentBook { return commentBook; },
  get creator(): typeof creator { return creator; },
  get decide(): typeof decide { return decide; }, set decide(value: typeof decide) { decide = value; },
  get decideLoading(): typeof decideLoading { return decideLoading; }, set decideLoading(value: typeof decideLoading) { decideLoading = value; },
  get departFromChart(): typeof departFromChart { return departFromChart; },
  get departing(): typeof departing { return departing; }, set departing(value: typeof departing) { departing = value; },
  get devFinds(): typeof devFinds { return devFinds; },
  get drawFrame(): typeof drawFrame { return drawFrame; },
  get dream(): typeof dream { return dream; }, set dream(value: typeof dream) { dream = value; },
  get dreamAfterDive(): typeof dreamAfterDive { return dreamAfterDive; }, set dreamAfterDive(value: typeof dreamAfterDive) { dreamAfterDive = value; },
  get dreamAsleep(): typeof dreamAsleep { return dreamAsleep; }, set dreamAsleep(value: typeof dreamAsleep) { dreamAsleep = value; },
  get dreamNext(): typeof dreamNext { return dreamNext; }, set dreamNext(value: typeof dreamNext) { dreamNext = value; },
  get dressCreator(): typeof dressCreator { return dressCreator; },
  get dressed(): typeof dressed { return dressed; }, set dressed(value: typeof dressed) { dressed = value; },
  get findsCtx(): typeof findsCtx { return findsCtx; },
  get findsPanel(): typeof findsPanel { return findsPanel; },
  get firstEver(): typeof firstEver { return firstEver; }, set firstEver(value: typeof firstEver) { firstEver = value; },
  get fit(): typeof fit { return fit; },
  get frame(): typeof frame { return frame; },
  get frameBody(): typeof frameBody { return frameBody; },
  get frameStats(): typeof frameStats { return frameStats; },
  get freeze(): typeof freeze { return freeze; },
  get gestured(): typeof gestured { return gestured; }, set gestured(value: typeof gestured) { gestured = value; },
  get guide(): typeof guide { return guide; },
  get guidePin(): typeof guidePin { return guidePin; },
  get herHead(): typeof herHead { return herHead; },
  get input(): typeof input { return input; },
  get keyNow(): typeof keyNow { return keyNow; },
  get keysTaken(): typeof keysTaken { return keysTaken; }, set keysTaken(value: typeof keysTaken) { keysTaken = value; },
  get knobLive(): typeof knobLive { return knobLive; },
  get ladder(): typeof ladder { return ladder; },
  get landingSleep(): typeof landingSleep { return landingSleep; },
  get landingSnoreAt(): typeof landingSnoreAt { return landingSnoreAt; }, set landingSnoreAt(value: typeof landingSnoreAt) { landingSnoreAt = value; },
  get lastDraw(): typeof lastDraw { return lastDraw; }, set lastDraw(value: typeof lastDraw) { lastDraw = value; },
  get lastInputAt(): typeof lastInputAt { return lastInputAt; }, set lastInputAt(value: typeof lastInputAt) { lastInputAt = value; },
  get lastObservedFrame(): typeof lastObservedFrame { return lastObservedFrame; }, set lastObservedFrame(value: typeof lastObservedFrame) { lastObservedFrame = value; },
  get lastRecordedInput(): typeof lastRecordedInput { return lastRecordedInput; }, set lastRecordedInput(value: typeof lastRecordedInput) { lastRecordedInput = value; },
  get lastShedS(): typeof lastShedS { return lastShedS; }, set lastShedS(value: typeof lastShedS) { lastShedS = value; },
  get leaveBot(): typeof leaveBot { return leaveBot; },
  get lendFind(): typeof lendFind { return lendFind; },
  get loadTimes(): typeof loadTimes { return loadTimes; },
  get loan(): typeof loan { return loan; }, set loan(value: typeof loan) { loan = value; },
  get loanIcon(): typeof loanIcon { return loanIcon; },
  get logTiming(): typeof logTiming { return logTiming; },
  get lookNow(): typeof lookNow { return lookNow; }, set lookNow(value: typeof lookNow) { lookNow = value; },
  get loop(): typeof loop { return loop; },
  get makeSailNight(): typeof makeSailNight { return makeSailNight; },
  get measuredDraw(): typeof measuredDraw { return measuredDraw; }, set measuredDraw(value: typeof measuredDraw) { measuredDraw = value; },
  get measuredParts(): typeof measuredParts { return measuredParts; }, set measuredParts(value: typeof measuredParts) { measuredParts = value; },
  get measuredStep(): typeof measuredStep { return measuredStep; }, set measuredStep(value: typeof measuredStep) { measuredStep = value; },
  get menuGone(): typeof menuGone { return menuGone; }, set menuGone(value: typeof menuGone) { menuGone = value; },
  get meter(): typeof meter { return meter; },
  get micWanted(): typeof micWanted { return micWanted; },
  get mirrored(): typeof mirrored { return mirrored; },
  get mistGateOff(): typeof mistGateOff { return mistGateOff; },
  get musicLabLoading(): typeof musicLabLoading { return musicLabLoading; }, set musicLabLoading(value: typeof musicLabLoading) { musicLabLoading = value; },
  get musicLabPanel(): typeof musicLabPanel { return musicLabPanel; }, set musicLabPanel(value: typeof musicLabPanel) { musicLabPanel = value; },
  get mutate(): typeof mutate { return mutate; },
  get nearestStall(): typeof nearestStall { return nearestStall; },
  get newBuild(): typeof newBuild { return newBuild; },
  get newNight(): typeof newNight { return newNight; },
  get nightInPlace(): typeof nightInPlace { return nightInPlace; },
  get openMusicLab(): typeof openMusicLab { return openMusicLab; },
  get openPotionLab(): typeof openPotionLab { return openPotionLab; },
  get openPrev(): typeof openPrev { return openPrev; }, set openPrev(value: typeof openPrev) { openPrev = value; },
  get overlayHead(): typeof overlayHead { return overlayHead; },
  get owned(): typeof owned { return owned; }, set owned(value: typeof owned) { owned = value; },
  get page(): typeof page { return page; },
  get params(): typeof params { return params; },
  get partsNow(): typeof partsNow { return partsNow; },
  get pauseBtns(): typeof pauseBtns { return pauseBtns; }, set pauseBtns(value: typeof pauseBtns) { pauseBtns = value; },
  get pauseControls(): typeof pauseControls { return pauseControls; },
  get pauseFocus(): typeof pauseFocus { return pauseFocus; },
  get pauseLoading(): typeof pauseLoading { return pauseLoading; }, set pauseLoading(value: typeof pauseLoading) { pauseLoading = value; },
  get pauseSliders(): typeof pauseSliders { return pauseSliders; }, set pauseSliders(value: typeof pauseSliders) { pauseSliders = value; },
  get perfHud(): typeof perfHud { return perfHud; },
  get playerPick(): typeof playerPick { return playerPick; },
  get potionLab(): typeof potionLab { return potionLab; }, set potionLab(value: typeof potionLab) { potionLab = value; },
  get queueCast(): typeof queueCast { return queueCast; },
  get recordSail(): typeof recordSail { return recordSail; },
  get reportHost(): typeof reportHost { return reportHost; },
  get repro(): typeof repro { return repro; },
  get restoreComment(): typeof restoreComment { return restoreComment; },
  get revealArt(): typeof revealArt { return revealArt; },
  get rumble(): typeof rumble { return rumble; },
  get sailFail(): typeof sailFail { return sailFail; }, set sailFail(value: typeof sailFail) { sailFail = value; },
  get sailFromChart(): typeof sailFromChart { return sailFromChart; },
  get sailInPlace(): typeof sailInPlace { return sailInPlace; },
  get sailing(): typeof sailing { return sailing; }, set sailing(value: typeof sailing) { sailing = value; },
  get saveComment(): typeof saveComment { return saveComment; },
  get sawMirror(): typeof sawMirror { return sawMirror; },
  get scopeAt(): typeof scopeAt { return scopeAt; }, set scopeAt(value: typeof scopeAt) { scopeAt = value; },
  get seedEl(): typeof seedEl { return seedEl; },
  get setAutoTalk(): typeof setAutoTalk { return setAutoTalk; },
  get settingsPage(): typeof settingsPage { return settingsPage; },
  get settleLoan(): typeof settleLoan { return settleLoan; },
  get settleLoanNow(): typeof settleLoanNow { return settleLoanNow; },
  get shake(): typeof shake { return shake; },
  get shakeEl(): typeof shakeEl { return shakeEl; },
  get showLook(): typeof showLook { return showLook; },
  get shutButton(): typeof shutButton { return shutButton; },
  get shutStation(): typeof shutStation { return shutStation; },
  get skipArmed(): typeof skipArmed { return skipArmed; }, set skipArmed(value: typeof skipArmed) { skipArmed = value; },
  get slowAudioLogged(): typeof slowAudioLogged { return slowAudioLogged; }, set slowAudioLogged(value: typeof slowAudioLogged) { slowAudioLogged = value; },
  get sound(): typeof sound { return sound; },
  get soundNote(): typeof soundNote { return soundNote; },
  get spawnHere(): typeof spawnHere { return spawnHere; },
  get spawnHereNow(): typeof spawnHereNow { return spawnHereNow; },
  get spawnWanted(): typeof spawnWanted { return spawnWanted; }, set spawnWanted(value: typeof spawnWanted) { spawnWanted = value; },
  get spellButton(): typeof spellButton { return spellButton; },
  get stallLog(): typeof stallLog { return stallLog; },
  get start(): typeof start { return start; },
  get startDirect(): typeof startDirect { return startDirect; },
  get startDream(): typeof startDream { return startDream; },
  get startEl(): typeof startEl { return startEl; },
  get startedNights(): typeof startedNights { return startedNights; },
  get stationShuts(): typeof stationShuts { return stationShuts; },
  get stations(): typeof stations { return stations; },
  get stepGuide(): typeof stepGuide { return stepGuide; },
  get stillAt(): typeof stillAt { return stillAt; }, set stillAt(value: typeof stillAt) { stillAt = value; },
  get stillControls(): typeof stillControls { return stillControls; },
  get studio(): typeof studio { return studio; },
  get studioPanel(): typeof studioPanel { return studioPanel; },
  get style(): typeof style { return style; },
  get telescope(): typeof telescope { return telescope; },
  get updatePauseMenus(): typeof updatePauseMenus { return updatePauseMenus; },
  get useHouse(): typeof useHouse { return useHouse; },
  get usedAt(): typeof usedAt { return usedAt; },
  get view(): typeof view { return view; },
  get wakeArrival(): typeof wakeArrival { return wakeArrival; },
  get wakeArrivalNow(): typeof wakeArrivalNow { return wakeArrivalNow; },
  get wakeCard(): typeof wakeCard { return wakeCard; }, set wakeCard(value: typeof wakeCard) { wakeCard = value; },
  get wakeFirstNow(): typeof wakeFirstNow { return wakeFirstNow; },
  get warmAt(): typeof warmAt { return warmAt; },
  get warmOn(): typeof warmOn { return warmOn; },
  get wearHat(): typeof wearHat { return wearHat; },
  get woke(): typeof woke { return woke; },
  get wokenBefore(): typeof wokenBefore { return wokenBefore; },
  get workshopNow(): typeof workshopNow { return workshopNow; },
  get zoo(): typeof zoo { return zoo; },
  get zooHeld(): typeof zooHeld { return zooHeld; }, set zooHeld(value: typeof zooHeld) { zooHeld = value; },
  get zooLeaving(): typeof zooLeaving { return zooLeaving; }, set zooLeaving(value: typeof zooLeaving) { zooLeaving = value; },
  get zooPanel(): typeof zooPanel { return zooPanel; }, set zooPanel(value: typeof zooPanel) { zooPanel = value; },
};
export type PageHost = typeof pageHost;

declare const __BUILD__: string;
const BUILD = typeof __BUILD__ === "string" ? __BUILD__ : "dev";

performance.mark("witch:main"); // (the load's steps, for timing the arrival: witch:main, :game, :view, :ready; app/arrive.ts :landed)
prewarmArtWorkers(); // (the art workers load their code while the night is made: render/assets.ts)
const params = new URLSearchParams(location.search);
setEdLayoutActive(params.get("layout") === "ed");
installEdLayout(params.get("layout") === "ed");
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
        setEdLayoutActive(new URLSearchParams(saved.params).get("layout") === "ed");
        installEdLayout(new URLSearchParams(saved.params).get("layout") === "ed");
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
    } else if (value) { nightStore = null; logCaughtError(new Error("Incompatible format or explicit link"), "save slot: saved night kept"); nightSaveNotice("This saved night has another format, island or layout. It has been kept; this new night will not replace it."); }
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
const partsNow = (): Set<string> => a4_partsNow(pageHost);
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
const queueCast = (): void => a4_queueCast(pageHost); // (a night woken in her bedroom: E at her decks casts it, rules/wakeUp.ts)
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
const chartWorld = (): number => a4_chartWorld(pageHost);
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
a4_installPause1(pageHost);
a4_installPause2(pageHost);
a4_installPause3(pageHost); // (in the bedroom too: Ed, 2026-10-14, "Can we pause from the bedroom?")
a4_installPause4(pageHost); // (the Settings page's Esc is its own: it closes, the pause page stays) // (the bot game's Esc is its way back to the start screen: ui/botGame.ts)

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
const soundNote = (): void => a4_soundNote(pageHost);
/** Any key or tap skips an arrival's flight (once a page: the boot's arrival, or the first sail in place). */
let skipArmed = false;
const armSkip = (): void => a4_armSkip(pageHost);
if (bootArrival) armSkip();
/** The swap point (the transition review, 2026-10-19; Ed: "revisits can draw instantly then redraw during the bedroom sequence"):
 *  the island's trees were drawn at once from what's kept (its own seed, render/artCache.ts islandArtSeed); here, the last moment
 *  she can't see them change (the landing still about to fade; else play starting from behind the bedroom), tonight's own (drawn
 *  ahead by the chart, app/landingBake.ts) take their place where they're ready, and the rest stay the island's all night (never
 *  swapped in play). The one hook: the wake-up sequence takes it over when it comes. */
function revealArt(): void { return a4_revealArt(pageHost); }
if (bootArrival) bootArrival.onReveal = revealArt;
/** A sail's night put to bed before its dive (Ed, 2026-10-25, 2a: every sail ends with her asleep in bed; app/opening.ts
 *  sailLandsInBed): her in her bedroom, the camera settled on her there, so the flight's last shot is her room (app/arrive.ts end). Not
 *  under ?opening=old, or without the house's rooms: then her decks as before, and no dream after the dive. */
function bedFirst(n: Night): void { return a4_bedFirst(pageHost, n); }
function bedFirstNow(n: Night): void { return a4_bedFirstNow(pageHost, n); }
/** It's landed: in her bed, she wakes as after the bed (the one wake-up, every morning: Ed, 2026-10-26, in place of his decision 10's shorter one), dreaming
 *  first of a find on loan; at her decks (?opening=old), the night starts, the party spell cast, as the bedroom's scroll would. */
function arrived(): void { return a4_arrived(pageHost); }
function arrivedNow(): void { return a4_arrivedNow(pageHost); }
function wakeArrival(): void { return a4_wakeArrival(pageHost); }
function wakeArrivalNow(): void { return a4_wakeArrivalNow(pageHost); }

// The character creator (Ed, 2026-10-05; "dressing up" to the player, the house's Bedroom being the room with the bed): at every
// load but a sail's arrival (&arrive=1 lands in her bed), from the hidden start card's button, and mid-night from the treehouse's
// stations (below); ?creator=0 skips it (tests, the smoke run), and loading is the start screen's as before.
// It's also the loading screen (Ed, 2026-10-05): it opens at once and the forest grows behind it;
// Start waits ("getting ready") until play can begin.
const creator = new Creator(style, savedLook, bootTuning.pixelSize);
creator.version = typeof __BUILD__ === "string" ? __BUILD__.split(" ")[0] : "dev"; // (its version, top left: Ed, 2026-10-13)
(window as unknown as { __creator: Creator }).__creator = creator; // (the creator's smoke scripts read her place in the room)
// Her hat's spell (rules/spells.ts, app/loadout.ts): the creator's Hat box chooses it from the hats she owns, kept on this browser.
a4_installStations1(pageHost); a4_installStations2(pageHost); // (the pause page's Unlock everything: every hat, app/debugUnlock.ts)
a4_installStations3(pageHost); // (a loaned hat never saved: app/loan.ts; a hat swapped while hers lies elsewhere leaves that one lying: rules/hatSpells.ts)
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
a4_installStations4(pageHost);
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
const findsCtx = (): FindsCtx => a4_findsCtx(pageHost);
a4_installStations5(pageHost);
a4_installStations6(pageHost); // (menu.back, E by default: platform/bindings.ts; the pad's, circle, comes through padControls)
// Her DJ booth at the decks (Ed, 2026-10-29; ui/djBooth.ts): E there opens it (the wake-up's "booth" event); "Get this party started"
// closes it and starts the party at the record's bpm (rules/wakeUp.ts startParty), the record remembered for next time.
const booth = new DjBooth();
a4_installStations7(pageHost);
a4_installStations8(pageHost);
a4_installStations9(pageHost);
a4_installStations10(pageHost); // (Ed, 2026-10-26: she twirls while her new look draws)
// The Workshop's bay (Ed, 2026-10-23; docs/backlog/workshop.md): a part chosen goes on her broom at once, mid-night too (its stats
// and its set's spell with it: rules/spells.ts setParts), and is kept on this browser for the nights after (app/broomSave.ts).
a4_installStations11(pageHost); // (kept without a part on loan: app/loan.ts)
/** What the Workshop's stations show (ui/stationPanel.ts): the parts found, her broom, tonight's part to find, her tuning. */
const workshopNow = (): WorkshopCtx => a4_workshopNow(pageHost);
/** Tonight's find taken (the "found" event): on loan till she sleeps (app/loan.ts), hers to wear or use at once, never written. */
function lendFind(kind: FindKindId, id: string): void { return a4_lendFind(pageHost, kind, id); }
/** Her guidance (rules/guidance.ts): what's kept of it on this browser (app/guideSave.ts), her pin, and the islands found (the
 *  chart's save, read a second at most). */
const guide = loadGuide(), guidePin = new GuidePin(view);
let chartFound: { at: number; unvisited: string[] } = { at: -Infinity, unvisited: [] };
/** Her guidance pin this frame (rules/guidance.ts): what's next, over it, while she's in the treehouse and not at it. */
function stepGuide(now: number): void { return a4_stepGuide(pageHost, now); }
/** The loan settled as she sleeps (the bed, a sail; Ed, 2026-10-24): the night won, kept for good (its kind's own save, and what she
 *  has on of it with it); not, gone back to the sky, what she has on of it back to what she had before. What her dream shows, or
 *  null with nothing on loan. */
function settleLoan(won: boolean): { loan: Loan; won: boolean } | null { return a4_settleLoan(pageHost, won); }
function settleLoanNow(won: boolean): { loan: Loan; won: boolean } | null { return a4_settleLoanNow(pageHost, won); }
/** Her dream of a settled loan shown (`veil`: over a night not asleep, its own dark under it). */
function startDream(s: { loan: Loan; won: boolean }, veil = false): void { return a4_startDream(pageHost, s, veil); }
/** Her head's top on the page (CSS px) as last drawn (render/view/witch.ts herHead), for her dream's cloud to rise from; null
 *  before she's drawn. */
function herHead(): { x: number; y: number } | null { return a4_herHead(pageHost); }
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
a4_installStations12(pageHost);
const useHouse = (obj: string): void => a4_useHouse(pageHost, obj);
a4_installStations13(pageHost); // (a new night in place: not till it's made)
// (its room's ambience plays while it's open: overnight, 2026-10-06)
a4_installStations14(pageHost);
a4_installStations15(pageHost); // (the scroll's burst: play, and the spell cast)
a4_installStations16(pageHost);
// The bot game (Ed, 2026-10-06: "start the game and watch the skilled bot play"; ?bot=skilled|crude, or the start
// screen's Bot game): rules/bot.ts plays in place of her controls, a seeded witch, no character creation. The bot's code loads
// only for a bot game (overnight phase 2: out of the game's bundle); it starts as soon as both it and the forest are ready.
const botParam = params.get("bot") as BotKind | null;
let bot: Bot | null = null, botTag: BotTag | null = null, botKind: BotKind | null = null;
function botGame(kind: BotKind): void { return a4_botGame(pageHost, kind); }
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
function start(): boolean { return a4_start(pageHost); }
function startDirect(): void { return a4_startDirect(pageHost); }
input.onAny = () => (N().arrival && !N().flags.landed ? true : start()); // (arriving: a key skips the flight, app/arrive.ts; the landing starts it)
// The audio watchdog (app/sound.ts).
a4_installPause5(pageHost);
// The pause page's test sliders (Ed, 2026-10-12; ui/decide.ts PauseSliders): down the left while frozen, the freeze quiet (no card
// of its own: nothing else over the game), its stamp at their foot. Their code loads on the first freeze.
let potionLab: import("./ui/potionLab").PotionLab | null = null;
function openPotionLab(): Promise<void> { return a4_openPotionLab(pageHost); }
let pauseSliders: import("./ui/decide").PauseSliders | null = null, pauseLoading = false;
// The Music Lab panel (Ed, 2026-10-15, from Kilo's mock; ui/musicLabPanel.ts, app/musicLab.ts): the pause page's 🎛 button opens
// it down the right edge; Esc resumes with it up, so changes are heard in play; ✕ closes it. Its code loads on the first open.
let musicLabPanel: import("./ui/musicLabPanel").MusicLabPanel | null = null, musicLabLoading = false;
const openMusicLab = (): void => a4_openMusicLab(pageHost);
a4_installPause6(pageHost);
a4_installPause7(pageHost);
// "A newer version is out" (Ed, 2026-10-14; app/newBuild.ts): read version.json on load, on pausing and every few minutes; shown in the
// bedroom and on the pause page, and when a menu's code has been replaced under it.
const newBuild: NewBuildNotice = a4_createBuildNotice(pageHost);
let menuGone = false;
/** Controls and Options on the pause page (the opening, Ed's decision 3: "Controls are taught in the bedroom and kept in
 *  the pause menu"; Ed, 2026-10-23, the chart's corner gone with the chart-first start): where the creator's tabs were never set up,
 *  buttons while paused show the start card's keys, its What's new and the screen shake's option (ui/cornerPanel.ts, borrowed and
 *  put back). */
let pauseBtns: HTMLDivElement | null = null;
function pauseControls(on: boolean): void { return a4_pauseControls(pageHost, on); }
a4_installPause8(pageHost);
// Screen shake when she's hit, and the camera's sub-pixel glide (app/shake.ts).
const shake = page.shake = new ScreenShake(N().game, bootTuning, view, canvas, params), shakeEl = shake.option;
// Ed, 2026-10-30: the retired card is hidden on every route. Controls and Options remain available in existing menus;
// update notes move to the lazy Settings tab. The normal bedroom/legacy creator retain their own opening actions.
/** The creator's tabs and its Zoo button, once a page (at the boot, or a night in place that opens the bedroom after a load that didn't). */
let dressed = false;
function dressCreator(): void { return a4_dressCreator(pageHost); }
if (bootArrival) { /* (no card, no bedroom: the still, then the flight) */ } else if (inBedroom) { /* (no card, no creator: asleep in the dark, then the wake-up: wakeFirst) */ }
else if (!resumeGame && params.get("creator") !== "0" && !botKind) dressCreator();
// Ed's decisions panel (src/ui/decide.ts, config/decisions.json): ?decide opens it, F2 opens and closes it. Its code loads
// only then (overnight phase 2: out of the game's bundle); its knobs' choices in the link are put on as the game starts
// (ui/decisions.ts, app/linkParams.ts).
let decide: DecidePanel | null = null, decideLoading = false;
const decidePanel = (open: boolean): void => a4_decidePanel(pageHost, open);
if (params.has("decide")) decidePanel(true);
window.addEventListener("keydown", e => { if (e.code !== "F2") return; e.preventDefault(); if (decide) decide.toggle(); else decidePanel(true); });
a4_installBuildNotice1(pageHost);

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
a4_installDebug1(pageHost);
let lastRecordedInput = "", lastInputAt = -Infinity;
function saveComment(text: string): Promise<string> { return a4_saveComment(pageHost, text); }
function restoreComment(file: File): Promise<void> { return a4_restoreComment(pageHost, file); }
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
a4_installDebug2(pageHost);
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
function spawnHere(kind: FindKindId | null, item: string | null): string { return a4_spawnHere(pageHost, kind, item); }
function spawnHereNow(kind: FindKindId | null, item: string | null): string { return a4_spawnHereNow(pageHost, kind, item); }
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
a4_installDebug3(pageHost);
const devFinds = new URLSearchParams(location.search).get("dev") === "finds";
if (devFinds) findsPanel.toggle(true);
// ?spawnfind=kind:item (or tonight): spawned once, as soon as she first stands on open ground (the treehouse isn't), for shots.
let spawnWanted = new URLSearchParams(location.search).get("spawnfind");
a4_installDebug4(pageHost);
a4_installDebug5(pageHost);
a4_installDebug6(pageHost);
a4_installDebug7(pageHost);
a4_installDebug8(pageHost);
a4_installDebug9(pageHost);
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
a4_installDebug10(pageHost);
// The comparability key (app/compareKey.ts; Ed, 2026-10-26: "only compare like with like"): with the playtest log's run and its
// samples' scenes, and for the browser tools (window.witch.compareKey(spot): tools/bench/comparable.cjs pageKey).
const keyNow = (spot?: string): ReturnType<typeof compareKey> => a4_keyNow(pageHost, spot);
a4_installDebug11(pageHost);
a4_installDebug12(pageHost);
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
a4_installDebug13(pageHost);
a4_installPause9(pageHost);
a4_installDebug14(pageHost);
a4_installDebug15(pageHost);
a4_installDebug16(pageHost);
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
function chartOverNight(table?: string): void { return a4_chartOverNight(pageHost, table); }
/** The map table's chart (Ed, 2026-10-23: "Map menu slides in from the bottom when you go near it, like the clothes stations"; since
 *  his playtest of 2026-10-26, E at it: rules/stations.ts tableOf, ui/chartOverlay.ts `table`): up from the bottom, the night held
 *  behind it; she moves and it slides away. The table it's up at. */
let chartAt: string | null = null;
/** The world the chart is given: the link's own ?world=, carried on as chart.html's links do (else the save's). */
function chartWorldArg(): number | undefined { return a4_chartWorldArg(pageHost); } // (a function: the first load's chart opens before this line runs)
/** Sailing from the map table's sea chart (ui/chartOverlay.ts, and window.witch.sail under it): the night recorded on the chart,
 *  unwon if it's still on, then the next night started in place (app/sail.ts; the tuning's sail.inPlace, ?sail=inplace|reload)
 *  or the page loaded anew on the island's link as before; in place, anything going wrong loads it anew all the same, quietly
 *  (Ed's decision 2). Resolves once the new night's start is ready (true) or the page is going (false). */
function sailFromChart(href: string, to: Sailed): Promise<boolean> { return a4_sailFromChart(pageHost, href, to); }
/** The night she's leaving recorded on the chart, unwon if it's still on (in the campaign's world only, as nightOver). */
function recordSail(): void { return a4_recordSail(pageHost); }
/** The next night made under the sea chart as it flies (Ed, 2026-10-24, the sail's transition: "Start the dive as soon as what it
 *  really needs is ready", "Never a frozen frame"): from the moment she sails (the chart's onDepart), the night she's leaving
 *  recorded and ended and the next made as a sail's is (makeSailNight), its first frames drawn ahead at the chart's hand-off; the
 *  chart's flight slows to wait for it (app/chartView.ts), then hands over (sailFromChart, with this night). Resolves once it's ready,
 *  or has gone wrong (the hand-off then loads the island's page, as ever). */
let departing: { island: string; seed: number; night: Promise<Night> } | null = null;
function departFromChart(to: Sailed, at: FlightEnd["cam"] | null): Promise<void> { return a4_departFromChart(pageHost, to, at); }
/** Whether she's woken on this browser before (set as she first gets up): her first-ever morning's dressing table carries the
 *  "First night" banner (`firstEver`, read as the page's first wake-up starts). The wake-up itself is one for every morning since Ed,
 *  2026-10-26, replacing his decision 4's shorter one on later loads. */
const WOKEN_KEY = "witch.woken";
const wokenBefore = (): boolean => a4_wokenBefore(pageHost);
const woke = (): void => a4_woke(pageHost);
let firstEver = false;
/** Whether she's come to the dressing table before, ever (its first visit marked once: rules/wakeUp.ts `mirror`). */
const MIRROR_KEY = "witch.mirrored";
const mirrored = (): boolean => a4_mirrored(pageHost);
const sawMirror = (): void => a4_sawMirror(pageHost);
/** The opening's wake-up on a plain first load (app/opening.ts opensInBedroom): home's night made (its start's art drawn, the rest
 *  drawing on behind her while she dresses and walks down: rules/wakeUp.ts), she wakes in her bedroom in the treehouse
 *  (rules/opening.ts), the one wake-up, as every morning. Without the house's rooms, the old start. */
function wakeFirst(): void { return a4_wakeFirst(pageHost); }
function wakeFirstNow(): void { return a4_wakeFirstNow(pageHost); }
/** Back after a sail in place opens the pause menu (Ed's decision 1; app/sail.ts): armed by the first sail (a first load leaves
 *  Back alone); while the next island is made it only keeps the guard. */
const backGuard = new BackGuard(history, () => { if (!sailing && !freeze.frozen) freeze.toggle(); });
let backArmed = false;
const armBack = (): void => a4_armBack(pageHost);
/** The sail in place (docs/plans/sail-without-reload.md B): the old night's music fading to the sea and the wind, the old night
 *  ended (its game marked disposed under ?debug=sail), the chart's last frame up while the next is made, the night's link pushed
 *  (and Back's guard), the next night made as the boot makes one (app/night.ts startNight: the view taking it, the sliders
 *  carried), its start's art made, then the flight in from the chart's camera (passed in memory), landing as a sail's does. */
function sailInPlace(to: Sailed, made?: Promise<Night>): Promise<void> { return a4_sailInPlace(pageHost, to, made); }
/** A sail's night made (sailInPlace, or under the chart's flight: departFromChart): the old night's music fading to the sea and the
 *  wind, the old night ended, the night's link pushed (and Back's guard), the night made (startNight) and its start readied: the
 *  ground, the house and the shaders, not the trees (Ed, 2026-10-24: "Don't wait for the trees": they come under the loading mist,
 *  the dive's own areas first, rules/arrive.ts diveReach); `at`, the chart's hand-off, its first frames drawn there ahead. */
function makeSailNight(to: Sailed, arrival?: Arrival, at?: FlightEnd["cam"] | null): Promise<Night> { return a4_makeSailNight(pageHost, to, arrival, at); }
/** The night's first frames drawn at `shot` (the chart's hand-off), under the chart, until they come calm as the flight's warm-up
 *  waits for (rules/arrive.ts stepFlightClock): the heavy ones over before the dive, not at its start. */
function warmAt(n: Night, shot: Shot, A: NonNullable<Tuning["arrive"]>): Promise<void> { return a4_warmAt(pageHost, n, shot, A); }
/** Another way to a new night (the plan's PR 6: the bed, the bot game's exit): in place as a sail is (the tuning's sail.inPlace,
 *  ?sail=), else, in a bot game for any but its exit (the bot's on the old night), or on anything going wrong, the link loaded as
 *  before (app/sail.ts nightHref's), quietly. */
function newNight(how: NightWay): void { return a4_newNight(pageHost, how); }
/** A new night in place by one of those ways (docs/plans/sail-without-reload.md B), starting as a fresh load of its link would: the
 *  old night's music faded and the night ended, the link pushed (and Back's guard), the bedroom open as the loading screen (the
 *  start card under ?creator=0), the night made (startNight: the view taking it, the sliders carried), its start's art made;
 *  no flight in. The bot game's exit leaves the bot and her seeded look first. */
function nightInPlace(spec: NightSpec, href: string): Promise<void> { return a4_nightInPlace(pageHost, spec, href); }
/** The bot game left (its exit in place): the bot and its tag gone, her own look back (the creator's, as a fresh page has it). */
function leaveBot(): void { return a4_leaveBot(pageHost); }
/** ?debug=sail's test of the fallback: window.witch.sail(island, seed, { fail: true }). */
let sailFail = false;
/** Controls with nothing pressed or held (the aim left where it is). */
/** The house object E was pressed at in the last step (the rules' "house" event: rules/sigilButton.ts), or null; never in a bot's game. */
view.onUse = down => { if (down) input.touch.sigil = true; input.touch.sigilHeld = down; }; // (a tap on a use prompt: the touch sigil button's press)
const usedAt = (g: Game): string | null => (bot ? null : g.leashEvents.find(e => e.kind === "house" && e.obj && e.obj !== "slept")?.obj ?? null);
const stillControls = <T extends object>(c: T): T => Object.fromEntries(Object.entries(c).map(([k, v]) => [k, typeof v === "boolean" ? false : typeof v === "number" ? 0 : v])) as T;
/** The station panels' closes, the last few (window.witch.stationShuts): why, her clock, and whether paused. */
const stationShuts: { why: string; at: number; frozen: boolean; station: string | null }[] = [];
function shutStation(why: string): void { return a4_shutStation(pageHost, why); }
let lastObservedFrame = 0;
let measuredStep: number | undefined, measuredDraw: number | undefined;
let measuredParts: Record<string, number> = {};
function drawFrame(time: number): void { return a4_drawFrame(pageHost, time); }
function frame(now: number): void { return a4_frame(pageHost, now); }
function frameBody(now: number): void { return a4_frameBody(pageHost, now); }
/** The pause/menu path is also live while a limited arrival holds the entire simulation asleep. */
function updatePauseMenus(now: number): void { return a4_updatePauseMenus(pageHost, now); }
/** The overlay's lines (the power meter's are hud.ts's), shared with the debug info's copied text. */
function overlayHead(): string[] { return a4_overlayHead(pageHost); }
requestAnimationFrame(frame);


// For the smoke test, the tools and for poking at in the console (app/hooks.ts).
a4_installDebug17(pageHost);
// witch.take(kind, item): tonight's find taken where she stands, as E at it takes it (the kind's claim, the hats' floor, the loan):
// for the tools (tools/loan/shots.cjs) to look at a night with a find on loan without walking to it.
a4_installDebug18(pageHost);
a4_installDebug19(pageHost);
// witch.dream("won" | "lost", kind, item): her dream of such a loan over the night, its own dark under it (as ?dream=); under ?shot=
// drawn only when asked, window.__dream.draw(seconds) (tools/loan/shots.cjs).
// window.witch.guide: her guidance pin's state, what's kept of it (what's new, the islands seen) the pickups' hooks, and a step of it (window.witch.frame's manual frames don't run the page's loop: shots).
// window.witch.wakeUp(yesterday): a wake-up in her bed as the game starts one (rules/wakeUp.ts startWake), with or without a night
// played before it (the shots of the first morning's hat on the hats' floor, and of last night's pile).
a4_installDebug20(pageHost);
// window.witch.stationShuts: the station panels' last closes, why, when, and whether paused (the pause check's broom bay, closed
// under the pause on the slow runner now and then: tools/smoke/pause-on-top.cjs prints them when a row fails).
a4_installDebug21(pageHost);
a4_installDebug22(pageHost);
a4_installDebug23(pageHost);
// ?debug=sail (docs/plans/sail-without-reload.md, PR 4b): another night in place, made as a sail will make one (app/night.ts
// startNight, the view taking it: View.setGame), its start's art made and play started as the start screen's would; for
// tools/sail/swap.cjs.
a4_installDebug24(pageHost);
// window.witch.sail(island, seed, { end, fail }): a sail as the map table's chart sails (sailFromChart, the same path: its record
// on the chart, the way by sail.inPlace or ?sail=, in place the fallback), for tools/sail/leak.cjs and swap.cjs; `end` the
// chart's flight end (a plain one out at sea south of the island if not given: its still a dark screen; null, none), `fail`
// (?debug=sail only) the sail in place made to throw, to see the fallback. Resolves once the night's start is ready.
// window.witch.chart(): the sea chart over the night, as the map table opens it (tools/smoke/quick.cjs: choosing her own island).
a4_installDebug25(pageHost);
// The bestiary book's zoo over the night, for the tools (tools/zoo/perf.cjs): open and close it as the book and its × do.
a4_installDebug26(pageHost);
// The Studio's instruments for the tools (tools/studio/check.cjs): where she's at and what it plays (its meter).
a4_installDebug27(pageHost);
// The telescope for the tools (tools/telescope/shots.cjs, tools/stars/shots.cjs): look through it pointed at a bearing and zoom (0
// wide, 1 close) and an elevation (degrees up; its lowest if not given), or stop.
a4_installDebug28(pageHost);
a4_installDebug29(pageHost);
// Known synchronous console mutations use declared boundaries too. Arbitrary direct writes to witch.game remain detectable replay failures.
a4_installDebug30(pageHost);
