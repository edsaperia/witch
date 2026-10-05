// The character creator (Ed, 2026-10-05: "Our witch should be generated too. Then we can have a
// character creator at the start of the game where she is in her house and you can tweak the sliders
// to change her outfit!"). She stands in her treehouse room, big, hovering and standing, redrawn live
// as you change her genome (art/witchGenome.js): a picker or a slider for every axis in WITCH_AXES,
// grouped (hat, hair, outfit, broom, scarf and bags, and anything new the art builders add), a toggle per
// accessory, and a rainbow picker per colour part. Randomise, the classic witch, Start. Her look is kept on
// this browser (localStorage witch.genome) for next time. Round 2 (Ed, 2026-10-05: "the sliders ... should
// go further, and the colours should have 256 rainbow colour pickers. scarf length, bag size, backpack ...
// no hat, and some different hats"): the axes are wide, a hat picker with no hat first, and each colour a
// 256-step hue strip with a shade strip and a grey strip (the bake still quantises to the art's tones).
import * as Art from "../../art/generator.js";
import type { Style } from "../render/style";

type Genome = { hat: Record<string, number | string>; hair: string; top: string; cloak: string; broom: Record<string, number | string>; accessories: Record<string, boolean | string>; palette: Record<string, number[]> | null; scarfLength?: number; bagSize?: number; backpackSize?: number; [k: string]: unknown };

const AXES = Art.WITCH_AXES as Record<string, unknown[] | [number, number]>;
const CLASSIC = Art.WITCH_GENOME as unknown as Genome;
const KEY = "witch.genome";
const clone = <T>(v: T): T => JSON.parse(JSON.stringify(v));
/** A saved genome with every field it lacks taken from hers (art/witchGenome.js upgradeGenome). */
export const upgrade = (g: unknown): Genome => (Art.upgradeGenome as (g: unknown) => Genome)(g);

/** Her saved look, if any and still a witch by the generator's rules. */
export function loadGenome(): Genome | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const g = upgrade(JSON.parse(raw)); // a save from before round 2 gets the new fields as hers
    return (Art.witchGenomeProblems as (g: unknown) => string[])(g).length ? null : g;
  } catch { return null; }
}
export function saveGenome(g: Genome): void { try { localStorage.setItem(KEY, JSON.stringify(g)); } catch { /* storage blocked: this run only */ } }

/** Where an axis lives in the genome: hatHeight is hat.height, broom is broom.kind, broomLength is
 *  broom.length, bristles is broom.bristles, hair is hair; a new axis follows the same pattern. */
export function slot(axis: string): [string | null, string] {
  if (axis === "hatShape") return ["hat", "shape"];
  if (axis === "broom") return ["broom", "kind"];
  if (axis === "bristles") return ["broom", "bristles"];
  if (axis in (Art.WITCH_GENOME as { accessories: object }).accessories) return ["accessories", axis]; // an accessory with a choice (the familiar)
  for (const part of ["hat", "broom"]) if (axis.startsWith(part) && axis.length > part.length) return [part, axis[part.length].toLowerCase() + axis.slice(part.length + 1)];
  return [null, axis];
}
const groupOf = (axis: string) => axis.startsWith("hat") ? "Hat" : axis === "hair" ? "Hair" : axis === "top" || axis === "cloak" ? "Outfit" : axis.startsWith("broom") || axis === "bristles" ? "Broom" : axis === "scarfLength" || axis === "bagSize" || axis === "backpackSize" ? "Scarf and bags" : "More";
const label = (s: string) => s.replace(/([A-Z])/g, " $1").replace(/^hat |^broom /i, "").toLowerCase();
/** What a choice is called on its button (its genome name otherwise). */
const NAMES: Record<string, string> = { conical: "farmer's", boppers: "deely boppers", top: "top hat", party: "party hat", traffic: "traffic cone" };
const optName = (axis: string, opt: string) => axis === "hatShape" ? (opt === "none" ? "no hat" : NAMES[opt] ?? opt) : opt;
/** The accessory a slider belongs to: moving it puts that on. */
const WEARS: Record<string, string> = { scarfLength: "scarf", bagSize: "satchel" };
/** A slider's labels at its ends, where 0 means none. */
const NONE_AT_ZERO = new Set(["scarfLength", "backpackSize"]);

/** The rainbow pickers: 256 steps each. A colour is a hue (the rainbow), a shade (dark, through the full colour, to pale) and a
 *  greyness (full colour to grey); fromPicker turns the three into the genome's hue, saturation and value, toPicker back. */
export const STEPS = 256;
export function fromPicker(hue: number, shade: number, grey: number): number[] {
  const t = shade / (STEPS - 1), s0 = t <= .6 ? .9 : .9 - .85 * (t - .6) / .4, v = t <= .6 ? .08 + .92 * t / .6 : 1;
  return [hue / STEPS, +(s0 * (1 - grey / (STEPS - 1))).toFixed(4), +v.toFixed(4)];
}
export function toPicker([h, s, v]: number[]): [number, number, number] {
  const cl = (x: number) => Math.max(0, Math.min(STEPS - 1, Math.round(x * (STEPS - 1))));
  if (v < .995) return [Math.round(h * STEPS) % STEPS, cl((v - .08) / .92 * .6), cl(1 - s / .9)];
  return [Math.round(h * STEPS) % STEPS, cl(.6 + Math.max(0, .9 - s) / .85 * .4), 0];
}

/** The colours the classic witch shows (the style's hues over her default outfit), as a palette to start editing from. */
function classicPalette(st: Style): Record<string, number[]> {
  const D = Art.DEFAULT_OUTFIT as Record<string, number[]>, S = st as unknown as Record<string, number | undefined>;
  const hue: Record<string, number | undefined> = { hair: S.hairHue, jacket: S.cloakHue, hat: S.hatHue, top: S.topHue, jeans: S.jeansHue, sneakers: S.shoeHue, headphones: S.phonesHue };
  return Object.fromEntries(Object.entries(D).map(([k, [h, s, v]]) => [k, [hue[k] ?? h, s, v]]));
}
/** The parts a player colours, and each one's swatches (hue, saturation, value). */
const PARTS = ["hat", "plume", "jacket", "cloak", "top", "hair", "skin", "jeans", "sneakers", "headphones", "scarf", "satchel", "backpack", "broom", "bristles"].filter(k => k in (Art.DEFAULT_OUTFIT as object) || k === "backpack" || k === "plume");
/** A few quick picks under the strips: skins, and the hair colours that aren't in a rainbow. */
function swatches(part: string): number[][] {
  if (part === "skin") return [[.07, .25, .96], [.07, .32, .9], [.07, .42, .78], [.06, .5, .62], [.05, .55, .47], [.05, .5, .34]];
  if (part === "hair") return [[.07, .4, .14], [.07, .6, .33], [.04, .7, .5], [.11, .45, .88], [.02, .75, .7], [.6, .04, .86]];
  return [[0, 0, .08], [0, 0, .5], [0, 0, .97]];
}
const css = ([h, s, v]: number[]) => { const [r, g, b] = (Art.hsv2rgb as (h: number, s: number, v: number) => number[])(h, s, v); return `rgb(${r | 0},${g | 0},${b | 0})`; };

/** Her treehouse room, painted small and shown big: plank walls, a round window on the night with the
 *  moon, a shelf of jars, a rug and a warm lantern. Plain for now; the art builders can dress it. */
function paintRoom(c: HTMLCanvasElement): void {
  const W = 240, H = 135, x = c.getContext("2d")!;
  c.width = W; c.height = H;
  for (let i = 0; i < W; i += 12) { x.fillStyle = i % 24 ? "#3a2418" : "#33200f"; x.fillRect(i, 0, 12, H); x.fillStyle = "#24140a"; x.fillRect(i, 0, 1, H); }
  for (let y = 18; y < H; y += 37) { x.fillStyle = "#2a170b"; x.fillRect(0, y, W, 2); }
  x.fillStyle = "#22140c"; x.fillRect(0, 104, W, 31); // the floor
  for (let i = 0; i < W; i += 16) { x.fillStyle = "#2e1c10"; x.fillRect(i, 104, 15, 31); }
  x.fillStyle = "#5a2a4a"; x.beginPath(); x.ellipse(120, 120, 70, 9, 0, 0, Math.PI * 2); x.fill(); // the rug
  x.fillStyle = "#7a3a62"; x.beginPath(); x.ellipse(120, 120, 58, 6, 0, 0, Math.PI * 2); x.fill();
  // the round window, the night and the moon
  x.fillStyle = "#4a2c18"; x.beginPath(); x.arc(196, 46, 22, 0, Math.PI * 2); x.fill();
  x.fillStyle = "#0c0b26"; x.beginPath(); x.arc(196, 46, 18, 0, Math.PI * 2); x.fill();
  x.fillStyle = "#f4ecc8"; x.beginPath(); x.arc(202, 40, 6, 0, Math.PI * 2); x.fill();
  x.fillStyle = "#0c0b26"; x.beginPath(); x.arc(205, 38, 5, 0, Math.PI * 2); x.fill();
  for (const [sx, sy] of [[186, 34], [190, 56], [204, 54], [183, 47]]) { x.fillStyle = "#cfd8ff"; x.fillRect(sx, sy, 1, 1); }
  x.fillStyle = "#4a2c18"; x.fillRect(174, 45, 44, 2); x.fillRect(195, 24, 2, 44);
  // a shelf of glowing jars
  x.fillStyle = "#5a3820"; x.fillRect(20, 50, 52, 3);
  [["#7ef0c0", 24], ["#ff8fd0", 34], ["#ffd36b", 44], ["#9fb4ff", 56], ["#c08bff", 64]].forEach(([col, jx]) => { x.fillStyle = col as string; x.fillRect(jx as number, 42, 6, 8); x.fillStyle = "#e9e2d0"; x.fillRect(jx as number, 41, 6, 1); });
  // the lantern's warm glow
  const g = x.createRadialGradient(16, 82, 2, 16, 82, 60);
  g.addColorStop(0, "rgba(255,190,110,.55)"); g.addColorStop(1, "rgba(255,190,110,0)");
  x.fillStyle = g; x.fillRect(0, 20, 90, 115);
  x.fillStyle = "#2a1a0e"; x.fillRect(14, 70, 4, 6); x.fillStyle = "#ffcf7a"; x.fillRect(13, 76, 6, 7);
  // her mirror, beside where she stands (just a drawing: it doesn't reflect): a tall oval in a carved frame on feet
  x.fillStyle = "#6b4426"; x.beginPath(); x.ellipse(128, 70, 12, 24, 0, 0, Math.PI * 2); x.fill();
  x.fillStyle = "#8a5a32"; x.beginPath(); x.ellipse(128, 70, 11, 23, 0, 0, Math.PI * 2); x.fill();
  const glass = x.createLinearGradient(118, 50, 138, 90);
  glass.addColorStop(0, "#b8c6e8"); glass.addColorStop(.5, "#6d7aa8"); glass.addColorStop(1, "#3a3f66");
  x.fillStyle = glass; x.beginPath(); x.ellipse(128, 70, 9, 21, 0, 0, Math.PI * 2); x.fill();
  x.fillStyle = "rgba(255,255,255,.55)"; x.fillRect(123, 56, 1, 10); x.fillRect(125, 54, 1, 5); // a glint
  x.fillStyle = "#6b4426"; x.fillRect(127, 94, 2, 10); x.fillRect(121, 103, 14, 2); // its stand
  x.fillStyle = "#ffcf7a"; x.fillRect(127, 46, 2, 2); // a little carved star on top
  // the banner (Ed: "a banner that says PARTY TONIGHT"): hand-made bunting across the room, a letter on each flag in party neon
  const text = "PARTY TONIGHT", n = text.length, x0 = 6, x1 = 134, neon = ["#ff5fb4", "#4ff0ff", "#ffe14f", "#b388ff", "#7dff8a"];
  const sag = (u: number) => 6 + Math.sin(u * Math.PI) * 7;
  x.strokeStyle = "#d9c9a8"; x.lineWidth = 1; x.beginPath();
  for (let i = 0; i <= 40; i++) { const u = i / 40, px = x0 + (x1 - x0) * u; if (i) x.lineTo(px, sag(u)); else x.moveTo(px, sag(u)); }
  x.stroke();
  x.font = "bold 8px monospace"; x.textAlign = "center"; x.textBaseline = "middle";
  for (let i = 0; i < n; i++) {
    if (text[i] === " ") continue;
    const u = (i + .5) / n, px = x0 + (x1 - x0) * u, py = sag(u);
    x.fillStyle = neon[i % neon.length];
    x.beginPath(); x.moveTo(px - 5, py); x.lineTo(px + 5, py); x.lineTo(px, py + 14); x.closePath(); x.fill();
    x.fillStyle = "#1a0b20"; x.fillText(text[i], px, py + 4.5);
  }
}

export class Creator {
  readonly root = document.createElement("div");
  private preview = document.createElement("canvas");
  private panel = document.createElement("div");
  private g: Genome;
  private frames: { hover: HTMLCanvasElement[]; stand: HTMLCanvasElement[] } = { hover: [], stand: [] };
  private dirty = true;
  private raf = 0;
  /** The colour part being picked. */
  private part = "hat";
  /** Called with her look when Start is pressed and the world is ready. */
  onStart: (g: Genome) => void = () => {};
  /** Called on the Start click itself (a gesture: the sound can start). */
  onGesture: () => void = () => {};
  /** The world building behind it (Ed: "the character creator also serves as a loading screen"):
   *  sets done of total, and whether play can start. */
  progress: () => { done: number; total: number; ready: boolean } = () => ({ done: 1, total: 1, ready: true });
  private waiting = false;
  private startBtn: HTMLButtonElement | null = null;
  private bar: HTMLElement | null = null;
  get open(): boolean { return this.root.style.display !== "none"; }

  constructor(private style: Style, start: Genome | null) {
    this.g = upgrade(clone(start ?? CLASSIC));
    this.root.id = "creator";
    Object.assign(this.root.style, { position: "fixed", inset: "0", zIndex: "20", display: "none", font: "13px ui-monospace, Menlo, Consolas, monospace", color: "#efe6ff" });
    const room = document.createElement("canvas");
    paintRoom(room);
    Object.assign(room.style, { position: "absolute", inset: "0", width: "100%", height: "100%", imageRendering: "pixelated", objectFit: "cover" });
    Object.assign(this.preview.style, { position: "absolute", left: "4%", bottom: "6%", width: "54%", height: "86%", imageRendering: "pixelated" });
    Object.assign(this.panel.style, { position: "absolute", right: "2%", top: "4%", bottom: "4%", width: "min(400px, 40%)", overflowY: "auto", background: "rgba(14,11,28,.82)", border: "1px solid rgba(232,226,244,.3)", borderRadius: "8px", padding: "10px 12px" });
    this.root.append(room, this.preview, this.panel);
    document.body.append(this.root);
    // While it's open, its keys are its own (Enter starts, R randomises); nothing reaches the game.
    window.addEventListener("keydown", e => {
      if (!this.open) return;
      e.stopPropagation();
      if ((e.target as HTMLElement)?.tagName === "INPUT" && e.code !== "Enter") return;
      if (e.code === "Enter") { e.preventDefault(); this.start(); } else if (e.code === "KeyR") this.randomise();
    }, { capture: true });
    this.build();
  }

  show(): void { this.root.style.display = "block"; this.dirty = true; this.loop(); }
  hide(): void { this.root.style.display = "none"; cancelAnimationFrame(this.raf); }
  genome(): Genome { return clone(this.g); }

  /** Start: straight into play if the world is ready, else "getting ready" on this scene until it is. */
  private start(): void {
    saveGenome(this.g);
    this.onGesture();
    this.waiting = true;
    this.tryStart();
  }
  private tryStart(): void {
    if (!this.waiting || !this.progress().ready) return;
    this.waiting = false;
    this.hide();
    this.onStart(this.genome());
  }
  private randomise(): void { this.g = upgrade((Art.witchGenome as (s: number) => Genome)(Math.floor(Math.random() * 1e9))); this.build(); this.dirty = true; }
  /** Wild: every axis anywhere in its (wide) limits, every accessory a coin toss, every colour anywhere in the rainbows. */
  private wild(): void {
    const R = Math.random, g = upgrade(CLASSIC), any = <T>(a: T[]) => a[Math.floor(R() * a.length)];
    for (const [axis, lim] of Object.entries(AXES)) { const [part, key] = slot(axis), v = typeof lim[0] === "string" ? any(lim as string[]) : (lim[0] as number) + ((lim[1] as number) - (lim[0] as number)) * R(); if (part) (g[part] as Record<string, unknown>)[key] = v; else g[key] = v; }
    for (const k of Object.keys(g.accessories)) g.accessories[k] = R() < .5;
    g.palette = Object.fromEntries(PARTS.map(p => [p, fromPicker(Math.floor(R() * STEPS), Math.floor(R() * STEPS), Math.floor(R() * R() * STEPS))]));
    this.g = g; this.build(); this.dirty = true;
  }
  /** With no hat, the hat's sliders are greyed (they keep their places for when a hat goes back on). */
  private hatless(): void {
    const none = this.g.hat.shape === "none";
    this.panel.querySelectorAll<HTMLInputElement>("input[data-axis^=hat]").forEach(s => { s.disabled = none; s.style.opacity = none ? ".35" : "1"; });
  }
  private classic(): void { this.g = upgrade(CLASSIC); this.build(); this.dirty = true; }

  /** The controls, from the generator's axes (so a new axis shows up here by itself). */
  private build(): void {
    const P = this.panel, g = this.g;
    P.innerHTML = "";
    const h = document.createElement("div");
    h.innerHTML = `<div style="font-size:18px;margin-bottom:2px">✨ Your witch</div><div style="opacity:.7;margin-bottom:8px">The party's tonight! Dress her up while the forest grows, then fly. (Enter starts, R randomises.)</div>`;
    P.append(h);
    const groups = new Map<string, HTMLElement>();
    const group = (name: string) => {
      let el = groups.get(name);
      if (!el) { el = document.createElement("fieldset"); Object.assign(el.style, { border: "1px solid rgba(232,226,244,.2)", borderRadius: "6px", margin: "0 0 8px", padding: "4px 8px 8px" }); el.innerHTML = `<legend style="padding:0 4px;color:#ffb8e6">${name}</legend>`; groups.set(name, el); P.append(el); }
      return el;
    };
    const row = (parent: HTMLElement, name: string) => { const r = document.createElement("div"); Object.assign(r.style, { display: "flex", alignItems: "center", gap: "6px", margin: "4px 0", flexWrap: "wrap" }); r.innerHTML = `<span style="width:78px;opacity:.85">${name}</span>`; parent.append(r); return r; };
    const get = (axis: string) => { const [part, key] = slot(axis); return part ? (g[part] as Record<string, unknown>)[key] : g[key]; };
    const set = (axis: string, v: unknown) => { const [part, key] = slot(axis); if (part) (g[part] as Record<string, unknown>)[key] = v; else g[key] = v; this.dirty = true; };
    for (const [axis, lim] of Object.entries(AXES)) {
      const r = row(group(groupOf(axis)), label(axis));
      if (typeof lim[0] === "string") {
        for (const opt of lim as string[]) {
          const b = document.createElement("button");
          b.type = "button"; b.textContent = optName(axis, opt);
          const on = () => { b.style.background = get(axis) === opt ? "#ff5fb4" : "rgba(255,255,255,.08)"; };
          Object.assign(b.style, { font: "inherit", color: "inherit", border: "1px solid rgba(232,226,244,.3)", borderRadius: "4px", padding: "2px 6px", cursor: "pointer" });
          if (axis === "hatShape") b.dataset.hat = opt;
          b.addEventListener("click", () => { set(axis, opt); if (axis === "hatShape") this.hatless(); r.querySelectorAll("button").forEach(x => (x as HTMLElement).style.background = "rgba(255,255,255,.08)"); on(); });
          on(); r.append(b);
        }
      } else {
        const [a, z] = lim as [number, number], s = document.createElement("input");
        s.type = "range"; s.min = String(a); s.max = String(z); s.step = String((z - a) / 200); s.value = String(get(axis) ?? a);
        s.style.flex = "1"; s.dataset.axis = axis;
        const wear = WEARS[axis];
        const out = document.createElement("span");
        Object.assign(out.style, { width: "38px", textAlign: "right", opacity: ".7" });
        const show = () => { const v = +s.value; out.textContent = NONE_AT_ZERO.has(axis) && v === 0 ? "none" : axis === "hatTilt" || axis === "broomBend" ? (v > 0 ? "+" : "") + v.toFixed(2) : "×" + v.toFixed(2); };
        show();
        s.addEventListener("input", () => { show(); set(axis, +s.value); if (wear && !g.accessories[wear]) { g.accessories[wear] = true; const c = P.querySelector<HTMLInputElement>(`input[data-wear="${wear}"]`); if (c) c.checked = true; } });
        r.append(s, out);
      }
    }
    // Accessories: a toggle each.
    const acc = group("Accessories"), ar = row(acc, "");
    ar.firstElementChild?.remove();
    for (const k of Object.keys({ ...CLASSIC.accessories, ...g.accessories })) {
      if (k in AXES) continue; // a choice, not a toggle: its row is above
      const l = document.createElement("label"), c = document.createElement("input");
      c.type = "checkbox"; c.checked = !!g.accessories[k]; c.dataset.wear = k;
      c.addEventListener("change", () => { g.accessories[k] = c.checked; this.dirty = true; });
      Object.assign(l.style, { display: "inline-flex", alignItems: "center", gap: "3px", marginRight: "8px", cursor: "pointer" });
      l.append(c, document.createTextNode(label(k)));
      ar.append(l);
    }
    // Colours: a swatch per part (the one being picked ringed), then that part's 256-step strips: the rainbow, the shade
    // (dark, full, pale) and grey; a few quick picks; and back to her classic colour.
    const col = group("Colours"), tabs = row(col, "");
    tabs.firstElementChild?.remove();
    const pal = () => ({ ...classicPalette(this.style), ...g.palette }), cur = (part: string) => pal()[part] ?? [.07, .5, .45];
    const picker = document.createElement("div");
    col.append(picker);
    const strip = (kind: "hue" | "shade" | "grey") => {
      const c = document.createElement("canvas");
      c.width = STEPS; c.height = 1; c.dataset.strip = kind;
      Object.assign(c.style, { width: "100%", height: "14px", imageRendering: "pixelated", cursor: "crosshair", borderRadius: "3px", border: "1px solid rgba(0,0,0,.6)", display: "block" });
      return c;
    };
    const showPart = () => {
      const part = this.part;
      tabs.querySelectorAll<HTMLElement>("button").forEach(b => { b.style.outline = b.dataset.part === part ? "2px solid #fff" : "none"; b.style.background = css(cur(b.dataset.part!)); });
      picker.innerHTML = "";
      const title = document.createElement("div");
      title.style.margin = "2px 0"; title.textContent = label(part);
      picker.append(title);
      const [hi, si, gi] = toPicker(cur(part)), at = { hue: hi, shade: si, grey: gi };
      const strips = { hue: strip("hue"), shade: strip("shade"), grey: strip("grey") };
      const paint = () => {
        for (const [kind, c] of Object.entries(strips) as ["hue" | "shade" | "grey", HTMLCanvasElement][]) {
          const x = c.getContext("2d")!;
          for (let i = 0; i < STEPS; i++) { const k = { ...at, [kind]: i }; x.fillStyle = css(fromPicker(k.hue, k.shade, k.grey)); x.fillRect(i, 0, 1, 1); }
          x.fillStyle = "#fff"; x.fillRect(at[kind], 0, 1, 1); // its marker
        }
      };
      for (const [kind, c] of Object.entries(strips) as ["hue" | "shade" | "grey", HTMLCanvasElement][]) {
        const pick = (e: PointerEvent) => {
          const r = c.getBoundingClientRect();
          at[kind] = Math.max(0, Math.min(STEPS - 1, Math.floor((e.clientX - r.left) / r.width * STEPS)));
          g.palette = { ...pal(), [part]: fromPicker(at.hue, at.shade, at.grey) };
          this.dirty = true; paint();
          const t = tabs.querySelector<HTMLElement>(`button[data-part="${part}"]`); if (t) t.style.background = css(g.palette[part]);
        };
        c.addEventListener("pointerdown", e => { c.setPointerCapture(e.pointerId); pick(e); });
        c.addEventListener("pointermove", e => { if (c.hasPointerCapture(e.pointerId)) pick(e); });
        const l = document.createElement("div");
        Object.assign(l.style, { display: "flex", alignItems: "center", gap: "6px", margin: "3px 0" });
        l.innerHTML = `<span style="width:42px;opacity:.7">${kind}</span>`;
        const w = document.createElement("div"); w.style.flex = "1"; w.append(c); l.append(w);
        picker.append(l);
      }
      paint();
      const q = row(picker, "");
      q.firstElementChild?.remove();
      const quick = (sw: number[], text = "") => {
        const b = document.createElement("button");
        b.type = "button"; b.textContent = text;
        Object.assign(b.style, { minWidth: "16px", height: "16px", padding: "0 4px", font: "11px inherit", color: "#efe6ff", border: "1px solid rgba(0,0,0,.6)", borderRadius: "3px", background: text ? "rgba(255,255,255,.1)" : css(sw), cursor: "pointer" });
        b.addEventListener("click", () => { const c = classicPalette(this.style); g.palette = { ...pal(), [part]: text ? c[part] ?? [.07, .5, .45] : sw }; this.dirty = true; showPart(); });
        q.append(b);
      };
      for (const sw of swatches(part)) quick(sw);
      quick([], "classic");
    };
    for (const part of PARTS) {
      const b = document.createElement("button");
      b.type = "button"; b.title = label(part); b.dataset.part = part;
      Object.assign(b.style, { width: "20px", height: "20px", padding: "0", border: "1px solid rgba(0,0,0,.6)", borderRadius: "4px", cursor: "pointer" });
      b.addEventListener("click", () => { this.part = part; showPart(); });
      tabs.append(b);
    }
    showPart();
    this.hatless();
    // The buttons.
    const bar = document.createElement("div");
    Object.assign(bar.style, { display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "10px", position: "sticky", bottom: "0", background: "rgba(14,11,28,.95)", padding: "6px 0" });
    bar.style.position = "sticky";
    const btn = (text: string, f: () => void, main = false) => { const b = document.createElement("button"); b.type = "button"; b.textContent = text; Object.assign(b.style, { font: "inherit", fontSize: "14px", color: main ? "#1a0b14" : "inherit", background: main ? "#ff5fb4" : "rgba(255,255,255,.1)", border: "1px solid rgba(232,226,244,.4)", borderRadius: "6px", padding: "6px 12px", cursor: "pointer", flex: main ? "1 1 100%" : "1 1 auto" }); b.addEventListener("click", f); bar.append(b); return b; };
    btn("🎲 Randomise", () => this.randomise());
    btn("🌀 Wild", () => this.wild());
    btn("Classic", () => this.classic());
    this.startBtn = btn("Start ▶", () => this.start(), true);
    this.startBtn.id = "creator-start";
    // The forest growing behind the scene: a thin bar under the buttons.
    const track = document.createElement("div");
    Object.assign(track.style, { position: "absolute", left: "0", right: "0", bottom: "-2px", height: "3px", background: "rgba(255,255,255,.12)", borderRadius: "2px", overflow: "hidden" });
    this.bar = document.createElement("div");
    Object.assign(this.bar.style, { height: "100%", width: "0%", background: "linear-gradient(90deg,#ff5fb4,#4ff0ff)" });
    track.append(this.bar); bar.append(track);
    P.append(bar);
  }

  /** Her frames in the current look: hovering (3) and standing (on foot). */
  private redraw(): void {
    const st = this.style, look = (Art.genomeLook as (g: unknown) => { look: object; outfit: object | null })(this.g);
    const colours = (Art.witchColours as (st: Style, o?: object, x?: object) => object)(st, look.outfit ?? undefined, look.outfit ? { styleHues: false } : undefined);
    const bake = (o: object) => (Art.bake as (sp: unknown, c: object, st: Style, outline: unknown) => { A: HTMLCanvasElement })((Art.witchSprite as (st: Style, o: object) => unknown)(st, { ...o, look: look.look }), colours, st, (st as unknown as { cOutline: unknown }).cOutline).A;
    const stand = (Art.WITCH_FOOT_POSES as Record<string, { frames: number }>).stand?.frames ?? 1;
    this.frames = { hover: [0, 1, 2].map(frame => bake({ frame })), stand: Array.from({ length: stand }, (_, frame) => bake({ pose: "stand", frame })) };
  }

  private loop = (): void => {
    if (!this.open) return;
    this.raf = requestAnimationFrame(this.loop);
    if (this.dirty) { this.dirty = false; this.redraw(); }
    // The world building behind: its progress on the bar and the Start button; once ready, a waiting Start goes.
    const pr = this.progress(), built = pr.total ? pr.done / pr.total : 1;
    if (this.bar) this.bar.style.width = `${Math.round((pr.ready ? 1 : Math.min(.97, built)) * 100)}%`;
    if (this.startBtn) {
      const want = this.waiting && !pr.ready ? `getting ready… ${Math.round(built * 100)}%` : pr.ready ? "Start ▶" : `Start ▶ · the forest ${Math.round(built * 100)}%`;
      if (this.startBtn.textContent !== want) this.startBtn.textContent = want;
    }
    this.tryStart();
    const c = this.preview, r = c.getBoundingClientRect();
    if (!r.width) return;
    const W = Math.max(1, Math.round(r.width / 4)), H = Math.max(1, Math.round(r.height / 4));
    if (c.width !== W || c.height !== H) { c.width = W; c.height = H; }
    const x = c.getContext("2d")!, t = performance.now() / 1000;
    x.clearRect(0, 0, W, H);
    x.imageSmoothingEnabled = false;
    const hov = this.frames.hover[Math.floor(t * 6) % 3], st = this.frames.stand[Math.floor(t * 3) % Math.max(1, this.frames.stand.length)];
    if (!hov || !st) return;
    // Her two ways: hovering on her broom (bobbing), and standing on the rug. As big as fits.
    const k = Math.max(1, Math.floor(Math.min(W / (hov.width + st.width + 12), (H - 10) / Math.max(hov.height, st.height))));
    const bob = Math.round(Math.sin(t * 2) * 2);
    x.fillStyle = "rgba(0,0,0,.35)";
    x.beginPath(); x.ellipse(W * .3, H - 6, hov.width * k * .3, 3, 0, 0, Math.PI * 2); x.fill();
    x.beginPath(); x.ellipse(W * .72, H - 6, st.width * k * .3, 3, 0, 0, Math.PI * 2); x.fill();
    x.drawImage(hov, Math.round(W * .3 - hov.width * k / 2), Math.round(H - 14 - hov.height * k + bob - k * 4), hov.width * k, hov.height * k);
    x.drawImage(st, Math.round(W * .72 - st.width * k / 2), Math.round(H - 6 - st.height * k), st.width * k, st.height * k);
  };
}
