// The fox, adult, as a plan for tools/creature-mesh/quadruped.js: a red fox's own proportions (shoulder about 0.4 m, long in the
// leg, a deep narrow chest tucked up to the loin, a wedge of a head, a brush as long as its body), its signature the brush and
// the pointed mask (docs/plans/creature-meshes.md). Metres; y up; its head along +z.
const RED = "#e07a1f", RED2 = "#c9641a", WHITE = "#f4efe6", SOCK = "#2a1a16", NOSE = "#16100e", EAR = "#1f1512", DARK = "#a44f18";
// (a ring red above and white below: cy is 1 at the top of the ring, -1 at the bottom)
const bib = (above = RED, below = WHITE, at = -0.25) => cy => (cy < at ? below : above);

const legs = [];
for (const [s, tag] of [[1, "L"], [-1, "R"]]) {
  legs.push(
    // hind: hip, knee (stifle), hock, paw: the hock high and well back, as a dog's
    { bones: [[`hip${tag}`, [0.065 * s, 0.37, -0.25], "pelvis"], [`knee${tag}`, [0.075 * s, 0.225, -0.185], `hip${tag}`], [`hock${tag}`, [0.075 * s, 0.125, -0.315], `knee${tag}`], [`hpaw${tag}`, [0.075 * s, 0.022, -0.285], `hock${tag}`]],
      rings: [
        { at: [0.06 * s, 0.39, -0.255], rx: 0.056, ry: 0.111, bone: `hip${tag}`, colour: RED },
        { at: [0.07 * s, 0.30, -0.215], rx: 0.059, ry: 0.098, bone: `hip${tag}`, colour: RED },
        { at: [0.075 * s, 0.225, -0.185], rx: 0.039, ry: 0.052, bone: `hip${tag}`, colour: RED2 },
        { at: [0.075 * s, 0.125, -0.315], rx: 0.024, ry: 0.029, bone: `knee${tag}`, colour: SOCK },
        { at: [0.075 * s, 0.03, -0.288], rx: 0.022, ry: 0.023, bone: `hock${tag}`, colour: SOCK },
        { at: [0.075 * s, 0.012, -0.262], rx: 0.031, ry: 0.016, bone: `hpaw${tag}`, colour: SOCK, up: [0, 1, 0] },
        { at: [0.075 * s, 0.01, -0.215], rx: 0.028, ry: 0.013, bone: `hpaw${tag}`, colour: SOCK, up: [0, 1, 0] },
      ] },
    // fore: shoulder, elbow, wrist, paw: nearly straight, the elbow tucked against the chest
    { bones: [[`shoulder${tag}`, [0.06 * s, 0.34, 0.175], "chest"], [`elbow${tag}`, [0.065 * s, 0.215, 0.14], `shoulder${tag}`], [`wrist${tag}`, [0.065 * s, 0.085, 0.155], `elbow${tag}`], [`fpaw${tag}`, [0.065 * s, 0.022, 0.16], `wrist${tag}`]],
      rings: [
        { at: [0.058 * s, 0.37, 0.185], rx: 0.049, ry: 0.085, bone: `shoulder${tag}`, colour: RED },
        { at: [0.063 * s, 0.29, 0.16], rx: 0.050, ry: 0.075, bone: `shoulder${tag}`, colour: RED },
        { at: [0.065 * s, 0.215, 0.14], rx: 0.034, ry: 0.042, bone: `shoulder${tag}`, colour: RED2 },
        { at: [0.065 * s, 0.085, 0.155], rx: 0.022, ry: 0.025, bone: `elbow${tag}`, colour: SOCK },
        { at: [0.065 * s, 0.028, 0.158], rx: 0.022, ry: 0.022, bone: `wrist${tag}`, colour: SOCK },
        { at: [0.065 * s, 0.012, 0.185], rx: 0.031, ry: 0.016, bone: `fpaw${tag}`, colour: SOCK, up: [0, 1, 0] },
        { at: [0.065 * s, 0.01, 0.225], rx: 0.028, ry: 0.013, bone: `fpaw${tag}`, colour: SOCK, up: [0, 1, 0] },
      ] });
}

export const FOX_ADULT = {
  name: "fox-adult",
  bones: [
    ["root", [0, 0, 0], null], ["pelvis", [0, 0.39, -0.26], "root"], ["loin", [0, 0.40, -0.10], "pelvis"], ["chest", [0, 0.385, 0.08], "loin"],
    ["neck", [0, 0.44, 0.25], "chest"], ["head", [0, 0.545, 0.335], "neck"], ["earL", [0.048, 0.615, 0.36], "head"], ["earR", [-0.048, 0.615, 0.36], "head"],
    ["tail1", [0, 0.385, -0.345], "pelvis"], ["tail2", [0, 0.335, -0.47], "tail1"], ["tail3", [0, 0.285, -0.60], "tail2"], ["tail4", [0, 0.25, -0.73], "tail3"],
    ...legs.flatMap(l => l.bones),
  ],
  lofts: [
    // rump to nose in one skin: a narrow rump, the loin tucked up, a deep keeled chest, the neck rising to a flat skull and a long muzzle
    { sides: 8, up: [0, 1, 0], rings: [
      { at: [0, 0.385, -0.365], rx: 0.03, ry: 0.035, bone: "pelvis", colour: RED },
      { at: [0, 0.375, -0.275], rx: 0.088, ry: 0.1, bone: "pelvis", colour: RED },
      { at: [0, 0.39, -0.12], rx: 0.082, ry: 0.088, bone: "loin", colour: bib(RED, WHITE, -0.8) },
      { at: [0, 0.37, 0.05], rx: 0.096, ry: 0.122, bone: "chest", colour: bib(RED, WHITE, -0.6) },
      { at: [0, 0.375, 0.185], rx: 0.094, ry: 0.125, bone: "chest", colour: bib(RED, WHITE, -0.35) },
      { at: [0, 0.435, 0.265], rx: 0.068, ry: 0.09, bone: "neck", colour: bib(RED, WHITE, -0.2), up: [0, 0.8, -0.6] },
      { at: [0, 0.515, 0.325], rx: 0.06, ry: 0.07, bone: "neck", colour: bib(RED, WHITE, -0.2), up: [0, 0.75, -0.65] },
      { at: [0, 0.575, 0.375], rx: 0.09, ry: 0.074, bone: "head", colour: bib(RED, WHITE, -0.5) },
      { at: [0, 0.57, 0.445], rx: 0.08, ry: 0.066, bone: "head", colour: bib(RED, WHITE, -0.3) },
      { at: [0, 0.545, 0.495], rx: 0.044, ry: 0.044, bone: "head", colour: bib(RED, WHITE, -0.1) },
      { at: [0, 0.532, 0.56], rx: 0.03, ry: 0.03, bone: "head", colour: bib(RED, WHITE, 0.05) },
      { at: [0, 0.532, 0.582], rx: 0.02, ry: 0.02, bone: "head", colour: NOSE },
      { at: [0, 0.532, 0.596], rx: 0.009, ry: 0.009, bone: "head", colour: NOSE },
    ] },
    // the brush: thin at the root, full through the middle, a white tip
    { sides: 7, up: [0, 0.9, 0.4], rings: [
      { at: [0, 0.385, -0.335], rx: 0.025, ry: 0.028, bone: "pelvis", colour: RED },
      { at: [0, 0.36, -0.41], rx: 0.05, ry: 0.052, bone: "tail1", colour: RED },
      { at: [0, 0.325, -0.50], rx: 0.085, ry: 0.088, bone: "tail2", colour: RED },
      { at: [0, 0.29, -0.61], rx: 0.094, ry: 0.096, bone: "tail3", colour: bib(RED, DARK, -0.4) },
      { at: [0, 0.262, -0.70], rx: 0.08, ry: 0.082, bone: "tail4", colour: bib(RED, DARK, -0.2) },
      { at: [0, 0.245, -0.765], rx: 0.06, ry: 0.062, bone: "tail4", colour: WHITE },
      { at: [0, 0.228, -0.85], rx: 0.006, ry: 0.006, bone: "tail4", colour: WHITE },
    ] },
    ...legs.map(l => ({ sides: 5, up: [0, 0, 1], rings: l.rings })),
  ],
  cones: [
    // ears: tall, wide at the base, black behind and at the tip
    ...[1, -1].map(s => ({ at: [0.048 * s, 0.615, 0.36], rx: 0.042, ry: 0.034, tip: [0.074 * s, 0.775, 0.345], bone: s > 0 ? "earL" : "earR", colour: (cy, sx, f) => (cy < 0 ? EAR : RED), tipColour: EAR, split: 0.62, up: [0, 0, 1] })),
    // the cheek ruff: a white tuft each side, swept back, that makes the mask
    ...[1, -1].map(s => ({ at: [0.06 * s, 0.54, 0.4], rx: 0.04, ry: 0.03, tip: [0.135 * s, 0.505, 0.335], bone: "head", colour: WHITE, split: 0.5, up: [0, 1, 0] })),
    // eyes: dark, set on the brow's slope
    ...[1, -1].map(s => ({ at: [0.058 * s, 0.6, 0.452], rx: 0.019, ry: 0.016, tip: [0.074 * s, 0.608, 0.46], bone: "head", colour: NOSE, split: 0.5, up: [0, 1, 0], sides: 4 })),
  ],
  gait: {
    seconds: 0.72, duty: 0.6, root: "pelvis", hips: "pelvis", chest: "chest", neck: "neck", head: "head", ears: ["earL", "earR"], tail: ["tail1", "tail2", "tail3", "tail4"], bob: 0.007, sway: 0.045, tailSwing: 0.13,
    // a walk: left hind, left fore, right hind, right fore, a quarter apart
    legs: [
      { bones: ["hipL", "kneeL", "hockL"], phase: 0, swing: 0.33, fold: [0.5, -0.65], lift: -0.06 },
      { bones: ["shoulderL", "elbowL", "wristL"], phase: 0.75, swing: 0.34, fold: [-0.5, 1.0], lift: -0.16 },
      { bones: ["hipR", "kneeR", "hockR"], phase: 0.5, swing: 0.33, fold: [0.5, -0.65], lift: -0.06 },
      { bones: ["shoulderR", "elbowR", "wristR"], phase: 0.25, swing: 0.34, fold: [-0.5, 1.0], lift: -0.16 },
    ],
  },
};
