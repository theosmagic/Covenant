import { useEffect, useState } from 'react';
import { getAnomalyLedger } from '@/utils/anomalyLedger';
import { AnomalyLedgerEntry } from '@/utils/types';
import Card from './Card';
import CardHeader from './CardHeader';

const AnomalyLedgerCard = () => {
  const [entries, setEntries] = useState<AnomalyLedgerEntry[]>([]);

  useEffect(() => {
    setEntries(getAnomalyLedger());
  }, []);

  return (
    <Card>
      <CardHeader id="anomaly-ledger">Anomaly Ledger</CardHeader>
      <div className="anomaly-ledger">
        {entries.map((entry) => (
          <div className="anomaly-entry" key={entry.id}>
            <div className="anomaly-entry-header">
              <span className="anomaly-title">{entry.title}</span>
              <span className="anomaly-stage">{entry.stage}</span>
            </div>
            <p className="anomaly-description">{entry.description}</p>
            <div className="anomaly-meta">
              <span>{entry.chainProvenance}</span>
              <span>{entry.trigger}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AnomalyLedgerCard;
