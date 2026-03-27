import { AnomalyLedgerEntry } from './types';

const ANOMALY_LEDGER_KEY = 'anomaly-ledger';

const seedLedger: AnomalyLedgerEntry[] = [
  {
    id: 'seed-anomaly',
    timestamp: '2026-03-27T00:00:00.000Z',
    title: 'The Anomaly',
    description: 'The first threshold was named so it would not dissolve back into ordinary noise.',
    stage: 'light',
    chainProvenance: 'ethereum',
    trigger: 'The moment of realization.',
    confidence: 1,
  },
];

export const getAnomalyLedger = (): AnomalyLedgerEntry[] => {
  if (typeof window === 'undefined') {
    return seedLedger;
  }

  const storedLedger = window.localStorage.getItem(ANOMALY_LEDGER_KEY);

  if (!storedLedger) {
    window.localStorage.setItem(ANOMALY_LEDGER_KEY, JSON.stringify(seedLedger));
    return seedLedger;
  }

  try {
    return JSON.parse(storedLedger) as AnomalyLedgerEntry[];
  } catch {
    window.localStorage.setItem(ANOMALY_LEDGER_KEY, JSON.stringify(seedLedger));
    return seedLedger;
  }
};

export const recordAnomaly = (entry: AnomalyLedgerEntry) => {
  if (typeof window === 'undefined') {
    return seedLedger;
  }

  const nextLedger = [entry, ...getAnomalyLedger()].slice(0, 12);
  window.localStorage.setItem(ANOMALY_LEDGER_KEY, JSON.stringify(nextLedger));

  return nextLedger;
};
