import { expect, it } from "vitest";
import * as THREE from "three";
import type { View } from "./view";
import type { Atlas } from "./atlas";
import { SpriteBatch } from "./sprites";
import { captureDodgeEchoes, dodgeEchoesFor, resetDodgeEchoes } from "./view/dodgeEchoes";
import { comfort } from "./comfort";

it("captures the supplied body, clears for comfort and island reset, and never replays the held dodge", () => {
  const atlas: Atlas = { albedo: new THREE.DataTexture(), normal: new THREE.DataTexture(), albedoPal: new THREE.DataTexture(), normalPal: new THREE.DataTexture(), indexed: new THREE.Vector2(), frames: [] };
  const scene = new THREE.Scene(), source = new SpriteBatch(atlas, 0.1, { absolute: true });
  const view = { scene, mpp: 0.1, game: { tuning: { bare: false } } } as unknown as View;
  const echoes = dodgeEchoesFor(view); echoes.enabled = true;
  const body = [{ x: 1, y: 0, z: 0, flip: false, frame: { uv: [0, 0, 1, 1] as [number, number, number, number], w: 10, h: 20 } }];
  const dash = { at: 0.1, until: 0.2 };
  try {
    captureDodgeEchoes(view, 0, source, body, 0, { at: -Infinity, until: -Infinity });
    captureDodgeEchoes(view, 0.11, source, [], 0, dash);
    expect(scene.children).toHaveLength(3);
    comfort.reduceFlashing = true;
    captureDodgeEchoes(view, 0.12, source, [], 0, dash);
    expect(((scene.children[0] as THREE.Mesh).geometry as THREE.InstancedBufferGeometry).instanceCount).toBe(0);
    comfort.reduceFlashing = false;
    captureDodgeEchoes(view, 0.21, source, body, 0, dash);
    expect(((scene.children[0] as THREE.Mesh).geometry as THREE.InstancedBufferGeometry).instanceCount).toBe(0);
    resetDodgeEchoes(view);
    expect(scene.children).toHaveLength(0);
    captureDodgeEchoes(view, 0.22, source, body, 0, dash);
    expect(scene.children).toHaveLength(0);
  } finally { comfort.reduceFlashing = false; resetDodgeEchoes(view); source.release(); }
});
