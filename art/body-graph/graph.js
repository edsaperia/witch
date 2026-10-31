// Experimental model-space graph. No production imports: migration requires visual review.
// x forward, y up, z across, matching model3d. Socket offsets use model axes;
// rotating spine frames and attaching sockets to other sockets are future work.
import { M } from "../core.js";
import { Model, v3 } from "../model3d.js";

export const LEG_FAMILIES = Object.freeze({
  plantigrade: { knee: .48, bend: .12, foot: [.16, .07, .11] },
  digitigrade: { knee: .55, bend: -.16, foot: [.12, .06, .08] },
  hoof: { knee: .5, bend: .08, foot: [.08, .09, .07] },
});
const KINDS = new Set(["head", "leg", "wing", "tail", "shell"]);
const vec = p => Array.isArray(p) && p.length === 3 && p.every(Number.isFinite);
const positive = n => Number.isFinite(n) && n > 0;
const radii = r => vec(r) && r.every(positive);
const distance = (a, b) => Math.hypot(...v3.sub(a, b));
const assert = (ok, message) => { if (!ok) throw new Error(`Body graph: ${message}`); };

// Reject malformed inputs before creating a partial model. Station order is the
// spine chain order, not an x sort: a curved chain may turn back on itself.
export function validateGraph(graph) {
  assert(graph && Array.isArray(graph.spine) && graph.spine.length >= 2, "at least two spine stations required");
  assert(positive(graph.blend ?? .07), "blend must be positive");
  const ids = new Set();
  for (const s of graph.spine) {
    assert(typeof s.id === "string" && s.id.length > 0 && !ids.has(s.id), "unique station ids required");
    assert(vec(s.at) && radii(s.r), `${s.id}: finite position and positive radii required`);
    ids.add(s.id);
  }
  for (let i = 1; i < graph.spine.length; i++) {
    const a = graph.spine[i - 1], b = graph.spine[i];
    assert(distance(a.at, b.at) > 1e-6, `${b.id}: coincident spine stations`);
    // A conservative inscribed-sphere overlap guarantees continuous skin even
    // when station widths/depths differ. Wider spacing needs extra stations.
    assert(distance(a.at, b.at) < Math.min(...a.r) + Math.min(...b.r), `${b.id}: disconnected spine; insert a station`);
  }
  const sockets = new Set();
  assert(Array.isArray(graph.sockets), "sockets array required");
  for (const s of graph.sockets) {
    assert(typeof s.id === "string" && s.id.length > 0 && !sockets.has(s.id), "unique socket ids required");
    assert(ids.has(s.station) && vec(s.offset), `${s.id}: known station and finite offset required`);
    assert(KINDS.has(s.kind), `${s.id}: unknown socket kind`);
    sockets.add(s.id);
    if (s.kind === "leg") {
      assert(Object.hasOwn(LEG_FAMILIES, s.family), `${s.id}: unknown leg family`);
      assert(vec(s.foot) && positive(s.radius), `${s.id}: foot and positive radius required`);
      assert(s.phase == null || Number.isFinite(s.phase), `${s.id}: finite gait offset required`);
    } else if (s.kind === "tail") {
      assert(Array.isArray(s.points) && s.points.length >= 2, `${s.id}: tail needs at least two points`);
      for (const p of s.points) assert(Array.isArray(p) && p.length === 4 && p.every(Number.isFinite) && positive(p[3]), `${s.id}: tail points are [x,y,z,radius]`);
    } else assert(radii(s.r), `${s.id}: positive part radii required`);
  }
  return graph;
}

// The graph compiles into the same primitives as the current builders. Skin
// shares group 1; shells and wings deliberately retain their separate creases.
// Limb landmarks are returned separately so a later gait/IK stage can pose them.
export function compileGraph(graph, { blend = graph.blend ?? .07 } = {}) {
  validateGraph({ ...graph, blend });
  const model = new Model({ blend }), stations = new Map(graph.spine.map(s => [s.id, s]));
  const sockets = {}, legs = [];
  for (const s of graph.spine) model.ell(s.at.slice(), s.r.slice(), M.BODY, { part: "body" });
  for (const [index, s] of graph.sockets.entries()) {
    const root = v3.add(stations.get(s.station).at, s.offset);
    sockets[s.id] = root;
    const options = { part: s.id, group: s.kind === "shell" || s.kind === "wing" ? index + 2 : 1 };
    if (s.kind === "leg") {
      const f = LEG_FAMILIES[s.family], end = s.foot.slice();
      assert(distance(root, end) > s.radius * 2, `${s.id}: leg too short`);
      const knee = v3.add(v3.lerp(root, end, f.knee), [f.bend, 0, 0]);
      model.chain([[...root, s.radius], [...knee, s.radius * .72], [...end, s.radius * .45]], M.BODY, options);
      const footR = f.foot.slice(), foot = [end[0] + footR[0] * .35, footR[1], end[2]];
      // Diagnostic fixtures stand on y=0; do not silently snap arbitrary feet.
      assert(Math.abs(end[1] - footR[1]) < 1e-8, `${s.id}: foot centre must match family ground height`);
      model.ell(foot, footR, s.family === "hoof" ? M.ACCENT : M.BODY, options);
      model.anchors.feet.push({ c: foot, r: footR[0], group: options.group, fit: s.family === "hoof" ? "hoof" : "paw" });
      legs.push({ id: s.id, family: s.family, root, knee, end, radii: [s.radius, s.radius * .72, s.radius * .45] });
    } else if (s.kind === "tail") {
      const pts = s.points.map(p => [...v3.add(root, p.slice(0, 3)), p[3]]);
      assert(distance(pts[0].slice(0, 3), root) < 1e-8, `${s.id}: tail must begin at socket`);
      for (let i = 1; i < pts.length; i++) assert(distance(pts[i - 1].slice(0, 3), pts[i].slice(0, 3)) > Math.abs(pts[i - 1][3] - pts[i][3]), `${s.id}: degenerate tapered segment`);
      model.chain(pts, M.BODY, options);
    } else {
      model.ell(root, s.r.slice(), s.kind === "shell" ? M.ACCENT : M.BODY, options);
    }
  }
  return { model, sockets, legs };
}
