// Canonical-allocated cloud CPU evidence only; bundled by run.mjs. No renderer/browser or production tuning mutation.
import fs from "node:fs";
import { newGame, stepGame, STEP, type Controls } from "../../src/rules/game";
import { setupArena } from "../../src/rules/arena";
import { TUNING } from "../../src/rules/tuning";
import { drawnRadius, SPACING } from "../../src/rules/combatSpacing";
import { strikingNow } from "../../src/rules/combat/packs";
import type { Creature } from "../../src/rules/creatures";

if (process.platform === "win32" || !(process.env.GITHUB_ACTIONS === "true" || process.env.WITCH_CLOUD_CPU === "1")) throw Error("Run only in the canonical-allocated cloud CPU job");
const args = new Map(process.argv.slice(2).map(a => { const [k, v] = a.replace(/^--/, "").split("="); return [k, v]; }));
const count = Number(args.get("fights") ?? 20), seconds = Number(args.get("seconds") ?? 24), every = 6, cell = 4;
if (!Number.isInteger(count) || count < 20 || !Number.isFinite(seconds) || seconds < 20) throw Error("Evidence requires at least 20 paired fights of at least 20 seconds");
const idle: Controls = { moveX: 0, moveZ: 0, toggleMode: false, zoom: 0, autoTalk: false };
const pct = (a: number[], q: number) => { const s = [...a].sort((x, y) => x - y); return s.length ? s[Math.floor((s.length - 1) * q)] : null; };
type Distances = { values: number[]; samples: number; overlaps: number };
const metric = () => ({ values: [], samples: 0, overlaps: 0 } as Distances);
function sample(m: Distances, bodies: Creature[], radius: (c: Creature) => number) {
  if (bodies.length < 2) return;
  m.samples++;
  let overlap = false;
  for (let a = 0; a < bodies.length; a++) for (let b = a + 1; b < bodies.length; b++) {
    const A = bodies[a], B = bodies[b], gap = Math.hypot(A.x - B.x, A.z - B.z) - radius(A) - radius(B);
    m.values.push(gap); if (gap < 0) overlap = true;
  }
  if (overlap) m.overlaps++;
}
const summarize = (m: Distances) => ({ minBodyDistance: pct(m.values, 0), medianBodyDistance: pct(m.values, 0.5), samples: m.samples, pairSamples: m.values.length, anyBodyOverlapShare: m.samples ? m.overlaps / m.samples : null });
const report = [];
const species = ["boar", "wolf", "fox", "hare", "elephant"];
for (let n = 0; n < count; n++) {
  const seed = n + 1, kind = species[n % species.length], pair = [];
  for (const on of [false, true]) {
    const tuning = { ...TUNING, combatSpacing: on };
    const g = newGame(seed, tuning);
    g.clock.paused = false; g.party.paused = true;
    setupArena(g, `pack-${kind}`);
    const ids = new Set(g.arena!.ids);
    for (const c of g.creatures) if (!ids.has(c.id)) c.gone = true; // isolated arena, same in both members of the pair
    const origin = { x: g.witch.x, z: g.witch.z }, occupied = new Set<string>();
    const all = metric(), waiting = metric();
    let waitingSamples = 0;
    const radius = (c: Creature) => drawnRadius(c, tuning);
    for (let i = 0; i < Math.round(seconds / STEP); i++) {
      g.witches[0].health.hp = 1e6;
      stepGame(g, { ...idle, moveX: Math.cos(i * STEP / 5), moveZ: Math.sin(i * STEP / 5) }, STEP);
      if (i % every) continue;
      const visible = g.arena!.ids.map(id => g.creatures[id]).filter(c => !c.gone && !c.packHide && !c.burrow && !c.swoop?.up);
      const waiters = visible.filter(c => c.level > 0 && !!c.fight?.target && !strikingNow(c));
      sample(all, visible, radius); sample(waiting, waiters, radius);
      for (const c of waiters) { waitingSamples++; occupied.add(`${Math.floor((c.x - origin.x) / cell)},${Math.floor((c.z - origin.z) / cell)}`); }
    }
    if (!all.samples || !waiting.samples || !waitingSamples) throw Error(`No measurable waiting fight: ${seed}/${kind}/${on}`);
    pair.push({ on, allVisibleGroundDiscs: summarize(all), waitingGroundDiscs: summarize(waiting), occupiedCells: occupied.size, occupiedArea: occupied.size * cell * cell, waitingSamples });
  }
  report.push({ seed, kind, pair });
  console.log(`paired ${seed} ${kind}`);
}
const result = { schema: 1, source: process.env.GITHUB_SHA ?? args.get("sha"), bodySource: SPACING.body.source, count, seconds, sampleEverySteps: every, occupiedCellMetres: cell, definition: "Signed centre distance minus both conservative anatomical ground-disc radii. Negative means disc overlap, not an image-pixel assertion. Excludes hidden/underground/high-swoop bodies; hopping/leaping ground projections remain diagnostic. Waiting excludes committed strikes. Occupancy is union of fixed origin-relative cells across waiting samples. Arena-only population and identical moving witch path/health fixture in each pair.", fights: report };
fs.writeFileSync(args.get("out") ?? "spacing-measure.json", JSON.stringify(result, null, 2) + "\n");
