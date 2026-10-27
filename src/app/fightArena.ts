// The Fight Arena (Ed, 2026-10-27; rules/fightArena.ts): ?fight=<seed>[&pack=wolf*4@2,...], her alone against a wild pack in the
// home clearing, no waves, its panel down the right edge (ui/fightArena.ts). The pack is the seed's roll unless ?pack= names one;
// each roll moves the seed on and writes both into the address, so a fun fight comes back from its link. J sets it up again. Its
// speed (slow motion, pause, a frame at a time: fightDt, main.ts), the telegraphs' timings over the fight (fightFrame, each drawn
// frame), and the library of attacks (app/attackLibrary.ts).
import { arenaAttack, setupArena, parseArena } from "../rules/arena";
import { nextSeed, packSpec, REACTION_FLOOR, rollPack, TellWatch } from "../rules/fightArena";
import { ATTACK_LIB, attackSchema, parseAttack, readability, serialiseAttack, type AttackSpec } from "../rules/attacks";
import type { Schema } from "../ui/schemaForm";
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

/** The attack editor's form (ui/schemaForm.ts): the grammar's schema (rules/attacks/schema.ts), a child's attack a name from the
 *  library or an attack given inline (the same schema again, by reference: the form goes as deep as it's opened). */
let FORM: Schema | null = null;
export function formSchema(): Schema {
  if (FORM) return FORM;
  const attack = structuredClone(attackSchema()) as Schema, names = Object.keys(ATTACK_LIB).sort();
  const child: Schema = { oneOf: [{ title: "by name", type: "string", enum: names }, { title: "inline", $ref: "#/$defs/attack" }] };
  for (const ev of Object.values(attack.properties?.on?.properties ?? {})) if (ev.items?.properties) ev.items.properties.attack = child;
  return (FORM = { $defs: { attack }, $ref: "#/$defs/attack" });
}

/** A seed for a new fight (the pause page's button). */
export const newFightSeed = (): number => 1 + Math.floor(Math.random() * 999_999);

/** The link of a fight (this page's, with ?fight= and ?pack= set). */
export function fightLink(seed: number, spec?: string, attack?: AttackSpec | null): string {
  const u = new URL(location.href);
  u.searchParams.set("fight", String(seed));
  if (spec) u.searchParams.set("pack", spec); else u.searchParams.delete("pack");
  if (attack) u.searchParams.set("attack", serialiseAttack(attack)); else u.searchParams.delete("attack"); // (the grammar's ?attack=: docs/plans/attack-grammar.md)
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
  // the attack being tried (as written: its base and floor laid on by parseAttack each time), from the link's ?attack= if it reads
  let attack: AttackSpec | null = null, armed: string[] = [];
  { const a = params.get("attack"); if (a && parseAttack(a, ATTACK_LIB).attack) attack = JSON.parse(a) as AttackSpec; }
  night = game;
  /** The pack given the attack (the grammar's engine, rules/arena.ts arenaAttack: what was wrong or changed comes back), or its own. */
  const arm = () => { armed = attack ? arenaAttack(game, serialiseAttack(attack)) : []; if (!attack) for (const id of game.arena?.ids ?? []) game.creatures[id].spell = undefined; };
  const put = () => {
    setupArena(game, spec, { wildOnly: true });
    arm();
    game.party.paused = true;
    watch.reset();
    try { history.replaceState(history.state, "", fightLink(seed, spec, attack)); } catch { /* (a sandboxed page) */ }
    panel?.draw();
  };
  const fightLinkNow = () => { try { history.replaceState(history.state, "", fightLink(seed, spec, attack)); } catch { /* (a sandboxed page) */ } };
  put();
  for (const l of armed) console.warn(`arena attack: ${l}`);
  const host = {
    seed: () => seed, spec: () => spec,
    roll: () => { seed = nextSeed(seed); spec = packSpec(rollPack(seed)); put(); },
    setSpec: (s: string) => { const g = parseArena(s); if (!g.length) return false; spec = packSpec(g); put(); return true; },
    reset: put,
    get speed() { return fightSpeed.value; }, set speed(v: number) { fightSpeed.value = v; fightSpeed.steps = 0; },
    step: () => { if (fightSpeed.value === 0) fightSpeed.steps++; },
    get timings() { return timings; }, set timings(v: boolean) { timings = v; if (!v) panel?.tells.replaceChildren(); },
    shortest: () => ({ lead: watch.shortest, of: watch.shortestOf, count: watch.count, floor: REACTION_FLOOR }),
    link: () => fightLink(seed, spec, attack),
    attacks: () => parseArena(spec).map(g => { const a = attackOf(g.species, g.level as Level); return { species: g.species, level: g.level, name: a?.name ?? "none", attack: (a && ATTACK_LIB[a.name]) ?? a?.attack ?? {} }; }), // (in the grammar where it's there)
    // (the composable attacks, rules/attacks: read, checked, held to the reaction floor and written out by the grammar's own code; the
    // pack fights with its own attacks till the grammar's engine is in, docs/plans/attack-grammar.md step 2)
    attackSchema: () => formSchema(),
    get attack() { return attack; },
    attackNote: "The wild pack fights with this attack (the grammar's engine). Its bolts, zones and telegraphs aren't drawn yet (the look layer's next): ⏱ shows each telegraph's timing meanwhile.",
    setAttack: (a: unknown) => {
      if (a == null) { attack = null; arm(); fightLinkNow(); return { errors: [], warnings: [] }; }
      const p = parseAttack(a, ATTACK_LIB);
      if (!p.attack) return { errors: p.errors, warnings: [] };
      attack = (typeof a === "string" ? JSON.parse(a) : a) as AttackSpec;
      arm(); fightLinkNow(); // (live: the pack as it is, fighting with it from its next cast; ↺ for a fresh fight with it)
      const r = readability(p.attack, ATTACK_LIB);
      return { errors: [], warnings: armed.map(w => w.endsWith("lengthened") ? `the composer lengthened a warning: ${w}` : w), notes: [Number.isFinite(r.warning) ? `its shortest warning ${r.warning.toFixed(2)} s (${r.where}), the floor ${REACTION_FLOOR} s` : "nothing in it harms"] };
    },
    attackJson: () => attack ? serialiseAttack(attack, 1) : "",
    editOwn: (i: number) => { const g = parseArena(spec)[i], a = g && attackOf(g.species, g.level as Level); if (a && ATTACK_LIB[a.name]) attack = structuredClone(ATTACK_LIB[a.name]) as AttackSpec; },
    library: () => library.list(),
    save: (name: string) => library.save({ name, attack, seed, pack: spec }),
    load: (name: string) => { const s = library.get(name); if (!s) return; attack = (s.attack ?? null) as AttackSpec | null; if (s.seed) seed = s.seed; if (s.pack && parseArena(s.pack).length) spec = s.pack; put(); },
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
    const [sx, sy] = screenOf(t.x, 2.2, t.z), d = box.children[i] as HTMLElement, lead = t.fire - t.start, short = lead < REACTION_FLOOR - 1e-6;
    d.className = short ? "short" : "";
    d.style.left = `${((sx + 1) / 2) * W}px`; d.style.top = `${((1 - sy) / 2) * H}px`;
    d.textContent = `${Math.max(0, t.fire - g.clock.time).toFixed(2)} s · lead ${lead.toFixed(2)}`;
  });
}
