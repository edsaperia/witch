// The Fight Arena (Ed, 2026-10-27; rules/fightArena.ts): ?fight=<seed>[&pack=wolf*4@2,...], her alone against a wild pack in the
// home clearing, no waves, its panel down the right edge (ui/fightArena.ts). The pack is the seed's roll unless ?pack= names one;
// each roll moves the seed on and writes both into the address, so a fun fight comes back from its link. J sets it up again. Its
// speed (slow motion, pause, a frame at a time: fightDt, main.ts), the telegraphs' timings over the fight (fightFrame, each drawn
// frame), and the library of attacks (app/attackLibrary.ts).
import { setupArena, parseArena } from "../rules/arena";
import { nextSeed, packSpec, REACTION_FLOOR, rollPack, TellWatch } from "../rules/fightArena";
import { attackOf } from "../rules/combat/data";
import type { Level } from "../rules/creatures";
import { STEP, type Game } from "../rules/game";
import { FightPanel } from "../ui/fightArena";
import { AttackLibrary } from "./attackLibrary";

/** How fast the fight runs (the panel's 1×, ½×, ¼× and pause), and frames asked for one at a time while paused. */
export const fightSpeed = { value: 1, steps: 0 };

/** The game time to step this frame, from the frame's own: times the fight's speed, or one step asked for while paused. */
export function fightDt(dt: number): number {
  if (fightSpeed.value > 0) return dt * fightSpeed.value;
  if (fightSpeed.steps > 0) { fightSpeed.steps--; return STEP; }
  return 0;
}

let panel: FightPanel | null = null, night: Game | null = null;
const watch = new TellWatch(), library = new AttackLibrary();
let timings = true;

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
  let attack: unknown = null;
  night = game;
  const put = () => {
    setupArena(game, spec, { wildOnly: true });
    game.party.paused = true;
    watch.reset();
    try { history.replaceState(history.state, "", fightLink(seed, spec)); } catch { /* (a sandboxed page) */ }
    panel?.draw();
  };
  put();
  const host = {
    seed: () => seed, spec: () => spec,
    roll: () => { seed = nextSeed(seed); spec = packSpec(rollPack(seed)); put(); },
    setSpec: (s: string) => { const g = parseArena(s); if (!g.length) return false; spec = packSpec(g); put(); return true; },
    reset: put,
    get speed() { return fightSpeed.value; }, set speed(v: number) { fightSpeed.value = v; fightSpeed.steps = 0; },
    step: () => { if (fightSpeed.value === 0) fightSpeed.steps++; },
    get timings() { return timings; }, set timings(v: boolean) { timings = v; if (!v) panel?.tells.replaceChildren(); },
    shortest: () => ({ lead: watch.shortest, of: watch.shortestOf, count: watch.count, floor: REACTION_FLOOR }),
    link: () => fightLink(seed, spec),
    attacks: () => parseArena(spec).map(g => { const a = attackOf(g.species, g.level as Level); return { species: g.species, level: g.level, name: a?.name ?? "none", attack: a?.attack ?? {} }; }),
    // (the composable attacks, docs/plans/attack-grammar.md, aren't in yet: the attack is kept, for the library, and the pack fights
    // with its own; their schema, parser and composer come in here when they land)
    attackSchema: () => null,
    get attack() { return attack; },
    setAttack: (a: unknown) => { attack = a; return { errors: [], warnings: a == null ? [] : ["the composable attacks aren't in the game yet: kept for the library; the pack fights with its own"] }; },
    library: () => library.list(),
    save: (name: string) => library.save({ name, attack, seed, pack: spec }),
    load: (name: string) => { const s = library.get(name); if (!s) return; attack = s.attack; if (s.seed) seed = s.seed; if (s.pack && parseArena(s.pack).length) spec = s.pack; put(); },
    remove: (name: string) => library.remove(name),
    toggleFav: (name: string) => { library.toggleFav(name); },
    exportJson: (name?: string) => library.exportJson(name),
    importJson: (text: string) => library.importJson(text, { seed, pack: spec }),
  };
  if (panel) panel.host = host; else panel = new FightPanel(host);
  panel.draw();
  const again = (e: KeyboardEvent) => { if (e.code === "KeyJ" && !e.repeat) put(); };
  window.addEventListener("keydown", again);
  return () => { window.removeEventListener("keydown", again); if (night === game) night = null; };
}

/** Each drawn frame (main.ts): the telegraphs watched, and, with the timings on, each one's time to impact over it (red under the
 *  reaction floor), placed by `screenOf` (the view's: a world point to the screen's -1..1). */
export function fightFrame(screenOf: (x: number, y: number, z: number) => [number, number]): void {
  if (!panel || !night) return;
  const g = night, live = watch.update(g);
  panel.tick();
  if (!timings) return;
  const W = innerWidth, H = innerHeight, box = panel.tells;
  while (box.children.length < live.length) box.append(document.createElement("div"));
  while (box.children.length > live.length) box.lastElementChild!.remove();
  live.forEach((t, i) => {
    const [sx, sy] = screenOf(t.x, 2.2, t.z), d = box.children[i] as HTMLElement, lead = t.fire - t.start, short = lead < REACTION_FLOOR;
    d.className = short ? "short" : "";
    d.style.left = `${((sx + 1) / 2) * W}px`; d.style.top = `${((1 - sy) / 2) * H}px`;
    d.textContent = `${Math.max(0, t.fire - g.clock.time).toFixed(2)} s · lead ${lead.toFixed(2)}`;
  });
}
