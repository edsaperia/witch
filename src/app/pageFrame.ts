// A4 mechanical extraction from src/main.ts; body identity is checked by tools/refactor/a4-split.mjs.
import type { PageHost } from "../main";
import { drew, holding } from "../render/impact";
import { currentSettings } from "./playerSettings";
import { chartOpen, closeChart } from "../ui/chartOverlay";
import { endDream } from "../rules/wakeUp";
import { STATION_SLOT } from "../rules/clothesPile";
import { WakeCard } from "../render/wakeUp";
import { clearCarried, mark } from "./timing";
import { musicCue } from "../rules/musicPlan";
import { areaUnderWitch, interpolated, STEP } from "../rules/game";
import { enableCauldron, homeMushroomPickups } from "../rules/cauldronNight";
import { awaitingSpell } from "../rules/leypulse";
import { castable, hatSpell } from "../rules/spells";
import { HOUSE_ROOMS } from "../rules/houseRooms";
import { stationOf, tableOf } from "../rules/stations";
import { itemById, shelfOf, shelvesAt, stationsShowing } from "../rules/wardrobe";
import { fillTrunk, findKind, loanFind, type FindKindId } from "../rules/finds";
import { partById } from "../rules/broomParts";
import { ownedToChoose } from "./debugUnlock";
import { foundAll } from "./finds";
import { findCanvas } from "../render/dream";
import { fightDt, fightFrame } from "./fightArena";
import { lastRecord, ownedRecords } from "./recordSave";
import { leaveZoo } from "./zooExit";
import { loadSave, nightOver } from "./chartSave";
import { warmChart } from "./chartWarm";
import { gpuLine } from "../render/view/gpuBudget";
import { debugBlows } from "../rules/alarms";
import { SHED_STEPS } from "../platform/audio/shed";
import { logCaughtError } from "../platform/playtestLog";
import { notable } from "../platform/playtestJournal";
import { recordedStep } from "./recordingHooks";

export function drawFrame(pageHost: PageHost, time: number): void {
  const start = performance.now(), previousParts = pageHost.view.ms;
  try { pageHost.view.render(time); }
  finally {
    pageHost.measuredDraw = (pageHost.measuredDraw ?? 0) + performance.now() - start;
    if (pageHost.view.ms !== previousParts) for (const [name, ms] of Object.entries(pageHost.view.ms)) pageHost.measuredParts[`draw.${name}`] = (pageHost.measuredParts[`draw.${name}`] ?? 0) + ms;
  }
}

export function frame(pageHost: PageHost, now: number): void {
  const start = performance.now(), gap = pageHost.lastObservedFrame && !document.hidden ? now - pageHost.lastObservedFrame : 0;
  pageHost.lastObservedFrame = now; pageHost.measuredStep = pageHost.measuredDraw = undefined; pageHost.measuredParts = {};
  const n = pageHost.N(), phase = pageHost.sailing ? "sailing" : pageHost.landingSleep.holds(n.game) ? "landing-sleep" : !n.flags.ready ? "building" : n.arrival && !n.flags.landed ? "arrival" : "play";
  try { pageHost.frameBody(now); }
  finally {
    try {
      if (!pageHost.loop.manual) pageHost.stallLog.frame({ t: n.game.clock.time, gap, work: performance.now() - start, step: pageHost.measuredStep ?? 0, draw: pageHost.measuredDraw, measured: { step: pageHost.measuredStep !== undefined, draw: pageHost.measuredDraw !== undefined }, parts: pageHost.measuredParts, source: "raf", loading: { phase, ready: n.flags.ready, ...pageHost.view.readiness }, mode: n.game.witch.mode, x: n.game.witch.x, z: n.game.witch.z, wave: n.game.party.wave, creatures: n.game.creatures.length });
    } catch (error) { logCaughtError(error, "slow-frame observation"); }
  }
}

export function frameBody(pageHost: PageHost, now: number): void {
  requestAnimationFrame(pageHost.frame);
  if (pageHost.loop.manual) return;
  if (pageHost.sailing) { pageHost.sound.tickSail(); return; } // (the next island being made after a sail in place: nothing stepped or drawn, the sea and the wind heard)
  // The night on now, read afresh each frame (app/night.ts): its game, tuning, playtest run, HUD, arrival and flags.
  const { game, tuning, playtest, hud, arrival, flags: F } = pageHost.N();
  if (F.ready && !F.frame1) { F.frame1 = true; mark("game:frame1"); if (!arrival) { pageHost.logTiming(); clearCarried(); } }
  if (pageHost.ladder.cap30 && F.last && now - F.last < 1000 / 30 - 4) return; // (the ladder's steady-30 rung: every other frame at 60 Hz)
  const dt = F.last ? (now - F.last) / 1000 : 0;
  F.last = now;
  const work0 = performance.now();
  pageHost.ladder.frame(now, dt * 1000, !F.ready || game.clock.paused || pageHost.freeze.frozen || document.hidden || pageHost.scopeAt !== null || (!!arrival && !F.landed), tuning, pageHost.frameStats.gpuTimes);
  pageHost.frameStats.frame(dt * 1000);
  pageHost.freeze.pollPad();
  if (pageHost.landingSleep.holds(game)) {
    pageHost.input.release(); pageHost.input.clearPresses(); game.clock.paused = true;
    pageHost.updatePauseMenus(now);
    if (!pageHost.freeze.frozen && pageHost.view.landingWakeReady() && pageHost.mutate("wake: landing release", () => pageHost.landingSleep.release(game, true))) {
      pageHost.input.release(); pageHost.input.clearPresses(); mark('landing:alarm-ready'); pageHost.wakeArrival();
      F.last = now; // discard the loading interval before the first normal simulation step
    } else {
      (pageHost.wakeCard ??= new WakeCard()).sleep();
      if (!pageHost.freeze.frozen && now - pageHost.landingSnoreAt > 4500) { pageHost.sound.sfx?.snore(0, 0, 0.2); pageHost.landingSnoreAt = now; }
      pageHost.drawFrame(game.clock.time); hud.clock(); pageHost.freeze.update(); return;
    }
  }
  // (the sea chart open over the game, ui/chartOverlay.ts: its keys and clicks are the chart's, hers held still)
  // (her room open mid-night, or the telescope: she stands still; the telescope takes her stick, keys and wheel, E leaving it)
  pageHost.studio.update(pageHost.bot ? null : game, !pageHost.creator.open && !chartOpen() && !pageHost.freeze.frozen && !pageHost.telescope.on, dt, pageHost.usedAt(game)); // (E at an instrument: she's at it)
  // (a menu or overlay that takes the keys opening or closing, the Studio's, the chart, the telescope, the creator or the zoo:
  // everything held let go, so a key-up it took doesn't leave her walking after; Ed's playtest of v4515, the Studio's mic)
  const takes = `${pageHost.studio.at}|${chartOpen()}|${pageHost.telescope.on}|${pageHost.creator.open}|${pageHost.zoo.isOpen}|${pageHost.stations.station}`;
  if (takes !== pageHost.keysTaken) { pageHost.keysTaken = takes; pageHost.input.release(); notable("screen", "Active screen changed", { studio: pageHost.studio.at, chart: chartOpen(), telescope: pageHost.telescope.on, creator: pageHost.creator.open, zoo: pageHost.zoo.isOpen, station: pageHost.stations.station }); }
  // While a station's panel, the map table's chart, the telescope or an instrument is open she stands still, the movement keys its
  // buttons (Ed, 2026-10-26: "walking away shouldn't work - then we can use the movement keys as buttons in the menus"), and the use
  // button (E; the pad's back, ○, since Ed's layout of 2026-10-28; a tap on touch) closes it: that press is the close and nothing else, even when the thing
  // open closed itself on it a moment before (the chart and the instruments take E themselves), so it never opens it again.
  const raw = pageHost.input.read(), openNow = chartOpen() || pageHost.telescope.on || !!pageHost.studio.at || !!pageHost.stations.station || pageHost.booth.isOpen, shutTap = !pageHost.freeze.frozen && !!(raw.sigil || raw.place) && (openNow || pageHost.openPrev); // (E is `place`; the pad's back, ○, and a tap `sigil`; never under the pause)
  if (shutTap) { if (pageHost.booth.isOpen) pageHost.booth.close(); if (pageHost.stations.station) pageHost.shutStation("E"); if (pageHost.studio.at) pageHost.studio.leave(); if (pageHost.chartAt && chartOpen()) { pageHost.chartAt = null; closeChart(); } } // (the telescope: its own step, below)
  const human = openNow || shutTap ? pageHost.stillControls(raw) : raw;
  pageHost.telescope.device = pageHost.input.device;
  if (pageHost.telescope.on) { if (pageHost.telescope.night !== game || game.witches[0].ko || chartOpen() || !tuning.telescope) pageHost.telescope.close(); else pageHost.telescope.step({ ...raw, sigil: !!(raw.sigil || raw.place) }, dt, tuning.telescope); } // (E or ○ leaves it)
  pageHost.view.telescope = tuning.telescope ? pageHost.telescope.look(tuning.telescope) : null;
  // The sea chart over the night (the transition review, 2026-10-19: the night ran and drew on behind it, and its art workers drew
  // on, so the chart's islands and the next island's art drawn ahead got what was left): while it's open the night is paused,
  // nothing is drawn (the canvas keeps its last frame), and no new art is handed to the workers; closed, all as it was.
  const charting = chartOpen();
  if (charting !== pageHost.chartHeld) pageHost.mutate("house: chart pause", () => { pageHost.chartHeld = charting; pageHost.view.assets.hold(charting); if (charting) { pageHost.chartWasPaused = game.clock.paused; game.clock.paused = true; } else game.clock.paused = pageHost.chartWasPaused; });
  // A bot game: the bot's controls, not hers (the camera's zoom and the debug key still hers).
  const c: typeof human = pageHost.bot ? { ...pageHost.bot.decide(game), zoom: human.zoom, debug: human.debug, toggleAutoTalk: false } : human;
  if (pageHost.bot) pageHost.botTag?.update(pageHost.bot.doing);
  if (F.castWanted && !game.clock.paused) { if (awaitingSpell(game.party)) c.castParty = !pageHost.bot; else F.castWanted = false; }
  if (c.toggleAutoTalk) pageHost.setAutoTalk(!pageHost.autoTalk);
  // Choosing at a station (the pointer or the d-pad in its panel, or stood still a moment): the camera eases in on her; she moves, out.
  if (c.moveX || c.moveZ) { pageHost.stations.walked(); pageHost.stillAt = 0; } else pageHost.stillAt += dt;
  c.framing = !!pageHost.stations.station && (pageHost.stations.choosing || pageHost.stillAt > 0.4);
  c.framePart = c.framing ? pageHost.stations.framePart : null; // (zoomed on the part of her being chosen: camera.station.parts)
  pageHost.view.hatOff = pageHost.stations.bareHead; // (her hat off at the dressing table, so her face and hair show)
  c.autoTalk = pageHost.autoTalk;
  if (c.debug) hud.setDebug(!hud.debugOn);
  pageHost.view.debugReadouts = hud.debugOn;
  const step0 = performance.now();
  const recordedInput = JSON.stringify(c);
  if (recordedInput !== pageHost.lastRecordedInput || game.clock.time - pageHost.lastInputAt >= 1) { pageHost.breadcrumbs.add(game, "input", c); pageHost.lastRecordedInput = recordedInput; pageHost.lastInputAt = game.clock.time; }
  if (pageHost.params.get("cauldron") === "1" && !game.cauldron) pageHost.mutate("cauldron: enable legacy preview", () => enableCauldron(game, homeMushroomPickups(game))); // Explicit compatibility preview; ordinary nights use the nine-colour mushroom system.
  recordedStep(game, c, fightDt(dt * (pageHost.botTag?.speed ?? 1)), pageHost.BUILD, pageHost.captureRecording); // Same stepGame and original controls; tape is diagnostic only.
  for (const [kind, events] of [["ko", game.koEvents], ["quest", game.questEvents], ["spell", game.combat.spells?.events ?? []]] as const) for (const event of events) { pageHost.breadcrumbs.add(game, kind, event); if (kind !== "spell") notable(kind, `${kind} event`, event); }
  pageHost.rumble.update(game, currentSettings(), pageHost.input.device === "pad" && !document.hidden ? [pageHost.freeze.pad()] : [], now);
  // ?debug=attack: every 10 s, a few seconds of blows on the two soundsystems farthest from her (never felling one), so the
  // 🔇 alarm (render/alarm.ts) shows whenever she's away from them.
  if (pageHost.ATTACK_DEBUG && !game.clock.paused) { const tt = game.clock.time, ph = tt % 10; if (ph < 4 && Math.floor(tt * 2) !== F.attackTick) { F.attackTick = Math.floor(tt * 2); debugBlows(game.combat.sounds, game.combat.events, game.witch.x, game.witch.z, tt); } }
  const stepMs = performance.now() - step0;
  pageHost.measuredStep = stepMs; pageHost.measuredParts["update.input-and-rules"] = stepMs;
  // E at the treehouse deck's map table (rules/treehouse.ts): the sea chart over the game, to sail from at any time (Ed, 2026-10-11:
  // "Sail anytime"); mid-night that ends the night unwon: played, nothing found (app/chartSave.ts), as a loss.
  if (!pageHost.bot) for (const e of game.leashEvents) if (e.kind === "house" && e.obj) pageHost.useHouse(e.obj);
  // Tonight's find (rules/finds.ts): the night's one draw over everything she hasn't found, a wearable (the trunk) or a broom part
  // (a wreck), made once a night; taken, it's hers for the night, on loan till she sleeps (app/loan.ts; Ed, 2026-10-24): to wear
  // or use at once, never saved unless the night's won.
  if (game.trunk && game.trunk.item === null) pageHost.mutate("finds: fill trunk", () => fillTrunk(game, foundAll(pageHost.findsCtx())));
  for (const e of game.leashEvents) if (e.kind === "found" && e.obj && e.find) {
    pageHost.mutate("finds: loan", () => pageHost.lendFind(e.find!, e.obj!));
    if (e.find === "part") hud.found(`found: ${partById(e.obj)?.name.toLowerCase() ?? e.obj} · at the Workshop`); // (not fitted: the bay fits it)
    else if (e.find === "hat") hud.found(`found: the ${hatSpell(e.obj)?.name.toLowerCase() ?? e.obj} hat · on the hats' floor`); // (the rules laid it there: rules/houseRooms.ts addFloorHat)
    else { const it = itemById(e.obj), at = stationsShowing(shelfOf(e.obj)?.id ?? "")[0], where = HOUSE_ROOMS.objects.find(q => q.id === at)?.label.toLowerCase(); hud.found(`found: ${it?.name.toLowerCase() ?? e.obj}${where ? ` · at the ${where}` : ""}`); }
  }
  if (pageHost.spawnWanted && !game.witch.perch && game.witch.mode === "ground" && !game.witch.seated) {
    const [k, i] = pageHost.spawnWanted.includes(":") ? pageHost.spawnWanted.split(":") : [null, null];
    const said = pageHost.spawnHere(k as FindKindId | null, i);
    if (!said.startsWith("no clear ground")) { console.log(`spawnfind: ${said}`); pageHost.spawnWanted = null; }
  }
  // The station she's at (lit, E over it: render/houseRooms.ts); E there slides its panel in (Ed's playtest, 2026-10-26: "Menus should
  // open when she presses E near an interactive object ... instead of them opening automatically just through proximity"); walking
  // off it, out (not over her room open full screen, the chart, or a bot's game). E again or the pad's ○ slides it out (Esc pauses over it, platform/freeze.ts) (Ed: "I think E should also close, and we can have spacebar to select"; the frame's start), she standing still at it; Space chooses in it (ui/stationPanel.ts).
  const station = pageHost.bot || pageHost.creator.open || charting ? null : stationOf(game, pageHost.stations.station), shelves = station ? shelvesAt(station.id) : null;
  pageHost.stations.setLoaned(pageHost.loan?.id ?? null); // (its card sparkles: ui/stationPanel.ts)
  if (pageHost.stations.station && station?.id !== pageHost.stations.station) pageHost.shutStation(`off it (${station?.id ?? "none"}${charting ? ", charting" : ""}${pageHost.creator.open ? ", creator" : ""})`); // (she's somehow off it: a knockout, a new night; E closes it above)
  if (station && shelves && station.id !== pageHost.stations.station && pageHost.usedAt(game) === station.id) { const g = (pageHost.page.look() ?? pageHost.creator.genome()) as Record<string, unknown>; pageHost.stations.open(station.id, shelves, g as never, ownedToChoose(pageHost.findsCtx().owned()), game.wake && pageHost.firstEver && !game.wake.yesterday && station.id === "dressingTable" ? "First night · pick your look here, and at the wardrobe, cloak pegs and shoe rack" : "", shelves.some(q => q.slot || q.board) ? pageHost.workshopNow() : null, !!game.wake?.pile?.includes(STATION_SLOT[station.id])); }
  else if (!shelves && pageHost.stations.station) pageHost.shutStation("no shelves");
  pageHost.stations.update(performance.now() / 1000); pageHost.booth.update(performance.now() / 1000);
  // The telescope: E at it looks (useHouse); E or ○ shuts it (its own step; Esc pauses over it); and should she somehow be off it, it shuts.
  const scope = pageHost.bot || pageHost.creator.open || pageHost.sailing || charting ? null : stationOf(game, pageHost.telescope.on ? pageHost.scopeAt : null, tuning, ["telescope"]);
  if (!scope && pageHost.telescope.on && pageHost.scopeAt) { pageHost.telescope.close(); pageHost.scopeAt = null; }
  pageHost.input.dpadMenu = !!pageHost.stations.station || pageHost.booth.isOpen || pageHost.telescope.on || !!pageHost.studio.at || chartOpen(); // (a menu owns the pad: a station's panel, the telescope, an instrument, the map table's chart; only its back, circle, closes it: Ed's layout, 2026-10-28)
  pageHost.openPrev = chartOpen() || pageHost.telescope.on || !!pageHost.studio.at || !!pageHost.stations.station || pageHost.booth.isOpen;
  pageHost.shutButton.style.display = pageHost.openPrev && pageHost.input.device === "touch" ? "block" : "none"; // (on touch, a way to close it: the tap keycap)
  // (the use prompts, render/houseRooms.ts: the button on what she plays with, and none over what's open)
  pageHost.view.useDevice = pageHost.input.device; pageHost.stations.setDevice(pageHost.input.device); pageHost.booth.setDevice(pageHost.input.device); pageHost.studioPanel.setDevice(pageHost.input.device); pageHost.view.houseOpen = pageHost.stations.station ?? pageHost.studio.state.players[0].object ?? (pageHost.telescope.on ? pageHost.scopeAt : null) ?? pageHost.chartAt;
  // The new opening's wake-up (rules/wakeUp.ts, render/wakeUp.ts): its card, the dark and her phone; its beats marked for ?timing=1,
  // and the first time she comes to the dressing table; the island's art latched drawn (marked, nothing waits on it).
  if (!game.islandReady && F.ready && F.artRevealed && (pageHost.mistGateOff || pageHost.view.islandDrawn())) { game.islandReady = true; mark("island:ready"); } // (latched: the island's own art drawn, render/view.ts islandDrawn; its time marked for ?timing=1)
  pageHost.showLook(); // (what she has on: last night's pile as it stands, rules/clothesPile.ts)
  // Her dream of tonight's loan (render/dream.ts): a key the rules took (the pad's too) ends it; ended, the alarm rings (endDream).
  if (pageHost.dream && pageHost.dreamAsleep) {
    if (game.wake?.beat === "dream" && pageHost.dream.over) pageHost.mutate("wake: dream complete", () => endDream(game, game.herTime));
    else if (game.wake && game.wake.beat !== "dream" && !pageHost.dream.over) pageHost.dream.end();
  }
  if (pageHost.dream && !pageHost.dream.canvas.isConnected) pageHost.dream = null;
  // The on-loan icon, top left (render/loanIcon.ts): tonight's find once she's taken it, till she sleeps.
  { const lf = loanFind(game, game.map.treehouse.x, game.map.treehouse.z); pageHost.loanIcon.set(pageHost.bot ? null : lf?.item ?? null, () => (lf ? findCanvas(findKind(lf.kind).piece(lf.item), pageHost.view.assets.style) : null)); pageHost.loanIcon.draw(now / 1000); }
  if (game.wake) {
    for (const e of game.wake.events) { mark(`opening:${e}`); if (e === "up") pageHost.woke(); if (e === "mirror") pageHost.sawMirror(); if (e === "dressed") pageHost.sound.sfx?.spell("rustle", 0.6); if (e === "booth") pageHost.booth.open(ownedRecords(), lastRecord()); } // (dressed: a rustle of clothes) // (the dressing table's mirror: its panel on E, as every station's)
    if (pageHost.creator.open || pageHost.stations.station) pageHost.wakeCard?.hide(); // (at the mirror: its panel over it)
    else (pageHost.wakeCard ??= new WakeCard()).update(game, game.herTime, dt, () => pageHost.sound.sfx?.alarm());
  } else if (!pageHost.sailing && !pageHost.bootAsleep) pageHost.wakeCard?.hide(); // (asleep while the next night's made: kept up)
  if (!pageHost.bot) pageHost.stepGuide(now);
  // The tables (the map table's sea chart): E at one brings its chart up, as the stations' panels (Ed's playtest, 2026-10-26).
  const table = pageHost.bot || pageHost.creator.open || pageHost.sailing || F.ready === false ? null : tableOf(game, pageHost.chartAt);
  if (table && table.use.kind === "chart" && !chartOpen() && game.leashEvents.some(e => e.kind === "chart")) pageHost.chartOverNight(table.id);
  // The night's end (Ed, 2026-10-26: "Remove the end cards"): no card, won or lost; the guidance pins lead her home (rules/guidance.ts).
  // The night won (rules/win.ts): the islands its woken legends showed recorded on the sea chart (app/chartSave.ts), once, as its
  // finale settles; the enraged legends' (win.lost) not.
  if (game.win?.settled && !F.chartRecorded) { F.chartRecorded = true; nightOver(tuning.map?.island ?? "", { won: true, found: game.win.found }, undefined, tuning.map?.world ?? 0); if (pageHost.warmOn) warmChart(pageHost.chartWorld(), loadSave().found); } // (in the campaign's world only; home grows with what she's found: made again ahead)
  // The touch spell button only with a broom that has a spell to cast (rules/spells.ts castable).
  { const want = castable(game.spells) ? "" : "none"; if (pageHost.spellButton && pageHost.spellButton.style.display !== want) pageHost.spellButton.style.display = want; }
  pageHost.newBuild.update(pageHost.creator.open || pageHost.freeze.frozen || pageHost.menuGone); // (a newer build is out: in the bedroom and on the pause page)
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
  const cue = pageHost.N().musicCue = musicCue(game, pageHost.N().musicCue);
  pageHost.sound.update(game, cue, pageHost.creator.open);
  // The soundsystem spell's analyser bars (render/leash/stones.ts): the mix's spectrum, read once a frame only while its ring shows, and
  // only while the audio runs (else the bars idle gently).
  { const SV = pageHost.view.leashView.stoneView; SV.spectrum = SV.wantsSpectrum && pageHost.sound.audio?.state === "running" ? pageHost.sound.music?.spectrum() ?? null : null; }
  const meter0 = performance.now();
  if (pageHost.sound.audio) {
    pageHost.meter.tap(pageHost.sound.audio, [pageHost.sound.music?.output, pageHost.sound.music?.circleOutput, pageHost.sound.sfx?.output]);
    pageHost.meter.read(performance.now(), pageHost.sound.musicExpected());
    const shedS = Math.floor(performance.now() / 1000);
    if (shedS !== pageHost.lastShedS) { pageHost.lastShedS = shedS; const cw = pageHost.meter.clockWatch, why = pageHost.sound.shedCheck(shedS, cw.underruns, cw.drift); if (why) { playtest.audio(why); console.warn(`audio: ${why}`); } }
    if (pageHost.micWanted && !pageHost.meter.mic && pageHost.startedNights.has(game)) pageHost.meter.startMic(e => {
      const pageS = performance.now() / 1000;
      pageHost.N().playtest.mic({ kind: e.kind, t: Math.round(pageHost.N().game.clock.time * 10) / 10, dur: Math.round(e.dur * 100) / 100, outDb: e.outDb, micDb: e.micDb, lag: Math.round(e.lag * 1000), stall: pageHost.nearestStall(pageS) });
    });
  }
  const outside = { playtest: audio0 - log0, audio: performance.now() - audio0 }; // (for the stall log: not the view's own parts)
  pageHost.measuredParts["update.playtest"] = outside.playtest; pageHost.measuredParts["update.audio"] = outside.audio;
  // A slow audio frame's parts in the playtest log (Ed's v3668: a second of "audio" on play's first frame, 2026-10-14), a few a load
  if (outside.audio > pageHost.SLOW_AUDIO && pageHost.slowAudioLogged < 8) {
    pageHost.slowAudioLogged++;
    const p = pageHost.sound.parts, r = (x: number) => Math.round(x);
    playtest.audio(`slow audio frame ${r(outside.audio)} ms: music ${r(p.music ?? 0)}, cues ${r(p.cues ?? 0)}, mix ${r(p.mix ?? 0)}, room ${r(p.room ?? 0)}, meter ${r(performance.now() - meter0)}`);
  }
  if (!F.ready) return;
  hud.losses();
  hud.clock();
  pageHost.zooPanel?.update(); // (the zoo's block bar: src/zoo/panel.ts)
  if (game.zooExit !== undefined && !pageHost.zooLeaving) { pageHost.zooLeaving = true; leaveZoo(); } // (her way out of the zoo: its little treehouse, or its edge; app/zooExit.ts)
  // Behind the start screen, a frame every 0.3 s is plenty: the CPU goes to drawing the forest's
  // art in the background instead (and so slow a frame doesn't count against the scenery budget).
  // (arriving: the flight's shot on the view, every frame; landed, the night starts)
  const flying = !!arrival && !F.landed && F.ready;
  if (flying && arrival!.frame(pageHost.view, game, now)) pageHost.arrived();
  // The pad on the pause page and Settings: before the chart's or the zoo's early return, so it works paused over the chart too.
  pageHost.updatePauseMenus(now);
  if (pageHost.chartHeld || pageHost.zooHeld) return; // (the sea chart or the zoo over the night: its last frame kept, nothing drawn)
  if (game.clock.paused && !pageHost.freeze.frozen && !flying && now - pageHost.lastDraw < 300) return;
  pageHost.lastDraw = now;
  // Drawn between the last two fixed steps (game time: party transitions, sigils and waves are stamped in it).
  pageHost.frameStats.beginGpu();
  // (a 💌 filling a ring holds the picture a few frames, a hitstop: the last frame kept, the rules running on; render/impact.ts)
  const held = holding(performance.now());
  if (!held) interpolated(game, () => pageHost.drawFrame(Math.max(0, game.clock.time - (1 - game.alpha) * STEP * game.timeScale))); // (the world's step is STEP x timeScale: rules/slowTime.ts)
  if (!held) drew(performance.now());
  fightFrame((x, y, z) => pageHost.view.screenOf(x, y, z)); // (the Fight Arena's telegraph timings, if it's on)
  pageHost.frameStats.endGpu();
  pageHost.aimHud.update(game, game.herTime, pageHost.input.cursor, pageHost.input.lastAim, pageHost.startedNights.has(game) && !pageHost.bot);
  pageHost.frameStats.work(performance.now() - work0);
  pageHost.perfHud?.frame(now, dt * 1000, stepMs, !game.clock.paused && !pageHost.freeze.frozen);
  pageHost.shake.apply();
  pageHost.freeze.update();
  // The overlay (app/hud.ts), four times a second.
  hud.overlay(now, pageHost.overlayHead);
}

export function overlayHead(pageHost: PageHost): string[] {
  const { game, seed } = pageHost.N(), w = game.witch, s = pageHost.view.stats;
  return [
    ...pageHost.frameStats.lines(),
    pageHost.stallLog.line(),
    pageHost.meter.line() + (pageHost.sound.valve.level ? `  shed ${pageHost.sound.valve.level} (${SHED_STEPS[pageHost.sound.valve.level]})` : "  full mix"),
    pageHost.repro.line(),
    `seed   ${seed}  ${pageHost.BUILD}`,
    `area   ${areaUnderWitch(game)}`,
    `mode   ${w.mode}`,
    `at     ${w.x.toFixed(0)}, ${w.z.toFixed(0)} m   zoom ${game.camera.zoomStep}`,
    `trees  ${s.trees}  bushes ${s.bushes}  creatures ${s.creatures}`,
    `budget scenery to ${s.sceneryRadius.toFixed(0)} m (${s.scenery})  gameplay ${s.gameplay}  dropped ${s.dropped}`,
    `draws  ${s.drawCalls}  art queued ${s.pendingArt}  ground tiles ${s.pendingGround}`,
    gpuLine(pageHost.view),
    ...(game.lod ? [`sim    full ${game.lod.full}  coarse ${game.lod.coarse}  frozen ${game.lod.frozen}   marching full ${game.lod.marchFull}  coarse ${game.lod.marchCoarse}`] : []),
  ];
}
