// The debug knobs in the overlay (~): the fight's scale, speed and momentum, and the treetop speed, live, with sliders,
// keys and resets, for this load only (they change the balance: the link's ?fightScale= and the like set them for a run);
// every change goes in the playtest log. Set up once, at the start.
import type { Game } from "../rules/game";
import { TUNING, type Tuning } from "../rules/tuning";
import type { PlaytestLog } from "../platform/playtestLog";

type World = { areaSize: number; treetopSpeed: number; mapAreas: number };

/** Wires the knobs up and sets where they start; returns their panel (shown with the debug overlay). */
export function setupKnobs(tuning: Tuning, game: Game, world: World, WORLD_DEFAULT: World, params: URLSearchParams, playtest: PlaytestLog): HTMLElement {
  // The fight's scale and speed (Ed's motion scale pass): live in the debug overlay (~), [ and ] for
  // scale, ; and ' for speed, with sliders and a reset; this load only; ?fightScale= and
  // ?fightSpeed= set where they start. Every change goes in the playtest log.
  const FIGHT_DEFAULT = { ...TUNING.fight };
  const knobs = document.getElementById("fight-knobs")!;
  const setFight = (scale: number, speed: number, log = true, momentum = tuning.fight.momentum) => {
    const clamp = (x: number) => Math.round(Math.min(3, Math.max(0.25, x)) * 100) / 100;
    tuning.fight.scale = clamp(scale); tuning.fight.speed = clamp(speed); tuning.fight.momentum = clamp(momentum); // (shared with the buffed tuning: live mid-fight)
    for (const [k, v] of [["scale", tuning.fight.scale], ["speed", tuning.fight.speed], ["momentum", tuning.fight.momentum]] as const) {
      (knobs.querySelector(`input[name=${k}]`) as HTMLInputElement).value = String(v);
      knobs.querySelector(`.${k}`)!.textContent = v.toFixed(2);
    }
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
  // Treetop speed, live (the world's knobs: see WORLD_DEFAULT above); area size and the map's are the link's.
  const setTreetop = (speed: number, log = true) => {
    world.treetopSpeed = Math.round(Math.min(300, Math.max(8, speed)));
    tuning.treetopSpeed = world.treetopSpeed;
    (game.buffs as { base?: unknown }).base = undefined; // (a legend's buffed copy is made afresh with it)
    (knobs.querySelector("input[name=treetop]") as HTMLInputElement).value = String(world.treetopSpeed);
    knobs.querySelector(".treetop")!.textContent = String(world.treetopSpeed);
    knobs.querySelector(".area")!.textContent = `${world.areaSize} m, ${world.mapAreas} x ${world.mapAreas}`;
    if (log) playtest.world(world.areaSize, world.treetopSpeed, world.mapAreas);
  };
  setTreetop(world.treetopSpeed, world.areaSize !== WORLD_DEFAULT.areaSize || world.treetopSpeed !== WORLD_DEFAULT.treetopSpeed || world.mapAreas !== WORLD_DEFAULT.mapAreas);
  knobs.querySelector(".world-reset")!.addEventListener("click", () => {
    for (const k of ["areaSize", "areaScale", "treetopSpeed", "mapAreas"]) params.delete(k);
    location.search = params.toString(); // (a new map: area size and the map's are made with it)
  });
  knobs.addEventListener("input", e => { const el = e.target as HTMLInputElement; if (el.name === "treetop") { setTreetop(+el.value); return; } setFight(el.name === "scale" ? +el.value : tuning.fight.scale, el.name === "speed" ? +el.value : tuning.fight.speed, true, el.name === "momentum" ? +el.value : tuning.fight.momentum); });
  knobs.querySelector(".fight-reset")!.addEventListener("click", () => setFight(FIGHT_DEFAULT.scale, FIGHT_DEFAULT.speed, true, FIGHT_DEFAULT.momentum));
  for (const ev of ["pointerdown", "keydown"]) knobs.addEventListener(ev, e => e.stopPropagation()); // (its own presses don't fly her)
  window.addEventListener("keydown", e => {
    const k = { BracketLeft: [1 / 1.1, 1, 1], BracketRight: [1.1, 1, 1], Semicolon: [1, 1 / 1.1, 1], Quote: [1, 1.1, 1], Comma: [1, 1, 1 / 1.1], Period: [1, 1, 1.1] }[e.code];
    if (k) setFight(tuning.fight.scale * k[0], tuning.fight.speed * k[1], true, tuning.fight.momentum * k[2]);
  });
  return knobs;
}
