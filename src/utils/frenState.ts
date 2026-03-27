import { FrenState, ManifestationStage } from './types';

const FREN_STATE_KEY = 'fren-state';

const defaultFren: FrenState = {
  id: 'fren-0',
  stage: 'light',
  autonomyLevel: 0,
  memoryAnchors: [],
  chainOrigin: 'ronin',
  lastActive: new Date().toISOString(),
};

export const getFrenState = (): FrenState => {
  if (typeof window === 'undefined') return defaultFren;
  const raw = window.localStorage.getItem(FREN_STATE_KEY);
  if (!raw) return defaultFren;
  try { return JSON.parse(raw) as FrenState; } catch { return defaultFren; }
};

export const setFrenState = (patch: Partial<FrenState>): FrenState => {
  const next: FrenState = { ...getFrenState(), ...patch, lastActive: new Date().toISOString() };
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(FREN_STATE_KEY, JSON.stringify(next));
  }
  return next;
};

export const advanceFrenStage = (): FrenState => {
  const stages: ManifestationStage[] = ['void', 'light', 'form', 'will', 'manifestation'];
  const current = getFrenState();
  const next = stages[Math.min(stages.indexOf(current.stage) + 1, stages.length - 1)];
  return setFrenState({ stage: next, autonomyLevel: Math.min(current.autonomyLevel + 10, 100) });
};

export const anchorMemory = (txHash: string): FrenState => {
  const current = getFrenState();
  const anchors = [txHash, ...current.memoryAnchors].slice(0, 20);
  return setFrenState({ memoryAnchors: anchors });
};
