# Getting dressed, the house and the end of the night

Backlog (Ed, 2026-10-09). **Not built yet; don't build without Ed's go.** The treehouse's rooms (wardrobe, hat room, broom room, map room, studio, kitchen, DJ booth and the rest), the balcony shot and the octagon-for-now are in [journey.md](journey.md), section 3; this doc covers the character creator, the bedroom's objects and the end-of-night loop.

## Getting dressed (the character creator)

- **The creator is her getting dressed** (Ed): she starts in her nightie and puts on each piece in the order you'd dress.
- **Next and Back steps, not tabs** (Ed). Clothes go on one at a time: top, then jeans, then jacket (the cloak), each its own step.
- Proposed step order: Face → Hair → Top → Jeans → Shoes → Jacket (cloak) → Scarf → out the door. Hats and brooms are chosen in their own rooms (journey.md; [unlocks.md](unlocks.md)).
- **No "same again" button** (Ed): next, next, next is fast enough.
- The creator is only her look: Options, Controls and What's new move out of it (for example to a pause menu).

### Ed's streamlining answers (2026-10-09) that still apply

- **Rotators** for choices: ‹ name › arrows (keyboard left and right too), with a live preview: the witch spins or shows the item off when it changes.
- **Every slider works for every option** (no greyed-out sliders).
- **Colours:** keep every part; the colour grid has five rows (was nine), on every part.
- **Hat:** keep all 17 shapes as a rotator; keep height, brim, tilt and band sliders; add a curl slider.
- **Spartan helmet** (Ed, 2026-10-15): a new hat kind; on it the brim slider sets the size of the crest and the plume (band) colour sets the crest's colour.
- **Hair:** a rotator; add a length slider that works for every style.
- **Face:** skin, plus an eyewear rotator (none, sunglasses, round glasses, visor, goggles...); headphones and earrings move here.
- **Top and Cloak** are separate steps. Cloak: none / short / long becomes a length slider; add a collar option and a width slider.
- **Shoes:** their own step, with a shoe-type rotator (trainers, boots, platforms, bare feet...).
- **Scarf** keeps its own step.
- **Broom:** a rotator, keep all 18; a width slider scales each broom's distinctive part (bicycle wheels, gyrocopter and drone rotors, handlebar length, hobby-horse head size).
- **Removed:** bag (satchel, bum bag), backpack; the "Magic and more" items (lantern, potion vial, spellbook, glow sticks, wristband); the Randomise, Wild and Classic buttons.
- The Player dropdown lives in the debug overlay (built, #649); the Waves dropdown goes for a pause-page wave-speed slider (Ed, 2026-10-18; built, #953).

## The bedroom's objects

- **A working mirror:** the bedroom art already has a standing mirror with its glass marked (`art/bedroom.js` `anchors.mirror`, unused by the game). Draw her sprite again, flipped, slightly dimmed and tinted, clipped to the glass, so she sees each piece as she puts it on.
- **A poster of her biggest party** (the player's best run so far), **as a picture, no text**: for example a gig poster with the crowd drawn on it.
- **Photo wall: cut** (Ed): a past party's final frame is only a few pixels.
- **Records and maps:** the record crate (now the studio) **picks the record: genre and tempo**. **Islands pick the map**, from the sea chart in the map room. The older plan of a record being a map and music seed is superseded (journey.md).

## The end of the night

- **Stargazing witches** (Ed): when a soundsystem is destroyed, its witch doesn't leave the party; she leaves the dancefloor and lies down to stargaze (reusing the beach witches' stargazing pose).
  - They lie around the party area, **outside the speaker ring**, **in pairs and threes** where possible.
  - She can interact with them as with the beach witches (cuddle up and stargaze together).
  - At the end of the night everyone lies there in the quiet, looking up at the stars.
- **How many came** (Ed): at the end, a visual representation of how many came to the party (the stargazers themselves, or a count shown as a picture, no text).
- After the party she can still pick mushrooms and brew ([cauldron.md](cauldron.md)).
- **Bed, wake, dress** (Ed): she goes back to her room and goes to bed; on a win the voyage happens while she sleeps (journey.md); she wakes in her nightie and gets dressed.

## Open questions

- Confirm the step order, and where jeans (trousers) sit.
- Hat and broom looks: are the hat shape and broom model still chosen while dressing, or does each unlocked hat and broom bring its own look (now that they're picked in the hat and broom rooms)?
- The Player dropdown: where it lives once the creator is only her look (perhaps the computer room / telephone in journey.md).
- How many came: the stargazers themselves, or a separate picture?
