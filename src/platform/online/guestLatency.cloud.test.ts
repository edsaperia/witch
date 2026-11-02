// Owner allocation: run latency/jitter evidence only on canonical/cloud runners, never the laptop.
import { afterEach, beforeEach, expect, it } from "vitest";
import { newGame, STEP, type Controls } from "../../rules/game";
import { TUNING } from "../../rules/tuning";
import { guestPrediction } from "./guestPrediction";
import { guestInput } from "./guestInput";
import { replayGuest, replayHostStep, replayStart, type ReplayFrame } from "./replay";
import { guestHitAuthority, type CastRequest, type HitClaim } from "./guestHits";
import { affectionOf } from "../../rules/game";
import { enableGuestEffects, applyGuestEffects } from "../../rules/guestEffects";
import { withGuestInputSteps, holdGuestMotion } from "../../rules/onlineInputSteps";
import { HOUSE_ROOMS, objectFront, fromPlan, installEdLayout } from "../../rules/houseRooms";
import { startWakeFor } from "../../rules/wakeUp";

const cloud = it.runIf(process.env.CI === "true" || process.env.WITCH_CANONICAL_EVIDENCE === "1");
beforeEach(()=>installEdLayout(true));
afterEach(()=>installEdLayout(false));
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

for (const delay of [100, 250]) for (const route of ["straight", "turning", "indoor", "entry"] as const) {
  cloud(`cloud: uneven page frames ${route} at ${delay}ms each way`, () => {
    const host = world(), waypoints: { x: number; z: number }[] = [];
    const indoors = route === "indoor" || route === "entry";
    if (indoors) {
      const W = host.witches[1]; W.time = host.herTime;
      startWakeFor(host, W.time, { yesterday: true }, W, { player: 1, room: "bedroom2" });
      W.wake!.open = route !== "entry"; W.wake!.beat = route === "entry" ? "alarm" : "up"; W.body.seated = false;
      const at = host.map.treehouse, shape = HOUSE_ROOMS.shape, branch = shape.branches.find(r => r.id === "bedroom2")!;
      const parentIndex = shape.trunk.findIndex(r => r.id === branch.from), parent = shape.trunk[parentIndex];
      const point = (p: { x: number; z: number }) => fromPlan(at, p.x, p.z, HOUSE_ROOMS.turn ?? 0);
      const curve = (a: { x: number; z: number }, b: { x: number; z: number }, bend: number) => {
        const L = Math.hypot(b.x-a.x,b.z-a.z), cx=(a.x+b.x)/2-(b.z-a.z)/L*bend*2, cz=(a.z+b.z)/2+(b.x-a.x)/L*bend*2;
        return Array.from({length:9},(_,i)=>{ const t=i/8;return point({x:(1-t)**2*a.x+2*(1-t)*t*cx+t*t*b.x,z:(1-t)**2*a.z+2*(1-t)*t*cz+t*t*b.z}); });
      };
      for (const id of ["bedroom2Wardrobe", "bedroom2DressingTable"]) waypoints.push(objectFront(HOUSE_ROOMS.objects.find(o=>o.id===id)!,at));
      waypoints.push(point(branch),objectFront(HOUSE_ROOMS.objects.find(o=>o.id==="bedroom2Door")!,at),...curve(parent,branch,branch.bend).reverse());
      waypoints.push(point({x:parent.x+1,z:parent.z}));
      const terrace = shape.trunk.findIndex(r=>r.id==="terrace");
      for(let i=parentIndex;i>terrace;i--)waypoints.push(...curve(shape.trunk[i-1],shape.trunk[i],i%2?1:-1).reverse());
      waypoints.push(point(shape.trunk[terrace]));
    }
    const replica = replayGuest(replayStart(host, "uneven", 0), "uneven");
    const errors: number[] = [], allErrors: number[] = [], prediction = guestPrediction(replica.game, 1, e => {
      allErrors.push(e.size);
      // The ordinary-entry wake has an expected authoritative bedside relocation; keep its size visible separately.
      if (!(route === "entry" && e.reason.startsWith("authoritative-transition:"))) errors.push(e.size);
    }), buffer = guestInput();
    const up: { at: number; sequence: number; controls: Controls }[] = [], down: { at: number; frame: ReplayFrame }[] = [];
    const guestFrames = [16, 16, 250, 16, 450, 16], hostFrames = [16, 33, 70, 16, 50];
    let guestAt = 0, hostAt = 0, gi = 0, hi = 0, sequence = 0, tick = 0, accumulator = 0, holdMs = 0, longestHostHoldMs = 0, waypoint = 0;
    let routeDoneAt: number | undefined;
    while (Math.min(guestAt, hostAt) < (indoors ? 160000 : 8000)) {
      if (routeDoneAt !== undefined && Math.min(guestAt, hostAt) > routeDoneAt + 1500) break;
      if (guestAt <= hostAt) {
        const now = guestAt, frameMs = guestFrames[gi++ % guestFrames.length]; guestAt += frameMs;
        while (down[0]?.at <= now) { const p = down.shift()!; expect(replica.apply(p.frame)).toBe(true); prediction.reconcile(p.frame.guestSequence!); }
        // Ordinary page session receives this same .1s clamp from telephoneStation; prediction and wire share every quantum.
        accumulator += Math.min(.1, frameMs / 1000);
        while (accumulator >= STEP - 1e-9) {
          accumulator -= STEP;
          const input = controls(now < 5000 ? 1 : 0);
          if (route === "turning" && now >= 2000 && now < 5000) { input.moveX = 0; input.moveZ = 1; }
          if (indoors) {
            if(waypoint===waypoints.length)routeDoneAt??=now;
            const b=prediction.actor.body,target=waypoints[waypoint];input.moveX=input.moveZ=0;
            if(route==="entry"&&!replica.game.witches[1].wake?.open)input.moveX=1;
            else if(target){const dx=target.x-b.x,dz=target.z-b.z,distance=Math.hypot(dx,dz);
              if(distance<.6&&Math.hypot(b.vx,b.vz)<.4)waypoint++;
              else { input.moveX=Math.max(-1,Math.min(1,dx));input.moveZ=Math.max(-1,Math.min(1,dz)); }
            }
          }
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
    console.log(JSON.stringify({ evidence: "guest-uneven-frames", delay, route, guestFrames, hostFrames, waypoint, waypoints: waypoints.length,
      emitted: sequence, correctionMetres: { samples: errors.length, p95: quantile(errors, .95), max: Math.max(...errors) },
      allCorrectionsIncludingTransitions: {samples:allErrors.length,p95:quantile(allErrors,.95),max:Math.max(...allErrors)},
      snaps: prediction.stats.snaps, transitionSnaps: prediction.stats.transitionSnaps, correctionSnaps: prediction.stats.correctionSnaps,
      pendingCapSnaps: prediction.stats.pendingCapSnaps, longestHostHoldMs, hostInputQueue: buffer.stats }));
    expect(errors.length).toBeGreaterThan(0);
    expect(quantile(errors, .95)).toBeLessThan(.05); expect(Math.max(...errors)).toBeLessThan(.3);
    expect(prediction.stats.correctionSnaps).toBe(0); expect(prediction.stats.pendingCapSnaps).toBe(0);
    if(route!=="entry")expect(prediction.stats.snaps).toBe(0);
    if(route==="entry")expect(prediction.stats.transitionReasons.held).toBeGreaterThan(0);
    if(indoors)expect(waypoint).toBe(waypoints.length);
    expect(buffer.stats.underruns).toBeGreaterThan(0);
    expect(buffer.stats.discarded).toBe(0);
  }, 90000);
}
