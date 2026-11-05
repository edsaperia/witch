import type { SfxKit } from "./sfxKit";
export type TelephoneCue = "dial" | "digit" | "ring" | "busy" | "unavailable" | "dead";
/** Short budgeted landline cues on the existing SFX bus; no new context, mixer or music path. */
export function telephoneCue(K: SfxKit, cue: TelephoneCue, digit = "1"): void {
  if (!K.ready(`telephone:${cue}`, cue === "digit" ? .025 : .15)) return;
  const at = K.ctx.currentTime + .005;
  const tone = (offset: number, length: number, frequencies: number[], level = .08) => {
    const g = K.ctx.createGain(); g.connect(K.voice(0, 1, offset + length + .1)); K.env(g, at + offset, level, .006, length);
    for (const frequency of frequencies) K.osc("sine", frequency, at + offset, length, g);
  };
  if (cue === "dial") tone(0, .8, [350, 440], .035);
  else if (cue === "ring") { tone(0, .32, [440, 480]); tone(.42, .32, [440, 480]); }
  else if (cue === "busy") { tone(0, .18, [480, 620]); tone(.35, .18, [480, 620]); }
  else if (cue === "unavailable") { tone(0, .2, [950]); tone(.25, .2, [1400]); tone(.5, .2, [1800]); }
  else if (cue === "dead") tone(0, .2, [180, 220], .04);
  else {
    const count = /^[0-9]$/.test(digit) ? Number(digit) || 10 : 1;
    tone(0, count * .045, [230], .02);
    for (let i = 0; i < count; i++) tone(i * .045, .012, [1100], .055);
  }
}
