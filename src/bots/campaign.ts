import type { Observation, Point } from "./observe";

const distance = (a: Point, b: Point) => Math.hypot(a.x - b.x, a.z - b.z);
type Animal = Observation["carried"][number];
export type CampaignAction = { kind: "move" | "drop" | "pickup" | "wait" | "flask"; at: Point; id?: number; doing: string };

/** Memory and decisions contain only consumed delayed public observations. */
export function newCampaign() {
  const areas = new Map<string, Point & { captured: boolean; seen: number }>();
  const enemies = new Map<number, { species: string; area: string; seen: number }>();
  const posted = new Map<number, { at: Point; species: string }>();
  let feed: { id: number; at: Point; until: number; level: number; phase: "drop" | "wait" | "collect" } | null = null;
  let feedAgain = 0;
  let posting: { id: number; at: Point; species: string; until: number; doing: string } | null = null;
  let postAgain = 0;
  return { observe, choose, recruitScore, reserve, carryUseful, snapshot: () => ({ areas: [...areas], posted: [...posted], feeding: feed ? structuredClone(feed) : null }) };

  function observe(o: Observation) {
    for (const a of [...o.campaign?.areas ?? [], ...o.campaign?.route ?? []]) areas.set(a.key, { x: a.x, z: a.z, captured: a.captured, seen: o.playerTime });
    for (const a of o.creatures) if (!a.boss && !a.friendly && !a.rune && a.level > 0) enemies.set(a.id, { species: a.species, area: a.area, seen: o.playerTime });
    for (const [id, a] of enemies) if (o.playerTime - a.seen > 60 || o.creatures.some(c => c.id === id && (c.friendly || !!c.rune))) enemies.delete(id);
    for (const a of o.carried) posted.delete(a.id);
    if (posting && !o.carried.some(a => a.id === posting!.id)) {
      const placed = o.campaign?.troops.find(a => a.id === posting!.id)?.placed;
      if (placed) { posted.set(posting.id, { at: { ...placed }, species: posting.species }); posting = null; }
    }
    if (posting && o.playerTime >= posting.until) { posting = null; postAgain = o.playerTime + 20; }
    if (feed && o.playerTime >= feed.until) { feed = null; feedAgain = o.playerTime + 20; }
  }

  function front(o: Observation): Point | null {
    if (o.alarms.length) return o.alarms.reduce((a, b) => distance(o.self, a) < distance(o.self, b) ? a : b);
    const nextArea = o.next && [...areas.values()].find(a => distance(a, o.next!) < 10);
    if (o.next && !nextArea?.captured) return o.next;
    const revealed = o.campaign?.route.find(a => !a.captured);
    if (revealed) return revealed;
    return [...areas.values()].filter(a => !a.captured).sort((a, b) => distance(o.self, a) - distance(o.self, b))[0] ?? null;
  }
  function opposition(o: Observation, at = front(o)): string[] {
    if (!at) return [];
    const area = [...areas].sort((a, b) => distance(a[1], at) - distance(b[1], at))[0]?.[0];
    return [...enemies.values()].filter(e => e.area === area).map(e => e.species);
  }
  function useful(o: Observation, a: Animal, at: Point): boolean {
    const species = opposition(o, at);
    return !species.length || species.some(s => s !== a.species);
  }
  function reserve(_o: Observation, id: number): boolean { return posted.has(id) || posting?.id === id || feed?.id === id; }
  function recruitScore(o: Observation, a: Animal & Point, wanted?: string): number {
    const at = front(o), force = o.carried.filter(c => c.level === 1).length;
    const duplicate = o.carried.filter(c => c.species === a.species).length;
    const mismatch = at && !useful(o, a, at) ? 250 : 0;
    const age = a.level === 0 ? (force < 3 && (o.campaign?.berries.length ?? 0) > 0 ? -100 : 180)
      : a.level === 1 ? -120 : at && distance(a, at) < 100 ? -100 : 150;
    return distance(o.self, a) + duplicate * 100 + mismatch + age - (a.species === wanted ? 600 : 0);
  }
  function carryUseful(o: Observation, a: Animal, wanted?: string): boolean {
    if (a.species === wanted) return true;
    if (reserve(o, a.id)) return false;
    const at = front(o), mobile = o.carried.filter(c => c.level === 1).length;
    if (a.level >= 2) return !!at && distance(o.self, at) < 140 && useful(o, a, at);
    if (a.level === 0) return mobile < 3 && ((o.campaign?.berries.length ?? 0) > 0 || o.campaign?.equipment?.hat === "harvest");
    return mobile < 6 && (!at || useful(o, a, at) || mobile < 2);
  }

  function choose(o: Observation): CampaignAction | null {
    const C = o.campaign;
    if (!C || o.self.ko) return null;
    const danger = o.windups.length > 0 || o.creatures.some(c => !c.boss && !c.friendly && !c.rune && c.level > 0 && distance(o.self, c) < 25);
    if (danger || o.self.hp < 3) { if (feed) { feed = null; feedAgain = o.playerTime + 20; } return null; }
    if (posting && o.carried.some(a => a.id === posting!.id)) return { kind: "drop", at: posting.at, id: posting.id, doing: posting.doing };
    if (feed) {
      const carried = o.carried.some(a => a.id === feed!.id), troop = C.troops.find(a => a.id === feed!.id);
      if (feed.phase === "drop" && !carried) feed.phase = "wait";
      if (feed.phase === "wait" && troop && troop.level >= feed.level && !troop.hurt) feed.phase = "collect";
      if (feed.phase === "collect" && carried) { feed = null; feedAgain = o.playerTime + 10; return null; }
      if (feed.phase === "drop") return { kind: "drop", at: feed.at, id: feed.id, doing: "placing an animal at berries" };
      if (feed.phase === "collect") {
        if (!troop?.placed) return null;
        return { kind: "pickup", at: troop.placed, id: feed.id, doing: "collecting a healed or grown animal" };
      }
      return { kind: "wait", at: feed.at, doing: "waiting for berries to heal or grow an animal" };
    }
    const at = front(o), youths = o.carried.filter(a => a.level === 1);
    // Adult strength is committed to a nearby battlefield. Keep several youths
    // mobile; do not ground the entire travelling party for a distant flask.
    const flask = C.flasks.filter(p => at && distance(p, at) < 80 && distance(o.self, p) < 60)[0];
    if (flask && at && o.carried.length >= 3 && o.carried.filter(a => a.level < 2 && useful(o, a, at)).length >= 2 && o.carried.every(a => useful(o, a, at)))
      return { kind: "flask", at: flask, doing: "using a growth flask at a battlefield" };

    const adult = o.carried.find(a => a.level >= 2 && at && useful(o, a, at));
    if (adult && at && o.playerTime >= postAgain) {
      const future = [...areas.values()].filter(a => !a.captured && useful(o, adult, a) && distance(o.self, a) < distance(o.self, at) * 0.7)
        .sort((a, b) => distance(o.self, a) - distance(o.self, b))[0];
      return post(o, adult, o.alarms.length ? at : future ?? at, "positioning an adult for an upcoming fight");
    }
    const incompatible = o.carried.find(a => a.level >= 2);
    if (incompatible && o.playerTime >= postAgain) {
      const safe = [...areas.values()].filter(a => a.captured).sort((a, b) => distance(o.self, a) - distance(o.self, b))[0] ?? o.home;
      return post(o, incompatible, safe, "leaving an incompatible adult to defend a captured area");
    }

    // Grow a youth to adult only close to its intended post, retaining a mobile
    // youth force. A baby's first berry is the cheap mobile-force investment.
    const patient = C.troops.filter(a => o.carried.some(c => c.id === a.id)).find(a => a.hurt)
      ?? C.troops.find(a => o.carried.some(c => c.id === a.id) && a.level === 0 && youths.length < 4)
      ?? C.troops.find(a => o.carried.some(c => c.id === a.id) && a.level === 1 && youths.length > 3 && at && distance(o.self, at) < 80 && useful(o, a, at));
    if (patient && o.playerTime >= feedAgain) {
      const berry = C.berries.filter(p => distance(o.self, p) < 80 && (!at || patient.level !== 1 || distance(p, at) < 80))
        .sort((a, b) => distance(o.self, a) - distance(o.self, b))[0];
      if (berry) {
        feed = { id: patient.id, at: { ...berry }, until: o.playerTime + 40, level: patient.hurt ? patient.level : patient.level + 1, phase: "drop" };
        return { kind: "drop", at: berry, id: patient.id, doing: patient.hurt ? "taking a hurt animal to berries" : "growing an animal for its role" };
      }
    }
    // Retain three mobile fighters. Surplus useful youths cover captured areas
    // or a known future front instead of all travelling with the witch.
    if (youths.length > 3 && o.playerTime >= postAgain) {
      const defended = [...areas.values()].filter(a => a.captured && distance(a, o.home) > 40)
        .sort((a, b) => distance(o.self, a) - distance(o.self, b))[0];
      const goal = o.alarms[0] ?? defended ?? o.home;
      const guard = youths.find(a => useful(o, a, goal));
      if (guard && [...posted.values()].filter(p => distance(p.at, goal) < 50).length < 2) return post(o, guard, goal, "posting a youth while keeping a mobile party");
    }
    return null;
  }
  function post(o: Observation, animal: Animal, goal: Point, doing: string): CampaignAction {
    // Stand clear of the stone/speaker footprint and existing placed sigils.
    const occupied = [...posted.values()].filter(p => distance(p.at, goal) < 60).length;
    const at = { x: goal.x + 24 + occupied * Math.max(8, o.spacing), z: goal.z + 24 };
    // Confirm only from an observed placed sigil, never an attempted press.
    posting = { id: animal.id, at, species: animal.species, doing, until: o.playerTime + 40 };
    return { kind: "drop", at, id: animal.id, doing };
  }
}
