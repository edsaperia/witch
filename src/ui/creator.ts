// The character creator (Ed, 2026-10-05: "Our witch should be generated too. Then we can have a
// character creator at the start of the game where she is in her house and you can tweak the sliders
// to change her outfit!"). She stands in her treehouse room, big, hovering and standing, redrawn live
// as you change her genome (art/witchGenome.js): a picker or a slider for every axis in WITCH_AXES,
// grouped (hat, hair, outfit, broom, and anything new the art builders add), a toggle per accessory
// (and a slider for each accessory's size), and a 256-step rainbow and a shade per colour part (Ed,
// round 11: "the colours should have 256 rainbow colour pickers"). Randomise, the classic witch, Start.
// Her look is kept on this browser (localStorage witch.genome, version 2) for next time; an older save
// loads over the classic witch, its missing fields hers and anything past the limits brought inside. The generator's limits keep her a witch: only
// pointed hats with their glowing band, always a broom, dark hats so the band shows.
import * as Art from "../../art/generator.js";
import type { Style } from "../render/style";

type Genome = { hat: Record<string, number | string>; hair: string; top: string; cloak: string; broom: Record<string, number | string>; accessories: Record<string, boolean | number>; palette: Record<string, number[]> | null; [k: string]: unknown };

const AXES = Art.WITCH_AXES as Record<string, unknown[] | [number, number]>;
const CLASSIC = Art.WITCH_GENOME as unknown as Genome;
const KEY = "witch.genome";
const clone = <T>(v: T): T => JSON.parse(JSON.stringify(v));

/** The save's version: 2 since round 11 (wider limits, new hats and accessories). */
export const SAVE_VERSION = 2;

/** A saved look of any version made a genome of today's: laid over the classic witch (so a field it
 *  lacks is hers), every axis kept to its limits (a kind it doesn't know is hers, a number past its
 *  range brought inside it), the palette's parts kept where they're colours. Null if it's no genome. */
export function migrateGenome(raw: unknown): Genome | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const o = raw as Record<string, unknown>, g = clone(CLASSIC);
  const part = (k: string) => (o[k] && typeof o[k] === "object" ? o[k] as Record<string, unknown> : {});
  for (const k of ["hat", "broom", "accessories"]) Object.assign(g[k] as object, Object.fromEntries(Object.entries(part(k)).filter(([, v]) => ["string", "number", "boolean"].includes(typeof v))));
  for (const k of ["hair", "top", "cloak"]) if (typeof o[k] === "string") g[k] = o[k];
  for (const [axis, lim] of Object.entries(AXES)) {
    const [p, key] = slot(axis), host = (p ? g[p] : g) as Record<string, unknown>, def = (p ? (CLASSIC[p] as Record<string, unknown>) : CLASSIC)[key];
    if (typeof lim[0] === "string") { if (!(lim as unknown[]).includes(host[key])) host[key] = def ?? lim[0]; }
    else {
      const [a, z] = lim as [number, number], v = host[key];
      host[key] = typeof v === "number" && Number.isFinite(v) ? Math.min(z, Math.max(a, v)) : def ?? a;
    }
  }
  const pal = o.palette && typeof o.palette === "object" ? Object.entries(o.palette as Record<string, unknown>).filter(([, c]) => Array.isArray(c) && c.length === 3 && c.every(v => typeof v === "number" && v >= 0 && v <= 1)) : [];
  g.palette = pal.length ? Object.fromEntries(pal) as Record<string, number[]> : null;
  return (Art.witchGenomeProblems as (g: unknown) => string[])(g).length ? null : g;
}

/** Her saved look, if any (any version: see migrateGenome). */
export function loadGenome(): Genome | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? migrateGenome(JSON.parse(raw)) : null;
  } catch { return null; }
}
export function saveGenome(g: Genome): void { try { localStorage.setItem(KEY, JSON.stringify({ ...g, v: SAVE_VERSION })); } catch { /* storage blocked: this run only */ } }

/** Where an axis lives in the genome: hatHeight is hat.height, broom is broom.kind, broomLength is
 *  broom.length, bristles is broom.bristles, hair is hair; a new axis follows the same pattern. */
export function slot(axis: string): [string | null, string] {
  if (axis === "hatShape") return ["hat", "shape"];
  if (ACCESSORY_AXES.has(axis)) return ["accessories", axis];
  if (axis === "broom") return ["broom", "kind"];
  if (axis === "bristles") return ["broom", "bristles"];
  for (const part of ["hat", "broom"]) if (axis.startsWith(part) && axis.length > part.length) return [part, axis[part.length].toLowerCase() + axis.slice(part.length + 1)];
  return [null, axis];
}
/** The accessories' sizes (round 11): sliders kept in genome.accessories beside its toggles. */
const ACCESSORY_AXES = new Set(["scarfLength", "bagSize", "backpack"]);
/** Sliders whose bottom is "none" (the backpack): a value in the lowest share of the range snaps to 0. */
const NONE_AT_BOTTOM = new Set(["backpack"]);
const groupOf = (axis: string) => ACCESSORY_AXES.has(axis) ? "Accessories" : axis.startsWith("hat") ? "Hat" : axis === "hair" ? "Hair" : axis === "top" || axis === "cloak" ? "Outfit" : axis.startsWith("broom") || axis === "bristles" ? "Broom" : "More";
const label = (s: string) => s.replace(/([A-Z])/g, " $1").replace(/^hat |^broom /i, "").toLowerCase();

/** The colours the classic witch shows (the style's hues over her default outfit), as a palette to start editing from. */
function classicPalette(st: Style): Record<string, number[]> {
  const D = Art.DEFAULT_OUTFIT as Record<string, number[]>, S = st as unknown as Record<string, number | undefined>;
  const hue: Record<string, number | undefined> = { hair: S.hairHue, jacket: S.cloakHue, hat: S.hatHue, top: S.topHue, jeans: S.jeansHue, sneakers: S.shoeHue, headphones: S.phonesHue };
  return Object.fromEntries(Object.entries(D).map(([k, [h, s, v]]) => [k, [hue[k] ?? h, s, v]]));
}
/** The parts a player colours (the palette's, and any new part the art adds to it). */
const PARTS = ["hat", "jacket", "cloak", "top", "hair", "skin", "jeans", "sneakers", "headphones", "scarf", "satchel", "backpack", "broom", "bristles"];
/** The hue strip's steps (Ed, round 11: "256 rainbow colour pickers"); baking still keeps to the art's tones. */
export const HUE_STEPS = 256;
const css = ([h, s, v]: number[]) => { const [r, g, b] = (Art.hsv2rgb as (h: number, s: number, v: number) => number[])(h, s, v); return `rgb(${r | 0},${g | 0},${b | 0})`; };
/** A shade, 0 black to 1 white through the colour itself at 0.5, as saturation and value over a
 *  colour's own saturation `sat`; and back. */
export function shadeToSV(shade: number, sat: number): [number, number] {
  return shade <= .5 ? [sat, Math.max(0, shade * 2)] : [sat * Math.max(0, 2 - shade * 2), 1];
}
export function svToShade(s: number, v: number, sat: number): number {
  return v < 1 - 1e-6 || sat <= 1e-6 ? v / 2 : 1 - s / sat / 2;
}

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
    this.g = clone(start ?? CLASSIC);
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
  private randomise(): void { this.g = clone((Art.witchGenome as (s: number) => Genome)(Math.floor(Math.random() * 1e9))); this.build(); this.dirty = true; }
  private classic(): void { this.g = clone(CLASSIC); this.build(); this.dirty = true; }

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
          b.type = "button"; b.textContent = opt;
          const on = () => { b.style.background = get(axis) === opt ? "#ff5fb4" : "rgba(255,255,255,.08)"; };
          Object.assign(b.style, { font: "inherit", color: "inherit", border: "1px solid rgba(232,226,244,.3)", borderRadius: "4px", padding: "2px 6px", cursor: "pointer" });
          b.addEventListener("click", () => { set(axis, opt); r.querySelectorAll("button").forEach(x => (x as HTMLElement).style.background = "rgba(255,255,255,.08)"); on(); });
          on(); r.append(b);
        }
      } else {
        const [a, z] = lim as [number, number], s = document.createElement("input");
        s.type = "range"; s.min = String(a); s.max = String(z); s.step = String((z - a) / 100); s.value = String(get(axis) ?? a);
        s.style.flex = "1";
        // (the backpack's bottom is none: the lowest share of the slider snaps to 0)
        s.addEventListener("input", () => set(axis, NONE_AT_BOTTOM.has(axis) && +s.value < a + (z - a) * .12 ? Math.min(a, 0) : +s.value));
        r.append(s);
      }
    }
    // Accessories: a toggle each.
    const acc = group("Accessories"), ar = row(acc, "");
    ar.firstElementChild?.remove();
    for (const k of Object.keys({ ...CLASSIC.accessories, ...g.accessories })) {
      if (ACCESSORY_AXES.has(k) || typeof (g.accessories[k] ?? CLASSIC.accessories[k]) !== "boolean") continue; // (sizes have sliders)
      const l = document.createElement("label"), c = document.createElement("input");
      c.type = "checkbox"; c.checked = !!g.accessories[k];
      c.addEventListener("change", () => { g.accessories[k] = c.checked; this.dirty = true; });
      Object.assign(l.style, { display: "inline-flex", alignItems: "center", gap: "3px", marginRight: "8px", cursor: "pointer" });
      l.append(c, document.createTextNode(label(k)));
      ar.append(l);
    }
    // Colours: per part a rainbow of HUE_STEPS hues and a shade (black, the colour, white), her
    // classic colours until one is moved.
    const col = group("Colours"), classicPal = classicPalette(this.style), rainbow = Array.from({ length: 13 }, (_, i) => css([i / 12, .85, 1])).join(",");
    for (const part of PARTS) {
      const start = (g.palette ?? classicPal)[part] ?? classicPal[part];
      if (!start) continue; // (a part the art doesn't colour yet)
      const r = row(col, label(part)), chip = document.createElement("span");
      const sat = Math.max(.35, start[1]); // the shade slider's full colour
      Object.assign(chip.style, { width: "14px", height: "14px", borderRadius: "3px", border: "1px solid rgba(0,0,0,.6)", background: css(start) });
      const hue = document.createElement("input"), shade = document.createElement("input");
      hue.type = shade.type = "range";
      hue.min = "0"; hue.max = String(HUE_STEPS - 1); hue.step = "1"; hue.value = String(Math.round(start[0] * HUE_STEPS) % HUE_STEPS);
      shade.min = "0"; shade.max = "1"; shade.step = String(1 / 100); shade.value = String(svToShade(start[1], start[2], sat));
      hue.title = `${part}: hue`; shade.title = `${part}: shade`;
      hue.dataset.part = shade.dataset.part = part;
      Object.assign(hue.style, { flex: "2", minWidth: "90px", height: "10px", appearance: "none", background: `linear-gradient(90deg,${rainbow})`, borderRadius: "5px" });
      Object.assign(shade.style, { flex: "1", minWidth: "50px", height: "10px", appearance: "none", borderRadius: "5px" });
      const paint = () => {
        const h = +hue.value / HUE_STEPS, [s, v] = shadeToSV(+shade.value, sat), c = [h, s, v];
        shade.style.background = `linear-gradient(90deg,#000,${css([h, sat, 1])},#fff)`;
        chip.style.background = css(c);
        return c;
      };
      const pick = () => { g.palette = { ...(g.palette ?? classicPal), [part]: paint() }; this.dirty = true; };
      paint();
      hue.addEventListener("input", pick); shade.addEventListener("input", pick);
      r.append(chip, hue, shade);
    }
    // The buttons.
    const bar = document.createElement("div");
    Object.assign(bar.style, { display: "flex", gap: "8px", marginTop: "10px", position: "sticky", bottom: "0", background: "rgba(14,11,28,.95)", padding: "6px 0" });
    bar.style.position = "sticky";
    const btn = (text: string, f: () => void, main = false) => { const b = document.createElement("button"); b.type = "button"; b.textContent = text; Object.assign(b.style, { font: "inherit", fontSize: "14px", color: main ? "#1a0b14" : "inherit", background: main ? "#ff5fb4" : "rgba(255,255,255,.1)", border: "1px solid rgba(232,226,244,.4)", borderRadius: "6px", padding: "6px 12px", cursor: "pointer", flex: main ? "1" : "0 0 auto" }); b.addEventListener("click", f); bar.append(b); return b; };
    btn("🎲 Randomise", () => this.randomise());
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
