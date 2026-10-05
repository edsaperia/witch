// The legend buffs on now (rules/buffs.ts), at the top of the screen: a small row of icons, each
// the legend's sigil glyph in its neon, its line as a tooltip. When a buff is gained or lost its
// icon flashes and a short line shows under the row for a few seconds.
import type { Game } from "../rules/game";
import { sigilColour, sigilGlyph } from "../../art/generator.js";

const G = 15, SCALE = 2, SHOW = 4;

interface Icon { el: HTMLCanvasElement; species: string }

export class BuffHud {
  private row = document.createElement("div");
  private line = document.createElement("div");
  private icons = new Map<number, Icon>();
  private lineUntil = 0;

  constructor(parent: HTMLElement) {
    Object.assign(this.row.style, { position: "fixed", left: "50%", top: "10px", transform: "translateX(-50%)", display: "flex", gap: "6px", pointerEvents: "auto", zIndex: "2" });
    Object.assign(this.line.style, { position: "fixed", left: "50%", top: `${G * SCALE + 18}px`, transform: "translateX(-50%)", font: "13px system-ui, sans-serif", whiteSpace: "nowrap", textShadow: "0 1px 0 #000, 0 0 6px #000", pointerEvents: "none", zIndex: "2", transition: "opacity .4s", opacity: "0" });
    this.row.id = "buffs";
    parent.append(this.row, this.line);
  }

  private neon(species: string): string { return `rgb(${(sigilColour(species) as number[]).join(",")})`; }

  private icon(species: string, label: string): HTMLCanvasElement {
    const c = document.createElement("canvas"), pad = 2, n = G + pad * 2;
    c.width = c.height = n;
    Object.assign(c.style, { width: `${n * SCALE}px`, height: `${n * SCALE}px`, imageRendering: "pixelated", background: "rgba(14, 11, 28, .55)", borderRadius: "4px", boxShadow: `0 0 6px ${this.neon(species)}` });
    c.title = label;
    const g = c.getContext("2d")!, m = sigilGlyph(species, G) as { w: number; m: Uint8Array };
    g.fillStyle = this.neon(species);
    for (let y = 0; y < m.w; y++) for (let x = 0; x < m.w; x++) if (m.m[y * m.w + x]) g.fillRect(x + pad, y + pad, 1, 1);
    return c;
  }

  private say(text: string, colour: string, time: number): void {
    this.line.textContent = text;
    this.line.style.color = colour;
    this.line.style.opacity = "1";
    this.lineUntil = time + SHOW;
  }

  private flash(el: HTMLElement): void {
    el.animate([{ filter: "brightness(3)", transform: "scale(1.5)" }, { filter: "brightness(1)", transform: "scale(1)" }], { duration: 900, easing: "ease-out" });
  }

  /** Match the row to the buffs on now (it compares itself, so a paused step can't repeat a flash). */
  update(g: Game, time: number): void {
    const on = new Map(g.buffs.active.map(a => [a.id, a]));
    for (const [id, ic] of this.icons) if (!on.has(id)) {
      this.icons.delete(id);
      this.flash(ic.el);
      ic.el.style.transition = "opacity .9s"; ic.el.style.opacity = "0";
      setTimeout(() => ic.el.remove(), 900);
      this.say(`Buff lost: ${ic.el.title}`, "#b8b0c8", time);
    }
    for (const [id, a] of on) if (!this.icons.has(id)) {
      const el = this.icon(a.species, a.def.label);
      this.row.append(el);
      this.icons.set(id, { el, species: a.species });
      this.flash(el);
      this.say(`Legend buff: ${a.def.label}`, this.neon(a.species), time);
    }
    if (this.lineUntil && time > this.lineUntil) { this.line.style.opacity = "0"; this.lineUntil = 0; }
  }
}
