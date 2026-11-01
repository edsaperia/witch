# Hue Spin — recipe 108

**Audit status (2026-11-01): Built in source: recipe 108 colour/audio rotation; subjective play review remains separate.**

The status index checks the requests below against prototype `ab06904b` and cited history. **Built** means code is present, not a new play/audition/performance pass. **Partly built** states the missing part. An em dash leaves an unimplemented request unmarked. Versions are verified changelog build labels where available; “unverified” means no first-live number was established. Historical/superseded requests are preserved, not re-authorised. Repeated details/build-order summaries are counted with their feature group, not again.

| Request / feature group | Status | Evidence and remaining gap |
|---|---|---|
| RGB rotation, synced sound, lab controls and final fade | **Built** | #1541, git b3118867a; registry recipe108 implemented, Post hue rotation and potionCycle audio phase. Fragment version null: first shipped version unverified. |


Ed, 2026-10-31: "make a potion"; every potion must alter existing sounds throughout the trip.

Build the existing Hue Spin proposal: pink + turquoise + white, every colour slowly turns into another. Reuse the composite screen pass for a colour rotation and the shared potion audio filter for a synchronised sweep. Expose cycle length, starting colour rotation, visual strength and sound sweep depth in the Potion Lab. Start full strength on waking; fade to the original picture and sound during the last two game minutes. Stop/replacement restores the default immediately through the normal envelope.

This branch depends on PR #1536's shared sound routing at db1b05fec. Preserve #1531's bespoke Night/Heat Vision sound when combining. No new render pass, audio source, simulation changes or laptop browser. Coordinator owns combined CI and release; Ed judges the look and sound in play.

Implemented in PR #1541: a 20-game-second RGB rotation, starting 120 degrees around the cycle, leaves neutral colours neutral. The screen-pass blend fades independently of phase, avoiding a backwards colour unwind at expiry. The existing low-pass filter sweeps two octaves either side of its centre on the same phase; existing gain flutter also follows that clock. Full colour and sound return through the shared envelope. Menus and other HTML overlays retain their original colours.
