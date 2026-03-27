import { AnomalyLedgerEntry } from './types';
import { emitEvent } from './events';
import { setFrenState, getFrenState } from './frenState';
import { setWorldState } from './worldState';

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
  if (typeof window === 'undefined') return seedLedger;
  const storedLedger = window.localStorage.getItem(ANOMALY_LEDGER_KEY);
  if (!storedLedger) {
    window.localStorage.setItem(ANOMALY_LEDGER_KEY, JSON.stringify(seedLedger));
    return seedLedger;
  }
  try { return JSON.parse(storedLedger) as AnomalyLedgerEntry[]; }
  catch {
    window.localStorage.setItem(ANOMALY_LEDGER_KEY, JSON.stringify(seedLedger));
    return seedLedger;
  }
};

// Confidence threshold above which an anomaly promotes fren stage + world state
const PROMOTION_THRESHOLD = 0.7;

export const recordAnomaly = (entry: AnomalyLedgerEntry): AnomalyLedgerEntry[] => {
  if (typeof window === 'undefined') return seedLedger;

  const nextLedger = [entry, ...getAnomalyLedger()].slice(0, 12);
  window.localStorage.setItem(ANOMALY_LEDGER_KEY, JSON.stringify(nextLedger));

  // Emit event regardless
  emitEvent('anomaly-recorded', entry.chainProvenance as Parameters<typeof emitEvent>[1], {
    id: entry.id,
    stage: entry.stage,
    confidence: entry.confidence,
    trigger: entry.trigger,
  });

  // High-confidence anomaly: promote fren stage and sync world state
  if (entry.confidence >= PROMOTION_THRESHOLD) {
    const fren = getFrenState();
    const stages = ['void', 'light', 'form', 'will', 'manifestation'] as const;
    const entryIdx = stages.indexOf(entry.stage);
    const frenIdx = stages.indexOf(fren.stage);

    // Only advance — never regress
    if (entryIdx > frenIdx) {
      setFrenState({ stage: entry.stage });
      emitEvent('stage-advanced', entry.chainProvenance as Parameters<typeof emitEvent>[1], {
        from: fren.stage,
        to: entry.stage,
        trigger: 'anomaly',
        anomalyId: entry.id,
      });
    }

    setWorldState({ stage: entry.stage, latestAnomaly: entry });

    // Relay to Godot via Theory_Craft
    const theoryCraftBase = typeof window !== 'undefined'
      ? (process.env.NEXT_PUBLIC_THEORY_CRAFT_URL || 'http://localhost:5000')
      : 'http://localhost:5000';
    fetch(`${theoryCraftBase}/godot/state`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ stage: entry.stage, frenId: entry.id }),
    }).catch(() => {});
  }

  return nextLedger;
};

