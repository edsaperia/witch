# Link switches

Every `?name=value` the game reads from its link, and where it reads it (overnight programme, phase 1, 2026-10-07). Most are
read once as the page loads (`src/app/linkParams.ts` for the tuning, `src/app/gameParams.ts` for the game,
`src/app/viewParams.ts` for the view, `src/main.ts` for the page); a few are read where they're used. Several can be combined:
`?seed=123&wave=30&creator=0`.

Survey: every switch below is still read, and every page element it names still exists. None was dead. The ones kept only to
compare against an older look were retired on 2026-10-07 (the list at the end).

## The run

| switch | does | read in |
|---|---|---|
| `seed=<n>` | the run's seed (a random one is put in the link when it's missing) | main.ts |
| `wave=<s>` / `wave=off` | seconds between waves (0 or off: none); otherwise the start screen's last pick, else the tuning's | app/gameParams.ts |
| `spell=auto` / `spell=wait` | the party spell: `auto` starts at once anywhere; `wait` keeps her at the decks even with `creator=0` | app/gameParams.ts |
| `creator=0` | no character creator: the plain start card (the tools and the smoke runs) | main.ts, app/gameParams.ts |
| `bot=skilled\|crude\|…` | a bot plays the run (rules/bot.ts), with a seeded witch | main.ts |
| `dev=0` | hides the bedroom's dev "Player:" pick | app/playerPick.ts |
| `room=<S>` | the creator's room drawn at this scale | ui/creator.ts |
| `shake=0` | no screen shake (else the start screen's choice) | app/shake.ts |
| `areaSize=<m>`, `areaScale=<k>`, `treetopSpeed=<m/s>`, `mapAreas=<n>` | the world's size and travel speed, remembered on this browser till changed | app/linkParams.ts |
| `shape=square\|circle` | the map's shape (circle, the default since 2026-10-06) | app/linkParams.ts |
| `slow=0` / `slow=<k>` | legend circles slowing time: off, or another speed (0 < k < 1) | app/linkParams.ts |
| `picker=route\|noisy\|near3\|near3touch\|nearest` | how the party picks the next area to wake | app/linkParams.ts |
| `d_<id>=<v>` | a choice from Ed's decisions panel (ui/decide.ts) | ui/decide.ts |

## Debug and tools

| switch | does | read in |
|---|---|---|
| `debug` | the debug overlay and the metre rulers on from the start | main.ts, app/keys.ts |
| `debug=cull` | tints whatever just appeared or vanished (pops) | app/viewParams.ts |
| `debug=shadows` | every shadow a flat magenta | app/viewParams.ts |
| `debug=attack` | every 10 s, blows on the two farthest soundsystems (never felling one), for the 🔇 alarm | main.ts |
| `quick=1` | only the art the start needs (the quick smoke and bench) | app/viewParams.ts |
| `scenery=<m>` | a fixed scenery radius instead of the adaptive budget | app/viewParams.ts |
| `arena=wolf*4@2,beetle*3` | a fight below the dancefloor, no waves; J sets it up again | app/gameParams.ts |
| `buffs=fox,toad\|all` | these legends' buffs on from the start | app/gameParams.ts |
| `quest=1` | the first quest's demo: beside the nearest sleeping legend with its dream on her stack | app/gameParams.ts |
| `partyover=1` | the party's over from the start (the afterparty) | app/gameParams.ts |
| `witches=<n>` | this many more party witches | app/linkParams.ts |
| `playtest=download` | saves the playtest log at load (as L does) | main.ts |
| `decide` | opens Ed's decisions panel (F2 too) | main.ts |
| `micCheck=1` | also listens to the microphone for dropouts after the game (debug only) | main.ts |
| `music=off\|<section>\|wave<N>` | no music, one section on a loop, or wave N's music | app/linkParams.ts |
| `perf=1` | the performance panel, always on: frames, hitches, the rules' step, the view's parts (draw split into the scene and the post passes), GL calls, the JS heap and its collections, the crowd and its level of detail | app/perfHud.ts |
| `rig=0` | creatures as baked sprites, without the live rig | render/rig/rigView.ts |

## Looks and their costs (to try values live, or to measure)

| switch | does | read in |
|---|---|---|
| `px=2..6` | the art pixel (screen pixels per art pixel) | app/linkParams.ts |
| `style=ref` | Ed's reference pixel-art treatment (bold, the default, otherwise) | app/viewParams.ts |
| `flora=new\|fantasy\|all\|<ids>` | every wooded area grows these tree species | app/viewParams.ts |
| `tilt=off` / `tilt=<strength>,<band>` | the treetops' tilt-shift off, or tried at these values | app/linkParams.ts |
| `bloom=off`, `shadows=off`, `canopy=off`, `mist=off`, `sky=off` | each effect off | app/linkParams.ts |
| `glow=<reach>,<falloff>,<near>` | the witch's glow (0 keeps a value) | app/linkParams.ts |
| `blend=off` / `blend=<warp>,<fine>,<band>` | neighbouring floors meet on a plain edge, or tuned | app/linkParams.ts |
| `border=<twinkle>,<swapRate>,<swapBeat>` | the party border's sparkle | app/linkParams.ts |
| `lights=<n>` | the light budget (0 none) | app/linkParams.ts |
| `grass=0..2` | how thick the ground cover is | app/linkParams.ts |
| `wind=<strength>` | the wind's sway (0 still) | app/linkParams.ts |
| `relief=<strength>` | the ground's fake relief (0 flat) | app/linkParams.ts |
| `hills=0` / `hills=<m>` | the rolling ground flat, or this tall | app/linkParams.ts |
| `ley=0`, `trail=0`, `knock=0` | no ley lines; no trail behind her; no knockback and stagger when she's hit | app/linkParams.ts |
| `bare=1\|2` | the terrain on its own (2: grey, with contours and a grid) | app/linkParams.ts |
| `clouds=<n>` | how many clouds | app/linkParams.ts |
| `curve=<k>` | the world's bend over the treetops (0 off) | app/linkParams.ts |
| `light=spooky\|plain` | the lighting's mood | app/linkParams.ts |
| `moonbeams=on` | the moonbeams (off by default) | app/linkParams.ts |

## Retired, 2026-10-07 (awaiting Ed)

Twelve switches that brought back an older look or behaviour, to compare against what replaced it, are gone with their old
code paths (the coordinator's recommendation to Ed: all but `moonbeams=on`, which stays above). A link that still names one
plays as the default does.

| switch | brought back | what stays |
|---|---|---|
| `tilt=before\|after` | the tilt-shift applied before or after the upscale | before (at the low resolution); `tiltShift.where` gone |
| `tiltsky=0` | the sky left sharp by the tilt-shift | `tiltShift.skyBlur` (the decisions panel's slider); `tiltShift.sky` gone |
| `find=0` | the forest without the find-in-the-dark looks | always on; `find.on` gone |
| `rune=beam\|column\|both` | one of the ways an awake runestone shows | both; `runeMarkers.awakeStyle` gone |
| `picker=…` and `route=varied` | the older ways of picking the next area to wake | the spiral route (and the noisy picker as its own fallback); near3, near3touch, nearest, `variedOrder` and `party.route` gone |
| `fx=pixel` | mist, haze and dapple as dithered pixel steps | smooth; `fx` and the shaders' `uSmooth`, `uBands` and `uDither` paths gone |
| `props=hand` | the hand-made props | the prop generator (the Art Lab and `art/check.mjs` still draw both) |
| `texture=0` | creatures without fur, feathers and scales | the Art Lab's own knob, `style.texture` |
| `subpixel=0` | the camera's whole-art-pixel steps | the glide |
| `glide=camera` | the glide by the camera's snap | by the witch's; `view.glide` and the decisions panel's choice gone |
| `style=now` | the art before the pixel-art treatment | bold (and `style=ref`); the decisions panel's "As now" gone |
| `wind=smooth` | the old per-pixel sway | the pixel wind; `uPixelWind` gone |
