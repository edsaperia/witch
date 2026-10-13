// Tree variants (Ed, 2026-10-13: "we should have a 'different' main tree in each area, even if they're only slightly different
// (e.g. snowy vs not snowy)"): a species drawn another way, named, as data. An area's tree recipe names one with `variant`
// (["tree", { type: "fir", variant: "windbent" }]); its knobs are the tree builders' own (art/areas.js areaTreeVariants: lean, gnarl,
// scale, thick, hollow, trunks, thin, dark, snow, hang), laid over the recipe's, so the variant always shows. An area's main
// tree is its species and variant together, and no two areas share one (art/check.mjs, tree species).
export const TREE_VARIANTS = {
  windbent: { lean: .45, gnarl: .85 }, //    bent by the wind, leaning all one way
  stunted: { scale: .7, gnarl: .95 }, //    short and twisted (krummholz, bog and scrub trees)
  ancient: { thick: 1.4, gnarl: 1, hollow: true }, // very old: a broad trunk, gnarled, hollowing
  coppiced: { trunks: 5, thin: true }, // cut back long ago: many slim stems from one stool
  pollard: { thick: 1.5, scale: .75 }, //   cut at head height: a thick short bole under a mop of new growth
  mossy: { hang: .85 }, //                  hung with moss and lichen from its crown and boughs
  snowy: { snow: .85 }, //                  snow lying on its crown
  burnt: { dark: true, gnarl: 1 }, //       scorched: its crown dark, its limbs twisted
  drowned: { dark: true, hang: .6, thick: 1.2 }, // standing in deep water: a swollen bole, its crown dark and dying, hung with weed and moss
};
/** A tree recipe with its variant's knobs laid over it (the variant's name kept). */
export const withVariant = o => o?.variant && TREE_VARIANTS[o.variant] ? { ...o, ...TREE_VARIANTS[o.variant] } : o;
/** An area main tree's key: its species, and its variant if it has one. */
export const treeKey = o => o ? o.type + (o.variant ? ":" + o.variant : "") : undefined;
