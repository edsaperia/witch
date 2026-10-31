# Link switches

<!-- Written by tools/config/linkSwitches.mjs from config/link-switches.json: edit that, not this. -->

Every `?name=value` the game reads from its link, and where it reads it. Most are read once as the page loads (`src/app/linkParams.ts` for the tuning, `src/app/gameParams.ts` for the game, `src/app/viewParams.ts` for the view, `src/main.ts` for the page); a few are read where they're used. Several can be combined: `?seed=123&wave=30&creator=0`. This page is written from `config/link-switches.json`, and a test checks that file against the code.

## The run

What the night is: its seed, island, world, opening, sail and her kit.

| switch | does | since | read in |
|---|---|---|---|
| `areaScale=<k>` | Each area's size as a multiple of the tuning's, for this load only (never remembered). | 2026-10-07 | app/linkParams.ts |
| `areaSize=<m>` | Each area's size in metres for this load only (never remembered: it changes the balance). | 2026-10-07 | app/linkParams.ts |
| `arrive=1` | The night opens with the sea chart's arrival flight (a sail sets it); the boot's map isn't made ahead. | 2026-10-12 | index.html, app/night.ts, main.ts |
| `bot=skilled` / `bot=crude` / `bot=…` | A bot plays the run (rules/bot.ts), with a seeded witch. | 2026-10-06 | main.ts |
| `chart` / `chart=all` | Opens the sea chart page instead of the game; all shows every island. | 2026-10-11 | index.html, app/chartPage.ts |
| `creator=0` | No character creator: the plain start card (the tools and the smoke runs). | 2026-10-05 | app/fightArena.ts, app/gameParams.ts, app/nightSave.ts, app/opening.ts, app/pageNight.ts, main.ts, render/ground.ts |
| `dev=0` / `dev=finds` | Hides the bedroom's dev "Player:" pick (0), or opens the finds dev panel (finds). | 2026-10-04 | app/playerPick.ts, main.ts |
| `fightMomentum=<k>` | The creatures' momentum in a fight for this load (the debug overlay's slider; never remembered). | 2026-10-07 | app/knobs.ts |
| `fightScale=<k>` | The fight's scale for this load (the debug overlay's slider; never remembered). | 2026-10-07 | app/knobs.ts |
| `fightSpeed=<k>` | The fight's speed for this load (the debug overlay's slider; never remembered). | 2026-10-07 | app/knobs.ts |
| `hat=<id>` / `hat=none` | She wears this hat for one load (and owns it for that load). | 2026-10-11 | app/debugUnlock.ts, app/hatSave.ts, app/loadout.ts |
| `hats=all` / `hats=<id>,…` | These hats are hers for one load, instead of her save. | 2026-10-23 | app/hatSave.ts |
| `island=<kind>` / `island=home` / `island=<n>` | Play this kind's island, home, or a random island of n areas. | 2026-10-11 | app/linkParams.ts, app/sail.ts, main.ts, platform/online/entry.ts |
| `mapAreas=<n>` | How many areas the map has, for this load only (never remembered). | 2026-10-07 | app/linkParams.ts |
| `opening=old` / `opening=chart` | The first load's start: `old`, the bedroom as the loading cover (the creator); `chart`, the new opening's sea chart (the default since 2026-10-21, the tuning's `opening.chart`). A link naming a seed or island wakes her in her bedroom too (Ed, 2026-10-25); one starting a bot game or the zoo, or with `creator=0`, keeps the old start anyway; the tools that drive the old start (the creator, the start card) put `opening=old` in their links. *Decision: The sea chart opening is the default (2026-10-21).* | 2026-10-20 | app/opening.ts |
| `phase=0` / `phase=1` / `phase=2` / `phase=3` / `phase=4` / `phase=5` | An island of that phase's shape, of random area types. | 2026-10-11 | app/linkParams.ts |
| `pulse=<m/s>` / `pulse=off` | How fast the ley pulse spreads the party, for one load; off holds the waves where they are. | 2026-10-09 | app/gameParams.ts |
| `room=<S>` | The creator's room drawn at this scale, or the online prototype's seven-digit room number. | 2026-10-06 | platform/online/entry.ts, ui/creator.ts |
| `sail=inplace` / `sail=reload` | How a sail starts the next night: in place, or by loading the island's link. | 2026-10-20 | app/sail.ts |
| `seed=<n>` | The run's seed (a random one is put in the link when it's missing). | 2026-10-04 | app/sail.ts, main.ts, platform/online/entry.ts |
| `shake=0` | No screen shake (else the start screen's choice). | 2026-10-07 | app/shake.ts |
| `shape=square` / `shape=circle` | The map's shape (circle, the default since 2026-10-06). *Decision: Circle is the default (2026-10-06).* | 2026-10-07 | app/linkParams.ts |
| `slow=0` / `slow=<k>` | Legend circles slowing time: off, or another speed (0 < k < 1). | 2026-10-07 | app/linkParams.ts |
| `spell=auto` / `spell=wait` | The party spell: `auto` starts at once anywhere; `wait` keeps her at the decks even with `creator=0`. | 2026-10-07 | app/gameParams.ts |
| `treetopSpeed=<m/s>` | Her treetop speed for this load only (never remembered: it changes the balance). | 2026-10-07 | app/linkParams.ts |
| `wave=<n>` / `wave=off` | The repro link: the night brought on to wave n before play; off holds the waves where they are (as pulse=off). | 2026-10-07 | app/gameParams.ts, app/repro.ts |
| `world=<n>` / `world=<text>` | The campaign's world seed (every island's shape) for this load. | 2026-10-11 | app/chartPage.ts, app/linkParams.ts, app/pageNight.ts, app/sail.ts, main.ts |
| `resume=0` / `resume=1` | Disable night saves, or explicitly enable them on a debug or automated link. | 2026-10-29 | app/nightSave.ts |

## Looks and their costs

How the world is drawn, to try values live or to measure.

| switch | does | since | read in |
|---|---|---|---|
| `bare=1` / `bare=2` | The terrain on its own (2: grey, with contours and a grid). | 2026-10-07 | app/linkParams.ts |
| `biome=<name>` / `biome=<a\|b\|w>` | Every area's trees and props in that biome's look (or a blend of two), over the island's own. | 2026-10-23 | app/viewParams.ts |
| `blend=off` / `blend=<warp>,<fine>,<band>` | Neighbouring floors meet on a plain edge, or tuned. | 2026-10-07 | app/linkParams.ts |
| `bloom=off` | The bloom off. | 2026-10-07 | app/linkParams.ts |
| `border=<twinkle>,<swapRate>,<swapBeat>` | The party border's sparkle. | 2026-10-07 | app/linkParams.ts |
| `canopy=off` | The canopy off. | 2026-10-07 | app/linkParams.ts |
| `carrier=<kind>` / `carrier=none` | That kind's legend carries the treehouse Ent, wherever she is; none, no one. | 2026-10-12 | app/linkParams.ts |
| `clouds=<n>` | How many clouds. | 2026-10-07 | app/linkParams.ts |
| `creatures=<k>` | Creatures drawn at this size against the style's (1 is the size before Ed's +50%). | 2026-10-08 | app/viewParams.ts |
| `curve=<k>` | The world's bend over the treetops (0 off). | 2026-10-07 | app/linkParams.ts |
| `dive=near` / `dive=far` / `dive=skim` | Where the chart's flight hands over to the game's dive, for one load (Ed, 2026-10-24). | 2026-10-24 | app/chartView.ts |
| `dodge=a,b,c` / `dodge=0` | Which dodge changes are on (Ed, 2026-10-08; all by default): a committed strikes, b predictive aim, c packs cutting off her retreat. *Decision: All on by default (Ed, 2026-10-08).* | 2026-10-09 | app/linkParams.ts |
| `flora=new` / `flora=fantasy` / `flora=all` / `flora=<ids>` | Every wooded area grows these tree species. | 2026-10-07 | app/viewParams.ts |
| `glow=<reach>,<falloff>,<near>` | The witch's glow (0 keeps a value). | 2026-10-07 | app/linkParams.ts |
| `grass=0..2` | How thick the ground cover is. | 2026-10-07 | app/linkParams.ts |
| `hills=0` / `hills=<m>` | The rolling ground flat, or this tall. | 2026-10-07 | app/linkParams.ts |
| `hole=off` / `hole=all` | The canopy's hole round her off, or as big as the screen. | 2026-10-13 | app/linkParams.ts |
| `knock=0` | No knockback or stagger on her. | 2026-10-07 | app/linkParams.ts |
| `ladder=off` / `ladder=auto` / `ladder=<n>` | The quality ladder off, on under automation, or pinned at rung n. | 2026-10-27 | app/ladder.ts |
| `lakelook=water` / `lakelook=ice` / `lakelook=glacier` / `lakelook=lava` / `lakelook=oasis` / `lakelook=sinkhole` / `lakelook=tarn` / `lakelook=tar` / `lakelook=rust` / `lakelook=lily` | Every lake takes this look. | 2026-10-23 | render/lakeLooks.ts |
| `ley=0` | No ley lines through the runestones. | 2026-10-07 | app/linkParams.ts |
| `light=spooky` / `light=plain` | The lighting's mood. | 2026-10-07 | app/linkParams.ts |
| `lights=<n>` | The light budget (0 none). | 2026-10-07 | app/linkParams.ts |
| `mist=off` | The mist off. | 2026-10-07 | app/linkParams.ts |
| `px=2..6` | The art pixel (screen pixels per art pixel). | 2026-10-07 | app/linkParams.ts |
| `relief=<strength>` | The ground's fake relief (0 flat). | 2026-10-07 | app/linkParams.ts |
| `reveal=legend` / `reveal=runestone` / `reveal=find` / `reveal=flask` / `reveal=all` / `reveal=none` | Which places she stands in are kept clear of the canopy (a comma list). | 2026-10-26 | app/linkParams.ts |
| `shadows=off` | The shadows off. | 2026-10-07 | app/linkParams.ts |
| `sky=off` | The night sky off. | 2026-10-07 | app/linkParams.ts |
| `style=ref` | Ed's reference pixel-art treatment (bold, the default, otherwise). | 2026-10-07 | app/viewParams.ts |
| `tilt=off` / `tilt=<strength>,<band>` | The treetops' tilt-shift off, or tried at these values. | 2026-10-07 | app/linkParams.ts |
| `trail=0` | No trail behind her. | 2026-10-07 | app/linkParams.ts |
| `trunks=soft` / `trunks=hard` / `trunks=off` | The trunks' shadows from her glow and the campfires in ground mode. | 2026-10-12 | app/linkParams.ts |
| `wind=<strength>` | The wind's sway (0 still). | 2026-10-07 | app/linkParams.ts |

## Debug and tools

For the builders, the smoke and bench runs, the repro link and the arenas.

| switch | does | since | read in |
|---|---|---|---|
| `layout=ed` | Opt-in Ed house layout preview; the default house stays unchanged. | 2026-10-31 | main.ts |
| `recording=0` / `recording=1` | Profile-only: 0 disables input recording and incremental log journalling; ordinary games keep both enabled. | 2026-10-30 | platform/diagnosticMode.ts |
| `restore=comment` | Builder loader: consume the comment snapshot selected on the pause page, restoring that exact saved moment paused on the same build. | 2026-10-30 | main.ts |
| `poolreadability=0` / `poolreadability=1` | Review-only dark-creature lighting inside the witch's light pool (1 enables it; off by default). | 2026-10-30 | render/sprites.ts |
| `heldInputMs=<milliseconds>` | The online prototype holds the last guest movement input for this long before returning it to neutral (250 ms by default). | 2026-10-30 | platform/online/entry.ts |
| `invite=<token>` | The online prototype reads this invitation token from the URL fragment to join the host's room. | 2026-10-30 | platform/online/entry.ts |
| `online=host` / `online=guest` | The separate online prototype page hosts a night or joins an invitation. | 2026-10-30 | platform/online/entry.ts |
| `relay=<WebSocket URL>` | The separate online prototype page connects to this relay (ws://localhost:8787 by default). | 2026-10-30 | platform/online/entry.ts |
| `all` | With ?zoo, every island counts as found (the map's see-all); on the sea chart page, every island is shown. | 2026-10-11 | app/chartPage.ts, app/linkParams.ts |
| `arena=wolf*4@2,beetle*3` | A fight below the dancefloor, no waves; J sets it up again. | 2026-10-07 | app/gameParams.ts |
| `artdelay=<s>` | Each area type's trees drawn ahead of need held back to land one every that many seconds, to watch the loading mist roll away. | 2026-10-24 | app/viewParams.ts |
| `at=<x>,<z>` | The repro link: she starts at this spot (in the treetops with mode=treetop). | 2026-10-14 | app/repro.ts |
| `attack=<attack as JSON>` | The Fight Arena or a debug arena tries this attack (an attack spec, as JSON) on its pack. | 2026-10-27 | app/fightArena.ts, app/gameParams.ts |
| `audio=lite` / `audio=full` | The sound's weight for one load: lite sheds the costly parts (platform/audio/shed.ts). | 2026-10-07 | app/sound.ts |
| `bag=starter` / `bag=quick` / `bag=far` / `bag=none` / `bag=<bag item id>` | Her bag for one load: the Satchel (the starter: base rate and reach, a little homing), the Bumbag (faster 💌s, shorter reach) or the Purse (slower, further); none, no bag. | 2026-10-29 | app/linkParams.ts |
| `cauldron=0` | Mushroom collecting and the kitchen cauldron (two home mushroom clusters, shared baskets and pot, and the BBB Mirror Floor trip) are on by default; 0 turns them off. | 2026-10-30 | app/pageFrame.ts |
| `cleared=<cx>_<cy>,…` | The repro link: these areas start cleared. | 2026-10-14 | app/repro.ts |
| `debug` / `debug=cull` / `debug=shadows` / `debug=attack` | The debug overlay and the metre rulers on from the start; cull also tints whatever just appeared or vanished (pops), shadows draws every shadow a flat magenta, and attack blows on the two farthest soundsystems every 10 s (never felling one). | 2026-10-04 | app/keys.ts, app/night.ts, app/pageDebug.ts, app/pageNight.ts, app/playerPick.ts, app/viewParams.ts, main.ts, render/ground.ts |
| `decide` | Opens Ed's decisions panel (F2 too). | 2026-10-06 | main.ts, ui/decide.ts |
| `decor=0` | The treehouse rooms without their decoration. | 2026-10-23 | render/houseDecor.ts |
| `dream=won:<kind>:<item>` / `dream=lost:<kind>:<item>` | Her dream of a loaned find over the night, at once, for a look at it. | 2026-10-24 | main.ts |
| `fight` / `fight=<seed>` | The Fight Arena: straight into a fight with a seeded pack (a new seed when blank). | 2026-10-27 | app/fightArena.ts, app/gameParams.ts |
| `found=<kind>,…` | These islands count as found for this load, whatever the browser's save says (the repro link). | 2026-10-14 | app/linkParams.ts |
| `furniture=0` | The treehouse rooms without their furniture. | 2026-10-23 | render/houseFurniture.ts |
| `kit=full` | Her kit stays full while the party spell waits (otherwise she starts with a fresh kit). | 2026-10-26 | app/gameParams.ts |
| `latency=<category>` / `latency=<seconds>` | The audio output buffer for one load: a latency category or seconds. | 2026-10-07 | app/sound.ts |
| `loadmist=1` / `loadmist=0` | The loading mist (render/loadingMist.ts) on or off for this load, whatever the tuning and `quick=1` say (it's off under `quick=1`). | 2026-10-24 | app/viewParams.ts |
| `lookdemo=telegraphs` / `lookdemo=elements` / `lookdemo=fx` / `lookdemo=fx:<element>` | The attack looks' showcase round her; fx shows the production magic family and intensity ladder with ground and camera controls. | 2026-10-27 | render/leash/combat.ts |
| `fxmock=1` / `fxmock=iso` / `fxmock=frost` | Show the original fire and frost mock for comparison with the production effects. | 2026-10-29 | render/view.ts |
| `micCheck=1` | Also listens to the microphone for dropouts after the game (debug only). | 2026-10-06 | main.ts |
| `mistgate=0` | The bedroom's curtains and door don't wait for the island's art, so she can go out while it's still drawing. | 2026-10-24 | main.ts |
| `mode=treetop` | The repro link: with at=, she starts in the treetops. | 2026-10-14 | app/repro.ts |
| `music=off` / `music=live` / `music=<section>` / `music=wave<N>` | No music, the music played live rather than the pre-recorded way (the default since Ed, 2026-10-27), one section on a loop, or wave N's music. *Decision: Pre-recorded (drawn-ahead) music is the default (Ed, 2026-10-27).* | 2026-10-07 | app/linkParams.ts, app/sound.ts |
| `occlusion=off` | The occlusion probes off. | 2026-10-19 | render/view/lifecycle.ts |
| `own=all` / `own=none` / `own=<kind>:<item>` / `own=<kind>:*` | Finds given or let go on this browser's saves, as the dev control does. | 2026-10-23 | app/linkParams.ts |
| `pack=wolf*4@2,…` | The Fight Arena's pack, written as an arena, instead of a rolled one. | 2026-10-27 | app/fightArena.ts |
| `parts=<part>,…` | Her broom's parts for one load, found or not. | 2026-10-23 | app/linkParams.ts |
| `partyover=1` | The party's over from the start (the afterparty). | 2026-10-06 | app/gameParams.ts, platform/audio/sfxCues.ts, render/view.ts |
| `perf=1` | The performance panel, always on: frames, hitches, the rules' step, the view's parts (draw split into the scene and the post passes), GL calls, the JS heap and its collections, the crowd and its level of detail. | 2026-10-07 | main.ts |
| `pixels=keep` | The art atlases keep their pixels on the page (the smoke test's floating check reads them). | 2026-10-13 | main.ts |
| `playtest=download` | Saves the playtest log at load (as L does). | 2026-10-04 | main.ts |
| `precision=high` / `precision=medium` / `precision=low` | Every shader's float precision. | 2026-10-14 | render/view.ts |
| `prepChart=1` / `prepChart=0` | The sea chart made ahead even under automation (1), or never (0). | 2026-10-19 | main.ts |
| `quest=1` | The first quest's demo: beside the nearest sleeping legend with its dream on her stack. | 2026-10-07 | app/gameParams.ts |
| `quick=1` | Only the art the start needs (the quick smoke and bench). | 2026-10-07 | app/viewParams.ts, platform/online/relayClient.ts |
| `rig=0` | Creatures as baked sprites, without the live rig. | 2026-10-05 | render/rig/rigView.ts |
| `scenery=<m>` | A fixed scenery radius instead of the adaptive budget. | 2026-10-07 | app/viewParams.ts |
| `set=<path>=<value>;…` | Any tuning settings for one load (the repro link's: every setting changed from the build's). | 2026-10-14 | app/linkParams.ts, app/mapPrep.ts, app/night.ts, app/sail.ts |
| `shot=object:<id>` / `shot=room:<id>` / `shot=area:<type>` / `shot=creature:<species>[@level]` / `shot=find:<kind>:<item>` / `shot=at:<x>,<z>` | A builder's quick proof shot: only the art the scene needs, with her put at it. | 2026-10-23 | app/gameParams.ts, app/pageFinds.ts, app/shot.ts |
| `spawnfind=<kind>:<item>` / `spawnfind=tonight` | That find spawned once where she first stands on open ground, for shots. | 2026-10-23 | main.ts |
| `telescopeRes=<k>` | The telescope's render resolution. | 2026-10-21 | app/pageStations.ts |
| `timing=1` / `timing=0` | The frame-timing log on (kept on this browser) or off. | 2026-10-19 | app/timing.ts |
| `tuning=<preset>` | A tuning preset laid over the config files for this load. | 2026-10-07 | platform/tuningPreset.ts |
| `warmChart=1` / `warmChart=0` | The night's chart islands made ahead even under automation (1), or never (0). | 2026-10-12 | main.ts |
| `witches=<n>` | This many more party witches. | 2026-10-07 | app/linkParams.ts |
| `zoo` | The zoo: every area an island laid out like the sea chart, home a plaza, no timer. | 2026-10-13 | app/linkParams.ts, main.ts |
| `zoom=<n>` | The repro link: the camera's zoom step. | 2026-10-14 | app/repro.ts |
| `newWitch=1` | This load as a brand-new witch (the pause page's Try as a new witch): the game's default look (config/default-look.json), the starting wardrobe, the default broom and no hats found, her saves of those neither read nor written. | 2026-10-29 | app/defaultLook.ts |

## Compare with the old

Each brings back how something was before a change, to compare against what replaced it.

| switch | does | since | read in |
|---|---|---|---|
| `area=off` | Scenery isn't averaged where it shrinks (a performance suspect, to compare). | 2026-10-14 | app/linkParams.ts |
| `attacks=old` | Every species fights with its old attacks from config/combat.json, not its own in the attack grammar. *Decision: Each species' own attack is the default (Ed, 2026-10-27, #1326).* | 2026-10-27 | app/linkParams.ts |
| `snap=0` | The picture's pixels as the pixel size has them, not snapped to whole device pixels (pixels.snap), to compare. | 2026-10-29 | app/linkParams.ts |
| `creatureSizeCandidate=0` / `creatureSizeCandidate=1` | Revised creature sizes are on by default; 0 compares the previous sizes. | 2026-10-31 | app/viewParams.ts |
| `creatureModels=<species>:<variant>,...` | Selects available experimental creature records per species; omitted, current or unavailable variants keep the current art. | 2026-10-30 | app/viewParams.ts |
| `cullpass=0` | Each see-through pass isn't culled by the kind of pixel it keeps, as before the performance pass. | 2026-10-24 | render/sprites.ts |
| `cut=pixel` / `cut=whole` | The canopy cut away round her pixel by pixel, or each crown whole (performance suspects). | 2026-10-14 | app/linkParams.ts |
| `hiz=0` | The depth-pyramid culling off, to compare. | 2026-10-23 | render/view.ts |
| `look=old` | Fights drawn with the old attack look, not the attack looks and elements. | 2026-10-27 | render/leash/combat.ts |
| `magic=old` / `magic=layers` | Compare the old attack artwork with the layered magic effects. | 2026-10-30 | render/fx/system.ts |
| `moonbeams=on` | The moonbeams (off by default). *Decision: Kept when the other compare switches were retired (2026-10-07).* | 2026-10-07 | app/linkParams.ts |
| `occ=off` | The occlusion fade (what's in front of her drawn see-through) off. | 2026-10-13 | app/linkParams.ts |
| `seedepth=off` | The see-through pass doesn't write depth, as before. | 2026-10-13 | render/sprites.ts |
| `sigils=new` / `sigils=old` / `sigils=bold` | Rank sigils and the 6 m leash grid (new, the default), or the old sigils and their 4 m grid; bold, the rank sigils drawn bold where a species has its bold sigil (art/sigils.js BOLD). *Decision: Rank sigils are the default (Ed, 2026-10-27: "go ahead and push all the new sigil work").* | 2026-10-27 | app/linkParams.ts |
| `cast=1` / `cast=0` | The runestone stacks and the soundsystem spell on (1, the default since their view landed) or off (0): off, areas clear by themselves once their wild are gone, as before. *Decision: On by default with Rendering’s view of the stacks (#1378; off till then, the coordinator, 2026-10-28).* | 2026-10-28 | app/linkParams.ts |
| `wholecull=0` | Quads faded whole drawn in the solid and front passes too, as before. | 2026-10-26 | render/sprites.ts |

## Families

Switches named by a pattern, read where the name is built (the test can't see these).

| switch | does | read in |
|---|---|---|
| `d_<id>=<v>` | A choice from Ed's decisions panel (ui/decide.ts), kept in the link. | app/sail.ts, ui/decide.ts, ui/decisions.ts |

## Retired

Switches that brought back an older look or behaviour, to compare against what replaced it, gone with their old code paths (2026-10-07, the coordinator's recommendation to Ed). A link that still names one plays as the default does.

| switch | brought back | what stays |
|---|---|---|
| `tilt=before\|after` | the tilt-shift applied before or after the upscale | before (at the low resolution); `tiltShift.where` gone |
| `tiltsky=0` | the sky left sharp by the tilt-shift | `tiltShift.skyBlur` (the decisions panel's slider); `tiltShift.sky` gone |
| `find=0` | the forest without the find-in-the-dark looks | always on; `find.on` gone |
| `rune=beam\|column\|both` | one of the ways an awake runestone shows | both; `runeMarkers.awakeStyle` gone |
| `picker=…` | the older ways of picking the next area to wake | the spiral route (and the noisy picker as its own fallback); near3, near3touch, nearest, `variedOrder` and `party.route` gone |
| `route=varied` | the older ways of picking the next area to wake | the spiral route (and the noisy picker as its own fallback); near3, near3touch, nearest, `variedOrder` and `party.route` gone |
| `fx=pixel` | mist, haze and dapple as dithered pixel steps | smooth; `fx` and the shaders' `uSmooth`, `uBands` and `uDither` paths gone |
| `props=hand` | the hand-made props | the prop generator (the Art Lab and `art/check.mjs` still draw both) |
| `texture=0` | creatures without fur, feathers and scales | the Art Lab's own knob, `style.texture` |
| `subpixel=0` | the camera's whole-art-pixel steps | the glide |
| `glide=camera` | the glide by the camera's snap | by the witch's; `view.glide` and the decisions panel's choice gone |
| `style=now` | the art before the pixel-art treatment | bold (and `style=ref`); the decisions panel's "As now" gone |
| `wind=smooth` | the old per-pixel sway | the pixel wind; `uPixelWind` gone |
