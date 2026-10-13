export const GENOME_LYNX = { id: "lynx", name: "Lynx", template: "quadruped", builder: "quad", palette: { hue: .09, sat: .45, val: .75 }, body: { hgt: 1.08, len: .5, chest: .56, tuck: .62, neck: .25, neckAng: .8, neckW: .4, hr: .27, legW: .95 }, head: { snout: .5, snoutD: .75, snoutTaper: .8, cheeks: true, whiskers: true }, parts: { ears: { kind: "tuft", size: 1.5 }, tail: "bob", feet: "paw" }, coat: { belly: true, spots: true }, legend: ["mane"] , levels: [
      null,
      { body: { len: 0.45, legW: 0.779, neckW: 0.36, chest: 0.61, tuck: 0.66, profile: { shoulder: { w: .9, d: .9 }, ribcage: { w: .92 }, waist: { w: .8, d: .85 }, loin: { w: .88, d: .92 }, hip: { w: .92 } } } },
      { body: { chest: 0.53, profile: { shoulder: { w: 1.2, d: 1.12 }, ribcage: { w: 1.08 }, waist: { w: .8, d: .88 }, loin: { w: .88, d: .95 }, hip: { w: .95 } } } },
      { head: { plume: true } },
    ] };
