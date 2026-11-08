// Fetches and prepares the game's samples (Ed, 2026-10-11: "import open samples"; docs/music/research.md):
// node tools/samples/build.mjs [id,...]
// For each sample in samples/sources.json: its source file from its repository at the pinned commit, then ffmpeg makes it
// mono, trims the silence before the hit, cuts it to `max` seconds with the last tenth faded out, peak-normalises it to
// -1 dBFS and encodes it as Opus in Ogg at `kbps`, into samples/<set>/<id>.ogg. It writes samples/manifest.json (each
// file's source, licence, author, credit line, the source's SHA-256 and what was done to it) and samples/CREDITS.md
// (tools/samples/credits.mjs). tools/samples/check.mjs (in npm test) checks them. Needs the network and ffmpeg; the game
// and CI only read the results, committed. A `generated` source (our own audio, rendered here: the singer's notes by Chimera,
// tools/voice/chimera-notes.mjs) needs its tool instead: CHIMERA=<path to its built CLI> node tools/samples/build.mjs chimera-ah,chimera-ooh
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync, statSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { writeCredits } from "./credits.mjs";
import { renderNote } from "../voice/chimera-notes.mjs";

const here = dirname(fileURLToPath(import.meta.url)), root = resolve(here, "../.."), dir = join(root, "samples");
const src = JSON.parse(readFileSync(join(dir, "sources.json"), "utf8")), only = process.argv[2]?.split(",");
const old = (() => { try { return JSON.parse(readFileSync(join(dir, "manifest.json"), "utf8")).files; } catch { return []; } })();
const files = [];
const tmp = join(tmpdir(), `witch-samples-${process.pid}`);
mkdirSync(tmp, { recursive: true });
for (const [set, list] of Object.entries(src.sets)) {
  for (const s of list) {
    const repo = src.repos[s.repo ?? set], file = `${set}/${s.id}.ogg`, fs = (s.repo ?? set) === "freesound";
    if (repo?.kind === "generated") {
      for (const n of notesOf(s)) {
        const nf = `${set}/${n.id}.ogg`;
        if (only && !only.includes(n.id) && !only.includes(s.id)) { const was = old.find(f => f.file === nf); if (was) files.push(was); continue; }
        files.push(generated(set, n, nf, repo));
      }
      continue;
    }
    if (only && !only.includes(s.id)) { const was = old.find(f => f.file === file); if (was) files.push(was); continue; }
    if (s.from) { files.push(derived(set, s, file)); continue; }
    // (a repository's file at its pinned commit; a Freesound sound's public preview)
    const url = fs ? s.preview : `${repo.raw}/${repo.commit}/${s.path.split("/").map(encodeURIComponent).join("/")}`;
    const raw = join(tmp, `${s.id}${fs ? ".mp3" : ".wav"}`);
    execFileSync("curl", ["-sSfL", "--max-time", "60", "-o", raw, url]);
    const sha = createHash("sha256").update(readFileSync(raw)).digest("hex");
    mkdirSync(join(dir, set), { recursive: true });
    const fade = s.bed ? Math.min(0.5, s.max * 0.1) : Math.min(0.15, s.max * 0.25);
    // mono; the silence before the hit trimmed (-50 dB); cut to max with the tail faded (a bed, `bed`: from `start`, faded in
    // too); peak to -1 dBFS (two passes: measure, then gain)
    const pre = `aformat=channel_layouts=mono,${s.bed ? `atrim=${s.start ?? 0}:${(s.start ?? 0) + s.max},asetpts=PTS-STARTPTS,afade=t=in:d=0.05` : "silenceremove=start_periods=1:start_threshold=-50dB"},atrim=0:${s.max},afade=t=out:st=${(s.max - fade).toFixed(3)}:d=${fade.toFixed(3)}`;
    const log = execFileSync("sh", ["-c", `ffmpeg -hide_banner -i "$1" -af "$2,volumedetect" -f null - 2>&1`, "_", raw, pre]).toString(); // (volumedetect reports on stderr)
    const peakOf = text => { const m = /max_volume: (-?[\d.]+|-inf) dB/.exec(text)?.[1]; return m === undefined || m === "-inf" ? -Infinity : Number(m); };
    const srcPeak = peakOf(execFileSync("sh", ["-c", `ffmpeg -hide_banner -i "$1" -af volumedetect -f null - 2>&1`, "_", raw]).toString());
    // (VCSL's frame drums' hand hits peak at -56 to -60 dB: nearly silent, refused)
    if (!(srcPeak > -40)) throw new Error(`${s.id}: its source peaks at ${srcPeak} dB, nearly silent (${s.path})`);
    const peak = peakOf(log), gain = -1 - peak;
    const out = join(dir, file);
    execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", "-i", raw, "-af", `${pre},volume=${gain.toFixed(2)}dB`, "-ar", "48000", "-c:a", "libopus", "-b:a", `${src.kbps}k`, "-application", "audio", out]);
    const source = fs ? `https://freesound.org/people/${s.user}/sounds/${s.sound}/` : `${repo.url}/blob/${repo.commit}/${s.path.split("/").map(encodeURIComponent).join("/")}`;
    const licence = s.licence ?? repo.licence, author = fs ? s.user : repo.author;
    files.push({
      file, what: s.what, source, licence, author,
      credit: fs ? `"${s.what}" by ${s.user} on Freesound (${licence})` : `${s.what}: ${repo.name}, ${repo.author} (${licence})`, sourceSha256: sha,
      processing: `mono, leading silence trimmed, cut to ${s.max} s with a ${fade.toFixed(2)} s fade, peak-normalised to -1 dBFS (${gain >= 0 ? "+" : ""}${gain.toFixed(1)} dB), Opus ${src.kbps} kbps`,
      bytes: statSync(out).size,
    });
    console.log(`${file.padEnd(28)} ${(statSync(out).size / 1024).toFixed(1).padStart(6)} KB  ${s.what}`);
  }
}
rmSync(tmp, { recursive: true, force: true });

/** A sample made from one already built (Ed's singer review, 2026-10-14: the alto's sample set): `from` (set/id) shifted by
 *  `semitones` with its formants kept (ffmpeg's rubberband filter: Rubber Band is GPL, so it runs here, offline, and nothing of
 *  it ships; the output is a recording, not code), its first `skip` seconds dropped (the woman's note starts 20 cents flat),
 *  cut to `max` with the tail faded, peak-normalised, Opus. Its licence, author and source are its source's. */
function derived(set, s, file) {
  const from = old.find(f => f.file === `${s.from}.ogg`);
  if (!from) throw new Error(`${s.id}: no built sample ${s.from} to derive from (build it first)`);
  const raw = join(dir, `${s.from}.ogg`), fade = Math.min(0.15, s.max * 0.25), ratio = Math.pow(2, (s.semitones ?? 0) / 12);
  const pre = `aformat=channel_layouts=mono,atrim=${s.skip ?? 0},asetpts=PTS-STARTPTS,rubberband=pitch=${ratio.toFixed(6)}:formant=preserved:pitchq=quality,atrim=0:${s.max},afade=t=out:st=${(s.max - fade).toFixed(2)}:d=${fade.toFixed(2)}`;
  const peakOf = text => { const m = /max_volume: (-?[\d.]+|-inf) dB/.exec(text)?.[1]; return m === undefined || m === "-inf" ? -Infinity : Number(m); };
  const log = execFileSync("sh", ["-c", `ffmpeg -hide_banner -i "$1" -af "$2,volumedetect" -f null - 2>&1`, "_", raw, pre]).toString();
  const peak = peakOf(log), gain = -1 - peak, out = join(dir, file);
  mkdirSync(dirname(out), { recursive: true });
  execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", "-i", raw, "-af", `${pre},volume=${gain.toFixed(2)}dB`, "-ar", "48000", "-c:a", "libopus", "-b:a", `${src.kbps}k`, "-application", "audio", out]);
  const sign = n => (n >= 0 ? "+" : "") + n.toFixed(2);
  console.log(`${file.padEnd(28)} ${(statSync(out).size / 1024).toFixed(1).padStart(6)} KB  ${s.what}`);
  return {
    file, what: s.what, source: from.source, licence: from.licence, author: from.author, credit: from.credit, sourceSha256: from.sourceSha256,
    processing: `from samples/${s.from}.ogg: its first ${s.skip ?? 0} s dropped, pitch shifted ${sign(s.semitones ?? 0)} semitones with formants preserved (Rubber Band, offline), cut to ${s.max} s with a ${fade.toFixed(2)} s fade, peak-normalised to -1 dBFS (${gain >= 0 ? "+" : ""}${gain.toFixed(1)} dB), Opus ${src.kbps} kbps`,
    bytes: statSync(out).size,
  };
}
/** A generated source's notes: one entry, `midi` [lowest, highest], a note a semitone (id `<id>-<midi>`). */
function notesOf(s) {
  const [lo, hi] = Array.isArray(s.midi) ? s.midi : [s.midi, s.midi], out = [];
  for (let midi = lo; midi <= hi; midi++) out.push({ ...s, id: `${s.id}-${midi}`, midi, what: `${s.what}, ${noteName(midi)} (MIDI ${midi})` });
  return out;
}
function noteName(midi) { return ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"][midi % 12] + (Math.floor(midi / 12) - 1); }

/** Our own sample, rendered here (Ed, 2026-11-08: the singer's notes, by Chimera; the source's `kind` "generated"): the note sung
 *  by its tool at the pinned commit (`CHIMERA`, the path to its built CLI; tools/voice/chimera-notes.mjs), then as every sample:
 *  mono, the silence before it trimmed (-50 dB), cut to `max` with the tail faded, levelled to the source's `lufs` (the alto
 *  set's loudness) but never past -1 dBFS, Opus. Its licence is our own work's, credited to the tool and its author. */
function generated(set, s, file, repo) {
  const bin = process.env.CHIMERA;
  if (!bin) throw new Error(`${s.id}: rendered by ${repo.name}; set CHIMERA to its built CLI (${repo.url} at ${repo.commit}; tools/voice/chimera-notes.mjs)`);
  const raw = join(tmp, `${s.id}.wav`), out = join(dir, file);
  renderNote(bin, { midi: s.midi, lyric: s.lyric, ...repo.render }, raw);
  const sha = createHash("sha256").update(readFileSync(raw)).digest("hex"), fade = Math.min(0.15, s.max * 0.25);
  const pre = `aformat=channel_layouts=mono,silenceremove=start_periods=1:start_threshold=-50dB,atrim=0:${s.max},afade=t=out:st=${(s.max - fade).toFixed(3)}:d=${fade.toFixed(3)}`;
  const log = execFileSync("sh", ["-c", `ffmpeg -hide_banner -i "$1" -af "$2,volumedetect,ebur128=framelog=quiet" -f null - 2>&1`, "_", raw, pre]).toString();
  const peak = Number(/max_volume: (-?[\d.]+) dB/.exec(log)?.[1]), lufs = Number(/I:\s+(-?[\d.]+) LUFS/.exec(log)?.[1]);
  if (!Number.isFinite(peak) || !Number.isFinite(lufs) || lufs < -40) throw new Error(`${s.id}: the render is silent or unmeasured (${peak} dB, ${lufs} LUFS)`);
  const gain = Math.min(repo.lufs - lufs, -1 - peak);
  mkdirSync(dirname(out), { recursive: true });
  execFileSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", "-i", raw, "-af", `${pre},volume=${gain.toFixed(2)}dB`, "-ar", "48000", "-c:a", "libopus", "-b:a", `${src.kbps}k`, "-application", "audio", out]);
  const r = { ...repo.render }, sign = n => (n >= 0 ? "+" : "") + n.toFixed(1);
  console.log(`${file.padEnd(28)} ${(statSync(out).size / 1024).toFixed(1).padStart(6)} KB  ${s.what}`);
  return {
    file, what: s.what, source: `${repo.url}/tree/${repo.commit}`, licence: repo.ownLicence, author: repo.author,
    credit: `${s.what}: our own render with ${repo.name} by ${repo.toolAuthor} (${repo.licence}), ${repo.url} at ${repo.commit.slice(0, 7)}`,
    generated: { tool: repo.name, toolAuthor: repo.toolAuthor, toolLicence: repo.licence, url: repo.url, commit: repo.commit, render: { ...r, midi: s.midi, lyric: s.lyric } },
    sourceSha256: sha,
    processing: `rendered by ${repo.name} at ${repo.commit.slice(0, 7)} (its ${r.body} body, vibrato ${r.vibrato}, "${s.lyric}" held ${(r.beats * 60 / r.bpm).toFixed(1)} s, tools/voice/chimera-notes.mjs), mono, leading silence trimmed, cut to ${s.max} s with a ${fade.toFixed(2)} s fade, levelled to ${repo.lufs} LUFS (the alto set's) at most -1 dBFS peak (${sign(gain)} dB), Opus ${src.kbps} kbps`,
    bytes: statSync(out).size,
  };
}
files.sort((a, b) => a.file.localeCompare(b.file));
writeFileSync(join(dir, "manifest.json"), JSON.stringify({ _: "Written by tools/samples/build.mjs from samples/sources.json: never edit by hand. Checked by tools/samples/check.mjs (npm test).", files }, null, 2) + "\n");
writeCredits(root);
console.log(`${files.length} samples, ${(files.reduce((n, f) => n + f.bytes, 0) / 1024).toFixed(0)} KB; wrote samples/manifest.json and samples/CREDITS.md`);
