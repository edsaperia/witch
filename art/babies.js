// Babies: hand-drawn pixel grids, 8 to 16 pixels tall, facing right. The style recolours
// them; the outline is added when they are baked. `rows` is the first walk frame;
// `walk` replaces its last rows for the second frame.
//   B body   b shade   d darkest   W pale (belly, muzzle)   A horn, beak, claw
//   E eye    G glint   N nose      I iris   e inner ear
export const BABIES = {
  wolf: {
    rows: [
      "...........d..d....",
      "..........dBedBe...",
      "..........BBBBBBB..",
      ".bb......BBBBBBBB..",
      "bBb......BBBBEGBB..",
      "bBb...bbbBBBBEEBWWN",
      ".bBBBBBBBBBBBBWWWW.",
      "..BBBBBBBBBBBBWWW..",
      "..BBBBBBBBBBBWW....",
      "..BBWWWWWWBBBB.....",
      "..BB.b....BB.b.....",
      "..dd.d....dd.d.....",
    ],
    walk: [
      "...BBb...b.BB......",
      "...ddd...d.dd......",
    ],
  },
  boar: { // a striped piglet, as wild boar piglets are
    rows: [
      "...........bb.....",
      ".....BBBBBBBbB....",
      "...BBWWWWWWBBBB...",
      "..BBBBBBBBBBBBGB..",
      ".bBWWWWWWWWBBBEBBBN",
      "..BBBBBBBBBBBBBBBBN",
      "..BWWWWWWWWBBBBBb..",
      "...BBBBBBBBBBBB....",
      "...BB.b....BB.b....",
      "...dd.d....dd.d....",
    ],
    walk: [
      "....BBb...b.BB.....",
      "....ddd...d.dd.....",
    ],
  },
  owl: { // a fluffy owlet, facing us
    rows: [
      ".b......b.",
      ".bBBBBBBb.",
      "BBWWBBWWBB",
      "BWEGWWEGWB",
      "BWEEAAEEWB",
      "BBWWWAWWBB",
      "bBWWWWWWBb",
      "bBWbWWbWBb",
      "bBWWWWWWBb",
      ".bBWbWWBb.",
      "..BBBBBB..",
      "..A....A..",
    ],
    walk: [
      "...A..A...",
    ],
  },
};
