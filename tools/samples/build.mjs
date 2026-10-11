// Fetches and prepares the game's samples (Ed, 2026-10-11: "import open samples"; docs/music/research.md):
// node tools/samples/build.mjs [id,...]
// For each sample in samples/sources.json: its source file from its repository at the pinned commit, then ffmpeg makes it
// mono, trims the silence before the hit, cuts it to `max` seconds with the last tenth faded out, peak-normalises it to
// -1 dBFS and encodes it as Opus in Ogg at `kbps`, into samples/<set>/<id>.ogg. It writes samples/manifest.json (each
// file's source, licence, author, credit line, the source's SHA-256 and what was done to it) and samples/CREDITS.md
// (tools/samples/credits.mjs). tools/samples/check.mjs (in npm test) checks them. Needs the network and ffmpeg; the game
// and CI only read the results, committed.
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync, statSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { writeCredits } from "./credits.mjs";

const here = dirname(fileURLToPath(import.meta.url)), root = resolve(here, "../.."), dir = join(root, "samples");
const src = JSON.parse(readFileSync(join(dir, "sources.json"), "utf8")), only = process.argv[2]?.split(",");
const old = (() => { try { return JSON.parse(readFileSync(join(dir, "manifest.json"), "utf8")).files; } catch { return []; } })();
const files = [];
const tmp = join(tmpdir(), `witch-samples-${process.pid}`);
mkdirSync(tmp, { recursive: true });
for (const [set, list] of Object.entries(src.sets)) {
  for (const s of list) {
    const repo = src.repos[s.repo ?? set], file = `${set}/${s.id}.ogg`, fs = (s.repo ?? set) === "freesound";
    if (only && !only.includes(s.id)) { const was = old.find(f => f.file === file); if (was) files.push(was); continue; }
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
files.sort((a, b) => a.file.localeCompare(b.file));
writeFileSync(join(dir, "manifest.json"), JSON.stringify({ _: "Written by tools/samples/build.mjs from samples/sources.json: never edit by hand. Checked by tools/samples/check.mjs (npm test).", files }, null, 2) + "\n");
writeCredits(root);
console.log(`${files.length} samples, ${(files.reduce((n, f) => n + f.bytes, 0) / 1024).toFixed(0)} KB; wrote samples/manifest.json and samples/CREDITS.md`);
