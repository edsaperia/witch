// The zoo's controls (?zoo; Ed, 2026-10-13: "I can press in-game buttons to add/remove/leash each kind", "Default state: calm, with
// a Wild / Happy / Angry toggle per block", "a way to show each level ... and to make one sleep"): the block bar along the bottom
// while she's in a block (its creature, how many of each level; Add and Remove at the level picked; the block's mood; Sleep and
// Wake: rules/zooControls.ts), the jump list (J: every block, row by row, a click flies her there) and the ZOO badge where the
// clock was (no timer). Leashing is the game's own (a 💌 invite, then E for its sigil). Loaded only for a zoo (main.ts).
import { SPECIES_BY_ID } from "../../art/generator.js";
import { AREA_TYPES } from "../rules/map";
import { newCamera } from "../rules/camera";
import { witchHeight } from "../rules/witch";
import { ZOO_MOODS, blockFront, setZooMood, zooAdd, zooBlockAt, zooCount, zooMood, zooRemove, zooSleep, type ZooMood } from "../rules/zooControls";
import type { Level } from "../rules/creatures";
import type { Game } from "../rules/game";
import type { ZooBlock } from "../rules/zoo";

const LEVELS = ["Baby", "Young", "Adult", "Legend"];
const MOODS: Record<ZooMood, string> = { calm: "Calm", wild: "Wild", happy: "Happy", angry: "Angry" };
const nameOf = (b: ZooBlock) => { const a = b.area ? AREA_TYPES.find(t => t.id === b.area) : undefined; return a ? ((SPECIES_BY_ID as Record<string, { name?: string }>)[a.creature]?.name ?? a.creature) : "?"; };

/** Keeps a click or a tap on the zoo's own controls from reaching the game (a click there throws a 💌). */
function own(el: HTMLElement): HTMLElement {
  for (const ev of ["pointerdown", "pointerup", "mousedown", "mouseup", "click", "touchstart", "contextmenu", "wheel"]) el.addEventListener(ev, e => e.stopPropagation());
  return el;
}

export class ZooPanel {
  private bar = own(document.createElement("div"));
  private list = own(document.createElement("div"));
  private title = document.createElement("div");
  private counts = document.createElement("div");
  private levelBtns: HTMLButtonElement[] = [];
  private moodBtns = new Map<ZooMood, HTMLButtonElement>();
  private level: Level = 2;
  private at: ZooBlock | null = null;
  private shownKey = "";

  constructor(private game: Game) {
    document.getElementById("clock")?.style.setProperty("display", "none");
    const badge = document.createElement("div");
    badge.id = "zoo-badge"; badge.textContent = "ZOO";
    document.body.append(badge);

    this.bar.id = "zoo-bar";
    const btn = (label: string, on: () => void, title = "") => { const b = document.createElement("button"); b.textContent = label; b.title = title; b.addEventListener("click", () => { on(); this.refresh(true); }); return b; };
    const group = (label: string, ...els: HTMLElement[]) => { const g = document.createElement("div"); g.className = "group"; const l = document.createElement("span"); l.className = "label"; l.textContent = label; g.append(l, ...els); return g; };
    this.title.className = "title"; this.counts.className = "counts";
    const who = document.createElement("div"); who.className = "who"; who.append(this.title, this.counts);
    this.levelBtns = LEVELS.map((l, i) => btn(l, () => { this.level = i as Level; }, `Add and remove ${l.toLowerCase()}s`));
    for (const m of ZOO_MOODS) this.moodBtns.set(m, btn(MOODS[m], () => { if (this.at) setZooMood(this.game, this.at.cell, m); }, m === "calm" ? "Wild, but leaving you be" : ""));
    this.bar.append(who,
      group("", btn("+ Add", () => { if (this.at) zooAdd(this.game, this.at.cell, this.level); }), btn("− Remove", () => { if (this.at) zooRemove(this.game, this.at.cell); })),
      group("level", ...this.levelBtns),
      group("mood", ...this.moodBtns.values()),
      group("", btn("Sleep", () => { if (this.at) zooSleep(this.game, this.at.cell, true); }), btn("Wake", () => { if (this.at) zooSleep(this.game, this.at.cell, false); })),
      group("", btn("Jump (J)", () => this.toggleList())));
    const hint = document.createElement("div"); hint.className = "hint"; hint.textContent = "Leash one: invite it with 💌s, then pick up its sigil (E)";
    this.bar.append(hint);
    document.body.append(this.bar);

    this.list.id = "zoo-jump"; this.list.hidden = true;
    const head = document.createElement("div"); head.className = "head"; head.textContent = "Jump to (J)";
    this.list.append(head);
    const Z = game.map.zoo!;
    for (const row of Z.rowNames) {
      const r = document.createElement("div"); r.className = "row";
      const n = document.createElement("div"); n.className = "row-name"; n.textContent = row;
      const bs = document.createElement("div"); bs.className = "blocks";
      for (const b of Z.blocks.filter(k => k.row === row)) {
        const a = document.createElement("button"); a.textContent = nameOf(b); a.disabled = !b.area || b.found === false; // (an island not found yet: its lake, nothing to see)
        a.addEventListener("click", () => { this.jump(b); this.toggleList(false); });
        bs.append(a);
      }
      r.append(n, bs); this.list.append(r);
    }
    document.body.append(this.list);
    window.addEventListener("keydown", e => {
      if (e.code === "KeyJ" && !e.repeat && !(e.target instanceof HTMLInputElement)) this.toggleList();
      else if (e.code === "Escape" && !this.list.hidden) { this.toggleList(false); e.stopPropagation(); }
    }, true);
  }

  private toggleList(open = this.list.hidden): void { this.list.hidden = !open; }

  /** Flies her to a block: on the path under it, facing in, the camera with her (as the quest demo puts her down). */
  private jump(b: ZooBlock): void {
    const g = this.game, { x, z } = blockFront(g.map, b);
    g.witch = { ...g.witch, x, z, vx: 0, vz: 0, seated: false };
    g.camera = newCamera(g.tuning, x, witchHeight(g.witch, g.tuning), z);
    g.introFocus = undefined;
  }

  /** Each frame: the block she's in, and its numbers (redrawn only when they change). */
  update(): void { this.refresh(false); }

  private refresh(force: boolean): void {
    const g = this.game, b = zooBlockAt(g, g.witch.x, g.witch.z), live = b && b.area ? b : null;
    this.at = live;
    this.bar.classList.toggle("on", !!live);
    if (!live) return;
    const n = zooCount(g, live.cell), mood = zooMood(g, live.cell), key = `${live.cell}:${n}:${mood}:${this.level}`;
    if (!force && key === this.shownKey) return;
    this.shownKey = key;
    this.title.textContent = nameOf(live);
    this.counts.textContent = `${n[0]} baby · ${n[1]} young · ${n[2]} adult · ${n[3]} legend`;
    this.levelBtns.forEach((el, i) => el.classList.toggle("sel", i === this.level));
    for (const [m, el] of this.moodBtns) el.classList.toggle("sel", m === mood);
  }
}
