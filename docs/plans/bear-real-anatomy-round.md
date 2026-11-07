# Brown-bear reference round

Authority: coordinator1866#6707688207,6707700726,6707731639,7November.
These supersede shipped parity/IoU targets and the prior high-head/exposed-tail
interpretation. The0a884 cloud render12.2s/servedSHA matched but was rejected
for boar/dog proportions. This is one bear-only candidate, not accepted art.

## Real references and generated guides

Actual photos were downloaded locally for inspection only; neither is committed
or published: [NPS adult identification photo](https://www.nps.gov/articles/bear-identification.htm)
(Jim Pfeiffenberger/Lake Clark) shows the highest shoulder, lower rump, hanging
belly, forward/down head and long front claws. [NPS Damp Cub](https://npgallery.nps.gov/AssetDetail/e16e471c-d4dc-4668-9a65-2d6f1ee271a9)
(Ken Conger; metadata says yearling) shows the broad cub face, relatively larger
round ears, continuous muzzle, dark nose and small eye catchlights. The cub photo
is frontal/seated, so it does not independently verify all four feet or camera.

Built-in `image_gen__imagegen` generated a plain-background photoreal2x2 board:
adult/cub rows, towards/away columns, whole animals facing right, requested
pitch.52rad/yaw±.6rad. The exact prompt/tool/date and photo comparison are in
`ref-provenance.json` next to the preview-only `ref-board.png`; its published
exact-head paths are recorded on the PR. No reference is imported by game code.

Generated perspective is approximate, not calibrated to radians; the generated
cub looks juvenile rather than a reliably dated first-year cub. The real photos
win wherever anatomy disagrees. The board supports paired-view comparison, not
claims of photographic/biological ground truth. Actual source pixels stay native
in the review sheet; only the photographic comparison panel is resized.

## Seven-point source response (not a render verdict)

1. Shoulder highest/lower rump: lower flank, wider smoother shoulder falloff,
   reduced haunch lift; no arbitrary rump knobs.
2. Low forward head: negative neck rise, tapered continuous muzzle with slight
   downward slope, dark nose moved beyond its cap, adult ears reduced40% and
   moved outward/down. Eyes have a small explicit catchlight placed at their
   surface; image visibility must still be checked.
3. Heavy feet: shorter.39 adult legs, radius.16/.18legend, lower-limb profile
   [1,1.08,1],.19wide/.24long paws with pads/claws. Hind bend is backward with
   a heel-down elongated ground-contact foot. This remains a two-segment
   diagnostic representation, not a claim of full anatomical hock articulation.
4. Hanging belly: more ventral depth and downward lift across the ribcage,
   rounded between the legs; no canine tuck goal.
5. Tail: .19 adult/.16cub stub replacing the earlier over-exposed.33/.24.
6. Cub: rounder/wider skull, shorter.2 muzzle, relatively bigger ears, rounder
   compact body and short legs; not a uniformly scaled adult.
7. Recognisable bear: only a critical review of native renders can establish
   this. Source parameters, photograph generation and test passes cannot.

| Review view | Source checklist | Visual judgement |
| --- | --- | --- |
| Age3 towards | seven responses above | UNRENDERED / pending canonical |
| Age3 away | seven responses above | UNRENDERED / pending canonical |
| Age0 towards | seven responses above, cub overrides | UNRENDERED / pending canonical |
| Age0 away | seven responses above, cub overrides | UNRENDERED / pending canonical |

## Cloud handoff

`iterate.mjs` now requires `WITCH_GRAPH_REFERENCE` pointing at the published
`ref-board.png` under the canonical creature-graph preview path. It downloads
the board into its ignored output directory, records its URL/hash and crops the
matching panel per age/facing (adult used for ages1–3, cub for0). Sheet columns:
synthetic reference | graph | shipped(size/placement only) | diagnostic overlay.
Reference download is included in the existing55s work budget. Under-minute
completion must be re-proved for this revised reference-aware command.

Canonical owns cloud execution/publication and the next critical seven-point
review. No laptop browser/runtime allocation is implied. Other five presets
remain unchanged and all six default OFF. No activation/merge/release.
