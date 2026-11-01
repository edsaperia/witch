import { expect, it } from "vitest";
import { DodgeEchoHistory, ECHO_SECONDS } from "./dodgeEchoModel";

function fixture() {
  const model = new DodgeEchoHistory<{ frame: number; flip: boolean }>(p => ({ ...p })), world = {}, art = {};
  let dash = { at: -Infinity, until: -Infinity };
  const tick = (t: number, x: number | null, enabled = true, appearance = art, owner = world) => model.update(owner, appearance, t, dash, x === null ? null : { x, y: 1, z: 0, pose: { frame: Math.round(t * 10), flip: x < 0 } }, enabled);
  return { model, world, art, tick, blink: (at: number) => { dash = { at, until: at + 0.05 }; } };
}
it("freezes actual sampled departure poses and adds only the visible arrival, never a fabricated gap pose", () => {
  const p = fixture(); p.tick(0, 0); p.tick(0.1, 1); p.tick(0.2, 2); p.blink(0.21);
  const leaving = p.tick(0.22, null);
  expect(leaving.map(e => e.x)).toEqual([2, 1]); expect(leaving.map(e => e.pose.frame)).toEqual([2, 1]);
  const arrival = p.tick(0.27, 12);
  expect(arrival.map(e => e.x)).toEqual([2, 1, 12]); expect(arrival).toHaveLength(3);
});
it("does not duplicate a held dash through paused frames and fades/expires on its clock", () => {
  const p = fixture(); p.tick(0, 0); p.blink(0.1);
  const first = structuredClone(p.tick(0.11, null));
  for (let i = 0; i < 10; i++) expect(p.tick(0.11, null)).toEqual(first);
  expect(p.tick(0.2, null)[0].alpha).toBeLessThan(first[0].alpha);
  expect(p.tick(0.1 + ECHO_SECONDS, null)).toHaveLength(0);
});
it("starts a full arrival lifetime when she actually reappears after the real 0.2s gap", () => {
  const m = new DodgeEchoHistory<number>(x => x), world = {}, art = {}, pose = (x: number) => ({ x, y: 0, z: 0, pose: x });
  m.update(world, art, 0, { at: -Infinity, until: -Infinity }, pose(0), true);
  const dash = { at: 0.1, until: 0.3 };
  m.update(world, art, 0.11, dash, null, true);
  const arrival = m.update(world, art, 0.31, dash, pose(15), true).find(e => e.x === 15)!;
  expect(arrival.born).toBe(0.31); expect(arrival.alpha).toBe(0.24);
  expect(m.update(world, art, 0.5, dash, pose(15), true).some(e => e.x === 15)).toBe(true);
  expect(m.update(world, art, 0.64, dash, pose(15), true)).toHaveLength(0);
});
it("bounds repeated dodges and never restarts an expired event seen by a late frame", () => {
  const p = fixture(); p.tick(0, 0);
  let peak = 0;
  for (let i = 1; i <= 8; i++) { p.blink(i * 0.05); const echoes = p.tick(i * 0.05, i); expect(echoes.length).toBeLessThanOrEqual(3); peak = Math.max(peak, echoes.length); }
  expect(peak).toBe(3);
  p.blink(1); expect(p.tick(3, 100)).toHaveLength(0);
});
it("clears old atlas poses on costume/island changes and time rewind", () => {
  const p = fixture(); p.tick(0, 0); p.blink(0.1); expect(p.tick(0.11, null)).toHaveLength(1);
  expect(p.tick(0.12, 2, true, {})).toHaveLength(0);
  expect(p.tick(0.13, 2, true, p.art, {})).toHaveLength(0);
  expect(p.tick(0.01, 0)).toHaveLength(0);
});
it("does not resurrect a dash after quality/comfort re-enable, and does not mutate captured pose payloads", () => {
  const p = fixture(); p.tick(0, 0); p.blink(0.1); p.tick(0.11, null, false);
  expect(p.tick(0.12, null, true)).toHaveLength(0);
  const pose = { frame: 1, flip: false }, m = new DodgeEchoHistory<typeof pose>(x => ({ ...x })), world = {}, art = {};
  m.update(world, art, 0, { at: -Infinity, until: -Infinity }, { x: 0, y: 0, z: 0, pose }, true); pose.frame = 99;
  expect(m.update(world, art, 0.1, { at: 0.1, until: 0.2 }, null, true)[0].pose.frame).toBe(1);
});
