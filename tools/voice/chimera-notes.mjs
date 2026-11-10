// The singer's notes rendered by Chimera (Ed, 2026-11-08, of its vocalise: "This is surprisingly good!", then "yes, go for it. Go
// ahead and swap them over"), one note alone a file: Chimera (jamesondh's physical-modelling voice, MIT,
// https://github.com/jamesondh/chimera-vocal-synth, built at commit 09fb776; never vendored here) sings each MIDI note of a range on
// a syllable, its female body, as one phrase of a single long note: its own onset, breath, vibrato and release. The samples build
// (tools/samples/build.mjs, the `generated` sources) calls renderNote for every entry of samples/sources.json's chimera set, then
// trims, cuts, levels and encodes each as it does every sample; run alone, this writes the raw WAVs to listen to.
//   node tools/voice/chimera-notes.mjs <path to the chimera binary> [out dir] [lowest-highest MIDI, 55-79] [syllables, ah,ooh]
// Needs Chimera's CLI built (cargo build --release -p chimera-cli: target/release/chimera). A blended body (`mix:<female 0..1>,<child 0..1>`,
// the library's own BodyMix: the samples' is `mix:1,0.7`) needs tools/voice/chimera-bodymix.patch applied to that commit first (git apply). The renders are deterministic
// (Chimera's engine contract), so the same commit and options give the same notes.
import { execFileSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

/** How each note is sung, unless a source says otherwise: Chimera's female body, vibrato 30 (Ed's example's), a note of `beats`
 *  at `bpm` (2.6 s: past the longest sung note, a bar at the slowest record's 100 bpm, 2.4 s), `t0` s of silence before it. */
export const DEFAULTS = { body: "female", vibrato: 30, bpm: 60, beats: 2.6, t0: 0.1 };

/** Render one note with Chimera's CLI (`bin`) to the WAV `out` (48 kHz mono, 16-bit): `midi` sung on `lyric` (one syllable). */
export function renderNote(bin, { midi, lyric, body, vibrato, bpm, beats, t0 } = {}, out) {
  const o = { ...DEFAULTS, ...Object.fromEntries(Object.entries({ body, vibrato, bpm, beats, t0 }).filter(([, v]) => v !== undefined)) };
  const dir = mkdtempSync(join(tmpdir(), "witch-chimera-")), score = join(dir, "note.json");
  try {
    writeFileSync(score, JSON.stringify({ bpm: o.bpm, vibrato: o.vibrato, t0: o.t0, notes: [[midi, o.beats]], lyrics: lyric }));
    execFileSync(bin, ["render", "notes", score, resolve(out), o.body], { stdio: ["ignore", "ignore", "inherit"] });
  } finally { rmSync(dir, { recursive: true, force: true }); }
  return out;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [bin, outDir = join(tmpdir(), "chimera-notes"), range = "55-79", syllables = "ah,ooh"] = process.argv.slice(2);
  if (!bin) { console.error("usage: node tools/voice/chimera-notes.mjs <path to the chimera binary> [out dir] [lo-hi] [syllables]"); process.exit(2); }
  const [lo, hi] = range.split("-").map(Number);
  mkdirSync(outDir, { recursive: true });
  for (const lyric of syllables.split(",")) for (let midi = lo; midi <= hi; midi++) {
    const out = join(outDir, `chimera-${lyric}-${midi}.wav`);
    renderNote(bin, { midi, lyric }, out);
    console.log(out);
  }
}
