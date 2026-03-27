import { Dispatch, SetStateAction } from 'react'

export type LoginProps = {
  token: string
  setToken: Dispatch<SetStateAction<string>>
}

export type TxnParams = {
  from: string | null;
  to: string | null;
  value: string;
  maxFeePerGas?: bigint;
  maxPriorityFeePerGas?: bigint;
  gasPrice?: string | bigint;
};

export type ManifestationStage = 'void' | 'light' | 'form' | 'will' | 'manifestation';

export type AnomalyLedgerEntry = {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  stage: ManifestationStage;
  chainProvenance: string;
  trigger: string;
  confidence: number;
};

export type FrenState = {
  id: string;
  stage: ManifestationStage;
  autonomyLevel: number;        // 0–100
  memoryAnchors: string[];      // ethereum tx hashes
  chainOrigin: string;          // ronin by default
  lastActive: string;           // ISO timestamp
};

export type { Magic } from '../hooks/MagicProvider'
