// The composable attack grammar (the coordinator's ask from Ed, 2026-10-27: "Put the focus on composability for these attack
// systems — and on telegraphing"; docs/plans/attack-grammar.md): an attack as a small tree of orthogonal modules, each optional,
// each with its defaults (rules/attacks/parse.ts). Lengths in metres, times in seconds, angles in degrees, speeds in m/s. Rules only:
// `element` and `look` are tags for the look layer, never read here.

/** What one emitted thing is. */
export type BodyKind = "melee" | "bolt" | "lob" | "runner" | "beam" | "area" | "zone" | "mine" | "seed" | "lure";
/** How a cast's things are released. */
export type Pattern = "single" | "burst" | "fan" | "ring" | "spray" | "wall" | "volley";
/** Where it's aimed. */
export type Aim = "target" | "lead" | "dodge" | "ahead" | "caster" | "random" | "spot";
export type SpeedProfile = "constant" | "slow" | "accel" | "decel" | "stopGo";
export type AreaShape = "disc" | "ring" | "donut" | "cone" | "safeCircle" | "cross" | "line" | "grid";
/** The danger the look layer draws, and the audio cues. */
export type TelegraphKind = "flash" | "lane" | "landing" | "ring" | "cone" | "beamLine" | "countdown" | "arming" | "chainNext" | "tetherLine" | "lockOn" | "none";
/** The caster's body language as it winds up (drawn by the creature's art, before any ground marker). */
export type TellPose = "none" | "rear" | "crouch" | "coil" | "spread" | "glow" | "stamp";

/** One motion term; a body's path sums them on top of its heading. */
export type PathTerm =
  | { arc: { height: number } }
  | { curve: number }
  | { wave: { amp: number; freq: number; phase?: number } }
  | { spiral: { rate: number; grow: number } }
  | { home: { turn: number; after?: number; giveUp?: number } }
  | { boomerang: { out: number } }
  | { orbit: { r: number; time: number } }
  | { runner: true };

/** The side effects a hit can have (each spilling onto other animals only where `hit.allies.effects` names it). */
export type EffectName = "slow" | "stun" | "knockback" | "pull" | "root" | "burn";
/** What a hit does besides its damage (any together). */
export interface Effect { slow?: { mult: number; time: number }; stun?: number; knockback?: number; pull?: number; root?: number; burn?: { dps: number; time: number } }

/** A child attack an event spawns: named, or given inline; where it starts, how it aims, its damage's share. */
export interface Child { attack: string | AttackSpec; from?: "self" | "hit" | "caster"; aim?: Aim; damage?: number }
export type TimerChild = Child & { at: number };

export interface AttackSpec {
  /** Another attack's name: its modules taken, these laid over (objects merged, lists replaced). */
  base?: string;
  /** For the docs and the arena. */
  note?: string;
  cast?: {
    /** How near it wants to be to cast (and a melee's reach). */
    range?: number;
    windup?: number;
    cooldown?: number;
    /** Casts before a rest of `rest` s (1: no rest). */
    casts?: number;
    rest?: number;
    /** The body's tell through the windup: its pose, and how long its glow builds (s, to the release). */
    tell?: { pose?: TellPose; glow?: number };
  };
  /** Its warning: the kind (else the body's own), how long before the release it shows (else the whole windup), its size (m, else the body's). */
  telegraph?: { kind?: TelegraphKind; lead?: number; size?: number };
  emit?: {
    pattern?: Pattern;
    n?: number;
    /** burst: s between; volley: beats between members. */
    gap?: number;
    /** fan: its spread; spray: deg/s it turns. */
    angle?: number;
    rate?: number;
    /** wall: m between; holes: the slots left out. */
    spacing?: number;
    holes?: number[];
    /** spray: over how long. */
    time?: number;
    /** ring: its first one's angle off the aim. */
    offset?: number;
    aim?: Aim;
  };
  body?: {
    kind?: BodyKind;
    radius?: number;
    element?: string;
    look?: string;
    /** melee: how far it lunges at where it aimed. */
    lunge?: number;
    /** melee: a charge's speed and time (a legend's). */
    charge?: { speed: number; time: number };
    /** lob: its flight. */
    flight?: number;
    /** mine and seed: arm or sprout time; mine: its trigger radius; lure: how hard it pulls her (m/s) and from how far. */
    arm?: number;
    trigger?: number;
    pull?: number;
    reach?: number;
  };
  path?: PathTerm[];
  speed?: { profile?: SpeedProfile; v?: number; to?: number; time?: number; go?: number; pause?: number; n?: number };
  life?: { range?: number; time?: number; pierce?: number; bounce?: { n: number; keep?: number }; stick?: boolean };
  beam?: { length?: number; width?: number; duration?: number; tick?: number; sweep?: number; track?: number; spin?: number; charge?: number; pulse?: [number, number]; strike?: boolean };
  /** quake: the ground shakes (a legend's slam: the quake event rather than a pulse's). */
  area?: { quake?: boolean; shape?: AreaShape; r?: number; inner?: number; width?: number; angle?: number; to?: number; time?: number; grow?: number; waves?: number; gap?: number; n?: number; spacing?: number; delay?: number; rain?: { n: number; r: number; time: number }; at?: "caster" | "target" | "spot" };
  zone?: { r?: number; time?: number; tick?: number };
  hit?: {
    /** Its share of the level's damage budget (1: the cooldown's worth). */
    damage?: number;
    effect?: Effect;
    /** What it does to animals it isn't aimed at (its own side, other kinds: Ed, 2026-10-27, "not much friendly fire but sometimes
     *  friendly 'effects' like stun, knockback, slow"): its damage's share (0 or absent: none) and which of its effects spill onto them. */
    allies?: { damage?: number; effects?: EffectName[] };
    /** A dash's blink passes through it. */
    blink?: boolean;
  };
  on?: { hit?: Child[]; expire?: Child[]; bounce?: Child[]; land?: Child[]; timer?: TimerChild[] };
  /** A force field round it (a zone, or a moving body: a legend's whirlwind): within r, pushing (m/s; negative pulls) whoever `who`
   *  says: "all" (every creature and her), "others" (every creature), "foes" (only its foes: a friendly legend's pushes the wild away). */
  force?: { r?: number; push: number; who?: "all" | "others" | "foes" };
  pack?: { chain?: { n: number; range: number }; relay?: { n: number }; amplify?: { r: number; per: number; max: number }; tether?: { time: number; width: number }; triangulate?: { delay: number; r: number } };
}

/** The attacks file: each by name (keys starting "_" are notes). */
export type AttackFile = Record<string, AttackSpec | string>;
