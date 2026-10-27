// The Fight Arena's panel (Ed, 2026-10-27; rules/fightArena.ts, app/fightArena.ts): down the right edge while ?fight= is on. The
// seed and its link, a random pack (seeded) or one typed, the fight again (J), pause and slow motion, and the attack each kind in
// the pack fights with today (config/combat.json, read only for now: the attack editor comes with the composable attacks).
// Its clicks and keys are its own, never the game's.

const CSS = `
#fight-arena { position: fixed; right: 10px; top: 52px; width: 330px; max-height: calc(100vh - 62px); overflow-y: auto; z-index: 40;
  background: rgba(14, 11, 28, .94); color: var(--ink, #e8e2f4); border: 1px dashed #a65a5a; border-radius: 8px; padding: 10px 12px; font: 12px ui-monospace, monospace; }
#fight-arena h2 { font-size: 13px; margin: 0 0 8px; display: flex; justify-content: space-between; align-items: center; }
#fight-arena h3 { font-size: 12px; margin: 12px 0 4px; color: #d9a441; }
#fight-arena button { font: inherit; color: inherit; background: #2a2244; border: 1px solid #4a3f78; border-radius: 4px; padding: 3px 8px; cursor: pointer; }
#fight-arena button[aria-pressed="true"] { background: #3a2a14; border-color: #d9a441; color: #f4e6c8; }
#fight-arena .row { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; margin-top: 6px; }
#fight-arena input { font: inherit; color: inherit; background: #1c1630; border: 1px solid #4a3f78; border-radius: 4px; padding: 3px 5px; flex: 1; min-width: 0; }
#fight-arena .seed { color: #f4e6c8; }
#fight-arena .said { color: #d9a441; margin-top: 6px; min-height: 1em; }
#fight-arena pre { margin: 4px 0 0; padding: 6px; background: #1c1630; border-radius: 4px; white-space: pre-wrap; word-break: break-word; color: #c9c0e4; max-height: 180px; overflow-y: auto; }
#fight-arena .note { color: #7d739f; margin-top: 10px; line-height: 1.4; }
`;

/** What the panel asks of the game (app/fightArena.ts). */
export interface FightHost {
  /** The seed of the pack now, and its spec ("wolf*4@2,raven*2@1"). */
  seed(): number; spec(): string;
  /** A new pack: the next seed's roll. */
  roll(): void;
  /** The pack typed in (the arena's spec); false if it reads as nothing. */
  setSpec(spec: string): boolean;
  /** The fight again: the pack put back where it started, fresh. */
  reset(): void;
  /** How fast the fight runs: 1, ½, ¼, or 0 (paused). */
  speed: number;
  /** The link that brings this fight back. */
  link(): string;
  /** The attack each kind in the pack fights with today. */
  attacks(): { species: string; level: number; name: string; attack: object }[];
}

const SPEEDS: [number, string][] = [[1, "▶ 1×"], [0.5, "½×"], [0.25, "¼×"], [0, "❚❚"]];

export class FightPanel {
  private readonly el = document.createElement("div");
  private said = "";

  constructor(public host: FightHost) {
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.append(style);
    this.el.id = "fight-arena";
    document.body.append(this.el);
    this.el.addEventListener("click", e => this.click(e));
    this.el.addEventListener("keydown", e => {
      const t = e.target as HTMLInputElement;
      if (e.key === "Enter" && t.classList.contains("spec")) this.typed(t.value);
    });
    for (const t of ["pointerdown", "keydown", "keyup", "wheel"]) this.el.addEventListener(t, e => e.stopPropagation());
    this.draw();
  }

  private say(s: string): void { this.said = s; this.draw(); }

  private typed(spec: string): void {
    this.say(this.host.setSpec(spec) ? `pack: ${this.host.spec()}` : `"${spec}" isn't a pack (species*count@level, comma between)`);
  }

  private click(e: Event): void {
    const b = (e.target as HTMLElement).closest("button");
    if (!b) return;
    const what = b.dataset.do;
    if (what === "roll") { this.host.roll(); this.say(`seed ${this.host.seed()}: ${this.host.spec()}`); }
    else if (what === "reset") { this.host.reset(); this.say("the fight again"); }
    else if (what === "speed") { this.host.speed = Number(b.dataset.v); this.draw(); }
    else if (what === "set") this.typed(this.el.querySelector<HTMLInputElement>("input.spec")!.value);
    else if (what === "link") {
      const link = this.host.link();
      void navigator.clipboard?.writeText(link).then(() => this.say("link copied"), () => this.say(link));
    }
  }

  /** Drawn again (a roll, a new pack). */
  draw(): void {
    const H = this.host, esc = (s: string) => s.replace(/[&<>"]/g, c => `&#${c.charCodeAt(0)};`);
    const attacks = H.attacks().map(a => `<h3>${esc(a.species)} @${a.level}: ${esc(a.name)}</h3><pre>${esc(JSON.stringify(a.attack, null, 1))}</pre>`).join("");
    this.el.innerHTML = `<h2>⚔ Fight Arena <span class="seed">seed ${H.seed()}</span></h2>
      <div class="row"><button data-do="roll" title="The next seed's pack: a kind or two, 2 to 6 each, young or adult; now and then a lone legend">🎲 Random pack</button>
        <button data-do="reset" title="The pack back where it started, fresh (J)">↺ Fight again</button>
        <button data-do="link" title="Copy the link that brings this fight back">🔗 Link</button></div>
      <div class="row"><input class="spec" value="${esc(H.spec())}" spellcheck="false" title="species*count@level (1 young, 2 adult, 3 legend), comma between"><button data-do="set">Set</button></div>
      <div class="row">${SPEEDS.map(([v, l]) => `<button data-do="speed" data-v="${v}" aria-pressed="${H.speed === v}">${l}</button>`).join("")}</div>
      <div class="said">${esc(this.said)}</div>
      ${attacks}
      <p class="note">Today's attacks, read only: the editor (randomise, tweak, save, copy and paste) comes with the composable attacks.</p>`;
  }
}
