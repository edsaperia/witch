// Ed's decisions panel (Ed, 2026-10-06: "give me labelled sliders or toggle switches down the side of the game screen, with a
// button next to it that lets me confirm my preference"). ?decide or F2 opens a slim panel down the right edge, driven by
// config/decisions.json: each entry a toggle, a choice of 2 to 4 options or a slider. A change applies at once: a tuning knob
// on the running game, or a URL switch (live where the game can take it then, else by reloading with it). Every choice is
// kept in the URL (d_<id> for knobs, the switch's own param otherwise), so a reload or a shared link keeps it.
// Confirm opens a new GitHub issue, labelled decision, filled in with the choice, the game's version and seed and the whole
// panel; Ed submits it and the coordinator acts on it. The page holds no secret: the issue is Ed's to send. Copy puts the
// same line on the clipboard instead.
import { button, h } from "./dom";
import { DECISION_LIST, decisionLine, issueUrl, knobParam, setKnob, currentValue, type Decision } from "./decisions";
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
  private apply(d: Decision, v: string | number | boolean): void {
    const url = new URL(location.href), isDefault = v === d.default;
    if (d.apply.knob) {
      setKnob(this.host.tuning, d.apply.knob, v);
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
    this.host.live[p]?.(String(v));
  }
}
