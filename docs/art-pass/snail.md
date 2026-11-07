# Snail: body-graph target

7 November 2026. L8 reference/design work only; no implementation or activation. Natural comparator: Garden snail Cornu aspersum comparison. Read [lane audit and limits](l8-summary.md) with this note.

## Recognition checklist

- One visibly coiled shell with a coherent spiral
- Broad continuous muscular foot, no legs
- Two long upper eye-bearing tentacles
- Two shorter lower sensory tentacles
- Mantle/aperture join supports shell on soft body
- Tapered rear foot trails behind shell
- Head can extend ahead without shell floating

## Body plan and mass

L = extended foot front to rear, excluding tentacles. Shell diameter 0.45–0.65L; shell height 0.45–0.65L; soft body depth 0.10–0.18L; head/neck extended region ahead of shell 0.20–0.30L. Upper tentacles 0.20–0.35L; lower 0.08–0.15L; trailing foot 0.15–0.25L. No legs or separate accessory tail. These are proposed modelling ranges estimated from silhouette, not zoological measurements and not ratios measured from generated images.

Dominant shell volume sits over the middle/rear foot, with a low continuous contact strip. The projecting head/tentacles are light; shell should never hang above a pin-thin stem.

**Age0:** Source describes pale near-clear one-turn baby shell and relatively big eye stalks. Generated baby shows several visible whorls, so it is a soft-body/shell relationship reference, not the exact age0 shell-count target.

**Top three priorities:** Support shell on broad foot → preserve spiral/aperture → add both tentacle pairs.

## Reference comparison

[Adult/age0 target plate](https://github.com/edsaperia/witch/blob/c3a631ae97fde88263918c22f4fa0b886bd0bcfc/previews/art-pass/snail/target-l8.png). Two rows adult/game age0; columns standing towards, standing away, locomotion towards, locomotion away. For flyers, neutral/flight replaces literal ground walking. Requested camera is pitch 0.52 radians and yaw ±0.6 from side profile, as in `art/model3d.js`; generated perspective is approximate and not calibrated.

Commons live snail thumbnail shows one globose coiled shell, a broad grounded foot and long eye stalks. Small lower tentacles are not reliably visible at that resolution. Generated adult shell/body relationship is useful but the lower pair must come from the written target, not inferred from occlusion.

[Photo gallery](https://commons.wikimedia.org/wiki/Cornu_aspersum) was inspected through locally viewed Commons thumbnails; photographs are comparison only and are not committed. [Full prompt/provenance](https://github.com/edsaperia/witch/blob/c3a631ae97fde88263918c22f4fa0b886bd0bcfc/previews/art-pass/snail/provenance-l8.json) records exact generated prompts and selected source files.

## Verified graph needs

Audit of `art/body-graph/graph.js` and `acceptance.js` at #1866 head `de27db5154a3e8b1aa94255263bd2601b92aec36`, not a claim about later work. #1866 already has gastropod family, broad-foot two-pose crawl, shell socket, raised spiral and aperture cut, upper stalk chains and eyes. Do not report these as missing. Lower sensory tentacle pair is absent in inspected acceptanceGraph; mantle/aperture soft transition, asymmetrical natural shell whorl shaping and coherent foot-wave deformation still need target review.

## Three legend concepts and recommended pick

[Three concepts beside current legend](https://github.com/edsaperia/witch/blob/c3a631ae97fde88263918c22f4fa0b886bd0bcfc/previews/art-pass/snail/legend-comparison-l8.png). A: age-of-stars spiral shell. B: pilgrim with a looping silver trail and tall stalks. C: tall shell archive with growth rings and bells.

**Recommend A — A makes the spiral itself an archive of the stars. Chipped lip, mud and old grey skin carry age; its mystery grows from a snail carrying its whole world rather than a generic crown or trees.** Ed judges the recommendation. Signature element: **Star-map spiral shell**.

**Chosen legend checklist/body plan:** Shell diameter 0.85–1.1L and height 0.8–1.1L, upper tentacles 0.35–0.50L. Keep shell supported by an enlarged broad foot, continuous whorl/aperture, four tentacles, chipped lip and sparse gold star-map inlay. Avoid growing it into a separate building; the woodlouse owns the home-shell signature here.

**Additional graph needs:** #1866 already paints sparse legend stars/runes on shell. Remaining needs are coherent surface-following star-map/inlay, chipped aperture silhouette and lower tentacle pair, not an entirely new shell system.

**Area/story source:** art/areas.js muddy-forest text: mud/leaves, short trunks with broken branches, many-trunked/branched trees.

**Comparison limits:** The generated A shell reaches the left image edge, and the overall sheet is a concept arrangement rather than calibrated projection; use base plate for complete anatomical envelope. Star patterns are fantasy. Current albedo's spiral remains the key cue. Current comparison is an actual source-produced awake age3/frame0/towards Bold albedo sprite from prototype `524b0acaa43bb9975e7b2834ff9a55cbca4b3319`, extracted without a browser using `critter`/`speciesColours`/`bake`. Independent panel scales; no runtime lighting, gait performance or visual acceptance claim. No game-visible text changed.

