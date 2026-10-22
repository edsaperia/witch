// A Standard MIDI File reader for the Music Studio (Ed, 2026-10-22: the musician works in Logic; "something where they can
// upload a midi and hear their patches played together"): formats 0 and 1, every track's notes in seconds by the file's own
// tempo map (each note on paired with its note off, or a note on at velocity 0), its name, channel and markers. Pure: no
// sound, no page.

export interface MidiNote { midi: number; vel: number; start: number; dur: number; channel: number }
export interface MidiTrack { name: string; notes: MidiNote[]; channel: number }
export interface MidiSong {
  tracks: MidiTrack[];
  /** The first tempo (bpm; 120 when the file gives none) and every change, in seconds. */
  bpm: number;
  tempos: { at: number; bpm: number }[];
  /** Markers (Logic's arrangement markers among them), in seconds. */
  markers: { at: number; text: string }[];
  /** The time signature (4/4 when the file gives none) and the song's length in seconds (its last note off). */
  meter: [number, number];
  length: number;
}

export function parseMidi(data: ArrayBuffer | Uint8Array): MidiSong {
  const b = data instanceof Uint8Array ? data : new Uint8Array(data);
  let pos = 0;
  const u8 = () => { if (pos >= b.length) throw new Error("the MIDI file ends early"); return b[pos++]; };
  const u16 = () => (u8() << 8) | u8();
  const u32 = () => ((u8() << 24) >>> 0) + (u8() << 16) + (u8() << 8) + u8();
  const str = (n: number) => { let s = ""; for (let i = 0; i < n; i++) s += String.fromCharCode(u8()); return s; };
  const vlq = () => { let v = 0, c: number; do { c = u8(); v = (v << 7) | (c & 0x7f); } while (c & 0x80); return v; };
  if (str(4) !== "MThd") throw new Error("not a MIDI file (no MThd header)");
  const hlen = u32(), format = u16(), ntracks = u16(), division = u16();
  pos += hlen - 6;
  if (format > 1) throw new Error("MIDI format 2 isn't supported: export as format 1 (Logic: File ▸ Export ▸ Selection as MIDI File)");
  if (division & 0x8000) throw new Error("SMPTE-timed MIDI files aren't supported: export with bars and beats");
  const tpq = division;
  // every track's events in ticks first: the tempo map can sit on any track (format 1: the first)
  type Raw = { tick: number; kind: "on" | "off" | "tempo" | "marker" | "meter" | "name"; ch?: number; key?: number; vel?: number; us?: number; text?: string; meter?: [number, number] };
  const raws: Raw[][] = [];
  for (let t = 0; t < ntracks; t++) {
    if (pos + 8 > b.length) break;
    const id = str(4), len = u32(), end = pos + len;
    if (id !== "MTrk") { pos = end; continue; }
    const ev: Raw[] = [];
    let tick = 0, status = 0;
    while (pos < end) {
      tick += vlq();
      let s = b[pos];
      if (s & 0x80) { pos++; status = s; } else s = status; // (running status)
      if (s === 0xff) {
        const type = u8(), n = vlq(), at = pos;
        if (type === 0x51 && n === 3) ev.push({ tick, kind: "tempo", us: (b[at] << 16) | (b[at + 1] << 8) | b[at + 2] });
        else if (type === 0x03) ev.push({ tick, kind: "name", text: str(n) });
        else if (type === 0x06) ev.push({ tick, kind: "marker", text: str(n) });
        else if (type === 0x58 && n >= 2) ev.push({ tick, kind: "meter", meter: [b[at], 2 ** b[at + 1]] });
        pos = at + n;
        if (type === 0x2f) break;
      } else if (s === 0xf0 || s === 0xf7) { pos += vlq(); }
      else {
        const hi = s & 0xf0, ch = s & 0x0f;
        const d1 = u8(), d2 = hi === 0xc0 || hi === 0xd0 ? 0 : u8();
        if (hi === 0x90 && d2 > 0) ev.push({ tick, kind: "on", ch, key: d1, vel: d2 });
        else if (hi === 0x80 || (hi === 0x90 && d2 === 0)) ev.push({ tick, kind: "off", ch, key: d1 });
      }
    }
    pos = end;
    raws.push(ev);
  }
  // the tempo map: ticks to seconds
  const tempoEv = raws.flat().filter(e => e.kind === "tempo").sort((a, b) => a.tick - b.tick);
  const map: { tick: number; sec: number; us: number }[] = [{ tick: 0, sec: 0, us: 500000 }];
  for (const e of tempoEv) {
    const last = map[map.length - 1], sec = last.sec + ((e.tick - last.tick) * last.us) / tpq / 1e6;
    if (e.tick === last.tick) last.us = e.us!; else map.push({ tick: e.tick, sec, us: e.us! });
  }
  const secOf = (tick: number) => {
    let m = map[0];
    for (const x of map) if (x.tick <= tick) m = x; else break;
    return m.sec + ((tick - m.tick) * m.us) / tpq / 1e6;
  };
  const tracks: MidiTrack[] = [], markers: MidiSong["markers"] = [];
  let meter: [number, number] = [4, 4], length = 0;
  raws.forEach((ev, i) => {
    let name = "";
    const open = new Map<number, Raw[]>(), notes: MidiNote[] = [];
    for (const e of ev) {
      if (e.kind === "name" && !name) name = e.text!.trim();
      else if (e.kind === "marker") markers.push({ at: secOf(e.tick), text: e.text! });
      else if (e.kind === "meter" && e.tick === 0) meter = e.meter!;
      else if (e.kind === "on") { const k = e.ch! * 128 + e.key!; (open.get(k) ?? open.set(k, []).get(k)!).push(e); }
      else if (e.kind === "off") {
        const on = open.get(e.ch! * 128 + e.key!)?.shift();
        if (on) { const start = secOf(on.tick), stop = secOf(e.tick); notes.push({ midi: on.key!, vel: on.vel! / 127, start, dur: Math.max(0.01, stop - start), channel: on.ch! }); length = Math.max(length, stop); }
      }
    }
    if (!notes.length) return;
    notes.sort((a, b) => a.start - b.start || a.midi - b.midi);
    const chans = new Map<number, number>();
    for (const n of notes) chans.set(n.channel, (chans.get(n.channel) ?? 0) + 1);
    const channel = [...chans].sort((a, b) => b[1] - a[1])[0][0];
    tracks.push({ name: name || `Track ${i + 1}`, notes, channel });
  });
  const tempos = map.map(m => ({ at: m.sec, bpm: Math.round((60e6 / m.us) * 100) / 100 }));
  return { tracks, bpm: tempos[0].bpm, tempos, markers: markers.sort((a, b) => a.at - b.at), meter, length };
}
