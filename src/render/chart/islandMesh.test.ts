import * as THREE from "three";
import { describe, expect, it } from "vitest";
import { buildIslandMesh, vertexNormals } from "./islandMesh";

// A small island's ground: hills, a lake with a rust-pool look and a tar pit, a sinkhole, seeded.
function ground(seed: number) {
  const cols = 24, rows = 20, n = cols * rows, h = new Float32Array(n), water = new Uint8Array(n), level = new Float32Array(n), looks = new Uint8Array(n);
  let s = seed; const rnd = () => { s = (Math.imul(s, 1664525) + 1013904223) >>> 0; return s / 4294967296; };
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const i = r * cols + c, dx = (c - cols / 2) / (cols / 2), dz = (r - rows / 2) / (rows / 2), d = Math.hypot(dx, dz);
    h[i] = d > 0.8 ? -(d - 0.8) * 600 - 1 : 4 + (0.8 - d) * 40 + rnd() * 3;
    if (h[i] <= 0) water[i] = 1;
    if (d < 0.25 && c < cols / 2) { water[i] = 2; level[i] = h[i] + 1; looks[i] = 7; } // a rust pool
    if (d < 0.22 && c >= cols / 2 && r < rows / 2) { water[i] = 2; level[i] = h[i] + 0.8; looks[i] = 6; } // a tar pit
    if (d < 0.2 && c >= cols / 2 && r >= rows / 2) { water[i] = 2; level[i] = h[i] + 2; looks[i] = 4; } // a sinkhole
  }
  return { x0: -300, z0: -250, step: 25, cols, rows, h, water, level, looks };
}

describe("the chart's island meshes made off the page (render/chart/islandMesh.ts)", () => {
  it("makes the normals exactly as three.js's computeVertexNormals does", () => {
    for (const seed of [1, 2, 3]) {
      const G = ground(seed), M = buildIslandMesh(G, 100 / 14000);
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(M.pos.slice(), 3)); geo.setIndex(new THREE.BufferAttribute(M.idx.slice(), 1));
      geo.computeVertexNormals();
      const ref = geo.getAttribute("normal").array as Float32Array;
      expect(ref.length).toBe(M.normal.length);
      let same = 0; for (let i = 0; i < ref.length; i++) if (Object.is(ref[i], M.normal[i])) same++;
      expect(same).toBe(ref.length);
      expect(Array.from(vertexNormals(M.pos, M.idx))).toEqual(Array.from(M.normal));
    }
  });
  it("keeps the triangles three.js would (16-bit indices under 65535 vertices), the land above the water and the lakes at their levels", () => {
    const G = ground(4), M = buildIslandMesh(G, 100 / 14000);
    expect(M.idx).toBeInstanceOf(Uint16Array);
    expect(M.idx.length % 3).toBe(0); expect(M.wi.length % 3).toBe(0);
    expect(M.top).toBeGreaterThan(0.04);
    expect(M.tmax).toBeGreaterThan(0); expect(Math.max(...M.tile)).toBe(255);
    expect(M.lakes).not.toBeNull();
    const L = M.lakes!;
    expect(L.li.length % 3).toBe(0);
    // a lake sample's water lies over its bed, in from its shore its special look reaches its middle, and a sinkhole has no water drawn
    let over = 0, pits = 0;
    for (let i = 0; i < G.cols * G.rows; i++) if (G.water[i] === 2) { if (L.lp[i * 3 + 1] > M.pos[i * 3 + 1]) over++; if (G.looks[i] === 4) pits++; }
    expect(over).toBeGreaterThan(10);
    expect(pits).toBeGreaterThan(0);
    for (let t = 0; t < L.li.length; t += 3) for (const v of [L.li[t], L.li[t + 1], L.li[t + 2]]) expect(L.lk[v]).not.toBe(4);
    // the shallows ring the land: every shallows quad (two triangles) has a sample under the water
    for (let t = 0; t < M.wi.length; t += 6) expect([M.wi[t], M.wi[t + 1], M.wi[t + 2], M.wi[t + 5]].some(v => G.h[v] <= 0)).toBe(true);
  });
  it("a bigger grid takes 32-bit indices", () => {
    const G = ground(5), big = { ...G, cols: 300, rows: 230, h: new Float32Array(300 * 230).fill(5), water: undefined, level: undefined, looks: undefined };
    expect(buildIslandMesh(big, 0.01).idx).toBeInstanceOf(Uint32Array);
  });
});
