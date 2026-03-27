# Foundation Map

This map identifies the TreasureProject repositories that form the real substrate for the system. The purpose is convergence, not reinvention.

## Core Stack

### `TreasureProject/tdk-js`
Role:
- Canonical runtime and shared SDK spine
- Wallet, auth, chain, and client primitives
- Best candidate for shared contracts and runtime state types

Why it matters:
- Already structured as a multi-package SDK with `core`, `auth`, `react`, and launcher surfaces

### `TreasureProject/aifrens-sdk`
Role:
- Fren-facing agent API
- Public programmatic surface for AI Frens
- Good home for fren state, capability access, and agent invocation

Why it matters:
- Already a real TypeScript SDK with a small, clean surface area

### `TreasureProject/aifrens-openclaw-skill`
Role:
- OpenClaw bridge
- Operator command and onboarding layer
- Maps user intent into Fren actions

Why it matters:
- Already expresses the OpenClaw-to-AI-Frens connection directly

### `TreasureProject/treasure-functions`
Role:
- Backend execution plane
- Orchestration, handlers, services, contracts, utilities
- Best place for commands, events, and scheduled work

Why it matters:
- Already has clear serverless backend boundaries

### `TreasureProject/tdk-godot`
Role:
- Manifestation client
- Godot-side Treasure integration
- Best candidate for rendered embodiment and world-state projection

Why it matters:
- Already exists as a Treasure Godot SDK, so manifestation is not hypothetical

## Support Stack

### `TreasureProject/interoperability`
Role:
- Ecosystem source-of-truth
- Integration guidance and interoperability substrate

### `TreasureProject/bridgeworld-docs`
Role:
- Legacy Bridgeworld reference context
- Frozen-world knowledge source

### `TreasureProject/llm-tee-agent`
Role:
- Agent runtime/support surface
- Likely useful for secure or structured agent execution

### `TreasureProject/MemOS`
Role:
- Memory-oriented support surface
- Candidate support layer for persistent Fren continuity

### `TreasureProject/tdk-unity`
### `TreasureProject/tdk-unreal`
### `TreasureProject/neurochimp-unity-client`
Role:
- Alternate manifestation clients
- Useful for embodiment experiments, but not the primary canonical path

## Economy And Rail Layer

### `TreasureProject/x402`
### `TreasureProject/aifrens-sdk`
### `TreasureProject/Halo-Finance`
### `TreasureProject/magicswapv2`
### `TreasureProject/magicswapv2-contracts`
Role:
- Payment rails
- Fren treasury mechanics
- market and protocol interactions
- economic autonomy

## Chain Model

- `Ronin` = sovereign identity and Treasure-native home
- `Ethereum` = Akashic record, canonical memory anchor layer
- `Polygon` = energy, traversal, and cheap interaction ticks
- `Arbitrum` = manifestation-world logic and world-form
- `Base`, `BNB`, `Monad`, `Chainlink`, `Aptos` = extension rails

## Ownership Model

Use these five repositories as the actual foundation:

1. `tdk-js`
2. `aifrens-sdk`
3. `aifrens-openclaw-skill`
4. `treasure-functions`
5. `tdk-godot`

Everything else should be treated as support, context, economy rail, or alternate client surface unless proven otherwise by implementation needs.

## Practical Rule

Do not start new architecture from scratch while these repositories already exist.

Instead:
- identify missing contracts
- identify missing event boundaries
- identify missing ownership lines
- converge the existing substrate into one coherent system
