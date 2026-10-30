// Measurement only, sampled after the settled screenshot. No game stepping,
// material changes or expectation changes. Bounds follow the sprite vertex
// shader's standing/lying billboard, foot-ground sampling, lean and world bend.
module.exports.sceneState = page => page.evaluate(() => {
  const g = window.witch.game, v = window.witch.view;
  const project = (p, world = true) => {
    const q = v.screenOf(p[0], p[1], p[2], world);
    return [(q[0] + 1) * v.width / 2, (1 - q[1]) * v.height / 2];
  };
  const overlaps = b => b[0] <= 31 && b[1] <= 23 && b[2] >= 0 && b[3] >= 0;
  const entities = g.creatures.map(c => ({ id: c.id, species: c.species, level: c.level,
    world: [c.x, c.y ?? 0, c.z], screen: project([c.x, c.y ?? 0, c.z], false), sprites: [] }));
  const sprites = [], lights = [], seenLightUniforms = new Set();
  const plain = x => x?.toArray ? x.toArray() : Array.isArray(x) ? x.map(plain) :
    ArrayBuffer.isView(x) ? Array.from(x) : x;
  v.scene.traverse(o => {
    if (o.isLight) lights.push({ name: o.name, type: o.type, world: o.position.toArray(), intensity: o.intensity, colour: o.color?.toArray() });
    const a = o.geometry?.attributes, u = o.material?.uniforms;
    if (u) for (const key of Object.keys(u).filter(k => /fire|light/i.test(k))) {
      const value = u[key].value;
      if (!value || typeof value === 'object' && !Array.isArray(value) && !value.toArray && !ArrayBuffer.isView(value)) continue;
      const serial = plain(value), identity = key + JSON.stringify(serial);
      if (!seenLightUniforms.has(identity)) { lights.push({ uniform: key, value: serial }); seenLightUniforms.add(identity); }
    }
    if (!o.visible || !a?.iPos || !a.iSize || !u?.uRight || !u?.uUp) return;
    const count = Math.min(o.geometry.instanceCount, a.iPos.count);
    for (let i = 0; i < count; i++) {
      const p = Array.from(a.iPos.array.slice(i * a.iPos.itemSize, i * a.iPos.itemSize + 3));
      const size = Array.from(a.iSize.array.slice(i * a.iSize.itemSize, i * a.iSize.itemSize + 3));
      const r = u.uRight.value, up = u.uUp.value, lean = u.uLean?.value ?? { x: 0, y: 0 }, lie = u.uLie?.value ?? 0;
      const foot = Math.max(Math.min(size[0] * .45, 5), size[2] || 0);
      const ground = Math.min(...[-1, -.5, 0, .5, 1].map(k => v.heights.heightAt(p[0] + r.x * foot * k, p[2] + r.z * foot * k)));
      const y0 = p[1] + (u.uAbsolute?.value > .5 ? 0 : ground);
      const lift = lie ? { x: r.z * lie, y: 0, z: -r.x * lie } : up, corners = [];
      for (const x of [-.5, .5]) for (const y of [0, 1]) {
        const across = x * size[0] + lean.x * y * size[1], rise = y * size[1], skew = lean.y * x * size[0];
        corners.push(project([p[0] + r.x * across + lift.x * rise + up.x * skew,
          y0 + r.y * across + lift.y * rise + up.y * skew, p[2] + r.z * across + lift.z * rise + up.z * skew]));
      }
      const bounds = [Math.min(...corners.map(p => p[0])), Math.min(...corners.map(p => p[1])), Math.max(...corners.map(p => p[0])), Math.max(...corners.map(p => p[1]))];
      const sprite = { name: o.name, instance: i, world: p, size, bounds, overlaps: overlaps(bounds) };
      const matches = entities.filter(entity => Math.hypot(entity.world[0] - p[0], entity.world[2] - p[2]) < .1);
      if (sprite.overlaps || matches.length) sprites.push(sprite);
      for (const entity of matches) entity.sprites.push(sprite);
    }
  });
  const effects = {};
  for (const key of Object.keys(g).filter(k => /effect|light|shot|particle|attack/i.test(k))) {
    try { effects[key] = JSON.parse(JSON.stringify(g[key])); } catch { effects[key] = 'unserializable'; }
  }
  return { region: [0, 0, 31, 23], entities, sprites, lights, effects };
});
