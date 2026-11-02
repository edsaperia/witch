# Landing on every authorized house floor

Item3 of inbox1638 only; default flips and their CI fixture correction remain separate.

Before production changes, the16-case direct rules test failed for10 rooms outside the former landing trunk (including both explicitly assigned guest bedrooms); six existing cases passed. Landing now uses the existing per-witch floor access object in onFloor. Automatic entry retains the rail inset; manual Space requires actual floor, without a grace snap over air. Existing stepWitch still controls landTime, furniture nudging, automatic entry and takeoff immunity. No allocation added.

New direct tests cover all14 authorized room shapes, half/full landTime, takeoff without relanding, locked unassigned bedrooms and air just inside the old grace margin. Two existing treehouse tests pinned the old exclusions: the Bedroom fly-past now expects landing, and the trunk subset test now accepts non-trunk floors/manual Bedroom landing while retaining its historical trunk geometry checks. Existing furniture/bed/KO tests remain.

No multiplayer files changed. Host guestDeck supplies the existing authorized guest room floor, so the eligibility helper follows it. Actual two-client transport, guest views and browser acceptance remain the multiplayer owner's/canonical checks.

Visible text: new changelog bullet “You can land on any treehouse room or branch floor from the treetops.” No other player text changed. No browser or visual evidence claimed; source changes require full canonical CI before release.
