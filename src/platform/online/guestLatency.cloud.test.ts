// Owner allocation: run latency/jitter evidence only on canonical/cloud runners, never the laptop.
import { expect, it } from "vitest";
import { newGame, STEP, type Controls } from "../../rules/game";
import { TUNING } from "../../rules/tuning";
import { guestPrediction } from "./guestPrediction";
import { guestInput } from "./guestInput";
import { replayGuest, replayHostStep, replayStart, type ReplayFrame } from "./replay";
import { guestHitAuthority, type CastRequest, type HitClaim } from "./guestHits";
import { affectionOf } from "../../rules/game";
import { enableGuestEffects, applyGuestEffects } from "../../rules/guestEffects";
import { withGuestInputSteps, holdGuestMotion } from "../../rules/onlineInputSteps";

const cloud = it.runIf(process.env.CI === "true" || process.env.WITCH_CANONICAL_EVIDENCE === "1");
const controls = (x: number): Controls => ({ moveX: x, moveZ: 0, toggleMode: false, zoom: 0 });
function world() {
  const t = structuredClone(TUNING); t.map!.island = "home"; t.map!.islandAreas = 4;
  const g = newGame(123, t, 2); g.clock.paused = false;
  g.witches.forEach(w => { w.body.seated = false; w.body.perch = false; });
  return g;
}
const quantile = (values: number[], q: number) => [...values].sort((a, b) => a - b)[Math.min(values.length - 1, Math.floor(values.length * q))] ?? 0;
for (const delay of [0, 100, 250]) {
  cloud(`cloud: local key-up response, natural braking and reconciliation at ${delay}ms each way + ordered jitter`, () => {
    const host = world(), replica = replayGuest(replayStart(host, "latency", 0), "latency"), errors: number[] = [];
    const prediction = guestPrediction(replica.game, 1, event => errors.push(event.size)), buffer = guestInput();
    const up: { at: number; sequence: number; controls: Controls }[] = [], down: { at: number; frame: ReplayFrame }[] = [];
    let lastUp = 0, lastDown = 0, responseFrames = -1, lowSpeedFrames = -1, releaseSpeed = 0;
    for (let tick = 0; tick < 240; tick++) {
      const now = tick * STEP * 1000, input = controls(tick < 60 ? 1 : 0);
      if (tick === 60) releaseSpeed = prediction.actor.body.vx;
      prediction.input(tick, input, STEP);
      if (tick >= 60 && responseFrames < 0 && prediction.actor.body.vx < releaseSpeed - 1e-6) responseFrames = tick - 60 + 1;
      if (tick >= 60 && lowSpeedFrames < 0 && Math.hypot(prediction.actor.body.vx, prediction.actor.body.vz) < .05) lowSpeedFrames = tick - 60 + 1;
      const jitter = delay ? (tick * 17 % 41) - 20 : 0;
      lastUp = Math.max(lastUp, now + delay + jitter); up.push({ at: lastUp, sequence: tick, controls: input });
      while (up[0]?.at <= now) { const packet = up.shift()!; buffer.accept(packet, now); }
      const consumed = buffer.consume(now);
      const frame = withGuestInputSteps(host, () => { if (!consumed.motion) holdGuestMotion(host); return consumed.controls; },
        () => replayHostStep(host, [controls(0), consumed.controls], STEP, tick + 1));
      frame.guestSequence = consumed.sequence; frame.guestSteps = [consumed];
      lastDown = Math.max(lastDown, now + delay - jitter); down.push({ at: lastDown, frame });
      while (down[0]?.at <= now) { const packet = down.shift()!; expect(replica.apply(packet.frame)).toBe(true); prediction.reconcile(packet.frame.guestSequence!); }
    }
    expect(releaseSpeed).toBeGreaterThan(0); expect(responseFrames).toBe(1);
    expect(lowSpeedFrames).toBeGreaterThan(responseFrames); expect(prediction.pending).toBeLessThan(120);
    console.log(JSON.stringify({ evidence: "guest-locomotion", oneWayDelayMs: delay, jitterMs: delay ? 20 : 0,
      keyupFirstDecelerationFrames: responseFrames, keyupToLowSpeedFrames: lowSpeedFrames,
      correctionMetres: { samples: errors.length, p50: quantile(errors, .5), p95: quantile(errors, .95), max: Math.max(...errors) }, snaps: prediction.stats.snaps, hostInputQueue: buffer.stats }));
    expect(quantile(errors, .95)).toBeLessThan(.05);
    expect(Math.max(...errors)).toBeLessThan(.3);
    expect(prediction.stats.snaps).toBe(0);
  }, 30000);

  cloud(`cloud: guest-seen moving-target hit and grouped plausibility rejects at ${delay}ms + jitter`, () => {
    const g = world(), W = g.witches[1], target = g.creatures.find(c => c.level === 1 && !c.boss)!;
    enableGuestEffects(g);
    Object.assign(target, { state: "wild", gone: false, leashed: false, enraged: false, asleep: false, hp: undefined,
      fleeUntil: undefined, wanderTo: undefined, x: W.body.x + 8, z: W.body.z });
    const authority = guestHitAuthority(g);
    const cast: CastRequest = { kind: "pve-cast", id: 0, spell: "letters", time: 0, first: 0, aimX: 1, aimZ: 0 };
    const hit: HitClaim = { kind: "pve-hit", cast: 0, shot: 0, target: target.id, time: .1, x: target.x, z: target.z };
    W.time = delay / 1000; authority.receive(cast); authority.drain();
    // The animal has moved sideways off the guest's projectile by the time its claim arrives.
    target.z += 5; W.time = .1 + (delay + (delay ? 20 : 0)) / 1000;
    authority.receive(hit); const accepted = authority.drain(); expect(accepted.effects).toHaveLength(1);
    const before = affectionOf(g, W).affection(target); applyGuestEffects(g); expect(affectionOf(g, W).affection(target)).not.toBe(before);
    target.x = W.body.x + g.tuning.invites.range + 100;
    authority.receive({ ...hit, x: target.x, z: target.z }); expect(authority.drain().effects).toHaveLength(0);
    target.hp = 0; authority.receive(hit); expect(authority.drain().effects).toHaveLength(0);
    expect(authority.rejected).toMatchObject({ "out-of-range": 1, "dead-or-missing-target": 1 });
    console.log(JSON.stringify({ evidence: "guest-pve", oneWayDelayMs: delay, acceptedMovingTarget: 1, rejectedByReason: authority.rejected }));
  }, 30000);
}

for (const delay of [100, 250]) for (const turning of [false, true]) {
  cloud(`cloud: uneven page frames ${turning ? "turning" : "straight"} at ${delay}ms each way`, () => {
    const host = world(), replica = replayGuest(replayStart(host, "uneven", 0), "uneven");
    const errors: number[] = [], prediction = guestPrediction(replica.game, 1, e => errors.push(e.size)), buffer = guestInput();
    const up: { at: number; sequence: number; controls: Controls }[] = [], down: { at: number; frame: ReplayFrame }[] = [];
    const guestFrames = [16, 16, 250, 16, 450, 16], hostFrames = [16, 33, 70, 16, 50];
    let guestAt = 0, hostAt = 0, gi = 0, hi = 0, sequence = 0, tick = 0, accumulator = 0, holdMs = 0, longestHostHoldMs = 0;
    while (Math.min(guestAt, hostAt) < 8000) {
      if (guestAt <= hostAt) {
        const now = guestAt, frameMs = guestFrames[gi++ % guestFrames.length]; guestAt += frameMs;
        while (down[0]?.at <= now) { const p = down.shift()!; expect(replica.apply(p.frame)).toBe(true); prediction.reconcile(p.frame.guestSequence!); }
        // Ordinary page session receives this same .1s clamp from telephoneStation; prediction and wire share every quantum.
        accumulator += Math.min(.1, frameMs / 1000);
        while (accumulator >= STEP - 1e-9) {
          accumulator -= STEP;
          const input = controls(now < 5000 ? 1 : 0);
          if (turning && now >= 2000 && now < 5000) { input.moveX = 0; input.moveZ = 1; }
          prediction.input(sequence, input, STEP); up.push({ at: now + delay, sequence: sequence++, controls: input });
        }
      } else {
        const now = hostAt, frameMs = hostFrames[hi++ % hostFrames.length]; hostAt += frameMs;
        while (up[0]?.at <= now) buffer.accept(up.shift()!, now);
        const steps: NonNullable<ReplayFrame["guestSteps"]> = [];
        const frame = withGuestInputSteps(host, () => {
          const consumed = buffer.consume(now); steps.push(consumed);
          holdMs = consumed.motion ? 0 : holdMs + STEP * 1000;
          longestHostHoldMs = Math.max(longestHostHoldMs, holdMs);
          if (!consumed.motion) holdGuestMotion(host);
          return consumed.controls;
        }, () => replayHostStep(host, [controls(0), controls(0)], frameMs / 1000, ++tick));
        frame.guestSequence = buffer.sequence; frame.guestSteps = steps;
        down.push({ at: now + delay, frame });
      }
    }
    console.log(JSON.stringify({ evidence: "guest-uneven-frames", delay, turning, guestFrames, hostFrames,
      emitted: sequence, correctionMetres: { samples: errors.length, p95: quantile(errors, .95), max: Math.max(...errors) },
      snaps: prediction.stats.snaps, longestHostHoldMs, hostInputQueue: buffer.stats }));
    expect(errors.length).toBeGreaterThan(0);
    expect(quantile(errors, .95)).toBeLessThan(.05); expect(Math.max(...errors)).toBeLessThan(.3);
    expect(prediction.stats.snaps).toBe(0); expect(buffer.stats.underruns).toBeGreaterThan(0);
    expect(buffer.stats.discarded).toBe(0);
  }, 30000);
}
