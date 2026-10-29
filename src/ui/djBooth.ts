// Her DJ booth (Ed, 2026-10-29: "Remove record station, instead have dj booth as a station; you open it as a station, select a
// record (each record has a bpm ...) and is an item which the player will unlock. Start with 100 and 120. Underneath there's a
// button that says 'Get this party started' which you can press once a record is selected, which closes the menu and kicks off
// the scratch routine. close menu button (circle) exits the menu without starting the party."): E at her decks before the party
// (rules/wakeUp.ts, the "booth" event) slides it in from the left, as a station's panel does and in its look (ui/stationPanel.ts):
// her records as cards (rules/records.ts; the ones she hasn't found locked), and under them the button, which does nothing till a
// record is chosen. Moving only moves the focus; choose (Space or Enter, the pad's ✕) on a record chooses it, on the button starts
// the party (onStart: main.ts, rules/wakeUp.ts startParty); back (E, the pad's ○) closes it (main.ts). The keys and the pad as
// bound (platform/bindings.ts). The choosing itself is BoothNav's, without a page, for the tests.
import { RECORDS, type Vinyl } from "../rules/records";
import { bindings } from "../platform/bindings";
import { panelPad } from "./stationLines";
import { footHtml } from "./stationPanel";
import { SlideIn } from "./slideIn";

/** The booth's choosing: the focus (a record's index, or RECORDS.length for the button), the record chosen (an id, or null). */
export class BoothNav {
  focus = 0;
  chosen: string | null = null;
  constructor(readonly owned: ReadonlySet<string>, chosen: string | null = null) {
    this.chosen = chosen && owned.has(chosen) ? chosen : null;
    this.focus = this.chosen ? RECORDS.findIndex(r => r.id === this.chosen) : Math.max(0, RECORDS.findIndex(r => owned.has(r.id)));
  }
  get onButton(): boolean { return this.focus === RECORDS.length; }
  get ready(): boolean { return this.chosen !== null; }
  /** The focus moved: left and right along the records (up, from the button, back onto them); down to the button. */
  move(dx: number, dy: number): void {
    const n = RECORDS.length;
    if (dy > 0) this.focus = n;
    else if (dy < 0 && this.onButton) this.focus = this.chosen ? RECORDS.findIndex(r => r.id === this.chosen) : 0;
    else if (dx && !this.onButton) this.focus = Math.max(0, Math.min(n - 1, this.focus + dx));
  }
  /** Choose what's in focus: a record she has is chosen ("chose"); one she hasn't found, nothing ("locked"); the button starts
   *  the party with the record chosen ("start"), or does nothing without one ("none"). */
  pick(): { did: "chose" | "locked" | "start" | "none"; record?: Vinyl } {
    if (this.onButton) { const r = RECORDS.find(q => q.id === this.chosen); return r ? { did: "start", record: r } : { did: "none" }; }
    const r = RECORDS[this.focus];
    if (!this.owned.has(r.id)) return { did: "locked", record: r };
    this.chosen = r.id;
    return { did: "chose", record: r };
  }
}

const PAD_DIRS: Record<string, [number, number]> = { left: [-1, 0], right: [1, 0], up: [0, -1], down: [0, 1] };
const menuDir = (code: string): [number, number] | null => {
  for (const d of ["left", "right", "up", "down"] as const) if (bindings.keys(`menu.${d}`).includes(code)) return PAD_DIRS[d];
  return null;
};
let cssDone = false;

export class DjBooth {
  readonly root = document.createElement("div");
  private slide: SlideIn;
  private nav: BoothNav | null = null;
  private device: "keys" | "pad" | "touch" = "keys";
  private padDir = ""; private padChoose = true; private padAt = 0;
  private said = "";
  /** "Get this party started" with a record chosen (main.ts: closes it, chooses the record for next time, starts the party). */
  onStart: (r: Vinyl) => void = () => {};
  /** Back (E, the pad's ○ comes through main.ts's own close): closes it, nothing started. */
  onBack: () => void = () => {};

  constructor() {
    this.root.id = "dj-booth";
    installCss();
    document.body.append(this.root);
    this.slide = new SlideIn(this.root, "left", "flex");
    this.root.addEventListener("pointerdown", e => {
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-at]"); if (!t || !this.nav) return;
      e.preventDefault(); this.nav.focus = +t.dataset.at!; this.pick();
    });
    window.addEventListener("keydown", e => {
      if (!this.nav) return;
      const d = menuDir(e.code), pick = bindings.keys("menu.choose").includes(e.code), back = bindings.keys("menu.back").includes(e.code);
      if (!d && !pick && !back) return;
      e.preventDefault(); e.stopImmediatePropagation();
      if (d) { this.nav.move(d[0], d[1]); this.paint(); } else if (e.repeat) return; else if (pick) this.pick(); else this.onBack();
    }, true);
  }

  get isOpen(): boolean { return !!this.nav; }
  setDevice(d: "keys" | "pad" | "touch"): void { if (d !== this.device) { this.device = d; if (this.nav) this.paint(); } }

  /** Slides it in: `owned`, the records she can play; `last`, the one she chose last time (chosen again). */
  open(owned: readonly string[], last: string | null): void {
    this.nav = new BoothNav(new Set(owned), last);
    this.padChoose = true; this.said = "";
    this.paint();
    this.slide.in();
    this.root.classList.add("in");
  }
  close(): void { if (!this.nav) return; this.nav = null; this.root.classList.remove("in"); this.slide.out(); }

  /** Each frame while open: the pad's d-pad or stick moves (repeating while held), its choose chooses (once a press). */
  update(time: number): void {
    if (!this.nav) return;
    const pads = typeof navigator !== "undefined" && navigator.getGamepads ? navigator.getGamepads() : [];
    let dir = "", choose = false;
    for (const p of pads) { if (!p) continue; const P = panelPad(p.buttons.map(x => x.pressed), p.axes); choose ||= P.choose; dir ||= P.dir; }
    if (choose && !this.padChoose) this.pick();
    this.padChoose = choose;
    if (!dir) { this.padDir = ""; return; }
    if (dir !== this.padDir || time - this.padAt > 0.22) { const [dx, dy] = PAD_DIRS[dir]; this.nav.move(dx, dy); this.paint(); this.padAt = time + (dir !== this.padDir ? 0.2 : 0); }
    this.padDir = dir;
  }

  private pick(): void {
    if (!this.nav) return;
    const r = this.nav.pick();
    this.said = r.did === "locked" ? "Not found yet: one of the night's finds." : r.did === "none" ? "Choose a record first." : "";
    if (r.did === "start") { this.onStart(r.record!); return; }
    this.paint();
  }

  private paint(): void {
    const N = this.nav; if (!N) return;
    const f = (i: number) => (N.focus === i ? " focus" : "");
    const cards = RECORDS.map((r, i) => {
      const own = N.owned.has(r.id), on = N.chosen === r.id;
      return `<div class="db-card${own ? "" : " locked"}${on ? " worn" : ""}${f(i)}" data-at="${i}"><b>${r.bpm}</b><small>${own ? "" : "🔒 "}BPM</small>${on ? `<i class="db-tick">✓</i>` : ""}</div>`;
    }).join("");
    const go = `<button class="db-go${N.ready ? "" : " off"}${f(RECORDS.length)}" data-at="${RECORDS.length}"${N.ready ? "" : " aria-disabled=\"true\""}>Get this party started</button>`;
    this.root.innerHTML = `<div class="db-head"><b>DJ booth</b><span>${N.owned.size} of ${RECORDS.length} records</span></div>`
      + `<div class="db-shelf"><div class="db-lab"><b>Records</b>${N.chosen ? `<span>${RECORDS.find(r => r.id === N.chosen)!.bpm} BPM on</span>` : ""}</div><div class="db-row">${cards}</div></div>`
      + go + (this.said ? `<p class="db-said">${this.said}</p>` : "") + `<div class="db-foot">${footHtml(this.device)}</div>`;
  }
}

/** The station panel's look (ui/stationPanel.ts #station-panel), its own copy for the booth. */
function installCss(): void {
  if (cssDone) return; cssDone = true;
  const s = document.createElement("style");
  s.textContent = `
#dj-booth { --ol: #0b0716; --gold: var(--accent, #e8b46a); position: fixed; left: 0; top: 0; bottom: 0; width: 50vw; z-index: 18; box-sizing: border-box; padding: 1.1em 1.4em 0.9em; color: var(--ink, #e8e2f4);
  font: clamp(15px, 1.45vw, 26px)/1.35 ui-rounded, system-ui, sans-serif; flex-direction: column; gap: .75em; text-shadow: 0 1px 0 var(--ol);
  background: linear-gradient(90deg, rgba(11,7,22,.72) 0%, rgba(11,7,22,.55) 80%, rgba(11,7,22,0) 100%); }
#dj-booth .db-head { display: flex; align-items: baseline; gap: .6em; } #dj-booth .db-head b { font-size: 1.6em; color: var(--gold); letter-spacing: 1px; } #dj-booth .db-head span { margin-left: auto; font-size: .8em; opacity: .85; }
#dj-booth .db-shelf { display: flex; flex-direction: column; gap: .5em; padding: .7em .9em .8em; border-radius: .7em; background: rgba(38,26,62,.94); box-shadow: inset 0 0 0 2px rgba(232,180,106,.85), 0 2px 14px rgba(0,0,0,.45); }
#dj-booth .db-lab { display: flex; gap: .6em; align-items: baseline; } #dj-booth .db-lab b { font-size: 1.15em; color: var(--gold); } #dj-booth .db-lab span { font-size: .85em; opacity: .9; }
#dj-booth .db-row { display: flex; flex-wrap: wrap; gap: .45em; }
#dj-booth .db-card { position: relative; width: 4.6em; height: 4.6em; border-radius: 50%; background: radial-gradient(circle, #14101f 0 46%, #241c36 47% 50%, #14101f 51% 62%, #241c36 63% 66%, #14101f 67%); box-shadow: inset 0 0 0 1px rgba(232,226,244,.2); display: grid; place-content: center; text-align: center; cursor: pointer; }
#dj-booth .db-card b { font-size: 1.1em; line-height: 1; } #dj-booth .db-card small { font-size: .55em; opacity: .8; letter-spacing: 1px; }
#dj-booth .db-card.locked { cursor: default; opacity: .55; filter: grayscale(1); } #dj-booth .db-card.locked b { color: rgba(232,226,244,.6); } /* (its bpm greyed, the padlock by it: what's left to find, Ed 2026-10-29) */
#dj-booth .db-card.worn:not(.focus) { outline: 2px solid rgba(232,180,106,.8); outline-offset: 1px; }
#dj-booth .db-tick { position: absolute; top: .1em; right: .1em; width: 1.2em; height: 1.2em; border-radius: 50%; background: var(--gold); color: #1a1430; font: normal .75em/1.2em sans-serif; text-shadow: none; }
#dj-booth .focus { outline: 3px solid #fff; outline-offset: 2px; box-shadow: 0 0 12px rgba(255,255,255,.75); }
#dj-booth .db-go { font: inherit; font-size: 1.1em; font-weight: 600; padding: .6em 1em; border-radius: .6em; border: 0; color: #1d1408; background: var(--gold); cursor: pointer; text-shadow: none; }
#dj-booth .db-go.off { background: rgba(232,226,244,.18); color: rgba(232,226,244,.6); cursor: default; }
#dj-booth .db-said { margin: 0; font-size: .85em; opacity: .9; } #dj-booth .db-foot { margin-top: auto; font-size: .8em; opacity: .85; }
`;
  document.head.append(s);
}
