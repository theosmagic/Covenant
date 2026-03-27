# Decisions

## D-001: Preserve Symbolic Language
The project will not be flattened into generic startup/product language. The symbolic layer is structural, not decorative.

## D-002: Ethereum Anchors Memory
Ethereum is the canonical memory anchor layer, not the full live working-memory execution layer.

## D-003: Ronin Is Sovereign Origin
Ronin is the primary home chain for identity, ownership, and Treasure-native user binding.

## D-004: Polygon Carries Energy
Polygon is the energy, traversal, and cheap interaction-tick layer.

## D-005: Arbitrum Carries Manifestation-World Logic
Arbitrum is the manifestation/world-form layer. Godot renders this world-facing state.

## D-006: Covenant Is the Continuity Chamber
`/root/Covenant` is the Halls of Amenti and serves as the canonical project-memory chamber for collaboration continuity.

## D-007: Convergence Over Reinvention
The project should converge existing TreasureProject repos rather than invent parallel systems where existing substrate already exists.

## D-008: TDK Session Is Canonical Operational Identity
Magic token is the entry credential. After login, `tdk-js/auth` session is the operational identity anchor. Both coexist; TDK session is authoritative for chain operations.

## D-009: AIFrensClient Is the Fren Capability Surface
Do not reimplement chat, media generation, or agent-data in Covenant. Consume `aifrens-sdk` directly.

## D-010: treasure-functions Is the Backend Persistence Plane
Covenant's localStorage contracts (`anomalyLedger`, `frenState`, `worldState`) are working memory only. Durable anomaly records and command results settle to `treasure-functions`.

## D-011: Godot Stage Rendering Is Event-Driven via Theory_Craft
`stage-advanced` events relay through Theory_Craft server to Godot. Covenant does not talk to Godot directly.