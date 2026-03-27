import { useEffect, useState } from 'react';
import { getAnomalyLedger } from '@/utils/anomalyLedger';
import { getFrenState } from '@/utils/frenState';
import { getWorldState } from '@/utils/worldState';
import { AnomalyLedgerEntry, FrenState, ManifestationStage } from '@/utils/types';
import { WorldState } from '@/utils/worldState';

type AnomalyRuntime = {
  stage: ManifestationStage;
  fren: FrenState;
  world: WorldState;
  ledger: AnomalyLedgerEntry[];
};

const WATCHED_KEYS = ['anomaly-ledger', 'fren-state', 'world-state'];

export const useAnomalyRuntime = (): AnomalyRuntime => {
  const [runtime, setRuntime] = useState<AnomalyRuntime>(() => ({
    stage: getFrenState().stage,
    fren: getFrenState(),
    world: getWorldState(),
    ledger: getAnomalyLedger(),
  }));

  useEffect(() => {
    const sync = (e?: StorageEvent) => {
      if (e && !WATCHED_KEYS.includes(e.key ?? '')) return;
      const fren = getFrenState();
      setRuntime({
        stage: fren.stage,
        fren,
        world: getWorldState(),
        ledger: getAnomalyLedger(),
      });
    };

    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  return runtime;
};
