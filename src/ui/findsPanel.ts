// The finds' dev control (Ed, 2026-10-23: "we will need a debug control that allows devs to give themselves collectible items"):
// every kind of find in rules/finds.ts's FIND_KINDS (a new kind shows here by itself), each item a toggle, owned or not, and each
// kind all or none, and reset everything. It gives and lets go through app/finds.ts, the same keepers a real find goes through,
// so the game behaves as if she'd found them. Opened from the debug overlay's buttons (~, "finds (dev)") or ?dev=finds; never
// shown otherwise. ?own= is its switch for tests and shots (app/linkParams.ts).
import { FIND_KINDS, type FindKindId } from "../rules/finds";
import { KEEPERS, dropFind, fittedLine, grantAll, grantFind, type FindsCtx } from "../app/finds";

const CSS = `
#finds-dev { position: fixed; right: 10px; top: 52px; bottom: 10px; width: 340px; overflow-y: auto; z-index: 40; display: none;
  background: rgba(14, 11, 28, .94); color: var(--ink, #e8e2f4); border: 1px dashed #6b5aa6; border-radius: 8px; padding: 10px 12px; font: 12px ui-monospace, monospace; }
#finds-dev.on { display: block; }
#finds-dev h2 { font-size: 13px; margin: 0 0 6px; display: flex; justify-content: space-between; align-items: center; }
#finds-dev h3 { font-size: 12px; margin: 12px 0 4px; display: flex; gap: 6px; align-items: center; }
#finds-dev h3 .n { color: #9a8fc0; font-weight: normal; margin-right: auto; }
#finds-dev button { font: inherit; color: inherit; background: #2a2244; border: 1px solid #4a3f78; border-radius: 4px; padding: 2px 7px; cursor: pointer; }
#finds-dev .items { display: flex; flex-wrap: wrap; gap: 4px; }
#finds-dev .items button { background: transparent; color: #9a8fc0; }
#finds-dev .items button[aria-pressed="true"] { background: #3a2a14; border-color: #d9a441; color: #f4e6c8; }
#finds-dev .line { color: #9a8fc0; margin-top: 4px; }
#finds-dev .spawn { margin-top: 14px; padding-top: 8px; border-top: 1px dashed #4a3f78; }
#finds-dev .spawn select { font: inherit; color: inherit; background: #1c1630; border: 1px solid #4a3f78; border-radius: 4px; padding: 2px 4px; max-width: 150px; }
#finds-dev .spawn .row { display: flex; gap: 6px; flex-wrap: wrap; align-items: center; margin-top: 6px; }
#finds-dev .said { color: #d9a441; margin-top: 6px; min-height: 1em; }
#finds-dev .note { color: #7d739f; margin-top: 10px; line-height: 1.4; }
`;

/** Tonight's loan (app/loan.ts; Ed, 2026-10-24) for the panel: its name or null, and settling it now as a win or a loss (its dream
 *  played over the game: main.ts). */
export interface LoanControl { now(): string | null; keep(): void; back(): void }

export class FindsPanel {
  mutate: (action: () => void) => void = action => action();
  private readonly el = document.createElement("div");

  private said = "";
  private pick: { kind: FindKindId; item: string } | null = null;

  /** `ctx` gives the keepers tonight's spells and what she owns, each time (a new night, a new game); `spawn` puts a find (or
   *  tonight's, item null) on clear ground in front of her (Ed, 2026-10-23: "a way to spawn the collectible near the player"),
   *  saying what it did. */
  constructor(private readonly ctx: () => FindsCtx, private readonly spawn: (kind: FindKindId | null, item: string | null) => string, private readonly loan?: LoanControl) {
    const style = document.createElement("style");
    style.textContent = CSS;
    document.head.append(style);
    this.el.id = "finds-dev";
    document.body.append(this.el);
    this.el.addEventListener("click", e => this.click(e));
    this.el.addEventListener("change", e => {
      const t = e.target as HTMLSelectElement;
      if (t.classList.contains("kind")) this.pick = { kind: t.value as FindKindId, item: "" };
      else if (t.classList.contains("item") && this.pick) this.pick.item = t.value;
      else if (t.classList.contains("item")) this.pick = { kind: this.el.querySelector<HTMLSelectElement>("select.kind")!.value as FindKindId, item: t.value };
      if (t.classList.contains("kind")) this.draw();
    });
    // (its clicks and keys are its own: not the game's)
    for (const t of ["pointerdown", "keydown", "wheel"]) this.el.addEventListener(t, e => e.stopPropagation());
  }

  get on(): boolean { return this.el.classList.contains("on"); }
  toggle(on = !this.on): void { this.el.classList.toggle("on", on); if (on) this.draw(); }

  private click(e: Event): void {
    this.mutate(() => this.clickNow(e));
  }
  private clickNow(e: Event): void {
    const b = (e.target as HTMLElement).closest("button");
    if (!b) return;
    const c = this.ctx(), kind = b.dataset.kind as (typeof FIND_KINDS)[number]["id"] | undefined, id = b.dataset.id;
    if (b.dataset.act === "close") return this.toggle(false);
    if (b.dataset.act === "spawn" || b.dataset.act === "tonight") {
      const k = this.el.querySelector<HTMLSelectElement>("select.kind")?.value as FindKindId, it = this.el.querySelector<HTMLSelectElement>("select.item")?.value ?? "";
      this.said = b.dataset.act === "tonight" ? this.spawn(null, null) : this.spawn(k, it);
      return this.draw();
    }
    if (b.dataset.act === "keep" || b.dataset.act === "back") { (b.dataset.act === "keep" ? this.loan?.keep : this.loan?.back)?.(); return this.draw(); }
    if (b.dataset.act === "reset") for (const k of FIND_KINDS) grantAll(c, k.id, false);
    else if (kind && b.dataset.act === "all") grantAll(c, kind, true);
    else if (kind && b.dataset.act === "none") grantAll(c, kind, false);
    else if (kind && id) (KEEPERS[kind].has(c).has(id) ? dropFind : grantFind)(c, kind, id);
    this.draw();
  }

  private draw(): void {
    const c = this.ctx(), esc = (s: string) => s.replace(/[&<>"]/g, ch => `&#${ch.charCodeAt(0)};`);
    let html = `<h2>🧪 Finds (dev) <span><button data-act="reset" title="Let every find go">reset everything</button> <button data-act="close">✕</button></span></h2>`;
    for (const k of FIND_KINDS) {
      const keep = KEEPERS[k.id], has = keep.has(c), n = k.items.filter(id => has.has(id)).length;
      html += `<h3>${esc(k.id)} <span class="n">${n}/${k.items.length} · each a ${esc(k.name)}</span><button data-kind="${k.id}" data-act="all">all</button><button data-kind="${k.id}" data-act="none">none</button></h3><div class="items">`;
      for (const id of k.items) html += `<button data-kind="${k.id}" data-id="${esc(id)}" aria-pressed="${has.has(id)}" title="${esc(id)}">${esc(keep.label(id))}</button>`;
      html += `</div>`;
      if (k.id === "part") html += `<div class="line">on her broom: ${esc(fittedLine(c))}</div>`;
    }
    // Tonight's loan: settled now as a win (kept) or a loss (sent back), its dream played over the game.
    const lent = this.loan?.now() ?? null;
    html += `<div class="spawn"><h3>Tonight's loan</h3><div class="row">${lent ? `${esc(lent)} <button data-act="keep" title="Settle it now as a won night: kept for good, its dream shown">keep (won)</button><button data-act="back" title="Settle it now as a lost night: gone back to the stars, its dream shown">send back (lost)</button>` : "nothing on loan (take tonight's find first)"}</div></div>`;
    // Spawn a find near her: a kind, then its items (the ones she hasn't got first), placed as tonight's find.
    const kind = this.pick?.kind ?? FIND_KINDS[0].id, K = FIND_KINDS.find(k => k.id === kind)!, keepK = KEEPERS[kind], hasK = keepK.has(c);
    const items = [...K.items].sort((a, b) => Number(hasK.has(a)) - Number(hasK.has(b)));
    const item = this.pick?.item && items.includes(this.pick.item) ? this.pick.item : items[0];
    html += `<div class="spawn"><h3>Spawn a find near her</h3>`;
    html += `<div class="row"><select class="kind">${FIND_KINDS.map(k => `<option value="${k.id}"${k.id === kind ? " selected" : ""}>${esc(k.id)}</option>`).join("")}</select>`;
    html += `<select class="item">${items.map(id => `<option value="${esc(id)}"${id === item ? " selected" : ""}>${esc(keepK.label(id))}${hasK.has(id) ? " (owned)" : ""}</option>`).join("")}</select>`;
    html += `<button data-act="spawn" title="Put it on clear ground a few metres in front of her, as tonight's find">spawn here</button></div>`;
    html += `<div class="row"><button data-act="tonight" title="Move tonight's own find next to her">tonight's find here</button></div><div class="said">${esc(this.said)}</div></div>`;
    html += `<div class="note">Given or let go on this browser's saves, as a real find is (a part fits her broom if its slot is empty). One she's wearing stays hers. ?own=all · none · kind:item · kind:* for a load. A spawned find replaces tonight's (the constellation points at it too); E takes it as ever. ?spawnfind=kind:item or tonight.</div>`;
    this.el.innerHTML = html;
  }
}
