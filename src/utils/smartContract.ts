import { Network } from './network';
import { theoryCraftManifest } from './theoryCraftManifest';

const manifestationFacet = theoryCraftManifest.primaryFacet;

export const getContractId = () => {
  if (process.env.NEXT_PUBLIC_COVENANT_CONTRACT_ID) {
    return process.env.NEXT_PUBLIC_COVENANT_CONTRACT_ID;
  }

  switch (process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK) {
  case Network.RONIN:
  case Network.ARBITRUM:
  case Network.BASE:
  case Network.BNB:
  case Network.MONAD:
  case Network.POLYGON:
  case Network.ETHEREUM:
  case Network.ETHERLINK:
  case Network.ETHERLINK_TESTNET:
  case Network.ZKSYNC:
    return undefined;
  case Network.POLYGON_AMOY:
    return '0xabBb65DD49c18e1ee504C92a83f8f60eC0726e1b';
  case Network.ETHEREUM_SEPOLIA:
    return '0xa5bf55cC9afF6E0Ab59D8Fdd835c63983F124d03';
  case Network.ZKSYNC_SEPOLIA:
    return '0xDA39B00b285B6344E420Fe6F4FC0Aa4Ee5A4312d';
  }
};

export const isTestnet = (): boolean => {
  const testnets: Network[] = [Network.POLYGON_AMOY, Network.ETHEREUM_SEPOLIA, Network.ZKSYNC_SEPOLIA, Network.MONAD];
  const currentNetwork = process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK as Network | undefined;

  if (currentNetwork && testnets.includes(currentNetwork)) {
    return true;
  }
  return false;
};

export const getHashLink = (hash: string) => {
  switch (process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK) {
  case Network.RONIN:
    return `https://app.roninchain.com/tx/${hash}`;
  case Network.ARBITRUM:
    return `https://arbiscan.io/tx/${hash}`;
  case Network.BASE:
    return `https://basescan.org/tx/${hash}`;
  case Network.BNB:
    return `https://bscscan.com/tx/${hash}`;
  case Network.MONAD:
    return `https://testnet.monadexplorer.com/tx/${hash}`;
  case Network.POLYGON_AMOY:
    return `https://www.oklink.com/amoy/tx/${hash}`;
  case Network.ETHEREUM_SEPOLIA:
    return `https://sepolia.etherscan.io/tx/${hash}`;
  case Network.ZKSYNC_SEPOLIA:
    return `https://sepolia.explorer.zksync.io/tx/${hash}`;
  }
};

export const abi = [
  {
    'inputs': [],
    'name': 'retrieve',
    'outputs': [
      {
        'internalType': 'uint256',
        'name': '',
        'type': 'uint256'
      }
    ],
    'stateMutability': 'view',
    'type': 'function'
  },
  {
    'inputs': [
      {
        'internalType': 'uint256',
        'name': 'num',
        'type': 'uint256'
      }
    ],
    'name': 'store',
    'outputs': [],
    'stateMutability': 'nonpayable',
    'type': 'function'
  }
];

export const getManifestationFacet = () => manifestationFacet;
