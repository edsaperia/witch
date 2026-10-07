// window.witch: the game's hooks for the smoke test, the tools (tools/smoke, tools/feel, tools/sfx, tools/bench) and for poking
// at in the console.
import { Vector3 } from "three";
import { setupArena } from "../rules/arena";
import { cellKey } from "../rules/party";
import { areaUnderWitch, hitWitch, interpolated, joinParty, loseSoundsystem, STEP, stepGame, type Game } from "../rules/game";
import { AREA_TYPES } from "../rules/map";
import type { Tuning } from "../rules/tuning";
import type { Bot } from "../rules/bot";
import type { View } from "../render/view";
import { bendPoint, groundHeight, placed } from "../render/height";
import { SPRITE_UNIFORMS } from "../render/sprites";
import { LIGHT_UNIFORMS } from "../render/lighting";
import type { BotTag } from "../ui/botGame";
import type { OutputMeter } from "../platform/audio/outputMeter";
import type { Hud } from "./hud";
import type { Sound } from "./sound";
import type { ScreenShake } from "./shake";

export interface HookDeps {
  game: Game; view: View; tuning: Tuning; hud: Hud; sound: Sound; meter: OutputMeter; shake: ScreenShake;
  loadTimes: Record<string, number>;
  /** The loop's own state, read and set through these. */
  loop: { manual: boolean; readonly bot: Bot | null; readonly botTag: BotTag | null; readonly ready: boolean };
}

export function installHooks({ game, view, tuning, hud, sound, meter, shake, loadTimes, loop }: HookDeps): void {
  const applyShake = () => shake.apply();
  (window as unknown as { witch: unknown }).witch = { game, view, arena: (spec: string) => setupArena(game, spec), // (a debug hook: another arena without reloading)
    /** A debug hook (screenshots of the party's life): creature `id` joins its area's party, happy, at its spot (rules/partyGuests.ts); home's round the dancefloor. */
    guest: (id: number) => { const c = game.creatures[id], a = game.party.areas.get(cellKey(c.cell)); if (!c || !a) return false; c.state = "happy"; c.enraged = false; c.siege = undefined; joinParty(game, c, a.soundsystem ?? game.map.dancefloor, a.cell); return true; },
    /** A debug hook: lose a soundsystem now (its key, "home" the dancefloor's ring), as if destroyed. */
    lose: (key = "home") => { const s = game.combat.sounds.get(key); if (s) s.hp = 0; loseSoundsystem(game, key, s?.x ?? 0, s?.z ?? 0); const e = game.waveEvents[game.waveEvents.length - 1]; if (e) hud.showLoss(e); return e; },
    /** A debug hook (the dropped hat's previews): a hit on her now, as a creature's would be (her last one knocks her out). */
    hit: () => { hitWitch(game, 0, game.clock.time); return !!game.witches[0].ko; },
    get manual() { return loop.manual; }, set manual(on: boolean) { loop.manual = on; },
    /** The bot game's bot and its tag (rules/bot.ts, ui/botGame.ts), null in a game of her own: tools drive it a frame at a time. */
    get bot() { return loop.bot; }, get botTag() { return loop.botTag; },
    /** A debug hook (tools/sfx/live.cjs): the audio context, the music and the sound effects. */
    get audio() { return { ctx: sound.audio, music: sound.music, sfx: sound.sfx, mends: sound.watchdog?.mends ?? [], meter }; },
    /** A debug hook for frame feel (tools/feel/trace.cjs): one frame as the real loop runs it (the
     *  fixed steps, the render eased between the last two, the camera's sub-pixel glide), then where
     *  things landed on screen, in screen pixels as drawn (the art-pixel snap and the canvas's shift):
     *  the witch, ground points (probes, metres) and creatures (ids). */
    frameLive: (c: Parameters<typeof stepGame>[1], dt: number, probes: { x: number; z: number }[] = [], ids: number[] = []) => {
      const t0 = game.clock.time;
      stepGame(game, c, dt);
      const steps = Math.round((game.clock.time - t0) / STEP), alpha = game.alpha, P = tuning.pixelSize;
      const v = new Vector3(), ndc = (x: number, y: number, z: number) => { placed(v.set(x, y, z)).project(view.camera); return v; };
      const snap = (n: Vector3) => [(Math.floor((n.x * 0.5 + 0.5) * view.width) + 0.5) * P, (Math.floor((-n.y * 0.5 + 0.5) * view.height) + 0.5) * P];
      let at: { witch: number[]; probes: number[][]; creatures: (number[] | null)[]; witchWorld: number[] } = { witch: [], probes: [], creatures: [], witchWorld: [] };
      interpolated(game, () => {
        view.render(Math.max(0, game.clock.time - (1 - game.alpha) * STEP * game.timeScale));
        const W = game.witch, B = view.witchBase;
        bendPoint(v.set(B.x, B.y, B.z)).project(view.camera);
        at = { witch: snap(v), witchWorld: [W.x, W.z], probes: probes.map(p => snap(ndc(p.x, 0, p.z))), creatures: ids.map(id => { const k = game.creatures[id]; return k ? snap(ndc(k.x, 0, k.z)) : null; }) };
      });
      applyShake();
      const { gx, gy } = shake.glide();
      const add = (q: number[] | null) => (q ? [q[0] + gx, q[1] + gy] : null);
      return { steps, alpha, gx, gy, time: game.clock.time, witch: add(at.witch), witchWorld: at.witchWorld, probes: at.probes.map(add), creatures: at.creatures.map(add) };
    },
    frame: (c: Parameters<typeof stepGame>[1], dt: number, draw = true) => { const t0 = performance.now(); stepGame(game, c, dt); const t1 = performance.now(); view.render(game.clock.time, draw); applyShake(); return { step: t1 - t0, render: performance.now() - t1, ms: view.ms }; }, areaUnderWitch: () => areaUnderWitch(game), areaTypeId: (i: number) => AREA_TYPES[i].id, lightUniforms: LIGHT_UNIFORMS, spriteUp: () => SPRITE_UNIFORMS.uUp.value, spriteRight: () => SPRITE_UNIFORMS.uRight.value, groundHeight, loadTimes, get ready() { return loop.ready; } };
}
