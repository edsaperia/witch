# Envelopes hidden by scenery (Ed, 2026-10-19)

Shots by `tools/occlusion/envelope-shots.cjs` (seed 123, 1280×800, headless Chromium with SwiftShader). Each pair: the hiding on (`<name>.png`) and off, as before (`<name>-off.png`), at the same moment.

- `ground`: on foot in a wood 150 m out. Two 💌s held at hand height, one just behind a trunk and one in the open, and an animal half invited at each (its ring showing).
- `treetops`: the same from the treetops, plus a third 💌 and an animal under the canopy 30 m out. The canopy hides all of them, as it hides the animals there.
- `smoke`: from the treetops over a campfire after the first wave. A grid of 💌s north of it; those seen through the smoke are veiled by it.

## Measured

- ok: ground: the ring of an animal half invited behind a trunk: {"envelopes": 7, "opacity": 0.044, "opacityOff": 1}
- ok: ground: the letter behind a trunk: {"opacity": 0.044, "visibility": "visible", "pixelsChangedVsOff": {"changed": 372, "of": 702}}
- ok: ground: the ring of an animal half invited in the open: {"envelopes": 7, "opacity": 1, "opacityOff": 1}
- ok: ground: the letter in the open: {"opacity": 1, "visibility": "visible", "pixelsChangedVsOff": {"changed": 0, "of": 405}}
- ok: treetops: the ring of an animal half invited behind a trunk: {"envelopes": 7, "opacity": 0, "opacityOff": 1}
- ok: treetops: the letter behind a trunk: {"opacity": 0.028, "visibility": "hidden", "pixelsChangedVsOff": {"changed": 640, "of": 936}}
- ok: treetops: the ring of an animal half invited in the open: {"envelopes": 7, "opacity": 0, "opacityOff": 1}
- ok: treetops: the letter in the open: {"opacity": 0.028, "visibility": "hidden", "pixelsChangedVsOff": {"changed": 370, "of": 405}}
- ok: treetops: the ring of an animal half invited under the canopy 30 m out: {"envelopes": 7, "opacity": 0, "opacityOff": 1}
- ok: treetops: the letter under the canopy 30 m out: {"opacity": 0.028, "visibility": "hidden", "pixelsChangedVsOff": {"changed": 605, "of": 936}}
- ok: smoke: the letter most veiled by a campfire's smoke, seen through it from the treetops: {"most": 0.605, "at": [3, 30], "veiled": 9, "of": 40, "opacity": 0.394, "fire": {"x": 2510.205810546875, "z": 2563.337158203125, "d": 42.1320240379859}}
