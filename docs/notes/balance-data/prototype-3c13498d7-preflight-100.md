Real-rules balance report (schema 2)

Source: prototype-3c13498d7; commit 6d1ae3898dd4645effb402fcf78b4b72c880d2f5; source fingerprint 7788c4ef429986b851d070d9188f936791f59858caab2625cdd6b2a736f84313.
Fixed step 0.016666666666666666 s; limit 4200 player seconds; seeds 1000. Times below use the world clock (slowed by legend circles). Same seeds and loadouts across bots.
Sloppy is the existing novice bot: intermittent throws, imperfect aim, no dash. Bare broom, no hat; bag explicit for every bot.
Censored = time limit reached without a win/loss; excluded from completed-phase times, included in win denominator. Win times include winners only.
Ranged exposure = time with an actual ranged wind-up/cast targeting the witch, divided by conscious ground time. This is an observed lower bound, not all potential shooting positions or hit probability.

| island | phase | bpm | bag | bot | n | won / lost / censored | win % | win seconds | waves reached / passed | knockdowns | ranged % | discoveries / kept | loans / eligible |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| home | 0 | 100 | satchel | sloppy | 1 | 1 / 0 / 0 | 100.00 | 561.13 | 2.00 / 1.00 | 7.00 | 5.09 | 0 / 0 | 0 / 0 |
| home | 0 | 100 | satchel | crude | 1 | 1 / 0 / 0 | 100.00 | 297.62 | 1.00 / 0.00 | 1.00 | 2.59 | 0 / 0 | 0 / 0 |
| home | 0 | 100 | satchel | skilled | 1 | 1 / 0 / 0 | 100.00 | 309.91 | 1.00 / 0.00 | 0.00 | 3.06 | 0 / 0 | 0 / 0 |
| tiger | 4 | 100 | satchel | sloppy | 1 | 0 / 1 / 0 | 0.00 | — | 9.00 / 8.00 | 32.00 | 11.20 | 0 / 0 | 0 / 0 |
| tiger | 4 | 100 | satchel | crude | 1 | 0 / 1 / 0 | 0.00 | — | 9.00 / 8.00 | 33.00 | 4.64 | 0 / 0 | 0 / 0 |
| tiger | 4 | 100 | satchel | skilled | 1 | 0 / 1 / 0 | 0.00 | — | 15.00 / 14.00 | 14.00 | 1.60 | 0 / 0 | 0 / 0 |

Phase totals below weight every island/seed run equally; they describe the selected islands only.

| journey phase | bpm | bag | bot | n | win % | win seconds |
|---|---|---|---|---|---|---|
| 0 | 100 | satchel | sloppy | 1 | 100.00 | 561.13 |
| 0 | 100 | satchel | crude | 1 | 100.00 | 297.62 |
| 0 | 100 | satchel | skilled | 1 | 100.00 | 309.91 |
| 4 | 100 | satchel | sloppy | 1 | 0.00 | — |
| 4 | 100 | satchel | crude | 1 | 0.00 | — |
| 4 | 100 | satchel | skilled | 1 | 0.00 | — |

| island | bpm | bag | bot | run phase | entered | completed | mean completed seconds | censored/lost seconds (mean) |
|---|---|---|---|---|---|---|---|---|
| home | 100 | satchel | sloppy | opening | 1 | 1 | 272.63 | — |
| home | 100 | satchel | sloppy | waves | 1 | 1 | 223.63 | — |
| home | 100 | satchel | sloppy | stragglers | 1 | 1 | 59.20 | — |
| home | 100 | satchel | sloppy | lap | 1 | 1 | 5.67 | — |
| home | 100 | satchel | crude | opening | 1 | 1 | 294.30 | — |
| home | 100 | satchel | crude | lap | 1 | 1 | 3.32 | — |
| home | 100 | satchel | skilled | opening | 1 | 1 | 306.59 | — |
| home | 100 | satchel | skilled | lap | 1 | 1 | 3.32 | — |
| tiger | 100 | satchel | sloppy | opening | 1 | 1 | 367.43 | — |
| tiger | 100 | satchel | sloppy | waves | 1 | 0 | — | 1018.30 |
| tiger | 100 | satchel | crude | opening | 1 | 1 | 369.12 | — |
| tiger | 100 | satchel | crude | waves | 1 | 0 | — | 1020.48 |
| tiger | 100 | satchel | skilled | opening | 1 | 1 | 427.25 | — |
| tiger | 100 | satchel | skilled | waves | 1 | 0 | — | 2635.55 |

Isolated active-party stuns: stationary witch with protected health, one wild target, no allies or waves. The party intro finishes before timing starts; movement, retaliation and invitation/orbit rules remain active. Aim tracks the target. Hits count landed letters, not throws. Timeouts aren't proof a species can never be stunned.

| species | rank | bpm | bag | n | stunned | landed hits (completed mean) | seconds (completed mean) | timeout landed hits |
|---|---|---|---|---|---|---|---|---|
