import { STEP, stepWitchLocomotion, type Controls, type Game, type Witch } from "../../rules/game";

const edges = ["toggleMode", "dash", "spell"] as const;
const MAX_PENDING = 120, SNAP = 3, MAX_OFFSET = .75;
export interface PredictionCorrection { sequence: number; size: number; snapped: boolean; reason: string }
interface Input { sequence: number; controls: Controls; dt: number }
export interface PredictionEvidence {
  frameTick?: number;
  correction: PredictionCorrection; transitions: string[];
  before: { actor: Witch; acc: number; offset: { x: number; z: number }; acknowledged: number; pending: Input[] };
  after: { actor: Witch; acc: number; canonical: Witch; sourceAcc: number; sourceHerTime: number; sourceClockTime: number; acknowledged: number; pending: Input[] };
}

/** Private presentation actor only. Canonical Game, creatures, inventory and saves are never advanced here. */
export function guestPrediction(source: Game, player: number, report?: (event: PredictionCorrection) => void, evidence?: (proof: PredictionEvidence) => void) {
  let actor = structuredClone(source.witches[player]), acc = source.acc, acknowledged = -1;
  const pending: Input[] = [];
  const sizes: number[] = []; let corrections = 0, snaps = 0, largest = 0, transitionSnaps = 0, correctionSnaps = 0, pendingCapSnaps = 0;
  const transitionReasons: Record<string, number> = {};
  const offset = { x: 0, z: 0 };
  let pendingEdges: Partial<Controls> = {};
  const held = (w: Witch) => !!w.ko || !!w.house?.slept || !!w.paused || !!w.wake && !w.wake.open;
  // Walking between room labels is ordinary locomotion, not an authoritative relocation.
  const state = (w: Witch) => ({ held: held(w), sleep: !!w.house?.slept, perch: !!w.body.perch, bed: w.house?.lastBed, ko: w.ko?.at });
  let authoritative = state(source.witches[player]);
  const advance = (input: Input) => {
    for (const key of edges) if (input.controls[key]) pendingEdges[key] = true;
    acc = Math.min(acc + input.dt, .25 + STEP);
    while (acc >= STEP - 1e-9) {
      acc -= STEP;
      const controls = { ...input.controls };
      for (const key of edges) { controls[key] = !!pendingEdges[key]; delete pendingEdges[key]; }
      if (held(actor) || source.clock.paused) continue;
      actor.time = (actor.time ?? source.herTime) + STEP;
      const witches = source.witches.map((w, i) => i === player ? actor : w);
      stepWitchLocomotion({ ...source, witches, leashEvents: [] }, actor, controls, STEP, false);
    }
  };
  return {
    input(sequence: number, controls: Controls, dt: number) {
      if (!Number.isSafeInteger(sequence) || sequence <= acknowledged || !Number.isFinite(dt) || dt < 0 || dt > .1) throw Error("Invalid predicted input");
      const input = { sequence, controls: { moveX: controls.moveX, moveZ: controls.moveZ, toggleMode: controls.toggleMode,
        dash: controls.dash, spell: controls.spell, fire: controls.fire, aimX: controls.aimX, aimZ: controls.aimZ, zoom: 0 }, dt };
      if (pending.length >= MAX_PENDING) {
        snaps++; pendingCapSnaps++;
        report?.({ sequence, size: 0, snapped: true, reason: "pending-cap" });
        pending.length = 0; actor = structuredClone(source.witches[player]); acc = source.acc; pendingEdges = {}; offset.x = offset.z = 0;
      }
      pending.push(input); advance(input);
      const fade = Math.exp(-dt / .06); offset.x *= fade; offset.z *= fade;
    },
    reconcile(sequence: number) {
      if (!Number.isSafeInteger(sequence) || sequence < acknowledged) throw Error("Invalid applied guest input acknowledgement");
      const before = evidence ? { actor, acc, offset: { ...offset }, acknowledged, pending: [...pending] } : null;
      acknowledged = sequence;
      while (pending.length && pending[0].sequence <= sequence) pending.shift();
      const visible = { x: actor.body.x + offset.x, z: actor.body.z + offset.z };
      actor = structuredClone(source.witches[player]); acc = source.acc; pendingEdges = {};
      const next = state(actor);
      const transitions = (Object.keys(next) as (keyof typeof next)[]).filter(key => next[key] !== authoritative[key]);
      const discontinuity = transitions.length > 0;
      for (const reason of transitions) transitionReasons[reason] = (transitionReasons[reason] ?? 0) + 1;
      authoritative = next;
      if (discontinuity) pending.length = 0;
      for (const input of pending) advance(input);
      const dx = visible.x - actor.body.x, dz = visible.z - actor.body.z, size = Math.hypot(dx, dz);
      const snapped = discontinuity || size >= SNAP;
      const scale = snapped ? 0 : Math.min(1, MAX_OFFSET / Math.max(size, 1e-9));
      offset.x = dx * scale; offset.z = dz * scale;
      corrections++; if (snapped) { snaps++; if (discontinuity) transitionSnaps++; else correctionSnaps++; } largest = Math.max(largest, size);
      sizes.push(size); if (sizes.length > 240) sizes.shift();
      const correction = { sequence, size, snapped, reason: discontinuity ? "authoritative-transition:" + transitions.join(",") : snapped ? "large-correction" : "reconcile" };
      report?.(correction);
      if (before && evidence && (size > .05 || snapped)) {
        // Actor-only diagnostic snapshot on actual divergence, never a per-frame world copy.
        try { evidence(structuredClone({ correction, transitions, before, after: { actor, acc, canonical: source.witches[player], sourceAcc: source.acc,
          sourceHerTime: source.herTime, sourceClockTime: source.clock.time, acknowledged, pending } })); } catch { /* A diagnostic sink cannot interrupt gameplay. */ }
      }
    },
    get actor(): Witch { return { ...actor, body: { ...actor.body, x: actor.body.x + offset.x, z: actor.body.z + offset.z } }; },
    get pending() { return pending.length; },
    get acknowledged() { return acknowledged; },
    get stats() { const ordered = [...sizes].sort((a, b) => a - b); return { corrections, snaps, transitionSnaps, correctionSnaps, pendingCapSnaps, transitionReasons: { ...transitionReasons }, largest, recentP95: ordered[Math.floor(ordered.length * .95)] ?? 0, pending: pending.length, acknowledged }; },
  };
}
