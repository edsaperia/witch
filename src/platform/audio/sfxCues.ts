// When the sound effects play (platform/audio/sfx.ts): each frame, from what the rules did this
// frame (their events) and what changed since the last (a creature turning enraged or happy), heard
// from the first witch, fading to nothing `sfx.hear` metres off and panned by where it is on screen.
// The rules know nothing of it. Each kind of cue is its own step of `update`, in this order:
//  - 💌s (the invites, #89): its letters' events, read as they come (shot: her syllable; hit: the
//    chime, the creature's small reply, the affection meter's tick; happy: the flourish; fizzled,
//    thrown its full range: a puff as it lands on the ground); the
//    talk's invites (with 💌s off) still flourish.
//  - States: a creature turning enraged (a growl and the nearest's angry speech; a crowd turning at
//    once, one heavier growl) or happy (a pop and its happy speech): its area's guards, a friendly
//    area's creatures, a legend at peace.
//  - Legends: the nearest sleeping one moans now and then as it dreams; restless (#87), nightmares.
//  - Attacks are speech (Ed, 2026-10-05): an attacker's burst of babble in its own voice, by mood;
//    a legend winding up, one long building swell of its whale song; a lob landing, a thud (a legend's, a boom).
//  - A soundsystem lost; the boot-up over (things stirring); the witch hurt and knocked down.
//  - Features still open, each read loosely until it lands: the witch knocked back and stunned
//    (#108), a legend's long charge (#114), a relic bottle found (#99).
//  - Home's meadow.
import { affectionOf, type Game } from "../../rules/game";
import type { Creature } from "../../rules/creatures";
import { restlessness } from "../../rules/dream";
import { bossBreath } from "../../render/leash";
import type { CombatEventKind } from "../../rules/combat";
import type { Sfx } from "./sfx";
import { speechMood, voiceOf } from "./voices";
import { dances } from "../../render/looks";
import { beatAt } from "../../rules/beat";
import { cellKey } from "../../rules/party";
import { dressingOf, partyDef, type Dressing } from "../../rules/partyDressing";

/** The combat events that are a creature attacking (its id the attacker): each a burst of its speech. */
const ATTACKS = new Set<CombatEventKind>(["windup", "shot", "beam", "pulse", "quake", "phase", "nova", "rush", "charged", "leapt", "slammed", "sprung", "flash"]);

const happyNow = (c: Creature) => !c.leashed && !c.gone && (!!c.guard || !!c.friendly || (!!c.boss && c.legendState === "happy"));

/** What a cue step needs: the game, its time, how near a point is to her (0-1) and its pan. */
interface Here { g: Game; time: number; near: (x: number, z: number) => number; pan: (x: number) => number }

export class SfxCues {
  /** Taken note of on the first frame, so nothing already so sounds as though it just turned. */
  private primed = false;
  private enraged = new Set<number>();
  private happy = new Set<number>();
  private flourished = new Map<number, number>();
  private spoke = new Map<number, number>();
  private lost = -1;
  private boot = false;
  /** Her hits left last frame (a drop is a hit that landed), and whether she was down. */
  private hp = -1;
  private down = false;
  private knockAt = -Infinity;
  private nextTwinkle = 0;
  private twinkles = 0;
  private chargePhase = new Map<number, string>();
  private nextHoof = 0;
  private relicsFound = new Set<number>();
  private angry = new Set<number>();
  private lastBeat = -1;
  private dressings = new Map<string, { x: number; z: number }[]>();

  /** `duck`: dip the music (by, seconds) under her "ouch!". */
  constructor(private sfx: Sfx, private duck: (by: number, seconds: number) => void = () => {}) {}

  update(g: Game, time: number): void {
    const w = g.witch, hear = Math.max(1, g.tuning.sfx.hear);
    const h: Here = { g, time, near: (x, z) => Math.max(0, 1 - Math.hypot(x - w.x, z - w.z) / hear), pan: x => (x - w.x) / 30 };
    this.invites(h);
    this.states(h);
    this.legends(h);
    this.attacks(h, hear);
    this.soundsystems(h);
    this.booted(h);
    this.hurt(h);
    this.knocked(h);
    this.charges(h);
    this.relics(h);
    this.meadow(h);
    this.roars(h, hear);
    this.shoes(h);
    this.pond(h);
    this.picnic(h);
    this.primed = true;
  }

  /** 💌 (#89): its own events; and invited by talking (and whatever else the leash reports). */
  private invites({ g, time, near, pan }: Here): void {
    const S = this.sfx, inv = g.witches[0]?.invites;
    for (const e of inv?.events ?? []) {
      const k = near(e.x, e.z);
      if (k <= 0) continue;
      if (e.kind === "shot") S.letter(pan(e.x), Math.max(0.6, k));
      else if (e.kind === "hit") {
        S.hit(pan(e.x), k, !!e.spent);
        const m = e.id !== undefined && g.creatures[e.id] ? affectionOf(g).affection(g.creatures[e.id]) ?? undefined : undefined; // (its meter after the hit: rules/affection.ts)
        if (!e.spent && m !== undefined) S.fill(m, pan(e.x), k);
        const c = e.id !== undefined ? g.creatures[e.id] : undefined;
        if (c && !e.spent && this.ready(c.id, time, 0.3)) S.reply(voiceOf(c, g.tuning), m ?? 0, pan(e.x), k);
      } else if (e.kind === "happy" && e.id !== undefined) this.flourish(g, e.id, time, k, pan(e.x));
      else if (e.kind === "fizzled") S.land(pan(e.x), k); // (thrown its full range: down on the ground)
    }
    for (const e of g.leashEvents) if (e.kind === "invited") this.flourish(g, e.id, time, Math.max(0.6, near(e.x, e.z)), pan(e.x));
  }

  /** Who turned enraged or happy since the last frame (the first frame only takes note): they say
   *  so (Ed: "angry speech from enraged animals", happy from happy), the nearest one's voice over
   *  the growl or the pop. */
  private states({ g, time, near, pan }: Here): void {
    const S = this.sfx, gap = g.tuning.sfx.voice.animals.gap;
    let angry = 0, ak = 0, mad: Creature | null = null;
    let glad: Creature | null = null, gk = 0;
    const nowEnraged = new Set<number>(), nowHappy = new Set<number>();
    for (const c of g.creatures) {
      if (c.enraged && !c.gone && !c.leashed) {
        nowEnraged.add(c.id);
        if (this.primed && !this.enraged.has(c.id)) { const k = near(c.x, c.z); if (k > 0) { angry++; if (k > ak) { ak = k; mad = c; } } }
      }
      if (happyNow(c)) {
        nowHappy.add(c.id);
        if (this.primed && !this.happy.has(c.id)) { const k = near(c.x, c.z); if (k > gk) { gk = k; glad = c; } }
      }
    }
    this.enraged = nowEnraged; this.happy = nowHappy;
    if (mad) {
      S.enraged(pan(mad.x), ak, angry);
      if (this.ready(mad.id, time, gap)) { const v = voiceOf(mad, g.tuning); if (v.call?.turn === "howl" && !v.legend) S.howl(v, pan(mad.x), ak); else S.speak(v, "enraged", pan(mad.x), ak, ak + 0.3); }
    }
    if (glad) { S.happy(pan(glad.x), gk); if (this.ready(glad.id, time, gap)) S.speak(voiceOf(glad, g.tuning), "happy", pan(glad.x), gk, gk + 0.3); }
  }

  /** The nearest sleeping legend's moans as it dreams, and a nightmare's when it's restless. */
  private legends({ g, time, pan }: Here): void {
    const w = g.witch;
    let best: Creature | null = null, bd = Infinity;
    for (const c of g.creatures) if (c.boss && !c.leashed && c.legendState === "asleep") { const d = Math.hypot(c.x - w.x, c.z - w.z); if (d < bd) { bd = d; best = c; } }
    const sleep = best ? Math.max(0, 1 - bd / Math.max(1, g.tuning.sfx.snore.range)) : 0;
    const W = g.tuning.wildLegends;
    this.sfx.legends(sleep, best ? bossBreath(time, best.id, W.breathEvery * 1.5) : 0, best ? restlessness(best) * Math.min(1, sleep * 1.5) : 0, best ? pan(best.x) : 0);
  }

  /** Attacks are speech (Ed, 2026-10-05): each attacker a burst of babble in its own voice, by its
   *  mood; a legend winding up (its slow long-range attack) one long building swell of its whale
   *  song, heard twice as far: a warning. */
  private attacks({ g, time, near, pan }: Here, hear: number): void {
    const w = g.witch;
    for (const e of g.combat.events) {
      const c = e.id !== undefined ? g.creatures[e.id] : undefined;
      // a lob coming down where it was aimed: a thud; a legend's (its slow long-range lob), a boom heard twice as far
      if (e.kind === "landed" && c) { const k = Math.max(0, 1 - Math.hypot(e.x - w.x, e.z - w.z) / ((c.boss ? 2 : 1) * hear)); if (k > 0) this.sfx.impact(!!c.boss, pan(e.x), k); continue; }
      if (!c || !ATTACKS.has(e.kind)) continue;
      if (e.kind === "windup" && c.boss) { const k = Math.max(0, 1 - Math.hypot(e.x - w.x, e.z - w.z) / (2 * hear)); if (k > 0) this.sfx.windup(pan(e.x), Math.max(0.5, k)); continue; }
      const k = near(e.x, e.z);
      if (k <= 0 || !this.ready(c.id, time, g.tuning.sfx.voice.animals.gap)) continue;
      this.sfx.speak(voiceOf(c, g.tuning), speechMood(c), pan(e.x), k, k + (c.boss ? 0.5 : 0));
    }
  }

  /** A soundsystem lost (Ed, 2026-10-05: the next wave comes sooner): the party grinding to a halt,
   *  then the clock jumping on; heard anywhere (rules/game.ts's soundsystemLost; home's aside:
   *  that's the run over), more urgent when the wave comes at once (left 0). */
  private soundsystems({ g }: Here): void {
    for (const e of g.waveEvents) if (e.kind === "soundsystemLost" && e.key !== "home" && this.lost !== e.at) { this.lost = e.at; this.sfx.lost(e.left <= 0); }
  }

  /** The boot-up over (party.bootUntil passed: home's speakers all on, the first wave's countdown
   *  begun): things stirring, once a run (not with waves off, nor in a game joined after it). */
  private booted({ g }: Here): void {
    if (this.boot) return;
    const over = g.party.bootUntil > 0 && g.clock.time >= g.party.bootUntil;
    if (over && this.primed && g.tuning.party.interval < 1e9) this.sfx.stir();
    if (over) this.boot = true;
  }

  /** Hurt (Ed, 2026-10-05: "ouch!"): her hits dropping (a hit on her mid-blink costs nothing);
   *  knocked down (knockout's "down"): "whoa-oh". The music dips under either. */
  private hurt({ g }: Here): void {
    const me = g.witches[0], O = g.tuning.sfx.ouch;
    if (!me) return;
    const hp = me.health.hp, down = !!me.ko;
    if (down && !this.down && this.primed) { this.sfx.knockdown(); this.duck(O.duck, O.duckTime * 2); }
    else if (this.primed && hp < this.hp && !down) { this.sfx.ouch(1 - Math.max(0, hp - 1) / Math.max(1, g.tuning.witchHealth.hits - 1)); this.duck(O.duck, O.duckTime); }
    this.hp = hp; this.down = down;
  }

  /** Knocked back and stunned (#108): her knock as it begins (a thump and a whoosh by how far it
   *  throws her), then a soft dizzy twinkle round and round while she's staggered; read loosely
   *  until #108 lands (knock: kx, kz m/s easing off at witch.knock.ease; at; stunUntil). */
  private knocked({ g, time }: Here): void {
    const kn = (g.witches[0] as unknown as { knock?: { kx: number; kz: number; at: number; stunUntil: number } } | undefined)?.knock;
    if (kn && Number.isFinite(kn.at) && kn.at !== this.knockAt) {
      this.knockAt = kn.at;
      const ease = (g.tuning as unknown as { witch?: { knock?: { ease?: number } } }).witch?.knock?.ease ?? 6;
      if (this.primed) this.sfx.knock(Math.hypot(kn.kx, kn.kz) / Math.max(0.1, ease));
    }
    if (kn && time < kn.stunUntil && time >= this.nextTwinkle) { this.nextTwinkle = time + g.tuning.sfx.knock.twinkleEvery; this.sfx.twinkle(this.twinkles++); }
  }

  /** A legend's long charge (#114: c.run's phase windup, run, brake, home): the nearest charger
   *  within range: its windup's bellow, hoofbeats by its speed, the lane's rumble, the braking
   *  arc's skid, a lighter trot home. */
  private charges({ g, time, pan }: Here): void {
    const S = this.sfx, w = g.witch;
    let ch: (Creature & { run?: { phase: string; speed: number } }) | null = null, cd = Infinity;
    for (const c of g.creatures) { const run = (c as Creature & { run?: { phase: string } }).run; if (c.boss && run) { const d = Math.hypot(c.x - w.x, c.z - w.z); if (d < cd) { cd = d; ch = c; } } }
    const C = g.tuning.sfx.charge, ck = ch ? Math.max(0, 1 - cd / Math.max(1, C.range)) : 0;
    if (!ch?.run || ck <= 0) { S.charge(0, 0); return; }
    const { phase, speed } = ch.run, p = pan(ch.x);
    if (phase === "windup" && this.chargePhase.get(ch.id) !== "windup" && this.primed) S.bellow(p, Math.max(0.5, ck));
    this.chargePhase.set(ch.id, phase);
    const running = phase === "run" || phase === "brake", trotting = phase === "home" && ch.moving;
    if ((running && speed > 0.5) || trotting) {
      const every = running ? Math.max(0.16, Math.min(0.5, 2.4 / Math.max(1, speed))) : 0.34;
      if (time >= this.nextHoof) { this.nextHoof = time + every; S.hoof(p, ck, !running); }
    }
    S.charge(phase === "run" ? Math.min(1, speed / 12) * ck : 0, phase === "brake" ? Math.min(1, speed / 10) * ck : 0, p);
  }

  /** A relic bottle found (#99): the first time she spots one lying (on the ground within
   *  relic.spot, from the treetops only near overhead, as its glint shows through a gap) or
   *  reaches it; read loosely until the relics land (g.relics: id, x, z, state). */
  private relics({ g, pan }: Here): void {
    const w = g.witch, R = g.tuning.sfx.relic, treetop = w.mode !== "ground" || w.lift > 0.5;
    for (const r of (g as unknown as { relics?: { id: number; x: number; z: number; state: string }[] }).relics ?? []) {
      if (r.state !== "lying" || this.relicsFound.has(r.id)) continue;
      const d = Math.hypot(r.x - w.x, r.z - w.z);
      if (d <= R.reach || d <= (treetop ? R.spotTreetop : R.spot)) { this.relicsFound.add(r.id); if (this.primed) this.sfx.relic(pan(r.x)); }
    }
  }

  /** Home's meadow: birdsong, bees and a breeze in home's circle round the dancefloor (the map's
   *  homeRadius), fading out over `meadow.fade` metres to its edge. */
  private meadow({ g }: Here): void {
    const w = g.witch, home = g.map.dancefloor;
    this.sfx.meadow(Math.max(0, Math.min(1, (g.map.homeRadius - Math.hypot(w.x - home.x, w.z - home.z)) / Math.max(1, g.tuning.sfx.meadow.fade))));
  }

  /** A legend turning angry (its restlessness run out, #87): its roar, heard twice as far. */
  private roars({ g, pan }: Here, hear: number): void {
    const w = g.witch, now = new Set<number>();
    for (const c of g.creatures) if (c.boss && !c.gone && c.legendState === "angry") {
      now.add(c.id);
      if (this.primed && !this.angry.has(c.id)) { const k = Math.max(0, 1 - Math.hypot(c.x - w.x, c.z - w.z) / (2 * hear)); if (k > 0) this.sfx.roar(pan(c.x), k); }
    }
    this.angry = now;
  }

  /** Dancers near her (party animals and happy ones dancing at a soundsystem), standing, tapping
   *  their party shoes on each beat; legends wear none. */
  private shoes({ g, time, pan }: Here): void {
    const beat = Math.floor(beatAt(g.beat, time));
    if (beat === this.lastBeat) return;
    this.lastBeat = beat;
    const S = g.tuning.sfx.shoes, w = g.witch;
    let n = 0, sx = 0, near = 0;
    for (const c of g.creatures) {
      if (c.gone || c.boss || c.moving) continue;
      const d = Math.hypot(c.x - w.x, c.z - w.z);
      if (d > S.range || !dances(g, c)) continue;
      n++; sx += c.x; near = Math.max(near, 1 - d / S.range);
    }
    if (n && this.primed) this.sfx.taps(n, pan(sx / n), near);
  }

  /** By a pond (the forest's ponds that mirror the moon): its water and frogs, by how near. */
  private pond({ g, pan }: Here): void {
    const P = g.tuning.sfx.pond, w = g.witch;
    let best = Infinity, bx = 0;
    for (const l of g.forest.lightsNear(w.x, w.z, P.range)) if (l.kind === "pond") { const d = Math.hypot(l.x - w.x, l.z - w.z); if (d < best) { best = d; bx = l.x; } }
    this.sfx.pond(Number.isFinite(best) ? Math.max(0, 1 - best / P.range) : 0, pan(bx));
  }

  /** By a picnic in a partified area (not home's: its meadow has its own): its murmur and cups. */
  private picnic({ g, pan }: Here): void {
    const P = g.tuning.sfx.picnic, w = g.witch, cell = g.map.areaAt(w.x, w.z).cell, key = cellKey(cell);
    let level = 0, px = 0;
    if (g.party.areas.has(key) && key !== cellKey(g.map.centreCell) && !g.combat.ruined.has(key)) {
      let spots = this.dressings.get(key);
      if (!spots) {
        const d: Dressing = dressingOf(g.map, cell, g.tuning);
        spots = [...d.loose.filter(p => partyDef(p.ref)?.cls === "picnic"), ...d.clusters.filter(c => c.id.includes("picnic"))].map(p => ({ x: p.x, z: p.z }));
        this.dressings.set(key, spots);
      }
      for (const s of spots) { const k = 1 - Math.hypot(s.x - w.x, s.z - w.z) / P.range; if (k > level) { level = k; px = s.x; } }
    }
    this.sfx.picnic(level, pan(px));
  }

  /** Whether creature `id` may speak again (at most once every `gap` seconds). */
  private ready(id: number, time: number, gap: number): boolean {
    if ((this.spoke.get(id) ?? -Infinity) > time - gap) return false;
    this.spoke.set(id, time);
    return true;
  }

  /** The invite flourish, once per creature however it's reported. */
  private flourish(g: Game, id: number, time: number, k: number, pan: number): void {
    if ((this.flourished.get(id) ?? -Infinity) > time - 2) return;
    this.flourished.set(id, time);
    this.sfx.invited(g.creatures[id]?.level ?? 0, pan, k);
  }
}
