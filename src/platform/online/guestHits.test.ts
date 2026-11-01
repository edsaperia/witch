import { expect, it } from "vitest";
import { newGame, affectionOf, stepGame, type Game } from "../../rules/game";
import { TUNING } from "../../rules/tuning";
import { enableGuestEffects, applyGuestEffects, recordAutomaticHit } from "../../rules/guestEffects";
import { guestHitAuthority, guestHitPresentation, pveRequest, type CastRequest, type HitClaim } from "./guestHits";
import { snapshotGame } from "../../rules/nightSnapshot";
import { replayGuest, replayHostStep, replayStart } from "./replay";

function fixture() {
  const tuning = structuredClone(TUNING); tuning.map!.island = "home"; tuning.map!.islandAreas = 4;
  const g = newGame(123, tuning, 2); g.clock.paused = false;
  const W = g.witches[1]; Object.assign(W.body, { seated: false, perch: false });
  enableGuestEffects(g);
  const c = g.creatures.find(c => c.level === 1 && !c.boss)!;
  Object.assign(c, { state: "wild", gone: false, leashed: false, enraged: false, asleep: false, hp: undefined, fleeUntil: undefined, wanderTo: undefined, x: W.body.x + 8, z: W.body.z });
  expect(affectionOf(g, W).invitable(c)).toBe(true);
  return { g, W, c, authority: guestHitAuthority(g) };
}
const cast = (time = 0): CastRequest => ({ kind: "pve-cast", id: 0, spell: "letters", time, first: 0, aimX: 1, aimZ: 0 });
const hit = (g: Game, target: number): HitClaim => ({ kind: "pve-hit", cast: 0, shot: 0, target, time: .1, x: g.creatures[target].x, z: g.creatures[target].z });
it("validates bounded typed hit/cast messages instead of accepting arbitrary effect amounts", () => {
  expect(pveRequest(cast())).toEqual(cast());
  expect(pveRequest({ ...cast(), amount: 999 })).toBe(null);
  expect(pveRequest({ ...cast(), time: Infinity })).toBe(null);
  expect(pveRequest({ kind: "pve-hit", cast: 0, shot: 0, target: -1, time: 0, x: 0, z: 0 })).toBe(null);
});
it("deduplicates hits and spends only the host-approved cast cooldown", () => {
  const { g, W, c, authority } = fixture();
  authority.receive(cast()); expect(authority.drain().casts).toHaveLength(1);
  expect(W.invites.readyAt).toBeGreaterThan(0);
  authority.receive({ ...cast(), id: 1 }); expect(authority.drain().casts).toHaveLength(0);
  W.time = .1;
  const before = affectionOf(g, W).affection(c);
  authority.receive(hit(g, c.id)); authority.receive(hit(g, c.id));
  const effects = authority.drain().effects; expect(effects).toHaveLength(1);
  applyGuestEffects(g);
  expect(affectionOf(g, W).affection(c)).not.toBe(before);
  expect(authority.rejected).toMatchObject({ "cast-cooldown-or-kit": 1, "duplicate-hit": 1 });
});
it("replays admitted casts and hit outcomes in the same canonical order without double-counting local collision", () => {
  const { g, W, c, authority } = fixture(), replica = replayGuest(replayStart(g, "hits", 0), "hits");
  authority.receive(cast()); W.time = .1;
  authority.receive(hit(g, c.id));
  const actions = authority.drain(), idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
  // Both simulations start with the same actor clock; this test concerns ordering, not latency.
  replica.game.witches[1].time = W.time;
  const frame = replayHostStep(g, [idle, idle], 1 / 60, 1);
  frame.guestCasts = actions.casts; frame.guestEffects = actions.effects;
  expect(replica.apply(frame)).toBe(true);
  expect(snapshotGame(replica.game)).toEqual(snapshotGame(g));
});
it.each(["battering", "pound"] as const)("applies guest-decided %s stun/push only after the host allowed the real cast", spell => {
  const { g, W, c, authority } = fixture(), hp = c.hp;
  W.spells.broom = spell;
  if (spell === "pound") { W.body.mode = "treetop"; W.body.lift = 1; }
  const idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
  stepGame(g, [idle, { ...idle, moveX: 1, dash: spell === "battering", spell: spell === "pound" }], 1 / 60);
  const time = spell === "battering" ? W.dash.at : W.spells.castAt;
  expect(Number.isFinite(time)).toBe(true);
  expect(c.stunUntil ?? 0).toBeLessThanOrEqual(g.clock.time);
  authority.receive({ ...cast(time), spell }); authority.drain();
  authority.receive({ ...hit(g, c.id), time }); const accepted = authority.drain();
  expect(accepted.effects).toHaveLength(1); applyGuestEffects(g);
  expect(c.stunUntil).toBeGreaterThan(g.clock.time); expect(c.hp).toBe(hp);
  if (spell === "pound") expect(Math.hypot(c.kx ?? 0, c.kz ?? 0)).toBeGreaterThan(0);
});
it("keeps automatic hat-letter affection host-owned while manual guest collisions await claims", () => {
  const { g, W, c } = fixture(), before = affectionOf(g, W).affection(c);
  affectionOf(g, W).hit(c, 1, 0);
  expect(affectionOf(g, W).affection(c)).toBe(before);
  affectionOf(g, W).hit(c, 1, 0, true);
  expect(affectionOf(g, W).affection(c)).not.toBe(before);
});
it("uses the same fixed projectile steps for one long presentation frame and six ordinary frames", () => {
  const { g, W } = fixture(), one: unknown[] = [], many: unknown[] = [];
  const a = guestHitPresentation(g, message => one.push(message)), b = guestHitPresentation(g, message => many.push(message));
  const c = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, fire: true, aimX: 1, aimZ: 0 };
  a.step({ ...W, time: .1 }, c, .1);
  for (let n = 1; n <= 6; n++) b.step({ ...W, time: n / 60 }, c, 1 / 60);
  expect(one.map(m => (m as { kind: string }).kind)).toEqual(many.map(m => (m as { kind: string }).kind));
  const x = a.actor(W).invites.letters, y = b.actor(W).invites.letters;
  expect(x).toHaveLength(y.length);
  x.forEach((letter, i) => { expect(letter.x).toBeCloseTo(y[i].x, 8); expect(letter.z).toBeCloseTo(y[i].z, 8); });
});
it("does not count the same projectile again after a Slingshot handoff or a late first host step", () => {
  const { g, W, c, authority } = fixture();
  authority.receive(cast()); authority.drain(); W.time = .1;
  recordAutomaticHit(g, 0, 0, c.id);
  authority.receive(hit(g, c.id)); expect(authority.drain().effects).toHaveLength(0);
  expect(authority.rejected["duplicate-hit"]).toBe(1);
  // A different allowed cast may already be spent on the guest before its first host step.
  W.invites.queue = []; W.invites.readyAt = 0;
  authority.receive({ ...cast(.1), id: 1, first: 10 }); authority.drain();
  authority.receive({ ...hit(g, c.id), cast: 1, shot: 10 }); expect(authority.drain().effects).toHaveLength(1);
  applyGuestEffects(g);
  const idle = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 };
  stepGame(g, [idle, idle], 1 / 60);
  expect(W.invites.letters.some(letter => letter.claimCast === 1 && letter.claimShot === 10)).toBe(false);
});
