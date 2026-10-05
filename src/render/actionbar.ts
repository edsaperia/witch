// The action bar (Ed, 2026-10-04: MOBA style): eight slots along the bottom of the screen, 1 2 3 4
// Q W E R, each with its key and what it does; the spell's and the dash's recharge sweep over
// theirs, bright when ready. Empty slots wait for more spells, items and totems.
import type { Game } from "../rules/game";
import { ACTION_BAR } from "../platform/input";
import { spellActive, spellCharge } from "../rules/spells";
import { dashCharge, dashing } from "../rules/dash";

const LOOK: Record<string, { icon: string; name: string }> = {
  spell: { icon: "⚡", name: "spell: speed boost" },
  dash: { icon: "»", name: "dash (on the ground)" },
  sigil: { icon: "◈", name: "put down / pick up a sigil" },
  autoTalk: { icon: "💬", name: "auto-talk on or off (also T); off, hold Shift to talk" },
};

/** The sigil slot in the treetops, where E cycles the stack. */
const CYCLE = { icon: "↻", name: "cycle the sigils (the bottom one to the top)" };

export class ActionBar {
  private root = document.createElement("div");
  private shades: (HTMLElement | null)[] = [];
  private slots: HTMLElement[] = [];
  /** Auto-talk's state (shown lit when on), and what a click on its slot does. */
  autoTalk = true;
  onAutoTalk: (() => void) | null = null;

  constructor(parent: HTMLElement) {
    this.root.id = "actionbar";
    Object.assign(this.root.style, { position: "fixed", left: "50%", bottom: "10px", transform: "translateX(-50%)", display: "flex", gap: "4px", pointerEvents: "none", zIndex: "2", font: "11px ui-monospace, Menlo, Consolas, monospace" });
    for (const s of ACTION_BAR) {
      const el = document.createElement("div"), look = s.action ? LOOK[s.action] : null;
      Object.assign(el.style, { position: "relative", width: "34px", height: "34px", border: "1px solid rgba(232,226,244,.35)", borderRadius: "5px", background: "rgba(14,11,28,.55)", color: "#e8e2f4", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", opacity: look ? "1" : "0.45" });
      el.title = look ? `${s.key}: ${look.name}` : `${s.key}: empty`;
      el.innerHTML = `<span style="font-size:16px;text-shadow:0 1px 0 #000">${look ? look.icon : ""}</span><span style="position:absolute;left:3px;top:1px;font-size:10px;color:rgba(232,226,244,.75)">${s.key}</span>`;
      let shade: HTMLElement | null = null;
      if (s.action === "spell" || s.action === "dash") {
        shade = document.createElement("div");
        Object.assign(shade.style, { position: "absolute", left: "0", right: "0", top: "0", background: "rgba(8,6,18,.7)", height: "0%" });
        el.append(shade);
      }
      if (s.action === "autoTalk") { el.style.pointerEvents = "auto"; el.style.cursor = "pointer"; el.addEventListener("pointerdown", e => { e.preventDefault(); e.stopPropagation(); this.onAutoTalk?.(); }); }
      this.shades.push(shade); this.slots.push(el);
      this.root.append(el);
    }
    parent.append(this.root);
  }

  set visible(on: boolean) { this.root.style.display = on ? "flex" : "none"; }

  update(g: Game, time: number): void {
    const W = g.witches[0];
    ACTION_BAR.forEach((s, i) => {
      const shade = this.shades[i], el = this.slots[i];
      if (s.action === "autoTalk") { el.style.borderColor = this.autoTalk ? "rgba(111,230,255,.9)" : "rgba(232,226,244,.35)"; el.style.opacity = this.autoTalk ? "1" : "0.55"; el.title = `1 / T: auto-talk ${this.autoTalk ? "on" : "off (hold Shift to talk)"}`; return; }
      // The sigil slot shows what E does now (Ed, 2026-10-05): cycle in the treetops, put down / pick up on the ground.
      if (s.action === "sigil") {
        const ground = W.body.mode === "ground" && !W.body.seated, icon = el.firstElementChild as HTMLElement;
        const look = ground ? LOOK.sigil : CYCLE;
        if (icon.textContent !== look.icon) { icon.textContent = look.icon; el.title = `${s.key}: ${look.name}`; }
        return;
      }
      if (!shade) return;
      const charge = s.action === "spell" ? spellCharge(W.spells, time) : dashCharge(W.dash, time);
      const on = s.action === "spell" ? spellActive(W.spells, time) : dashing(W.dash, time);
      const usable = s.action === "dash" ? W.body.mode === "ground" && !W.body.seated : true;
      shade.style.height = `${(1 - charge) * 100}%`;
      el.style.borderColor = on ? "#ffffff" : charge >= 1 && usable ? "rgba(111,230,255,.9)" : "rgba(232,226,244,.35)";
      el.style.opacity = usable ? "1" : "0.5";
    });
  }
}
