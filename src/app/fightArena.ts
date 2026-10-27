// The Fight Arena (Ed, 2026-10-27; rules/fightArena.ts): ?fight=<seed>[&pack=wolf*4@2,...], her alone against a wild pack in the
// home clearing, no waves, its panel down the right edge (ui/fightArena.ts). The pack is the seed's roll unless ?pack= names one;
// each roll moves the seed on and writes both into the address, so a fun fight comes back from its link. J sets it up again.
import { setupArena, parseArena } from "../rules/arena";
import { nextSeed, packSpec, rollPack } from "../rules/fightArena";
import { attackOf } from "../rules/combat/data";
import type { Level } from "../rules/creatures";
import type { Game } from "../rules/game";
import { FightPanel } from "../ui/fightArena";

/** How fast the fight runs (the panel's 1×, ½×, ¼× and pause): main.ts steps the game by its frame's time times this. */
export const fightSpeed = { value: 1 };

let panel: FightPanel | null = null;

/** A seed for a new fight (the pause page's button). */
export const newFightSeed = (): number => 1 + Math.floor(Math.random() * 999_999);

/** The link of a fight (this page's, with ?fight= and ?pack= set). */
export function fightLink(seed: number, spec?: string): string {
  const u = new URL(location.href);
  u.searchParams.set("fight", String(seed));
  if (spec) u.searchParams.set("pack", spec); else u.searchParams.delete("pack");
  u.searchParams.delete("arena");
  if (!u.searchParams.has("creator")) u.searchParams.set("creator", "0"); // (straight into the fight: no spell to cast)
  return u.toString();
}

/** The fight set up on `game` from the link (?fight= and ?pack=); returns what undoes its key. */
export function startFight(game: Game, params: URLSearchParams): () => void {
  let seed = Math.floor(Number(params.get("fight")));
  if (!(seed > 0)) seed = newFightSeed();
  const asked = params.get("pack");
  let spec = asked && parseArena(asked).length ? packSpec(parseArena(asked)) : packSpec(rollPack(seed));
  const put = () => {
    setupArena(game, spec, { wildOnly: true });
    game.party.paused = true;
    try { history.replaceState(history.state, "", fightLink(seed, spec)); } catch { /* (a sandboxed page) */ }
    panel?.draw();
  };
  put();
  const host = {
    seed: () => seed, spec: () => spec,
    roll: () => { seed = nextSeed(seed); spec = packSpec(rollPack(seed)); put(); },
    setSpec: (s: string) => { const g = parseArena(s); if (!g.length) return false; spec = packSpec(g); put(); return true; },
    reset: put,
    get speed() { return fightSpeed.value; }, set speed(v: number) { fightSpeed.value = v; },
    link: () => fightLink(seed, spec),
    attacks: () => parseArena(spec).map(g => { const a = attackOf(g.species, g.level as Level); return { species: g.species, level: g.level, name: a?.name ?? "none", attack: a?.attack ?? {} }; }),
  };
  if (panel) panel.host = host; else panel = new FightPanel(host);
  panel.draw();
  const again = (e: KeyboardEvent) => { if (e.code === "KeyJ" && !e.repeat) put(); };
  window.addEventListener("keydown", again);
  return () => window.removeEventListener("keydown", again);
}
