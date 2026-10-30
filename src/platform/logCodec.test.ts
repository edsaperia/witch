import { expect, it } from "vitest";
import { decodeRecording, encodeRecording, packLog, unpackLog } from "./logCodec";
import type { InputRecording } from "./inputRecording";
function tape(): InputRecording {
  return { version: 1, build: "fixture", seed: 1, complete: true, startingSave: {}, start: {}, target: {}, events: Array.from({ length: 100 }, (_, tick) => ({ kind: "frame", fromStep: tick, toStep: tick + 1, frame: { tick: tick + 1, dt: 1 / 60, inputs: [{ moveX: 1, moveZ: 0, zoom: 0, toggleMode: false }] } })) } as InputRecording;
}
it("uses exact frame runs/deltas and retains changing controls", () => {
  const original = tape(), encoded = encodeRecording(original);
  expect(encoded.events).toHaveLength(1); expect(encoded.events[0]).toMatchObject({ kind: "frames", count: 100, delta: 1 });
  expect(decodeRecording(encoded)).toEqual(original);
  const changed = tape();
  if (changed.events[50].kind === "frame") changed.events[50].frame.inputs[0].aimX = 12.123456789;
  expect(decodeRecording(encodeRecording(changed))).toEqual(changed);
});
it("roundtrips native gzip, the explicit JSON fallback and legacy uncompressed data", async () => {
  const value = { recording: tape(), note: "🌙🦊 café".repeat(2000) };
  const gzip = await packLog(value); expect(gzip.encoding).toBe("gzip");
  expect(await unpackLog(gzip)).toEqual(value);
  const fallback = await packLog(value, false); expect(fallback.encoding).toBe("json");
  expect(await unpackLog(fallback)).toEqual(value); expect(await unpackLog(value)).toEqual(value);
});
it("rejects corrupt envelopes and expansion bombs before allocating frame arrays", async () => {
  const packed = await packLog({ text: "x".repeat(10000) });
  await expect(unpackLog({ ...packed, rawBytes: 2 })).rejects.toThrow();
  await expect(unpackLog({ ...packed, data: "not base64" })).rejects.toThrow();
  await expect(unpackLog({ ...packed, format: "witch-json/v2" })).rejects.toThrow(/format/);
  const encoded = encodeRecording(tape());
  if (encoded.events[0].kind === "frames") encoded.events[0].count = 1_000_000;
  expect(() => decodeRecording(encoded)).toThrow(/run/);
  const large = encodeRecording(tape());
  if (large.events[0].kind === "frames") { large.events[0].count = 120000; large.events[0].first.frame.inputs[0].framePart = "x".repeat(10000); }
  expect(() => decodeRecording(large)).toThrow(/limit/);
});
