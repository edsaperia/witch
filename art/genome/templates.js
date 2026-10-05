// Witch creature templates (#79, stage 1): the few body plans every species is built on. Each
// names the builders that draw it (art/creatures3d.js), its sockets (where parts go) and the part
// tags each socket allows, which tags exclude each other, how it moves (the live rig's gait, #79
// stage 5) and, for the four-legged, its size curves: how its proportions change with level, so a
// baby is chunky and a legend grand without scaling it uniformly; and its face style, the shapes of
// its expressions' brows and eyes (expressions.js), which a species' genome can override (`face`).
// A size curve is four numbers, baby, young, adult and legend, each a multiplier on the species'
// own proportion (or, for antlers, horns and tusks, their size outright).

// The size curves the templates without their own share: an adult's and legend's heavier build
// (every part thicker across) and the glowing motes round them.
const TEMPLATE_SMALL_SIZES = { build: [1, 1, 1.18, 1.18], motes: [0, 0, 3, 9] };

export const TEMPLATES = {
  quadruped: {
    name: "Four-legged", builders: ["quad"],
    sockets: {
      ears: ["ear.point", "ear.round", "ear.long", "ear.tuft", "ear.small", "ear.big", "ear.none"],
      tail: ["tail.brush", "tail.bushy", "tail.stub", "tail.deer", "tail.bob", "tail.puff", "tail.squirrel", "tail.thin", "tail.otter", "tail.flat", "tail.stoat", "tail.dormouse"],
      feet: ["foot.paw", "foot.hoof"],
      horns: ["horn.curl"], antlers: ["antler.branch", "antler.palm"], tusks: ["tusk"],
    },
    exclude: [["horn.*", "antler.*"], ["tusk", "antler.*"]],
    face: { brow: "bar", happy: "arc", dazed: "x" }, // its expressions' shapes (expressions.js)
    texture: { kind: "fur" }, // its surface (texture.js)
    gait: { offsets: [0, .5, .5, 0], dutyWalk: .65, dutyRun: .35 }, // front left, front right, back left, back right: a trot
    sizes: {
      head: [1.75, 1, 1.12, 1],         // head radius: a baby's big head, a legend's smaller for its size (grand, not cute)
      len: [.8, 1.02, 1.06, 1.14],      // body length: a legend's long
      legK: [.55, 1.04, 1.04, 1.14],    // leg length: a baby's short legs, a legend's long ones
      chestDeep: [1, 1, 1, 1.06],       // a legend's deeper chest...
      chestBig: [1, 1, .9, .9],         // ...and a big one's lower belly line
      tuck: [1, 1, .92, .92],
      body: [1.3, 1, 1.28, 1.28],       // body width: a chunky baby
      limbA: [1.7, 1, 1, 1.1],          // leg thickness: a baby's stubby legs, a legend's thicker ones
      limbB: [1, 1, 1.3, 1.3],          // and the heavier build of adults and legends
      neckBase: [1, 1, 1.25, 1.25], neckTop: [1, 1, 1.2, 1.2],
      headLift: [.1, 0, 0, 0],          // a baby holds its head higher
      snout: [.55, 1, 1, 1], eye: [1.5, 1, 1, 1], ear: [1.2, 1, 1, 1],
      neckAnchor: [.05, .42, .42, .42], neckR: [1.3, 1, 1, 1], tag: [1.8, 1, 1, 1], // where the collar sits
      horns: [.35, 1, 1.3, 1.3], tusks: [0, .75, 1.05, 1.05], antlers: [0, .95, 1.25, 1.25],
      motes: [0, 0, 3, 9],              // glowing motes round adults and legends
    },
  },
  avian: { name: "Bird", builders: ["owl", "raven"], sizes: { head: [.48, .36, .36, .36], headY: [.95, 1.08, 1.08, 1.08], build: [1, 1, 1.18, 1.18], motes: [0, 0, 3, 9] }, sockets: { wings: ["wing.folded", "wing.spirit"], head: ["head.round", "head.beak"] }, exclude: [], texture: { kind: "feathers" }, face: { brow: "tuft", happy: "arc", dazed: "wobble" }, gait: { offsets: [0, .5], dutyWalk: .6, dutyRun: .4 } },
  flyer: { sizes: TEMPLATE_SMALL_SIZES, name: "Flyer", builders: ["bat", "moth"], sockets: { wings: ["wing.membrane", "wing.scaled"] }, exclude: [], texture: { kind: "fur" }, face: { brow: "tuft", happy: "squint", dazed: "x" }, gait: { offsets: [], dutyWalk: 0, dutyRun: 0 } },
  serpent: { sizes: TEMPLATE_SMALL_SIZES, name: "Serpent or worm", builders: ["snake", "glowworm"], sockets: { head: ["head.snake", "head.worm"], tailTip: ["tail.lantern"] }, exclude: [], texture: { kind: "scales" }, face: { brow: "ridge", happy: "squint", dazed: "x" }, gait: { offsets: [], dutyWalk: 1, dutyRun: 1 } },
  insectoid: { sizes: TEMPLATE_SMALL_SIZES, name: "Many-legged", builders: ["beetle", "spider", "woodlouse"], sockets: { head: ["jaw.stag", "eyes.cluster", "antenna"] }, exclude: [], texture: { kind: "plates" }, face: { brow: "ridge", happy: "arc", dazed: "wobble" }, gait: { offsets: [0, .5, 0, .5, 0, .5], dutyWalk: .6, dutyRun: .5 } }, // alternating tripods
  squat: { sizes: TEMPLATE_SMALL_SIZES, name: "Squat", builders: ["toad", "hedgehog", "mole", "snail"], sockets: { back: ["back.spines", "back.shell", "back.warts"] }, exclude: [], texture: { kind: "smooth" }, face: { brow: "bar", happy: "squint", dazed: "x" }, gait: { offsets: [0, .5, .5, 0], dutyWalk: .7, dutyRun: .5 } },
};
export const TEMPLATE_IDS = Object.keys(TEMPLATES);
