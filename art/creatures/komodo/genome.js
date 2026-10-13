// the Komodo dragon (unknown-04's rocky island, Ed 2026-10-12: more animals for later islands; art builder 2's record): a big
// low monitor lizard, long and heavy, its long flat head, its sprawled legs and its tail as long again as its body. Its evolution:
// a banded yellow-and-green tree-climbing hatchling, a speckled young, a heavy grey-brown adult, and the island's legend, the
// elder of its kind (docs/ART-GUIDE.md §0c): vast, the bony plates in its hide grown into weathered, mossed stone armour, old
// scars raked across its flank, a longer tongue, long hooked claws, and a string of offerings over its shoulders (bones, fangs,
// pebbles) from those who revere it
export const GENOME_KOMODO = { id: "komodo", name: "Komodo dragon", template: "quadruped", builder: "quad", palette: { hue: .09, sat: .3, val: .36, belly: "yellow" }, body: { hgt: .62, len: 1.3, chest: .26, tuck: .22, neck: .66, neckAng: .22, neckW: .3, hr: .22, legW: 1.6, bw: .4, brisket: 0, profile: { shoulder: { d: .8 }, ribcage: { d: .92 } } }, head: { snout: 1.0, snoutD: .72, snoutTaper: .9, tongue: 1.1 }, parts: { ears: { kind: "none" }, tail: "monitor", feet: "paw" }, coat: { belly: true }, legend: ["flames"], texture: { kind: "scales" },
  levels: [
    { body: { len: 1.2, legW: 1.1 }, coat: { bands: { n: 5, mat: "BELLY" } } },
    { body: { bw: .32, hr: .2 }, head: { snout: .85, snoutD: .65 }, coat: { spots: true, spotMat: "belly" } }, // a slim speckled young, its head still short
    { head: { snout: 1.4, snoutD: .95 }, body: { hr: .26, neckW: .4, profile: { shoulder: { w: 1.15, d: .85 }, ribcage: { w: 1.1, d: .95 } } }, features: [{ kind: "dewlap", size: 1.4 }] },
    { head: { tongue: 1.6 }, features: [{ kind: "plates", count: 14 }, { kind: "scars", count: 4 }, { kind: "offerings" }, { kind: "claws", hind: true, size: .16 }] },
  ] };
