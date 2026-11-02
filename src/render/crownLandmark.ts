// The great oak seen over the horizon (Ed, 2026-10-24: "ideally we can see the massive tree over the horizon when you're flying around
// the map"; the mock's landmark/ pictures): once the world's bend would hide the real crown (render/crown.ts), a far impostor stands
// on the bent horizon at its true bearing and its true size for the distance, shrinking as she flies away: its lower crown sunk
// behind the woods' top edge, hazed, drawn only over the sky (just in front of the sky's far plane, behind every wood), and when the
// party's on its string lights twinkling through the haze. Nearer, the real crown takes over where it first clears the horizon.
// Kept honest: no marker, outline or glow beyond its own lights, and only where its bearing is on the screen (the camera always
// looks north, so only with home about due north of her). Ed, 2026-10-24: "keep for now, I will test in gameplay" (its true size
// and the north-only view).
//
// Its picture is the crown itself drawn once, from the south, into a small target (bake) when the island loads; its lights a few
// hundred of the crown's bulbs at their places in that picture.
import * as THREE from "three";
import type { CrownView } from "./crown";
import { HEIGHT_UNIFORMS, overBendAt } from "./height";
import { LIGHT_UNIFORMS } from "./lighting";
import { SPRITE_UNIFORMS } from "./sprites";

const W = 512, H = 256, PITCH = (12 * Math.PI) / 180;

const QUAD_VERT = /* glsl */ `
uniform vec4 uRect; // its box on the screen: centre x, y (NDC), half width, half height
varying vec2 vUv;
void main() { vUv = position.xy * 0.5 + 0.5; gl_Position = vec4(uRect.xy + position.xy * uRect.zw, 0.99998, 1.0); }`;
const QUAD_FRAG = /* glsl */ `
uniform sampler2D uPic;
uniform vec3 uHazeColour;
uniform float uDim, uHaze, uShow;
varying vec2 vUv;
float bayer4(vec2 p) { vec2 q = mod(floor(p), 4.0); float a = mod(q.x, 2.0) * 2.0 + mod(q.y, 2.0), b = floor(q.x / 2.0) * 2.0 + floor(q.y / 2.0); return (a * 4.0 + mod(b * 2.0 + 3.0 * mod(b, 2.0), 4.0) + 0.5) / 16.0; }
void main() {
  vec4 c = texture2D(uPic, vUv);
  if (c.a < 0.5 || bayer4(gl_FragCoord.xy) >= uShow) discard; // (handing over to the real crown: dithered away as it comes into view)
  gl_FragColor = vec4(mix(c.rgb, uHazeColour * uDim, uHaze), 1.0);
}`;
const BULB_VERT = /* glsl */ `
attribute vec2 aUv;
attribute vec3 aColour;
attribute vec2 aBulb; // phase, its delay after the party starts
uniform vec4 uRect;
uniform float uTime, uOnAt;
varying vec3 vColour;
varying vec2 vB;
varying float vOn;
void main() {
  gl_Position = vec4(uRect.xy + (aUv * 2.0 - 1.0) * uRect.zw, 0.99997, 1.0);
  vOn = uTime >= uOnAt + aBulb.y ? 1.0 : 0.0;
  gl_PointSize = vOn;
  vColour = aColour; vB = aBulb;
}`;
const BULB_FRAG = /* glsl */ `
uniform float uTime, uHaze, uShow;
uniform vec4 uPartyOver;
varying vec3 vColour;
varying vec2 vB;
varying float vOn;
void main() {
  if (vOn < 0.5 || uShow <= 0.0 || uPartyOver.z > 0.0) discard; // (the party over: out, as the crown's own go out)
  float b = 0.55 + 0.45 * sin(uTime * (1.3 + vB.x) + vB.x * 40.0);
  gl_FragColor = vec4(vColour * b * 1.6 * (1.0 - uHaze * 0.6), 1.0);
}`;

export class CrownLandmark {
  readonly meshes: THREE.Object3D[];
  private readonly target = new THREE.WebGLRenderTarget(W, H);
  private readonly quad: THREE.Mesh;
  private readonly bulbs: THREE.Points;
  private readonly u: Record<string, THREE.IUniform>;
  private baked = false;
  /** The real crown wholly hidden behind the bend this frame (render/view.ts leaves it undrawn). */
  realHidden = false;
  /** The baked picture's frame in the crown's plan: its middle x, the ground under it (m over the floor) and its size (m). */
  private frame = { x: 0, w: 1, h: 1, y0: 0 };
  private readonly v = new THREE.Vector3();
  private readonly h = new THREE.Vector3();

  constructor(private readonly crown: CrownView, palette: THREE.Color[]) {
    this.u = {
      uRect: { value: new THREE.Vector4() }, uPic: { value: this.target.texture }, uHazeColour: LIGHT_UNIFORMS.uHazeColour, uDim: LIGHT_UNIFORMS.uDim,
      uHaze: { value: 0.5 }, uShow: { value: 0 }, uTime: LIGHT_UNIFORMS.uTime, uOnAt: { value: 1e9 }, uPartyOver: LIGHT_UNIFORMS.uPartyOver,
    };
    this.target.texture.magFilter = THREE.NearestFilter; this.target.texture.minFilter = THREE.NearestFilter;
    const quadGeo = new THREE.BufferGeometry();
    quadGeo.setAttribute("position", new THREE.Float32BufferAttribute([-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0], 3)); quadGeo.setIndex([0, 1, 2, 0, 2, 3]);
    this.quad = new THREE.Mesh(quadGeo, new THREE.ShaderMaterial({ vertexShader: QUAD_VERT, fragmentShader: QUAD_FRAG, uniforms: this.u, depthWrite: true, depthTest: true }));
    // (a few hundred of its bulbs, placed in the picture when it's baked)
    const pick = crown.bulbs.filter((_, i) => i % Math.max(1, Math.floor(crown.bulbs.length / 360)) === 0), cols: number[] = [], data: number[] = [];
    for (const b of pick) { const c = palette[b.colour % palette.length]; cols.push(c.r, c.g, c.b); data.push(b.phase, b.u * 3); }
    const bg = new THREE.BufferGeometry();
    bg.setAttribute("position", new THREE.Float32BufferAttribute(new Array(pick.length * 3).fill(0), 3));
    bg.setAttribute("aUv", new THREE.Float32BufferAttribute(new Array(pick.length * 2).fill(0), 2));
    bg.setAttribute("aColour", new THREE.Float32BufferAttribute(cols, 3)); bg.setAttribute("aBulb", new THREE.Float32BufferAttribute(data, 2));
    this.bulbs = new THREE.Points(bg, new THREE.ShaderMaterial({ vertexShader: BULB_VERT, fragmentShader: BULB_FRAG, uniforms: this.u, depthTest: true, depthWrite: false }));
    this.picked = pick;
    for (const o of [this.quad, this.bulbs]) { o.frustumCulled = false; o.visible = false; o.name = "crown-landmark"; }
    this.quad.renderOrder = 8.9; this.bulbs.renderOrder = 8.95; // (before the sky, 9: it writes the far plane's depth, so the sky leaves it be)
    this.meshes = [this.quad, this.bulbs];
  }
  private readonly picked;

  /** Its picture, once: the crown drawn from the south (pitched a little down, as from far off), no bend, haze or clearing, onto a
   *  clear target; and where each of its picked bulbs falls in it. */
  bake(renderer: THREE.WebGLRenderer): void {
    if (this.baked) return;
    const C = this.crown, d = C.crown.dome, U = C.uniforms, floor = 0;
    // (its frame: everything of it as this camera sees it, pitched, so the far side's lobes stand higher than the near side's and
    // the near side's lower; the trunk and roots from a little below the floor down left out, as the woods in front hide them)
    const cam = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 4000);
    cam.position.set(d.cx, d.base + Math.sin(PITCH) * 1500, d.cz + Math.cos(PITCH) * 1500);
    cam.lookAt(d.cx, d.base, d.cz); cam.updateMatrixWorld();
    const M = cam.matrixWorldInverse, q = new THREE.Vector3();
    let l = Infinity, r = -Infinity, b = Infinity, t = -Infinity;
    const take = (x: number, y: number, z: number, rad: number) => { q.set(x, y, z).applyMatrix4(M); l = Math.min(l, q.x - rad); r = Math.max(r, q.x + rad); b = Math.min(b, q.y - rad); t = Math.max(t, q.y + rad); };
    for (const o of C.crown.lobes) take(o.x, o.y, o.z, o.r * 1.05);
    for (const limb of C.crown.limbs) for (const k of limb.knots) if (k[1] > -C.crown.floor * 0.15) take(k[0], k[1], k[2], k[3]);
    const yf = q.set(d.cx, floor, d.cz).applyMatrix4(M).y, pad = 2;
    cam.left = l - pad; cam.right = r + pad; cam.bottom = b; cam.top = t + pad; cam.updateProjectionMatrix();
    // (its middle across, its size, and its bottom edge in metres over the floor where it stands)
    this.frame = { x: d.cx + (l + r) / 2, w: r - l + 2 * pad, h: t + pad - b, y0: b - yf };
    // (the crown's own map set to its plan's own frame for the bake, then put back)
    const keep = ["uMapO", "uMapX", "uMapY", "uMapZ"].map(k => (U[k].value as THREE.Vector3).clone()), keepS = [U.uBendOn.value, U.uIndoor.value, U.uClearOn.value, U.uLobeK.value];
    const look = U.uLook.value.clone(), lookShape = U.uLookShape.value.clone();
    U.uLook.value.set(0, 1, 1, 0); U.uLookShape.value.w = 0; // The horizon bake never inherits a close-view trial.
    const occ = SPRITE_UNIFORMS.uOcc.value.w, right = SPRITE_UNIFORMS.uRight.value.clone(), up = SPRITE_UNIFORMS.uUp.value.clone();
    (U.uMapO.value as THREE.Vector3).set(0, floor, 0); (U.uMapX.value as THREE.Vector3).set(1, 0, 0); (U.uMapY.value as THREE.Vector3).set(0, 1, 0); (U.uMapZ.value as THREE.Vector3).set(0, 0, 1);
    const hole = (U.uHerHole.value as THREE.Vector4).z; (U.uHerHole.value as THREE.Vector4).z = 0; // (and no hole round her in its picture)
    U.uBendOn.value = 0; U.uIndoor.value = 1; U.uClearOn.value = 0; U.uLobeK.value = 1; SPRITE_UNIFORMS.uOcc.value.w = 0;
    SPRITE_UNIFORMS.uRight.value.set(1, 0, 0); SPRITE_UNIFORMS.uUp.value.set(0, Math.cos(PITCH), Math.sin(PITCH));
    const prev = renderer.getRenderTarget(), auto = renderer.autoClear, cc = renderer.getClearColor(new THREE.Color()), ca = renderer.getClearAlpha();
    const mats = C.meshes.map(m => { const mt = m.material as THREE.ShaderMaterial, s = [mt.depthTest, mt.depthWrite, mt.transparent] as const; mt.depthTest = true; mt.depthWrite = true; mt.transparent = false; return s; });
    try {
      renderer.setRenderTarget(this.target); renderer.setClearColor(0x000000, 0); renderer.autoClear = false; renderer.clear(true, true, true);
      for (const m of C.meshes) renderer.render(m, cam);
    } finally {
      renderer.setRenderTarget(prev); renderer.autoClear = auto; renderer.setClearColor(cc, ca);
      C.meshes.forEach((m, i) => { const mt = m.material as THREE.ShaderMaterial; [mt.depthTest, mt.depthWrite, mt.transparent] = mats[i]; });
      ["uMapO", "uMapX", "uMapY", "uMapZ"].forEach((k, i) => (U[k].value as THREE.Vector3).copy(keep[i]));
      [U.uBendOn.value, U.uIndoor.value, U.uClearOn.value, U.uLobeK.value] = keepS; SPRITE_UNIFORMS.uOcc.value.w = occ; (U.uHerHole.value as THREE.Vector4).z = hole;
      SPRITE_UNIFORMS.uRight.value.copy(right); SPRITE_UNIFORMS.uUp.value.copy(up);
      U.uLook.value.copy(look); U.uLookShape.value.copy(lookShape);
    }
    const uv = this.bulbs.geometry.getAttribute("aUv") as THREE.BufferAttribute;
    this.picked.forEach((b, i) => { const p = this.v.set(b.x, b.y + floor, b.z).project(cam); uv.setXY(i, p.x * 0.5 + 0.5, p.y * 0.5 + 0.5); });
    uv.needsUpdate = true;
    this.baked = true;
  }

  /** A frame: `at` the crown's plan's origin in the world (the hub, on the floor), its plan's east and south in the world (turned);
   *  shown while the bend hides the real crown and its bearing is on the screen. */
  update(camera: THREE.PerspectiveCamera, at: THREE.Vector3, ex: THREE.Vector3, ez: THREE.Vector3, onAt: number, indoors: boolean): void {
    const B = HEIGHT_UNIFORMS.uBend.value, d = this.crown.crown.dome, cx = at.x + ex.x * d.cx + ez.x * d.cz, cz = at.z + ex.z * d.cx + ez.z * d.cz;
    const cam = camera.position, dist = Math.hypot(cx - cam.x, cz - cam.z), topY = at.y + d.top;
    // the real crown's top hidden by the bend: the impostor up; as the real one clears the horizon, it goes
    const hc = LIGHT_UNIFORMS.uHazeCentre.value, far = Math.min(1, Math.max(0, (Math.hypot(cx - hc.x, cz - hc.y) - LIGHT_UNIFORMS.uHazeRange.value.x) / Math.max(1, LIGHT_UNIFORMS.uHazeRange.value.y - LIGHT_UNIFORMS.uHazeRange.value.x)));
    // (never near it: within one and a half of its widths of her (the bend's focus) the real crown is in view, whatever the haze says)
    const R = Math.max(d.rx, d.rz), away = Math.min(1, Math.max(0, (Math.hypot(cx - B.y, cz - B.z) - 1.5 * R) / R));
    const show = !this.baked || indoors || B.x <= 0 ? 0 : (!overBendAt(cx, topY, cz, cam) ? 1 : far * far) * away;
    const hidden = show > 0.02;
    this.u.uShow.value = show;
    // (the real crown wholly behind the bend: every lobe's top and every knot of its limbs under the horizon; then it needn't be
    // drawn. Asked only while the landmark is up)
    this.realHidden = hidden && !indoors && B.x > 0 && this.behindBend(at, ex, ez, cam);
    for (const o of this.meshes) o.visible = hidden;
    if (!hidden) return;
    // the horizon on the screen: where the camera's line of sight grazes the bent ground, ahead of the bend's focus
    const F = HEIGHT_UNIFORMS.uBendFwd.value, D = Math.max(1, -((cam.x - B.y) * F.x + (cam.z - B.z) * F.y)), Hh = cam.y + B.w + 3;
    const dh = -D + Math.sqrt(D * D + Hh / B.x), hz = this.h.set(B.y + F.x * dh, -B.x * dh * dh, B.z + F.y * dh).project(camera);
    // its bearing on the screen: the direction to it, level with the camera
    const dir = this.v.set(cx, cam.y, cz).project(camera), bx = dir.x;
    if (dir.z > 1 || Math.abs(bx) > 1.6) { for (const o of this.meshes) o.visible = false; return; }
    // its true size for the distance: metres to NDC
    const fy = 1 / Math.tan((camera.fov * Math.PI) / 360), k = fy / dist, aspect = camera.aspect;
    const hw = (this.frame.w / 2) * k / aspect, hh = (this.frame.h / 2) * k;
    // standing on the horizon: its ground on the horizon's line, so its frame's bottom (y0 from the floor) that far over it; the
    // woods drawn in front hide what of it is lower than their tops
    const bottom = hz.y + (this.crown.crown.floor + this.frame.y0) * k;
    (this.u.uRect.value as THREE.Vector4).set(bx, bottom + hh, hw, hh);
    this.u.uHaze.value = Math.min(0.6, Math.max(0.35, 0.35 + ((dist - 300) / 1200) * 0.25));
    this.u.uOnAt.value = onAt;
  }

  private behindBend(at: THREE.Vector3, ex: THREE.Vector3, ez: THREE.Vector3, cam: THREE.Vector3): boolean {
    const C = this.crown.crown, over = (x: number, y: number, z: number) => overBendAt(at.x + ex.x * x + ez.x * z, at.y + y, at.z + ex.z * x + ez.z * z, cam);
    for (const l of C.lobes) if (over(l.x, l.y + l.r, l.z)) return false;
    for (const limb of C.limbs) for (const k of limb.knots) if (over(k[0], k[1] + k[3] + 1.5, k[2])) return false; // (and the swags under them)
    return true;
  }

  dispose(): void { this.target.dispose(); for (const o of this.meshes) { (o as THREE.Mesh).geometry.dispose(); ((o as THREE.Mesh).material as THREE.Material).dispose(); } }
}
