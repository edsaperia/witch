// Development-only recipe information during the participant's blackout; never shown to observers.
import type { Game } from '../rules/game';
import { potionRecipe } from '../rules/potionRecipes';
import { potionBlackout } from './potionChoreography';
let box: HTMLDivElement | null = null;
let lastKey = '';
export function updatePotionCaption(g: Game): void {
  if (typeof document === 'undefined') return;
  const p = g.mushrooms?.affected[g.witches[0].id];
  const visible = !!p && potionBlackout(p, g.herTime) >= .95;
  if (!visible) { if (box) box.hidden = true; return; }
  if (!box) {
    box = document.createElement('div'); box.id = 'potion-caption'; box.setAttribute('role', 'status');
    Object.assign(box.style, { position: 'fixed', inset: '30% 10% auto', zIndex: '100', textAlign: 'center', color: '#fff', pointerEvents: 'none', font: '18px/1.5 system-ui', textShadow: '0 2px 4px #000' });
    document.body.append(box);
  }
  const recipe = potionRecipe(p!.recipe) ?? { id: 0, key: p!.recipe.join('+'), name: 'Unassigned recipe', description: 'This combination has not been assigned an effect yet.', comingSoon: true };
  if (lastKey !== recipe.key || !box.childElementCount) {
    const name = document.createElement('h2'), description = document.createElement('p');
    name.textContent = recipe.id ? `Potion ${recipe.id}: ${recipe.name}` : recipe.name; description.textContent = recipe.description;
    box.replaceChildren(name, description);
    if (recipe.comingSoon) { const soon = document.createElement('p'); soon.textContent = 'Coming soon'; box.append(soon); }
    lastKey = recipe.key;
  }
  box.hidden = false;
}
