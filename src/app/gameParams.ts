// The link's switches for the game itself, once it's made: the party spell's start (?creator=0, ?spell=), forced buffs
// (?buffs=), the quest demo (?quest=1), the party's over (?partyover=1), the debug arena (?arena=, J sets it up again), the Fight
// Arena (?fight=) and
// how fast the waves come (?pulse=, ?wave=off); the repro link's place and waves (app/repro.ts).
import { LEGEND_BUFFS } from "../rules/buffs";
import { setupArena, arenaAttack } from "../rules/arena";
import { startFight } from "./fightArena";
import { endParty } from "../rules/partyOver";
import { newCamera } from "../rules/camera";
import { setupQuestDemo } from "../rules/quest";
import { witchHeight } from "../rules/witch";
import type { Game } from "../rules/game";
import type { Tuning } from "../rules/tuning";
import { applyRepro } from "./repro";
import { takeShot } from "./shot";
import { newKit } from "../rules/kit";

/** Returns what undoes its listeners (the arena's J), for the night's end (app/night.ts). */
export function gameFromLink(game: Game, tuning: Tuning, params: URLSearchParams): () => void {
  // The party spell (Ed, 2026-10-06): she stands behind her decks until it's cast (the button, or Enter). ?creator=0 (the
  // tools and smoke runs) starts at once, as before, unless ?spell=wait; ?spell=auto starts at once anywhere.
  if (params.get("spell") !== "auto" && !(params.get("creator") === "0" && params.get("spell") !== "wait") && !params.has("fight")) game.party.spellAt = null; // (the Fight Arena: straight into the fight)
  // Her night's kit (rules/kit.ts; Ed, 2026-10-26): a night that waits for her spell starts with her invitations on the Parlour's desk
  // and the brooms at the Workshop's lathe; ?kit=full gives her both from the start.
  if (game.party.spellAt === null && params.get("kit") !== "full") for (const W of game.witches) W.kit = newKit(true);
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
  // The debug overlay's repro link (app/repro.ts): ?wave=N, ?cleared=, ?at=x,z&mode=, ?zoom=.
  applyRepro(game, params);
  // ?shot=<scene> (app/shot.ts): her put where the builder's shot is, after the rest of the link.
  const shot = params.get("shot");
  if (shot) takeShot(game, shot);
  const arenaParam = params.get("arena");
  let undo = () => {};
  if (arenaParam) {
    // (?attack=<name|JSON>: the wild side uses that attack in the grammar, rules/attacks/; J sets both up again)
    const attackParam = params.get("attack"), arm = () => { if (attackParam) for (const l of arenaAttack(game, attackParam)) console.warn(`arena attack: ${l}`); };
    setupArena(game, arenaParam); arm();
    const again = (e: KeyboardEvent) => { if (e.code === "KeyJ" && !e.repeat) { setupArena(game, arenaParam); arm(); } };
    window.addEventListener("keydown", again);
    undo = () => window.removeEventListener("keydown", again);
  }
  // ?fight=<seed> (the Fight Arena, app/fightArena.ts; Ed, 2026-10-27): her alone against a wild pack, its panel down the right.
  const fightParam = params.get("fight");
  if (fightParam !== null && !arenaParam) undo = startFight(game, params);

  // How fast the party spreads: the ley pulse's speed (leyLines.pulseSpeed m/s, 1 as built: Ed, 2026-10-18; a wave lands as it
  // reaches its stone), set live by the pause page's Waves slider and remembered on this browser (app/settings.ts), or for one
  // load by ?pulse=<m/s> over it (or "off", and the old ?wave=off: the waves held where they are, the boot too); the debug
  // arena and the zoo have none (Ed 2026-10-13, the zoo: "no timer etc"; rules/zoo.ts).
  const pulseParam = params.get("pulse") ?? (params.get("wave") === "off" ? "off" : null);
  const linkSpeed = pulseParam === null ? null : pulseParam === "off" ? 0 : Math.max(0, +pulseParam || 0);
  if (linkSpeed) tuning.leyLines.pulseSpeed = linkSpeed;
  if (linkSpeed === 0 || arenaParam || fightParam !== null || game.map.zoo) game.party.paused = true;
  return undo;
}

