// The dance way's leads auditioned (Ed, 2026-11-09: "Lead sounds could be better; add in some more, inspired by the genres";
// tools/music-lab/leads.mjs): each lead part plays the same 8-bar riff (a riff kind and seed) over the same chords, drums and
// bass (deep house, wave 1), rendered offline by the game's engine; and each alone, its loudness measured, to balance the
// leads against each other and the old ones. Lab-only: nothing here changes the game.
import { MusicEngine } from "../../src/platform/audio/musicEngine";
import { newBeatClock } from "../../src/rules/beat";
import type { MusicCue } from "../../src/rules/musicPlan";
import { notesAt, withMelody, type MusicStyle } from "../../src/rules/musicScore";
import type { RiffKind } from "../../src/rules/musicCompose";
import styleJson from "../../config/music-style.json";

const base = withMelody(styleJson as unknown as MusicStyle, "dance");
const RATE = 44100;

/** The style with every riff of `kind` on `lead` in `section` (and, `solo`, the section's parts down to its melody alone). */
function forced(lead: string, kind: RiffKind, section: string, solo: boolean): MusicStyle {
  const C = base.compose!, D = C.dance!;
  const sec = base.sections[section], melodic = Object.entries(sec.parts ?? {}).filter(([k]) => base.parts[k]?.role === "motif");
  return {
    ...base,
    sections: solo ? { ...base.sections, [section]: { ...sec, base: undefined, parts: Object.fromEntries(melodic.length ? melodic : [["pluck", "flow"]]) } } : base.sections,
    compose: { ...C, dance: { ...D, riffs: { ...D.riffs, families: {}, sections: { ...D.riffs.sections, [section]: [kind] } }, leads: { ...D.leads, families: {}, kinds: { ...D.leads.kinds, [kind]: [lead] } } } },
  };
}
function stats(buf: AudioBuffer) {
  const L = buf.getChannelData(0), R = buf.getChannelData(1);
  let e = 0, peak = 0, nan = 0;
  for (let i = 0; i < L.length; i++) { const l = L[i], r = R[i]; if (!Number.isFinite(l) || !Number.isFinite(r)) { nan++; continue; } e += l * l + r * r; peak = Math.max(peak, Math.abs(l), Math.abs(r)); }
  return { rmsDb: 10 * Math.log10(e / (2 * L.length) + 1e-20), peak, nan };
}
function pcmOf(buf: AudioBuffer): string {
  const L = buf.getChannelData(0), R = buf.getChannelData(1), pcm = new Int16Array(L.length * 2);
  for (let i = 0; i < L.length; i++) { pcm[2 * i] = Math.max(-32767, Math.min(32767, Math.round((Number.isFinite(L[i]) ? L[i] : 0) * 32767))); pcm[2 * i + 1] = Math.max(-32767, Math.min(32767, Math.round((Number.isFinite(R[i]) ? R[i] : 0) * 32767))); }
  const bytes = new Uint8Array(pcm.buffer);
  let s = "";
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s);
}
async function render(style: MusicStyle, section: string, seed: number, bars: number): Promise<AudioBuffer> {
  const spb = 60 / style.bpm / 4, oc = new OfflineAudioContext(2, Math.ceil((bars * 16 * spb + 3) * RATE), RATE);
  const e = new MusicEngine(oc, oc.destination, style, seed);
  const cue: MusicCue = { waves: [0], nextAt: Infinity, bootUntil: 0, knockedOut: false, siege: 0, forceWave: 1, forceSection: section };
  e.renderAhead(cue, 0, bars * 16 * spb, newBeatClock(style.bpm));
  return oc.startRendering();
}
/** A lead on the riff over the section (its mix) and alone (its loudness); a timing of the render's work. */
async function leadRender(o: { lead: string; kind: RiffKind; section: string; seed: number; bars: number }) {
  const t0 = performance.now(), mix = await render(forced(o.lead, o.kind, o.section, false), o.section, o.seed, o.bars), ms = performance.now() - t0;
  const solo = await render(forced(o.lead, o.kind, o.section, true), o.section, o.seed, o.bars);
  const m = stats(mix), s = stats(solo);
  // (what each render plays: the mix the section as the game has it, its marimba and vox giving the melody its level, their
  // notes the form's, on the lead; alone, the lead's notes and nothing else)
  const partsOf = (st: MusicStyle) => [...new Set(Array.from({ length: o.bars * 16 }, (_, i) => notesAt(st, { section: o.section, start: 0, bars: 16, wave: 1, arc: 1 }, null, i, { seed: o.seed, siege: 0, formStart: 0 })).flat().map(e => e.part))].sort();
  return { mixParts: partsOf(forced(o.lead, o.kind, o.section, false)), soloParts: partsOf(forced(o.lead, o.kind, o.section, true)), rate: RATE, seconds: mix.duration, peak: m.peak, nan: m.nan + s.nan, mixDb: m.rmsDb, soloDb: s.rmsDb, soloPeak: s.peak, renderMs: ms, pcm: pcmOf(mix), patch: base.parts[o.lead]?.patch };
}
Object.assign(window as unknown as { leadRender: typeof leadRender }, { leadRender });
