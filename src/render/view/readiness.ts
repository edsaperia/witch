// A4 mechanical extraction from src/render/view.ts; body identity is checked by tools/refactor/a4-split.mjs.
import type { View, ViewInternals, ViewShared } from "../view";
import * as THREE from "three";
import { monitorProgramLink, waitForPrograms, type ReadyProgram } from "../programReadiness";
import { materialProgramsReady } from "../shaderDrawGate";
import { lateLandingReady } from "../landingReadiness";
import { captureProgramUses, mapProgramUses } from "../programInventory";
import { Hiz } from "../hiz";
import { carvingMask } from "../legendCarving";
import { AREA_TYPES } from "../../rules/map";
import { nextFrame, runSliced, type Steps } from "../slices";
import { releaseDisposals } from "../retire";

export function readyPrograms(a4ViewHost: View, a4PrivateHost: ViewInternals, _a4SharedHost: ViewShared): ReadyProgram[] {
    const programs = (a4ViewHost.renderer.info.programs ?? []) as unknown as ReadyProgram[];
    for (const p of programs) if (!a4PrivateHost.monitoredPrograms.has(p)) {
      a4PrivateHost.monitoredPrograms.add(p); monitorProgramLink(a4ViewHost.renderer.getContext(), p, message => console.error(message));
    }
    return programs;
  }

export function landingWakeReady(a4ViewHost: View, _a4PrivateHost: ViewInternals, _a4SharedHost: ViewShared): boolean {
    const A = a4ViewHost.assets;
    return A.fullWitchReady && A.home.treehouse && a4ViewHost.treehouseBatch.atlas === A.treehouse.atlas && a4ViewHost.landingHouseShare === 1 &&
      [...a4ViewHost.witchBatch.meshes, ...a4ViewHost.treehouseBatch.meshes].every(o => ([] as THREE.Material[]).concat((o as THREE.Mesh).material ?? []).every(m => materialProgramsReady(a4ViewHost.renderer.properties.get(m)))) &&
      !!a4ViewHost.houseRooms?.landingReady(a4ViewHost.renderer);
  }

export function beginLandingShaders(a4ViewHost: View, a4PrivateHost: ViewInternals, _a4SharedHost: ViewShared, chart: boolean): void { a4PrivateHost.shaderEpoch++; a4PrivateHost.shaderLandingDeadline = Infinity; a4PrivateHost.shaderChartLanding = chart; a4ViewHost.shaderLandingLimited = false; a4ViewHost.landingSleeping = false; a4PrivateHost.landingFades.reset(); a4ViewHost.landingHouseShare = 1; }

export function armLimitedLanding(a4ViewHost: View, a4PrivateHost: ViewInternals, _a4SharedHost: ViewShared): void {
    if (a4ViewHost.shaderLandingLimited) return;
    a4ViewHost.shaderLandingLimited = true; a4PrivateHost.landingFades.arm(a4ViewHost.assets.home);
    performance.mark('landing:limited');
  }

export function limitedLandingReady(a4ViewHost: View, a4PrivateHost: ViewInternals, _a4SharedHost: ViewShared, now: NonNullable<Parameters<View["limitedLandingReady"]>[0]>): boolean {
    const expired = now >= a4PrivateHost.shaderLandingDeadline;
    if (expired && !a4ViewHost.homeDone) a4PrivateHost.armLimitedLanding();
    if (!a4ViewHost.shaderLandingLimited) return false;
    if (a4ViewHost.shaderLandingLimited && a4ViewHost.assets.fullWitchReady) a4PrivateHost.swapHomeArt();
    const programs = a4ViewHost.witchBatch.meshes.every(o => ([] as THREE.Material[]).concat((o as THREE.Mesh).material ?? []).every(m => materialProgramsReady(a4ViewHost.renderer.properties.get(m))));
    return lateLandingReady(a4ViewHost.shaderLandingLimited, a4ViewHost.assets.fullWitchReady, programs);
  }

export async function waitForLandingWitch(a4ViewHost: View, _a4PrivateHost: ViewInternals, _a4SharedHost: ViewShared): Promise<void> {
    if (a4ViewHost.limitedLandingReady()) return;
    performance.mark('landing:witch-wait');
    while (!a4ViewHost.limitedLandingReady()) { a4ViewHost.assets.work(4); await nextFrame(); }
    performance.mark('landing:witch-ready');
  }

export function startLandingShaderGrace(_a4ViewHost: View, a4PrivateHost: ViewInternals, _a4SharedHost: ViewShared, at: NonNullable<Parameters<View["startLandingShaderGrace"]>[0]>): void {
    if (a4PrivateHost.shaderLandingDeadline !== Infinity) return;
    a4PrivateHost.shaderLandingDeadline = at + 15000;
    performance.mark('chart:landing-due', { detail: { at, deadline: a4PrivateHost.shaderLandingDeadline } });
  }

export async function compileAll(a4ViewHost: View, a4PrivateHost: ViewInternals, _a4SharedHost: ViewShared, allowPartial: NonNullable<Parameters<View["compileAll"]>[0]>): Promise<void> {
    const epoch = ++a4PrivateHost.shaderEpoch;
    if (allowPartial && !a4PrivateHost.shaderChartLanding) a4ViewHost.startLandingShaderGrace();
    a4PrivateHost.setReadiness("compile", 0, 1);
    // Every shader the scene holds compiled now, in the Bedroom, not on the first frame each is drawn (overnight phase 2: ten
    // programs compiled mid-run before, a hitch each: on the first steps, the first rise and the first waves; after, one).
    // In the background where the browser can (KHR_parallel_shader_compile); nothing it draws changes.
    // The hidden too (Ed's playtest, 2026-10-07: stalls of 100 ms and more in play): three compiles only what's visible, so
    // the treetops' crowns, hidden on the ground, and everything not yet showing compiled on its first frame, the driver's
    // wait inside it (getProgramInfoLog, 0.7-2.6 s a frame in the cloud's renderer, 50-200 ms on a real GPU). Everything is
    // shown for the call (its programs are made at once, as it's called) and hidden again before anything is drawn; then
    // play waits for them a few seconds at most, so on a GPU that compiles in parallel they're done in the Bedroom.
    const hidden: THREE.Object3D[] = [];
    const fx = a4ViewHost.post.fxScene; // (the smooth effects layer's own scene, and the post passes' quad: neither in the scene)
    const telemetry = (globalThis as unknown as { __travelProbe?: { record(e: unknown): void } }).__travelProbe;
    const originalUses = telemetry ? captureProgramUses([{ label: 'scene', root: a4ViewHost.scene }, ...(fx ? [{ label: 'effects', root: fx }] : [])]) : null;
    for (const sc of fx ? [a4ViewHost.scene, fx] : [a4ViewHost.scene]) sc.traverse(o => { if (!o.visible) { hidden.push(o); o.visible = true; } });
    // (and the occlusion pyramid's passes, which aren't in the scene: render/hiz.ts, built by the treehouse, where she starts)
    if (!a4PrivateHost.hizOff && !a4PrivateHost.hiz) a4PrivateHost.hiz = new Hiz(a4ViewHost.renderer);
    const allPrograms = () => a4PrivateHost.readyPrograms();
    const before = new Set(allPrograms().map(p => p.id)), groups: Record<string, number[]> = {};
    const launch = (group: string, fn: () => unknown) => {
      const prior = new Set(allPrograms().map(p => p.id)), result = fn();
      groups[group] = allPrograms().filter(p => !prior.has(p.id)).map(p => p.id);
      return result;
    };
    const compiled = Promise.all([launch('scene', () => a4ViewHost.renderer.compileAsync(a4ViewHost.scene, a4ViewHost.camera)), fx && launch('effects', () => a4ViewHost.renderer.compileAsync(fx, a4ViewHost.camera)), launch('post', () => a4ViewHost.post.compile()), a4PrivateHost.hiz?.ok && launch('hiz', () => a4PrivateHost.hiz!.compile(a4ViewHost.renderer))]).catch(() => { /* readiness is still checked per program below */ });
    // Diagnostic only: delay newly introduced sail programs, never the boot-warmed fallback/platform/witch programs.
    const delay = allowPartial ? Math.max(0, Number((globalThis as unknown as { __witchShaderReadinessDelay?: number }).__witchShaderReadinessDelay) || 0) : 0;
    if (delay) {
      const due = performance.now() + Math.min(delay, 60000);
      for (const p of allPrograms()) if (!before.has(p.id)) {
        const ready = p.isReady.bind(p); p.isReady = () => performance.now() >= due && ready();
      }
    }
    for (const o of hidden) o.visible = false;
    performance.mark("witch:prep-compile0");
    const parallel = a4ViewHost.renderer.extensions.has('KHR_parallel_shader_compile');
    const usages = originalUses ? mapProgramUses(originalUses, material => (a4ViewHost.renderer.properties.get(material) as { currentProgram?: { id: number } }).currentProgram?.id) : undefined;
    const record = (phase: string, pending: ReadyProgram[] = [], elapsed = 0) => {
      const detail = { kind: 'shader-programs', phase, at: performance.now(), parallel, elapsed, groups,
        programs: allPrograms().map(p => ({ id: p.id, name: p.name, type: p.type, ready: p.isReady(), added: !before.has(p.id), ...(usages?.[p.id] ? { sourceUses: usages[p.id] } : {}) })), pending: pending.map(p => p.id) };
      performance.mark(`witch:shader-${phase}`, { detail });
      telemetry?.record(detail);
      return detail;
    };
    record('start');
    // Ed6520617385: a sail may land after its15s grace; unfinished programs must never force a uniform read or draw.
    const complete = await waitForPrograms(allPrograms, compiled, (ready, total) => a4PrivateHost.setReadiness('compile', ready, total), (pending, elapsed) => {
      console.warn('view: shaders still pending; keeping the chart up', record('pending', pending, elapsed));
    }, undefined, undefined, () => allowPartial ? a4PrivateHost.shaderLandingDeadline : Infinity);
    if (!complete) {
      a4PrivateHost.armLimitedLanding();
      record('landing-limit', allPrograms().filter(p => !p.isReady()), performance.now() - a4PrivateHost.shaderLandingDeadline + 15000);
      void (async () => {
        await waitForPrograms(allPrograms, compiled, () => {}, () => {}, undefined, undefined, () => epoch === a4PrivateHost.shaderEpoch ? Infinity : -Infinity);
        if (epoch !== a4PrivateHost.shaderEpoch) return;
        const programs = [...(a4ViewHost.renderer.info.programs ?? [])];
        await runSliced((function* (_view: View) {
          for (const p of programs) {
            if (epoch !== a4PrivateHost.shaderEpoch) return;
            if ((p as unknown as ReadyProgram).isReady()) p.getUniforms();
            yield;
          }
        })(a4ViewHost), 'background-programs');
        if (epoch !== a4PrivateHost.shaderEpoch) return;
        record('background-ready'); a4ViewHost.shaderDrawStatus.active = false; releaseDisposals();
      })().catch(error => console.error('background shader readiness failed; retaining safe fallback', error));
      a4PrivateHost.setReadiness('ready', 1, 1);
      return; // no unfinished uniform reads, warm draws, uploads or GPU fence on the landing path
    }
    a4ViewHost.shaderDrawStatus.active = false;
    record('ready');
    performance.mark("witch:prep-compiled");
    releaseDisposals(); // (the last night's materials, kept till now: render/retire.ts)
    // three reads a program's link and compile logs on its first draw (onFirstUse), a call that waits on the GPU: 0.1 to 2 s
    // in play the first time she rises, lands or comes near something new. Read them now, at load, for every program.
    const programs = [...(a4ViewHost.renderer.info.programs ?? [])], v = a4PrivateHost; // (a program's log read a step at a time: render/slices.ts)
    await runSliced((function* () { let i = 0; for (const p of programs) { v.setReadiness("programs", i++, programs.length); if (!(p as unknown as ReadyProgram).isReady()) throw new Error('shader became unfinished before uniform preparation'); p.getUniforms(); yield; } })(), "programs");
    performance.mark("witch:prep-programs");
    // And every texture the scene's materials hold uploaded now, a texture a step (three uploads each on its first draw: on Ed's
    // laptop, 2026-10-21, most of the 2 s first frame after a sail; the cloud's first frame's 5 to 7 s), so the first frame
    // finds them on the GPU. The hidden too, as above.
    const textures = new Set<THREE.Texture>();
    a4ViewHost.scene.traverse(o => { for (const m of ([] as THREE.Material[]).concat((o as THREE.Mesh).material ?? [])) for (const u of Object.values((m as THREE.ShaderMaterial).uniforms ?? {})) for (const t of ([] as unknown[]).concat(u?.value)) if ((t as THREE.Texture)?.isTexture && !(t as THREE.Texture).isRenderTargetTexture) textures.add(t as THREE.Texture); });
    const R = a4ViewHost.renderer;
    await runSliced((function* () { let i = 0; for (const t of textures) { v.setReadiness("textures", i++, textures.size); if ((t as THREE.Texture & { image?: unknown }).image) R.initTexture(t); yield; } })(), "textures");
    performance.mark("witch:prep-textures");
    a4PrivateHost.setReadiness("draws", 0, 1);
    await a4PrivateHost.warmDraws();
    performance.mark("witch:prep-draws");
    a4PrivateHost.setReadiness("gpu", 0, 1);
    await a4PrivateHost.gpuCaughtUp();
    performance.mark("witch:prep-gpu");
    a4PrivateHost.setReadiness("ready", 1, 1);
  }

export async function gpuCaughtUp(a4ViewHost: View, _a4PrivateHost: ViewInternals, _a4SharedHost: ViewShared): Promise<void> {
    const gl = a4ViewHost.renderer.getContext();
    if (!(typeof WebGL2RenderingContext !== "undefined" && gl instanceof WebGL2RenderingContext)) return;
    const fence = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
    if (!fence) return;
    gl.flush();
    const t0 = performance.now();
    while (gl.clientWaitSync(fence, 0, 0) === gl.TIMEOUT_EXPIRED && performance.now() - t0 < 30000) await new Promise(r => setTimeout(r, 25));
    gl.deleteSync(fence);
  }

export async function warmDraws(a4ViewHost: View, a4PrivateHost: ViewInternals, _a4SharedHost: ViewShared): Promise<void> {
    const w = a4ViewHost.width, h = a4ViewHost.height, k = Math.max(w, h) / 16, ww = Math.max(1, Math.round(w / k)), hh = Math.max(1, Math.round(h / k)), v = a4ViewHost;
    a4ViewHost.post.resize(ww, hh, ww, hh);
    await runSliced((function* () {
      a4PrivateHost.castMap.render(v.renderer, v.scene, v.game.witch.x, v.game.witch.z, a4PrivateHost.castOn);
      yield;
      // The scene's things one at a time, one for each program and way of drawing it (a pipeline the driver makes on its first
      // draw), everything else hidden, the hidden among them too (as compileAll compiles them); then as they were.
      const R = v.renderer, seen = new Set<string>(), one: THREE.Object3D[] = [], was = new Map<THREE.Object3D, boolean>();
      v.scene.traverse(o => {
        was.set(o, o.visible);
        const mats = ([] as THREE.Material[]).concat((o as THREE.Mesh).material ?? []);
        for (const m of mats) {
          const pr = (R.properties.get(m) as { currentProgram?: { id: number } }).currentProgram;
          const key = `${pr?.id ?? m.uuid}|${(o as THREE.InstancedMesh).isInstancedMesh ? 1 : 0}|${m.blending}|${m.transparent}|${m.depthTest}|${m.depthWrite}|${m.side}|${m.stencilWrite}|${m.colorWrite}`;
          if (!seen.has(key)) { seen.add(key); one.push(o); break; }
        }
      });
      const show = (on: THREE.Object3D | null) => { for (const o of was.keys()) o.visible = !(o as THREE.Mesh).isMesh && !(o as THREE.Points).isPoints && !(o as THREE.Line).isLine && !(o as THREE.Sprite).isSprite; if (on) on.visible = true; };
      for (const [i, o] of one.entries()) { a4PrivateHost.setReadiness("draws", i, one.length); show(o); R.setRenderTarget(v.post.sceneTarget); R.render(v.scene, v.camera); yield; }
      for (const [o, vis] of was) o.visible = vis;
      yield* v.post.renderSteps(v.scene, v.camera, false);
    })(), "draws");
    a4ViewHost.post.resize(a4ViewHost.width, a4ViewHost.height, a4ViewHost.width, a4ViewHost.height); // (its size now: the window may have changed meanwhile)
    a4ViewHost.renderer.setRenderTarget(null);
  }

export function* warmSteps(a4ViewHost: View, _a4PrivateHost: ViewInternals, _a4SharedHost: ViewShared): Steps {
    const g = a4ViewHost.game, w = g.witch, far = g.tuning.haze.far + 64;
    yield "forest";
    while (g.forest.prefetch(w.x, w.z, far, 4) > 0) yield;
    for (const [, a] of g.party.areas) { const s = g.map.siteOf(a.cell[0], a.cell[1]); while (g.forest.prefetch(s.x, s.z, g.map.areaSize * 1.3, 4) > 0) yield; }
    yield "carvings";
    for (const c of g.map.legendClearings) { carvingMask(AREA_TYPES[g.map.typeOf(c.cell[0], c.cell[1])].creature); yield; }
  }

export function setReadiness(a4ViewHost: View, _a4PrivateHost: ViewInternals, _a4SharedHost: ViewShared, stage: View["readiness"]["stage"], done: number, total: number): void {
    const order = ["compile", "programs", "textures", "draws", "gpu", "ready"], i = order.indexOf(stage), r = a4ViewHost.readiness;
    r.stage = stage; r.done = done; r.total = Math.max(1, total);
    r.share = stage === "ready" ? 1 : Math.min(0.999, (i + Math.min(1, done / r.total)) / (order.length - 1));
  }
