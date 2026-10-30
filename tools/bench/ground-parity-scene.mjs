// Minimal material fixture: no game, workers, art, animation, or whole-game readiness.
// A water-only program deliberately never samples lake-look IDs. Remove the
// region's distance field instead of switching it to a compiled-out look.
export function lakeKindAblation(distances, looks, id) {
  if (distances.length !== looks.length) throw Error('lake field size mismatch');
  const changed = distances.slice(); let found = false;
  for (let i = 0; i < changed.length; i++) if (looks[i] === id) { changed[i] = -1000; found = true; }
  if (!found) throw Error(`lake kind ${id} absent from fixture`);
  return changed;
}
export async function compareGround({ baseline, candidate, fixture, beach }) {
  const T = await import('/node_modules/three/build/three.module.js');
  const renderer = window.groundParityRenderer;
  const gl = renderer.getContext(), scene = new T.Scene();
  const camera = new T.OrthographicCamera(-48, 48, 48, -48, 0.1, 400);
  camera.position.set(0, 100, 0); camera.up.set(0, 0, -1); camera.lookAt(0, 0, 0);
  const tex = (data, w = 1, h = 1, format = T.RGBAFormat, type = T.UnsignedByteType) => {
    const t = new T.DataTexture(data, w, h, format, type);
    t.magFilter = t.minFilter = T.NearestFilter; t.needsUpdate = true; return t;
  };
  const blank = tex(new Uint8Array(4)), uniforms = {};
  const stripped = (baseline.VERT + baseline.FRAG).replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
  for (const match of stripped.matchAll(/uniform\s+(float|int|vec[234]|sampler2D)\s+([^;]+);/g)) {
    const [, type, names] = match;
    for (const name of names.split(',')) {
      const m = name.trim().match(/^(\w+)(?:\[(\d+)\])?$/); if (!m) throw Error(`uniform ${name}`);
      const value = () => type === 'sampler2D' ? blank : type.startsWith('vec') ? new T[`Vector${type.at(-1)}`]() : 0;
      uniforms[m[1]] = { value: m[2] ? Array.from({ length: +m[2] }, value) : value() };
    }
  }
  const set = (name, ...v) => { const u = uniforms[name]; if (!u) throw Error(`missing ${name}`); if (u.value?.set) u.value.set(...v); else u.value = v[0]; };
  set('uPixel', 0.5); set('uSat', 1); set('uDim', 1); set('uUnlitDim', 1); set('uGlowDim', 1);
  set('uAmb', 0.4, 0.45, 0.5); set('uMoon', 0.3, 0.35, 0.4); set('uMoonDir', -0.45, 0.75, 0.5);
  set('uShaftScale', 1); set('uGlowR', 8); set('uGlowFalloff', 2.5); set('uGlowNear', 1); set('uGlowPower', 1.4);
  set('uHazeRange', 100, 300); set('uHazeColour', 0.08, 0.1, 0.16); set('uLightKnee', 0.9, 1.1);
  set('uScenery', 1e6, 1); set('uPartyOver', 0, 0, 0, 30); set('uTime', 17.25); set('uRealTime', 17.25);
  set('uFloor', 1e6, 1e6, 0); set('uClearing', 0.4, 0.5); set('uTile', 64, 48); set('uFloorsSize', 64, 48);
  set('uExtent', -64, -64, 128, 128); set('uExtentFar', -64, -64, 128, 128);
  set('uAreaWin', -64, -64, 64, 64); set('uAreaWinFar', -64, -64, 64, 64);
  set('uAreas', tex(new Uint8Array([1, 190, 0, 255]))); set('uAreasFar', uniforms.uAreas.value);
  for (const v of uniforms.uTypeFloor.value) v.set(0.22, 0.35, 0.19);
  const n = 128, distances = new Float32Array(n * n), looks = new Uint8Array(n * n), land = new Float32Array(n * n * 4);
  for (let z = 0; z < n; z++) for (let x = 0; x < n; x++) {
    const i = z * n + x, px = x - 64, pz = z - 64;
    // Two separate ponds exercise both halves of a combination, the water, rim and surrounding floor.
    const left = 20 - Math.hypot(px + 24, pz), right = 20 - Math.hypot(px - 24, pz);
    distances[i] = Math.max(left, right);
    looks[i] = fixture.ids[left > right ? 0 : fixture.ids.length - 1] ?? 0;
    // Coast across the bottom: beach-enabled frames contain sea, sand, forest AND both lakes.
    land[i * 4] = 38 - pz; land[i * 4 + 1] = 8; land[i * 4 + 3] = 38 - pz;
  }
  set('uLake', fixture.ids.length ? 1 : 0, 0, 0, 0); set('uLakeBox', -64, -64, 1 / 128, 1 / 128);
  set('uLakes', tex(distances, n, n, T.RedFormat, T.FloatType)); set('uLakeLooks', tex(looks, n, n, T.RedFormat));
  set('uBeach', beach ? 1 : 0, 0, 0, 0); set('uLandBox', -64, -64, 1 / 128, 1 / 128);
  set('uLand', tex(land, n, n, T.RGBAFormat, T.FloatType));
  uniforms.uCoastAppear = { value: 1 }; // production beach wrapper is a no-op at full readiness
  const extraSwitches = {};
  if (fixture.extras) {
    const enabled = new Set(fixture.extras);
    const image = (w, h, pixel) => { const data = new Uint8Array(w * h * 4); for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) data.set(pixel(x, y), (y * w + x) * 4); return tex(data, w, h); };
    set('uFloor', -24, 22, 12); set('uDiscoGeom', 1, 1, 32, 16);
    set('uDiscoRim', enabled.has('DANCEFLOOR') ? 12 : 0);
    set('uDiscoBase', image(32, 32, (x, y) => [90 + (x % 4) * 20, 80 + (y % 3) * 30, 100, 255]));
    set('uDiscoLit', image(42, 14, () => [120, 150, 230, 255]));
    set('uDiscoTiles', image(32, 32, () => [180, 220, 160, 85]));
    set('uPave', 12, enabled.has('PAVEMENT') ? 25 : 0, 2, 3); set('uPave2', 1, 0.2, 0.3, 18);
    set('uPaveStone', 0.5, 0.48, 0.43); set('uPaveDark', 0.22, 0.24, 0.25); set('uPaveMoss', 0.13, 0.28, 0.12); set('uPaveGrout', 0.09, 0.08, 0.07);
    // Packed area byte 1 decodes to look 0. Match every selected street to
    // that look so all mask combinations exercise streets alongside extras.
    set('uZooStreet', enabled.has('ZOO_STREET') ? 1 : 0, 0, 5, 0);
    set('uZooPlaza', -25, -24, 15, enabled.has('ZOO_PLAZA') ? 1 : 0);
    set('uPlazaSigil', image(64, 64, (x, y) => { const p = x % 11 < 2 || y % 13 < 2 ? 255 : 0; return [p, p, p, 255]; }));
    set('uLegendRingCount', enabled.has('LEGENDS') ? 1 : 0); uniforms.uLegendRings.value[0].set(25, -24, 17, 5);
    uniforms.uLegendGlow.value[0] = 0.7; set('uLegendFloor', enabled.has('LEGEND_FLOOR') ? 1 : 0, 0.45, 2, 0);
    uniforms.uLegendStone.value[0].set(0.5, 0.48, 0.42, 1); uniforms.uLegendDebris.value[0].set(0.3, 0.2, 0.1, 2); uniforms.uLegendGrowth.value[0].set(0.3, 0.4, 0, 0);
    set('uLegendCarve', image(64, 64, (x, y) => [x % 7 < 2 || y % 9 < 2 ? 255 : 0, 0, 0, 255]));
    uniforms.uKoi.value[0].set(-24, 0, enabled.has('KOI') ? 12 : 0, 17.4); set('uKoiSize', 4);
    set('uBare', enabled.has('BARE') ? 2 : 0);
    Object.assign(extraSwitches, { ZOO_STREET: ['uZooStreet', 'x'], ZOO_PLAZA: ['uZooPlaza', 'w'], DANCEFLOOR: ['uDiscoRim'], PAVEMENT: ['uPave', 'y'], LEGENDS: ['uLegendRingCount'], LEGEND_FLOOR: ['uLegendFloor', 'x'], BARE: ['uBare'] });
  }
  let size = 128;
  if (fixture.field) {
    const f = fixture.field, [x, z, w, d] = f.box;
    size = Math.max(w, d); const cx = x + w / 2, cz = z + d / 2;
    camera.left = camera.bottom = -size / 2; camera.right = camera.top = size / 2;
    camera.far = size * 4; camera.position.set(cx, size * 2, cz); camera.lookAt(cx, 0, cz); camera.updateProjectionMatrix();
    uniforms.uLakes.value.dispose(); uniforms.uLakeLooks.value.dispose();
    set('uLakes', tex(new Float32Array(f.dist), f.n, f.n, T.RedFormat, T.FloatType));
    set('uLakeLooks', tex(new Uint8Array(f.looks), f.n, f.n, T.RedFormat));
    set('uLakeBox', x, z, 1 / w, 1 / d);
    set('uLandBox', x, z, 1 / w, 1 / d);
    set('uExtent', x, z, w, d); set('uAreaWin', x, z, x + w, z + d);
    set('uPixel', Math.max(0.5, size / 384));
  }
  const defines = { ...(fixture.ids.length ? { GROUND_LAKES: '' } : {}), ...(beach ? { GROUND_BEACH: '' } : {}) };
  const control = new T.ShaderMaterial({ vertexShader: baseline.VERT, fragmentShader: baseline.FRAG, defines: { ...defines, ...fixture.defines }, uniforms });
  const mine = new T.ShaderMaterial({ vertexShader: candidate.VERT, fragmentShader: beach && candidate.BEACH_FRAG ? candidate.BEACH_FRAG : candidate.FRAG, defines: { ...defines, ...fixture.defines }, uniforms });
  const geometry = new T.PlaneGeometry(size * 1.1, size * 1.1); geometry.rotateX(-Math.PI / 2);
  const mesh = new T.Mesh(geometry, control); scene.add(mesh);
  if (fixture.field) { const [x, z, w, d] = fixture.field.box; mesh.position.set(x + w / 2, 0, z + d / 2); }
  const target = new T.WebGLRenderTarget(192, 192);
  const read = material => { mesh.material = material; renderer.setRenderTarget(target); renderer.clear(); renderer.render(scene, camera); const p = new Uint8Array(192 * 192 * 4); renderer.readRenderTargetPixels(target, 0, 0, 192, 192, p); return p; };
  const diff = (a, b) => { let pixels = 0, max = 0; for (let i = 0; i < a.length; i += 4) { let d = 0; for (let k = 0; k < 4; k++) d = Math.max(d, Math.abs(a[i + k] - b[i + k])); if (d) pixels++; max = Math.max(max, d); } return { pixels, max }; };
  try {
    for (const material of [control, mine]) {
      mesh.material = material; await renderer.compileAsync(scene, camera); gl.flush();
      // Without KHR the first draw forces compilation; readiness alone is not evidence.
      read(material);
      for (const p of renderer.info.programs) if (!gl.getProgramParameter(p.program, gl.LINK_STATUS)) throw Error('shader link failed');
    }
    const before = read(control), after = read(mine), repeat = read(mine), baseRepeat = read(control);
    const colors = new Set(); for (let i = 0; i < before.length; i += 4) colors.add(`${before[i]},${before[i + 1]},${before[i + 2]}`);
    if (colors.size < 3) throw Error('blank/flat fixture');
    // Require visible feature coverage; ablation controls are never parity rows.
    let sensitivity = null, extraSensitivity = null;
    if (fixture.sensitiveExtra) {
      const key = fixture.sensitiveExtra, [name, component] = key === 'KOI' ? ['uKoi', 'z'] : extraSwitches[key];
      const u = key === 'KOI' ? uniforms.uKoi.value[0] : uniforms[name];
      const target = key === 'KOI' ? u : u.value, saved = component ? target[component] : u.value;
      if (component) target[component] = 0; else u.value = 0;
      extraSensitivity = { feature: key, ...diff(before, read(control)) };
      if (component) target[component] = saved; else u.value = saved;
      if (!extraSensitivity.pixels) throw Error(`ground extra ${key} not exercised`);
    }
    if (fixture.ids.length) {
      const texture = uniforms.uLakes.value, original = texture.image.data;
      const looks = uniforms.uLakeLooks.value.image.data; sensitivity = [];
      for (const id of fixture.ids) {
        texture.image.data = lakeKindAblation(original, looks, id); texture.needsUpdate = true;
        let changed;
        try { changed = diff(before, read(control)); }
        finally { texture.image.data = original; texture.needsUpdate = true; }
        sensitivity.push({ id, method: 'distance-field-ablation', ...changed });
        if (!changed.pixels) throw Error(`lake kind ${id} not exercised`);
      }
    }
    const debug = gl.getExtension('WEBGL_debug_renderer_info');
    return { fixture: fixture.name, ids: fixture.ids, mode: beach ? 'beach' : 'plain', defines: mine.defines,
      gpu: debug ? gl.getParameter(debug.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER),
      parallel: renderer.extensions.has('KHR_parallel_shader_compile'), sampledColors: colors.size, sensitivity, extraSensitivity,
      parity: diff(before, after), currentDrift: diff(after, repeat), baselineDrift: diff(before, baseRepeat) };
  } finally {
    renderer.setRenderTarget(null); target.dispose(); control.dispose(); mine.dispose(); geometry.dispose();
    for (const texture of new Set(Object.values(uniforms).map(u => u.value).filter(v => v?.isTexture))) texture.dispose();
  }
}
