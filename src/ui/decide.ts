// Ed's decisions panel (Ed, 2026-10-06: "give me labelled sliders or toggle switches down the side of the game screen, with a
// button next to it that lets me confirm my preference"). ?decide or F2 opens a slim panel down the right edge, driven by
// config/decisions.json: each entry a toggle, a choice of 2 to 4 options or a slider. A change applies at once: a tuning knob
// on the running game, or a URL switch (live where the game can take it then, else by reloading with it). Every choice is
// kept in the URL (d_<id> for knobs, the switch's own param otherwise), so a reload or a shared link keeps it.
// Confirm opens a new GitHub issue, labelled decision, filled in with the choice, the game's version and seed and the whole
// panel; Ed submits it and the coordinator acts on it. The page holds no secret: the issue is Ed's to send. Copy puts the
// same line on the clipboard instead.
import { button, h } from "./dom";
import { byPr, changedIn, DECISION_LIST, decisionLine, groupOf, issueUrl, knobAt, knobParam, openGroups, saveOpenGroups, setKnob, currentValue, valuesText, type Decision } from "./decisions";
import { saveSetting } from "../app/settings";
import { devVolume } from "../app/playerSettings";
import { commentControls } from "./playtestComment";
export interface DecideHost { saveComment?: (text: string) => Promise<string>; restoreComment?: (file: File) => Promise<void> }
export interface DecideHost { mutate?: (label: string, action: () => void) => void }
export interface DecideHost { downloadReadableLog?: () => void }
export * from "./decisions";

/** What the panel needs from the game. */
export interface DecideHost { /** the Settings page (ui/settingsMenu.ts: Ed, 2026-10-28, its button at the very top for now) */ settings?: () => void; tuning: object; seed: number; version: string; /** URL switches the game can take while running (no reload), by param. */ live: Record<string, (v: string) => void>; /** The Report for a visual bug (ui/visualReport.ts), if the game offers it. */ report?: () => Promise<string>; /** Opens the Music Lab panel (ui/musicLabPanel.ts; Ed, 2026-10-15), if the game offers it. */ musicLab?: () => void; /** Opens the audio capacity test (tools/audio-test; Ed, 2026-10-26: "link to the page from the pause menu"), if the game offers it. */ audioTest?: () => void; /** Opens the Fight Arena in a new tab (app/fightArena.ts; Ed, 2026-10-27), if the game offers it. */ fightArena?: () => void; /** Saves the playtest log as JSON (platform/playtestLog.ts; Ed, 2026-10-29: "The \"download log\" L should also be a button on the pause menu rather than a key"), if the game offers it. */ downloadLog?: () => void; /** The debug switch "Unlock everything" (app/debugUnlock.ts; Ed, 2026-10-29): every outfit, bag, broom part, hat and island to choose, whatever she's found. */ unlockAll?: { get(): boolean; set(on: boolean): void }; /** The default look's dev tool (app/defaultLook.ts; Ed, 2026-10-29: "an easy way to select character creation defaults"): the defaults file's text from how she's dressed now, a new tab as a brand-new witch, and whether to show them (debug or Unlock everything on). */ defaults?: { text(): string; tryIt(): void; shown(): boolean }; /** Opens the finds' dev control (ui/findsPanel.ts; Ed, 2026-10-23), shown only while `findsShown` (dev tools on). */ finds?: () => void; findsShown?: () => boolean; /** The quality ladder (app/ladder.ts): its state in lines, its choices (auto, off, a rung to pin) and the one chosen. */ quality?: { lines(): string[]; options(): { value: string; label: string }[]; current(): string; choose(v: string): void } }

const CSS = `
#decide { position: fixed; top: 64px; right: 0; z-index: 30; display: flex; align-items: flex-start; font: 12px/1.35 ui-monospace, Menlo, Consolas, monospace; color: var(--ink, #e8e2f4); pointer-events: auto; }
#decide .tab { writing-mode: vertical-rl; transform: rotate(180deg); background: var(--panel, rgba(14,11,28,.82)); color: var(--accent, #e8b46a); border: 1px solid var(--accent-dim, rgba(232,180,106,.45)); border-right: 0; border-radius: 0 6px 6px 0; padding: 10px 5px; cursor: pointer; user-select: none; letter-spacing: .08em; }
#decide .body { width: 248px; max-height: calc(100vh - 150px); overflow: auto; background: var(--panel, rgba(14,11,28,.82)); border: 1px solid var(--accent-dim, rgba(232,180,106,.45)); border-right: 0; border-radius: 6px 0 0 6px; padding: 8px 10px; }
#decide.closed .body { display: none; }
#decide h2 { margin: 0 0 2px; font-size: 13px; color: var(--accent, #e8b46a); font-weight: 700; }
#decide .hint { color: var(--dim, #9a93b4); margin: 0 0 8px; }
#decide .d { border-top: 1px solid rgba(232,226,244,.12); padding: 7px 0 8px; }
#decide .row { display: flex; align-items: baseline; gap: 6px; }
#decide .label { font-weight: 700; flex: 1; }
#decide .changed { color: var(--accent, #e8b46a); }
#decide .note { color: var(--dim, #9a93b4); margin: 2px 0 5px; }
#decide .ctl { display: flex; gap: 4px; flex-wrap: wrap; align-items: center; }
#decide .opt { font: inherit; color: inherit; background: rgba(255,255,255,.07); border: 1px solid rgba(232,226,244,.25); border-radius: 4px; padding: 2px 7px; cursor: pointer; }
#decide .opt.on { background: var(--accent, #e8b46a); color: #1d1408; border-color: var(--accent, #e8b46a); }
#decide input[type=range] { flex: 1; accent-color: var(--accent, #e8b46a); min-width: 0; }
#decide .val { width: 34px; text-align: right; }
#decide .def { color: var(--dim, #9a93b4); font-size: 11px; margin-top: 3px; }
#decide .acts { display: flex; gap: 4px; margin-top: 5px; }
#decide .confirm { font: inherit; flex: 1; background: transparent; color: var(--accent, #e8b46a); border: 1px solid var(--accent, #e8b46a); border-radius: 4px; padding: 3px 6px; cursor: pointer; }
#decide .confirm:hover { background: var(--accent, #e8b46a); color: #1d1408; }
#decide .copy { font: inherit; background: transparent; color: var(--dim, #9a93b4); border: 1px solid rgba(232,226,244,.25); border-radius: 4px; padding: 3px 6px; cursor: pointer; }
#decide .sent { color: var(--accent, #e8b46a); font-size: 11px; margin-top: 3px; min-height: 1em; }
`;

/** The panel: built once, F2 (or its tab) opens and closes it. */
export class DecidePanel {
  readonly el = document.createElement("div");
  private values = new Map<string, string | number | boolean>();
  private rows = new Map<string, () => void>();

  constructor(private host: DecideHost, open: boolean) {
    const style = document.createElement("style"); style.textContent = CSS; document.head.append(style);
    this.el.id = "decide";
    const params = new URLSearchParams(location.search);
    for (const d of DECISION_LIST) this.values.set(d.id, currentValue(d, host.tuning, params));
    const tab = h("div", { class: "tab", text: "DECISIONS · F2", title: "Open or close the decisions panel (F2)", on: { click: () => this.toggle() } });
    const body = h("div", { class: "body", html: `<h2>Decisions</h2><p class="hint">Try a setting: it applies now. Confirm sends your choice (a GitHub issue to submit).</p>` });
    for (const d of DECISION_LIST) body.append(this.row(d));
    this.el.append(tab, body);
    if (!open) this.el.classList.add("closed");
    for (const ev of ["pointerdown", "keydown", "keyup", "wheel", "contextmenu"]) this.el.addEventListener(ev, e => e.stopPropagation()); // (its own presses don't fly her)
    document.body.append(this.el);
  }

  toggle(): void { this.el.classList.toggle("closed"); }

  /** The whole panel's state, for the issue. */
  state(): Record<string, unknown> { return Object.fromEntries(this.values); }

  private row(d: Decision): HTMLElement {
    const box = h("div", { class: "d", data: { id: d.id } });
    const label = h("span", { class: "label", text: d.label }), head = h("div", { class: "row" }, label);
    const note = h("div", { class: "note", text: d.note }), ctl = h("div", { class: "ctl" }), def = h("div", { class: "def" }), sent = h("div", { class: "sent" });
    const fmt = (v: unknown) => d.control.type === "choice" ? d.control.options.find(o => o.value === v)?.label ?? String(v) : d.control.type === "toggle" ? (v ? "on" : "off") : String(v);
    const paint = () => {
      const v = this.values.get(d.id), changed = v !== d.default;
      label.classList.toggle("changed", changed);
      label.textContent = (changed ? "● " : "") + d.label;
      def.textContent = `now ${fmt(v)} · shipped ${fmt(d.default)}`;
      ctl.querySelectorAll<HTMLElement>(".opt").forEach(b => b.classList.toggle("on", b.dataset.v === String(v)));
      const r = ctl.querySelector<HTMLInputElement>("input"), out = ctl.querySelector(".val");
      if (r && document.activeElement !== r) r.value = String(v);
      if (out) out.textContent = String(v);
    };
    this.rows.set(d.id, paint);
    const set = (v: string | number | boolean) => { this.values.set(d.id, v); this.apply(d, v); paint(); sent.textContent = ""; };
    if (d.control.type === "slider") {
      const c = d.control, r = h("input", { type: "range" }), out = h("span");
      r.min = String(c.min); r.max = String(c.max); r.step = String(c.step); out.className = "val";
      r.addEventListener("input", () => set(+r.value));
      r.addEventListener("dblclick", () => set(d.default as number));
      ctl.append(r, out);
    } else {
      const opts = d.control.type === "toggle" ? [{ value: "true", label: "On" }, { value: "false", label: "Off" }] : d.control.options;
      for (const o of opts) {
        ctl.append(button(o.label, () => set(d.control.type === "toggle" ? o.value === "true" : o.value), { class: "opt", data: { v: o.value } }));
      }
    }
    const confirm = button("Confirm ✓", () => {
      const v = this.values.get(d.id), url = issueUrl(d.id, v, this.state(), this.host.version, this.host.seed, location.href);
      window.open(url, "_blank", "noopener");
      sent.textContent = "opened as an issue: submit it there";
    }, { class: "confirm", title: "Open a GitHub issue with this choice, for you to submit" });
    const copy = button("copy", () => {
      const v = this.values.get(d.id), line = `${decisionLine(d.id, v)} · ${this.host.version} · seed ${this.host.seed} · ${JSON.stringify(this.state())}`;
      navigator.clipboard?.writeText(line).then(() => { sent.textContent = "copied"; }, () => { sent.textContent = line; });
    }, { class: "copy", title: "Copy this choice as a line to paste" });
    const acts = h("div", { class: "acts" }, confirm, copy);
    box.append(head, note, ctl, def, acts, sent);
    paint();
    return box;
  }

  /** Put a choice into the game, and keep it in the URL. */
  private apply(d: Decision, v: string | number | boolean): void { applyDecision(this.host, d, v); }
}

/** Put a choice into the game, and keep it in the URL: a knob live on the running game (reloading for one the game reads only as
 *  it starts), a URL switch live where the game can take it, else by reloading with it. The decisions panel's and the pause page's. */
export function applyDecision(host: DecideHost, d: Decision, v: string | number | boolean): void {
  if (host.mutate) { host.mutate(`tuning: ${d.id}`, () => applyDecisionNow(host, d, v)); return; }
  applyDecisionNow(host, d, v);
}
function applyDecisionNow(host: DecideHost, d: Decision, v: string | number | boolean): void {
  const url = new URL(location.href), isDefault = v === d.default;
  if (d.apply.knob) {
    setKnob(host.tuning, d.apply.knob, v);
    if (isDefault) url.searchParams.delete(knobParam(d.id)); else url.searchParams.set(knobParam(d.id), String(v));
    if (d.apply.reload) { if (!url.searchParams.has("decide")) url.searchParams.set("decide", ""); location.replace(url); return; } // (a knob the game reads only as it starts: the map's)
    history.replaceState(null, "", url);
    return;
  }
  const p = d.apply.param!;
  if (isDefault) url.searchParams.delete(p); else url.searchParams.set(p, String(v));
  if (!url.searchParams.has("decide")) url.searchParams.set("decide", "");
  if (d.apply.reload) { location.replace(url); return; }
  history.replaceState(null, "", url);
  host.live[p]?.(String(v));
}

// The pause page's test sliders (Ed, 2026-10-12: "For test sliders like this, we should put them all on the pause page, along
// with a button that copies all the slider names and positions"; "down the left side, sliding in from the left, scrollable, and
// the pause page shouldn't put any other overlay on the game so I can see what the sliders [do]"). Esc freezes the game and this
// slides in down the left edge, transparent over the game (Ed: "Make the panel transparent"; its text shadowed to read), its
// scrollbar along the screen's edge (Ed: "Panel scroll bar down the left edge"): every entry of config/decisions.json (the same
// registry as the decisions panel) under the PR that added it, newest first,
// each change live on the frozen frame (the frozen game draws every frame: main.ts), Copy values for all of them as plain text,
// and the freeze's own stamp at its foot, so nothing else covers the game.
const PAUSE_CSS = `
#pause-sliders .quality { margin: 6px 0 4px; padding: 5px 7px; border: 1px solid rgba(232,226,244,.2); border-radius: 5px; }
#pause-sliders .quality .qrow { display: flex; gap: 6px; align-items: center; }
#pause-sliders .quality select { font: inherit; flex: 1; background: rgba(255,255,255,.07); color: inherit; border: 1px solid rgba(232,226,244,.25); border-radius: 4px; }
#pause-sliders .quality pre { margin: 4px 0 0; white-space: pre-wrap; color: var(--dim, #9a93b4); font: inherit; }
#pause-sliders { position: fixed; top: 0; left: 0; bottom: 0; width: 280px; z-index: 31; display: flex; flex-direction: column; background: none; font: 12px/1.35 ui-monospace, Menlo, Consolas, monospace; color: #f2ecfb; text-shadow: 0 0 2px #000, 0 0 3px #000, 1px 1px 0 #000; transform: translateX(-105%); transition: transform .22s ease-out; pointer-events: none; }
#pause-sliders.open { transform: translateX(0); }
#pause-sliders.backed { background: rgba(14,11,28,.88); box-shadow: 2px 0 12px rgba(0,0,0,.5); }
#pause-sliders > * { pointer-events: auto; }
#pause-sliders .top { padding: 9px 10px 7px 16px; }
#pause-sliders .title { color: var(--accent, #e8b46a); font-weight: 700; font-size: 13px; }
#pause-sliders .hint { color: #d6cfe6; margin: 2px 0 6px; }
#pause-sliders .copyall { font: inherit; text-shadow: inherit; width: 100%; background: rgba(14,11,28,.25); color: var(--accent, #e8b46a); border: 1px solid var(--accent, #e8b46a); border-radius: 4px; padding: 4px 6px; cursor: pointer; margin-bottom: 3px; }
#pause-sliders .copyall:hover { background: var(--accent, #e8b46a); color: #1d1408; text-shadow: none; }
#pause-sliders .status { color: var(--accent, #e8b46a); font-size: 11px; min-height: 1em; margin-top: 3px; white-space: pre-wrap; }
#pause-sliders .list { flex: 1; overflow-y: auto; direction: rtl; padding: 0 10px 8px 6px; scrollbar-color: var(--accent, #e8b46a) rgba(0,0,0,.35); scrollbar-width: thin; }
#pause-sliders .list > * { direction: ltr; }
#pause-sliders .list::-webkit-scrollbar { width: 8px; }
#pause-sliders .list::-webkit-scrollbar-track { background: rgba(0,0,0,.35); }
#pause-sliders .list::-webkit-scrollbar-thumb { background: var(--accent, #e8b46a); border-radius: 4px; border: 1px solid #000; }
#pause-sliders .gh { display: flex; width: 100%; gap: 6px; align-items: baseline; margin: 6px 0 0; padding: 3px 4px; font: inherit; font-size: 12px; font-weight: 700; text-shadow: inherit; text-align: left; color: var(--accent, #e8b46a); letter-spacing: .04em; background: none; border: 0; border-bottom: 1px solid rgba(232,180,106,.35); cursor: pointer; }
#pause-sliders .gh:hover, #pause-sliders .gh:focus-visible { background: rgba(232,180,106,.14); outline: none; }
#pause-sliders .gh .mark { width: 1em; flex: none; }
#pause-sliders .gh .name { flex: 1; }
#pause-sliders .gh .count { color: #fff3dc; font-weight: 400; font-size: 11px; white-space: nowrap; }
#pause-sliders .grp.folded .rows { display: none; }
#pause-sliders .rows { padding: 0 0 4px 4px; }
#pause-sliders .s { padding: 4px 0 5px; }
#pause-sliders .label { font-weight: 700; }
#pause-sliders .label.changed { color: var(--accent, #e8b46a); }
#pause-sliders .ctl { display: flex; gap: 4px; align-items: center; flex-wrap: wrap; margin-top: 2px; }
#pause-sliders input[type=range] { flex: 1; min-width: 0; accent-color: var(--accent, #e8b46a); filter: drop-shadow(0 0 1px #000); }
#pause-sliders .val { width: 38px; text-align: right; }
#pause-sliders .swatch { width: 14px; height: 14px; flex: none; border: 1px solid rgba(242,236,251,.75); border-radius: 3px; }
#pause-sliders input.hues { appearance: none; height: 8px; border-radius: 4px; background: linear-gradient(to right, hsl(0,90%,55%), hsl(60,90%,55%), hsl(120,90%,55%), hsl(180,90%,55%), hsl(240,90%,55%), hsl(300,90%,55%), hsl(360,90%,55%)); }
#pause-sliders .opt { font: inherit; text-shadow: inherit; color: inherit; background: rgba(14,11,28,.25); border: 1px solid rgba(242,236,251,.55); border-radius: 4px; padding: 1px 6px; cursor: pointer; }
#pause-sliders .opt.on { background: var(--accent, #e8b46a); color: #1d1408; border-color: var(--accent, #e8b46a); text-shadow: none; }
#pause-sliders .key { color: #d6cfe6; font-size: 11px; }
#pause-sliders .stamp { margin: 0; padding: 6px 10px 6px 16px; color: #d6cfe6; white-space: pre; font-size: 11px; }
`;

/** The pause page's test sliders: down the left edge while the game is frozen (Esc). */
export class PauseSliders {
  readonly el = document.createElement("div");
  private values = new Map<string, string | number | boolean>();
  private readonly status = h("div", { class: "status" });
  private findsBtn: HTMLButtonElement | null = null;
  private defaultBtns: HTMLButtonElement[] = [];
  private readonly stamp = h("pre", { class: "stamp" });
  private readonly paints: (() => void)[] = [];
  private readonly heads: (() => void)[] = [];

  constructor(private host: DecideHost, private readonly list: readonly Decision[] = DECISION_LIST) {
    const style = document.createElement("style"); style.textContent = PAUSE_CSS; document.head.append(style);
    this.el.id = "pause-sliders";
    const params = new URLSearchParams(location.search);
    for (const d of list) this.values.set(d.id, currentValue(d, host.tuning, params));
    const copy = button("Copy values", () => this.copy(), { class: "copyall", title: "Copy every slider's name, key, value and built default, to paste to the coordinator" });
    const settingsBtn = host.settings ? [button("⚙ Show settings page", () => host.settings!(), { class: "copyall", title: "The player's Settings page: controls, sound, display, accessibility" })] : [];
    const U = host.unlockAll, unlockBtn = U ? button("", () => { U.set(!U.get()); paintUnlock(); this.paintDefaults(); }, { class: "copyall", title: "Debug: every outfit, bag, broom part, hat and island to choose, whatever she's found. Nothing is saved as found; off, the normal rules come back (what she wears now stays for this session)" }) : null;
    const paintUnlock = () => { if (!U || !unlockBtn) return; const on = U.get(); unlockBtn.textContent = on ? "🔓 Unlock everything: on" : "🔒 Unlock everything: off"; unlockBtn.setAttribute("aria-pressed", String(on)); unlockBtn.classList.toggle("on", on); };
    paintUnlock();
    const D = host.defaults;
    this.defaultBtns = D ? [
      button("👗 Copy look as defaults", () => { const t = D.text(), done = () => { this.status.textContent = "copied: config/default-look.json's text, to paste to the coordinator"; }; if (navigator.clipboard?.writeText) navigator.clipboard.writeText(t).then(done, () => { this.status.textContent = t; }); else this.status.textContent = t; }, { class: "copyall", title: "Dev: how she's dressed now (her look and colours, her bag, her broom's parts) as the game's default look, what a brand-new witch starts with: config/default-look.json's text, to paste back. Nothing is saved" }),
      button("✨ Try as a new witch", () => D.tryIt(), { class: "copyall", title: "Dev: a new tab playing as a brand-new witch (?newWitch=1): the default look, the starting wardrobe and broom, no hats found. Nothing of hers is read or saved there" }),
    ] : [];
    const logBtn = host.downloadLog ? [button("⬇ Download log", () => {
      this.status.textContent = "Preparing playtest log…";
      void Promise.resolve().then(() => host.downloadLog!()).then(() => { this.status.textContent = "playtest log saved"; }, error => { this.status.textContent = error instanceof Error ? error.message : "The playtest log could not be saved."; });
    }, { class: "copyall", title: "Save the playtest log (this browser's last few runs) as JSON, for the builders" })] : [];
    if (host.downloadReadableLog) logBtn.push(button("⬇ Download readable log", () => host.downloadReadableLog!(), { class: "copyall", title: "Save a text copy to read; use Download log for a builder's restore bundle" }));
    const top = h("div", { class: "top", html: `<div class="title">❚❚ Paused · test sliders</div><p class="hint">Esc resumes · . steps (Shift+. ten) · changes show now; double-click a slider for its built value</p>` }, ...settingsBtn, copy, ...logBtn, ...(unlockBtn ? [unlockBtn] : []), ...this.defaultBtns, ...(host.report ? [button("Report", () => { this.status.textContent = "drawing the frame with each neutral pair…"; void host.report!().then(t => { this.status.textContent = t; }, e => { this.status.textContent = `report failed: ${e}`; }); }, { class: "copyall", title: "For a visual bug: draw this frame with each neutral pair of settings and save a picture and a JSON (where they differ, the GPU, her place, the repro link)" })] : []), ...(host.musicLab ? [button("🎛 Music Lab", () => host.musicLab!(), { class: "copyall", title: "The night's own music with the lab's sliders, down the right edge: the singer, the levels, a jump to any wave or section; Esc resumes with it up" })] : []), ...(host.audioTest ? [button("🔊 Audio test", () => host.audioTest!(), { class: "copyall", title: "About two minutes in a new tab: the game's music under a rising sound load, with and without AudioWorklets, then Copy results for the builders" })] : []), ...(host.fightArena ? [button("⚔ Fight arena", () => host.fightArena!(), { class: "copyall", title: "In a new tab: her alone against a random wild pack (a seed you can share), with slow motion and today's attacks" })] : []), ...(host.finds ? [this.findsBtn = button("🧪 Finds", () => host.finds!(), { class: "copyall", title: "Dev: give yourself finds, or spawn one near her (the debug overlay's tools are on)" })] : []), this.status);
    const body = h("div", { class: "list" });
    if (host.saveComment && host.restoreComment) body.append(commentControls(host.saveComment, host.restoreComment));
    // (by the PR that added them, newest first: Ed, 2026-10-12, "The panel shows all the sliders in PR order")
    const ordered = byPr(list);
    // (each PR's group under a header that folds it, every one folded at first: Ed, 2026-10-26, "Can all the menu settings be grouped
    // by their title with the ability to fold, and start folded?"; the ones opened remembered on this browser)
    const open = openGroups();
    for (const g of [...new Set(ordered.map(groupOf))]) {
      const mine = ordered.filter(x => groupOf(x) === g), rows = h("div", { class: "rows" }, ...mine.map(d => this.row(d)));
      const mark = h("span", { class: "mark" }), name = h("span", { class: "name", text: g }), count = h("span", { class: "count" });
      const head = button("", () => { if (open.has(g)) open.delete(g); else open.add(g); saveOpenGroups(open); fold(); }, { class: "gh", title: `Show or hide ${g}'s sliders` });
      head.append(mark, name, count);
      const box = h("section", { class: "grp", data: { group: g } }, head, rows);
      const fold = () => { const on = open.has(g); box.classList.toggle("folded", !on); head.setAttribute("aria-expanded", String(on)); mark.textContent = on ? "▾" : "▸"; };
      this.heads.push(() => { const n = changedIn(mine, this.values); count.textContent = n ? ` ● ${n} changed` : ""; box.classList.toggle("changed", n > 0); });
      fold();
      body.append(box);
    }
    this.paintHeads();
    // (the quality ladder: where it is and why, and a rung to pin or the ladder off; app/ladder.ts)
    const Q = host.quality, quality = Q ? this.qualityBlock(Q) : null;
    this.el.append(top, ...(quality ? [quality] : []), body, this.stamp);
    for (const ev of ["pointerdown", "keydown", "keyup", "wheel", "contextmenu"]) this.el.addEventListener(ev, e => { if (!(e instanceof KeyboardEvent && (e.code === "Escape" || e.code === "Period"))) e.stopPropagation(); }); // (its own presses don't fly her; Esc and . still go to the freeze)
    document.body.append(this.el);
  }

  /** Slid in (frozen) or out; `backed` over the bedroom's own panel (Ed, 2026-10-14: paused from her room), where the
   *  see-through page would read as one with it. */
  show(on: boolean, backed = false): void {
    this.el.classList.toggle("open", on);
    this.el.classList.toggle("backed", on && backed);
    if (!on) return;
    this.status.textContent = "";
    if (this.findsBtn) this.findsBtn.style.display = this.host.findsShown?.() ? "" : "none";
    this.paintDefaults();
    // (afresh as it opens: a key may have moved a knob since, the fight's [ ] ; ' , . keys among them)
    const params = new URLSearchParams(location.search);
    for (const d of this.list) this.values.set(d.id, currentValue(d, this.host.tuning, params));
    for (const p of this.paints) p();
    this.paintHeads();
    this.paintQuality?.();
  }
  private paintQuality: (() => void) | null = null;
  /** The quality ladder's block: a line a fact (its rung, why, the GPU's time against the budget, what waits for the next load) and
   *  a choice of auto, off or a rung pinned. */
  private qualityBlock(Q: NonNullable<DecideHost["quality"]>): HTMLElement {
    const sel = h("select", { title: "Auto steps down while frames are slow and back up while there's room; off is full quality always; a rung pins it there" });
    for (const o of Q.options()) { const opt = document.createElement("option"); opt.value = o.value; opt.textContent = o.label; sel.append(opt); }
    const pre = h("pre");
    sel.addEventListener("change", () => { Q.choose(sel.value); this.paintQuality?.(); });
    this.paintQuality = () => { sel.value = Q.current(); pre.textContent = Q.lines().join("\n"); };
    this.paintQuality();
    return h("div", { class: "quality" }, h("div", { class: "qrow" }, h("b", { text: "Quality" }), sel), pre);
  }
  /** Each group's header: how many of its sliders differ from built. */
  private paintHeads(): void { for (const p of this.heads) p(); }
  /** The freeze's stamp (version, seed, time, where she is), at the panel's foot. */
  setStamp(text: string): void { if (this.stamp.textContent !== text) this.stamp.textContent = text; }
  /** Every value as plain text (Copy values). */
  text(): string { return valuesText(this.values, this.host.version, this.host.seed); }

  /** The default look's buttons, only with the debug overlay or Unlock everything on. */
  private paintDefaults(): void { const on = !!this.host.defaults?.shown(); for (const b of this.defaultBtns) b.style.display = on ? "" : "none"; }

  private copy(): void {
    const t = this.text();
    const done = () => { this.status.textContent = "copied: paste it to the coordinator"; };
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(t).then(done, () => { this.status.textContent = t; });
    else this.status.textContent = t;
  }

  private row(d: Decision): HTMLElement {
    const label = h("div", { class: "label", text: d.label, title: d.note }), ctl = h("div", { class: "ctl" });
    const key = h("div", { class: "key" });
    const fmt = (v: unknown) => d.control.type === "choice" ? d.control.options.find(o => o.value === v)?.label ?? String(v) : d.control.type === "toggle" ? (v ? "on" : "off") : String(v);
    const paint = () => {
      const v = this.values.get(d.id), changed = v !== d.default;
      label.classList.toggle("changed", changed);
      label.textContent = (changed ? "● " : "") + d.label;
      key.textContent = `${d.apply.knob ?? `?${d.apply.param}`} · built ${fmt(d.default)}${d.apply.reload ? " · reloads" : ""}`;
      ctl.querySelectorAll<HTMLElement>(".opt").forEach(b => b.classList.toggle("on", b.dataset.v === String(v)));
      const r = ctl.querySelector<HTMLInputElement>("input"), out = ctl.querySelector(".val");
      if (r && document.activeElement !== r) r.value = String(v);
      if (out) out.textContent = String(v);
      const sw = ctl.querySelector<HTMLElement>(".swatch"), S = d.control.type === "slider" ? d.control.swatch : undefined;
      if (sw && S) sw.style.background = swatchCss(Number(knobAt(this.host.tuning, S.hue)), Number(knobAt(this.host.tuning, S.sat)));
    };
    const set = (v: string | number | boolean) => { this.values.set(d.id, v); applyDecision(this.host, d, v); saveSetting(d, v); if (d.persist) devVolume(d.apply.knob, v); if (d.control.type === "slider" && d.control.swatch) for (const p of this.paints) p(); else paint(); this.paintHeads(); this.status.textContent = ""; }; // (a colour's swatch shows on its hue's and saturation's rows both) // (a persisted one, the volumes, remembered: app/settings.ts)
    if (d.control.type === "slider") {
      const c = d.control, r = h("input", { type: "range" }), out = h("span");
      r.min = String(c.min); r.max = String(c.max); r.step = String(c.step); out.className = "val";
      r.addEventListener("input", () => set(+r.value));
      r.addEventListener("dblclick", () => set(d.default as number));
      if (c.swatch?.hue === d.apply.knob) r.classList.add("hues");
      ctl.append(r, out);
      if (c.swatch) ctl.append(h("span", { class: "swatch" }));
    } else {
      const opts = d.control.type === "toggle" ? [{ value: "true", label: "On" }, { value: "false", label: "Off" }] : d.control.options;
      for (const o of opts) ctl.append(button(o.label, () => set(d.control.type === "toggle" ? o.value === "true" : o.value), { class: "opt", data: { v: o.value } }));
    }
    const box = h("div", { class: "s", data: { id: d.id }, title: d.note }, label, ctl, key);
    paint(); this.paints.push(paint);
    return box;
  }
}

/** A hue and saturation (0 to 1) at full brightness, as CSS: the colour the light takes. */
export function swatchCss(hue: number, sat: number): string {
  const f = (n: number) => { const k = (n + hue * 6) % 6; return Math.round(255 * (1 - sat * Math.max(0, Math.min(1, k, 4 - k)))); };
  return `rgb(${f(5)}, ${f(3)}, ${f(1)})`;
}
