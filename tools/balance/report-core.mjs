// Observation and presentation only: no combat, progression or wave model lives here.
export const SCHEMA = 2;
export const seedAt = i => 1000 + 7919 * i;
export const caseKey = c => JSON.stringify([c.seed, c.island, c.bpm, c.bag, c.bot, c.species, c.level]);
export const phaseOf = g => g.win?.phase ?? (g.party.wave > 0 ? "waves" : "opening");

// Actual engine targets only: no reconstructed distances, projectile lives or combat geometry.
export function rangedTargeted(g, attackOf) {
  const w = g.witches[0];
  if (w.ko || w.body.mode !== "ground" || w.body.seated) return null;
  const isWitch = t => t?.kind === "witch" && t.id === w.id;
  const spells = g.combat.spells;
  if (spells?.pending.some(p => isWitch(p.aim) && ["bolt", "lob", "runner", "beam"].includes(p.attack.body?.kind ?? "bolt"))) return true;
  if (spells?.bodies.some(b => b.alive && isWitch(b.target))) return true;
  if (spells?.beams.some(b => b.alive && isWitch(b.target))) return true;
  if (g.combat.beams.some(b => b.until > g.clock.time && isWitch(b.target))) return true;
  for (const c of g.creatures) {
    const f = c.fight;
    if (!f || f.windupUntil <= g.clock.time || !isWitch(f.target)) continue;
    if (f.spellCast !== undefined) continue; // Grammar casts are observed through pending above.
    if (f.packMove === "ranged") return true;
    const a = attackOf(c.species, c.level)?.attack;
    if (a && ["shot", "lob", "beam"].includes(a.delivery)) return true;
  }
  return false;
}

export function observer() {
  const phases = {}, waves = [];
  let knockdowns = 0, previousKo = false, ranged = 0, eligible = 0;
  return {
    phases, waves,
    step(before, g, dt, exposed) {
      phases[before.phase] ??= { seconds: 0, completed: false };
      phases[before.phase].seconds += dt;
      if (phaseOf(g) !== before.phase) phases[before.phase].completed = true;
      if (g.witches[0].ko && !previousKo) knockdowns++;
      previousKo = !!g.witches[0].ko;
      if (g.party.wave > before.wave) waves.push({ wave: g.party.wave, at: g.clock.time });
      if (exposed !== null) { eligible += dt; if (exposed) ranged += dt; }
    },
    finish(g) {
      return {
        end: g.clock.time, outcome: g.win?.wonAt !== undefined ? "won" : g.partyOver ? "lost" : "censored",
        wonAt: g.win?.wonAt ?? null, overAt: g.partyOver?.at ?? null,
        phase: phaseOf(g), phases, waves, waveReached: g.party.wave,
        // A wave landing is not proof its siege was survived. Only subsequent arrivals count here.
        wavesPassed: Math.max(0, g.party.wave - 1), knockdowns,
        rangedSeconds: ranged, eligibleSeconds: eligible,
        islandsDiscovered: [...(g.islandsTonight ?? [])], islandsKept: g.win?.found ?? [],
        loanFound: g.trunk?.found ? { kind: g.trunk.kind, item: g.trunk.item } : null,
        // App sleep/persistence isn't simulated; distinguish eligibility from a saved unlock.
        loanEligibleToKeep: !!g.trunk?.found && g.win?.wonAt !== undefined,
      };
    },
  };
}

const mean = xs => xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : null;
const fmt = x => x === null || !Number.isFinite(x) ? "—" : x.toFixed(2);
const groupBy = (rows, key) => {
  const groups = new Map();
  for (const r of rows) { const k = key(r); if (!groups.has(k)) groups.set(k, []); groups.get(k).push(r); }
  return groups;
};
export function markdown(rows, manifest) {
  const out = [`Real-rules balance report (schema ${manifest.schema ?? SCHEMA})`, "", `Source: ${manifest.build}; commit ${manifest.commit}; source fingerprint ${manifest.fingerprint}.`,
    `Fixed step ${manifest.step} s; limit ${manifest.limit} player seconds; seeds ${manifest.seeds.join(", ")}. Times below use the world clock (slowed by legend circles). Same seeds and loadouts across bots.`,
    "Sloppy is the existing novice bot: intermittent throws, imperfect aim, no dash. Bare broom, no hat; bag explicit for every bot.",
    "Censored = time limit reached without a win/loss; excluded from completed-phase times, included in win denominator. Win times include winners only.",
    "Ranged exposure = time with an actual ranged wind-up/cast targeting the witch, divided by conscious ground time. This is an observed lower bound, not all potential shooting positions or hit probability.", ""];
  const groups = groupBy(rows.filter(r => r.mode === "runs"), r => JSON.stringify([r.island, r.phaseNumber, r.bpm, r.bag, r.bot]));
  out.push("| island | phase | bpm | bag | bot | n | won / lost / censored | win % | win seconds | waves reached / passed | knockdowns | ranged % | discoveries / kept | loans / eligible |", "|---|---|---|---|---|---|---|---|---|---|---|---|---|---|");
  for (const rs of groups.values()) {
    const r = rs[0], winners = rs.filter(x => x.outcome === "won");
    const eligible = rs.reduce((s, x) => s + x.eligibleSeconds, 0), ranged = rs.reduce((s, x) => s + x.rangedSeconds, 0);
    out.push(`| ${r.island} | ${r.phaseNumber} | ${r.bpm} | ${r.bag} | ${r.bot} | ${rs.length} | ${winners.length} / ${rs.filter(x => x.outcome === "lost").length} / ${rs.filter(x => x.outcome === "censored").length} | ${fmt(100 * winners.length / rs.length)} | ${fmt(mean(winners.map(x => x.wonAt)))} | ${fmt(mean(rs.map(x => x.waveReached)))} / ${fmt(mean(rs.map(x => x.wavesPassed)))} | ${fmt(mean(rs.map(x => x.knockdowns)))} | ${fmt(eligible ? 100 * ranged / eligible : null)} | ${rs.reduce((s, x) => s + x.islandsDiscovered.length, 0)} / ${rs.reduce((s, x) => s + x.islandsKept.length, 0)} | ${rs.filter(x => x.loanFound).length} / ${rs.filter(x => x.loanEligibleToKeep).length} |`);
  }
  out.push("", "Phase totals below weight every island/seed run equally; they describe the selected islands only.", "", "| journey phase | bpm | bag | bot | n | win % | win seconds |", "|---|---|---|---|---|---|---|");
  for (const rs of groupBy(rows.filter(r => r.mode === "runs"), r => JSON.stringify([r.phaseNumber, r.bpm, r.bag, r.bot])).values()) {
    const r = rs[0], wins = rs.filter(x => x.outcome === "won");
    out.push(`| ${r.phaseNumber} | ${r.bpm} | ${r.bag} | ${r.bot} | ${rs.length} | ${fmt(100 * wins.length / rs.length)} | ${fmt(mean(wins.map(x => x.wonAt)))} |`);
  }
  out.push("", "| island | bpm | bag | bot | run phase | entered | completed | mean completed seconds | censored/lost seconds (mean) |", "|---|---|---|---|---|---|---|---|---|");
  for (const rs of groups.values()) for (const p of ["opening", "waves", "stragglers", "lap"]) {
    const ps = rs.map(r => r.phases[p]).filter(Boolean); if (!ps.length) continue;
    const r = rs[0], done = ps.filter(x => x.completed), unfinished = ps.filter(x => !x.completed);
    out.push(`| ${r.island} | ${r.bpm} | ${r.bag} | ${r.bot} | ${p} | ${ps.length} | ${done.length} | ${fmt(mean(done.map(x => x.seconds)))} | ${fmt(mean(unfinished.map(x => x.seconds)))} |`);
  }
  out.push("", "Isolated active-party stuns: stationary witch with protected health, one wild target, no allies or waves. The party intro finishes before timing starts; movement, retaliation and invitation/orbit rules remain active. Aim tracks the target. Hits count landed letters, not throws. Timeouts aren't proof a species can never be stunned.", "", "| species | rank | bpm | bag | n | stunned | landed hits (completed mean) | seconds (completed mean) | timeout landed hits |", "|---|---|---|---|---|---|---|---|---|");
  for (const rs of groupBy(rows.filter(r => r.mode === "stuns"), r => JSON.stringify([r.species, r.level, r.bpm, r.bag])).values()) {
    const r = rs[0], done = rs.filter(x => x.stunned);
    out.push(`| ${r.species} | ${r.level} | ${r.bpm} | ${r.bag} | ${rs.length} | ${done.length} | ${fmt(mean(done.map(x => x.hits)))} | ${fmt(mean(done.map(x => x.end)))} | ${fmt(mean(rs.filter(x => !x.stunned).map(x => x.hits)))} |`);
  }
  return out.join("\n") + "\n";
}
