// The page's own HUD over the game: the clock top centre (with the boot's and a lost soundsystem's pops under it) and the
// debug overlay (~), its buttons and the debug knobs shown with it. Driven by the loop (app/loop.ts in main.ts).
import { leashLoad, type Game, type WaveEvent } from "../rules/game";
import { waveCountdown } from "../rules/party";
import { clockSeconds, clockText } from "../rules/leypulse";
import { powerReport } from "../rules/power";
import { clearCue, clearableAt, wildLeft } from "../rules/clear";
import { bpmAt } from "../rules/beat";

export class Hud {
  debugOn = false;
  /** The latest lost soundsystem's time shown (game.waveEvents after it are new). */
  lossShown = -1;
  private bootShown = false;
  private lastDebug = -Infinity;
  private readonly debugEl = document.getElementById("debug")!;
  private readonly debugButtons = document.getElementById("debug-buttons")!;
  private readonly clockEl = document.getElementById("clock")!;
  private readonly clockT = this.clockEl.querySelector<HTMLElement>(".t")!;
  private readonly clockLabel = this.clockEl.querySelector<HTMLElement>(".label")!;
  private readonly clockBpm = this.clockEl.querySelector<HTMLElement>(".bpm");
  /** Her knockdowns' BPM bonus last shown (rules/beat.ts knockdownTempo). */
  private bonusShown = 0;
  private readonly wildEl = document.getElementById("wild-left");
  private lastWild = -Infinity;

  constructor(private readonly game: Game, private readonly tuning: { party: { interval: number } }, private readonly knobs: HTMLElement) {}

  /** The debug overlay, its buttons and the knobs, on or off. */
  setDebug(on: boolean): void {
    this.debugOn = on;
    this.debugEl.classList.toggle("on", on);
    this.debugButtons.classList.toggle("on", on); this.knobs.classList.toggle("on", on);
  }

  /** The game clock, top centre (Ed, 2026-10-06): the time played, mm:ss from 0, held while paused; under it, in debug, the
   *  wave's line. (The wave timer bar on the right is gone: the wave pointer's ring carries the countdown.) */
  clock(): void {
    const { game, tuning, clockEl, clockT, clockLabel } = this;
    const cd = waveCountdown(game.party, game.map, game.clock.time);
    clockEl.classList.toggle("on", game.clock.time > 0 || !game.clock.paused);
    const now = clockText(clockSeconds(game.party, game.clock.time));
    if (clockT.textContent !== now) clockT.textContent = now;
    clockEl.classList.toggle("paused", game.clock.paused);
    this.tempo();
    const clock = (s: number) => { const n = Math.ceil(s); return n >= 60 ? `${Math.floor(n / 60)}:${String(n % 60).padStart(2, "0")}` : `${n} s`; };
    const left = tuning.party.interval >= 1e9 ? "waves off" : cd.booting ? `booting · ${clock(cd.bootLeft)}` : clock(cd.left);
    clockLabel.textContent = this.debugOn ? `wave ${game.party.wave} · ${game.party.areas.size} areas · ${left}` : "";
    // The boot-up over (Ed, 2026-10-05: five quiet minutes from her first step): a quiet word under the clock.
    if (!this.bootShown && !cd.booting && game.party.bootUntil > 0 && game.clock.time >= game.party.bootUntil && tuning.party.interval < 1e9) {
      this.bootShown = true;
      const pop = document.createElement("div");
      pop.className = "boot-pop";
      pop.textContent = `speakers up · wave 1 in ${clock(cd.left)}`;
      clockEl.append(pop);
      setTimeout(() => pop.remove(), 4000);
    }
  }

  /** The party's tempo beside the clock, quietly (Ed, 2026-10-07: "the BPM goes up by 1 each time you die"): once she's
   *  been knocked down it shows, and each knockdown's rise pulses it and pops "+1 BPM" under the clock, so the player
   *  learns why the beat and the waves are speeding up. */
  private tempo(): void {
    const el = this.clockBpm, game = this.game;
    if (!el) return;
    const bonus = game.beat.bonus ?? 0;
    const text = bonus > 0 ? `${Math.round(bpmAt(game.beat, game.clock.time))} bpm` : "";
    if (el.textContent !== text) el.textContent = text;
    if (bonus > this.bonusShown) {
      const up = bonus - this.bonusShown;
      this.bonusShown = bonus;
      el.classList.remove("up"); void el.offsetWidth; el.classList.add("up"); // (restart the animation)
      const pop = document.createElement("div");
      pop.className = "bpm-pop";
      pop.textContent = `+${Math.round(up * 10) / 10} BPM · the crowd is restless`;
      this.clockEl.append(pop);
      setTimeout(() => pop.remove(), 2200);
    }
  }

  /** How many of the wild area's own animals still hold it, under the clock, four times a second, while she's in a wild
   *  area its clearing would transform (rules/clear.ts); hidden elsewhere, and once the party's over. */
  wildLeft(now: number): void {
    const el = this.wildEl, game = this.game;
    if (!el || now - this.lastWild <= 250) return;
    this.lastWild = now;
    const w = game.witch, cell = game.partyOver || w.seated ? null : clearableAt(game.party, game.map, w.x, w.z);
    const text = cell ? clearCue(wildLeft(game.creatures, cell)).text : "";
    if (el.textContent !== text) el.textContent = text;
    el.classList.toggle("on", !!text);
  }

  /** Every soundsystem lost since the last shown. */
  losses(): void { for (const e of this.game.waveEvents) if (e.kind === "soundsystemLost" && e.at > this.lossShown) this.showLoss(e); }

  /** A soundsystem lost (Ed, 2026-10-05): the next wave comes sooner; the clock flashes and the seconds taken off pop out
   *  under it ("−60 s", "wave now!"), and the wave pointer's ring jumps on. */
  showLoss(e: Extract<WaveEvent, { kind: "soundsystemLost" }>): void {
    const clockEl = this.clockEl;
    this.lossShown = e.at;
    clockEl.classList.remove("lost"); void clockEl.offsetWidth; clockEl.classList.add("lost"); // (restart the animation)
    const pop = document.createElement("div");
    pop.className = "loss-pop";
    pop.textContent = e.left <= 0 ? "wave now!" : `−${Math.round(e.cut)} s`;
    clockEl.append(pop);
    setTimeout(() => pop.remove(), 1800);
    setTimeout(() => { if (this.lossShown === e.at) clockEl.classList.remove("lost"); }, 900);
  }

  /** The overlay, four times a second (a new text every frame was a page layout every frame), with its buttons kept just
   *  below it however many lines it has: the lines `head` gives, then the power meter. */
  overlay(now: number, head: () => string[]): void {
    if (!this.debugOn || now - this.lastDebug <= 250) return;
    this.lastDebug = now;
    this.debugEl.textContent = [...head(), ...powerLines(this.game)].join("\n");
    this.debugButtons.style.top = `${this.debugEl.offsetTop + this.debugEl.offsetHeight + 6}px`;
  }
}

/** The power meter (Ed, 2026-10-04): fighting value, Σ √(hp × dps) (rules/power.ts), of the party
 *  (leashed and parked) against each siege and every besieger together. */
function powerLines(game: Game): string[] {
  const p = powerReport(game.creatures, game.witches, game.combat.sounds), n = p.counts, f = (x: number) => x.toFixed(0);
  const sieges = p.sieges.slice(0, 4).map(s => `${s.key} ${f(s.value)} (${s.count}, ${f(s.hp)} hp)`).join("  ");
  return [
    `power  party ${f(p.leashed + p.parked)} = leashed ${f(p.leashed)} + parked ${f(p.parked)}   ${n[0]}b ${n[1]}y ${n[2]}a ${n[3]}L   berries ${game.tally.berries} invites ${game.tally.invites}`,
    `wild   peopled from the start by route (no growth)   creatures ${game.creatures.length}   cleared early ${game.party.ahead?.size ?? 0}`,
    (() => { const L = leashLoad(game), W = game.tuning.leash.weight; return `load   ${L.total.toFixed(2)} pull, ${L.over.toFixed(2)} over the free ${W.free}${L.extreme ? " EXTREME" : ""}${L.total ? `  toward ${Math.round((Math.atan2(L.x, -L.z) * 180) / Math.PI + 360) % 360}°` : ""}   stack ${game.leash.stack.length}   lift ${game.witch.lift.toFixed(2)}`; })(),
    `enemy  marching ${f(p.marching)}${p.sieges.length ? `   ${sieges}${p.sieges.length > 4 ? ` +${p.sieges.length - 4} more` : ""}` : ""}   (L saves the playtest log)`,
  ];
}
