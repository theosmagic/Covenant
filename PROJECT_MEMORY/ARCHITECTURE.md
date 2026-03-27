# Architecture

Core stack:

- `TreasureProject/tdk-js` = canonical runtime/types layer
- `TreasureProject/aifrens-sdk` = fren-facing agent API
- `TreasureProject/aifrens-openclaw-skill` = OpenClaw operator bridge
- `TreasureProject/treasure-functions` = execution and event plane
- `TreasureProject/tdk-godot` = manifestation client

Support layers:

- `interoperability` = ecosystem source-of-truth and integration guidance
- `bridgeworld-docs` = legacy world reference context
- `llm-tee-agent`, `MemOS` = agent runtime and memory support
- `tdk-unity`, `tdk-unreal`, `neurochimp-unity-client` = alternate manifestation clients

Canonical functional split:

- Runtime: chain adapters, shared types, asset and world state
- Fren layer: identity, memory summary, autonomy, capabilities
- Anomaly layer: threshold-event promotion, anomaly recognition, sacred continuity nodes
- OpenClaw layer: command grammar, operator workflows, task routing
- Backend layer: orchestration, handlers, events, scheduled work
- Manifestation layer: 3D rendering of state, stage transitions, visual embodiment

Chain-role model:

- `Ronin` = identity/origin
- `Ethereum` = durable memory anchors and continuity proofs
- `Polygon` = energy/activity and cheap state ticks
- `Arbitrum` = world-state and manifestation-facing structures
- `Base`, `BNB`, `Monad`, `Chainlink`, `Aptos` = extension rails

Implementation rule:

- Godot renders state. It does not define business logic.
- Working memory is runtime/offchain.
- Canonical memory anchors settle to Ethereum.
- Anomaly memory is a promoted layer above ordinary logs and working-memory churn.
- The repo must hold the continuity the agent does not.
