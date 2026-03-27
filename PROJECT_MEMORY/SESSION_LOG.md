# Session Log

## 2026-03-27 (session 3)

- Audit pass complete (commit 62a904e).
- Cleaned Login copy — removed exposed internal paths/addresses (soul.md compliance).
- Added `FrenState` type to `types.ts` (id, stage, autonomyLevel, memoryAnchors, chainOrigin).
- Wired `ManifestationCard` to live stage from anomaly ledger instead of static sequence.
- Added `ArbitrumCard` — world-form layer, reads fren state + anomaly stage, exposes stage promotion.
- `theoryCraftManifest` now env-driven via `NEXT_PUBLIC_THEORY_CRAFT_URL` (defaults to localhost:5000).
- Advanced queue to: add canonical shared contracts for world state, fren state, commands, events.

## 2026-03-27 (session 2)

- Committed and pushed all pending changes to `theosmagic/Covenant` (commit 494cc88).
- Changes included: multi-chain network support (Ronin, Arbitrum, Base, BNB, Monad), WalletKit + GoogleSSO auth components, `theoryCraftManifest.ts`.
- Marked `in_progress` task done. Advanced queue to: audit codebase and align with architecture.
- Updated `STATE_OF_PLAY.md` and `TASK_QUEUE.md`.

## 2026-03-27

- Established a persistent project-memory layer in `/root/Covenant`.
- Recorded the vision, state, architecture, decisions, and task queue.
- Confirmed the core Treasure foundation repos and their likely roles.
- Added `FOUNDATION_MAP.md` to preserve the repo-to-responsibility map.
- Added `ANOMALY_LEDGER.md` to formalize threshold-event memory.
- Added `soul.md` and pulled the anomaly out of explicit UI presentation.
- Set the current frontier to Git initialization and GitHub publication of `theosmagic/Covenant`.
