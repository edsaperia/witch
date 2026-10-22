// The Music Studio's MIDI reader (tools/music-studio/midi.ts): files written here by a small writer, read back.
import { describe, expect, it } from "vitest";
import { parseMidi } from "../tools/music-studio/midi";

const vlq = (n: number) => { const out = [n & 0x7f]; while ((n >>= 7)) out.unshift((n & 0x7f) | 0x80); return out; };
const u32 = (n: number) => [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255];
const text = (s: string) => [...s].map(c => c.charCodeAt(0));
const track = (events: [number, number[]][]) => { const body = [...events.flatMap(([d, e]) => [...vlq(d), ...e]), 0, 0xff, 0x2f, 0]; return [...text("MTrk"), ...u32(body.length), ...body]; };
const file = (format: number, tpq: number, tracks: number[][]) => new Uint8Array([...text("MThd"), ...u32(6), 0, format, 0, tracks.length, tpq >> 8, tpq & 255, ...tracks.flat()]);
const meta = (type: number, data: number[]) => [0xff, type, ...vlq(data.length), ...data];

describe("parseMidi", () => {
  it("reads a format 1 file: the tempo map on the first track, names, notes in seconds, markers", () => {
    const conductor = track([[0, meta(0x51, [0x07, 0xa1, 0x20])], [0, meta(0x58, [3, 2, 24, 8])], [0, meta(0x06, text("Intro"))], [960, meta(0x06, text("Drop"))], [0, meta(0x51, [0x03, 0xd0, 0x90])]]); // 120 bpm, then 240 at beat 2
    const pad = track([[0, meta(0x03, text("pad"))], [0, [0x90, 57, 100]], [480, [0x80, 57, 0]], [480, [0x90, 60, 127]], [480, [0x90, 60, 0]]]);
    const drums = track([[0, meta(0x03, text("Drums"))], [0, [0x99, 36, 127]], [0, [0x99, 42, 64]], [120, [0x89, 36, 0]], [0, [42, 0]]]); // (running status: a note off as a note on, velocity 0)
    const s = parseMidi(file(1, 480, [conductor, pad, drums]));
    expect(s.bpm).toBe(120);
    expect(s.tempos).toEqual([{ at: 0, bpm: 120 }, { at: 1, bpm: 240 }]);
    expect(s.meter).toEqual([3, 4]);
    expect(s.markers).toEqual([{ at: 0, text: "Intro" }, { at: 1, text: "Drop" }]);
    expect(s.tracks.map(t => t.name)).toEqual(["pad", "Drums"]);
    const [a, b] = s.tracks[0].notes;
    expect(a).toMatchObject({ midi: 57, start: 0, dur: 0.5 });
    expect(a.vel).toBeCloseTo(100 / 127);
    expect(b.start).toBeCloseTo(1); expect(b.dur).toBeCloseTo(0.25); // (at 240 bpm after beat 2)
    expect(s.tracks[1].channel).toBe(9);
    expect(s.tracks[1].notes.map(n => [n.midi, n.dur])).toEqual([[36, 0.125], [42, 0.125]]);
    expect(s.length).toBeCloseTo(1.25);
  });
  it("defaults to 120 bpm and 4/4, and refuses what it can't read", () => {
    const s = parseMidi(file(0, 96, [track([[0, [0x90, 64, 80]], [96, [0x80, 64, 0]]])]));
    expect(s.bpm).toBe(120); expect(s.meter).toEqual([4, 4]);
    expect(s.tracks[0]).toMatchObject({ name: "Track 1", notes: [{ midi: 64, start: 0, dur: 0.5 }] });
    expect(() => parseMidi(new Uint8Array([1, 2, 3, 4]))).toThrow(/not a MIDI file/);
    expect(() => parseMidi(file(2, 96, []))).toThrow(/format 2/);
  });
});
