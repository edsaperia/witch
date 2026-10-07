// The character creator (Ed, 2026-10-05: "Our witch should be generated too. Then we can have a
// character creator at the start of the game where she is in her house and you can tweak the sliders
// to change her outfit!"). She stands in her treehouse room, big, hovering and standing, redrawn live
// as you change her genome (art/witchGenome.js): a picker or a slider for every axis in WITCH_AXES,
// grouped (hat, hair, outfit, broom, scarf and bags, and anything new the art builders add), a toggle per
// accessory, and a rainbow picker per colour part. Randomise, the classic witch, and the party spell's scroll to start (ui/spellScroll.ts). Her look is kept on
// this browser (localStorage witch.genome) for next time. Round 2 (Ed, 2026-10-05: "the sliders ... should
// go further, and the colours should have 256 rainbow colour pickers. scarf length, bag size, backpack ...
// no hat, and some different hats"): the axes are wide, a hat picker with no hat first, and each colour a
// 256-step hue strip with a shade strip and a grey strip (the bake still quantises to the art's tones).
import * as Art from "../../art/generator.js";
import type { Style } from "../render/style";
import { shade } from "../../art/lighting.js";
import { LOOKS, lookGenome, pleasingWitch } from "./looks";
import { keysDir, newWalker, spotAt, walk, type RoomFloor, type Walker } from "./roomWalk";
import { SpellScroll, type SpellCue } from "./spellScroll";
import { KeyHint } from "./keyHint";
import { installPixelUi, noEmoji, pixelIcon, pixelTitle, tapestry } from "./pixelUi";
import { button, h } from "./dom";

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
/** The creator's boxes (Ed, 2026-10-06: "Each item in character creation should have its own menu box with its own colour
 *  picker; only one menu box should be open at a time"): each item of hers with its sliders and pickers (`axes`), its
 *  toggles (`wear`), and the colour parts its own picker colours (`parts`). An axis, accessory or colour part no box names
 *  goes in the last ("Magic and more"), so a new one the art builders add shows up by itself. */
export const BOXES: { id: string; name: string; axes: string[]; wear: string[]; parts: string[] }[] = [
  { id: "hat", name: "🎩 Hat", axes: ["hatShape", "hatHeight", "hatBrim", "hatTilt", "hatBand"], wear: [], parts: ["hat", "plume"] },
  { id: "hair", name: "💇 Hair", axes: ["hair"], wear: ["earrings"], parts: ["hair"] },
  { id: "face", name: "🙂 Face", axes: [], wear: ["shades"], parts: ["skin"] },
  { id: "outfit", name: "🧥 Outfit", axes: ["top", "cloak", "cloakLength"], wear: ["patches", "pendant"], parts: ["jacket", "cloak", "top", "jeans"] },
  { id: "shoes", name: "👟 Shoes", axes: [], wear: ["chunky"], parts: ["sneakers"] },
  { id: "broom", name: "🧹 Broom", axes: ["broom", "broomLength", "broomThickness", "broomBend", "bristles"], wear: [], parts: ["broom", "bristles"] },
  { id: "scarf", name: "🧣 Scarf", axes: ["scarfLength"], wear: ["scarf"], parts: ["scarf"] },
  { id: "bag", name: "👜 Bag", axes: ["bagSize"], wear: ["satchel", "bumbag"], parts: ["satchel"] },
  { id: "backpack", name: "🎒 Backpack", axes: ["backpackSize"], wear: [], parts: ["backpack"] },
  { id: "phones", name: "🎧 Headphones", axes: [], wear: ["phones"], parts: ["headphones"] },
  { id: "more", name: "✨ Magic and more", axes: ["familiar"], wear: ["lantern", "vial", "book", "glowsticks", "wristband"], parts: [] },
];
/** The box an axis, an accessory or a colour part is in (the last box for one none names). */
export const boxOf = (kind: "axes" | "wear" | "parts", k: string): string => (BOXES.find(b => b[kind].includes(k)) ?? BOXES[BOXES.length - 1]).id;
/** Whether a slider draws anything on her look (art/witchGenome.js sliderApplies), and what greys it out. */
export const applies = Art.sliderApplies as (axis: string, look: Record<string, unknown>) => boolean;
const INERT_WHAT: Record<string, string> = { hatHeight: "hat", hatTilt: "hat", hatBrim: "hat", hatBand: "hat", broomBend: "broom", bristles: "broom", cloakLength: "cloak" };
const label = (s: string) => s.replace(/([A-Z])/g, " $1").replace(/^hat |^broom /i, "").toLowerCase();
/** What a choice is called on its button (its genome name otherwise). */
const NAMES: Record<string, string> = { conical: "farmer's", boppers: "deely boppers", top: "top hat", party: "party hat", traffic: "traffic cone" };
/** The broom kinds' names on their buttons (art/brooms.js). */
const BROOM_NAMES: Record<string, string> = { curl: "curled tip", hobbyhorse: "hobby horse", jetbike: "jet bike", speeder: "speeder bike", drone: "quad drone" };
const optName = (axis: string, opt: string) => axis === "hatShape" ? (opt === "none" ? "no hat" : NAMES[opt] ?? opt) : axis === "broom" ? BROOM_NAMES[opt] ?? opt : opt;
/** What a toggle or a colour part is called in its box (its genome name otherwise). */
const WEAR_NAMES: Record<string, string> = { phones: "wearing them", shades: "sunglasses", scarf: "wearing it", satchel: "satchel", bumbag: "bum bag", chunky: "chunky trainers", glowsticks: "glow sticks", vial: "potion vial", book: "spellbook", patches: "cloak patches" };
const PART_NAMES: Record<string, string> = { jacket: "jacket", cloak: "cloak", top: "top", jeans: "jeans", hat: "hat", plume: "plume", broom: "handle / body", bristles: "bristles / trim" };
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

/** The open box, kept on this browser (localStorage witch.creator.box); at first, the hat. "" for none. */
const BOX_KEY = "witch.creator.box";
function openBox(): string { try { const v = localStorage.getItem(BOX_KEY); if (v !== null) return v; } catch { /* storage blocked */ } return "hat"; }
function saveOpenBox(id: string): void { try { localStorage.setItem(BOX_KEY, id); } catch { /* storage blocked: this run only */ } }

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
  /** Walking about the room (Ed, 2026-10-06): the keys held, her place on the floor, the last frame's time. */
  private held = new Set<string>();
  private walker: Walker | null = null;
  private lastT = 0;
  /** Her cut-outs (behind): her pool of light and her frame, hidden behind nearer things, each kept until what it was cut
   *  from changes (the bedroom's first paint, overnight: cut each frame, it cost a second there). */
  private cuts = new Map<string, { canvas: HTMLCanvasElement; key: unknown[] }>();
  /** The room's size (`?room=`: its floor across, in its units; art/bedroom.js ROOM.S otherwise). */
  private roomS = Number(new URLSearchParams(location.search).get("room")) || undefined;
  private panel = document.createElement("div");
  /** The tapestry holding the tabs and the panel. */
  private sheet = document.createElement("div");
  /** The tabs down its left edge, one per box. */
  private tabs = document.createElement("div");
  private g: Genome;
  private frames: { hover: HTMLCanvasElement[]; stand: HTMLCanvasElement[] } = { hover: [], stand: [] };
  /** Her walking frames, towards us and away (baked first of her idle poses). */
  private runs: { towards: HTMLCanvasElement[]; away: HTMLCanvasElement[] } = { towards: [], away: [] };
  /** Her idle moments' frames (baked a moment after the last change, a pose a frame, so dragging a slider stays smooth). */
  private idle = new Map<string, HTMLCanvasElement[]>();
  private idleQueue: string[] = [];
  private idleAt = 0;
  /** Frames the room has drawn (her idle poses wait for the first few: the room's first paint first). */
  private framesDrawn = 0;
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
  /** The open box (one at a time), and each box's colour part being picked. */
  private box = openBox();
  private picking = new Map<string, string>();
  /** The thing of hers she's standing by in the room ("" for none). */
  private near = "";
  /** Opens a box (closing the rest); "" closes them all. */
  private boxes = new Map<string, () => void>();
  openBox(id: string): void { if (!id || !this.boxes.has(id)) return; this.box = id; saveOpenBox(id); for (const f of this.boxes.values()) f(); this.panel.scrollTop = 0; }
  /** The next tab down (1) or up (-1), round. */
  stepTab(by: number): void { const ids = [...this.boxes.keys()], i = ids.indexOf(this.box); this.openBox(ids[((i < 0 ? 0 : i + by) % ids.length + ids.length) % ids.length]); }
  /** Called with her look when the party spell bursts (the scroll cast and the world ready): play starts, the spell cast. */
  onStart: (g: Genome) => void = () => {};
  /** Called on the scroll's click itself (a gesture: the sound can start). */
  onGesture: () => void = () => {};
  /** The party spell's scroll's sound cues (platform/audio/spell.ts). */
  spellSound: (cue: SpellCue, v: number) => void = () => {};
  /** The party spell (Ed, 2026-10-06): the scroll, bottom right; casting it starts the game (ui/spellScroll.ts). */
  readonly scroll: SpellScroll;
  /** A button of the rendering builder's or anyone's, under the panel's own (the bot game). */
  addButton(text: string, onClick: () => void): HTMLButtonElement {
    const b = button(noEmoji(text), e => { e.stopPropagation(); onClick(); }, { style: { font: "inherit", color: "inherit", cursor: "pointer" } });
    this.extras.append(b);
    return b;
  }
  private extras = document.createElement("div");
  /** The tapestry's tabs and panel, between its title and its buttons. */
  private body = document.createElement("div");
  private title = document.createElement("canvas");
  /** The layout last made (its viewport and scale), so place() lays it out only when that changes. */
  private laid = "";
  /** The walking keys on the floor in front of her (ui/keyHint.ts). */
  private keyHint = new KeyHint();
  private unlocked = false;
  /** Tabs of anyone's, after her own (the controls and the options from the old start card): their nodes moved in whole. */
  private extraTabs: { id: string; name: string; nodes: HTMLElement[] }[] = [];
  /** A page of its own holding `nodes` (moved in, listeners and all), after her boxes, opened by a button in the row under the
   *  panel (with the bot game; its tabs are her things'); kept through every rebuild. `name` is its icon, a space, then its
   *  title (as the boxes' names). */
  addTab(id: string, name: string, nodes: HTMLElement[]): void {
    this.extraTabs.push({ id, name, nodes });
    const box = this.makeBox(id, name);
    box.append(...nodes);
    this.boxes.get(id)?.();
    const b = this.addButton(name, () => this.openBox(id)), words = noEmoji(name); b.dataset.page = id;
    b.textContent = ""; b.append(pixelIcon(id)); b.title = words; b.setAttribute("aria-label", words); // (its icon alone: tidy; its name on hover)
  }
  /** The world building behind it (Ed: "the character creator also serves as a loading screen"):
   *  sets done of total, and whether play can start. */
  progress: () => { done: number; total: number; ready: boolean } = () => ({ done: 1, total: 1, ready: true });
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
    // the panel (Ed's sketch, 2026-10-06): a hanging tapestry down the left, its top and bottom edges scalloped, the game's title
    // at its head, its boxes as tabs down its left edge (the strip) beside the open one (the panel's own content), and a row of
    // buttons along its foot (the bot game, the controls, what's new, the options); all on the room's pixel grid (ui/pixelUi.ts),
    // laid out by place()
    this.sheet.className = "px-sheet"; this.tabs.className = "px-tabs"; this.panel.className = "px-panel"; this.extras.className = "px-extras";
    Object.assign(this.sheet.style, { position: "absolute", zIndex: "1" });
    Object.assign(this.body.style, { position: "absolute", display: "flex" });
    Object.assign(this.tabs.style, { display: "flex", flexDirection: "column", flex: "0 0 auto" });
    Object.assign(this.panel.style, { flex: "1 1 auto", overflowY: "auto" });
    this.body.append(this.tabs, this.panel);
    // the game's title (Ed, 2026-10-06: its working title), drawn in pixels once its font has come
    this.title.id = "creator-title";
    Object.assign(this.extras.style, { position: "absolute", display: "flex", flexWrap: "wrap", zIndex: "3" });
    this.sheet.append(this.title, this.body, this.extras);
    this.root.append(this.night, this.preview, this.sheet);
    document.body.append(this.root);
    void installPixelUi().then(() => { const t = pixelTitle("Coven Rush"); this.title.width = t.width; this.title.height = t.height; this.title.getContext("2d")!.drawImage(t, 0, 0); this.title.className = t.className; this.laid = ""; this.dirty = true; });
    this.scroll = new SpellScroll(this.root);
    this.scroll.ready = () => this.progress().ready;
    this.scroll.progress = () => { const pr = this.progress(); return pr.ready ? 1 : pr.total ? Math.min(.97, pr.done / pr.total) : 0; };
    this.scroll.onCast = () => { saveGenome(this.g); this.onGesture(); };
    this.scroll.onBurst = () => { this.hide(); this.onStart(this.genome()); };
    this.scroll.sound = (cue, v) => this.spellSound(cue, v);
    // While it's open, its keys are its own (Enter casts the party spell, R randomises, WASD or the arrows walk her about); nothing reaches the game.
    window.addEventListener("keydown", e => {
      if (!this.open) return;
      e.stopPropagation();
      if (WALK_KEYS.has(e.code)) { e.preventDefault(); this.held.add(e.code); this.keyHint.pressed(e.code); (document.activeElement as HTMLElement | null)?.blur?.(); return; } // (a slider keeps no arrow keys: they walk her)
      if ((e.target as HTMLElement)?.tagName === "INPUT" && e.code !== "Enter") return;
      if (e.code === "Enter") { e.preventDefault(); this.scroll.cast(); } else if (e.code === "KeyR") this.randomise();
      else if (e.key === "?" && this.boxes.has("controls")) { e.preventDefault(); this.openBox("controls"); }
      else if (e.code === "KeyQ" || e.code === "PageUp") { e.preventDefault(); this.stepTab(-1); } else if (e.code === "KeyE" || e.code === "PageDown") { e.preventDefault(); this.stepTab(1); }
    }, { capture: true });
    // the first press anywhere in her room unlocks the sound, silently (browsers want a gesture first; Ed, 2026-10-06: no start card)
    const unlock = () => { if (this.open && !this.unlocked) { this.unlocked = true; this.onGesture(); } };
    this.root.addEventListener("pointerdown", unlock, { capture: true }); window.addEventListener("keydown", unlock, { capture: true });
    window.addEventListener("keyup", e => { if (!this.open) return; this.held.delete(e.code); if (WALK_KEYS.has(e.code)) e.stopPropagation(); }, { capture: true });
    window.addEventListener("blur", () => this.held.clear());
    this.build();
  }

  show(): void { this.root.style.display = "block"; this.dirty = true; if (!this.room) this.room = buildRoom(this.st, this.roomS); this.walker ??= newWalker(this.room.walk); this.loop(); this.scroll.start(); }
  hide(): void { this.root.style.display = "none"; cancelAnimationFrame(this.raf); this.held.clear(); this.scroll.stop(); this.spellSound("hum", 0); }
  genome(): Genome { return clone(this.g); }

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
  /** Greys out the sliders that draw nothing on what she has chosen (art/witchGenome.js WITCH_INERT: no hat's height, a
   *  beanie's brim, a canoe's bend, no cloak's length...), so every slider she can move changes her (Ed, 2026-10-06). */
  private inert(): void {
    const look = (Art.genomeLook as (g: unknown) => { look: Record<string, unknown> })(this.g).look;
    this.panel.querySelectorAll<HTMLInputElement>("input[data-axis]").forEach(s => {
      const on = applies(s.dataset.axis!, look);
      s.disabled = !on; s.style.opacity = on ? "1" : ".35"; s.title = on ? "double-click: back to hers" : `no ${label(s.dataset.axis!)} on this ${INERT_WHAT[s.dataset.axis!] ?? "one"}`;
    });
  }
  private classic(): void { this.g = upgrade(CLASSIC); this.build(); this.dirty = true; }

  /** A box's page and its tab (see build): its body, to fill. */
  private makeBox(id: string, name: string): HTMLElement {
    const [icon, ...words] = name.split(" ");
    void icon; // (the box's emoji: drawn as its pixel icon, ui/pixelUi.ts)
    const fs = h("fieldset", { data: { box: id }, style: { border: "1px solid rgba(214,170,92,.45)", borderRadius: "6px", margin: "0 0 6px", padding: "2px 8px 6px" } }), body = h("div");
    const lg = h("legend", { style: { padding: "0 4px", color: "#f2c46a", userSelect: "none" } }, pixelIcon(id), words.join(" "));
    const tab = h("button", { data: { tab: id }, type: "button", title: words.join(" "), attrs: { "aria-label": words.join(" ") } }, pixelIcon(id));
    if (this.extraTabs.some(T => T.id === id)) tab.style.display = "none"; // (an extra page's button is under the panel)
    Object.assign(tab.style, { font: "inherit", fontSize: "18px", width: "38px", height: "34px", cursor: "pointer", border: "1px solid rgba(214,170,92,.45)", borderRight: "none", borderRadius: "8px 0 0 8px", padding: "0", position: "relative" });
    const paint = () => {
      const on = this.box === id;
      fs.style.display = on ? "block" : "none";
      if (on) tab.dataset.on = ""; else delete tab.dataset.on;
      Object.assign(tab.style, on ? { background: "rgba(14,9,22,.55)", marginRight: "-2px", filter: "none", boxShadow: "inset 3px 0 0 #f2c46a", zIndex: "2" } : { background: "rgba(255,255,255,.04)", marginRight: "0", filter: "grayscale(.5) brightness(.8)", boxShadow: "none", zIndex: "0" });
    };
    tab.addEventListener("click", () => this.openBox(id));
    this.tabs.append(tab);
    fs.append(lg, body); const bar = this.panel.querySelector("[data-bar]"); if (bar) this.panel.insertBefore(fs, bar); else this.panel.append(fs); this.boxes.set(id, paint); paint();
    return body;
  }
  /** The controls: a box for each item of hers (BOXES), one open at a time, each with its sliders and pickers (from the
   *  generator's axes, so a new axis shows up by itself), its toggles and its own colour picker. */
  private build(): void {
    const P = this.panel, g = this.g;
    P.innerHTML = ""; this.tabs.innerHTML = "";
    this.boxes.clear();
    P.append(h("div", { html: `<div class="px-head">Your witch</div><div class="px-intro">The party's tonight! Dress her up while the forest grows: walk her to her things (WASD) or pick a tab (Q, E). When the scroll unrolls, click it (or Enter) to cast the party spell. R randomises.</div>` }));
    const row = (parent: HTMLElement, name: string) => { const r = h("div", { class: "px-row", style: { display: "flex", alignItems: "center", gap: "6px", margin: "4px 0", flexWrap: "wrap" }, html: `<span style="width:78px;opacity:.85">${name}</span>` }); parent.append(r); return r; };
    // The boxes, as tabs down the tapestry's left edge (Ed, 2026-10-06: "The different things you can change ... can be tabs
    // down the left side of the character creation pane"): its icon on the tab, its name as its tooltip and at the top of its
    // page; only the open one's page shows, its tab joined to the page like a bookmark. The open one is kept on this browser.
    const box = (id: string, name: string) => this.makeBox(id, name);
    // Her looks to start from (ui/looks.ts)
    const lk = row(box("looks", "👗 Looks"), "");
    lk.firstElementChild?.remove();
    for (const L of LOOKS) {
      lk.append(button(L.name, () => this.look(L.id), { title: L.note, data: { look: L.id }, style: { font: "inherit", color: "inherit", border: "1px solid rgba(232,226,244,.3)", borderRadius: "4px", padding: "2px 6px", cursor: "pointer", background: "rgba(255,255,255,.08)" } }));
    }
    const get = (axis: string) => { const [part, key] = slot(axis); return part ? (g[part] as Record<string, unknown>)[key] : g[key]; };
    const set = (axis: string, v: unknown) => { const [part, key] = slot(axis); if (part) (g[part] as Record<string, unknown>)[key] = v; else g[key] = v; this.dirty = true; };
    const accs = Object.keys({ ...CLASSIC.accessories, ...g.accessories }).filter(k => !(k in AXES)); // (a choice, like the familiar, is an axis)
    const pal = () => ({ ...classicPalette(this.style), ...g.palette }), cur = (part: string) => pal()[part] ?? [.07, .5, .45];
    for (const B of BOXES) {
      const axes = Object.keys(AXES).filter(a => boxOf("axes", a) === B.id), wear = accs.filter(k => boxOf("wear", k) === B.id), parts = PARTS.filter(k => boxOf("parts", k) === B.id);
      if (!axes.length && !wear.length && !parts.length) continue;
      const body = box(B.id, B.name);
      // its toggles first (what it is, worn or not), then its sliders and pickers
      if (wear.length) {
        const ar = row(body, "");
        ar.firstElementChild?.remove();
        for (const k of wear) {
          const c = h("input", { type: "checkbox", data: { wear: k }, on: { change: () => { g.accessories[k] = c.checked; this.dirty = true; } } });
          c.checked = !!g.accessories[k];
          ar.append(h("label", { style: { display: "inline-flex", alignItems: "center", gap: "3px", marginRight: "8px", cursor: "pointer" } }, c, WEAR_NAMES[k] ?? label(k)));
        }
      }
      for (const axis of axes) this.axisRow(body, axis, row, get, set);
      if (parts.length) this.picker(body, B.id, parts, row, pal, cur);
    }
    for (const T of this.extraTabs) box(T.id, T.name).append(...T.nodes); // (the controls, the options: theirs, moved in whole)
    this.inert();
    if (!this.boxes.has(this.box)) this.openBox(this.boxes.keys().next().value ?? "");
    // The buttons.
    const bar = h("div", { data: { bar: "" }, style: { display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "10px", position: "sticky", bottom: "0", background: "rgba(22,14,32,.97)", padding: "6px 0" } });
    const btn = (text: string, f: () => void, main = false) => bar.appendChild(button(text, f, { style: { font: "inherit", fontSize: "14px", color: main ? "#1d1408" : "inherit", background: main ? "var(--accent)" : "rgba(255,255,255,.1)", border: "1px solid rgba(232,226,244,.4)", borderRadius: "6px", padding: "6px 12px", cursor: "pointer", flex: main ? "1 1 100%" : "1 1 auto" } }));
    btn("Randomise", () => this.randomise());
    btn("Wild", () => this.wild());
    btn("Classic", () => this.classic());
    // (the forest growing behind: the room's fairy lights are its loading bar, Ed: "I love the bedroom party lights as loading bar")
    P.append(bar);
  }

  /** An axis's row in its box: a button per choice, or a slider. */
  private axisRow(body: HTMLElement, axis: string, row: (p: HTMLElement, n: string) => HTMLElement, get: (a: string) => unknown, set: (a: string, v: unknown) => void): void {
    const g = this.g, lim = AXES[axis], r = row(body, label(axis));
    if (typeof lim[0] === "string") {
      for (const opt of lim as string[]) {
        const b = h("button", { type: "button", text: optName(axis, opt) });
        const on = () => { const chosen = get(axis) === opt; b.style.background = chosen ? "var(--accent)" : "rgba(255,255,255,.08)"; b.style.color = chosen ? "#1d1408" : "inherit"; }; // (the HUD's one accent, lantern amber: #188, art review round 2)
        Object.assign(b.style, { font: "inherit", color: "inherit", border: "1px solid rgba(232,226,244,.3)", borderRadius: "4px", padding: "2px 6px", cursor: "pointer" });
        if (axis === "hatShape") b.dataset.hat = opt;
        b.addEventListener("click", () => { set(axis, opt); this.inert(); r.querySelectorAll("button").forEach(x => { (x as HTMLElement).style.background = "rgba(255,255,255,.08)"; (x as HTMLElement).style.color = "inherit"; }); on(); });
        on(); r.append(b);
      }
      return;
    }
    const [a, z] = lim as [number, number], s = h("input", { type: "range" });
    s.min = String(a); s.max = String(z); s.step = String((z - a) / 200); s.value = String(get(axis) ?? a);
    s.style.flex = "1"; s.style.accentColor = "var(--accent)"; s.dataset.axis = axis;
    const wear = WEARS[axis], out = h("span", { style: { width: "38px", textAlign: "right", opacity: ".7" } });
    const show = () => { const v = +s.value; out.textContent = NONE_AT_ZERO.has(axis) && v === 0 ? "none" : axis === "hatTilt" || axis === "broomBend" ? (v > 0 ? "+" : "") + v.toFixed(2) : "×" + v.toFixed(2); };
    show();
    // a light snap to her classic value (so it's easy to get back to), and a double-click resets the slider to it
    const home = Number((() => { const [part, key] = slot(axis); return part ? (CLASSIC[part] as Record<string, unknown>)[key] : CLASSIC[key]; })() ?? a);
    s.title = "double-click: back to hers";
    s.addEventListener("dblclick", () => { s.value = String(home); s.dispatchEvent(new Event("input")); });
    s.addEventListener("input", () => { if (Math.abs(+s.value - home) < (z - a) * .02) s.value = String(home); show(); set(axis, +s.value); if (wear && !g.accessories[wear]) { g.accessories[wear] = true; const c = this.panel.querySelector<HTMLInputElement>(`input[data-wear="${wear}"]`); if (c) c.checked = true; } });
    r.append(s, out);
  }

  /** A box's own colour picker: a swatch per part it colours (the one being picked ringed; one part, no swatches), then that
   *  part's 256-step strips (the rainbow, the shade: dark, full, pale; and grey), a few quick picks, and back to her classic. */
  private picker(body: HTMLElement, id: string, parts: string[], row: (p: HTMLElement, n: string) => HTMLElement, pal: () => Record<string, number[]>, cur: (part: string) => number[]): void {
    const g = this.g, tabs = row(body, "colour"), picker = h("div", { data: { picker: id } });
    if (!parts.includes(this.picking.get(id) ?? "")) this.picking.set(id, parts[0]);
    body.append(picker);
    const strip = (kind: "hue" | "shade" | "grey") => {
      const c = h("canvas", { data: { strip: kind }, style: { width: "100%", height: "14px", imageRendering: "pixelated", cursor: "crosshair", borderRadius: "3px", border: "1px solid rgba(0,0,0,.6)", display: "block" } });
      c.width = STEPS; c.height = 1;
      return c;
    };
    const showPart = () => {
      const part = this.picking.get(id)!;
      tabs.querySelectorAll<HTMLElement>("button").forEach(b => { if (b.dataset.part === part && parts.length > 1) b.dataset.on = ""; else delete b.dataset.on; b.style.background = css(cur(b.dataset.part!)); });
      picker.innerHTML = "";
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
        picker.append(h("div", { style: { display: "flex", alignItems: "center", gap: "6px", margin: "3px 0" }, html: `<span style="width:42px;opacity:.7">${kind}</span>` }, h("div", { style: { flex: "1" } }, c)));
      }
      paint();
      const q = row(picker, "");
      q.firstElementChild?.remove();
      const quick = (sw: number[], text = "") => {
        q.append(button(text, () => { const c = classicPalette(this.style); g.palette = { ...pal(), [part]: text ? c[part] ?? [.07, .5, .45] : sw }; this.dirty = true; showPart(); },
          { style: { minWidth: "16px", height: "16px", padding: "0 4px", font: "11px inherit", color: "#efe6ff", border: "1px solid rgba(0,0,0,.6)", borderRadius: "3px", background: text ? "rgba(255,255,255,.1)" : css(sw), cursor: "pointer" } }));
      };
      for (const sw of swatches(part)) quick(sw);
      quick([], "classic");
    };
    for (const part of parts) {
      const b = button(parts.length > 1 ? PART_NAMES[part] ?? label(part) : "", () => { this.picking.set(id, part); showPart(); },
        { title: label(part), data: { part }, style: { height: "20px", padding: "0 6px", font: "inherit", fontSize: "11px", color: "#fff", textShadow: "0 0 2px #000, 0 0 2px #000", border: "1px solid rgba(0,0,0,.6)", borderRadius: "4px", cursor: "pointer" } });
      if (parts.length === 1) b.style.width = "20px";
      tabs.append(b);
    }
    showPart();
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
    this.bakeFrame = bake; this.idle.clear(); this.runs = { towards: [], away: [] };
    this.idleQueue = ["run:towards", "run:away", ...IDLES.map(i => i.pose).filter((p, i, a) => a.indexOf(p) === i && p !== "stand")]; this.idleAt = performance.now() / 1000 + .35;
    if (this.act && this.act.pose !== "stand") this.act = null;
  }
  /** Bakes one queued idle pose, once the look has been still a moment. */
  private bakeIdle(t: number): void {
    if (!this.idleQueue.length || t < this.idleAt || !this.bakeFrame) return;
    const [pose, facing] = this.idleQueue.shift()!.split(":"), n = (Art.WITCH_FOOT_POSES as Record<string, { frames: number }>)[pose]?.frames ?? 0;
    if (!n) return;
    if (facing) this.runs[facing as "towards" | "away"] = Array.from({ length: n }, (_, frame) => this.bakeFrame!({ pose, frame, facing }));
    else this.idle.set(pose, Array.from({ length: n }, (_, frame) => this.bakeFrame!({ pose, frame })));
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
    // The world building behind: its progress on the bar.
    const pr = this.progress(), built = pr.total ? pr.done / pr.total : 1;
    if (pr.ready && !this.readyAt) this.readyAt = performance.now() / 1000;
    const room = this.room;
    if (!room) return;
    const ms = performance.now();
    // walking: moved by the time since the last frame (so a slow machine's seldom drawing still walks her at her speed)
    const w = this.walker ??= newWalker(room.walk), dt = this.lastT ? Math.min(.1, ms / 1000 - this.lastT) : 0, [kx, ky] = keysDir(this.held);
    this.lastT = ms / 1000;
    walk(w, room.walk, kx, ky, dt);
    this.keyHint.step(dt, w.moving);
    if (w.moving) {
      this.act = null; this.nextAct = ms / 1000 + 3;
      // walking up to a thing of hers opens its box (the hats, the rail, the mirror, the broom...)
      const at = spotAt(room.walk, w);
      if (at !== this.near) { this.near = at; if (at && at !== this.box) this.openBox(at); }
    }
    if (this.afterDraw) { this.drawGap = this.drawGap ? this.drawGap * .7 + (ms - this.drawnAt) * .3 : ms - this.drawnAt; this.afterDraw = false; }
    if (!pr.ready && !changed && this.drawGap > SLOW_FRAME && ms - this.drawnAt < (w.moving ? SLOW_WALK : SLOW_DRAW)) return;
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
    if (++this.framesDrawn > PAINT_FIRST) this.bakeIdle(t); // (her idle poses only once the room is up: its first paint first)
    if (this.idleQueue.length !== queued) this.afterDraw = false; // (nor a pose's bake)
    // her: in a pool of light (the art director: "she's the brightest figure and the rug frames her"), standing, walking about
    // the room, or hovering on her broom, bobbing; hidden behind whatever in the room stands nearer the view
    const run = this.runs[w.away ? "away" : "towards"];
    const now = this.flying ? { fr: this.frames.hover[Math.floor(t * 6) % 3], flip: w.flip }
      : w.moving && run.length ? { fr: run[Math.floor(t * 10) % run.length], flip: w.flip }
      : (() => { const s = this.standing(t); return { fr: s.fr, flip: s.flip !== w.flip }; })(), fr = now.fr;
    if (!fr) return;
    const feet = [w.x, 0, w.z], [sx, sy] = room.walk.project(feet), feetT = room.walk.depthOf(feet), bob = this.flying ? Math.round(Math.sin(t * 2) * 1.5) - 6 : 0;
    const pw = this.frames.stand[0]?.width ?? fr.width; // (her pool as wide as she stands, whatever she's doing)
    this.behind("pool", [pw], x, room, Math.round(sx - pw * 1.2), Math.round(sy) - Math.ceil(pw * .6), Math.ceil(pw * 2.4), Math.ceil(pw * 1.2), sy, feetT, true, c => pool(c, pw * 1.2, pw * .6, pw), "lighter");
    const fx = Math.round(sx - fr.width / 2), fy = Math.round(sy - fr.height + bob);
    // the walking keys, on the floor in front of where she starts (under her, should she walk over them)
    const st0 = room.a.stand; this.keyHint.draw(x, Math.round(st0[0] - KeyHint.W / 2), Math.round(st0[1] + 6), this.held);
    if (this.flying) { x.fillStyle = "rgba(0,0,0,.35)"; x.fillRect(Math.round(sx - fr.width * .25), Math.round(sy) - 1, Math.round(fr.width * .5), 2); }
    this.behind("her", [fr, now.flip], x, room, fx, fy, fr.width, fr.height, sy, feetT, false, c => { if (now.flip) { c.translate(fr.width, 0); c.scale(-1, 1); } c.drawImage(fr, 0, 0); });
  };

  /** Draws something of hers (by `paint`, into a w × h box at ox, oy on the room) with every pixel the room has nearer the view
   *  taken out: she's an upright card at her feet (feetY on the room's picture, feetT their depth), each row of her that much
   *  higher and nearer; `flat`, it lies on the floor at her feet (her pool of light). Cut once and kept (as `slot`) while what
   *  it's painted from (`what`), the room and the box stay the same. */
  private behind(slot: string, what: unknown[], x: CanvasRenderingContext2D, room: Room, ox: number, oy: number, w: number, h: number, feetY: number, feetT: number, flat: boolean, paint: (c: CanvasRenderingContext2D) => void, op: GlobalCompositeOperation = "source-over"): void {
    const key = [...what, room, ox, oy, w, h, feetY, feetT, flat], cut = this.cuts.get(slot);
    if (cut && cut.key.length === key.length && cut.key.every((v, i) => v === key[i])) { x.save(); x.globalCompositeOperation = op; x.drawImage(cut.canvas, 0, 0, w, h, ox, oy, w, h); x.restore(); return; }
    const c = cut?.canvas ?? document.createElement("canvas");
    this.cuts.set(slot, { canvas: c, key });
    if (c.width < w || c.height < h) { c.width = Math.max(c.width, w); c.height = Math.max(c.height, h); }
    const k = c.getContext("2d", { willReadFrequently: true })!;
    k.setTransform(1, 0, 0, 1, 0, 0); k.clearRect(0, 0, c.width, c.height); k.imageSmoothingEnabled = false;
    k.save(); paint(k); k.restore();
    const img = k.getImageData(0, 0, w, h), d = img.data, D = room.walk.depth, RW = room.lit.width, RH = room.lit.height;
    const up = Math.sin(room.walk.pitch) / (room.walk.s * Math.cos(room.walk.pitch)); // (a pixel higher on her: this much nearer)
    for (let j = 0; j < h; j++) {
      const ry = oy + j, me = flat ? feetT : feetT - Math.max(0, feetY - ry) * up;
      for (let i = 0; i < w; i++) {
        const a = (j * w + i) * 4 + 3;
        if (!d[a]) continue;
        const rx = ox + i;
        if (rx < 0 || ry < 0 || rx >= RW || ry >= RH) continue;
        const z = D[ry * RW + rx];
        if (z < me - OCCLUDE || (flat && z === Infinity)) d[a] = 0; // (her light only on the room, never on the night past its edge)
      }
    }
    k.putImageData(img, 0, 0);
    x.save(); x.globalCompositeOperation = op; x.drawImage(c, 0, 0, w, h, ox, oy, w, h); x.restore();
  }

  /** The whole screen on one pixel grid (Ed, 2026-10-06: "everything should be pixellated to the same level (including the
   *  menu) and be laid out in a balanced way"): the biggest whole number of device pixels to the room's art pixel `u` that fits
   *  the tapestry (PANEL wide at most, PANEL_MIN at least) and the room side by side with margins (on a tall, narrow screen,
   *  the room over the tapestry); then, in art pixels, the tapestry down the left (its title at its head, its buttons at its
   *  foot), the room centred in the rest, and the scroll by the room's front corner, where the eye goes after dressing her.
   *  `--u` on #creator is u in CSS pixels, which the panel's look is drawn in (ui/pixelUi.ts). The night behind at u too. */
  private place(W: number, H: number): void {
    const dpr = window.devicePixelRatio || 1, vw = window.innerWidth, vh = window.innerHeight, key = `${vw}x${vh}@${dpr}:${W}x${H}:${this.title.width}`;
    if (key === this.laid) return;
    this.laid = key;
    const [bx0, by0, bx1, by1] = this.room?.box ?? [0, 0, W, H], RW = bx1 - bx0, RH = by1 - by0; // (what's drawn of the room)
    const least = Math.max(PANEL_MIN, (this.title.width || 0) + 6); // (the title fits across it)
    const fits = (u: number) => { const SW = Math.floor(vw * dpr / u), SH = Math.floor(vh * dpr / u); return { SW, SH, pw: Math.min(Math.max(PANEL, least), SW - 2 * MARGIN - GAP - RW), ok: SW - 2 * MARGIN - GAP - RW >= least && RH <= SH - 2 * MARGIN }; };
    const tall = vh > vw * 1.15;
    let u = 1;
    if (tall) u = Math.max(1, Math.floor(Math.min((vw * dpr) / (RW + 2 * MARGIN), (vh * dpr * .46) / RH)));
    else for (let k = 8; k >= 1; k--) if (fits(k).ok) { u = k; break; }
    const { SW, SH } = fits(u), cu = u / dpr, px = (n: number) => `${n * cu}px`;
    this.root.style.setProperty("--u", px(1));
    // the tapestry
    const pw = tall ? SW - 2 * MARGIN : Math.max(least, fits(u).pw), sx = MARGIN, sy = tall ? RH + 2 * MARGIN : MARGIN, sh = SH - sy - MARGIN;
    Object.assign(this.sheet.style, { left: px(sx), top: px(sy), width: px(pw), height: px(sh), backgroundImage: `url(${tapestry(pw, sh)})` });
    const tw = this.title.width || 0, th = this.title.height || 0, head = th ? th + 4 : 8, foot = 22;
    Object.assign(this.title.style, { left: px(Math.floor((pw - tw) / 2)), top: px(4), width: px(tw), height: px(th) });
    Object.assign(this.body.style, { left: "0", right: "0", top: px(head), bottom: px(foot) });
    Object.assign(this.extras.style, { left: px(8), right: px(8), bottom: px(6) });
    // the room
    // (centred by what's drawn of it, its picture's own empty edges aside, kept on screen)
    const left0 = tall ? 0 : sx + pw + GAP, right0 = tall ? SW : SW - MARGIN;
    const rx = Math.max(left0 - bx0, Math.min(right0 - bx1, Math.floor((left0 + right0 - (bx0 + bx1)) / 2)));
    const ry = tall ? MARGIN - by0 : Math.max(-by0, Math.min(SH - by1, Math.floor((SH - (by0 + by1)) / 2)));
    Object.assign(this.preview.style, { width: px(W), height: px(H), left: px(rx), top: px(ry) });
    paintNight(this.night, Math.ceil(vw * dpr / u), Math.ceil(vh * dpr / u));
    // the scroll, by the room's front right corner (over the night past the floor's edge), in the corner of the screen at most
    const [cw, ch] = SpellScroll.SIZE;
    const pad = (cw - SpellScroll.ART[0]) / 2;
    this.scroll.place(px(Math.min(SW - MARGIN + pad - cw, rx + bx1 - Math.round(cw * .55))), px(Math.min(SH - MARGIN + pad - ch, ry + by1 - Math.round(ch * .7))), px(cw), px(ch));
  }
}

/** The layout in art pixels: the tapestry's widest and narrowest, the margin round the screen, the gap to the room. */
const PANEL = 196, PANEL_MIN = 184, MARGIN = 8, GAP = 10;

/** A frame this slow after drawing the room (ms) means the machine is struggling; it's then drawn this seldom (ms) until ready
 *  (and this seldom while she walks). */
const SLOW_FRAME = 50, SLOW_DRAW = 600, SLOW_WALK = 120;
/** Frames the room draws before it bakes her idle poses (one a frame): the room shows first. */
const PAINT_FIRST = 3;
/** The keys that walk her about the room (the game's own). */
const WALK_KEYS = new Set(["KeyW", "KeyA", "KeyS", "KeyD", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"]);
/** How much nearer (in the room's units along the view) a pixel of the room must be to hide her: the floor's clutter, a rug or
 *  a dropped top, never does. */
const OCCLUDE = .09;

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
type Walkable = RoomFloor & { depth: Float32Array; depthOf: (p: number[]) => number; pitch: number; s: number };
type Room = { lit: HTMLCanvasElement; banner: HTMLCanvasElement; glows: { mat: number; c: HTMLCanvasElement }[]; a: RoomAnchors; lights: Light[]; walk: Walkable; box: number[] };
function buildRoom(st: Style, S?: number): Room {
  const sp = (Art.bedroomSprite as unknown as (st: Style, o: { S?: number }) => { w: number; h: number; m: Uint8Array; anchors: RoomAnchors; scale: number; walk: Omit<Walkable, "s"> })(st, { S });
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
  // what of the picture is the room (its opaque pixels' box), to centre on screen
  let bx0 = b.w, by0 = b.h, bx1 = 0, by1 = 0;
  const LA = l2.getImageData(0, 0, b.w, b.h).data;
  for (let y = 0; y < b.h; y++) for (let x = 0; x < b.w; x++) if (LA[(y * b.w + x) * 4 + 3]) { bx0 = Math.min(bx0, x); by0 = Math.min(by0, y); bx1 = Math.max(bx1, x + 1); by1 = Math.max(by1, y + 1); }
  return { lit, banner, glows, a, lights, walk: { ...sp.walk, s: sp.scale }, box: bx1 > bx0 ? [bx0, by0, bx1, by1] : [0, 0, b.w, b.h] };
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
