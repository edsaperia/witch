import { affectionOf, confusedAim, STEP, type Controls, type Game, type Witch } from "../../rules/game";
import { bagTuning } from "../../rules/bags";
import { hasInvites } from "../../rules/kit";
import { spellTarget, hatLetters, hatsDown } from "../../rules/hatSpells";
import { newInvites, queueInviteBurst, stepInvites, type InviteEvent } from "../../rules/invites";
import { queueGuestEffects, startGuestLetters, takeAutomaticHits, type GuestEffect, type GuestLetterCast } from "../../rules/guestEffects";
import { leavesCalmRing } from "../../rules/slowTime";
import { stunned } from "../../rules/knock";
import { potionPhase } from "../../rules/mushrooms";

type Spell = GuestEffect["spell"];
export interface CastRequest { kind: "pve-cast"; id: number; spell: Spell; time: number; first: number; aimX: number; aimZ: number }
export interface HitClaim { kind: "pve-hit"; cast: number; shot: number; target: number; time: number; x: number; z: number }
interface Cast { request: CastRequest; origin: { x: number; z: number }; range: number; shots: number; hits: number; amount: number; stun: number; push: number; radius: number; expires: number; targets: Map<number, Set<number>> }
const finite = (n: unknown): n is number => typeof n === "number" && Number.isFinite(n);
const id = (n: unknown): n is number => Number.isSafeInteger(n) && (n as number) >= 0 && (n as number) < 1e9;
export function pveRequest(value: unknown): CastRequest | HitClaim | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const p = value as Record<string, unknown>;
  if (p.kind === "pve-cast" && Object.keys(p).length === 7 && id(p.id) && ["letters", "battering", "pound"].includes(p.spell as string)
    && finite(p.time) && id(p.first) && finite(p.aimX) && finite(p.aimZ) && Math.hypot(p.aimX, p.aimZ) <= 1.001) return p as unknown as CastRequest;
  if (p.kind === "pve-hit" && Object.keys(p).length === 7 && id(p.cast) && id(p.shot) && id(p.target) && finite(p.time) && finite(p.x) && finite(p.z)) return p as unknown as HitClaim;
  return null;
}

/** Host only: bounded cast ledger, no target collision rerun. Outcomes enter the ordinary rules hit boundary. */
export function guestHitAuthority(game: Game, trace?: (reason: string) => void) {
  const casts = new Map<number, Cast>(), requests: CastRequest[] = [], claims: { claim: HitClaim; tries: number }[] = [];
  const origins = new Set<number>();
  const rejected: Record<string, number> = {}; let last = -1, usedDash = -Infinity, usedPound = -Infinity;
  const reject = (reason: string) => { rejected[reason] = (rejected[reason] ?? 0) + 1; trace?.(reason); };
  return {
    get rejected() { return { ...rejected }; },
    observed() {
      // A cast shares the input frame with locomotion, including a blink. Its origin is that host-owned post-motion position.
      for (const key of origins) { const cast = casts.get(key); if (cast) cast.origin = { x: game.witches[1].body.x, z: game.witches[1].body.z }; }
      origins.clear();
    },
    receive(value: unknown) {
      const request = pveRequest(value); if (!request) { reject("malformed"); return; }
      if (request.kind === "pve-cast") {
        if (request.id <= last) { reject("duplicate-cast"); return; } last = request.id;
        if (requests.length >= 16) reject("cast-queue-cap"); else requests.push(request);
      } else if (claims.length >= 128) reject("claim-queue-cap"); else claims.push({ claim: request, tries: 0 });
    },
    drain(): { casts: GuestLetterCast[]; effects: GuestEffect[] } {
      const W = game.witches[1], time = W.time ?? game.herTime, out: GuestLetterCast[] = [], effects: GuestEffect[] = [];
      for (const record of takeAutomaticHits(game)) {
        const cast = casts.get(record.cast); if (!cast) continue;
        const seen = cast.targets.get(record.shot) ?? new Set<number>(); seen.add(record.target); cast.targets.set(record.shot, seen);
      }
      for (const [key, cast] of casts) if (cast.expires < time) casts.delete(key);
      for (const request of requests.splice(0)) {
        if (casts.size >= 128) { reject("cast-ledger-cap"); continue; }
        if (request.time < time - 2 || request.time > time + .25 || W.ko || W.paused || W.house?.slept || game.clock.paused || stunned(W.knock, time) || potionPhase(game, W)) { reject("cast-state-or-time"); continue; }
        const tuning = bagTuning(game.tuning, W.spells.bag), I = tuning.invites;
        let cast: Cast = { request, origin: { x: W.body.x, z: W.body.z }, range: 0, shots: 1, hits: 128, amount: 0, stun: 0, push: 0, radius: 0, expires: time + 2, targets: new Map() };
        if (request.spell === "letters") {
          if (!I.on || !hasInvites(W) || W.body.mode !== "ground" || W.body.seated || W.wake && !W.wake.open || W.invites.queue.length || request.time + 1e-9 < W.invites.readyAt) { reject("cast-cooldown-or-kit"); continue; }
          const action = { time: request.time, aimX: request.aimX, aimZ: request.aimZ, id: request.id, first: request.first };
          startGuestLetters(game, action); out.push(action); origins.add(request.id);
          cast = { ...cast, range: I.range + (I.chain ?? 0) * (I.chainRange ?? 0) * 1.5,
            shots: Math.max(1, Math.round(I.burst)) * Math.max(1, Math.round(I.multiShot)), hits: (1 + Math.round(I.pierce ?? 0)) * (1 + Math.round(I.chain ?? 0)), amount: I.amount,
            expires: time + (I.range + (I.chain ?? 0) * (I.chainRange ?? 0) * 1.5) / Math.max(1, I.speed) + 2 };
        } else if (request.spell === "battering") {
          if (W.spells.broom !== "battering" || W.dash.at <= usedDash || Math.abs(W.dash.at - request.time) > 1) {
            // Input edges may not reach a fixed step until the next host frame.
            if (time <= request.time + .1) { requests.push(request); continue; }
            reject("dash-not-authorized"); continue;
          }
          usedDash = W.dash.at;
          cast.origin = { x: W.dash.fromX, z: W.dash.fromZ };
          cast.range = Math.hypot(W.dash.toX - W.dash.fromX, W.dash.toZ - W.dash.fromZ) + (game.tuning.spells.battering?.width ?? 0);
          cast.stun = game.tuning.spells.battering?.stun ?? 0;
        } else {
          if (W.spells.broom !== "pound" || W.spells.castAt <= usedPound || Math.abs(W.spells.castAt - request.time) > 1) {
            if (time <= request.time + .1) { requests.push(request); continue; }
            reject("pound-not-authorized"); continue;
          }
          usedPound = W.spells.castAt;
          const P = game.tuning.spells.pound!; cast.range = cast.radius = P.radius; cast.push = P.push;
          cast.stun = W.body.mode === "ground" ? P.stun : 0;
        }
        casts.set(request.id, cast);
      }
      for (const pending of claims.splice(0)) {
        if (effects.length >= 64) { claims.push(pending); continue; }
        const claim = pending.claim, cast = casts.get(claim.cast), c = game.creatures[claim.target];
        if (!cast) { if (pending.tries++ < 2) claims.push(pending); else reject("unknown-cast"); continue; }
        if (!c || c.gone || c.hp !== undefined && c.hp <= 0) { reject("dead-or-missing-target"); continue; }
        if (claim.time < cast.request.time - .05 || claim.time > cast.expires || claim.time > time + .25) { reject("hit-time"); continue; }
        if (cast.request.spell === "letters" ? !affectionOf(game, W).invitable(c) : !spellTarget(c)) { reject("target-ineligible"); continue; }
        const distance = Math.hypot(c.x - cast.origin.x, c.z - cast.origin.z);
        if (distance > cast.range + 3 || Math.hypot(claim.x - cast.origin.x, claim.z - cast.origin.z) > cast.range + 3) { reject("out-of-range"); continue; }
        if (claim.shot < cast.request.first || claim.shot >= cast.request.first + cast.shots) { reject("unknown-projectile"); continue; }
        const seen = cast.targets.get(claim.shot) ?? new Set<number>();
        if (seen.has(c.id)) { reject("duplicate-hit"); continue; }
        if (seen.size >= cast.hits) { reject("projectile-hit-budget"); continue; }
        seen.add(c.id); cast.targets.set(claim.shot, seen);
        effects.push({ spell: cast.request.spell, target: c.id, x: cast.request.spell === "letters" ? claim.x : cast.origin.x, z: cast.request.spell === "letters" ? claim.z : cast.origin.z, amount: cast.amount, stun: cast.stun,
          push: cast.push * (1 - .5 * Math.min(1, distance / Math.max(1, cast.radius))), cast: claim.cast, shot: claim.shot, spent: seen.size >= cast.hits });
      }
      queueGuestEffects(game, effects);
      return { casts: out, effects };
    },
  };
}

/** Client projectiles use what the guest sees; callbacks send claims without mutating those shared creatures. */
export function guestHitPresentation(source: Game, send: (request: CastRequest | HitClaim) => void) {
  const invites = newInvites(), manual = new Map<number, { cast: number; time: number }>();
  invites.readyAt = source.witches[1].invites.readyAt;
  let next = 0, lastDash = source.witches[1].dash.at, lastPound = source.witches[1].spells.castAt;
  let dashIntent: { time: number; until: number } | null = null;
  let accumulator = 0;
  const emit = (request: Omit<CastRequest, "id" | "kind">) => { const id = next++; send({ kind: "pve-cast", id, ...request }); return id; };
  return {
    step(W: Witch, controls: Controls, dt: number) {
      invites.events = [];
      if (source.clock.paused) return;
      accumulator = Math.min(accumulator + Math.min(.1, dt), .1 + STEP);
      while (accumulator >= STEP - 1e-9) {
      accumulator -= STEP;
      const time = (W.time ?? source.herTime) - accumulator, tuning = bagTuning(source.tuning, W.spells.bag), I = tuning.invites;
      if (controls.dash) dashIntent = { time: time - dt, until: time + source.tuning.dash.buffer };
      const aimed = confusedAim(W, controls, time);
      const allowed = !source.clock.paused && !W.paused && !W.ko && !W.house?.slept && !stunned(W.knock, time) && !potionPhase(source, W) && (!W.wake || W.wake.open);
      const first = invites.next, starting = allowed && I.on && hasInvites(W) && W.body.mode === "ground" && !W.body.seated && controls.fire && !invites.queue.length && time >= invites.readyAt;
      if (starting) {
        let ax = aimed.aimX ?? 0, az = aimed.aimZ ?? 0;
        if (Math.hypot(ax, az) < 1e-3) { const speed = Math.hypot(W.body.vx, W.body.vz); ax = speed > .5 ? W.body.vx / speed : W.body.facing; az = speed > .5 ? W.body.vz / speed : 0; }
        const cast = emit({ spell: "letters", time, first, aimX: ax, aimZ: az });
        queueInviteBurst(invites, aimed, W.body, true, time, tuning);
        invites.queue.forEach((volley, index) => { volley.claimCast = cast; volley.claimFirst = first + index * Math.max(1, Math.round(I.multiShot)); });
        const count = Math.max(1, Math.round(I.burst)) * Math.max(1, Math.round(I.multiShot));
        for (let n = first; n < first + count; n++) manual.set(n, { cast, time });
      }
      const affection = affectionOf(source, source.witches[1]);
      const ownHits: InviteEvent[] = [], hat = hasInvites(W) ? hatLetters(hatsDown(source.witches[1]), tuning) : undefined;
      stepInvites(invites, allowed ? aimed : {}, W.body, allowed && I.on && hasInvites(W) && W.body.mode === "ground" && !W.body.seated,
        source.creatures, { ...affection, acceptsHit: () => true, hit: (_c, _amount, _at, automatic) => { const event = invites.events.at(-1); if (!automatic && event?.kind === "hit") ownHits.push(event); } }, time, STEP, tuning,
        source.tuning.legendCircle?.slow.on === false ? undefined : leavesCalmRing({ ...source }, W.body),
        hat ? { ...hat, sentry: [] } : undefined);
      for (const hit of ownHits) if (hit.kind === "hit") {
        const record = manual.get(hit.n); if (record) send({ kind: "pve-hit", cast: record.cast, shot: hit.n, target: hit.id, time, x: hit.x, z: hit.z });
      }
      for (const [n, cast] of manual) if (time - cast.time > 20) manual.delete(n);
      const area = (spell: "battering" | "pound") => {
        const cast = emit({ spell, time: spell === "battering" ? W.dash.at : W.spells.castAt, first: 0, aimX: 0, aimZ: 0 });
        const P = source.tuning.spells.pound, B = source.tuning.spells.battering;
        for (const c of source.creatures) {
          if (!spellTarget(c)) continue;
          let hit = false;
          if (spell === "pound") hit = !!P && Math.hypot(c.x - W.body.x, c.z - W.body.z) <= P.radius;
          else if (B) {
            const dx = W.dash.toX - W.dash.fromX, dz = W.dash.toZ - W.dash.fromZ, length = dx * dx + dz * dz;
            const k = length ? Math.max(0, Math.min(1, ((c.x - W.dash.fromX) * dx + (c.z - W.dash.fromZ) * dz) / length)) : 0;
            hit = Math.hypot(c.x - W.dash.fromX - dx * k, c.z - W.dash.fromZ - dz * k) <= B.width;
          }
          if (hit) send({ kind: "pve-hit", cast, shot: 0, target: c.id, time, x: c.x, z: c.z });
        }
      };
      if (dashIntent && time > dashIntent.until) dashIntent = null;
      if (allowed && dashIntent && W.spells.broom === "battering" && W.dash.at > lastDash && W.dash.at >= dashIntent.time - .01) { lastDash = W.dash.at; dashIntent = null; if (Number.isFinite(lastDash)) area("battering"); }
      if (allowed && controls.spell && W.spells.broom === "pound" && W.spells.castAt > lastPound && W.spells.castAt >= time - dt - .01) { lastPound = W.spells.castAt; if (Number.isFinite(lastPound)) area("pound"); }
      }
    },
    actor(W: Witch): Witch {
      const hats = source.witches[1].invites.letters.filter(letter => letter.hat).map(letter => ({ ...letter, n: -letter.n - 1 }));
      return { ...W, invites: { ...invites, letters: [...invites.letters.filter(letter => !letter.hat), ...hats] } };
    },
  };
}
