// The art drawn ahead, at build time (Ed, 2026-11-06: "We should definitely do 2!"; tools/prebake/bake.mjs): sets the art workers
// would draw on a first visit, drawn once in the build and shipped with the game as files beside it, `art/<name>.bin`, each named by
// its set's cache key (render/artCache.ts artCacheKey) and listed in `art/manifest.json`. An art worker that misses the browser's
// own store (render/artCacheStorage.ts) looks here before drawing (render/artWorker.ts); a set found is kept in the store as if
// drawn, so the next visit reads it from there. Anything not baked (another style or scale, a genome or gear chosen in play, a
// world past the first) is drawn as before. Storage-only, like the cache: no drawing modules imported.
import type { ArtResult } from "./artBuild";

/** A baked file's name from its cache key: the first 20 hex digits of the key's SHA-256 (the build's and the worker's alike). */
export async function bakedName(key: string): Promise<string> {
  const d = new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(key)));
  let s = "";
  for (let i = 0; i < 10; i++) s += d[i].toString(16).padStart(2, "0");
  return s;
}

/** The manifest the build writes beside the baked files: each file's name and its size in bytes as shipped. */
export interface BakedManifest { schema: 1; files: Record<string, number> }

// The file: "WART" and a format byte, the header's length (4 bytes, little-endian), the header (JSON: the result with each typed
// array swapped for {"$t": its type, "o": its offset in the body, "n": its length, "p": 4 if stored a channel at a time}), padding to 8, then the body (each array's
// bytes, each at a multiple of 8); the whole gzipped (the browser's DecompressionStream undoes it; GitHub Pages doesn't compress
// binary files itself).
const MAGIC = [0x57, 0x41, 0x52, 0x54, 1];
type View = Uint8Array | Uint8ClampedArray | Int8Array | Uint16Array | Int16Array | Uint32Array | Int32Array | Float32Array | Float64Array;
const VIEWS: Record<string, new (b: ArrayBuffer, o: number, n: number) => View> = { Uint8Array, Uint8ClampedArray, Int8Array, Uint16Array, Int16Array, Uint32Array, Int32Array, Float32Array, Float64Array };

/** An atlas's plane kept as RGBA (no palette: render/palette.ts; the trees' normal maps) is stored a channel at a time, all its
 *  reds, then greens, blues and alphas: about 40% smaller gzipped than the pixels interleaved. */
const rgbaPlane = (o: Record<string, unknown>, k: string, x: unknown): boolean =>
  (k === "albedo" || k === "normal") && x instanceof Uint8Array && x.length % 4 === 0 && !o[k + "Pal"] && typeof o.width === "number";
function toPlanar(a: Uint8Array): Uint8Array {
  const q = a.length >> 2, out = new Uint8Array(a.length);
  for (let i = 0; i < q; i++) { out[i] = a[i * 4]; out[q + i] = a[i * 4 + 1]; out[2 * q + i] = a[i * 4 + 2]; out[3 * q + i] = a[i * 4 + 3]; }
  return out;
}
function fromPlanar(a: Uint8Array): Uint8Array {
  const q = a.length >> 2, out = new Uint8Array(a.length);
  for (let i = 0; i < q; i++) { out[i * 4] = a[i]; out[i * 4 + 1] = a[q + i]; out[i * 4 + 2] = a[2 * q + i]; out[i * 4 + 3] = a[3 * q + i]; }
  return out;
}

/** A result as one file's bytes (before gzip): exact, every value and array as the worker made it. */
export function encodeResult(r: ArtResult): Uint8Array {
  const parts: View[] = [];
  let at = 0;
  const walk = (v: unknown, planar = false): unknown => {
    if (v === undefined) return { $u: 1 };
    if (typeof v === "number") return Number.isFinite(v) && !Object.is(v, -0) ? v : { $n: Object.is(v, -0) ? "-0" : String(v) };
    if (v === null || typeof v !== "object") return v;
    if (ArrayBuffer.isView(v)) {
      const t = v.constructor.name;
      if (!VIEWS[t]) throw new Error(`art bake: can't keep a ${t}`);
      at = Math.ceil(at / 8) * 8;
      const o = at, a = planar ? toPlanar(v as Uint8Array) : v as View;
      parts.push(a); at += a.byteLength;
      return { $t: t, o, n: a.length, ...(planar ? { p: 4 } : {}) };
    }
    if (Array.isArray(v)) return v.map(x => walk(x));
    if (Object.getPrototypeOf(v) !== Object.prototype) throw new Error("art bake: can't keep a " + (v as object).constructor?.name);
    const out: Record<string, unknown> = {};
    const o = v as Record<string, unknown>;
    for (const [k, x] of Object.entries(o)) out[k] = walk(x, rgbaPlane(o, k, x));
    return out;
  };
  const head = new TextEncoder().encode(JSON.stringify(walk(r)));
  const start = Math.ceil((MAGIC.length + 4 + head.length) / 8) * 8, out = new Uint8Array(start + at);
  out.set(MAGIC); new DataView(out.buffer).setUint32(MAGIC.length, head.length, true); out.set(head, MAGIC.length + 4);
  let p = 0;
  for (const a of parts) { p = Math.ceil(p / 8) * 8; out.set(new Uint8Array(a.buffer, a.byteOffset, a.byteLength), start + p); p += a.byteLength; }
  return out;
}

/** The result a file's bytes (gunzipped) hold; each array its own buffer, so it can be handed over to the page. */
export function decodeResult(b: Uint8Array): ArtResult {
  if (MAGIC.some((m, i) => b[i] !== m)) throw new Error("art bake: not a baked set");
  const n = new DataView(b.buffer, b.byteOffset).getUint32(MAGIC.length, true);
  const head = JSON.parse(new TextDecoder().decode(b.subarray(MAGIC.length + 4, MAGIC.length + 4 + n)));
  const start = Math.ceil((MAGIC.length + 4 + n) / 8) * 8;
  const walk = (v: unknown): unknown => {
    if (v === null || typeof v !== "object") return v;
    if (Array.isArray(v)) return v.map(walk);
    const o = v as Record<string, unknown>;
    if (o.$u === 1) return undefined;
    if (typeof o.$n === "string") return o.$n === "-0" ? -0 : Number(o.$n);
    if (typeof o.$t === "string") {
      const C = VIEWS[o.$t], bytes = (o.n as number) * (C as unknown as { BYTES_PER_ELEMENT: number }).BYTES_PER_ELEMENT, at = b.byteOffset + start + (o.o as number);
      const a = new C(b.buffer.slice(at, at + bytes) as ArrayBuffer, 0, o.n as number);
      return o.p === 4 ? fromPlanar(a as Uint8Array) : a;
    }
    const out: Record<string, unknown> = {};
    for (const [k, x] of Object.entries(o)) out[k] = walk(x);
    return out;
  };
  return walk(head) as ArtResult;
}

const gunzip = async (b: Uint8Array): Promise<Uint8Array> =>
  b[0] === 0x1f && b[1] === 0x8b ? new Uint8Array(await new Response(new Blob([b as BlobPart]).stream().pipeThrough(new DecompressionStream("gzip"))).arrayBuffer()) : b; // (a server that sent it with Content-Encoding has undone it already)

/** Each worker's manifest, by where the baked art is: fetched once (null: none there, or unreadable: nothing baked). */
const manifests = new Map<string, Promise<BakedManifest | null>>();
const manifest = (base: string): Promise<BakedManifest | null> => {
  let m = manifests.get(base);
  if (!m) manifests.set(base, m = fetch(new URL("manifest.json", base)).then(r => (r.ok ? r.json() : null)).then(j => (j && j.schema === 1 && j.files ? j as BakedManifest : null)).catch(() => null));
  return m;
};

/** The set baked under `key`, from the baked art at `base` (the game's `art/` folder, as a full URL), or null: not baked, or its
 *  file missing or unreadable (then it's drawn, as before). Only names the manifest lists are fetched, so a miss costs no request. */
export async function bakedGet(key: string, base: string): Promise<ArtResult | null> {
  try {
    const m = await manifest(base);
    if (!m) return null;
    const name = await bakedName(key);
    if (!(name in m.files)) return null;
    const r = await fetch(new URL(name + ".bin", base));
    if (!r.ok) return null;
    const result = decodeResult(await gunzip(new Uint8Array(await r.arrayBuffer())));
    return result?.px ? result : null;
  } catch { return null; }
}
