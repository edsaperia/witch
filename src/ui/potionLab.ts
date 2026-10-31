import { button, h } from './dom';
import type { Game } from '../rules/game';
import { POTION_RECIPES, type PotionRecipe } from '../rules/potionRecipes';
import { POTION_PARAMETERS, potionSettings, setPotionSetting, resetPotionSettings, potionSettingsSnapshot } from '../rules/potionSettings';
import { mushroomArt } from '../render/mushroomArt';
import type { Style } from '../render/style';

export type PotionSort = 'mushrooms' | 'effect' | 'status';
export function sortedPotions(column: PotionSort, descending = false): PotionRecipe[] {
  const value = (r: PotionRecipe) => column === 'mushrooms' ? r.recipe.join('+') : column === 'effect' ? r.name : r.comingSoon ? 'Coming soon' : 'Implemented';
  return [...POTION_RECIPES].sort((a, b) => (value(a).localeCompare(value(b)) || a.id - b.id) * (descending ? -1 : 1));
}
export function potionLabSnapshot(game: Game, recipe: PotionRecipe, build: string) {
  return { generator: 'witch-game-potion-lab', version: 1, build, seed: game.seed, gameTime: game.clock.time,
    recipe: { id: recipe.id, key: recipe.key, mushrooms: [...recipe.recipe], effect: recipe.effect, name: recipe.name, description: recipe.description, comingSoon: recipe.comingSoon }, settings: potionSettingsSnapshot() };
}
export function tryLabPotion(game: Game, recipe: PotionRecipe): boolean {
  if (recipe.comingSoon) return false;
  const witch = game.witches[0];
  if (!witch || game.mushrooms.affected[witch.id]) return false;
  game.mushrooms.trips[witch.id] = { recipe: [...recipe.recipe], key: recipe.key, at: game.clock.time, until: game.clock.time + 600 };
  return true;
}

const CSS = `#potion-lab{display:none;position:fixed;inset:12px 12px 12px auto;width:min(730px,calc(100vw - 24px));overflow:auto;background:#181622;color:#eee8fa;border:1px solid #706181;border-radius:10px;padding:18px;box-sizing:border-box;font:14px/1.4 system-ui;box-shadow:0 8px 35px #0009}#potion-lab.open{display:block}#potion-lab h2,#potion-lab h3{margin:4px 0 10px}#potion-lab button{font:inherit;color:inherit;background:#373044;border:1px solid #756481;border-radius:5px;padding:6px 10px;cursor:pointer}#potion-lab button:hover,#potion-lab button:focus-visible{background:#574468}#potion-lab .actions{display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin:10px 0}#potion-lab .book{max-height:38vh;overflow:auto;border:1px solid #50445d}#potion-lab table{width:100%;border-collapse:collapse}#potion-lab th{position:sticky;top:0;background:#24202e;z-index:1;text-align:left}#potion-lab td,#potion-lab th{padding:7px;border-bottom:1px solid #453c50;vertical-align:top}#potion-lab td:first-child{white-space:nowrap}#potion-lab img{width:34px;height:44px;object-fit:contain;image-rendering:pixelated;vertical-align:middle}#potion-lab small{display:block;color:#c6b9d2;max-width:380px;margin-top:4px}#potion-lab tr.selected{background:#393047}#potion-lab .knob{display:grid;grid-template-columns:1fr minmax(90px,1fr) 80px;gap:8px;align-items:center;margin:10px 0}#potion-lab input{min-width:0;width:100%;box-sizing:border-box}#potion-lab input[type=number]{background:#282332;color:inherit;border:1px solid #786984;padding:5px}#potion-lab textarea{width:100%;height:120px;box-sizing:border-box}#potion-lab .status{min-height:1.4em;color:#ead49b}#potion-lab :focus-visible{outline:2px solid #f2ce85;outline-offset:2px}`;

export class PotionLab {
  readonly root = h('section', { id: 'potion-lab', attrs: { role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Potion lab' } });
  private readonly book = h('div', { class: 'book' });
  private readonly detail = h('div');
  private readonly status = h('p', { class: 'status', attrs: { 'aria-live': 'polite' } });
  private readonly thumbnails = new Map<string, string>();
  private selected = POTION_RECIPES.find(r => !r.comingSoon)!;
  private column: PotionSort = 'status';
  private descending = true;
  private previousFocus: HTMLElement | null = null;
  get on(): boolean { return this.root.classList.contains('open'); }
  constructor(private readonly game: () => Game, private readonly style: Style, private readonly build: string, private readonly resume: () => void) {
    document.head.append(h('style', { text: CSS }));
    const back = button('Back to pause', () => this.close());
    this.root.append(h('div', { class: 'actions' }, h('h2', { text: 'Potion lab' }), back),
      h('p', { text: 'Choose a recipe to adjust its effect. The game stays paused here. Try effect resumes with a fresh ten-minute potion.' }), this.book, this.detail, this.status);
    document.body.append(this.root);
    this.root.addEventListener('pointerdown', e => e.stopPropagation());
    this.root.addEventListener('wheel', e => e.stopPropagation());
    this.root.addEventListener('keydown', e => {
      e.stopPropagation();
      if (e.key === 'Tab') {
        const nodes = [...this.root.querySelectorAll<HTMLElement>('button,input,textarea')].filter(node => !node.hasAttribute('disabled'));
        const first = nodes[0], last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    });
    window.addEventListener('keydown', e => { if (this.on && e.key === 'Escape') { e.preventDefault(); e.stopImmediatePropagation(); this.close(); } }, { capture: true });
  }
  show(): void {
    this.previousFocus = document.activeElement as HTMLElement | null;
    this.root.classList.add('open'); this.renderBook(); this.renderDetail(); this.status.textContent = '';
    this.root.querySelector('button')?.focus();
  }
  close(): void { this.root.classList.remove('open'); this.previousFocus?.focus(); }
  private image(type: string): HTMLImageElement {
    let src = this.thumbnails.get(type);
    if (!src) {
      const sprite = mushroomArt(this.style, type, 64), canvas = document.createElement('canvas');
      canvas.width = sprite.w; canvas.height = sprite.h;
      canvas.getContext('2d')!.drawImage(sprite.A as CanvasImageSource, 0, 0);
      src = canvas.toDataURL(); this.thumbnails.set(type, src);
    }
    return h('img', { attrs: { src, alt: `${type} mushroom`, title: type } });
  }
  private renderBook(): void {
    const scroll = this.book.scrollTop;
    const table = h('table'), head = h('tr'), body = h('tbody');
    for (const [key, label] of [['mushrooms', 'Mushrooms'], ['effect', 'Effect'], ['status', 'Status']] as const) {
      head.append(h('th', { attrs: { scope: 'col', 'aria-sort': this.column === key ? this.descending ? 'descending' : 'ascending' : 'none' } },
        button(`${label}${this.column === key ? this.descending ? ' ↓' : ' ↑' : ''}`, () => { this.descending = this.column === key ? !this.descending : false; this.column = key; this.renderBook(); this.book.querySelector<HTMLElement>('th[aria-sort="ascending"] button,th[aria-sort="descending"] button')?.focus(); })));
    }
    for (const recipe of sortedPotions(this.column, this.descending)) {
      body.append(h('tr', { class: this.selected.id === recipe.id ? 'selected' : '' },
        h('td', {}, ...recipe.recipe.map(type => this.image(type))),
        h('td', {}, button(`#${recipe.id} · ${recipe.name}`, () => { this.selected = recipe; this.renderBook(); this.renderDetail(); this.book.querySelector<HTMLElement>('tr.selected button')?.focus(); }), h('small', { text: recipe.description })),
        h('td', { text: recipe.comingSoon ? 'Coming soon' : 'Implemented' })));
    }
    table.append(h('thead', {}, head), body); this.book.replaceChildren(table); this.book.scrollTop = scroll;
  }
  private controls(effect: string): HTMLElement {
    const group = h('div');
    for (const parameter of POTION_PARAMETERS[effect] ?? []) {
      const id = `potion-${effect}-${parameter.key}`;
      const range = h('input', { type: 'range', id, attrs: { min: String(parameter.min), max: String(parameter.max), step: String(parameter.step), value: String(potionSettings(effect)[parameter.key]) } });
      const number = h('input', { type: 'number', attrs: { 'aria-label': parameter.label, min: String(parameter.min), max: String(parameter.max), step: String(parameter.step), value: range.value } });
      const update = (source: HTMLInputElement) => { if (source.value === '') return; setPotionSetting(effect, parameter.key, Number(source.value)); range.value = number.value = String(potionSettings(effect)[parameter.key]); };
      range.addEventListener('input', () => update(range)); number.addEventListener('change', () => update(number));
      group.append(h('div', { class: 'knob' }, h('label', { text: parameter.label, attrs: { for: id } }), range, number));
    }
    group.append(button('Reset these controls', () => { resetPotionSettings(effect); this.renderDetail(); }));
    return group;
  }
  private renderDetail(): void {
    const r = this.selected;
    this.detail.replaceChildren(h('h3', { text: `Potion #${r.id} · ${r.name}` }), h('p', { text: r.description }));
    if (r.comingSoon) this.detail.append(h('p', { text: 'Coming soon — this recipe has no effect to try yet.' }));
    else this.detail.append(this.controls(r.effect), button('Try effect', () => {
      if (!tryLabPotion(this.game(), r)) { this.status.textContent = 'Wait until the current brewing sequence has finished, then try again.'; return; }
      this.close(); this.resume();
    }));
    this.detail.append(h('h3', { text: 'Wobbly edges · every potion' }), this.controls('trip-indicator'),
      h('div', { class: 'actions' }, button('Copy all settings', () => { void this.copy(); }), button('Stop current potion', () => {
        const g = this.game(), witch = g.witches[0];
        if (!witch) return;
        if (g.mushrooms.affected[witch.id]) { this.status.textContent = 'Wait until the current brewing sequence has finished.'; return; }
        delete g.mushrooms.trips[witch.id]; this.status.textContent = 'Potion stopped. The game is still paused.';
      })));
  }
  private async copy(): Promise<void> {
    const text = JSON.stringify(potionLabSnapshot(this.game(), this.selected, this.build), null, 2);
    try { if (!navigator.clipboard) throw new Error('clipboard unavailable'); await navigator.clipboard.writeText(text); this.status.textContent = 'Copied recipe, seed and all effect settings.'; }
    catch { const field = h('textarea', { attrs: { readonly: '', 'aria-label': 'Settings to copy' } }); field.value = text; this.status.replaceChildren('Select and copy these settings:', field); field.focus(); field.select(); }
  }
}
