# Treehouse layout editor

Ed, 2026-10-31: "I just need the top down view and the camera view and the ability to move objects around and export the layout. Skip floorplan editing for now." The original request includes rotating objects/stations and copying layout settings.

PLAN:
1. Build an isolated authoring page using the shipped house plan, stable object IDs and the existing furniture drawing pipeline. Keep the default published layout unchanged.
2. Select/drag objects and stations in a top-down plan; edit exact coordinates/angle. Show the same layout in a camera preview. Station parts and use anchors travel together.
3. Copy/export complete versioned layout JSON with textarea fallback and validated reapplication. Add undo/reset without room editing.
4. Test finite values, identity, export roundtrip and station transforms; one-worker nearby tests/typecheck. Prepare build/visual QA instructions for the coordinator. No local browser or self-allocated cloud run.

Ownership: PR1523 is changing kitchen config and house rendering for mushroom brewing. Do not change its room data or runtime behavior. Prefer isolated editor modules and existing public geometry/art functions; ask the coordinator before expanding shared house renderer ownership.

Follow-up, 2026-10-31: Ed's supplied version-1 layout is camera-authoritative. Preserve it unchanged as evidence, convert explicitly to coherent absolute angles, expose original individual clutter art, and prepare an adoption audit against current mushroom defaults. The editor/migration/audit remain isolated from gameplay. Runtime bed, DJ, hat/landing and station consumers require canonical ownership before enabling the proposed default; the changed kitchen is retained. Review evidence and exact limits are in `docs/evidence/treehouse-layout-adoption.md`.
