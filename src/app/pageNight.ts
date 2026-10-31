// A4 mechanical extraction from src/main.ts; body identity is checked by tools/refactor/a4-split.mjs.
import type { PageHost } from "../main";
import { slotStorage } from "./saveSlots";
import { wavesOver } from "../rules/win";
import { closeChart, openChart, finishChartFlight, type Sailed } from "../ui/chartOverlay";
import { openingWay, sailLandsInBed } from "./opening";
import { wakeInBedroom } from "../rules/opening";
import { startWake } from "../rules/wakeUp";
import { WakeCard } from "../render/wakeUp";
import { carryTiming, clearCarried, mark } from "./timing";
import { type Tuning } from "../rules/tuning";
import { diveReach, diveTrack, handoffShot, newFlightClock, stepFlightClock, type Shot } from "../rules/arrive";
import { nextFrame, runSliced } from "../render/slices";
import { awaitingSpell } from "../rules/leypulse";
import { loadGenome } from "../ui/creator";
import { unlockAll } from "./debugUnlock";
import { dreamsAfter } from "./loan";
import { loadSave, sailNight, storeSave } from "./chartSave";
import { endNight, flyIn, startNight, type Night, type NightSpec } from "./night";
import { chartIsland, nightFromHref, nightHref, sailOrReload, sailParams, sailWay, stayLabel, type NightWay } from "./sail";
import { hudFade, showStill } from "./arrive";
import { forgetArrival, type Arrival } from "./arrival";
import type { FlightEnd } from "../render/chart/seaChart";
import { logCaughtError } from "../platform/playtestLog";
import { pageMutation } from "./recordingHooks";

export function revealArt(pageHost: PageHost): void {
  const F = pageHost.N().flags;
  if (F.artRevealed) return;
  F.artRevealed = true;
  const swapped = pageHost.view.assets.swapTonight();
  if (swapped.length) pageHost.view.retype(swapped);
  mark("game:reveal");
}

export function bedFirst(pageHost: PageHost, n: Night): void {
  pageMutation(n.game, "wake: bed arrival", () => pageHost.bedFirstNow(n));
}

export function bedFirstNow(pageHost: PageHost, n: Night): void {
  n.flags.inBed = sailLandsInBed(n.params, n.tuning) && wakeInBedroom(n.game);
  if (!n.flags.inBed) pageHost.dreamAfterDive = null;
}

export function arrived(pageHost: PageHost): void {
  pageHost.mutate("house: arrival", pageHost.arrivedNow);
}

export function arrivedNow(pageHost: PageHost): void {
  pageHost.logTiming(); clearCarried(); // (?timing=1: the whole sail, from the chart to her decks)
  pageHost.N().flags.landed = true;
  document.body.classList.remove("arriving"); // (the HUD fades in)
  pageHost.sound.sailing(0); // (sailed in place: the sea and the wind fade as the night's start comes in)
  const n = pageHost.N();
  if (pageHost.view.shaderLandingLimited && n.flags.inBed && !pageHost.view.landingWakeReady()) {
    startWake(n.game, n.game.herTime, { dreaming: true, mirrored: pageHost.mirrored(), yesterday: true });
    pageHost.landingSleep.begin(n.game); pageHost.view.landingSleeping = true; pageHost.view.foot = 1; pageHost.view.seatK = 0; n.game.clock.paused = true;
    pageHost.input.release(); pageHost.input.clearPresses(); (pageHost.wakeCard ??= new WakeCard()).sleep();
    mark('landing:asleep'); return;
  }
  pageHost.wakeArrival();
}

export function wakeArrival(pageHost: PageHost): void { pageHost.mutate("wake: arrival", pageHost.wakeArrivalNow); }

export function wakeArrivalNow(pageHost: PageHost): void {
  pageHost.view.landingSleeping = false;
  // (landed asleep in her bed: with a loan settled, dreaming it, the alarm when it ends; else the alarm at once: rules/wakeUp.ts, render/dream.ts)
  const dd = pageHost.dreamAfterDive;
  pageHost.dreamAfterDive = null;
  if (pageHost.N().flags.inBed && startWake(pageHost.N().game, pageHost.N().game.herTime, { dreaming: !!dd, mirrored: pageHost.mirrored(), yesterday: true }) && dd) pageHost.startDream(dd); // (a sail: a night played, last night's clothes in their pile)
  if (pageHost.start()) pageHost.queueCast(); // (woken in her bedroom, the dive's landing: not yet, rules/wakeUp.ts)
  if (pageHost.N().game.wake) mark("opening:alarm");
  if (!pageHost.gestured) pageHost.soundNote(); else pageHost.sound.wake();
}

export function start(pageHost: PageHost): boolean {
  if (pageHost.sailing) return false; // (the next night being made in place)
  const { game, flags, arrival } = pageHost.N();
  if (pageHost.landingSleep.holds(game)) return false;
  if (!flags.ready || !game.clock.paused || pageHost.freeze.frozen) return false;
  if (pageHost.creator.open) return true;
  pageHost.sound.start(); // (browsers keep sound off until the player presses something: the start is that press)
  if (!arrival) pageHost.revealArt(); // (play starting from behind the bedroom or the start screen: the island not seen till now)
  pageHost.mutate("start play", () => { game.clock.paused = false; });
  pageHost.startedNights.add(game);
  pageHost.startEl.style.display = "none";
  pageHost.input.clearPresses();
  return true;
}

export function startDirect(pageHost: PageHost): void { if (pageHost.start() && !pageHost.gestured) pageHost.soundNote(); }

export function dressCreator(pageHost: PageHost): void {
  if (pageHost.dressed) return;
  pageHost.dressed = true;
  const keys = pageHost.startEl.querySelector<HTMLElement>(".keys");
  if (keys) pageHost.creator.addTab("controls", "❔ Controls", [keys]);
  if (pageHost.shakeEl) pageHost.creator.addTab("options", "⚙ Options", [pageHost.shakeEl]);
  // The zoo (Ed, 2026-10-13: ?zoo, "plus a Zoo button"): every creature in its own block, out of a run.
  pageHost.creator.addButton("Zoo", () => { const u = new URL(location.href); u.searchParams.set("zoo", "1"); location.href = u.toString(); });
}

export function chartOverNight(pageHost: PageHost, table?: string): void {
  const n = pageHost.N(), island = chartIsland(n.tuning.map?.island);
  const here = island ? { island, world: n.tuning.map?.world ?? 0, label: stayLabel(n.game.partyOver ? "over" : n.game.win?.phase === "won" ? "won" : "on") } : undefined;
  if (table) pageHost.chartAt = table;
  openChart((href, to) => { pageHost.chartAt = null; void pageHost.sailFromChart(href, to); }, pageHost.chartWorldArg(), { here, onDepart: pageHost.departFromChart, onStay: () => console.info(`sea chart: ${island} chosen, she's there: back to the night (seed ${pageHost.N().seed}, game time ${pageHost.N().game.clock.time.toFixed(1)} s)`),
    onFly: () => pageHost.view.beginLandingShaders(true),
    onLandingDue: dueAt => pageHost.view.startLandingShaderGrace(dueAt),
    ...(table ? { table: { onLeave: () => { pageHost.chartAt = null; closeChart(); } } } : {}) });
}

export function chartWorldArg(pageHost: PageHost): number | undefined { return new URLSearchParams(location.search).has("world") ? pageHost.N().tuning.map?.world : undefined; }

export function sailFromChart(pageHost: PageHost, href: string, to: Sailed): Promise<boolean> {
  const d = pageHost.departing?.island === to.island && pageHost.departing.seed === to.seed ? pageHost.departing : null;
  pageHost.departing = null;
  if (!d) pageHost.recordSail();
  if (sailWay(pageHost.N().params, pageHost.N().tuning) === "reload") { location.href = href; return Promise.resolve(false); }
  return sailOrReload(() => pageHost.sailInPlace(to, d?.night), href, h => { location.href = h; }, e => {
    console.error("sail in place: it went wrong, so the island's page loads instead", e);
    pageHost.N().playtest.sail(String((e as Error)?.stack ?? e).slice(0, 600));
  });
}

export function recordSail(pageHost: PageHost): void {
  pageHost.page.onNightEnd?.();
  // (she sleeps as she sails: tonight's loan settled, and its dream after the dive, in bed: Ed, 2026-10-24)
  pageHost.dreamAfterDive = dreamsAfter("sail") ? pageHost.settleLoan(pageHost.N().game.win?.phase === "won") : null;
  const n = pageHost.N(), W = n.tuning.map?.world ?? 0, save = loadSave();
  if (save.world === W) storeSave(sailNight(save, n.tuning.map?.island ?? "", !wavesOver(n.game) && !n.flags.chartRecorded && !n.flags.overRecorded));
  carryTiming(); // (?timing=1: the chart page's steps carried to the next, app/timing.ts)
}

export function departFromChart(pageHost: PageHost, to: Sailed, at: FlightEnd["cam"] | null): Promise<void> {
  if (sailWay(pageHost.N().params, pageHost.N().tuning) === "reload") return Promise.resolve();
  pageHost.recordSail();
  const night = pageHost.makeSailNight(to, undefined, at);
  pageHost.departing = { island: to.island, seed: to.seed, night };
  return night.then(() => undefined, () => undefined);
}

export function wakeFirst(pageHost: PageHost): void {
  pageHost.mutate("wake: first morning", pageHost.wakeFirstNow);
}

export function wakeFirstNow(pageHost: PageHost): void {
  const n = pageHost.N();
  pageHost.bootAsleep = false;
  pageHost.firstEver = !pageHost.wokenBefore();
  if (!wakeInBedroom(n.game) || !startWake(n.game, n.game.herTime, { mirrored: pageHost.mirrored() })) { pageHost.wakeCard?.hide(); pageHost.dressCreator(); pageHost.creator.show(); return; }
  mark("opening:wake");
  pageHost.start();
  if (!pageHost.gestured) pageHost.soundNote(); else pageHost.sound.wake(); // (the alarm heard once she's pressed something: browsers keep sound off till then)
}

export async function sailInPlace(pageHost: PageHost, to: Sailed, made?: Promise<Night>): Promise<void> {
  const arrival: Arrival | undefined = to.end ? { v: 1, island: to.island, world: to.world ?? loadSave().world, at: Date.now(), ...to.end } : undefined;
  if (arrival) { showStill(arrival, !made); hudFade(pageHost.HUD_IDS); document.body.classList.add("arriving"); pageHost.armSkip(); } // (made under the flight: no "landing…", the still goes at once)
  const n = await (made ?? pageHost.makeSailNight(to, arrival));
  if (made && arrival) flyIn(n, arrival); // (made under the chart's flight: its hand-off, the still its last frame)
  if (n.arrival) n.arrival.onReveal = pageHost.revealArt;
  n.flags.ready = true;
  pageHost.input.clearPresses();
  pageHost.sailing = false;
  if (n.arrival) {
    n.arrival.begin(n.game, !!made); // the camera takes over from the chart's still
    if (pageHost.view.shaderLandingLimited) n.arrival.skip(); // map/house readiness still applies; shaders add no further flight/warm-up wait
  }
  else pageHost.arrived(); // (no flight: the chart couldn't fly)
}

export async function makeSailNight(pageHost: PageHost, to: Sailed, arrival?: Arrival, at?: FlightEnd["cam"] | null): Promise<Night> {
  if (pageHost.sailFail) throw new Error("?debug=sail: the sail in place made to fail"); // (window.witch.sail's test of the fallback)
  if (at === undefined) pageHost.view.beginLandingShaders(false);
  pageHost.sailing = true;
  pageHost.gestured = true; // (she's played: the sound's woken already)
  pageHost.sound.sailing(1);
  forgetArrival(); // (the reload's copy, sessionStorage's: a reload later doesn't fly again)
  pageHost.chartHeld = false; pageHost.view.assets.hold(false); // (the chart closed, or flying in: the art workers free for the next island)
  endNight(pageHost.page, pageHost.params.get("debug") === "sail");
  const p = sailParams(new URLSearchParams(location.search), to.island, to.seed, to.world);
  pageHost.backGuard.sailed("?" + p.toString() + location.hash);
  pageHost.armBack();
  const n = await startNight(pageHost.page, { how: "sail", island: to.island, seed: to.seed, world: to.world, arrival, params: p });
  pageHost.seedEl.innerHTML = `seed <a href="?seed=${n.seed}">${n.seed}</a>`;
  pageHost.bedFirst(n); // (the flight in ends on her asleep in her bedroom, rules/opening.ts)
  pageHost.lastDraw = 0;
  const A = n.tuning.arrive;
  await pageHost.view.prepare({ sail: true, ...(A && at !== undefined ? { dive: diveReach(n.game.map, A), track: diveTrack(n.game.map, A) } : {}) });
  if (at && A && !pageHost.view.shaderLandingLimited) await pageHost.warmAt(n, handoffShot({ cam: at }, n.game.map), A);
  if (pageHost.view.shaderLandingLimited) await pageHost.view.waitForLandingWitch();
  if (pageHost.view.shaderLandingLimited) finishChartFlight();
  mark("sail:ready");
  return n;
}

export async function warmAt(pageHost: PageHost, n: Night, shot: Shot, A: NonNullable<Tuning["arrive"]>): Promise<void> {
  await runSliced(pageHost.view.heights.fillSteps(shot.tx, shot.tz), "handoff-heights");
  const c = newFlightClock();
  pageHost.view.fly = shot;
  pageHost.view.assets.hold(true); // (the art workers paused for them: the first draws not fighting them for the machine)
  try {
    while (!stepFlightClock(c, performance.now(), A).faded) {
      pageHost.view.limitedLandingReady();
      if (pageHost.view.shaderLandingLimited) break;
      const t0 = performance.now();
      pageHost.view.render(n.game.clock.time);
      try {
      pageHost.stallLog.frame({ t: n.game.clock.time, gap: 0, work: performance.now() - t0, step: 0, draw: performance.now() - t0, measured: { step: false, draw: true }, parts: Object.fromEntries(Object.entries(pageHost.view.ms).map(([name, ms]) => [`draw.${name}`, ms])), source: "warm-draw", loading: { phase: "handoff-warm", ready: n.flags.ready, ...pageHost.view.readiness }, mode: n.game.witch.mode, x: n.game.witch.x, z: n.game.witch.z, wave: n.game.party.wave, creatures: n.game.creatures.length });
      } catch (error) { logCaughtError(error, "warm-draw observation"); }
      if (pageHost.TIMING) console.info(`sail-timing: warm frame ${Math.round(performance.now() - t0)} ms`, JSON.stringify(Object.fromEntries(Object.entries(pageHost.view.ms).filter(([, v]) => v > 20).map(([k, v]) => [k, Math.round(v)]))));
      await nextFrame();
    }
  } finally { pageHost.view.fly = null; pageHost.view.assets.hold(false); }
}

export function newNight(pageHost: PageHost, how: NightWay): void {
  if (pageHost.sailing) return;
  pageHost.page.onNightEnd?.();
  // (she sleeps: tonight's loan settled, won or not, and on the bed's way she dreams it: app/loan.ts, render/dream.ts)
  const settled = pageHost.settleLoan(pageHost.N().game.win?.phase === "won");
  pageHost.dreamNext = dreamsAfter(how) ? settled : null;
  const n = pageHost.N(), href = nightHref(how, location.href);
  const reload = (h: string) => { location.href = h; };
  if ((pageHost.botKind && how !== "bot") || sailWay(n.params, n.tuning) === "reload") { reload(href); return; }
  void sailOrReload(() => pageHost.nightInPlace(nightFromHref(how, href), href), href, reload, e => {
    console.error(`a new night in place (${how}): it went wrong, so the page loads instead`, e);
    pageHost.N().playtest.sail(String((e as Error)?.stack ?? e).slice(0, 600));
  });
}

export async function nightInPlace(pageHost: PageHost, spec: NightSpec, href: string): Promise<void> {
  if (pageHost.sailFail) throw new Error("?debug=sail: the night in place made to fail");
  if (pageHost.freeze.frozen) pageHost.freeze.toggle(); // (a fresh page isn't paused: the bot game's Esc out pauses it too, the freeze's key first)
  pageHost.sailing = true;
  pageHost.sound.music?.fadeOut(pageHost.N().tuning.sfx.sail?.fade ?? 1.5); // (a fresh page's music is silent till the home speakers boot)
  pageHost.chartHeld = false; pageHost.view.assets.hold(false);
  endNight(pageHost.page, pageHost.params.get("debug") === "sail");
  if (spec.how === "bot") pageHost.leaveBot();
  const u = new URL(href);
  pageHost.backGuard.sailed(u.search + u.hash);
  pageHost.armBack();
  // After the bed in the new opening (Ed's decision 10): asleep in the dark while the next island's made, then the wake-up (one for every morning since Ed, 2026-10-26)
  // in her bedroom, its curtains waiting on that island's build (rules/wakeUp.ts); else the bedroom as the loading screen, as before.
  const wakes = spec.how === "bed" && openingWay(spec.params, pageHost.N().tuning) === "bedroom";
  const room = !wakes && spec.params.get("creator") !== "0";
  pageHost.startEl.classList.add("loading");
  pageHost.startEl.style.display = "none";
  if (room) { pageHost.dressCreator(); pageHost.creator.show(); }
  if (wakes) (pageHost.wakeCard ??= new WakeCard()).sleep();
  if (wakes && pageHost.dreamNext) pageHost.startDream(pageHost.dreamNext);
  pageHost.dreamNext = null;
  const n = await startNight(pageHost.page, spec);
  pageHost.seedEl.innerHTML = `seed <a href="?seed=${n.seed}">${n.seed}</a>`;
  pageHost.creator.loadout = { hat: n.game.spells.hat }; pageHost.creator.hats = unlockAll() ? undefined : n.game.spells.hats;
  pageHost.lastDraw = 0;
  await pageHost.view.prepare();
  n.flags.ready = true;
  pageHost.startEl.classList.remove("loading");
  pageHost.input.clearPresses();
  pageHost.sailing = false;
  if (wakes && wakeInBedroom(n.game) && startWake(n.game, n.game.herTime, { dreaming: !!pageHost.dream && !pageHost.dream.over, mirrored: pageHost.mirrored(), yesterday: true })) { mark("opening:bed"); pageHost.start(); } // (after the bed: last night's clothes in their pile)
  else if (!room && !wakes) pageHost.startDirect();
}

export function leaveBot(pageHost: PageHost): void {
  pageHost.botTag?.dispose();
  pageHost.bot = null; pageHost.botTag = null; pageHost.botKind = null;
  const look = loadGenome();
  pageHost.lookNow = JSON.stringify(look);
  pageHost.showLook();
}

export function chartWorld(pageHost: PageHost): number { return (pageHost.params.has("world") ? pageHost.N().tuning.map?.world ?? 0 : loadSave().world); }

export function soundNote(pageHost: PageHost): void {
  if (document.getElementById("sound-note")) return;
  const el = document.createElement("div");
  el.id = "sound-note"; el.textContent = "🔊 press any key for sound";
  el.style.cssText = "position:fixed;left:50%;bottom:72px;transform:translateX(-50%);z-index:30;font:13px ui-monospace,monospace;color:#e8e2f4;background:rgba(10,9,22,.7);border:1px solid #3a2f5c;border-radius:6px;padding:6px 12px;pointer-events:none";
  document.body.append(el);
  const go = () => { pageHost.gestured = true; pageHost.sound.wake(); el.remove(); removeEventListener("keydown", go); removeEventListener("pointerdown", go); };
  addEventListener("keydown", go); addEventListener("pointerdown", go);
}

export function armSkip(pageHost: PageHost): void {
  if (pageHost.skipArmed) return;
  pageHost.skipArmed = true;
  for (const ev of ["keydown", "pointerdown"]) addEventListener(ev, () => { pageHost.gestured = true; const a = pageHost.N().arrival; if (a && !a.done) a.skip(); }, { capture: true });
}

export function queueCast(pageHost: PageHost): void { const n = pageHost.N(); if (awaitingSpell(n.game.party) && !n.game.wake) n.flags.castWanted = true; }

export function armBack(pageHost: PageHost): void { if (pageHost.backArmed) return; pageHost.backArmed = true; addEventListener("popstate", () => pageHost.backGuard.popped()); }

export function wokenBefore(pageHost: PageHost): boolean { try { return slotStorage.getItem(pageHost.WOKEN_KEY) === "1"; } catch { return false; } }

export function woke(pageHost: PageHost): void { try { slotStorage.setItem(pageHost.WOKEN_KEY, "1"); } catch { /* storage blocked: her first morning again next time */ } }

export function mirrored(pageHost: PageHost): boolean { try { return slotStorage.getItem(pageHost.MIRROR_KEY) === "1"; } catch { return false; } }

export function sawMirror(pageHost: PageHost): void { try { slotStorage.setItem(pageHost.MIRROR_KEY, "1"); } catch { /* storage blocked: marked again next time */ } }
