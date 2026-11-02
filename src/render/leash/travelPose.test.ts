import { describe, expect, it } from 'vitest';
import { groundLinks, sigilPath, travelPose, type TravelPose } from './travelPose';

const air = [{ x: 0, y: 7, z: 0 }, { x: 2, y: 4, z: 0 }, { x: 4, y: 1, z: 0 }];
const ground = groundLinks([{ x: 4, z: 0 }, { x: 4, z: 3 }, { x: 0, z: 3 }, { x: 0, z: 0 }], 1);
it('lays links in sigil order around a route corner at the ordinary link spacing', () => {
  expect(ground).toHaveLength(11);
  expect(ground[3]).toEqual({ x: 0, y: .15, z: 3 });
  expect(ground[7]).toEqual({ x: 4, y: .15, z: 3 });
  expect(ground.at(-1)).toEqual({ x: 4, y: .15, z: 0 });
});
it('starts each transition at the current pose, including a rejoin halfway through a fall', () => {
  const state: TravelPose = {};
  travelPose(state, false, air, 0, .5);
  expect(travelPose(state, true, ground, 1, .5)).toEqual(air);
  const falling = travelPose(state, true, ground, 1.25, .5);
  expect(falling[0].y).toBeCloseTo((7 + .15) / 2);
  const lifting = travelPose(state, false, air, 1.25, .5);
  expect(lifting).toHaveLength(falling.length);
  lifting.forEach((p, i) => expect(p.y).toBeCloseTo(falling[i].y));
  expect(travelPose(state, false, air, 1.75, .5)).toBe(air);
});
it('reaches the ground in the configured time and lifts the sigil end first', () => {
  const state: TravelPose = {};
  travelPose(state, false, air, 0, 1);
  travelPose(state, true, ground, 0, 1);
  expect(travelPose(state, true, ground, 1, 1)).toBe(ground);
  travelPose(state, false, air, 1, 1);
  const lifting = travelPose(state, false, air, 1.2, 1);
  expect(lifting[0].y).toBeGreaterThan(.15);
  expect(lifting.at(-1)!.y).toBe(.15);
});

// Ed, 2026-11-02: "the chains of my leashed creatures are attached to me instead of to their sigils. When I'm in the air, it should
// still attach to their sigils, but fall to the ground quickly and become their walking path."
describe('a travelling follower\'s chain hangs from its sigil', () => {
  // (her at the origin, her sigil 3 m over her hat and a little off by the stack's sway; the walking path, creature first, bends)
  const route = [{ x: 0, z: 20 }, { x: 10, z: 10 }, { x: 0, z: 0 }], sigil = { x: 0.4, y: 3, z: -0.2 };
  it('starts at the sigil, not at her feet, on the ground and in the air', () => {
    for (const y of [3, 14]) {
      const chain = sigilPath({ ...sigil, y }, route, 0.78, 0.5);
      expect(chain[0]).toEqual({ ...sigil, y });
      expect(chain.at(-1)).toEqual({ x: 0, y: .15, z: 20 });
    }
  });
  it('falls to the ground fall m along the path a metre fallen and lies along the walking path from there', () => {
    const chain = sigilPath(sigil, route, 0.5, 0.5), drop = (3 - .15) * 0.5;
    const along = (p: { x: number; z: number }) => Math.hypot(p.x, p.z); // (the path's first leg runs out from her along x = z)
    for (const p of chain) if (along(p) > drop + 0.3) expect(p.y).toBeCloseTo(.15);
    // (and still in the air close to the sigil, coming down all the way)
    expect(chain[1].y).toBeGreaterThan(2);
    for (let i = 1; i < chain.length; i++) expect(chain[i].y).toBeLessThanOrEqual(chain[i - 1].y + 1e-9);
    // (on the ground, on the path: the bend at (10, 10) is a link)
    expect(chain.some(p => Math.hypot(p.x - 10, p.z - 10) < 0.3 && p.y === .15)).toBe(true);
  });
  it('keeps its links evenly spaced, the fall counted', () => {
    const chain = sigilPath({ ...sigil, y: 14 }, route, 1, 0.5), gaps = chain.slice(1).map((p, i) => Math.hypot(p.x - chain[i].x, p.y - chain[i].y, p.z - chain[i].z));
    for (const g of gaps) expect(g).toBeLessThanOrEqual(1.0001);
    expect(Math.min(...gaps)).toBeGreaterThan(0.6);
  });
  it('drops straight down with fall 0, and lies flat from a sigil placed on the ground', () => {
    const straight = sigilPath(sigil, route, 0.5, 0);
    expect(straight.filter(p => p.y > .16).every(p => Math.hypot(p.x, p.z) <= Math.hypot(sigil.x, sigil.z) + 1e-6)).toBe(true); // (down to the path's start, under her)
    const placed = sigilPath({ x: 0, y: .15, z: 0 }, route, 1, 0.5);
    expect(placed.every(p => p.y === .15)).toBe(true);
    expect(placed).toEqual(groundLinks(route, 1));
  });
  it('copes with a creature at its sigil', () => {
    const chain = sigilPath(sigil, [{ x: 0, z: 0 }, { x: 0, z: 0 }], 1, 0.5);
    expect(chain[0]).toEqual(sigil);
    expect(chain.at(-1)!.y).toBeCloseTo(.15);
  });
});
