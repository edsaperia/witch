// How the view steps a mesh creature's baked walk so its planted feet stay put (Ed, 2026-11-12, of the walk clip: "the feet don't
// plant"; its legs "still slide or skate, mostly short-legged animals at speed"). No three.js, nothing drawn: the view
// (src/render/view/creatures.ts) calls it once a creature a frame, and tools/creature-mesh/slip.mjs plays it to measure the slip.
//
// A baked frame has the animal part-way through its cycle, each planted paw a little further back under it than in the frame
// before: one `step` further (art/mesh/index.js meshGait: a clip goes one stride in its `cycle` frames, and a planted paw goes
// back under the body at exactly that pace: art/mesh/shape.js `strides`). So a paw stays on its spot of ground only if the
// animal is drawn exactly a step further on each time the frame changes, and nowhere between. That is what this does: the
// sprite goes forward in whole steps, with its frames, and is drawn up to a step behind where the creature is (`shift`). Drawn
// where the creature is and stepping a frame now and then, as the first meshes were, a planted foot slides forward a step's
// length under every frame and jumps back at the next.
//   - Two paces. A slow clip (short strides, most feet down) and a fast one (long strides, time in the air: a trot or a bound),
//     picked by how fast it is going, so its legs neither creep through a huge stride at a crawl nor blur through a tiny one at a
//     sprint. Past what the fast clip's stride covers, the frames come faster (no cap: a cap is feet sliding).
//   - Stopping. From the slow clip it takes the step it was in the middle of and stands on a frame of its walk that has every
//     foot down (`rests`): no jump to another picture. From the fast clip it goes to its standing frame (`stand`).

/** A creature's stride as the view keeps it: d (how far it has gone in this clip), F (how many frames of it that has shown),
 *  run (which clip), v (its pace, smoothed), still (how long it has stood), stood (it is on its standing frame), dx, dz (the way
 *  it last went). */
export const newStride = () => ({ d: 0, F: 0, run: false, v: 0, still: 0, held: 0, stood: true, dx: 1, dz: 0 });

/** Cycles a second of the slow clip past which it breaks into the fast one, and under which it drops back. */
export const BREAK = { up: 1.5, down: 1.0 };
/** How long it must be stopped before it settles (seconds), and how long each frame of settling takes. */
export const SETTLE = { after: 0.1, frame: 0.07 };

/** One frame of the view. o: newStride's record; G: { cycle (frames in a clip's cycle), step (how far it goes between the slow
 *  clip's frames, the game's metres), rests (the slow clip's frames that have every foot down), run: { step } (the fast clip, if
 *  it has one) }; dist: how far the creature went this frame, the same metres; dt: seconds. Returns { frame (of the clip's
 *  cycle), run (the fast clip), stand (show the standing frame instead), shift (how far along its way to draw it from where it
 *  is: under zero, behind), settled (it stood still this frame: for the view's little squash as it lands) }. */
export function stepStride(o, G, dist, dt) {
  const n = G.cycle, moving = dist > 1e-6;
  let settled = false;
  if (moving) {
    o.v += (dist / Math.max(dt, 1e-4) - o.v) * Math.min(1, dt / 0.15); o.still = 0;
    if (G.run) {
      const cadence = o.v / (G.step * n), to = o.run ? cadence >= BREAK.down : cadence > BREAK.up;
      // (another clip: at the same place in the cycle, drawn where it was, so nothing jumps but the picture)
      if (to !== o.run) { const was = o.run ? G.run.step : G.step, now = to ? G.run.step : G.step, shift = o.F * was - o.d; o.F = ((o.F % n) + n) % n; o.d = o.F * now - shift; o.run = to; }
    }
    if (o.stood) { o.stood = false; } // (off its standing frame: on from where it was)
    o.d += dist;
  } else {
    o.still += dt; o.v *= Math.max(0, 1 - dt / 0.15);
    if (o.still > SETTLE.after && !o.stood) {
      const f = ((o.F % n) + n) % n;
      if (o.run || !(G.rests?.length)) { o.stood = true; settled = true; }
      else if (!G.rests.includes(f)) { o.held += dt; if (o.held >= SETTLE.frame) { o.held = 0; o.F++; } } // (the step it was in the middle of)
    }
  }
  const s = o.run ? G.run.step : G.step;
  if (moving) { const at = Math.floor(o.d / s + 1e-9); if (at > o.F) o.F = at; }
  return { frame: ((o.F % n) + n) % n, run: o.run, stand: o.stood, shift: o.stood && o.run ? 0 : o.F * s - o.d, settled };
}
