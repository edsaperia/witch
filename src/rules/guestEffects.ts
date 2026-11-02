import { affectionOf, type Game } from "./game";
import { queueInviteBurst } from "./invites";
import { bagTuning } from "./bags";

export type GuestEffect = { spell: "letters" | "battering" | "pound"; target: number; x: number; z: number; amount: number; stun: number; push: number; cast: number; shot: number; spent: boolean };
export interface GuestLetterCast { time: number; aimX: number; aimZ: number; id: number; first: number }
const enabled = new WeakSet<Game>(), queued = new WeakMap<Game, GuestEffect[]>();
const automatic = new WeakMap<Game, { cast: number; shot: number; target: number }[]>();
export const guestEffectsEnabled = (g: Game) => enabled.has(g);
export function enableGuestEffects(g: Game) { enabled.add(g); }
export function disableGuestEffects(g: Game) { enabled.delete(g); queued.delete(g); automatic.delete(g); }
export function recordAutomaticHit(g: Game, cast: number, shot: number, target: number) {
  const records = automatic.get(g) ?? []; if (records.length < 256) records.push({ cast, shot, target }); automatic.set(g, records);
}
export function takeAutomaticHits(g: Game) { const records = automatic.get(g) ?? []; automatic.delete(g); return records; }
export function restoreGuestEffects(g: Game, effects: readonly GuestEffect[]) { queued.delete(g); enableGuestEffects(g); queueGuestEffects(g, effects); }
export const pendingGuestEffects = (g: Game): GuestEffect[] => structuredClone(queued.get(g) ?? []);
export function queueGuestEffects(g: Game, effects: readonly GuestEffect[]) {
  if (!effects.length) return;
  if (effects.length > 64 || (queued.get(g)?.length ?? 0) + effects.length > 128) throw Error("Too many guest hit effects");
  queued.set(g, [...queued.get(g) ?? [], ...structuredClone(effects)]);
}
/** Ordered cast admission, replayed before its host frame. Host validation happens outside this rules adapter. */
export function startGuestLetters(g: Game, cast: GuestLetterCast) {
  const W = g.witches[1];
  queueInviteBurst(W.invites, { fire: true, aimX: cast.aimX, aimZ: cast.aimZ }, W.body, true, cast.time, bagTuning(g.tuning, W.spells.bag));
  const count = Math.max(1, Math.round(bagTuning(g.tuning, W.spells.bag).invites.multiShot));
  W.invites.queue.forEach((volley, index) => { volley.claimCast = cast.id; volley.claimFirst = cast.first + index * count; });
}
/** Consumed at the normal rules hit boundary, so wakes, tally and party transitions remain host-owned. */
export function applyGuestEffects(g: Game) {
  const effects = queued.get(g) ?? []; queued.delete(g);
  const W = g.witches[1]; if (!W) return;
  for (const e of effects) {
    const c = g.creatures[e.target]; if (!c || c.gone || c.hp !== undefined && c.hp <= 0) continue;
    if (e.spell === "letters") {
      const key = `${e.cast}:${e.shot}`, receipts = W.invites.claimed ??= {};
      if (Object.keys(receipts).length >= 4096 && !receipts[key]) delete receipts[Object.keys(receipts)[0]];
      const previous = receipts[key];
      receipts[key] = { ids: [...new Set([...(previous?.ids ?? []), c.id])], spent: e.spent || previous?.spent === true, at: W.time ?? g.herTime };
      W.invites.events.push({ kind: "hit", x: e.x, z: e.z, at: W.time ?? g.herTime, id: c.id, n: e.shot, spent: false });
      affectionOf(g, W, true).hit(c, e.amount, W.time ?? g.herTime);
      W.invites.letters = W.invites.letters.filter(letter => {
        if (letter.claimCast !== e.cast || letter.claimShot !== e.shot) return true;
        if (!letter.hit.includes(c.id)) letter.hit.push(c.id);
        return !e.spent;
      });
    } else {
      if (e.stun > 0) { c.stunUntil = Math.max(c.stunUntil ?? 0, g.clock.time + e.stun); c.vx = c.vz = 0; c.moving = false; }
      if (e.push > 0) { const dx = c.x - e.x, dz = c.z - e.z, d = Math.hypot(dx, dz) || 1; c.kx = dx / d * e.push * 10; c.kz = dz / d * e.push * 10; }
    }
  }
}
