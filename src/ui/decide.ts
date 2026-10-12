// Ed's decisions panel (Ed, 2026-10-06: "give me labelled sliders or toggle switches down the side of the game screen, with a
// button next to it that lets me confirm my preference"). ?decide or F2 opens a slim panel down the right edge, driven by
// config/decisions.json: each entry a toggle, a choice of 2 to 4 options or a slider. A change applies at once: a tuning knob
// on the running game, or a URL switch (live where the game can take it then, else by reloading with it). Every choice is
// kept in the URL (d_<id> for knobs, the switch's own param otherwise), so a reload or a shared link keeps it.
// Confirm opens a new GitHub issue, labelled decision, filled in with the choice, the game's version and seed and the whole
// panel; Ed submits it and the coordinator acts on it. The page holds no secret: the issue is Ed's to send. Copy puts the
// same line on the clipboard instead.
import { button, h } from "./dom";
import { DECISION_LIST, decisionLine, groupOf, issueUrl, knobParam, setKnob, currentValue, valuesText, type Decision } from "./decisions";
export * from "./decisions";

/** What the panel needs from the game. */
export interface DecideHost { tuning: object; seed: number; version: string; /** URL switches the game can take while running (no reload), by param. */ live: Record<string, (v: string) => void> }

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
// slides in down the left edge: every entry of config/decisions.json (the same registry as the decisions panel) by its group,
// each change live on the frozen frame (the frozen game draws every frame: main.ts), Copy values for all of them as plain text,
// and the freeze's own stamp at its foot, so nothing else covers the game.
const PAUSE_CSS = `
#pause-sliders { position: fixed; top: 0; left: 0; bottom: 0; width: 272px; z-index: 31; display: flex; flex-direction: column; background: var(--panel, rgba(14,11,28,.86)); border-right: 1px solid var(--accent-dim, rgba(232,180,106,.45)); font: 12px/1.35 ui-monospace, Menlo, Consolas, monospace; color: var(--ink, #e8e2f4); transform: translateX(-100%); transition: transform .22s ease-out; pointer-events: auto; }
#pause-sliders.open { transform: translateX(0); }
#pause-sliders .top { padding: 9px 10px 7px; border-bottom: 1px solid rgba(232,226,244,.12); }
#pause-sliders .title { color: var(--accent, #e8b46a); font-weight: 700; font-size: 13px; }
#pause-sliders .hint { color: var(--dim, #9a93b4); margin: 2px 0 6px; }
#pause-sliders .copyall { font: inherit; width: 100%; background: transparent; color: var(--accent, #e8b46a); border: 1px solid var(--accent, #e8b46a); border-radius: 4px; padding: 4px 6px; cursor: pointer; }
#pause-sliders .copyall:hover { background: var(--accent, #e8b46a); color: #1d1408; }
#pause-sliders .status { color: var(--accent, #e8b46a); font-size: 11px; min-height: 1em; margin-top: 3px; white-space: pre-wrap; }
#pause-sliders .list { flex: 1; overflow: auto; padding: 0 10px 8px; }
#pause-sliders h3 { margin: 10px 0 2px; font-size: 12px; color: var(--accent, #e8b46a); text-transform: uppercase; letter-spacing: .06em; }
#pause-sliders .s { padding: 5px 0 6px; border-top: 1px solid rgba(232,226,244,.08); }
#pause-sliders .label { font-weight: 700; }
#pause-sliders .label.changed { color: var(--accent, #e8b46a); }
#pause-sliders .ctl { display: flex; gap: 4px; align-items: center; flex-wrap: wrap; margin-top: 2px; }
#pause-sliders input[type=range] { flex: 1; min-width: 0; accent-color: var(--accent, #e8b46a); }
#pause-sliders .val { width: 38px; text-align: right; }
#pause-sliders .opt { font: inherit; color: inherit; background: rgba(255,255,255,.07); border: 1px solid rgba(232,226,244,.25); border-radius: 4px; padding: 1px 6px; cursor: pointer; }
#pause-sliders .opt.on { background: var(--accent, #e8b46a); color: #1d1408; border-color: var(--accent, #e8b46a); }
#pause-sliders .key { color: var(--dim, #9a93b4); font-size: 11px; }
#pause-sliders .stamp { margin: 0; padding: 6px 10px; border-top: 1px solid rgba(232,226,244,.12); color: var(--dim, #9a93b4); white-space: pre; font-size: 11px; }
`;

/** The pause page's test sliders: down the left edge while the game is frozen (Esc). */
export class PauseSliders {
  readonly el = document.createElement("div");
  private values = new Map<string, string | number | boolean>();
  private readonly status = h("div", { class: "status" });
  private readonly stamp = h("pre", { class: "stamp" });

  constructor(private host: DecideHost, list: readonly Decision[] = DECISION_LIST) {
    const style = document.createElement("style"); style.textContent = PAUSE_CSS; document.head.append(style);
    this.el.id = "pause-sliders";
    const params = new URLSearchParams(location.search);
    for (const d of list) this.values.set(d.id, currentValue(d, host.tuning, params));
    const copy = button("Copy values", () => this.copy(), { class: "copyall", title: "Copy every slider's name, key, value and built default, to paste to the coordinator" });
    const top = h("div", { class: "top", html: `<div class="title">❚❚ Paused · test sliders</div><p class="hint">Esc resumes · . steps (Shift+. ten) · changes show now; double-click a slider for its built value</p>` }, copy, this.status);
    const body = h("div", { class: "list" });
    for (const g of [...new Set(list.map(groupOf))]) {
      body.append(h("h3", { text: g }));
      for (const d of list.filter(x => groupOf(x) === g)) body.append(this.row(d));
    }
    this.el.append(top, body, this.stamp);
    for (const ev of ["pointerdown", "keydown", "keyup", "wheel", "contextmenu"]) this.el.addEventListener(ev, e => { if (!(e instanceof KeyboardEvent && (e.code === "Escape" || e.code === "Period"))) e.stopPropagation(); }); // (its own presses don't fly her; Esc and . still go to the freeze)
    document.body.append(this.el);
  }

  /** Slid in (frozen) or out. */
  show(on: boolean): void { this.el.classList.toggle("open", on); if (on) this.status.textContent = ""; }
  /** The freeze's stamp (version, seed, time, where she is), at the panel's foot. */
  setStamp(text: string): void { if (this.stamp.textContent !== text) this.stamp.textContent = text; }
  /** Every value as plain text (Copy values). */
  text(): string { return valuesText(this.values, this.host.version, this.host.seed); }

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
    };
    const set = (v: string | number | boolean) => { this.values.set(d.id, v); applyDecision(this.host, d, v); paint(); this.status.textContent = ""; };
    if (d.control.type === "slider") {
      const c = d.control, r = h("input", { type: "range" }), out = h("span");
      r.min = String(c.min); r.max = String(c.max); r.step = String(c.step); out.className = "val";
      r.addEventListener("input", () => set(+r.value));
      r.addEventListener("dblclick", () => set(d.default as number));
      ctl.append(r, out);
    } else {
      const opts = d.control.type === "toggle" ? [{ value: "true", label: "On" }, { value: "false", label: "Off" }] : d.control.options;
      for (const o of opts) ctl.append(button(o.label, () => set(d.control.type === "toggle" ? o.value === "true" : o.value), { class: "opt", data: { v: o.value } }));
    }
    const box = h("div", { class: "s", data: { id: d.id }, title: d.note }, label, ctl, key);
    paint();
    return box;
  }
}
