// The research ingredients' numbers (docs/music/research.md; Ed, 2026-10-11), shared by the offline A/B renders
// (tools/music-lab/ab.ts) and the live lab with sliders (music-lab.html, tools/music-lab/live/): the CC0 kit that takes the
// synthesised drums' place, the frame drums' ritual pattern, the vocalise's level, and the recorded voices' measured pitches.

/** The drum parts the CC0 kit replaces (the kicks stay synthesised: no ripped drum machines), each a sample or two. */
export const KIT: Record<string, { ids: string[]; gain: number; soft?: string }> = {
  hat: { ids: ["hat-closed"], gain: 0.5, soft: "hat-closed-soft" }, ohat: { ids: ["hat-open"], gain: 0.35 },
  clap: { ids: ["clap-1", "clap-2"], gain: 0.6 }, snare: { ids: ["snare"], gain: 0.6 }, snap: { ids: ["rimshot"], gain: 0.5 },
  shaker: { ids: ["shaker-down", "shaker-up"], gain: 0.4 }, clank: { ids: ["claves", "log-high"], gain: 0.4 },
};
export const KICKS = ["kick", "softkick", "hardkick", "boom"];
/** The frame drums' ritual pattern over the beat (a bar: L large open, M large muted, H small open, d doum, t tek). */
export const FRAMES = ["L..t..H.M.t.H..t", "L..t..H.M.t.d.tt"];
/** The frame drums' level: 3.2 times their first renders' (Ed: "I can't hear the frame drums"; their stem measured -25 LUFS
 *  against the music's -13.5, buried under the kick). */
export const FRAMES_UP = 3.2;
export const FRAME_IDS: Record<string, string> = { L: "frame-low", M: "frame-low-muted", H: "frame-high", d: "darbuka-doum", t: "darbuka-tek" };
/** A frame-drum stroke's level and pan. */
export const frameHit = (ch: string) => ({ gain: FRAMES_UP * (ch === "L" ? 0.55 : ch === "t" ? 0.28 : 0.4), pan: ch === "t" ? 0.3 : ch === "H" ? -0.25 : 0 });
/** The vocalise's level and its presence lift (Ed: "I can't hear ... the vocalise"; it was in, at about the old soprano's
 *  level, so it didn't stand out): twice the first renders', a 3 kHz lift. */
export const VOCALISE_GAIN = 1.1, PRESENCE_DB = 6;
/** The recorded voices' pitches, measured (MIDI): the woman's sung note (G4 a little flat), the crowd's "uh" (F3 a little
 *  sharp), the cave's throat singing, the kargyraa. */
export const PITCH = { femaleNote: 67.2, crowd: 53.2, throatCave: 42.8, kargyraa: 37.1 };
/** Sections heard as a breakdown (no frame drums, whispers over them). */
export const BREAKDOWN = /breakdown|ether|whisper/;
/** The vocalise's vowels, note by note, and Pink Trombone's soprano. */
export const VOWELS = ["ah", "oh", "ee", "eh", "ah", "oo"];
export const SOPRANO = { tractLength: 36, seed: 11 };
