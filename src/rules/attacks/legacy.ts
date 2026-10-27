// The 27 attacks the game runs today (a flat record each: rules/combat/data.ts Attack), and the composable grammar: each written in the
// grammar in config/attacks.json and compiled back here to the very record combat.ts reads, so they run exactly as before (the bench's
// "game unchanged"). tools/attacks/compile.mjs writes the compiled records into config/combat.json's `attacks`, which everything else
// still reads; attacks.test.ts checks the two agree. An attack using what the old runtime can't do (a curve, children, a mine...)
// compiles to null: only the new engine runs it.
import type { Attack, Delivery } from "../combat/data";
import type { AttackSpec, Effect } from "./types";

/** An old record in the grammar. */
export function fromLegacy(A: Attack): AttackSpec {
  const effect: Effect | undefined = A.modifier === "knockback" ? { knockback: A.knockback ?? 0 } : A.modifier === "slow" ? { slow: { mult: A.slowMult ?? 1, time: A.slowTime ?? 0 } } : undefined;
  const hit = effect || A.factor !== undefined ? { ...(A.factor !== undefined ? { damage: A.factor } : {}), ...(effect ? { effect } : {}) } : undefined;
  const cast = { range: A.range, windup: A.windup, cooldown: A.cooldown };
  const out: AttackSpec = { cast };
  switch (A.delivery) {
    case "melee": out.body = { kind: "melee", ...(A.lunge !== undefined ? { lunge: A.lunge } : {}), ...(A.speed !== undefined ? { charge: { speed: A.speed, time: A.duration ?? 0 } } : {}) }; break;
    case "shot":
      out.body = { kind: "bolt", ...(A.radius !== undefined ? { radius: A.radius } : {}) };
      if (A.speed !== undefined) out.speed = { v: A.speed };
      if (A.shots !== undefined) out.emit = { pattern: "ring", n: A.shots };
      break;
    case "lob": out.body = { kind: "lob", ...(A.radius !== undefined ? { radius: A.radius } : {}), ...(A.flight !== undefined ? { flight: A.flight } : {}) }; break;
    case "beam":
      out.body = { kind: "beam" };
      out.beam = { ...(A.width !== undefined ? { width: A.width } : {}), ...(A.duration !== undefined ? { duration: A.duration } : {}), ...(A.tick !== undefined ? { tick: A.tick } : {}), ...(A.sweep !== undefined ? { track: A.sweep } : {}), ...(A.spin !== undefined ? { spin: A.spin } : {}) };
      break;
    case "pulse": case "quake":
      out.body = { kind: "area" };
      out.area = { shape: "disc", ...(A.radius !== undefined ? { r: A.radius } : {}), ...(A.delivery === "quake" ? { quake: true } : {}) };
      break;
  }
  if (hit) out.hit = hit;
  return out;
}

/** An attack in the grammar (its base laid under it) as the old record, or null if it uses what the old runtime can't do. */
export function compileLegacy(a: AttackSpec): Attack | null {
  const kind = a.body?.kind ?? "bolt", c = a.cast ?? {}, e = a.hit?.effect ?? {};
  if (a.path?.length || a.on || a.pack || a.life || a.zone || a.telegraph || c.casts !== undefined || c.rest !== undefined) return null;
  if (Object.keys(e).length > 1 || e.stun !== undefined || e.pull !== undefined || e.root !== undefined || e.burn !== undefined) return null;
  if (a.emit && !(kind === "bolt" && a.emit.pattern === "ring" && Object.keys(a.emit).length === 2)) return null;
  if (a.speed && (Object.keys(a.speed).length !== 1 || a.speed.v === undefined)) return null;
  const delivery: Delivery | null = kind === "melee" ? "melee" : kind === "bolt" ? "shot" : kind === "lob" ? "lob" : kind === "beam" ? "beam" : kind === "area" && (a.area?.shape ?? "disc") === "disc" ? (a.area?.quake ? "quake" : "pulse") : null;
  if (!delivery || c.range === undefined || c.windup === undefined || c.cooldown === undefined) return null;
  // (the old record's keys in one order: the file it writes reads the same each time)
  const out: Attack = { delivery, range: c.range } as Attack;
  const put = <K extends keyof Attack>(k: K, v: Attack[K] | undefined) => { if (v !== undefined) out[k] = v; };
  put("speed", kind === "melee" ? a.body?.charge?.speed : a.speed?.v);
  put("radius", kind === "area" ? a.area?.r : a.body?.radius);
  put("width", a.beam?.width);
  put("flight", a.body?.flight);
  put("duration", kind === "melee" ? a.body?.charge?.time : a.beam?.duration);
  put("tick", a.beam?.tick);
  put("sweep", a.beam?.track);
  put("spin", a.beam?.spin);
  out.windup = c.windup; out.cooldown = c.cooldown;
  out.modifier = e.knockback !== undefined ? "knockback" : e.slow ? "slow" : "none";
  put("knockback", e.knockback);
  put("slowMult", e.slow?.mult);
  put("slowTime", e.slow?.time);
  put("lunge", a.body?.lunge);
  put("shots", a.emit?.n);
  put("factor", a.hit?.damage);
  return out;
}
