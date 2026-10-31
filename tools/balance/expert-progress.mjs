// Observed outcome events only. These counters never enter a bot's observations.
// A requested sigil placed in its legend's area earns one delivery stage even
// outside the clearing (the real rules' outsideCircle cue); completion is higher.
export function progressObserver() {
  let found = false;
  const delivered = new Set(), completed = new Set();
  return {
    step(g) {
      found ||= !!g.trunk?.found;
      for (const e of g.leashEvents ?? []) if (e.kind === "outsideCircle" && Number.isInteger(e.id) && e.id >= 0) delivered.add(e.id);
      for (const e of g.questEvents ?? []) if (e.kind === "done" && Number.isInteger(e.id) && e.id >= 0) { delivered.add(e.id); completed.add(e.id); }
    },
    finish() {
      return { provisionalFindsCollected: Number(found), questDeliveries: delivered.size, questDeliveriesIncomplete: [...delivered].filter(id => !completed.has(id)).length };
    },
  };
}
