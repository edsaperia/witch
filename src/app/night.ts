// The page and the night (docs/plans/sail-without-reload.md, section B): the two lifetimes, made explicit. The page is made once
// (the view, the sound, the input, the creator, the freeze, the screen shake...); a night is made per island (its link, tuning,
// game, playtest run, HUD, arrival and flags). main.ts holds the night in one place, `page.night`, and everything that needs the
// game reads it there, so a second night would be picked up everywhere. This is the only place a night begins or ends: the boot
// starts one, and every later one starts in place (the plan's PRs 5 and 6: main.ts sailFromChart and newNight, app/sail.ts; the
// tuning's sail.inPlace, ?sail=reload the old way): a sail, the bed and the bot game's exit, the view
// taking it (View.setGame, render/view.ts), and so does ?debug=sail's window.witch.debugSwap.
import { newGame, type Game } from "../rules/game";
import type { MusicCue } from "../rules/musicPlan";
import type { Tuning } from "../rules/tuning";
import type { MusicStyle } from "../rules/musicScore";
import { PlaytestLog } from "../platform/playtestLog";
import type { Freeze } from "../platform/freeze";
import type { View } from "../render/view";
import { applyLoadRungs } from "./ladder";
import { tuningFromLink } from "./linkParams";
import { applySavedSettings, carryKnobs } from "./settings";
import { linkKnobs } from "./sail";
import { DECISION_LIST } from "../ui/decisions";
import { readyMap, takeMapPrep, useReadyMap } from "./mapPrep";
import type { PrepRecord } from "./mapPrepStore";
import { gameFromLink } from "./gameParams";
import { startKnobs, type World } from "./knobs";
import { Hud } from "./hud";
import { ArrivalFlight } from "./arrive";
import { readArrival, type Arrival } from "./arrival";
import type { ScreenShake } from "./shake";
import type { PerfHud } from "./perfHud";
import type { Sound } from "./sound";

/** What a night is made from: the island, the seed, the world, how it came (the boot; in place, a sail, the bed,
 *  the bot game's exit or ?debug=sail's swap), the chart's flight end when sailing in place, and the link it's read from. */
export interface NightSpec {
  island: string;
  seed: number;
  world?: number;
  how: "boot" | "sail" | "bed" | "bot" | "debug";
  /** The flight's end from the chart, in memory (a sail in place); the boot reads ?arrive=1's from sessionStorage. */
  arrival?: Arrival;
  /** The night's link (the boot: the page's own). */
  params: URLSearchParams;
  /** The boot's map, made in a worker from the page's first moments (app/mapPrep.ts startBootMapPrep): taken if it's this night's. */
  ready?: Promise<PrepRecord | null>;
}

/** The night's own flags, fresh each night (a second night left with the first's would never record to the chart). */
export interface NightFlags {
  /** The start's art made (view.prepare): play can begin. */
  ready: boolean;
  /** Arriving from the chart: the flight has landed (in her bedroom, or with ?opening=old at her decks). */
  landed: boolean;
  /** Arriving from the chart into her bedroom: put in bed before the dive (its last shot there), she wakes as it lands (main.ts arrived). */
  inBed: boolean;
  /** The afterparty recorded on the sea chart (played, nothing found). */
  overRecorded: boolean;
  /** The night recorded on the sea chart (won, or the afterparty). */
  chartRecorded: boolean;
  /** The party spell wanted until the rules have it. */
  castWanted: boolean;
  /** The island's art swapped for tonight's (main.ts revealArt). */
  artRevealed: boolean;
  /** The first frame drawn once ready (app/timing.ts). */
  frame1: boolean;
  /** The frame loop's last time (ms; 0: the next frame's step is none). */
  last: number;
  /** ?debug=attack's last half-second of blows. */
  attackTick: number;
}

export interface Night {
  spec: NightSpec;
  seed: number;
  params: URLSearchParams;
  tuning: Tuning;
  musicStyle: MusicStyle;
  /** The music's cue, carried frame to frame (rules/musicPlan.ts), from the link's ?music= at first. */
  musicCue: MusicCue | undefined;
  /** The world's live knobs (area size, treetop speed, the map's areas) and their built values (app/knobs.ts). */
  world: World;
  WORLD_DEFAULT: World;
  game: Game;
  playtest: PlaytestLog;
  hud: Hud;
  /** Arriving from the chart: the flight from its camera to her bedroom (app/arrive.ts; her decks under ?opening=old); null otherwise. */
  arrival: ArrivalFlight | null;
  flags: NightFlags;
  /** The night's own listeners and timers, undone as it ends (gameParams' arena key). */
  cleanups: (() => void)[];
}

/** Everything kept across nights. main.ts makes it once; the pieces built from the boot's night (the view needs a game) are
 *  filled in after it, and re-pointed by each later night. */
export interface Page {
  night: Night | null;
  /** The night just ended (endNight) while the next one is made: what the page's pieces read meanwhile, and what the next
   *  carries on from (its sliders, the log's hooks, the overlay); let go once the next is on. */
  last?: Night;
  build: string;
  /** Her look now (the creator's), for whether she has a hat to lose. */
  look: () => unknown;
  view?: View;
  sound?: Sound;
  freeze?: Freeze;
  shake?: ScreenShake;
  perfHud?: PerfHud | null;
}

/** Whether her look has a hat to lose on a knockout (rules/hat.ts; Ed, 2026-10-06: "If she chooses no hat in character creation,
 *  then she simply doesn't have this mechanic"): a hat with a spell is a hat, whatever its look (rules/spells.ts). */
export const hasHat = (game: Game, look: unknown): boolean => (look as { hat?: { shape?: string } } | null)?.hat?.shape !== "none" || game.spells.hat !== "none";
/** Her hat on or not by her look; none, none lying about either. */
export function wearHat(game: Game, look: unknown): void { const H = game.witches[0].hat; H.has = hasHat(game, look); if (!H.has) H.down = null; }

const freshFlags = (): NightFlags => ({ ready: false, landed: false, inBed: false, overRecorded: false, chartRecorded: false, castWanted: false, artRevealed: false, frame1: false, last: 0, attackTick: -1 });

/** The playtest log's hooks main.ts sets (they read the holder, so they carry to the next night's log as they are). */
const LOG_HOOKS = ["audioState", "frameState", "gpuState", "viewState", "keyState", "sceneState", "debugInfo", "debugText", "stalls"] as const;

/** A night, made as the boot makes it, in the same order: the tuning from its link and this browser's settings, the game (from the
 *  chart's map prep if it's this night's), the link's switches for the game, her hat, a new playtest run, the knobs' start, the HUD
 *  and the arrival. The page's pieces already made are re-pointed at it; then it's `page.night`. */
export async function startNight(page: Page, spec: NightSpec): Promise<Night> {
  // (the boot's is a page's first night only; every later one comes in place, View.setGame taking it)
  const old = page.night ?? page.last ?? null;
  if (old && spec.how === "boot") throw new Error("startNight: the boot's night is the page's first only");
  if (page.night) closeNight(page.night);
  const { params, seed } = spec;
  // The link's switches and the tuning for this night (app/linkParams.ts).
  const { tuning, musicStyle, musicCue, world, WORLD_DEFAULT } = tuningFromLink(params);
  // The settings this browser remembers (the volumes, the waves' speed: app/settings.ts), on to their knobs before the game and
  // the sound are made; a knob the link's ?set= gives keeps the link's (a repro link), and ?pulse= is over the waves' (app/gameParams.ts).
  const linkSets = new Set((params.get("set") ?? "").split(";").map(p => p.split("=")[0]).filter(Boolean));
  applySavedSettings(tuning, undefined, linkSets);
  applyLoadRungs(tuning, linkSets); // (the quality ladder's load rungs: app/ladder.ts)
  // A night after another on this page: every pause-page slider as it was set (Ed's decision 5: the game's knobs too), on purpose,
  // but for those this night's link sets itself.
  if (old) carryKnobs(old.tuning, tuning, DECISION_LIST, linkKnobs(params, DECISION_LIST));
  // Sailed here (&arrive=1, or in place): the island's map made already, in a worker while the chart flew (app/mapPrep.ts), if it's this night's.
  // (the boot: its own map, if the worker it started at once has it: app/mapPrep.ts startBootMapPrep)
  const sailed = !!params.get("arrive") || spec.how === "sail", mapPrep = sailed ? await takeMapPrep(seed, tuning) : spec.ready ? useReadyMap(await spec.ready, seed, tuning) : null;
  // (a task of its own from here: what follows, the game and the View, would otherwise run in IndexedDB's success callback and be
  // blamed on it, as Ed's laptop's stall log did, 2026-10-20)
  if (sailed) await new Promise(res => setTimeout(res, 0));
  performance.mark("witch:prep");
  // (the map: from the prep, guarded, or made as ever; ?timing=1 has its own step, witch:map-prep)
  const map = mapPrep ? readyMap(seed, tuning, mapPrep) : undefined;
  if (mapPrep) performance.mark("witch:map-prep");
  const game = newGame(seed, tuning, 1, map);
  performance.mark("witch:game");
  const cleanups: (() => void)[] = [];
  // The link's switches for the game: the spell, buffs, quest, party's over, arena and waves (app/gameParams.ts).
  cleanups.push(gameFromLink(game, tuning, params));
  wearHat(game, page.look());
  // The playtest log (Ed, 2026-10-04): a new run each night, or the nights would merge under the first's seed.
  const playtest = new PlaytestLog(game, page.build);
  if (old) for (const k of LOG_HOOKS) (playtest as unknown as Record<string, unknown>)[k] = old.playtest[k];
  // The debug knobs' start for this night: the link's fight and treetop speed (app/knobs.ts).
  startKnobs({ tuning, game, world, playtest }, WORLD_DEFAULT, params);
  // The clock, its pops and the debug overlay (app/hud.ts); the overlay as it was.
  const hud = new Hud(game);
  hud.setDebug(old ? old.hud.debugOn : params.has("debug"));
  const night: Night = { spec, seed, params, tuning, musicStyle, musicCue, world, WORLD_DEFAULT, game, playtest, hud, arrival: nightArrival(spec, tuning), flags: freshFlags(), cleanups };
  page.freeze?.retarget(game, seed);
  page.shake?.retarget(game, tuning);
  page.perfHud?.retarget(game);
  if (old) page.sound?.setNight(tuning, seed, musicStyle);
  // The page's own switch the boot puts on its night's tuning once the night is made (main.ts styleFromLink: the prop generator's
  // party pieces, which the rules' party places and the view's dressings read), on each later night's at the same point.
  if (old) tuning.partyObjects.generated = old.tuning.partyObjects.generated;
  if (old) await page.view?.setGameSliced(game); // (the view's island and records, tonight's, built a frame's budget at a time: render/view.ts; its start's art is the caller's, view.prepare)
  page.night = night;
  page.last = undefined;
  return night;
}

/** Arriving from the sea chart (?arrive=1; Ed, 2026-10-12, the zoom-to-island plan; rules/arrive.ts, app/arrive.ts): the chart's
 *  last frame (index.html put it up) while the night builds, then the flight from the chart's camera down to her asleep in her bed
 *  (Ed, 2026-10-25: main.ts puts her there first, app/opening.ts sailLandsInBed; her decks under ?opening=old). */
function nightArrival(spec: NightSpec, tuning: Tuning): ArrivalFlight | null {
  const stillEl = typeof document === "undefined" ? null : document.getElementById("arrive-still") as HTMLImageElement | null;
  const r = spec.arrival ?? (spec.params.get("arrive") === "1" && tuning.arrive ? readArrival(tuning.map?.island ?? "") : null); // (read once: a reload doesn't fly again)
  if (!r || !tuning.arrive) { stillEl?.remove(); return null; }
  return new ArrivalFlight(r, tuning.arrive, stillEl);
}

/** A night made under the sea chart as it flew (a sail in place, main.ts): its arrival once the chart hands over, the chart's last
 *  frame up (showStill) for the flight to take over from. */
export function flyIn(n: Night, r: Arrival): ArrivalFlight | null {
  return (n.arrival = nightArrival({ ...n.spec, arrival: r }, n.tuning));
}

/** The night over (a sail in place, before the next is made; the sea chart is recorded where the night ends, in main.ts): its own
 *  listeners undone and the page's per-night DOM put back; kept as `page.last` till the next is on. `strict` (?debug=sail): its game
 *  marked disposed, so a reader left on it that steps it throws (rules/game.ts stepGame). */
export function endNight(page: Page, strict = false): void {
  const n = page.night;
  if (!n) return;
  closeNight(n);
  if (strict) n.game.disposed = true;
  page.last = n;
  page.night = null;
}

/** A night's own listeners undone and the page's per-night DOM put back (as it ends, or as the next one starts in its place). */
function closeNight(n: Night): void {
  for (const f of n.cleanups) f();
  n.cleanups.length = 0;
  resetDom();
}

/** The DOM a night leaves behind, back as a fresh page has it: the clock's classes and pops, the arrival's
 *  hold on the HUD, the canvas's shake, the sound note. */
export function resetDom(): void {
  if (typeof document === "undefined") return;
  const clock = document.getElementById("clock");
  if (clock) { clock.classList.remove("on", "paused", "lost"); clock.querySelectorAll(".boot-pop, .loss-pop").forEach(p => p.remove()); }
  document.body.classList.remove("arriving");
  const canvas = document.getElementById("game") as HTMLCanvasElement | null;
  if (canvas) canvas.style.transform = "";
  document.getElementById("sound-note")?.remove();
}
