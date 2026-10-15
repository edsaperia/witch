// The Music Lab panel on the pause page (Ed, 2026-10-14: "a music lab on the pause page", built from Kilo's mock, 2026-10-15,
// Ed's answers: down the right edge, the test sliders keeping the left; Esc resumes with the panel up so changes are heard
// in play, ✕ closes it; the bedroom gets ▶ Preview): the live Music Lab's controls (tools/music-lab/live) over the night's own
// music: a jump to any wave, section or record (genre), the singer (the A/B's alto voices, breath, the effects chain, constant
// arpeggios), the voice effects, a level with mute and solo for every part, and the settings copied out as the lab's JSON,
// pasted back, or reset. The model is app/musicLab.ts; this is its DOM, in the pause page's own look.
import { button, h } from "./dom";
import { CHAINS, ETHEREAL, FX, FX_NAMES, MODES, ROLES, WORDS, type Chain, type Voice } from "../../tools/music-lab/live/settings";
import type { MusicLab } from "../app/musicLab";
import type { Sound } from "../app/sound";
import type { Game } from "../rules/game";

export interface MusicLabHost {
  lab: MusicLab;
  sound: Sound;
  game: () => Game;
  /** Brings the next wave on, as N does. */
  nextWave: () => void;
  /** Whether no night is playing yet (the bedroom, or before the first speaker): the preview's place. */
  noNight: () => boolean;
}

const CSS = `
#music-lab { position: fixed; top: 0; right: 0; bottom: 0; width: min(360px, 100vw); z-index: 31; display: flex; flex-direction: column; background: rgba(14,11,28,.88); box-shadow: -2px 0 12px rgba(0,0,0,.5); border-left: 1px solid rgba(232,180,106,.35); font: 12px/1.35 ui-monospace, Menlo, Consolas, monospace; color: #f2ecfb; text-shadow: 0 0 2px #000; transform: translateX(105%); transition: transform .22s ease-out; }
#music-lab.open { transform: translateX(0); }
#music-lab .close { position: absolute; top: 8px; right: 10px; font: inherit; color: #d6cfe6; background: none; border: 1px solid rgba(242,236,251,.35); border-radius: 4px; padding: 1px 6px; cursor: pointer; }
#music-lab .top { padding: 9px 36px 7px 14px; }
#music-lab .title { color: var(--accent, #e8b46a); font-weight: 700; font-size: 13px; }
#music-lab .hint { color: #d6cfe6; margin: 2px 0 4px; }
#music-lab .hint b { color: var(--accent, #e8b46a); }
#music-lab .now { color: #4fe0ff; font-weight: 700; }
#music-lab .list { flex: 1; overflow-y: auto; padding: 0 12px 8px 14px; scrollbar-color: var(--accent, #e8b46a) rgba(0,0,0,.35); scrollbar-width: thin; }
#music-lab h3 { margin: 10px 0 2px; font-size: 12px; color: var(--accent, #e8b46a); letter-spacing: .04em; }
#music-lab h3 .key { font-weight: 400; letter-spacing: 0; }
#music-lab .row { display: flex; gap: 6px; align-items: center; margin: 3px 0; flex-wrap: wrap; }
#music-lab .row .name { width: 128px; flex: none; }
#music-lab .row .name.sub { color: #d6cfe6; }
#music-lab .quiet .name { opacity: .5; }
#music-lab input[type=range] { flex: 1; min-width: 60px; accent-color: var(--accent, #e8b46a); filter: drop-shadow(0 0 1px #000); }
#music-lab .val { width: 38px; text-align: right; font-variant-numeric: tabular-nums; }
#music-lab .key { color: #d6cfe6; font-size: 11px; }
#music-lab .btn { font: inherit; text-shadow: inherit; background: rgba(14,11,28,.25); color: var(--accent, #e8b46a); border: 1px solid var(--accent, #e8b46a); border-radius: 4px; padding: 3px 6px; cursor: pointer; }
#music-lab .btn:hover { background: var(--accent, #e8b46a); color: #1d1408; text-shadow: none; }
#music-lab .btn.on { background: var(--accent, #e8b46a); color: #1d1408; text-shadow: none; }
#music-lab .btn[disabled] { opacity: .45; cursor: default; }
#music-lab .opt { font: inherit; text-shadow: inherit; color: inherit; background: rgba(14,11,28,.25); border: 1px solid rgba(242,236,251,.35); border-radius: 4px; padding: 1px 6px; cursor: pointer; }
#music-lab .opt.on { background: var(--accent, #e8b46a); color: #1d1408; border-color: var(--accent, #e8b46a); text-shadow: none; }
#music-lab .tog { font: inherit; width: 20px; padding: 1px 0; color: #d6cfe6; background: rgba(14,11,28,.25); border: 1px solid rgba(242,236,251,.35); border-radius: 3px; cursor: pointer; }
#music-lab .tog.on { background: #ff5fc8; color: #1d0b16; border-color: #ff5fc8; text-shadow: none; }
#music-lab select { font: inherit; color: #f2ecfb; background: #1b1630; border: 1px solid rgba(242,236,251,.35); border-radius: 4px; padding: 2px 4px; max-width: 100%; flex: 1; min-width: 0; }
#music-lab textarea { width: 100%; box-sizing: border-box; height: 90px; font: 11px/1.3 ui-monospace, Menlo, Consolas, monospace; color: #f2ecfb; background: #1b1630; border: 1px solid rgba(242,236,251,.35); border-radius: 4px; }
#music-lab .note { color: #d6cfe6; font-size: 11px; margin: 2px 0 4px; }
#music-lab .status { color: var(--accent, #e8b46a); font-size: 11px; min-height: 1em; margin-top: 3px; white-space: pre-wrap; }
#music-lab .stamp { margin: 0; padding: 6px 12px 6px 14px; color: #d6cfe6; white-space: pre-wrap; font-size: 11px; border-top: 1px solid rgba(242,236,251,.15); }
`;

const NOTE = ["C", "C♯", "D", "E♭", "E", "F", "F♯", "G", "A♭", "A", "B♭", "B"];
const VOICE_WORDS: Partial<Record<Voice, string>> = { synth: "The game's singer", sampled: "Alto, sampled", tract: "Alto, vocal tract", fof: "FOF voice" };
const CHAIN_WORDS: Record<Chain, string> = { auto: "As the game", pure: "Pure", dark: "Dark" };
const pct = (x: number) => `${Math.round(x * 100)}%`;

export class MusicLabPanel {
  readonly el = document.createElement("div");
  private readonly now = h("span", { class: "now", text: "…" });
  private readonly stamp = h("pre", { class: "stamp" });
  private readonly status = h("div", { class: "status" });
  private readonly paints: (() => void)[] = [];
  private readonly wave = h("select");
  private readonly section = h("select");
  private readonly record = h("select");
  private readonly previewBtn: HTMLButtonElement;
  private readonly nextBtn: HTMLButtonElement;
  private readonly paste = h("textarea", { attrs: { placeholder: "Paste the lab's settings JSON here, then Load", spellcheck: "false" } });
  private readonly pasteBox: HTMLElement;
  private timer: number | null = null;
  private isFrozen = false;

  constructor(private host: MusicLabHost) {
    const style = document.createElement("style"); style.textContent = CSS; document.head.append(style);
    this.el.id = "music-lab";
    const lab = host.lab;
    const close = button("✕", () => this.show(false), { class: "close", title: "Close the panel (the settings stay as they are)" });
    const top = h("div", { class: "top" },
      h("div", { class: "title", text: "🎛 Music Lab · the night's own music" }),
      h("p", { class: "hint" }, "Playing: ", this.now),
      h("p", { class: "hint", html: "Changes go to the running music at once (a new style from the next phrase). Esc resumes with the panel up, so you hear them in play; ✕ closes it. With no night playing, <b>▶ Preview</b> plays the passage here." }));
    const list = h("div", { class: "list" });
    // ---- Jump ----
    list.append(h("h3", { text: "Jump" }));
    this.wave.addEventListener("change", () => { const v = this.wave.value; if (v === "") { lab.state.follow = true; } else { lab.state.follow = false; lab.state.wave = +v; } this.changed(); });
    this.section.addEventListener("change", () => { lab.state.section = this.section.value; if (lab.state.section) lab.state.follow = false; this.changed(); });
    this.record.addEventListener("change", () => { lab.state.record = this.record.value; this.changed(); });
    list.append(h("div", { class: "row" }, h("span", { class: "name", text: "Wave" }), this.wave));
    list.append(h("div", { class: "row" }, h("span", { class: "name", text: "Play" }), this.section));
    list.append(h("div", { class: "row" }, h("span", { class: "name", text: "Record (genre)" }), this.record));
    list.append(h("div", { class: "row" }, h("span", { class: "name", text: "Mode" }), this.choice(MODES, m => (m === lab.base.scale ? `${m} (the night's)` : m), () => lab.state.mode, m => { lab.state.mode = m; })));
    this.nextBtn = button("Next wave (N)", () => host.nextWave(), { class: "btn", title: "Bring the next wave on now, as N does" });
    this.previewBtn = button("▶ Preview", () => this.preview(!lab.previewing), { class: "btn", title: "With no night playing: play the passage above here, on its own clock; again to stop" });
    list.append(h("div", { class: "row" }, this.nextBtn, this.previewBtn));
    // ---- Singer ----
    list.append(h("h3", { text: "Singer" }));
    const voice = h("select");
    for (const v of Object.keys(VOICE_WORDS) as Voice[]) voice.append(h("option", { text: VOICE_WORDS[v]!, attrs: { value: v } }));
    voice.addEventListener("change", () => { lab.state.voice = voice.value as Voice; this.changed(); });
    this.paints.push(() => { voice.value = lab.state.voice in VOICE_WORDS ? lab.state.voice : "synth"; });
    list.append(h("div", { class: "row" }, h("span", { class: "name", text: "Voice" }), voice));
    list.append(this.slider("Breath", () => lab.state.breath ?? this.ownBreath(), v => { lab.state.breath = v; this.changed(); }, 1, () => { lab.state.breath = null; this.changed(); }, "the voice's own until moved; double-click the value for its own again"));
    list.append(h("div", { class: "row" }, h("span", { class: "name", text: "Chain" }), this.choice(CHAINS, c => CHAIN_WORDS[c], () => lab.state.chain, c => { lab.state.chain = c; lab.state.voiceFx = lab.chainFx(); })));
    list.append(h("div", { class: "row" }, h("span", { class: "name", text: "Sings" }), this.choice(["form", "arpeggio"] as const, o => (o === "form" ? "The form's melodies" : "Constant arpeggios"), () => (lab.state.arpeggio ? "arpeggio" : "form"), o => { lab.state.arpeggio = o === "arpeggio"; })));
    list.append(h("div", { class: "row" }, h("span", { class: "name", text: "Choir chords" }), this.choice(["synth", "fof"] as const, o => (o === "fof" ? "FOF choir" : "Synth choir"), () => (lab.state.fofChoir ? "fof" : "synth"), o => { lab.state.fofChoir = o === "fof"; })));
    // ---- Voice effects ----
    list.append(h("h3", { text: "Voice effects " }, h("span", { class: "key", text: "(the chain's own values to start)" })));
    list.append(h("div", { class: "row" },
      button("The game's chain", () => { lab.state.voiceFx = lab.chainFx(); this.changed(); }, { class: "btn" }),
      button("Ethereal", () => { Object.assign(lab.state.voiceFx, ETHEREAL); this.changed(); }, { class: "btn" }),
      button("All off", () => { for (const f of FX) lab.state.voiceFx[f] = 0; this.changed(); }, { class: "btn" })));
    for (const f of FX) list.append(this.slider(FX_NAMES[f], () => lab.state.voiceFx[f], v => { const was = lab.state.voiceFx[f] > 0; lab.state.voiceFx[f] = v; if (was === v > 0) lab.fxMoved(host.sound.music?.engine); else this.changed(); }, 1, () => { lab.state.voiceFx[f] = lab.chainFx()[f]; this.changed(); }));
    // ---- Levels ----
    list.append(h("h3", { text: "Levels " }, h("span", { class: "key", text: "100% is the game's · M mute · S solo" })));
    let role = "";
    const roleOf = (p: string) => lab.base.parts[p]?.role ?? "other";
    if (lab.sungPart) list.append(this.level(`${WORDS.sung ?? "Singer"} · ${lab.sungPart}`, "vocalise", () => lab.state.layers.vocalise, v => { lab.state.layers.vocalise = v; }, 1.5, 1));
    for (const p of lab.parts) {
      if (roleOf(p) !== role) { role = roleOf(p); list.append(h("p", { class: "note" }, h("b", { text: ROLES[role] ?? "Other" }))); }
      list.append(this.level(WORDS[p] ? `${WORDS[p]} · ${p}` : p, p, () => lab.state.parts[p] ?? 1, v => { lab.state.parts[p] = v; }, 2, 1));
    }
    list.append(h("div", { class: "row" }, button("Everything back on", () => { lab.state.mute = []; lab.state.solo = []; this.changed(); }, { class: "btn", title: "No mutes, no solos" })));
    // ---- Your settings ----
    list.append(h("h3", { text: "Your settings" }));
    this.pasteBox = h("div", { style: { display: "none" } }, this.paste, h("div", { class: "row" }, button("Load", () => this.load(), { class: "btn" }), button("Cancel", () => { this.pasteBox.style.display = "none"; }, { class: "btn" })));
    list.append(h("div", { class: "row" },
      button("Copy my settings", () => this.copy(), { class: "btn", title: "Only what differs from the game, as JSON: paste it to the coordinator, who bakes it in" }),
      button("Paste…", () => { this.pasteBox.style.display = this.pasteBox.style.display === "none" ? "block" : "none"; this.paste.focus(); }, { class: "btn", title: "Load settings copied from this panel or the lab page" }),
      button("Reset", () => { lab.reset(); this.refresh(); this.status.textContent = "every setting back as the game has it"; }, { class: "btn", title: "Every setting back as the game has it" })));
    list.append(this.pasteBox, this.status, h("p", { class: "note", text: "Only what differs from the game, the same text the lab page gives. Remembered on this browser." }));
    this.el.append(close, top, list, this.stamp);
    for (const ev of ["pointerdown", "keydown", "keyup", "wheel", "contextmenu"]) this.el.addEventListener(ev, e => { if (!(e instanceof KeyboardEvent && e.code === "Escape")) e.stopPropagation(); }); // (its own presses don't fly her; Esc still goes to the freeze)
    document.body.append(this.el);
    this.refresh();
  }

  /** Slid in or out; the lists of waves and sections afresh (a new night), every control at its value. */
  show(on: boolean): void {
    this.el.classList.toggle("open", on);
    if (on) { this.refresh(); this.tick(); if (this.timer === null) this.timer = window.setInterval(() => this.tick(), 300); }
    else if (this.timer !== null) { window.clearInterval(this.timer); this.timer = null; }
  }
  get open(): boolean { return this.el.classList.contains("open"); }
  /** Frozen (Esc) or playing again: the panel stays as it is (Ed: resume with it up); its hint says what's heard. */
  frozen(on: boolean): void { this.isFrozen = on; this.tick(); }

  private get engine() { return this.host.sound.music?.engine ?? null; }
  private ownBreath(): number { const lab = this.host.lab, sp = lab.state.voice !== "synth" ? ({ fof: "fofSoprano", sampled: "altoSampled", tract: "altoTract" } as Record<string, string>)[lab.state.voice] : lab.base.form?.sung.patch; return (sp ? lab.base.patches[sp]?.breath : undefined) ?? 0; }

  private changed(): void { this.host.lab.changed(); this.status.textContent = ""; this.paintAll(); }
  private paintAll(): void { for (const p of this.paints) p(); this.tick(); }

  /** The selects' options from the night as it is now, then every control painted. */
  private refresh(): void {
    const lab = this.host.lab, g = this.host.game(), set = g.musicSet, F = lab.base.families ?? {};
    this.wave.textContent = ""; this.section.textContent = ""; this.record.textContent = "";
    this.wave.append(h("option", { text: "As the night plays", attrs: { value: "" } }));
    const steps = set ? set.steps : lab.base.arc.map((a, i) => ({ wave: i, family: a.name }));
    steps.forEach((st, i) => this.wave.append(h("option", { text: `${st.wave === 0 && set ? "The countdown" : `Wave ${set ? st.wave : i + 1}`} · ${F[st.family]?.name ?? st.family}`, attrs: { value: String(i) } })));
    this.section.append(h("option", { text: "The wave's own (as the game plays it)", attrs: { value: "" } }));
    const picks = ["build", "drop", "breakdown", lab.base.victory ?? "victory"].filter(s => lab.base.sections[s]);
    const pg = h("optgroup", { attrs: { label: "Passages" } }), ag = h("optgroup", { attrs: { label: "Every section" } });
    for (const s of picks) pg.append(h("option", { text: s[0].toUpperCase() + s.slice(1), attrs: { value: s } }));
    for (const s of lab.sections) if (!picks.includes(s)) ag.append(h("option", { text: s, attrs: { value: s } }));
    this.section.append(pg, ag);
    this.record.append(h("option", { text: "The night's own", attrs: { value: "" } }));
    for (const k of lab.families) this.record.append(h("option", { text: F[k]?.name ?? k, attrs: { value: k } }));
    this.paintAll();
  }

  /** What's playing, the stamp, the buttons' states: on a timer while the panel's open. */
  private tick(): void {
    const lab = this.host.lab, e = this.engine, g = this.host.game(), noNight = this.host.noNight();
    // the selects (a paint, but the options are theirs)
    this.wave.value = lab.state.follow === false ? String(lab.state.wave) : "";
    this.section.value = lab.state.section;
    this.record.value = lab.state.record ?? "";
    if (!e?.current) this.now.textContent = this.isFrozen ? "paused" : noNight ? "nothing yet (no speaker up): ▶ Preview plays here" : "starting…";
    else {
      const c = e.current, a = e.style.arc[c.plan.arc], tr = (a?.transpose ?? 0) + (e.style.sections[c.plan.section]?.transpose ?? 0);
      const key = `${NOTE[(((e.style.root + tr) % 12) + 12) % 12]} ${a?.scale ?? e.style.scale}`;
      this.now.textContent = `${this.isFrozen ? "paused · " : ""}${lab.previewing ? "preview · " : ""}wave ${g.party.wave} · ${c.plan.section} · bar ${c.bar - c.plan.start + 1} · ${a?.name ?? "?"}, ${key}`;
    }
    this.previewBtn.textContent = lab.previewing ? "■ Stop preview" : "▶ Preview";
    this.previewBtn.classList.toggle("on", lab.previewing);
    this.previewBtn.style.display = noNight || lab.previewing ? "" : "none";
    this.nextBtn.disabled = noNight;
    const differs = lab.differs();
    this.stamp.textContent = `engine: ${e ? `live · resyncs ${e.stats.resyncs} · late ${e.stats.late}` : "not built yet"}${this.isFrozen ? " · paused (silent till Esc)" : ""}\nsettings differ: ${differs.length ? differs.join(", ") : "nothing"}`;
  }

  private preview(on: boolean): void {
    const { sound, lab } = this.host;
    if (on) sound.wake(); // (a context, if there's none yet: the first press)
    lab.preview(on, performance.now() / 1000);
    lab.changed();
    this.paintAll();
  }

  /** A slider row (no mute or solo): its name, value as a percentage; double-click the value for `dflt`. */
  private slider(name: string, get: () => number, set: (v: number) => void, max: number, dflt: () => void, note?: string): HTMLElement {
    const r = h("input", { type: "range" }), val = h("span", { class: "val" });
    r.min = "0"; r.max = String(max); r.step = "0.05";
    r.addEventListener("input", () => set(+r.value));
    val.addEventListener("dblclick", dflt);
    r.addEventListener("dblclick", dflt);
    this.paints.push(() => { if (document.activeElement !== r) r.value = String(get()); val.textContent = pct(get()); });
    return h("div", { class: "row", title: note ?? "" }, h("span", { class: "name", text: name }), r, val);
  }

  /** A part's level row with mute and solo (`key` its name in the mute and solo lists). */
  private level(name: string, key: string, get: () => number, set: (v: number) => void, max: number, dflt: number): HTMLElement {
    const lab = this.host.lab, r = h("input", { type: "range" }), val = h("span", { class: "val" });
    r.min = "0"; r.max = String(max); r.step = "0.05";
    const mute = button("M", () => this.flip("mute", key), { class: "tog", title: "Mute" }), solo = button("S", () => this.flip("solo", key), { class: "tog", title: "Solo" });
    r.addEventListener("input", () => { set(+r.value); this.changed(); });
    val.addEventListener("dblclick", () => { set(dflt); this.changed(); });
    const row = h("div", { class: "row" }, h("span", { class: "name", text: name }), r, val, mute, solo);
    this.paints.push(() => {
      if (document.activeElement !== r) r.value = String(get()); val.textContent = pct(get());
      const s = lab.state, m = s.mute.includes(key), so = s.solo.includes(key);
      mute.classList.toggle("on", m); solo.classList.toggle("on", so);
      row.classList.toggle("quiet", m || (s.solo.length > 0 && !so));
    });
    return row;
  }
  private flip(list: "mute" | "solo", key: string): void { const s = this.host.lab.state; s[list] = s[list].includes(key) ? s[list].filter(x => x !== key) : [...s[list], key]; this.changed(); }

  /** Buttons for one choice of several. */
  private choice<T extends string>(opts: readonly T[], label: (o: T) => string, get: () => T, set: (o: T) => void): HTMLElement {
    const box = h("div", { class: "row", style: { margin: "0" } });
    const btns = opts.map(o => button(label(o), () => { set(o); this.changed(); }, { class: "opt" }));
    box.append(...btns);
    this.paints.push(() => btns.forEach((b, i) => b.classList.toggle("on", opts[i] === get())));
    return box;
  }

  private copy(): void {
    const text = this.host.lab.json();
    const done = () => { this.status.textContent = "copied: paste it to the coordinator"; };
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(done, () => { this.status.textContent = text; });
    else this.status.textContent = text;
  }
  private load(): void {
    try {
      const { state, ignored } = this.host.lab.parse(this.paste.value);
      this.host.lab.load(state);
      this.pasteBox.style.display = "none";
      this.refresh();
      this.status.textContent = `loaded${ignored.length ? `; ignored: ${ignored.join(", ")}` : ""}`;
    } catch (e) { this.status.textContent = `that isn't settings JSON (${(e as Error).message})`; }
  }
}
