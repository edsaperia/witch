# Swallowtail (saved id moth): body-graph target

7 November 2026. L8 reference/design work only; no implementation or activation. Natural comparator: Papilio machaon butterfly; current genome explicitly replaced the moth. Read [lane audit and limits](l8-summary.md) with this note.

## Recognition checklist

- Two pairs of broad scaled wings, not glass dragonfly wings
- Yellow field with black veins and borders
- Distinct hindwing tails and blue crescent markings
- Slender abdomen and compact thorax
- Clubbed antennae, not feathery moth antennae
- Six thoracic legs; folded/resting legs remain separate from wings
- A small head and visible proboscis rather than a mammal muzzle

## Body plan and mass

L = head-front to abdomen tip, excluding antennae. Head 0.12–0.18L; thorax 0.25–0.32L; abdomen 0.45–0.58L. Full open wing span 2.2–3.0L, forewing root-to-tip 1.1–1.5L, hindwing tail extension 0.25–0.45L; antennae 0.35–0.50L; leg chains 0.35–0.55L. Neck is a small hinge; no separate external tail. These are proposed modelling ranges estimated from silhouette, not zoological measurements and not ratios measured from generated images.

Tiny central body supports broad thin wing surfaces. Preserve the abdomen behind the thorax; avoid a round moth blob or thick bat membrane.

**Age0:** Age0 is the game's smaller butterfly proxy, not a caterpillar or chrysalis. Keep the swallowtail family and simplify pattern/tails rather than invent a biological miniature larva with wings.

**Top three priorities:** Respect swallowtail identity → distinguish fore/hind wings and tails → separate rest and flight.

## Reference comparison

[Adult/age0 target plate](https://github.com/edsaperia/witch/blob/c3a631ae97fde88263918c22f4fa0b886bd0bcfc/previews/art-pass/moth/target-l8.png). Two rows adult/game age0; columns standing towards, standing away, locomotion towards, locomotion away. For flyers, neutral/flight replaces literal ground walking. Requested camera is pitch 0.52 radians and yaw ±0.6 from side profile, as in `art/model3d.js`; generated perspective is approximate and not calibrated.

Commons mounted male gives clear fore/hindwing outline, tails and black/yellow pattern; it does not establish live posture. Marc Solari's flight original shows open scaled wings and tucked legs. Lepiforum's Matter 2007-06-19 Buettenhardt underside photo shows a resting butterfly gripping a stalk with closed wings alongside/above the body, clubbed antennae and narrow abdomen. Base generated perch cells are partly open, so the supplemental closed-wing cell is the better target, still more upright than the real resting pose.

[Photo gallery](https://commons.wikimedia.org/wiki/Papilio_machaon) was inspected through locally viewed Commons thumbnails; photographs are comparison only and are not committed. [Full prompt/provenance](https://github.com/edsaperia/witch/blob/c3a631ae97fde88263918c22f4fa0b886bd0bcfc/previews/art-pass/moth/provenance-l8.json) records exact generated prompts and selected source files.

## Flight and resting targets

Flight: level/path-angled thorax, forward head and tucked six legs; fore/hind wings remain paired scaled surfaces, not finger-ray membranes. Rest: grip or stand, wings close vertically together with underside visible; an open bask pose may also exist. Require multiple readable flap poses plus a held-wing glide and takeoff/landing contact changes. Supplemental sheet row-major perch/glide/upstroke/downstroke/takeoff/landing is static; cycle timing and continuity are not demonstrated.

[Supplemental pose sheet](https://github.com/edsaperia/witch/blob/c3a631ae97fde88263918c22f4fa0b886bd0bcfc/previews/art-pass/moth/flight-targets-l8.png). [Flight photo by Marc Solari](https://photos-marc-solari.e-monsite.com/album-photos/papillons-de-jour-rhopaloceres/papilionidae/papilio-machaon-en-vol-web-1.html) and [resting underside by Matter on Lepiforum](https://lepiforum.org/wiki/page/Papilio_machaon) were inspected at full size.

## Verified graph needs

Audit of `art/body-graph/graph.js` and `acceptance.js` at #1866 head `de27db5154a3e8b1aa94255263bd2601b92aec36`, not a claim about later work. No butterfly/scaled-wing family in #1866. Bat membranes do not supply four overlapping scaled wing lobes, club antennae, proboscis or six legs. Need wing pattern following deforming surfaces, folded rest, held-wing glide, readable flap sequence and ground/flight transitions.

## Three legend concepts and recommended pick

[Three concepts beside current legend](https://github.com/edsaperia/witch/blob/c3a631ae97fde88263918c22f4fa0b886bd0bcfc/previews/art-pass/moth/legend-comparison-l8.png). A: eyespot oracle with enormous luminous blue hindwing eyespots and frayed tails. B: pollen pilgrim with exaggerated clubbed antennae. C: wind elder with long continuous hindwing tails.

**Recommend A — A develops the existing elder eyespot idea directly from the patterned wings. Worn scale fields and tattered tails show age, while the gaze belongs on the wings rather than a generic floating ring of eyes.** Ed judges the recommendation. Signature element: **Luminous hindwing eyespots**.

**Chosen legend checklist/body plan:** Open span 3.0–3.6L; paired eyespots approximately 0.45–0.65L across on the hindwing fields. Keep black/yellow veins, tails, club antennae, six tucked legs and small central body. Shape frayed margins without making the butterfly look like a moth or feathered bird.

**Additional graph needs:** Surface-locked eyespot masks/emission, asymmetric worn-scale/tail edges and folded-wing-safe pattern placement.

**Area/story source:** art/areas.js heath text: heather, gorse and wind-bent birches; kind.json says temperate and current genome calls it meadow swallowtail. References keep swallowtail anatomy; the concept uses wind wear and pollinator wings, not a literal moth attraction-to-flame story.

**Comparison limits:** Concept A is closer to a dorsal presentation than calibrated game camera; the generator's worn tails are fragile design suggestions. Current albedo preserves yellow/black butterfly identity but does not prove the new folded or flight states. Current comparison is an actual source-produced awake age3/frame0/towards Bold albedo sprite from prototype `524b0acaa43bb9975e7b2834ff9a55cbca4b3319`, extracted without a browser using `critter`/`speciesColours`/`bake`. Independent panel scales; no runtime lighting, gait performance or visual acceptance claim. No game-visible text changed.

