// The debug knobs: the fight's scale, speed and momentum, and the treetop speed, live, with keys, on the pause page's sliders
// (Ed, 2026-10-13: "There are controls in the bottom left that should be in the pause tab": config/decisions.json's "Debug
// knobs", the link's ?fightScale=, ?fightSpeed=, ?fightMomentum=, ?treetopSpeed= and ?areaSize=). They change the balance:
// the link sets them for a run, and every change goes in the playtest log. Their keys set up once a page; their start each night.
import type { Game } from "../rules/game";
import { TUNING, type Tuning } from "../rules/tuning";
import type { PlaytestLog } from "../platform/playtestLog";

export type World = { areaSize: number; treetopSpeed: number; mapAreas: number };
/** What the knobs act on: the night's (app/night.ts). */
export interface KnobNight { tuning: Tuning; game: Game; world: World; playtest: PlaytestLog }

/** Keep a knob's value in the link (gone at its built value), as the pause page's sliders do, so they and a reload agree. */
function keep(param: string, v: number, built: number): void {
  const url = new URL(location.href);
  if (v === built) url.searchParams.delete(param); else url.searchParams.set(param, String(v));
  history.replaceState(null, "", url);
}

let fightBuilt: typeof TUNING.fight | null = null;
/** The fight's knobs as built (read once, after ?tuning= has had its say: platform/tuningPreset.ts). */
const fightDefault = () => (fightBuilt ??= { ...TUNING.fight });
// The fight's scale and speed (Ed's motion scale pass): [ and ] for scale, ; and ' for speed, , and . for momentum, and the
// pause page's sliders; ?fightScale=, ?fightSpeed= and ?fightMomentum= set where they start.
function setFight({ tuning, playtest }: KnobNight, scale: number, speed: number, log = true, momentum = tuning.fight.momentum): void {
  const clamp = (x: number) => Math.round(Math.min(3, Math.max(0.25, x)) * 100) / 100;
  tuning.fight.scale = clamp(scale); tuning.fight.speed = clamp(speed); tuning.fight.momentum = clamp(momentum); // (live mid-fight)
  if (log) playtest.fight(tuning.fight.scale, tuning.fight.speed, tuning.fight.momentum);
}
// Treetop speed, live (the world's knobs: see WORLD_DEFAULT in main.ts); area size and the map's are the link's (a new map).
function setTreetop({ tuning, world, playtest }: KnobNight, speed: number, log = true): void {
  world.treetopSpeed = Math.round(Math.min(300, Math.max(8, speed)));
  tuning.treetopSpeed = world.treetopSpeed;
  if (log) playtest.world(world.areaSize, world.treetopSpeed, world.mapAreas);
}

/** Where the knobs start for a night: the link's fight and treetop speed (each night as it's made: app/night.ts). */
export function startKnobs(n: KnobNight, WORLD_DEFAULT: World, params: URLSearchParams): void {
  const FIGHT_DEFAULT = fightDefault(), start = { ...FIGHT_DEFAULT };
  const fs = Number(params.get("fightScale")), fv = Number(params.get("fightSpeed"));
  if (fs > 0) start.scale = fs;
  if (fv > 0) start.speed = fv;
  const fm = Number(params.get("fightMomentum"));
  if (fm > 0) start.momentum = fm;
  setFight(n, start.scale, start.speed, start.scale !== FIGHT_DEFAULT.scale || start.speed !== FIGHT_DEFAULT.speed || start.momentum !== FIGHT_DEFAULT.momentum, start.momentum ?? FIGHT_DEFAULT.momentum);
  const { world } = n;
  setTreetop(n, world.treetopSpeed, world.areaSize !== WORLD_DEFAULT.areaSize || world.treetopSpeed !== WORLD_DEFAULT.treetopSpeed || world.mapAreas !== WORLD_DEFAULT.mapAreas);
}

/** Wires the knobs' keys up, once a page, on whichever night is on (`at`); returns the pause page's live setters for them, by the link's param. */
export function setupKnobs(at: () => KnobNight, mutate: (label: string, action: () => void) => void = (_label, action) => action()): Record<string, (v: string) => void> {
  window.addEventListener("keydown", e => {
    const k = { BracketLeft: [1 / 1.1, 1, 1], BracketRight: [1.1, 1, 1], Semicolon: [1, 1 / 1.1, 1], Quote: [1, 1.1, 1], Comma: [1, 1, 1 / 1.1], Period: [1, 1, 1.1] }[e.code];
    if (!k) return;
    const n = at(), { tuning } = n, FIGHT_DEFAULT = fightDefault();
    mutate("fight keyboard tuning", () => setFight(n, tuning.fight.scale * k[0], tuning.fight.speed * k[1], true, tuning.fight.momentum * k[2]));
    keep("fightScale", tuning.fight.scale, FIGHT_DEFAULT.scale); keep("fightSpeed", tuning.fight.speed, FIGHT_DEFAULT.speed); keep("fightMomentum", tuning.fight.momentum, FIGHT_DEFAULT.momentum);
  });
  const f = () => at().tuning.fight;
  return {
    fightScale: v => mutate("fight scale", () => setFight(at(), +v, f().speed)),
    fightSpeed: v => mutate("fight speed", () => setFight(at(), f().scale, +v)),
    fightMomentum: v => mutate("fight momentum", () => setFight(at(), f().scale, f().speed, true, +v)),
    treetopSpeed: v => mutate("treetop speed", () => setTreetop(at(), +v)),
  };
}
