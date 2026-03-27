import { ManifestationStage, FrenState, AnomalyLedgerEntry } from './types';

export type ChainRoleState = {
  chain: string;
  role: 'identity' | 'record' | 'energy' | 'world-form' | 'extension';
  connected: boolean;
  address: string | null;
  lastBlock: number | null;
};

export type WorldState = {
  stage: ManifestationStage;
  fren: FrenState | null;
  chains: ChainRoleState[];
  latestAnomaly: AnomalyLedgerEntry | null;
  epoch: number; // increments each time state is written
};

const WORLD_STATE_KEY = 'world-state';

const defaultChains: ChainRoleState[] = [
  { chain: 'ronin',    role: 'identity',   connected: false, address: null, lastBlock: null },
  { chain: 'ethereum', role: 'record',     connected: false, address: null, lastBlock: null },
  { chain: 'polygon',  role: 'energy',     connected: false, address: null, lastBlock: null },
  { chain: 'arbitrum', role: 'world-form', connected: false, address: null, lastBlock: null },
];

export const getWorldState = (): WorldState => {
  if (typeof window === 'undefined') {
    return { stage: 'light', fren: null, chains: defaultChains, latestAnomaly: null, epoch: 0 };
  }
  const raw = window.localStorage.getItem(WORLD_STATE_KEY);
  if (!raw) return { stage: 'light', fren: null, chains: defaultChains, latestAnomaly: null, epoch: 0 };
  try { return JSON.parse(raw) as WorldState; } catch {
    return { stage: 'light', fren: null, chains: defaultChains, latestAnomaly: null, epoch: 0 };
  }
};

export const setWorldState = (patch: Partial<WorldState>): WorldState => {
  const current = getWorldState();
  const next: WorldState = { ...current, ...patch, epoch: current.epoch + 1 };
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(WORLD_STATE_KEY, JSON.stringify(next));
  }
  return next;
};
