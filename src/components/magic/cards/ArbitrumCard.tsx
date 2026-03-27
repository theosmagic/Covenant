import Card from '@/components/ui/Card';
import CardHeader from '@/components/ui/CardHeader';
import Divider from '@/components/ui/Divider';
import { getAnomalyLedger, recordAnomaly } from '@/utils/anomalyLedger';
import { FrenState } from '@/utils/types';

const FREN_STATE_KEY = 'fren-state';

const getFrenState = (): FrenState | null => {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(FREN_STATE_KEY);
  if (!raw) return null;
  try { return JSON.parse(raw) as FrenState; } catch { return null; }
};

const ArbitrumCard = () => {
  const fren = getFrenState();
  const ledger = getAnomalyLedger();
  const latestAnomaly = ledger[0];

  const promoteStage = () => {
    const stages = ['void', 'light', 'form', 'will', 'manifestation'] as const;
    const current = latestAnomaly?.stage ?? 'light';
    const next = stages[Math.min(stages.indexOf(current) + 1, stages.length - 1)];
    if (next === current) return;
    recordAnomaly({
      id: `promote-${Date.now()}`,
      timestamp: new Date().toISOString(),
      title: `Stage promoted to ${next}`,
      description: `World-form advanced from ${current} to ${next}.`,
      stage: next,
      chainProvenance: 'arbitrum',
      trigger: 'manual',
      confidence: 0.9,
    });
    window.location.reload();
  };

  return (
    <Card>
      <CardHeader id="world-form">Arbitrum / World-Form</CardHeader>
      <div className="text-sm text-[#4b5563] leading-6">
        Arbitrum carries manifestation-world logic. World-form begins here.
      </div>
      <Divider />
      {fren ? (
        <>
          <div className="code">Fren: {fren.id}</div>
          <div className="code mt-2">Autonomy: {fren.autonomyLevel}%</div>
          <div className="code mt-2">Origin: {fren.chainOrigin}</div>
          <Divider />
        </>
      ) : (
        <div className="text-sm text-[#77767a] mb-3">No fren state found. Identity not yet anchored.</div>
      )}
      <div className="text-sm font-medium text-[#140f24] mb-2">
        Current stage: <strong>{latestAnomaly?.stage ?? 'light'}</strong>
      </div>
      <button className="wallet-method mt-2" onClick={promoteStage}>
        Advance Stage →
      </button>
    </Card>
  );
};

export default ArbitrumCard;
