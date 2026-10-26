// The treehouse Studio's menu (Ed, 2026-10-23; the mock, previews/ed/studio-instruments on claude/ed-shots; app/studio.ts plays
// it): it slides in from the left as she walks up to an instrument, in the station menus' look (ui/stationPanel.ts), and out as
// she steps away (Esc). Its keys as she'd press them (the drum kit's pads, the synth's and the mic's three rows of notes), each
// lit as it sounds and playable with the pointer or a touch; the sounds (5 to 9), the loop's switch, tempo and style (1 to 4), the
// synth's live controls (the arrows) and the mic's vowel; at its foot the key that leaves (E, the pad's □), a keycap.
import { keycapHtml } from "./keyHint";
import { DRUM_KEYS, NOTE_ROWS, soundsOf, STUDIO_CONFIG as S, type Control, type Instrument, type Pad, type StudioState } from "../rules/studio";

const SLIDE_MS = 220;
const NAMES: Record<Instrument, string> = { drums: "Drum kit", synth: "Modular synth", mic: "Microphone" };
const SUB: Record<Instrument, string> = { drums: "every key a drum", synth: "every key in A dorian", mic: "her voice, in A dorian" };
const PAD_NAMES: Record<Pad, string> = { kick: "Kick", kick808: "808", kickSoft: "Soft kick", kickHard: "Hard kick", snare: "Snare", rim: "Rim", clap: "Clap", snap: "Snap", hat: "Hat", openHat: "Open hat", shaker: "Shaker", cowbell: "Cowbell", tomHigh: "Tom hi", tomMid: "Tom mid", tomLow: "Tom lo", tomFloor: "Floor tom", crash: "Crash" };
const LABEL: Record<string, string> = { Space: "Space", Semicolon: ";", Quote: "'", Comma: ",", Period: ".", Slash: "/", BracketLeft: "[", BracketRight: "]", Backslash: "\\", ArrowUp: "↑", ArrowDown: "↓", ArrowLeft: "←", ArrowRight: "→" };
const keyName = (code: string) => LABEL[code] ?? code.replace(/^Key/, "");
const NOTE_NAMES = ["C", "C♯", "D", "E♭", "E", "F", "F♯", "G", "G♯", "A", "B♭", "B"];
const esc = (s: string) => s.replace(/[&<>"]/g, c => `&#${c.charCodeAt(0)};`);

export class StudioPanel {
  readonly root = document.createElement("div");
  /** A key, pad or note pressed or let go with the pointer (its key's code, as the keyboard's). */
  onPress: (code: string, down: boolean) => void = () => {};
  /** A number-row control clicked. */
  onControl: (c: Control) => void = () => {};
  private at: Instrument | null = null;
  private timer = 0;
  private lights: HTMLElement[] = [];

  constructor() {
    this.root.id = "studio-panel";
    css();
    document.body.append(this.root);
    // the pointer plays: a key down while pressed, up as it's let go (or leaves)
    let downOn: string | null = null;
    this.root.addEventListener("pointerdown", e => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-key],[data-ctl]");
      if (!el) return;
      e.preventDefault(); e.stopPropagation();
      if (el.dataset.ctl) { const [kind, n] = el.dataset.ctl.split(":"); this.onControl(kind === "sound" ? { kind, n: +n } : { kind } as Control); return; }
      downOn = el.dataset.key!; this.onPress(downOn, true);
    });
    const up = () => { if (downOn) { this.onPress(downOn, false); downOn = null; } };
    addEventListener("pointerup", up); this.root.addEventListener("pointerleave", up);
    for (const ev of ["pointerdown", "pointerup", "wheel", "contextmenu"]) this.root.addEventListener(ev, e => e.stopPropagation()); // (its presses don't fly her)
  }

  /** What she plays with (platform/input.ts device), for the key that leaves: repainted as it changes. */
  private device: "keys" | "pad" | "touch" = "keys";
  private last: StudioState | null = null;
  setDevice(d: "keys" | "pad" | "touch"): void { if (d !== this.device) { this.device = d; if (this.at && this.last) this.show(this.last); } }

  /** In with the instrument she's at, out with none; drawn afresh. */
  show(S0: StudioState): void {
    this.last = S0;
    const P = S0.players[0], at = P.at;
    clearTimeout(this.timer);
    if (!at) {
      this.root.classList.remove("in");
      this.timer = window.setTimeout(() => { if (!this.at) this.root.style.display = "none"; }, SLIDE_MS);
      this.at = null; return;
    }
    const opening = this.at !== at;
    this.at = at;
    const L = S0.loop, sounds = soundsOf(at), cur = P.sound[at];
    let html = `<div class="sp-head"><b>${NAMES[at]}</b><span>${SUB[at]}</span></div><div class="sp-body">`;
    html += `<div class="sp-shelf on"><div class="sp-lab">${at === "drums" ? "Kit" : at === "synth" ? "Patch" : "Voice"} <em>5–${4 + sounds.length}</em></div><div class="chips">${sounds.map((s, i) => `<span class="chip${i === cur ? " on" : ""}" data-ctl="sound:${i}">${esc(s.name)} <span class="k">${5 + i}</span></span>`).join("")}</div></div>`;
    if (at === "drums") {
      const rows: [string, string[]][] = [["", ["KeyQ", "KeyW", "KeyE", "KeyR", "KeyT", "KeyY", "KeyU", "KeyI", "KeyO", "KeyP"]], ["", ["KeyA", "KeyS", "KeyD", "KeyF", "KeyG", "KeyH", "KeyJ", "KeyK", "KeyL", "Semicolon"]], ["", ["KeyZ", "KeyX", "KeyC", "KeyV", "KeyB", "KeyN", "KeyM", "Comma", "Period", "Slash"]], ["", ["ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight", "Space"]]];
      html += `<div class="sp-shelf on"><div class="sp-lab">Pads <em>two hands: the home row mirrored</em></div>${rows.map(([, r]) => `<div class="pads">${r.map(c => `<div class="pad${c === "Space" ? " wide" : ""}${DRUM_KEYS[c] ? "" : " leave"}" data-key="${c}" data-pad="${DRUM_KEYS[c] ?? ""}"><b>${DRUM_KEYS[c] ? PAD_NAMES[DRUM_KEYS[c]] : "⏏"}</b><span class="k">${keyName(c)}</span></div>`).join("")}</div>`).join("")}</div>`;
    } else {
      const shown = NOTE_ROWS.slice().reverse();
      html += `<div class="sp-shelf on"><div class="sp-lab">Notes <em>three octaves${P.octave ? `, ${P.octave > 0 ? "+" : ""}${P.octave}` : ""}; Shift: one up</em></div>${shown.map((r, ri) => `<div class="keys">${r.map((c, i) => `<div class="key" data-key="${c}">${noteName(2 - ri, i, P.octave)}<span class="k">${keyName(c)}</span></div>`).join("")}</div>`).join("")}</div>`;
      if (at === "synth") html += `<div class="sp-shelf on"><div class="sp-lab">Live <em>hold the arrows</em></div><div class="sp-fit"><span>↑↓ Filter</span><div class="bar"><i data-live="cutoff"></i></div></div><div class="sp-fit"><span>← Wobble</span><div class="bar"><i data-live="wobble"></i></div></div><div class="sp-fit"><span>→ Grit</span><div class="bar"><i data-live="grit"></i></div></div><div class="chips"><span class="chip${P.latch ? " on" : ""}" data-key="Space">Hold notes <span class="k">Space</span></span></div></div>`;
      else html += `<div class="sp-shelf on"><div class="sp-lab">Sings <em>the arrows</em></div><div class="chips">${(["up", "left", "down", "right"] as const).map(d => `<span class="chip${S.mic.vowels[d] === P.vowel ? " on" : ""}" data-key="${d === "up" ? "ArrowUp" : d === "down" ? "ArrowDown" : d === "left" ? "ArrowLeft" : "ArrowRight"}">${S.mic.vowels[d]} <span class="k">${keyName(d === "up" ? "ArrowUp" : d === "down" ? "ArrowDown" : d === "left" ? "ArrowLeft" : "ArrowRight")}</span></span>`).join("")}<span class="chip" data-key="Space">Harmony <span class="k">Space</span></span></div></div>`;
    }
    html += `<div class="sp-shelf on"><div class="sp-lab">The Studio's loop <em>${L.on ? `${L.bpm} bpm` : "off"}</em></div><div class="beat">${Array.from({ length: 16 }, () => "<i></i>").join("")}</div><div class="chips"><span class="chip${L.on ? " on" : ""}" data-ctl="loop">${L.on ? "Stop" : "Start"} <span class="k">1</span></span><span class="chip" data-ctl="slower">Slower <span class="k">2</span></span><span class="chip" data-ctl="faster">Faster <span class="k">3</span></span><span class="chip" data-ctl="style">${L.style} <span class="k">4</span></span></div></div>`;
    html += `</div><div class="sp-foot">${keycapHtml(this.device === "pad" ? "SQ" : this.device === "touch" ? "TAP" : "E")}</div>`; // (the key that leaves, alone: Ed, 2026-10-26, "hint line: trim it"; Esc still does) // (keycaps, no words: Ed, 2026-10-26)
    this.root.innerHTML = html;
    this.lights = [...this.root.querySelectorAll<HTMLElement>(".beat i")];
    this.root.style.display = "flex";
    if (opening) { this.root.classList.remove("in"); void this.root.offsetWidth; }
    this.root.classList.add("in");
  }

  /** A drum pad lit for a moment. */
  flash(pad: Pad): void {
    for (const el of this.root.querySelectorAll<HTMLElement>(`[data-pad="${pad}"]`)) { el.classList.add("hit"); setTimeout(() => el.classList.remove("hit"), 120); }
  }
  /** A note's key lit while it's held. */
  flashNote(code: string, on: boolean): void { for (const el of this.root.querySelectorAll<HTMLElement>(`.key[data-key="${code}"]`)) el.classList.toggle("down", on); }
  /** The loop's sixteenth `step` lit `delay` seconds from now. */
  beat(step: number, delay: number): void {
    const el = this.lights[step]; if (!el) return;
    setTimeout(() => { for (const l of this.lights) l.classList.remove("on"); el.classList.add("on"); }, Math.max(0, delay * 1000));
  }
  /** The synth's live controls on their bars. */
  live(cutoff: number, wobble: number, grit: number): void {
    const set = (k: string, v: number) => { const el = this.root.querySelector<HTMLElement>(`[data-live="${k}"]`); if (el) el.style.left = `${Math.round(v * 100)}%`; };
    set("cutoff", Math.log(cutoff / 120) / Math.log(18000 / 120)); set("wobble", wobble); set("grit", grit);
  }
}

/** A note key's name: row `row` (0 the low), its place along it, the player's octave. */
function noteName(row: number, i: number, octave: number): string {
  const scale = [0, 2, 3, 5, 7, 9, 10], o = Math.floor(i / 7), m = S.root + 12 * (row - 1 + octave) + 12 * o + scale[i % 7];
  return NOTE_NAMES[m % 12];
}

let styled = false;
function css(): void {
  if (styled) return; styled = true;
  const s = document.createElement("style");
  s.textContent = `
#studio-panel { position: fixed; left: 0; top: 16px; bottom: 16px; width: min(420px, 46vw); z-index: 18; display: none; box-sizing: border-box; padding: 12px 14px 10px; background: var(--panel, rgba(14,11,28,.86)); color: var(--ink, #e8e2f4); border: 1px solid rgba(232,180,106,.45); border-left: 0; border-radius: 0 12px 12px 0; box-shadow: 6px 0 24px rgba(0,0,0,.5); font: 13px/1.35 ui-monospace, Menlo, Consolas, monospace; transform: translateX(-105%); transition: transform ${SLIDE_MS}ms ease-out; flex-direction: column; gap: 8px; user-select: none; touch-action: none; }
#studio-panel.in { transform: none; }
#studio-panel .sp-head { display: flex; align-items: baseline; gap: 8px; padding-bottom: 5px; border-bottom: 1px solid rgba(232,226,244,.12); }
#studio-panel .sp-head b { font-size: 18px; color: var(--accent, #e8b46a); letter-spacing: 1px; } #studio-panel .sp-head span { margin-left: auto; color: var(--dim, #9a93b4); font-size: 11px; }
#studio-panel .sp-body { flex: 1; overflow-y: auto; scrollbar-width: thin; padding-right: 4px; display: flex; flex-direction: column; gap: 10px; }
#studio-panel .sp-lab { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: var(--ink, #e8e2f4); margin-bottom: 4px; display: flex; gap: 4px; align-items: baseline; }
#studio-panel .sp-lab em { margin-left: auto; font-style: normal; text-transform: none; letter-spacing: 0; color: rgba(232,180,106,.6); }
#studio-panel .pads { display: grid; grid-template-columns: repeat(10, 1fr); gap: 3px; margin-bottom: 3px; }
#studio-panel .pad { height: 44px; border-radius: 6px; background: rgba(255,255,255,.07); border: 1px solid rgba(232,226,244,.18); display: flex; flex-direction: column; justify-content: space-between; padding: 3px 3px; box-sizing: border-box; cursor: pointer; overflow: hidden; }
#studio-panel .pad.wide { grid-column: span 6; } #studio-panel .pad.leave { opacity: .55; cursor: default; } #studio-panel .pad b { font-size: 9px; font-weight: 600; line-height: 1.1; } #studio-panel .pad .k { align-self: flex-end; }
#studio-panel .pad.hit { background: rgba(255,95,200,.45); border-color: #ff5fc8; box-shadow: 0 0 14px rgba(255,95,200,.55); }
#studio-panel .keys { display: grid; grid-template-columns: repeat(12, 1fr); gap: 3px; margin-bottom: 3px; }
#studio-panel .key { height: 46px; border-radius: 0 0 5px 5px; background: #e9e4f2; color: #2a2238; display: flex; flex-direction: column; justify-content: flex-end; align-items: center; padding-bottom: 3px; font-size: 9px; box-sizing: border-box; cursor: pointer; }
#studio-panel .key.down { background: #ff5fc8; color: #1a0a14; box-shadow: 0 0 12px rgba(255,95,200,.6); }
#studio-panel .key .k { color: #2a2238; background: rgba(0,0,0,.08); border-color: rgba(0,0,0,.25); margin-top: 2px; }
#studio-panel .chips { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
#studio-panel .chip { padding: 3px 8px; border-radius: 12px; border: 1px solid rgba(232,226,244,.25); background: rgba(255,255,255,.05); font-size: 12px; cursor: pointer; display: inline-flex; gap: 5px; align-items: center; }
#studio-panel .chip.on { background: rgba(232,180,106,.22); border-color: rgba(232,180,106,.7); }
#studio-panel .beat { display: flex; gap: 3px; } #studio-panel .beat i { flex: 1; height: 6px; border-radius: 2px; background: rgba(255,255,255,.15); } #studio-panel .beat i.on { background: #e8b46a; box-shadow: 0 0 6px #e8b46a; }
#studio-panel .sp-fit { display: flex; align-items: center; gap: 10px; padding: 2px 0; } #studio-panel .sp-fit span { width: 96px; font-size: 12px; }
#studio-panel .sp-fit .bar { position: relative; flex: 1; height: 6px; background: rgba(255,255,255,.14); border-radius: 3px; }
#studio-panel .sp-fit .bar i { position: absolute; top: -5px; width: 10px; height: 16px; margin-left: -5px; border-radius: 3px; background: var(--accent, #e8b46a); }
#studio-panel .sp-foot { font-size: 11px; color: var(--dim, #9a93b4); display: flex; align-items: center; gap: 5px; flex-wrap: wrap; }
#studio-panel .k { display: inline-grid; place-items: center; min-width: 14px; height: 15px; padding: 0 3px; border-radius: 3px; background: rgba(255,255,255,.12); border: 1px solid rgba(232,226,244,.35); border-bottom-width: 2px; color: var(--ink, #e8e2f4); font-size: 9px; }
`;
  document.head.append(s);
}
