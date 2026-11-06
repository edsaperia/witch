// Experimental model-space graph. Explicit acceptance selection requires visual review.
// x forward, y up, z across, matching model3d. Socket offsets use model axes;
// Parent sockets attach at neck tips; rotating spine frames remain future work.
import { M } from "../core.js";
import { Model, v3 } from "../model3d.js";

export const LEG_FAMILIES = Object.freeze({
  plantigrade: { knee: .48, bend: .12, foot: [.16, .07, .11] },
  digitigrade: { knee: .55, bend: -.16, foot: [.12, .06, .08] },
  hoof: { knee: .5, bend: .08, foot: [.08, .09, .07] },
});
const KINDS = new Set(["head", "leg", "wing", "tail", "shell", "neck", "membrane"]);
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
    assert(vec(s.offset) && (s.parent ? sockets.has(s.parent) : ids.has(s.station)), `${s.id}: known station or preceding parent and finite offset required`);
    assert(KINDS.has(s.kind), `${s.id}: unknown socket kind`);
    sockets.add(s.id);
    if (s.kind === "leg") {
      assert(Object.hasOwn(LEG_FAMILIES, s.family), `${s.id}: unknown leg family`);
      assert(vec(s.foot) && positive(s.radius), `${s.id}: foot and positive radius required`);
      assert(s.phase == null || Number.isFinite(s.phase), `${s.id}: finite gait offset required`);
      assert(s.heel == null || (vec(s.heel) && s.heel[1] > 0), `${s.id}: raised heel offset required`);
      assert(s.kneeBend == null || Number.isFinite(s.kneeBend), `${s.id}: finite knee bend required`);
      assert(s.cloven == null || (s.cloven===true&&s.family==="hoof"), `${s.id}: cloven feet require hoof family`);
      if(s.profile)assert(Array.isArray(s.profile)&&s.profile.length===(s.heel?4:3)&&s.profile.every(positive),`${s.id}: positive radius profile required`);
      if(s.footR)assert(radii(s.footR),`${s.id}: positive foot radii required`);
    } else if (s.kind === "tail" || s.kind === "neck") {
      assert(Array.isArray(s.points) && s.points.length >= 2, `${s.id}: tail needs at least two points`);
      for (const p of s.points) assert(Array.isArray(p) && p.length === 4 && p.every(Number.isFinite) && positive(p[3]), `${s.id}: tail points are [x,y,z,radius]`);
    } else if (s.kind === "membrane") {
      assert(Array.isArray(s.vertices) && s.vertices.length === 3 && s.vertices.every(vec), `${s.id}: three finite membrane vertices required`);
      const [a,b,c] = s.vertices;
      assert(Math.hypot(...v3.cross(v3.sub(b,a),v3.sub(c,a))) > 1e-8, `${s.id}: degenerate membrane`);
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
  /** @type {Record<string, number[]>} */
  const sockets = {};
  const legs = [];
  for (const s of graph.spine) model.ell(s.at.slice(), s.r.slice(), s.mat ?? M.BODY, { part: "body",rough:s.rough });
  for (const [index, s] of graph.sockets.entries()) {
    const root = v3.add(s.parent ? sockets[s.parent] : stations.get(s.station).at, s.offset);
    sockets[s.id] = root;
    const options = { part: s.part ?? s.id, group: s.kind === "shell" || s.kind === "wing" || s.kind === "membrane" ? index + 2 : 1 };
    if (s.kind === "leg") {
      const f = LEG_FAMILIES[s.family], end = s.foot.slice();
      assert(distance(root, end) > s.radius * 2, `${s.id}: leg too short`);
      const heel = s.heel ? v3.add(end,s.heel) : null;
      const knee = v3.add(v3.lerp(root, heel??end, f.knee), [s.kneeBend??f.bend, 0, 0]);
      const profile=(s.profile??(heel?[1,.72,.52,.45]:[1,.72,.45])).map(k=>s.radius*k);
      model.chain([[...root,profile[0]], [...knee,profile[1]], ...(heel?[[...heel,profile[2]]]:[]), [...end,profile.at(-1)]], M.BODY, options);
      const footR = s.footR?.slice()??f.foot.slice(), foot = [end[0] + footR[0] * .35, footR[1], end[2]];
      // Diagnostic fixtures stand on y=0; do not silently snap arbitrary feet.
      assert(Math.abs(end[1] - footR[1]) < 1e-8, `${s.id}: foot centre must match family ground height`);
      if(s.cloven)for(const side of [-1,1])model.ell(v3.add(foot,[0,0,side*footR[2]*.53]),[footR[0],footR[1],footR[2]*.44],s.footMat??M.ACCENT,options);
      else model.ell(foot, footR, s.family === "hoof" ? M.ACCENT : M.BODY, options);
      model.anchors.feet.push({ c: foot, r: footR[0], group: options.group, fit: s.family === "hoof" ? "hoof" : "paw" });
      legs.push({ id: s.id, family: s.family, root, knee, end, ...(heel?{heel}:{}), radii: profile });
    } else if (s.kind === "tail" || s.kind === "neck") {
      const pts = s.points.map(p => [...v3.add(root, p.slice(0, 3)), p[3]]);
      assert(distance(pts[0].slice(0, 3), root) < 1e-8, `${s.id}: tail must begin at socket`);
      for (let i = 1; i < pts.length; i++) assert(distance(pts[i - 1].slice(0, 3), pts[i].slice(0, 3)) > Math.abs(pts[i - 1][3] - pts[i][3]), `${s.id}: degenerate tapered segment`);
      model.chain(pts, s.mat ?? M.BODY, options);
      if (s.kind === "neck") sockets[s.id] = pts.at(-1).slice(0,3);
    } else if (s.kind === "membrane") {
      const [a,b,c] = s.vertices.map(p=>v3.add(root,p)), u=v3.norm(v3.sub(b,a));
      const normal=v3.norm(v3.cross(v3.sub(b,a),v3.sub(c,a))), v=v3.norm(v3.cross(normal,u));
      const length=distance(a,b), cx=v3.dot(v3.sub(c,a),u), cy=v3.dot(v3.sub(c,a),v);
      const lo=Math.min(0,cx),hi=Math.max(length,cx),height=Math.abs(cy),centre=v3.add(a,v3.add(v3.mul(u,(lo+hi)/2),v3.mul(v,cy/2)));
      model.flat(centre,u,v,(hi-lo)/2,height/2,(s0,t0)=>{
        const x=lo+(s0+1)*(hi-lo)/2,y=(t0+1)*cy/2, f=y/cy;
        return f>=0&&f<=1&&x>=cx*f&&x<=length*(1-f)+cx*f ? s.mat??M.BODY3 : null;
      },{...options,bend:0});
    } else {
      model.ell(root, s.r.slice(), s.mat ?? (s.kind === "shell" ? M.ACCENT : M.BODY), options);
    }
  }
  return { model, sockets, legs };
}
