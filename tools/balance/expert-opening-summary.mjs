// Streaming summaries of delayed expert observations; never an input to the bot.
export function openingSummary() {
  const actionSeconds = {}, observedAnimalSeconds = {}, carriedAnimalSeconds = {}, episodes = {};
  const known = new Map(), carried = new Set(), pendingPosts = new Set(), placed = new Set();
  let previous = null, observedGrowth = 0, confirmedPosts = 0, samples = 0;
  const add = (out, key, n) => { out[key] = (out[key] ?? 0) + n; };
  function interval(until) {
    if (!previous) return;
    const dt = Math.max(0, until - previous.playerTime);
    add(actionSeconds, previous.doing, dt);
    for (const a of previous.observation.creatures) add(observedAnimalSeconds, `${a.species}/${a.level}`, dt);
    for (const a of previous.observation.carried) add(carriedAnimalSeconds, `${a.species}/${a.level}`, dt);
  }
  return {
    consume(event) {
      interval(event.playerTime); samples++;
      const o = event.observation;
      if (previous?.doing !== event.doing) add(episodes, event.doing, 1);
      if (event.controls.sigil && /positioning an adult|defend a captured area|posting a youth/.test(event.doing)) {
        const id = o.carried.at(-1)?.id; if (id !== undefined) pendingPosts.add(id);
      }
      // Only compare the same animal's observed levels, never infer growth from absence.
      for (const a of [...o.creatures, ...o.carried, ...o.campaign?.troops ?? []]) {
        const old = known.get(a.id);
        if (old !== undefined && a.level > old) observedGrowth += a.level - old;
        known.set(a.id, Math.max(old ?? a.level, a.level));
      }
      for (const a of o.campaign?.troops ?? []) {
        if (a.placed && !placed.has(a.id) && pendingPosts.has(a.id) && !o.carried.some(c => c.id === a.id)) {
          confirmedPosts++; pendingPosts.delete(a.id);
        }
        if (a.placed) placed.add(a.id); else placed.delete(a.id);
      }
      for (const a of o.carried) carried.add(`${a.id}/${a.species}/${a.level}`);
      previous = event;
    },
    finish(playerEnd) {
      interval(playerEnd); previous = null;
      return { samples, actionSeconds, observedAnimalSeconds, carriedAnimalSeconds,
        carriedIdentities: [...carried].sort(), observedGrowthLevelIncreases: observedGrowth,
        observedConfirmedPosts: confirmedPosts, actionEpisodes: episodes,
        repeatedActionEpisodes: Object.fromEntries(Object.entries(episodes).filter(([, n]) => n > 1)),
        observationLimits: 'Animal-seconds count each visible/carried animal, not unique animals. Growth is observed, not attributed to berries. Posts require a preceding posting press plus a later placed-sigil observation. Repeated action episodes are not proof of stuck jobs. Unobserved time before the first delayed input is excluded.' };
    },
  };
}

export function linuxMemory(status) {
  const value = name => {
    const n = status.match(new RegExp(`^${name}:\\s+(\\d+) kB$`, 'm'));
    if (!n) throw Error(`Missing ${name}`);
    return Number(n[1]) * 1024;
  };
  return { rss: value('VmRSS'), peakRss: value('VmHWM') };
}
