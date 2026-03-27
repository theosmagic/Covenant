# State Of Play

Repository state:

- Local project root is `/root/Covenant`.
- This directory was not originally a Git repository.
- A contributor guide exists in `AGENTS.md`.
- A project memory layer has now been introduced to stop restart-amnesia and agent loops.

Current conceptual state:

- The system architecture has been clarified and stabilized.
- Ronin is the sovereign home chain.
- Ethereum is the canonical memory anchor layer.
- Polygon is the energy/activity layer.
- Arbitrum is the manifestation/world layer.
- Godot is the embodiment renderer.
- OpenClaw is the command/control layer.

Current implementation truth:

- The concept app exists separately and expresses the Bridgeworld Manifestation Engine direction.
- TreasureProject already contains the major substrate repos needed for convergence.
- A repo-level Treasure foundation map now exists in `PROJECT_MEMORY/FOUNDATION_MAP.md`.
- The problem is not lack of vision; the problem is lack of persistent collaboration state across agent restarts.

Current immediate goal:

- Audit the local codebase and align it with the symbolic/technical architecture.
- Identify gaps: missing shared contracts, missing event boundaries, missing ownership lines.

Current implementation truth:

- `theosmagic/Covenant` is live on GitHub (commit 494cc88).
- Multi-chain support added: Ronin (2020), Arbitrum (42161), Base (8453), BNB (56), Monad (10143).
- WalletKit + GoogleSSO auth components added.
- `theoryCraftManifest.ts` bridges the frontend to the Theory_Craft engine (AssetFacet / 9xD1).
- `gh` CLI is authenticated as `theosmagic` with repo scope.

Open issues:

- Git committer identity is set to system default — should be fixed with `git config --global`.
- TreasureProject convergence work has been mapped conceptually but not yet implemented in code.
