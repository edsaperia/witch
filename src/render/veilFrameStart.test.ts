// A readback round trip must precede even resize/program checks, not just the final scene draw.
import { expect, it } from 'vitest';
import { View } from './view';

it('polls before View.render accesses any other frame state, including held repaints', () => {
  const stop = new Error('first operation: poll');
  const view = { occlusion: { beginFrame: () => { throw stop; } } } as unknown as View;
  for (const repaintHeld of [false, true]) {
    expect(() => View.prototype.render.call(view, 20, true, repaintHeld)).toThrow(stop);
  }
});
