// Proportion diagnostics, not bear/wolf/stag replacement art or genome adapters.
import { LEG_FAMILIES } from "./graph.js";

export function quadrupedFixture(family = "digitigrade") {
  if (!Object.hasOwn(LEG_FAMILIES, family)) throw new Error(`Unknown fixture family: ${family}`);
  const graph = {
    blend: .07,
    spine: [
      { id: "hip", at: [-.48, .8, 0], r: [.34, .27, .28] },
      { id: "waist", at: [-.16, .82, 0], r: [.3, .23, .23] },
      { id: "ribcage", at: [.16, .8, 0], r: [.32, .32, .3] },
      { id: "shoulder", at: [.48, .83, 0], r: [.34, .34, .3] },
    ],
    sockets: [
      { id: "head", station: "shoulder", offset: [.37, .14, 0], kind: "head", r: [.3, .25, .23] },
      { id: "tail", station: "hip", offset: [-.25, .06, 0], kind: "tail", points: [[0, 0, 0, .12], [-.3, -.12, 0, .08], [-.6, -.26, .08, .02]] },
    ],
  };
  for (const [station, x] of [["shoulder", .48], ["hip", -.48]]) for (const side of [-1, 1]) graph.sockets.push({
    id: `${station}-${side < 0 ? "far" : "near"}`, station, offset: [0, -.12, side * .23], kind: "leg", family,
    foot: [x + (station === "hip" ? .08 : 0), LEG_FAMILIES[family].foot[1], side * .27], radius: .11,
    phase: (station === "shoulder") === (side > 0) ? 0 : .5,
  });
  return graph;
}

// Same compiler, extra sockets: proves these plans require data rather than a
// second builder. Wing volumes are placeholders, not membrane/feather anatomy.
export function socketFixture() {
  const graph = quadrupedFixture();
  graph.sockets.push(
    { id: "second-head", station: "shoulder", offset: [.32, .2, -.3], kind: "head", r: [.25, .22, .2] },
    { id: "shell", station: "waist", offset: [0, .18, 0], kind: "shell", r: [.6, .3, .36] },
    ...[-1, 1].map(side => ({ id: `wing-${side}`, station: "ribcage", offset: [-.06, .12, side * .45], kind: "wing", r: [.4, .1, .4] })),
  );
  return graph;
}
