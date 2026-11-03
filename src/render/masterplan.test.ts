import { expect, it, vi } from 'vitest';
import type { Game } from '../rules/game';
import type { Creature } from '../rules/creatures';
import type { Directive } from '../rules/combat/packs';
import { animalPlan } from './masterplan';

it('separates the moving quarry, assigned formation slot and committed attack point', () => {
  const g = { clock: { time: 5 }, witches: [{ body: { x: 2, z: 8 } }] } as Game;
  const c = { fight: { target: { kind: 'witch', id: 0 }, aimX: 3, aimZ: 7, windupUntil: 6 } } as Creature;
  const directive = { role: 'shooter', slot: { x: 1, z: 4 } } as Directive;
  const draw = vi.fn();
  animalPlan(g, c, directive, draw);
  expect(draw.mock.calls.map(([point, , marker]) => [point, marker])).toEqual([
    [{ x: 2, z: 8 }, 'arrow'], [{ x: 1, z: 4 }, 'slot'], [{ x: 3, z: 7 }, 'aim'],
  ]);
});

it('shows the chosen walking destination in quiet exploration and drops it at rest', () => {
  const g = { clock: { time: 5 } } as Game;
  const c = { state: 'wild', tx: 5, tz: 7, rest: 0 } as Creature;
  const draw = vi.fn();
  animalPlan(g, c, undefined, draw);
  expect(draw).toHaveBeenCalledWith({ x: 5, z: 7 }, expect.any(Number), 'arrow');
  c.rest = 2;
  animalPlan(g, c, undefined, draw);
  expect(draw).toHaveBeenCalledTimes(1);
});
