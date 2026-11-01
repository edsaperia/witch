// Experimental straight-line gait, independent of the production live rig.
// Uses the same distance/duty relationship documented in render/rig/rig.ts.
import { v3 } from "../model3d.js";
import { compileGraph } from "./graph.js";

const length = v => Math.hypot(...v);
const vector = v => Array.isArray(v) && v.length === 3 && v.every(Number.isFinite);
const positive = v => Number.isFinite(v) && v > 0;
const check = (ok, text) => { if (!ok) throw new Error(`Body gait: ${text}`); };
const cycle = p => ((p % 1) + 1) % 1;
function parameters(stride, duty, lift) {
  check(positive(stride) && Number.isFinite(duty) && duty > 0 && duty < 1 && Number.isFinite(lift) && lift >= 0, "invalid stride, duty or lift");
}

// Travel is signed distance in model units. Callers own accumulated distance;
// this stateless clock freezes at rest and is independent of frame rate.
export function gaitPhase(travel, { stride = .16, duty = .65 } = {}) {
  parameters(stride, duty, 0);
  check(Number.isFinite(travel), "finite travel required");
  return cycle(travel * duty / stride);
}

// General three-dimensional two-bone solve. The knee lies towards bendHint in
// the plane normal to the root-target axis. Unreachable targets are clamped
// and explicitly reported; they are never described as ground contact.
export function solveLeg(root, target, upper, lower, bendHint = [1, 0, 0]) {
  check(vector(root) && vector(target) && vector(bendHint) && positive(upper) && positive(lower), "finite vectors and positive bone lengths required");
  const delta = v3.sub(target, root), requested = length(delta);
  const axis = requested > 1e-10 ? v3.mul(delta, 1 / requested) : [0, -1, 0];
  const minimum = Math.max(1e-10, Math.abs(upper - lower)), maximum = upper + lower;
  const distance = Math.max(minimum, Math.min(maximum, requested));
  let bend = v3.sub(bendHint, v3.mul(axis, v3.dot(bendHint, axis)));
  if (length(bend) < 1e-8) {
    const fallback = Math.abs(axis[0]) < .8 ? [1, 0, 0] : [0, 0, 1];
    bend = v3.sub(fallback, v3.mul(axis, v3.dot(fallback, axis)));
  }
  bend = v3.norm(bend);
  const along = (upper * upper - lower * lower + distance * distance) / (2 * distance);
  const height = Math.sqrt(Math.max(0, upper * upper - along * along));
  const knee = v3.add(root, v3.add(v3.mul(axis, along), v3.mul(bend, height)));
  const end = v3.add(root, v3.mul(axis, distance));
  return { root: root.slice(), knee, end, reachable: requested >= minimum && requested <= maximum };
}

export function sampleLeg(leg, phase, { stride = .16, duty = .65, lift = .1, offset = 0 } = {}) {
  parameters(stride, duty, lift);
  check(Number.isFinite(phase) && Number.isFinite(offset), "finite phase and offset required");
  const p = cycle(phase + offset), planted = p < duty;
  const swing = planted ? 0 : (p - duty) / (1 - duty);
  // Linear stance cancels constant forward travel exactly. Smoothstep swing
  // and sin^2 lift return to the ground continuously at both boundaries.
  const forward = planted ? .5 - p / duty : -.5 + swing * swing * (3 - 2 * swing);
  const target = v3.add(leg.end, [stride * forward, lift * Math.sin(swing * Math.PI) ** 2, 0]);
  const upper = length(v3.sub(leg.knee, leg.root)), lower = length(v3.sub(leg.end, leg.knee));
  const solved = solveLeg(leg.root, target, upper, lower, v3.sub(leg.knee, v3.lerp(leg.root, leg.end, .5)));
  return { ...solved, target, planted: planted && solved.reachable };
}

// Poses a fresh compiled diagnostic model. The graph and the production rig are
// untouched. Travel affects the clock; the model remains centred for strips.
export function poseGraph(graph, travel, options = {}) {
  const result = compileGraph(graph), phase = gaitPhase(travel, options);
  for (const leg of result.legs) {
    const socket = graph.sockets.find(s => s.id === leg.id);
    const pose = sampleLeg(leg, phase, { ...options, offset: socket.phase ?? 0 });
    const parts = result.model.parts.filter(p => p.part === leg.id), cones = parts.filter(p => p.type === "cone");
    const foot = parts.find(p => p.type === "ell");
    cones[0].a = pose.root; cones[0].b = pose.knee;
    cones[1].a = pose.knee; cones[1].b = pose.end;
    const shift = v3.sub(pose.end, leg.end);
    const anchor = result.model.anchors.feet.find(a => a.c === foot.c);
    foot.c = v3.add(foot.c, shift);
    anchor.c = foot.c;
    Object.assign(leg, pose);
  }
  return { ...result, phase };
}
