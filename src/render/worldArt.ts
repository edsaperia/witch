// Whole helpers moved from artBuild; drawing bodies are unchanged.
import * as Art from "./worldArt.primitives";
import { biomeColours, biomeLook } from "../../art/flora/biomes.js";
import type { Style } from "./style";
import { CYCLONE_FRAMES, CYCLONE_TINT, HARVEST_SPROUTS, RING_STONE_CARVING, RING_STONE_CARVINGS, SPEAKER_STONE_WIDTH, carvingKey } from "./artMetadata";
import { witchLookOf } from "./artLook";
import type { Baked, BeachArt, BeachEdgeArt, Carving, DecorPiece, LakeShoreArt, MakeCanvas, PartyArt, PartyWitchArt, PathPieceArt, RelicArt, RelicLayouts, SceneArt, SpeakerArt } from "./artBuild";

export function sceneSprites(st: Style, mk: MakeCanvas): { sprites: Baked[]; scenes: SceneArt } {
  const sprites: Baked[] = [], scenes: SceneArt = { pieces: {}, layouts: {} };
  type Layout = { pieces: { sprite: string; dx: number; dz: number; facing?: string }[] };
  for (const sc of Art.SCENES as { id: string }[]) {
    const lay = (mirror: boolean) => (Art.sceneLayout(sc.id, st, { mirror }) as Layout).pieces.map(p => ({ ref: p.sprite, dx: p.dx, dz: p.dz, left: p.facing === "left" }));
    scenes.layouts[sc.id] = { plain: lay(false), mirror: lay(true) };
    for (const p of scenes.layouts[sc.id].plain) {
      if (scenes.pieces[p.ref]) continue;
      const piece = Art.scenePiece(p.ref, st) as { sprite: { whole: unknown; origin: { x: number; y: number } }; colours: unknown; decal: boolean };
      scenes.pieces[p.ref] = { frame: sprites.push(Art.bake(piece.sprite.whole, piece.colours, st, "none", mk) as Baked) - 1, originX: piece.sprite.origin.x, originY: piece.sprite.origin.y, decal: piece.decal };
    }
  }
  // The hats' own art (#723, drawn each frame by render/view/hatArt.ts): the Harvest hat's sprouts, under its berries, and the
  // Cyclone hat's whirlwind (art/effects.js: rising, its loop, falling apart), in the spell's neon, by its foot's middle.
  for (const ref of HARVEST_SPROUTS) {
    const piece = Art.scenePiece(ref, st) as { sprite: { whole: unknown; origin: { x: number; y: number } }; colours: unknown; decal: boolean };
    scenes.pieces[ref] = { frame: sprites.push(Art.bake(piece.sprite.whole, piece.colours, st, "none", mk) as Baked) - 1, originX: piece.sprite.origin.x, originY: piece.sprite.origin.y, decal: false };
  }
  const fxColours = Art.effectColours(CYCLONE_TINT);
  for (const [id, n] of CYCLONE_FRAMES) for (let f = 0; f < n; f++) {
    const e = Art.effectSprite(id, { frame: f, variant: "light" }) as { sp: unknown; anchors: { base?: number[] }; px: number };
    const b = Art.bake(e.sp, fxColours, st, "none", mk) as Baked, base = e.anchors.base ?? [b.w / 2, b.h - 1];
    scenes.pieces[`fx:${id}/${f}`] = { frame: sprites.push(b) - 1, originX: base[0], originY: base[1], decal: false, ppm: e.px };
  }
  return { sprites, scenes };
}

export function speakerSprites(st: Style, mk: MakeCanvas, stoneScale: number): { sprites: Baked[]; speakers: SpeakerArt } {
  const sprites: Baked[] = [], speakers: SpeakerArt = { frames: {}, origin: {} }, colours = Art.dancefloorSpeakerColours();
  for (const angle of Art.DANCEFLOOR_SPEAKER_ANGLES as number[])
    for (const [state, n] of Object.entries(Art.DANCEFLOOR_SPEAKER_STATES as Record<string, number>))
      for (let frame = 0; frame < n; frame++) {
        const r = Art.dancefloorSpeakerSprite(st, { angle, state, frame }) as { sp: unknown; origin: { x: number; y: number } };
        speakers.frames[`${angle}:${state}:${frame}`] = sprites.push(Art.bake(r.sp, colours, st, st.cOutline, mk) as Baked) - 1;
        if (!speakers.origin[angle]) speakers.origin[angle] = r.origin;
      }
  // the runestone it starts as (the areas' rune stone, cyan, carved with its three dots or its own carving): baked at the areas' stones' scale, so as
  // tall as theirs, at SPEAKER_STONE_WIDTH of their width, at each of the speakers' angles (mirrored as they are), drawn at 1 (docs/STYLE.md rule 1)
  type Stone = Baked & { origin: { x: number; y: number }; dots?: { x: number; y: number }[] };
  const runeStone = Art.runeStone as unknown as (st: Style, o: { glow: string; scale: number; width: number; yaw: number; rune?: number; sigil?: string; dots?: boolean; makeCanvas: MakeCanvas }) => Stone;
  speakers.stones = {}; speakers.stoneOrigin = {}; speakers.stoneDots = {};
  const carvings = new Map<string, Carving>([["", RING_STONE_CARVING], ...Object.values(RING_STONE_CARVINGS).map(c => [carvingKey(c), c] as const)]);
  for (const angle of Art.DANCEFLOOR_SPEAKER_ANGLES as number[])
    for (const [key, c] of carvings) {
      const stone = runeStone(st, { glow: "cyan", scale: stoneScale, width: SPEAKER_STONE_WIDTH, yaw: angle, ...c, makeCanvas: mk });
      speakers.stones[`${angle}|${key}`] = sprites.push(stone) - 1; speakers.stoneOrigin[`${angle}|${key}`] = stone.origin; if (stone.dots) speakers.stoneDots[`${angle}|${key}`] = stone.dots;
    }
  return { sprites, speakers };
}

export function beachSprites(st: Style, mk: MakeCanvas): { sprites: Baked[]; beach: BeachArt } {
  const sprites: Baked[] = [], colours = Art.beachColours(st), H = Art.PRINT_HEADINGS as number;
  const beach: BeachArt = { pieces: {}, finds: [], prints: [], headings: H };
  const put = (key: string, id: string, heading = 0) => {
    const r = Art.beachSprite(id, st, { heading }) as { whole: unknown; origin: { x: number; y: number } };
    beach.pieces[key] = { frame: sprites.push(Art.bake(r.whole, colours, st, "none", mk) as Baked) - 1, originX: r.origin.x, originY: r.origin.y };
  };
  for (const d of Art.BEACH_FINDS as { id: string }[]) { put(d.id, d.id); beach.finds.push(d.id); }
  for (const d of Art.BEACH_PRINTS as { id: string }[]) { for (let h = 0; h < H; h++) put(`${d.id}~${h}`, d.id, h); beach.prints.push(d.id); }
  return { sprites, beach };
}

export function relicSprites(st: Style, mk: MakeCanvas): { sprites: Baked[]; relics: RelicArt[]; layouts: RelicLayouts } {
  const sprites: Baked[] = [], relics: RelicArt[] = [], colours = Art.relicColours(st);
  for (const d of Art.RELICS as { id: string; family: string; decal?: boolean; scatter?: boolean }[]) {
    const r = Art.relicSprite(d.id, st) as { whole: unknown; origin: { x: number; y: number } };
    relics.push({ id: d.id, family: d.family === "modern" && d.scatter === false ? "unscattered" : d.family, decal: !!d.decal, frame: sprites.push(Art.bake(r.whole, colours, st, "none", mk) as Baked) - 1, originX: r.origin.x, originY: r.origin.y }); // the bits of highway kept out of the modern finds the rules scatter (Ed, round 13)
  }
  // The countryside and street pieces that stand alone (Ed, 2026-10-04) join the modern finds, after the relics' own (the rules count them in this order).
  const cc = Art.countryColours(st);
  for (const d of Art.COUNTRY as { id: string; family: string }[]) {
    if (d.family !== "farm" && d.family !== "street") continue;
    const r = Art.countrySprite(d.id, st) as { whole: unknown; origin: { x: number; y: number } };
    relics.push({ id: d.id, family: "modern", decal: false, frame: sprites.push(Art.bake(r.whole, cc, st, "none", mk) as Baked) - 1, originX: r.origin.x, originY: r.origin.y });
  }
  // The party relics' bottles (art/partyRelics.js; Ed, 2026-10-09: "Draw at today's size and show me!"), each half-buried in its
  // mound, under "party:<kind>": drawn where a quest relic lies (render/view/scenery.ts).
  // Each in its own glass ("party:<kind>") and every other ("party:<kind>~<glass>": Ed, 2026-10-11, recoloured for more kinds).
  for (const id of Art.PARTY_RELIC_IDS as string[]) {
    const r = Art.partyRelicSprite(id, st) as { sp: unknown; origin: { x: number; y: number } };
    for (const glass of ["", ...(Art.PARTY_RELIC_GLASSES as string[])]) {
      if (glass && glass === (Art.PARTY_RELIC_BY_ID as Record<string, { glass: string }>)[id].glass) continue;
      relics.push({ id: `party:${id}${glass ? "~" + glass : ""}`, family: "party", decal: false, frame: sprites.push(Art.bake(r.sp, Art.partyRelicColours(id, st, glass || undefined), st, "none", mk) as Baked) - 1, originX: r.origin.x, originY: r.origin.y });
    }
  }
  return { sprites, relics, layouts: Art.relicLayouts(st) as RelicLayouts };
}

export function pathPieceSprites(st: Style, mk: MakeCanvas): { sprites: Baked[]; pieces: PathPieceArt[] } {
  const sprites: Baked[] = [], pieces: PathPieceArt[] = [], colours = Art.pathColours(st);
  for (const d of Art.PATH_PIECES as { id: string }[]) {
    const r = Art.pathPieceSprite(d.id, st) as { sp: unknown; origin: { x: number; y: number } };
    pieces.push({ id: d.id, frame: sprites.push(Art.bake(r.sp, colours, st, "none", mk) as Baked) - 1, originX: r.origin.x, originY: r.origin.y });
  }
  // With the prop generator (the game always has it on), each bridge's and the fingerpost's generated variants too ("footbridge~0"...), which the view picks among by place.
  if ((st as { propGen?: number }).propGen) for (const id of Art.PATH_GEN_IDS as string[]) for (let k = 0; k < (Art.BRIDGE_VARIANTS as number); k++) {
    const r = Art.pathPieceSprite(`${id}~${k}`, st) as { sp: unknown; origin: { x: number; y: number } };
    pieces.push({ id: `${id}~${k}`, frame: sprites.push(Art.bake(r.sp, colours, st, "none", mk) as Baked) - 1, originX: r.origin.x, originY: r.origin.y });
  }
  return { sprites, pieces };
}

export /** The beach's edge of the woods (Ed, 2026-10-06, after a photo of a real beach forest: "rounded bushes and shrubs, dense low
 *  vegetation, pandanus and palm-like plants, clumps spilling onto the sand"): the art's palms, and its shrubs, round bushes, ferns
 *  and grass, in a beach palette (the leaves a deep green, a little brighter than the woods' at night), with their sway masks. */
function beachEdgeSprites(st: Style, K: number, mk: MakeCanvas): { sprites: Baked[]; beach: BeachEdgeArt } {
  const sprites: Baked[] = [], beach: BeachEdgeArt = { palms: [], shrubs: [], grass: [] }, add = (b: Baked) => sprites.push(b) - 1;
  const bst = { ...st, leafHue: 0.31, leafVal: 1.12, leafVariety: 0.12, bushSize: (st as { bushSize: number }).bushSize * K } as Style;
  const sway = (b: Baked, sp: unknown) => ({ ...b, S: Art.bakeSway(sp, mk) as Baked["A"] });
  for (let v = 0; v < 4; v++) {
    const r = Art.rng(9100 + v * 37) as () => number, f = Art.palmTree as (r: () => number, st: Style, s: number) => unknown;
    const t = f(r, bst, (st as { treeSize: number }).treeSize * K * (0.8 + 0.12 * v)), col = Art.treeColours(r, bst, f), parts = Art.splitTree(t) as { top: unknown; bot: unknown };
    beach.palms.push({ top: add(sway(Art.bake(parts.top, col, bst, "none", mk) as Baked, parts.top)), bot: add(sway(Art.bake(parts.bot, col, bst, "none", mk) as Baked, parts.bot)) });
  }
  const kinds = ["shrub", "round", "shrub", "fern", "round", "shrub", "fern", "round"];
  kinds.forEach((kind, i) => { const { sp, colours } = Art.bush(Art.rng(9300 + i * 41), bst, kind) as { sp: unknown; colours: unknown }; beach.shrubs.push(add(sway(Art.bake(sp, colours, bst, "none", mk) as Baked, sp))); });
  for (let i = 0; i < 4; i++) { const { sp, colours } = Art.bush(Art.rng(9500 + i * 43), bst, "grass") as { sp: unknown; colours: unknown }; beach.grass.push(add(sway(Art.bake(sp, colours, bst, "none", mk) as Baked, sp))); }
  return { sprites, beach };
}

export /** The biome lakes' shore dressing (Ed, 2026-10-23): art/lakeShore.js's pieces (bones, drowned trunks, ice, lava rocks, scorched
 *  trees, mineral crust), the oasis's palms and grass (the beach's, in a drier palette) and the lily pond's reeds
 *  (decor.js lakeKit), the leafy ones with their sway masks. */
function lakeShoreSprites(st: Style, K: number, mk: MakeCanvas, biome?: string): { sprites: Baked[]; shore: LakeShoreArt } {
  const look = biome ? biomeLook(biome) : null, tint = <T>(c: T): T => (look ? (biomeColours({ ...(c as object) }, look, Art.M, { flower: false }) as T) : c); // (the island's biome look: art/flora/biomes.js)
  const sprites: Baked[] = [], shore: LakeShoreArt = { kinds: {} }, add = (b: Baked) => sprites.push(b) - 1, put = (k: string, bot: number, top: number | null = null) => (shore.kinds[k] ??= []).push({ bot, top });
  const sway = (b: Baked, sp: unknown) => ({ ...b, S: Art.bakeSway(sp, mk) as Baked["A"] });
  const empty = (sp: { m: ArrayLike<number> }) => { for (let i = 0; i < sp.m.length; i++) if (sp.m[i]) return false; return true; };
  // the oasis's palms and grass clumps
  const ost = { ...st, leafHue: 0.27, leafVal: 1.05, leafVariety: 0.12, bushSize: (st as { bushSize: number }).bushSize * K } as Style;
  for (let v = 0; v < 4; v++) {
    const r = Art.rng(9700 + v * 37) as () => number, f = Art.palmTree as (r: () => number, st: Style, s: number) => unknown;
    const t = f(r, ost, (st as { treeSize: number }).treeSize * K * (0.85 + 0.12 * v)), col = tint(Art.treeColours(r, ost, f)), parts = Art.splitTree(t) as { top: unknown; bot: unknown };
    put("palm", add(sway(Art.bake(parts.bot, col, ost, "none", mk) as Baked, parts.bot)), add(sway(Art.bake(parts.top, col, ost, "none", mk) as Baked, parts.top)));
  }
  for (let i = 0; i < 4; i++) { const { sp, colours } = Art.bush(Art.rng(9900 + i * 43), ost, "grass") as { sp: unknown; colours: unknown }; put("grass", add(sway(Art.bake(sp, tint(colours), ost, "none", mk) as Baked, sp))); }
  // the lily pond's reeds
  const kit = Art.lakeKit(st) as { reeds: unknown[]; colours: unknown };
  const reedCol = tint(kit.colours);
  for (const sp of kit.reeds) put("reeds", add(sway(Art.bake(sp, reedCol, st, "none", mk) as Baked, sp)));
  // the pieces
  for (const d of Art.LAKE_SHORE_PIECES as { id: string; kind: string; variants: number }[])
    for (let v = 0; v < d.variants; v++) {
      const r = Art.lakeShoreSprite(d.id, st, { variant: v }) as { top: { m: ArrayLike<number> }; bot: unknown; whole: unknown; crownY: number; colours: unknown };
      const tall = r.crownY > 0 && !empty(r.top), col = tint(r.colours);
      put(d.kind, add(Art.bake(tall ? r.bot : r.whole, col, st, "none", mk) as Baked), tall ? add(Art.bake(r.top, col, st, "none", mk) as Baked) : null);
    }
  return { sprites, shore };
}

export function decorSprites(st: Style, mk: MakeCanvas, biome?: string): { sprites: Baked[]; decor: DecorPiece[] } {
  const look = biome ? biomeLook(biome) : null, colours = Art.decorColours(st) as Record<number, number[]>; // (the island's biome: its stone, leaves and wood; art/flora/biomes.js)
  if (look) biomeColours(colours, look, Art.M, { flower: false, stone: true });
  const sprites: Baked[] = [], decor: DecorPiece[] = [];
  const empty = (sp: { m: ArrayLike<number> }) => { for (let i = 0; i < sp.m.length; i++) if (sp.m[i]) return false; return true; };
  for (const d of Art.DECOR as { id: string; family: string; variants: number }[])
    for (let v = 0; v < d.variants; v++) {
      const r = Art.decorSprite(d.id, st, { variant: v }) as { top: { m: ArrayLike<number> }; bot: unknown; whole: unknown; crownY: number; metres: { footprint: number } };
      const tall = r.crownY > 0 && !empty(r.top);
      const bot = sprites.push(Art.bake(tall ? r.bot : r.whole, colours, st, "none", mk) as Baked) - 1;
      const top = tall ? sprites.push(Art.bake(r.top, colours, st, "none", mk) as Baked) - 1 : null;
      decor.push({ id: d.id, family: d.family, bot, top, footprint: r.metres.footprint });
    }
  return { sprites, decor };
}

export function partyObjectSprites(st: Style, mk: MakeCanvas): { sprites: Baked[]; party: PartyArt } {
  const sprites: Baked[] = [], party: PartyArt = { pieces: {}, layouts: {} };
  type Def = { id: string; cls: string; light: string | null; frames: number; hang?: boolean };
  const refs = new Set<string>(), palettes = ["neon", "pastel", "metallic", "mixed"];
  for (const d of Art.PARTY_OBJECTS as Def[]) {
    if (d.id.startsWith("gen-") && !st.propGen) continue; // the prop generator's party pieces only with it (the game always has it on)
    const neons = d.light === "neon" ? (Art.PARTY_LIGHT_NEONS as string[]).map(n => "@" + n) : [""];
    for (const n of neons) for (const p of d.cls === "balloon" ? palettes.map(q => "~" + q) : [""]) refs.add(`party:${d.id}${n}${p}`);
  }
  type Layout = { pieces: { sprite: string; dx: number; dz: number; facing?: string }[] };
  for (const c of Art.PARTY_CLUSTERS as { id: string }[]) {
    const lay = (mirror: boolean) => (Art.sceneLayout(c.id, st, { mirror }) as Layout).pieces.map(p => ({ ref: p.sprite, dx: p.dx, dz: p.dz, left: p.facing === "left" }));
    party.layouts[c.id] = { plain: lay(false), mirror: lay(true) };
    for (const p of party.layouts[c.id].plain) refs.add(p.ref);
  }
  for (const ref of refs) {
    const piece = Art.scenePiece(ref, st) as { sprite: { whole: unknown; origin: { x: number; y: number }; anchors?: Record<string, { x: number; y: number }> }; colours: unknown; decal: boolean; def?: { frames?: number } };
    const hang = piece.sprite.anchors?.hang ?? piece.sprite.anchors?.tie;
    const id = ref.replace(/^party:/, "").split("~")[0].split("@")[0], n = (Art.PARTY_BY_ID as Record<string, { frames: number }>)[id]?.frames ?? 1;
    if (n <= 1) {
      party.pieces[ref] = { frames: [sprites.push(Art.bake(piece.sprite.whole, piece.colours, st, "none", mk) as Baked) - 1], originX: piece.sprite.origin.x, originY: piece.sprite.origin.y, decal: piece.decal, ...(hang ? { hang } : {}) };
      continue;
    }
    // Animated (the fires): each frame is its own size with its own origin, so they're laid into one
    // shared box with their origins on the same pixel; only the flames move (Ed: "fires of all kinds
    // seem to jitter during their animations").
    const raw = Array.from({ length: n }, (_, f) => Art.partySprite(id, st, { frame: f }) as { whole: unknown; origin: { x: number; y: number } });
    const baked = raw.map(r => Art.bake(r.whole, piece.colours, st, "none", mk) as Baked);
    const left = Math.max(...raw.map(r => r.origin.x)), up = Math.max(...raw.map(r => r.origin.y));
    const W = Math.ceil(left + Math.max(...raw.map((r, f) => baked[f].w - r.origin.x))), H = Math.ceil(up + Math.max(...raw.map((r, f) => baked[f].h - r.origin.y)));
    const frames = baked.map((b, f) => {
      const dx = Math.round(left - raw[f].origin.x), dy = Math.round(up - raw[f].origin.y), A = mk(W, H), N = mk(W, H);
      (A.getContext("2d") as CanvasRenderingContext2D).drawImage(b.A as CanvasImageSource, dx, dy);
      (N.getContext("2d") as CanvasRenderingContext2D).drawImage(b.N as CanvasImageSource, dx, dy);
      return sprites.push({ A, N, w: W, h: H }) - 1;
    });
    party.pieces[ref] = { frames, originX: left, originY: up, decal: piece.decal };
  }
  return { sprites, party };
}

export function partyWitchSprites(st: Style, seed: number | null, mk: MakeCanvas, genome: unknown = null): { sprites: Baked[]; witch: PartyWitchArt } {
  const pw = seed === null ? null : (Art.partyWitch as (s: number) => { look: object; colours: (st: Style) => object })(seed);
  const mine = seed === null ? witchLookOf(st, genome) : null;
  const colours = pw ? pw.colours(st) : mine!.colours, look = pw ? pw.look : mine!.look;
  const sprites: Baked[] = [], witch: PartyWitchArt = { poses: {}, fps: {}, hover: { towards: [], away: [] }, anchors: [] };
  const draw = (o: object) => {
    const sp = (Art.witchSprite as (st: Style, o: object) => unknown)(st, { ...o, look }) as { anchors?: Record<string, [number, number]> };
    witch.anchors.push(sp.anchors ? Object.fromEntries(Object.entries(sp.anchors).map(([k, p]) => [k, [p[0], p[1]] as [number, number]])) : null);
    return sprites.push(Art.bake(sp, colours, st, st.cOutline, mk) as Baked) - 1;
  };
  const FOOT = Art.WITCH_FOOT_POSES as Record<string, { frames: number; fps: number; party?: string }>;
  for (const [pose, P] of Object.entries(FOOT)) {
    if (!P.party && pose !== "stand" && pose !== "land" && pose !== "takeoff") continue;
    witch.poses[pose] = Array.from({ length: P.frames }, (_, frame) => draw({ pose, frame }));
    witch.fps[pose] = P.fps;
  }
  for (const facing of ["towards", "away"] as const) witch.hover[facing] = [0, 1, 2].map(frame => draw({ frame, facing }));
  return { sprites, witch };
}
