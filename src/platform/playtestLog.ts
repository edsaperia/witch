// The playtest log (Ed, 2026-10-04: so his playtests give the real rate a player grows at): every
// logEvery seconds of game time, the wave, the party's fighting value (leashed and parked), its
// creatures by level, berries eaten, invites and evolutions so far, and each siege's fighting
// value. Kept on this browser (localStorage), the last few runs; L downloads them as JSON, and so
// does opening the game with ?playtest=download. Browser-side, outside the rules.
import { powerReport } from "../rules/power";
import type { Game } from "../rules/game";

export interface PlaytestSample {
  /** Game time (s), the wave, and the soundsystems standing (home included). */
  t: number;
  wave: number;
  standing: number;
  /** The party's fighting value on her leash and parked at sigils; its creatures by level (baby, young, adult, legend). */
  leashed: number;
  parked: number;
  counts: [number, number, number, number];
  berries: number;
  invites: number;
  evolved: number;
  /** Each siege still going: its soundsystem, its besiegers' fighting value and number, the soundsystem's health. */
  sieges: { key: string; value: number; count: number; hp: number }[];
  marching: number;
  /** The witch's hits left. */
  hits: number;
  /** The sound (round 13: the music stopping): the context's state, the music's volume now, the damage heard, metres to the music. */
  audio?: { state: string; volume: number; distort: number; distance: number; mends: number };
}

export interface PlaytestRun { seed: number; build: string; started: string; interval: number; samples: PlaytestSample[]; /** The fight's scale and speed whenever they were set (Ed's live knobs). */ fight?: { t: number; scale: number; speed: number; momentum?: number }[]; /** Area size (metres), treetop speed (m/s) and the map's areas a side whenever they were set (Ed, 2026-10-05). */ world?: { t: number; areaSize: number; treetopSpeed: number; mapAreas: number }[]; /** The audio watchdog's mends (round 13: the music stopping): what, at what game time. */ audio?: { t: number; what: string }[] }

const KEY = "witch.playtest", KEEP = 8, EVERY = 10;
const round = (x: number) => Math.round(x * 10) / 10;

function readRuns(): PlaytestRun[] {
  try { const v = localStorage.getItem(KEY); return v ? (JSON.parse(v) as PlaytestRun[]) : []; } catch { return []; }
}

export class PlaytestLog {
  private run: PlaytestRun;
  private next = EVERY;
  /** The sound as it is now, for each sample (main.ts sets it). */
  audioState?: () => PlaytestSample["audio"]; // (nothing before the first 10 s: a page opened and never played keeps no run)
  constructor(private game: Game, build: string) {
    this.run = { seed: game.seed, build, started: new Date().toISOString(), interval: game.tuning.party.interval, samples: [] };
  }
  /** Call once a frame: takes a sample whenever another logEvery seconds of game time have gone. */
  update(): void {
    const g = this.game;
    if (g.clock.time < this.next) return;
    this.next = Math.floor(g.clock.time / EVERY) * EVERY + EVERY;
    const p = powerReport(g.creatures, g.witches, g.combat.sounds);
    this.run.interval = g.tuning.party.interval; // (the start screen's choice)
    this.run.samples.push({
      t: Math.round(g.clock.time), wave: g.party.wave, standing: [...g.combat.sounds.values()].filter(h => h.hp > 0).length,
      leashed: round(p.leashed), parked: round(p.parked), counts: p.counts,
      berries: g.tally.berries, invites: g.tally.invites, evolved: g.tally.evolved,
      sieges: p.sieges.map(s => ({ key: s.key, value: round(s.value), count: s.count, hp: Math.round(s.hp) })), marching: round(p.marching),
      hits: g.witches[0].health.hp,
      audio: this.audioState?.(),
    });
    this.save();
  }
  private save(): void {
    try {
      const runs = readRuns().filter(r => r.started !== this.run.started);
      runs.push(this.run);
      localStorage.setItem(KEY, JSON.stringify(runs.slice(-KEEP)));
    } catch { /* storage full or blocked: the log is a convenience */ }
  }
  /** The fight's scale or speed changed (the debug overlay's knobs): noted, with the game time. */
  fight(scale: number, speed: number, momentum = 1): void {
    (this.run.fight ??= []).push({ t: Math.round(this.game.clock.time * 10) / 10, scale, speed, momentum });
    this.save();
  }
  /** Area size, treetop speed or the map's size set (the link, or the debug overlay's slider): noted, with the game time. */
  world(areaSize: number, treetopSpeed: number, mapAreas: number): void {
    (this.run.world ??= []).push({ t: Math.round(this.game.clock.time * 10) / 10, areaSize, treetopSpeed, mapAreas });
    this.save();
  }
  /** The audio watchdog mended something (a context resumed, the music or sound effects rebuilt): noted, with the game time. */
  audio(what: string): void {
    const a = (this.run.audio ??= []);
    if (a.length < 200) a.push({ t: Math.round(this.game.clock.time * 10) / 10, what });
    this.save();
  }
  /** Every run kept on this browser (this one included), as a JSON file to save. */
  download(): void {
    this.save();
    const runs = readRuns(), all = runs.some(r => r.started === this.run.started) ? runs : [...runs, this.run];
    const blob = new Blob([JSON.stringify(all, null, 1)], { type: "application/json" }), a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `witch-playtest-${this.run.seed}-${this.run.started.slice(0, 16).replace(/[:T]/g, "-")}.json`;
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 1000);
  }
}
