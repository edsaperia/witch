Balance simulator: 12 seeds (1000, 8919, …), a map of 14 × 14 areas about 168 m across; every species of normal strength; every area starting with {"babies":1,"young":1,"adults":0} and growing 1 a wave while wild (baby, young, adult weights 1 : 1 : 1), soundsystems 4000 hp, home 8000 hp.
Every woken area's own legend (Ed, 2026-10-04: 480 hp, 12 dps, F 76) besieges its own soundsystem and never marches on; no other legends. Evolution stops at adult (Ed, 2026-10-04), so the player's F is adults' worth at most: 29 each, so g F a minute is about g / 29 adults a minute.

Player model (a guess): their party's F grows by g a minute from the wave they start; whenever free they fight the biggest siege they can beat (square law: they keep √(theirs² − its²)), then are busy 30 s. Director (a guess): reinforcements (adults) for the next wave's areas worth (0 + 4 × minute^1.5) F a minute (by time, the same whatever the gap) × max(0, 1 + α(player F / expected − 1)), expected 50 F a minute.

### Waves every 60 s

**Idle player** (does nothing), variant a: loses at wave 15, 15, 17, 13, 14, 13, 15, 13, 15, 16, 15, 16; mean 14.8 at 20:38.

**Enemy fighting value**, idle player, variant a, at the end of each wave (mean over the seeds still going):

| wave | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 15 | 20 | 25 | 30 | 40 | 50 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| biggest siege F | 111 | 135 | 144 | 203 | 232 | 301 | 503 | 880 | 1372 | 781 | 0 | 0 | 0 | 0 | 0 |
| all besiegers F | 111 | 244 | 375 | 417 | 501 | 558 | 793 | 1111 | 1450 | 781 | 0 | 0 | 0 | 0 | 0 |
| sieges going | 1.0 | 2.0 | 3.0 | 3.1 | 3.1 | 2.7 | 2.3 | 1.9 | 1.3 | 0.4 | – | – | – | – | – |
| biggest / all | 1.00 | 0.55 | 0.38 | 0.49 | 0.46 | 0.54 | 0.63 | 0.79 | 0.95 | 1.00 | – | – | – | – | – |
| standing | 2.0 | 3.0 | 4.0 | 3.5 | 3.3 | 2.7 | 2.3 | 1.9 | 1.3 | 0.4 | – | – | – | – | – |

**How long a woken soundsystem stands** (idle player, variant a, mean over seeds, m:ss; – if none fell):

| woke at wave | 1 | 3 | 5 | 10 | 15 | 20 | 25 | 30 |
|---|---|---|---|---|---|---|---|---|
| stood for | 3:43 | 3:14 | 1:56 | 1:23 | 0:58 | – | – | – |

**Skill spread**: the wave a player growing at g F/min lasts to (mean over seeds; cap 60: "60+" when every seed got there), and the time; idle is g = 0. The last column is the survival of g 100 over g 50 (2.0 would be "twice the skill, twice the survival").

| variant | idle | g 10 | g 30 | g 50 | g 70 | g 100 | 100 / 50 |
|---|---|---|---|---|---|---|---|
| a. growth only | 13.8 (20:38) | 14.8 (21:36) | 21.4 (28:10) | 34.8 (41:26) | 57.7 (63:57) | 60+ | 1.72+ |
| b. a + attrition (50% march on) | 14.4 (21:17) | 16.3 (23:07) | 32.7 (39:18) | 58.0 (64:09) | 60+ | 60+ | 1.03+ |
| c. a + director, α 0 | 10.4 (17:13) | 11.1 (17:51) | 16.7 (23:22) | 25.3 (31:45) | 35.8 (42:14) | 47.2 (53:39) | 1.87 |
| c. a + director, α 0.3 | 11.2 (17:59) | 11.4 (18:12) | 17.1 (23:45) | 25.0 (31:37) | 32.7 (39:12) | 42.9 (49:26) | 1.72 |
| c. a + director, α 0.6 | 11.5 (18:20) | 11.8 (18:37) | 17.5 (24:08) | 24.9 (31:29) | 33.8 (40:21) | 41.4 (47:56) | 1.66 |
| d. b + director, α 0.3 | 12.6 (19:17) | 14.1 (20:45) | 26.3 (32:49) | 39.6 (46:06) | 53.7 (60:02) | 60+ | 1.52+ |
| d. b + director, α 0.6 | 12.7 (19:27) | 15.3 (21:59) | 28.9 (35:21) | 39.8 (46:17) | 55.8 (62:02) | 60+ | 1.51+ |
| no merging (every survivor scatters) | 60+ | 60+ | 60+ | 60+ | 60+ | 60+ | 1.00+ |

### Waves every 300 s

**Idle player** (does nothing), variant a: loses at wave 4, 3, 4, 4, 5, 4, 4, 5, 4, 3, 4, 5; mean 4.1 at 28:15.

**Enemy fighting value**, idle player, variant a, at the end of each wave (mean over the seeds still going):

| wave | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 15 | 20 | 25 | 30 | 40 | 50 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| biggest siege F | 41 | 92 | 115 | 65 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| all besiegers F | 41 | 92 | 130 | 65 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| sieges going | 1.0 | 1.0 | 1.0 | 0.3 | 0.0 | – | – | – | – | – | – | – | – | – | – |
| biggest / all | 1.00 | 1.00 | 0.88 | 1.00 | – | – | – | – | – | – | – | – | – | – | – |
| standing | 1.1 | 1.0 | 1.0 | 0.3 | 0.0 | – | – | – | – | – | – | – | – | – | – |

**How long a woken soundsystem stands** (idle player, variant a, mean over seeds, m:ss; – if none fell):

| woke at wave | 1 | 3 | 5 | 10 | 15 | 20 | 25 | 30 |
|---|---|---|---|---|---|---|---|---|
| stood for | 3:43 | 3:14 | 1:52 | – | – | – | – | – |

**Skill spread**: the wave a player growing at g F/min lasts to (mean over seeds; cap 60: "60+" when every seed got there), and the time; idle is g = 0. The last column is the survival of g 100 over g 50 (2.0 would be "twice the skill, twice the survival").

| variant | idle | g 10 | g 30 | g 50 | g 70 | g 100 | 100 / 50 |
|---|---|---|---|---|---|---|---|
| a. growth only | 3.1 (28:15) | 8.0 (53:06) | 60+ | 60+ | 60+ | 60+ | 1.00+ |
| b. a + attrition (50% march on) | 3.9 (32:36) | 21.7 (120:18) | 60+ | 60+ | 60+ | 60+ | 1.00+ |
| c. a + director, α 0 | 1.9 (22:11) | 2.8 (26:42) | 5.0 (37:49) | 6.6 (45:29) | 7.8 (51:52) | 9.7 (60:38) | 1.47 |
| c. a + director, α 0.3 | 2.2 (22:47) | 2.9 (27:37) | 5.0 (37:28) | 6.3 (44:02) | 6.8 (46:46) | 7.9 (52:19) | 1.27 |
| c. a + director, α 0.6 | 2.3 (23:36) | 3.1 (28:02) | 5.2 (37:26) | 5.6 (39:49) | 6.3 (44:28) | 6.7 (45:50) | 1.19 |
| d. b + director, α 0.3 | 2.6 (24:31) | 3.9 (31:48) | 6.3 (44:17) | 8.5 (54:28) | 10.3 (63:47) | 11.0 (66:32) | 1.29 |
| d. b + director, α 0.6 | 2.7 (25:59) | 4.4 (34:33) | 6.8 (46:53) | 7.9 (52:13) | 8.9 (57:30) | 11.1 (68:00) | 1.40 |
| no merging (every survivor scatters) | 60+ | 60+ | 60+ | 60+ | 60+ | 60+ | 1.00+ |

(120 s)
