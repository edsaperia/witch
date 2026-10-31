import type { View } from "../view";
import { DodgeEchoView } from "../dodgeEcho";
import type { EchoDash } from "../dodgeEchoModel";
import { SPRITE_UNIFORMS, type SpriteBatch, type SpriteInstance } from "../sprites";
import { FX_QUALITY } from "../fx/system";
import { comfort } from "../comfort";
import { groundHeight } from "../height";

const views = new WeakMap<View, DodgeEchoView>();
const reducedMotion = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;

export function dodgeEchoesFor(v: View): DodgeEchoView {
  let echoes = views.get(v);
  if (!echoes) { echoes = new DodgeEchoView(v.scene, v.mpp); views.set(v, echoes); }
  return echoes;
}

/** The producer passes its actual visible body pose and dash, including local-actor and bare-hat choices. */
export function captureDodgeEchoes(v: View, time: number, source: SpriteBatch | null | undefined, body: readonly SpriteInstance[], sink: number, dash: EchoDash): void {
  if (!source) { views.get(v)?.reset(); return; }
  const echoes = dodgeEchoesFor(v), sprite = body[0];
  const pose = sprite ? { sprite, sink, lean: source.leanU.value.toArray() as [number, number, number, number] } : null;
  echoes.update(v.game, source.atlas, time, dash, pose, SPRITE_UNIFORMS.uUp.value,
    FX_QUALITY.secondary && !comfort.reduceFlashing && !reducedMotion && !v.game.tuning.bare, groundHeight);
}

/** Release own materials/buffers before old island atlases are reseated; borrowed textures stay their owner's. */
export function resetDodgeEchoes(v: View): void { views.get(v)?.reset(); }
