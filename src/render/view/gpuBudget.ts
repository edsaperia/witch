// The game-wide GPU memory budget (the coordinator's ask, Ed-approved 2026-10-26; after the zoo's own cap on its tree atlases, the
// one this replaces): what the GPU holds, counted by the ledger (render/gpuLedger.ts), kept under a budget that goes with the
// window (Google Maps' rule: `gpu.mb` for the reference window's pixels, scaled by this one's, between `gpu.floor` and `gpu.ceil`).
// Over it, the art used longest ago goes first, a set at a time, till it's back under `gpu.headroom` of the budget: an area type's
// trees (an island she's left in the zoo, an area far behind her), a creature set none of tonight's creatures near her wears, a live
// rig's page. Each comes back when it's wanted again, from the art cache in this browser (render/artCache.ts), fading in as any set
// does. Nothing used in the last `gpu.keep` seconds goes (what's on screen is used every frame), so nothing vanishes in view. GL's
// own out-of-memory error, read every `gpu.errorEvery` seconds (each read waits on the GPU), lowers the budget to what was held then.
import type { View } from "../view";
import { gpuBudgetMB, ledgerLine } from "../gpuLedger";
import type { SpriteBatch } from "../sprites";

const MB = 1048576;

/** The budget's state, kept on the view. */
export interface GpuState { budgetMB: number; /** sets let go since the start */ evicted: number; /** out-of-memory errors */ ooms: number; /** the budget after an error (MB), else Infinity */ cap: number; next: number; nextError: number; /** the last time it was over with nothing left to let go (performance.now) */ stuck: number; /** the last sets let go: what, when (performance.now), its MB and how long it had gone unused (s) */ log: { at: number; what: string; mb: number; idle: number }[] }
export const newGpuState = (): GpuState => ({ budgetMB: 0, evicted: 0, ooms: 0, cap: Infinity, next: 0, nextError: 0, stuck: 0, log: [] });

/** This window's physical pixels. */
const windowPixels = (): number => typeof window === "undefined" ? 1920 * 1080 : Math.max(1, window.innerWidth * window.innerHeight * (window.devicePixelRatio || 1) ** 2);

/** One candidate to let go: its bytes, when it was last used and how. */
interface Idle { bytes: number; used: number; what: string; go: () => void }

/** Once a frame, after it's drawn: the budget kept, every `gpu.every` seconds. `now`: performance.now(). */
export function keepUnderBudget(v: View, now: number): void {
  const T = v.game.tuning.gpu, G = v.gpu;
  if (!T || now < G.next) return;
  G.next = now + T.every * 1000;
  if (now >= G.nextError) {
    G.nextError = now + T.errorEvery * 1000;
    if (v.ledger.check()) { G.ooms++; G.cap = Math.min(G.cap, (v.ledger.total / MB) * T.headroom); console.warn(`gpu: out of memory at ${(v.ledger.total / MB).toFixed(0)} MB: the budget down to ${G.cap.toFixed(0)} MB`); v.onGpuEvent?.(`out of memory at ${(v.ledger.total / MB).toFixed(0)} MB`); }
  }
  G.budgetMB = Math.min(G.cap, gpuBudgetMB(T, windowPixels()));
  if (v.ledger.total <= G.budgetMB * MB) return;
  const idle = idleSets(v, now - T.keep * 1000).sort((a, b) => a.used - b.used);
  let total = v.ledger.total;
  const goal = G.budgetMB * T.headroom * MB;
  for (const s of idle) {
    if (total <= goal) break;
    s.go(); total -= s.bytes; G.evicted++;
    G.log.push({ at: now, what: s.what, mb: Math.round((s.bytes / MB) * 10) / 10, idle: Math.round((now - s.used) / 100) / 10 });
    if (G.log.length > 100) G.log.shift();
  }
  if (total > G.budgetMB * MB) G.stuck = now; // (everything left was used just now: on screen, or as near as matters)
}

/** The art sets not used since `before` (performance.now), with their bytes on the GPU. */
function idleSets(v: View, before: number): Idle[] {
  const out: Idle[] = [], r = v.renderer, L = v.ledger;
  const atlasBytes = (b: SpriteBatch) => L.bytesOf(r, b.atlas.albedo) + L.bytesOf(r, b.atlas.normal);
  for (const [t, b] of v.typeBatches) {
    const used = v.typeUsed.get(t) ?? 0, bytes = atlasBytes(b);
    if (used < before && bytes) out.push({ bytes, used, what: `trees ${t}`, go: () => v.forgetType(t) });
  }
  // (a creature atlas's batches go together: a legend's batch shares its kind's art)
  const by = new Map<SpriteBatch["atlas"], { keys: string[]; used: number; bytes: number }>();
  for (const [k, b] of v.creatureBatches) {
    let e = by.get(b.atlas);
    if (!e) by.set(b.atlas, (e = { keys: [], used: 0, bytes: atlasBytes(b) }));
    e.keys.push(k); e.used = Math.max(e.used, v.creatureUsed.get(k) ?? 0);
  }
  for (const [atlas, e] of by) if (e.used < before && e.bytes) out.push({ bytes: e.bytes, used: e.used, what: `creatures ${e.keys.join(",")}`, go: () => v.forgetCreatures(e.keys, atlas) });
  for (const p of v.assets.rigPages()) if (p.used < before) { const bytes = L.bytesOf(r, p.atlas.albedo) + L.bytesOf(r, p.atlas.normal); if (bytes) out.push({ bytes, used: p.used, what: `rig ${p.key}`, go: () => v.assets.dropRig(p.key) }); }
  return out;
}

/** The ledger's line for the pause page and the overlay. */
export function gpuLine(v: View): string {
  return ledgerLine(v.ledger.report(v.renderer), v.gpu.budgetMB || (v.game.tuning.gpu ? gpuBudgetMB(v.game.tuning.gpu, windowPixels()) : 0), v.gpu.evicted) + (v.gpu.ooms ? `  · ${v.gpu.ooms} out of memory` : "");
}

/** The ledger for the playtest log: MB by kind, the budget, sets let go and errors. */
export function gpuSample(v: View): { mb: number; budget: number; kinds: Record<string, number>; evicted: number; ooms: number } {
  const rep = v.ledger.report(v.renderer), kinds: Record<string, number> = {};
  for (const [k, b] of Object.entries(rep.byKind)) if (b) kinds[k] = Math.round(b / MB);
  return { mb: Math.round(rep.total / MB), budget: Math.round(v.gpu.budgetMB), kinds, evicted: v.gpu.evicted, ooms: v.gpu.ooms };
}
