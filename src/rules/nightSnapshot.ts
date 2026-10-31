// A whole night's rules state. Static map functions and forest caches are rebuilt from its seed,
// while every seeded random stream continues at its saved cursor. No executable code is loaded.
import { newGame, type Game } from "./game";
import { rng, rngState } from "./random";
import type { Tuning } from "./tuning";

type Value = null | boolean | string | number | { ref: number } | { special: "undefined" | "+Infinity" | "-Infinity" | "NaN" };
interface Node { kind: string; values: Value[]; keys?: string[]; cursor?: number }
interface Graph { root: Value; nodes: Node[] }
export interface NightSnapshot { version: 1; seed: number; tuning: Tuning; state: Graph }

const OMIT = new Set(["seed", "tuning", "map", "forest", "witch", "leash", "spells", "prev", "pending", "acc", "alpha", "disposed", "byArea", "lod", "introFocus", "islandReady", "koEvents", "questEvents", "waveEvents", "leashEvents"]);
const OPTIONAL = new Set(["rings", "hunts", "rainbows", "clearedAt", "legendIds", "arena", "zooMoods", "zooExit", "zooPush", "asleepBeforeParty", "wake"]);
const BAD_KEYS = new Set(["__proto__", "prototype", "constructor"]);
const ARRAYS = { Float64Array, Float32Array, Int32Array, Uint32Array, Int16Array, Uint16Array, Int8Array, Uint8Array, Uint8ClampedArray };
const MAX_NODES = 500_000, MAX_VALUES = 5_000_000;
const invalid = (): never => { throw new Error("This saved night is incomplete or incompatible."); };

function encode(root: unknown, witches: ReadonlySet<object>): Graph {
  const nodes: Node[] = [], seen = new Map<object, number>();
  function value(x: unknown): Value {
    if (x === undefined) return { special: "undefined" };
    if (x === null || typeof x === "string" || typeof x === "boolean") return x;
    if (typeof x === "number") return Number.isFinite(x) ? x : { special: Number.isNaN(x) ? "NaN" : x > 0 ? "+Infinity" : "-Infinity" };
    if (typeof x !== "object" && typeof x !== "function") return invalid();
    const old = seen.get(x); if (old !== undefined) return { ref: old };
    if (nodes.length >= MAX_NODES) return invalid();
    const id = nodes.length, node: Node = { kind: "object", values: [] };
    nodes.push(node); seen.set(x, id);
    if (typeof x === "function") {
      const cursor = rngState(x as () => number); if (cursor === undefined) return invalid();
      node.kind = "random"; node.cursor = cursor;
    } else if (Array.isArray(x)) { node.kind = "array"; node.values = x.map(value); }
    else if (x instanceof Map) { node.kind = "map"; node.values = [...x].flatMap(([k, v]) => [value(k), value(v)]); }
    else if (x instanceof Set) { node.kind = "set"; node.values = [...x].map(value); }
    else if (ArrayBuffer.isView(x) && !(x instanceof DataView)) {
      const kind = x.constructor.name; if (!Object.hasOwn(ARRAYS, kind)) return invalid();
      node.kind = kind; node.values = Array.from(x as unknown as ArrayLike<number>, value);
    } else {
      if (Object.getPrototypeOf(x) !== Object.prototype && Object.getPrototypeOf(x) !== null) return invalid();
      node.keys = Object.keys(x).filter(k => !witches.has(x) || k !== "pending");
      if (node.keys.some(k => BAD_KEYS.has(k))) return invalid();
      node.values = node.keys.map(k => k === "events" ? value([]) : value((x as Record<string, unknown>)[k]));
    }
    return { ref: id };
  }
  return { root: value(root), nodes };
}

function decode(input: unknown): unknown {
  if (!input || typeof input !== "object") return invalid();
  const graph = input as Graph;
  if (!Array.isArray(graph.nodes) || graph.nodes.length > MAX_NODES) return invalid();
  let count = 0;
  const out: unknown[] = graph.nodes.map(n => {
    if (!n || !Array.isArray(n.values) || (count += n.values.length) > MAX_VALUES) return invalid();
    if (n.kind === "object") {
      if (!Array.isArray(n.keys) || n.keys.length !== n.values.length || n.keys.some(k => typeof k !== "string" || BAD_KEYS.has(k)) || new Set(n.keys).size !== n.keys.length) return invalid();
      return {};
    }
    if (n.kind === "array") return [];
    if (n.kind === "map") { if (n.values.length % 2) return invalid(); return new Map(); }
    if (n.kind === "set") return new Set();
    if (n.kind === "random") {
      if (!Number.isInteger(n.cursor) || n.cursor! < 0 || n.cursor! > 0xffffffff || n.values.length) return invalid();
      return rng(n.cursor!);
    }
    if (Object.hasOwn(ARRAYS, n.kind)) return new ARRAYS[n.kind as keyof typeof ARRAYS](n.values.length);
    return invalid();
  });
  function value(x: Value): unknown {
    if (x === null || typeof x === "string" || typeof x === "boolean") return x;
    if (typeof x === "number") return Number.isFinite(x) ? x : invalid();
    if (!x || typeof x !== "object") return invalid();
    if ("ref" in x && Object.keys(x).length === 1) return Number.isInteger(x.ref) && x.ref >= 0 && x.ref < out.length ? out[x.ref] : invalid();
    if ("special" in x && Object.keys(x).length === 1) {
      if (x.special === "undefined") return undefined;
      if (x.special === "+Infinity") return Infinity;
      if (x.special === "-Infinity") return -Infinity;
      if (x.special === "NaN") return NaN;
    }
    return invalid();
  }
  graph.nodes.forEach((n, i) => {
    const target = out[i];
    if (n.kind === "random") return;
    if (n.kind === "object") n.keys!.forEach((k, j) => { (target as Record<string, unknown>)[k] = value(n.values[j]); });
    else if (n.kind === "array") n.values.forEach(v => (target as unknown[]).push(value(v)));
    else if (n.kind === "map") { for (let j = 0; j < n.values.length; j += 2) (target as Map<unknown, unknown>).set(value(n.values[j]), value(n.values[j + 1])); }
    else if (n.kind === "set") n.values.forEach(v => (target as Set<unknown>).add(value(v)));
    else n.values.forEach((v, j) => { const x = value(v); if (typeof x !== "number") return invalid(); (target as unknown as number[])[j] = x; });
  });
  return value(graph.root);
}

/** Capture rules only: views, DOM, held buttons, frame events and procedural forest caches aren't saved. */
export function snapshotGame(game: Game): NightSnapshot {
  const state: Record<string, unknown> = {};
  for (const key of Object.keys(game)) if (!OMIT.has(key)) state[key] = (game as unknown as Record<string, unknown>)[key];
  return { version: 1, seed: game.seed, tuning: JSON.parse(JSON.stringify(game.tuning)) as Tuning, state: encode(state, new Set(game.witches)) };
}

/** Restore matching save formats across builds. Throws before handing a bad night to play. */
export function restoreGame(input: unknown): Game {
  if (!input || typeof input !== "object") return invalid();
  const snapshot = input as NightSnapshot;
  if (snapshot.version !== 1 || !Number.isInteger(snapshot.seed) || !snapshot.tuning || typeof snapshot.tuning !== "object") return invalid();
  // Decode before generating a map, so corrupt graph data doesn't trigger expensive world generation.
  const state = decode(snapshot.state) as Record<string, unknown>;
  if (!state || typeof state !== "object" || Array.isArray(state) || Object.keys(state).some(k => OMIT.has(k))) return invalid();
  if (!Array.isArray(state.witches) || state.witches.length < 1 || state.witches.length > 3 || !Array.isArray(state.creatures) || !state.clock || !state.party || !(state.friendly instanceof Set) || !(state.wildEntry instanceof Map)) return invalid();
  const tuning = JSON.parse(JSON.stringify(snapshot.tuning)) as Tuning;
  const game = newGame(snapshot.seed, tuning, state.witches.length);
  // Saved nights from before the nine-colour mushroom system retain their exact night;
  // only the new subsystem starts fresh, deterministically placed from the saved seed.
  if (!Object.hasOwn(state, 'mushrooms')) state.mushrooms = game.mushrooms;
  // A compatible save has every non-optional field made by newGame. Extra fields are allowed only
  // if they belong to Game (optional fields aren't all present on a new night).
  for (const key of Object.keys(game)) if (!OMIT.has(key) && !Object.hasOwn(state, key)) return invalid();
  if (Object.keys(state).some(key => !Object.hasOwn(game, key) && !OPTIONAL.has(key))) return invalid();
  Object.assign(game, state);
  const stream = (r: unknown) => typeof r === "function" && rngState(r as () => number) !== undefined;
  if (!Number.isFinite(game.clock.time) || game.clock.time < 0 || !Number.isFinite(game.herTime) || game.herTime < 0 || !Number.isInteger(game.party.wave) || game.party.wave < 0 || !(game.party.areas instanceof Map) || !(game.combat.sounds instanceof Map) || !(game.growth.pending instanceof Map) || !(game.berries.onBush instanceof Int32Array) || !stream(game.berries.rand) || !stream(game.partyWitches.rand) || !Array.isArray(game.berries.berries) || !Array.isArray(game.combat.shots)) return invalid();
  if (game.beach !== null && (!Array.isArray(game.beach) || game.beach.some(b => !b || !stream(b.rand)))) return invalid();
  game.creatures.forEach((c, i) => { if (!c || c.id !== i || typeof c.rand !== "function" || !Number.isFinite(c.x) || !Number.isFinite(c.z)) return invalid(); });
  game.witches.forEach((w, i) => {
    if (!w || w.id !== i || !w.body || !Number.isFinite(w.body.x) || !Number.isFinite(w.body.z) || !w.leash || !w.spells || !w.health || !Number.isFinite(w.health.hp) || !(w.leash.progress instanceof Map) || !Array.isArray(w.leash.stack) || !Array.isArray(w.leash.placed)) return invalid();
    const creatureId = (id: number) => Number.isInteger(id) && id >= 0 && id < game.creatures.length;
    if (w.leash.stack.some(id => !creatureId(id)) || w.leash.placed.some(p => !p || !creatureId(p.id) || !Number.isFinite(p.x) || !Number.isFinite(p.z))) return invalid();
  });
  // Resume awaits a player gesture. No held control, pending press or stale interpolation can fire.
  game.clock.paused = true;
  if (game.witches.length > 1) for (const W of game.witches) { W.pending = {}; W.paused = true; }
  game.acc = 0; game.alpha = 1; game.pending = {};
  game.prev = { witches: game.witches.map(w => ({ x: w.body.x, z: w.body.z, lift: w.body.lift })), creatures: new Float64Array(game.creatures.flatMap(c => [c.x, c.z])), camera: { ...game.camera } };
  game.koEvents = []; game.questEvents = []; game.waveEvents = []; game.leashEvents = [];
  return game;
}
