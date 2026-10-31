// Optional one-frame diagnostics, installed inside the page. Counts actual GL submissions,
// not merely visible scene objects or onBeforeRender callbacks. Never alters draw arguments.
function installDrawCensus() {
  const v = window.witch.view, renderer = v.renderer, original = renderer.renderBufferDirect;
  if (window.__houseDrawCensus) throw Error("House draw census already installed");
  const rows = [];
  const path = object => {
    const parts = [];
    for (let o = object; o; o = o.parent) parts.unshift(`${o.type}:${o.name || ""}[${o.parent ? o.parent.children.indexOf(o) : 0}]`);
    return parts.join("/");
  };
  const counters = () => { const r = renderer.info.render; return [r.calls, r.triangles, r.lines, r.points]; };
  renderer.renderBufferDirect = function (camera, scene, geometry, material, object, group) {
    const before = counters(), target = renderer.getRenderTarget();
    const result = original.call(this, camera, scene, geometry, material, object, group), after = counters();
    rows.push({ object: path(object), material: material.type, materialName: material.name,
      target: target ? { width: target.width, height: target.height, name: target.texture?.name ?? "" } : null,
      calls: after[0] - before[0], triangles: after[1] - before[1], lines: after[2] - before[2], points: after[3] - before[3],
      indexCount: geometry.index?.count ?? null, positionCount: geometry.attributes.position?.count ?? null,
      instances: object.isInstancedMesh ? object.count : geometry.isInstancedBufferGeometry ? geometry.instanceCount : null,
      range: { start: geometry.drawRange.start, count: Number.isFinite(geometry.drawRange.count) ? geometry.drawRange.count : null },
      group: group ? { start: group.start, count: group.count, materialIndex: group.materialIndex } : null });
    return result;
  };
  window.__houseDrawCensus = () => {
    renderer.renderBufferDirect = original;
    delete window.__houseDrawCensus;
    const submitted = rows.reduce((sum, r) => sum + r.calls, 0), actual = renderer.info.render.calls;
    if (submitted !== actual) throw Error(`House draw census incomplete: ${submitted} of ${actual} calls`);
    return { submitted, actual, budget: { ...v.budget }, sceneryFixed: v.sceneryFixed,
      sceneryRadius: v.stats.sceneryRadius, rows };
  };
}
module.exports = { installDrawCensus };
