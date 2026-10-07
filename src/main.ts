// Starts the prototype: the seed from the URL, the game rules, the view, input, and the loop.
import { FrameStats } from "./platform/frameStats";
import { musicCue } from "./rules/musicPlan";
import { areaUnderWitch, interpolated, newGame, STEP, stepGame } from "./rules/game";
import { awaitingSpell } from "./rules/leypulse";
import { parseSeed } from "./rules/map";
import { Input } from "./platform/input";
import { View } from "./render/view";
import { placed } from "./render/height";
import { Vector3 } from "three";
import { CHANGELOG_VERSIONS } from "./changelog";
import { setupStartScreen, startOnGesture } from "./ui/startScreen";
import { AimHud } from "./render/aimhud";
import { UPCOMING } from "./ui/upcoming";
import { PlaytestLog } from "./platform/playtestLog";
import { StallLog } from "./platform/stallLog";
import { Freeze } from "./platform/freeze";
import { Creator, loadGenome } from "./ui/creator";
import { BOT_KINDS, type BotKind } from "./rules/botKinds";
import type { Bot } from "./rules/bot";
import type { BotTag } from "./ui/botGame";
import { pleasingWitch } from "./ui/looks";
import type { DecidePanel } from "./ui/decide";
import { tuningFromLink } from "./app/linkParams";
import { Hud } from "./app/hud";
import { setupKnobs } from "./app/knobs";
import { Sound } from "./app/sound";
import { OutputMeter } from "./platform/audio/outputMeter";
import { gameFromLink } from "./app/gameParams";
import { styleFromLink, viewFromLink } from "./app/viewParams";
import { setupActionBar, setupDebugKeys } from "./app/keys";
import { ScreenShake } from "./app/shake";
import { playerPick as makePlayerPick } from "./app/playerPick";
import { installHooks } from "./app/hooks";
import { installPixelUi } from "./ui/pixelUi";
import { debugBlows } from "./rules/alarms";

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
// The link's switches for the game: the spell, buffs, quest, party's over, arena and waves (app/gameParams.ts).
const { WAVE_CHOICES, setWaveInterval, waveChoice } = gameFromLink(game, tuning, params);
const canvas = document.getElementById("game") as HTMLCanvasElement;
// The art is drawn for the pixel size the game renders at (the tuning file's), not the Lab's.
const style = styleFromLink(params, tuning, propsGen); // (app/viewParams.ts)
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
viewFromLink(view, params); // (app/viewParams.ts)
void installPixelUi(); // (the pixel font, for the HUD's edge cues' labels too: render/indicator.ts)
const ATTACK_DEBUG = params.get("debug") === "attack";
let attackTick = -1;
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
setupDebugKeys(view, input, params); // (app/keys.ts)
// The playtest log (Ed, 2026-10-04): a sample every 10 s of play, kept on this browser; L, or
// opening the game with ?playtest=download, saves the last few runs as JSON.
const playtest = new PlaytestLog(game, typeof __BUILD__ === "string" ? __BUILD__ : "dev");
window.addEventListener("keydown", e => { if (e.code === "KeyL" && !e.repeat) playtest.download(); });
if (params.get("playtest") === "download") setTimeout(() => playtest.download(), 500);

// The debug knobs: the fight's scale and speed, the treetop speed (app/knobs.ts).
const knobs = setupKnobs(tuning, game, world, WORLD_DEFAULT, params, playtest);

// The action bar, H shows or hides it (app/keys.ts).
setupActionBar(view);

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
  const look = pleasingWitch(seed!);
  lookNow = JSON.stringify(look); view.setWitch(look); wearHat(look);
  if (creator.open) creator.hide();
  void Promise.all([import("./rules/bot"), import("./ui/botGame")]).then(([{ BOT_GAME, newBot }, { BotTag }]) => {
    bot = newBot(kind, BOT_GAME[kind]); // (the skilled one questing, bringing relics and feeding: rules/bot.ts BOT_GAME)
    botTag = new BotTag(kind, () => { const u = new URL(location.href); u.searchParams.delete("bot"); location.href = u.toString(); });
    if (ready) start(); // (else the forest's ready starts it)
  });
}
if (botParam && BOT_KINDS.includes(botParam)) botGame(botParam);
else if (params.get("creator") !== "0") creator.show();
const lookBtn = document.getElementById("look-btn");
if (lookBtn) {
  for (const ev of ["pointerdown", "pointerup", "click", "touchstart"]) lookBtn.addEventListener(ev, e => e.stopPropagation()); // (not a start)
  lookBtn.addEventListener("click", () => { if (ready && game.clock.paused) creator.show(); });
}
// (the bedroom has the dev "Player:" pick above in place of a Bot game button)
// The dev "Player:" pick (app/playerPick.ts).
const playerPick = makePlayerPick(params, creator);
const botBtn = document.getElementById("bot-btn");
if (botBtn) {
  for (const ev of ["pointerdown", "pointerup", "click", "touchstart"]) botBtn.addEventListener(ev, e => e.stopPropagation()); // (not a start of her own)
  botBtn.addEventListener("click", () => { if (!game.clock.paused) return; botGame("skilled"); }); // (it starts as soon as it and the forest are ready)
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
// Screen shake when she's hit, and the camera's sub-pixel glide (app/shake.ts).
const shake = new ScreenShake(game, tuning, view, canvas, params), shakeEl = shake.option;
// No start card before her room (Ed, 2026-10-06: "There is something before the bedroom… can we skip it and go straight to
// the bedroom?"): with the character creator the page opens straight into it, and the card's contents live in its tabs
// (❔ Controls, also the ? key; 📜 What's new; ⚙ Options: the waves and the screen shake). The card itself shows only for a
// run without the creator (?creator=0: the tools and smoke runs, "press any key") or a bot game while the forest grows.
if (params.get("creator") !== "0" && !botKind) {
  const keys = startEl.querySelector<HTMLElement>(".keys"), news = startEl.querySelector<HTMLElement>(".ss-body");
  if (keys) creator.addTab("controls", "❔ Controls", [keys]);
  if (news) creator.addTab("news", "📜 What's new", [news]);
  creator.addTab("options", "⚙ Options", [wavesEl, ...(shakeEl ? [shakeEl] : [])]);
} else startEl.style.display = "";
if (params.get("glide") === "camera") view.glide = "camera"; // (?glide=camera: the glide by the camera's snap, as before 2026-10-06)
// Ed's decisions panel (src/ui/decide.ts, config/decisions.json): ?decide opens it, F2 opens and closes it. Its code loads
// only then (overnight phase 2: out of the game's bundle); its knobs' choices in the link are put on as the game starts
// (ui/decisions.ts, app/linkParams.ts).
let decide: DecidePanel | null = null, decideLoading = false;
const decidePanel = (open: boolean) => {
  if (decide || decideLoading) return;
  decideLoading = true;
  void import("./ui/decide").then(({ DecidePanel }) => { decide = new DecidePanel({ tuning: game.tuning, seed: game.seed, version: typeof __BUILD__ === "string" ? __BUILD__ : "dev", live: { glide: v => { view.glide = v === "camera" ? "camera" : "witch"; } } }, open); });
};
if (params.has("decide")) decidePanel(true);
window.addEventListener("keydown", e => { if (e.code !== "F2") return; e.preventDefault(); if (decide) decide.toggle(); else decidePanel(true); });
document.addEventListener("visibilitychange", () => { if (document.hidden) last = 0; });

let lastDraw = 0;
let last = 0;
const frameStats = new FrameStats(view.renderer.getContext());
// Frames of 100 ms or more, with what they spent it on (Ed, 2026-10-06: occasional half-second freezes): the overlay and the playtest log.
const stallLog = new StallLog();
playtest.stalls = () => stallLog.stalls;
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
  const w = game.witch, ago = performance.now() / 1000 - e.start;
  const r2 = (x: number) => Math.round(x * 100) / 100, { lastMix, music, audio } = sound;
  playtest.silence({ t: Math.round((game.clock.time - ago) * 10) / 10, dur: Math.round(e.dur * 100) / 100, x: Math.round(w.x), z: Math.round(w.z), area: areaUnderWitch(game), mode: w.mode, mix: r2(lastMix?.volume ?? 0), gain: music ? r2((music.output as GainNode).gain.value) : 0, state: audio?.state ?? "none", clock: meter.reading.clock, back: e.db, stall: nearestStall(e.start) });
  console.warn(`audio: the output silent for ${e.dur.toFixed(2)} s while the music should be heard`);
};
const micWanted = params.get("micCheck") === "1";
/** Driven from outside (the perf check, tools/smoke): the loop below stands still, and
 *  window.witch.frame steps and draws one frame of a fixed length instead. */
const loop = { manual: false, get bot() { return bot; }, get botTag() { return botTag; }, get ready() { return ready; } };
let overShown = false;
document.getElementById("again")?.addEventListener("click", () => location.reload());
document.getElementById("over-close")?.addEventListener("click", () => document.getElementById("over")!.classList.remove("on"));
document.getElementById("fresh")?.addEventListener("click", () => { const u = new URL(location.href); u.searchParams.set("seed", String(Math.floor(Math.random() * 1e6))); location.href = u.toString(); });
function frame(now: number): void {
  requestAnimationFrame(frame);
  if (loop.manual) return;
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
  // ?debug=attack: every 10 s, a few seconds of blows on the two soundsystems farthest from her (never felling one), so the
  // 🔇 alarm (render/alarm.ts) shows whenever she's away from them.
  if (ATTACK_DEBUG && !game.clock.paused) { const tt = game.clock.time, ph = tt % 10; if (ph < 4 && Math.floor(tt * 2) !== attackTick) { attackTick = Math.floor(tt * 2); debugBlows(game.combat.sounds, game.combat.events, game.witch.x, game.witch.z, tt); } }
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
  if (sound.audio) {
    meter.tap(sound.audio, [sound.music?.output, sound.music?.circleOutput, sound.sfx?.output]);
    meter.read(performance.now(), sound.musicExpected());
    if (micWanted && !meter.mic && startEl.style.display === "none") meter.startMic(e => {
      const pageS = performance.now() / 1000;
      playtest.mic({ kind: e.kind, t: Math.round(game.clock.time * 10) / 10, dur: Math.round(e.dur * 100) / 100, outDb: e.outDb, micDb: e.micDb, lag: Math.round(e.lag * 1000), stall: nearestStall(pageS) });
    });
  }
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
  shake.apply();
  freeze.update();
  // The overlay (app/hud.ts), four times a second.
  hud.overlay(now, () => {
    const w = game.witch, s = view.stats;
    return [
      ...frameStats.lines(),
      stallLog.line(),
      meter.line(),
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


// For the smoke test, the tools and for poking at in the console (app/hooks.ts).
installHooks({ game, view, tuning, hud, sound, meter, shake, loadTimes, loop });
