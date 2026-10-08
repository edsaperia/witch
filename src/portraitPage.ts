// The portrait's preview page (portrait.html; Ed, 2026-10-08, for his approval before it goes into the game): her portrait over
// a dark game-like backdrop, its size slider, her look from the creator's choices (or random, or the one saved on this browser),
// a button for every expression, pose and gesture, and the text box with sample lines.

import * as Gen from "../art/witchGenome.js";
import { DEFAULT_OUTFIT } from "../art/witch.js";
import tuning from "../config/tuning.json";
import { EXPRESSIONS } from "./ui/portrait/expressions";
import { EYES } from "./ui/portrait/palette";
import { GESTURES, POSES } from "./ui/portrait/poses";
import { Portrait } from "./ui/portrait/portrait";

type Genome = { hat: Record<string, number | string>; hair: string; top: string; cloak: string; accessories: Record<string, boolean | string>; palette: Record<string, number[]> | null; [k: string]: unknown };
const AXES = Gen.WITCH_AXES as Record<string, (string | number)[]>;
const knobs = (tuning as { portrait?: { scale: number; fps: number; cps: number } }).portrait ?? { scale: 3, fps: 24, cps: 30 };
const clone = <T>(v: T): T => JSON.parse(JSON.stringify(v));
let genome: Genome = clone(Gen.WITCH_GENOME as unknown as Genome);
try { const saved = localStorage.getItem("witch.genome"); if (saved) { const g = (Gen.upgradeGenome as (g: unknown) => Genome)(JSON.parse(saved)); if (!(Gen.witchGenomeProblems as (g: unknown) => string[])(g).length) genome = g; } } catch { /* none saved */ }

const stage = document.getElementById("stage")!, panel = document.getElementById("panel")!;
const portrait = new Portrait({ scale: knobs.scale, fps: knobs.fps, cps: knobs.cps });
stage.appendChild(portrait.el);
portrait.setGenome(genome);
const now = () => performance.now() / 1000;

// ---- the backdrop: a night forest in pixels, so the text box's translucency can be judged ----
const bg = document.getElementById("bg") as HTMLCanvasElement;
function backdrop(): void {
  const px = 3, w = Math.ceil(stage.clientWidth / px), h = Math.ceil(stage.clientHeight / px), c = bg.getContext("2d")!;
  bg.width = w; bg.height = h;
  const sky = c.createLinearGradient(0, 0, 0, h); sky.addColorStop(0, "#0d0b22"); sky.addColorStop(0.55, "#1b1838"); sky.addColorStop(1, "#13221c");
  c.fillStyle = sky; c.fillRect(0, 0, w, h);
  let s = 7; const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < w * h / 300; i++) { c.fillStyle = `rgba(255,250,230,${0.3 + rnd() * 0.6})`; c.fillRect(Math.floor(rnd() * w), Math.floor(rnd() * h * 0.45), 1, 1); }
  c.fillStyle = "#1a2a26"; c.fillRect(0, Math.floor(h * 0.62), w, h);
  for (let i = 0; i < w / 9; i++) { // trees
    const x = rnd() * w, base = h * (0.6 + rnd() * 0.35), tall = 20 + rnd() * 40, wide = 7 + rnd() * 9, shade = 18 + Math.floor(rnd() * 22);
    c.fillStyle = `rgb(${shade - 6},${shade + 14},${shade + 6})`;
    for (let y = 0; y < tall; y++) { const half = wide * (y / tall); c.fillRect(Math.floor(x - half), Math.floor(base - tall + y), Math.ceil(half * 2), 1); }
    c.fillStyle = "#2a1e1a"; c.fillRect(Math.floor(x) - 1, Math.floor(base), 2, 3);
  }
  for (let i = 0; i < 40; i++) { const hue = [300, 190, 50, 140][i % 4]; c.fillStyle = `hsla(${hue},90%,70%,${0.4 + rnd() * 0.5})`; c.fillRect(Math.floor(rnd() * w), Math.floor(h * (0.55 + rnd() * 0.4)), 1, 1); }
  const glow = c.createRadialGradient(w * 0.62, h * 0.7, 0, w * 0.62, h * 0.7, 40); glow.addColorStop(0, "rgba(242,196,106,0.35)"); glow.addColorStop(1, "rgba(242,196,106,0)"); c.fillStyle = glow; c.fillRect(0, 0, w, h); // a party's glow
  c.fillStyle = "#e8b46a"; c.fillRect(Math.floor(w * 0.62) - 2, Math.floor(h * 0.7) - 6, 4, 6);
}
new ResizeObserver(backdrop).observe(stage);

// ---- the panel ----
function el<T extends HTMLElement = HTMLElement>(tag: string, props: object = {}, ...kids: (Node | string)[]): T { const e = Object.assign(document.createElement(tag), props); e.append(...kids); return e as unknown as T; }
const section = (title: string, ...kids: Node[]) => panel.append(el("h2", { textContent: title }), ...kids);
const buttons = (names: Record<string, { label?: string }> | string[], on: (n: string) => void, group: string) => {
  const row = el("div", { className: "row" }), list = Array.isArray(names) ? names.map(n => [n, n] as const) : Object.entries(names).map(([n, v]) => [n, v.label ?? n] as const);
  for (const [n, label] of list) { const b = el("button", { textContent: label }); b.dataset.group = group; b.dataset.name = n; b.onclick = () => { if (group !== "gesture" && group !== "say") for (const o of Array.from(row.querySelectorAll("button"))) o.classList.toggle("on", o === b); on(n); }; row.append(b); }
  return row;
};
const slider = (name: string, min: number, max: number, step: number, value: number, on: (v: number) => void) => {
  const out = el("span", { textContent: String(value) }), input = el<HTMLInputElement>("input", { type: "range", min: String(min), max: String(max), step: String(step), value: String(value) });
  input.oninput = () => { out.textContent = input.value; on(Number(input.value)); };
  return Object.assign(el("label", {}, name, input, out), { input });
};

panel.append(el("h1", { textContent: "Witch portrait" }), el("p", { textContent: "A preview for Ed: her portrait, generated from the creator's choices, with expressions, poses, gestures and her text box. Not in the game yet." }));
section("Size (portrait.scale)", slider("scale", 1, 8, 1, portrait.scale, v => portrait.setScale(v)), slider("box opacity", 0, 1, 0.02, 0.62, v => portrait.setBoxAlpha(v)));

section("Expressions", buttons(Object.keys(EXPRESSIONS), n => portrait.state.setExpression(n, now()), "expr"),
  el("div", { className: "row" }, Object.assign(el("button", { textContent: "blink" }), { onclick: () => portrait.state.blink(now()) })));
section("Poses", buttons(POSES, n => portrait.state.setPose(n, now()), "pose"));
section("Gestures", buttons(GESTURES, n => portrait.state.play(n, now()), "gesture"));

const LINES = ["Big party tonight! What should I wear?", "Maybe a legend would enjoy this?", "Aww, a baby owl!", "Eww, snail trail!"];
const LINE_FACE: Record<string, string> = { [LINES[0]]: "grin", [LINES[1]]: "awed", [LINES[2]]: "aww", [LINES[3]]: "eww" };
const say = (text: string) => { const t = now(); if (LINE_FACE[text]) portrait.state.setExpression(LINE_FACE[text], t); portrait.say(text, t); };
const custom = el<HTMLInputElement>("input", { type: "text", placeholder: "type a line and press Enter" });
custom.onkeydown = e => { if (e.key === "Enter" && custom.value.trim()) say(custom.value.trim()); };
section("Talking (the text box)", buttons(LINES, say, "say"), custom);

// her look: the creator's choices
const look = el("div");
section("Her look (the creator's choices)", el("div", { className: "row" },
  Object.assign(el("button", { textContent: "randomise" }), { onclick: () => { genome = clone(Gen.witchGenome(Math.floor(Math.random() * 1e9)) as unknown as Genome); refresh(); } }),
  Object.assign(el("button", { textContent: "the classic witch" }), { onclick: () => { genome = clone(Gen.WITCH_GENOME as unknown as Genome); refresh(); } }),
), look);
const COLOURS = ["skin", "hair", "eyes", "hat", "band", "jacket", "top", "cloak", "scarf", "headphones"];
const pick = (name: string, opts: (string | number)[], value: string, on: (v: string) => void) => { const s = el<HTMLSelectElement>("select"); for (const o of opts) s.append(el("option", { value: String(o), textContent: String(o), selected: String(o) === value })); s.onchange = () => on(s.value); return el("label", {}, name, s, el("span")); };
function refresh(): void {
  portrait.setGenome(genome);
  look.replaceChildren();
  const hat = genome.hat, acc = genome.accessories, set = (fn: () => void) => () => { fn(); portrait.setGenome(genome); };
  look.append(
    pick("hat", AXES.hatShape, String(hat.shape), v => { hat.shape = v; portrait.setGenome(genome); }),
    ...(["hatHeight", "hatBrim", "hatTilt", "hatBand"] as const).map(a => { const k = a.slice(3).toLowerCase(), [lo, hi] = AXES[a] as number[]; return slider(a.slice(3).toLowerCase(), lo, hi, 0.05, Number(hat[k]), v => { hat[k] = v; portrait.setGenome(genome); }); }),
    pick("hair", AXES.hair, genome.hair, v => { genome.hair = v; portrait.setGenome(genome); }),
    pick("top", AXES.top, genome.top, v => { genome.top = v; portrait.setGenome(genome); }),
    pick("cloak", AXES.cloak, genome.cloak, v => { genome.cloak = v; portrait.setGenome(genome); }),
    el("div", { className: "row" }, ...["phones", "shades", "earrings", "scarf", "pendant"].map(a => { const c = el<HTMLInputElement>("input", { type: "checkbox", checked: !!acc[a] }); c.onchange = set(() => (acc[a] = c.checked)); return el("label", { className: "tog" }, c, a); })),
    ...COLOURS.map(part => {
      const cur = (genome.palette?.[part] ?? (part === "eyes" ? EYES : (DEFAULT_OUTFIT as Record<string, number[]>)[part])) as number[];
      return slider(`${part} hue`, 0, 1, 0.01, Math.round(cur[0] * 100) / 100, v => { genome.palette = genome.palette ?? clone(DEFAULT_OUTFIT as Record<string, number[]>); const c = genome.palette[part] ?? [...cur]; genome.palette[part] = [v, c[1], c[2]]; portrait.setGenome(genome); });
    }),
  );
}
refresh();

// a first line, so the box shows
setTimeout(() => say(LINES[0]), 400);
const loop = () => { portrait.update(now()); requestAnimationFrame(loop); };
loop();
// for checks (tools): the portrait and its state
(window as unknown as { portrait: Portrait }).portrait = portrait;
