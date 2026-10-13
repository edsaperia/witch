// The debug knobs: the fight's scale, speed and momentum, and the treetop speed, live, with keys, on the pause page's sliders
// (Ed, 2026-10-13: "There are controls in the bottom left that should be in the pause tab": config/decisions.json's "Debug
// knobs", the link's ?fightScale=, ?fightSpeed=, ?fightMomentum=, ?treetopSpeed= and ?areaSize=). They change the balance:
// the link sets them for a run, and every change goes in the playtest log. Set up once, at the start.
import type { Game } from "../rules/game";
import { TUNING, type Tuning } from "../rules/tuning";
import type { PlaytestLog } from "../platform/playtestLog";

type World = { areaSize: number; treetopSpeed: number; mapAreas: number };

/** Keep a knob's value in the link (gone at its built value), as the pause page's sliders do, so they and a reload agree. */
function keep(param: string, v: number, built: number): void {
  const url = new URL(location.href);
  if (v === built) url.searchParams.delete(param); else url.searchParams.set(param, String(v));
  history.replaceState(null, "", url);
}

/** Wires the knobs up and sets where they start; returns the pause page's live setters for them, by the link's param. */
export function setupKnobs(tuning: Tuning, game: Game, world: World, WORLD_DEFAULT: World, params: URLSearchParams, playtest: PlaytestLog): Record<string, (v: string) => void> {
  // The fight's scale and speed (Ed's motion scale pass): [ and ] for scale, ; and ' for speed, , and . for momentum, and the
  // pause page's sliders; ?fightScale=, ?fightSpeed= and ?fightMomentum= set where they start.
  const FIGHT_DEFAULT = { ...TUNING.fight };
  const setFight = (scale: number, speed: number, log = true, momentum = tuning.fight.momentum) => {
    const clamp = (x: number) => Math.round(Math.min(3, Math.max(0.25, x)) * 100) / 100;
    tuning.fight.scale = clamp(scale); tuning.fight.speed = clamp(speed); tuning.fight.momentum = clamp(momentum); // (shared with the buffed tuning: live mid-fight)
    if (log) playtest.fight(tuning.fight.scale, tuning.fight.speed, tuning.fight.momentum);
  };
  {
    const start = { ...FIGHT_DEFAULT };
    const fs = Number(params.get("fightScale")), fv = Number(params.get("fightSpeed"));
    if (fs > 0) start.scale = fs;
    if (fv > 0) start.speed = fv;
    const fm = Number(params.get("fightMomentum"));
    if (fm > 0) start.momentum = fm;
    setFight(start.scale, start.speed, start.scale !== FIGHT_DEFAULT.scale || start.speed !== FIGHT_DEFAULT.speed || start.momentum !== FIGHT_DEFAULT.momentum, start.momentum ?? FIGHT_DEFAULT.momentum);
  }
  // Treetop speed, live (the world's knobs: see WORLD_DEFAULT in main.ts); area size and the map's are the link's (a new map).
  const setTreetop = (speed: number, log = true) => {
    world.treetopSpeed = Math.round(Math.min(300, Math.max(8, speed)));
    tuning.treetopSpeed = world.treetopSpeed;
    (game.buffs as { base?: unknown }).base = undefined; // (a legend's buffed copy is made afresh with it)
    if (log) playtest.world(world.areaSize, world.treetopSpeed, world.mapAreas);
  };
  setTreetop(world.treetopSpeed, world.areaSize !== WORLD_DEFAULT.areaSize || world.treetopSpeed !== WORLD_DEFAULT.treetopSpeed || world.mapAreas !== WORLD_DEFAULT.mapAreas);
  window.addEventListener("keydown", e => {
    const k = { BracketLeft: [1 / 1.1, 1, 1], BracketRight: [1.1, 1, 1], Semicolon: [1, 1 / 1.1, 1], Quote: [1, 1.1, 1], Comma: [1, 1, 1 / 1.1], Period: [1, 1, 1.1] }[e.code];
    if (!k) return;
    setFight(tuning.fight.scale * k[0], tuning.fight.speed * k[1], true, tuning.fight.momentum * k[2]);
    keep("fightScale", tuning.fight.scale, FIGHT_DEFAULT.scale); keep("fightSpeed", tuning.fight.speed, FIGHT_DEFAULT.speed); keep("fightMomentum", tuning.fight.momentum, FIGHT_DEFAULT.momentum);
  });
  return {
    fightScale: v => setFight(+v, tuning.fight.speed),
    fightSpeed: v => setFight(tuning.fight.scale, +v),
    fightMomentum: v => setFight(tuning.fight.scale, tuning.fight.speed, true, +v),
    treetopSpeed: v => setTreetop(+v),
  };
}
