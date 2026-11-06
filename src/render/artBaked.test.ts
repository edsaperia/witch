import { afterEach, describe, expect, it, vi } from "vitest";
import { gzipSync } from "node:zlib";
import { createHash } from "node:crypto";
import { bakedGet, bakedName, decodeResult, encodeResult } from "./artBaked";
import type { ArtResult } from "./artBuild";

const sample = (): ArtResult => {
  const rgba = new Uint8Array(4 * 6 * 3).map((_, i) => (i * 37) % 256);
  return {
    px: { albedo: new Uint8Array([0, 1, 2, 3, 2, 1]), normal: rgba, albedoPal: new Uint8Array(1024).fill(7), normalPal: null, width: 6, height: 3, frames: [{ uv: [0, 0, 1, 1], w: 6, h: 3, pad: 0, foot: 1.5, head: [2, 1] }] },
    floor: { albedo: new Uint8Array([9, 8, 7, 6]), normal: new Uint8Array([1, 2, 3, 4]) } as never,
    ground: [1, 2, 3], centre: [-0, NaN, Infinity] as number[],
    layout: { big: [{ bot: 0, top: null }], extra: undefined } as never,
    sea: [{ x: 0.25, y: -1 }],
    stones: new Float32Array([0.5, 1.25]) as never,
  };
};

describe("baked art files", () => {
  it("keep every value and array exactly", () => {
    const r = sample(), back = decodeResult(encodeResult(r));
    expect(back).toEqual(r);
    expect(Object.is(back.centre![0], -0)).toBe(true);
    expect(back.px.normal).toBeInstanceOf(Uint8Array);
    expect((back as { stones: unknown }).stones).toBeInstanceOf(Float32Array);
    expect("extra" in (back.layout as object)).toBe(true);
    expect(back.px.normal.buffer.byteLength).toBe(back.px.normal.byteLength); // (its own buffer, transferable)
  });
  it("store an RGBA plane a channel at a time, and an indexed one as it is", () => {
    const r = sample(), bytes = encodeResult(r), head = JSON.parse(new TextDecoder().decode(bytes.subarray(9, 9 + new DataView(bytes.buffer).getUint32(5, true))));
    expect(head.px.normal.p).toBe(4);
    expect(head.px.albedo.p).toBeUndefined();
  });
  it("name a file by its key as the build does", async () => {
    expect(await bakedName("art-kind-v1|x|y|creature:fox|")).toBe(createHash("sha256").update("art-kind-v1|x|y|creature:fox|").digest("hex").slice(0, 20));
  });
});

describe("bakedGet", () => {
  afterEach(() => vi.unstubAllGlobals());
  it("fetches a listed set and answers null, without a request, for one not listed", async () => {
    const r = sample(), key = "art-kind-v1|k|s|creature:fox|", name = await bakedName(key), file = gzipSync(encodeResult(r));
    const asked: string[] = [];
    vi.stubGlobal("fetch", async (u: URL) => {
      asked.push(String(u));
      if (String(u).endsWith("manifest.json")) return new Response(JSON.stringify({ schema: 1, files: { [name]: file.length } }));
      if (String(u).endsWith(name + ".bin")) return new Response(file);
      return new Response("", { status: 404 });
    });
    const base = "http://x/game/art-baked/";
    expect(await bakedGet(key, base)).toEqual(r);
    expect(await bakedGet(key + "other", base)).toBeNull();
    expect(asked).toEqual([base + "manifest.json", base + name + ".bin"]);
  });
  it("answers null when there's no manifest", async () => {
    vi.stubGlobal("fetch", async () => new Response("", { status: 404 }));
    expect(await bakedGet("k", "http://y/art-baked/")).toBeNull();
  });
});
