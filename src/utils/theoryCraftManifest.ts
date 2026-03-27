const THEORY_CRAFT_BASE =
  process.env.NEXT_PUBLIC_THEORY_CRAFT_URL || 'http://localhost:5000';

export const theoryCraftManifest = {
  root: THEORY_CRAFT_BASE,
  artifact: `${THEORY_CRAFT_BASE}/covenant/abi`,
  primaryFacet: {
    covenantId: '9xD1',
    facetName: 'AssetFacet',
    role: 'MAGIC asset management + EIP-55 checksum validation',
  },
};
