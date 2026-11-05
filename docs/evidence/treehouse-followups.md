# Treehouse follow-ups: first release only

Ed, 2 November: all four look switches on by default; house walk 7.5 → 9 m/s. Ed clarified that walking means movement without her broom; forest groundSpeed stays 19.25. The movement speed selector has no separate no-broom forest walk setting. The distinct scripted knockout return interpolation is preserved. Items 3–5 wait for this release.

## No-broom fall evidence

The existing host stepGame movement branch sets its per-witch deck fall.on=true whenever hasBroom(W) is false, before calling stepWitch. Thus the shared tuning false does not bypass the fall. The updated existing kit regression exercises that production host path with shipped tuning, checks the thud/return timing and the recorded edge origin, and compares the broom exit. No gameplay fall change is required.

## Existing tests changed

- treehouseLook: published defaults false → true; real link controls disable each independent default (one off, three on). Direct disabled-function contracts stay unchanged.
- houseRooms: speed pin 7.5 → 9 and stride ratio 1.5 → 1.8; groundSpeed 19.25 remains pinned. The old wall constraint and locked-door perched fixture explicitly select walls-on.
- kit: existing fall test now uses the shipped walls-off default and returns to fallOrigin, rather than pinning the former circle. It asserts shared fall.on=false to cover the production override.
- treehouse: the old explicitly forced fall/circle test and wall-constrained trunk walk now explicitly select walls-on, preserving their old assertions and optional mode.

### Complete changed-test inventory

1. treehouseLook: “keeps all four trials off in the published tuning” → asserts all four on.
2. treehouseLook: “registers four independent off-by-default pause switches…” → asserts defaults on and individually disables them with real controls.
3. houseRooms: “walks half again as fast…” → asserts 9 m/s, stride 5, ratio 1.8 and groundSpeed 19.25.
4. houseRooms: “their edge keeps her in…” → explicitly walls-on, same edge assertions.
5. houseRooms: “Bedrooms 2 and 3 are locked…” → explicitly walls-on so its perched-at-door assertion retains the authored optional mode; access assertions unchanged.
6. kit: “without a broom, off the Terrace's open rim she falls…” → shipped fall.on=false, one thud/return, edge-origin coordinates, broom comparison unchanged.
7. treehouse: “is one floor: from the Terrace she walks up the trunk…” → explicitly walls-on, same walk constraints.
8. treehouse: “takes her flying again when she walks off the Terrace's open rim…” → explicitly walls-on only in its forced-fall circle fixture, same circle recovery assertions.

## CI follow-up on the same defaults milestone

Full CI41435633030 shard3 found three additional implicit-default failures after the fast-path merge. No product source fault is inferred: the crown render test passed H.look as its disabled control, but H.look is now enabled; the two broom input tests pushed for three seconds against absent walls, flew off, then pressed rise to descend.

- render/treehouseLook: “supplies full indoor clearing…” now explicitly sets indoor/approach false only for its disabled-control call; all uniform assertions unchanged.
- platform/inputHouse: the shared fixture for its26 tests explicitly selects walls-on, matching the suite's stated wall-push/rise contract. This retains both pad/keys broom assertions and all no-broom/station/rise assertions. No expected values or gameplay controls changed. Open-platform exits remain covered by the actual host kit regression and all14 direct room-edge contracts.

## Visible text

Toggle notes: former default-off trial wording → on by default, chosen by Ed on 2 November; wall note keeps the same broom/fall explanation. Slider note: “Only affects its enabled Treehouse look trial.” → “Adjusts the corresponding Treehouse look setting while it is enabled.” Labels unchanged. Changelog adds “The treehouse now has open platforms, a fuller crown and clearer approaches by default.” and “Walking in the treehouse is 20% faster.”

No laptop browser or visual/performance acceptance is claimed. Exact-head CI and publication belong to the coordinator.
