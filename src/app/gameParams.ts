// The link's switches for the game itself, once it's made: the party spell's start (?creator=0, ?spell=), forced buffs
// (?buffs=), the quest demo (?quest=1), the party's over (?partyover=1), the debug arena (?arena=, J sets it up again) and
// how often the waves come (?wave=, or what this viewer last picked).
import { LEGEND_BUFFS } from "../rules/buffs";
import { setupArena } from "../rules/arena";
import { endParty } from "../rules/partyOver";
import { newCamera } from "../rules/camera";
import { setupQuestDemo } from "../rules/quest";
import { witchHeight } from "../rules/witch";
import type { Game } from "../rules/game";
import type { Tuning } from "../rules/tuning";
import { PULSE_CHOICES } from "./wavePick";

export function gameFromLink(game: Game, tuning: Tuning, params: URLSearchParams) {
  // The party spell (Ed, 2026-10-06): she stands behind her decks until it's cast (the button, or Enter). ?creator=0 (the
  // tools and smoke runs) starts at once, as before, unless ?spell=wait; ?spell=auto starts at once anywhere.
  if (params.get("spell") !== "auto" && !(params.get("creator") === "0" && params.get("spell") !== "wait")) game.party.spellAt = null;
  // ?buffs=fox,toad,stag (debug): these legends' buffs on from the start, whatever the legends do (a
  // species twice stacks it). ?buffs=all: every one.
  const buffsParam = params.get("buffs");
  if (buffsParam) game.buffs.forced = buffsParam === "all" ? Object.keys(LEGEND_BUFFS.species) : buffsParam.split(",").map(s => s.trim().toLowerCase().replace(/[^a-z]/g, "")).filter(Boolean);
  // ?quest=1 (the first quest, a demo): beside the nearest sleeping legend, with the creature it
  // dreams of on her stack; put its sigil down there (E) to make it happy.
  if (params.get("quest")) setupQuestDemo(game, (x, z) => {
    game.witch = { ...game.witch, x, z, mode: "ground", lift: 0, seated: false, vx: 0, vz: 0 };
    game.camera = newCamera(tuning, x, witchHeight(game.witch, tuning), z);
    game.introFocus = undefined;
  });
  // ?arena=wolf*4,beetle*3 (Stage 5, a debug arena): hers against the wild in the home clearing,
  // no waves; J sets it up again.
  // ?partyover=1 (a debug flag): the party's over from the start, the afterparty (rules/partyOver.ts).
  if (params.get("partyover") === "1") endParty(game);
  const arenaParam = params.get("arena");
  if (arenaParam) {
    setupArena(game, arenaParam);
    window.addEventListener("keydown", e => { if (e.code === "KeyJ" && !e.repeat) setupArena(game, arenaParam); });
  }

  // How fast the party spreads: the ley pulse's speed (Ed, 2026-10-09: "Pure constant speed", leyLines.pulseSpeed m/s; a wave
  // lands as it reaches its stone), or ?pulse=<m/s> (or "off": no waves; the old ?wave=off too); the bedroom's "Waves:"
  // dropdown (app/wavePick.ts: slow, normal, fast, off) changes it, never remembered (Ed, 2026-10-08).
  const WAVE_CHOICES = PULSE_CHOICES;
  function setPulseSpeed(speed: number): void {
    if (speed > 0) tuning.leyLines.pulseSpeed = speed; // (the party reads it each step, and the boot as she leaves her decks)
    game.party.paused = !(speed > 0);
    const sel = document.querySelector<HTMLSelectElement>("#wave-pick select"); if (sel && [...sel.options].some(o => +o.value === speed)) sel.value = String(speed);
  }
  let waveChoice = tuning.leyLines.pulseSpeed;
  const pulseParam = params.get("pulse") ?? (params.get("wave") === "off" ? "off" : null);
  if (pulseParam !== null) waveChoice = pulseParam === "off" ? 0 : Math.max(0, +pulseParam || 0);
  if (arenaParam) waveChoice = 0;
  return { WAVE_CHOICES, setPulseSpeed, waveChoice };
}
