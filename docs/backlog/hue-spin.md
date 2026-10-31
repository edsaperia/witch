# Hue Spin — recipe 108

Ed, 2026-10-31: "make a potion"; every potion must alter existing sounds throughout the trip.

Build the existing Hue Spin proposal: pink + turquoise + white, every colour slowly turns into another. Reuse the composite screen pass for a colour rotation and the shared potion audio filter for a synchronised sweep. Expose cycle length, starting colour rotation, visual strength and sound sweep depth in the Potion Lab. Start full strength on waking; fade to the original picture and sound during the last two game minutes. Stop/replacement restores the default immediately through the normal envelope.

This branch depends on PR #1536's shared sound routing at db1b05fec. Preserve #1531's bespoke Night/Heat Vision sound when combining. No new render pass, audio source, simulation changes or laptop browser. Coordinator owns combined CI and release; Ed judges the look and sound in play.
