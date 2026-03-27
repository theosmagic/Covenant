# Convergence Plan

All five repos are local at `/mnt/Vault/BridgeWorld/TreasureProject/`.

## What Each Repo Actually Is

### `tdk-js`
Monorepo (pnpm + turbo). Packages: `core`, `auth`, `react`, `launcher`. App: `apps/api` (Hono, Prisma, Docker).
- `core` — chain adapters, contract calls, shared types, Magicswap
- `auth` — session management, backend wallet
- `react` — TDK connect UI components (Tailwind, Storybook)
- `launcher` — app launcher surface
- `apps/api` — TDK API server at `tdk-api.spellcaster.lol`

**Role in system**: canonical runtime spine. Auth tokens, wallet sessions, chain reads, Magicswap swaps all flow through here.

### `aifrens-sdk`
Single package. `AIFrensClient` wraps the AIFrens API with x402 payment. Methods: `chat`, `generateImage`, `generateVideo`, `generateMeme`, `getMetadata`, `getAgentData`.

**Role in system**: fren-facing capability API. Chat, media generation, agent data. Payment via x402 (MAGIC/USDC/MIO/SMOL).

### `aifrens-openclaw-skill`
Two files: `aifrens.ts` (CLI — check-fren, balance, create instructions) + `onboard.ts`. Targets Base mainnet. Agent Station: `0xf4f76d4f67bb46b9a81f175b2cb9db68d7bd226b`. MAGIC on Base: `0xF1572d1Da5c3CcE14eE5a1c9327d17e9ff0E3f43`.

**Role in system**: OpenClaw operator bridge. Maps commands → fren actions. Frencoin economy (1B supply, 0.1% treasury fee, x402 portable endpoint).

### `treasure-functions`
Serverless (AWS Lambda). Handlers: `bridgeworld`, `beacon`, `smol`, `nft-holder`, `magic`. Services mirror handlers. Contracts: MAGIC, Uniswap V2, Smol, Beacon.

**Role in system**: backend execution plane. Scheduled work, event handlers, on-chain reads for Bridgeworld/Beacon/Smol/MAGIC price/supply.

### `tdk-godot`
Godot 4 plugin (`addons/tdk`). Modules: `identity`, `analytics`. Helpers: `logger`, `time_keeper`. Exposes: `TDK.get_auth_token()`, `TDK.start_session()`, `TDK.get_wallet_address()`, `TDK.track_custom_event()`. API endpoint: `tdk-api.spellcaster.lol`.

**Role in system**: manifestation client. Renders world-state in 3D. Auth token from tdk-js flows in. Has `res/textures/Avatar_3D.png` and `res/models/` — avatar assets already present.

---

## Gap Analysis

### What Covenant (`Git_Project`) has that needs to connect:

| Covenant contract | Missing connection |
|---|---|
| `FrenState` (id, stage, autonomyLevel, memoryAnchors) | Not wired to `AIFrensClient.getAgentData()` — fren data is local-only |
| `commands.ts` (deploy-legion, fish, harvest) | Not wired to `treasure-functions` handlers |
| `events.ts` (wallet-connected, transaction-confirmed) | Not wired to `tdk-js` session lifecycle |
| `worldState.ts` (chain states) | Not wired to `tdk-js/core` chain reads |
| `ManifestationCard` (stage display) | Not wired to `tdk-godot` — Godot renders nothing yet |
| `anomalyLedger` (threshold events) | Not wired to `treasure-functions` — no backend persistence |

### What the five repos have that Covenant needs to consume:

| Repo | What to consume |
|---|---|
| `tdk-js/auth` | Session token → replace Magic-only auth with TDK session as primary identity anchor |
| `tdk-js/core` | Chain reads for MAGIC balance, Magicswap price → feed `worldState.chains` |
| `aifrens-sdk` | `AIFrensClient.getAgentData(frenId)` → hydrate `FrenState` from live API |
| `aifrens-sdk` | `AIFrensClient.chat()` → wire to Neurochimp chat terminal in Theory_Craft |
| `aifrens-openclaw-skill` | `check-fren` + Frencoin address → surface in `ArbitrumCard` |
| `treasure-functions` | MAGIC price/supply → feed `worldState` + `SendTransactionCard` |
| `tdk-godot` | `TDK.start_session()` → call after Magic login to establish Godot-side identity |

---

## Convergence Order

### Phase 1 — Identity (Ronin / Ethereum)
**Goal**: TDK session established on login. Fren state hydrated from live API.

1. After `saveUserInfo` in `common.ts`, call `tdk-js/auth` `startSession` → store session token
2. Call `AIFrensClient.getAgentData(address)` → merge into `FrenState` (replace local default)
3. `memoryAnchors` populated from confirmed tx hashes via `anchorMemory(txHash)` in `SendTransactionCard`

**Missing**: `NEXT_PUBLIC_TDK_API_URL` env var. Add to `.env.example`.

### Phase 2 — Energy (Polygon)
**Goal**: Live MAGIC price and chain balance in `worldState`.

1. `treasure-functions/src/services/magic.ts` exposes MAGIC price — call via `NEXT_PUBLIC_THEORY_CRAFT_URL/magic/price` (proxy through Theory_Craft server) or direct
2. Feed result into `setWorldState({ chains: [...] })` on dashboard mount
3. `SendTransactionCard` shows live MAGIC value alongside native token balance

**Missing**: Theory_Craft server needs a `/magic/price` proxy endpoint.

### Phase 3 — World-Form (Arbitrum)
**Goal**: Commands flow to `treasure-functions` handlers. Anomalies persist to backend.

1. `enqueueCommand('deploy-legion' | 'start-harvest' | 'fish')` → POST to `NEXT_PUBLIC_THEORY_CRAFT_URL/agent-commands`
2. Theory_Craft agent loop consumes and executes (already has `/agent-commands/consume`)
3. High-confidence anomalies → POST to `treasure-functions` bridgeworld handler for backend record

**Missing**: `ArbitrumCard` needs command buttons wired to `enqueueCommand` + Theory_Craft endpoint.

### Phase 4 — Manifestation (Godot)
**Goal**: Godot renders fren stage. Avatar advances as stage advances.

1. On `stage-advanced` event → POST `{ stage, frenId }` to `NEXT_PUBLIC_THEORY_CRAFT_URL/godot/state`
2. Theory_Craft server relays to Godot via WebSocket
3. `tdk-godot` `TDK.start_session()` called with session token from Phase 1
4. Avatar_3D.png already present in `res/textures/` — stage maps to mesh/shader variant

**Missing**: Theory_Craft server needs `/godot/state` WebSocket relay. Godot scene needs stage-driven shader.

---

## Immediate Next Actions (in order)

1. Add `NEXT_PUBLIC_TDK_API_URL` to `.env.example` and `theoryCraftManifest.ts`
2. Wire `AIFrensClient.getAgentData()` into `frenState.ts` — call on login, merge into FrenState
3. Wire `anchorMemory(txHash)` into `SendTransactionCard` on `transaction-confirmed`
4. Add command buttons to `ArbitrumCard` → `enqueueCommand` → Theory_Craft
5. Add `/magic/price` proxy to Theory_Craft `web/server.js`
6. Add `/godot/state` WebSocket relay to Theory_Craft `web/server.js`

---

## Decision Record

**D-008**: `tdk-js/auth` session is the canonical identity anchor post-login. Magic token is the entry credential; TDK session is the operational identity.

**D-009**: `AIFrensClient` is the fren capability surface. Do not reimplement chat/media/agent-data in Covenant — consume the SDK.

**D-010**: `treasure-functions` is the backend persistence plane for anomalies and command results. Covenant's localStorage contracts are working memory only.

**D-011**: Godot stage rendering is driven by `stage-advanced` events relayed through Theory_Craft server. Covenant does not talk to Godot directly.
