// The hats' own art in play (#723, art builder Bravo's; rules/hatSpells.ts): a sprout under each of the Harvest hat's berries
// (art/country.js harvest-sprout-1..3, by its place in the ring) and the Cyclone hat's whirlwind where it blows (art/effects.js:
// rising, its loop at a turn a second, then falling apart as it flings what it holds), at its foot's middle. Both move or
// come and go, so they're drawn each frame from the scene atlas (render/artBuild.ts sceneSprites), never baked into the scenery.
import type { View } from "../view";
import { SpriteBatch, type SpriteInstance } from "../sprites";
import { CYCLONE_FRAMES, HARVEST_SPROUTS } from "../artBuild";

const FPS = 8; // (the whirlwind's frames: art/effects.js, 8 a second, a turn every 8)
const [RISE, LOOP, FALL] = CYCLONE_FRAMES.map(([, n]) => n);

/** The whirlwind's frame at `e` seconds into the Cyclone's spell of `time` seconds (its fling `fling`): null once it's over. */
export function cycloneFrame(e: number, time: number, fling: number): string | null {
  if (e < 0) return null;
  if (e < RISE / FPS) return `fx:cycloneRise/${Math.min(RISE - 1, Math.floor(e * FPS))}`;
  if (e < time) return `fx:cyclone/${Math.floor(e * FPS) % LOOP}`;
  if (e < time + fling) return `fx:cycloneFall/${Math.min(FALL - 1, Math.floor(((e - time) / Math.max(1e-3, fling)) * FALL))}`;
  return null;
}

export function drawHatArt(v: View): void {
  const g = v.game, B = g.berries, Y = g.tuning.spells.cyclone, now = g.clock.time, items: SpriteInstance[] = [];
  const ring = (B.harvest ?? []).map((id, i) => ({ b: B.berries[id], i })).filter(q => q.b && !q.b.gone);
  const winds = Y ? g.witches.map(w => w.spells.cyc).filter((c): c is NonNullable<typeof c> => !!c && !!cycloneFrame(now - c.at, Y.time, Y.flingTime)) : [];
  const batch = v.decorBatches.get("hatArt");
  for (const c of winds) {
    const age=now-c.at, fade=Math.min(1,age/0.3,Math.max(0,(Y!.time+Y!.flingTime-age)/0.4));
    v.magic.draw("wind", "vortex", c.x, 2.5, c.z, 2, 1.1, fade, age/Y!.time, 800001);
  }
  if (!ring.length) { batch?.set([]); return; }
  if (!ring.length && !winds.length) { batch?.set([]); return; }
  const sa = v.assets.sceneArt();
  if (!sa) return;
  const put = (ref: string, x: number, z: number) => {
    const a = sa.pieces[ref];
    if (!a) return;
    const frame = sa.atlas.frames[a.frame], m = a.ppm ? 1 / a.ppm : v.mpp; // (metres an art pixel of this one)
    items.push({ x: x - (a.originX - frame.w / 2) * m, y: 0, z, frame, flip: false, scale: m / v.mpp });
  };
  for (const { b, i } of ring) { const p = B.bushes[b.bush]; put(HARVEST_SPROUTS[i % HARVEST_SPROUTS.length], p.x, p.z - 0.05); }
  v.batchFor(v.decorBatches, "hatArt", () => new SpriteBatch(sa.atlas, v.mpp, { solid: true }))?.set(items);
}
