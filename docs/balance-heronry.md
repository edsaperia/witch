# Balance with the heronry (node tools/balance/sim.mjs --quick)

## Before (prototype at c40eaffd, with #181)

Balance simulator: 12 seeds (1000, 8919, …), a map of 14 × 14 areas about 168 m across; every species of normal strength; every area starting with {"babies":1,"young":1,"adults":0} and growing 0.5 a wave while wild (baby, young, adult weights 1 : 1 : 1), soundsystems 4000 hp, home 8000 hp.
Every woken area's own legend (Ed, 2026-10-04: 480 hp, 12 dps, F 76) besieges its own soundsystem and never marches on; no other legends. Evolution stops at adult (Ed, 2026-10-04), so the player's F is adults' worth at most: 29 each, so g F a minute is about g / 29 adults a minute.

Player model (a guess): their party's F grows by g a minute from the wave they start; whenever free they fight the biggest siege they can beat (square law: they keep √(theirs² − its²)), then are busy 30 s. Director (a guess): reinforcements (adults) for the next wave's areas worth (0 + 4 × minute^1.5) F a minute (by time, the same whatever the gap) × max(0, 1 + α(player F / expected − 1)), expected 50 F a minute.

### Waves every 60 s

**Idle player** (does nothing), variant a: loses at wave 23, 26, 26, 23, 28, 25, 24, 26, 25, 31, 25, 24; mean 25.5 at 31:25.

**Enemy fighting value**, idle player, variant a, at the end of each wave (mean over the seeds still going):

| wave | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 15 | 20 | 25 | 30 | 40 | 50 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| biggest siege F | 91 | 112 | 116 | 133 | 156 | 166 | 215 | 347 | 501 | 995 | 1861 | 1739 | 3848 | 0 | 0 |
| all besiegers F | 91 | 204 | 307 | 438 | 472 | 461 | 563 | 721 | 895 | 1176 | 1881 | 1739 | 3848 | 0 | 0 |
| sieges going | 1.0 | 2.0 | 3.0 | 4.0 | 4.2 | 3.8 | 3.4 | 3.1 | 2.8 | 1.8 | 1.1 | 0.6 | 1.0 | – | – |
| biggest / all | 1.00 | 0.55 | 0.38 | 0.30 | 0.33 | 0.36 | 0.38 | 0.48 | 0.56 | 0.85 | 0.99 | 1.00 | 1.00 | – | – |
| standing | 2.0 | 3.0 | 4.0 | 5.0 | 4.8 | 3.9 | 3.4 | 3.1 | 2.8 | 1.8 | 1.1 | 0.6 | 1.0 | – | – |

**How long a woken soundsystem stands** (idle player, variant a, mean over seeds, m:ss; – if none fell):

| woke at wave | 1 | 3 | 5 | 10 | 15 | 20 | 25 | 30 |
|---|---|---|---|---|---|---|---|---|
| stood for | 4:57 | 4:17 | 3:13 | 1:57 | 1:54 | 1:23 | 1:25 | 1:11 |

**Skill spread**: the wave a player growing at g F/min lasts to (mean over seeds; cap 60: "60+" when every seed got there), and the time; idle is g = 0. The last column is the survival of g 100 over g 50 (2.0 would be "twice the skill, twice the survival").

| variant | idle | g 10 | g 30 | g 50 | g 70 | g 100 | 100 / 50 |
|---|---|---|---|---|---|---|---|
| a. growth only | 24.5 (31:25) | 23.5 (30:26) | 32.2 (39:03) | 60+ | 60+ | 60+ | 1.00+ |
| b. a + attrition (50% march on) | 24.8 (31:41) | 26.4 (33:21) | 56.5 (62:49) | 60+ | 60+ | 60+ | 1.00+ |
| c. a + director, α 0 | 12.7 (19:28) | 13.6 (20:23) | 21.6 (28:12) | 33.5 (40:09) | 42.6 (49:11) | 59.1 (65:13) | 1.76 |
| c. a + director, α 0.3 | 13.6 (20:27) | 14.4 (21:15) | 22.3 (28:49) | 33.4 (39:57) | 42.4 (48:54) | 56.3 (62:44) | 1.68 |
| c. a + director, α 0.6 | 15.8 (22:36) | 15.9 (22:48) | 23.9 (30:32) | 34.4 (40:55) | 42.2 (48:39) | 54.2 (60:37) | 1.57 |
| d. b + director, α 0.3 | 15.5 (22:17) | 17.3 (23:57) | 35.7 (42:13) | 50.8 (57:13) | 60+ | 60+ | 1.18+ |
| d. b + director, α 0.6 | 17.2 (24:00) | 19.0 (25:49) | 38.3 (44:50) | 55.8 (62:18) | 60+ | 60+ | 1.07+ |
| no merging (every survivor scatters) | 60+ | 60+ | 60+ | 60+ | 60+ | 60+ | 1.00+ |

### Waves every 300 s

**Idle player** (does nothing), variant a: loses at wave 5, 4, 4, 5, 6, 6, 5, 5, 5, 4, 5, 6; mean 5.0 at 33:38.

**Enemy fighting value**, idle player, variant a, at the end of each wave (mean over the seeds still going):

| wave | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 15 | 20 | 25 | 30 | 40 | 50 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| biggest siege F | 53 | 57 | 86 | 99 | 55 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| all besiegers F | 53 | 58 | 105 | 99 | 66 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| sieges going | 1.0 | 1.1 | 1.3 | 0.8 | 0.4 | 0.0 | – | – | – | – | – | – | – | – | – |
| biggest / all | 1.00 | 0.98 | 0.82 | 1.00 | 0.85 | – | – | – | – | – | – | – | – | – | – |
| standing | 1.5 | 1.1 | 1.3 | 0.8 | 0.4 | 0.0 | – | – | – | – | – | – | – | – | – |

**How long a woken soundsystem stands** (idle player, variant a, mean over seeds, m:ss; – if none fell):

| woke at wave | 1 | 3 | 5 | 10 | 15 | 20 | 25 | 30 |
|---|---|---|---|---|---|---|---|---|
| stood for | 4:57 | 4:17 | 3:30 | – | – | – | – | – |

**Skill spread**: the wave a player growing at g F/min lasts to (mean over seeds; cap 60: "60+" when every seed got there), and the time; idle is g = 0. The last column is the survival of g 100 over g 50 (2.0 would be "twice the skill, twice the survival").

| variant | idle | g 10 | g 30 | g 50 | g 70 | g 100 | 100 / 50 |
|---|---|---|---|---|---|---|---|
| a. growth only | 4.0 (33:38) | 16.3 (94:23) | 60+ | 60+ | 60+ | 60+ | 1.00+ |
| b. a + attrition (50% march on) | 5.5 (41:22) | 50.7 (265:28) | 60+ | 60+ | 60+ | 60+ | 1.00+ |
| c. a + director, α 0 | 2.2 (23:16) | 3.0 (28:07) | 5.2 (38:07) | 6.9 (47:36) | 8.5 (55:09) | 10.1 (62:38) | 1.46 |
| c. a + director, α 0.3 | 2.3 (24:03) | 3.1 (28:42) | 5.1 (38:09) | 6.7 (46:33) | 7.1 (48:11) | 8.6 (55:23) | 1.29 |
| c. a + director, α 0.6 | 2.7 (25:09) | 3.8 (31:26) | 5.3 (38:44) | 5.8 (40:49) | 6.8 (46:19) | 6.9 (47:33) | 1.20 |
| d. b + director, α 0.3 | 2.8 (26:22) | 4.4 (34:45) | 6.9 (47:01) | 8.6 (55:11) | 10.5 (64:56) | 11.8 (71:37) | 1.38 |
| d. b + director, α 0.6 | 3.1 (28:14) | 4.8 (36:25) | 6.9 (47:37) | 8.1 (52:40) | 9.3 (59:02) | 12.0 (72:08) | 1.48 |
| no merging (every survivor scatters) | 60+ | 60+ | 60+ | 60+ | 60+ | 60+ | 1.00+ |

(97 s)

## After

Balance simulator: 12 seeds (1000, 8919, …), a map of 14 × 14 areas about 168 m across; every species of normal strength; every area starting with {"babies":1,"young":1,"adults":0} and growing 0.5 a wave while wild (baby, young, adult weights 1 : 1 : 1), soundsystems 4000 hp, home 8000 hp.
Every woken area's own legend (Ed, 2026-10-04: 480 hp, 12 dps, F 76) besieges its own soundsystem and never marches on; no other legends. Evolution stops at adult (Ed, 2026-10-04), so the player's F is adults' worth at most: 29 each, so g F a minute is about g / 29 adults a minute.

Player model (a guess): their party's F grows by g a minute from the wave they start; whenever free they fight the biggest siege they can beat (square law: they keep √(theirs² − its²)), then are busy 30 s. Director (a guess): reinforcements (adults) for the next wave's areas worth (0 + 4 × minute^1.5) F a minute (by time, the same whatever the gap) × max(0, 1 + α(player F / expected − 1)), expected 50 F a minute.

### Waves every 60 s

**Idle player** (does nothing), variant a: loses at wave 23, 26, 26, 23, 28, 25, 27, 27, 25, 31, 25, 24; mean 25.8 at 31:46.

**Enemy fighting value**, idle player, variant a, at the end of each wave (mean over the seeds still going):

| wave | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 15 | 20 | 25 | 30 | 40 | 50 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| biggest siege F | 91 | 112 | 116 | 133 | 155 | 169 | 210 | 355 | 470 | 1032 | 1827 | 1821 | 3848 | 0 | 0 |
| all besiegers F | 91 | 204 | 307 | 438 | 466 | 455 | 567 | 718 | 909 | 1184 | 1883 | 1821 | 3848 | 0 | 0 |
| sieges going | 1.0 | 2.0 | 3.0 | 4.0 | 4.3 | 3.8 | 3.5 | 3.1 | 3.1 | 1.5 | 1.3 | 0.7 | 1.0 | – | – |
| biggest / all | 1.00 | 0.55 | 0.38 | 0.30 | 0.33 | 0.37 | 0.37 | 0.49 | 0.52 | 0.87 | 0.97 | 1.00 | 1.00 | – | – |
| standing | 2.0 | 3.0 | 4.0 | 5.0 | 4.8 | 3.8 | 3.5 | 3.1 | 3.1 | 1.5 | 1.3 | 0.7 | 1.0 | – | – |

**How long a woken soundsystem stands** (idle player, variant a, mean over seeds, m:ss; – if none fell):

| woke at wave | 1 | 3 | 5 | 10 | 15 | 20 | 25 | 30 |
|---|---|---|---|---|---|---|---|---|
| stood for | 4:57 | 4:15 | 3:16 | 2:02 | 1:52 | 1:20 | 1:26 | 1:11 |

**Skill spread**: the wave a player growing at g F/min lasts to (mean over seeds; cap 60: "60+" when every seed got there), and the time; idle is g = 0. The last column is the survival of g 100 over g 50 (2.0 would be "twice the skill, twice the survival").

| variant | idle | g 10 | g 30 | g 50 | g 70 | g 100 | 100 / 50 |
|---|---|---|---|---|---|---|---|
| a. growth only | 24.8 (31:46) | 24.8 (31:39) | 32.7 (39:30) | 60+ | 60+ | 60+ | 1.00+ |
| b. a + attrition (50% march on) | 24.8 (31:46) | 25.7 (32:36) | 53.8 (60:18) | 60+ | 60+ | 60+ | 1.00+ |
| c. a + director, α 0 | 12.5 (19:20) | 13.4 (20:14) | 21.2 (27:46) | 32.6 (39:09) | 42.4 (48:58) | 58.7 (64:58) | 1.80 |
| c. a + director, α 0.3 | 13.2 (20:05) | 14.3 (21:05) | 21.5 (28:08) | 32.8 (39:14) | 42.2 (48:34) | 55.8 (62:15) | 1.70 |
| c. a + director, α 0.6 | 15.9 (22:47) | 16.2 (23:02) | 23.1 (29:44) | 33.9 (40:24) | 41.7 (48:18) | 53.6 (60:07) | 1.58 |
| d. b + director, α 0.3 | 15.3 (22:05) | 18.0 (24:44) | 35.8 (42:12) | 52.2 (58:35) | 60+ | 60+ | 1.15+ |
| d. b + director, α 0.6 | 17.3 (24:05) | 18.8 (25:39) | 38.5 (44:57) | 56.8 (63:00) | 59.9 (65:56) | 60+ | 1.06+ |
| no merging (every survivor scatters) | 60+ | 60+ | 60+ | 60+ | 60+ | 60+ | 1.00+ |

### Waves every 300 s

**Idle player** (does nothing), variant a: loses at wave 6, 4, 4, 5, 6, 6, 5, 5, 5, 5, 5, 6; mean 5.2 at 34:15.

**Enemy fighting value**, idle player, variant a, at the end of each wave (mean over the seeds still going):

| wave | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 15 | 20 | 25 | 30 | 40 | 50 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| biggest siege F | 53 | 57 | 86 | 111 | 68 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| all besiegers F | 53 | 58 | 105 | 111 | 77 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| sieges going | 1.0 | 1.1 | 1.3 | 0.8 | 0.5 | 0.0 | – | – | – | – | – | – | – | – | – |
| biggest / all | 1.00 | 0.98 | 0.82 | 1.00 | 0.88 | – | – | – | – | – | – | – | – | – | – |
| standing | 1.5 | 1.1 | 1.3 | 0.8 | 0.5 | 0.0 | – | – | – | – | – | – | – | – | – |

**How long a woken soundsystem stands** (idle player, variant a, mean over seeds, m:ss; – if none fell):

| woke at wave | 1 | 3 | 5 | 10 | 15 | 20 | 25 | 30 |
|---|---|---|---|---|---|---|---|---|
| stood for | 4:57 | 4:15 | 3:22 | – | – | – | – | – |

**Skill spread**: the wave a player growing at g F/min lasts to (mean over seeds; cap 60: "60+" when every seed got there), and the time; idle is g = 0. The last column is the survival of g 100 over g 50 (2.0 would be "twice the skill, twice the survival").

| variant | idle | g 10 | g 30 | g 50 | g 70 | g 100 | 100 / 50 |
|---|---|---|---|---|---|---|---|
| a. growth only | 4.2 (34:15) | 15.7 (91:21) | 60+ | 60+ | 60+ | 60+ | 1.00+ |
| b. a + attrition (50% march on) | 5.8 (42:54) | 47.8 (251:10) | 60+ | 60+ | 60+ | 60+ | 1.00+ |
| c. a + director, α 0 | 2.3 (23:14) | 3.1 (28:14) | 5.3 (38:36) | 6.8 (46:58) | 8.3 (54:18) | 9.6 (60:18) | 1.40 |
| c. a + director, α 0.3 | 2.3 (23:48) | 3.0 (28:30) | 5.1 (38:10) | 6.8 (46:27) | 7.1 (48:00) | 8.5 (54:34) | 1.24 |
| c. a + director, α 0.6 | 2.6 (25:01) | 3.6 (30:23) | 5.4 (39:05) | 5.8 (40:55) | 6.6 (45:34) | 6.9 (47:39) | 1.20 |
| d. b + director, α 0.3 | 2.8 (26:24) | 4.4 (34:25) | 6.9 (46:55) | 8.6 (55:10) | 10.5 (65:01) | 12.2 (73:18) | 1.42 |
| d. b + director, α 0.6 | 3.1 (28:31) | 4.6 (35:38) | 7.1 (48:15) | 7.9 (51:50) | 9.1 (57:51) | 12.1 (73:01) | 1.53 |
| no merging (every survivor scatters) | 60+ | 60+ | 60+ | 60+ | 60+ | 60+ | 1.00+ |

(102 s)
