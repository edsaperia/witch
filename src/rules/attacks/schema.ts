// The attack grammar's schema (rules/attacks/types.ts), in the config checker's dialect (rules/schema.ts), built here because an
// attack's children may be attacks given inline, nested to the depth cap (that dialect has no references). Written out to
// config/schema/attacks.schema.json by tools/attacks/compile.mjs for the docs; parseAttack checks against this one.
import type { Schema } from "../schema";

export const BODY_KINDS = ["melee", "bolt", "lob", "runner", "beam", "area", "zone", "mine", "seed", "lure"] as const;
export const PATTERNS = ["single", "burst", "fan", "ring", "spray", "wall", "volley"] as const;
export const AIMS = ["target", "lead", "dodge", "ahead", "caster", "random", "spot"] as const;
export const SPEED_PROFILES = ["constant", "slow", "accel", "decel", "stopGo"] as const;
export const AREA_SHAPES = ["disc", "ring", "donut", "cone", "safeCircle", "cross", "line", "grid"] as const;
export const TELEGRAPH_KINDS = ["flash", "lane", "landing", "ring", "cone", "beamLine", "countdown", "arming", "chainNext", "tetherLine", "lockOn", "none"] as const;
export const EFFECT_NAMES = ["slow", "stun", "knockback", "pull", "root", "burn"] as const;
export const TELL_POSES = ["none", "rear", "crouch", "coil", "spread", "glow", "stamp"] as const;
/** How deep children may nest (a child's child's child), and how many one cast may make in all. */
export const MAX_DEPTH = 3;

const num = (minimum = 0, unit?: string, maximum?: number): Schema => ({ type: "number", minimum, ...(maximum !== undefined ? { maximum } : {}), ...(unit ? { unit } : {}) });
const int = (minimum = 0, maximum?: number): Schema => num(minimum, undefined, maximum);
const obj = (properties: Record<string, Schema>, required: string[] = []): Schema => ({ type: "object", properties, required, additionalProperties: false });
const oneOf = (list: readonly string[]): Schema => ({ type: "string", enum: list });
const angle = (): Schema => ({ type: "number", minimum: -3600, maximum: 3600, unit: "°" });

/** One path term: an object with exactly one of these keys (checked in parse.ts). */
const PATH_TERM: Schema = {
  type: "object", additionalProperties: false, properties: {
    arc: obj({ height: num(0, "m") }, ["height"]),
    curve: angle(),
    wave: obj({ amp: num(0, "m"), freq: num(0, "Hz"), phase: num(0) }, ["amp", "freq"]),
    spiral: obj({ rate: angle(), grow: num(-50, "m/s") }, ["rate", "grow"]),
    home: obj({ turn: num(0, "°/s"), after: num(0, "s"), giveUp: num(0, "m") }, ["turn"]),
    boomerang: obj({ out: num(0, "m") }, ["out"]),
    orbit: obj({ r: num(0, "m"), time: num(0, "s") }, ["r", "time"]),
    runner: { type: "boolean" },
  },
};

const EFFECT: Schema = obj({
  slow: obj({ mult: num(0, undefined, 1), time: num(0, "s") }, ["mult", "time"]),
  stun: num(0, "s"), knockback: num(0, "m"), pull: num(0, "m/s"), root: num(0, "s"),
  burn: obj({ dps: num(0), time: num(0, "s") }, ["dps", "time"]),
});

/** The schema of one attack (its inline children are checked as attacks in their own right by parse.ts, to MAX_DEPTH). */
export function attackSchema(): Schema {
  // (a child's `attack` is a name or an attack given inline: the checker can't say "string or object", so it's left open here and
  // parse.ts checks each inline one against attackSchema(depth - 1) itself)
  const child: Schema = obj({ attack: {}, from: oneOf(["self", "hit", "caster"]), aim: oneOf(AIMS), damage: num(0), at: num(0, "s") }, ["attack"]);
  const children: Schema = { type: "array", items: child, maxItems: 64 };
  return obj({
    base: { type: "string" }, note: { type: "string" },
    cast: obj({ range: num(0, "m"), windup: num(0, "s"), cooldown: num(0, "s"), casts: int(1, 99), rest: num(0, "s"), tell: obj({ pose: oneOf(TELL_POSES), glow: num(0, "s") }) }),
    telegraph: obj({ kind: oneOf(TELEGRAPH_KINDS), lead: num(0, "s"), size: num(0, "m") }),
    emit: obj({ pattern: oneOf(PATTERNS), n: int(1, 64), gap: num(0, "s"), angle: angle(), rate: angle(), spacing: num(0, "m"), holes: { type: "array", items: int(0, 63), maxItems: 64 }, time: num(0, "s"), offset: angle(), aim: oneOf(AIMS) }),
    body: obj({ kind: oneOf(BODY_KINDS), radius: num(0, "m"), element: { type: "string" }, look: { type: "string" }, lunge: num(0, "m"), charge: obj({ speed: num(0, "m/s"), time: num(0, "s") }, ["speed", "time"]), flight: num(0, "s"), arm: num(0, "s"), trigger: num(0, "m"), pull: num(0, "m/s"), reach: num(0, "m") }),
    path: { type: "array", items: PATH_TERM, maxItems: 8 },
    speed: obj({ profile: oneOf(SPEED_PROFILES), v: num(0, "m/s"), to: num(0, "m/s"), time: num(0, "s"), go: num(0, "s"), pause: num(0, "s"), n: int(1, 16) }),
    life: obj({ range: num(0, "m"), time: num(0, "s"), pierce: int(0, 8), bounce: { ...obj({ n: int(0, 8), keep: num(0, undefined, 1) }, ["n"]), nullable: true }, stick: { type: "boolean" } }),
    beam: obj({ length: num(0, "m"), width: num(0, "m"), duration: num(0, "s"), tick: num(0.01, "s"), sweep: num(0, "°/s"), track: num(0, "°/s"), spin: angle(), charge: num(0, "s"), pulse: { type: "array", items: num(0, "s"), minItems: 2, maxItems: 2 }, strike: { type: "boolean" } }),
    area: obj({ quake: { type: "boolean" }, shape: oneOf(AREA_SHAPES), r: num(0, "m"), inner: num(0, "m"), width: num(0, "m"), angle: num(0, "°", 360), to: num(0, "m"), time: num(0, "s"), grow: num(0, "m/s"), waves: int(1, 16), gap: num(0, "s"), n: int(1, 64), spacing: num(0, "m"), delay: num(0, "s"), rain: obj({ n: int(1, 64), r: num(0, "m"), time: num(0, "s") }, ["n", "r", "time"]), at: oneOf(["caster", "target", "spot"]) }),
    zone: obj({ r: num(0, "m"), time: num(0, "s"), tick: num(0.01, "s") }),
    hit: obj({ damage: num(0), effect: EFFECT, allies: obj({ damage: num(0, undefined, 1), effects: { type: "array", items: oneOf(EFFECT_NAMES), maxItems: 6 } }), blink: { type: "boolean" } }),
    force: obj({ r: num(0, "m"), push: { type: "number", minimum: -100, maximum: 100, unit: "m/s" }, who: oneOf(["all", "others", "foes"]) }, ["push"]),
    on: obj({ hit: children, expire: children, bounce: children, land: children, timer: children }),
    pack: obj({
      chain: obj({ n: int(1, 16), range: num(0, "m") }, ["n", "range"]), relay: obj({ n: int(1, 16) }, ["n"]),
      amplify: obj({ r: num(0, "m"), per: num(0), max: num(1) }, ["r", "per", "max"]), tether: obj({ time: num(0, "s"), width: num(0, "m") }, ["time", "width"]),
      triangulate: obj({ delay: num(0, "s"), r: num(0, "m") }, ["delay", "r"]),
    }),
  });
}

/** The attacks file's: every key an attack (or a "_" note). */
export const ATTACK_FILE_SCHEMA: Schema = { type: "object", additionalProperties: attackSchema() };
