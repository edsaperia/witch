# Witch — design document

*Witch* is a working title. This document grows as Ed and the coordinator settle things; anything not written here is undecided. Builders read it before starting work, and record nothing here that Ed has not ruled.

## Priorities (Ed, 2026-10-03)

- Witch is a creative project. **Quick development cycles** and **easy playtesting**, by Ed and by people he shares it with, come before everything else.
- Witch is played **in the browser first**, so it is quick to build and share. Nothing is chosen that would make a later port to other platforms impossible.
- Ed has designed and directed games but not developed one. The coordinator brings game-development practice and says when a choice goes against it.

## Pitch

A roguelite that crosses a **creature collector** with **tower defence / real-time strategy**. The player moves around a map, finds creatures, collects them and levels them up, and **leashes** them to locations, where they defend the player's home against incoming enemies.

## The witch

- The player is a **witch flying on a broomstick** (Ed, 2026-10-03).
- She **does not fight and is never attacked**. Only her creatures and her home are; the home is designed later.
- The setting is a **forest**.

### Two modes of movement

- **Ground mode**: under the trees, slower, with full sight of what is on the ground.
- **Treetop mode**: above the canopy, faster, but the canopy hides the ground. From above she sees only **tall landmarks**, **large creatures**, and the ground where **the trees are sparser**.

The trade is speed against information: treetop mode covers distance, ground mode reveals what is there. Tree density is therefore gameplay as well as scenery, since it decides where the ground can be seen from above.

## Look

A 3D world with **2D pixel-art sprites** for characters and objects. References: *Cult of the Lamb* and *Octopath Traveler*. Witch develops its own art style as it goes.

## Order of work

1. A character the player moves around in 3D space.
2. Map generation and art direction, so that the environment feels good.
3. Enemies and creatures, then building and iterating the gameplay loop.

## Practices

- **Find the fun early**: grey boxes and placeholder art until a loop is fun in playtests.
- **Design pillars** settle trade-offs once they are written.
- **Tuning values live in data files** Ed can edit, not in code.
- **Every change gets a playable link** for playtests.
- **Scope small, then grow**: a toy, then a slice, then content.

## Open questions

- Switching between modes: instant or a short rise and descent; anywhere, or only where the trees are sparse.
- Whether trees block her in ground mode, so the forest has paths.
- What she can do from above (find, catch, leash creatures) and what needs the ground.
- What she does while her creatures defend.
- Run structure: what one run is, what persists between runs.
- How the leash works.
- Whether exploring and defending happen at the same time or in phases (for example, day and night).
- Camera: fixed angle or rotatable.
- Controls: keyboard and mouse, controller, touch.
- Engine: Godot 4 exported to the web is the provisional choice (2026-10-03), to be confirmed by the first build.

## Glossary

- **Ground mode**: the witch flying under the trees: slower, full sight.
- **Leash**: tying a creature to a location, where it defends.
- **Treetop mode**: the witch flying above the canopy: faster, sight only of what shows through or above it.
