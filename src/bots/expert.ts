// Skilled's recruit/kite/heal/cast/sigil priorities rebuilt across an explicit
// observation boundary. No policy function receives Game or mutates the world.
import type { Bot } from "../rules/bot";
import type { Controls, Game } from "../rules/game";
import { newObserver, type Observation, type Point } from "./observe";
import { newCoverage } from "./coverage";
import { newKnownQuestJob } from "./knownQuest";
import { newQuestOffering } from "./questOffering";
import { newCoverageGuard } from "./coverageGuard";
import { newCampaign } from "./campaign";
import { useBroom } from "./equipment";

export const EXPERT_DEFAULTS = {
  healAt: 1, healTo: 3, kite: 9, dashAt: 5, fireFrac: 0.95, closeFrac: 0.8,
  stick: 250, ahead: 400, homeRange: 120, follow: 10,
  homeStand: 22, castMoveFrac: 0.5, pickRadiusFrac: 0.6, retargetSeconds: 3,
  questRange: 700, questBias: 400, questMax: 1,
};
export type ExpertParams = typeof EXPERT_DEFAULTS;
export const EXPERT_LIMITS = { reactionSeconds: 0.25, inputHz: 8, aimErrorMetres: 1 };
export interface HumanLimits { reactionSeconds: number; inputHz: number; aimErrorMetres: number }
export interface ExpertOptions { rememberDreamVisits?: boolean; coverageExploration?: boolean; guardedCoverageExploration?: boolean; knownQuestPriority?: boolean; questDeliveryRepair?: boolean }
// Output only: detached copies, emitted after choosing controls. Never read back.
export interface ExpertTrace {
  playerTime: number; observation: Observation; doing: string; controls: Controls;
  knownQuests: Observation["quests"]; heardDreams: number[]; selectedQuest: number | null; visitingLegend: number | null;
  dreamVisit: (Point & { id: number; until: number }) | null;
  coverage: ReturnType<ReturnType<typeof newCoverage>["snapshot"]>;
  questJob: ReturnType<ReturnType<typeof newKnownQuestJob>["snapshot"]>;
  deliverySelection: ReturnType<ReturnType<typeof newQuestOffering>["snapshot"]>;
  coverageGuard: ReturnType<ReturnType<typeof newCoverageGuard>["snapshot"]>;
}

const idle = (): Controls => ({ moveX: 0, moveZ: 0, toggleMode: false, zoom: 0 });
const dist = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.z - b.z);

export function newExpert(params: Partial<ExpertParams> = {}, seed = 1, limits: HumanLimits = EXPERT_LIMITS, trace?: (event: ExpertTrace) => void, options: ExpertOptions = {}): Bot {
  if (limits.reactionSeconds < 0.25 || limits.inputHz > 8 || limits.inputHz <= 0 || limits.aimErrorMetres < 1 || ![limits.reactionSeconds, limits.inputHz, limits.aimErrorMetres].every(Number.isFinite)) throw Error("Expert human limits below approved floors");
  const K = { ...EXPERT_DEFAULTS, ...params }, observe = newObserver();
  if (!Object.values(K).every(Number.isFinite)) throw Error("Invalid expert parameters");
  const queue: Observation[] = [], memory = new Map<string, Observation["stones"][number]>();
  const quests = new Map<number, Observation["quests"][number]>();
  const heardDreams = new Set<number>();
  let random = seed >>> 0, nextInput = 0, controls = idle(), healing = false, target: number | null = null, retargetAt = 0, lastArea = "", patrol = 0;
  let modePending: { from: Observation["self"]["mode"]; at: number } | null = null;
  let patrolPoint: (Point & { until: number }) | null = null;
  let selectedQuest: number | null = null;
  let visitingLegend: number | null = null;
  const rememberDreamVisits = options.rememberDreamVisits !== false, abandonedVisits = new Set<number>();
  let dreamVisit: (Point & { id: number; until: number }) | null = null;
  const coverage = newCoverage(), guardedCoverage = options.guardedCoverageExploration !== false, coverageEnabled = options.coverageExploration === true || guardedCoverage;
  const coverageGuard = newCoverageGuard();
  // Candidate stays opt-in until the coordinator disposes of the fixed test.
  const questJob = newKnownQuestJob(options.knownQuestPriority === true);
  const deliverySelection = newQuestOffering(), deliveryRepair = options.questDeliveryRepair !== false;
  const campaign = newCampaign();
  let campaignCycle: { stack: string; at: number } | null = null;
  let campaignPress: { key: string; at: number } | null = null;
  let trailJob: { id: number; until: number } | null = null;
  const triedTrails = new Set<number>();
  const bot: Bot = { kind: "expert", doing: "waiting for observations", done: { quests: [], relics: [] }, decide };
  return bot;

  function decide(g: Game): Controls {
    const now = observe(g); queue.push(now);
    let seen: Observation | null = null;
    while (queue.length && queue[0].playerTime <= now.playerTime - limits.reactionSeconds + 1e-9) seen = queue.shift()!;
    if (now.playerTime + 1e-9 < nextInput || !seen) return { ...controls, toggleMode: false, sigil: false, place: false, cycle: false, cycleBack: false, castParty: false, hat: false, spell: false };
    nextInput = now.playerTime + 1 / limits.inputHz;
    const observed = trace ? structuredClone(seen) : null;
    controls = policy(seen);
    useBroom(seen, controls);
    // Delayed feedback must acknowledge a toggle before another press. Otherwise
    // two old "treetop" observations reverse the same landing back into a rise.
    if (modePending && (seen.self.mode !== modePending.from || now.playerTime - modePending.at >= 2)) modePending = null;
    if (controls.toggleMode) {
      if (modePending) controls.toggleMode = false;
      else modePending = { from: seen.self.mode, at: now.playerTime };
    }
    if (controls.fire || controls.spell) {
      random = (Math.imul(random, 1664525) + 1013904223) >>> 0;
      const angle = random / 4294967296 * 2 * Math.PI;
      controls.aimX = (controls.aimX ?? 0) + Math.cos(angle) * limits.aimErrorMetres;
      controls.aimZ = (controls.aimZ ?? 0) + Math.sin(angle) * limits.aimErrorMetres;
    }
    if (trace && observed) trace(structuredClone({ playerTime: now.playerTime, observation: observed,
      doing: bot.doing, controls, knownQuests: [...quests.values()], heardDreams: [...heardDreams], selectedQuest, visitingLegend, dreamVisit, coverage: coverage.snapshot(), questJob: questJob.snapshot(), deliverySelection: deliverySelection.snapshot(), coverageGuard: coverageGuard.snapshot() }));
    return { ...controls };
  }

  function policy(o: Observation): Controls {
    campaign.observe(o);
    coverage.observe(o);
    selectedQuest = null;
    visitingLegend = null;
    const c = idle(), w = o.self;
    // Evaluate even when a higher priority returns early, so an unsafe waypoint
    // cannot silently resume later in the same thirty-second slot.
    const safeCoverage = !guardedCoverage || coverageGuard.update(o, w.hp >= K.healTo ? false : healing || w.hp <= K.healAt);
    if (!safeCoverage) coverage.cancelUnsafe(o);
    for (const q of o.quests) { heardDreams.add(q.id); if (q.open) quests.set(q.id, structuredClone(q)); else quests.delete(q.id); }
    if (dreamVisit) {
      const visible = o.creatures.find(a => a.id === dreamVisit!.id);
      // Deadline uses delayed player time and never extends, including while
      // safety actions interrupt. Timed-out IDs cannot instantly start again.
      if (o.playerTime >= dreamVisit.until) { abandonedVisits.add(dreamVisit.id); dreamVisit = null; }
      else if (o.quests.some(q => q.id === dreamVisit!.id) || visible?.friendly || visible?.angry) dreamVisit = null;
      else if (visible) { dreamVisit.x = visible.x; dreamVisit.z = visible.z; }
    }
    const job = questJob.update(o, w.hp >= K.healTo ? false : healing || w.hp <= K.healAt, !!dreamVisit, K.questRange);
    const putDown = () => {
      const near = o.placed.find(p => dist(w, p) < Math.max(o.pickRadius, o.spacing) * 1.1);
      if (!near) c.sigil = true;
      else { const d = dist(w, near); c.moveX = d > 0.01 ? (w.x - near.x) / d : 1; c.moveZ = d > 0.01 ? (w.z - near.z) / d : 0; }
    };
    for (const s of o.stones) memory.set(s.key, { ...s, cast: { ...s.cast } });
    const go = (p: Point, stop = 3, fly = false) => {
      const d = dist(w, p);
      // Full-speed steering on a delayed position overshoots small pickup/cast
      // spots indefinitely. Ease in using only the observed distance.
      if (d > stop) { const speed = Math.min(1, d / 10); c.moveX = (p.x - w.x) / d * speed; c.moveZ = (p.z - w.z) / d * speed; }
      const want = fly && d > 45 && !w.grounded ? "treetop" : "ground";
      if ((w.mode === "ground" && want === "treetop") || (w.mode === "treetop" && want === "ground")) c.toggleMode = true;
      return d <= stop && w.mode === "ground";
    };
    if (w.ko) { bot.doing = "recovering"; return c; }
    if (o.waiting) { bot.doing = "casting the party spell"; c.castParty = true; return c; }
    if (w.seated) { bot.doing = "leaving her seat"; c.moveZ = 1; return c; }
    if (w.perched && w.mode === "ground") { bot.doing = "rising off the treehouse deck"; c.toggleMode = true; return c; }
    if (w.hp <= K.healAt) healing = true;
    if (w.hp >= K.healTo) healing = false;
    if (healing) {
      const gear = o.campaign?.equipment;
      if (gear?.hat === "healing") {
        bot.doing = "using her healing hat";
        if (gear.hatDown) go(gear.hatDown, 3, false);
        else if (w.mode === "ground") {
          if (!campaignPress || o.playerTime - campaignPress.at >= 1) { c.hat = true; campaignPress = { key: "healing-hat", at: o.playerTime }; }
        } else if (w.mode === "treetop") c.toggleMode = true;
        return c;
      }
      bot.doing = "rising to heal";
      if (w.grounded) putDown();
      else if (w.mode === "ground") c.toggleMode = true;
      return c;
    }
    const cue = o.windups.sort((a, b) => dist(w, a) - dist(w, b))[0];
    if (w.mode === "ground" && cue && dist(w, cue) < K.kite) {
      const dx = w.x - cue.x, dz = w.z - cue.z, d = Math.hypot(dx, dz) || 1;
      c.moveX = -dz / d; c.moveZ = dx / d; c.dash = true; c.aimX = c.moveX * 10; c.aimZ = c.moveZ * 10;
      bot.doing = "dodging an audible wind-up"; return c;
    }
    if (o.alarms[0] && dist(w, o.alarms[0]) > 35) {
      bot.doing = "bringing the mobile party to defend an alarm";
      go(o.alarms[0], 25, true); return c;
    }
    if (o.find && !job) { bot.doing = "collecting tonight's find"; if (go(o.find, o.pickRadius * K.pickRadiusFrac)) c.place = true; return c; }
    const quest = job?.quest ?? [...quests.values()].filter(q => dist(w, q.delivery) <= K.questRange).sort((a, b) => dist(w, a.delivery) - dist(w, b.delivery))[0];
    selectedQuest = quest?.id ?? null;
    const offering = quest ? o.carried.find(a => a.species === quest.wants) : null;
    if (quest && offering) {
      bot.doing = "bringing a requested sigil to a legend";
      if (go(quest.delivery, 3, true)) {
        if (deliveryRepair) {
          const action = deliverySelection.choose(quest.wants, o.carried);
          if (action === "place") putDown(); else if (action === "cycle") c.cycle = true;
        } else if (o.carried[o.carried.length - 1]?.id === offering.id) putDown(); else c.cycle = true;
      }
      return c;
    }
    // Learning a quest needs a visit: sleeping legends have no remote quest
    // pointer. Only approach one actually seen, then read its ground-level dream.
    const sleeper = !quests.size && (o.campaign || heardDreams.size < K.questMax) ? o.creatures.filter(a => a.boss && !a.friendly && !a.angry && !heardDreams.has(a.id) && (!rememberDreamVisits || !abandonedVisits.has(a.id)) && dist(w, a) <= K.questRange).sort((a, b) => dist(w, a) - dist(w, b))[0] : null;
    if (rememberDreamVisits && !dreamVisit && sleeper) dreamVisit = { id: sleeper.id, x: sleeper.x, z: sleeper.z, until: o.playerTime + 30 };
    if (rememberDreamVisits && dreamVisit) {
      visitingLegend = dreamVisit.id;
      bot.doing = "visiting a visible legend's dream";
      go({ x: dreamVisit.x + 4, z: dreamVisit.z + 4 }, 6, true);
      return c; // Arrival alone is not evidence that a request was read.
    }
    if (!rememberDreamVisits && sleeper) {
      visitingLegend = sleeper.id;
      bot.doing = "visiting a visible legend's dream";
      if (go({ x: sleeper.x + 4, z: sleeper.z + 4 }, 6, true)) heardDreams.add(sleeper.id);
      return c;
    }
    if (job?.kind === "pickup" && job.pickup) {
      bot.doing = "gathering a sigil"; if (go(job.pickup, o.pickRadius * K.pickRadiusFrac)) c.place = true; return c;
    }
    if (job?.kind === "hint" && job.quest.hint) {
      bot.doing = "following a known quest's dream hint"; go(job.quest.hint, 10, true); return c;
    }
    // The candidate may interrupt only lower-priority ordinary work. Missing
    // cells are unobserved, not known walkable terrain. No map query is made.
    const requestedVisible = quest && o.creatures.some(a => !a.boss && !a.friendly && !a.rune && a.species === quest.wants);
    if (coverageEnabled && safeCoverage && !requestedVisible && !o.next && !o.campaign?.route.some(s => !s.captured) && !o.stones.some(s => s.open && s.ready) && !o.alarms.length && !o.straggler) {
      const point = coverage.waypoint(o);
      if (point) { bot.doing = "exploring a less-seen direction"; go(point, 10, true); return c; }
    }
    const gear = o.campaign?.equipment;
    const patient = o.campaign?.troops.some(a => o.carried.some(c => c.id === a.id) && (a.level === 0 || a.hurt));
    if (!job && !o.alarms.length && !o.windups.length && w.hp >= 3 && gear?.hat === "harvest" && !gear.hatDown && patient && !o.campaign?.berries.length && w.mode === "ground") {
      bot.doing = "growing berries with her Harvest hat";
      if (!campaignPress || o.playerTime - campaignPress.at >= 1) { c.hat = true; campaignPress = { key: "harvest-hat", at: o.playerTime }; }
      return c;
    }
    if (gear?.hatDown && (gear.hat === "harvest" || gear.hat === "healing" && w.hp >= K.healTo) && dist(w, gear.hatDown) < 60) {
      bot.doing = "collecting her useful hat";
      if (go(gear.hatDown, 3, false) && (!campaignPress || o.playerTime - campaignPress.at >= 1)) { c.hat = true; campaignPress = { key: "collect-hat", at: o.playerTime }; }
      return c;
    }
    const strategy = !job && !o.straggler && !o.stones.some(s => s.open && s.ready) ? campaign.choose(o) : null;
    if (strategy) {
      bot.doing = strategy.doing;
      if (!go(strategy.at, strategy.kind === "pickup" ? o.pickRadius * K.pickRadiusFrac : 3, true)) return c;
      if (strategy.kind === "drop") {
        const stack = o.carried.map(a => a.id).join(",");
        if (o.carried.at(-1)?.id === strategy.id) {
          campaignCycle = null;
          const key = `drop:${strategy.id}:${stack}`;
          if (!campaignPress || campaignPress.key !== key || o.playerTime - campaignPress.at >= 1) { putDown(); if (c.sigil) campaignPress = { key, at: o.playerTime }; }
        }
        else if (!campaignCycle || campaignCycle.stack !== stack || o.playerTime - campaignCycle.at > 2) {
          c.cycle = true; campaignCycle = { stack, at: o.playerTime };
        }
      } else if (strategy.kind === "pickup" || strategy.kind === "flask") {
        const key = `${strategy.kind}:${strategy.id ?? ""}:${o.carried.map(a => a.id).join(",")}`;
        if (!campaignPress || campaignPress.key !== key || o.playerTime - campaignPress.at >= 1) { c.place = true; campaignPress = { key, at: o.playerTime }; }
      }
      return c;
    }
    const loose = o.loose.filter(a => {
      const animal = o.campaign?.sigils.find(s => s.id === a.id);
      return !campaign.reserve(o, a.id) && (!animal || campaign.carryUseful(o, animal, quest?.wants));
    });
    const loot = [...loose, ...o.creatures.filter(a => !campaign.reserve(o, a.id) && (!o.campaign || campaign.carryUseful(o, a, quest?.wants))).flatMap(a => a.rune ? [a.rune] : [])].sort((a, b) => dist(w, a) - dist(w, b))[0];
    if (!job && loot && dist(w, loot) < 25) {
      bot.doing = "gathering a sigil";
      if (go(loot, o.pickRadius * K.pickRadiusFrac)) c.place = true;
      return c;
    }
    if (!o.campaign && !job && o.carried.length > K.follow && dist(w, o.home) < K.homeRange) {
      bot.doing = "posting guards at home";
      if (go({ x: o.home.x, z: o.home.z + K.homeStand }, 8, true)) putDown();
      return c;
    }
    const ready = o.stones.filter(s => s.open && s.ready).sort((a, b) => dist(w, a) - dist(w, b))[0];
    if (!job && ready) {
      bot.doing = "casting at a ready stone";
      if (go(ready.cast, o.castRadius * K.castMoveFrac)) c.sigilHeld = !o.castBlocked;
      return c;
    }
    if (!quest && !o.straggler && !o.alarms.length && w.hp >= 3) {
      if (trailJob && (o.playerTime >= trailJob.until || heardDreams.has(trailJob.id))) { triedTrails.add(trailJob.id); trailJob = null; }
      const trail = o.campaign?.legendTrails?.find(p => trailJob ? p.id === trailJob.id : !triedTrails.has(p.id));
      if (trail) {
        trailJob ??= { id: trail.id, until: o.playerTime + 30 };
        bot.doing = "following a legend sigil's visible leash";
        if (trail.way) go(trail.way, 5, true);
        else if (go(trail, o.pickRadius * K.pickRadiusFrac)) {
          const key = `legend:${trail.id}`;
          if (!campaignPress || campaignPress.key !== key || o.playerTime - campaignPress.at >= 1) { c.place = true; campaignPress = { key, at: o.playerTime }; }
        }
        return c;
      }
    }
    const candidates = o.creatures.filter(a => !a.boss && !a.friendly && !a.rune && (job ? a.id === job.creatureId : a.level > 0 || a.species === quest?.wants || !!o.campaign?.berries.length && o.carried.filter(c => c.level === 1).length < 3))
      .filter(a => !o.campaign || !o.next || o.carried.filter(c => c.level === 1).length < 3 || a.species === quest?.wants || dist(a, o.next) < 150 || dist(w, a) < K.kite);
    const score = (a: typeof candidates[number]) => campaign.recruitScore(o, a, quest?.wants) - (a.area === lastArea ? K.stick : 0) - (o.next && dist(a, o.next) < 100 ? K.ahead : 0);
    if (o.playerTime >= retargetAt || !candidates.some(a => a.id === target)) {
      target = [...candidates].sort((a, b) => score(a) - score(b) || a.id - b.id)[0]?.id ?? null;
      retargetAt = o.playerTime + K.retargetSeconds;
    }
    const a = candidates.find(a => a.id === target);
    if (a) {
      lastArea = a.area; bot.doing = `inviting ${a.species}`;
      const d = dist(w, a);
      // The training-seed trace stalled descending above a lake for 100 s:
      // descent cannot finish there. Keep steering toward the visible target.
      if (w.mode !== "ground") { c.toggleMode = w.mode === "treetop"; c.moveX = (a.x - w.x) / (d || 1); c.moveZ = (a.z - w.z) / (d || 1); return c; }
      c.aimX = a.x - w.x; c.aimZ = a.z - w.z; c.fire = d < o.range * K.fireFrac;
      if (d < K.kite && !a.stunned) { c.moveX = (w.x - a.x) / (d || 1); c.moveZ = (w.z - a.z) / (d || 1); c.dash = d < K.dashAt; }
      else if (d > o.range * K.closeFrac) { c.moveX = (a.x - w.x) / (d || 1); c.moveZ = (a.z - w.z) / (d || 1); }
      if (c.dash) { c.aimX = c.moveX * 10; c.aimZ = c.moveZ * 10; c.fire = false; }
      return c;
    }
    const alarm = o.alarms[0], destination = o.straggler ?? alarm ?? quest?.hint ?? o.next;
    if (destination && dist(w, destination) > 12) {
      bot.doing = o.straggler ? "following the straggler pointer" : alarm ? "answering an alarm" : "following the wave pointer";
      go(destination, 10, true); return c;
    }
    const unseen = [...memory.values()].filter(s => s.open && !o.stones.some(v => v.key === s.key)).sort((a, b) => dist(w, a) - dist(w, b))[0];
    if (unseen) { bot.doing = "returning to a remembered stone"; go(unseen, 10, true); return c; }
    // Local exploration uses no map, future wave list or unseen creature positions.
    // A direction rotated every input described a small closed orbit, not
    // exploration (diagnostic-1, 7.47–27.2 s). Keep a local destination until
    // reached, with a player-time timeout if terrain prevents reaching it.
    if (!patrolPoint || dist(w, patrolPoint) < 10 || o.playerTime >= patrolPoint.until) {
      const angle = patrol++ * Math.PI * (3 - Math.sqrt(5));
      patrolPoint = { x: w.x + Math.cos(angle) * 100, z: w.z + Math.sin(angle) * 100, until: o.playerTime + 12 };
    }
    bot.doing = "looking for someone to invite"; go(patrolPoint, 8, true);
    return c;
  }
}
