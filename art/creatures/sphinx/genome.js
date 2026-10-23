// the desert ruin's sphinx (a journey kind: unknown-19's slot, the hot south, ring 5; Ed, 2026-10-23, its biome's fantastic creature):
// a lion's long sandstone-gold body couched proud, a flat-faced head under a pharaoh's striped headcloth of gold and lapis, gold claws.
// Its evolution: a cub in a little headcloth, a lean young, the adult's false beard and first wings, and the legend the riddler of the dunes: an eagle's
// wings spread over its back, the cobra on its brow, a gold torc, its coat gone to weathered sandstone, its eyes lit
export const GENOME_SPHINX = { id: "sphinx", name: "Sphinx", template: "quadruped", builder: "quad", palette: { hue: .105, sat: .44, val: .8, accent: [.12, .72, .92], magic: .13, flower: [228, 182, 62] }, body: { hgt: 1.45, len: .82, chest: .56, tuck: .74, neck: .34, neckAng: .82, neckW: .42, hr: .26, legW: 1.05, bw: .26, profile: { shoulder: { w: 1.12, d: 1.04 }, waist: { w: .82, d: .9 }, hip: { w: .95 } }, spine: { ribcage: -.03, waist: -.04, loin: -.03 } }, head: { snout: .38, snoutD: .7, snoutTaper: .9, cheeks: true, eyeK: 1.05, jawCoat: true }, parts: { ears: { kind: "round", size: .45 }, tail: "tuft", feet: "paw" }, coat: { belly: true }, legend: ["mane"], texture: { kind: "fur" },
  levels: [
    { body: { len: .52, chest: .42, tuck: .5, hr: .32, legW: 1.25 }, head: { snout: .3 }, features: [{ kind: "nemes", size: .85 }] },
    { body: { len: .76, chest: .5, tuck: .64, legW: 1 }, features: [{ kind: "nemes" }] },
    { body: { front: 1.08, legW: 1.15, bw: .3 }, features: [{ kind: "nemes", size: 1.05, beard: .5 }, { kind: "wings", feathered: true, size: .6, mat: "BODY", mat2: "FLOWER" }, { kind: "claws", size: .14, mat: "ACCENT" }] },
    { body: { front: 1.15, legW: 1.3, bw: .32, len: .86 }, head: { eyeGlow: true }, coat: { scars: 2 }, features: [
      { kind: "nemes", size: 1.08, beard: .7, uraeus: true },
      { kind: "wings", feathered: true, size: 1.2, mat: "BODY", mat2: "FLOWER" },
      { kind: "torc", mat: "FLOWER", size: .2 },
      { kind: "claws", size: .24, mat: "FLOWER" },
      { kind: "worn", ear: false },
    ] },
  ] };
