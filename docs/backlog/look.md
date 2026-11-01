# The look of the world

**Audit status (2026-11-01): Partly built: area blending and default-off edges exist; exact-border ground cover remains the default.**

The status index checks the requests below against prototype `ab06904b` and cited history. **Built** means code is present, not a new play/audition/performance pass. **Partly built** states the missing part. An em dash leaves an unimplemented request unmarked. Versions are verified changelog build labels where available; “unverified” means no first-live number was established. Historical/superseded requests are preserved, not re-authorised. Repeated details/build-order summaries are counted with their feature group, not again.

| Request / feature group | Status | Evidence and remaining gap |
|---|---|---|
| Blend trees, bushes, grass and all ground cover across borders | **Partly built** | #1149, v4567; #1179, v4646. `rules/forest.ts` plantType and pause-page areaEdgeBlend controls mix trees/bushes over an 80 m band. `areaEdgeBlend.warp=0`; `tufts=0`, so ground-cover species keep the exact area border by default. Full all-cover blending is not the default; do not confuse this with the separate ground-texture shader blend. |
| Experiment with glowing area edges off | **Built** | #889 (first build version unverified); off by default, pause toggle retained. Edge-seer #939, v3820. `render/borders.ts`, `rules/hatSpells.ts`; later binding/wording changes do not undo the experiment. |


Notes (Ed, 2026-10-13). **Mixed implementation status; see the audit below. No unbuilt work is authorised by this page.**

## Softer borders between areas

- **Blend the planting across area boundaries.** Trees, grass tufts, bushes and the rest of the ground cover should thin and mix smoothly from one area into the next, so there's no sharp edge where one area's planting stops and the next begins: e.g. each area's density and species falling off over a band either side of the border, the two areas' mixes overlapping there.
- **Experiment: turn off the glowing dotted edges between areas.** — **Done:** off by default since #889, with an "Area edges" toggle on the pause page; the Edge-seer hat shows them to its wearer (#939).
