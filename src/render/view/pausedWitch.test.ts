import { expect, it } from "vitest";
import { placeholderAtlas } from "../atlas";
import { SpriteBatch } from "../sprites";
import { bareBodyBatch, submitWitchInstances } from "./witch";

it("submits identical witch instances on two retained repaints across hatless-art readiness", () => {
  const placeholder = placeholderAtlas(1), readyAtlas = placeholderAtlas(1);
  const body = new SpriteBatch(readyAtlas, 1), bare = new SpriteBatch(placeholder, 1);
  const assets = { bareReady: false, witchBare: () => readyAtlas };
  const v = { assets, bareBatch: bare, makeWitchBatch: () => bare } as unknown as Parameters<typeof bareBodyBatch>[0];
  const witch = [{ x: 2, y: 3, z: 4, frame: readyAtlas.frames[0], flip: false }];
  submitWitchInstances(body, witch, false);
  const pos = () => Array.from(body.mesh.geometry.getAttribute("iPos").array.slice(0, 3));
  const heldPosition = pos();
  for (const ready of [false, true]) {
    assets.bareReady = ready;
    expect(bareBodyBatch(v, true, true)).toBeNull();
    submitWitchInstances(body, [], true);
    submitWitchInstances(bare, witch, true);
    expect(body.count).toBe(1);
    expect(body.items).toEqual(witch);
    expect(pos()).toEqual(heldPosition);
    expect(body.mesh.visible).toBe(true);
    expect(bare.count).toBe(0);
  }
  expect(bareBodyBatch(v, true, false)).toBeNull();
  bare.setAtlas(readyAtlas);
  expect(bareBodyBatch(v, true, false)).toBe(bare);
  submitWitchInstances(body, [], false);
  submitWitchInstances(bare, witch, false);
  for (let repaint = 0; repaint < 2; repaint++) {
    expect(bareBodyBatch(v, true, true)).toBe(bare);
    submitWitchInstances(bare, [], true);
    expect(bare.items).toEqual(witch);
    expect(body.count).toBe(0);
  }
});
