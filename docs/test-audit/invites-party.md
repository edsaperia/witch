# Invites and party

2 changes proposed, 1 group to keep.

## What these protect

- Bursts, cooldowns, chains and piercing share invitation eligibility and queue slots.
- Placement, pickup and held-button runs preserve the right sigils and hats.
- Before casting and after losing, creatures cannot invite or harm her outside their allowed phase.
- Waves, route, forecast and drawing tip stay ordered, bounded and free of NaN.
- Guests retain valid destinations, reciprocal partners and distinct stop/destruction behavior.

File times are historical, not savings. Shared files include other tests and overlap groups; do not add their times. Counts are source test templates, not expanded runs.

## Proposed changes

<a id="ip1"></a>

### IP1. Observed motion and occurrence thresholds

**9 tests · outcome stats · files take ~124 s.**

Examples: [A loaded witch moves below a sampled speed ratio.](../../src/rules/leashWeight.test.ts#L75); [Witches swoop more often near a treetop player.](../../src/rules/partyWitches.test.ts#L45); [Dancers rarely occupy a sigil in sampled frames.](../../src/rules/sigilAvoid.test.ts#L34).

**Yes/no: Move these nine observed motion/occurrence thresholds to nightly/manual reports? Yes retains the measurements and dated comparisons without changing gameplay or dropping direct safety protections.** [Assertions, rationale and exact membership](semantic-groups.md#ip1).

<a id="ip2"></a>

### IP2. Mixed party, spread and route statistics

**16 tests · outcome stats · files take ~142 s.**

Examples: [Sampled letter spread reaches both sides of the aim.](../../src/rules/invitesAim.test.ts#L30); [Guest destinations meet a sampled population share.](../../src/rules/partyGuests.test.ts#L34); [Generated routes show a variety of crossing counts.](../../src/rules/leyroute.test.ts#L41).

**Yes/no: Split these sixteen tests into blocking rules/integrity checks and nonblocking sampled measurements? Yes preserves bounded geometry, valid ownership, exact replay and route rules; only density/frequency/diversity/timing judgments become reports.** [Assertions, rationale and exact membership](semantic-groups.md#ip2).


## Keep as they are

- [IP3: Invitation, phase and route contracts](semantic-groups.md#ip3): 127 tests; files take ~388 s.

<details>
<summary>Examples and evidence for the kept groups</summary>

<a id="ip3"></a>

### IP3. Invitation, phase and route contracts

**127 tests · current rules · files take ~388 s.**

Examples: [Pulse position and wave timing stay coupled at every step.](../../src/rules/leyPulseAudit.test.ts#L100); [Route planning stays within its work budget.](../../src/rules/leyroute.test.ts#L55); [A held sigil action preserves the intended interaction.](../../src/rules/sigilRuns.test.ts#L41).

[Assertions, rationale and exact membership](semantic-groups.md#ip3).

</details>

**IP-KEEP — Yes/no: Keep IP3 as they are?** They protect letter eligibility and queue parity, correct sigil ownership, phase gates, monotone pulse/route coupling and valid party-guest state.

[Review scope and provenance](semantic-groups.md#invites-party-review-provenance). [Old/current rulings](semantic-groups.md#invites-party-ruling-review). No change happens before Ed rules.

## Review coverage

134 tests remain unread. The keep question covers only named reviewed groups. [Exact remaining file/line manifest](unreviewed.md).
