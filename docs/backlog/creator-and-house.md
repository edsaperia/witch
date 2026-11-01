# Getting dressed, the house and the end of the night

**Audit status (2026-11-01): Partly built: wake/dressing stations, controls and stargazers exist; several older creator details and bedroom rewards do not.**

The status index checks the requests below against prototype `ab06904b` and cited history. **Built** means code is present, not a new play/audition/performance pass. **Partly built** states the missing part. An em dash leaves an unimplemented request unmarked. Versions are verified changelog build labels where available; “unverified” means no first-live number was established. Historical/superseded requests are preserved, not re-authorised. Repeated details/build-order summaries are counted with their feature group, not again.

| Request / feature group | Status | Evidence and remaining gap |
|---|---|---|
| Wake in nightie and dress at places | **Built** | `rules/wakeUp.ts`, `rules/clothesPile.ts`, `rules/guidance.ts`; wake-first changelog v4240. Original implementation PR not verified in this audit; station follow-up #1076. |
| Next/Back dressing steps and proposed order | **Partly built** | The default uses walkable stations and first-morning pins, not the proposed Next/Back wizard. `ui/creator.ts` remains the old opening. #1076; station-card revision v5440. Exact original sequence not implemented. |
| No same-again button | **Partly built** | No creator wizard button, but yesterday's pile now dresses her at once (`rules/clothesPile.ts`); the original next-next-next interaction is superseded. Wake-first v4240; original PR unverified. |
| Options, Controls and What's new outside the creator | **Built** | Pause/Settings owns these ordinary views (`platform/freeze.ts`, `ui/settings.ts`); #1493. First shipped version unverified. |
| Rotators, arrows and live preview | **Partly built** | Old creator supports rotators; ordinary stations now use cards and explicit Choose, not changing on focus. #1076; choose revision v5303, cards v5440. Original all-rotator presentation is not the default. |
| Every slider for every option | **Partly built** | Station Fit controls are real but conditional by item (for example cloak length); exact every-slider-for-every-option promise is not met. `ui/stationPanel.ts`, `config/wardrobe.json`; #1076, v5440 follow-up. |
| Five-row colour grids | **Built** | `config/wardrobe.json`, `ui/stationPanel.ts`; #1076, station-rows fragment v4103. |
| Hat shapes, fit and curl; Spartan helmet crest | **Partly built** | Hat fit/colour exists at mirror, power hats lie on floor; fit subset and fixed collectible identity replace the original 17-shape rotator/curl request. `art/witch.js`, wardrobe hatFit; #1044 v4187 and station cards v5440. Do not mark all original sliders complete. |
| Hair choice and length | **Built** | Wardrobe hair items/Fit and art/witch.js hairLength; #1076, v4103 station rows (first hair-specific version unverified). |
| Face, eyewear, headphones and earrings | **Partly built** | Skin/hair/earrings have a dressing table; complete eyewear/accessory relocation and list are not delivered as proposed. `config/wardrobe.json`; #1076, v4103. Eyewear/accessories remain a later dressing pass. |
| Top, cloak, shoes and scarf choices | **Partly built** | Separate cards and fit exist; walkable stations replace separate Next/Back steps. #1076; hat-band/cape and station-card changes, v5440. Original wizard-step request is only partly represented. |
| All 18 broom shapes and width rotator | **Partly built** | Parts/sets replace the 18-shape selection; lathe colours/Fit exist, full shape rotator is retired. #1037/#1040/#1056, v4181/v4221. |
| Removed bags, backpack, accessories and randomisers | **Partly built** | The old removal is historical: bags/backpacks are now supported equipment and finds. #1044 v4187; starting-bag changes in wardrobe. This is not an outstanding request to remove them again. |
| Player debug-only and Waves pause slider | **Built** | #649 (first version unverified), #953; `app/playerPick.ts`, pause decisions registry. Wave slider is current; exact #953 first version unverified. |
| Working reflected witch in bedroom mirror | — | Vanity/mirror furniture and its station exist; no live flipped-witch mirror implementation found in house rendering. That is not proof the reflection request shipped. |
| Picture poster of biggest party | — | No implementation found for this request; original proposal remains unmarked. |
| Records and island selection | **Partly built** | Sea chart chooses islands; DJ booth chooses unlocked BPM records. #735/#738 v2961; `rules/records.ts`. Island/biome genre records and their old crate flow are not implemented. |
| Stargazing after a soundsystem falls; pairs and interaction | **Built** | `rules/partyWitches.ts` beds/MEET_SEQUENCE and render party poses; historical shipped implementation, exact originating PR/version unverified. Source is present in prototype, not newly built here. |
| Visual representation of how many came | **Partly built** | Stargazing witches themselves are visible; no separate retained best-party picture/count reward found. `rules/partyWitches.ts`; originating PR/version unverified. |
| Afterparty mushroom collection and brewing | **Built** | `rules/mushrooms.ts`, legacy cauldron compatibility; #1472 v5764 preview, current nine-colour work #1523 (first live version unverified). |
| Bed, wake, dress and voyage | **Partly built** | Bed/new night and waking are built (#986 onward, v4466 sail-in-bed); legend-carries-house sleep voyage was explicitly superseded by continuous sailing, not an unbuilt next step. |


Backlog (Ed, 2026-10-09). **Mixed implementation status; see the audit below. No unbuilt work is authorised by this page.** The treehouse's rooms (wardrobe, hat room, broom room, map room, studio, kitchen, DJ booth and the rest), the balcony shot and the octagon-for-now are in [journey.md](journey.md), section 3; this doc covers the character creator, the bedroom's objects and the end-of-night loop.

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
