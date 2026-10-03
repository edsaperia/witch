// The game's sprites, drawn by the art module (art/generator.js) from the style, and packed into
// one atlas per area type (its trees, as top and bottom halves, and its bushes) and one per kind
// of creature. Drawing a tree takes milliseconds, so sets are made on demand, a few per frame,
// as the witch nears them.
import * as Art from "../../art/generator.js";
import { AREA_TYPES } from "../rules/map";
import { BUSH_VARIANTS, TREE_VARIANTS } from "../rules/forest";
import { rng } from "../rules/random";
import { packAtlas, type Atlas, type Baked } from "./atlas";
import type { Style } from "./style";

export interface TypeArt {
  atlas: Atlas;
  /** frames[variant * 2] is a tree's bottom half (trunk), frames[variant * 2 + 1] its top. */
  treeFrame: (variant: number, top: boolean) => number;
  bushFrame: (variant: number) => number;
}

export interface CreatureArt {
  atlas: Atlas;
  /** level 0-2, frame 0-1. */
  frame: (level: number, frame: number) => number;
}

const TREE_KEYS = ["wBroad", "wFir", "wWillow", "wBirch", "wPalm", "wFlat"];

/** The style for one area type: its leaf colour, and its favourite tree shapes weighted up. */
export function typeStyle(st: Style, typeIndex: number): Style {
  const type = AREA_TYPES[typeIndex], d = st.areaContrast;
  const s: Style = { ...st, leafHue: st.leafHue + type.leafHue * (d / 0.6), leafVariety: st.leafVariety * 0.5 };
  for (const k of TREE_KEYS) s[k] = type.trees.includes(k) ? st[k] + d * 2 : st[k] * (1 - d * 0.8);
  return s;
}

export class AssetLibrary {
  private types = new Map<number, TypeArt>();
  private creatures = new Map<string, CreatureArt>();
  private wantTypes = new Set<number>();
  private wantCreatures = new Set<string>();
  readonly witch: Atlas;
  readonly stones: Atlas;
  /** Style scale: the lab's K, 2 / pixel size. */
  readonly K: number;
  /** Bumped whenever a new set is ready, so the view knows to refresh its batches. */
  version = 0;

  constructor(readonly style: Style, readonly seed: number, pixelSize: number, private onReady: () => void = () => {}) {
    this.K = 2 / pixelSize;
    this.witch = packAtlas([Art.bake(Art.witchSprite(), Art.witchColours(style), style, "dark")]);
    this.stones = packAtlas([0, 1, 2, 3].map(i => this.stone(i)));
  }

  private stone(i: number): Baked {
    const r = rng(this.seed * 3 + i), w = 5 + Math.floor(r() * 3), h = 7 + Math.floor(r() * 5), sp = new Art.Sprite(w + 2, h + 1);
    sp.ellipse((w + 2) / 2, h / 2 + 1, w / 2, h / 2 + 0.5, Art.M.BODY, { round: this.style.round });
    sp.ellipse((w + 2) / 2 - 1, h / 2, w / 3, h / 3, Art.M.BODY2, { round: this.style.round, onlyOn: new Set([Art.M.BODY]), density: 0.5, seed: i });
    return Art.bake(sp, { [Art.M.BODY]: [178, 174, 162], [Art.M.BODY2]: [140, 138, 130] }, this.style, "dark");
  }

  typeArt(t: number): TypeArt | undefined { const a = this.types.get(t); if (!a) this.wantTypes.add(t); return a; }
  creatureArt(species: string): CreatureArt | undefined { const a = this.creatures.get(species); if (!a) this.wantCreatures.add(species); return a; }
  get pending(): number { return this.wantTypes.size + this.wantCreatures.size; }

  /** Make waiting sets until `budgetMs` has passed (at least one). */
  work(budgetMs: number): void {
    const t0 = performance.now();
    let made = 0;
    while (this.pending && (made === 0 || performance.now() - t0 < budgetMs)) {
      const t = this.wantTypes.values().next();
      if (!t.done) { this.wantTypes.delete(t.value); this.types.set(t.value, this.buildType(t.value)); }
      else { const c = this.wantCreatures.values().next().value as string; this.wantCreatures.delete(c); this.creatures.set(c, this.buildCreature(c)); }
      made++;
    }
    if (made) { this.version++; this.onReady(); }
  }

  private buildType(t: number): TypeArt {
    const st = this.style, ast = typeStyle(st, t), K = this.K, bk = (sp: unknown, col: unknown) => Art.bake(sp, col, st, st.outline) as Baked;
    const sprites: Baked[] = [];
    for (let v = 0; v < TREE_VARIANTS; v++) {
      const tr = rng(this.seed * 13 + t * 101 + v * 7 + 1);
      const f = Art.chooseType(tr, ast) as (r: () => number, st: Style, s: number) => { sp: unknown; crownY: number };
      const tree = Art.finishTree(f(tr, ast, st.treeSize * K * Art.uni(tr, 0.85, 1.15)), ast, tr);
      const col = Art.treeColours(tr, ast, f), parts = Art.splitTree(tree);
      sprites.push(bk(parts.bot, col), bk(parts.top, col));
    }
    for (let v = 0; v < BUSH_VARIANTS; v++) {
      const b = Art.bush(rng(this.seed * 7 + t * 31 + v * 3), { ...ast, bushSize: st.bushSize * K });
      sprites.push(bk(b.sp, b.colours));
    }
    return { atlas: packAtlas(sprites), treeFrame: (v, top) => v * 2 + (top ? 1 : 0), bushFrame: v => TREE_VARIANTS * 2 + v };
  }

  private buildCreature(species: string): CreatureArt {
    const st = this.style, sprites: Baked[] = [];
    for (let level = 0; level < 3; level++) for (let f = 0; f < 2; f++)
      sprites.push(Art.bake(Art.critter(species, level, f, st), Art.speciesColours(species, st), st, st.cOutline) as Baked);
    return { atlas: packAtlas(sprites, 1024), frame: (level, f) => level * 2 + f };
  }
}
