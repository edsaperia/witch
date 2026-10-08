// The VRM pixel test (Ed, 2026-10-08, via the coordinator: "what an off-the-shelf VTuber model looks like, pixelated and in
// motion"): a standalone page, vrm-test.html, not part of the game. A VRM avatar (the VRM Consortium's sample Seed-san, vendored
// with its licence in MODEL-LICENSE.md, or any .vrm dropped on the page) rendered by three-vrm into a small low-res target and
// scaled up nearest-neighbour: head and shoulders in a box the size of the game's bottom-left portrait, and the same render large.
// She idles (breathing, sway, blinks, eyes on the mouse), talks (the aa/ih/ou/ee/oh visemes from a line as it types on), shows
// expressions, turns her head, nods and flinches, her hair on spring bones; all on an auto-cycle, or by the buttons.

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { VRMLoaderPlugin, VRMUtils, type VRM } from "@pixiv/three-vrm";
import seedUrl from "./Seed-san.vrm?url";
import tiny5 from "../ui/fonts/Tiny5.woff2?url";

// ---- the page ----
const font = document.createElement("style");
font.textContent = `@font-face { font-family: "Tiny5"; src: url(${tiny5}) format("woff2"); }`;
document.head.appendChild(font);
const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const large = $<HTMLCanvasElement>("large"), small = $<HTMLCanvasElement>("small"), sayBox = $<HTMLDivElement>("say"), panel = $<HTMLDivElement>("panel");
const lctx = large.getContext("2d")!, sctx = small.getContext("2d", { willReadFrequently: true })!;
lctx.imageSmoothingEnabled = false; sctx.imageSmoothingEnabled = false;

/** The portrait box in the game (128 x 144 art pixels at its scale 2, in screen pixels). */
const BOX = { w: 256, h: 288 };
const opts = { px: 3, quantize: false, levels: 6, springs: true, auto: true, big: 2 };

// ---- three ----
const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, preserveDrawingBuffer: true });
renderer.setPixelRatio(1);
renderer.outputColorSpace = THREE.SRGBColorSpace;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(26, BOX.w / BOX.h, 0.1, 20);
const key = new THREE.DirectionalLight(0xffffff, 2.4); key.position.set(-1, 1.6, 2.2); scene.add(key); // (the light from the upper left, as the game's art)
scene.add(new THREE.AmbientLight(0xb8b0ff, 0.9));
const lookTarget = new THREE.Object3D(); camera.add(lookTarget); scene.add(camera);
let lowW = 0, lowH = 0;
function resize(): void {
  lowW = Math.max(16, Math.round(BOX.w / opts.px)); lowH = Math.max(16, Math.round(BOX.h / opts.px));
  renderer.setSize(lowW, lowH, false);
  for (const [c, k] of [[small, 1], [large, opts.big]] as const) { c.width = lowW; c.height = lowH; c.style.width = `${lowW * opts.px * k}px`; c.style.height = `${lowH * opts.px * k}px`; }
  lctx.imageSmoothingEnabled = false; sctx.imageSmoothingEnabled = false;
  stat.res = `${lowW} x ${lowH}`;
}

// ---- the model ----
let vrm: VRM | null = null;
const stat = { name: "", size: 0, load: 0, fps: 0, res: "", tris: 0, version: "" };
const loader = new GLTFLoader(); loader.register(p => new VRMLoaderPlugin(p));
async function load(buf: ArrayBuffer, label: string): Promise<void> {
  const t0 = performance.now();
  const gltf = await loader.parseAsync(buf, "");
  const v = gltf.userData.vrm as VRM;
  if (!v) throw new Error("not a VRM");
  VRMUtils.removeUnnecessaryVertices(gltf.scene); VRMUtils.combineSkeletons(gltf.scene); VRMUtils.rotateVRM0(v);
  if (vrm) { scene.remove(vrm.scene); VRMUtils.deepDispose(vrm.scene); }
  vrm = v; scene.add(v.scene);
  v.scene.traverse(o => { o.frustumCulled = false; });
  if (v.lookAt) v.lookAt.target = lookTarget;
  const meta = v.meta as unknown as Record<string, unknown>;
  stat.name = String(meta.name ?? meta.title ?? label); stat.version = String(meta.metaVersion ?? "");
  stat.size = buf.byteLength; stat.load = performance.now() - t0;
  restPose(); frame();
}
/** Head and shoulders in the box: the camera on the head, a little below it. */
function frame(): void {
  if (!vrm) return;
  vrm.scene.updateMatrixWorld(true);
  const head = vrm.humanoid.getNormalizedBoneNode("head")!, p = head.getWorldPosition(new THREE.Vector3());
  camera.position.set(0, p.y + 0.05, 1.15); camera.lookAt(0, p.y - 0.02, 0); // (the head bone is at the skull's base: the view from the hat's room above her hair to her chest)
}
/** Arms down from the T-pose. */
function restPose(): void {
  if (!vrm) return;
  const h = vrm.humanoid;
  h.getNormalizedBoneNode("leftUpperArm")!.rotation.z = -1.2; h.getNormalizedBoneNode("rightUpperArm")!.rotation.z = 1.2;
  h.getNormalizedBoneNode("leftLowerArm")!.rotation.z = -0.15; h.getNormalizedBoneNode("rightLowerArm")!.rotation.z = 0.15;
}

// ---- motion ----
/** A bone the model lacks (an optional one: upperChest, neck) moves nothing. */
const DUMMY = new THREE.Object3D();
const EXPRESSIONS = ["happy", "angry", "sad", "relaxed", "surprised"] as const;
const VISEMES = ["aa", "ih", "ou", "ee", "oh"] as const;
const LINES = ["Big party tonight! What should I wear?", "Maybe a legend would enjoy this?", "Aww, a baby owl!", "Eww, snail trail!"];
let mood: string | null = null, moodAt = 0, prevMood: string | null = null;
let action: { name: string; at: number; dur: number } | null = null;
let talk: { text: string; at: number } | null = null;
let nextBlink = 2, blinkAt = -1;
let mouseX = 0, mouseY = 0;
const CPS = 16;
const setMood = (m: string | null, t: number) => { prevMood = mood; mood = m; moodAt = t; };
const play = (name: string, t: number) => { action = { name, at: t, dur: name === "turn" ? 2.2 : name === "nod" ? 1.4 : 0.7 }; if (name === "hit") setMood("surprised", t); };
const say = (text: string, t: number) => { talk = { text, at: t }; };
/** A letter's viseme (its mouth shape), or null between words. */
function viseme(ch: string): (typeof VISEMES)[number] | null {
  const c = ch.toLowerCase();
  if ("ah".includes(c)) return "aa";
  if ("iy".includes(c)) return "ih";
  if ("uwq".includes(c)) return "ou";
  if (c === "e") return "ee";
  if (c === "o") return "oh";
  if (/[a-z]/.test(c)) return null;
  return null;
}
const smooth = (k: number) => k * k * (3 - 2 * k);

// the auto cycle: a step every few seconds
const CYCLE: [number, (t: number) => void][] = [
  [0, t => { setMood("happy", t); say(LINES[0], t); }],
  [4, t => play("nod", t)],
  [6, t => { setMood("relaxed", t); say(LINES[1], t); }],
  [10, t => play("turn", t)],
  [13, t => { setMood("happy", t); say(LINES[2], t); }],
  [16.5, t => { setMood("angry", t); say(LINES[3], t); }],
  [20, t => play("hit", t)],
  [21.5, t => setMood("sad", t)],
  [24, t => setMood("surprised", t)],
  [26, t => setMood(null, t)],
];
const CYCLE_LEN = 29;
let cycleT = 0, cycleI = 0;

function animate(t: number, dt: number): void {
  if (!vrm) return;
  if (opts.auto) {
    cycleT += dt;
    if (cycleT >= CYCLE_LEN) { cycleT -= CYCLE_LEN; cycleI = 0; }
    while (cycleI < CYCLE.length && CYCLE[cycleI][0] <= cycleT) CYCLE[cycleI++][1](t);
  }
  const h = vrm.humanoid, bone = (n: Parameters<typeof h.getNormalizedBoneNode>[0]) => h.getNormalizedBoneNode(n) ?? DUMMY;
  // idle: breathing and a slow sway
  const breath = Math.sin(t * 1.7);
  bone("spine").rotation.x = breath * 0.015; bone("chest").rotation.x = breath * 0.02;
  bone("hips").rotation.z = Math.sin(t * 0.55) * 0.025; bone("spine").rotation.z = -Math.sin(t * 0.55) * 0.02;
  bone("leftUpperArm").rotation.z = -1.2 + breath * 0.02; bone("rightUpperArm").rotation.z = 1.2 - breath * 0.02;
  // the head: following the mouse a little, plus the action
  let hx = -mouseY * 0.12, hy = mouseX * 0.25, hz = Math.sin(t * 0.55) * 0.03, sx = 0, chestBack = 0;
  if (action) {
    const k = (t - action.at) / action.dur;
    if (k >= 1) action = null;
    else if (action.name === "turn") hy += Math.sin(k * Math.PI * 2) * 0.55 * Math.min(1, (1 - k) * 4);
    else if (action.name === "nod") hx += Math.max(0, Math.sin(k * Math.PI * 4)) * 0.28;
    else if (action.name === "hit") { const d = Math.exp(-k * 5); hx -= 0.35 * d; hz += 0.12 * d; chestBack = 0.18 * d; sx = Math.sin(t * 60) * 0.012 * d; }
  }
  bone("neck").rotation.set(hx * 0.4, hy * 0.4, hz * 0.4); bone("head").rotation.set(hx * 0.6, hy * 0.6, hz * 0.6);
  bone("upperChest").rotation.x = -chestBack; vrm.scene.position.x = sx;
  // the eyes on the mouse (in front of the camera)
  lookTarget.position.set(mouseX * 0.6, mouseY * 0.4, -1);
  // expressions, eased in and out
  const em = vrm.expressionManager!;
  const kMood = Math.min(1, (t - moodAt) / 0.25);
  for (const e of EXPRESSIONS) em.setValue(e, (e === mood ? smooth(kMood) : 0) + (e === prevMood && e !== mood ? 1 - smooth(kMood) : 0));
  if (mood === "surprised" && action?.name === "hit") em.setValue("surprised", 1);
  // blinks (not while happy-closed or surprised)
  if (t > nextBlink && blinkAt < 0) { blinkAt = t; nextBlink = t + 2.2 + Math.random() * 3; }
  let blink = 0; if (blinkAt >= 0) { const k = (t - blinkAt) / 0.16; blink = k < 1 ? 1 - Math.abs(k * 2 - 1) : 0; if (k >= 1) blinkAt = -1; }
  em.setValue("blink", mood === "surprised" ? 0 : blink);
  // talking: each letter's viseme opening and closing, as the line types on
  for (const v of VISEMES) em.setValue(v, 0);
  if (talk) {
    const pos = (t - talk.at) * CPS, i = Math.floor(pos), f = pos - i;
    sayBox.textContent = talk.text.slice(0, Math.min(talk.text.length, i + 1));
    if (i < talk.text.length) { const v = viseme(talk.text[i]) ?? (/[a-z]/i.test(talk.text[i]) ? "ih" : null); if (v) em.setValue(v, Math.sin(Math.min(1, f) * Math.PI) * (v === "ih" && !viseme(talk.text[i]) ? 0.35 : 0.9)); }
    else if (t - talk.at > talk.text.length / CPS + 3) { talk = null; sayBox.textContent = ""; }
  }
  if (opts.springs) vrm.update(dt);
  else { vrm.update(dt); vrm.springBoneManager?.reset(); }
}

// ---- the pixel pass: the low-res render copied to both canvases, quantized if asked ----
function present(): void {
  sctx.clearRect(0, 0, lowW, lowH); sctx.drawImage(renderer.domElement, 0, 0);
  if (opts.quantize) {
    const img = sctx.getImageData(0, 0, lowW, lowH), d = img.data, q = (opts.levels - 1) / 255;
    for (let i = 0; i < d.length; i += 4) { d[i] = Math.round(Math.round(d[i] * q) / q); d[i + 1] = Math.round(Math.round(d[i + 1] * q) / q); d[i + 2] = Math.round(Math.round(d[i + 2] * q) / q); d[i + 3] = d[i + 3] > 127 ? 255 : 0; }
    sctx.putImageData(img, 0, 0);
  }
  lctx.clearRect(0, 0, lowW, lowH); lctx.drawImage(small, 0, 0);
}

// ---- the loop ----
const clock = new THREE.Clock();
let frames = 0, fpsAt = 0;
function loop(): void {
  const dt = Math.min(0.05, clock.getDelta()), t = clock.elapsedTime;
  animate(t, dt);
  renderer.render(scene, camera); present();
  frames++; if (t - fpsAt >= 1) { stat.fps = frames / (t - fpsAt); frames = 0; fpsAt = t; stat.tris = renderer.info.render.triangles; showStats(); }
  requestAnimationFrame(loop);
}

// ---- the panel ----
function h<T extends HTMLElement = HTMLElement>(tag: string, props: object = {}, ...kids: (Node | string)[]): T { const e = Object.assign(document.createElement(tag), props); e.append(...kids); return e as unknown as T; }
const btn = (label: string, on: () => void) => h<HTMLButtonElement>("button", { textContent: label, onclick: on });
const now = () => clock.elapsedTime;
const statsEl = h("div", { id: "stats" });
function showStats(): void {
  statsEl.textContent = `${stat.name}${stat.version ? ` (VRM ${stat.version})` : ""} · ${(stat.size / 1048576).toFixed(1)} MB · parsed in ${Math.round(stat.load)} ms · ${stat.fps.toFixed(0)} fps · render ${stat.res} px · ${stat.tris.toLocaleString()} triangles`;
}
const slider = (label: string, min: number, max: number, step: number, value: number, on: (v: number) => void) => {
  const out = h("span", { textContent: String(value) }), input = h<HTMLInputElement>("input", { type: "range", min, max, step, value });
  input.oninput = () => { out.textContent = input.value; on(Number(input.value)); };
  return h("label", {}, label, input, out);
};
const check = (label: string, value: boolean, on: (v: boolean) => void) => { const c = h<HTMLInputElement>("input", { type: "checkbox", checked: value }); c.onchange = () => on(c.checked); return h("label", {}, c, label); };
const file = h<HTMLInputElement>("input", { type: "file", accept: ".vrm" });
const drop = h("div", { id: "drop", textContent: "Drop any .vrm here (e.g. from VRoid Hub), or pick one: " }, file);
const loadFile = async (f: File) => { try { await load(await f.arrayBuffer(), f.name); } catch (e) { drop.textContent = `Couldn't load ${f.name}: ${(e as Error).message}`; } };
file.onchange = () => file.files?.[0] && loadFile(file.files[0]);
for (const ev of ["dragover", "dragenter"]) document.addEventListener(ev, e => { e.preventDefault(); drop.classList.add("over"); });
document.addEventListener("dragleave", () => drop.classList.remove("over"));
document.addEventListener("drop", e => { e.preventDefault(); drop.classList.remove("over"); const f = e.dataTransfer?.files?.[0]; if (f) loadFile(f); });
const autoBtn = btn("auto-cycle: on", () => { opts.auto = !opts.auto; autoBtn.textContent = `auto-cycle: ${opts.auto ? "on" : "off"}`; });
panel.append(
  h("h1", { textContent: "VRM pixel test" }),
  h("p", { textContent: "An off-the-shelf VTuber model, rendered small and scaled up nearest-neighbour. The left view is the same render shown large; below, it's at the game's bottom-left portrait size over a game-like backdrop. Not part of the game." }),
  statsEl,
  h("h2", { textContent: "Pixels" }),
  slider("pixel size", 1, 6, 1, opts.px, v => { opts.px = v; resize(); }),
  check("quantize the palette", opts.quantize, v => (opts.quantize = v)),
  slider("levels per channel", 2, 12, 1, opts.levels, v => (opts.levels = v)),
  check("spring-bone hair", opts.springs, v => (opts.springs = v)),
  h("h2", { textContent: "Motion" }),
  h("div", { className: "row" }, autoBtn),
  h("div", { className: "row" }, ...EXPRESSIONS.map(e => btn(e, () => setMood(e, now()))), btn("neutral", () => setMood(null, now()))),
  h("div", { className: "row" }, btn("head turn", () => play("turn", now())), btn("nod", () => play("nod", now())), btn("hit (flinch)", () => play("hit", now())), btn("blink", () => { blinkAt = now(); })),
  h("h2", { textContent: "Talking (the visemes)" }),
  h("div", { className: "row" }, ...LINES.map(l => btn(l, () => say(l, now())))),
  h("h2", { textContent: "Model" }),
  drop,
  h("p", { innerHTML: 'Sample: <b>Seed-san</b> by VirtualCast, Inc., <a style="color:#f2c46a" href="https://vrm.dev/licenses/1.0/">VRM Public License 1.0</a> (redistribution and modification allowed, credit required), from the VRM Consortium\'s <a style="color:#f2c46a" href="https://github.com/vrm-c/vrm-specification/tree/master/samples/Seed-san">samples</a>.' }),
);
window.addEventListener("pointermove", e => { const r = large.getBoundingClientRect(); mouseX = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1)); mouseY = Math.max(-1, Math.min(1, -(((e.clientY - r.top) / r.height) * 2 - 1))); });
// the text box sits right of the small portrait
const placeSay = () => { sayBox.style.left = `${lowW * opts.px + 8}px`; };

resize(); placeSay();
new ResizeObserver(placeSay).observe(small);
(async () => {
  try { const r = await fetch(seedUrl); await load(await r.arrayBuffer(), "Seed-san"); }
  catch (e) { drop.textContent = `Couldn't load the sample: ${(e as Error).message}. Drop a .vrm here.`; drop.append(file); }
  loop();
})();
(window as unknown as { vrmTest: unknown }).vrmTest = { stat, opts, get vrm() { return vrm; }, play, setMood, say };
