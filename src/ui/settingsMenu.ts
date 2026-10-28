// The Settings page (Ed, 2026-10-28: "a game settings menu where the player can [remap keys] as well as other common settings
// things (volume, choose monitor, etc)"; the mock, previews/ed/settings-menu; his answers: on the pause page, opened for now by
// "Show settings page" at the top of its dev menu). Tabs of rows in the bedroom's pixel style (ui/pixelUi.ts: Tiny5, the Jacquard
// title, gold on deep purple, cut corners), over the paused game and above its shield (platform/freeze.ts). Driven by the pad (✕
// choose, ○ back, L1/R1 tabs, △ reset), the keyboard (arrows or WASD, Enter, Esc, Q/E) or the mouse (click, drag, wheel), all
// through one navigation (ui/settingsNav.ts). Every change applies at once and is saved (app/playerSettings.ts, via the host).
import tiny5 from "./fonts/Tiny5.woff2?url";
import jacquard from "./fonts/Jacquard24.woff2?url";
import { DEFAULTS, padGlyphs, type PlayerSettings } from "../app/playerSettings";
import { PadNav, firstRow, keyInput, navigate, stepChoice, stepSlider, type NavInput, type NavRow, type NavState } from "./settingsNav";

/** What the page needs of the game. */
export interface SettingsHost {
  /** the settings now, and new ones (applied and saved at once) */
  get(): PlayerSettings;
  set(s: PlayerSettings): void;
  /** fullscreen now; going in (on `screen`, a label from `screens`, "" this window's) or out; an error to show, or null */
  fullscreen(): boolean;
  setFullscreen(on: boolean, screen: string): Promise<string | null>;
  /** whether the browser can pick a screen ("no": Firefox, Safari), and the screens' labels once asked (it may prompt) */
  canPickScreen(): boolean;
  screens(): Promise<string[] | null>;
  /** the real pad (the freeze hides it from everyone else while paused) */
  pad(): Gamepad | null;
  version: string;
}

type Row = NavRow & { label: string; sub?: string; note?: string };
const TAB_NAMES = ["Controls", "Sound", "Display", "Accessibility"];
const pct = (v: number) => `${Math.round(v * 100)}%`;

const CSS = `
@font-face { font-family: "Tiny5"; src: url(${tiny5}) format("woff2"); font-display: block; }
@font-face { font-family: "Jacquard 24"; src: url(${jacquard}) format("woff2"); font-display: block; }
#settings-page { --u: 3px; --ink: #1a1022; --gold: #f2c46a; --goldd: #b57a2c; --panel: #281a3a; --tab: #3a2850; --deep: #1d1229; --text: #efe4d4; --dim: #a898b8;
  position: fixed; inset: 0; z-index: 1003 !important; display: none; align-items: center; justify-content: center; background: rgba(12,7,18,.55);
  font-family: "Tiny5", ui-monospace, monospace; font-size: calc(var(--u) * 8); line-height: calc(var(--u) * 10); color: var(--text); -webkit-font-smoothing: none; user-select: none; }
#settings-page.open { display: flex; }
#settings-page:focus { outline: none; }
#settings-page * { box-sizing: border-box; border-radius: 0; }
#settings-page .cut { clip-path: polygon(var(--u) 0, calc(100% - var(--u)) 0, calc(100% - var(--u)) var(--u), 100% var(--u), 100% calc(100% - var(--u)), calc(100% - var(--u)) calc(100% - var(--u)), calc(100% - var(--u)) 100%, var(--u) 100%, var(--u) calc(100% - var(--u)), 0 calc(100% - var(--u)), 0 var(--u), var(--u) var(--u)); }
#settings-page .win { width: min(calc(var(--u) * 360), 96vw); max-height: 94vh; background: var(--ink); padding: var(--u); }
#settings-page .in { background: var(--panel); box-shadow: inset 0 0 0 var(--u) var(--goldd); display: flex; flex-direction: column; max-height: calc(94vh - 2 * var(--u)); }
#settings-page .title { display: flex; align-items: baseline; gap: calc(var(--u) * 6); padding: calc(var(--u) * 2) calc(var(--u) * 8) 0; }
#settings-page h1 { font-family: "Jacquard 24"; font-weight: normal; font-size: calc(var(--u) * 21); line-height: calc(var(--u) * 21); margin: 0; color: var(--gold); text-shadow: var(--u) var(--u) 0 var(--ink); }
#settings-page .ver { color: var(--dim); }
#settings-page .tabs { display: flex; gap: calc(var(--u) * 2); padding: 0 calc(var(--u) * 8); align-items: flex-end; flex-wrap: wrap; }
#settings-page .tabs button, #settings-page .bump { font: inherit; border: none; cursor: pointer; padding: calc(var(--u) * 2) calc(var(--u) * 6); background: var(--tab); color: var(--dim); box-shadow: inset 0 calc(var(--u) * -1) 0 var(--ink), inset var(--u) 0 0 #5a4472; }
#settings-page .tabs button.on { background: var(--deep); color: var(--gold); box-shadow: inset 0 var(--u) 0 var(--gold), inset var(--u) 0 0 var(--goldd), inset calc(var(--u) * -1) 0 0 var(--goldd); }
#settings-page .bump { background: none; box-shadow: none; padding: 0 0 calc(var(--u) * 2); cursor: default; }
#settings-page .body { background: var(--deep); margin: 0 calc(var(--u) * 8); padding: calc(var(--u) * 5) calc(var(--u) * 8); overflow-y: auto; box-shadow: inset 0 0 0 var(--u) var(--ink); min-height: calc(var(--u) * 120); scrollbar-color: var(--goldd) var(--deep); }
#settings-page .row { display: flex; align-items: center; gap: calc(var(--u) * 4); padding: calc(var(--u) * 1) calc(var(--u) * 4); min-height: calc(var(--u) * 13); cursor: pointer; }
#settings-page .row:hover { background: #33234a; }
#settings-page .row.focus { background: var(--tab); box-shadow: inset var(--u) 0 0 var(--gold), inset 0 0 0 var(--u) var(--goldd); }
#settings-page .row.focus .lab { color: var(--gold); }
#settings-page .lab { width: calc(var(--u) * 110); flex: 0 0 auto; }
#settings-page .lab small { color: var(--dim); font-size: calc(var(--u) * 6); margin-left: calc(var(--u) * 3); }
#settings-page .note { color: var(--dim); font-size: calc(var(--u) * 6); line-height: calc(var(--u) * 7); padding: 0 calc(var(--u) * 4) calc(var(--u) * 2) calc(var(--u) * 118); }
#settings-page .track { width: calc(var(--u) * 100); height: calc(var(--u) * 3); background: var(--ink); position: relative; box-shadow: 0 var(--u) 0 #4a3a5e; }
#settings-page .fill { position: absolute; left: 0; top: 0; bottom: 0; background: var(--goldd); }
#settings-page .thumb { position: absolute; top: calc(var(--u) * -3); width: calc(var(--u) * 5); height: calc(var(--u) * 9); margin-left: calc(var(--u) * -2.5); background: var(--gold); box-shadow: inset calc(var(--u) * -1) calc(var(--u) * -1) 0 var(--goldd), inset var(--u) var(--u) 0 #fff3c8; }
#settings-page .val { width: calc(var(--u) * 22); text-align: right; color: var(--gold); }
#settings-page .check { width: calc(var(--u) * 8); height: calc(var(--u) * 8); background: var(--ink); box-shadow: inset 0 0 0 var(--u) #6a5a7a; flex: 0 0 auto; }
#settings-page .check.on { background: var(--gold); box-shadow: inset 0 0 0 var(--u) var(--ink), inset 0 0 0 calc(var(--u) * 2) var(--gold), inset 0 0 0 calc(var(--u) * 3) var(--goldd); }
#settings-page .opts { display: flex; gap: calc(var(--u) * 2); flex-wrap: wrap; }
#settings-page .opts span { padding: 0 calc(var(--u) * 4); background: var(--tab); color: var(--dim); line-height: calc(var(--u) * 11); }
#settings-page .opts span.on { background: var(--gold); color: var(--ink); }
#settings-page .btn { padding: 0 calc(var(--u) * 5); line-height: calc(var(--u) * 11); background: #e8e0ff; color: var(--ink); box-shadow: inset 0 calc(var(--u) * -2) 0 #a898c8; }
#settings-page .foot { display: flex; gap: calc(var(--u) * 5); align-items: center; padding: calc(var(--u) * 3) calc(var(--u) * 10) calc(var(--u) * 4); color: var(--dim); flex-wrap: wrap; }
#settings-page .foot .sp { flex: 1; }
#settings-page .foot button { font: inherit; border: none; cursor: pointer; padding: 0 calc(var(--u) * 5); line-height: calc(var(--u) * 11); background: #e8e0ff; color: var(--ink); box-shadow: inset 0 calc(var(--u) * -2) 0 #a898c8; }
#settings-page .key { display: inline-block; min-width: calc(var(--u) * 10); padding: 0 calc(var(--u) * 2); line-height: calc(var(--u) * 10); text-align: center; background: #e8e0ff; color: var(--ink); box-shadow: inset 0 calc(var(--u) * -2) 0 #a898c8; margin-right: calc(var(--u) * 2); }
#settings-page .status { color: var(--gold); min-height: calc(var(--u) * 7); font-size: calc(var(--u) * 6); padding: 0 calc(var(--u) * 10); }
`;

/** The page: built once, opened over the pause page; `update` each frame reads the pad. */
export class SettingsMenu {
  readonly el = document.createElement("div");
  private state: NavState = { tab: 1, row: 0 };
  private pad = new PadNav();
  private screens: string[] | null = null;
  private status = "";
  /** the input last used: the hints at the foot follow it */
  private mode: "pad" | "keys" | "mouse" = "keys";
  onClose: () => void = () => {};

  constructor(private host: SettingsHost) {
    const style = document.createElement("style"); style.textContent = CSS; document.head.append(style);
    this.el.id = "settings-page";
    document.body.append(this.el);
    // the keyboard: first (capture), and nothing under it while open
    window.addEventListener("keydown", e => {
      if (!this.open) return;
      const i = keyInput(e.code, e.shiftKey);
      e.preventDefault(); e.stopImmediatePropagation();
      if (i && !(e.repeat && (i === "back" || i === "choose" || i === "tabPrev" || i === "tabNext"))) { this.mode = "keys"; this.input(i); }
    }, { capture: true });
    window.addEventListener("keyup", e => { if (this.open) { e.stopImmediatePropagation(); } }, { capture: true });
    // the mouse: tabs, rows (click to choose; a slider's track sets it where clicked), the foot's buttons; right click goes back
    this.el.addEventListener("pointerdown", e => {
      e.stopPropagation();
      this.mode = "mouse";
      const t = e.target as HTMLElement;
      if (t === this.el) { this.close(); return; } // (outside the window)
      const tab = t.closest<HTMLElement>("[data-tab]"), row = t.closest<HTMLElement>("[data-row]"), act = t.closest<HTMLElement>("[data-act]");
      if (e.button === 2) { this.close(); return; }
      if (tab) { this.state = { tab: Number(tab.dataset.tab), row: firstRow(this.tabs()[Number(tab.dataset.tab)]) }; this.render(); return; }
      if (act) { if (act.dataset.act === "done") this.close(); else if (act.dataset.act === "resetAll") this.resetAll(); return; }
      if (row) {
        this.state = { ...this.state, row: Number(row.dataset.row) };
        const r = this.tabs()[this.state.tab][this.state.row], track = t.closest<HTMLElement>(".track");
        if (r.kind === "slider" && track) { const b = track.getBoundingClientRect(); this.setValue(r.id, Math.min(1, Math.max(0, Math.round(((e.clientX - b.left) / b.width) * 20) / 20))); return; }
        const opt = t.closest<HTMLElement>("[data-opt]");
        if (r.kind === "choice" && opt) { this.setValue(r.id, this.optionValue(r.id, opt.dataset.opt!)); return; }
        this.input("choose");
      }
    });
    this.el.addEventListener("contextmenu", e => e.preventDefault());
    this.el.addEventListener("wheel", e => { e.preventDefault(); this.mode = "mouse"; this.input(e.deltaY > 0 ? "down" : "up"); }, { passive: false });
  }

  get open(): boolean { return this.el.classList.contains("open"); }
  show(): void {
    this.el.classList.add("open"); this.status = "";
    this.el.tabIndex = -1; this.el.focus({ preventScroll: true }); // (the keys' target inside it: the freeze lets only the pause page's own pieces have keys)
    const rows = this.tabs()[this.state.tab];
    if (!rows[this.state.row] || rows[this.state.row].hidden) this.state = { ...this.state, row: firstRow(rows) };
    this.render();
  }
  close(): void { if (!this.open) return; this.el.classList.remove("open"); this.onClose(); }

  /** Each frame while open: the pad's presses. */
  update(now: number): void {
    if (!this.open) return;
    const p = this.host.pad();
    if (!p) return;
    const ins = this.pad.read(p.buttons.map(b => b.pressed), p.axes[0] ?? 0, p.axes[1] ?? 0, now);
    if (ins.length) this.mode = "pad";
    for (const i of ins) this.input(i);
  }

  /** One input through the navigation. */
  input(i: NavInput): void {
    const { state, action } = navigate(this.state, this.tabs(), i);
    this.state = state;
    if (action.kind === "close") { this.close(); return; }
    if (action.kind === "step") this.step(action.id, action.dir);
    else if (action.kind === "reset") this.setValue(action.id, (DEFAULTS as unknown as Record<string, unknown>)[action.id]);
    else if (action.kind === "press") void this.press(action.id);
    this.render();
  }

  // ---- the rows ----

  /** Every tab's rows (rebuilt each time: some show only where they can work). */
  tabs(): Row[][] {
    const s = this.host.get(), pick = this.host.canPickScreen(), many = !!this.screens && this.screens.length > 1;
    return [
      [
        { id: "glyphs", kind: "choice", label: "Pad buttons", sub: "their names", options: ["auto", "ps", "xbox"], note: "Auto names them from your pad: Xbox's letters, else PlayStation's shapes." },
      ],
      [
        { id: "master", kind: "slider", label: "Master", sub: "everything" },
        { id: "music", kind: "slider", label: "Music" },
        { id: "effects", kind: "slider", label: "Sound effects" },
        { id: "voices", kind: "slider", label: "Voices", sub: "the babble" },
        { id: "muteBackground", kind: "toggle", label: "Mute when away", sub: "other tab or window" },
      ],
      [
        { id: "fullscreen", kind: "toggle", label: "Fullscreen", note: pick ? undefined : "To go fullscreen on another screen, move this window there first." },
        { id: "screen", kind: "choice", label: "Screen", sub: "for fullscreen", options: ["", ...(this.screens ?? (s.screen ? [s.screen] : []))], hidden: !pick, note: pick && !this.screens ? "Choose to see your screens (the browser asks once)." : pick && !many ? "Only this screen found." : undefined },
        { id: "quality", kind: "choice", label: "Quality", options: ["auto", "high", "medium", "low"], note: "Auto steps down when frames run slow, and back up." },
        { id: "shake", kind: "toggle", label: "Screen shake", sub: "hits, quakes" },
      ],
      [
        { id: "reduceFlashing", kind: "toggle", label: "Reduce flashing", sub: "warnings, hits" },
        { id: "talk", kind: "choice", label: "Talk", sub: "Shift", options: ["hold", "toggle"] },
        { id: "textSize", kind: "choice", label: "Text size", sub: "menus, hints", options: ["1", "1.25", "1.5"] },
      ],
    ];
  }

  private value(id: string): unknown { return id === "fullscreen" ? this.host.fullscreen() : (this.host.get() as unknown as Record<string, unknown>)[id]; }
  private optionValue(id: string, o: string): unknown { return id === "textSize" ? Number(o) : o; }
  private label(id: string, o: string): string {
    if (id === "screen") return o || "This one";
    if (id === "glyphs") return o === "auto" ? `Auto (${padGlyphs("auto", this.host.pad()?.id) === "xbox" ? "Xbox" : "PlayStation"})` : o === "ps" ? "PlayStation" : "Xbox";
    if (id === "textSize") return `${Math.round(Number(o) * 100)}%`;
    return o.charAt(0).toUpperCase() + o.slice(1);
  }

  private step(id: string, dir: -1 | 1): void {
    const r = this.tabs().flat().find(x => x.id === id);
    if (!r) return;
    if (id === "fullscreen") { void this.press("fullscreen"); return; }
    if (id === "screen" && !this.screens) { void this.press("screen"); return; }
    const v = this.value(id);
    if (r.kind === "slider") this.setValue(id, stepSlider(v as number, dir));
    else if (r.kind === "toggle") this.setValue(id, !v);
    else if (r.kind === "choice") this.setValue(id, this.optionValue(id, stepChoice(r.options!, String(v), dir)));
  }
  private setValue(id: string, v: unknown): void {
    if (id === "fullscreen") { void this.press("fullscreen"); return; }
    this.host.set({ ...this.host.get(), [id]: v });
    this.render();
  }
  private async press(id: string): Promise<void> {
    if (id === "fullscreen") {
      const err = await this.host.setFullscreen(!this.host.fullscreen(), this.host.get().screen);
      this.status = err ?? ""; this.render(); return;
    }
    if (id === "screen") { this.screens = (await this.host.screens()) ?? []; this.render(); }
  }
  private resetAll(): void { this.host.set({ ...DEFAULTS }); this.status = "Every setting back to its default."; this.render(); }

  // ---- drawing ----

  render(): void {
    if (!this.open) return;
    const tabs = this.tabs(), rows = tabs[this.state.tab], pad = this.mode === "pad", ps = padGlyphs(this.host.get().glyphs, this.host.pad()?.id) === "ps";
    const g = (psName: string, xbName: string) => `<span class="key">${ps ? psName : xbName}</span>`;
    const rowHtml = rows.map((r, i) => {
      if (r.hidden) return "";
      const v = this.value(r.id);
      let ctl = "";
      if (r.kind === "slider") { const n = v as number; ctl = `<span class="track"><span class="fill" style="width:${n * 100}%"></span><span class="thumb" style="left:${n * 100}%"></span></span><span class="val">${pct(n)}</span>`; }
      else if (r.kind === "toggle") ctl = `<span class="check ${v ? "on" : ""}"></span><span>${v ? "On" : "Off"}</span>`;
      else ctl = `<span class="opts">${r.options!.map(o => `<span data-opt="${o}" class="${String(v) === o ? "on" : ""}">${this.label(r.id, o)}</span>`).join("")}</span>`;
      return `<div class="row ${i === this.state.row ? "focus" : ""}" data-row="${i}"><span class="lab">${r.label}${r.sub ? `<small>${r.sub}</small>` : ""}</span>${ctl}</div>${r.note ? `<div class="note">${r.note}</div>` : ""}`;
    }).join("") + (this.state.tab === 0 ? `<div class="note" style="padding-left:calc(var(--u) * 4)">Changing keys and buttons comes with the new pad layout.</div>` : "");
    const foot = pad
      ? `<span>${g("✕", "A")}choose</span><span>${g("○", "B")}back</span><span>${g("L1", "LB")}${g("R1", "RB")}tabs</span><span>${g("△", "Y")}reset</span>`
      : this.mode === "keys"
        ? `<span><span class="key">↑↓</span><span class="key">←→</span></span><span><span class="key">Enter</span>choose</span><span><span class="key">Esc</span>back</span><span><span class="key">Q</span><span class="key">E</span>tabs</span><span><span class="key">Del</span>reset</span>`
        : `<span>click to choose · right click: back</span>`;
    this.el.innerHTML = `<div class="win cut"><div class="in">
      <div class="title"><h1>Settings</h1><span class="ver">Witch · ${this.host.version}</span></div>
      <div class="tabs">${pad ? `<span class="bump">${g("L1", "LB")}</span>` : ""}${TAB_NAMES.map((t, i) => `<button type="button" data-tab="${i}" class="${i === this.state.tab ? "on" : ""}">${t}</button>`).join("")}${pad ? `<span class="bump">${g("R1", "RB")}</span>` : ""}</div>
      <div class="body">${rowHtml}</div>
      <div class="status">${this.status}</div>
      <div class="foot">${foot}<span class="sp"></span><button type="button" data-act="resetAll">Reset all</button><button type="button" data-act="done">Done</button></div>
    </div></div>`;
    this.el.querySelector(".row.focus")?.scrollIntoView({ block: "nearest" });
  }
}
