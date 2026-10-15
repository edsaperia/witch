// The recorded voices the game's music sings with (Ed, 2026-10-11: "e Recorded + ethereal will do for now"): the woman's
// sung G4 the singer retunes note by note, and the whispers its ethereal effects' vocoder speaks with (samples/voices,
// Freesound, CC0: samples/CREDITS.md). Fetched and decoded once a page, after the music starts (the formant voice sings
// till then); the bundler copies them beside the game.
import femaleNote from "../../../samples/voices/female-note.ogg?url";
import whispers from "../../../samples/voices/whispers.ogg?url";

// the alto's sample set (Ed's singer review, 2026-10-14): samples/alto/alto-<midi>.ogg, the woman's note shifted with its
// formants kept, every two semitones (tools/samples/build.mjs, "derived")
const ALTO = import.meta.glob("../../../samples/alto/*.ogg", { eager: true, query: "?url", import: "default" }) as Record<string, string>;
const URLS: Record<string, string> = { "female-note": femaleNote, whispers, ...Object.fromEntries(Object.entries(ALTO).map(([path, url]) => [path.replace(/^.*\//, "").replace(/\.ogg$/, ""), url])) };
let loading: Promise<Record<string, AudioBuffer>> | null = null;

/** The voices, decoded on `ctx` (an empty record if they can't be: the formant voice sings on). */
export function voiceRecordings(ctx: BaseAudioContext): Promise<Record<string, AudioBuffer>> {
  loading ??= (async () => {
    const out: Record<string, AudioBuffer> = {};
    await Promise.all(Object.entries(URLS).map(async ([id, url]) => {
      try { out[id] = await ctx.decodeAudioData(await (await fetch(url)).arrayBuffer()); } catch { /* not this one */ }
    }));
    return out;
  })();
  return loading;
}
