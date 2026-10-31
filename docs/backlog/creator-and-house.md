# Getting dressed, the house and the end of the night

Backlog (Ed, 2026-10-09). **Not built yet; don't build without Ed's go.** The treehouse's rooms (wardrobe, hat room, broom room, map room, studio, kitchen, DJ booth and the rest), the balcony shot and the octagon-for-now are in [journey.md](journey.md), section 3; this doc covers the character creator, the bedroom's objects and the end-of-night loop.

## Getting dressed (the character creator)

**Retired, 2026-10-31: "Game wins" (Ed).** The default opening wakes her in the walkable house and she dresses at separate stations, led by guidance pins. The old creator remains under `?opening=old`; there is no pending Next/Back dressing sequence. The first morning's order is dressing table, wardrobe, shoes, bag, invitations, cloak, hat, broom (`rules/guidance.ts` FIRST_MORNING). The original plan is [archived](../archive/superseded-design-plans.md#getting-dressed-the-character-creator).

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
