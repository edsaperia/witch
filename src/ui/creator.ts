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
import { shade } from "../../art/lighting.js";
import { LOOKS, lookGenome, pleasingWitch } from "./looks";

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

/** The creator's groups that are open, kept on this browser (localStorage witch.creator.open); at first, the looks, the hat and the colours. */
const OPEN_KEY = "witch.creator.open";
function openGroups(): Set<string> { try { const v = localStorage.getItem(OPEN_KEY); if (v) return new Set(JSON.parse(v) as string[]); } catch { /* storage blocked */ } return new Set(["Looks", "Hat", "Colours"]); }
function saveOpenGroups(s: Set<string>): void { try { localStorage.setItem(OPEN_KEY, JSON.stringify([...s])); } catch { /* storage blocked: this run only */ } }

/** The night round the treehouse, behind the room: deep blue in steps, stars, and the giant tree's leaves at the edges,
 *  painted small (one art pixel per pixel) and shown big. */
function paintNight(c: HTMLCanvasElement, W: number, H: number): void {
  const x = c.getContext("2d")!;
  c.width = W; c.height = H;
  const steps = ["#0a0a1e", "#0d0d26", "#11112f", "#161538", "#1b1940"];
  steps.forEach((col, i) => { x.fillStyle = col; x.fillRect(0, Math.floor(H * i / steps.length), W, Math.ceil(H / steps.length)); });
  for (let i = 0; i < W * H / 260; i++) { const h = (n: number) => (Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1, sx = Math.abs(h(1)) * W, sy = Math.abs(h(2)) * H * .8; x.fillStyle = Math.abs(h(3)) > .85 ? "#fff6d0" : "#8f96c8"; x.fillRect(sx | 0, sy | 0, 1, 1); }
  // leaf clumps at the corners and edges, in three hard-edged tones
  const clump = (cx: number, cy: number, r: number) => { for (const [k, col] of [[1, "#0f2a1c"], [.75, "#163a26"], [.45, "#1f4c30"]] as [number, string][]) { x.fillStyle = col; for (let y = -r; y <= r; y++) for (let xx = -r; xx <= r; xx++) if (xx * xx + y * y <= (r * k) ** 2) x.fillRect(Math.round(cx + xx - (1 - k) * r * .3), Math.round(cy + y - (1 - k) * r * .4), 1, 1); } };
  for (const [u, v, r] of [[0, 0, .22], [.12, -.02, .16], [-.02, .2, .14], [1, 0, .2], [.86, -.03, .15], [1.02, .22, .16], [0, 1, .2], [1, 1, .22], [.14, 1.02, .12], [.84, 1.03, .14]]) clump(u * W, v * H, Math.round(r * Math.min(W, H)));
}

export class Creator {
  readonly root = document.createElement("div");
  private preview = document.createElement("canvas");
  private night = document.createElement("canvas");
  private st: Style;
  /** The room, lit once: its picture, each glowing material's pixels alone (to pulse), and its anchors. */
  private room: Room | null = null;
  /** Her pose in the room: standing on the rug, or hovering over it on her broom. */
  private flying = false;
  private panel = document.createElement("div");
  private g: Genome;
  private frames: { hover: HTMLCanvasElement[]; stand: HTMLCanvasElement[] } = { hover: [], stand: [] };
  /** Her idle moments' frames (baked a moment after the last change, a pose a frame, so dragging a slider stays smooth). */
  private idle = new Map<string, HTMLCanvasElement[]>();
  private idleQueue: string[] = [];
  private idleAt = 0;
  private bakeFrame: ((o: object) => HTMLCanvasElement) | null = null;
  /** What she's doing now, if not just standing: an idle moment, or showing off a change. */
  private act: { pose: string; start: number; fps: number; loops: number; flip: boolean } | null = null;
  private nextAct = 0;
  private showOff = false;
  private drawn = false;
  /** When the forest was ready (the fairy lights' all-on blink). */
  private readyAt = 0;
  private dirty = true;
  private raf = 0;
  /** The room's drawing, eased off while the forest grows on a struggling machine (art review round 2: with the creator
   *  open, a software-GL machine never got ready): when the frame after a draw comes slowly (`SLOW_FRAME` ms, eased),
   *  the room is drawn at most every `SLOW_DRAW` ms until the forest is ready, so the art workers get the machine. */
  private drawnAt = 0;
  private afterDraw = false;
  private drawGap = 0;
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

  constructor(private style: Style, start: Genome | null, pixel = 3) {
    this.st = { ...style, pixel } as Style;
    this.g = upgrade(clone(start ?? CLASSIC));
    this.root.id = "creator";
    Object.assign(this.root.style, { position: "fixed", inset: "0", zIndex: "20", display: "none", font: "13px ui-monospace, Menlo, Consolas, monospace", color: "#efe6ff" });
    Object.assign(this.night.style, { position: "absolute", inset: "0", width: "100%", height: "100%", imageRendering: "pixelated" });
    Object.assign(this.preview.style, { position: "absolute", imageRendering: "pixelated", cursor: "pointer" });
    this.preview.title = "click to fly or stand";
    this.preview.addEventListener("click", () => { this.flying = !this.flying; });
    Object.assign(this.panel.style, { position: "absolute", right: "2%", top: "4%", bottom: "4%", width: "min(400px, 40%)", overflowY: "auto", background: "rgba(14,11,28,.82)", border: "1px solid rgba(232,226,244,.3)", borderRadius: "8px", padding: "10px 12px" });
    this.root.append(this.night, this.preview, this.panel);
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

  show(): void { this.root.style.display = "block"; this.dirty = true; if (!this.room) this.room = buildRoom(this.st); this.loop(); }
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
  private randomise(): void { this.g = upgrade(pleasingWitch(Math.floor(Math.random() * 1e9))); this.build(); this.dirty = true; } // a witch in a palette that goes together (ui/looks.ts)
  private look(id: string): void { this.g = upgrade(lookGenome(id)); this.build(); this.dirty = true; }
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
    h.innerHTML = `<div style="font-size:18px;margin-bottom:2px">✨ Your witch</div><div style="opacity:.7;margin-bottom:8px">The party's tonight! Dress her up while the forest grows, then fly. Start from a look, or 🎲. (Enter starts, R randomises; double-click a slider to put it back.)</div>`;
    P.append(h);
    const row = (parent: HTMLElement, name: string) => { const r = document.createElement("div"); Object.assign(r.style, { display: "flex", alignItems: "center", gap: "6px", margin: "4px 0", flexWrap: "wrap" }); r.innerHTML = `<span style="width:78px;opacity:.85">${name}</span>`; parent.append(r); return r; };
    // Each group folds away (its legend toggles it), the open ones kept on this browser; a first-time player sees the looks,
    // the hat and the colours open, the rest folded, so the panel isn't a wall of sliders.
    const groups = new Map<string, HTMLElement>(), open = openGroups();
    const group = (name: string) => {
      let el = groups.get(name);
      if (!el) {
        const fs = document.createElement("fieldset"), body = document.createElement("div"), lg = document.createElement("legend");
        Object.assign(fs.style, { border: "1px solid rgba(232,226,244,.2)", borderRadius: "6px", margin: "0 0 8px", padding: "4px 8px 6px" });
        Object.assign(lg.style, { padding: "0 4px", color: "var(--accent)", cursor: "pointer", userSelect: "none" });
        const paint = () => { const on = open.has(name); lg.textContent = `${on ? "▾" : "▸"} ${name}`; body.style.display = on ? "block" : "none"; };
        lg.addEventListener("click", () => { if (open.has(name)) open.delete(name); else open.add(name); saveOpenGroups(open); paint(); });
        fs.append(lg, body); paint(); P.append(fs); groups.set(name, body); el = body;
      }
      return el;
    };
    // Her looks to start from (ui/looks.ts)
    const lk = row(group("Looks"), "");
    lk.firstElementChild?.remove();
    for (const L of LOOKS) {
      const b = document.createElement("button");
      b.type = "button"; b.textContent = L.name; b.title = L.note; b.dataset.look = L.id;
      Object.assign(b.style, { font: "inherit", color: "inherit", border: "1px solid rgba(232,226,244,.3)", borderRadius: "4px", padding: "2px 6px", cursor: "pointer", background: "rgba(255,255,255,.08)" });
      b.addEventListener("click", () => this.look(L.id));
      lk.append(b);
    }
    const get = (axis: string) => { const [part, key] = slot(axis); return part ? (g[part] as Record<string, unknown>)[key] : g[key]; };
    const set = (axis: string, v: unknown) => { const [part, key] = slot(axis); if (part) (g[part] as Record<string, unknown>)[key] = v; else g[key] = v; this.dirty = true; };
    for (const [axis, lim] of Object.entries(AXES)) {
      const r = row(group(groupOf(axis)), label(axis));
      if (typeof lim[0] === "string") {
        for (const opt of lim as string[]) {
          const b = document.createElement("button");
          b.type = "button"; b.textContent = optName(axis, opt);
          const on = () => { const chosen = get(axis) === opt; b.style.background = chosen ? "var(--accent)" : "rgba(255,255,255,.08)"; b.style.color = chosen ? "#1d1408" : "inherit"; }; // (the HUD's one accent, lantern amber: #188, art review round 2)
          Object.assign(b.style, { font: "inherit", color: "inherit", border: "1px solid rgba(232,226,244,.3)", borderRadius: "4px", padding: "2px 6px", cursor: "pointer" });
          if (axis === "hatShape") b.dataset.hat = opt;
          b.addEventListener("click", () => { set(axis, opt); if (axis === "hatShape") this.hatless(); r.querySelectorAll("button").forEach(x => { (x as HTMLElement).style.background = "rgba(255,255,255,.08)"; (x as HTMLElement).style.color = "inherit"; }); on(); });
          on(); r.append(b);
        }
      } else {
        const [a, z] = lim as [number, number], s = document.createElement("input");
        s.type = "range"; s.min = String(a); s.max = String(z); s.step = String((z - a) / 200); s.value = String(get(axis) ?? a);
        s.style.flex = "1"; s.style.accentColor = "var(--accent)"; s.dataset.axis = axis;
        const wear = WEARS[axis];
        const out = document.createElement("span");
        Object.assign(out.style, { width: "38px", textAlign: "right", opacity: ".7" });
        const show = () => { const v = +s.value; out.textContent = NONE_AT_ZERO.has(axis) && v === 0 ? "none" : axis === "hatTilt" || axis === "broomBend" ? (v > 0 ? "+" : "") + v.toFixed(2) : "×" + v.toFixed(2); };
        show();
        // a light snap to her classic value (so it's easy to get back to), and a double-click resets the slider to it
        const home = Number((() => { const [part, key] = slot(axis); return part ? (CLASSIC[part] as Record<string, unknown>)[key] : CLASSIC[key]; })() ?? a);
        s.title = "double-click: back to hers";
        s.addEventListener("dblclick", () => { s.value = String(home); s.dispatchEvent(new Event("input")); });
        s.addEventListener("input", () => { if (Math.abs(+s.value - home) < (z - a) * .02) s.value = String(home); show(); set(axis, +s.value); if (wear && !g.accessories[wear]) { g.accessories[wear] = true; const c = P.querySelector<HTMLInputElement>(`input[data-wear="${wear}"]`); if (c) c.checked = true; } });
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
    const btn = (text: string, f: () => void, main = false) => { const b = document.createElement("button"); b.type = "button"; b.textContent = text; Object.assign(b.style, { font: "inherit", fontSize: "14px", color: main ? "#1d1408" : "inherit", background: main ? "var(--accent)" : "rgba(255,255,255,.1)", border: "1px solid rgba(232,226,244,.4)", borderRadius: "6px", padding: "6px 12px", cursor: "pointer", flex: main ? "1 1 100%" : "1 1 auto" }); b.addEventListener("click", f); bar.append(b); return b; };
    btn("🎲 Randomise", () => this.randomise());
    btn("🌀 Wild", () => this.wild());
    btn("Classic", () => this.classic());
    this.startBtn = btn("Start ▶", () => this.start(), true);
    this.startBtn.id = "creator-start";
    // The forest growing behind the scene: a thin bar under the buttons.
    const track = document.createElement("div");
    Object.assign(track.style, { position: "absolute", left: "0", right: "0", bottom: "-2px", height: "3px", background: "rgba(255,255,255,.12)", borderRadius: "2px", overflow: "hidden" });
    this.bar = document.createElement("div");
    Object.assign(this.bar.style, { height: "100%", width: "0%", background: "linear-gradient(90deg,var(--accent-dim),var(--accent))" });
    track.append(this.bar); bar.append(track);
    P.append(bar);
  }

  /** Her frames in the current look, lit by the room's lights where she stands: hovering (3) and standing (on foot). */
  private redraw(): void {
    const st = this.st, look = (Art.genomeLook as (g: unknown) => { look: object; outfit: object | null })(this.g);
    const colours = (Art.witchColours as (st: Style, o?: object, x?: object) => object)(st, look.outfit ?? undefined, look.outfit ? { styleHues: false } : undefined);
    const room = this.room, at = room?.a.stand ?? [0, 0];
    const bake = (o: object) => {
      const sp = (Art.witchSprite as (st: Style, o: object) => { w: number; h: number })(st, { ...o, look: look.look });
      const b = (Art.bake as (sp: unknown, c: object, st: Style, outline: unknown) => { A: HTMLCanvasElement; N: HTMLCanvasElement; w: number; h: number })(sp, colours, st, (st as unknown as { cOutline: unknown }).cOutline);
      if (!room) return b.A;
      // her lights: the room's, moved to her sprite's corner as it stands on the rug
      const ox = Math.round(at[0] - b.w / 2), oy = Math.round(at[1] - b.h), out = document.createElement("canvas");
      out.width = b.w; out.height = b.h;
      shade({ a: b.A.getContext("2d")!, n: b.N.getContext("2d")!, w: b.w, h: b.h }, out, herLight(st), room.lights.map(L => ({ ...L, x: L.x - ox, y: L.y - oy })), null);
      // keep her outline's and glows' own pixels: lit where she's drawn, clear elsewhere
      const o2 = out.getContext("2d")!; o2.globalCompositeOperation = "destination-in"; o2.drawImage(b.A, 0, 0);
      return out;
    };
    const stand = (Art.WITCH_FOOT_POSES as Record<string, { frames: number }>).stand?.frames ?? 1;
    this.frames = { hover: [0, 1, 2].map(frame => bake({ frame })), stand: Array.from({ length: stand }, (_, frame) => bake({ pose: "stand", frame })) };
    // her idle moments, baked shortly (each pose in its own frame), and the one playing stopped: it was the old look
    if (this.frames.stand.length && this.drawn) this.showOff = true; // (not the first drawing: a change to show off)
    this.drawn = true;
    this.bakeFrame = bake; this.idle.clear(); this.idleQueue = IDLES.map(i => i.pose).filter((p, i, a) => a.indexOf(p) === i && p !== "stand"); this.idleAt = performance.now() / 1000 + .35;
    if (this.act && this.act.pose !== "stand") this.act = null;
  }
  /** Bakes one queued idle pose, once the look has been still a moment. */
  private bakeIdle(t: number): void {
    if (!this.idleQueue.length || t < this.idleAt || !this.bakeFrame) return;
    const pose = this.idleQueue.shift()!, n = (Art.WITCH_FOOT_POSES as Record<string, { frames: number }>)[pose]?.frames ?? 0;
    if (n) this.idle.set(pose, Array.from({ length: n }, (_, frame) => this.bakeFrame!({ pose, frame })));
  }
  /** Her idle life on the rug (the overnight brief: "small idle animations for the witch"): now and then a moment from
   *  IDLES; after a change, a spin to show it off. Returns the frame to draw and whether it's turned round. */
  private standing(t: number): { fr: HTMLCanvasElement | undefined; flip: boolean } {
    if (this.showOff && this.idle.has("spin")) { this.showOff = false; this.act = { pose: "spin", start: t, fps: 8, loops: 1, flip: false }; }
    if (!this.act && t > this.nextAct && this.nextAct) {
      const ready = IDLES.filter(i => i.pose === "stand" || this.idle.has(i.pose)), pick = ready[Math.floor(Math.random() * ready.length)];
      if (pick) this.act = { pose: pick.pose, start: t, fps: pick.fps, loops: pick.loops, flip: !!pick.flip };
    }
    if (!this.nextAct) this.nextAct = t + 3;
    const a = this.act;
    if (a) {
      const frames = a.pose === "stand" ? this.frames.stand : this.idle.get(a.pose) ?? [], k = Math.floor((t - a.start) * a.fps), len = frames.length * a.loops;
      if (frames.length && k < len) return { fr: frames[k % frames.length], flip: a.flip };
      this.act = null; this.nextAct = t + 4 + Math.random() * 5;
    }
    return { fr: this.frames.stand[Math.floor(t * 2) % Math.max(1, this.frames.stand.length)], flip: false };
  }

  private loop = (): void => {
    if (!this.open) return;
    this.raf = requestAnimationFrame(this.loop);
    const changed = this.dirty;
    if (this.dirty) { this.dirty = false; this.redraw(); }
    // The world building behind: its progress on the bar and the Start button; once ready, a waiting Start goes.
    const pr = this.progress(), built = pr.total ? pr.done / pr.total : 1;
    if (pr.ready && !this.readyAt) this.readyAt = performance.now() / 1000;
    if (this.bar) this.bar.style.width = `${Math.round((pr.ready ? 1 : Math.min(.97, built)) * 100)}%`;
    if (this.startBtn) {
      const want = this.waiting && !pr.ready ? `getting ready… ${Math.round(built * 100)}%` : pr.ready ? "Start ▶" : `Start ▶ · the forest ${Math.round(built * 100)}%`;
      if (this.startBtn.textContent !== want) this.startBtn.textContent = want;
    }
    this.tryStart();
    const room = this.room;
    if (!room) return;
    const ms = performance.now();
    if (this.afterDraw) { this.drawGap = this.drawGap ? this.drawGap * .7 + (ms - this.drawnAt) * .3 : ms - this.drawnAt; this.afterDraw = false; }
    if (!pr.ready && !changed && this.drawGap > SLOW_FRAME && ms - this.drawnAt < SLOW_DRAW) return;
    this.drawnAt = ms; this.afterDraw = !changed; // (a redraw's own frame is slow anywhere: not counted)
    const t = ms / 1000, c = this.preview, W = room.lit.width, H = room.lit.height;
    this.place(W, H);
    if (c.width !== W || c.height !== H) { c.width = W; c.height = H; }
    const x = c.getContext("2d")!;
    x.imageSmoothingEnabled = false;
    x.globalCompositeOperation = "source-over"; x.globalAlpha = 1;
    x.clearRect(0, 0, W, H);
    x.drawImage(room.lit, 0, 0);
    drawGlows(x, room, t);
    fairyProgress(x, room, pr.ready ? 1 : Math.min(.97, built), this.readyAt ? t - this.readyAt : -1);
    x.drawImage(room.banner, 0, 0);
    const queued = this.idleQueue.length;
    this.bakeIdle(t);
    if (this.idleQueue.length !== queued) this.afterDraw = false; // (nor a pose's bake)
    // her: on the rug in a pool of light (the art director: "she's the brightest figure and the rug frames her"), standing,
    // or hovering over it, bobbing
    const now = this.flying ? { fr: this.frames.hover[Math.floor(t * 6) % 3], flip: false } : this.standing(t), fr = now.fr;
    if (!fr) return;
    const [sx, sy] = room.a.stand, bob = this.flying ? Math.round(Math.sin(t * 2) * 1.5) - 6 : 0;
    pool(x, sx, sy, fr.width);
    const fx = Math.round(sx - fr.width / 2), fy = Math.round(sy - fr.height + bob);
    if (this.flying) { x.fillStyle = "rgba(0,0,0,.35)"; x.fillRect(Math.round(sx - fr.width * .25), Math.round(sy) - 1, Math.round(fr.width * .5), 2); }
    if (now.flip) { x.save(); x.translate(fx + fr.width, fy); x.scale(-1, 1); x.drawImage(fr, 0, 0); x.restore(); } else x.drawImage(fr, fx, fy);
  };

  /** The room, as big as fits beside the panel at a whole number of screen pixels to its art pixel; the night behind. */
  private place(W: number, H: number): void {
    const dpr = window.devicePixelRatio || 1, vw = window.innerWidth, vh = window.innerHeight, pw = this.panel.getBoundingClientRect().width;
    const room = Math.max(1, vw - pw - vw * .04), k = Math.max(1, Math.floor(Math.min(room * dpr / W, vh * .96 * dpr / H)));
    const cw = W * k / dpr, ch = H * k / dpr, left = Math.max(0, (room - cw) / 2), top = Math.max(0, (vh - ch) / 2);
    const css = { width: `${cw}px`, height: `${ch}px`, left: `${left}px`, top: `${top}px` };
    if (this.preview.style.width !== css.width || this.preview.style.left !== css.left || this.preview.style.top !== css.top) {
      Object.assign(this.preview.style, css);
      paintNight(this.night, Math.ceil(vw * dpr / k), Math.ceil(vh * dpr / k));
    }
  }
}

/** A frame this slow after drawing the room (ms) means the machine is struggling; it's then drawn this seldom (ms) until ready. */
const SLOW_FRAME = 120, SLOW_DRAW = 600;

type RoomAnchors = { letters: [string, [number, number], number][]; stand: [number, number]; runes: [number, number][]; flames: [number, number][]; fairy: [number, number][]; screen: [number, number]; lantern: [number, number]; potions: [number, number]; decks: [number, number] };
type Light = { x: number; y: number; z: number; R: number; rgb: number[]; power: number };
/** The room's own light: a cool, dim night through the window and the warm things in it (the style's bands kept). */
const roomLight = (st: Style): Style => ({ ...st, ambient: .62, ambientHue: .09, moon: .3, shafts: 0, dither: 0 } as Style);
/** Hers: brighter, as if the lantern's on her (she's what the creator is for). */
const herLight = (st: Style): Style => ({ ...st, ambient: .85, ambientHue: .1, moon: .4, shafts: 0, dither: 0 } as Style);
/** The glowing materials that pulse, each with its own beat. */
const GLOWS: { mat: number; pulse: (t: number) => number }[] = [
  { mat: Art.M.RUNE, pulse: t => .2 + .2 * Math.sin(t * 2.2) },                                        // the books' runes, breathing
  { mat: Art.M.GLINT, pulse: t => .45 + .1 * Math.sin(t * 9) + (Math.sin(t * 1.3) > .96 ? .3 : 0) },     // the laptop's screen, scrolling
  { mat: Art.M.WOKEN, pulse: t => .3 + .25 * Math.abs(Math.sin(t * 7.3) * Math.sin(t * 3.1)) },          // candle flames
  { mat: Art.M.MAGIC, pulse: t => .3 + .3 * Math.sin(t * 1.1) },                                         // potions
  { mat: Art.M.COLLAR, pulse: t => Math.sin(t * 4) > 0 ? .45 : .1 },                                     // fairy lights, blinking
  { mat: Art.M.MAGIC2, pulse: t => Math.sin(t * 4) > 0 ? .1 : .4 },                                      // and their other half
];
/** Bakes and lights the room once: its picture, a layer per glowing material, its anchors and its lights. */
type Room = { lit: HTMLCanvasElement; banner: HTMLCanvasElement; glows: { mat: number; c: HTMLCanvasElement }[]; a: RoomAnchors; lights: Light[] };
function buildRoom(st: Style): Room {
  const sp = (Art.bedroomSprite as unknown as (st: Style) => { w: number; h: number; m: Uint8Array; anchors: RoomAnchors })(st);
  const colours = (Art.bedroomColours as (st: Style) => Record<number, number[]>)(st);
  const b = (Art.bake as (sp: unknown, c: object, st: Style, outline: unknown) => { A: HTMLCanvasElement; N: HTMLCanvasElement; w: number; h: number })(sp, colours, { ...st, styleInterior: false } as unknown as Style, (st as unknown as { cOutline: unknown }).cOutline); // (ref: its outline, not its interior lines, which turn the clutter to noise)
  const a = sp.anchors, warm = [255, 176, 92], light = (p: [number, number], R: number, rgb: number[], power: number, z = 10): Light => ({ x: p[0], y: p[1], z, R, rgb, power });
  const lights: Light[] = [light(a.lantern, 56, warm, .75, 14), light(a.screen, 56, [150, 214, 255], 1.6, 12), light(a.decks, 30, [255, 110, 210], .9), light(a.potions, 34, [196, 120, 255], .9),
    ...a.flames.map(f => light(f, 26, warm, 1)), ...a.runes.map(r => light(r, 14, [110, 255, 196], .5, 6))];
  const lit = document.createElement("canvas");
  lit.width = b.w; lit.height = b.h;
  shade({ a: b.A.getContext("2d")!, n: b.N.getContext("2d")!, w: b.w, h: b.h }, lit, roomLight(st), lights, null);
  const l2 = lit.getContext("2d")!; l2.globalCompositeOperation = "destination-in"; l2.drawImage(b.A, 0, 0); // clear round the room
  // the banner (Ed: "PARTY TONIGHT"): a pennant a letter hanging from its string, its top along the wall, its letter upright in a
  // pixel font; on its own layer, drawn over the glows (so no fairy light shines through a letter) after any stylising
  const banner = document.createElement("canvas"); banner.width = b.w; banner.height = b.h;
  const bn = banner.getContext("2d")!;
  const F = Art.BANNER_FONT as Record<string, string[]>, flag = ["#ff6fbf", "#ffd65a", "#7ff0b0", "#8fd4ff", "#ffb36b", "#c49bff", "#ff7a7a"];
  // in three passes, so a close neighbour's pennant never cuts a letter (at ?px=5 they're 4 pixels apart): every outline, every fill,
  // then every letter
  const pennants = a.letters.map(([ch, [px, py], slope], i) => {
    // as wide as the gap to its neighbour allows (a letter is 3 wide: at least 5), as long as fits under the string
    const nb = a.letters[i + 1]?.[1] ?? a.letters[i - 1]?.[1], gap = nb ? Math.abs(nb[0] - px) : 9, half = Math.max(2, Math.min(4, Math.floor((gap - 1) / 2)));
    const cx = Math.round(px), cy = Math.round(py), long = half * 2 + 5, topAt = (dx: number) => cy - 3 + Math.round(dx * slope);
    return { ch, i, cx, half, long, topAt };
  });
  for (const { cx, half, long, topAt } of pennants) for (let dx = -half - 1; dx <= half + 1; dx++) { const len = long + 1 - Math.round(Math.abs(dx) * long / (half + 2) * .5); bn.fillStyle = "#2a1620"; bn.fillRect(cx + dx, topAt(dx) - 1, 1, len + 2); }
  for (const { i, cx, half, long, topAt } of pennants) for (let dx = -half; dx <= half; dx++) { const len = long - Math.round(Math.abs(dx) * long / (half + 2) * .5); bn.fillStyle = flag[i % flag.length]; bn.fillRect(cx + dx, topAt(dx), 1, len); }
  // the letters: dark on the pale pennants, below the lowest of their columns' tops (so the slope never cuts one)
  bn.fillStyle = "#24101c";
  for (const { ch, cx, topAt } of pennants) { const ly = Math.max(topAt(-1), topAt(0), topAt(1)) + 1; F[ch]?.forEach((row, y) => [...row].forEach((on, x) => { if (on === "1") bn.fillRect(cx - 1 + x, ly + y, 1, 1); })); }
  const A = b.A.getContext("2d")!.getImageData(0, 0, b.w, b.h).data;
  const glows = GLOWS.map(({ mat }) => {
    const c = document.createElement("canvas"); c.width = b.w; c.height = b.h;
    const x = c.getContext("2d")!, img = x.createImageData(b.w, b.h);
    for (let i = 0; i < sp.m.length; i++) if (sp.m[i] === mat) { img.data[i * 4] = A[i * 4]; img.data[i * 4 + 1] = A[i * 4 + 1]; img.data[i * 4 + 2] = A[i * 4 + 2]; img.data[i * 4 + 3] = 255; }
    x.putImageData(img, 0, 0);
    return { mat, c };
  });
  return { lit, banner, glows, a, lights };
}
/** Her idle moments: a pose from the witch's on-foot poses, its speed, how many times through, turned round or not. */
const IDLES: { pose: string; fps: number; loops: number; flip?: boolean }[] = [
  { pose: "liftSigil", fps: 4, loops: 1 },          // reaching up to set her hat straight
  { pose: "spin", fps: 8, loops: 1 },               // a twirl, to see the outfit
  { pose: "bounce", fps: 5, loops: 3 },             // can't wait for the party
  { pose: "laugh", fps: 6, loops: 2 },
  { pose: "stargaze", fps: 1.5, loops: 2 },         // looking up, out of the window
  { pose: "twoStep", fps: 6, loops: 2 },            // practising a step
  { pose: "stand", fps: 2, loops: 4, flip: true },  // turning to look round the room
];
/** The fairy lights as the loading bar (the overnight brief: "a progress hint as the forest builds"): lit one by one along the
 *  walls as the forest grows, the rest dark; once it's ready, every one flashes twice. */
function fairyProgress(x: CanvasRenderingContext2D, room: Room, built: number, sinceReady: number): void {
  const F = room.a.fairy, lit = Math.floor(built * F.length);
  x.save();
  x.globalCompositeOperation = "source-over";
  F.forEach(([px, py], i) => {
    const cx = Math.round(px), cy = Math.round(py);
    if (i >= lit) { x.fillStyle = "#2b1d24"; x.fillRect(cx - 1, cy - 1, 2, 2); } // not yet: a dark bulb
  });
  x.globalCompositeOperation = "lighter";
  if (sinceReady < 0 && lit > 0) halo(x, F[lit - 1], 3, [255, 120, 210], .3); // the newest one, brightest
  if (sinceReady >= 0 && sinceReady < 1.2 && Math.floor(sinceReady * 5) % 2 === 0) F.forEach(p => halo(x, p, 3, [255, 200, 240], .25));
  x.restore();
}
/** The pool of light on the rug where she stands: two hard-edged steps of warm light, an ellipse as the floor is seen. */
function pool(x: CanvasRenderingContext2D, cx: number, cy: number, w: number): void {
  x.save();
  x.globalCompositeOperation = "lighter";
  for (const [k, al] of [[1, .12], [.62, .14]]) {
    const rx = Math.round(w * .95 * k), ry = Math.max(2, Math.round(rx * .5));
    x.fillStyle = `rgba(255,214,150,${al})`;
    for (let dy = -ry; dy <= ry; dy++) { const hw = Math.floor(rx * Math.sqrt(1 - (dy / ry) ** 2)); x.fillRect(Math.round(cx) - hw, Math.round(cy) - 1 + dy, hw * 2 + 1, 1); }
  }
  x.restore();
}
/** A glow in hard-edged steps round a point (pixel art: no soft gradients), added on. */
function halo(x: CanvasRenderingContext2D, p: [number, number], r: number, rgb: number[], alpha: number): void {
  for (const [k, al] of [[1, .35], [.6, .6]]) {
    const R = Math.max(1, Math.round(r * k)), cx = Math.round(p[0]), cy = Math.round(p[1]);
    x.fillStyle = `rgba(${rgb[0]},${rgb[1]},${rgb[2]},${Math.max(0, Math.min(1, alpha * al))})`;
    for (let dy = -R; dy <= R; dy++) { const w = Math.floor(Math.sqrt(R * R - dy * dy)); x.fillRect(cx - w, cy + dy, w * 2 + 1, 1); }
  }
}
/** The room's glows this moment: each glowing material's pixels brightened by its pulse, and stepped halos round the lights. */
function drawGlows(x: CanvasRenderingContext2D, room: Room, t: number): void {
  x.save();
  x.globalCompositeOperation = "lighter";
  room.glows.forEach((g, i) => { x.globalAlpha = Math.max(0, Math.min(1, GLOWS[i].pulse(t))); x.drawImage(g.c, 0, 0); });
  x.globalAlpha = 1;
  const a = room.a;
  a.runes.forEach((r, i) => halo(x, [r[0], r[1] - 1], 4, [110, 255, 196], .08 + .06 * Math.sin(t * 2.2 + i * 1.7)));
  a.flames.forEach((f, i) => halo(x, f, 4, [255, 190, 100], .12 + .06 * Math.sin(t * 9 + i * 2.1)));
  halo(x, a.lantern, 6, [255, 176, 92], .06 + .02 * Math.sin(t * 5));
  halo(x, a.screen, 10, [150, 214, 255], .16 + .04 * Math.sin(t * 3));
  halo(x, a.potions, 6, [196, 120, 255], .08 + .05 * Math.sin(t * 1.1));
  x.restore();
}
