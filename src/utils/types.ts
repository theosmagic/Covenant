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
  gasPrice?: string;
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

export type { Magic } from '../components/magic/MagicProvider'
