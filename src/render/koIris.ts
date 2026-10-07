// The cut from the hat to the decks (Ed, 2026-10-07: an iris into a record, cut with a scratch rewind), inside the knockout's
// teleport (rules/knockout.ts: ko.teleportAt to ko.inAt, knockout.teleport, 1.2 s), drawn by the post composite (render/post.ts):
//   the iris closes from the dimmed screen onto her fallen hat, its brim the iris's edge, and the hat turns into a record
//   spinning up, its label pink; at the teleport's midpoint (the "cut" event, where she's moved to her decks and the music's
//   backwards scratch cuts the trumpet) the picture smears backwards for a few frames; then the iris opens on her behind the
//   decks, already scratching, the record's label fading into the picture as it opens.
// No hat, no iris (the plain sparkle); with prefers-reduced-motion, a plain cut.

/** Where the iris is, as shares of the teleport (0 its start, 1 she's in at the decks). */
export const IRIS = {
  /** closing from `from` (of the screen's height, its radius) onto the hat's brim by close (the brim at least `brim`, so the record reads at px 5) */ close: 0.28, from: 0.3, brim: 0.075,
  /** then the vinyl spreading out round the label (the brim) to `record` times it */ spread: [0.3, 0.42] as const, record: 2.2,
  /** the hat turning into the record over these */ labelIn: [0.18, 0.36] as const,
  /** the cut (the "cut" event) and the smear's half-width either side */ cut: 0.5, smear: 0.09,
  /** opening from the brim, after a beat on the record, to past the screen's corners */ openFrom: 0.6, to: 1.6,
  /** the label fading into the picture as it opens */ labelOut: [0.62, 0.86] as const,
};

export interface IrisLook {
  /** centred on the hat (before the cut) or on her at the decks (after) */ on: "hat" | "her";
  /** its radius, a share of the screen's height */ r: number;
  /** the record's label's (the hat's brim's) */ labelR: number;
  /** how dark outside it, 0 to 1 (over the knockout's dim, which holds till the cut) */ dark: number;
  /** how far the record shows over the picture inside it, 0 to 1 */ label: number;
  /** the record's turn, in turns */ spin: number;
  /** the rewind smear, 0 to 1 */ smear: number;
  /** after the cut, how far it's moved from where the hat was on screen to her (0 to 1), so the record doesn't jump */ move: number;
}

const clamp = (x: number) => Math.min(1, Math.max(0, x));
const smooth = (a: number, b: number, x: number) => { const t = clamp((x - a) / (b - a)); return t * t * (3 - 2 * t); };

/** The iris at herTime `t` in a knockout (teleportAt to inAt), or null (not in the teleport, no hat to close on, or reduced motion). */
export function koIris(ko: { teleportAt: number; inAt: number } | null | undefined, t: number, hat: boolean, reduced: boolean, brim = IRIS.brim): IrisLook | null {
  if (!ko || !hat || reduced || !(ko.inAt > ko.teleportAt) || t < ko.teleportAt || t >= ko.inAt) return null;
  const D = ko.inAt - ko.teleportAt, u = (t - ko.teleportAt) / D, I = IRIS;
  const closing = smooth(0, I.close, u), opening = u < I.openFrom ? 0 : Math.pow(clamp((u - I.openFrom) / (1 - I.openFrom)), 2.2);
  const b = Math.max(brim, I.brim), rec = b * I.record;
  const r = u < I.cut ? (u < I.close ? I.from + (b - I.from) * closing : b + (rec - b) * smooth(I.spread[0], I.spread[1], u)) : rec + (I.to - rec) * opening;
  // spinning up from the hat's first turn, on through the cut (a record's 33 rpm, sped up for the eye: about 3 turns a second at full)
  const s0 = I.labelIn[0] * D, spun = Math.max(0, t - ko.teleportAt - s0), spin = spun < 0.3 ? spun * spun * 5 : 0.45 + (spun - 0.3) * 3;
  return {
    on: u < I.cut ? "hat" : "her", r, labelR: b,
    dark: smooth(0, 0.15, u),
    label: u < I.cut ? smooth(I.labelIn[0], I.labelIn[1], u) : 1 - smooth(I.labelOut[0], I.labelOut[1], u),
    spin, smear: Math.max(0, 1 - Math.abs(u - I.cut) / I.smear), move: smooth(I.openFrom, 0.85, u),
  };
}

/** Whether she's drawn at her decks yet: from the cut, if the iris plays (else as before, late in the teleport). */
export const atDecksFrom = (ko: { teleportAt: number; inAt: number }, iris: boolean): number =>
  iris ? ko.teleportAt + (ko.inAt - ko.teleportAt) * IRIS.cut : ko.inAt - (ko.inAt - ko.teleportAt) * 0.25;
