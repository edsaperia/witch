# First night, walked as a newcomer (cloud runner, fresh profile)

Quebec, 2026-10-29, for PR #1458 (the first-night plan).

## Setup

1. **Build:** `claude/prototype` at 02f3a9d, built locally (`npm run build`; its label reads "dev"). The live site (v5644) couldn't be reached from this container (the proxy returned 403), so this isn't the live build byte for byte. `main` has nothing that prototype lacks (only snapshot merges).
2. **Link:** `/?newWitch=1&seed=123`, in a fresh Playwright context (empty storage) each time, headless Chromium with SwiftShader (software WebGL). Frames 01 to 02 were at 1280×720; the rest at 960×540.
3. **Audio:** headless, so nothing was heard. The page did run its audio, and its log showed the music "shedding" under load.
4. **Speed, and how I drove it:** SwiftShader draws the bedroom at about 50 ms a frame, but once the island's forest has built (about 30 s after load, even with her lying in bed) it takes 3 to 6 s a frame. I measured it: 161 draw calls and 59k triangles before, 376 and 286k after. That's the cloud renderer, not a game bug. (At first I blamed the station close-up camera; an idle load proved me wrong.) So:
   - **real key presses and clicks** for every menu and action shown: snooze, getting up, every station panel (E, WASD, Space, E to close), the DJ booth (a real mouse click on "Get this party started"), Esc, and holding E at the stump for the spell;
   - **debug stepping (`window.witch.frame`, with drawing off) for walking and waiting**, as the quick smoke test walks the house: moving her, rising and landing (Space), throwing 💌s (aim and fire), E at the hats' floor, and about 250 s of rules waiting for wave one;
   - **state skips:** the third run lost the page when my driver timed out, so I replayed it. The dressing table's E went in as a rules press, and the wardrobe and shoe rack were marked done by removing `top` and `shoes` from `g.wake.pile` (they had been walked and shot already). Until the bag choice redrew her, frames 12 to 13 show her in her nightie because of that;
   - **party's end:** `window.witch.lose("home")`.
   - Drawing one frame at a time came out black outdoors (my tool's fault: the page's loop does work the drawing needs), so every outdoor frame is a few seconds of the live loop.
5. **Not reached:** stunning and combat, putting down sigils and leashing a stack, a knockout, the bed. The "🔊 press any key for sound" toast in some frames is there because the debug stepping sends no key; a real player clears it with their first key.

## The walk

Each step: what the screen says to do · what's unclear or missing · anything broken.

1. **Asleep** ([01-asleep.png](01-asleep.png)). A dark screen with "💤 … zzz …" and a stray "120 BPM" tag. · The gold World Tree loading screen wasn't caught: by 8 s it had already gone, or never showed headless. · Nothing broken.
2. **Alarm** ([02-alarm.png](02-alarm.png)). WASD keycaps by the bed, "E snoooze", "🔊 press any key for sound". Clear. · The WASD cluster sits oddly, its W over the left of ASD. · Pressing E to snooze gives no feedback beyond the keycaps vanishing for 5 s.
3. **Stretch** ([03-stretch.png](03-stretch.png)). "*yaaawn* … *stretch*" for 3 s after a move key. Clear.
4. **Up** ([04-up.png](04-up.png)). The 💇 pin is over the dressing table, breathing. · Nothing says what she's dressing for, or that the door is open and she could just leave. · Foreground leaves cover the room's bottom left.
5. **Dressing table** ([05-dressing-table-pin.png](05-dressing-table-pin.png), [06-dressing-table-panel.png](06-dressing-table-panel.png)). The pin plus an E keycap; the panel says "First night · pick your look here, and at the wardrobe, cloak pegs and shoe rack". This is the only words-level guidance of the morning. · "6 of 8 found" and "every colour" mean nothing yet. The hair thumbnails show her clothed and hatted while she stands in a nightie. The footer is bare keycaps "W A S D · ␣ · E" with no words; E closes (Back), not Esc. · The pin moves on to the wardrobe as soon as the panel opens.
6. **Esc in a panel** ([07-esc-in-a-panel.png](07-esc-in-a-panel.png)). Esc opens the pause page, a developer page (test sliders, Copy values, Unlock everything, Fight arena, the quality ladder, the debug readout). Its text is drawn straight over the dressing panel; you can't read either. A playtester will press Esc to close a menu.
7. **Wardrobe** ([08-wardrobe-pin.png](08-wardrobe-pin.png), [09-wardrobe-panel.png](09-wardrobe-panel.png), [10-wardrobe-dressed.png](10-wardrobe-dressed.png)). The 👗 pin; the panel shows "Velvet jacket ✓ Wearing." · **She isn't wearing it: she's in her nightie.** Space on it does nothing, and the pin stays. Only moving the highlight to another jacket (the Poncho) put her top on and moved the pin to the shoe rack. A newcomer can get stuck here.
8. **Shoe rack** ([11-shoe-rack-panel.png](11-shoe-rack-panel.png)). "Every colour is hers: choose to put it on." · Here moving the highlight did **not** count; Space on a colour did. The wardrobe behaves the other way round.
9. **Parlour** ([12-parlour.png](12-parlour.png)). The 👜 pin over the bags. The rooms between are dark, and the corridors read fine.
10. **Bags** ([13-bags-panel.png](13-bags-panel.png)). "Satchel ✓ … Wearing." · As at the wardrobe: Space on the satchel it says she wears does nothing. I had to pick the Bumbag (S, then Space). The stats ("faster throws, shorter reach") mean nothing before she's thrown a 💌. The list scrolls with S, not D.
11. **Invitations desk** ([14-invitations-desk.png](14-invitations-desk.png), [15-after-the-desk.png](15-after-the-desk.png)). The 💌 pin plus E. · E takes them with no panel, sound (headless) or words that I saw; the pin just jumps to the cloak pegs (🧥, at the screen's edge). Nothing on screen ever shows how many 💌 she has.
12. **Terrace** ([16-terrace.png](16-terrace.png)). Passing through: the decks with "120 BPM" and a red ring on the floor. Nothing points at them yet, which is right, since the pin's still on the clothes.
13. **Cloak pegs** ([17-cloak-pegs-panel.png](17-cloak-pegs-panel.png)). "Short cloak ✓ Wearing." · The same trap again: she has no cloak on. Space did nothing; choosing "None" (∅) counted as getting dressed. I then chose Short cloak.
14. **Hats' floor** ([18-hats-floor.png](18-hats-floor.png)). The hat pin over a hat on the rug, plus E. Clear: E puts it on. The pin moves to the lathe (🪽).
15. **Lathe** ([19-lathe-panel.png](19-lathe-panel.png)). Opening it counts as taking the broom: the pin jumps to 🎶 at once. · The panel is very dense for a first visit: Tip, Chassis and Exhaust slots all empty, "0 of 9 parts found", every part locked, Sets, "Spell (R)", "Her finds, laid out like the world". Nothing says "your broom is ready".
16. **Decks** ([20-decks.png](20-decks.png)). The 🎶 pin and an E keycap at the seat. Clear.
17. **DJ booth** ([21-dj-booth.png](21-dj-booth.png), [22-dj-booth-record.png](22-dj-booth-record.png)). Records from 100 to 200 BPM (two unlocked) and "Get this party started", greyed out. · Nothing says to choose a record first. Space on 100 lit the button. The decks' tag still read 120 BPM while 100 was chosen.
18. **The party's cast** ([23-party-cast.png](23-party-cast.png)). String lights come on round the Terrace; she sits at the decks. · **Nothing on screen says what to do next**: no pin, no prompt to stand up, take off or go anywhere. (The clock reads 00:01 only because my stepping doesn't update the page's clock.)
19. **Off the deck.** Space rises and Space lands. Nothing on screen says Space flies; the only time movement is taught is WASD in the bedroom. My first landing overshot about 100 m south into an unplayable dark edge (not shot: that frame came out black because of my tool).
20. **The dancefloor booting** ([24-dancefloor-boot.png](24-dancefloor-boot.png)). The home ring's stones light up one by one as speakers. Lovely, but nothing explains it.
21. **The forest** ([25-forest.png](25-forest.png)). The clock alone at the top and the aim ring. **Nothing points to a stump or a stone**: the nearest neighbour's stump was 143 m away, and I found it from the code.
22. **Stump** ([26-stump.png](26-stump.png)). A great stump with three creature icons stacked over it and a stoat. · I saw no "[E] hold" 🎶 prompt. Holding E did nothing: the spell won't start while the area has an unfriendly grown animal (`castReady`), and **nothing says so**. Meanwhile she was hit once (4 hits to 3) by something I didn't see, and her health isn't shown anywhere I saw.
23. **Hat dropped by mistake** ([27-invited-hat-dropped.png](27-invited-hat-dropped.png)). Holding E there with nothing to cast made her **put her hat down** (E held = hat down). A pink hat pin now hovers over the stump, which a newcomer would read as the goal. Three 💌 hits turned the level-1 stoat happy (white, glowing) and its brown icon over the stump went purple.
24. **Casting** ([28-casting.png](28-casting.png)). With the hat picked up (E) and the stoat happy, holding E worked: a 🎶 ring fills top left with "100 bpm" and a colour burst comes from her. About 4 s. Reads well.
25. **Converted** ([29-converted.png](29-converted.png), [30-soundsystem.png](30-soundsystem.png)). Rainbow speaker bars, then a soundsystem standing on the stump. Good feedback. · E at the happy stoat didn't leash it (no rune in her stack); it joined the party. I never learnt what a rune or a sigil is from the screen.
26. **Waiting for wave one** ([31-before-wave-one.png](31-before-wave-one.png)). About 4 minutes of nothing: no countdown, nothing pointing anywhere. The ley pulse's progress isn't readable from where she stood.
27. **Wave one** ([32-wave-one.png](32-wave-one.png)). It landed at about 05:13 on the clock, on the stone I'd already converted, so nothing new opened that I could see. A burst at the soundsystem with no words.
28. **The party's over** ([33-party-over.png](33-party-over.png); `window.witch.lose("home")`). A 💤 pin at the screen's edge leads home. No words; the creatures settle. I didn't walk back to the bed.

## The main gaps, for the plan

1. The morning's pins are clear and well ordered. The station panels' "Wearing." on clothes she isn't wearing is the worst trap: Space does nothing, and the rule for what counts as putting a piece on differs from station to station.
2. Esc is the only "close" a newcomer knows, and it opens a developer pause page drawn over the panel. The panels' footer keys have no words.
3. From the party's cast on, the screen teaches nothing: not standing up, not flying (Space), not where the stumps are, not that an area's grown animals must be invited before the spell starts, not what the 💌s do, not runes and sigils, not the wave timing.
4. Holding E at a stump that isn't ready puts her hat down: the one action the player's been taught to do there undoes itself.
5. No health or 💌 count on screen.
