import type { InputRecording, RecordedEvent } from "./inputRecording";

export const LOG_EXPANDED_BYTES = 128 * 1024 * 1024, LOG_PACKED_BYTES = 32 * 1024 * 1024;
const TAPE_BYTES = 32 * 1024 * 1024, EVENTS = 120_000;
export const jsonBytes = (value: unknown): number => new TextEncoder().encode(JSON.stringify(value)).byteLength;
type Frame = Extract<RecordedEvent, { kind: "frame" }>;
interface FrameRun { kind: "frames"; count: number; first: Frame; delta: number }
export interface EncodedRecording { format: "witch-input-runs/v1"; header: Omit<InputRecording, "events">; events: (FrameRun | Exclude<RecordedEvent, Frame>)[] }

/** Constant controls/dt/focus and constant simulation-step deltas form a run; no time or input precision is rounded. */
export function encodeRecording(tape: InputRecording): EncodedRecording {
  const { events, ...header } = tape, out: EncodedRecording["events"] = [];
  let signature = "";
  for (const event of events) {
    if (event.kind !== "frame") { out.push(event); signature = ""; continue; }
    const nextSignature = JSON.stringify([event.frame.dt, event.frame.inputs, event.focus]);
    const previous = out.at(-1), delta = event.toStep - event.fromStep;
    if (previous?.kind === "frames" && signature === nextSignature && previous.delta === delta && event.fromStep === previous.first.fromStep + previous.count * delta && event.frame.tick === previous.first.frame.tick + previous.count) previous.count++;
    else out.push({ kind: "frames", count: 1, first: event, delta });
    signature = nextSignature;
  }
  return { format: "witch-input-runs/v1", header, events: out };
}
function recordingEstimate(encoded: EncodedRecording): number {
  if (!encoded.header || encoded.header.version !== 1 || !Array.isArray(encoded.events) || encoded.events.length > EVENTS) throw Error("Invalid input runs");
  let count = 0, size = jsonBytes(encoded.header) + 32;
  for (const event of encoded.events) {
    if (event.kind === "checkpoint" || event.kind === "focus") { count++; size += jsonBytes(event) + 1; }
    else if (event.kind === "frames") {
      const { first, delta, count: n } = event;
      if (!Number.isSafeInteger(n) || n < 1 || n > EVENTS || !Number.isSafeInteger(delta) || delta < 0 || !first || first.kind !== "frame" || !first.frame || ![first.fromStep, first.toStep, first.frame.tick, first.fromStep + n * delta, first.frame.tick + n].every(Number.isSafeInteger) || first.toStep - first.fromStep !== delta || !Number.isFinite(first.frame.dt) || !Array.isArray(first.frame.inputs) || first.frame.inputs.length > 64) throw Error("Invalid frame run");
      count += n; size += n * (jsonBytes(first) + 64); // Reserve the maximum safe-integer digit growth before allocation.
    } else throw Error("Unknown input run");
    if (count > EVENTS || size > TAPE_BYTES) throw Error("Expanded input recording exceeds its limit");
  }
  return size;
}
export function decodeRecording(encoded: EncodedRecording): InputRecording {
  recordingEstimate(encoded);
  const events: RecordedEvent[] = [];
  for (const event of encoded.events) {
    if (event.kind === "checkpoint" || event.kind === "focus") events.push(event);
    else for (let i = 0; i < event.count; i++) events.push({ ...event.first, fromStep: event.first.fromStep + i * event.delta, toStep: event.first.toStep + i * event.delta, frame: { ...event.first.frame, tick: event.first.frame.tick + i } });
  }
  return { ...encoded.header, events };
}
function transform(value: unknown, encode: boolean, budget: { remaining: number }, depth = 0): unknown {
  if (depth > 64) throw Error("Log nesting exceeds its limit");
  if (!value || typeof value !== "object") return value;
  const v = value as Record<string, unknown>;
  if (encode && v.version === 1 && typeof v.build === "string" && v.startingSave && v.target && Array.isArray(v.events) && typeof v.complete === "boolean") return encodeRecording(value as InputRecording);
  if (!encode && v.format === "witch-input-runs/v1") {
    const tape = value as EncodedRecording, estimate = recordingEstimate(tape);
    budget.remaining -= Math.max(0, estimate - jsonBytes(tape));
    if (budget.remaining < 0) throw Error("Expanded log exceeds its limit");
    return decodeRecording(tape);
  }
  if (!encode && typeof v.format === "string" && v.format.startsWith("witch-input-runs/")) throw Error("Unsupported input-run format");
  if (Array.isArray(value)) return value.map(row => transform(row, encode, budget, depth + 1));
  return Object.fromEntries(Object.entries(v).map(([key, row]) => [key, transform(row, encode, budget, depth + 1)]));
}
export function encodeLog(value: unknown): unknown {
  if (jsonBytes(value) > LOG_EXPANDED_BYTES) throw Error("This log exceeds the expanded size limit");
  return transform(value, true, { remaining: LOG_EXPANDED_BYTES });
}
function decodeLog(value: unknown, size: number): unknown { return transform(value, false, { remaining: LOG_EXPANDED_BYTES - size }); }
export interface PackedLog { format: "witch-json/v1"; encoding: "gzip" | "json"; rawBytes: number; data: unknown }

async function boundedRead(stream: ReadableStream<Uint8Array>, limit: number): Promise<Uint8Array<ArrayBuffer>> {
  const reader = stream.getReader(), chunks: Uint8Array[] = []; let size = 0;
  try {
    for (;;) {
      const result = await reader.read(); if (result.done) break;
      size += result.value.byteLength;
      if (size > limit) { await reader.cancel(); throw Error("Expanded log exceeds its limit"); }
      chunks.push(result.value);
    }
  } finally { reader.releaseLock(); }
  const out = new Uint8Array(size); let offset = 0;
  for (const chunk of chunks) { out.set(chunk, offset); offset += chunk.length; }
  return out;
}
function base64(data: Uint8Array): string {
  const chunks: string[] = [];
  for (let i = 0; i < data.length; i += 32768) chunks.push(String.fromCharCode(...data.subarray(i, i + 32768)));
  return btoa(chunks.join(""));
}
function unbase64(value: string): Uint8Array<ArrayBuffer> {
  if (value.length > Math.ceil(LOG_PACKED_BYTES / 3) * 4 || value.length % 4 || !/^[A-Za-z0-9+/]*={0,2}$/.test(value)) throw Error("Invalid compressed log");
  const text = atob(value), data = new Uint8Array(text.length);
  for (let i = 0; i < text.length; i++) data[i] = text.charCodeAt(i);
  return data;
}
export async function packLog(value: unknown, gzip = true): Promise<PackedLog> {
  const encoded = encodeLog(value), text = JSON.stringify(encoded), rawBytes = new TextEncoder().encode(text).byteLength;
  let packed: PackedLog = { format: "witch-json/v1", encoding: "json", rawBytes, data: encoded };
  if (gzip && typeof CompressionStream !== "undefined") {
    try {
      const data = await boundedRead(new Blob([text]).stream().pipeThrough(new CompressionStream("gzip")), LOG_PACKED_BYTES);
      const zipped: PackedLog = { format: "witch-json/v1", encoding: "gzip", rawBytes, data: base64(data) };
      if (jsonBytes(zipped) < jsonBytes(packed)) packed = zipped;
    } catch { /* Optional native compression: retain the lossless JSON fallback when it fits. */ }
  }
  if (jsonBytes(packed) > LOG_PACKED_BYTES) throw Error("This log exceeds the packed size limit");
  return packed;
}
export async function unpackLog(value: unknown): Promise<unknown> {
  const size = jsonBytes(value);
  if (size > LOG_EXPANDED_BYTES) throw Error("This log file is too large");
  if (!value || typeof value !== "object" || !("format" in value)) return decodeLog(value, size);
  const packed = value as PackedLog;
  if (packed.format !== "witch-json/v1") throw Error("Unsupported log format");
  if (size > LOG_PACKED_BYTES || !Number.isSafeInteger(packed.rawBytes) || packed.rawBytes < 1 || packed.rawBytes > LOG_EXPANDED_BYTES) throw Error("Invalid expanded log size");
  let decoded: unknown;
  if (packed.encoding === "json") {
    if (jsonBytes(packed.data) !== packed.rawBytes) throw Error("Invalid JSON log size");
    decoded = packed.data;
  } else if (packed.encoding === "gzip" && typeof packed.data === "string") {
    if (typeof DecompressionStream === "undefined") throw Error("This browser cannot open compressed logs");
    const data = await boundedRead(new Blob([unbase64(packed.data)]).stream().pipeThrough(new DecompressionStream("gzip")), packed.rawBytes);
    if (data.length !== packed.rawBytes) throw Error("Invalid compressed log size");
    decoded = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(data));
  } else throw Error("Unsupported log encoding");
  return decodeLog(decoded, packed.rawBytes);
}
