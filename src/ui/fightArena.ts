// The Fight Arena's panel (Ed, 2026-10-27; rules/fightArena.ts, app/fightArena.ts): down the right edge while ?fight= is on. The
// seed and its link, a random pack (seeded) or one typed, the fight again (J), its speed (slow motion, pause, a frame at a time), the
// telegraphs' timings over the fight, the attack (a form made from the composable attacks' schema, ui/schemaForm.ts, once they're
// in; its raw JSON always; copy and paste), and the library of attacks found fun (app/attackLibrary.ts). Its clicks and keys are its
// own, never the game's.
import { renderForm, type Schema } from "./schemaForm";
import type { Saved } from "../app/attackLibrary";

const CSS = `
#fight-arena { position: fixed; right: 10px; top: 52px; width: 340px; max-height: calc(100vh - 62px); overflow-y: auto; z-index: 40;
  background: rgba(14, 11, 28, .94); color: var(--ink, #e8e2f4); border: 1px dashed #a65a5a; border-radius: 8px; padding: 10px 12px; font: 12px ui-monospace, monospace; }
#fight-arena h2 { font-size: 13px; margin: 0 0 8px; display: flex; justify-content: space-between; align-items: center; }
#fight-arena h3 { font-size: 12px; margin: 12px 0 4px; color: #d9a441; display: flex; gap: 6px; align-items: center; }
#fight-arena button { font: inherit; color: inherit; background: #2a2244; border: 1px solid #4a3f78; border-radius: 4px; padding: 3px 8px; cursor: pointer; }
#fight-arena button:disabled { opacity: .4; cursor: default; }
#fight-arena button[aria-pressed="true"] { background: #3a2a14; border-color: #d9a441; color: #f4e6c8; }
#fight-arena .row { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; margin-top: 6px; }
#fight-arena input, #fight-arena select, #fight-arena textarea { font: inherit; color: inherit; background: #1c1630; border: 1px solid #4a3f78; border-radius: 4px; padding: 3px 5px; }
#fight-arena .row input { flex: 1; min-width: 0; }
#fight-arena textarea { width: 100%; box-sizing: border-box; resize: vertical; }
#fight-arena textarea.bad { border-color: #c0504d; }
#fight-arena .seed { color: #f4e6c8; }
#fight-arena .said { color: #d9a441; margin-top: 6px; min-height: 1em; white-space: pre-wrap; }
#fight-arena .warn { color: #e08a5a; }
#fight-arena .tim { margin-top: 6px; color: #c9c0e4; }
#fight-arena .tim .short { color: #ff6b5a; }
#fight-arena pre { margin: 4px 0 0; padding: 6px; background: #1c1630; border-radius: 4px; white-space: pre-wrap; word-break: break-word; color: #c9c0e4; max-height: 160px; overflow-y: auto; }
#fight-arena .note { color: #7d739f; margin-top: 8px; line-height: 1.4; }
#fight-arena .lib { list-style: none; margin: 4px 0 0; padding: 0; }
#fight-arena .lib li { display: flex; gap: 4px; align-items: center; margin-top: 3px; }
#fight-arena .lib .name { flex: 1; text-align: left; background: transparent; border-color: transparent; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
#fight-arena .lib .star { background: transparent; border-color: transparent; padding: 1px 3px; color: #7d739f; }
#fight-arena .lib .star[aria-pressed="true"] { color: #f4c542; background: transparent; }
#fight-arena .sf-row { display: flex; flex-wrap: wrap; gap: 4px; align-items: center; margin-top: 3px; }
#fight-arena .sf-key { color: #9a8fc0; min-width: 72px; }
#fight-arena .sf-box { flex-basis: 100%; margin-left: 10px; padding-left: 6px; border-left: 1px dashed #4a3f78; }
#fight-arena .sf-row input { width: 80px; flex: 0 1 auto; }
#fight-arena .sf-x, #fight-arena .sf-add { padding: 0 5px; }
#fight-tells { position: fixed; inset: 0; pointer-events: none; z-index: 30; font: bold 12px ui-monospace, monospace; }
#fight-tells div { position: absolute; transform: translate(-50%, -100%); padding: 1px 4px; border-radius: 3px; background: rgba(14, 11, 28, .8); color: #f4e6c8; white-space: nowrap; }
#fight-tells div.short { color: #ff6b5a; border: 1px solid #ff6b5a; }
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
  /** One frame on, while paused. */
  step(): void;
  /** Whether the telegraphs' timings show over the fight; the shortest lead seen and whose, and how many. */
  timings: boolean;
  shortest(): { lead: number; of: string; count: number; floor: number };
  /** The link that brings this fight back. */
  link(): string;
  /** The attack each kind in the pack fights with today. */
  attacks(): { species: string; level: number; name: string; attack: object }[];
  /** The composable attacks' schema (the form's), when they're in; null till then. */
  attackSchema(): Schema | null;
  /** The attack being edited (null: the pack's own), and it set: what's wrong with it and what the composer changed. */
  attack: unknown;
  setAttack(a: unknown): { errors: string[]; warnings: string[]; notes?: string[] };
  /** The attack as JSON to copy (canonical: short, in the grammar's order). */
  attackJson(): string;
  /** Kind `i` of the pack's attack today taken into the editor. */
  editOwn?(i: number): void;
  /** What to know about the attack set now (the pack fighting with it or not), under the box. */
  attackNote?: string;
  /** A random fair attack, when the composable attacks are in. */
  randomAttack?(): unknown;
  /** The library. */
  library(): Saved[];
  save(name: string): Saved;
  load(name: string): void;
  remove(name: string): void;
  toggleFav(name: string): void;
  exportJson(name?: string): string;
  importJson(text: string): string[];
}

const SPEEDS: [number, string][] = [[1, "▶ 1×"], [0.5, "½×"], [0.25, "¼×"], [0, "❚❚"]];

export class FightPanel {
  private readonly el = document.createElement("div");
  readonly tells = document.createElement("div");
  private said = "";
  private text = "";
  private bad = false;
  private name = "";

  constructor(public host: FightHost) {
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.append(style);
    this.el.id = "fight-arena"; this.tells.id = "fight-tells";
    document.body.append(this.tells, this.el);
    this.el.addEventListener("click", e => this.click(e));
    this.el.addEventListener("keydown", e => {
      const t = e.target as HTMLInputElement;
      if (e.key === "Enter" && t.classList.contains("spec")) this.typed(t.value);
      if (e.key === "Enter" && t.classList.contains("save-name")) this.saveAs(t.value);
    });
    this.el.addEventListener("input", e => {
      const t = e.target as HTMLTextAreaElement;
      if (t.classList.contains("json")) this.text = t.value;
      if (t.classList.contains("save-name")) this.name = t.value;
    });
    for (const t of ["pointerdown", "keydown", "keyup", "wheel"]) this.el.addEventListener(t, e => e.stopPropagation());
    this.text = this.host.attack == null ? "" : JSON.stringify(this.host.attack, null, 1);
    this.draw();
  }

  private say(s: string): void { this.said = s; this.draw(); }

  private typed(spec: string): void {
    this.say(this.host.setSpec(spec) ? `pack: ${this.host.spec()}` : `"${spec}" isn't a pack (species*count@level, comma between)`);
  }

  /** The attack's JSON box applied (empty: the pack's own attacks). */
  private apply(): void {
    let v: unknown = null;
    try { v = this.text.trim() ? JSON.parse(this.text) : null; this.bad = false; } catch (e) { this.bad = true; this.say(`not JSON: ${(e as Error).message}`); return; }
    this.setAttack(v);
  }

  private setAttack(v: unknown): void {
    const r = this.host.setAttack(v);
    if (!r.errors.length) this.text = v == null ? "" : this.host.attackJson();
    this.bad = r.errors.length > 0;
    this.say([...r.errors.map(e => `✗ ${e}`), ...r.warnings.map(w => `⚠ ${w}`), ...(r.notes ?? []).map(n => `· ${n}`)].join("\n") || (v == null ? "the pack's own attacks" : "attack set"));
  }

  private saveAs(name: string): void {
    const n = name.trim();
    if (!n) { this.say("give it a name first"); return; }
    this.apply();
    if (this.bad) return;
    this.host.save(n); this.name = "";
    this.say(`saved "${n}"`);
  }

  private copy(text: string, what: string): void {
    void navigator.clipboard?.writeText(text).then(() => this.say(`${what} copied`), () => this.say(text));
  }

  private click(e: Event): void {
    const b = (e.target as HTMLElement).closest("button");
    if (!b || !this.el.contains(b)) return;
    const H = this.host, what = b.dataset.do, name = b.closest("li")?.dataset.name ?? "";
    if (!what) return;
    if (what === "roll") { H.roll(); this.say(`seed ${H.seed()}: ${H.spec()}`); }
    else if (what === "reset") { H.reset(); this.say("the fight again"); }
    else if (what === "speed") { H.speed = Number(b.dataset.v); this.draw(); }
    else if (what === "step") H.step();
    else if (what === "timings") { H.timings = !H.timings; this.draw(); }
    else if (what === "set") this.typed(this.el.querySelector<HTMLInputElement>("input.spec")!.value);
    else if (what === "link") this.copy(H.link(), "link");
    else if (what === "apply") this.apply();
    else if (what === "own") this.setAttack(null);
    else if (what === "random" && H.randomAttack) this.setAttack(H.randomAttack());
    else if (what === "copy") this.copy(H.attack == null ? "null" : H.attackJson(), "attack JSON");
    else if (what === "edit" && H.editOwn) { H.editOwn(Number(b.dataset.i)); this.bad = false; this.text = H.attack == null ? "" : H.attackJson(); this.say("today's attack in the editor: change it, then Set"); }
    else if (what === "paste") {
      const take = (t: string) => {
        try { const v = JSON.parse(t); if (Array.isArray(v) || (v && typeof v === "object" && "name" in v && "attack" in v)) { this.say(`taken into the library: ${H.importJson(t).join(", ")}`); } else this.setAttack(v); }
        catch (err) { this.text = t; this.bad = true; this.say(`not JSON: ${(err as Error).message}`); }
      };
      if (navigator.clipboard?.readText) void navigator.clipboard.readText().then(take, () => this.say("the clipboard can't be read here: paste into the JSON box and press Set"));
      else this.say("paste into the JSON box and press Set");
    }
    else if (what === "save") this.saveAs(this.el.querySelector<HTMLInputElement>("input.save-name")!.value);
    else if (what === "load") { H.load(name); this.bad = false; this.text = H.attack == null ? "" : JSON.stringify(H.attack, null, 1); this.say(`"${name}": seed ${H.seed()}, ${H.spec()}`); }
    else if (what === "fav") { H.toggleFav(name); this.draw(); }
    else if (what === "del") { H.remove(name); this.say(`"${name}" removed`); }
    else if (what === "copyone") this.copy(H.exportJson(name), `"${name}"`);
    else if (what === "copylib") this.copy(H.exportJson(), "the library");
  }

  /** The timings line, each frame (not the whole panel). */
  tick(): void {
    const s = this.host.shortest(), line = this.el.querySelector<HTMLElement>(".tim");
    if (!line) return;
    line.innerHTML = s.count ? `${s.count} telegraph${s.count === 1 ? "" : "s"}; shortest <span class="${s.lead < s.floor ? "short" : ""}">${s.lead.toFixed(2)} s</span> (${s.of})${s.lead < s.floor ? ` under the ${s.floor} s floor` : ""}` : "no telegraphs yet";
  }

  /** Drawn again (a roll, a new pack, a change). */
  draw(): void {
    const H = this.host, esc = (s: string) => s.replace(/[&<>"]/g, c => `&#${c.charCodeAt(0)};`), schema = H.attackSchema();
    const own = H.attacks().map((a, i) => `<h3>${esc(a.species)} @${a.level}: ${esc(a.name)}${H.editOwn ? ` <button data-do="edit" data-i="${i}" title="Into the editor, to change">✎</button>` : ""}</h3><pre>${esc(JSON.stringify(a.attack, null, 1))}</pre>`).join("");
    const lib = H.library().map(s => `<li data-name="${esc(s.name)}"><button data-do="fav" class="star" aria-pressed="${!!s.fav}" title="Favourite">★</button><button data-do="load" class="name" title="Load it: its attack, its pack and seed${s.pack ? ` (${esc(s.pack)})` : ""}">${esc(s.name)}</button><button data-do="copyone" title="Copy it as JSON">⧉</button><button data-do="del" title="Remove it">✕</button></li>`).join("");
    this.el.innerHTML = `<h2>⚔ Fight Arena <span class="seed">seed ${H.seed()}</span></h2>
      <div class="row"><button data-do="roll" title="The next seed's pack: a kind or two, 2 to 6 each, young or adult; now and then a lone legend">🎲 Random pack</button>
        <button data-do="reset" title="The pack back where it started, fresh (J)">↺ Fight again</button>
        <button data-do="link" title="Copy the link that brings this fight back">🔗 Link</button></div>
      <div class="row"><input class="spec" value="${esc(H.spec())}" spellcheck="false" title="species*count@level (1 young, 2 adult, 3 legend), comma between"><button data-do="set">Set</button></div>
      <div class="row">${SPEEDS.map(([v, l]) => `<button data-do="speed" data-v="${v}" aria-pressed="${H.speed === v}">${l}</button>`).join("")}
        <button data-do="step" ${H.speed === 0 ? "" : "disabled"} title="One frame on (paused)">⏭</button>
        <button data-do="timings" aria-pressed="${H.timings}" title="Each telegraph's time to impact over the fight, red under the reaction floor">⏱</button></div>
      <div class="tim"></div>
      <div class="said">${esc(this.said)}</div>
      <h3>Attack</h3>
      <div class="form"></div>
      <textarea class="json ${this.bad ? "bad" : ""}" rows="5" spellcheck="false" placeholder="the attack's JSON (empty: the pack's own attacks)">${esc(this.text)}</textarea>
      <div class="row"><button data-do="apply" title="Fight with this attack">Set</button>
        <button data-do="random" ${H.randomAttack ? "" : "disabled"} title="A random fair attack from the composable modules">🎲 Randomise attack</button>
        <button data-do="own" title="Back to the pack's own attacks">Own</button>
        <button data-do="copy">Copy JSON</button><button data-do="paste" title="An attack, a saved one or a whole library from the clipboard">Paste JSON</button></div>
      ${schema ? "" : `<p class="note">The form comes with the composable attacks (their schema): till then the JSON box is kept as it is, for the library.</p>`}
      ${H.attackNote ? `<p class="note">${esc(H.attackNote)}</p>` : ""}
      <h3>Library <button data-do="copylib" title="Copy the whole library as JSON">⧉ all</button></h3>
      <div class="row"><input class="save-name" placeholder="name it" value="${esc(this.name)}"><button data-do="save" title="Save this attack with this fight's pack and seed">💾 Save</button></div>
      <ul class="lib">${lib || `<li class="note">Nothing saved yet.</li>`}</ul>
      <h3>Today's attacks</h3>${own}`;
    const form = this.el.querySelector<HTMLElement>(".form")!;
    if (schema) renderForm(form, schema, H.attack ?? undefined, v => this.setAttack(v ?? null));
    this.tick();
  }
}
